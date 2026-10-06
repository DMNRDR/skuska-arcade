import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Circle, Line, Path, Rect } from 'react-native-svg';
import { Arrow, fnPath, Label } from '../../components/diagrams';
import { C } from '../../components/ui';
import { CH, Chalk, Eq, Goal, par, sk, Slider, Stamp, T, Toggle, useOnce, Verdict } from '../kit';

// Spoločná sústava súradníc pre grafy na tabuli 320 × 220.
function axes(x0: number, x1: number, y0: number, y1: number, w = 320, h = 220) {
  const sx = (x: number) => ((x - x0) / (x1 - x0)) * w;
  const sy = (y: number) => h - ((y - y0) / (y1 - y0)) * h;
  const ix = (px: number) => x0 + (px / w) * (x1 - x0);
  const Ax = () => (
    <>
      <Line x1={0} y1={sy(0)} x2={w} y2={sy(0)} stroke={CH.axis} />
      <Line x1={sx(0)} y1={0} x2={sx(0)} y2={h} stroke={CH.axis} />
    </>
  );
  return { sx, sy, ix, Ax };
}

// ───────────────────────── derivácia: sečnica sa mení na dotyčnicu ─────────────────────────

export function SecantTangent({ onWin }: { onWin?: () => void }) {
  const f = (x: number) => (x * x) / 2;
  const [x0, setX0] = useState(1);
  const [h, setH] = useState(2);
  const { sx, sy, ix, Ax } = axes(-3, 4, -1, 7);
  const slope = (f(x0 + h) - f(x0)) / h;
  const exact = x0;
  const close = h <= 0.05;
  const [seen, setSeen] = useState<number[]>([]);
  useOnce(seen.length >= 2, () => onWin?.());
  const setHh = (v: number) => {
    setH(v);
    if (v <= 0.05 && !seen.includes(x0)) setSeen([...seen, x0]);
  };
  return (
    <View style={{ gap: 12 }}>
      <Chalk
        handles={[{ id: 'x0', x: sx(x0), y: sy(f(x0)) }]}
        onDrag={(_i, px) => {
          const v = Math.round(ix(px) * 2) / 2;
          if (v >= -2.5 && v <= 2.5 && v !== x0) {
            setX0(v);
            if (h <= 0.05 && !seen.includes(v)) setSeen([...seen, v]);
          }
        }}
      >
        <Ax />
        <Path d={fnPath(f, -3, 4, sx, sy)} stroke={CH.a} strokeWidth={3} fill="none" />
        {/* sečnica cez x0 a x0 + h */}
        <Path d={fnPath((x) => f(x0) + slope * (x - x0), -3, 4, sx, sy)} stroke={close ? CH.d : CH.b} strokeWidth={2.2} fill="none" />
        <Line x1={sx(x0)} y1={sy(f(x0))} x2={sx(x0 + h)} y2={sy(f(x0))} stroke={CH.c} strokeDasharray="4 3" strokeWidth={2} />
        <Line x1={sx(x0 + h)} y1={sy(f(x0))} x2={sx(x0 + h)} y2={sy(f(x0 + h))} stroke={CH.e} strokeDasharray="4 3" strokeWidth={2} />
        <Circle cx={sx(x0 + h)} cy={sy(f(x0 + h))} r={5} fill={CH.b} />
        <Circle cx={sx(x0)} cy={sy(f(x0))} r={13} fill={CH.d} fillOpacity={0.2} />
        <Circle cx={sx(x0)} cy={sy(f(x0))} r={6} fill={CH.d} />
        <Label x={8} y={18} color={CH.a}>f(x) = x²/2</Label>
        <Label x={8} y={36} color={close ? CH.d : CH.b}>{close ? 'dotyčnica' : 'sečnica'}</Label>
        {h > 0.4 && (
          <Label x={(sx(x0) + sx(x0 + h)) / 2} y={sy(f(x0)) + 15} color={CH.c} anchor="middle">h</Label>
        )}
      </Chalk>
      <Slider label="Krok h" value={h} min={0.01} max={2.5} step={0.01} onChange={setHh} marks={[{ v: 0.01, l: '0' }, { v: 2.5, l: '2,5' }]} />
      <Eq size={17} parts={['sklon = (f(x₀ + h) − f(x₀)) / h']} />
      <Eq size={19} parts={[`= (${sk(f(x0 + h), 3)} − ${sk(f(x0), 3)}) / ${sk(h)} = `, [sk(slope, 3), close ? C.good : C.blue]]} />
      <Text style={T.small}>
        Keď h → 0, sklon sečnice sa blíži k f′({sk(x0)}) = x₀ = {sk(exact)}. To je derivácia: sklon dotyčnice. Zelený bod x₀ môžeš ťahať.
      </Text>
      <Goal done={seen.length >= 1}>Stiahni h takmer na nulu</Goal>
      <Goal done={seen.length >= 2}>Presuň bod x₀ inam a sprav to znova</Goal>
      <Stamp show={seen.length >= 2} />
    </View>
  );
}

