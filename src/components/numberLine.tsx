import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Line, Path, Text as T } from 'react-native-svg';
import { C, F } from './ui';

// Číselná os pre definičný obor. Body sú rozložené rovnomerne (nie v mierke), aby boli popisy čitateľné.
//   „os|⟨−2, 2) ∪ (2, 3)“            vyfarbené intervaly, plný krúžok = bod patrí, prázdny = nepatrí
//   „os|ℝ ∖ {1; 3}“                  celá os s dierami
//   „os|ℝ ∖ {π/4 + kπ/2; k ∈ ℤ}“     celá os s dierami každú periódu
//   „zn|−1; 1|+; −; +“               tabuľka znamienok: nulové body a znamienko na každom kúsku

const W = 340;
const Y = 44;

/** „−3/2“, „π/4“, „−3π/4“ → číslo */
function val(s: string): number {
  const t = s.trim().replace(/−/g, '-');
  const m = t.match(/^(-?)(\d*)π(?:\/(\d+))?$/);
  if (m) return ((m[1] ? -1 : 1) * (m[2] ? +m[2] : 1) * Math.PI) / (m[3] ? +m[3] : 1);
  if (t.includes('/')) return +t.split('/')[0] / +t.split('/')[1];
  return +t;
}

type Piece = { lo: number; hi: number; loC: boolean; hiC: boolean; loT: string; hiT: string };

function parse(spec: string): { pieces: Piece[]; holes: { v: number; t: string }[] } {
  const s = spec.trim();
  if (s.startsWith('ℝ')) {
    const inner = s.match(/\{(.*)\}/)?.[1] ?? '';
    const per = inner.match(/^(?:(.*) \+ )?kπ(?:\/(\d+))?; k ∈ ℤ$/);
    const all: Piece = { lo: -Infinity, hi: Infinity, loC: false, hiC: false, loT: '', hiT: '' };
    if (per) {
      const x0 = per[1] ? val(per[1]) : 0;
      const d = per[2] ? +per[2] : 1;
      const lab = (k: number) => {
        // k-tý bod ako text v násobkoch π/(4d)
        const q = 4 * d;
        const p = Math.round(((x0 + (k * Math.PI) / d) / Math.PI) * q);
        let g = gcdN(Math.abs(p), q);
        if (!g) g = 1;
        const P = p / g, Q = q / g;
        if (P === 0) return '0';
        return (P < 0 ? '−' : '') + (Math.abs(P) === 1 ? '' : Math.abs(P)) + 'π' + (Q === 1 ? '' : '/' + Q);
      };
      return { pieces: [all], holes: [-1, 0, 1, 2].map((k) => ({ v: x0 + (k * Math.PI) / d, t: lab(k) })) };
    }
    return { pieces: [all], holes: inner ? inner.split(';').map((x) => ({ v: val(x), t: x.trim() })) : [] };
  }
  const pieces = s.split(' ∪ ').map((p) => {
    const m = p.trim().match(/^([(⟨])(.*), (.*)([)⟩])$/)!;
    return {
      lo: m[2].includes('∞') ? -Infinity : val(m[2]),
      hi: m[3].includes('∞') ? Infinity : val(m[3]),
      loC: m[1] === '⟨',
      hiC: m[4] === '⟩',
      loT: m[2].trim(),
      hiT: m[3].trim(),
    };
  });
  return { pieces, holes: [] };
}
const gcdN = (a: number, b: number): number => (b ? gcdN(b, a % b) : a);

