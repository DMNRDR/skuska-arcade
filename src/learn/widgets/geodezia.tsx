import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Circle, G, Line, Path, Polygon, Rect } from 'react-native-svg';
import { Arrow, Frame, GR, H, Label, PK, useTime, W, YE, CY } from '../../components/diagrams';
import { C, F, haptic } from '../../components/ui';
import { play } from '../../sound';
import { Eq, NumIn, parseNum, sk, Slider, Stamp, T, Toggle, useOnce, Verdict } from '../kit';

// Geodézia 1, Zadanie 5 (zákon hromadenia stredných chýb). Čísla sú z individuálneho
// zadania č. 15 (G1_zad5-vstupne_hodnoty.xlsx, Molnar Adam).

export const R_MER = [131.4, 131.29, 131.15, 131.24, 131.19, 131.17];
export const B_ZAD = { d: 201.26, md: 0.03, beta: 19.5082, mb: 5, hp: 2.31, mhp: 0.02, hc: 2.14, mhc: 0.01 };
const RHO = 2000000 / Math.PI; // ρ v cc

const n = R_MER.length;
const rMean = R_MER.reduce((a, b) => a + b, 0) / n;
const vMm = R_MER.map((r) => Math.round((rMean - r) * 1000));
const sumV2 = vMm.reduce((a, v) => a + v * v, 0);
const m0 = Math.sqrt(sumV2 / (n - 1));
const mr = m0 / Math.sqrt(n);

const mm = (x: number) => (x > 0 ? '+' : '') + sk(x, 0);

/** Úloha A: tabuľka opráv. Ťukaj riadky, každý ukáže v = r̄ − rᵢ a v². */
export function GeoTabA({ onWin }: { onWin?: () => void }) {
  const [open, setOpen] = useState<number[]>([]);
  const all = open.length === n;
  useOnce(all, () => onWin?.());
  const sumSoFar = open.reduce((a, i) => a + vMm[i] * vMm[i], 0);
  const cell = { fontFamily: F.monoBold, fontSize: 15, color: C.ink, textAlign: 'center' as const };
  const head = { fontFamily: F.mono, fontSize: 12, color: C.ink2, textAlign: 'center' as const };
  return (
    <View style={{ gap: 10 }}>
      <Text style={T.small}>Priemer r̄ = 787,44 / 6 = 131,240 m. Ťukni na každé meranie a uvidíš jeho opravu.</Text>
      <View style={{ borderWidth: 2, borderColor: C.ink, borderRadius: 6, overflow: 'hidden', backgroundColor: C.sheet }}>
        <View style={{ flexDirection: 'row', backgroundColor: C.paper2, paddingVertical: 6 }}>
          <Text style={[head, { flex: 0.5 }]}>č.</Text>
          <Text style={[head, { flex: 1.3 }]}>rᵢ [m]</Text>
          <Text style={[head, { flex: 1.3 }]}>v [mm]</Text>
          <Text style={[head, { flex: 1.3 }]}>v² [mm²]</Text>
        </View>
        {R_MER.map((r, i) => {
          const on = open.includes(i);
          return (
            <Pressable
              key={i}
              onPress={() => {
                if (on) return;
                haptic('tap');
                play('pop');
                setOpen([...open, i]);
              }}
              style={({ pressed }) => ({ flexDirection: 'row', paddingVertical: 9, borderTopWidth: 1, borderTopColor: C.rule, backgroundColor: on ? '#E3F3E8' : pressed ? C.paper : 'transparent' })}
            >
              <Text style={[cell, { flex: 0.5 }]}>{i + 1}</Text>
              <Text style={[cell, { flex: 1.3 }]}>{r.toFixed(2).replace('.', ',')}</Text>
              <Text style={[cell, { flex: 1.3, color: on ? (vMm[i] < 0 ? C.bad : C.good) : C.rule }]}>{on ? mm(vMm[i]) : 'ťukni'}</Text>
              <Text style={[cell, { flex: 1.3 }]}>{on ? sk(vMm[i] * vMm[i], 0) : ''}</Text>
            </Pressable>
          );
        })}
        <View style={{ flexDirection: 'row', paddingVertical: 8, borderTopWidth: 2, borderTopColor: C.ink, backgroundColor: C.paper2 }}>
          <Text style={[cell, { flex: 0.5 }]}>Σ</Text>
          <Text style={[cell, { flex: 1.3 }]}>787,44</Text>
          <Text style={[cell, { flex: 1.3 }]}>{all ? '0' : ''}</Text>
          <Text style={[cell, { flex: 1.3 }]}>{open.length ? sk(sumSoFar, 0) : ''}</Text>
        </View>
      </View>
      {all ? (
        <View style={{ gap: 8 }}>
          <Verdict ok>Súčet opráv Σv = 0, takže priemer je vypočítaný správne. Σv² = {sk(sumV2, 0)} mm².</Verdict>
          <Eq size={17} parts={['m₀ = √(Σv² / (n − 1)) = √(', sk(sumV2, 0), ' / 5) = ', [sk(m0, 1) + ' mm', C.orange]]} />
          <Eq size={17} parts={['mr = m₀ / √n = ', sk(m0, 1), ' / √6 = ', [sk(mr, 1) + ' mm', C.orange]]} />
        </View>
      ) : (
        <Text style={T.small}>Otvorené {open.length} zo 6.</Text>
      )}
      <Stamp show={all} />
    </View>
  );
}

