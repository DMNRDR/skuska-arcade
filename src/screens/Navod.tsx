import React, { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Bar, C, F, GButton, haptic, Header } from '../components/ui';
import { NAVOD } from '../data/geo-navod';
import { play } from '../sound';

// Geodézia: praktický návod na Zadanie 5, jeden krok na obrazovku. Odfajkni a choď ďalej.

const COLOR = C.ochre;

export default function Navod({ onBack }: { onBack: () => void }) {
  const [i, setI] = useState(0);
  const scroll = useRef<ScrollView>(null);
  const st = NAVOD[i];
  const last = i === NAVOD.length - 1;
  const go = (to: number) => {
    setI(to);
    play('pop');
    scroll.current?.scrollTo({ y: 0, animated: false });
  };
  return (
    <View style={{ flex: 1 }}>
      <Header kicker="Geodézia 1 · Zadanie 5 · dnes na cvičení" title="Ako na to v praxi" onBack={onBack} />
      <View style={{ paddingHorizontal: 16, gap: 6, paddingBottom: 8 }}>
        <Text style={s.meta}>
          KROK {i + 1} Z {NAVOD.length}
        </Text>
        <Bar value={(i + 1) / NAVOD.length} color={COLOR} />
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
            <Text style={s.section}>Napíš do Excelu</Text>
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
  foot: { flexDirection: 'row', gap: 10, padding: 12, borderTopWidth: 2, borderTopColor: C.ink, backgroundColor: C.paper },
  backBtn: { paddingHorizontal: 18, justifyContent: 'center', borderWidth: 2, borderColor: C.ink, borderRadius: 8, backgroundColor: C.sheet },
  backText: { fontFamily: F.bodyBold, fontSize: 16, color: C.ink },
});
