import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Line, Polygon, Polyline } from 'react-native-svg';
import { C, F } from '../components/ui';

// Hracia doska "Cesta na skúšku": 30 políčok v hadovitej trase 6 × 5,
// štart vľavo dole (Zápis), cieľ vpravo hore (Skúška).

export const COLS = 6;
export const ROWS = 5;
export const LAST = COLS * ROWS - 1; // 29 = Skúška

export type CellKind = 'start' | 'goal' | 'topic' | 'konz' | 'kalk' | 'cvic' | 'skrat' | 'smyk';
export type Cell = { kind: CellKind; to?: number; name: string; topic?: number };

const SPECIAL: Record<number, Omit<Cell, 'topic'>> = {
  4: { kind: 'konz', to: 7, name: 'Konzultácia u cvičiaceho' },
  6: { kind: 'cvic', name: 'Cvičenie pri tabuli' },
  9: { kind: 'skrat', to: 15, name: 'Skrat: staré skúšky od tretiakov' },
  11: { kind: 'kalk', name: 'Zabudnutá kalkulačka' },
  16: { kind: 'smyk', to: 5, name: 'Šmyk: prespatá prednáška' },
  18: { kind: 'cvic', name: 'Cvičenie: písomka na body' },
  20: { kind: 'skrat', to: 26, name: 'Skrat: študijná skupina v knižnici' },
  21: { kind: 'konz', to: 24, name: 'Konzultácia cez e-mail o polnoci' },
  23: { kind: 'kalk', name: 'Zabudnutá kalkulačka' },
  27: { kind: 'smyk', to: 17, name: 'Šmyk: zlý vzorec v ťaháku' },
};

/** Zostaví dosku; témy idú po trase v poradí prednášok. */
export function buildCells(nTopics: number): Cell[] {
  const cells: Cell[] = [];
  const topicIdx: number[] = [];
  for (let i = 0; i <= LAST; i++) {
    if (i === 0) cells.push({ kind: 'start', name: 'Zápis' });
    else if (i === LAST) cells.push({ kind: 'goal', name: 'Skúška' });
    else if (SPECIAL[i]) cells.push({ ...SPECIAL[i] });
    else {
      topicIdx.push(i);
      cells.push({ kind: 'topic', name: '' });
    }
  }
  topicIdx.forEach((cellI, k) => {
    cells[cellI].topic = Math.min(nTopics - 1, Math.floor((k * nTopics) / topicIdx.length));
  });
  return cells;
}

/** Svetlé "pastelkové" výplne políčok podľa témy. */
export const TOPIC_TINTS = ['#F4C3A1', '#BCD0F2', '#A8D5CB', '#E9B8C2', '#C9DDA6', '#F2D9A0', '#B5DCE6', '#E0C9B0', '#CFD3C4'];
export const topicLetter = (i: number) => 'ABCDEFGHIJ'[i] ?? '?';

export const SPECIAL_LOOK: Record<Exclude<CellKind, 'topic'>, { fill: string; fg: string; label: (c: Cell) => string }> = {
  start: { fill: C.sheet, fg: C.ink, label: () => 'ZÁPIS' },
  goal: { fill: C.ink, fg: C.chalk, label: () => 'SKÚŠKA' },
  konz: { fill: C.teal, fg: '#fff', label: () => '+3' },
  kalk: { fill: C.paper2, fg: C.ink, label: () => 'PAUZA' },
  cvic: { fill: C.yellow, fg: C.ink, label: () => '×2' },
  skrat: { fill: C.blue, fg: '#fff', label: (c) => '↑' + c.to },
  smyk: { fill: C.orange, fg: '#fff', label: (c) => '↓' + c.to },
};

export function cellXY(i: number, cw: number, ch: number) {
  const row = Math.floor(i / COLS);
  const k = i % COLS;
  const col = row % 2 === 0 ? k : COLS - 1 - k;
  return { x: col * cw + cw / 2, y: (ROWS - 1 - row) * ch + ch / 2 };
}

