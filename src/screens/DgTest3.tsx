import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Bar, C, Confetti, F, GButton, haptic, Header, Icon, Press } from '../components/ui';
import { DG3_L1, DG3_L2, DG3_L3, DG3_L4 } from '../data/dg3-levels';
import type { Check } from '../data/steps';
import Player from '../learn/Player';
import { Slide } from '../learn/slides';
import { Progress } from '../storage';
import { shuffle } from '../util';
import { QuizTest } from './Exam';

// Metódy zobrazovania, 3. písomka (kartografia): lekcie → tézy → otázky po leveloch → skúšobná písomka na čas.

const LESSONS: [string, string][] = [
  ['pisomka3', 'Čo bude na písomke'],
  ['kart-uvod', 'Úvod a skreslenie'],
  ['kart-azimut', 'Azimutálne projekcie'],
  ['kart-valcove', 'Valcové'],
  ['kart-kuzelove', 'Kužeľové'],
  ['kart-ortodroma', 'Ortodróma a loxodróma'],
  ['kart-neprave', 'Nepravé a polykónické'],
];
const LEVELS: { id: string; no: string; title: string; text: string; checks: Check[] }[] = [
  { id: 'l1', no: 'L1', title: 'Level 1 · ľahké', text: 'Pojmy: U, V, poludník, rovnobežka, konformné, ekvivalentné, ortodróma, loxodróma, polohy.', checks: DG3_L1 },
  { id: 'l2', no: 'L2', title: 'Level 2 · stredné', text: 'Vlastnosti a porovnania: čo je kde priamka, tvar siete v rovníkovej polohe, skreslenie.', checks: DG3_L2 },
  { id: 'l3', no: 'L3', title: 'Level 3 · ťažké', text: 'Výpočty a konštrukcie krok po kroku: ρ, y, ε pre konkrétne R a U, ortodróma v projekciách.', checks: DG3_L3 },
];
const L4_N = 8;
const L4_MIN = 25;
const GROUPS = [
  { id: 'l1', no: 'L1', title: 'Pojmy' },
  { id: 'l2', no: 'L2', title: 'Vlastnosti a porovnania' },
  { id: 'l3', no: 'L3', title: 'Výpočty a konštrukcie' },
  { id: 'l4', no: 'L4', title: 'Písomkové otázky' },
];
/** skúšobná písomka: 1 + 2 + 2 + 3 otázky, od ľahších */
function l4Build() {
  const take = (arr: Check[], n: number, g: number) =>
    shuffle(arr)
      .slice(0, n)
      .map((c) => ({ ...c, topic: GROUPS[g] }));
  return [...take(DG3_L1, 1, 0), ...take(DG3_L2, 2, 1), ...take(DG3_L3, 2, 2), ...take(DG3_L4, 3, 3)];
}
const key = (id: string) => `dg3:${id}`;

type View_ = { kind: 'list' } | { kind: 'part'; id: string; seed: number } | { kind: 'done'; id: string } | { kind: 'l4'; seed: number };

