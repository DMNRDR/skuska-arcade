import React, { useState } from 'react';
import { View } from 'react-native';
import { Circle, G, Line, Path, Polygon, Rect } from 'react-native-svg';
import { Arrow, AX, Chips, CY, fnPath, Frame, GR, GraphAxes, H, Label, PK, RD, TopicDiagram, useTime, VI, W, YE } from './diagrams';

void W;
import { C } from './ui';

// Obrázky ku krokom lekcií v Učebni. Každý je malý a vysvetľuje jednu myšlienku.

const sn = (x: number, d = 2) => x.toFixed(d).replace('.', ',');

// ═════════════ FYZIKA ═════════════

/** Závažie na pružine kmitá okolo rovnovážnej polohy, sila ťahá späť */
function Spring() {
  const t = useTime();
  const y = 45 * Math.sin(t * 2.2);
  const top = 20;
  const eq = 110;
  const my = eq + y;
  const coils = 12;
  let d = `M160 ${top} L160 ${top + 10} `;
  for (let i = 1; i <= coils; i++) {
    const yy = top + 10 + ((my - 22 - top - 10) * i) / coils;
    d += `L${i % 2 ? 145 : 175} ${yy.toFixed(1)} `;
  }
  d += `L160 ${my - 18}`;
  const F = -y;
  return (
    <Frame caption="Závažie na pružine. Keď ho potiahneš dole, pružina ho ťahá hore (zelená šípka) a naopak. Sila vždy smeruje do rovnovážnej polohy, preto teleso kmitá.">
      <Rect x={110} y={10} width={100} height={8} fill={AX} />
      <Path d={d} stroke={C.dim} strokeWidth={2} fill="none" />
      <Line x1={60} y1={eq} x2={260} y2={eq} stroke={YE} strokeDasharray="5 4" />
      <Label x={262} y={eq + 4} color={YE}>rovnováha</Label>
      <Rect x={140} y={my - 18} width={40} height={36} rx={6} fill={CY} />
      {Math.abs(F) > 4 && <Arrow x1={200} y1={my} x2={200} y2={my + F * 0.8} color={GR} w={3} />}
      {Math.abs(y) > 4 && <Line x1={100} y1={eq} x2={100} y2={my} stroke={PK} strokeWidth={3} />}
      <Label x={94} y={(eq + my) / 2 + 4} color={PK} anchor="end">y</Label>
      <Label x={208} y={my + F * 0.4 + 4} color={GR}>F = −k·y</Label>
    </Frame>
  );
}

/** Graf sínusu s vyznačenou periódou a amplitúdou, bod beží */
function Period() {
  const [T, setT] = useState(2);
  const t = useTime();
  const sx = (x: number) => 20 + x * 46;
  const sy = (y: number) => 100 - y * 60;
  const f = (x: number) => Math.sin((2 * Math.PI * x) / T);
  const now = t % 6.4;
  const kmity = Math.floor(now / T);
  return (
    <View style={{ gap: 8 }}>
      <Frame caption={`Perióda T = ${T} s je čas jedného celého kmitu. Frekvencia f = 1/T = ${sn(1 / T)} Hz (toľko kmitov za sekundu). Čas ${sn(now, 1)} s → hotových kmitov: ${kmity}.`}>
        <GraphAxes sx={sx} sy={sy} x0={0} x1={6.4} y0={-1.3} y1={1.3} />
        <Path d={fnPath(f, 0, 6.4, sx, sy, 300)} stroke={PK} strokeWidth={2.6} fill="none" strokeOpacity={0.3} />
        <Path d={fnPath(f, 0, Math.max(0.01, now), sx, sy, 300)} stroke={PK} strokeWidth={2.8} fill="none" />
        <Circle cx={sx(now)} cy={sy(f(now))} r={6} fill={YE} />
        <Line x1={sx(0)} y1={30} x2={sx(T)} y2={30} stroke={YE} strokeWidth={2} />
        <Line x1={sx(0)} y1={24} x2={sx(0)} y2={36} stroke={YE} strokeWidth={2} />
        <Line x1={sx(T)} y1={24} x2={sx(T)} y2={36} stroke={YE} strokeWidth={2} />
        <Label x={(sx(0) + sx(T)) / 2} y={22} color={YE} anchor="middle">T</Label>
        <Line x1={sx(T / 4)} y1={sy(0)} x2={sx(T / 4)} y2={sy(1)} stroke={GR} strokeWidth={2} />
        <Label x={sx(T / 4) + 5} y={sy(0.5)} color={GR}>A</Label>
        {[1, 2, 3, 4, 5, 6].map((q) => (
          <Label key={q} x={sx(q)} y={sy(0) + 14} color={C.dim} size={9} anchor="middle">
            {q} s
          </Label>
        ))}
      </Frame>
      <Chips label="T:" value={T} onChange={setT} options={[{ v: 1, l: '1 s' }, { v: 2, l: '2 s' }, { v: 3, l: '3 s' }]} />
    </View>
  );
}

/** Výchylka, rýchlosť a zrýchlenie pod sebou */
function YVA() {
  const t = useTime();
  const sx = (x: number) => 50 + x * 40;
  const now = (t * 0.8) % 6.28;
  const rows = [
    { f: Math.sin, c: PK, l: 'y', y0: 38 },
    { f: Math.cos, c: GR, l: 'v', y0: 100 },
    { f: (x: number) => -Math.sin(x), c: YE, l: 'a', y0: 162 },
  ];
  return (
    <Frame caption="Keď je výchylka y najväčšia, rýchlosť v je nulová a zrýchlenie a je najväčšie (opačným smerom). V strede (y = 0) je rýchlosť najväčšia a zrýchlenie nulové.">
      {rows.map((r) => (
        <G key={r.l}>
          <Line x1={sx(0)} y1={r.y0} x2={sx(6.6)} y2={r.y0} stroke={AX} />
          <Path d={fnPath(r.f, 0, 6.6, sx, (y) => r.y0 - y * 22)} stroke={r.c} strokeWidth={2.2} fill="none" />
          <Label x={30} y={r.y0 + 4} color={r.c} anchor="middle" size={14}>
            {r.l}
          </Label>
          <Circle cx={sx(now)} cy={r.y0 - r.f(now) * 22} r={4.5} fill={r.c} />
        </G>
      ))}
      <Line x1={sx(now)} y1={10} x2={sx(now)} y2={190} stroke={CY} strokeOpacity={0.5} />
    </Frame>
  );
}

/** Energia: prelieva sa medzi Ek a Ep, súčet je stály */
function Energy() {
  const t = useTime();
  const s = Math.sin(t * 2);
  const ep = s * s;
  const ek = 1 - ep;
  const bar = (x: number, v: number, c: string, l: string) => (
    <G>
      <Rect x={x} y={40 + 130 * (1 - v)} width={44} height={130 * v} rx={6} fill={c} />
      <Label x={x + 22} y={188} color={c} anchor="middle">{l}</Label>
    </G>
  );
  return (
    <Frame caption="Kinetická energia Ek (pohyb) a potenciálna Ep (napnutá pružina) sa neustále prelievajú. Ich súčet E = ½kA² sa nemení.">
      <Line x1={10} y1={110 + s * 0} x2={10} y2={110} stroke={AX} />
      <Rect x={20 + 50 + s * 40} y={95} width={30} height={30} rx={5} fill={CY} />
      <Line x1={20} y1={110} x2={70 + s * 40} y2={110} stroke={C.dim} strokeDasharray="3 2" strokeWidth={2} />
      <Line x1={85} y1={130} x2={85} y2={136} stroke={YE} />
      <Label x={85} y={150} color={YE} anchor="middle" size={9}>stred</Label>
      {bar(170, ek, GR, 'Ek')}
      {bar(222, ep, PK, 'Ep')}
      {bar(274, 1, YE, 'E')}
      <Label x={252} y={30} color={C.dim} anchor="middle">+ = </Label>
    </Frame>
  );
}

/** Pružiny za sebou a vedľa seba */
function Springs2() {
  const t = useTime();
  const coil = (x: number, y1: number, y2: number, c: string) => {
    let d = `M${x} ${y1} `;
    for (let i = 1; i <= 8; i++) d += `L${x + (i % 2 ? -8 : 8)} ${(y1 + ((y2 - y1) * i) / 9).toFixed(1)} `;
    d += `L${x} ${y2}`;
    return <Path d={d} stroke={c} strokeWidth={2} fill="none" />;
  };
  // za sebou: mäkšie → väčšia výchylka a pomalšie kmity; vedľa seba: tvrdšie → menšia a rýchlejšie
  const a = 16 * Math.sin(t * 2.2);
  const b = 6 * Math.sin(t * 4.4);
  return (
    <Frame caption="Za sebou: každá pružina sa natiahne a predĺženia sa sčítajú, celok je MÄKŠÍ (kmitá viac a pomalšie): 1/k = 1/k₁ + 1/k₂. Vedľa seba: sily sa sčítajú, celok je TVRDŠÍ (kmitá menej a rýchlejšie): k = k₁ + k₂.">
      <Rect x={50} y={14} width={60} height={6} fill={AX} />
      {coil(80, 20, 70 + a / 2, CY)}
      {coil(80, 70 + a / 2, 120 + a, PK)}
      <Rect x={62} y={120 + a} width={36} height={28} rx={5} fill={YE} />
      <Label x={80} y={188} color={C.text} anchor="middle">za sebou</Label>
      <Label x={100} y={50} color={CY}>k₁</Label>
      <Label x={100} y={100} color={PK}>k₂</Label>
      <Rect x={200} y={14} width={80} height={6} fill={AX} />
      {coil(220, 20, 100 + b, CY)}
      {coil(260, 20, 100 + b, PK)}
      <Rect x={205} y={100 + b} width={70} height={28} rx={5} fill={YE} />
      <Label x={240} y={188} color={C.text} anchor="middle">vedľa seba</Label>
    </Frame>
  );
}

