import React, { useEffect, useState } from 'react';
import { Animated, Platform, Pressable, Text, View } from 'react-native';
import { play } from '../sound';
import Svg, { Circle, Defs, G, Line, LinearGradient, Path, Polygon, Rect, Stop, Text as SvgText } from 'react-native-svg';
import { C } from './ui';

// Interaktívne obrázky k témam. Všetko je kreslené v súradniciach viewBoxu 320 × 200.
export const W = 320;
export const H = 200;
export const AX = 'rgba(255,255,255,0.35)';
const GRID = 'rgba(255,255,255,0.07)';
export const CY = '#38bdf8';
export const PK = '#f472b6';
export const YE = '#fbbf24';
export const GR = '#34d399';
export const RD = '#fb7185';
export const VI = '#a78bfa';

/** čas v sekundách, obnovuje sa ~30× za sekundu */
export function useTime(running = true) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!running) return;
    const start = Date.now();
    const iv = setInterval(() => setT((Date.now() - start) / 1000), 33);
    return () => clearInterval(iv);
  }, [running]);
  return t;
}

/** polyline z funkcie v pixeloch */
export function fnPath(f: (x: number) => number, x0: number, x1: number, sx: (x: number) => number, sy: (y: number) => number, n = 160) {
  let d = '';
  let pen = false;
  for (let i = 0; i <= n; i++) {
    const x = x0 + ((x1 - x0) * i) / n;
    const y = f(x);
    if (!isFinite(y) || Math.abs(y) > 1e3) {
      pen = false;
      continue;
    }
    const py = sy(y);
    if (py < -400 || py > 600) {
      pen = false;
      continue;
    }
    d += (pen ? 'L' : 'M') + sx(x).toFixed(1) + ' ' + py.toFixed(1) + ' ';
    pen = true;
  }
  return d;
}

export function Frame({ children, caption }: { children: React.ReactNode; caption?: string }) {
  return (
    <View style={{ gap: 6 }}>
      <View style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 14, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' }}>
        <Svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', aspectRatio: W / H }}>
          {Array.from({ length: 9 }, (_, i) => (
            <Line key={'v' + i} x1={i * 40} y1={0} x2={i * 40} y2={H} stroke={GRID} />
          ))}
          {Array.from({ length: 6 }, (_, i) => (
            <Line key={'h' + i} x1={0} y1={i * 40} x2={W} y2={i * 40} stroke={GRID} />
          ))}
          {children}
        </Svg>
      </View>
      {caption ? <Text style={{ color: C.dim, fontSize: 13, lineHeight: 18 }}>{caption}</Text> : null}
    </View>
  );
}

function ChipButton({ children, onPress, style }: { children: React.ReactNode; onPress: () => void; style: object }) {
  const s = React.useRef(new Animated.Value(1)).current;
  const nd = Platform.OS !== 'web';
  return (
    <Animated.View style={{ transform: [{ scale: s }] }}>
      <Pressable
        onPressIn={() => Animated.spring(s, { toValue: 0.9, useNativeDriver: nd, speed: 50 }).start()}
        onPressOut={() => Animated.spring(s, { toValue: 1, useNativeDriver: nd, speed: 30, bounciness: 14 }).start()}
        onPress={() => {
          play('tick');
          onPress();
        }}
        style={style}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}

export function Chips<T extends string | number>({ options, value, onChange, label }: { options: { v: T; l: string }[]; value: T; onChange: (v: T) => void; label?: string }) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
      {label ? <Text style={{ color: C.dim, fontSize: 12, marginRight: 2 }}>{label}</Text> : null}
      {options.map((o) => {
        const on = o.v === value;
        return (
          <ChipButton
            key={String(o.v)}
            onPress={() => onChange(o.v)}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 999,
              backgroundColor: on ? 'rgba(56,189,248,0.25)' : 'rgba(255,255,255,0.06)',
              borderWidth: 1,
              borderColor: on ? CY : 'rgba(255,255,255,0.12)',
            }}
          >
            <Text style={{ color: on ? '#fff' : C.dim, fontSize: 12, fontWeight: '700' }}>{o.l}</Text>
          </ChipButton>
        );
      })}
    </View>
  );
}

const FONT = Platform.OS === 'web' ? 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif' : undefined;

export const Label = ({ x, y, children, color = C.text, size = 11, anchor = 'start' }: { x: number; y: number; children: React.ReactNode; color?: string; size?: number; anchor?: 'start' | 'middle' | 'end' }) => (
  <SvgText x={x} y={y} fill={color} fontSize={size} fontWeight="700" textAnchor={anchor} fontFamily={FONT}>
    {children}
  </SvgText>
);

export function Arrow({ x1, y1, x2, y2, color, w = 2.5 }: { x1: number; y1: number; x2: number; y2: number; color: string; w?: number }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const h = 8;
  const p1 = [x2 - h * Math.cos(a - 0.4), y2 - h * Math.sin(a - 0.4)];
  const p2 = [x2 - h * Math.cos(a + 0.4), y2 - h * Math.sin(a + 0.4)];
  return (
    <G>
      <Line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={w} strokeLinecap="round" />
      <Polygon points={`${x2},${y2} ${p1[0]},${p1[1]} ${p2[0]},${p2[1]}`} fill={color} />
    </G>
  );
}

// ═════════════════════════ FYZIKA ═════════════════════════

/** Kružnica → sínus: bod na kružnici a jeho tieň kreslí harmonické kmitanie. */
function KmityDiagram() {
  const [w, setW] = useState(1);
  const [A, setA] = useState(1);
  const t = useTime();
  const R = 32 * A + 18;
  const cx = 60;
  const cy = 100;
  const phi = w * t * 1.6;
  const px = cx + R * Math.cos(phi);
  const py = cy - R * Math.sin(phi);
  const x0 = 120;
  const sx = (x: number) => x0 + x * 26;
  const wave = fnPath((x) => cy - R * Math.sin(phi - w * x * 0.6), 0, 7.6, sx, (y) => y);
  const v = Math.cos(phi);
  return (
    <View style={{ gap: 8 }}>
      <Frame caption="Bod obieha po kružnici s polomerom A. Jeho výška je y = A·sin(ωt) (žltý „tieň“ na osi). Ružový graf je záznam výšky: nová hodnota vzniká pri osi a starší záznam sa posúva doprava. Zelená šípka je rýchlosť: najväčšia v strede, nulová na krajoch.">
        <Line x1={0} y1={cy} x2={W} y2={cy} stroke={AX} />
        <Line x1={x0} y1={10} x2={x0} y2={190} stroke={AX} />
        <Circle cx={cx} cy={cy} r={R} stroke={CY} strokeOpacity={0.5} strokeWidth={1.5} fill="none" />
        <Line x1={cx} y1={cy} x2={px} y2={py} stroke={CY} strokeWidth={1.5} />
        <Line x1={px} y1={py} x2={x0} y2={py} stroke={YE} strokeDasharray="4 4" />
        <Path d={wave} stroke={PK} strokeWidth={2.5} fill="none" />
        <Circle cx={px} cy={py} r={5} fill={CY} />
        <Circle cx={x0} cy={py} r={6} fill={YE} />
        {Math.abs(v) > 0.08 && <Arrow x1={x0 - 14} y1={py} x2={x0 - 14} y2={py - v * 30} color={GR} w={2} />}
        <Line x1={x0 - 4} y1={cy - R} x2={x0 + 4} y2={cy - R} stroke={AX} />
        <Label x={x0 + 6} y={cy - R + 4} color={C.dim}>+A</Label>
        <Label x={x0 + 6} y={cy + R + 4} color={C.dim}>−A</Label>
        <Label x={W - 8} y={cy - 6} color={C.dim} anchor="end">záznam →</Label>
        <Label x={8} y={18} color={PK}>y = A·sin(ωt)</Label>
        <Label x={8} y={190} color={GR}>v = A·ω·cos(ωt)</Label>
      </Frame>
      <Chips label="ω:" value={w} onChange={setW} options={[{ v: 0.5, l: 'pomaly' }, { v: 1, l: 'stredne' }, { v: 2, l: 'rýchlo' }]} />
      <Chips label="A:" value={A} onChange={setA} options={[{ v: 0.5, l: 'malá' }, { v: 1, l: 'stredná' }, { v: 1.6, l: 'veľká' }]} />
    </View>
  );
}

