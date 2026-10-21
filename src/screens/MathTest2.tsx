import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { C, F, GButton, Header, Icon, Press } from '../components/ui';
import { GameConfig } from './Game';

const TEST_TOPICS = ['determinanty'];

// Rozsah: mail cvičiacej A. A. Ožvat z 20. 10. 2026 (písomka 21. 10., jeden príklad, „od determinantov“)
// a upresnenie od spolužiakov: inverzná matica a sústava rovníc.
const blocks = [
  {
    no: '01',
    topic: 'determinanty',
    title: 'Inverzná matica',
    source: 'Prednáška 4 · Učebňa: Determinanty a SLAR, kroky 6 až 8 a 13',
    items: [
      '2×2: vymeň a a d, zmeň znamienka b a c, vydeľ det A',
      '3×3: algebraické doplnky (šachovnica + − +) → transponuj → vydeľ det A',
      'alebo Gauss-Jordan: [A | E] → [E | A⁻¹]',
      'det A = 0 → inverzná neexistuje',
      'skúška: A·A⁻¹ = E',
    ],
  },
  {
    no: '02',
    topic: 'determinanty',
    title: 'Sústavy lineárnych rovníc',
    source: 'Prednáška 4 · Učebňa: Determinanty a SLAR, kroky 9 až 13',
    items: [
      'Gaussova eliminácia: rozšírená matica (A | b) → stupňovitý tvar',
      'Frobeniova veta: h(A) = h(A | b) → riešiteľná, menej ako n → nekonečne veľa riešení',
      'Cramerovo pravidlo: xᵢ = det Aᵢ / det A (iba štvorcová, det A ≠ 0)',
      'cez inverznú: A·x = b → x = A⁻¹·b',
      'skúška: dosaď riešenie do všetkých rovníc',
    ],
  },
  {
    no: '03',
    topic: 'determinanty',
    title: 'Determinant ako nástroj',
    source: 'Prednáška 4 · Učebňa: kroky 1 až 5',
    items: ['potrebuješ ho na A⁻¹ aj na Cramera', '2×2: a·d − b·c', '3×3: Sarrusovo pravidlo alebo rozvoj podľa riadku s nulami'],
  },
] as const;

export default function MathTest2({
  onBack,
  onLearn,
  onPlay,
}: {
  onBack: () => void;
  onLearn: (topic: string) => void;
  onPlay: (config: GameConfig) => void;
}) {
  return (
    <View style={{ flex: 1 }}>
      <Header kicker="Matematika 1" title="2. písomka" onBack={onBack} />
      <ScrollView contentContainerStyle={s.page}>
        <View style={s.hero}>
          <Text style={s.kicker}>STREDA 21. 10. · JEDEN PRÍKLAD</Text>
          <Text style={s.heroTitle}>Učivo od determinantov</Text>
          <Text style={s.lead}>Podľa mailu cvičiacej Ožvatovej: písomka je z učiva od determinantov (vektory a analytická geometria už nie). Podľa spolužiakov príde inverzná matica alebo sústava rovníc, determinant sám o sebe nie.</Text>
        </View>

        <View style={s.note}>
          <Icon name="info" size={20} color={C.orange} />
          <Text style={s.noteText}>Celý výklad je v Učebni v téme 04 Determinanty a SLAR. Na konci každého výpočtu urob skúšku, na písomke ťa zachráni.</Text>
        </View>

        <Text style={s.section}>Plán prípravy</Text>
        {blocks.map((block) => (
          <View key={block.no} style={s.block}>
            <View style={s.blockHead}>
              <Text style={s.no}>{block.no}</Text>
              <View style={{ flex: 1, gap: 2 }}>
                <Text style={s.title}>{block.title}</Text>
                <Text style={s.source}>{block.source}</Text>
              </View>
            </View>
            <View style={s.items}>
              {block.items.map((item) => (
                <View key={item} style={s.itemRow}>
                  <View style={s.dot} />
                  <Text style={s.item}>{item}</Text>
                </View>
              ))}
            </View>
            <GButton icon="next" light color={C.sheet} title="Otvoriť výklad" subtitle={block.title} onPress={() => onLearn(block.topic)} />
          </View>
        ))}

        <Text style={s.section}>Spoločný tréning</Text>
        <Press
          color={C.orange}
          onPress={() => onPlay({ mode: 'boss', subject: 'mat', topics: TEST_TOPICS, title: '2. písomka · mix' })}
          inner={{ padding: 18, gap: 6 }}
        >
          <Text style={s.whiteKicker}>VŠETKY BLOKY</Text>
          <Text style={s.whiteTitle}>Boss druhej písomky</Text>
          <Text style={s.whiteText}>Otázky a generované príklady: inverzná matica, Cramer, Gauss, Frobenius a determinanty. Tri životy, pomôcky a okamžité vysvetlenie.</Text>
        </Press>
        <GButton
          icon="target"
          color={C.ink}
          title="60-sekundový mix"
          subtitle="Rýchly tréning iba z učiva na 2. písomku"
          onPress={() => onPlay({ mode: 'arcade', subject: 'mat', topics: TEST_TOPICS, title: '60 s · 2. písomka' })}
        />

        <Text style={s.foot}>Zdroj: mail A. A. Ožvat z 20. 10. 2026 (AIS), prednášky 4 a 5 doc. Minarechovej a hárok K prednáške 10.</Text>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  page: { paddingHorizontal: 16, paddingBottom: 40, gap: 14 },
  hero: { gap: 6, paddingVertical: 6 },
  kicker: { fontFamily: F.monoBold, fontSize: 12, letterSpacing: 1.4, color: C.orange },
  heroTitle: { fontFamily: F.headX, fontSize: 30, lineHeight: 34, color: C.ink },
  lead: { fontFamily: F.body, fontSize: 17, lineHeight: 23, color: C.ink2 },
  note: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, padding: 12, borderWidth: 1.5, borderColor: C.orange, borderRadius: 6, backgroundColor: C.sheet },
  noteText: { flex: 1, fontFamily: F.bodyMed, fontSize: 15, lineHeight: 20, color: C.ink },
  section: { marginTop: 8, fontFamily: F.monoBold, fontSize: 12, letterSpacing: 1.5, color: C.ink2, textTransform: 'uppercase' },
  block: { gap: 12, paddingVertical: 15, borderBottomWidth: 1.5, borderBottomColor: C.rule },
  blockHead: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  no: { width: 34, fontFamily: F.monoBold, fontSize: 22, color: C.orange },
  title: { fontFamily: F.head, fontSize: 21, lineHeight: 25, color: C.ink },
  source: { fontFamily: F.mono, fontSize: 12, lineHeight: 16, color: C.ink2 },
  items: { gap: 5, marginLeft: 46 },
  itemRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  dot: { width: 6, height: 6, marginTop: 8, borderRadius: 3, backgroundColor: C.orange },
  item: { flex: 1, fontFamily: F.body, fontSize: 16, lineHeight: 21, color: C.ink2 },
  whiteKicker: { fontFamily: F.monoBold, fontSize: 12, letterSpacing: 1.4, color: '#fff', opacity: 0.9 },
  whiteTitle: { fontFamily: F.headX, fontSize: 27, lineHeight: 31, color: '#fff' },
  whiteText: { fontFamily: F.body, fontSize: 15, lineHeight: 20, color: '#fff' },
  foot: { fontFamily: F.body, fontSize: 13, lineHeight: 18, color: C.ink2 },
});