export function NumberLine({ spec }: { spec: string }) {
  const sign = spec.startsWith('zn|');
  let marks: { v: number; t: string }[] = [];
  let pieces: Piece[] = [];
  let holes: { v: number; t: string }[] = [];
  let signs: string[] = [];
  if (sign) {
    const [, pts, sg] = spec.split('|');
    marks = pts.split(';').map((x) => ({ v: val(x), t: x.trim() }));
    signs = sg.split(';').map((x) => x.trim());
  } else {
    ({ pieces, holes } = parse(spec.slice(3)));
    marks = [...pieces.flatMap((p) => [isFinite(p.lo) ? { v: p.lo, t: p.loT } : null, isFinite(p.hi) ? { v: p.hi, t: p.hiT } : null]), ...holes].filter(Boolean) as { v: number; t: string }[];
  }
  // jedinečné body v poradí, rovnomerne na osi
  const uniq = [...new Map(marks.map((m) => [m.v.toFixed(9), m])).values()].sort((a, b) => a.v - b.v);
  const n = uniq.length;
  const L = n <= 2 ? 96 : 46, R = W - L;
  const pos = (v: number) => {
    if (v === -Infinity) return 12;
    if (v === Infinity) return W - 14;
    const i = uniq.findIndex((m) => Math.abs(m.v - v) < 1e-9);
    return n === 1 ? W / 2 : L + ((R - L) * i) / (n - 1);
  };
  return (
    <View style={{ backgroundColor: C.sheet, borderWidth: 2, borderColor: C.ink, borderRadius: 6, paddingVertical: 6 }}>
      <Svg width="100%" height={92} viewBox={`0 0 ${W} 92`}>
        {/* os */}
        <Line x1={6} y1={Y} x2={W - 8} y2={Y} stroke={C.ink2} strokeWidth={1.5} />
        <Path d={`M${W - 14} ${Y - 5} L${W - 6} ${Y} L${W - 14} ${Y + 5}`} stroke={C.ink2} strokeWidth={1.5} fill="none" />
        <T x={W - 12} y={Y + 22} fontSize={13} fill={C.ink2} fontFamily={F.mono} textAnchor="middle">
          x
        </T>
        {/* vyfarbené intervaly */}
        {pieces.map((p, i) => (
          <Line key={i} x1={pos(p.lo)} y1={Y} x2={pos(p.hi)} y2={Y} stroke={C.orange} strokeWidth={7} strokeLinecap="butt" />
        ))}
        {/* tabuľka znamienok: znamienko nad každým kúskom */}
        {sign &&
          signs.map((sg, i) => {
            const a = i === 0 ? 12 : pos(uniq[i - 1].v);
            const b = i === n ? W - 14 : pos(uniq[i].v);
            const plus = sg === '+';
            return (
              <React.Fragment key={i}>
                <Line x1={a} y1={Y} x2={b} y2={Y} stroke={plus ? C.good : C.bad} strokeWidth={plus ? 7 : 2} strokeDasharray={plus ? undefined : '5 4'} />
                <T x={(a + b) / 2} y={Y - 14} fontSize={22} fontWeight="bold" fill={plus ? C.good : C.bad} textAnchor="middle">
                  {sg}
                </T>
              </React.Fragment>
            );
          })}
        {/* body: plný = patrí, prázdny = nepatrí */}
        {uniq.map((m, i) => {
          const closed = sign ? false : pieces.some((p) => (p.lo === m.v && p.loC) || (p.hi === m.v && p.hiC));
          return (
            <React.Fragment key={i}>
              <Circle cx={pos(m.v)} cy={Y} r={6.5} fill={closed ? C.orange : C.sheet} stroke={sign ? C.ink : C.orange} strokeWidth={2.5} />
              <T x={pos(m.v)} y={Y + 26} fontSize={15} fill={C.ink} fontFamily={F.monoBold} textAnchor="middle">
                {m.t}
              </T>
            </React.Fragment>
          );
        })}
        {!sign && holes.length > 0 && pieces[0].lo === -Infinity && pieces[0].hi === Infinity && (
          <T x={W / 2} y={14} fontSize={12} fill={C.ink2} fontFamily={F.mono} textAnchor="middle">
            {spec.includes('k ∈ ℤ') ? '… diery sa opakujú donekonečna …' : 'všetko okrem dier'}
          </T>
        )}
      </Svg>
    </View>
  );
}