/** Sčítanie dvoch kmitov: synfázne a protifázne */
function SumWaves() {
  const [ph, setPh] = useState('syn');
  const anti = ph === 'anti';
  const t = useTime();
  const sx = (x: number) => 10 + x * 24;
  const y1 = (x: number) => 1 * Math.sin(x - t * 2);
  const y2 = (x: number) => 0.6 * Math.sin(x - t * 2 + (anti ? Math.PI : 0));
  return (
    <View style={{ gap: 8 }}>
      <Frame caption={anti ? 'Protifázne (posun o π): jeden ide hore, keď druhý dole. Výsledok je slabší, A = |A₁ − A₂|.' : 'Synfázne: oba idú hore aj dole naraz. Výsledok je silnejší, A = A₁ + A₂.'}>
        <Line x1={0} y1={100} x2={W} y2={100} stroke={AX} />
        <Path d={fnPath(y1, 0, 13, sx, (y) => 100 - y * 30)} stroke={CY} strokeWidth={1.6} fill="none" strokeOpacity={0.8} />
        <Path d={fnPath(y2, 0, 13, sx, (y) => 100 - y * 30)} stroke={PK} strokeWidth={1.6} fill="none" strokeOpacity={0.8} />
        <Path d={fnPath((x) => y1(x) + y2(x), 0, 13, sx, (y) => 100 - y * 30)} stroke={YE} strokeWidth={3} fill="none" />
        <Label x={8} y={18} color={CY}>y₁</Label>
        <Label x={30} y={18} color={PK}>y₂</Label>
        <Label x={52} y={18} color={YE}>y₁ + y₂</Label>
      </Frame>
      <Chips value={ph} onChange={setPh} options={[{ v: 'syn', l: 'synfázne' }, { v: 'anti', l: 'protifázne' }]} />
    </View>
  );
}

/** Rotujúci fázor: 3·sin + 4·cos je jeden sínus s amplitúdou 5 */
function Triangle345() {
  const t = useTime();
  const ph = t * 1.2;
  const o = { x: 90, y: 100 };
  const s = 14;
  const p1 = { x: o.x + 3 * s * Math.cos(ph), y: o.y - 3 * s * Math.sin(ph) };
  const p2 = { x: p1.x + 4 * s * Math.cos(ph + Math.PI / 2), y: p1.y - 4 * s * Math.sin(ph + Math.PI / 2) };
  const x0 = 175;
  const sx = (x: number) => x0 + x * 22;
  const f = (x: number) => 3 * Math.sin(ph - x) + 4 * Math.cos(ph - x);
  return (
    <Frame caption="3·sin ωt (modrá) a 4·cos ωt (ružová) sú dve šípky, ktoré sa točia spolu a zvierajú 90°. Ich súčet (žltá) má dĺžku √(3² + 4²) = 5, preto výsledok je jeden sínus s amplitúdou 5.">
      <Circle cx={o.x} cy={o.y} r={5 * s} stroke={YE} strokeOpacity={0.25} fill="none" />
      <Arrow x1={o.x} y1={o.y} x2={p1.x} y2={p1.y} color={CY} w={3} />
      <Arrow x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} color={PK} w={3} />
      <Arrow x1={o.x} y1={o.y} x2={p2.x} y2={p2.y} color={YE} w={2.5} />
      <Line x1={p2.x} y1={p2.y} x2={x0} y2={p2.y} stroke={YE} strokeDasharray="3 3" strokeOpacity={0.6} />
      <Line x1={x0} y1={20} x2={x0} y2={180} stroke={AX} />
      <Line x1={x0} y1={o.y} x2={W} y2={o.y} stroke={AX} />
      <Path d={fnPath(f, 0, 6.5, sx, (y) => o.y - y * s)} stroke={YE} strokeWidth={2.4} fill="none" />
      <Label x={8} y={18} color={CY}>3·sin</Label>
      <Label x={8} y={34} color={PK}>4·cos</Label>
      <Label x={8} y={50} color={YE}>A = 5</Label>
    </Frame>
  );
}

/** Vlnová dĺžka, perióda, rýchlosť */
function Lambda() {
  const t = useTime();
  const sx = (x: number) => 10 + x;
  const k = (2 * Math.PI) / 120;
  const shift = (t * 40) % 120;
  return (
    <Frame caption="Vlnová dĺžka λ je vzdialenosť dvoch susedných vrcholov. Za jednu periódu T sa vlna posunie presne o λ, preto c = λ/T = λ·f.">
      <Line x1={0} y1={110} x2={W} y2={110} stroke={AX} />
      <Path d={fnPath((x) => 45 * Math.sin(k * (x - shift)), 0, 300, sx, (y) => 110 - y)} stroke={PK} strokeWidth={2.6} fill="none" />
      <Line x1={sx(30 + shift - 120)} y1={50} x2={sx(150 + shift - 120)} y2={50} stroke={YE} strokeWidth={2} />
      <Line x1={sx(30 + shift)} y1={50} x2={sx(150 + shift)} y2={50} stroke={YE} strokeWidth={2} />
      <Label x={sx(90 + shift - 120)} y={42} color={YE} anchor="middle">λ</Label>
      <Label x={sx(90 + shift)} y={42} color={YE} anchor="middle">λ</Label>
      <Arrow x1={200} y1={180} x2={290} y2={180} color={CY} w={2} />
      <Label x={196} y={184} color={CY} anchor="end">c = λ·f</Label>
    </Frame>
  );
}

/** Vlnoplochy a lúče okolo bodového zdroja */
function Wavefront() {
  const t = useTime();
  const cx = 110;
  const cy = 100;
  const rings = [0, 1, 2, 3, 4].map((i) => ((t * 30 + i * 36) % 180) + 8);
  return (
    <Frame caption="Kruhy sú vlnoplochy (body s rovnakou fázou), šípky sú lúče (vždy kolmé na vlnoplochy). Ďaleko od zdroja sú vlnoplochy takmer rovné: rovinná vlna.">
      {rings.map((r, i) => (
        <Circle key={i} cx={cx} cy={cy} r={r} stroke={CY} strokeOpacity={Math.max(0.1, 1 - r / 190)} strokeWidth={1.8} fill="none" />
      ))}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
        const ar = (a * Math.PI) / 180;
        return <Arrow key={a} x1={cx + 14 * Math.cos(ar)} y1={cy + 14 * Math.sin(ar)} x2={cx + 80 * Math.cos(ar)} y2={cy + 80 * Math.sin(ar)} color={YE} w={1.5} />;
      })}
      <Circle cx={cx} cy={cy} r={6} fill={PK} />
      <Label x={240} y={30} color={CY}>vlnoplocha</Label>
      <Label x={240} y={46} color={YE}>lúč</Label>
    </Frame>
  );
}

/** Intenzita klesá s plochou gule 4πr² */
function Sphere() {
  const t = useTime();
  const arcs = [0, 1, 2, 3].map((i) => ((t * 28 + i * 42) % 168) + 14);
  return (
    <Frame caption="Rovnaký výkon P sa rozloží na stále väčšiu guľovú plochu 4πr². Pri dvojnásobnej vzdialenosti je plocha 4× väčšia, takže intenzita I = P/(4πr²) je 4× menšia. Sleduj, ako vlna slabne.">
      <Circle cx={60} cy={100} r={7} fill={YE} />
      {arcs.map((r, i) => (
        <Path key={i} d={`M${60 + r * Math.cos(-0.55)} ${100 + r * Math.sin(-0.55)} A${r} ${r} 0 0 1 ${60 + r * Math.cos(0.55)} ${100 + r * Math.sin(0.55)}`} stroke={CY} strokeWidth={4 * (1 - r / 190) + 0.5} strokeOpacity={Math.max(0.1, 1 - r / 180)} fill="none" />
      ))}
      <Line x1={60} y1={100} x2={60 + 170 * Math.cos(-0.55)} y2={100 + 170 * Math.sin(-0.55)} stroke={AX} strokeDasharray="3 3" />
      <Line x1={60} y1={100} x2={60 + 170 * Math.cos(0.55)} y2={100 + 170 * Math.sin(0.55)} stroke={AX} strokeDasharray="3 3" />
      <Label x={240} y={60} color={GR}>r = 1 → I</Label>
      <Label x={240} y={90} color={YE}>r = 2 → I/4</Label>
      <Label x={240} y={120} color={RD}>r = 3 → I/9</Label>
    </Frame>
  );
}