// mierne "ručné" natočenie políčok
const tilt = (i: number) => (((i * 37) % 7) - 3) * 0.35;

function Ladder({ a, b, cw }: { a: { x: number; y: number }; b: { x: number; y: number }; cw: number }) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const nx = -uy;
  const ny = ux;
  const w = cw * 0.11;
  const trim = cw * 0.18;
  const s = { x: a.x + ux * trim, y: a.y + uy * trim };
  const e = { x: b.x - ux * trim, y: b.y - uy * trim };
  const L = len - 2 * trim;
  const rungs = Math.max(2, Math.floor(L / (cw * 0.2)));
  const els: React.ReactNode[] = [];
  for (let r = 1; r < rungs; r++) {
    const t = r / rungs;
    const px = s.x + (e.x - s.x) * t;
    const py = s.y + (e.y - s.y) * t;
    els.push(<Line key={r} x1={px + nx * w} y1={py + ny * w} x2={px - nx * w} y2={py - ny * w} stroke={C.blue} strokeWidth={2.5} strokeLinecap="round" />);
  }
  return (
    <>
      <Line x1={s.x + nx * w} y1={s.y + ny * w} x2={e.x + nx * w} y2={e.y + ny * w} stroke={C.ink} strokeWidth={5} strokeLinecap="round" opacity={0.85} />
      <Line x1={s.x - nx * w} y1={s.y - ny * w} x2={e.x - nx * w} y2={e.y - ny * w} stroke={C.ink} strokeWidth={5} strokeLinecap="round" opacity={0.85} />
      <Line x1={s.x + nx * w} y1={s.y + ny * w} x2={e.x + nx * w} y2={e.y + ny * w} stroke={C.blue} strokeWidth={2.6} strokeLinecap="round" />
      <Line x1={s.x - nx * w} y1={s.y - ny * w} x2={e.x - nx * w} y2={e.y - ny * w} stroke={C.blue} strokeWidth={2.6} strokeLinecap="round" />
      {els}
    </>
  );
}

function Slide({ a, b, cw }: { a: { x: number; y: number }; b: { x: number; y: number }; cw: number }) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const nx = -uy;
  const ny = ux;
  const amp = cw * 0.13;
  const pts: string[] = [];
  const N = 36;
  const trim = cw * 0.16;
  for (let k = 0; k <= N; k++) {
    const t = k / N;
    const d = trim + (len - 2 * trim) * t;
    const o = Math.sin(t * Math.PI * 3) * amp * (1 - t * 0.6);
    pts.push(`${(a.x + ux * d + nx * o).toFixed(1)},${(a.y + uy * d + ny * o).toFixed(1)}`);
  }
  const tip = { x: b.x - ux * trim * 0.6, y: b.y - uy * trim * 0.6 };
  const base = { x: b.x - ux * trim * 1.6, y: b.y - uy * trim * 1.6 };
  const hw = cw * 0.09;
  const arrow = `${tip.x},${tip.y} ${base.x + nx * hw},${base.y + ny * hw} ${base.x - nx * hw},${base.y - ny * hw}`;
  const sw = Math.max(4, cw * 0.075);
  return (
    <>
      <Polyline points={pts.join(' ')} fill="none" stroke={C.ink} strokeWidth={sw + 2.5} strokeLinecap="round" strokeLinejoin="round" opacity={0.85} />
      <Polyline points={pts.join(' ')} fill="none" stroke={C.orange} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      <Polygon points={arrow} fill={C.orange} stroke={C.ink} strokeWidth={1.5} strokeLinejoin="round" />
      <Circle cx={a.x + ux * trim} cy={a.y + uy * trim} r={sw * 0.9} fill={C.orange} stroke={C.ink} strokeWidth={1.5} />
    </>
  );
}

