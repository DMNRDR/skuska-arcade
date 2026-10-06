import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Circle, G, Line, Path, Rect } from 'react-native-svg';
import { Arrow, fnPath, Label } from '../../components/diagrams';
import { C } from '../../components/ui';
import { CH, Chalk, Eq, Goal, sk, Slider, Stamp, T, Toggle, useClock, useOnce, Verdict } from '../kit';

// Fyzikálne pokusy na tabuli. Animácie bežia v skutočnom čase podľa vypočítaných hodnôt
// (perióda pružiny je naozaj T sekúnd, vlna sa naozaj posúva rýchlosťou v atď.).

// ───────────────────────── pružina: T = 2π√(m/k) ─────────────────────────

export function SpringPeriod({ onWin }: { onWin?: () => void }) {
  const [m, setM] = useState(0.3);
  const [k, setK] = useState(20);
  const t = useClock();
  const T0 = 2 * Math.PI * Math.sqrt(m / k);
  const A = 40;
  const y = A * Math.sin((2 * Math.PI * t) / T0);
  const top = 14;
  const eq = 108;
  const my = eq + y;
  const coils = 12;
  let d = `M110 ${top} L110 ${top + 8} `;
  for (let i = 1; i <= coils; i++) d += `L${i % 2 ? 96 : 124} ${(top + 8 + ((my - 26 - top - 8) * i) / coils).toFixed(1)} `;
  d += `L110 ${my - 18}`;
  const size = 22 + m * 10;
  const [g, setG] = useState({ one: false, slow: false });
  useOnce(g.one && g.slow, () => onWin?.());
  const check = (mm: number, kk: number) => {
    const TT = 2 * Math.PI * Math.sqrt(mm / kk);
    setG((o) => ({ one: o.one || Math.abs(TT - 1) < 0.04, slow: o.slow || TT > 2 }));
  };
  // graf y(t) za posledné 3 s
  const gx = (s: number) => 180 + s * 44;
  const graph = fnPath((s) => Math.sin((2 * Math.PI * (t - 3 + s)) / T0), 0, 3, gx, (v) => eq - v * 34, 200);
  return (
    <View style={{ gap: 12 }}>
      <Chalk h={220} grid={0}>
        <Rect x={70} y={6} width={80} height={8} fill={CH.axis} />
        <Path d={d} stroke={CH.dim} strokeWidth={2} fill="none" />
        <Line x1={40} y1={eq} x2={170} y2={eq} stroke={CH.a} strokeDasharray="5 4" />
        <Rect x={110 - size / 2} y={my - 18} width={size} height={size} rx={4} fill={CH.b} />
        {Math.abs(y) > 5 && <Arrow x1={150} y1={my} x2={150} y2={my - y * 0.7} color={CH.d} w={3} />}
        <Label x={156} y={my - y * 0.35 + 4} color={CH.d} size={10}>F = −k·y</Label>
        <Line x1={180} y1={eq} x2={316} y2={eq} stroke={CH.axis} />
        <Path d={graph} stroke={CH.c} strokeWidth={2.5} fill="none" />
        <Circle cx={gx(3)} cy={eq - (y / A) * 34} r={4} fill={CH.c} />
        <Label x={184} y={20} color={CH.c} size={10}>y(t), posledné 3 s</Label>
        <Label x={8} y={212} color={CH.text} size={13}>T = {sk(T0, 2)} s</Label>
      </Chalk>
      <Slider label="Hmotnosť m" value={m} min={0.1} max={2} step={0.05} unit="kg" onChange={(v) => { setM(v); check(v, k); }} color={C.blue} />
      <Slider label="Tuhosť pružiny k" value={k} min={5} max={50} step={1} unit="N/m" onChange={(v) => { setK(v); check(m, v); }} color={C.teal} />
      <Eq size={18} parts={['T = 2π·√(m/k) = 2π·√(', [sk(m), C.blue], ' / ', [sk(k, 0), C.teal], ') = ', [sk(T0, 3) + ' s', C.orange]]} />
      <Text style={T.small}>Väčšia hmotnosť kmitá pomalšie, tuhšia pružina rýchlejšie. Kvôli odmocnine treba 4× väčšiu hmotnosť, aby sa perióda zdvojnásobila.</Text>
      <Goal done={g.one}>Nastav periódu na 1 sekundu (±0,04 s)</Goal>
      <Goal done={g.slow}>Sprav kmitanie pomalšie ako 2 s na kmit</Goal>
      <Stamp show={g.one && g.slow} />
    </View>
  );
}