/** Lissajousove krivky a rázy */
function SkladanieDiagram({ init }: { init?: string }) {
  const [mode, setMode] = useState<'liss' | 'raz'>(init === 'raz' ? 'raz' : 'liss');
  const [ratio, setRatio] = useState('1:1');
  const [ph, setPh] = useState(2);
  const t = useTime();
  if (mode === 'raz') {
    const sx = (x: number) => 10 + x * 30;
    const sy = (y: number) => 100 - y * 38;
    const f = (x: number) => Math.sin(10 * x) + Math.sin(11 * x);
    const env = (x: number) => 2 * Math.abs(Math.cos(0.5 * x));
    return (
      <View style={{ gap: 8 }}>
        <Frame caption="Dva kmity s blízkymi frekvenciami. Amplitúda výsledku pomaly „dýcha“ (žltá obálka). Frekvencia rázov f_r = |f₂ − f₁|.">
          <Line x1={0} y1={100} x2={W} y2={100} stroke={AX} />
          <Path d={fnPath(env, 0, 10, sx, sy)} stroke={YE} strokeDasharray="5 4" fill="none" strokeWidth={1.5} />
          <Path d={fnPath((x) => -env(x), 0, 10, sx, sy)} stroke={YE} strokeDasharray="5 4" fill="none" strokeWidth={1.5} />
          <Path d={fnPath(f, 0, 10, sx, sy, 600)} stroke={PK} strokeWidth={1.6} fill="none" />
          <Line x1={sx((t * 1.5) % 10)} y1={20} x2={sx((t * 1.5) % 10)} y2={180} stroke={CY} strokeOpacity={0.5} />
          <Label x={8} y={18} color={PK}>y₁ + y₂ (f₁ ≈ f₂)</Label>
          <Label x={W - 8} y={18} color={YE} anchor="end">obálka = rázy</Label>
        </Frame>
        <Chips value={mode} onChange={setMode} options={[{ v: 'liss', l: 'Kolmé kmity' }, { v: 'raz', l: 'Rázy' }]} />
      </View>
    );
  }
  const [a, b] = ratio.split(':').map(Number);
  const phase = [0, Math.PI / 4, Math.PI / 2, Math.PI][ph];
  const cx = 160;
  const cy = 100;
  const R = 75;
  let d = '';
  for (let i = 0; i <= 400; i++) {
    const s = (i / 400) * Math.PI * 2;
    const x = cx + R * Math.sin(a * s);
    const y = cy - R * Math.sin(b * s + phase);
    d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1) + ' ';
  }
  const s = t * 0.9;
  const name = a === b ? (ph === 0 || ph === 3 ? 'úsečka' : ph === 2 ? 'kružnica' : 'elipsa') : 'Lissajousova krivka';
  return (
    <View style={{ gap: 8 }}>
      <Frame caption={`x = A·sin(${a === 1 ? '' : a}ωt), y = A·sin(${b === 1 ? '' : b}ωt + φ). Výsledok: ${name}.`}>
        <Line x1={cx - R - 10} y1={cy} x2={cx + R + 10} y2={cy} stroke={AX} />
        <Line x1={cx} y1={cy - R - 10} x2={cx} y2={cy + R + 10} stroke={AX} />
        <Path d={d} stroke={VI} strokeWidth={2.2} fill="none" />
        <Circle cx={cx + R * Math.sin(a * s)} cy={cy - R * Math.sin(b * s + phase)} r={6} fill={YE} />
        <Label x={10} y={20} color={VI}>
          {name}
        </Label>
      </Frame>
      <Chips value={mode} onChange={setMode} options={[{ v: 'liss', l: 'Kolmé kmity' }, { v: 'raz', l: 'Rázy' }]} />
      <Chips label="pomer:" value={ratio} onChange={setRatio} options={['1:1', '1:2', '2:3', '3:4'].map((v) => ({ v, l: v }))} />
      <Chips label="φ:" value={ph} onChange={setPh} options={[{ v: 0, l: '0' }, { v: 1, l: 'π/4' }, { v: 2, l: 'π/2' }, { v: 3, l: 'π' }]} />
    </View>
  );
}

/** Postupná priečna, pozdĺžna a stojatá vlna */
function VlnyDiagram({ init }: { init?: string }) {
  const [mode, setMode] = useState<'pri' | 'poz' | 'stoj'>((init as 'pri' | 'poz' | 'stoj') || 'pri');
  const t = useTime();
  const k = 0.06;
  const w = 3;
  const N = 26;
  const xs = Array.from({ length: N }, (_, i) => 14 + i * 11.6);
  if (mode === 'poz') {
    return (
      <View style={{ gap: 8 }}>
        <Frame caption="Pozdĺžna vlna: častice kmitajú v smere šírenia. Vznikajú zhustenia a zriedenia (tak sa šíri zvuk).">
          {[60, 100, 140].map((row) =>
            xs.map((x0, i) => {
              const x = x0 + 8 * Math.sin(w * t - k * x0);
              return <Circle key={row + '-' + i} cx={x} cy={row} r={i === 10 ? 5 : 3.5} fill={i === 10 ? YE : CY} />;
            }),
          )}
          <Arrow x1={20} y1={180} x2={120} y2={180} color={PK} />
          <Label x={128} y={184} color={PK}>smer šírenia</Label>
        </Frame>
        <Chips value={mode} onChange={setMode} options={[{ v: 'pri', l: 'Priečna' }, { v: 'poz', l: 'Pozdĺžna' }, { v: 'stoj', l: 'Stojatá' }]} />
      </View>
    );
  }
  const stand = mode === 'stoj';
  const f = (x: number) => (stand ? 50 * Math.sin(w * t) * Math.cos(0.0393 * (x - 14)) : 45 * Math.sin(w * t - k * x));
  const lam = stand ? (2 * Math.PI) / 0.0393 : (2 * Math.PI) / k;
  return (
    <View style={{ gap: 8 }}>
      <Frame
        caption={
          stand
            ? 'Stojatá vlna: uzly (červené) nekmitajú vôbec, kmitne kmitajú najviac. Susedné uzly sú od seba λ/2.'
            : 'Priečna vlna: každá častica kmitá len hore-dole (žltá), ale tvar vlny sa posúva doprava. Hmota sa neprenáša.'
        }
      >
        <Line x1={0} y1={100} x2={W} y2={100} stroke={AX} />
        <Path d={fnPath(f, 0, W, (x) => x, (y) => 100 - y)} stroke={PK} strokeWidth={2} fill="none" />
        {xs.map((x, i) => (
          <Circle key={i} cx={x} cy={100 - f(x)} r={i === 10 ? 5.5 : 3.5} fill={i === 10 ? YE : CY} />
        ))}
        {stand &&
          [0, 1, 2, 3].map((n) => {
            const x = 14 + lam / 4 + (n * lam) / 2;
            return x < W ? <Circle key={n} cx={x} cy={100} r={5} fill="none" stroke={RD} strokeWidth={2} /> : null;
          })}
        {!stand && (
          <G>
            {(() => {
              // vrchol: ω·t − k·x = π/2 + 2πn → x = (ω·t − π/2)/k − n·λ
              const x0 = ((((w * t - Math.PI / 2) / k) % lam) + lam) % lam;
              return (
                <G>
                  <Line x1={x0} y1={40} x2={x0 + lam} y2={40} stroke={YE} strokeWidth={2} />
                  <Line x1={x0} y1={34} x2={x0} y2={100 - 45} stroke={YE} strokeDasharray="2 3" />
                  <Line x1={x0 + lam} y1={34} x2={x0 + lam} y2={100 - 45} stroke={YE} strokeDasharray="2 3" />
                  <Label x={x0 + lam / 2} y={34} color={YE} anchor="middle">λ</Label>
                </G>
              );
            })()}
          </G>
        )}
      </Frame>
      <Chips value={mode} onChange={setMode} options={[{ v: 'pri', l: 'Priečna' }, { v: 'poz', l: 'Pozdĺžna' }, { v: 'stoj', l: 'Stojatá' }]} />
    </View>
  );
}

