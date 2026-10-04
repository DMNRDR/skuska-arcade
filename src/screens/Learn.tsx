import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Figure } from '../components/figures';
import { Bar, C, Card, GButton, haptic, ND, Stars, styles as ui } from '../components/ui';
import { buildTopicSet, SUBJECTS, TOPICS } from '../data';
import { LESSONS } from '../data/learn';
import { Check, Formula, Step, STEPS, Worked } from '../data/steps';
import { play } from '../sound';
import { Progress } from '../storage';
import { Question, SubjectId } from '../types';
import { shuffle } from '../util';
import { GameConfig } from './Game';

type Tab = 'lekcia' | 'tahak' | 'kviz';

/** Učebňa: lobby so všetkými témami, každá má lekciu krok po kroku, ťahák a kvíz. */
export default function Learn({
  progress,
  subject,
  onBack,
  onPlay,
  onLearned,
}: {
  progress: Progress;
  subject: SubjectId;
  onBack: () => void;
  onPlay: (c: GameConfig) => void;
  onLearned: (key: string, step: number) => void;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>('lekcia');
  const [step, setStepRaw] = useState(0);
  const [dir, setDir] = useState(0);
  const goStep = (to: number) => {
    setDir(to > step ? 1 : -1);
    setStepRaw(to);
    play('pop');
  };
  const setStep = (to: number) => {
    setDir(0);
    setStepRaw(to);
  };
  const scroll = useRef<ScrollView>(null);
  const subj = SUBJECTS[subject];
  const topics = TOPICS[subject];
  const idx = topics.findIndex((t) => t.id === open);
  const topic = idx >= 0 ? topics[idx] : null;
  const key = topic ? `${subject}:${topic.id}` : '';
  const steps = topic ? STEPS[key] ?? [] : [];

  const openTopic = (id: string) => {
    haptic('tap');
    setOpen(id);
    setTab('lekcia');
    setStep(0);
  };

  useEffect(() => {
    scroll.current?.scrollTo({ y: 0, animated: false });
    if (topic && tab === 'lekcia') onLearned(key, step + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, tab, open]);

  const back = () => (open ? setOpen(null) : onBack());
  const totalSteps = topics.reduce((a, t) => a + (STEPS[`${subject}:${t.id}`]?.length ?? 0), 0);
  const doneSteps = topics.reduce((a, t) => a + Math.min(progress.learned[`${subject}:${t.id}`] ?? 0, STEPS[`${subject}:${t.id}`]?.length ?? 0), 0);

  return (
    <View style={{ flex: 1 }}>
      <View style={s.head}>
        <Pressable onPress={back} hitSlop={12} style={s.back}>
          <Text style={{ color: C.text, fontSize: 18, fontWeight: '800' }}>←</Text>
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={ui.h2} numberOfLines={1}>
            {topic ? `${topic.icon} ${topic.name}` : `📖 Učebňa · ${subj.name}`}
          </Text>
          <Text style={ui.p} numberOfLines={1}>
            {topic ? topic.src : `Prečítané ${doneSteps} z ${totalSteps} krokov`}
          </Text>
        </View>
      </View>

      {!topic ? (
        <ScrollView contentContainerStyle={{ padding: 18, paddingTop: 8, gap: 10, paddingBottom: 40 }}>
          <Card style={{ gap: 6, borderColor: subj.color + '55' }}>
            <Text style={{ color: C.text, fontWeight: '800', fontSize: 15 }}>Ako sa učiť</Text>
            <Text style={ui.p}>
              1. Prejdi lekciu krok po kroku a pohraj sa s obrázkami.{'\n'}2. Pri príklade skús najprv sám, potom odkrývaj postup.{'\n'}3. Na konci sprav kvíz. 4. Ťahák si pozri pred skúškou.
            </Text>
            <Bar value={totalSteps ? doneSteps / totalSteps : 0} color={subj.color} height={8} />
          </Card>
          {topics.map((t, i) => {
            const k = `${subject}:${t.id}`;
            const n = STEPS[k]?.length ?? 0;
            const done = Math.min(progress.learned[k] ?? 0, n);
            return (
              <Pressable key={t.id} onPress={() => openTopic(t.id)} style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.98 : 1 }] })}>
                <Card style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <LinearGradient colors={done >= n && n ? ['#f59e0b', '#d97706'] : [subj.color, subj.color2]} style={s.icon}>
                    <Text style={{ fontSize: 22 }}>{done >= n && n ? '✓' : t.icon}</Text>
                  </LinearGradient>
                  <View style={{ flex: 1, gap: 4 }}>
                    <Text style={{ color: C.text, fontWeight: '800', fontSize: 16 }}>
                      {i + 1}. {t.name}
                    </Text>
                    <Text style={{ color: C.dim, fontSize: 13 }} numberOfLines={2}>
                      {LESSONS[k]?.intro}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <View style={{ flex: 1 }}>
                        <Bar value={n ? done / n : 0} color={subj.color} height={5} />
                      </View>
                      <Text style={{ color: C.dim, fontSize: 11 }}>
                        {done}/{n}
                      </Text>
                      <Stars n={progress.stars[k] ?? 0} size={11} />
                    </View>
                  </View>
                </Card>
              </Pressable>
            );
          })}
        </ScrollView>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={s.tabs}>
            {(
              [
                ['lekcia', '📘 Lekcia'],
                ['tahak', '📋 Ťahák'],
                ['kviz', '🎯 Kvíz'],
              ] as [Tab, string][]
            ).map(([v, l]) => (
              <Pressable key={v} onPress={() => setTab(v)} style={[s.tab, tab === v && { backgroundColor: subj.color + '33', borderColor: subj.color }]}>
                <Text style={{ color: tab === v ? '#fff' : C.dim, fontWeight: '800', fontSize: 13 }}>{l}</Text>
              </Pressable>
            ))}
          </View>

          <ScrollView ref={scroll} contentContainerStyle={{ padding: 18, paddingTop: 10, gap: 14, paddingBottom: 60 }}>
            {tab === 'lekcia' && steps.length > 0 && (
              <>
                <View style={{ flexDirection: 'row', gap: 4 }}>
                  {steps.map((_, i) => (
                    <Pressable key={i} onPress={() => goStep(i)} hitSlop={8} style={{ flex: 1, height: 6, borderRadius: 3, backgroundColor: i <= step ? subj.color : 'rgba(255,255,255,0.12)' }} />
                  ))}
                </View>
                <StepView key={key + step} step={steps[step]} n={step + 1} total={steps.length} color={subj.color} dir={dir} />
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <GButton small title="← Späť" disabled={step === 0} onPress={() => goStep(Math.max(0, step - 1))} colors={['#334155', '#475569']} style={{ flex: 1 }} />
                  {step < steps.length - 1 ? (
                    <GButton small title="Ďalej →" onPress={() => goStep(step + 1)} colors={[subj.color, subj.color2]} style={{ flex: 1.4 }} />
                  ) : (
                    <GButton small title="Hotovo, na kvíz 🎯" onPress={() => setTab('kviz')} colors={['#f59e0b', '#d97706']} style={{ flex: 1.4 }} />
                  )}
                </View>
              </>
            )}

            {tab === 'tahak' && LESSONS[key] && <CheatSheet k={key} color={subj.color} />}

            {tab === 'kviz' && (
              <MiniQuiz
                key={key}
                subject={subject}
                topic={topic.id}
                color={subj.color}
                color2={subj.color2}
                onCampaign={() => onPlay({ mode: 'campaign', subject, topic: topic.id, title: `${idx + 1}. ${topic.name}` })}
                onRelearn={() => {
                  setTab('lekcia');
                  setStep(0);
                }}
              />
            )}

            <View style={{ flexDirection: 'row', gap: 10, marginTop: 4 }}>
              <GButton small title="‹ Predošlá téma" disabled={idx === 0} onPress={() => openTopic(topics[idx - 1].id)} colors={['#1e293b', '#334155']} style={{ flex: 1 }} />
              <GButton small title="Ďalšia téma ›" disabled={idx === topics.length - 1} onPress={() => openTopic(topics[idx + 1].id)} colors={['#1e293b', '#334155']} style={{ flex: 1 }} />
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

function FadeIn({ children, dx = 0 }: { children: React.ReactNode; dx?: number }) {
  const a = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(a, { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: ND }).start();
  }, [a]);
  return (
    <Animated.View
      style={{
        opacity: a,
        transform: [{ translateY: a.interpolate({ inputRange: [0, 1], outputRange: [dx ? 0 : 16, 0] }) }, { translateX: a.interpolate({ inputRange: [0, 1], outputRange: [dx * 60, 0] }) }],
        gap: 14,
      }}
    >
      {children}
    </Animated.View>
  );
}

