import React, { useMemo, useRef, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import Svg, { Circle, G, Line, Path, Polygon, Rect, Text as SvgText } from 'react-native-svg';
import { Arrow, Label } from '../../components/diagrams';
import { C, F, haptic, ND } from '../../components/ui';
import { play } from '../../sound';
import { CH, Chalk, Eq, Goal, NumIn, par, parseNum, sk, Slider, Stamp, T, Toggle, useOnce, Verdict } from '../kit';

// ───────────────────────── AB = B − A: ťahaj body ─────────────────────────

const U = 20; // 1 jednotka = 20 px
const OX = 20;
const OY = 200;
const px = (x: number) => OX + x * U;
const py = (y: number) => OY - y * U;

const GOALS: [number, number][] = [
  [3, -2],
  [-4, 1],
  [0, 5],
];

export function VecAB({ onWin }: { onWin?: () => void }) {
  const [A, setA] = useState<[number, number]>([2, 3]);
  const [B, setB] = useState<[number, number]>([7, 6]);
  const [gi, setGi] = useState(0);
  const ab: [number, number] = [B[0] - A[0], B[1] - A[1]];
  const goal = GOALS[Math.min(gi, GOALS.length - 1)];
  const hit = ab[0] === goal[0] && ab[1] === goal[1];
  const allDone = gi >= GOALS.length;
  const len = Math.hypot(ab[0], ab[1]);

  const lastHit = useRef(false);
  if (hit && !lastHit.current && !allDone) {
    lastHit.current = true;
    setTimeout(() => {
      play('correct');
      setGi((g) => {
        const n = g + 1;
        if (n >= GOALS.length) onWin?.();
        return n;
      });
      lastHit.current = false;
    }, 350);
  }

  const drag = (id: string, x: number, y: number) => {
    const gx = Math.max(0, Math.min(14, Math.round((x - OX) / U)));
    const gy = Math.max(0, Math.min(9, Math.round((OY - y) / U)));
    const set = id === 'A' ? setA : setB;
    const cur = id === 'A' ? A : B;
    if (cur[0] !== gx || cur[1] !== gy) {
      play('tick');
      set([gx, gy]);
    }
  };

  return (
    <View style={{ gap: 12 }}>
      <Chalk
        w={320}
        h={220}
        handles={[
          { id: 'A', x: px(A[0]), y: py(A[1]) },
          { id: 'B', x: px(B[0]), y: py(B[1]) },
        ]}
        onDrag={drag}
      >
        <Line x1={OX} y1={0} x2={OX} y2={220} stroke={CH.axis} />
        <Line x1={0} y1={OY} x2={320} y2={OY} stroke={CH.axis} />
        <Label x={312} y={OY - 6} color={CH.dim} anchor="end">x</Label>
        <Label x={OX + 6} y={12} color={CH.dim}>y</Label>
        {/* zložky: najprv vodorovne, potom zvislo */}
        {ab[0] !== 0 && <Line x1={px(A[0])} y1={py(A[1])} x2={px(B[0])} y2={py(A[1])} stroke={CH.b} strokeWidth={2.5} strokeDasharray="5 4" />}
        {ab[1] !== 0 && <Line x1={px(B[0])} y1={py(A[1])} x2={px(B[0])} y2={py(B[1])} stroke={CH.c} strokeWidth={2.5} strokeDasharray="5 4" />}
        {ab[0] !== 0 && (
          <Label x={(px(A[0]) + px(B[0])) / 2} y={py(A[1]) + (ab[1] > 0 ? 15 : -7)} color={CH.b} anchor="middle" size={12}>
            {sk(ab[0])}
          </Label>
        )}
        {ab[1] !== 0 && (
          <Label x={px(B[0]) + (ab[0] >= 0 ? 7 : -7)} y={(py(A[1]) + py(B[1])) / 2 + 4} color={CH.c} anchor={ab[0] >= 0 ? 'start' : 'end'} size={12}>
            {sk(ab[1])}
          </Label>
        )}
        {(ab[0] !== 0 || ab[1] !== 0) && <Arrow x1={px(A[0])} y1={py(A[1])} x2={px(B[0])} y2={py(B[1])} color={CH.a} w={3.5} />}
        <Circle cx={px(A[0])} cy={py(A[1])} r={12} fill={CH.a} fillOpacity={0.22} />
        <Circle cx={px(A[0])} cy={py(A[1])} r={6} fill={CH.a} />
        <Circle cx={px(B[0])} cy={py(B[1])} r={12} fill={CH.d} fillOpacity={0.22} />
        <Circle cx={px(B[0])} cy={py(B[1])} r={6} fill={CH.d} />
        <Label x={px(A[0]) - 9} y={py(A[1]) - 9} color={CH.a} anchor="end" size={13}>
          A
        </Label>
        <Label x={px(B[0]) + 9} y={py(B[1]) - 9} color={CH.d} size={13}>
          B
        </Label>
      </Chalk>
      <Text style={T.small}>Chyť bod A alebo B a ťahaj ho po mriežke.</Text>
      <Eq
        size={17}
        parts={[
          'A = [', [`${A[0]}, ${A[1]}`, C.gold], ']   B = [', [`${B[0]}, ${B[1]}`, C.teal], ']',
        ]}
      />
      <Eq
        size={19}
        parts={[
          'AB = B − A = (',
          [`${B[0]}`, C.teal], ' − ', [`${A[0]}`, C.gold], ', ', [`${B[1]}`, C.teal], ' − ', [`${A[1]}`, C.gold],
          ') = (', [sk(ab[0]), C.blue], ', ', [sk(ab[1]), '#B4407A'], ')',
        ]}
      />
      <Eq size={16} parts={[`|AB| = √(${par(ab[0])}² + ${par(ab[1])}²) = √${ab[0] ** 2 + ab[1] ** 2} ≈ ${sk(len)}`]} />
      <View style={{ gap: 8 }}>
        {GOALS.map((g, i) =>
          i <= gi ? (
            <Goal key={i} done={i < gi}>
              Nastav body tak, aby AB = ({sk(g[0])}, {sk(g[1])})
            </Goal>
          ) : null,
        )}
        <Stamp show={allDone} text="VIEŠ TO" />
      </View>
    </View>
  );
}

// ───────────────────────── skalárny súčin a uhol ─────────────────────────

export function VecDot({ onWin }: { onWin?: () => void }) {
  const [phi, setPhi] = useState(40);
  const [seen, setSeen] = useState({ kolme: false, tupy: false });
  const lu = 3;
  const lv = 2.5;
  const r = (phi * Math.PI) / 180;
  const v = [lv * Math.cos(r), lv * Math.sin(r)];
  const dot = lu * v[0];
  const kolme = Math.abs(phi - 90) < 0.5;
  const kind = kolme ? 'KOLMÉ' : phi < 90 ? 'OSTRÝ UHOL' : 'TUPÝ UHOL';
  const ox = 140;
  const oy = 150;
  const s = 36;
  const set = (p: number) => {
    setPhi(p);
    const k = Math.abs(p - 90) < 0.5;
    if (k && !seen.kolme) {
      play('correct');
      haptic('ok');
    }
    const n = { kolme: seen.kolme || k, tupy: seen.tupy || p > 95 };
    if (n.kolme !== seen.kolme || n.tupy !== seen.tupy) {
      setSeen(n);
      if (n.kolme && n.tupy) onWin?.();
    }
  };
  const tip = { x: ox + v[0] * s, y: oy - v[1] * s };
  return (
    <View style={{ gap: 12 }}>
      <Chalk
        w={320}
        h={200}
        handles={[{ id: 'v', x: tip.x, y: tip.y }]}
        onDrag={(_id, x, y) => {
          let a = (Math.atan2(oy - y, x - ox) * 180) / Math.PI;
          if (a < 0) a = a < -90 ? 180 : 0;
          a = Math.round(a);
          if (Math.abs(a - 90) <= 2) a = 90;
          if (a !== phi) set(a);
        }}
      >
        {/* tieň (priemet) v na u */}
        <Line x1={tip.x} y1={tip.y} x2={tip.x} y2={oy} stroke={CH.dim} strokeDasharray="4 4" />
        <Line x1={ox} y1={oy + 1} x2={ox + v[0] * s} y2={oy + 1} stroke={dot >= 0 ? CH.d : CH.e} strokeWidth={7} strokeOpacity={0.55} />
        <Arrow x1={ox} y1={oy} x2={ox + lu * s} y2={oy} color={CH.a} w={3.5} />
        <Arrow x1={ox} y1={oy} x2={tip.x} y2={tip.y} color={CH.b} w={3.5} />
        <Circle cx={tip.x} cy={tip.y} r={13} fill={CH.b} fillOpacity={0.2} />
        <Path
          d={`M${ox + 22} ${oy} A22 22 0 0 0 ${ox + 22 * Math.cos(r)} ${oy - 22 * Math.sin(r)}`}
          stroke={kolme ? CH.d : CH.c}
          strokeWidth={2}
          fill="none"
        />
        {kolme && <Rect x={ox} y={oy - 12} width={12} height={12} fill="none" stroke={CH.d} strokeWidth={2} />}
        <Label x={ox + lu * s + 4} y={oy + 16} color={CH.a} size={13}>u</Label>
        <Label x={tip.x + 8} y={tip.y - 6} color={CH.b} size={13}>v</Label>
        <Label x={10} y={42} color={kolme ? CH.d : CH.c}>φ = {phi}°</Label>
        <Label x={10} y={22} color={kolme ? CH.d : phi < 90 ? CH.a : CH.e} size={15}>{kind}</Label>
        <Label x={10} y={190} color={CH.dim} size={10}>hrubá čiara = tieň v na smer u</Label>
      </Chalk>
      <Slider label="Uhol φ medzi u a v" value={phi} min={0} max={180} step={1} unit="°" fmt={(x) => String(x)} onChange={set} marks={[{ v: 0, l: '0°' }, { v: 90, l: '90°' }, { v: 180, l: '180°' }]} />
      <Eq size={17} parts={['u·v = |u|·|v|·cos φ = 3 · 2,5 · cos ', [`${phi}°`, '#B4407A']]} />
      <Eq size={22} parts={['u·v = ', [sk(dot, 2), kolme ? C.good : dot > 0 ? C.blue : C.orange]]} />
      <Text style={T.small}>
        Po zložkách: u = (3, 0), v = ({sk(v[0])}, {sk(v[1])}), u₁v₁ + u₂v₂ = 3·{par(v[0])} + 0·{par(v[1])} = {sk(dot)}. Vyjde to isté.
      </Text>
      <View style={{ gap: 8 }}>
        <Goal done={seen.kolme}>Nájdi uhol, pri ktorom je u·v = 0</Goal>
        <Goal done={seen.tupy}>Sprav skalárny súčin záporný</Goal>
        <Stamp show={seen.kolme && seen.tupy} />
      </View>
    </View>
  );
}

// ───────────────────────── vektorový súčin: zakry stĺpec ─────────────────────────

const PRESETS: [number[], number[]][] = [
  [
    [1, 2, 3],
    [4, 5, 6],
  ],
  [
    [2, -1, 0],
    [1, 3, 2],
  ],
  [
    [3, 0, -2],
    [-1, 4, 1],
  ],
];

export function CrossCover({ onWin }: { onWin?: () => void }) {
  const [pi, setPi] = useState(0);
  const [u, v] = PRESETS[pi];
  const [cover, setCover] = useState<number | null>(null);
  const [done, setDone] = useState<boolean[]>([false, false, false]);
  const res = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
  const all = done.every(Boolean);
  useOnce(all, () => onWin?.());

  const tap = (c: number) => {
    play('pop');
    setCover(c);
    setDone((d) => d.map((x, i) => x || i === c));
  };
  const cols = [0, 1, 2].filter((c) => c !== cover);
  const cw = 70;
  const ch = 52;
  const x0 = 64;
  const y0 = 10;
  const cx = (c: number) => x0 + c * cw + cw / 2;
  const cy = (r: number) => y0 + r * ch + ch / 2;
  const sub = '₁₂₃';
  let expl = '';
  if (cover !== null) {
    const [a, b] = cols;
    const main = u[a] * v[b] - u[b] * v[a];
    if (cover === 1)
      expl = `2. zložka: zakry 2. stĺpec, krížik u₁v₃ − u₃v₁ = ${par(u[0])}·${par(v[2])} − ${par(u[2])}·${par(v[0])} = ${sk(main)}, a OTOČ znamienko → ${sk(-main)}`;
    else expl = `${cover + 1}. zložka: zakry ${cover + 1}. stĺpec, krížik u${sub[a]}v${sub[b]} − u${sub[b]}v${sub[a]} = ${par(u[a])}·${par(v[b])} − ${par(u[b])}·${par(v[a])} = ${sk(main)}`;
  }
  return (
    <View style={{ gap: 12 }}>
      <View style={{ backgroundColor: C.sheet, borderWidth: 2, borderColor: C.ink, borderRadius: 6, width: '100%', maxWidth: 440, alignSelf: 'center' }}>
        <Svg viewBox="0 0 300 124" style={{ width: '100%', aspectRatio: 300 / 124 }}>
          {[0, 1].map((r) => (
            <SvgText key={r} x={30} y={cy(r) + 7} fontSize={20} fontFamily={F.monoBold} fill={r ? C.teal : C.orange} textAnchor="middle">
              {r ? 'v' : 'u'}
            </SvgText>
          ))}
          {[0, 1, 2].map((c) =>
            [0, 1].map((r) => {
              const covered = c === cover;
              return (
                <G key={`${r}${c}`}>
                  <Rect x={x0 + c * cw + 4} y={y0 + r * ch + 4} width={cw - 8} height={ch - 8} rx={4} fill={covered ? C.ink : C.paper} stroke={C.ink} strokeWidth={1.5} />
                  {!covered && (
                    <SvgText x={cx(c)} y={cy(r) + 7} fontSize={20} fontFamily={F.monoBold} fill={C.ink} textAnchor="middle">
                      {sk(r ? v[c] : u[c])}
                    </SvgText>
                  )}
                </G>
              );
            }),
          )}
          {cover !== null && (
            <G>
              <Line x1={cx(cols[0]) - 12} y1={cy(0) - 8} x2={cx(cols[1]) + 12} y2={cy(1) + 8} stroke={C.good} strokeWidth={4} strokeOpacity={0.75} />
              <Line x1={cx(cols[1]) + 12} y1={cy(0) - 8} x2={cx(cols[0]) - 12} y2={cy(1) + 8} stroke={C.bad} strokeWidth={4} strokeOpacity={0.75} />
              <SvgText x={cx(cols[1]) + 26} y={cy(1) + 18} fontSize={16} fontFamily={F.monoBold} fill={C.good}>+</SvgText>
              <SvgText x={cx(cols[0]) - 34} y={cy(1) + 18} fontSize={16} fontFamily={F.monoBold} fill={C.bad}>−</SvgText>
            </G>
          )}
        </Svg>
      </View>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        {[0, 1, 2].map((c) => (
          <Toggle key={c} on={cover === c} label={`${c + 1}. zložka`} onPress={() => tap(c)} color={C.ink} />
        ))}
      </View>
      {cover !== null ? <Text style={[T.lead, { fontFamily: F.mono, fontSize: 16, lineHeight: 24 }]}>{expl}</Text> : <Text style={T.small}>Ťukni na zložku. Jej stĺpec sa zakryje a zo zvyšných štyroch čísel urobíš krížik: zelená uhlopriečka mínus červená.</Text>}
      <Eq
        size={20}
        parts={[
          'u × v = (',
          [done[0] ? sk(res[0]) : '?', done[0] ? C.ink : C.rule], ', ',
          [done[1] ? sk(res[1]) : '?', done[1] ? C.ink : C.rule], ', ',
          [done[2] ? sk(res[2]) : '?', done[2] ? C.ink : C.rule], ')',
        ]}
      />
      {all && (
        <Verdict ok>
          Kontrola kolmosti: (u × v)·u = {par(res[0])}·{par(u[0])} + {par(res[1])}·{par(u[1])} + {par(res[2])}·{par(u[2])} ={' '}
          {res[0] * u[0] + res[1] * u[1] + res[2] * u[2]}. Nula, takže u × v je naozaj kolmý na u.
        </Verdict>
      )}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Stamp show={all} />
        <View style={{ flex: 1 }} />
        <Toggle
          on={false}
          label="Iné čísla"
          onPress={() => {
            setPi((pi + 1) % PRESETS.length);
            setCover(null);
            setDone([false, false, false]);
          }}
        />
      </View>
    </View>
  );
}

// ───────────────────────── BOSS: obsah trojuholníka ─────────────────────────

type BossTask = { title: string; hint: string; labels: string[]; answer: number[]; tol?: number };

const BOSS_SETS: { A: number[]; B: number[]; C: number[] }[] = [
  { A: [1, 0, 2], B: [3, 0, 2], C: [1, 3, 6] },
  { A: [0, 1, 1], B: [4, 1, 1], C: [0, 4, 5] },
];

function makeBoss(set: { A: number[]; B: number[]; C: number[] }): BossTask[] {
  const { A, B, C: Cc } = set;
  const ab = B.map((b, i) => b - A[i]);
  const ac = Cc.map((c, i) => c - A[i]);
  const cr = [ab[1] * ac[2] - ab[2] * ac[1], ab[2] * ac[0] - ab[0] * ac[2], ab[0] * ac[1] - ab[1] * ac[0]];
  const len = Math.hypot(...cr);
  return [
    { title: 'Vektor AB = B − A', hint: `Koniec mínus začiatok: (${B[0]} − ${A[0]}, ${B[1]} − ${A[1]}, ${B[2]} − ${A[2]})`, labels: ['x', 'y', 'z'], answer: ab },
    { title: 'Vektor AC = C − A', hint: `(${Cc[0]} − ${A[0]}, ${Cc[1]} − ${A[1]}, ${Cc[2]} − ${A[2]})`, labels: ['x', 'y', 'z'], answer: ac },
    {
      title: 'Vektorový súčin AB × AC',
      hint: `Zakry stĺpce: 1. ${par(ab[1])}·${par(ac[2])} − ${par(ab[2])}·${par(ac[1])}; 2. ${par(ab[2])}·${par(ac[0])} − ${par(ab[0])}·${par(ac[2])}; 3. ${par(ab[0])}·${par(ac[1])} − ${par(ab[1])}·${par(ac[0])}`,
      labels: ['1.', '2.', '3.'],
      answer: cr,
    },
    { title: 'Dĺžka |AB × AC|', hint: `√(${par(cr[0])}² + ${par(cr[1])}² + ${par(cr[2])}²) = √${cr[0] ** 2 + cr[1] ** 2 + cr[2] ** 2}`, labels: ['|·|'], answer: [len], tol: 0.02 },
    { title: 'Obsah S = ½·|AB × AC|', hint: `Polovica z ${sk(len)}`, labels: ['S'], answer: [len / 2], tol: 0.02 },
  ];
}

export function BossTriangle({ onWin }: { onWin?: () => void }) {
  const [si, setSi] = useState(0);
  const set = BOSS_SETS[si];
  const tasks = useMemo(() => makeBoss(set), [set]);
  const [k, setK] = useState(0);
  const [vals, setVals] = useState<string[]>(['', '', '']);
  const [state, setState] = useState<'ok' | 'bad' | null>(null);
  const [tries, setTries] = useState(0);
  const shake = useRef(new Animated.Value(0)).current;
  const won = k >= tasks.length;
  const hp = 1 - k / tasks.length;
  const task = tasks[Math.min(k, tasks.length - 1)];

  const check = () => {
    const nums = task.answer.map((_, i) => parseNum(vals[i]));
    const ok = nums.every((n, i) => Math.abs(n - task.answer[i]) <= (task.tol ?? 1e-9));
    if (ok) {
      haptic('ok');
      setState('ok');
      setTimeout(() => {
        setK(k + 1);
        setVals(['', '', '']);
        setState(null);
        setTries(0);
        if (k + 1 >= tasks.length) {
          play('win');
          onWin?.();
        }
      }, 600);
    } else {
      haptic('bad');
      setState('bad');
      setTries(tries + 1);
      shake.setValue(0);
      Animated.sequence([8, -8, 6, -6, 0].map((x) => Animated.timing(shake, { toValue: x, duration: 45, useNativeDriver: ND }))).start();
    }
  };

  return (
    <View style={{ gap: 14 }}>
      <View style={{ gap: 6 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontFamily: F.monoBold, fontSize: 13, letterSpacing: 1, color: C.bad }}>BOSS · OBSAH TROJUHOLNÍKA</Text>
          <Text style={{ fontFamily: F.mono, fontSize: 13, color: C.ink2 }}>
            krok {Math.min(k + 1, tasks.length)}/{tasks.length}
          </Text>
        </View>
        <View style={{ height: 14, borderWidth: 2, borderColor: C.ink, borderRadius: 3, backgroundColor: C.sheet }}>
          <View style={{ width: `${hp * 100}%`, height: '100%', backgroundColor: C.bad }} />
        </View>
      </View>
      <Text style={T.lead}>
        Vypočítaj obsah trojuholníka A = [{set.A.join(', ')}], B = [{set.B.join(', ')}], C = [{set.C.join(', ')}]. Každý správny krok uberie bossovi život.
      </Text>
      {tasks.slice(0, k).map((t, i) => (
        <Text key={i} style={{ fontFamily: F.mono, fontSize: 15, color: C.good }}>
          ✓ {t.title} = {t.answer.length > 1 ? `(${t.answer.map((a) => sk(a)).join(', ')})` : sk(t.answer[0])}
        </Text>
      ))}
      {!won ? (
        <Animated.View style={{ gap: 10, transform: [{ translateX: shake }] }}>
          <Text style={{ fontFamily: F.head, fontSize: 20, color: C.ink }}>{task.title}</Text>
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            {task.answer.map((_, i) => (
              <View key={i} style={{ alignItems: 'center', gap: 2 }}>
                <NumIn
                  value={vals[i]}
                  width={task.answer.length > 1 ? 64 : 100}
                  state={state}
                  onChange={(s) => {
                    setState(null);
                    setVals((v) => v.map((x, j) => (j === i ? s : x)));
                  }}
                />
                <Text style={{ fontFamily: F.mono, fontSize: 12, color: C.ink2 }}>{task.labels[i]}</Text>
              </View>
            ))}
            <Toggle on label="Skontroluj" color={C.orange} onPress={check} />
          </View>
          {state === 'bad' && <Verdict ok={false}>Ešte nie. Nápoveda: {task.hint}</Verdict>}
          {tries >= 2 && state !== 'ok' && (
            <Toggle
              on={false}
              label="Ukáž výsledok"
              onPress={() => {
                setVals(task.answer.map((a) => sk(a, 2).replace('−', '-')));
                setState(null);
              }}
            />
          )}
          {task.tol ? <Text style={T.small}>Desatinné číslo zapíš na 2 miesta, napr. 7,21.</Text> : null}
        </Animated.View>
      ) : (
        <View style={{ gap: 10 }}>
          <Verdict ok>
            Boss porazený! S = ½·|AB × AC| = {sk(tasks[4].answer[0])}. Presne tento postup je na skúške.
          </Verdict>
          <Stamp show text="BOSS PORAZENÝ" color={C.bad} />
          <Toggle
            on={false}
            label="Ďalší boss"
            onPress={() => {
              setSi((si + 1) % BOSS_SETS.length);
              setK(0);
              setVals(['', '', '']);
            }}
          />
        </View>
      )}
    </View>
  );
}

void Polygon;