/** Dopplerov jav: pohyblivý zdroj zhusťuje vlnoplochy pred sebou */
function DopplerDiagram() {
  const [v, setV] = useState(0.5);
  const t = useTime();
  const c = 60;
  const period = 0.45;
  const span = 4;
  const T = t % span;
  const srcX = (u: number) => 60 + v * c * u;
  const rings = [];
  for (let n = 0; n * period <= T; n++) {
    const te = n * period;
    rings.push({ x: srcX(te), r: c * (T - te) });
  }
  const sx = srcX(T);
  return (
    <View style={{ gap: 8 }}>
      <Frame caption="Zdroj ide doprava. Vlnoplochy sú pred ním zhustené (vyšší tón, f′ = f/(1 − v/c)) a za ním zriedené (nižší tón).">
        {rings.map((r, i) => (
          <Circle key={i} cx={r.x} cy={100} r={r.r} stroke={CY} strokeOpacity={Math.max(0.15, 1 - r.r / 260)} strokeWidth={1.5} fill="none" />
        ))}
        <Circle cx={sx} cy={100} r={7} fill={YE} />
        <Arrow x1={sx} y1={100} x2={sx + 10 + v * 30} y2={100} color={YE} w={2} />
        <Label x={300} y={30} color={GR} anchor="end">
          vyšší tón ▶
        </Label>
        <Label x={20} y={30} color={RD}>
          ◀ nižší tón
        </Label>
      </Frame>
      <Chips label="v/c:" value={v} onChange={setV} options={[{ v: 0, l: '0 (stojí)' }, { v: 0.3, l: '0,3' }, { v: 0.5, l: '0,5' }, { v: 0.8, l: '0,8' }]} />
    </View>
  );
}

/** EM vlna: E a B kolmo na seba aj na smer šírenia */
function EmDiagram() {
  const t = useTime();
  const k = 0.05;
  const w = 3;
  const y0 = 110;
  const skew = 0.45;
  const E = (x: number) => 55 * Math.sin(k * x - w * t);
  const pts = Array.from({ length: 30 }, (_, i) => 20 + i * 10);
  return (
    <Frame caption="Elektrická zložka E (ružová) kmitá zvislo, magnetická B (modrá) „do hĺbky“. Sú navzájom kolmé, kmitajú synfázne a vlna sa šíri doprava aj vo vákuu.">
      <Line x1={10} y1={y0} x2={310} y2={y0} stroke={AX} />
      <Line x1={20} y1={y0} x2={20 + 70 * skew * 1.6} y2={y0 + 70 * skew} stroke={AX} strokeDasharray="3 3" />
      {pts.map((x) => (
        <Line key={'e' + x} x1={x} y1={y0} x2={x} y2={y0 - E(x)} stroke={PK} strokeOpacity={0.45} />
      ))}
      {pts.map((x) => (
        <Line key={'b' + x} x1={x} y1={y0} x2={x + E(x) * skew * 0.9} y2={y0 + E(x) * skew * 0.55} stroke={CY} strokeOpacity={0.45} />
      ))}
      <Path d={fnPath(E, 20, 310, (x) => x, (y) => y0 - y)} stroke={PK} strokeWidth={2.4} fill="none" />
      <Path d={pts.map((x, i) => (i ? 'L' : 'M') + (x + E(x) * skew * 0.9).toFixed(1) + ' ' + (y0 + E(x) * skew * 0.55).toFixed(1)).join(' ')} stroke={CY} strokeWidth={2.4} fill="none" />
      <Label x={14} y={30} color={PK}>E</Label>
      <Label x={60} y={195} color={CY}>B</Label>
      <Arrow x1={240} y1={185} x2={305} y2={185} color={YE} w={2} />
      <Label x={236} y={189} color={YE} anchor="end">c ≈ 3·10⁸ m/s</Label>
    </Frame>
  );
}

