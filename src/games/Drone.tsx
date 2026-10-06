import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, PanResponder, Platform, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Svg, { Circle, Defs, G, Line, Path, Pattern, Polygon, Rect, Text as SvgText } from 'react-native-svg';
import { Bar, C, Confetti, F, GButton, haptic, Header, ND, Press, Tag } from '../components/ui';
import { makeEndlessSource } from '../data';
import { play } from '../sound';
import { Question } from '../types';
import { fmt, rnd, shuffle } from '../util';
import { add, cost, crosses, eq, lenText, makeTask, makeZones, MapPoint, N, pt, Task, TaskKind, vec, Vec, Zone } from './droneTasks';
import { GameProps } from './types';

const MAX_BATTERY = 40;
const BAD_LANDING = 3; // zlé pristátie stojí navyše
const DETOUR = 3; // obchádzka bezletovej zóny
const CHECK_CHARGE = 8; // nabitie na kontrolnom bode
const KIND_BONUS: Record<TaskKind, number> = { point: 0, mult: 20, sum: 30, mid: 40, dist: 60, near: 50 };
const ZONE_NAME: Record<Zone['kind'], string> = { crane: 'žeriav', power: 'vysoké napätie' };

const PAD = { l: 28, r: 12, t: 12, b: 26 };

// ───────────────────────── kresba dronu (zhora) ─────────────────────────

function DroneSprite({ size, spin, tint = C.ink }: { size: number; spin: Animated.Value; tint?: string }) {
  const r = size * 0.2; // polomer rotora
  const hub = [
    [r, r],
    [size - r, r],
    [r, size - r],
    [size - r, size - r],
  ];
  const rot = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const rotRev = spin.interpolate({ inputRange: [0, 1], outputRange: ['360deg', '0deg'] });
  return (
    <View style={{ width: size, height: size }} pointerEvents="none">
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        {hub.map(([x, y], i) => (
          <G key={i}>
            <Line x1={size / 2} y1={size / 2} x2={x} y2={y} stroke={tint} strokeWidth={size * 0.08} strokeLinecap="round" />
            <Circle cx={x} cy={y} r={r} fill="rgba(255,255,255,0.55)" stroke={tint} strokeWidth={1.2} />
          </G>
        ))}
        <Rect x={size * 0.33} y={size * 0.33} width={size * 0.34} height={size * 0.34} rx={size * 0.08} fill={tint} />
        <Circle cx={size / 2} cy={size * 0.39} r={size * 0.045} fill={C.orange} />
        <Rect x={size * 0.43} y={size * 0.5} width={size * 0.14} height={size * 0.09} rx={1} fill={C.chalk} />
      </Svg>
      {hub.map(([x, y], i) => (
        <Animated.View
          key={i}
          style={{ position: 'absolute', left: x - r, top: y - r, width: r * 2, height: r * 2, transform: [{ rotate: i % 3 === 0 ? rot : rotRev }] }}
        >
          <Svg width={r * 2} height={r * 2}>
            <Line x1={r * 0.15} y1={r} x2={r * 1.85} y2={r} stroke={tint} strokeWidth={Math.max(2, r * 0.22)} strokeLinecap="round" />
            <Circle cx={r} cy={r} r={r * 0.18} fill={C.orange} />
          </Svg>
        </Animated.View>
      ))}
    </View>
  );
}

// ───────────────────────── mapa ─────────────────────────

type Terrain = { contours: { d: string; major: boolean }[]; stream: string };

function makeTerrain(): Terrain {
  const contours: { d: string; major: boolean }[] = [];
  const hills = [
    [rnd(1, 4), rnd(5, 9)],
    [rnd(6, 9), rnd(1, 5)],
  ];
  hills.forEach(([cx, cy]) => {
    const ph = Math.random() * 6;
    const amp = 0.12 + Math.random() * 0.12;
    for (let k = 1; k <= 5; k++) {
      const r0 = 0.9 * k;
      let d = '';
      for (let i = 0; i <= 48; i++) {
        const th = (i / 48) * Math.PI * 2;
        const rr = r0 * (1 + amp * Math.sin(3 * th + ph) + 0.08 * Math.cos(5 * th + ph * 2));
        const x = cx + rr * Math.cos(th) * 1.25;
        const y = cy + rr * Math.sin(th);
        d += `${i ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)} `;
      }
      contours.push({ d: d + 'Z', major: k % 5 === 0 || k === 3 });
    }
  });
  const y0 = rnd(2, 8);
  const stream = `M-1 ${y0} C 3 ${y0 + rnd(-3, 3)}, 6 ${y0 + rnd(-3, 3)}, 11 ${rnd(1, 9)}`;
  return { contours, stream };
}