// ───────────────────────── vlna: λ = v / f ─────────────────────────

export function WaveLambda({ onWin }: { onWin?: () => void }) {
  const [f, setF] = useState(1);
  const [v, setV] = useState(2);
  const t = useClock();
  const lam = v / f;
  const s = 80; // px na meter
  const x0 = 0;
  const y0 = 110;
  const yw = (x: number) => y0 - 40 * Math.sin(2 * Math.PI * (x / lam - f * t));
  const wave = fnPath(yw, 0, 4, (x) => x0 + x * s, (y) => y, 260);
  // dva susedné vrcholy pre vyznačenie λ: sin = 1 → x/λ − f t = 1/4 + n
  let xc = (0.25 + f * t) * lam;
  xc = xc - Math.floor(xc / lam) * lam;
  if (xc < 0.2) xc += lam;
  const hit = Math.abs(lam - 2) < 0.01;
  const [seen, setSeen] = useState(false);
  useOnce(seen, () => onWin?.());
  const upd = (ff: number, vv: number) => {
    if (Math.abs(vv / ff - 2) < 0.01 && Math.abs(ff - 1) > 0.01) setSeen(true);
  };
  const px = 1.2; // sledovaná častica
  return (
    <View style={{ gap: 12 }}>
      <Chalk h={220} grid={0}>
        {[0, 1, 2, 3, 4].map((x) => (
          <G key={x}>
            <Line x1={x * s} y1={200} x2={x * s} y2={206} stroke={CH.axis} />
            <Label x={x * s + 3} y={216} color={CH.dim} size={10}>{x} m</Label>
          </G>
        ))}
        <Line x1={0} y1={y0} x2={320} y2={y0} stroke={CH.axis} strokeDasharray="3 4" />
        <Path d={wave} stroke={CH.b} strokeWidth={3} fill="none" />
        {xc + lam <= 4 && (
          <G>
            <Line x1={xc * s} y1={50} x2={(xc + lam) * s} y2={50} stroke={CH.a} strokeWidth={2} />
            <Line x1={xc * s} y1={44} x2={xc * s} y2={70} stroke={CH.a} strokeWidth={2} />
            <Line x1={(xc + lam) * s} y1={44} x2={(xc + lam) * s} y2={70} stroke={CH.a} strokeWidth={2} />
            <Label x={(xc + lam / 2) * s} y={40} color={CH.a} anchor="middle">λ = {sk(lam)} m</Label>
          </G>
        )}
        <Circle cx={px * s} cy={yw(px)} r={7} fill={CH.c} />
        <Line x1={px * s} y1={60} x2={px * s} y2={160} stroke={CH.c} strokeOpacity={0.3} />
        <Label x={8} y={18} color={CH.c} size={10}>ružová častica len kmitá hore-dole, vlna beží doprava</Label>
      </Chalk>
      <Slider label="Frekvencia f" value={f} min={0.5} max={3} step={0.25} unit="Hz" onChange={(x) => { setF(x); upd(x, v); }} color={C.orange} />
      <Slider label="Rýchlosť vlny v" value={v} min={1} max={4} step={0.5} unit="m/s" onChange={(x) => { setV(x); upd(f, x); }} color={C.blue} />
      <Eq size={18} parts={['λ = v / f = ', [sk(v), C.blue], ' / ', [sk(f), C.orange], ' = ', [sk(lam, 3) + ' m', hit ? C.good : C.ink]]} />
      <Goal done={seen}>Nastav vlnovú dĺžku 2 m inak než f = 1 Hz, v = 2 m/s</Goal>
      <Stamp show={seen} />
    </View>
  );
}

// ───────────────────────── Doppler ─────────────────────────