/** Snellov zákon a úplný odraz */
function OptikaDiagram() {
  const [n1, setN1] = useState(1);
  const [a, setA] = useState(40);
  const n2 = n1 === 1 ? 1.5 : 1;
  const cx = 160;
  const cy = 100;
  const L = 95;
  const ar = (a * Math.PI) / 180;
  const sinB = (n1 / n2) * Math.sin(ar);
  const total = sinB > 1;
  const br = total ? 0 : Math.asin(sinB);
  const crit = n1 > n2 ? (Math.asin(n2 / n1) * 180) / Math.PI : null;
  return (
    <View style={{ gap: 8 }}>
      <Frame
        caption={
          total
            ? `Uhol dopadu ${a}° je väčší ako kritický (${(crit ?? 0).toFixed(1).replace('.', ',')}°): nastal ÚPLNÝ ODRAZ, lúč do vzduchu neprejde.`
            : `n₁·sin α = n₂·sin β → β ≈ ${((br * 180) / Math.PI).toFixed(1).replace('.', ',')}°. ${n1 < n2 ? 'Do hustejšieho prostredia sa lúč láme ku kolmici.' : 'Do redšieho prostredia sa láme od kolmice.'}`
        }
      >
        <Rect x={0} y={cy} width={W} height={H - cy} fill={n2 > n1 ? 'rgba(56,189,248,0.15)' : 'rgba(0,0,0,0)'} />
        <Rect x={0} y={0} width={W} height={cy} fill={n1 > n2 ? 'rgba(56,189,248,0.15)' : 'rgba(0,0,0,0)'} />
        <Line x1={0} y1={cy} x2={W} y2={cy} stroke={AX} strokeWidth={1.5} />
        <Line x1={cx} y1={8} x2={cx} y2={192} stroke={AX} strokeDasharray="4 4" />
        <Line x1={cx - L * Math.sin(ar)} y1={cy - L * Math.cos(ar)} x2={cx} y2={cy} stroke={YE} strokeWidth={3} />
        <Line x1={cx} y1={cy} x2={cx + L * Math.sin(ar)} y2={cy - L * Math.cos(ar)} stroke={YE} strokeWidth={total ? 3 : 1.2} strokeOpacity={total ? 1 : 0.35} />
        {!total && <Line x1={cx} y1={cy} x2={cx + L * Math.sin(br)} y2={cy + L * Math.cos(br)} stroke={GR} strokeWidth={3} />}
        <Label x={8} y={20} color={C.dim}>
          n₁ = {n1 === 1 ? '1 (vzduch)' : '1,5 (sklo)'}
        </Label>
        <Label x={8} y={190} color={C.dim}>
          n₂ = {n2 === 1 ? '1 (vzduch)' : '1,5 (sklo)'}
        </Label>
        <Label x={cx - 30} y={cy - 30} color={YE} anchor="end">α = {a}°</Label>
        {!total && <Label x={cx + 30} y={cy + 40} color={GR}>β = {((br * 180) / Math.PI).toFixed(1).replace('.', ',')}°</Label>}
        {total && <Label x={cx + 20} y={cy + 40} color={RD}>úplný odraz!</Label>}
      </Frame>
      <Chips label="smer:" value={n1} onChange={setN1} options={[{ v: 1, l: 'vzduch → sklo' }, { v: 1.5, l: 'sklo → vzduch' }]} />
      <Chips label="α:" value={a} onChange={setA} options={[20, 30, 40, 50, 60, 75].map((v) => ({ v, l: v + '°' }))} />
    </View>
  );
}

/** Spojka: chod lúčov a obraz podľa polohy predmetu */
function SosovkyDiagram({ init }: { init?: string }) {
  const [pos, setPos] = useState(init ? Number(init) : -3.5);
  const [type, setType] = useState<'spojka' | 'rozptylka'>('spojka');
  const f = 40 * (type === 'spojka' ? 1 : -1);
  const cx = 170;
  const cy = 120;
  const xp = pos * 40; // predmetová súradnica (záporná)
  const hp = 36;
  const D = 1 / f;
  const den = 1 + D * xp;
  const xo = Math.abs(den) < 1e-6 ? Infinity : xp / den;
  const ho = isFinite(xo) ? hp / den : 0;
  const Z = -1 / den;
  const real = isFinite(xo) && xo > 0;
  const toX = (x: number) => cx + x;
  const toY = (y: number) => cy - y;
  // lúč 1: rovnobežný s osou → cez ohnisko
  const rays: React.ReactNode[] = [];
  const P = { x: toX(xp), y: toY(hp) };
  const hit1 = { x: cx, y: toY(hp) };
  const slope1 = -hp / f; // dy/dx po prechode
  const end = (x0: number, y0: number, s: number, x1: number) => ({ x: toX(x1), y: toY(y0 + s * (x1 - x0)) });
  const e1 = end(0, hp, slope1, 160);
  rays.push(<Line key="r1a" x1={P.x} y1={P.y} x2={hit1.x} y2={hit1.y} stroke={YE} strokeWidth={1.8} />);
  rays.push(<Line key="r1b" x1={hit1.x} y1={hit1.y} x2={e1.x} y2={e1.y} stroke={YE} strokeWidth={1.8} />);
  // lúč 2: cez optický stred
  const s2 = hp / xp;
  const e2 = end(0, 0, s2, 160);
  rays.push(<Line key="r2" x1={P.x} y1={P.y} x2={e2.x} y2={e2.y} stroke={GR} strokeWidth={1.8} />);
  if (!real && isFinite(xo)) {
    // predĺženia lúčov dozadu (neskutočný obraz)
    const b1 = end(0, hp, slope1, xo - 20);
    rays.push(<Line key="b1" x1={hit1.x} y1={hit1.y} x2={b1.x} y2={b1.y} stroke={YE} strokeDasharray="4 4" strokeOpacity={0.6} />);
    rays.push(<Line key="b2" x1={cx} y1={cy} x2={toX(xo - 20)} y2={toY(s2 * (xo - 20))} stroke={GR} strokeDasharray="4 4" strokeOpacity={0.6} />);
  }
  const desc = !isFinite(xo)
    ? 'Predmet je v ohnisku: lúče idú rovnobežne, obraz je v nekonečne.'
    : `Obraz je ${real ? 'skutočný' : 'neskutočný'}, ${Math.abs(Z) > 1.02 ? 'zväčšený' : Math.abs(Z) < 0.98 ? 'zmenšený' : 'rovnako veľký'} (|Z| = ${Math.abs(Z).toFixed(2).replace('.', ',')}), ${real ? 'prevrátený' : 'priamy'}.`;
  return (
    <View style={{ gap: 8 }}>
      <Frame caption={desc}>
        <Line x1={0} y1={cy} x2={W} y2={cy} stroke={AX} />
        {type === 'spojka' ? (
          <Path d={`M${cx} 30 Q${cx + 14} ${cy - 0} ${cx} 190 Q${cx - 14} ${cy} ${cx} 30`} fill="rgba(56,189,248,0.25)" stroke={CY} />
        ) : (
          <Path d={`M${cx - 9} 30 L${cx + 9} 30 Q${cx + 1} ${cy} ${cx + 9} 190 L${cx - 9} 190 Q${cx - 1} ${cy} ${cx - 9} 30`} fill="rgba(56,189,248,0.25)" stroke={CY} />
        )}
        {[-2, -1, 1, 2].map((m) => (
          <G key={m}>
            <Circle cx={toX(m * 40)} cy={cy} r={2.5} fill={C.dim} />
            <Label x={toX(m * 40)} y={cy + 14} color={C.dim} size={9} anchor="middle">
              {(m < 0 ? '−' : '') + (Math.abs(m) === 2 ? '2f' : 'f')}
            </Label>
          </G>
        ))}
        {rays}
        <Arrow x1={P.x} y1={cy} x2={P.x} y2={P.y} color={PK} w={3} />
        {isFinite(xo) && Math.abs(xo) < 200 && Math.abs(ho) < 140 && (
          <Arrow x1={toX(xo)} y1={cy} x2={toX(xo)} y2={toY(ho)} color={real ? VI : 'rgba(167,139,250,0.6)'} w={3} />
        )}
        <Label x={8} y={18} color={PK}>predmet</Label>
        <Label x={W - 8} y={18} color={VI} anchor="end">obraz</Label>
      </Frame>
      <Chips value={type} onChange={setType} options={[{ v: 'spojka', l: 'Spojka' }, { v: 'rozptylka', l: 'Rozptylka' }]} />
      <Chips
        label="predmet:"
        value={pos}
        onChange={setPos}
        options={[
          { v: -3.5, l: 'za 2F' },
          { v: -2, l: 'v 2F' },
          { v: -1.5, l: 'F – 2F' },
          { v: -1, l: 'v F' },
          { v: -0.5, l: 'lupa' },
        ]}
      />
    </View>
  );
}