function ZoneShape({ z, X, Y, cell }: { z: Zone; X: (x: number) => number; Y: (y: number) => number; cell: number }) {
  const x0 = X(z.x),
    y0 = Y(z.y + z.h),
    w = z.w * cell,
    h = z.h * cell;
  const cx = x0 + w / 2,
    cy = y0 + h / 2;
  const s = Math.min(w, h) * 0.8;
  return (
    <G>
      <Rect x={x0} y={y0} width={w} height={h} fill="url(#hatch)" stroke={C.bad} strokeWidth={1.6} strokeDasharray="5 3" />
      {z.kind === 'crane' ? (
        <G>
          {/* žeriav zhora: stožiar, výložník, protiváha */}
          <Rect x={cx - s * 0.08} y={cy - s * 0.08} width={s * 0.16} height={s * 0.16} fill={C.yellow} stroke={C.ink} strokeWidth={1.2} />
          <Line x1={cx - s * 0.25} y1={cy} x2={cx + s * 0.48} y2={cy} stroke={C.ink} strokeWidth={2.4} />
          <Rect x={cx - s * 0.36} y={cy - s * 0.07} width={s * 0.12} height={s * 0.14} fill={C.ink} />
          <Line x1={cx + s * 0.32} y1={cy} x2={cx + s * 0.32} y2={cy + s * 0.18} stroke={C.ink} strokeWidth={1.2} />
          <Circle cx={cx + s * 0.32} cy={cy + s * 0.2} r={s * 0.035} fill={C.ink} />
        </G>
      ) : (
        <G>
          {/* vedenie VN: dva stĺpy a vodiče */}
          {(z.w >= z.h
            ? [
                [x0 + cell * 0.5, cy],
                [x0 + w - cell * 0.5, cy],
              ]
            : [
                [cx, y0 + cell * 0.5],
                [cx, y0 + h - cell * 0.5],
              ]
          ).map(([px, py], i, arr) => (
            <G key={i}>
              {i === 0 ? (
                <>
                  <Line x1={arr[0][0] - (z.w >= z.h ? 0 : 4)} y1={arr[0][1] - (z.w >= z.h ? 4 : 0)} x2={arr[1][0] - (z.w >= z.h ? 0 : 4)} y2={arr[1][1] - (z.w >= z.h ? 4 : 0)} stroke={C.ink} strokeWidth={1} />
                  <Line x1={arr[0][0] + (z.w >= z.h ? 0 : 4)} y1={arr[0][1] + (z.w >= z.h ? 4 : 0)} x2={arr[1][0] + (z.w >= z.h ? 0 : 4)} y2={arr[1][1] + (z.w >= z.h ? 4 : 0)} stroke={C.ink} strokeWidth={1} />
                </>
              ) : null}
              <Rect x={px - 6} y={py - 6} width={12} height={12} fill={C.sheet} stroke={C.ink} strokeWidth={1.4} />
              <Line x1={px - 6} y1={py - 6} x2={px + 6} y2={py + 6} stroke={C.ink} strokeWidth={1} />
              <Line x1={px + 6} y1={py - 6} x2={px - 6} y2={py + 6} stroke={C.ink} strokeWidth={1} />
            </G>
          ))}
          <Path d={`M${cx - 4} ${cy - 9} L${cx + 2} ${cy - 1} L${cx - 2} ${cy + 1} L${cx + 4} ${cy + 9}`} stroke={C.bad} strokeWidth={2.2} fill="none" />
        </G>
      )}
    </G>
  );
}

function SurveyMark({ p, name, X, Y, cell, color, fill, coords, bold }: { p: Vec; name: string; X: (x: number) => number; Y: (y: number) => number; cell: number; color: string; fill: string; coords?: boolean; bold?: boolean }) {
  const s = Math.max(9, cell * 0.36);
  const x = X(p[0]),
    y = Y(p[1]);
  const pts = `${x},${y - s * 0.75} ${x - s * 0.68},${y + s * 0.45} ${x + s * 0.68},${y + s * 0.45}`;
  const right = p[0] < N - 2;
  const label = coords ? `${name} ${pt(p)}` : name;
  const ty = p[1] > N - 1 ? y + s + 12 : y - s * 0.55;
  return (
    <G>
      <Polygon points={pts} fill={fill} stroke={color} strokeWidth={bold ? 2.4 : 1.6} />
      <Circle cx={x} cy={y} r={2} fill={color} />
      {[true, false].map((halo) => (
        <SvgText
          key={String(halo)}
          x={right ? x + s * 0.8 : x - s * 0.8}
          y={ty}
          fontSize={13}
          fontFamily={F.monoBold}
          fill={halo ? C.sheet : color}
          stroke={halo ? C.sheet : 'none'}
          strokeWidth={halo ? 4 : 0}
          textAnchor={right ? 'start' : 'end'}
        >
          {label}
        </SvgText>
      ))}
    </G>
  );
}

type MapProps = {
  size: number;
  A: Vec;
  v: Vec;
  zones: Zone[];
  points: MapPoint[];
  task: Task | null;
  terrain: Terrain;
  showPath: boolean;
  reveal: boolean;
  interactive: boolean;
  onAim: (p: Vec) => void;
  dronePos: Animated.ValueXY;
  droneScale: Animated.Value;
  droneShake: Animated.Value;
  spin: Animated.Value;
  ring: Animated.Value;
  ringAt: Vec | null;
  crashed: boolean;
};

