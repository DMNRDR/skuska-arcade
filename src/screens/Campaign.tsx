import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { C, haptic, Stars, styles as ui } from '../components/ui';
import { SUBJECTS, TOPICS } from '../data';
import { Progress } from '../storage';
import { SubjectId } from '../types';
import { GameConfig } from './Game';

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
  const topics = TOPICS[subject];

  return (
    <View style={{ flex: 1 }}>
      <View style={s.head}>
        <Pressable onPress={onBack} hitSlop={12} style={s.back}>
          <Text style={{ color: C.text, fontSize: 18, fontWeight: '800' }}>←</Text>
        </Pressable>
        <View>
          <Text style={ui.h2}>Kampaň · {subj.name}</Text>
          <Text style={ui.p}>8 otázok, 3 životy. Prejdi level a odomkni ďalší.</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 40, paddingTop: 8 }}>
        {topics.map((t, i) => {
          const stars = progress.stars[`${subject}:${t.id}`] ?? 0;
          const prevStars = i === 0 ? 1 : progress.stars[`${subject}:${topics[i - 1].id}`] ?? 0;
          const locked = prevStars === 0;
          const left = i % 2 === 0;
          return (
            <View key={t.id} style={{ alignItems: left ? 'flex-start' : 'flex-end' }}>
              {i > 0 && <View style={[s.path, { alignSelf: 'center', backgroundColor: locked ? 'rgba(255,255,255,0.1)' : subj.color + '88' }]} />}
              <Pressable
                disabled={locked}
                onPress={() => {
                  haptic('tap');
                  onPlay({ mode: 'campaign', subject, topic: t.id, title: `${i + 1}. ${t.name}` });
                }}
                style={({ pressed }) => [{ width: '78%', transform: [{ scale: pressed ? 0.97 : 1 }] }]}
              >
                <LinearGradient
                  colors={locked ? ['#1e2238', '#1a1d30'] : stars === 3 ? ['#f59e0b', '#d97706'] : [subj.color, subj.color2]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[s.node, locked && { opacity: 0.6 }]}
                >
                  <View style={s.num}>
                    <Text style={{ fontSize: 26 }}>{locked ? '🔒' : t.icon}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={s.nodeTitle}>
                      {i + 1}. {t.name}
                    </Text>
                    <Text style={s.nodeSub}>{t.src}</Text>
                    <Stars n={stars} size={16} />
                  </View>
                </LinearGradient>
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 18, paddingBottom: 6 },
  back: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' },
  path: { width: 4, height: 22, borderRadius: 2 },
  node: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 20 },
  num: { width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(0,0,0,0.22)', alignItems: 'center', justifyContent: 'center' },
  nodeTitle: { color: '#fff', fontWeight: '900', fontSize: 16 },
  nodeSub: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginBottom: 2 },
});
