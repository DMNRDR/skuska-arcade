import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { C, Card, GButton, haptic, Stars, styles as ui } from '../components/ui';
import { SUBJECTS, TOPICS } from '../data';
import { LESSONS } from '../data/learn';
import { Progress } from '../storage';
import { SubjectId } from '../types';
import { GameConfig } from './Game';

/** Učebňa: lobby s vysvetleniami všetkých tém. */
export default function Learn({
  progress,
  subject,
  onBack,
  onPlay,
}: {
  progress: Progress;
  subject: SubjectId;
  onBack: () => void;
  onPlay: (c: GameConfig) => void;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const subj = SUBJECTS[subject];
  const topics = TOPICS[subject];
  const idx = topics.findIndex((t) => t.id === open);
  const topic = idx >= 0 ? topics[idx] : null;
  const lesson = topic ? LESSONS[`${subject}:${topic.id}`] : null;

  const back = () => (open ? setOpen(null) : onBack());

  return (
    <View style={{ flex: 1 }}>
      <View style={s.head}>
        <Pressable onPress={back} hitSlop={12} style={s.back}>
          <Text style={{ color: C.text, fontSize: 18, fontWeight: '800' }}>←</Text>
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={ui.h2} numberOfLines={1}>
            {topic ? `${topic.icon} ${topic.name}` : `Učebňa · ${subj.name}`}
          </Text>
          <Text style={ui.p}>{topic ? topic.src : 'Vyber si tému, prečítaj ťahák a choď to skúsiť.'}</Text>
        </View>
      </View>

      {!topic || !lesson ? (
        <ScrollView contentContainerStyle={{ padding: 18, paddingTop: 8, gap: 10, paddingBottom: 40 }}>
          {topics.map((t, i) => (
            <Pressable
              key={t.id}
              onPress={() => {
                haptic('tap');
                setOpen(t.id);
              }}
              style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.98 : 1 }] })}
            >
              <Card style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <LinearGradient colors={[subj.color, subj.color2]} style={s.icon}>
                  <Text style={{ fontSize: 22 }}>{t.icon}</Text>
                </LinearGradient>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: C.text, fontWeight: '800', fontSize: 16 }}>
                    {i + 1}. {t.name}
                  </Text>
                  <Text style={{ color: C.dim, fontSize: 13 }} numberOfLines={2}>
                    {LESSONS[`${subject}:${t.id}`]?.intro}
                  </Text>
                </View>
                <Stars n={progress.stars[`${subject}:${t.id}`] ?? 0} size={12} />
              </Card>
            </Pressable>
          ))}
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 18, paddingTop: 8, gap: 14, paddingBottom: 40 }}>
          <Card style={{ borderColor: subj.color + '66' }}>
            <Text style={{ color: C.text, fontSize: 16, lineHeight: 23 }}>{lesson.intro}</Text>
          </Card>

          <Section title="💡 Hlavné myšlienky" color={subj.color}>
            {lesson.points.map((p, i) => (
              <View key={i} style={{ flexDirection: 'row', gap: 10 }}>
                <Text style={{ color: subj.color, fontWeight: '900' }}>•</Text>
                <Text style={s.body}>{p}</Text>
              </View>
            ))}
          </Section>

          <Section title="📐 Vzorce" color={subj.color}>
            {lesson.formulas.map(([f, d], i) => (
              <View key={i} style={s.formula}>
                <Text style={s.formulaText}>{f}</Text>
                {d ? <Text style={{ color: C.dim, fontSize: 12, marginTop: 2 }}>{d}</Text> : null}
              </View>
            ))}
          </Section>

          {lesson.example && (
            <Section title="✍️ Riešený príklad" color={subj.color}>
              <Text style={[s.body, { fontWeight: '700' }]}>{lesson.example.q}</Text>
              <Text style={[s.body, { color: C.good }]}>{lesson.example.a}</Text>
            </Section>
          )}

          <Section title="⚠️ Pozor na" color={C.gold}>
            {lesson.tips.map((p, i) => (
              <View key={i} style={{ flexDirection: 'row', gap: 10 }}>
                <Text style={{ color: C.gold, fontWeight: '900' }}>!</Text>
                <Text style={s.body}>{p}</Text>
              </View>
            ))}
          </Section>

          <GButton
            icon="🎯"
            title="Precvič túto tému"
            subtitle="8 otázok, ráta sa do hviezdičiek v kampani"
            colors={[subj.color, subj.color2]}
            onPress={() => onPlay({ mode: 'campaign', subject, topic: topic.id, title: `${idx + 1}. ${topic.name}` })}
          />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <GButton small title="← Predošlá" disabled={idx === 0} onPress={() => setOpen(topics[idx - 1].id)} colors={['#334155', '#475569']} style={{ flex: 1 }} />
            <GButton small title="Ďalšia →" disabled={idx === topics.length - 1} onPress={() => setOpen(topics[idx + 1].id)} colors={['#334155', '#475569']} style={{ flex: 1 }} />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

function Section({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <Card style={{ gap: 10 }}>
      <Text style={{ color, fontWeight: '900', fontSize: 16 }}>{title}</Text>
      {children}
    </Card>
  );
}

const s = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 18, paddingBottom: 6 },
  back: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' },
  icon: { width: 46, height: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  body: { color: C.text, fontSize: 15, lineHeight: 22, flex: 1 },
  formula: { backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: 12, padding: 10, borderLeftWidth: 3, borderLeftColor: 'rgba(255,255,255,0.25)' },
  formulaText: { color: C.text, fontSize: 16, fontWeight: '700' },
});