// ═════════════════════════ MATEMATIKA ═════════════════════════

/** Rovnobežník z vektorov, uhol a skalárny súčin (v rovine) */
function VektoryDiagram() {
  const [preset, setPreset] = useState(0);
  const P: [number, number][][] = [
    [[3, 1], [1, 2]],
    [[3, 0], [0, 2]],
    [[3, 1], [-2, 1.5]],
    [[2, 1], [4, 2]],
  ];
  const [u, v] = P[preset];
  const o = { x: 90, y: 150 };
  const s = 36;
  const X = (p: number[]) => o.x + p[0] * s;
  const Y = (p: number[]) => o.y - p[1] * s;
  const dot = u[0] * v[0] + u[1] * v[1];
  const cross = u[0] * v[1] - u[1] * v[0];
  const lu = Math.hypot(...u);
  const lv = Math.hypot(...v);
  const ang = (Math.acos(Math.max(-1, Math.min(1, dot / (lu * lv)))) * 180) / Math.PI;
  return (
    <View style={{ gap: 8 }}>
      <Frame
        caption={`u·v = ${dot.toFixed(1).replace('.', ',')} → uhol ${ang.toFixed(0)}°${Math.abs(dot) < 1e-9 ? ' (kolmé!)' : ''}. Obsah rovnobežníka = |u × v| = ${Math.abs(cross).toFixed(1).replace('.', ',')}${Math.abs(cross) < 1e-9 ? ' (rovnobežné vektory, obsah 0)' : ''}.`}
      >
        <Line x1={0} y1={o.y} x2={W} y2={o.y} stroke={AX} />
        <Line x1={o.x} y1={0} x2={o.x} y2={H} stroke={AX} />
        <Polygon points={`${o.x},${o.y} ${X(u)},${Y(u)} ${X([u[0] + v[0], u[1] + v[1]])},${Y([u[0] + v[0], u[1] + v[1]])} ${X(v)},${Y(v)}`} fill="rgba(251,191,36,0.18)" stroke={YE} strokeDasharray="4 3" />
        <Arrow x1={o.x} y1={o.y} x2={X(u)} y2={Y(u)} color={CY} w={3} />
        <Arrow x1={o.x} y1={o.y} x2={X(v)} y2={Y(v)} color={PK} w={3} />
        <Label x={X(u) + 6} y={Y(u)} color={CY}>u = ({u.join(', ')})</Label>
        <Label x={X(v) - 4} y={Y(v) - 8} color={PK} anchor={v[0] < 0 ? 'start' : 'end'}>v = ({v.join(', ')})</Label>
        <Label x={W - 8} y={20} color={YE} anchor="end">obsah = |u × v|</Label>
      </Frame>
      <Chips value={preset} onChange={setPreset} options={[{ v: 0, l: 'ostrý uhol' }, { v: 1, l: 'kolmé' }, { v: 2, l: 'tupý uhol' }, { v: 3, l: 'rovnobežné' }]} />
    </View>
  );
}

/** Rovina s normálovým vektorom a priamka, v pseudo-3D */
function GeometriaDiagram() {
  const [mode, setMode] = useState<'kolma' | 'rovnobezna' | 'roznobezna'>('kolma');
  const t = useTime();
  const c = { x: 160, y: 120 };
  const iso = (x: number, y: number, z: number) => ({ x: c.x + (x - y) * 0.9 * 30, y: c.y + (x + y) * 0.45 * 30 - z * 30 });
  const pts = [iso(-2, -2, 0), iso(2, -2, 0), iso(2, 2, 0), iso(-2, 2, 0)];
  const n = iso(0, 0, 2.2);
  let line: { a: { x: number; y: number }; b: { x: number; y: number }; text: string };
  if (mode === 'kolma') line = { a: iso(1, -1, -1.2), b: iso(1, -1, 2.6), text: 'Priamka ⊥ rovina: smerový vektor s je násobkom normály n.' };
  else if (mode === 'rovnobezna') line = { a: iso(-2.2, 0.5, 1.4), b: iso(2.2, 0.5, 1.4), text: 'Priamka ∥ rovina: s · n = 0 a priamka v rovine neleží.' };
  else line = { a: iso(-1.8, -1.2, 2), b: iso(1.4, 1.2, -0.9), text: 'Priamka pretína rovinu. Uhol počítame cez sin φ = |s·n| / (|s|·|n|).' };
  const bob = Math.sin(t * 2) * 2;
  return (
    <View style={{ gap: 8 }}>
      <Frame caption={line.text}>
        <Polygon points={pts.map((p) => `${p.x},${p.y}`).join(' ')} fill="rgba(167,139,250,0.22)" stroke={VI} />
        <Arrow x1={c.x} y1={c.y} x2={n.x} y2={n.y + bob} color={YE} w={3} />
        <Label x={n.x + 8} y={n.y + 6} color={YE}>n = (a, b, c)</Label>
        <Line x1={line.a.x} y1={line.a.y} x2={line.b.x} y2={line.b.y} stroke={GR} strokeWidth={2.5} />
        <Label x={line.b.x + 6} y={line.b.y} color={GR}>p</Label>
        <Label x={10} y={190} color={VI}>ax + by + cz + d = 0</Label>
      </Frame>
      <Chips value={mode} onChange={setMode} options={[{ v: 'kolma', l: 'kolmá' }, { v: 'rovnobezna', l: 'rovnobežná' }, { v: 'roznobezna', l: 'pretína' }]} />
    </View>
  );
}

/** Násobenie matíc: riadok × stĺpec */
function MaticeDiagram() {
  const t = useTime();
  const A = [
    [1, 2],
    [3, 4],
  ];
  const B = [
    [5, 6],
    [7, 8],
  ];
  const Cm = [
    [19, 22],
    [43, 50],
  ];
  const step = Math.floor(t / 1.6) % 4;
  const i = Math.floor(step / 2);
  const j = step % 2;
  const cell = 30;
  const drawM = (M: number[][], x0: number, y0: number, hlRow: number | null, hlCol: number | null, color: string, shown?: (r: number, c: number) => boolean) => (
    <G>
      <Path d={`M${x0 + 6} ${y0} L${x0} ${y0} L${x0} ${y0 + cell * 2} L${x0 + 6} ${y0 + cell * 2}`} stroke={AX} fill="none" strokeWidth={1.5} />
      <Path d={`M${x0 + cell * 2 - 6} ${y0} L${x0 + cell * 2} ${y0} L${x0 + cell * 2} ${y0 + cell * 2} L${x0 + cell * 2 - 6} ${y0 + cell * 2}`} stroke={AX} fill="none" strokeWidth={1.5} />
      {M.map((row, r) =>
        row.map((v, c) => {
          const hl = r === hlRow || c === hlCol;
          return (
            <G key={r + '-' + c}>
              {hl && <Rect x={x0 + c * cell + 2} y={y0 + r * cell + 2} width={cell - 4} height={cell - 4} rx={6} fill={color} fillOpacity={0.3} />}
              {(!shown || shown(r, c)) && (
                <Label x={x0 + c * cell + cell / 2} y={y0 + r * cell + cell / 2 + 5} color={hl ? '#fff' : C.dim} size={14} anchor="middle">
                  {v}
                </Label>
              )}
            </G>
          );
        }),
      )}
    </G>
  );
  return (
    <Frame caption={`Prvok (${i + 1}, ${j + 1}) súčinu = ${i + 1}. riadok A · ${j + 1}. stĺpec B = ${A[i][0]}·${B[0][j]} + ${A[i][1]}·${B[1][j]} = ${Cm[i][j]}. Preto vo všeobecnosti A·B ≠ B·A.`}>
      {drawM(A, 20, 60, i, null, CY)}
      <Label x={95} y={95} color={C.text} size={18} anchor="middle">·</Label>
      {drawM(B, 110, 60, null, j, PK)}
      <Label x={185} y={95} color={C.text} size={18} anchor="middle">=</Label>
      {drawM(Cm, 205, 60, null, null, YE, (r, c) => r * 2 + c <= step)}
      <Rect x={205 + j * cell + 2} y={60 + i * cell + 2} width={cell - 4} height={cell - 4} rx={6} fill={YE} fillOpacity={0.35} />
      <Label x={45} y={45} color={CY} anchor="middle">A</Label>
      <Label x={140} y={45} color={PK} anchor="middle">B</Label>
      <Label x={235} y={45} color={YE} anchor="middle">A·B</Label>
      <Label x={160} y={170} color={C.dim} anchor="middle">
        {`${A[i][0]}·${B[0][j]} + ${A[i][1]}·${B[1][j]} = ${Cm[i][j]}`}
      </Label>
    </Frame>
  );
}