/** Interferencia dvoch zdrojov */
function Interference() {
  const t = useTime();
  const s1 = { x: 130, y: 100 };
  const s2 = { x: 190, y: 100 };
  const lam = 24;
  const rings = (s: { x: number; y: number }, c: string) =>
    Array.from({ length: 9 }, (_, i) => ((t * 25 + i * lam) % (lam * 9)) + 2).map((r, i) => (
      <Circle key={c + i} cx={s.x} cy={s.y} r={r} stroke={c} strokeOpacity={Math.max(0.08, 0.7 - r / 300)} strokeWidth={1.4} fill="none" />
    ));
  return (
    <Frame caption="Dva zdroje s rovnakou frekvenciou. Kde sa stretne vrchol s vrcholom, vlny sa zosilnia (maximum, dráhový rozdiel = párny násobok λ/2). Kde vrchol s dolinou, vyrušia sa (minimum).">
      {rings(s1, CY)}
      {rings(s2, PK)}
      <Circle cx={s1.x} cy={s1.y} r={5} fill={CY} />
      <Circle cx={s2.x} cy={s2.y} r={5} fill={PK} />
      <Line x1={160} y1={0} x2={160} y2={200} stroke={YE} strokeDasharray="4 4" />
      <Label x={164} y={14} color={YE}>MAX₀ (Δ = 0)</Label>
    </Frame>
  );
}

/** Huygensov princíp pri odraze */
function Huygens() {
  const t = useTime();
  const k = (t * 0.5) % 1;
  return (
    <Frame caption="Každý bod čela vlny je malý zdroj nových vlniek (krúžky). Spoločná obálka týchto vlniek je nové čelo vlny. Takto sa dá odvodiť zákon odrazu aj lomu.">
      <Line x1={40 + k * 140} y1={30} x2={40 + k * 140} y2={170} stroke={CY} strokeWidth={3} />
      {[40, 70, 100, 130, 160].map((y) => (
        <Circle key={y} cx={40 + k * 140 - 0} cy={y} r={3} fill={YE} />
      ))}
      {[40, 70, 100, 130, 160].map((y) => (
        <Path key={'a' + y} d={`M${40 + k * 140} ${y - 18} A18 18 0 0 1 ${40 + k * 140} ${y + 18}`} stroke={YE} strokeOpacity={0.6} fill="none" />
      ))}
      <Line x1={40 + k * 140 + 18} y1={30} x2={40 + k * 140 + 18} y2={170} stroke={GR} strokeDasharray="5 4" strokeWidth={2} />
      <Label x={250} y={40} color={CY}>staré čelo</Label>
      <Label x={250} y={58} color={GR}>nové čelo</Label>
      <Label x={250} y={76} color={YE}>vlnky</Label>
    </Frame>
  );
}

/** Difrakcia na štrbine */
function Diffraction() {
  const t = useTime();
  const off = (t * 22) % 22;
  return (
    <Frame caption="Za úzkou štrbinou sa vlna rozlieva aj do „tieňa“ (sivé oblasti). To je difrakcia. Preto počuješ zvuk aj spoza rohu.">
      <Rect x={150} y={0} width={10} height={86} fill={C.dim} />
      <Rect x={150} y={114} width={10} height={86} fill={C.dim} />
      <Rect x={160} y={0} width={160} height={70} fill="rgba(255,255,255,0.04)" />
      <Rect x={160} y={130} width={160} height={70} fill="rgba(255,255,255,0.04)" />
      {Array.from({ length: 7 }, (_, i) => 10 + i * 22 + off).map((x) => (x < 150 ? <Line key={x} x1={x} y1={10} x2={x} y2={190} stroke={CY} strokeWidth={1.8} /> : null))}
      {Array.from({ length: 7 }, (_, i) => i * 22 + off + 8).map((r) => (
        <Path key={r} d={`M${155 + r * Math.cos(-1.2)} ${100 + r * Math.sin(-1.2)} A${r} ${r} 0 0 1 ${155 + r * Math.cos(1.2)} ${100 + r * Math.sin(1.2)}`} stroke={CY} strokeWidth={1.8} fill="none" strokeOpacity={Math.max(0.2, 1 - r / 170)} />
      ))}
      <Label x={250} y={30} color={C.dim} anchor="middle">geometrický tieň</Label>
    </Frame>
  );
}

/** Elektromagnetické spektrum */
function Spectrum() {
  const colors = ['#7c3aed', '#3b82f6', '#06b6d4', '#22c55e', '#eab308', '#f97316', '#ef4444'];
  return (
    <Frame caption="Svetlo je len malá časť elektromagnetických vĺn: λ od 380 nm (fialová) po 760 nm (červená). Všetky sa vo vákuu šíria rovnakou rýchlosťou c₀ ≈ 3·10⁸ m/s.">
      <Rect x={10} y={70} width={300} height={40} rx={8} fill="rgba(255,255,255,0.06)" />
      {['gama', 'röntgen', 'UV', '', 'IR', 'mikro', 'rádio'].map((l, i) => (
        <Label key={i} x={28 + i * 44} y={132} color={C.dim} size={10} anchor="middle">
          {l}
        </Label>
      ))}
      {colors.map((c, i) => (
        <Rect key={c} x={140 + i * 6} y={70} width={6} height={40} fill={c} />
      ))}
      <Line x1={140} y1={60} x2={140} y2={120} stroke={C.text} />
      <Line x1={182} y1={60} x2={182} y2={120} stroke={C.text} />
      <Label x={161} y={52} color={C.text} anchor="middle">svetlo</Label>
      <Label x={140} y={150} color={'#a78bfa'} anchor="middle" size={10}>380 nm</Label>
      <Label x={186} y={150} color={'#ef4444'} anchor="middle" size={10}>760 nm</Label>
      <Arrow x1={60} y1={180} x2={20} y2={180} color={CY} w={1.5} />
      <Label x={64} y={184} color={CY}>kratšia λ</Label>
      <Arrow x1={260} y1={180} x2={300} y2={180} color={PK} w={1.5} />
      <Label x={256} y={184} color={PK} anchor="end">dlhšia λ</Label>
    </Frame>
  );
}

/** Polarizácia: čo kreslí koniec vektora E */
function Polarization() {
  const [k, setK] = useState<'lin' | 'kruh' | 'elip'>('lin');
  const t = useTime();
  const cx = 160;
  const cy = 100;
  const ph = t * 2.5;
  const [ax, az, d] = k === 'lin' ? [60, 60, 0] : k === 'kruh' ? [60, 60, Math.PI / 2] : [75, 40, Math.PI / 3];
  const ex = ax * Math.sin(ph);
  const ez = az * Math.sin(ph + d);
  let path = '';
  for (let i = 0; i <= 120; i++) {
    const p = (i / 120) * Math.PI * 2;
    path += (i ? 'L' : 'M') + (cx + ax * Math.sin(p)).toFixed(1) + ' ' + (cy - az * Math.sin(p + d)).toFixed(1) + ' ';
  }
  return (
    <View style={{ gap: 8 }}>
      <Frame caption="Pozeráme sa proti smeru šírenia vlny. Koniec vektora E kreslí úsečku (lineárna), kružnicu (kruhová) alebo elipsu (eliptická polarizácia).">
        <Line x1={cx - 90} y1={cy} x2={cx + 90} y2={cy} stroke={AX} />
        <Line x1={cx} y1={cy - 90} x2={cx} y2={cy + 90} stroke={AX} />
        <Path d={path} stroke={VI} strokeDasharray="4 4" fill="none" />
        <Arrow x1={cx} y1={cy} x2={cx + ex} y2={cy - ez} color={PK} w={3} />
        <Label x={cx + ex + 6} y={cy - ez} color={PK}>E</Label>
      </Frame>
      <Chips value={k} onChange={setK} options={[{ v: 'lin', l: 'lineárna' }, { v: 'kruh', l: 'kruhová' }, { v: 'elip', l: 'eliptická' }]} />
    </View>
  );
}

/** Tieň a polotieň */
function Shadow() {
  const [src, setSrc] = useState('plos');
  const plos = src === 'plos';
  const s1 = plos ? { x: 30, y: 70 } : { x: 30, y: 100 };
  const s2 = plos ? { x: 30, y: 130 } : { x: 30, y: 100 };
  const o = { x: 140, top: 80, bot: 120 };
  const sx = 300;
  const proj = (s: { x: number; y: number }, y: number) => s.y + ((y - s.y) * (sx - s.x)) / (o.x - s.x);
  const umbraTop = proj(s2, o.top);
  const umbraBot = proj(s1, o.bot);
  const penTop = proj(s1, o.top);
  const penBot = proj(s2, o.bot);
  return (
    <View style={{ gap: 8 }}>
      <Frame caption={plos ? 'Plošný zdroj: v strede je úplný tieň (sem nedopadne žiadny lúč) a okolo polotieň (dopadá len časť lúčov).' : 'Bodový zdroj vrhá len ostrý tieň, polotieň nevzniká.'}>
        {plos ? <Rect x={24} y={70} width={12} height={60} rx={4} fill={YE} /> : <Circle cx={30} cy={100} r={7} fill={YE} />}
        <Rect x={o.x - 4} y={o.top} width={8} height={o.bot - o.top} fill={C.dim} />
        <Rect x={sx} y={0} width={6} height={H} fill={AX} />
        <Polygon points={`${o.x},${o.top} ${sx},${Math.min(umbraTop, umbraBot)} ${sx},${Math.max(umbraTop, umbraBot)} ${o.x},${o.bot}`} fill="rgba(0,0,0,0.6)" />
        {plos && <Polygon points={`${o.x},${o.top} ${sx},${penTop} ${sx},${umbraTop} `} fill="rgba(0,0,0,0.3)" />}
        {plos && <Polygon points={`${o.x},${o.bot} ${sx},${penBot} ${sx},${umbraBot} `} fill="rgba(0,0,0,0.3)" />}
        {[s1, s2].map((s, i) => (
          <G key={i}>
            <Line x1={s.x} y1={s.y} x2={sx} y2={proj(s, o.top)} stroke={YE} strokeOpacity={0.4} />
            <Line x1={s.x} y1={s.y} x2={sx} y2={proj(s, o.bot)} stroke={YE} strokeOpacity={0.4} />
          </G>
        ))}
        <Label x={sx - 6} y={(umbraTop + umbraBot) / 2 + 4} color={C.text} anchor="end">tieň</Label>
        {plos && <Label x={sx - 6} y={penTop + 14} color={C.dim} anchor="end">polotieň</Label>}
      </Frame>
      <Chips value={src} onChange={setSrc} options={[{ v: 'plos', l: 'plošný zdroj' }, { v: 'bod', l: 'bodový zdroj' }]} />
    </View>
  );
}

