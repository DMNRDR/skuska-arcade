import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { C, F } from '../../components/ui';
import { play } from '../../sound';
import { Eq, Goal, par, sk, Stamp, T, Toggle, useOnce, Verdict } from '../kit';

// ───────────────────────── násobenie matíc klikom na políčko ─────────────────────────

const A = [
  [1, 2, 0],
  [3, -1, 2],
];
const B = [
  [2, 1],
  [0, 3],
  [4, -2],
];

function Cell({ v, hl, color, onPress, dim, big }: { v: string; hl?: boolean; color?: string; onPress?: () => void; dim?: boolean; big?: boolean }) {
  const body = (
    <View
      style={{
        width: big ? 62 : 44,
        height: 44,
        margin: 2,
        borderRadius: 4,
        borderWidth: hl ? 2.5 : 1.5,
        borderColor: hl ? color ?? C.orange : C.ink,
        backgroundColor: hl ? (color ?? C.orange) + '22' : C.sheet,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: dim ? 0.35 : 1,
      }}
    >
      <Text style={{ fontFamily: F.monoBold, fontSize: 17, color: C.ink }}>{v}</Text>
    </View>
  );
  return onPress ? (
    <Pressable onPress={onPress} style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.93 : 1 }] })}>
      {body}
    </Pressable>
  ) : (
    body
  );
}

