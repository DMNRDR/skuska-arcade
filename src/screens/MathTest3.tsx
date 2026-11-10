import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Bar, C, Confetti, F, GButton, haptic, Header, Icon, Press } from '../components/ui';
import { DF_COMBO, DF_LECTURE, DF_RULES } from '../data/df-mat';
import { DF_L1, DF_L2, DF_L3, DF_L4 } from '../data/df-levels';
import { DF_KINDS, DF_LABEL, DfKind, dfMake } from '../data/exam-gen';
import type { Check, Step } from '../data/steps';
import Player from '../learn/Player';
import { buildSlides, Slide } from '../learn/slides';
import { Progress } from '../storage';
import { shuffle } from '../util';
import { QuizTest } from './Exam';

// 3. písomka z Matematiky 1: iba definičný obor. Pravidlá → kombinácie → precvičovanie → test.

const PRAX = 12;
const TEST = 12;

// skupiny typov pre vyhodnotenie testu
const GROUPS: { id: string; no: string; title: string; kinds: DfKind[] }[] = [
  { id: 'zakl', no: '01', title: 'Zlomok a odmocnina', kinds: ['rac', 'sqrt', 'sqrtden', 'kruh', 'vonk'] },
  { id: 'log', no: '02', title: 'Logaritmus', kinds: ['log', 'ln', 'lnk', 'logb'] },
  { id: 'gon', no: '03', title: 'tg, cotg, arcsin, arccos', kinds: ['tg', 'cotg', 'asin'] },
  { id: 'zn', no: '04', title: 'Zlomok pod √ a v ln (tabuľka znamienok)', kinds: ['sqfrac', 'lnfrac', 'lnsq'] },
  { id: 'komb', no: '05', title: 'Kombinácie podmienok', kinds: ['mix', 'mix2', 'mix3', 'cbrt', 'atan'] },
];
const groupOf = (k: DfKind) => GROUPS.find((g) => g.kinds.includes(k))!;

/** n príkladov, každý iného typu (kým sa typy neminú) */
function kinds(n: number): DfKind[] {
  const out: DfKind[] = [];
  while (out.length < n) out.push(...shuffle(DF_KINDS));
  return out.slice(0, n);
}
const check = (k: DfKind) => {
  const q = dfMake(k);
  return { q: q.q, options: q.options, explain: q.explain };
};

// Úrovne otázok (ručne zostavené, overené skriptom): L1 ľahké → L3 ťažké, L4 skúšobná písomka na čas.
const LEVELS: { id: string; no: string; title: string; text: string; checks: Check[] }[] = [
  { id: 'l1', no: '04', title: 'Level 1 · ľahké', text: 'Polynóm, zlomok, odmocnina. Jedna podmienka, aj pasce (x² + 1, krátenie zlomku, ∛).', checks: DF_L1 },
  { id: 'l2', no: '05', title: 'Level 2 · stredné', text: 'Logaritmus, dve podmienky naraz, zlomok pod √ a v ln (tabuľka znamienok).', checks: DF_L2 },
  { id: 'l3', no: '06', title: 'Level 3 · ťažké', text: 'arcsin, arccos, log so základom 0,5, log + √ + zlomok naraz, ako na slajdoch 30 a 31.', checks: DF_L3 },
];
const L4_N = 8;
const L4_MIN = 25;
const L4_GROUPS = [
  { id: 'l1', no: 'L1', title: 'Ľahké: zlomok, odmocnina' },
  { id: 'l2', no: 'L2', title: 'Stredné: logaritmus, tabuľka znamienok' },
  { id: 'l3', no: 'L3', title: 'Ťažké: arcsin, arccos, kombinácie' },
  { id: 'l4', no: 'L4', title: 'Písomkové: tri a viac podmienok' },
];
/** skúšobná písomka: 1 ľahký, 2 stredné, 2 ťažké, 3 písomkové, poradie od ľahších */
function l4Build() {
  const take = (arr: Check[], n: number, g: number) => shuffle(arr).slice(0, n).map((c) => ({ ...c, topic: L4_GROUPS[g] }));
  return [...take(DF_L1, 1, 0), ...take(DF_L2, 2, 1), ...take(DF_L3, 2, 2), ...take(DF_L4, 3, 3)];
}
function levelSlides(id: string, checks: Check[]): Slide[] {
  const qs = shuffle(checks);
  return qs.map((c, i) => ({ step: i, stepTitle: `${LEVELS.find((l) => l.id === id)!.title} · ${i + 1}/${qs.length}`, first: true, kind: 'check', check: c }) as Slide);
}

