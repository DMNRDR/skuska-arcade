import React, { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Bar, C, F, GButton, haptic, Header } from '../components/ui';
import { NAVOD } from '../data/geo-navod';
import { NAVOD7 } from '../data/geo-navod7';
import { play } from '../sound';

// Geodézia: praktické návody (Zadanie 5, Zadanie 7), jeden krok na obrazovku. Odfajkni a choď ďalej.

const COLOR = C.ochre;

const SETS = {
  5: { steps: NAVOD, kicker: 'Geodézia 1 · Zadanie 5 · výpočet v Exceli' },
  7: { steps: NAVOD7, kicker: 'Geodézia 1 · Zadanie 7 · zvislé uhly' },
};

export default function Navod({ onBack, zadanie = 5 }: { onBack: () => void; zadanie?: 5 | 7 }) {
  const STEPS = SETS[zadanie].steps;
  const [i, setI] = useState(0);
  const scroll = useRef<ScrollView>(null);
  const st = STEPS[i];
  const last = i === STEPS.length - 1;
  const go = (to: number) => {
    setI(to);
    play('pop');
    scroll.current?.scrollTo({ y: 0, animated: false });
  };
  return (
    <View style={{ flex: 1 }}>
      <Header kicker={SETS[zadanie].kicker} title="Ako na to v praxi" onBack={onBack} />
      <View style={{ paddingHorizontal: 16, gap: 6, paddingBottom: 8 }}>
        <Text style={s.meta}>
          KROK {i + 1} Z {STEPS.length}
        </Text>
        <Bar value={(i + 1) / STEPS.length} color={COLOR} />
      </View>
      <ScrollView ref={scroll} contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 24 }}>
        <Text style={s.title}>{st.title}</Text>

        <View style={{ gap: 10 }}>
          {st.todo.map((t, k) => (
            <View key={k} style={{ flexDirection: 'row', gap: 10 }}>
              <Text style={s.num}>{k + 1}.</Text>
              <Text style={[s.body, { flex: 1 }]}>{t}</Text>
            </View>
          ))}
        </View>

        {st.cells ? (
          <View style={{ gap: 6 }}>
            <Text style={s.section}>{st.cellsTitle ?? 'Napíš do Excelu'}</Text>
            <View style={s.sheet}>
              {st.cells.map(([cell, write, note], k) => (
                <View key={k} style={[s.row, k > 0 && { borderTopWidth: 1, borderTopColor: C.rule }]}>
                  <Text style={s.cell}>{cell}</Text>
                  <View style={{ flex: 1, gap: 2 }}>
                    <Text style={s.write} selectable>
                      {write}
                    </Text>
                    {note ? <Text style={s.note}>{note}</Text> : null}
                  </View>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {st.calc ? <IndexCalc /> : null}

        {st.expect ? (
          <View style={s.expect}>
            <Text style={[s.section, { color: C.good, marginTop: 0 }]}>Toto ti má vyjsť</Text>
            {st.expect.map((e, k) => (
              <Text key={k} style={s.expectText}>
                ✓ {e}
              </Text>
            ))}
          </View>
        ) : null}

        {st.tip ? (
          <View style={s.tip}>
            <Text style={s.tipText}>{st.tip}</Text>
          </View>
        ) : null}
      </ScrollView>
      <View style={s.foot}>
        <Pressable
          disabled={i === 0}
          onPress={() => {
            haptic('tap');
            go(i - 1);
          }}
          style={({ pressed }) => [s.backBtn, { opacity: i === 0 ? 0.35 : pressed ? 0.7 : 1 }]}
        >
          <Text style={s.backText}>Späť</Text>
        </Pressable>
        <View style={{ flex: 1 }}>
          <GButton
            color={last ? C.good : COLOR}
            title={last ? 'Hotovo' : 'Mám to, ďalší krok'}
            onPress={() => {
              if (last) {
                play('correct');
                onBack();
              } else go(i + 1);
            }}
          />
        </View>
      </View>
    </View>
  );
}

// Kalkulačka indexovej chyby: Z_I a Z_II v gradoch → Σ, 2i, i, opravené Z, ε.
const num = (x: string) => {
  const v = parseFloat(x.replace(/\s/g, '').replace(',', '.'));
  return Number.isFinite(v) ? v : null;
};
const g4 = (v: number) => v.toFixed(4).replace('.', ',');
const ccs = (g: number) => {
  const c = Math.round(g * 10000);
  return (c > 0 ? '+' : c < 0 ? '−' : '') + Math.abs(c) + 'cc';
};

function IndexCalc() {
  const [a, setA] = useState('95,7523');
  const [b, setB] = useState('304,2467');
  const z1 = num(a);
  const z2 = num(b);
  const ok = z1 != null && z2 != null;
  const sum = ok ? z1 + z2 : 0;
  const i = ok ? (400 - sum) / 2 : 0;
  const z1c = z1! + i;
  const z2c = z2! + i;
  const eps = 100 - z1c;
  const bad = ok && Math.abs(400 - sum) > 0.05;
  const rows: [string, string, string?][] = ok
    ? [
        ['Σ', g4(sum) + ' g', 'Z_I + Z_II'],
        ['2i', ccs(400 - sum), '400 − Σ'],
        ['i', ccs(i), 'indexová chyba'],
        ['Z′_I', g4(z1c) + ' g', 'Z_I + i'],
        ['Z′_II', g4(z2c) + ' g', 'Z_II + i, súčet = ' + g4(z1c + z2c)],
        ['ε', (eps >= 0 ? '+' : '−') + g4(Math.abs(eps)) + ' g', '100 − Z′_I'],
      ]
    : [];
  return (
    <View style={{ gap: 10 }}>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        {(
          [
            ['Z_I (I. poloha)', a, setA],
            ['Z_II (II. poloha)', b, setB],
          ] as const
        ).map(([label, val, set]) => (
          <View key={label} style={{ flex: 1, gap: 4 }}>
            <Text style={s.section}>{label}</Text>
            <TextInput value={val} onChangeText={set} keyboardType="decimal-pad" style={s.input} selectTextOnFocus />
          </View>
        ))}
      </View>
      {ok ? (
        <View style={s.sheet}>
          {rows.map(([k, v, n], r) => (
            <View key={k} style={[s.row, r > 0 && { borderTopWidth: 1, borderTopColor: C.rule }]}>
              <Text style={s.cell}>{k}</Text>
              <View style={{ flex: 1, gap: 2 }}>
                <Text style={s.write}>{v}</Text>
                {n ? <Text style={s.note}>{n}</Text> : null}
              </View>
            </View>
          ))}
        </View>
      ) : (
        <Text style={s.note}>Napíš obe čítania ako číslo, napr. 95,7523.</Text>
      )}
      {bad ? (
        <View style={s.tip}>
          <Text style={s.tipText}>Σ je od 400 g ďaleko. Skontroluj, či si cielil na ten istý bod a či si dobre zapísal čítanie.</Text>
        </View>
      ) : null}
    </View>
  );
}

const s = StyleSheet.create({
  meta: { fontFamily: F.monoBold, fontSize: 12, letterSpacing: 1.2, color: C.ink2 },
  title: { fontFamily: F.headX, fontSize: 28, lineHeight: 32, color: C.ink },
  num: { fontFamily: F.monoBold, fontSize: 17, lineHeight: 26, color: C.ochre, width: 24 },
  body: { fontFamily: F.body, fontSize: 18, lineHeight: 26, color: C.ink },
  section: { fontFamily: F.monoBold, fontSize: 12, letterSpacing: 1.4, color: C.ink2, textTransform: 'uppercase', marginTop: 4 },
  sheet: { borderWidth: 2, borderColor: C.ink, borderRadius: 6, backgroundColor: C.sheet, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, padding: 10 },
  cell: { fontFamily: F.monoBold, fontSize: 13, color: '#fff', backgroundColor: '#1E7145', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 3, overflow: 'hidden', maxWidth: 120 },
  write: { fontFamily: F.monoBold, fontSize: 16, lineHeight: 22, color: C.ink },
  note: { fontFamily: F.body, fontSize: 14, color: C.ink2 },
  expect: { backgroundColor: '#DDF1E4', borderLeftWidth: 5, borderLeftColor: C.good, borderRadius: 4, padding: 12, gap: 4 },
  expectText: { fontFamily: F.monoBold, fontSize: 15, lineHeight: 22, color: C.ink },
  tip: { borderWidth: 2, borderStyle: 'dashed', borderColor: C.gold, borderRadius: 8, padding: 12 },
  tipText: { fontFamily: F.body, fontSize: 16, lineHeight: 23, color: C.ink },
  input: { fontFamily: F.monoBold, fontSize: 20, color: C.ink, borderWidth: 2, borderColor: C.ink, borderRadius: 6, backgroundColor: C.sheet, paddingHorizontal: 10, paddingVertical: 8 },
  foot: { flexDirection: 'row', gap: 10, padding: 12, borderTopWidth: 2, borderTopColor: C.ink, backgroundColor: C.paper },
  backBtn: { paddingHorizontal: 18, justifyContent: 'center', borderWidth: 2, borderColor: C.ink, borderRadius: 8, backgroundColor: C.sheet },
  backText: { fontFamily: F.bodyBold, fontSize: 16, color: C.ink },
});