/** Doska: podklad s trasou, políčka, rebríky a šmyky; pešiaci idú ako children. */
export function BoardMap({ cells, cw, ch, children }: { cells: Cell[]; cw: number; ch: number; children?: React.ReactNode }) {
  const W = cw * COLS;
  const H = ch * ROWS;
  const path = cells.map((_, i) => {
    const p = cellXY(i, cw, ch);
    return `${p.x},${p.y}`;
  });
  const numSize = Math.max(11, Math.min(14, cw * 0.17));
  const labSize = Math.max(12, Math.min(19, cw * 0.22));
  const pad = Math.max(2, cw * 0.05);
  const renderCell = (c: Cell, i: number, layer: 'bg' | 'fg') => {
    const p = cellXY(i, cw, ch);
    const look = c.kind === 'topic' ? null : SPECIAL_LOOK[c.kind];
    const fill = look ? look.fill : TOPIC_TINTS[(c.topic ?? 0) % TOPIC_TINTS.length];
    const fg = look ? look.fg : C.ink;
    const label = look ? look.label(c) : topicLetter(c.topic ?? 0);
    const big = c.kind === 'start' || c.kind === 'goal';
    const bg = layer === 'bg';
    return (
      <View
        key={layer + i}
        pointerEvents="none"
        style={[
          st.cell,
          {
            left: p.x - cw / 2 + pad,
            top: p.y - ch / 2 + pad,
            width: cw - 2 * pad,
            height: ch - 2 * pad,
            transform: [{ rotate: tilt(i) + 'deg' }],
          },
          bg ? { backgroundColor: fill, borderWidth: c.kind === 'goal' || c.kind === 'cvic' ? 2.5 : 1.5 } : null,
        ]}
      >
        {bg ? null : (
          <>
            <Text style={[st.num, { fontSize: numSize, color: look && fg !== C.ink ? fg : C.ink2 }]}>{i}</Text>
            <View style={[st.pill, { backgroundColor: fill }]}>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={[st.lab, { fontSize: big ? Math.max(10, labSize * 0.62) : labSize, color: fg, fontFamily: c.kind === 'topic' ? F.mono : F.monoBold }]}
              >
                {label}
              </Text>
            </View>
          </>
        )}
      </View>
    );
  };
  return (
    <View style={{ width: W + 10, height: H + 10, alignSelf: 'center' }}>
      <View style={[st.shadow, { width: W + 4, height: H + 4 }]} />
      <View style={[st.sheet, { width: W + 4, height: H + 4 }]}>
        <Svg width={W} height={H} style={StyleSheet.absoluteFill} pointerEvents="none">
          <Polyline points={path.join(' ')} fill="none" stroke={C.ink2} strokeWidth={2} strokeDasharray="5 5" strokeLinejoin="round" />
        </Svg>
        {cells.map((c, i) => renderCell(c, i, 'bg'))}
        <Svg width={W} height={H} style={StyleSheet.absoluteFill} pointerEvents="none">
          {cells.map((c, i) =>
            c.kind === 'skrat' && c.to !== undefined ? (
              <Ladder key={'l' + i} a={cellXY(i, cw, ch)} b={cellXY(c.to, cw, ch)} cw={cw} />
            ) : c.kind === 'smyk' && c.to !== undefined ? (
              <Slide key={'s' + i} a={cellXY(i, cw, ch)} b={cellXY(c.to, cw, ch)} cw={cw} />
            ) : null,
          )}
        </Svg>
        {cells.map((c, i) => renderCell(c, i, 'fg'))}
        {children}
      </View>
    </View>
  );
}

const st = StyleSheet.create({
  shadow: { position: 'absolute', left: 6, top: 6, backgroundColor: C.ink, borderRadius: 10 },
  sheet: { backgroundColor: C.sheet, borderWidth: 2, borderColor: C.ink, borderRadius: 10, overflow: 'visible' },
  cell: { position: 'absolute', borderColor: C.ink, borderRadius: 5, alignItems: 'center', justifyContent: 'center' },
  num: { position: 'absolute', left: 4, top: 1, fontFamily: F.mono },
  pill: { marginTop: 6, borderRadius: 4, paddingHorizontal: 3, maxWidth: '100%' },
  lab: { textAlign: 'center' },
});