/** Rovinné zrkadlo: obraz za zrkadlom, svetlo putuje */
function Mirror() {
  const t = useTime();
  const k = (t * 0.6) % 1;
  const A = { x: 90, y: 90 };
  const M = { x: 160, y: 120 };
  const E = { x: 70, y: 158 };
  const ph = k < 0.5 ? { x: A.x + (M.x - A.x) * k * 2, y: A.y + (M.y - A.y) * k * 2 } : { x: M.x + (E.x - M.x) * (k - 0.5) * 2, y: M.y + (E.y - M.y) * (k - 0.5) * 2 };
  return (
    <Frame caption="Lúč (biela bodka) ide z predmetu, odrazí sa od zrkadla a príde do oka. Oko si myslí, že prišiel priamo z bodu za zrkadlom. Preto je obraz presne tak ďaleko ZA zrkadlom, ako je predmet pred ním.">
      <Rect x={158} y={10} width={6} height={180} fill={CY} />
      <Arrow x1={90} y1={150} x2={90} y2={90} color={PK} w={3} />
      <Arrow x1={232} y1={150} x2={232} y2={90} color="rgba(244,114,182,0.4)" w={3} />
      <Line x1={A.x} y1={A.y} x2={M.x} y2={M.y} stroke={YE} strokeWidth={2} />
      <Line x1={M.x} y1={M.y} x2={E.x} y2={E.y} stroke={YE} strokeWidth={2} />
      <Line x1={M.x} y1={M.y} x2={232} y2={90} stroke={YE} strokeDasharray="4 4" strokeOpacity={0.6} />
      <Circle cx={ph.x} cy={ph.y} r={5} fill="#fff" />
      <Circle cx={66} cy={160} r={7} fill={GR} />
      <Label x={60} y={182} color={GR} anchor="middle">oko</Label>
      <Line x1={90} y1={170} x2={158} y2={170} stroke={C.dim} />
      <Line x1={164} y1={170} x2={232} y2={170} stroke={C.dim} />
      <Label x={124} y={185} color={C.dim} anchor="middle">d</Label>
      <Label x={198} y={185} color={C.dim} anchor="middle">d</Label>
      <Label x={90} y={80} color={PK} anchor="middle">predmet</Label>
      <Label x={232} y={80} color={PK} anchor="middle">obraz</Label>
    </Frame>
  );
}

/** Optické vlákno: lúč sa vedie úplným odrazom */
function Fiber() {
  const t = useTime();
  const pts: string[] = [];
  let x = 10;
  let y = 80;
  let dy = 1;
  const step = 34;
  while (x < 320) {
    pts.push(`${x},${y}`);
    x += step;
    y = dy > 0 ? 120 : 80;
    dy = -dy;
  }
  const head = (t * 80) % 320;
  return (
    <Frame caption="Lúč dopadá na stenu vlákna pod uhlom väčším ako kritický, preto sa úplne odrazí a nemôže uniknúť. Takto putuje svetlo optickým káblom na stovky kilometrov.">
      <Rect x={0} y={76} width={W} height={48} rx={24} fill="rgba(56,189,248,0.15)" stroke={CY} />
      <Path d={'M' + pts.join(' L')} stroke={YE} strokeWidth={2.4} fill="none" />
      <Circle cx={head} cy={fiberY(head, step)} r={5} fill={PK} />
      <Label x={10} y={60} color={CY}>sklo (väčšie n)</Label>
      <Label x={10} y={150} color={C.dim}>okolie (menšie n)</Label>
    </Frame>
  );
}

function fiberY(x: number, step: number) {
  const u = Math.max(0, x - 10) / step; // počet úsekov
  const seg = Math.floor(u);
  const fr = u - seg;
  return seg % 2 === 0 ? 80 + 40 * fr : 120 - 40 * fr;
}

/** Spojka a rozptylka s rovnobežnými lúčmi (svetlo tečie) */
function Lenses() {
  const [typ, setTyp] = useState('sp');
  const sp = typ === 'sp';
  const t = useTime();
  const cx = 160;
  const f = 70;
  const ys = [60, 80, 100, 120, 140];
  const k = (t * 0.5) % 1;
  return (
    <View style={{ gap: 8 }}>
      <Frame caption={sp ? 'Spojka (D > 0, hrubšia v strede) zbieha rovnobežné lúče do ohniska F. Sleduj bodky svetla.' : 'Rozptylka (D < 0, tenšia v strede) lúče rozbieha, akoby vychádzali z ohniska pred ňou.'}>
        <Line x1={0} y1={100} x2={W} y2={100} stroke={AX} />
        {sp ? (
          <Path d={`M${cx} 40 Q${cx + 16} 100 ${cx} 160 Q${cx - 16} 100 ${cx} 40`} fill="rgba(56,189,248,0.25)" stroke={CY} />
        ) : (
          <Path d={`M${cx - 10} 40 L${cx + 10} 40 Q${cx + 2} 100 ${cx + 10} 160 L${cx - 10} 160 Q${cx - 2} 100 ${cx - 10} 40`} fill="rgba(56,189,248,0.25)" stroke={CY} />
        )}
        {ys.map((y) => {
          const h = y - 100;
          const slope = sp ? -h / f : h / f;
          const endX = 310;
          const endY = y + slope * (endX - cx);
          const px = 10 + k * 300;
          const py = px < cx ? y : y + slope * (px - cx);
          return (
            <G key={y}>
              <Line x1={10} y1={y} x2={cx} y2={y} stroke={YE} strokeWidth={1.6} strokeOpacity={0.7} />
              <Line x1={cx} y1={y} x2={endX} y2={endY} stroke={YE} strokeWidth={1.6} strokeOpacity={0.7} />
              {!sp && <Line x1={cx} y1={y} x2={cx - f} y2={100} stroke={YE} strokeDasharray="3 3" strokeOpacity={0.4} />}
              <Circle cx={px} cy={py} r={3.5} fill="#fff" />
            </G>
          );
        })}
        <Circle cx={sp ? cx + f : cx - f} cy={100} r={4} fill={PK} />
        <Label x={sp ? cx + f : cx - f} y={118} color={PK} anchor="middle">F</Label>
      </Frame>
      <Chips value={typ} onChange={setTyp} options={[{ v: 'sp', l: 'spojka' }, { v: 'roz', l: 'rozptylka' }]} />
    </View>
  );
}

// ═════════════ MATEMATIKA ═════════════

/** Sčítanie vektorov (animované skladanie) */
function VecAdd() {
  const t = useTime();
  const k = (t * 0.35) % 1.3;
  const a = Math.min(1, k / 0.4);
  const b = Math.max(0, Math.min(1, (k - 0.4) / 0.4));
  const c = Math.max(0, Math.min(1, (k - 0.8) / 0.3));
  const o = { x: 60, y: 160 };
  const u = [120, -40];
  const v = [50, -90];
  return (
    <Frame caption="Vektor je šípka: má smer a veľkosť. Zapisujeme ho ako trojicu čísel (x, y, z). Súčet u + v dostaneš, keď šípky priložíš za seba: najprv u, na jeho koniec v.">
      {a > 0.05 && <Arrow x1={o.x} y1={o.y} x2={o.x + u[0] * a} y2={o.y + u[1] * a} color={CY} w={3} />}
      {b > 0.05 && <Arrow x1={o.x + u[0]} y1={o.y + u[1]} x2={o.x + u[0] + v[0] * b} y2={o.y + u[1] + v[1] * b} color={PK} w={3} />}
      {c > 0.05 && <Arrow x1={o.x} y1={o.y} x2={o.x + (u[0] + v[0]) * c} y2={o.y + (u[1] + v[1]) * c} color={YE} w={3} />}
      <Label x={o.x + 60} y={o.y - 4} color={CY}>u</Label>
      {b > 0.3 && <Label x={o.x + u[0] + 34} y={o.y + u[1] - 30} color={PK}>v</Label>}
      {c > 0.5 && <Label x={o.x + 64} y={o.y - 80} color={YE}>u + v</Label>}
      <Label x={250} y={40} color={CY}>u = (3, 1)</Label>
      <Label x={250} y={58} color={PK}>v = (1, 2)</Label>
      <Label x={250} y={76} color={YE}>u + v = (4, 3)</Label>
    </Frame>
  );
}