// ───────────────────────── integrál: obdĺžniky ─────────────────────────

export function Riemann({ onWin }: { onWin?: () => void }) {
  const f = (x: number) => (x * x) / 2 + 0.5;
  const a = 0;
  const b = 3;
  const exact = (b ** 3 - a ** 3) / 6 + 0.5 * (b - a); // ∫ x²/2 + 1/2 = x³/6 + x/2
  const [n, setN] = useState(3);
  const { sx, sy, Ax } = axes(-0.5, 3.8, -0.6, 5.6);
  const dx = (b - a) / n;
  let sum = 0;
  const rects = Array.from({ length: n }, (_, i) => {
    const xm = a + (i + 0.5) * dx;
    sum += f(xm) * dx;
    return <Rect key={i} x={sx(a + i * dx)} y={sy(f(xm))} width={sx(a + (i + 1) * dx) - sx(a + i * dx)} height={sy(0) - sy(f(xm))} fill={CH.b} fillOpacity={0.3} stroke={CH.b} strokeWidth={1} />;
  });
  const err = Math.abs(sum - exact);
  useOnce(n >= 40, () => onWin?.());
  return (
    <View style={{ gap: 12 }}>
      <Chalk>
        <Ax />
        {rects}
        <Path d={fnPath(f, -0.5, 3.6, sx, sy)} stroke={CH.a} strokeWidth={3} fill="none" />
        <Label x={8} y={18} color={CH.a}>f(x) = x²/2 + 1/2</Label>
        <Label x={sx(3)} y={sy(0) + 14} color={CH.dim} anchor="middle">3</Label>
        <Label x={sx(0) + 4} y={sy(0) + 14} color={CH.dim}>0</Label>
      </Chalk>
      <Slider label="Počet obdĺžnikov n" value={n} min={1} max={60} step={1} fmt={(v) => String(v)} onChange={setN} />
      <Eq size={18} parts={['súčet obsahov = ', [sk(sum, 4), C.blue]]} />
      <Eq size={18} parts={['∫₀³ f(x) dx = [x³/6 + x/2]₀³ = 4,5 + 1,5 = ', [sk(exact, 4), C.good]]} />
      <Text style={T.small}>
        Každý obdĺžnik má šírku Δx = 3/n = {sk(dx, 3)} a výšku f v strede úseku. Čím viac obdĺžnikov, tým menšia chyba: teraz {sk(err, 4)}.
      </Text>
      <Goal done={n >= 40}>Daj aspoň 40 obdĺžnikov a sleduj, ako sa súčet blíži k 6</Goal>
      <Stamp show={n >= 40} />
    </View>
  );
}

// ───────────────────────── limita: x sa blíži k a ─────────────────────────