function Paragraphs({ text, style }: { text: string; style?: object }) {
  return (
    <View style={{ gap: 10 }}>
      {text.split(/\n\s*\n/).map((p, i) => (
        <Text key={i} style={[s.body, style]}>
          {p.trim()}
        </Text>
      ))}
    </View>
  );
}

/** „Prečo to tak je?“ – rozbaľovacie hlbšie vysvetlenie */
function Deeper({ text, color }: { text: string; color: string }) {
  const [open, setOpen] = useState(false);
  const rot = useRef(new Animated.Value(0)).current;
  const toggle = () => {
    haptic('tap');
    Animated.timing(rot, { toValue: open ? 0 : 1, duration: 220, useNativeDriver: ND }).start();
    setOpen(!open);
  };
  return (
    <View style={[s.deeper, { borderColor: color + '55' }]}>
      <Pressable onPress={toggle} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Text style={{ fontSize: 18 }}>🤔</Text>
        <Text style={{ color, fontWeight: '900', fontSize: 15, flex: 1 }}>Prečo to tak je? (podrobnejšie)</Text>
        <Animated.Text style={{ color, fontSize: 16, fontWeight: '900', transform: [{ rotate: rot.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] }) }] }}>⌄</Animated.Text>
      </Pressable>
      {open && (
        <FadeIn>
          <Paragraphs text={text} style={{ fontSize: 15, lineHeight: 23, color: '#dbeafe' }} />
        </FadeIn>
      )}
    </View>
  );
}