/** Vektorový súčin v 3D: kolmý na oba */
function Cross3D() {
  const t = useTime();
  const c = { x: 140, y: 130 };
  const rot = t * 0.6;
  const iso = (x: number, y: number, z: number) => {
    const xr = x * Math.cos(rot) - y * Math.sin(rot);
    const yr = x * Math.sin(rot) + y * Math.cos(rot);
    return { x: c.x + xr * 40, y: c.y + yr * 16 - z * 40 };
  };
  const o = iso(0, 0, 0);
  const u = iso(2, 0, 0);
  const v = iso(0.6, 1.8, 0);
  const w = iso(0, 0, 2.2);
  const uv = iso(2.6, 1.8, 0);
  return (
    <Frame caption="u × v je šípka kolmá na u aj na v (pravidlo pravej ruky: prsty od u k v, palec ukazuje u × v). Jej dĺžka je obsah žltého rovnobežníka.">
      <Polygon points={`${o.x},${o.y} ${u.x},${u.y} ${uv.x},${uv.y} ${v.x},${v.y}`} fill="rgba(251,191,36,0.2)" stroke={YE} strokeDasharray="4 3" />
      <Arrow x1={o.x} y1={o.y} x2={u.x} y2={u.y} color={CY} w={3} />
      <Arrow x1={o.x} y1={o.y} x2={v.x} y2={v.y} color={PK} w={3} />
      <Arrow x1={o.x} y1={o.y} x2={w.x} y2={w.y} color={GR} w={3} />
      <Label x={u.x + 6} y={u.y + 4} color={CY}>u</Label>
      <Label x={v.x + 6} y={v.y + 4} color={PK}>v</Label>
      <Label x={w.x + 6} y={w.y} color={GR}>u × v</Label>
      <Label x={310} y={185} color={C.dim} anchor="end">👍 pravá ruka</Label>
    </Frame>
  );
}

/** Rovnobežnosten zmiešaného súčinu (otáča sa) */
function Box() {
  const t = useTime();
  const rot = t * 0.5;
  const c = { x: 150, y: 125 };
  const P = (x0: number, y0: number, z: number) => {
    const x = x0 - 1.2;
    const y = y0 - 1.2;
    const xr = x * Math.cos(rot) - y * Math.sin(rot);
    const yr = x * Math.sin(rot) + y * Math.cos(rot);
    return { x: c.x + xr * 34, y: c.y + yr * 14 - z * 34 };
  };
  const pts = [P(0, 0, 0), P(2, 0, 0), P(2, 2, 0), P(0, 2, 0), P(0.4, 0.3, 2), P(2.4, 0.3, 2), P(2.4, 2.3, 2), P(0.4, 2.3, 2)];
  const e = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
  return (
    <Frame caption="Zmiešaný súčin [u, v, w] = (u × v)·w je objem tohto „kvádra“ (rovnobežnostena). Ak je 0, vektory ležia v jednej rovine. Štvorsten má 1/6 objemu.">
      <Polygon points={[0, 1, 2, 3].map((i) => `${pts[i].x},${pts[i].y}`).join(' ')} fill="rgba(56,189,248,0.15)" />
      {e.map(([a, b], i) => (
        <Line key={i} x1={pts[a].x} y1={pts[a].y} x2={pts[b].x} y2={pts[b].y} stroke={VI} strokeOpacity={0.7} />
      ))}
      <Arrow x1={pts[0].x} y1={pts[0].y} x2={pts[1].x} y2={pts[1].y} color={CY} w={3} />
      <Arrow x1={pts[0].x} y1={pts[0].y} x2={pts[3].x} y2={pts[3].y} color={PK} w={3} />
      <Arrow x1={pts[0].x} y1={pts[0].y} x2={pts[4].x} y2={pts[4].y} color={GR} w={3} />
      <Label x={pts[1].x + 6} y={pts[1].y + 14} color={CY}>u</Label>
      <Label x={pts[3].x + 6} y={pts[3].y + 14} color={PK}>v</Label>
      <Label x={pts[4].x + 6} y={pts[4].y} color={GR}>w</Label>
      <Label x={310} y={24} color={YE} anchor="end">V = |[u, v, w]|</Label>
    </Frame>
  );
}

/** Priamka X = A + t·s */
function LineParam() {
  const t = useTime();
  const A = { x: 70, y: 140 };
  const s = { x: 40, y: -22 };
  const tt = 2.2 * Math.sin(t * 0.8) + 1.2;
  const X = { x: A.x + tt * s.x, y: A.y + tt * s.y };
  return (
    <Frame caption={`Priamka = bod A + ľubovoľný násobok smerového vektora s. Parameter t teraz = ${sn(tt, 1)}. Pre každé t dostaneš iný bod priamky.`}>
      <Line x1={A.x - 2 * s.x} y1={A.y - 2 * s.y} x2={A.x + 6 * s.x} y2={A.y + 6 * s.y} stroke={GR} strokeWidth={2} />
      <Arrow x1={A.x} y1={A.y} x2={A.x + s.x} y2={A.y + s.y} color={YE} w={3} />
      <Circle cx={A.x} cy={A.y} r={5} fill={CY} />
      <Circle cx={X.x} cy={X.y} r={6} fill={PK} />
      <Label x={A.x - 6} y={A.y + 18} color={CY}>A</Label>
      <Label x={A.x + s.x / 2 - 6} y={A.y + s.y / 2 - 8} color={YE}>s</Label>
      <Label x={X.x + 8} y={X.y - 6} color={PK}>X = A + t·s</Label>
    </Frame>
  );
}

/** Vzájomná poloha priamok */
function Skew() {
  const [k, setK] = useState<'rov' | 'roz' | 'mim'>('mim');
  return (
    <View style={{ gap: 8 }}>
      <Frame caption={k === 'rov' ? 'Rovnobežné: smerové vektory sú násobky, nikdy sa nestretnú.' : k === 'roz' ? 'Rôznobežné: pretnú sa v jednom bode.' : 'Mimobežné: nie sú rovnobežné a nepretínajú sa (jedna ide „nad“ druhou). Existujú len v priestore.'}>
        <Polygon points="20,150 220,150 300,110 100,110" fill="rgba(167,139,250,0.12)" stroke={VI} strokeOpacity={0.5} />
        {k === 'rov' && (
          <G>
            <Line x1={40} y1={140} x2={260} y2={120} stroke={CY} strokeWidth={3} />
            <Line x1={60} y1={90} x2={280} y2={70} stroke={PK} strokeWidth={3} />
          </G>
        )}
        {k === 'roz' && (
          <G>
            <Line x1={40} y1={140} x2={260} y2={120} stroke={CY} strokeWidth={3} />
            <Line x1={100} y1={40} x2={190} y2={175} stroke={PK} strokeWidth={3} />
            <Circle cx={170} cy={128} r={5} fill={YE} />
          </G>
        )}
        {k === 'mim' && (
          <G>
            <Line x1={40} y1={140} x2={260} y2={120} stroke={CY} strokeWidth={3} />
            <Line x1={170} y1={20} x2={150} y2={110} stroke={PK} strokeWidth={3} />
            <Line x1={150} y1={110} x2={145} y2={132} stroke={PK} strokeWidth={3} strokeDasharray="4 4" strokeOpacity={0.4} />
            <Line x1={150} y1={110} x2={150} y2={130} stroke={YE} strokeDasharray="2 3" />
            <Label x={156} y={124} color={YE}>d</Label>
          </G>
        )}
      </Frame>
      <Chips value={k} onChange={setK} options={[{ v: 'rov', l: 'rovnobežné' }, { v: 'roz', l: 'rôznobežné' }, { v: 'mim', l: 'mimobežné' }]} />
    </View>
  );
}

/** Vzdialenosť bodu od roviny */
function Dist() {
  const t = useTime();
  const h = 70 + 30 * Math.sin(t * 1.3);
  const py = 135 - h;
  return (
    <Frame caption={`Vzdialenosť bodu od roviny je dĺžka kolmice (teraz d ≈ ${sn(h / 30, 1)}). Dosaď bod do rovnice roviny, daj absolútnu hodnotu a vydeľ dĺžkou normály: |ax₀ + by₀ + cz₀ + d| / √(a² + b² + c²).`}>
      <Polygon points="20,160 230,160 300,110 90,110" fill="rgba(167,139,250,0.2)" stroke={VI} />
      <Circle cx={170} cy={py} r={6} fill={PK} />
      <Line x1={170} y1={py} x2={170} y2={135} stroke={YE} strokeWidth={2.5} strokeDasharray="6 4" />
      <Circle cx={170} cy={135} r={4} fill={YE} />
      <Rect x={170} y={123} width={12} height={12} fill="none" stroke={YE} />
      <Label x={180} y={py} color={PK}>P [x₀, y₀, z₀]</Label>
      <Label x={176} y={(py + 135) / 2} color={YE}>d</Label>
      <Label x={30} y={185} color={VI}>ax + by + cz + d = 0</Label>
    </Frame>
  );
}