export function LimitApproach({ onWin }: { onWin?: () => void }) {
  const f = (x: number) => (x === 0 ? NaN : Math.sin(x) / x);
  const [d, setD] = useState(2);
  const [side, setSide] = useState<1 | -1>(1);
  const x = side * d;
  const { sx, sy, Ax } = axes(-7, 7, -0.5, 1.4);
  const [seen, setSeen] = useState({ l: false, r: false });
  const near = d <= 0.02;
  useOnce(seen.l && seen.r, () => onWin?.());
  const upd = (v: number, s: 1 | -1) => {
    setD(v);
    if (v <= 0.02) setSeen((o) => ({ l: o.l || s < 0, r: o.r || s > 0 }));
  };
  return (
    <View style={{ gap: 12 }}>
      <Chalk>
        <Ax />
        <Path d={fnPath(f, -7, 7, sx, sy, 300)} stroke={CH.a} strokeWidth={3} fill="none" />
        <Circle cx={sx(0)} cy={sy(1)} r={5} fill={CH.bg} stroke={CH.d} strokeWidth={2} />
        <Line x1={sx(x)} y1={sy(0)} x2={sx(x)} y2={sy(f(x))} stroke={CH.b} strokeDasharray="4 3" />
        <Line x1={sx(0)} y1={sy(f(x))} x2={sx(x)} y2={sy(f(x))} stroke={CH.c} strokeDasharray="4 3" />
        <Circle cx={sx(x)} cy={sy(f(x))} r={6} fill={CH.b} />
        <Label x={8} y={18} color={CH.a}>f(x) = sin x / x</Label>
        <Label x={sx(0) + 8} y={sy(1) - 8} color={CH.d}>diera: f(0) neexistuje</Label>
      </Chalk>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Toggle on={side < 0} label="zľava (x < 0)" onPress={() => setSide(-1)} />
        <Toggle on={side > 0} label="sprava (x > 0)" onPress={() => setSide(1)} />
      </View>
      <Slider label="Vzdialenosť od 0" value={d} min={0.01} max={6} step={0.01} onChange={(v) => upd(v, side)} />
      <Eq size={18} parts={[`f(${sk(x, 2)}) = sin(${sk(x, 2)}) / ${par(x, 2)} = `, [sk(f(x), 5), near ? C.good : C.blue]]} />
      <Text style={T.small}>Hodnota v nule neexistuje (0/0), ale keď sa k nule blížiš z oboch strán, hodnoty idú k 1. Preto lim (x→0) sin x / x = 1.</Text>
      <Goal done={seen.r}>Priblíž sa k nule sprava</Goal>
      <Goal done={seen.l}>A teraz zľava</Goal>
      <Stamp show={seen.l && seen.r} text="LIMITA = 1" />
    </View>
  );
}

// ───────────────────────── priebeh: znamienko derivácie ─────────────────────────

