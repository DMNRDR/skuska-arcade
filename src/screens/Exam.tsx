import React, { useMemo, useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Bar, C, Confetti, F, GButton, haptic, Header, Icon, ND, Press } from '../components/ui';
import { EXAM_TOPICS, ExamTopic } from '../data/exam-mat';
import { GENERATORS } from '../data/generators';
import type { Check } from '../data/steps';
import Player from '../learn/Player';
import { Slide } from '../learn/slides';
import { play } from '../sound';
import { Progress } from '../storage';
import { shuffle } from '../util';

// Príprava na skúšku z Matematiky 1: zoznam okruhov → okruh ako klikacia prezentácia
// (čo musíš vedieť, ťahák, pasce, riešený príklad, precvičovanie) → skúškový test s výsledkom.

const PRACTICE = 5;
const TEST_PER_TOPIC = 2;
const key = (id: string) => `exam:${id}`;

/** n príkladov z rôznych generátorov okruhu (generované nanovo pri každom otvorení) */
function practice(t: ExamTopic, n: number): Check[] {
  const gens = shuffle(GENERATORS.filter((g) => g.subject === 'mat' && t.gens.includes(g.topic)));
  const out: Check[] = [];
  for (let i = 0; out.length < n && i < n * 4; i++) {
    const q = gens[i % gens.length].make();
    if (q.options.length >= 3 && !out.some((c) => c.q === q.q)) out.push({ q: q.q, options: q.options, explain: q.explain });
  }
  return out;
}

const stepCount = (t: ExamTopic) => 3 + t.sheet.length + PRACTICE;

function examSlides(t: ExamTopic): Slide[] {
  const out: Slide[] = [];
  let step = 0;
  type Body = Omit<Slide, 'step' | 'stepTitle' | 'first'>;
  const push = (title: string, items: Body[]) => {
    items.forEach((it, j) => out.push({ step, stepTitle: title, first: j === 0, ...it } as Slide));
    step++;
  };
  push('Čo musíš vedieť', [{ kind: 'bullets', items: t.know } as Body]);
  t.sheet.forEach((x) => push(`Ťahák: ${x.title}`, [{ kind: 'text', text: x.text } as Body, { kind: 'formula', formula: x.formula } as Body]));
  push('Pozor na tieto pasce', [{ kind: 'bullets', items: t.traps } as Body]);
  push('Typový príklad', [{ kind: 'text', text: t.worked.text } as Body, { kind: 'worked', worked: t.worked.worked } as Body]);
  practice(t, PRACTICE).forEach((c, i) => push(`Precvič ${i + 1}/${PRACTICE}`, [{ kind: 'check', check: c } as Body]));
  return out;
}

type View_ = { kind: 'list' } | { kind: 'topic'; id: string; seed: number } | { kind: 'done'; id: string } | { kind: 'test'; seed: number };

export { practice };

