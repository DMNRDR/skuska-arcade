import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { C, F, haptic } from '../../components/ui';
import { play } from '../../sound';
import { poly, sup } from '../../util';
import { Eq, Goal, par, sk, Stamp, T, Toggle, useOnce, Verdict } from '../kit';

// ───────────────────────── Hornerova schéma: vyber kandidáta a vyplň tabuľku krok po kroku ─────────────────────────

// Príklady 2a, 2c, 2d z hárku K_prednaske_10 (cvičenie Mat 1, 5. týždeň).
const PRESETS = [
  { label: '2a', coefs: [1, -1, -8, 12], cands: [1, -1, 2, -2, 3, -3, 4, -4, 6, -6] },
  { label: '2c', coefs: [1, -4, 0, 16, -16], cands: [1, -1, 2, -2, 4, -4, 8, -8] },
  { label: '2d', coefs: [1, 6, 14, 18, 9], cands: [1, -1, 3, -3, 9, -9] },
];

type Row = { a: number; top: number[]; bottom: number[]; shown: number };

const horner = (top: number[], a: number) => top.reduce<number[]>((b, c, k) => [...b, k === 0 ? c : c + a * b[k - 1]], []);
const polyStr = (c: number[]) => poly(c.map((v, i) => [v, c.length - 1 - i] as [number, number]));
const factor = (r: number) => (r < 0 ? `(x + ${sk(-r)})` : `(x − ${sk(r)})`);

function product(roots: number[], rest: number[]) {
  const counts = new Map<number, number>();
  roots.forEach((r) => counts.set(r, (counts.get(r) ?? 0) + 1));
  const parts = [...counts].map(([r, n]) => factor(r) + (n > 1 ? sup(n) : ''));
  const restStr = polyStr(rest);
  if (rest.length === 2 && rest[0] === 1) parts.push(factor(-rest[1]));
  else if (restStr !== '1') parts.push(`(${restStr})`);
  return parts.join('');
}

function Cell({ v, color, faded, wide }: { v: string; color?: string; faded?: boolean; wide?: boolean }) {
  return (
    <View
      style={{
        width: wide ? 54 : 48,
        height: 40,
        margin: 2,
        borderRadius: 4,
        borderWidth: color ? 2.5 : 1.2,
        borderColor: color ?? C.rule,
        backgroundColor: color ? color + '22' : C.sheet,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: faded ? 0.35 : 1,
      }}
    >
      <Text style={{ fontFamily: F.monoBold, fontSize: 16, color: C.ink }}>{v}</Text>
    </View>
  );
}

function Table({ row, active }: { row: Row; active: boolean }) {
  const k = row.shown - 1; // posledné vyplnené políčko
  const n = row.top.length;
  return (
    <View style={{ alignSelf: 'center', opacity: active ? 1 : 0.6 }}>
      <View style={{ flexDirection: 'row' }}>
        <Cell v="" faded />
        {row.top.map((c, i) => (
          <Cell key={i} v={sk(c)} color={active && i === k ? C.blue : undefined} />
        ))}
      </View>
      <View style={{ flexDirection: 'row', borderTopWidth: 2, borderColor: C.ink }}>
        <Cell v={sk(row.a)} color={active && k > 0 ? C.orange : undefined} />
        {row.bottom.map((b, i) => {
          const last = i === n - 1;
          const color = i === k && active ? C.good : last && i < row.shown ? (b === 0 ? C.good : C.bad) : undefined;
          return <Cell key={i} v={i < row.shown ? sk(b) : '?'} color={color} faded={i >= row.shown} wide={last} />;
        })}
      </View>
    </View>
  );
}

function Btn({ label, onPress, color = C.ink }: { label: string; onPress: () => void; color?: string }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        alignSelf: 'center',
        paddingHorizontal: 18,
        minHeight: 44,
        justifyContent: 'center',
        borderRadius: 6,
        borderWidth: 2,
        borderColor: C.ink,
        backgroundColor: color,
        transform: [{ translateY: pressed ? 2 : 0 }],
      })}
    >
      <Text style={{ fontFamily: F.bodyBold, fontSize: 16, color: '#fff' }}>{label}</Text>
    </Pressable>
  );
}