export function MonotonyDrag({ onWin }: { onWin?: () => void }) {
  const f = (x: number) => x ** 3 - 3 * x;
  const df = (x: number) => 3 * x * x - 3;
  const [x, setX] = useState(-2);
  const { sx, sy, ix, Ax } = axes(-2.6, 2.6, -4, 4);
  const d = df(x);
  const state = Math.abs(d) < 0.08 ? 'stacionárny bod' : d > 0 ? 'rastie' : 'klesá';
  const [seen, setSeen] = useState<Set<string>>(new Set());
  const all = seen.has('max') && seen.has('min');
  useOnce(all, () => onWin?.());
  return (
    <View style={{ gap: 12 }}>
      <Chalk
        handles={[{ id: 'p', x: sx(x), y: sy(f(x)) }]}
        onDrag={(_i, px) => {
          let v = Math.max(-2.3, Math.min(2.3, ix(px)));
          if (Math.abs(v + 1) < 0.08) v = -1;
          if (Math.abs(v - 1) < 0.08) v = 1;
          v = Math.round(v * 100) / 100;
          setX(v);
          if (v === -1 || v === 1) {
            const k = v === -1 ? 'max' : 'min';
            if (!seen.has(k)) setSeen(new Set([...seen, k]));
          }
        }}
      >
        <Ax />
        <Path d={fnPath(f, -2.6, 2.6, sx, sy)} stroke={CH.a} strokeWidth={3} fill="none" />
        {/* úseky podľa znamienka f' */}
        <Rect x={0} y={212} width={sx(-1)} height={8} fill={CH.d} fillOpacity={0.6} />
        <Rect x={sx(-1)} y={212} width={sx(1) - sx(-1)} height={8} fill={CH.e} fillOpacity={0.6} />
        <Rect x={sx(1)} y={212} width={320 - sx(1)} height={8} fill={CH.d} fillOpacity={0.6} />
        <Path d={fnPath((t) => f(x) + d * (t - x), x - 0.7, x + 0.7, sx, sy)} stroke={CH.b} strokeWidth={2.5} fill="none" />
        <Circle cx={sx(x)} cy={sy(f(x))} r={13} fill={CH.b} fillOpacity={0.2} />
        <Circle cx={sx(x)} cy={sy(f(x))} r={6} fill={CH.b} />
        {seen.has('max') && <Label x={sx(-1)} y={sy(2) - 10} color={CH.d} anchor="middle">max</Label>}
        {seen.has('min') && <Label x={sx(1)} y={sy(-2) + 20} color={CH.d} anchor="middle">min</Label>}
        <Label x={8} y={18} color={CH.a}>f(x) = x³ − 3x</Label>
        {Math.abs(d) > 0.08 && <Arrow x1={300} y1={40} x2={300} y2={d > 0 ? 20 : 60} color={d > 0 ? CH.d : CH.e} />}
      </Chalk>
      <Text style={T.small}>Ťahaj modrý bod po krivke. Modrá úsečka je dotyčnica, jej sklon je f′(x).</Text>
      <Eq size={18} parts={[`f′(x) = 3x² − 3 = 3·${par(x)}² − 3 = `, [sk(d), Math.abs(d) < 0.08 ? C.good : d > 0 ? C.teal : C.orange]]} />
      <Eq size={20} parts={['→ funkcia ', [state, Math.abs(d) < 0.08 ? C.good : d > 0 ? C.teal : C.orange]]} />
      <Goal done={seen.has('max')}>Nájdi miesto, kde prestane rásť a začne klesať</Goal>
      <Goal done={seen.has('min')}>Nájdi miesto, kde prestane klesať a začne rásť</Goal>
      {all && <Verdict ok>f′(x) = 0 pri x = ±1. V x = −1 sa rast mení na pokles (lokálne maximum), v x = 1 pokles na rast (lokálne minimum).</Verdict>}
      <Stamp show={all} />
    </View>
  );
}

// ───────────────────────── funkcie: posuny a natiahnutie ─────────────────────────

export function ParabolaShift({ onWin }: { onWin?: () => void }) {
  const [a, setA] = useState(1);
  const [p, setP] = useState(0);
  const [q, setQ] = useState(0);
  const { sx, sy, Ax } = axes(-5, 5, -4, 6);
  const target = { a: -1, p: 2, q: 3 };
  const hit = a === target.a && p === target.p && q === target.q;
  useOnce(hit, () => onWin?.());
  const g = (x: number) => a * (x - p) ** 2 + q;
  return (
    <View style={{ gap: 12 }}>
      <Chalk>
        <Ax />
        <Path d={fnPath((x) => x * x, -5, 5, sx, sy)} stroke={CH.dim} strokeWidth={1.5} strokeDasharray="5 4" fill="none" />
        <Path d={fnPath((x) => target.a * (x - target.p) ** 2 + target.q, -5, 5, sx, sy)} stroke={CH.c} strokeWidth={6} strokeOpacity={0.25} fill="none" />
        <Path d={fnPath(g, -5, 5, sx, sy)} stroke={CH.a} strokeWidth={3} fill="none" />
        <Circle cx={sx(p)} cy={sy(q)} r={5} fill={CH.b} />
        <Label x={sx(p) + 8} y={sy(q) + (a > 0 ? 16 : -8)} color={CH.b}>vrchol [{sk(p)}, {sk(q)}]</Label>
        <Label x={8} y={18} color={CH.dim}>čiarkovane: y = x²</Label>
        <Label x={8} y={36} color={CH.c}>ružový tieň: cieľ</Label>
      </Chalk>
      <Eq size={20} parts={['y = ', [sk(a), C.orange], '·(x − ', [par(p), C.blue], ')² + ', [par(q), C.teal]]} />
      <Slider label="a (natiahnutie, znamienko otočí)" value={a} min={-2} max={2} step={0.5} onChange={(v) => setA(v === 0 ? 0.5 : v)} color={C.orange} />
      <Slider label="p (posun doprava)" value={p} min={-3} max={3} step={1} onChange={setP} color={C.blue} />
      <Slider label="q (posun hore)" value={q} min={-3} max={4} step={1} onChange={setQ} color={C.teal} />
      <Goal done={hit}>Prekry ružový tieň: parabola otočená dole s vrcholom v [2, 3]</Goal>
      {hit && <Verdict ok>y = −(x − 2)² + 3. Pozor: (x − 2) posúva DOPRAVA, lebo vrchol je tam, kde je zátvorka nulová.</Verdict>}
      <Stamp show={hit} />
    </View>
  );
}

