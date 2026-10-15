import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Circle, Line } from 'react-native-svg';
import { Arrow, Label } from '../../components/diagrams';
import { C, haptic } from '../../components/ui';
import { play } from '../../sound';
import { CH, Chalk, Eq, Goal, par, sk, Slider, Stamp, T, useOnce } from '../kit';

// ───────────────────────── vlastný vektor: otáčaj v a hľadaj smer, ktorý A neotočí ─────────────────────────

// Matica z príkladu 1 prednášky 5: A = [[1, 2], [4, 3]], vlastné vektory (1, 2) s λ = 5 a (−1, 1) s λ = −1.
const A = [
  [1, 2],
  [4, 3],
];
const EIGEN = [
  { deg: (Math.atan2(2, 1) * 180) / Math.PI, lam: 5 },
  { deg: 135, lam: -1 },
];

export function EigenDrag({ onWin }: { onWin?: () => void }) {
  const [phi, setPhi] = useState(20);
  const [seen, setSeen] = useState<number[]>([]);
  const r = 1.3;
  const rad = (phi * Math.PI) / 180;
  const v = [r * Math.cos(rad), r * Math.sin(rad)];
  const Av = [A[0][0] * v[0] + A[0][1] * v[1], A[1][0] * v[0] + A[1][1] * v[1]];
  const hit = EIGEN.find((e) => Math.abs(e.deg - phi) < 0.01);
  const ox = 160;
  const oy = 125;
  const s = 18;
  const done = seen.length >= 2;
  useOnce(done, () => onWin?.());

  const set = (deg: number) => {
    let d = Math.max(0, Math.min(179, deg));
    // pritiahni k vlastnému smeru, aby sa dal trafiť prstom
    const near = EIGEN.find((e) => Math.abs(e.deg - d) < 3);
    if (near) d = near.deg;
    if (d === phi) return;
    setPhi(d);
    if (near && !seen.includes(near.lam)) {
      play('correct');
      haptic('ok');
      setSeen([...seen, near.lam]);
    }
  };

  const tip = { x: ox + v[0] * s, y: oy - v[1] * s };
  // priamka cez počiatok v smere v
  const L = 9;
  return (
    <View style={{ gap: 12 }}>
      <Chalk
        w={320}
        h={240}
        handles={[{ id: 'v', x: tip.x, y: tip.y }]}
        onDrag={(_id, x, y) => {
          let a = (Math.atan2(oy - y, x - ox) * 180) / Math.PI;
          if (a < 0) a += 180; // smer, nie orientácia: dolná polrovina = opačný vektor
          set(Math.round(a));
        }}
      >
        <Line x1={0} y1={oy} x2={320} y2={oy} stroke={CH.axis} />
        <Line x1={ox} y1={0} x2={ox} y2={240} stroke={CH.axis} />
        <Line
          x1={ox - Math.cos(rad) * L * s}
          y1={oy + Math.sin(rad) * L * s}
          x2={ox + Math.cos(rad) * L * s}
          y2={oy - Math.sin(rad) * L * s}
          stroke={hit ? CH.d : CH.dim}
          strokeDasharray="5 5"
          strokeOpacity={hit ? 0.9 : 0.5}
        />
        <Arrow x1={ox} y1={oy} x2={ox + Av[0] * s} y2={oy - Av[1] * s} color={hit ? CH.d : CH.a} w={3} />
        <Arrow x1={ox} y1={oy} x2={tip.x} y2={tip.y} color={CH.b} w={3.5} />
        <Circle cx={tip.x} cy={tip.y} r={13} fill={CH.b} fillOpacity={0.2} />
        <Label x={tip.x + 8} y={tip.y + 14} color={CH.b} size={13}>v</Label>
        <Label x={ox + Av[0] * s + 6} y={oy - Av[1] * s - 4} color={hit ? CH.d : CH.a} size={13}>A·v</Label>
        <Label x={8} y={20} color={hit ? CH.d : CH.c} size={14}>{hit ? `VLASTNÝ SMER, λ = ${sk(hit.lam)}` : 'A·v mieri inam'}</Label>
        <Label x={8} y={38} color={CH.dim} size={11}>A = [[1, 2], [4, 3]]</Label>
      </Chalk>
      <Slider label="Smer vektora v" value={phi} min={0} max={179} step={1} unit="°" fmt={(x) => String(Math.round(x))} onChange={set} marks={[{ v: 0, l: '0°' }, { v: 90, l: '90°' }, { v: 179, l: '180°' }]} />
      <Eq size={17} parts={[`v = (${sk(v[0])}, ${sk(v[1])})`]} />
      <Eq size={17} parts={[`A·v = (1·${par(v[0])} + 2·${par(v[1])}, 4·${par(v[0])} + 3·${par(v[1])}) = `, [`(${sk(Av[0])}, ${sk(Av[1])})`, hit ? C.good : C.blue]]} />
      {hit && <Eq size={19} parts={['A·v = ', [`${sk(hit.lam)}·v`, C.good], hit.lam < 0 ? '  (prevrátený, rovnaká priamka)' : '  (natiahnutý, rovnaký smer)']} />}
      <Text style={T.small}>
        Žltá šípka A·v ukazuje, kam matica vektor v pošle. Ťahaj modrý koniec v. Keď A·v padne na čiarkovanú priamku cez v, smer sa nezmenil a v je vlastný vektor.
      </Text>
      <Goal done={seen.includes(5)}>Nájdi smer, ktorý A natiahne päťnásobne (λ = 5)</Goal>
      <Goal done={seen.includes(-1)}>Nájdi smer, ktorý A prevráti (λ = −1)</Goal>
      <Stamp show={done} />
    </View>
  );
}
