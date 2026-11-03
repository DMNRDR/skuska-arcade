import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Circle, Line, Path, Polygon } from 'react-native-svg';
import { Label } from '../../components/diagrams';
import { C, haptic } from '../../components/ui';
import { play } from '../../sound';
import { CH, Chalk, Goal, sk, Slider, Stamp, T, Toggle, useOnce } from '../kit';

// Deskriptíva, 2. písomka: pokusy na dotyk (axonometria, lineárna perspektíva, množina pre projekčné centrum).
// Všetko sa počíta: axonometria z jednotiek na osiach, perspektíva stredovým premietaním cez kameru.

type P2 = [number, number];
const d = (ps: P2[], close = true) => ps.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join('') + (close ? 'Z' : '');

// ───────────────────────── typy šikmej axonometrie ─────────────────────────

type AxType = { id: string; name: string; ex: P2; ey: P2; ez: P2; keep: 'xy' | 'xz' | null; rule: string; info: string };
const R2 = Math.SQRT1_2;
const AX: AxType[] = [
  { id: 'voj', name: 'Vojenská', ex: [-0.866, 0.5], ey: [0.5, 0.866], ez: [0, -1], keep: 'xy', rule: 'x ⊥ y, jx = jy = j_z = j', info: 'Priemetňa ∥ pôdorysňa. Pôdorys (a všetko vodorovné) má skutočný tvar, preto sa hodí na mapy a sídliská.' },
  { id: 'kav', name: 'Kavalierna', ex: [-1, 0], ey: [R2, R2], ez: [0, -1], keep: 'xz', rule: 'x ⊥ z, jx = jy = j_z = j', info: 'Priemetňa ∥ nárysňa. Predná stena má skutočný tvar, hĺbka sa neskracuje, preto teleso pôsobí pretiahnuto.' },
  { id: 'sik', name: 'Šikmé premietanie', ex: [-1, 0], ey: [R2 / 2, R2 / 2], ez: [0, -1], keep: 'xz', rule: 'x ⊥ z, j_x = j_z = j, j_y < j', info: 'Ako kavalierna, ale hĺbka sa skracuje (tu jy = j/2, voľné rovnobežné premietanie). Vyzerá prirodzenejšie.' },
  { id: 'vse', name: 'Všeobecná šikmá', ex: [-0.92, 0.3], ey: [0.6, 0.44], ez: [0.12, -0.86], keep: null, rule: 'osi aj jednotky ľubovoľné', info: 'Podľa Pohlkeho vety môžu byť osi aj jednotky ľubovoľné. Žiadna súradnicová rovina nemá skutočný tvar.' },
];