export function DopplerMove({ onWin }: { onWin?: () => void }) {
  const [r, setR] = useState(0.1); // v_z / c
  const t = useClock();
  const c = 340;
  const f0 = 500;
  const cpx = 55; // px/s pre zobrazenie zvuku
  const Tv = 0.5; // zobrazovaná perióda vysielania [s]
  const span = 3.6;
  const loop = t % span;
  const x0 = 50;
  const sx = (tt: number) => x0 + r * cpx * tt;
  const rings = [];
  for (let n = 0; n * Tv <= loop; n++) {
    const te = n * Tv;
    const rad = cpx * (loop - te);
    rings.push(<Circle key={n} cx={sx(te)} cy={110} r={rad} stroke={CH.b} strokeWidth={1.8} fill="none" strokeOpacity={Math.max(0.15, 1 - rad / 220)} />);
  }
  const front = (f0 * c) / (c - r * c);
  const back = (f0 * c) / (c + r * c);
  const ok = front >= 1.5 * f0;
  useOnce(ok, () => onWin?.());
  return (
    <View style={{ gap: 12 }}>
      <Chalk h={220} grid={0}>
        {rings}
        <Circle cx={sx(loop)} cy={110} r={8} fill={CH.a} />
        <Arrow x1={sx(loop)} y1={110} x2={sx(loop) + 10 + r * 40} y2={110} color={CH.a} w={2.5} />
        <Rect x={300} y={98} width={12} height={24} rx={3} fill={CH.d} />
        <Rect x={8} y={98} width={12} height={24} rx={3} fill={CH.e} />
        <Label x={312} y={92} color={CH.d} anchor="end">vpredu {sk(front, 0)} Hz</Label>
        <Label x={8} y={140} color={CH.e}>vzadu {sk(back, 0)} Hz</Label>
        <Label x={8} y={18} color={CH.dim} size={10}>vlnoplochy sa šíria od miesta, kde zdroj bol v čase vyslania</Label>
      </Chalk>
      <Slider label="Rýchlosť zdroja v_z" value={r} min={0} max={0.8} step={0.05} fmt={(x) => sk(x * c, 0)} unit="m/s" onChange={setR} color={C.orange} />
      <Eq size={16} parts={['vpredu: f′ = f·c / (c − v_z) = 500·340 / (340 − ', [sk(r * c, 0), C.orange], ') = ', [sk(front, 0) + ' Hz', C.teal]]} />
      <Eq size={16} parts={['vzadu: f′ = f·c / (c + v_z) = ', [sk(back, 0) + ' Hz', C.orange]]} />
      <Text style={T.small}>Zdroj vysiela 500 Hz, zvuk ide rýchlosťou 340 m/s. Pred zdrojom sa vlnoplochy zhusťujú (vyšší tón), za ním riednu (nižší tón).</Text>
      <Goal done={ok}>Rozbehni zdroj tak, aby vpredu bol tón aspoň 1,5× vyšší (750 Hz)</Goal>
      <Stamp show={ok} />
    </View>
  );
}

// ───────────────────────── lom svetla: Snellov zákon ─────────────────────────

const MEDIA = [
  { id: 'vz-vo', l: 'vzduch → voda', n1: 1, n2: 1.33 },
  { id: 'vo-vz', l: 'voda → vzduch', n1: 1.33, n2: 1 },
  { id: 'sk-vz', l: 'sklo → vzduch', n1: 1.5, n2: 1 },
];