/** Kontrolná otázka priamo v kroku lekcie */
function InlineCheck({ c, color }: { c: Check; color: string }) {
  const opts = useMemo(() => shuffle(c.options.map((t, i) => ({ t, ok: i === 0 }))), [c]);
  const [chosen, setChosen] = useState<number | null>(null);
  return (
    <View style={[s.check, { borderColor: color + '66' }]}>
      <Text style={{ color, fontWeight: '900', fontSize: 14 }}>🧠 Over si to</Text>
      <Text style={{ color: C.text, fontWeight: '700', fontSize: 16, lineHeight: 23 }}>{c.q}</Text>
      {opts.map((o, j) => {
        const fb = chosen !== null;
        const border = fb && o.ok ? C.good : fb && chosen === j ? C.bad : 'rgba(255,255,255,0.14)';
        const bg = fb && o.ok ? 'rgba(52,211,153,0.2)' : fb && chosen === j ? 'rgba(251,113,133,0.2)' : 'rgba(255,255,255,0.05)';
        return (
          <Pressable
            key={j}
            disabled={fb}
            onPress={() => {
              setChosen(j);
              haptic(o.ok ? 'ok' : 'bad');
            }}
            style={({ pressed }) => [s.qopt, { borderColor: border, backgroundColor: bg, transform: [{ scale: pressed ? 0.97 : 1 }] }]}
          >
            <Text style={{ color: C.text, fontSize: 15 }}>
              {fb && o.ok ? '✓ ' : fb && chosen === j ? '✕ ' : ''}
              {o.t}
            </Text>
          </Pressable>
        );
      })}
      {chosen !== null && (
        <FadeIn>
          <Text style={{ color: opts[chosen].ok ? C.good : C.bad, fontWeight: '900' }}>{opts[chosen].ok ? 'Správne! 🎉' : 'Nie celkom.'}</Text>
          <Text style={{ color: C.text, fontSize: 15, lineHeight: 22 }}>{c.explain}</Text>
          {!opts[chosen].ok && (
            <Pressable onPress={() => setChosen(null)}>
              <Text style={{ color, fontWeight: '800' }}>↺ Skús znova</Text>
            </Pressable>
          )}
        </FadeIn>
      )}
    </View>
  );
}