export function AxTypes({ onWin }: { onWin?: () => void }) {
  const [sel, setSel] = useState(0);
  const [seen, setSeen] = useState<string[]>([AX[0].id]);
  const t = AX[sel];
  const u = 46;
  const O: P2 = [190, 150];
  const P = (x: number, y: number, z: number): P2 => [O[0] + u * (x * t.ex[0] + y * t.ey[0] + z * t.ez[0]), O[1] + u * (x * t.ex[1] + y * t.ey[1] + z * t.ez[1])];
  const V3: [number, number, number][] = [[0, 0, 0], [2, 0, 0], [2, 2, 0], [0, 2, 0], [0, 0, 2], [2, 0, 2], [2, 2, 2], [0, 2, 2]];
  const E = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
  const circle = (pl: 'xy' | 'xz' | 'yz') => {
    const ps: P2[] = [];
    for (let i = 0; i <= 60; i++) {
      const a = (i / 60) * 2 * Math.PI;
      const c = Math.cos(a), s = Math.sin(a);
      ps.push(pl === 'xy' ? P(1 + c, 1 + s, 2) : pl === 'xz' ? P(1 + c, 2, 1 + s) : P(2, 1 + c, 1 + s));
    }
    return ps;
  };
  const done = seen.length === AX.length;
  useOnce(done, () => onWin?.());
  const axisEnd = (v: P2): P2 => [O[0] + u * 2.8 * v[0], O[1] + u * 2.8 * v[1]];
  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {AX.map((a, i) => (
          <Toggle
            key={a.id}
            on={i === sel}
            label={a.name}
            color={C.teal}
            onPress={() => {
              setSel(i);
              if (!seen.includes(a.id)) setSeen([...seen, a.id]);
            }}
          />
        ))}
      </View>
      <Chalk w={340} h={250}>
        {(['x', 'y', 'z'] as const).map((k) => {
          const v = k === 'x' ? t.ex : k === 'y' ? t.ey : t.ez;
          const e = axisEnd(v);
          return (
            <React.Fragment key={k}>
              <Line x1={O[0]} y1={O[1]} x2={e[0]} y2={e[1]} stroke={CH.dim} strokeWidth={1.2} />
              <Label x={e[0] + (v[0] < 0 ? -12 : 4)} y={e[1] + (v[1] > 0.3 ? 12 : -4)} color={CH.dim} size={13}>
                {k}
              </Label>
            </React.Fragment>
          );
        })}
        {E.map(([a, b], i) => {
          const p = P(...V3[a]), q = P(...V3[b]);
          return <Line key={i} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={CH.text} strokeWidth={2} />;
        })}
        {(['xy', 'xz', 'yz'] as const).map((pl) => (
          <Path key={pl} d={d(circle(pl))} stroke={t.keep === pl ? CH.c : CH.b} strokeWidth={t.keep === pl ? 3 : 1.4} fill="none" />
        ))}
        {/* jednotky na osiach */}
        {(['x', 'y', 'z'] as const).map((k) => {
          const v = k === 'x' ? t.ex : k === 'y' ? t.ey : t.ez;
          const len = Math.hypot(v[0], v[1]);
          return (
            <Label key={'j' + k} x={8} y={k === 'x' ? 20 : k === 'y' ? 38 : 56} color={CH.a} size={13}>
              {`j${k} = ${sk(len, 2)}·j`}
            </Label>
          );
        })}
        <Label x={332} y={244} color={t.keep ? CH.c : CH.dim} size={12} anchor="end">
          {t.keep === 'xy' ? 'ružová kružnica: skutočný tvar (pôdorys)' : t.keep === 'xz' ? 'ružová kružnica: skutočný tvar (predná stena)' : 'všetky kružnice sú elipsy'}
        </Label>
      </Chalk>
      <Text style={[T.lead, { fontWeight: '700' }]}>{t.rule.replace(/j_([xyz])/g, 'j$1')}</Text>
      <Text style={T.small}>{t.info}</Text>
      <Goal done={done}>Pozri všetky štyri typy a všimni si, ktorá kružnica ostane kružnicou</Goal>
      <Stamp show={done} />
    </View>
  );
}

// ───────────────────────── lineárna perspektíva: kváder pred kamerou ─────────────────────────

const W = 340, Hh = 270, FOC = 150, HX = W / 2, HY = Hh / 2;