export function SnellDrag({ onWin }: { onWin?: () => void }) {
  const [mi, setMi] = useState(0);
  const [a, setA] = useState(30);
  const { n1, n2 } = MEDIA[mi];
  const s = (n1 * Math.sin((a * Math.PI) / 180)) / n2;
  const total = s > 1;
  const b = total ? NaN : (Math.asin(s) * 180) / Math.PI;
  const crit = n1 > n2 ? (Math.asin(n2 / n1) * 180) / Math.PI : NaN;
  const P = { x: 160, y: 110 };
  const L = 110;
  const ar = (a * Math.PI) / 180;
  const inc = { x: P.x - L * Math.sin(ar), y: P.y - L * Math.cos(ar) };
  const refl = { x: P.x + L * Math.sin(ar), y: P.y - L * Math.cos(ar) };
  const br = (b * Math.PI) / 180;
  const refr = { x: P.x + L * Math.sin(br), y: P.y + L * Math.cos(br) };
  const [seen, setSeen] = useState(false);
  useOnce(seen, () => onWin?.());
  return (
    <View style={{ gap: 12 }}>
      <Chalk
        h={220}
        grid={0}
        handles={[{ id: 'a', x: inc.x, y: inc.y }]}
        onDrag={(_i, x, y) => {
          let ang = (Math.atan2(P.x - x, P.y - y) * 180) / Math.PI;
          ang = Math.round(Math.max(0, Math.min(89, ang)));
          setA(ang);
          if (P.y - y > 0 && (n1 * Math.sin((ang * Math.PI) / 180)) / n2 > 1) setSeen(true);
        }}
      >
        <Rect x={0} y={110} width={320} height={110} fill={CH.b} fillOpacity={n2 > n1 ? 0.18 : 0.06} />
        <Rect x={0} y={0} width={320} height={110} fill={CH.b} fillOpacity={n1 > n2 ? 0.18 : 0.04} />
        <Line x1={0} y1={110} x2={320} y2={110} stroke={CH.axis} />
        <Line x1={160} y1={10} x2={160} y2={210} stroke={CH.dim} strokeDasharray="4 4" />
        <Line x1={inc.x} y1={inc.y} x2={P.x} y2={P.y} stroke={CH.a} strokeWidth={3.5} />
        <Circle cx={inc.x} cy={inc.y} r={12} fill={CH.a} fillOpacity={0.25} />
        <Line x1={P.x} y1={P.y} x2={refl.x} y2={refl.y} stroke={CH.a} strokeWidth={total ? 3.5 : 1.5} strokeOpacity={total ? 1 : 0.45} />
        {!total && <Line x1={P.x} y1={P.y} x2={refr.x} y2={refr.y} stroke={CH.c} strokeWidth={3.5} />}
        <Label x={8} y={18} color={CH.dim}>n₁ = {sk(n1)}</Label>
        <Label x={8} y={206} color={CH.dim}>n₂ = {sk(n2)}</Label>
        <Label x={166} y={40} color={CH.a}>α = {a}°</Label>
        {!total && <Label x={166} y={190} color={CH.c}>β = {sk(b, 1)}°</Label>}
        {total && <Label x={312} y={150} color={CH.e} anchor="end" size={14}>ÚPLNÝ ODRAZ</Label>}
      </Chalk>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        {MEDIA.map((m, i) => (
          <Toggle key={m.id} on={mi === i} label={m.l} onPress={() => setMi(i)} />
        ))}
      </View>
      <Slider label="Uhol dopadu α (od kolmice)" value={a} min={0} max={89} step={1} unit="°" fmt={(x) => String(x)} onChange={(v) => {
        setA(v);
        if ((n1 * Math.sin((v * Math.PI) / 180)) / n2 > 1) setSeen(true);
      }} />
      <Eq size={17} parts={['n₁·sin α = n₂·sin β  →  sin β = ', `${sk(n1)}·sin ${a}° / ${sk(n2)} = `, [sk(s, 3), total ? C.bad : C.blue]]} />
      {total ? (
        <Verdict ok={false}>sin β by mal byť väčší ako 1, to nejde. Svetlo neprejde, celé sa odrazí (úplný odraz). Medzný uhol: sin α_m = n₂/n₁ → α_m = {sk(crit, 1)}°.</Verdict>
      ) : (
        <Text style={T.small}>{n2 > n1 ? 'Do opticky hustejšieho prostredia sa lúč láme KU kolmici (β < α).' : 'Do opticky redšieho prostredia sa lúč láme OD kolmice (β > α).'}</Text>
      )}
      <Goal done={seen}>Vyrob úplný odraz (vyber prechod do redšieho prostredia a zväčšuj α)</Goal>
      <Stamp show={seen} />
    </View>
  );
}

// ───────────────────────── šošovka: 1/f = 1/a + 1/a′ ─────────────────────────