function MapView(props: MapProps) {
  const { size, A, v, zones, points, task, terrain, showPath, reveal, interactive } = props;
  const BW = 2; // hrúbka rámu mapy
  const inner = size - 2 * BW;
  const cell = (inner - PAD.l - PAD.r) / N;
  const height = PAD.t + cell * N + PAD.b;
  const X = (x: number) => PAD.l + x * cell;
  const Y = (y: number) => PAD.t + (N - y) * cell;
  const B = add(A, v);
  const hasV = v[0] !== 0 || v[1] !== 0;
  const blocked = hasV && zones.some((z) => crosses(A, B, z));
  const pathColor = blocked ? C.bad : C.blue;

  // ťahanie / ťuknutie po mape nastaví vektor (funguje myšou aj dotykom)
  const box = useRef<View>(null);
  const origin = useRef({ x: 0, y: 0 });
  const live = useRef({ cell, interactive, onAim: props.onAim });
  live.current = { cell, interactive, onAim: props.onAim };
  const aimAt = (pageX: number, pageY: number) => {
    const c = live.current.cell;
    const gx = Math.round((pageX - origin.current.x - BW - PAD.l) / c);
    const gy = Math.round(N - (pageY - origin.current.y - BW - PAD.t) / c);
    live.current.onAim([Math.max(0, Math.min(N, gx)), Math.max(0, Math.min(N, gy))]);
  };
  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => live.current.interactive,
      onMoveShouldSetPanResponder: () => live.current.interactive,
      onMoveShouldSetPanResponderCapture: () => live.current.interactive,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: (e) => {
        const { pageX, pageY } = e.nativeEvent;
        box.current?.measureInWindow((x, y) => {
          origin.current = { x, y };
          aimAt(pageX, pageY);
        });
      },
      onPanResponderMove: (e) => aimAt(e.nativeEvent.pageX, e.nativeEvent.pageY),
    }),
  ).current;

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const el = box.current as unknown as { style?: CSSStyleDeclaration } | null;
    if (el?.style) {
      el.style.touchAction = 'none';
      el.style.userSelect = 'none';
      el.style.cursor = 'crosshair';
    }
  }, []);

  const D = Math.max(36, Math.min(58, cell * 1.45));
  const tx = Animated.add(Animated.multiply(props.dronePos.x, cell), PAD.l - D / 2);
  const ty = Animated.add(Animated.multiply(props.dronePos.y, -cell), PAD.t + N * cell - D / 2);

  // šípka
  const ang = Math.atan2(Y(B[1]) - Y(A[1]), X(B[0]) - X(A[0]));
  const ah = 12;
  const tip = [X(B[0]), Y(B[1])];
  const arrow = `${tip[0]},${tip[1]} ${tip[0] - ah * Math.cos(ang - 0.4)},${tip[1] - ah * Math.sin(ang - 0.4)} ${tip[0] - ah * Math.cos(ang + 0.4)},${tip[1] - ah * Math.sin(ang + 0.4)}`;

  const helpers = task?.helpers ?? [];
  const target = task && (task.targetVisible || reveal) ? task.target : null;

  return (
    <View ref={box} {...pan.panHandlers} style={{ width: size, height: height + 2 * BW, backgroundColor: C.sheet, borderWidth: BW, borderColor: C.ink, borderRadius: 6, overflow: 'hidden' }}>
      <Svg width={inner} height={height} style={StyleSheet.absoluteFill} pointerEvents="none">
        <Defs>
          <Pattern id="hatch" width={8} height={8} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <Rect width={8} height={8} fill="rgba(196,55,44,0.07)" />
            <Line x1={0} y1={0} x2={0} y2={8} stroke="rgba(196,55,44,0.45)" strokeWidth={2} />
          </Pattern>
        </Defs>
        {/* terén: vrstevnice a potok (v súradniciach mapy) */}
        <G transform={`translate(${PAD.l} ${PAD.t + N * cell}) scale(${cell} ${-cell})`}>
          {terrain.contours.map((c, i) => (
            <Path key={i} d={c.d} fill="none" stroke="#B0844F" strokeOpacity={c.major ? 0.55 : 0.3} strokeWidth={(c.major ? 1.4 : 0.9) / cell} />
          ))}
          <Path d={terrain.stream} fill="none" stroke="#5E95C8" strokeOpacity={0.6} strokeWidth={2.2 / cell} />
        </G>
        {/* sieť */}
        {Array.from({ length: N + 1 }, (_, i) => (
          <G key={i}>
            <Line x1={X(i)} y1={Y(0)} x2={X(i)} y2={Y(N)} stroke={i === 0 ? C.ink : C.ink} strokeOpacity={i === 0 ? 0.9 : 0.13} strokeWidth={i === 0 ? 1.6 : 1} />
            <Line x1={X(0)} y1={Y(i)} x2={X(N)} y2={Y(i)} stroke={C.ink} strokeOpacity={i === 0 ? 0.9 : 0.13} strokeWidth={i === 0 ? 1.6 : 1} />
            {i % (cell < 26 ? 2 : 1) === 0 ? (
              <>
                <SvgText x={X(i)} y={Y(0) + 17} fontSize={12} fontFamily={F.mono} fill={C.ink2} textAnchor="middle">
                  {String(i)}
                </SvgText>
                <SvgText x={PAD.l - 6} y={Y(i) + 4} fontSize={12} fontFamily={F.mono} fill={C.ink2} textAnchor="end">
                  {String(i)}
                </SvgText>
              </>
            ) : null}
          </G>
        ))}
        <SvgText x={X(N) - 2} y={Y(0) - 5} fontSize={13} fontFamily={F.monoBold} fill={C.ink} textAnchor="end">
          x
        </SvgText>
        <SvgText x={X(0) + 6} y={Y(N) + 13} fontSize={13} fontFamily={F.monoBold} fill={C.ink}>
          y
        </SvgText>
        {zones.map((z, i) => (
          <ZoneShape key={i} z={z} X={X} Y={Y} cell={cell} />
        ))}
        {/* úsečka pre úlohu so stredom */}
        {task?.kind === 'mid' && helpers.length === 2 ? (
          <Line x1={X(helpers[0].p[0])} y1={Y(helpers[0].p[1])} x2={X(helpers[1].p[0])} y2={Y(helpers[1].p[1])} stroke={C.teal} strokeWidth={2} strokeDasharray="2 4" />
        ) : null}
        {points.map((p) => (
          <SurveyMark key={p.name} p={p.p} name={p.name} X={X} Y={Y} cell={cell} color={C.teal} fill="rgba(31,122,112,0.18)" />
        ))}
        {helpers.map((h) => (
          <SurveyMark key={h.name} p={h.p} name={h.name} X={X} Y={Y} cell={cell} color={C.blue} fill={C.sheet} coords />
        ))}
        {target ? <SurveyMark p={target} name={task!.targetName} X={X} Y={Y} cell={cell} color={C.orange} fill={reveal ? 'rgba(222,90,30,0.15)' : C.sheet} coords bold /> : null}
        {/* predpokladaná dráha */}
        {showPath && hasV ? (
          <G>
            <Line x1={X(A[0])} y1={Y(A[1])} x2={tip[0]} y2={tip[1]} stroke={pathColor} strokeWidth={3} strokeDasharray="8 6" strokeLinecap="round" />
            <Polygon points={arrow} fill={pathColor} />
            <Circle cx={tip[0]} cy={tip[1]} r={5} fill="none" stroke={pathColor} strokeWidth={2} />
          </G>
        ) : null}
        {/* štart A */}
        <Circle cx={X(A[0])} cy={Y(A[1])} r={4} fill={C.ink} />
      </Svg>
      {props.ringAt ? (
        <Animated.View
          pointerEvents="none"
          style={{
            position: 'absolute',
            left: X(props.ringAt[0]) - 22,
            top: Y(props.ringAt[1]) - 22,
            width: 44,
            height: 44,
            borderRadius: 22,
            borderWidth: 3,
            borderColor: C.orange,
            opacity: props.ring.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
            transform: [{ scale: props.ring.interpolate({ inputRange: [0, 1], outputRange: [0.3, 2.4] }) }],
          }}
        />
      ) : null}
      <Animated.View
        pointerEvents="none"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          transform: [
            { translateX: Animated.add(tx, props.droneShake) },
            { translateY: ty },
            { scale: props.droneScale },
          ],
        }}
      >
        <DroneSprite size={D} spin={props.spin} tint={props.crashed ? C.bad : C.ink} />
      </Animated.View>
    </View>
  );
}