export function PerspBox({ onWin }: { onWin?: () => void }) {
  const [rot, setRot] = useState(30);
  const [eye, setEye] = useState(1.0);
  const [tilt, setTilt] = useState<'zvisla' | 'vtacia' | 'zabia'>('zvisla');
  const [got, setGot] = useState<string[]>([]);
  const mark = (k: string) => {
    if (got.includes(k)) return;
    play('correct');
    haptic('ok');
    setGot((g) => [...g, k]);
  };
  const p = ((tilt === 'vtacia' ? -18 : tilt === 'zabia' ? 18 : 0) * Math.PI) / 180;
  const F = [0, Math.cos(p), Math.sin(p)], Rr = [1, 0, 0], U = [0, -Math.sin(p), Math.cos(p)];
  const cam = [0, 0, eye];
  const dot = (a: number[], b: number[]) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const proj = (X: number[]): P2 | null => {
    const v = [X[0] - cam[0], X[1] - cam[1], X[2] - cam[2]];
    const zc = dot(v, F);
    if (zc <= 0.05) return null;
    return [HX + (FOC * dot(v, Rr)) / zc, HY - (FOC * dot(v, U)) / zc];
  };
  const vp = (dir: number[]): P2 | null => {
    const zc = dot(dir, F);
    if (Math.abs(zc) < 1e-6) return null;
    return [HX + (FOC * dot(dir, Rr)) / zc, HY - (FOC * dot(dir, U)) / zc];
  };
  const ph = (rot * Math.PI) / 180;
  const a1 = [Math.cos(ph), Math.sin(ph), 0], a2 = [-Math.sin(ph), Math.cos(ph), 0];
  const cen = [0, 5.2, 0], hw = 1.1, hb = 2;
  const corner = (i: number, j: number, k: number) => [cen[0] + i * hw * a1[0] + j * hw * a2[0], cen[1] + i * hw * a1[1] + j * hw * a2[1], k * hb];
  const pts: (P2 | null)[] = [];
  const idx: [number, number, number][] = [];
  for (const k of [0, 1]) for (const [i, j] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
    idx.push([i, j, k]);
    pts.push(proj(corner(i, j, k)));
  }
  const edges = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
  const horizonY = HY + FOC * Math.tan(p);
  const v1 = vp(a1), v2 = vp(a2), vc = vp([0, 0, 1]);
  const inView = (q: P2 | null) => q && q[0] > -20 && q[0] < W + 20 && q[1] > -20 && q[1] < Hh + 20;
  const priecelna = rot === 0;
  const topOnH = Math.abs(eye - hb) < 0.06 && tilt === 'zvisla';
  useOnce(priecelna, () => mark('priecelna'));
  useOnce(topOnH, () => mark('hore'));
  useOnce(tilt === 'vtacia', () => mark('vtacia'));
  useOnce(tilt === 'zabia', () => mark('zabia'));
  const done = got.length >= 4;
  useOnce(done, () => onWin?.());
  const status = priecelna
    ? 'PRIEČELNÁ: hĺbkové hrany smerujú do H, šírkové sú vodorovné (nevlastný úbežník)'
    : 'NEPRIEČELNÁ: dva úbežníky vodorovných hrán na horizonte';
  return (
    <View style={{ gap: 12 }}>
      <Chalk w={W} h={Hh}>
        <Circle cx={HX} cy={HY} r={FOC} stroke={CH.dim} strokeDasharray="3 5" fill="none" />
        <Line x1={0} y1={horizonY} x2={W} y2={horizonY} stroke={CH.c} strokeWidth={2} />
        <Label x={W - 14} y={horizonY - 6} color={CH.c} size={13}>h</Label>
        <Circle cx={HX} cy={HY} r={3.5} fill={CH.b} />
        <Label x={HX + 6} y={HY - 6} color={CH.b} size={13}>H</Label>
        {[v1, v2].map((v, i) =>
          inView(v) ? (
            <React.Fragment key={i}>
              {edges
                .filter(([a, b]) => {
                  const da = idx[a], db = idx[b];
                  return da[2] === db[2] && (i === 0 ? da[1] === db[1] : da[0] === db[0]);
                })
                .map(([a]) => pts[a])
                .filter(Boolean)
                .map((q, k) => (
                  <Line key={k} x1={q![0]} y1={q![1]} x2={v![0]} y2={v![1]} stroke={CH.a} strokeOpacity={0.45} strokeDasharray="4 4" />
                ))}
              <Circle cx={v![0]} cy={v![1]} r={4.5} fill={CH.a} />
              <Label x={v![0] + 5} y={v![1] + 16} color={CH.a} size={13}>{`U${i + 1}`}</Label>
            </React.Fragment>
          ) : null,
        )}
        {edges.map(([a, b], i) => {
          const q = pts[a], r = pts[b];
          if (!q || !r) return null;
          return <Line key={i} x1={q[0]} y1={q[1]} x2={r[0]} y2={r[1]} stroke={CH.text} strokeWidth={2.2} />;
        })}
        {pts[4] && pts[5] && pts[6] && pts[7] && <Polygon points={[4, 5, 6, 7].map((i) => pts[i]!.join(',')).join(' ')} fill={CH.d} fillOpacity={topOnH ? 0.5 : 0.12} />}
        <Label x={8} y={18} color={CH.dim} size={11}>zorná kružnica (H, d) · čiarkovane</Label>
        {tilt !== 'zvisla' && vc && (
          <Label x={8} y={Hh - 10} color={CH.c} size={12}>
            {tilt === 'vtacia' ? `zvislé hrany sa zbiehajú dole do Uc (${Math.round(vc[1] - HY)} px pod H)` : `zvislé hrany sa zbiehajú hore do Uc (${Math.round(HY - vc[1])} px nad H)`}
          </Label>
        )}
        {tilt === 'zvisla' && <Label x={8} y={Hh - 10} color={CH.dim} size={12}>zvislá perspektíva: h ide cez H, zvislé hrany sú zvislé</Label>}
      </Chalk>
      <Text style={T.small}>{status}</Text>
      <Slider label="Natočenie kvádra" value={rot} min={0} max={60} step={1} unit="°" fmt={(x) => String(Math.round(x))} onChange={setRot} marks={[{ v: 0, l: '0°' }, { v: 60, l: '60°' }]} />
      <Slider label="Výška oka (kváder má výšku 2)" value={eye} min={0.3} max={3.6} step={0.05} fmt={(x) => sk(x, 2)} onChange={setEye} color={C.blue} marks={[{ v: 2, l: '2' }]} />
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <Toggle on={tilt === 'zvisla'} label="Zvislá" color={C.teal} onPress={() => setTilt('zvisla')} />
        <Toggle on={tilt === 'vtacia'} label="Šikmá vtáčia" color={C.teal} onPress={() => setTilt('vtacia')} />
        <Toggle on={tilt === 'zabia'} label="Šikmá žabia" color={C.teal} onPress={() => setTilt('zabia')} />
      </View>
      <Goal done={got.includes('priecelna')}>Natoč kváder do priečelnej polohy (0°)</Goal>
      <Goal done={got.includes('hore')}>Vo zvislej perspektíve daj oko do výšky hornej podstavy: celá podstava padne do horizontu</Goal>
      <Goal done={got.includes('vtacia') && got.includes('zabia')}>Prepni na vtáčiu aj žabiu a sleduj, kde je horizont voči H</Goal>
      <Stamp show={done} />
    </View>
  );
}