export default function DgTest3({
  progress,
  onBack,
  onLearn,
  onTezy,
  onLearned,
  onXp,
  onScore,
}: {
  progress: Progress;
  onBack: () => void;
  onLearn: (topic: string) => void;
  onTezy: () => void;
  onLearned: (key: string, step: number) => void;
  onXp: (xp: number) => void;
  onScore: (pct: number, key: string) => void;
}) {
  const [v, setV] = useState<View_>({ kind: 'list' });
  const open = (id: string) => setV({ kind: 'part', id, seed: Date.now() });
  const l4 = () => setV({ kind: 'l4', seed: Date.now() });

  if (v.kind === 'part') {
    const p = LEVELS.find((x) => x.id === v.id)!;
    return <LevelPlayer key={v.seed} p={p} onClose={() => setV({ kind: 'list' })} onDone={() => setV({ kind: 'done', id: p.id })} onLearned={onLearned} onXp={onXp} />;
  }
  if (v.kind === 'l4')
    return (
      <QuizTest
        key={v.seed}
        title="Level 4 · skúšobná písomka"
        minutes={L4_MIN}
        points={L4_N}
        build={l4Build}
        groups={GROUPS}
        onClose={() => setV({ kind: 'list' })}
        onOpen={(id) => (id === 'l4' ? onTezy() : open(id))}
        onAgain={l4}
        onFinish={(ok, total) => {
          onXp(ok * 8);
          onScore(Math.round((100 * ok) / total), key('l4'));
        }}
      />
    );
  if (v.kind === 'done') {
    const idx = LEVELS.findIndex((x) => x.id === v.id);
    const nextP = LEVELS[idx + 1];
    return (
      <View style={{ flex: 1 }}>
        <Header kicker="3. písomka" title="Hotovo" onBack={() => setV({ kind: 'list' })} />
        <Confetti />
        <ScrollView contentContainerStyle={s.page}>
          <Text style={s.lead}>„{LEVELS[idx].title}“ máš za sebou (+30 XP).</Text>
          {nextP ? (
            <GButton icon="next" color={C.teal} title={`Ďalej: ${nextP.title}`} onPress={() => open(nextP.id)} />
          ) : (
            <GButton icon="medal" color={C.orange} title="Level 4 · skúšobná písomka" subtitle={`${L4_N} otázok, ${L4_MIN} minút, body z ${L4_N}`} onPress={l4} />
          )}
          <GButton icon="prev" light color={C.sheet} title="Späť na prehľad" onPress={() => setV({ kind: 'list' })} />
        </ScrollView>
      </View>
    );
  }

  const best = progress.gameBest[key('l4')] ?? 0;
  const total = LEVELS.reduce((a, p) => a + p.checks.length, 0);
  const done = LEVELS.reduce((a, p) => a + Math.min(progress.learned[key(p.id)] ?? 0, p.checks.length), 0);
  return (
    <View style={{ flex: 1 }}>
      <Header kicker="Metódy zobrazovania · 3. písomka" title="Kartografia" onBack={onBack} />
      <ScrollView contentContainerStyle={s.page}>
        <View style={{ gap: 6 }}>
          <Text style={s.kicker}>13. TÝŽDEŇ · MAX 8 BODOV</Text>
          <Text style={s.lead}>Najprv lekcie (jedna myšlienka na obrazovku, rysovačky krok po kroku), potom tézy a otázky po leveloch. Na konci skúšobná písomka na čas.</Text>
        </View>
        <Text style={s.section}>Lekcie</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {LESSONS.map(([id, l], i) => (
            <Pressable
              key={id}
              onPress={() => {
                haptic('tap');
                onLearn(id);
              }}
              style={({ pressed }) => [s.chip, pressed && { opacity: 0.6 }]}
            >
              <Text style={s.chipText}>
                {i}. {l}
              </Text>
            </Pressable>
          ))}
        </View>
        <Press color={C.ink} onPress={onTezy} inner={{ padding: 16, gap: 4 }}>
          <Text style={[s.kicker, { color: '#fff', opacity: 0.9 }]}>28 OTÁZOK · TEÓRIA AJ RYSOVANIE</Text>
          <Text style={s.bigBtn}>Tézy 3. písomky</Text>
        </Press>
        <Text style={s.section}>Otázky po leveloch</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={{ flex: 1 }}>
            <Bar value={done / total} color={C.teal} />
          </View>
          <Text style={s.meta}>
            {done}/{total}
          </Text>
        </View>
        <View>
          {LEVELS.map((p) => {
            const n = p.checks.length;
            const d = Math.min(progress.learned[key(p.id)] ?? 0, n);
            const fin = d >= n;
            return (
              <Pressable
                key={p.id}
                onPress={() => {
                  haptic('tap');
                  open(p.id);
                }}
                style={({ pressed }) => [s.row, pressed && { opacity: 0.6 }]}
              >
                <Text style={[s.no, { color: fin ? C.good : C.teal }]}>{p.no}</Text>
                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={s.name}>{p.title}</Text>
                  <Text style={s.meta}>{p.text}</Text>
                  <View style={{ flexDirection: 'row', gap: 2, marginTop: 2 }}>
                    {Array.from({ length: n }, (_, j) => (
                      <View key={j} style={{ flex: 1, height: 4, backgroundColor: j < d ? (fin ? C.good : C.teal) : C.rule }} />
                    ))}
                  </View>
                </View>
                <Icon name="next" size={16} color={C.ink2} />
              </Pressable>
            );
          })}
        </View>
        <Press color={C.orange} onPress={l4} inner={{ padding: 18, gap: 6 }}>
          <Text style={[s.kicker, { color: '#fff', opacity: 0.9 }]}>LEVEL 4</Text>
          <Text style={s.bigBtn}>Skúšobná písomka</Text>
          <Text style={[s.small, { color: '#fff' }]}>
            {L4_N} otázok od pojmov po výpočty, {L4_MIN} minút, výsledok v bodoch z {L4_N} (cieľ aspoň 7,5). Rysovačky si narysuj na papier z téz.{best ? ` Rekord: ${best} %.` : ''}
          </Text>
        </Press>
        <Text style={s.foot}>
          Zdroj: sylabus B1-MZO a oficiálne „Typy úloh“ zo skrípt M. Vajsáblová, Metódy zobrazovania pre GaK (valcové s. 137, kužeľové s. 150, nepravé s. 162, azimutálne s. 198). Okruh 3T zatiaľ nie je zverejnený. Všetky čísla sú overené výpočtom.
        </Text>
      </ScrollView>
    </View>
  );
}