export function LensDrag({ onWin }: { onWin?: () => void }) {
  const [a, setA] = useState(3); // v násobkoch f
  const fpx = 46;
  const cx = 160;
  const cy = 120;
  const hO = 34;
  const ap = a === 1 ? Infinity : a / (a - 1); // a' v násobkoch f (f = 1)
  const Z = -ap / a;
  const ox = cx - a * fpx;
  const ix = cx + ap * fpx;
  const ih = Z * hO;
  const real = a > 1;
  const [g, setG] = useState({ same: false, virt: false });
  useOnce(g.same && g.virt, () => onWin?.());
  const upd = (v: number) => {
    setA(v);
    setG((o) => ({ same: o.same || v === 2, virt: o.virt || v < 1 }));
  };
  // lúče
  const top = { x: ox, y: cy - hO };
  const rays: React.ReactNode[] = [];
  const ext = (p: { x: number; y: number }, q: { x: number; y: number }, toX: number) => ({ x: toX, y: p.y + ((q.y - p.y) * (toX - p.x)) / (q.x - p.x) });
  // 1. rovnobežne s osou, potom cez F′
  const F2 = { x: cx + fpx, y: cy };
  const r1 = ext({ x: cx, y: top.y }, F2, 320);
  rays.push(<Line key="1a" x1={top.x} y1={top.y} x2={cx} y2={top.y} stroke={CH.a} strokeWidth={2} />);
  rays.push(<Line key="1b" x1={cx} y1={top.y} x2={r1.x} y2={r1.y} stroke={CH.a} strokeWidth={2} />);
  // 2. stredom šošovky bez lomu
  const r2 = ext(top, { x: cx, y: cy }, 320);
  rays.push(<Line key="2" x1={top.x} y1={top.y} x2={r2.x} y2={r2.y} stroke={CH.d} strokeWidth={2} />);
  if (!real && isFinite(ix)) {
    // predĺženia dozadu k neskutočnému obrazu
    rays.push(<Line key="1v" x1={cx} y1={top.y} x2={ix} y2={cy - ih} stroke={CH.a} strokeWidth={1.5} strokeDasharray="4 4" />);
    rays.push(<Line key="2v" x1={top.x} y1={top.y} x2={ix} y2={cy - ih} stroke={CH.d} strokeWidth={1.5} strokeDasharray="4 4" />);
  }
  return (
    <View style={{ gap: 12 }}>
      <Chalk
        h={220}
        grid={0}
        handles={[{ id: 'o', x: top.x, y: top.y + hO / 2 }]}
        onDrag={(_i, x) => {
          const v = Math.round(((cx - x) / fpx) * 4) / 4;
          if (v >= 0.25 && v <= 3.25 && v !== a) upd(v);
        }}
      >
        <Line x1={0} y1={cy} x2={320} y2={cy} stroke={CH.axis} />
        <Path d={`M${cx} 22 Q${cx + 14} ${cy} ${cx} 218 Q${cx - 14} ${cy} ${cx} 22`} fill={CH.b} fillOpacity={0.25} stroke={CH.b} />
        {[-2, -1, 1, 2].map((m) => (
          <G key={m}>
            <Circle cx={cx + m * fpx} cy={cy} r={3} fill={CH.dim} />
            <Label x={cx + m * fpx} y={cy + 16} color={CH.dim} size={10} anchor="middle">
              {Math.abs(m) === 2 ? '2F' : 'F'}{m > 0 ? '′' : ''}
            </Label>
          </G>
        ))}
        {rays}
        <Arrow x1={ox} y1={cy} x2={ox} y2={cy - hO} color={CH.c} w={4} />
        {isFinite(ix) && Math.abs(ih) < 110 && ix < 330 && ix > -10 && (
          <Arrow x1={ix} y1={cy} x2={ix} y2={cy - ih} color={real ? CH.e : 'rgba(255,164,107,0.6)'} w={4} />
        )}
        <Label x={8} y={18} color={CH.c}>predmet (ťahaj)</Label>
        <Label x={312} y={18} color={CH.e} anchor="end">{!isFinite(ix) ? 'obraz v nekonečne' : real ? 'skutočný obraz' : 'neskutočný obraz'}</Label>
      </Chalk>
      <Slider label="Vzdialenosť predmetu a" value={a} min={0.25} max={3.25} step={0.25} fmt={(x) => sk(x) + '·f'} onChange={upd} color={C.orange} />
      <Eq size={17} parts={['1/a′ = 1/f − 1/a  →  a′ = ', [isFinite(ap) ? sk(ap, 2) + '·f' : '∞', C.blue]]} />
      <Eq size={17} parts={['zväčšenie Z = −a′/a = ', [isFinite(Z) ? sk(Z, 2) : '∞', C.orange]]} />
      <Text style={T.small}>
        {a > 2 ? 'Predmet za 2F: obraz je zmenšený, prevrátený a skutočný.' : a === 2 ? 'Predmet v 2F: obraz rovnako veľký, prevrátený.' : a > 1 ? 'Medzi F a 2F: obraz zväčšený a prevrátený (projektor).' : a === 1 ? 'Predmet v ohnisku: lúče idú rovnobežne, obraz nevznikne.' : 'Predmet bližšie ako F: zväčšený, priamy, neskutočný obraz (lupa). Záporné a′ znamená obraz na strane predmetu.'}
      </Text>
      <Goal done={g.same}>Nastav predmet tak, aby bol obraz rovnako veľký</Goal>
      <Goal done={g.virt}>Sprav z šošovky lupu</Goal>
      <Stamp show={g.same && g.virt} />
    </View>
  );
}