export function HornerTap({ onWin }: { onWin?: () => void }) {
  const [pi, setPi] = useState(0);
  const P = PRESETS[pi];
  const [cur, setCur] = useState<number[]>(P.coefs);
  const [roots, setRoots] = useState<number[]>([]);
  const [done, setDone] = useState<Row[]>([]);
  const [row, setRow] = useState<Row | null>(null);

  const deg = cur.length - 1;
  const D = deg === 2 ? cur[1] * cur[1] - 4 * cur[0] * cur[2] : 0;
  const finished = deg <= 1 || (deg === 2 && D < 0);
  useOnce(finished, () => onWin?.());

  const reset = (i: number) => {
    setPi(i);
    setCur(PRESETS[i].coefs);
    setRoots([]);
    setDone([]);
    setRow(null);
  };
  const tryA = (a: number) => {
    play('pop');
    setRow({ a, top: cur, bottom: horner(cur, a), shown: 1 });
  };
  const full = row !== null && row.shown === row.top.length;
  const rem = row ? row.bottom[row.bottom.length - 1] : 0;
  const next = () => {
    if (!row) return;
    const shown = row.shown + 1;
    setRow({ ...row, shown });
    if (shown === row.top.length) haptic(row.bottom[shown - 1] === 0 ? 'ok' : 'bad');
    else play('tick');
  };
  const accept = () => {
    if (!row) return;
    play('chip');
    setDone((d) => [...d, row]);
    setRoots((r) => [...r, row.a]);
    setCur(row.bottom.slice(0, -1));
    setRow(null);
  };

  const k = row ? row.shown - 1 : 0;
  const prod = row && k > 0 ? row.a * row.bottom[k - 1] : 0;

  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center' }}>
        {PRESETS.map((p, i) => (
          <Toggle key={p.label} on={i === pi} label={`Príklad ${p.label}`} onPress={() => reset(i)} color={C.orange} />
        ))}
      </View>
      <Eq center size={18} parts={['P(x) = ', [polyStr(P.coefs), C.ink]]} />
      {roots.length > 0 && <Eq center size={17} parts={['= ', [product(roots, cur), C.good]]} />}

      {done.map((r, i) => (
        <Table key={i} row={r} active={false} />
      ))}

      {finished ? (
        <Verdict ok>
          Hotovo: P(x) = {product(roots, cur)}.{' '}
          {deg === 2 ? `Zátvorka ${polyStr(cur)} má D = ${sk(D)} < 0, je nerozložiteľná.` : 'Ostal lineárny činiteľ, rozklad je úplný.'} Skús aj ďalší príklad hore.
        </Verdict>
      ) : row ? (
        <View style={{ gap: 10 }}>
          <Table row={row} active />
          {k === 0 ? (
            <Text style={T.small}>Prvý koeficient len zhodíš dolu.</Text>
          ) : (
            <View style={{ gap: 2 }}>
              <Eq center size={17} parts={[[par(row.a), C.orange], '·', par(row.bottom[k - 1]), ' = ', sk(prod)]} />
              <Eq center size={17} parts={[[par(row.top[k]), C.blue], ' + ', par(prod), ' = ', [sk(row.bottom[k]), C.good]]} />
            </View>
          )}
          {!full ? (
            <Btn label="Ďalší krok ▸" onPress={next} />
          ) : rem === 0 ? (
            <View style={{ gap: 8 }}>
              <Verdict ok>
                Zvyšok 0, takže {sk(row.a)} je koreň. P(x) = {factor(row.a)}·({polyStr(row.bottom.slice(0, -1))}) a pokračuješ s menším polynómom.
              </Verdict>
              <Btn label="Zapísať a pokračovať" onPress={accept} color={C.good} />
            </View>
          ) : (
            <Verdict ok={false}>
              Zvyšok {sk(rem)} ≠ 0, takže P({sk(row.a)}) = {sk(rem)} a {sk(row.a)} nie je koreň. Vyber iného kandidáta.
            </Verdict>
          )}
        </View>
      ) : (
        <Text style={T.lead}>
          Rozkladáš {polyStr(cur)}. Absolútny člen je {sk(cur[cur.length - 1])}, kandidáti sú jeho delitele. Vyber jedného:
        </Text>
      )}

      {!finished && (!row || (full && rem !== 0)) && (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {P.cands.map((a) => (
            <Toggle key={a} on={row?.a === a} label={sk(a)} onPress={() => tryA(a)} color={C.bad} />
          ))}
        </View>
      )}
      <Goal done={finished}>Rozlož vybraný príklad úplne na súčin</Goal>
      <Stamp show={finished} />
    </View>
  );
}