export default function Exam({
  progress,
  onBack,
  onLearn,
  onLearned,
  onXp,
  onScore,
}: {
  progress: Progress;
  onBack: () => void;
  onLearn: (topic: string) => void;
  onLearned: (key: string, step: number) => void;
  onXp: (xp: number) => void;
  onScore: (pct: number) => void;
}) {
  const [v, setV] = useState<View_>({ kind: 'list' });
  const open = (id: string) => setV({ kind: 'topic', id, seed: Date.now() });

  if (v.kind === 'topic') return <TopicPlayer key={v.seed} t={EXAM_TOPICS.find((x) => x.id === v.id)!} onClose={() => setV({ kind: 'list' })} onDone={() => setV({ kind: 'done', id: v.id })} onLearned={onLearned} onXp={onXp} />;

  if (v.kind === 'test')
    return (
      <QuizTest
        key={v.seed}
        onClose={() => setV({ kind: 'list' })}
        onOpen={open}
        onAgain={() => setV({ kind: 'test', seed: Date.now() })}
        build={() => EXAM_TOPICS.flatMap((t) => practice(t, TEST_PER_TOPIC).map((c) => ({ ...c, topic: t })))}
        groups={EXAM_TOPICS}
        onFinish={(ok, total) => {
          onXp(ok * 5);
          onScore(Math.round((100 * ok) / total));
        }}
      />
    );

  if (v.kind === 'done') {
    const idx = EXAM_TOPICS.findIndex((x) => x.id === v.id);
    const t = EXAM_TOPICS[idx];
    const nextT = EXAM_TOPICS[idx + 1];
    return (
      <View style={{ flex: 1 }}>
        <Header kicker={`Okruh ${t.no}`} title="Okruh hotový" onBack={() => setV({ kind: 'list' })} />
        <Confetti />
        <ScrollView contentContainerStyle={s.page}>
          <Text style={s.lead}>Prešiel si {t.title.toLowerCase()} (+30 XP). Príklady sa pri každom otvorení vygenerujú nanovo, takže to môžeš točiť dokola.</Text>
          {nextT ? (
            <GButton icon="next" color={C.orange} title={`Ďalej: ${nextT.no} ${nextT.title}`} onPress={() => open(nextT.id)} />
          ) : (
            <GButton icon="medal" color={C.orange} title="Skúškový test" subtitle="Mix zo všetkých šiestich okruhov" onPress={() => setV({ kind: 'test', seed: Date.now() })} />
          )}
          <GButton icon="retry" light color={C.sheet} title="Znova s novými príkladmi" subtitle={t.title} onPress={() => open(t.id)} />
          {t.lessons.map((l, i) => (
            <GButton key={l} icon="info" light color={C.sheet} title={t.lessons.length > 1 ? `Celý výklad v Učebni (${i + 1}/${t.lessons.length})` : 'Celý výklad v Učebni'} subtitle="Dlhšia lekcia s pokusmi na dotyk" onPress={() => onLearn(l)} />
          ))}
          <GButton icon="prev" light color={C.sheet} title="Späť na zoznam okruhov" onPress={() => setV({ kind: 'list' })} />
        </ScrollView>
      </View>
    );
  }

  // ───── zoznam okruhov ─────
  const best = progress.gameBest[key('test')] ?? 0;
  const total = EXAM_TOPICS.reduce((a, t) => a + stepCount(t), 0);
  const done = EXAM_TOPICS.reduce((a, t) => a + Math.min(progress.learned[key(t.id)] ?? 0, stepCount(t)), 0);
  return (
    <View style={{ flex: 1 }}>
      <Header kicker="Matematika 1" title="Príprava na skúšku" onBack={onBack} />
      <ScrollView contentContainerStyle={s.page}>
        <View style={{ gap: 6 }}>
          <Text style={s.kicker}>UČIVO TÝŽDŇOV 1 AŽ 6</Text>
          <Text style={s.lead}>Šesť okruhov. Každý je krátka klikačka: čo musíš vedieť, ťahák so vzorcami (ťukaš na symboly), pasce, jeden riešený typový príklad a {PRACTICE} príkladov na precvičenie s okamžitou kontrolou.</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 4 }}>
            <View style={{ flex: 1 }}>
              <Bar value={done / total} color={C.orange} />
            </View>
            <Text style={s.meta}>
              {done}/{total} krokov
            </Text>
          </View>
        </View>

        <View>
          {EXAM_TOPICS.map((t) => {
            const n = stepCount(t);
            const d = Math.min(progress.learned[key(t.id)] ?? 0, n);
            const fin = d >= n;
            return (
              <Pressable
                key={t.id}
                onPress={() => {
                  haptic('tap');
                  open(t.id);
                }}
                style={({ pressed }) => [s.row, pressed && { opacity: 0.6 }]}
              >
                <Text style={[s.no, { color: fin ? C.good : C.orange }]}>{t.no}</Text>
                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={s.name}>{t.title}</Text>
                  <Text style={s.meta}>
                    {t.week} · {t.sheet.length} {t.sheet.length >= 5 ? 'vzorcov' : 'vzorce'} · {PRACTICE} príkladov{d > 0 && !fin ? ` · si na ${d}/${n}` : fin ? ' · hotové' : ''}
                  </Text>
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

        <Press color={C.ink} onPress={() => setV({ kind: 'test', seed: Date.now() })} inner={{ padding: 18, gap: 6 }}>
          <Text style={[s.kicker, { color: '#fff', opacity: 0.9 }]}>NA KONIEC · {EXAM_TOPICS.length * TEST_PER_TOPIC} PRÍKLADOV</Text>
          <Text style={s.bigBtn}>Skúškový test</Text>
          <Text style={[s.small, { color: '#fff' }]}>
            Náhodný mix zo všetkých okruhov, jeden pokus na otázku, na konci body a známka podľa stupnice STU.{best ? ` Tvoj rekord: ${best} %.` : ''}
          </Text>
        </Press>

        <Text style={s.foot}>
          Zdroj: prednášky doc. Minarechovej (týždne 1 až 6), hárok K prednáške 10 a tematický plán Matematiky 1 pre GaK. Príklady sa generujú náhodne a všetky typy sú overené výpočtom. Podmienky: min. 15 bodov z cvičení, na absolvovanie aspoň 56 % celkovo.
        </Text>
      </ScrollView>
    </View>
  );
}

function TopicPlayer({ t, onClose, onDone, onLearned, onXp }: { t: ExamTopic; onClose: () => void; onDone: () => void; onLearned: (k: string, n: number) => void; onXp: (xp: number) => void }) {
  const slides = useMemo(() => examSlides(t), [t]);
  return (
    <Player
      slides={slides}
      title={`Skúška · ${t.no} ${t.title}`}
      color={C.orange}
      onClose={onClose}
      onStep={(n) => onLearned(key(t.id), n)}
      onXp={onXp}
      onDone={() => {
        onLearned(key(t.id), stepCount(t));
        onXp(30);
        onDone();
      }}
    />
  );
}

const GRADES: [number, string, string][] = [
  [92, 'A', 'výborne'],
  [83, 'B', 'veľmi dobre'],
  [74, 'C', 'dobre'],
  [65, 'D', 'uspokojivo'],
  [56, 'E', 'dostatočne'],
  [0, 'FX', 'nedostatočne'],
];

type Group = { id: string; no: string; title: string };
type TQ = Check & { topic: Group };

/** Test: jeden pokus na otázku, na konci body, známka a prehľad podľa skupín. */
export function QuizTest({
  title = 'Skúškový test',
  build,
  groups,
  onClose,
  onOpen,
  onAgain,
  onFinish,
}: {
  title?: string;
  build: () => TQ[];
  groups: Group[];
  onClose: () => void;
  onOpen: (id: string) => void;
  onAgain: () => void;
  onFinish: (ok: number, total: number) => void;
}) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const qs = useMemo<TQ[]>(build, []);
  const [i, setI] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [res, setRes] = useState<boolean[]>([]);
  const [end, setEnd] = useState(false);
  const scroll = useRef<ScrollView>(null);
  const shake = useRef(new Animated.Value(0)).current;
  const q = qs[i];
  const opts = useMemo(() => shuffle(q.options.map((t, k) => ({ t, ok: k === 0 }))), [q]);

  if (end) {
    const ok = res.filter(Boolean).length;
    const pct = Math.round((100 * ok) / qs.length);
    const [, g, gt] = GRADES.find(([min]) => pct >= min)!;
    const pass = pct >= 56;
    return (
      <View style={{ flex: 1 }}>
        <Header kicker={title} title="Výsledok" onBack={onClose} />
        {pass && <Confetti />}
        <ScrollView contentContainerStyle={s.page}>
          <View style={[s.score, { borderColor: pass ? C.good : C.bad }]}>
            <Text style={[s.grade, { color: pass ? C.good : C.bad }]}>{g}</Text>
            <View style={{ flex: 1, gap: 2 }}>
              <Text style={s.name}>
                {ok} z {qs.length} správne · {pct} %
              </Text>
              <Text style={s.meta}>{gt}, orientačne podľa stupnice STU (A od 92 %, E od 56 %)</Text>
            </View>
          </View>
          <Text style={s.section}>Podľa okruhov</Text>
          {groups.map((t) => {
            const mine = qs.map((x, k) => (x.topic.id === t.id ? res[k] : null)).filter((x) => x !== null) as boolean[];
            const good = mine.filter(Boolean).length;
            const weak = good < mine.length;
            return (
              <View key={t.id} style={s.row}>
                <Text style={[s.no, { color: weak ? C.bad : C.good }]}>{t.no}</Text>
                <View style={{ flex: 1, gap: 2 }}>
                  <Text style={s.name}>{t.title}</Text>
                  <Text style={s.meta}>
                    {good}/{mine.length} správne
                  </Text>
                </View>
                {weak ? (
                  <Pressable onPress={() => onOpen(t.id)} hitSlop={8} style={s.side}>
                    <Text style={s.sideText}>precvičiť</Text>
                  </Pressable>
                ) : (
                  <Icon name="check" size={20} color={C.good} />
                )}
              </View>
            );
          })}
          <GButton icon="retry" color={C.orange} title="Nový test" subtitle="Iné príklady, rovnaké okruhy" onPress={onAgain} />
          <GButton icon="prev" light color={C.sheet} title="Späť na okruhy" onPress={onClose} />
        </ScrollView>
      </View>
    );
  }

  const answered = chosen !== null;
  const right = answered && opts[chosen].ok;
  const pick = (k: number) => {
    if (answered) return;
    setChosen(k);
    const ok = opts[k].ok;
    setRes([...res, ok]);
    if (ok) haptic('ok');
    else {
      haptic('bad');
      shake.setValue(0);
      Animated.sequence([10, -10, 7, -7, 0].map((x) => Animated.timing(shake, { toValue: x, duration: 45, useNativeDriver: ND }))).start();
    }
    setTimeout(() => scroll.current?.scrollToEnd({ animated: true }), 80);
  };
  const next = () => {
    if (i + 1 >= qs.length) {
      const ok = res.filter(Boolean).length;
      onFinish(ok, qs.length);
      play('levelup');
      setEnd(true);
      return;
    }
    setI(i + 1);
    setChosen(null);
    scroll.current?.scrollTo({ y: 0, animated: false });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 10, gap: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Pressable onPress={onClose} hitSlop={12} style={s.close} accessibilityLabel="Ukončiť test">
            <Icon name="cross" size={16} />
          </Pressable>
          <View style={{ flex: 1 }}>
            <Text style={s.kicker} numberOfLines={1}>
              {title} · otázka {i + 1}/{qs.length}
            </Text>
            <Text style={s.stepTitle} numberOfLines={1}>
              {q.topic.no} {q.topic.title}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 3 }}>
          {qs.map((_, k) => (
            <View key={k} style={{ flex: 1, height: 8, borderWidth: 1.5, borderColor: C.ink, borderRadius: 2, backgroundColor: k < res.length ? (res[k] ? C.good : C.bad) : k === i ? C.orange : C.sheet }} />
          ))}
        </View>
      </View>

      <ScrollView ref={scroll} style={{ flex: 1 }} contentContainerStyle={{ padding: 18, gap: 14, paddingBottom: 30 }}>
        <Text style={s.label}>Vyber jednu odpoveď · jeden pokus</Text>
        <Text style={s.q}>{q.q}</Text>
        <Animated.View style={{ gap: 10, transform: [{ translateX: shake }] }}>
          {opts.map((o, k) => {
            const isC = chosen === k;
            const showGood = answered && o.ok;
            const bg = showGood ? '#DDF1E4' : isC ? '#FBE3DF' : C.sheet;
            const bc = showGood ? C.good : isC ? C.bad : C.ink;
            return (
              <Pressable key={k} disabled={answered} onPress={() => pick(k)} style={({ pressed }) => [s.opt, { backgroundColor: bg, borderColor: bc, transform: [{ translateY: pressed ? 2 : 0 }] }]}>
                <Text style={[s.optLetter, { color: bc === C.ink ? C.orange : bc }]}>{'ABCD'[k]}</Text>
                <Text style={[s.body, { flex: 1 }]}>{o.t}</Text>
              </Pressable>
            );
          })}
        </Animated.View>
        {answered && (
          <View style={[s.result, { borderLeftColor: right ? C.good : C.bad, backgroundColor: right ? '#DDF1E4' : '#FBE3DF' }]}>
            <Text style={[s.label, { color: right ? C.good : C.bad }]}>{right ? 'Správne' : 'Nesprávne, správna je zelená'}</Text>
            <Text style={s.body}>{q.explain}</Text>
          </View>
        )}
      </ScrollView>

      <View style={s.nav}>
        <Press onPress={next} disabled={!answered} color={C.orange} style={{ flex: 1 }} inner={s.navNext} sound={false}>
          <Text style={s.navText}>{i + 1 >= qs.length ? 'Vyhodnotiť test' : 'Ďalšia otázka'}</Text>
          <Icon name="next" size={20} color="#fff" />
        </Press>
      </View>
    </View>
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
  section: { marginTop: 8, fontFamily: F.monoBold, fontSize: 12, letterSpacing: 1.5, color: C.ink2, textTransform: 'uppercase' },
  foot: { fontFamily: F.body, fontSize: 13, lineHeight: 18, color: C.ink2 },
  side: { paddingHorizontal: 10, paddingVertical: 6, borderWidth: 1.5, borderColor: C.ink, borderRadius: 6, backgroundColor: C.sheet },
  sideText: { fontFamily: F.monoBold, fontSize: 12, color: C.ink },
  score: { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16, borderWidth: 2.5, borderRadius: 8, backgroundColor: C.sheet },
  grade: { fontFamily: F.headX, fontSize: 54, lineHeight: 58, minWidth: 64, textAlign: 'center' },
  close: { width: 38, height: 38, borderRadius: 8, borderWidth: 2, borderColor: C.ink, backgroundColor: C.sheet, alignItems: 'center', justifyContent: 'center' },
  stepTitle: { fontFamily: F.bodyBold, fontSize: 15, color: C.ink },
  label: { fontFamily: F.monoBold, fontSize: 12, letterSpacing: 1.4, color: C.orange, textTransform: 'uppercase' },
  q: { fontFamily: F.head, fontSize: 23, lineHeight: 30, color: C.ink },
  body: { fontFamily: F.body, fontSize: 18, lineHeight: 26, color: C.ink },
  opt: { flexDirection: 'row', gap: 12, alignItems: 'center', minHeight: 56, padding: 12, borderWidth: 2, borderRadius: 6 },
  optLetter: { fontFamily: F.monoBold, fontSize: 16, width: 18 },
  result: { borderLeftWidth: 5, padding: 14, gap: 6 },
  nav: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, paddingTop: 10, paddingBottom: 12, borderTopWidth: 1.5, borderTopColor: C.ink, backgroundColor: C.paper },
  navNext: { height: 54, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  navText: { fontFamily: F.head, fontSize: 19, color: '#fff' },
});