/** Gaussova eliminácia krok po kroku */
function Gauss() {
  const t = useTime();
  const steps = [
    { m: [[1, 2, 1], [2, 5, 3], [1, 3, 4]], n: 'Začneme s maticou.' },
    { m: [[1, 2, 1], [0, 1, 1], [1, 3, 4]], n: 'R₂ − 2·R₁: vyrobíme nulu pod 1.' },
    { m: [[1, 2, 1], [0, 1, 1], [0, 1, 3]], n: 'R₃ − R₁: ďalšia nula.' },
    { m: [[1, 2, 1], [0, 1, 1], [0, 0, 2]], n: 'R₃ − R₂: stupňovitý tvar! Hodnosť = 3.' },
  ];
  const i = Math.floor(t / 2.2) % steps.length;
  const S = steps[i];
  return (
    <Frame caption={`Krok ${i + 1}/4: ${S.n} Pod diagonálou postupne vyrábame nuly riadkovými úpravami.`}>
      <Path d="M90 40 L80 40 L80 160 L90 160" stroke={AX} fill="none" strokeWidth={2} />
      <Path d="M230 40 L240 40 L240 160 L230 160" stroke={AX} fill="none" strokeWidth={2} />
      {S.m.map((row, r) =>
        row.map((v, c) => (
          <G key={r + '-' + c}>
            {c < r && v === 0 && <Rect x={95 + c * 45} y={45 + r * 38} width={40} height={32} rx={8} fill={GR} fillOpacity={0.25} />}
            <Label x={115 + c * 45} y={68 + r * 38} color={c < r && v === 0 ? GR : C.text} size={16} anchor="middle">
              {v}
            </Label>
          </G>
        )),
      )}
      <Path d="M95 154 L140 116 L185 78 L230 40" stroke={YE} strokeDasharray="4 4" fill="none" strokeOpacity={0.6} />
    </Frame>
  );
}

/** Determinant 2×2: diagonály sa striedavo rozsvietia */
function Det2() {
  const t = useTime();
  const ph = Math.floor(t / 1.5) % 3;
  return (
    <Frame caption="Determinant 2×2: súčin na hlavnej diagonále (zelená) mínus súčin na vedľajšej (ružová). det = a·d − b·c. Príklad: 2·4 − 3·1 = 5.">
      <Path d="M90 50 L80 50 L80 150 L90 150" stroke={AX} fill="none" strokeWidth={2} />
      <Path d="M210 50 L220 50 L220 150 L210 150" stroke={AX} fill="none" strokeWidth={2} />
      <Line x1={110} y1={70} x2={190} y2={130} stroke={GR} strokeWidth={ph === 0 ? 12 : 6} strokeOpacity={ph === 0 ? 0.55 : 0.2} strokeLinecap="round" />
      <Line x1={190} y1={70} x2={110} y2={130} stroke={PK} strokeWidth={ph === 1 ? 12 : 6} strokeOpacity={ph === 1 ? 0.55 : 0.2} strokeLinecap="round" />
      <Label x={115} y={80} color={C.text} size={20} anchor="middle">2</Label>
      <Label x={185} y={80} color={C.text} size={20} anchor="middle">3</Label>
      <Label x={115} y={135} color={C.text} size={20} anchor="middle">1</Label>
      <Label x={185} y={135} color={C.text} size={20} anchor="middle">4</Label>
      <Label x={232} y={90} color={GR} size={ph === 0 ? 13 : 11}>+ 2·4 = 8</Label>
      <Label x={232} y={114} color={PK} size={ph === 1 ? 13 : 11}>− 3·1 = 3</Label>
      {ph === 2 && <Label x={232} y={140} color={YE} size={14}>det = 5</Label>}
    </Frame>
  );
}

/** Sarrusovo pravidlo: uhlopriečky sa postupne rozsvietia */
function Sarrus() {
  const t = useTime();
  const ph = Math.floor(t / 1.1) % 7;
  const M = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
  const pos = (r: number, c: number) => ({ x: 40 + c * 44, y: 50 + r * 44 });
  const plus = ['aei', 'bfg', 'cdh'];
  const minus = ['ceg', 'afh', 'bdi'];
  return (
    <Frame caption="Sarrus (len 3×3): opíš prvé dva stĺpce vedľa matice. Tri zelené uhlopriečky (dole doprava) sčítaj, tri ružové (hore doprava) odčítaj: aei + bfg + cdh − ceg − afh − bdi.">
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3, 4].map((c) => {
          const p = pos(r, c);
          return (
            <Label key={r + '-' + c} x={p.x} y={p.y} color={c > 2 ? C.dim : C.text} size={16} anchor="middle">
              {M[r * 3 + (c % 3)]}
            </Label>
          );
        }),
      )}
      {[0, 1, 2].map((q) => (
        <Line key={'g' + q} x1={pos(0, q).x} y1={pos(0, q).y - 5} x2={pos(2, q + 2).x} y2={pos(2, q + 2).y - 5} stroke={GR} strokeWidth={ph === q ? 10 : 5} strokeOpacity={ph === q ? 0.6 : 0.18} strokeLinecap="round" />
      ))}
      {[2, 3, 4].map((q, i) => (
        <Line key={'p' + q} x1={pos(0, q).x} y1={pos(0, q).y - 5} x2={pos(2, q - 2).x} y2={pos(2, q - 2).y - 5} stroke={PK} strokeWidth={ph === 3 + i ? 10 : 5} strokeOpacity={ph === 3 + i ? 0.6 : 0.18} strokeLinecap="round" />
      ))}
      <Line x1={150} y1={25} x2={150} y2={150} stroke={AX} strokeDasharray="3 3" />
      {plus.map((p, i) => (
        <Label key={p} x={250} y={50 + i * 20} color={GR} anchor="middle" size={ph === i ? 15 : 12}>
          {'+ ' + p}
        </Label>
      ))}
      {minus.map((p, i) => (
        <Label key={p} x={250} y={120 + i * 20} color={PK} anchor="middle" size={ph === 3 + i ? 15 : 12}>
          {'− ' + p}
        </Label>
      ))}
    </Frame>
  );
}

/** Sústava 2 rovníc = 2 priamky */
function Lines2() {
  const [k, setK] = useState<'one' | 'none' | 'inf'>('one');
  const sx = (x: number) => 160 + x * 30;
  const sy = (y: number) => 100 - y * 30;
  const l1 = (x: number) => 0.5 * x + 1;
  const l2 = k === 'one' ? (x: number) => -x + 2.5 : k === 'none' ? (x: number) => 0.5 * x - 1 : l1;
  return (
    <View style={{ gap: 8 }}>
      <Frame caption={k === 'one' ? 'Priamky sa pretnú: práve jedno riešenie, h(A) = h(A|b) = n, det ≠ 0.' : k === 'none' ? 'Rovnobežné priamky: žiadne riešenie, h(A) < h(A|b).' : 'Tá istá priamka: nekonečne veľa riešení, h(A) = h(A|b) < n.'}>
        <GraphAxes sx={sx} sy={sy} x0={-5} x1={5} y0={-3} y1={3} />
        <Path d={fnPath(l1, -5, 5, sx, sy)} stroke={CY} strokeWidth={k === 'inf' ? 6 : 2.6} strokeOpacity={k === 'inf' ? 0.5 : 1} fill="none" />
        <Path d={fnPath(l2, -5, 5, sx, sy)} stroke={PK} strokeWidth={2.6} fill="none" strokeDasharray={k === 'inf' ? '6 6' : undefined} />
        {k === 'one' && <Circle cx={sx(1)} cy={sy(1.5)} r={6} fill={YE} />}
        <Label x={8} y={20} color={CY}>1. rovnica</Label>
        <Label x={8} y={36} color={PK}>2. rovnica</Label>
      </Frame>
      <Chips value={k} onChange={setK} options={[{ v: 'one', l: '1 riešenie' }, { v: 'none', l: 'žiadne' }, { v: 'inf', l: 'nekonečne veľa' }]} />
    </View>
  );
}

/** Vlastný vektor: matica ho len natiahne */
function Eigen() {
  const t = useTime();
  const k = (Math.sin(t * 1.3) + 1) / 2;
  const o = { x: 160, y: 120 };
  const s = 30;
  // A = [[2, 1], [1, 2]], vlastné vektory (1, 1) s λ = 3 a (1, −1) s λ = 1, iný vektor (1, 0)
  const T = (x: number, y: number) => [x * (1 - k) + (2 * x + y) * k, y * (1 - k) + (x + 2 * y) * k];
  const e1 = T(1, 1);
  const e2 = T(1, -1);
  const n = T(1.4, 0);
  return (
    <Frame caption="Matica A = [[2, 1], [1, 2]] väčšinu vektorov otočí (sivý). Vlastné vektory len natiahne v tom istom smere: (1, 1) trojnásobne (λ = 3), (1, −1) ostane (λ = 1). A·v = λ·v.">
      <Line x1={0} y1={o.y} x2={W} y2={o.y} stroke={AX} />
      <Line x1={o.x} y1={0} x2={o.x} y2={H} stroke={AX} />
      <Line x1={o.x - 120} y1={o.y + 120} x2={o.x + 120} y2={o.y - 120} stroke={GR} strokeOpacity={0.2} />
      <Arrow x1={o.x} y1={o.y} x2={o.x + e1[0] * s} y2={o.y - e1[1] * s} color={GR} w={3} />
      <Arrow x1={o.x} y1={o.y} x2={o.x + e2[0] * s} y2={o.y - e2[1] * s} color={YE} w={3} />
      <Arrow x1={o.x} y1={o.y} x2={o.x + n[0] * s} y2={o.y - n[1] * s} color={C.dim} w={2} />
      <Label x={10} y={20} color={GR}>λ = 3</Label>
      <Label x={10} y={36} color={YE}>λ = 1</Label>
    </Frame>
  );
}