// ───────────────────────── kde leží projekčné centrum S ─────────────────────────

const UA: P2 = [115, 150], UB: P2 = [225, 150];
const ALPHAS = [60, 90, 120];

function arcsG(al: number): P2[][] {
  const A = UA, B = UB, dd = B[0] - A[0];
  const r = dd / (2 * Math.sin((al * Math.PI) / 180));
  const m: P2 = [(A[0] + B[0]) / 2, A[1]];
  const off = r * Math.cos((al * Math.PI) / 180);
  const out: P2[][] = [];
  for (const sg of [1, -1]) {
    const O: P2 = [m[0], m[1] + sg * off];
    // body oblúka na tej strane AB, kde je bod pre uhol al: pre ostrý stred O je na rovnakej strane
    const ps: P2[] = [];
    for (let i = 0; i <= 120; i++) {
      const t = (i / 120) * 2 * Math.PI;
      const q: P2 = [O[0] + r * Math.cos(t), O[1] + r * Math.sin(t)];
      const side = Math.sign(q[1] - A[1]);
      const want = al < 90 ? sg : al > 90 ? -sg : side;
      if (side === want || al === 90) ps.push(q);
    }
    out.push(ps);
  }
  return out;
}

export function AngleLocus({ onWin }: { onWin?: () => void }) {
  const [al, setAl] = useState(60);
  const [S, setS] = useState<P2>([170, 70]);
  const [found, setFound] = useState<number[]>([]);
  const ang = (() => {
    const a = [UA[0] - S[0], UA[1] - S[1]], b = [UB[0] - S[0], UB[1] - S[1]];
    const c = (a[0] * b[0] + a[1] * b[1]) / (Math.hypot(a[0], a[1]) * Math.hypot(b[0], b[1]));
    return (Math.acos(Math.max(-1, Math.min(1, c))) * 180) / Math.PI;
  })();
  const ok = Math.abs(ang - al) < 1.5;
  useOnce(ok && !found.includes(al), () => {
    play('correct');
    haptic('ok');
    setFound((f) => (f.includes(al) ? f : [...f, al]));
  });
  const done = found.length === ALPHAS.length;
  useOnce(done, () => onWin?.());
  const arcs = arcsG(al);
  const names: Record<number, string> = { 60: 'časť anuloidu (melonoid), v rovine oblúky G', 90: 'guľová plocha, v rovine Tálesova kružnica', 120: 'časť anuloidu, v rovine menšie oblúky G' };
  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {ALPHAS.map((a) => (
          <Toggle key={a} on={a === al} label={`α = ${a}°${found.includes(a) ? ' ✓' : ''}`} color={C.teal} onPress={() => setAl(a)} />
        ))}
      </View>
      <Chalk w={340} h={300} handles={[{ id: 'S', x: S[0], y: S[1] }]} onDrag={(_id, x, y) => setS([Math.max(4, Math.min(336, x)), Math.max(4, Math.min(296, y))])}>
        {arcs.map((ps, i) => ps.map((q, k) => <Circle key={`${i}-${k}`} cx={q[0]} cy={q[1]} r={1.3} fill={CH.c} fillOpacity={0.55} />))}
        <Line x1={UA[0]} y1={UA[1]} x2={UB[0]} y2={UB[1]} stroke={CH.text} strokeWidth={2} />
        <Line x1={S[0]} y1={S[1]} x2={UA[0]} y2={UA[1]} stroke={ok ? CH.d : CH.a} strokeWidth={2} />
        <Line x1={S[0]} y1={S[1]} x2={UB[0]} y2={UB[1]} stroke={ok ? CH.d : CH.a} strokeWidth={2} />
        <Circle cx={UA[0]} cy={UA[1]} r={4} fill={CH.text} />
        <Circle cx={UB[0]} cy={UB[1]} r={4} fill={CH.text} />
        <Label x={UA[0] - 30} y={UA[1] + 4} color={CH.text} size={13}>Ua</Label>
        <Label x={UB[0] + 8} y={UB[1] + 4} color={CH.text} size={13}>Ub</Label>
        <Circle cx={S[0]} cy={S[1]} r={13} fill={ok ? CH.d : CH.b} fillOpacity={0.25} />
        <Circle cx={S[0]} cy={S[1]} r={4.5} fill={ok ? CH.d : CH.b} />
        <Label x={S[0] + 10} y={S[1] - 8} color={ok ? CH.d : CH.b} size={14}>{`S  ${Math.round(ang)}°`}</Label>
        <Label x={8} y={20} color={CH.dim} size={12}>{`smery zvierajú α = ${al}°`}</Label>
        <Label x={8} y={292} color={CH.c} size={12}>{names[al]}</Label>
      </Chalk>
      <Text style={T.small}>
        Ua a Ub sú úbežníky dvoch smerov, ktoré v skutočnosti zvierajú uhol α. Projekčné centrum S musí vidieť úsečku UaUb presne pod uhlom α. Ťahaj S a hľadaj také miesto. Ružové bodky ukazujú celú množinu (v priestore ju dostaneš rotáciou okolo UaUb).
      </Text>
      {ALPHAS.map((a) => (
        <Goal key={a} done={found.includes(a)}>{`Nájdi miesto pre α = ${a}°`}</Goal>
      ))}
      <Stamp show={done} />
    </View>
  );
}