function praxSlides(): Slide[] {
  return kinds(PRAX).map((k, i) => ({ step: i, stepTitle: `Príklad ${i + 1}/${PRAX} · ${DF_LABEL[k]}`, first: true, kind: 'check', check: check(k) }) as Slide);
}

type Part = { id: string; no: string; title: string; text: string; steps?: Step[]; checks?: Check[] };
const PARTS: Part[] = [
  { id: 'rules', no: '01', title: '5 pravidiel', text: 'zlomok, odmocnina, logaritmus, tg/cotg, arcsin/arccos. Každé s obrázkom na osi a mini príkladom.', steps: DF_RULES },
  { id: 'combo', no: '02', title: 'Kombinácie a zápis', text: 'zátvorky ( ) a ⟨ ⟩, zjednotenie ∪, prienik na osi, tabuľka znamienok. Príklady z Pauliných poznámok.', steps: DF_COMBO },
  { id: 'lect', no: '03', title: 'Príklady z prednášky', text: 'Šesť riešených príkladov doc. Minarechovej: nepárna odmocnina, ln(2cos x − √3), log so základom 0,5, arcsin, arctg.', steps: DF_LECTURE },
  ...LEVELS,
  { id: 'prax', no: '07', title: `Precvičovanie (${PRAX} príkladov)`, text: 'Každý príklad iného typu, nové pri každom otvorení. Zlá odpoveď ťa nechá skúsiť znova, potom postup.' },
];
const key = (id: string) => `df:${id}`;
const lenOf = (p: Part) => (p.steps ? p.steps.length : p.checks ? p.checks.length : PRAX);

type View_ = { kind: 'list' } | { kind: 'part'; id: string; seed: number } | { kind: 'done'; id: string } | { kind: 'test'; seed: number } | { kind: 'l4'; seed: number };