/** Funkcia ako stroj */
function Machine() {
  const t = useTime();
  const xs = [-2, -1, 0, 1, 2, 3];
  const i = Math.floor(t / 1.4) % xs.length;
  const x = xs[i];
  const p = (t % 1.4) / 1.4;
  return (
    <Frame caption={`Funkcia je stroj: vložíš x, dostaneš práve jedno y. Tu f(x) = x²: f(${x}) = ${x * x}. Definičný obor sú všetky x, ktoré stroj prijme.`}>
      <Rect x={115} y={60} width={90} height={80} rx={14} fill="rgba(167,139,250,0.3)" stroke={VI} strokeWidth={2} />
      <Label x={160} y={106} color={C.text} size={18} anchor="middle">f(x) = x²</Label>
      {p < 0.5 ? (
        <Label x={20 + p * 2 * 90} y={106} color={CY} size={18}>{String(x)}</Label>
      ) : (
        <Label x={215 + (p - 0.5) * 2 * 70} y={106} color={YE} size={18}>{String(x * x)}</Label>
      )}
      <Arrow x1={20} y1={150} x2={110} y2={150} color={CY} w={1.5} />
      <Arrow x1={210} y1={150} x2={300} y2={150} color={YE} w={1.5} />
      <Label x={60} y={170} color={CY} anchor="middle">vstup x</Label>
      <Label x={255} y={170} color={YE} anchor="middle">výstup y</Label>
    </Frame>
  );
}

/** Párna a nepárna funkcia */
function Parity() {
  const [par, setPar] = useState('p');
  const even = par === 'p';
  const sx = (x: number) => 160 + x * 40;
  const sy = (y: number) => 110 - y * 28;
  const f = even ? (x: number) => x * x * 0.7 - 1.5 : (x: number) => 0.35 * x * x * x;
  const a = 1.6;
  return (
    <View style={{ gap: 8 }}>
      <Frame caption={even ? 'Párna: f(−x) = f(x). Graf je zrkadlový podľa osi y (napr. x², cos x).' : 'Nepárna: f(−x) = −f(x). Graf je súmerný podľa počiatku, otočíš ho o 180° (napr. x³, sin x).'}>
        <GraphAxes sx={sx} sy={sy} x0={-3.8} x1={3.8} y0={-3.4} y1={3.4} />
        <Path d={fnPath(f, -3.8, 3.8, sx, sy)} stroke={even ? PK : CY} strokeWidth={2.6} fill="none" />
        <Circle cx={sx(a)} cy={sy(f(a))} r={5} fill={YE} />
        <Circle cx={sx(-a)} cy={sy(f(-a))} r={5} fill={YE} />
        <Line x1={sx(a)} y1={sy(f(a))} x2={sx(-a)} y2={sy(f(-a))} stroke={YE} strokeDasharray="4 4" />
        <Label x={sx(a) + 8} y={sy(f(a))} color={YE}>f(x)</Label>
        <Label x={sx(-a) - 8} y={sy(f(-a))} color={YE} anchor="end">f(−x)</Label>
      </Frame>
      <Chips value={par} onChange={setPar} options={[{ v: 'p', l: 'párna' }, { v: 'n', l: 'nepárna' }]} />
    </View>
  );
}

/** Inverzná funkcia: zrkadlenie podľa y = x */
function Inverse() {
  const t = useTime();
  const sx = (x: number) => 150 + x * 30;
  const sy = (y: number) => 110 - y * 30;
  const a = -2.2 + 3.4 * (0.5 + 0.5 * Math.sin(t * 0.9));
  const ea = Math.exp(a);
  return (
    <Frame caption={`Inverzná funkcia vymení x a y. Bod [${sn(a, 1)}; ${sn(ea, 1)}] na eˣ má zrkadlový bod [${sn(ea, 1)}; ${sn(a, 1)}] na ln x. Graf je zrkadlový podľa priamky y = x.`}>
      <GraphAxes sx={sx} sy={sy} x0={-4.6} x1={5.5} y0={-3.3} y1={3.6} />
      <Path d={fnPath((x) => x, -3.5, 3.6, sx, sy)} stroke={AX} strokeDasharray="5 4" fill="none" />
      <Path d={fnPath(Math.exp, -4.6, 1.3, sx, sy)} stroke={YE} strokeWidth={2.6} fill="none" />
      <Path d={fnPath(Math.log, 0.03, 5.5, sx, sy)} stroke={GR} strokeWidth={2.6} fill="none" />
      <Line x1={sx(a)} y1={sy(ea)} x2={sx(ea)} y2={sy(a)} stroke={C.text} strokeDasharray="3 3" strokeOpacity={0.6} />
      <Circle cx={sx(a)} cy={sy(ea)} r={5} fill={YE} />
      <Circle cx={sx(ea)} cy={sy(a)} r={5} fill={GR} />
      <Label x={sx(1.1)} y={sy(3.4)} color={YE}>eˣ</Label>
      <Label x={sx(4.4)} y={sy(1.9)} color={GR}>ln x</Label>
      <Label x={sx(2.6)} y={sy(3.1)} color={C.dim}>y = x</Label>
    </Frame>
  );
}

/** Spojitosť a skok */
function Continuity() {
  const t = useTime();
  const sx = (x: number) => 40 + x * 50;
  const sy = (y: number) => 170 - y * 35;
  const L = (x: number) => 1 - 0.4 * Math.cos(x * 1.2) + 0.4 * Math.cos(3.6);
  const R = (x: number) => 3 + 0.25 * (x - 3);
  const d = 2.9 * Math.abs(Math.cos(t * 0.8)) + 0.04;
  return (
    <Frame caption="Spojitá funkcia sa dá nakresliť bez zdvihnutia ceruzky. V x = 3 je skok: keď sa blížiš zľava (ružová), hodnoty idú k 1, sprava (žltá) k 3. Limity sa nerovnajú, funkcia tam nie je spojitá.">
      <GraphAxes sx={sx} sy={sy} x0={0} x1={5.5} y0={0} y1={4.3} />
      <Path d={fnPath(L, 0, 3, sx, sy)} stroke={CY} strokeWidth={2.6} fill="none" />
      <Path d={fnPath(R, 3, 5.5, sx, sy)} stroke={CY} strokeWidth={2.6} fill="none" />
      <Circle cx={sx(3)} cy={sy(1)} r={5} fill={C.bg1} stroke={CY} strokeWidth={2} />
      <Circle cx={sx(3)} cy={sy(3)} r={5} fill={CY} />
      <Circle cx={sx(3 - d)} cy={sy(L(3 - d))} r={5} fill={PK} />
      <Circle cx={sx(3 + d * 0.8)} cy={sy(R(3 + d * 0.8))} r={5} fill={YE} />
      <Line x1={sx(3)} y1={sy(0)} x2={sx(3)} y2={sy(4)} stroke={RD} strokeDasharray="4 4" />
      <Label x={sx(3) - 6} y={sy(1) + 20} color={PK} anchor="end">zľava → 1</Label>
      <Label x={sx(3) + 8} y={sy(3) - 10} color={YE}>sprava → 3</Label>
    </Frame>
  );
}

/** Zložená funkcia: číslo prechádza reťazou */
function Chain() {
  const t = useTime();
  const k = (t * 0.45) % 1;
  const tx = 55 + k * 205;
  const label = k < 0.33 ? 'x = 1' : k < 0.66 ? '3x = 3' : 'sin 3 ≈ 0,14';
  return (
    <Frame caption="(sin 3x)′: číslo prejde najprv vnútornou funkciou 3x, potom vonkajšou sin. Derivuj vonkajšiu (cos 3x) a vynásob deriváciou vnútra (3). Výsledok 3·cos 3x.">
      <Rect x={20} y={70} width={70} height={60} rx={12} fill="rgba(56,189,248,0.25)" stroke={CY} />
      <Label x={55} y={105} color={C.text} anchor="middle" size={14}>x</Label>
      <Arrow x1={92} y1={100} x2={118} y2={100} color={C.dim} />
      <Rect x={120} y={70} width={70} height={60} rx={12} fill="rgba(244,114,182,0.25)" stroke={PK} />
      <Label x={155} y={105} color={C.text} anchor="middle" size={14}>3x</Label>
      <Arrow x1={192} y1={100} x2={218} y2={100} color={C.dim} />
      <Rect x={220} y={70} width={80} height={60} rx={12} fill="rgba(251,191,36,0.25)" stroke={YE} />
      <Label x={260} y={105} color={C.text} anchor="middle" size={14}>sin(3x)</Label>
      <Circle cx={tx} cy={62} r={6} fill="#fff" />
      <Label x={tx} y={50} color="#fff" anchor="middle" size={10}>{label}</Label>
      <Label x={155} y={155} color={PK} anchor="middle">vnútorná: · 3</Label>
      <Label x={260} y={155} color={YE} anchor="middle">vonkajšia: cos(3x)</Label>
      <Label x={160} y={28} color={GR} anchor="middle" size={14}>(sin 3x)′ = cos(3x) · 3</Label>
    </Frame>
  );
}

