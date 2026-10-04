import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { HeroWave } from '../components/diagrams';
import { Bar, C, Card, GButton, ND, styles as ui } from '../components/ui';
import { countGenerators, countQuestions, questionsByIds, SUBJECTS, TOPICS } from '../data';
import { levelInfo, Progress } from '../storage';
import { SubjectId } from '../types';
import { GameConfig } from './Game';

export default function Home({
  progress,
  subject,
  setSubject,
  onCampaign,
  onLearn,
  onPlay,
}: {
  progress: Progress;
  subject: SubjectId;
  setSubject: (s: SubjectId) => void;
  onCampaign: () => void;
  onLearn: () => void;
  onPlay: (c: GameConfig) => void;
}) {
  const subj = SUBJECTS[subject];
  const lv = levelInfo(progress.xp);
  const topics = TOPICS[subject];
  const starsGot = topics.reduce((a, t) => a + (progress.stars[`${subject}:${t.id}`] ?? 0), 0);
  const missed = questionsByIds(progress.missed, subject).length;
  const acc = progress.answered ? Math.round((progress.correct / progress.answered) * 100) : 0;

  const float = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(float, { toValue: 1, duration: 1800, easing: Easing.inOut(Easing.sin), useNativeDriver: ND }),
        Animated.timing(float, { toValue: 0, duration: 1800, easing: Easing.inOut(Easing.sin), useNativeDriver: ND }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [float]);

  return (
    <ScrollView contentContainerStyle={{ padding: 18, gap: 16, paddingBottom: 40 }}>
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <Animated.Text style={{ fontSize: 54, transform: [{ translateY: float.interpolate({ inputRange: [0, 1], outputRange: [0, -8] }) }] }}>
          🎓
        </Animated.Text>
        <Text style={[ui.h1, { textAlign: 'center' }]}>
          SKÚŠKA <Text style={{ color: subj.color }}>ARCADE</Text>
        </Text>
        <Text style={[ui.p, { textAlign: 'center' }]}>Fyzika 1 · Matematika 1 · STU SvF, ZS 2026/27</Text>
        <View style={{ width: '100%', marginTop: 6 }}>
          <HeroWave color={subj.color} />
        </View>
      </View>

      <Card style={{ gap: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <LinearGradient colors={[subj.color, subj.color2]} style={s.lvl}>
            <Text style={{ color: '#fff', fontWeight: '900', fontSize: 18 }}>{lv.level}</Text>
          </LinearGradient>
          <View style={{ flex: 1 }}>
            <Text style={ui.h2}>{lv.rank}</Text>
            <Text style={ui.p}>
              {lv.into} / {lv.need} XP do levelu {lv.level + 1}
            </Text>
          </View>
        </View>
        <Bar value={lv.into / lv.need} color={subj.color} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Stat label="úspešnosť" value={`${acc} %`} />
          <Stat label="odpovedí" value={String(progress.answered)} />
          <Stat label="max. séria" value={`🔥 ${progress.bestStreak}`} />
        </View>
      </Card>

      <View style={s.switch}>
        {(Object.keys(SUBJECTS) as SubjectId[]).map((id) => {
          const active = id === subject;
          const sj = SUBJECTS[id];
          return (
            <Pressable key={id} onPress={() => setSubject(id)} style={{ flex: 1 }}>
              {active ? (
                <LinearGradient colors={[sj.color, sj.color2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={s.pill}>
                  <Text style={s.pillText}>
                    {sj.icon} {sj.name}
                  </Text>
                </LinearGradient>
              ) : (
                <View style={s.pill}>
                  <Text style={[s.pillText, { color: C.dim }]}>
                    {sj.icon} {sj.name}
                  </Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>

      <GButton
        icon="📖"
        title="Učebňa: nauč sa to od nuly"
        subtitle="Lekcie krok po kroku, hýbajúce sa obrázky, rozpísané vzorce a riešené príklady"
        colors={['#0ea5e9', '#14b8a6']}
        onPress={onLearn}
      />
      <GButton
        icon="🗺️"
        title="Kampaň"
        subtitle={`${topics.length} levelov podľa prednášok · ★ ${starsGot} / ${topics.length * 3}`}
        colors={[subj.color, subj.color2]}
        onPress={onCampaign}
      />
      <GButton
        icon="☄️"
        title="Arcade: Meteorový dážď"
        subtitle={`60 s, combo násobič, +3 s za správnu · rekord ${progress.arcadeBest[subject] ?? 0}`}
        colors={['#f97316', '#e11d48']}
        onPress={() => onPlay({ mode: 'arcade', subject, title: `Arcade · ${subj.short}` })}
      />
      <GButton
        icon={subj.bossIcon}
        title={`Boss: ${subj.boss}`}
        subtitle={`Zraz mu 2000 HP odpoveďami · porazený ${progress.bossWins[subject] ?? 0}×`}
        colors={['#7c3aed', '#be185d']}
        onPress={() => onPlay({ mode: 'boss', subject, title: `Boss · ${subj.boss}` })}
      />
      <GButton
        icon="🩹"
        title="Tréning chýb"
        subtitle={missed ? `${missed} otázok, ktoré si pokazil` : 'Zatiaľ žiadne chyby'}
        colors={['#0f766e', '#0e7490']}
        disabled={!missed}
        onPress={() => onPlay({ mode: 'review', subject, title: `Tréning chýb · ${subj.short}` })}
      />

      <Text style={[ui.p, { textAlign: 'center', fontSize: 12 }]}>
        {countQuestions(subject)} otázok + {countGenerators(subject)} generátorov príkladov.{'\n'}
        {subject === 'fyz'
          ? 'Zdroj: prednáška OsnovaSodpovedamiV3 a Zoznam príkladov z cvičení.'
          : 'Zdroj: tematický plán prednášok z Matematiky 1 (prednášky v repe zatiaľ nie sú).'}
      </Text>
    </ScrollView>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Text style={{ color: C.text, fontWeight: '900', fontSize: 18 }}>{value}</Text>
      <Text style={{ color: C.dim, fontSize: 12 }}>{label}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  lvl: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  switch: { flexDirection: 'row', gap: 8, backgroundColor: 'rgba(255,255,255,0.06)', padding: 6, borderRadius: 18 },
  pill: { paddingVertical: 12, borderRadius: 14, alignItems: 'center' },
  pillText: { color: '#fff', fontWeight: '800', fontSize: 15 },
});