// ───────────────────────── malé časti UI ─────────────────────────

function Board({ lines, title }: { lines: string[]; title?: string }) {
  return (
    <View style={s.board}>
      {title ? <Text style={s.boardTitle}>{title}</Text> : null}
      {lines.map((l, i) => (
        <Text key={i} style={s.boardLine}>
          {l.replace(/, /g, ', ')}
        </Text>
      ))}
    </View>
  );
}

function Stepper({ label, value, onChange, min, max, disabled }: { label: string; value: number; onChange: (v: number) => void; min: number; max: number; disabled?: boolean }) {
  return (
    <View style={s.stepRow}>
      <Text style={s.stepLabel}>{label}</Text>
      <Press disabled={disabled || value <= min} onPress={() => onChange(value - 1)} inner={s.stepBtn} depth={3}>
        <Text style={s.stepSign}>−</Text>
      </Press>
      <Text style={s.stepVal}>{fmt(value)}</Text>
      <Press disabled={disabled || value >= max} onPress={() => onChange(value + 1)} inner={s.stepBtn} depth={3}>
        <Text style={s.stepSign}>+</Text>
      </Press>
    </View>
  );
}

// ───────────────────────── hra ─────────────────────────

type Quiz = { q: Question; opts: string[]; reason: 'zone' | 'check'; zone?: Zone; picked?: string };
type Result = { ok: boolean; landed: Vec; flight: number; extra: number; detour: number; gained: number; task: Task };
type Stage = 'aim' | 'quiz' | 'flying' | 'result' | 'end';