// ───────────────────────── polarizácia: Malusov zákon ─────────────────────────

export function MalusTurn({ onWin }: { onWin?: () => void }) {
  const [th, setTh] = useState(30);
  const r = (th * Math.PI) / 180;
  const I = Math.cos(r) ** 2;
  const [g, setG] = useState({ zero: false, half: false });
  useOnce(g.zero && g.half, () => onWin?.());
  const upd = (v: number) => {
    setTh(v);
    setG((o) => ({ zero: o.zero || v === 90, half: o.half || v === 45 || v === 135 }));
  };
  const cx = 160;
  const cy = 100;
  return (
    <View style={{ gap: 12 }}>
      <Chalk h={200} grid={0}>
        <Circle cx={cx} cy={cy} r={70} stroke={CH.dim} strokeWidth={2} fill="none" />
        {/* os analyzátora */}
        <Line x1={cx - 80 * Math.sin(r)} y1={cy + 80 * Math.cos(r)} x2={cx + 80 * Math.sin(r)} y2={cy - 80 * Math.cos(r)} stroke={CH.dim} strokeDasharray="6 4" strokeWidth={2} />
        {/* dopadajúce E (zvislé) */}
        <Arrow x1={cx} y1={cy} x2={cx} y2={cy - 64} color={CH.a} w={3} />
        {/* priemet do osi analyzátora */}
        <Arrow x1={cx} y1={cy} x2={cx + 64 * Math.cos(r) * Math.sin(r)} y2={cy - 64 * Math.cos(r) * Math.cos(r)} color={CH.d} w={3.5} />
        <Line x1={cx} y1={cy - 64} x2={cx + 64 * Math.cos(r) * Math.sin(r)} y2={cy - 64 * Math.cos(r) * Math.cos(r)} stroke={CH.dim} strokeDasharray="3 3" />
        <Rect x={270} y={180 - 150 * I} width={30} height={150 * I} fill={CH.a} fillOpacity={0.8} />
        <Rect x={270} y={30} width={30} height={150} fill="none" stroke={CH.dim} />
        <Label x={285} y={196} color={CH.a} anchor="middle">I</Label>
        <Label x={8} y={18} color={CH.a} size={10}>žltá: E dopadajúceho svetla</Label>
        <Label x={8} y={34} color={CH.d} size={10}>zelená: čo prejde (E·cos θ)</Label>
        <Label x={8} y={190} color={CH.dim} size={10}>čiarkovane: os analyzátora</Label>
      </Chalk>
      <Slider label="Natočenie analyzátora θ" value={th} min={0} max={180} step={5} unit="°" fmt={(x) => String(x)} onChange={upd} color={C.orange} marks={[{ v: 0, l: '0°' }, { v: 90, l: '90°' }, { v: 180, l: '180°' }]} />
      <Eq size={18} parts={['I = I₀·cos²θ = I₀·cos²', [`${th}°`, C.orange], ' = ', [sk(I, 3) + '·I₀', C.teal]]} />
      <Text style={T.small}>Prejde len zložka E v smere osi analyzátora, teda E·cos θ. Intenzita je úmerná E², preto cos².</Text>
      <Goal done={g.zero}>Zhasni svetlo úplne</Goal>
      <Goal done={g.half}>Prepusti presne polovicu intenzity</Goal>
      <Stamp show={g.zero && g.half} />
    </View>
  );
}