function LevelPlayer({
  p,
  onClose,
  onDone,
  onLearned,
  onXp,
}: {
  p: (typeof LEVELS)[number];
  onClose: () => void;
  onDone: () => void;
  onLearned: (k: string, n: number) => void;
  onXp: (xp: number) => void;
}) {
  const slides = useMemo<Slide[]>(() => shuffle(p.checks).map((c, i) => ({ step: i, stepTitle: `${p.title} · ${i + 1}/${p.checks.length}`, first: true, kind: 'check', check: c }) as Slide), [p]);
  return (
    <Player
      slides={slides}
      title={`Kartografia · ${p.title}`}
      color={C.teal}
      onClose={onClose}
      onStep={(n) => onLearned(key(p.id), n)}
      onXp={onXp}
      onDone={() => {
        onLearned(key(p.id), p.checks.length);
        onXp(30);
        onDone();
      }}
    />
  );
}

const s = StyleSheet.create({
  page: { paddingHorizontal: 16, paddingBottom: 40, gap: 14 },
  kicker: { fontFamily: F.monoBold, fontSize: 12, letterSpacing: 1.4, color: C.orange },
  lead: { fontFamily: F.body, fontSize: 17, lineHeight: 23, color: C.ink2 },
  meta: { fontFamily: F.mono, fontSize: 12, lineHeight: 16, color: C.ink2 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, borderBottomWidth: 1.5, borderBottomColor: C.rule },
  no: { width: 34, fontFamily: F.monoBold, fontSize: 22 },
  name: { fontFamily: F.head, fontSize: 19, lineHeight: 23, color: C.ink },
  bigBtn: { fontFamily: F.headX, fontSize: 28, lineHeight: 32, color: '#fff' },
  small: { fontFamily: F.body, fontSize: 15, lineHeight: 20, color: C.ink2 },
  section: { marginTop: 4, fontFamily: F.monoBold, fontSize: 12, letterSpacing: 1.5, color: C.ink2, textTransform: 'uppercase' },
  chip: { paddingHorizontal: 10, paddingVertical: 7, borderWidth: 1.5, borderColor: C.ink, borderRadius: 6, backgroundColor: C.sheet },
  chipText: { fontFamily: F.bodyBold, fontSize: 14, color: C.ink },
  foot: { fontFamily: F.body, fontSize: 13, lineHeight: 18, color: C.ink2 },
});
