import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Svg, { Circle, Defs, G, Line, Path, Pattern, RadialGradient, Rect, Stop, Text as SvgText } from 'react-native-svg';
import { C, F, ND } from '../components/ui';
import { TOPICS } from '../data';
import { play } from '../sound';
import { SubjectId } from '../types';

// Stôl kasína: zelené plátno s jemnou textúrou, drevený okraj, ruleta so sektormi tém.

export const FELT = '#1E5B3F';
export const FELT_DARK = '#14402C';
export const WOOD = '#74472A';
export const CHALK = '#F3F0E6';

export type Sector = {
  kind: 'topic' | 'x2' | 'x3' | 'jackpot';
  label: string;
  /** id témy; pri špeciálnych sektoroch sa téma losuje */
  topic?: string;
  mult: number;
  fill: string;
  fg: string;
};

const SHORT: Record<string, string> = {
  kmity: 'Kmity',
  skladanie: 'Skladanie',
  vlny: 'Vlnenie',
  doppler: 'Doppler',
  em: 'EM vlny',
  optika: 'Optika',
  sosovky: 'Šošovky',
  vektory: 'Vektory',
  geometria: '3D geom.',
  matice: 'Matice',
  determinanty: 'Determ.',
  funkcie: 'Funkcie',
  limity: 'Limity',
  derivacie: 'Derivácie',
  priebeh: 'Priebeh',
  integraly: 'Integrály',
};

export function topicName(subject: SubjectId, id: string) {
  return TOPICS[subject].find((t) => t.id === id)?.name ?? id;
}

const RED = '#A8322A';
const BLACK = '#1D2229';

/** Sektory kolesa: všetky témy predmetu + ×2, ×3, ×2, Jackpot rovnomerne rozmiestnené. */
export function buildSectors(subject: SubjectId): Sector[] {
  const topics = TOPICS[subject];
  const specials: Sector[] = [
    { kind: 'x2', label: '×2', mult: 2, fill: C.yellow, fg: C.ink },
    { kind: 'x3', label: '×3', mult: 3, fill: C.teal, fg: '#fff' },
    { kind: 'x2', label: '×2', mult: 2, fill: C.yellow, fg: C.ink },
    { kind: 'jackpot', label: 'JACKPOT', mult: 5, fill: C.orange, fg: '#fff' },
  ];
  const n = topics.length + specials.length;
  const specialAt = new Map<number, Sector>();
  specials.forEach((s, k) => specialAt.set(Math.floor(((k + 0.5) * n) / specials.length), s));
  const out: Sector[] = [];
  let ti = 0;
  let red = true;
  for (let i = 0; i < n; i++) {
    const sp = specialAt.get(i);
    if (sp) {
      out.push(sp);
      continue;
    }
    const t = topics[ti++];
    out.push({ kind: 'topic', label: SHORT[t.id] ?? t.name.split(' ')[0], topic: t.id, mult: 1, fill: red ? RED : BLACK, fg: '#fff' });
    red = !red;
  }
  return out;
}