/** Determinant ako zmena obsahu: matica deformuje jednotkový štvorec */
function DeterminantyDiagram() {
  const [p, setP] = useState(0);
  const M = [
    { m: [2, 1, 0.5, 1.5], l: 'det 2,5' },
    { m: [1.5, 0, 0, 1.5], l: 'det 2,25' },
    { m: [0, 1, 1, 0], l: 'det −1 (prevráti)' },
    { m: [2, 1, 1, 0.5], l: 'det 0 (singulárna)' },
  ];
  const t = useTime();
  const k = (Math.sin(t * 1.4) + 1) / 2; // plynulý prechod 0 → 1
  const [a, b, c, d] = M[p].m;
  const lerp = (x: number, y: number) => [x * (1 - k) + (a * x + b * y) * k, y * (1 - k) + (c * x + d * y) * k];
  const o = { x: 110, y: 150 };
  const s = 40;
  const pt = (q: number[]) => `${o.x + q[0] * s},${o.y - q[1] * s}`;
  const sq = [lerp(0, 0), lerp(1, 0), lerp(1, 1), lerp(0, 1)];
  const det = a * d - b * c;
  return (
    <View style={{ gap: 8 }}>
      <Frame caption={`Matica [[${[a, b].map(String).join('; ').replace(/\./g, ',')}], [${[c, d].map(String).join('; ').replace(/\./g, ',')}]] premení jednotkový štvorec na rovnobežník s obsahom |det| = ${Math.abs(det).toString().replace('.', ',')}. Pri det = 0 sa sploští a inverzná matica neexistuje.`}>
        <Line x1={0} y1={o.y} x2={W} y2={o.y} stroke={AX} />
        <Line x1={o.x} y1={0} x2={o.x} y2={H} stroke={AX} />
        <Polygon points={[[0, 0], [1, 0], [1, 1], [0, 1]].map(pt).join(' ')} fill="none" stroke={C.dim} strokeDasharray="3 3" />
        <Polygon points={sq.map(pt).join(' ')} fill={det === 0 ? 'rgba(251,113,133,0.3)' : 'rgba(56,189,248,0.3)'} stroke={det === 0 ? RD : CY} strokeWidth={2} />
        <Arrow x1={o.x} y1={o.y} x2={o.x + sq[1][0] * s} y2={o.y - sq[1][1] * s} color={YE} w={2.5} />
        <Arrow x1={o.x} y1={o.y} x2={o.x + sq[3][0] * s} y2={o.y - sq[3][1] * s} color={PK} w={2.5} />
        <Label x={W - 8} y={20} color={YE} anchor="end">obsah = |det A|</Label>
      </Frame>
      <Chips value={p} onChange={setP} options={M.map((x, i) => ({ v: i, l: x.l }))} />
    </View>
  );
}

const FUNCS: Record<string, { f: (x: number) => number; name: string; note: string; color: string }> = {
  sin: { f: Math.sin, name: 'sin x', note: 'Nepárna, perióda 2π, hodnoty ⟨−1, 1⟩.', color: CY },
  cos: { f: Math.cos, name: 'cos x', note: 'Párna (súmerná podľa osi y), perióda 2π.', color: PK },
  exp: { f: Math.exp, name: 'eˣ', note: 'Vždy kladná, rastúca, H = (0, ∞). Inverzná je ln x.', color: YE },
  ln: { f: Math.log, name: 'ln x', note: 'Definovaná len pre x > 0. ln 1 = 0.', color: GR },
  atan: { f: Math.atan, name: 'arctg x', note: 'D = ℝ, H = (−π/2, π/2), vodorovné asymptoty y = ±π/2.', color: VI },
  sq: { f: (x) => x * x, name: 'x²', note: 'Párna, minimum v 0. Nie je prostá na celom ℝ.', color: RD },
};

export function GraphAxes({ sx, sy, x0, x1, y0, y1 }: { sx: (x: number) => number; sy: (y: number) => number; x0: number; x1: number; y0: number; y1: number }) {
  return (
    <G>
      <Line x1={sx(x0)} y1={sy(0)} x2={sx(x1)} y2={sy(0)} stroke={AX} />
      <Line x1={sx(0)} y1={sy(y0)} x2={sx(0)} y2={sy(y1)} stroke={AX} />
    </G>
  );
}

function FunkcieDiagram() {
  const [k, setK] = useState('sin');
  const F = FUNCS[k];
  const sx = (x: number) => 160 + x * 25;
  const sy = (y: number) => 100 - y * 25;
  return (
    <View style={{ gap: 8 }}>
      <Frame caption={`${F.name}: ${F.note}`}>
        <GraphAxes sx={sx} sy={sy} x0={-6.4} x1={6.4} y0={-4} y1={4} />
        {k === 'atan' && <Line x1={0} y1={sy(Math.PI / 2)} x2={W} y2={sy(Math.PI / 2)} stroke={VI} strokeDasharray="4 4" strokeOpacity={0.6} />}
        {k === 'atan' && <Line x1={0} y1={sy(-Math.PI / 2)} x2={W} y2={sy(-Math.PI / 2)} stroke={VI} strokeDasharray="4 4" strokeOpacity={0.6} />}
        <Path d={fnPath(F.f, -6.4, 6.4, sx, sy, 300)} stroke={F.color} strokeWidth={2.6} fill="none" />
        <Label x={10} y={20} color={F.color}>y = {F.name}</Label>
      </Frame>
      <Chips value={k} onChange={setK} options={Object.entries(FUNCS).map(([v, o]) => ({ v, l: o.name }))} />
    </View>
  );
}