function Game({ subject, progress, onReport, onExit, onAgain }: GameProps & { onAgain: () => void }) {
  const { width } = useWindowDimensions();
  const contentW = Math.min(width, 680);
  const wide = contentW >= 620;
  const mapSize = wide ? Math.min(400, contentW - 32 - 16 - 250) : Math.min(contentW - 32, 460);

  const nextQ = useMemo(() => makeEndlessSource(subject), [subject]);
  const prevBest = useRef(progress.gameBest[`dron:${subject}`] ?? 0).current;
  const terrain = useMemo(makeTerrain, []);
  const nameNo = useRef(0);
  const nextName = useCallback(() => `P${++nameNo.current}`, []);

  const start = useMemo<Vec>(() => [rnd(1, 3), rnd(1, 3)], []);
  const zones = useMemo(() => makeZones(start), [start]);

  const [A, setA] = useState<Vec>(start);
  const [round, setRound] = useState(0);
  const [task, setTask] = useState<Task>(() => makeTask(0, start, zones, [], nextName));
  const [v, setV] = useState<Vec>([0, 0]);
  const [points, setPoints] = useState<MapPoint[]>([]);
  const [battery, setBattery] = useState(MAX_BATTERY);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [found, setFound] = useState(0);
  const [stats, setStats] = useState({ correct: 0, total: 0 });
  const missed = useRef<Question[]>([]);
  const [stage, setStage] = useState<Stage>('aim');
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [ringAt, setRingAt] = useState<Vec | null>(null);
  const [crashed, setCrashed] = useState(false);
  const reported = useRef(false);
  const scroll = useRef<ScrollView>(null);
  const mapY = useRef(0);

  const dronePos = useRef(new Animated.ValueXY({ x: start[0], y: start[1] })).current;
  const droneScale = useRef(new Animated.Value(1)).current;
  const droneShake = useRef(new Animated.Value(0)).current;
  const spin = useRef(new Animated.Value(0)).current;
  const ring = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(Animated.timing(spin, { toValue: 1, duration: 260, easing: Easing.linear, useNativeDriver: ND }));
    loop.start();
    return () => loop.stop();
  }, [spin]);

  const B = add(A, v);
  const hasV = v[0] !== 0 || v[1] !== 0;
  const zoneHit = hasV ? zones.find((z) => crosses(A, B, z)) : undefined;
  const flightCost = cost(v);

  const aim = useCallback(
    (p: Vec) => {
      setV((old) => {
        const nv: Vec = [p[0] - A[0], p[1] - A[1]];
        if (eq(old, nv)) return old;
        play('tick');
        return nv;
      });
    },
    [A],
  );

  const askQuestion = (reason: 'zone' | 'check', zone?: Zone) => {
    const q = nextQ();
    setQuiz({ q, opts: shuffle(q.options), reason, zone });
    setStage('quiz');
  };

  const launch = () => {
    if (!hasV || stage !== 'aim') return;
    if (zoneHit) askQuestion('zone', zoneHit);
    else fly(0);
  };

  const fly = (detour: number) => {
    setStage('flying');
    if (!wide) scroll.current?.scrollTo({ y: Math.max(0, mapY.current - 8), animated: true });
    setCrashed(false);
    play('fly');
    const dest = add(A, v);
    const dur = 500 + 140 * Math.sqrt(v[0] * v[0] + v[1] * v[1]);
    Animated.parallel([
      Animated.timing(dronePos, { toValue: { x: dest[0], y: dest[1] }, duration: dur, easing: Easing.inOut(Easing.cubic), useNativeDriver: ND }),
      Animated.sequence([
        Animated.timing(droneScale, { toValue: 1.3, duration: dur * 0.35, useNativeDriver: ND }),
        Animated.timing(droneScale, { toValue: 1, duration: dur * 0.65, easing: Easing.out(Easing.quad), useNativeDriver: ND }),
      ]),
    ]).start(() => land(dest, detour));
  };

  const land = (dest: Vec, detour: number) => {
    const ok = eq(dest, task.target);
    const flight = flightCost;
    const extra = ok ? 0 : BAD_LANDING;
    let gained = 0;
    if (ok) {
      gained = 100 + 25 * Math.min(streak, 4) + KIND_BONUS[task.kind];
      haptic('ok');
      setScore((x) => x + gained);
      setStreak((x) => x + 1);
      setFound((x) => x + 1);
      setPoints((ps) => [...ps, { name: task.targetName, p: task.target, visible: true, done: true }]);
      setRingAt(task.target);
      ring.setValue(0);
      Animated.timing(ring, { toValue: 1, duration: 700, easing: Easing.out(Easing.quad), useNativeDriver: ND }).start();
    } else {
      play('crash');
      setStreak(0);
      setCrashed(true);
      Animated.sequence(
        [6, -6, 5, -5, 3, 0].map((x) => Animated.timing(droneShake, { toValue: x, duration: 55, useNativeDriver: ND })),
      ).start();
    }
    setStats((st) => ({ correct: st.correct + (ok ? 1 : 0), total: st.total + 1 }));
    setBattery((b) => Math.max(0, Math.round((b - flight - extra - detour) * 10) / 10));
    setA(dest);
    setResult({ ok, landed: dest, flight, extra, detour, gained, task });
    setStage('result');
  };

  const finish = (finalScore: number, st: { correct: number; total: number }) => {
    setStage('end');
    if (reported.current) return;
    reported.current = true;
    if (finalScore > prevBest) play('win');
    onReport({
      game: 'dron',
      score: finalScore,
      xp: Math.round(finalScore / 25) + st.correct * 5,
      correct: st.correct,
      total: st.total,
      missed: missed.current,
    });
  };

  const newTask = () => {
    const r = round + 1;
    setRound(r);
    const taken = points.map((p) => p.p);
    setTask(makeTask(r, A, zones, taken, nextName));
    setV([0, 0]);
    setResult(null);
    setQuiz(null);
    setCrashed(false);
    setRingAt(null);
    setStage('aim');
    scroll.current?.scrollTo({ y: 0, animated: true });
  };

  const afterResult = () => {
    if (battery <= 0) return finish(score, stats);
    if (result?.ok && found > 0 && found % 3 === 0) askQuestion('check');
    else newTask();
  };

  const answer = (o: string) => {
    if (!quiz || quiz.picked) return;
    const ok = o === quiz.q.options[0];
    haptic(ok ? 'ok' : 'bad');
    setQuiz({ ...quiz, picked: o });
    if (!wide) setTimeout(() => scroll.current?.scrollToEnd({ animated: true }), 60);
    setStats((st) => ({ correct: st.correct + (ok ? 1 : 0), total: st.total + 1 }));
    if (!ok) missed.current.push(quiz.q);
    if (ok) setScore((x) => x + (quiz.reason === 'check' ? 50 : 30));
    if (ok && quiz.reason === 'check') {
      play('bell');
      setBattery((b) => Math.min(MAX_BATTERY, Math.round((b + CHECK_CHARGE) * 10) / 10));
    }
  };

  const afterQuiz = () => {
    if (!quiz) return;
    const ok = quiz.picked === quiz.q.options[0];
    if (quiz.reason === 'zone') {
      setQuiz(null);
      fly(ok ? 0 : DETOUR);
    } else newTask();
  };

  // ───── časti obrazovky ─────
  const batColor = battery > MAX_BATTERY * 0.5 ? C.teal : battery > MAX_BATTERY * 0.25 ? C.orange : C.bad;

  const status = (
    <View style={s.status}>
      <View style={{ flex: 1, minWidth: 150 }}>
        <View style={s.statusTop}>
          <Text style={s.statusLabel}>Batéria</Text>
          <Text style={[s.mono, { color: batColor }]}>
            {fmt(battery, 1)} / {MAX_BATTERY}
          </Text>
        </View>
        <Bar value={battery / MAX_BATTERY} color={batColor} height={12} />
      </View>
      <View style={s.statBox}>
        <Text style={s.statLabel}>Zamerané</Text>
        <Text style={s.statNum}>{found}</Text>
      </View>
      <View style={s.statBox}>
        <Text style={s.statLabel}>Séria</Text>
        <Text style={s.statNum}>{streak}</Text>
      </View>
    </View>
  );

  const taskCard = (
    <View style={s.task}>
      <Text style={s.kicker}>
        Úloha {round + 1} · {task.label}
      </Text>
      <Text style={s.taskTitle}>{task.title}</Text>
      <View style={s.givenWrap}>
        {task.given.map((g, i) => (
          <Text key={i} style={s.given}>
            {g}
          </Text>
        ))}
      </View>
    </View>
  );

  const map = (
    <MapView
      size={mapSize}
      A={A}
      v={stage === 'aim' || stage === 'quiz' ? v : [0, 0]}
      zones={zones}
      points={points}
      task={stage === 'result' && result?.ok ? { ...task, targetVisible: false } : task}
      terrain={terrain}
      showPath={stage === 'aim' || stage === 'quiz'}
      reveal={stage === 'result' && !!result && !result.ok}
      interactive={stage === 'aim'}
      onAim={aim}
      dronePos={dronePos}
      droneScale={droneScale}
      droneShake={droneShake}
      spin={spin}
      ring={ring}
      ringAt={ringAt}
      crashed={crashed}
    />
  );

  const minX = -A[0],
    maxX = N - A[0],
    minY = -A[1],
    maxY = N - A[1];

  let panel: React.ReactNode = null;
  if (stage === 'aim' || stage === 'flying') {
    panel = (
      <View style={{ gap: 12 }}>
        <View style={{ gap: 8 }}>
          <Stepper label="dx" value={v[0]} min={minX} max={maxX} onChange={(x) => setV([x, v[1]])} disabled={stage !== 'aim'} />
          <Stepper label="dy" value={v[1]} min={minY} max={maxY} onChange={(y) => setV([v[0], y])} disabled={stage !== 'aim'} />
        </View>
        {zoneHit ? (
          <Text style={s.warn}>Dráha vedie cez bezletovú zónu ({ZONE_NAME[zoneHit.kind]}). Pred letom dostaneš kontrolnú otázku.</Text>
        ) : null}
        <GButton
          title={stage === 'flying' ? 'Letím…' : 'Leť!'}
          subtitle={hasV ? `A + v = ${pt(B)}, batéria −${fmt(flightCost, 1)}` : 'najprv nastav vektor'}
          color={C.orange}
          onPress={launch}
          disabled={!hasV || stage !== 'aim'}
        />
        <Board
          title="Výpočet"
          lines={[
            `v = ${vec(v)}`,
            `A + v = ${pt(A)} + ${vec(v)} = ${pt(B)}`,
            `|v| = ${lenText(v)}`,
            `spotreba batérie: ${fmt(flightCost, 1)}`,
          ]}
        />
        <Text style={s.hint}>Vektor nastavíš tlačidlami alebo ťuknutím či ťahaním po mape.</Text>
      </View>
    );
  } else if (stage === 'result' && result) {
    const t = result.task;
    const total = result.flight + result.extra + result.detour;
    panel = (
      <View style={{ gap: 12 }}>
        <View style={[s.verdict, { borderColor: result.ok ? C.good : C.bad }]}>
          <Text style={[s.verdictTitle, { color: result.ok ? C.good : C.bad }]}>
            {result.ok ? `Bod ${t.targetName} zameraný` : 'Mimo cieľa'}
          </Text>
          <Text style={s.verdictText}>
            {result.ok
              ? `+${result.gained} bodov. Dron pristál na ${pt(result.landed)}.`
              : `Dron pristál na ${pt(result.landed)}, cieľ ${t.targetName} bol na ${pt(t.target)}.`}
          </Text>
        </View>
        <Board title={result.ok ? 'Riešenie' : 'Správny výpočet krok po kroku'} lines={t.steps} />
        <View style={s.costBox}>
          <Text style={s.costLine}>let |v| = {fmt(result.flight, 1)}</Text>
          {result.detour ? <Text style={s.costLine}>obchádzka zóny + {fmt(result.detour, 1)}</Text> : null}
          {result.extra ? <Text style={s.costLine}>zlé pristátie + {fmt(result.extra, 1)}</Text> : null}
          <Text style={[s.costLine, { fontFamily: F.monoBold }]}>batéria − {fmt(total, 1)}</Text>
        </View>
        <GButton title={battery <= 0 ? 'Koniec letu' : 'Ďalej'} color={C.ink} onPress={afterResult} />
      </View>
    );
  } else if (stage === 'quiz' && quiz) {
    const picked = quiz.picked;
    const ok = picked === quiz.q.options[0];
    panel = (
      <View style={{ gap: 10 }}>
        <Text style={s.kicker}>{quiz.reason === 'zone' ? `Bezletová zóna: ${ZONE_NAME[quiz.zone!.kind]}` : 'Kontrolný bod'}</Text>
        <Text style={s.quizIntro}>
          {quiz.reason === 'zone'
            ? `Správna odpoveď = prelet povolený. Zlá = obchádzka stojí ${DETOUR} batérie navyše.`
            : `Správna odpoveď nabije batériu o ${CHECK_CHARGE}.`}
        </Text>
        <Text style={s.quizQ}>{quiz.q.q}</Text>
        {quiz.opts.map((o) => {
          const right = o === quiz.q.options[0];
          const bg = !picked ? C.sheet : right ? '#D5EBDD' : o === picked ? '#F3D3CF' : C.sheet;
          return (
            <Press key={o} onPress={() => answer(o)} disabled={!!picked && !right && o !== picked} color={bg} inner={s.opt} sound={false}>
              <Text style={s.optText}>{o}</Text>
            </Press>
          );
        })}
        {picked ? (
          <>
            <View style={[s.verdict, { borderColor: ok ? C.good : C.bad }]}>
              <Text style={[s.verdictTitle, { color: ok ? C.good : C.bad }]}>
                {ok ? (quiz.reason === 'zone' ? 'Prelet povolený' : `Batéria +${CHECK_CHARGE}`) : quiz.reason === 'zone' ? `Obchádzka: batéria −${DETOUR}` : 'Bez nabitia'}
              </Text>
              {quiz.q.explain ? <Text style={s.verdictText}>{quiz.q.explain}</Text> : null}
            </View>
            <GButton title={quiz.reason === 'zone' ? 'Leť!' : 'Pokračovať'} color={quiz.reason === 'zone' ? C.orange : C.ink} onPress={afterQuiz} />
          </>
        ) : null}
      </View>
    );
  }

  if (stage === 'end') {
    const newBest = score > prevBest;
    return (
      <View style={{ flex: 1 }}>
        <Header title="Dron geodet" kicker="Koniec letu" onBack={onExit} />
        {newBest && score > 0 ? <Confetti /> : null}
        <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
          <Text style={s.endTitle}>Batéria je vybitá</Text>
          <Text style={s.endText}>Dron pristál naposledy na {pt(A)}. Takto dopadlo meranie:</Text>
          <View style={s.endGrid}>
            <View style={s.endCell}>
              <Text style={s.statLabel}>Zamerané body</Text>
              <Text style={s.endNum}>{found}</Text>
            </View>
            <View style={s.endCell}>
              <Text style={s.statLabel}>Skóre</Text>
              <Text style={[s.endNum, { color: C.orange }]}>{score}</Text>
            </View>
            <View style={s.endCell}>
              <Text style={s.statLabel}>Rekord</Text>
              <Text style={s.endNum}>{Math.max(prevBest, score)}</Text>
            </View>
            <View style={s.endCell}>
              <Text style={s.statLabel}>Správne</Text>
              <Text style={s.endNum}>
                {stats.correct}/{stats.total}
              </Text>
            </View>
          </View>
          {newBest && score > 0 ? <Tag color={C.orange} style={{ fontSize: 15 }}>NOVÝ REKORD</Tag> : null}
          <View style={{ gap: 12, marginTop: 4 }}>
            <GButton title="Hrať znova" icon="retry" color={C.orange} onPress={onAgain} />
            <GButton title="Späť" icon="home" light color={C.sheet} onPress={onExit} />
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Dron geodet"
        kicker="Vektory a súradnice"
        onBack={onExit}
        right={
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={s.statLabel}>Skóre</Text>
            <Text style={s.scoreNum}>{score}</Text>
          </View>
        }
      />
      <ScrollView ref={scroll} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32, gap: 12 }} keyboardShouldPersistTaps="handled">
        {status}
        {wide ? (
          <View style={{ flexDirection: 'row', gap: 16, alignItems: 'flex-start' }}>
            <View style={{ width: mapSize, gap: 12 }}>
              {taskCard}
              {map}
            </View>
            <View style={{ flex: 1, minWidth: 0 }}>{panel}</View>
          </View>
        ) : (
          <>
            {taskCard}
            <View onLayout={(e) => (mapY.current = e.nativeEvent.layout.y)}>{map}</View>
            {panel}
          </>
        )}
      </ScrollView>
    </View>
  );
}