/** Zelené plátno s dreveným okrajom. */
export function Felt({ children, style, inner }: { children: React.ReactNode; style?: ViewStyle; inner?: ViewStyle }) {
  return (
    <View style={[t.wood, style]}>
      <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" pointerEvents="none">
        <Defs>
          <Pattern id="casinoWood" width={60} height={9} patternUnits="userSpaceOnUse">
            <Path d="M0 3 Q15 1 30 3 T60 3" stroke="rgba(0,0,0,0.18)" strokeWidth={1} fill="none" />
            <Path d="M0 7 Q20 8.5 40 7 T60 7" stroke="rgba(255,255,255,0.07)" strokeWidth={1} fill="none" />
          </Pattern>
        </Defs>
        <Rect x={0} y={0} width="100%" height="100%" fill="url(#casinoWood)" />
      </Svg>
      <View style={[t.felt, inner]}>
        <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" pointerEvents="none">
          <Defs>
            <Pattern id="casinoFelt" width={6} height={6} patternUnits="userSpaceOnUse">
              <Circle cx={1.2} cy={1.4} r={0.7} fill="rgba(255,255,255,0.06)" />
              <Circle cx={4.3} cy={4.1} r={0.8} fill="rgba(0,0,0,0.13)" />
              <Line x1={0} y1={5.5} x2={2.5} y2={3} stroke="rgba(255,255,255,0.03)" strokeWidth={0.6} />
            </Pattern>
            <RadialGradient id="casinoLamp" cx="50%" cy="35%" r="75%">
              <Stop offset="0" stopColor="#ffffff" stopOpacity={0.1} />
              <Stop offset="0.6" stopColor="#000000" stopOpacity={0} />
              <Stop offset="1" stopColor="#000000" stopOpacity={0.3} />
            </RadialGradient>
          </Defs>
          <Rect x={0} y={0} width="100%" height="100%" fill="url(#casinoFelt)" />
          <Rect x={0} y={0} width="100%" height="100%" fill="url(#casinoLamp)" />
        </Svg>
        {children}
      </View>
    </View>
  );
}

const pt = (cx: number, cy: number, r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return [cx + r * Math.sin(a), cy - r * Math.cos(a)] as const;
};

/**
 * Ruleta. Po zmene `spinId` sa roztočí a dobrzdí konštantným trením:
 * φ(t) = φ0 + ω0·t − ½·α·t², teda uhol ide ako 1 − (1 − t/T)² a T = 2·Δφ/ω0.
 */