// ───────────────────────── skladanie kmitov: fázový rozdiel ─────────────────────────

export function PhaseSum({ onWin }: { onWin?: () => void }) {
  const [dphi, setDphi] = useState(60);
  const [A2, setA2] = useState(1);
  const t = useClock();
  const A1 = 1;
  const r = (dphi * Math.PI) / 180;
  const A = Math.sqrt(A1 * A1 + A2 * A2 + 2 * A1 * A2 * Math.cos(r));
  const w = 2 * Math.PI * 0.5;
  const sx = (x: number) => x * 80;
  const y1 = (x: number) => A1 * Math.sin(w * (x - t));
  const y2 = (x: number) => A2 * Math.sin(w * (x - t) + r);
  const [g, setG] = useState({ zero: false, max: false });
  useOnce(g.zero && g.max, () => onWin?.());
  const upd = (d: number, a2: number) => {
    const AA = Math.sqrt(1 + a2 * a2 + 2 * a2 * Math.cos((d * Math.PI) / 180));
    setG((o) => ({ zero: o.zero || AA < 0.01, max: o.max || AA > 1.99 }));
  };
  return (
    <View style={{ gap: 12 }}>
      <Chalk h={220} grid={0}>
        <Line x1={0} y1={60} x2={320} y2={60} stroke={CH.axis} strokeDasharray="3 4" />
        <Line x1={0} y1={160} x2={320} y2={160} stroke={CH.axis} strokeDasharray="3 4" />
        <Path d={fnPath(y1, 0, 4, sx, (y) => 60 - y * 22)} stroke={CH.a} strokeWidth={2} fill="none" />
        <Path d={fnPath(y2, 0, 4, sx, (y) => 60 - y * 22)} stroke={CH.b} strokeWidth={2} fill="none" />
        <Path d={fnPath((x) => y1(x) + y2(x), 0, 4, sx, (y) => 160 - y * 22)} stroke={CH.d} strokeWidth={3} fill="none" />
        <Label x={8} y={18} color={CH.a} size={10}>y₁</Label>
        <Label x={28} y={18} color={CH.b} size={10}>y₂</Label>
        <Label x={8} y={120} color={CH.d} size={10}>y = y₁ + y₂, amplitúda {sk(A, 2)}</Label>
      </Chalk>
      <Slider label="Fázový rozdiel Δφ" value={dphi} min={0} max={360} step={15} unit="°" fmt={(x) => String(x)} onChange={(v) => { setDphi(v); upd(v, A2); }} color={C.orange} marks={[{ v: 0, l: '0' }, { v: 180, l: 'π' }, { v: 360, l: '2π' }]} />
      <Slider label="Amplitúda A₂ (A₁ = 1)" value={A2} min={0} max={1.5} step={0.25} onChange={(v) => { setA2(v); upd(dphi, v); }} color={C.blue} />
      <Eq size={16} parts={['A = √(A₁² + A₂² + 2A₁A₂·cos Δφ) = ', [sk(A, 3), C.teal]]} />
      <Goal done={g.max}>Zosilni kmity na maximum (synfázne, A = 2)</Goal>
      <Goal done={g.zero}>Úplne ich vyruš (protifázne, rovnaké amplitúdy)</Goal>
      <Stamp show={g.zero && g.max} />
    </View>
  );
}