type Field = { key: string; label: string; unit: string; ok: number; tol: number; hint: string };

const A_FIELDS: Field[] = [
  { key: 'r', label: 'r̄ (priemer)', unit: 'm', ok: rMean, tol: 0.0006, hint: 'Sčítaj 6 meraní a vydeľ 6.' },
  { key: 'm0', label: 'm₀', unit: 'mm', ok: m0, tol: 0.6, hint: '√(Σv² / 5), Σv² = 43 600 mm².' },
  { key: 'mr', label: 'mr', unit: 'mm', ok: mr, tol: 0.6, hint: 'm₀ / √6.' },
  { key: 'O', label: 'O = 2πr̄', unit: 'm', ok: 2 * Math.PI * rMean, tol: 0.006, hint: '2 · π · 131,24.' },
  { key: 'mO', label: 'mO = 2π·mr', unit: 'm', ok: 2 * Math.PI * (mr / 1000), tol: 0.006, hint: 'mr daj v metroch: 0,0381.' },
  { key: 'P', label: 'P = πr̄²', unit: 'm²', ok: Math.PI * rMean * rMean, tol: 0.6, hint: 'π · 131,24².' },
  { key: 'mP', label: 'mP = 2πr̄·mr', unit: 'm²', ok: 2 * Math.PI * rMean * (mr / 1000), tol: 0.6, hint: '2 · π · 131,24 · 0,0381.' },
];

const B_FIELDS: Field[] = (() => {
  const { d, md, beta, mb, hp, mhp, hc, mhc } = B_ZAD;
  const b = (beta * Math.PI) / 200;
  const t = Math.tan(b);
  const t1 = t * md;
  const t2 = (d / Math.cos(b) ** 2) * (mb / RHO);
  return [
    { key: 'tg', label: 'tg β', unit: '', ok: t, tol: 0.0006, hint: 'Kalkulačka v režime GRAD: tan(19,5082).' },
    { key: 'dh', label: 'Δh = d·tg β + hp − hc', unit: 'm', ok: d * t + hp - hc, tol: 0.006, hint: '201,26 · tg β + 2,31 − 2,14.' },
    { key: 'mdh', label: 'mΔh', unit: 'm', ok: Math.sqrt(t1 * t1 + t2 * t2 + mhp * mhp + mhc * mhc), tol: 0.0011, hint: '√(0,0095² + 0,0017² + 0,02² + 0,01²).' },
  ];
})();

/** Boss: zadaj svoje výsledky, každé políčko sa hneď skontroluje. */
function Checker({ fields, onWin }: { fields: Field[]; onWin?: () => void }) {
  const [val, setVal] = useState<Record<string, string>>({});
  const [hint, setHint] = useState<string | null>(null);
  const state = (f: Field) => {
    const x = parseNum(val[f.key] ?? '');
    if (isNaN(x)) return null;
    return Math.abs(x - f.ok) <= f.tol ? 'ok' : 'bad';
  };
  const done = fields.every((f) => state(f) === 'ok');
  useOnce(done, () => onWin?.());
  return (
    <View style={{ gap: 10 }}>
      {fields.map((f) => {
        const st = state(f);
        return (
          <View key={f.key} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text style={{ flex: 1, fontFamily: F.bodyMed, fontSize: 16, color: C.ink }}>{f.label}</Text>
            <NumIn width={112} value={val[f.key] ?? ''} state={st} onChange={(s) => setVal({ ...val, [f.key]: s })} />
            <Text style={{ width: 34, fontFamily: F.mono, fontSize: 14, color: C.ink2 }}>{f.unit}</Text>
            <Pressable onPress={() => setHint(`${f.label}: ${f.hint}`)} hitSlop={8} style={{ width: 30, height: 30, borderRadius: 15, borderWidth: 2, borderColor: C.ink, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontFamily: F.monoBold, fontSize: 14, color: C.ink }}>?</Text>
            </Pressable>
          </View>
        );
      })}
      {hint && !done ? <Text style={T.small}>Nápoveda: {hint}</Text> : null}
      {done ? <Verdict ok>Všetko sedí. Tieto čísla patria do výpočtového protokolu.</Verdict> : <Text style={T.small}>Počítaj na kalkulačke, desatinnú čiarku môžeš písať aj ako bodku. Zelená = správne.</Text>}
      <Stamp show={done} />
    </View>
  );
}

