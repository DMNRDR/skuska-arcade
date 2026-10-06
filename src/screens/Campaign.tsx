import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { C, F, haptic, Header, Icon, Stars } from '../components/ui';
import { SUBJECTS, TOPICS } from '../data';
import { Progress } from '../storage';
import { SubjectId } from '../types';
import { GameConfig } from './Game';
import { SUBJ_COLOR } from './Learn';

/** Kampaň: levely ako zastávky na trase (geodetický polygónový ťah). */
export default function Campaign({
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
  const subj = SUBJECTS[subject];
  const color = SUBJ_COLOR[subject];
  const topics = TOPICS[subject];

  return (
    <View style={{ flex: 1 }}>
      <Header kicker={subj.name} title="Kampaň" onBack={onBack} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 40 }}>
        <Text style={s.lead}>8 otázok na level, 3 životy. Aspoň jedna hviezda odomkne ďalší level.</Text>
        {topics.map((t, i) => {
          const stars = progress.stars[`${subject}:${t.id}`] ?? 0;
          const prevStars = i === 0 ? 1 : progress.stars[`${subject}:${topics[i - 1].id}`] ?? 0;
          const locked = prevStars === 0;
          const last = i === topics.length - 1;
          return (
            <View key={t.id} style={{ flexDirection: 'row', gap: 14 }}>
              {/* trasa: bod + spojnica */}
              <View style={{ width: 30, alignItems: 'center' }}>
                <View style={{ width: 3, height: 18, backgroundColor: i === 0 ? 'transparent' : C.ink }} />
                <View style={[s.dot, { backgroundColor: locked ? C.sheet : stars ? color : C.yellow }]}>
                  <Text style={[s.dotText, { color: locked ? C.ink2 : stars ? '#fff' : C.ink }]}>{i + 1}</Text>
                </View>
                {!last && <View style={{ width: 3, flex: 1, backgroundColor: C.ink }} />}
              </View>
              <Pressable
                disabled={locked}
                onPress={() => {
                  haptic('tap');
                  onPlay({ mode: 'campaign', subject, topic: t.id, title: `${i + 1}. ${t.name}` });
                }}
                style={({ pressed }) => [s.card, { opacity: locked ? 0.5 : pressed ? 0.7 : 1 }]}
              >
                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={s.name}>{t.name}</Text>
                  <Text style={s.meta}>{t.src}</Text>
                  <Stars n={stars} size={16} />
                </View>
                <Icon name={locked ? 'locked' : 'next'} size={20} color={C.ink} />
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  lead: { fontFamily: F.body, fontSize: 16, lineHeight: 22, color: C.ink2, marginBottom: 6 },
  dot: { width: 30, height: 30, borderRadius: 15, borderWidth: 2.5, borderColor: C.ink, alignItems: 'center', justifyContent: 'center' },
  dotText: { fontFamily: F.monoBold, fontSize: 13 },
  card: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 8, marginBottom: 8, padding: 14, borderWidth: 2, borderColor: C.ink, borderRadius: 8, backgroundColor: C.sheet },
  name: { fontFamily: F.head, fontSize: 18, color: C.ink },
  meta: { fontFamily: F.mono, fontSize: 12, color: C.ink2 },
});