export default function MathTest3({
  progress,
  onBack,
  onLearned,
  onXp,
  onScore,
}: {
  progress: Progress;
  onBack: () => void;
  onLearned: (key: string, step: number) => void;
  onXp: (xp: number) => void;
  onScore: (pct: number, key?: string) => void;
}) {
  const [v, setV] = useState<View_>({ kind: 'list' });
  const open = (id: string) => setV({ kind: 'part', id, seed: Date.now() });
  const test = () => setV({ kind: 'test', seed: Date.now() });
  const l4 = () => setV({ kind: 'l4', seed: Date.now() });

  if (v.kind === 'part') {
    const p = PARTS.find((x) => x.id === v.id)!;
    return <PartPlayer key={v.seed} p={p} onClose={() => setV({ kind: 'list' })} onDone={() => setV({ kind: 'done', id: p.id })} onLearned={onLearned} onXp={onXp} />;
  }

  if (v.kind === 'l4')
    return (
      <QuizTest
        key={v.seed}
        title="Level 4 · skúšobná písomka"
        minutes={L4_MIN}
        points={L4_N}
        build={l4Build}
        groups={L4_GROUPS}
        onClose={() => setV({ kind: 'list' })}
        onOpen={(id) => open(id === 'l4' ? 'lect' : id)}
        onAgain={l4}
        onFinish={(ok, total) => {
          onXp(ok * 8);
          onScore(Math.round((100 * ok) / total), key('l4'));
        }}
      />
    );

  if (v.kind === 'test')
    return (
      <QuizTest
        key={v.seed}
        title="Test: definičný obor"
        build={() => kinds(TEST).map((k) => ({ ...check(k), topic: groupOf(k) }))}
        groups={GROUPS}
        onClose={() => setV({ kind: 'list' })}
        onOpen={() => open('prax')}
        onAgain={test}
        onFinish={(ok, total) => {
          onXp(ok * 5);
          onScore(Math.round((100 * ok) / total));
        }}
      />
    );

  if (v.kind === 'done') {
    const idx = PARTS.findIndex((x) => x.id === v.id);
    const nextP = PARTS[idx + 1];
    return (
      <View style={{ flex: 1 }}>
        <Header kicker="3. písomka" title="Hotovo" onBack={() => setV({ kind: 'list' })} />
        <Confetti />
        <ScrollView contentContainerStyle={s.page}>
          <Text style={s.lead}>Časť „{PARTS[idx].title}“ máš za sebou (+30 XP).</Text>
          {nextP ? (
            <GButton icon="next" color={C.orange} title={`Ďalej: ${nextP.title}`} onPress={() => open(nextP.id)} />
          ) : (
            <GButton icon="medal" color={C.orange} title="Test" subtitle={`${TEST} príkladov, jeden pokus, známka`} onPress={test} />
          )}
          {PARTS[idx].id === 'prax' && <GButton icon="retry" light color={C.sheet} title="Ďalších 12 príkladov" onPress={() => open('prax')} />}
          <GButton icon="prev" light color={C.sheet} title="Späť na prehľad" onPress={() => setV({ kind: 'list' })} />
        </ScrollView>
      </View>
    );
  }

  const best = progress.gameBest[key('test')] ?? 0;
  const bestL4 = progress.gameBest[key('l4')] ?? 0;
  const total = PARTS.reduce((a, p) => a + lenOf(p), 0);
  const done = PARTS.reduce((a, p) => a + Math.min(progress.learned[key(p.id)] ?? 0, lenOf(p)), 0);
  return (
    <View style={{ flex: 1 }}>
      <Header kicker="Matematika 1 · 3. písomka" title="Definičný obor" onBack={onBack} />
      <ScrollView contentContainerStyle={s.page}>
        <View style={{ gap: 6 }}>
          <Text style={s.kicker}>PÍSOMKA IBA Z DEFINIČNÉHO OBORU</Text>
          <Text style={s.lead}>Choď zhora nadol. Každá časť je klikačka na pár minút, jedna myšlienka na obrazovku.</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 4 }}>
            <View style={{ flex: 1 }}>
              <Bar value={done / total} color={C.orange} />
            </View>
            <Text style={s.meta}>
              {done}/{total}
            </Text>
          </View>
        </View>
        <View>
          {PARTS.map((p) => {
            const n = lenOf(p);
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
                <Text style={[s.no, { color: fin ? C.good : C.orange }]}>{p.no}</Text>
                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={s.name}>{p.title}</Text>
                  <Text style={s.meta}>{p.text}</Text>
                  <View style={{ flexDirection: 'row', gap: 2, marginTop: 2 }}>
                    {Array.from({ length: n }, (_, j) => (
                      <View key={j} style={{ flex: 1, height: 4, backgroundColor: j < d ? (fin ? C.good : C.orange) : C.rule }} />
                    ))}
                  </View>
                </View>
                <Icon name="next" size={16} color={C.ink2} />
              </Pressable>
            );
          })}
        </View>
        <Press color={C.orange} onPress={l4} inner={{ padding: 18, gap: 6 }}>
          <Text style={[s.kicker, { color: '#fff', opacity: 0.9 }]}>08 · LEVEL 4</Text>
          <Text style={s.bigBtn}>Skúšobná písomka</Text>
          <Text style={[s.small, { color: '#fff' }]}>
            {L4_N} príkladov od ľahkého po ťažký, {L4_MIN} minút, výsledok v bodoch z {L4_N}. Na papieri si pri každom napíš podmienky, až potom klikni.{bestL4 ? ` Rekord: ${bestL4} %.` : ''}
          </Text>
        </Press>
        <Press color={C.ink} onPress={test} inner={{ padding: 18, gap: 6 }}>
          <Text style={[s.kicker, { color: '#fff', opacity: 0.9 }]}>09 · NAVYŠE</Text>
          <Text style={s.bigBtn}>Test ako na písomke</Text>
          <Text style={[s.small, { color: '#fff' }]}>
            {TEST} príkladov rôznych typov, jeden pokus, na konci známka a čo ešte potrénovať.{best ? ` Rekord: ${best} %.` : ''}
          </Text>
        </Press>
        <Text style={s.foot}>Zdroj: poznámky spolužiačky (30. 10.), prednáška doc. Minarechovej Funkcie, základné vlastnosti (4. týždeň, slajdy 30 a 31) a Funkcie, klasifikácia. Generované príklady aj všetky výsledky sú overené výpočtom.</Text>
      </ScrollView>
    </View>
  );
}

function PartPlayer({ p, onClose, onDone, onLearned, onXp }: { p: Part; onClose: () => void; onDone: () => void; onLearned: (k: string, n: number) => void; onXp: (xp: number) => void }) {
  const slides = useMemo(() => (p.steps ? buildSlides(key(p.id), p.steps) : p.checks ? levelSlides(p.id, p.checks) : praxSlides()), [p]);
  return (
    <Player
      slides={slides}
      title={`Definičný obor · ${p.title}`}
      color={C.orange}
      onClose={onClose}
      onStep={(n) => onLearned(key(p.id), n)}
      onXp={onXp}
      onDone={() => {
        onLearned(key(p.id), lenOf(p));
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
  foot: { fontFamily: F.body, fontSize: 13, lineHeight: 18, color: C.ink2 },
});