export const GeoBossA = ({ onWin }: { onWin?: () => void }) => <Checker fields={A_FIELDS} onWin={onWin} />;
export const GeoBossB = ({ onWin }: { onWin?: () => void }) => <Checker fields={B_FIELDS} onWin={onWin} />;

/** Úloha B: ktorá chyba najviac zväčší mΔh? Posuvníky menia stredné chyby, stĺpce ukazujú podiel. */
export function GeoPodiel({ onWin }: { onWin?: () => void }) {
  const { d, beta } = B_ZAD;
  const [md, setMd] = useState(B_ZAD.md);
  const [mb, setMb] = useState(B_ZAD.mb);
  const [mhp, setMhp] = useState(B_ZAD.mhp);
  const [mhc, setMhc] = useState(B_ZAD.mhc);
  const [touched, setTouched] = useState(false);
  useOnce(touched, () => onWin?.());
  const b = (beta * Math.PI) / 200;
  const terms = [
    { l: 'tg β · md', v: Math.tan(b) * md, c: CY },
    { l: 'd/cos²β · mβ/ρ', v: (d / Math.cos(b) ** 2) * (mb / RHO), c: PK },
    { l: 'mhp', v: mhp, c: GR },
    { l: 'mhc', v: mhc, c: YE },
  ];
  const tot = Math.sqrt(terms.reduce((a, t) => a + t.v * t.v, 0));
  const max = 0.035;
  const t = (f: (v: number) => void) => (v: number) => {
    setTouched(true);
    f(v);
  };
  return (
    <View style={{ gap: 12 }}>
      <Frame caption="Dĺžka stĺpca = príspevok chyby v metroch. Pod odmocninou sa sčítavajú ich druhé mocniny.">
        {terms.map((tr, i) => {
          const y = 22 + i * 40;
          const w = Math.min(1, tr.v / max) * 200;
          return (
            <G key={tr.l}>
              <Label x={8} y={y + 4} size={10}>
                {tr.l}
              </Label>
              <Rect x={108} y={y - 9} width={Math.max(2, w)} height={18} rx={3} fill={tr.c} />
              <Label x={112 + w} y={y + 4} size={10}>
                {sk(tr.v * 1000, 1)} mm
              </Label>
            </G>
          );
        })}
        <Line x1={8} y1={176} x2={312} y2={176} stroke="rgba(243,240,230,0.3)" />
        <Label x={8} y={194} size={12} color={YE}>
          mΔh = {sk(tot * 1000, 1)} mm = {sk(tot, 3)} m
        </Label>
      </Frame>
      <Slider label="md (dĺžka)" value={md} min={0} max={0.1} step={0.01} unit="m" fmt={(v) => sk(v, 2)} onChange={t(setMd)} color={C.blue} />
      <Slider label="mβ (uhol)" value={mb} min={0} max={60} step={5} unit="cc" fmt={(v) => sk(v, 0)} onChange={t(setMb)} color={C.orange} />
      <Slider label="mhp (výška prístroja)" value={mhp} min={0} max={0.05} step={0.01} unit="m" fmt={(v) => sk(v, 2)} onChange={t(setMhp)} color={C.teal} />
      <Slider label="mhc (výška cieľa)" value={mhc} min={0} max={0.05} step={0.01} unit="m" fmt={(v) => sk(v, 2)} onChange={t(setMhc)} color={C.gold} />
      <View style={{ flexDirection: 'row' }}>
        <Toggle
          on={false}
          label="Späť na moje zadanie"
          onPress={() => {
            setMd(B_ZAD.md);
            setMb(B_ZAD.mb);
            setMhp(B_ZAD.mhp);
            setMhc(B_ZAD.mhc);
          }}
        />
      </View>
    </View>
  );
}

// ───────────── obrázky do krokov lekcie (fig: 'geo-…') ─────────────