function LimityDiagram({ init }: { init?: string }) {
  const [k, setK] = useState<'sinx' | 'asym' | 'inf'>((init as 'sinx' | 'asym' | 'inf') || 'sinx');
  const t = useTime();
  const sx = (x: number) => 160 + x * 22;
  const sy = (y: number) => 110 - y * 60;
  if (k === 'asym') {
    const sx2 = (x: number) => 110 + x * 30;
    const sy2 = (y: number) => 100 - y * 18;
    const f = (x: number) => (2 * x + 1) / (x - 2);
    return (
      <View style={{ gap: 8 }}>
        <Frame caption="f(x) = (2x + 1)/(x − 2): vertikálna asymptota x = 2 (menovateľ = 0) a vodorovná y = 2 (podiel vedúcich koeficientov).">
          <GraphAxes sx={sx2} sy={sy2} x0={-3.6} x1={7} y0={-5} y1={5.5} />
          <Line x1={sx2(2)} y1={0} x2={sx2(2)} y2={H} stroke={RD} strokeDasharray="5 4" />
          <Line x1={0} y1={sy2(2)} x2={W} y2={sy2(2)} stroke={YE} strokeDasharray="5 4" />
          <Path d={fnPath(f, -3.6, 1.97, sx2, sy2)} stroke={CY} strokeWidth={2.5} fill="none" />
          <Path d={fnPath(f, 2.03, 7, sx2, sy2)} stroke={CY} strokeWidth={2.5} fill="none" />
          <Label x={sx2(2) + 4} y={14} color={RD}>x = 2</Label>
          <Label x={W - 6} y={sy2(2) - 5} color={YE} anchor="end">y = 2</Label>
        </Frame>
        <Chips value={k} onChange={setK} options={[{ v: 'sinx', l: 'sin x / x' }, { v: 'asym', l: 'asymptoty' }, { v: 'inf', l: 'x → ∞' }]} />
      </View>
    );
  }
  if (k === 'inf') {
    const sx3 = (x: number) => 20 + x * 28;
    const sy3 = (y: number) => 170 - y * 40;
    const f = (x: number) => (3 * x * x + 1) / (x * x + 2);
    return (
      <View style={{ gap: 8 }}>
        <Frame caption="(3x² + 1)/(x² + 2) → 3 pre x → ∞. Rovnaký stupeň čitateľa aj menovateľa, limita = 3/1.">
          <GraphAxes sx={sx3} sy={sy3} x0={0} x1={10.5} y0={0} y1={4} />
          <Line x1={0} y1={sy3(3)} x2={W} y2={sy3(3)} stroke={YE} strokeDasharray="5 4" />
          <Path d={fnPath(f, 0, 10.5, sx3, sy3)} stroke={PK} strokeWidth={2.5} fill="none" />
          <Label x={W - 6} y={sy3(3) - 6} color={YE} anchor="end">y = 3</Label>
        </Frame>
        <Chips value={k} onChange={setK} options={[{ v: 'sinx', l: 'sin x / x' }, { v: 'asym', l: 'asymptoty' }, { v: 'inf', l: 'x → ∞' }]} />
      </View>
    );
  }
  const f = (x: number) => (Math.abs(x) < 1e-9 ? 1 : Math.sin(x) / x);
  const x = 6.5 * Math.abs(Math.cos(t * 0.6)) + 0.05;
  return (
    <View style={{ gap: 8 }}>
      <Frame caption={`Keď x → 0, sin x / x → 1, hoci v nule funkcia nie je definovaná (prázdny krúžok). Teraz x = ${x.toFixed(2).replace('.', ',')}, f(x) = ${f(x).toFixed(3).replace('.', ',')}.`}>
        <GraphAxes sx={sx} sy={sy} x0={-7} x1={7} y0={-0.4} y1={1.6} />
        <Line x1={0} y1={sy(1)} x2={W} y2={sy(1)} stroke={YE} strokeDasharray="5 4" strokeOpacity={0.6} />
        <Path d={fnPath(f, -7, 7, sx, sy, 300)} stroke={CY} strokeWidth={2.5} fill="none" />
        <Circle cx={sx(0)} cy={sy(1)} r={4} fill={C.bg1} stroke={YE} strokeWidth={2} />
        <Circle cx={sx(x)} cy={sy(f(x))} r={5} fill={PK} />
        <Circle cx={sx(-x)} cy={sy(f(-x))} r={5} fill={PK} />
        <Label x={10} y={20} color={CY}>y = sin x / x</Label>
      </Frame>
      <Chips value={k} onChange={setK} options={[{ v: 'sinx', l: 'sin x / x' }, { v: 'asym', l: 'asymptoty' }, { v: 'inf', l: 'x → ∞' }]} />
    </View>
  );
}

/** Dotyčnica: derivácia = smernica, bod sa hýbe po grafe */
function DerivacieDiagram() {
  const [k, setK] = useState<'x2' | 'sin' | 'x3'>('x2');
  const t = useTime();
  const F = {
    x2: { f: (x: number) => x * x / 2, d: (x: number) => x, name: 'x²/2', dn: 'x' },
    sin: { f: Math.sin, d: Math.cos, name: 'sin x', dn: 'cos x' },
    x3: { f: (x: number) => x ** 3 / 6 - x, d: (x: number) => x * x / 2 - 1, name: 'x³/6 − x', dn: 'x²/2 − 1' },
  }[k];
  const sx = (x: number) => 160 + x * 30;
  const sy = (y: number) => 105 - y * 30;
  const x0 = 2.8 * Math.sin(t * 0.7);
  const y0 = F.f(x0);
  const m = F.d(x0);
  const tan = (x: number) => y0 + m * (x - x0);
  return (
    <View style={{ gap: 8 }}>
      <Frame caption={`f(x) = ${F.name}, f′(x) = ${F.dn}. V bode x₀ = ${x0.toFixed(2).replace('.', ',')} je smernica dotyčnice f′(x₀) = ${m.toFixed(2).replace('.', ',')}. ${Math.abs(m) < 0.15 ? 'Takmer vodorovná: stacionárny bod!' : m > 0 ? 'Funkcia tu rastie.' : 'Funkcia tu klesá.'}`}>
        <GraphAxes sx={sx} sy={sy} x0={-5.3} x1={5.3} y0={-3.2} y1={3.4} />
        <Path d={fnPath(F.f, -5.3, 5.3, sx, sy)} stroke={CY} strokeWidth={2.5} fill="none" />
        <Path d={fnPath(F.d, -5.3, 5.3, sx, sy)} stroke={PK} strokeWidth={1.5} strokeDasharray="5 4" fill="none" strokeOpacity={0.8} />
        <Path d={fnPath(tan, x0 - 1.8, x0 + 1.8, sx, sy)} stroke={YE} strokeWidth={2.2} fill="none" />
        <Circle cx={sx(x0)} cy={sy(y0)} r={5.5} fill={YE} />
        <Circle cx={sx(x0)} cy={sy(m)} r={4} fill={PK} />
        <Label x={10} y={20} color={CY}>f(x)</Label>
        <Label x={10} y={36} color={PK}>f′(x) – čiarkovane</Label>
        <Label x={10} y={52} color={YE}>dotyčnica</Label>
      </Frame>
      <Chips value={k} onChange={setK} options={[{ v: 'x2', l: 'x²/2' }, { v: 'sin', l: 'sin x' }, { v: 'x3', l: 'x³/6 − x' }]} />
    </View>
  );
}