// ───────────────────────── geometria: parametrická priamka ─────────────────────────

export function LineParam({ onWin }: { onWin?: () => void }) {
  const A = [1, 1];
  const u = [2, 1];
  const [t, setT] = useState(0);
  const X = [A[0] + t * u[0], A[1] + t * u[1]];
  const { sx, sy, Ax } = axes(-4, 8, -2, 6);
  const [seen, setSeen] = useState({ neg: false, two: false });
  useOnce(seen.neg && seen.two, () => onWin?.());
  return (
    <View style={{ gap: 12 }}>
      <Chalk>
        <Ax />
        <Path d={fnPath((x) => A[1] + ((x - A[0]) / u[0]) * u[1], -4, 8, sx, sy)} stroke={CH.dim} strokeWidth={1.5} strokeDasharray="5 4" fill="none" />
        <Arrow x1={sx(A[0])} y1={sy(A[1])} x2={sx(A[0] + u[0])} y2={sy(A[1] + u[1])} color={CH.a} w={3} />
        {t !== 0 && <Arrow x1={sx(A[0])} y1={sy(A[1])} x2={sx(X[0])} y2={sy(X[1])} color={CH.b} w={2} />}
        <Circle cx={sx(A[0])} cy={sy(A[1])} r={5} fill={CH.a} />
        <Circle cx={sx(X[0])} cy={sy(X[1])} r={7} fill={CH.c} />
        <Label x={sx(A[0]) - 6} y={sy(A[1]) + 16} color={CH.a} anchor="end">A</Label>
        <Label x={sx(A[0] + u[0]) + 4} y={sy(A[1] + u[1]) - 6} color={CH.a}>u</Label>
        <Label x={sx(X[0]) + 9} y={sy(X[1]) - 8} color={CH.c}>X</Label>
      </Chalk>
      <Slider label="Parameter t" value={t} min={-2} max={3} step={0.5} onChange={(v) => {
        setT(v);
        setSeen((s) => ({ neg: s.neg || v < 0, two: s.two || v === 2 }));
      }} />
      <Eq size={18} parts={['X = A + t·u = [1, 1] + ', [sk(t), C.orange], '·(2, 1) = [', [`${sk(X[0])}, ${sk(X[1])}`, '#B4407A'], ']']} />
      <Text style={T.small}>Každé t dá jeden bod priamky. t = 0 je bod A, t = 1 je A + u, záporné t idú opačným smerom.</Text>
      <Goal done={seen.two}>Nastav t tak, aby X = [5, 3]</Goal>
      <Goal done={seen.neg}>Choď na druhú stranu od A (záporné t)</Goal>
      <Stamp show={seen.neg && seen.two} />
    </View>
  );
}