/** Taylorov polynóm pre sin x */
function Taylor() {
  const [n, setN] = useState(1);
  const sx = (x: number) => 160 + x * 24;
  const sy = (y: number) => 100 - y * 40;
  const fact = (k: number): number => (k <= 1 ? 1 : k * fact(k - 1));
  const T = (x: number) => {
    let s = 0;
    for (let k = 0; k < n; k++) s += ((k % 2 ? -1 : 1) * x ** (2 * k + 1)) / fact(2 * k + 1);
    return s;
  };
  const terms = ['x', 'x − x³/3!', 'x − x³/3! + x⁵/5!', 'x − x³/3! + x⁵/5! − x⁷/7!'][n - 1];
  return (
    <View style={{ gap: 8 }}>
      <Frame caption={`Taylorov (Maclaurinov) polynóm napodobňuje funkciu pri x = 0. sin x ≈ ${terms}. Čím viac členov, tým ďalej sedí.`}>
        <GraphAxes sx={sx} sy={sy} x0={-6.5} x1={6.5} y0={-2.3} y1={2.3} />
        <Path d={fnPath(Math.sin, -6.5, 6.5, sx, sy, 300)} stroke={CY} strokeWidth={2.6} fill="none" />
        <Path d={fnPath(T, -6.5, 6.5, sx, sy, 300)} stroke={YE} strokeWidth={2.2} fill="none" strokeDasharray="6 4" />
        <Label x={8} y={20} color={CY}>sin x</Label>
        <Label x={8} y={36} color={YE}>polynóm</Label>
      </Frame>
      <Chips label="členy:" value={n} onChange={setN} options={[1, 2, 3, 4].map((v) => ({ v, l: String(v) }))} />
    </View>
  );
}

/** Extrémy: bod sa kĺže po grafe a dotyčnica ukazuje sklon */
function Extrema() {
  const t = useTime();
  const sx = (x: number) => 160 + x * 40;
  const sy = (y: number) => 110 - y * 30;
  const f = (x: number) => 1.32 * Math.sin(x * 1.2);
  const df = (x: number) => 1.584 * Math.cos(x * 1.2);
  const xmax = Math.PI / 2 / 1.2;
  const x0 = 3.4 * Math.sin(t * 0.6);
  const m = df(x0);
  return (
    <Frame caption={`V maxime aj minime je dotyčnica vodorovná, f′(x) = 0. Teraz f′ = ${sn(m)}${Math.abs(m) < 0.2 ? ' → stacionárny bod!' : m > 0 ? ' → rastie' : ' → klesá'}. Max alebo min určí f′′: záporná = max (∩), kladná = min (∪).`}>
      <GraphAxes sx={sx} sy={sy} x0={-3.8} x1={3.8} y0={-2.8} y1={2.8} />
      <Path d={fnPath(f, -3.8, 3.8, sx, sy)} stroke={CY} strokeWidth={2.6} fill="none" />
      <Path d={fnPath((x) => f(x0) + m * (x - x0), x0 - 1, x0 + 1, sx, sy)} stroke={YE} strokeWidth={2.4} fill="none" />
      <Circle cx={sx(x0)} cy={sy(f(x0))} r={6} fill={YE} />
      <Circle cx={sx(xmax)} cy={sy(f(xmax))} r={4} fill={GR} />
      <Circle cx={sx(-xmax)} cy={sy(f(-xmax))} r={4} fill={RD} />
      <Label x={sx(xmax)} y={sy(f(xmax)) - 12} color={GR} anchor="middle">max</Label>
      <Label x={sx(-xmax)} y={sy(f(-xmax)) + 22} color={RD} anchor="middle">min</Label>
    </Frame>
  );
}

/** Konvexná a konkávna: gulička v miske a na kopci */
function Convex() {
  const t = useTime();
  const cup = (x: number) => 100 + ((x - 80) / 40) ** 2 * 25;
  const cap = (x: number) => 180 - ((x - 240) / 40) ** 2 * 25;
  const bx = 80 + 45 * Math.sin(t * 2.2);
  const run = (t * 0.5) % 1;
  const hx = 240 + 55 * run * (Math.floor(t * 0.5) % 2 ? -1 : 1);
  return (
    <Frame caption="Konvexná (∪, f′′ > 0) je ako miska: gulička sa v nej hojdá. Konkávna (∩, f′′ < 0) je ako kopec: gulička z neho zíde. Bod, kde sa jedno mení na druhé, je inflexný bod.">
      <Path d={fnPath((x) => cup(x), 20, 140, (x) => x, (y) => 250 - y)} stroke={GR} strokeWidth={3} fill="none" />
      <Path d={fnPath((x) => cap(x), 180, 300, (x) => x, (y) => 250 - y)} stroke={RD} strokeWidth={3} fill="none" />
      <Circle cx={bx} cy={250 - cup(bx) - 7} r={7} fill={YE} />
      <Circle cx={hx} cy={250 - cap(hx) - 7} r={7} fill={CY} />
      <Label x={80} y={40} color={GR} anchor="middle" size={14}>konvexná ∪</Label>
      <Label x={80} y={58} color={C.dim} anchor="middle">f′′ &gt; 0</Label>
      <Label x={240} y={170} color={RD} anchor="middle" size={14}>konkávna ∩</Label>
      <Label x={240} y={188} color={C.dim} anchor="middle">f′′ &lt; 0</Label>
    </Frame>
  );
}

/** Rodina primitívnych funkcií F + C */
function Antideriv() {
  const t = useTime();
  const sx = (x: number) => 160 + x * 40;
  const sy = (y: number) => 120 - y * 22;
  const Cc = 1.8 * Math.sin(t * 0.9);
  const x0 = 1.5;
  const F = (x: number) => (x * x) / 2 + Cc - 1;
  return (
    <Frame caption={`Ku f(x) = x patrí F(x) = x²/2 + C. Teraz C ≈ ${sn(Cc, 1)}. Konštanta posúva graf hore-dole, ale sklon (derivácia) v bode x = 1,5 je stále 1,5. Preto pri integráli vždy píš + C.`}>
      <GraphAxes sx={sx} sy={sy} x0={-3.8} x1={3.8} y0={-2.5} y1={3.8} />
      {[-2, -1, 0, 1, 2].map((c) => (
        <Path key={c} d={fnPath((x) => (x * x) / 2 + c - 1, -3.8, 3.8, sx, sy)} stroke={VI} strokeOpacity={0.25} strokeWidth={1.4} fill="none" />
      ))}
      <Path d={fnPath(F, -3.8, 3.8, sx, sy)} stroke={YE} strokeWidth={2.8} fill="none" />
      <Path d={fnPath((x) => F(x0) + x0 * (x - x0), x0 - 1, x0 + 1, sx, sy)} stroke={GR} strokeWidth={2.4} fill="none" />
      <Circle cx={sx(x0)} cy={sy(F(x0))} r={5} fill={GR} />
      <Label x={8} y={20} color={YE}>F(x) = x²/2 + C</Label>
      <Label x={8} y={36} color={GR}>sklon stále rovnaký</Label>
    </Frame>
  );
}

// ═════════════ REGISTER ═════════════

const FIGS: Record<string, () => React.ReactElement> = {
  spring: Spring,
  period: Period,
  yva: YVA,
  energy: Energy,
  springs2: Springs2,
  sum: SumWaves,
  tri345: Triangle345,
  lambda: Lambda,
  wavefront: Wavefront,
  sphere: Sphere,
  interference: Interference,
  huygens: Huygens,
  diffraction: Diffraction,
  spectrum: Spectrum,
  polar: Polarization,
  shadow: Shadow,
  mirror: Mirror,
  fiber: Fiber,
  lenses: Lenses,
  vecadd: VecAdd,
  cross3d: Cross3D,
  box: Box,
  lineparam: LineParam,
  skew: Skew,
  dist: Dist,
  gauss: Gauss,
  det2: Det2,
  sarrus: Sarrus,
  lines2: Lines2,
  eigen: Eigen,
  machine: Machine,
  parity: Parity,
  inverse: Inverse,
  continuity: Continuity,
  chain: Chain,
  taylor: Taylor,
  extrema: Extrema,
  convex: Convex,
  antideriv: Antideriv,
};

/** fig = názov malého obrázka, alebo "fyz:kmity" / "fyz:vlny@stoj" pre interaktívny diagram témy */
export function Figure({ fig }: { fig: string }) {
  if (fig.includes(':')) {
    const [id, init] = fig.split('@');
    return <TopicDiagram id={id} init={init} />;
  }
  const F = FIGS[fig];
  return F ? <F /> : null;
}

export const FIGURE_NAMES = Object.keys(FIGS);