function StepView({ step, n, total, color, dir }: { step: Step; n: number; total: number; color: string; dir: number }) {
  return (
    <FadeIn dx={dir}>
      <View style={{ gap: 4 }}>
        <Text style={{ color, fontWeight: '800', fontSize: 12, letterSpacing: 1 }}>
          KROK {n} Z {total}
        </Text>
        <Text style={{ color: C.text, fontWeight: '900', fontSize: 22 }}>{step.title}</Text>
      </View>
      <Paragraphs text={step.text} />
      {step.analogy && (
        <View style={s.analogy}>
          <Text style={{ fontSize: 20 }}>💡</Text>
          <Text style={[s.body, { fontSize: 14, color: '#fde68a' }]}>{step.analogy}</Text>
        </View>
      )}
      {step.bullets && step.bullets.length > 0 && (
        <View style={{ gap: 8 }}>
          {step.bullets.map((b, i) => (
            <View key={i} style={{ flexDirection: 'row', gap: 10 }}>
              <View style={[s.bullet, { backgroundColor: color }]} />
              <Text style={[s.body, { fontSize: 15, flex: 1 }]}>{b}</Text>
            </View>
          ))}
        </View>
      )}
      {step.fig && <Figure fig={step.fig} />}
      {step.formula && <FormulaCard f={step.formula} color={color} />}
      {step.deeper && <Deeper text={step.deeper} color={color} />}
      {step.worked && <WorkedCard w={step.worked} color={color} />}
      {step.check && <InlineCheck c={step.check} color={color} />}
    </FadeIn>
  );
}