// ───────────────────────── úvod ─────────────────────────

function Intro({ onStart, onExit, best }: { onStart: () => void; onExit: () => void; best: number }) {
  const spin = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(Animated.timing(spin, { toValue: 1, duration: 300, easing: Easing.linear, useNativeDriver: ND }));
    loop.start();
    return () => loop.stop();
  }, [spin]);
  return (
    <View style={{ flex: 1 }}>
      <Header title="Dron geodet" kicker="Matematika 1 · vektory" onBack={onExit} />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
          <DroneSprite size={72} spin={spin} />
          <Text style={[s.endTitle, { flex: 1 }]}>Zameraj body na stavenisku</Text>
        </View>
        <Text style={s.rule}>Dron stojí v bode A. Pre každú úlohu nastav vektor letu (dx, dy) a stlač Leť! Ak pristane presne na cieli, bod je zameraný.</Text>
        <Text style={s.rule}>Každý let minie batériu podľa dĺžky vektora |v| = √(dx² + dy²). Zlé pristátie a obchádzka bezletovej zóny stoja navyše, kontrolný bod ju dobije.</Text>
        <Board title="Ťahák" lines={['AB = B − A', 'k·u = (k·u₁, k·u₂)', 'u + v = (u₁ + v₁, u₂ + v₂)', 'S = ((x₁ + x₂)/2, (y₁ + y₂)/2)', '|u| = √(u₁² + u₂²)']} />
        {best > 0 ? <Text style={s.hint}>Tvoj rekord: {best}</Text> : null}
        <GButton title="Štart" subtitle={`batéria ${MAX_BATTERY}, mapa 10 × 10`} color={C.orange} onPress={onStart} />
      </ScrollView>
    </View>
  );
}