/** kruhová stavba, polomer meraný na 6 miestach (lúče sa postupne rozsvecujú) */
function Kruh() {
  const t = useTime();
  const cx = 110;
  const cy = 100;
  const R = 70;
  const k = Math.floor(t / 0.8) % 7;
  return (
    <Frame caption="Polomer tej istej stavby zmeriaš 6-krát na rôznych miestach. Každé meranie vyjde trochu inak, to je náhodná chyba.">
      <Circle cx={cx} cy={cy} r={R} stroke="rgba(243,240,230,0.85)" strokeWidth={3} fill="rgba(243,240,230,0.05)" />
      <Circle cx={cx} cy={cy} r={3} fill={YE} />
      <Label x={cx - 4} y={cy + 16} color={YE}>
        S
      </Label>
      {R_MER.map((r, i) => {
        const a = -Math.PI / 2 + (i * Math.PI) / 3;
        const len = R + (r - rMean) * 120; // rozdiely zväčšené, aby boli vidieť
        const on = i < k;
        return (
          <G key={i} opacity={on ? 1 : 0.15}>
            <Line x1={cx} y1={cy} x2={cx + len * Math.cos(a)} y2={cy + len * Math.sin(a)} stroke={PK} strokeWidth={2} />
            <Circle cx={cx + len * Math.cos(a)} cy={cy + len * Math.sin(a)} r={3.5} fill={PK} />
          </G>
        );
      })}
      {R_MER.map((r, i) => (
        <Label key={'t' + i} x={210} y={30 + i * 22} color={i < k ? PK : 'rgba(243,240,230,0.3)'} size={12}>
          r{'₁₂₃₄₅₆'[i]} = {r.toFixed(2).replace('.', ',')} m
        </Label>
      ))}
      <Label x={210} y={170} color={GR} size={11}>
        rozdiely zväčšené
      </Label>
    </Frame>
  );
}

/** trigonometrické meranie výšky: prístroj na A, cieľ na B */
function Trig() {
  const t = useTime();
  const ax = 40;
  const ay = 170;
  const bx = 270;
  const by = 72;
  const hpPx = 26;
  const hcPx = 36;
  const ix = ax; // prístroj nad A
  const iy = ay - hpPx;
  const tx = bx; // cieľ nad B
  const ty = by - hcPx;
  const p = Math.min(1, (t % 4) / 1.5);
  return (
    <Frame caption="Δh = d · tg β + hp − hc. Ďalekohľad je hp nad bodom A, cieľ je hc nad bodom B.">
      <Path d={`M0 ${ay + 6} L${ax} ${ay} L150 ${ay - 30} L${bx} ${by} L320 ${by - 6}`} stroke="rgba(243,240,230,0.35)" strokeWidth={2} fill="none" />
      {/* vodorovná čiara z prístroja */}
      <Line x1={ix} y1={iy} x2={tx} y2={iy} stroke="rgba(243,240,230,0.5)" strokeDasharray="5 4" />
      <Label x={150} y={iy + 14} color={CY}>
        d = 201,26 m
      </Label>
      {/* zámera */}
      <Line x1={ix} y1={iy} x2={ix + (tx - ix) * p} y2={iy + (ty - iy) * p} stroke={YE} strokeWidth={2.5} />
      <Path d={`M${ix + 40} ${iy} A40 40 0 0 0 ${ix + 40 * Math.cos(Math.atan2(iy - ty, tx - ix))} ${iy - 40 * Math.sin(Math.atan2(iy - ty, tx - ix))}`} stroke={YE} fill="none" />
      <Label x={ix + 44} y={iy - 6} color={YE}>
        β
      </Label>
      {/* d·tg β */}
      <Arrow x1={tx + 14} y1={iy} x2={tx + 14} y2={ty + 2} color={PK} w={2} />
      <Label x={tx + 18} y={(iy + ty) / 2} color={PK} size={10}>
        d·tg β
      </Label>
      {/* hp a hc */}
      <Line x1={ax} y1={ay} x2={ix} y2={iy} stroke={GR} strokeWidth={3} />
      <Polygon points={`${ix - 6},${iy} ${ix + 6},${iy} ${ix},${iy - 8}`} fill={GR} />
      <Label x={ax + 6} y={ay - 8} color={GR}>
        hp
      </Label>
      <Line x1={bx} y1={by} x2={tx} y2={ty} stroke={C.gold} strokeWidth={3} />
      <Circle cx={tx} cy={ty} r={4} fill={C.gold} />
      <Label x={bx - 22} y={by - 14} color={C.gold}>
        hc
      </Label>
      <Circle cx={ax} cy={ay} r={4} fill="#fff" />
      <Label x={ax - 10} y={ay + 16}>
        A
      </Label>
      <Circle cx={bx} cy={by} r={4} fill="#fff" />
      <Label x={bx - 4} y={by + 16}>
        B
      </Label>
      <Label x={8} y={18} color={YE} size={11}>
        β = 19,5082 g (gradov)
      </Label>
    </Frame>
  );
}

const PICS: Record<string, () => React.ReactElement> = { 'geo-kruh': Kruh, 'geo-trig': Trig };

export function GeoPic({ id }: { id: string }) {
  const P = PICS[id];
  return P ? <P /> : null;
}

void W;
void H;