/** Priebeh funkcie x³ − 3x */
function PriebehDiagram() {
  const t = useTime();
  const f = (x: number) => x ** 3 - 3 * x;
  const x0 = 2.1 * Math.sin(t * 0.55);
  const m = 3 * x0 * x0 - 3;
  const sx = (x: number) => 160 + x * 55;
  const sy = (y: number) => 100 - y * 30;
  return (
    <Frame caption="f(x) = x³ − 3x, f′ = 3x² − 3, f′′ = 6x. Zelená: rastie (f′ > 0), červená: klesá. Maximum v −1, minimum v 1, inflexný bod v 0.">
      <Rect x={sx(-1)} y={0} width={sx(1) - sx(-1)} height={H} fill="rgba(251,113,133,0.10)" />
      <Rect x={0} y={0} width={sx(-1)} height={H} fill="rgba(52,211,153,0.08)" />
      <Rect x={sx(1)} y={0} width={W - sx(1)} height={H} fill="rgba(52,211,153,0.08)" />
      <GraphAxes sx={sx} sy={sy} x0={-2.9} x1={2.9} y0={-3.2} y1={3.2} />
      <Path d={fnPath(f, -2.25, -1, sx, sy)} stroke={GR} strokeWidth={2.8} fill="none" />
      <Path d={fnPath(f, -1, 1, sx, sy)} stroke={RD} strokeWidth={2.8} fill="none" />
      <Path d={fnPath(f, 1, 2.25, sx, sy)} stroke={GR} strokeWidth={2.8} fill="none" />
      <Circle cx={sx(-1)} cy={sy(2)} r={5.5} fill={YE} />
      <Circle cx={sx(1)} cy={sy(-2)} r={5.5} fill={YE} />
      <Circle cx={sx(0)} cy={sy(0)} r={5} fill={VI} />
      <Label x={sx(-1)} y={sy(2) - 10} color={YE} anchor="middle">max</Label>
      <Label x={sx(1)} y={sy(-2) + 20} color={YE} anchor="middle">min</Label>
      <Label x={sx(0) + 8} y={sy(0) - 8} color={VI}>inflexia</Label>
      <Path d={fnPath((x) => f(x0) + m * (x - x0), x0 - 0.5, x0 + 0.5, sx, sy)} stroke={'#fff'} strokeWidth={2} fill="none" />
      <Circle cx={sx(x0)} cy={sy(f(x0))} r={6} fill={m > 0.15 ? GR : m < -0.15 ? RD : YE} />
      <Label x={W - 8} y={20} color={m > 0.15 ? GR : m < -0.15 ? RD : YE} anchor="end">
        {m > 0.15 ? 'f′ > 0: rastie ↗' : m < -0.15 ? 'f′ < 0: klesá ↘' : 'f′ = 0: extrém!'}
      </Label>
      <Label x={20} y={190} color={C.dim}>konkávna ∩</Label>
      <Label x={300} y={190} color={C.dim} anchor="end">konvexná ∪</Label>
    </Frame>
  );
}

/** Integrál ako plocha pod krivkou */
function IntegralyDiagram() {
  const [n, setN] = useState(6);
  const f = (x: number) => 0.25 * x * x + 0.5;
  const a = 0;
  const b = 4;
  const sx = (x: number) => 40 + x * 62;
  const sy = (y: number) => 180 - y * 34;
  const dx = (b - a) / n;
  let sum = 0;
  const rects = Array.from({ length: n }, (_, i) => {
    const x = a + i * dx;
    const h = f(x + dx / 2);
    sum += h * dx;
    return <Rect key={i} x={sx(x)} y={sy(h)} width={sx(x + dx) - sx(x)} height={sy(0) - sy(h)} fill="rgba(56,189,248,0.25)" stroke={CY} strokeWidth={1} />;
  });
  const exact = (b ** 3 / 12 + 0.5 * b) - 0;
  return (
    <View style={{ gap: 8 }}>
      <Frame caption={`Plocha pod f(x) = x²/4 + 1/2 na ⟨0, 4⟩. ${n} obdĺžnikov dá ${sum.toFixed(3).replace('.', ',')}, presne cez primitívnu funkciu F(x) = x³/12 + x/2: F(4) − F(0) = ${exact.toFixed(3).replace('.', ',')}.`}>
        <GraphAxes sx={sx} sy={sy} x0={-0.3} x1={4.4} y0={-0.2} y1={5} />
        {rects}
        <Path d={fnPath(f, -0.3, 4.4, sx, sy)} stroke={YE} strokeWidth={2.6} fill="none" />
        <Label x={sx(b)} y={sy(0) + 14} color={C.dim} anchor="middle">4</Label>
        <Label x={10} y={20} color={YE}>F′(x) = f(x)</Label>
      </Frame>
      <Chips label="obdĺžniky:" value={n} onChange={setN} options={[2, 4, 6, 12, 40].map((v) => ({ v, l: String(v) }))} />
    </View>
  );
}

const DIAGRAMS: Record<string, (p: { init?: string }) => React.ReactElement> = {
  'fyz:kmity': KmityDiagram,
  'fyz:skladanie': SkladanieDiagram,
  'fyz:vlny': VlnyDiagram,
  'fyz:doppler': DopplerDiagram,
  'fyz:em': EmDiagram,
  'fyz:optika': OptikaDiagram,
  'fyz:sosovky': SosovkyDiagram,
  'mat:vektory': VektoryDiagram,
  'mat:geometria': GeometriaDiagram,
  'mat:matice': MaticeDiagram,
  'mat:determinanty': DeterminantyDiagram,
  'mat:funkcie': FunkcieDiagram,
  'mat:limity': LimityDiagram,
  'mat:derivacie': DerivacieDiagram,
  'mat:priebeh': PriebehDiagram,
  'mat:integraly': IntegralyDiagram,
};

export function TopicDiagram({ id, init }: { id: string; init?: string }) {
  const D = DIAGRAMS[id];
  return D ? <D init={init} /> : null;
}

export function hasDiagram(id: string) {
  return id in DIAGRAMS;
}

// malé dekorácie na úvodnú obrazovku
export function HeroWave({ color }: { color: string }) {
  const t = useTime();
  const d = fnPath((x) => 14 * Math.sin(x * 0.05 - t * 2) * Math.cos(x * 0.012), 0, W, (x) => x, (y) => 24 - y);
  const d2 = fnPath((x) => 10 * Math.sin(x * 0.07 - t * 2.6 + 1), 0, W, (x) => x, (y) => 24 - y);
  return (
    <Svg viewBox={`0 0 ${W} 48`} style={{ width: '100%', aspectRatio: W / 48 }}>
      <Defs>
        <LinearGradient id="hw" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor={color} stopOpacity={0} />
          <Stop offset="0.5" stopColor={color} stopOpacity={1} />
          <Stop offset="1" stopColor={color} stopOpacity={0} />
        </LinearGradient>
      </Defs>
      <Path d={d} stroke="url(#hw)" strokeWidth={2.5} fill="none" />
      <Path d={d2} stroke="url(#hw)" strokeWidth={1.2} strokeOpacity={0.5} fill="none" />
    </Svg>
  );
}
