import React, { useMemo, useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Bar, C, Confetti, F, GButton, haptic, Header, Icon, ND, Stars } from '../components/ui';
import { buildTopicSet, SUBJECTS, TOPICS } from '../data';
import { LESSONS } from '../data/learn';
import { STEPS } from '../data/steps';
import Player from '../learn/Player';
import { EXTRAS } from '../learn/registry';
import { buildSlides } from '../learn/slides';
import { play } from '../sound';
import { Progress } from '../storage';
import { Question, SubjectId } from '../types';
import { shuffle } from '../util';
import { GameConfig } from './Game';

type View_ = { kind: 'list' } | { kind: 'lesson'; id: string; start: number } | { kind: 'done'; id: string } | { kind: 'tahak'; id: string } | { kind: 'boss'; id: string };

export const SUBJ_COLOR: Record<SubjectId, string> = { fyz: C.blue, mat: C.orange };

/** Učebňa: zoznam tém → lekcia po obrazovkách → boss kvíz / ťahák. */
export default function Learn({
  progress,
  subject,
  initialTopic,
  onBack,
  onPlay,
  onLearned,
  onXp,
}: {
  progress: Progress;
  subject: SubjectId;
  initialTopic?: string;
  onBack: () => void;
  onPlay: (c: GameConfig) => void;
  onLearned: (key: string, step: number) => void;
  onXp: (xp: number) => void;
}) {
  const topics = TOPICS[subject];
  const color = SUBJ_COLOR[subject];
  const startOf = (id: string) => {
    const k = `${subject}:${id}`;
    const n = STEPS[k]?.length ?? 0;
    const l = progress.learned[k] ?? 0;
    if (l <= 0 || l >= n) return 0;
    return buildSlides(k, STEPS[k]).findIndex((s) => s.step === l - 1);
  };
  const [v, setV] = useState<View_>(() => (initialTopic ? { kind: 'lesson', id: initialTopic, start: startOf(initialTopic) } : { kind: 'list' }));

  if (v.kind === 'lesson') {
    const k = `${subject}:${v.id}`;
    const t = topics.find((x) => x.id === v.id)!;
    const slides = buildSlides(k, STEPS[k] ?? []);
    return (
      <Player
        key={k}
        slides={slides}
        title={t.name}
        color={color}
        start={Math.max(0, v.start)}
        onClose={() => setV({ kind: 'list' })}
        onStep={(n) => onLearned(k, n)}
        onXp={onXp}
        onDone={() => {
          onLearned(k, STEPS[k].length);
          onXp(30);
          setV({ kind: 'done', id: v.id });
        }}
      />
    );
  }

  if (v.kind === 'done' || v.kind === 'tahak' || v.kind === 'boss') {
    const idx = topics.findIndex((x) => x.id === v.id);
    const t = topics[idx];
    const nextT = topics[idx + 1];
    return (
      <View style={{ flex: 1 }}>
        <Header kicker={t.name} title={v.kind === 'done' ? 'Lekcia hotová' : v.kind === 'tahak' ? 'Ťahák' : 'Boss témy'} onBack={() => setV({ kind: 'list' })} />
        <ScrollView contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: 40 }}>
          {v.kind === 'done' && (
            <>
              <Confetti />
              <Text style={s.lead}>Prešiel si celú lekciu (+30 XP). Teraz si to over na bossovi témy: má 5 životov, ty máš 3.</Text>
              <GButton icon="target" title="Boss témy" subtitle="Každá správna odpoveď mu uberie život" color={C.bad} onPress={() => setV({ kind: 'boss', id: v.id })} />
              <GButton icon="info" light color={C.sheet} title="Ťahák" subtitle="Všetky vzorce a pasce na jednom mieste" onPress={() => setV({ kind: 'tahak', id: v.id })} />
              {nextT && <GButton icon="next" color={color} title={`Ďalej: ${nextT.name}`} onPress={() => setV({ kind: 'lesson', id: nextT.id, start: 0 })} />}
            </>
          )}
          {v.kind === 'tahak' && LESSONS[`${subject}:${v.id}`] && <CheatSheet k={`${subject}:${v.id}`} color={color} />}
          {v.kind === 'boss' && (
            <BossQuiz
              subject={subject}
              topic={v.id}
              color={color}
              onXp={onXp}
              onCampaign={() => onPlay({ mode: 'campaign', subject, topic: v.id, title: `${idx + 1}. ${t.name}` })}
              onRelearn={() => setV({ kind: 'lesson', id: v.id, start: 0 })}
            />
          )}
        </ScrollView>
      </View>
    );
  }

  // ───── zoznam tém ─────
  const totalSteps = topics.reduce((a, t) => a + (STEPS[`${subject}:${t.id}`]?.length ?? 0), 0);
  const doneSteps = topics.reduce((a, t) => a + Math.min(progress.learned[`${subject}:${t.id}`] ?? 0, STEPS[`${subject}:${t.id}`]?.length ?? 0), 0);
  return (
    <View style={{ flex: 1 }}>
      <Header kicker={SUBJECTS[subject].name} title="Učebňa" onBack={onBack} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40, gap: 4 }}>
        <View style={{ gap: 8, marginBottom: 10 }}>
          <Text style={s.lead}>Každá téma je krátka prezentácia: jedna myšlienka na obrazovku, pokusy na dotyk a otázky s okamžitou odozvou.</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View style={{ flex: 1 }}>
              <Bar value={totalSteps ? doneSteps / totalSteps : 0} color={color} />
            </View>
            <Text style={s.meta}>
              {doneSteps}/{totalSteps}
            </Text>
          </View>
        </View>
        {topics.map((t, i) => {
          const k = `${subject}:${t.id}`;
          const n = STEPS[k]?.length ?? 0;
          const done = Math.min(progress.learned[k] ?? 0, n);
          const nW = Object.values(EXTRAS[k] ?? {}).flat().length;
          const finished = done >= n && n > 0;
          return (
            <View key={t.id} style={s.row}>
              <Pressable
                onPress={() => {
                  haptic('tap');
                  setV({ kind: 'lesson', id: t.id, start: startOf(t.id) });
                }}
                style={({ pressed }) => [{ flex: 1, flexDirection: 'row', gap: 14, paddingVertical: 14, opacity: pressed ? 0.6 : 1 }]}
              >
                <Text style={[s.num, { color: finished ? C.good : color }]}>{String(i + 1).padStart(2, '0')}</Text>
                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={s.name}>{t.name}</Text>
                  <Text style={s.meta}>
                    {t.src} · {n} krokov{nW ? ` · ${nW} ${nW === 1 ? 'pokus' : 'pokusy'}` : ''}
                    {done > 0 && !finished ? ` · si na ${done}.` : ''}
                  </Text>
                  <View style={{ flexDirection: 'row', gap: 2, marginTop: 2 }}>
                    {Array.from({ length: n }, (_, j) => (
                      <View key={j} style={{ flex: 1, height: 4, backgroundColor: j < done ? (finished ? C.good : color) : C.rule }} />
                    ))}
                  </View>
                </View>
              </Pressable>
              <Pressable onPress={() => setV({ kind: 'tahak', id: t.id })} hitSlop={8} style={s.side} accessibilityLabel="Ťahák">
                <Text style={s.sideText}>ťahák</Text>
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

function CheatSheet({ k, color }: { k: string; color: string }) {
  const L = LESSONS[k];
  return (
    <View style={{ gap: 18 }}>
      <Text style={s.lead}>{L.intro}</Text>
      <View style={{ gap: 8 }}>
        <Text style={[s.label, { color }]}>Hlavné myšlienky</Text>
        {L.points.map((p, i) => (
          <Text key={i} style={s.item}>
            <Text style={{ fontFamily: F.monoBold, color }}>{i + 1}. </Text>
            {p}
          </Text>
        ))}
      </View>
      <View style={{ gap: 8 }}>
        <Text style={[s.label, { color }]}>Vzorce</Text>
        {L.formulas.map(([f, d], i) => (
          <View key={i} style={s.cheat}>
            <Text style={{ fontFamily: F.monoBold, fontSize: 17, color: C.ink }}>{f}</Text>
            {d ? <Text style={{ fontFamily: F.body, fontSize: 14, color: C.ink2, marginTop: 2 }}>{d}</Text> : null}
          </View>
        ))}
      </View>
      <View style={{ gap: 8 }}>
        <Text style={[s.label, { color: C.bad }]}>Pozor na</Text>
        {L.tips.map((p, i) => (
          <Text key={i} style={s.item}>
            <Text style={{ fontFamily: F.monoBold, color: C.bad }}>! </Text>
            {p}
          </Text>
        ))}
      </View>
      {L.example && (
        <View style={s.cheat}>
          <Text style={[s.label, { color: C.good }]}>Príklad</Text>
          <Text style={s.item}>{L.example.q}</Text>
          <Text style={[s.item, { fontFamily: F.bodyBold }]}>{L.example.a}</Text>
        </View>
      )}
    </View>
  );
}

/** Boss témy: boss má 5 životov, ty 3; otázok je max. 7. */
function BossQuiz({ subject, topic, color, onXp, onCampaign, onRelearn }: { subject: SubjectId; topic: string; color: string; onXp: (x: number) => void; onCampaign: () => void; onRelearn: () => void }) {
  const [seed, setSeed] = useState(0);
  const qs = useMemo<Question[]>(() => buildTopicSet(subject, topic, 7), [subject, topic, seed]);
  const opts = useMemo(() => qs.map((q) => shuffle(q.options.map((t, i) => ({ t, ok: i === 0 })))), [qs]);
  const [i, setI] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [hp, setHp] = useState(5);
  const [lives, setLives] = useState(3);
  const hit = useRef(new Animated.Value(0)).current;
  const total = qs.length;
  const over = i >= total || lives <= 0 || hp <= 0;
  if (!total) return null;
  if (over) {
    const won = hp <= 0;
    return (
      <View style={{ gap: 12 }}>
        {won && <Confetti />}
        <Text style={s.big}>{won ? 'Boss porazený' : 'Boss vyhral'}</Text>
        <Stars n={lives} size={26} />
        <Text style={s.lead}>{won ? 'Túto tému máš. Skús ju v kampani o tri hviezdy.' : 'Prejdi si lekciu ešte raz, hlavne riešené príklady, a skús znova.'}</Text>
        <GButton icon="retry" light color={C.sheet} title="Znova" onPress={() => { setSeed(seed + 1); setI(0); setHp(5); setLives(3); setChosen(null); }} />
        {won ? <GButton icon="trophy" color={color} title="Do kampane" onPress={onCampaign} /> : <GButton icon="prev" color={color} title="Späť na lekciu" onPress={onRelearn} />}
      </View>
    );
  }
  const q = qs[i];
  const o = opts[i];
  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Animated.View style={{ transform: [{ translateX: hit.interpolate({ inputRange: [-1, 1], outputRange: [-8, 8] }) }] }}>
          <BossFace hp={hp} />
        </Animated.View>
        <View style={{ flex: 1, gap: 6 }}>
          <Text style={[s.label, { color: C.bad }]}>Boss · {hp}/5</Text>
          <View style={{ flexDirection: 'row', gap: 3 }}>
            {[0, 1, 2, 3, 4].map((k) => (
              <View key={k} style={{ flex: 1, height: 12, borderWidth: 1.5, borderColor: C.ink, backgroundColor: k < hp ? C.bad : C.sheet }} />
            ))}
          </View>
          <Text style={s.meta}>tvoje životy: {'■'.repeat(lives)}{'□'.repeat(3 - lives)}</Text>
        </View>
      </View>
      <Text style={s.q}>{q.q}</Text>
      {o.map((op, j) => {
        const fb = chosen !== null;
        const bc = fb && op.ok ? C.good : fb && chosen === j ? C.bad : C.ink;
        return (
          <Pressable
            key={j}
            disabled={fb}
            onPress={() => {
              setChosen(j);
              if (op.ok) {
                haptic('ok');
                setHp(hp - 1);
                onXp(5);
                hit.setValue(0);
                Animated.sequence([1, -1, 0.5, 0].map((x) => Animated.timing(hit, { toValue: x, duration: 70, useNativeDriver: ND }))).start();
              } else {
                haptic('bad');
                setLives(lives - 1);
              }
            }}
            style={[s.opt, { borderColor: bc, backgroundColor: fb && op.ok ? '#DDF1E4' : fb && chosen === j ? '#FBE3DF' : C.sheet }]}
          >
            <Text style={{ fontFamily: F.body, fontSize: 18, lineHeight: 25, color: C.ink, flex: 1 }}>{op.t}</Text>
            {fb && op.ok ? <Icon name="check" size={18} color={C.good} /> : fb && chosen === j ? <Icon name="cross" size={16} color={C.bad} /> : null}
          </Pressable>
        );
      })}
      {chosen !== null && (
        <View style={{ gap: 10 }}>
          <Text style={s.item}>{q.explain}</Text>
          <GButton
            title={i === total - 1 || hp <= 0 || lives <= 0 ? 'Výsledok' : 'Ďalšia otázka'}
            color={color}
            onPress={() => {
              play('pop');
              setI(i + 1);
              setChosen(null);
            }}
          />
        </View>
      )}
    </View>
  );
}

/** Jednoduchý kreslený boss (nie emoji): krabica s očami, pri zásahoch praská. */
function BossFace({ hp }: { hp: number }) {
  return (
    <View style={{ width: 58, height: 58, borderWidth: 2.5, borderColor: C.ink, borderRadius: 6, backgroundColor: hp > 2 ? C.bad : C.yellow, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <View style={{ width: 10, height: hp > 0 ? 10 : 3, backgroundColor: C.ink, borderRadius: 2 }} />
        <View style={{ width: 10, height: hp > 0 ? 10 : 3, backgroundColor: C.ink, borderRadius: 2 }} />
      </View>
      <View style={{ width: 26, height: 4, backgroundColor: C.ink, marginTop: 8, transform: [{ rotate: hp > 2 ? '0deg' : '-12deg' }] }} />
    </View>
  );
}

const s = StyleSheet.create({
  lead: { fontFamily: F.body, fontSize: 17, lineHeight: 24, color: C.ink2 },
  meta: { fontFamily: F.mono, fontSize: 12, color: C.ink2 },
  row: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1.5, borderBottomColor: C.rule },
  num: { fontFamily: F.monoBold, fontSize: 22, width: 34, paddingTop: 1 },
  name: { fontFamily: F.head, fontSize: 20, color: C.ink, lineHeight: 24 },
  side: { paddingHorizontal: 10, paddingVertical: 8, borderWidth: 1.5, borderColor: C.ink, borderRadius: 4, marginLeft: 8 },
  sideText: { fontFamily: F.mono, fontSize: 12, color: C.ink },
  label: { fontFamily: F.monoBold, fontSize: 12, letterSpacing: 1.4, textTransform: 'uppercase' },
  item: { fontFamily: F.body, fontSize: 17, lineHeight: 24, color: C.ink },
  cheat: { borderLeftWidth: 4, borderLeftColor: C.ink, paddingLeft: 12, paddingVertical: 4, gap: 4 },
  big: { fontFamily: F.headX, fontSize: 32, color: C.ink },
  q: { fontFamily: F.bodyMed, fontSize: 21, lineHeight: 29, color: C.ink },
  opt: { flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 56, padding: 12, borderWidth: 2, borderRadius: 6 },
});