export function Wheel({
  sectors,
  size,
  spinId,
  startAngle,
  onDone,
  onPress,
}: {
  sectors: Sector[];
  size: number;
  spinId: number;
  startAngle: number;
  onDone: (index: number, angle: number) => void;
  onPress?: () => void;
}) {
  const n = sectors.length;
  const step = 360 / n;
  const rot = useRef(new Animated.Value(startAngle)).current;
  const flap = useRef(new Animated.Value(0)).current;
  const sectorAt = (angle: number) => Math.floor(((((-angle % 360) + 360) % 360) / step) % n);
  const [live, setLive] = useState(() => sectorAt(startAngle));
  const lastIdx = useRef(live);
  const lastTick = useRef(0);
  const angle = useRef(startAngle);

  useEffect(() => {
    const id = rot.addListener(({ value }) => {
      const i = sectorAt(value);
      if (i !== lastIdx.current) {
        lastIdx.current = i;
        setLive(i);
        const now = Date.now();
        if (now - lastTick.current > 28) {
          lastTick.current = now;
          play('tick');
        }
        flap.stopAnimation();
        flap.setValue(1);
        Animated.spring(flap, { toValue: 0, speed: 28, bounciness: 14, useNativeDriver: ND }).start();
      }
    });
    return () => rot.removeListener(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rot, flap, n]);

  const mountSpin = useRef(spinId);
  useEffect(() => {
    if (!spinId || spinId === mountSpin.current) return;
    const k = Math.floor(Math.random() * n);
    const u = 0.22 + Math.random() * 0.56;
    const cur = angle.current;
    const turns = 4 + Math.floor(Math.random() * 2);
    const target = Math.ceil(cur / 360) * 360 + turns * 360 + (360 - (k + u) * step);
    const delta = target - cur;
    const w0 = 900 + Math.random() * 260; // počiatočná uhlová rýchlosť [°/s]
    const T = (2 * delta) / w0; // čas do zastavenia pri konštantnom spomalení [s]
    play('whoosh');
    Animated.timing(rot, {
      toValue: target,
      duration: T * 1000,
      easing: (x) => 1 - (1 - x) * (1 - x),
      useNativeDriver: ND,
    }).start(({ finished }) => {
      if (!finished) return;
      angle.current = target;
      onDone(k, target);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinId]);

  const cx = size / 2;
  const cy = size / 2;
  const R = size / 2 - 3;
  const r = R - 12;
  const fs = Math.max(11, Math.min(14, size / 24));

  const cur = sectors[live];
  return (
    <View style={{ alignItems: 'center' }}>
      <Pressable onPress={onPress} accessibilityLabel="Roztočiť koleso" style={{ width: size, height: size + 14, paddingTop: 14 }}>
        <Animated.View
          style={{
            width: size,
            height: size,
            transform: [{ rotate: rot.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] }) }],
          }}
        >
          <Svg width={size} height={size}>
            <Circle cx={cx} cy={cy} r={R} fill={WOOD} stroke={C.ink} strokeWidth={2} />
            {sectors.map((s, i) => {
              const a0 = i * step;
              const a1 = (i + 1) * step;
              const [x0, y0] = pt(cx, cy, r, a0);
              const [x1, y1] = pt(cx, cy, r, a1);
              const mid = a0 + step / 2;
              const flip = mid > 180;
              return (
                <G key={i}>
                  <Path d={`M${cx} ${cy} L${x0} ${y0} A${r} ${r} 0 ${step > 180 ? 1 : 0} 1 ${x1} ${y1} Z`} fill={s.fill} stroke={C.ink} strokeWidth={1.2} />
                  <G transform={`rotate(${flip ? mid + 90 : mid - 90} ${cx} ${cy})`}>
                    <SvgText
                      x={flip ? cx - r * 0.6 : cx + r * 0.6}
                      y={cy + fs * 0.36}
                      fill={s.fg}
                      fontSize={s.kind === 'topic' || s.kind === 'jackpot' ? fs : fs + 5}
                      fontFamily={F.bodyBold}
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {s.label}
                    </SvgText>
                  </G>
                </G>
              );
            })}
            {sectors.map((_, i) => {
              const [x, y] = pt(cx, cy, r + 5, i * step);
              return <Circle key={'p' + i} cx={x} cy={y} r={3} fill={C.yellow} stroke={C.ink} strokeWidth={1} />;
            })}
            <Circle cx={cx} cy={cy} r={r * 0.2} fill={C.paper} stroke={C.ink} strokeWidth={2} />
            <Circle cx={cx} cy={cy} r={r * 0.08} fill={C.orange} stroke={C.ink} strokeWidth={1.5} />
          </Svg>
        </Animated.View>
        {/* jazýček, ktorý pri každom kolíku odskočí */}
        <Animated.View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 0,
            left: cx - 14,
            width: 28,
            height: 40,
            transformOrigin: '50% 8px',
            transform: [{ rotate: flap.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-24deg'] }) }],
          }}
        >
          <Svg width={28} height={40}>
            <Path d="M4 4 L24 4 L14 38 Z" fill={C.orange} stroke={C.ink} strokeWidth={2} strokeLinejoin="round" />
            <Circle cx={14} cy={8} r={3} fill={C.ink} />
          </Svg>
        </Animated.View>
      </Pressable>
      <View style={t.live}>
        <Text style={[t.liveTxt, { color: cur.kind === 'topic' ? CHALK : C.yellow }]} numberOfLines={1}>
          {cur.kind === 'topic' ? cur.label : cur.kind === 'jackpot' ? 'Jackpot ×5' : `Násobič ${cur.label}`}
        </Text>
      </View>
    </View>
  );
}

const t = StyleSheet.create({
  wood: { backgroundColor: WOOD, borderRadius: 20, borderWidth: 2, borderColor: C.ink, padding: 9, overflow: 'hidden' },
  felt: { backgroundColor: FELT, borderRadius: 12, borderWidth: 2, borderColor: FELT_DARK, padding: 14, overflow: 'hidden' },
  live: { marginTop: 6, minHeight: 30, justifyContent: 'center' },
  liveTxt: { fontFamily: F.monoBold, fontSize: 18, letterSpacing: 0.5 },
});