export default function Drone(props: GameProps) {
  const [started, setStarted] = useState(false);
  const [gameNo, setGameNo] = useState(0);
  if (!started) return <Intro onStart={() => setStarted(true)} onExit={props.onExit} best={props.progress.gameBest[`dron:${props.subject}`] ?? 0} />;
  return <Game key={gameNo} {...props} onAgain={() => setGameNo((k) => k + 1)} />;
}

const s = StyleSheet.create({
  mono: { fontFamily: F.monoBold, fontSize: 15 },
  status: { flexDirection: 'row', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' },
  statusTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 },
  statusLabel: { fontFamily: F.bodyBold, fontSize: 15, color: C.ink },
  statBox: { borderLeftWidth: 2, borderColor: C.rule, paddingLeft: 10, minWidth: 64 },
  statLabel: { fontFamily: F.mono, fontSize: 11, letterSpacing: 0.8, color: C.ink2, textTransform: 'uppercase' },
  statNum: { fontFamily: F.monoBold, fontSize: 20, color: C.ink },
  scoreNum: { fontFamily: F.monoBold, fontSize: 22, color: C.orange },
  task: { backgroundColor: C.sheet, borderWidth: 1.5, borderColor: C.ink, borderLeftWidth: 6, borderLeftColor: C.orange, borderRadius: 6, padding: 12, gap: 6 },
  kicker: { fontFamily: F.mono, fontSize: 12, letterSpacing: 1, color: C.orange, textTransform: 'uppercase' },
  taskTitle: { fontFamily: F.head, fontSize: 20, color: C.ink, lineHeight: 25 },
  givenWrap: { flexDirection: 'row', flexWrap: 'wrap', columnGap: 16, rowGap: 2 },
  given: { fontFamily: F.mono, fontSize: 16, color: C.ink },
  board: { backgroundColor: C.board, borderRadius: 6, borderWidth: 3, borderColor: '#5B4632', padding: 12, gap: 4 },
  boardTitle: { fontFamily: F.mono, fontSize: 12, letterSpacing: 1, color: C.yellow, textTransform: 'uppercase', marginBottom: 2 },
  boardLine: { fontFamily: F.mono, fontSize: 16, color: C.chalk, lineHeight: 23 },
  warn: { fontFamily: F.bodyMed, fontSize: 16, color: C.bad, lineHeight: 21 },
  stepRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  stepLabel: { fontFamily: F.monoBold, fontSize: 18, color: C.ink, width: 30 },
  stepBtn: { width: 52, height: 52, alignItems: 'center', justifyContent: 'center' },
  stepSign: { fontFamily: F.monoBold, fontSize: 26, color: C.ink, lineHeight: 30 },
  stepVal: { fontFamily: F.monoBold, fontSize: 24, color: C.blue, minWidth: 52, textAlign: 'center' },
  hint: { fontFamily: F.body, fontSize: 15, color: C.ink2, lineHeight: 20 },
  verdict: { borderLeftWidth: 6, backgroundColor: C.sheet, borderRadius: 4, padding: 12, gap: 4 },
  verdictTitle: { fontFamily: F.head, fontSize: 20 },
  verdictText: { fontFamily: F.body, fontSize: 16, color: C.ink, lineHeight: 22 },
  costBox: { gap: 2, paddingLeft: 2 },
  costLine: { fontFamily: F.mono, fontSize: 15, color: C.ink },
  quizIntro: { fontFamily: F.body, fontSize: 15, color: C.ink2, lineHeight: 20 },
  quizQ: { fontFamily: F.bodyBold, fontSize: 18, color: C.ink, lineHeight: 24 },
  opt: { minHeight: 48, paddingHorizontal: 14, paddingVertical: 10, justifyContent: 'center' },
  optText: { fontFamily: F.bodyMed, fontSize: 16, color: C.ink, lineHeight: 21 },
  endTitle: { fontFamily: F.headX, fontSize: 30, color: C.ink, letterSpacing: -0.4 },
  endText: { fontFamily: F.body, fontSize: 17, color: C.ink, lineHeight: 24 },
  endGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  endCell: { minWidth: 140, flexGrow: 1, borderWidth: 1.5, borderColor: C.ink, borderRadius: 6, backgroundColor: C.sheet, padding: 12 },
  endNum: { fontFamily: F.monoBold, fontSize: 30, color: C.ink },
  rule: { fontFamily: F.body, fontSize: 18, color: C.ink, lineHeight: 26 },
});