function Mat({ m, label, cell }: { m: number[][]; label: string; cell: (r: number, c: number) => React.ReactNode }) {
  return (
    <View style={{ alignItems: 'center', gap: 4 }}>
      <Text style={{ fontFamily: F.monoBold, fontSize: 16, color: C.ink }}>{label}</Text>
      <View style={{ borderLeftWidth: 2.5, borderRightWidth: 2.5, borderColor: C.ink, paddingHorizontal: 3, borderRadius: 6 }}>
        {m.map((row, r) => (
          <View key={r} style={{ flexDirection: 'row' }}>
            {row.map((_, c) => (
              <React.Fragment key={c}>{cell(r, c)}</React.Fragment>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

export function MatMul({ onWin }: { onWin?: () => void }) {
  const [sel, setSel] = useState<[number, number] | null>(null);
  const [filled, setFilled] = useState<boolean[][]>([
    [false, false],
    [false, false],
  ]);
  const Cm = A.map((row) => B[0].map((_, j) => row.reduce((s, a, k) => s + a * B[k][j], 0)));
  const all = filled.every((r) => r.every(Boolean));
  useOnce(all, () => onWin?.());
  const pick = (i: number, j: number) => {
    play('pop');
    setSel([i, j]);
    setFilled((f) => f.map((r, a) => r.map((x, b) => x || (a === i && b === j))));
  };
  const [i, j] = sel ?? [-1, -1];
  return (
    <View style={{ gap: 14 }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
        <Mat m={A} label="A (2×3)" cell={(r, c) => <Cell v={sk(A[r][c])} hl={r === i} color={C.orange} dim={sel !== null && r !== i} />} />
        <Text style={{ fontFamily: F.monoBold, fontSize: 22, color: C.ink }}>·</Text>
        <Mat m={B} label="B (3×2)" cell={(r, c) => <Cell v={sk(B[r][c])} hl={c === j} color={C.blue} dim={sel !== null && c !== j} />} />
        <Text style={{ fontFamily: F.monoBold, fontSize: 22, color: C.ink }}>=</Text>
        <Mat
          m={Cm}
          label="C (2×2)"
          cell={(r, c) => <Cell big v={filled[r][c] ? sk(Cm[r][c]) : '?'} hl={r === i && c === j} color={C.good} onPress={() => pick(r, c)} />}
        />
      </View>
      {sel ? (
        <View style={{ gap: 6 }}>
          <Text style={T.small}>
            Políčko c{i + 1}{j + 1} = {i + 1}. riadok A krát {j + 1}. stĺpec B (prvé s prvým, druhé s druhým, tretie s tretím, potom sčítaj):
          </Text>
          <Eq
            size={18}
            parts={[
              `c${'₁₂'[i]}${'₁₂'[j]} = `,
              ...A[i].flatMap((a, k): (string | [string, string])[] => [
                ...(k ? [' + '] : []),
                [par(a), C.orange] as [string, string],
                '·',
                [par(B[k][j]), C.blue] as [string, string],
              ]),
              ' = ',
              [sk(Cm[i][j]), C.good],
            ]}
          />
        </View>
      ) : (
        <Text style={T.lead}>Ťukni na políčko s otáznikom vo výsledku C.</Text>
      )}
      <Goal done={all}>Vyplň všetky štyri políčka výsledku</Goal>
      {all && (
        <Verdict ok>
          Rozmery: (2×3)·(3×2) = 2×2. Vnútorné čísla (3 a 3) sa musia rovnať, vonkajšie dajú rozmer výsledku. Preto B·A by mala rozmer 3×3, takže A·B ≠ B·A.
        </Verdict>
      )}
      <Stamp show={all} />
    </View>
  );
}

// ───────────────────────── Sarrusovo pravidlo: ťukaj uhlopriečky ─────────────────────────

const PRE = [
  [
    [2, 1, 3],
    [0, -1, 4],
    [1, 2, 1],
  ],
  [
    [1, 2, 0],
    [0, 1, 3],
    [2, 0, 1],
  ],
];

export function SarrusTap({ onWin }: { onWin?: () => void }) {
  const [pi, setPi] = useState(0);
  const M = PRE[pi];
  const [on, setOn] = useState<number[]>([]);
  // uhlopriečky v rozšírenej matici (prvé dva stĺpce opísané vpravo)
  const diags = [0, 1, 2].map((s) => [0, 1, 2].map((r) => [r, (s + r) % 3]));
  const anti = [0, 1, 2].map((s) => [0, 1, 2].map((r) => [r, (s + 2 - r + 3) % 3]));
  const all = [...diags.map((d) => ({ d, sign: 1 })), ...anti.map((d) => ({ d, sign: -1 }))];
  const prod = (d: number[][]) => d.reduce((p, [r, c]) => p * M[r][c], 1);
  const det = all.reduce((s, x) => s + x.sign * prod(x.d), 0);
  const sum = on.reduce((s, k) => s + all[k].sign * prod(all[k].d), 0);
  const done = on.length === 6;
  useOnce(done, () => onWin?.());
  const cur = on.length ? on[on.length - 1] : -1;
  // rozšírená matica 3×5: pozícia uhlopriečky v nej
  const ext = (k: number) => {
    const s = k % 3;
    return k < 3 ? [0, 1, 2].map((r) => [r, s + r]) : [0, 1, 2].map((r) => [r, s + 2 - r]);
  };
  const hl = cur >= 0 ? ext(cur) : [];
  return (
    <View style={{ gap: 12 }}>
      <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
        <View style={{ borderLeftWidth: 2.5, borderRightWidth: 2.5, borderColor: C.ink, borderRadius: 6, paddingHorizontal: 2 }}>
          {[0, 1, 2].map((r) => (
            <View key={r} style={{ flexDirection: 'row' }}>
              {[0, 1, 2, 3, 4].map((c) => {
                const isHl = hl.some(([a, b]) => a === r && b === c);
                const extra = c >= 3;
                return (
                  <View
                    key={c}
                    style={{
                      width: 46,
                      height: 42,
                      margin: 2,
                      borderRadius: 4,
                      borderWidth: isHl ? 2.5 : 1,
                      borderStyle: extra && !isHl ? 'dashed' : 'solid',
                      borderColor: isHl ? (all[cur].sign > 0 ? C.good : C.bad) : extra ? C.rule : C.ink,
                      backgroundColor: isHl ? (all[cur].sign > 0 ? '#DDF1E4' : '#FBE3DF') : extra ? 'transparent' : C.sheet,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ fontFamily: F.monoBold, fontSize: 17, color: extra ? C.ink2 : C.ink }}>{sk(M[r][c % 3])}</Text>
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      </View>
      <Text style={T.small}>Prvé dva stĺpce sú prepísané vpravo (prerušovane). Ťukaj na uhlopriečky: tri dolu doprava idú s plusom, tri hore doprava s mínusom.</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {all.map((x, k) => (
          <Toggle
            key={k}
            on={on.includes(k)}
            color={x.sign > 0 ? C.good : C.bad}
            label={`${x.sign > 0 ? '+' : '−'} ${x.d.map(([r, c]) => par(M[r][c], 0)).join('·')}`}
            onPress={() => {
              if (!on.includes(k)) {
                play('pop');
                setOn([...on, k]);
              }
            }}
          />
        ))}
      </View>
      <Eq size={18} parts={['det = ', ...on.map((k, n): string => `${all[k].sign > 0 ? (n ? ' + ' : '') : ' − '}${Math.abs(prod(all[k].d))}`), on.length ? ` = ${sk(sum)}` : '…']} />
      {done && <Verdict ok>det = {sk(det)}. Hotovo, všetkých šesť súčinov so správnymi znamienkami.</Verdict>}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Stamp show={done} />
        <View style={{ flex: 1 }} />
        <Toggle
          on={false}
          label="Iná matica"
          onPress={() => {
            setPi((pi + 1) % PRE.length);
            setOn([]);
          }}
        />
      </View>
    </View>
  );
}