function FormulaCard({ f, color }: { f: Formula; color: string }) {
  return (
    <View style={[s.formula, { borderColor: color + '88' }]}>
      <Text style={{ color: C.dim, fontSize: 12, fontWeight: '700' }}>📐 {f.what}</Text>
      {f.f.split(/\s{3,}/).map((line, i) => (
        <Text key={i} style={s.formulaText}>
          {line}
        </Text>
      ))}
      {f.vars && f.vars.length > 0 && (
        <View style={{ gap: 6, marginTop: 4 }}>
          <Text style={{ color: C.dim, fontSize: 12, fontWeight: '700' }}>Čo je čo:</Text>
          {f.vars.map(([sym, mean], i) => (
            <View key={i} style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start' }}>
              <View style={[s.sym, { backgroundColor: color + '26', borderColor: color + '66' }]}>
                <Text style={{ color: '#fff', fontWeight: '900', fontSize: 14 }}>{sym}</Text>
              </View>
              <Text style={{ color: C.text, fontSize: 14, lineHeight: 20, flex: 1, paddingTop: 4 }}>{mean}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

/** Riešený príklad: postup sa odkrýva krok po kroku, aby si mohol najprv skúsiť sám. */
function WorkedCard({ w, color }: { w: Worked; color: string }) {
  const [shown, setShown] = useState(0);
  const all = shown >= w.steps.length;
  return (
    <View style={[s.worked, { borderColor: C.good + '66' }]}>
      <Text style={{ color: C.good, fontWeight: '900', fontSize: 14 }}>✍️ Riešený príklad</Text>
      <Text style={{ color: C.text, fontWeight: '700', fontSize: 15, lineHeight: 22 }}>{w.q}</Text>
      {w.steps.slice(0, shown).map((st, i) => (
        <FadeIn key={i}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <View style={[s.num, { backgroundColor: color }]}>
              <Text style={{ color: '#fff', fontWeight: '900', fontSize: 12 }}>{i + 1}</Text>
            </View>
            <Text style={{ color: C.text, fontSize: 15, lineHeight: 22, flex: 1 }}>{st}</Text>
          </View>
        </FadeIn>
      ))}
      {all ? (
        <FadeIn>
          <View style={s.result}>
            <Text style={{ color: C.good, fontWeight: '900', fontSize: 15, lineHeight: 22 }}>✓ {w.result}</Text>
          </View>
        </FadeIn>
      ) : (
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <GButton small title={shown === 0 ? 'Skús sám, potom ukáž 1. krok' : 'Ďalší krok'} onPress={() => setShown(shown + 1)} colors={['#065f46', '#047857']} style={{ flex: 1 }} />
          <GButton small title="Celé" onPress={() => setShown(w.steps.length)} colors={['#334155', '#475569']} />
        </View>
      )}
    </View>
  );
}

function CheatSheet({ k, color }: { k: string; color: string }) {
  const L = LESSONS[k];
  return (
    <View style={{ gap: 14 }}>
      <Card style={{ borderColor: color + '66' }}>
        <Text style={s.body}>{L.intro}</Text>
      </Card>
      <Card style={{ gap: 10 }}>
        <Text style={{ color, fontWeight: '900', fontSize: 16 }}>💡 Hlavné myšlienky</Text>
        {L.points.map((p, i) => (
          <View key={i} style={{ flexDirection: 'row', gap: 10 }}>
            <Text style={{ color, fontWeight: '900' }}>•</Text>
            <Text style={[s.body, { fontSize: 15, flex: 1 }]}>{p}</Text>
          </View>
        ))}
      </Card>
      <Card style={{ gap: 10 }}>
        <Text style={{ color, fontWeight: '900', fontSize: 16 }}>📐 Všetky vzorce</Text>
        {L.formulas.map(([f, d], i) => (
          <View key={i} style={s.cheat}>
            <Text style={{ color: C.text, fontSize: 16, fontWeight: '700' }}>{f}</Text>
            {d ? <Text style={{ color: C.dim, fontSize: 12, marginTop: 2 }}>{d}</Text> : null}
          </View>
        ))}
      </Card>
      <Card style={{ gap: 10 }}>
        <Text style={{ color: C.gold, fontWeight: '900', fontSize: 16 }}>⚠️ Pozor na</Text>
        {L.tips.map((p, i) => (
          <View key={i} style={{ flexDirection: 'row', gap: 10 }}>
            <Text style={{ color: C.gold, fontWeight: '900' }}>!</Text>
            <Text style={[s.body, { fontSize: 15, flex: 1 }]}>{p}</Text>
          </View>
        ))}
      </Card>
    </View>
  );
}

/** Krátky kvíz na konci lekcie: 5 otázok priamo v Učebni. */
function MiniQuiz({ subject, topic, color, color2, onCampaign, onRelearn }: { subject: SubjectId; topic: string; color: string; color2: string; onCampaign: () => void; onRelearn: () => void }) {
  const [seed, setSeed] = useState(0);
  const qs = useMemo<Question[]>(() => buildTopicSet(subject, topic, 5), [subject, topic, seed]);
  const opts = useMemo(() => qs.map((q) => shuffle(q.options.map((t, i) => ({ t, ok: i === 0 })))), [qs]);
  const [i, setI] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const done = i >= qs.length;
  if (!qs.length) return null;
  if (done) {
    const great = score >= qs.length - 1;
    return (
      <Card style={{ alignItems: 'center', gap: 10 }}>
        <Text style={{ fontSize: 54 }}>{great ? '🏆' : score >= 3 ? '👍' : '📚'}</Text>
        <Text style={ui.h2}>
          {score} / {qs.length} správne
        </Text>
        <Text style={[ui.p, { textAlign: 'center' }]}>{great ? 'Výborne, túto tému máš! Teraz ju skús v kampani o hviezdičky.' : 'Ešte raz si prejdi lekciu a skús to znova.'}</Text>
        <View style={{ flexDirection: 'row', gap: 10, alignSelf: 'stretch' }}>
          <GButton small title="🔁 Znova" onPress={() => { setSeed(seed + 1); setI(0); setScore(0); setChosen(null); }} colors={['#334155', '#475569']} style={{ flex: 1 }} />
          {great ? (
            <GButton small title="🗺️ Do kampane" onPress={onCampaign} colors={[color, color2]} style={{ flex: 1.3 }} />
          ) : (
            <GButton small title="📘 Lekcia" onPress={onRelearn} colors={[color, color2]} style={{ flex: 1.3 }} />
          )}
        </View>
      </Card>
    );
  }
  const q = qs[i];
  const o = opts[i];
  return (
    <View style={{ gap: 10 }}>
      <Text style={{ color, fontWeight: '800', fontSize: 12, letterSpacing: 1 }}>
        OTÁZKA {i + 1} Z {qs.length} · skóre {score}
      </Text>
      <Card style={{ borderColor: color + '55' }}>
        <Text style={{ color: C.text, fontSize: 18, fontWeight: '700', lineHeight: 26 }}>{q.q}</Text>
      </Card>
      {o.map((op, j) => {
        const fb = chosen !== null;
        const border = fb && op.ok ? C.good : fb && chosen === j ? C.bad : 'rgba(255,255,255,0.14)';
        const bg = fb && op.ok ? 'rgba(52,211,153,0.2)' : fb && chosen === j ? 'rgba(251,113,133,0.2)' : 'rgba(255,255,255,0.05)';
        return (
          <Pressable
            key={j}
            disabled={fb}
            onPress={() => {
              setChosen(j);
              if (op.ok) setScore(score + 1);
              haptic(op.ok ? 'ok' : 'bad');
            }}
            style={[s.qopt, { borderColor: border, backgroundColor: bg }]}
          >
            <Text style={{ color: C.text, fontSize: 15, flex: 1 }}>
              {fb && op.ok ? '✓ ' : fb && chosen === j ? '✕ ' : ''}
              {op.t}
            </Text>
          </Pressable>
        );
      })}
      {chosen !== null && (
        <FadeIn>
          <Card style={{ gap: 6, borderColor: o[chosen].ok ? C.good : C.bad }}>
            <Text style={{ color: o[chosen].ok ? C.good : C.bad, fontWeight: '900', fontSize: 16 }}>{o[chosen].ok ? 'Správne!' : 'Nie celkom'}</Text>
            <Text style={{ color: C.text, fontSize: 15, lineHeight: 21 }}>{q.explain}</Text>
            <GButton small title={i === qs.length - 1 ? 'Výsledok' : 'Ďalšia otázka →'} onPress={() => { setI(i + 1); setChosen(null); }} colors={[color, color2]} />
          </Card>
        </FadeIn>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 18, paddingBottom: 6 },
  back: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' },
  icon: { width: 46, height: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  tabs: { flexDirection: 'row', gap: 8, paddingHorizontal: 18, paddingTop: 6 },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 9, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', backgroundColor: 'rgba(255,255,255,0.04)' },
  body: { color: C.text, fontSize: 16, lineHeight: 24 },
  analogy: { flexDirection: 'row', gap: 10, backgroundColor: 'rgba(251,191,36,0.1)', borderRadius: 14, padding: 12, borderWidth: 1, borderColor: 'rgba(251,191,36,0.3)' },
  formula: { backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 16, padding: 14, borderWidth: 1.5, gap: 6 },
  formulaText: { color: '#fff', fontSize: 19, fontWeight: '800', lineHeight: 28 },
  sym: { minWidth: 44, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, borderWidth: 1, alignItems: 'center' },
  worked: { backgroundColor: 'rgba(52,211,153,0.06)', borderRadius: 16, padding: 14, borderWidth: 1.5, gap: 10 },
  num: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 1 },
  result: { backgroundColor: 'rgba(52,211,153,0.15)', borderRadius: 12, padding: 10 },
  cheat: { backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: 12, padding: 10, borderLeftWidth: 3, borderLeftColor: 'rgba(255,255,255,0.25)' },
  deeper: { backgroundColor: 'rgba(56,189,248,0.07)', borderRadius: 16, padding: 14, borderWidth: 1.5, gap: 10 },
  check: { backgroundColor: 'rgba(167,139,250,0.08)', borderRadius: 16, padding: 14, borderWidth: 1.5, gap: 10 },
  bullet: { width: 8, height: 8, borderRadius: 4, marginTop: 9 },
  qopt: { minHeight: 52, padding: 12, borderRadius: 14, borderWidth: 1.5, justifyContent: 'center' },
});
