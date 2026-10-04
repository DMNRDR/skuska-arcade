import React, { useEffect, useRef } from 'react';
import { Animated, Easing, ScrollView, Text, View } from 'react-native';
import { C, Card, GButton, ND, Stars, styles as ui } from '../components/ui';
import { SUBJECTS } from '../data';
import { levelInfo, Progress } from '../storage';
import { GameResult } from './Game';

export default function Results({
  result,
  progress,
  onAgain,
  onHome,
}: {
  result: GameResult;
  progress: Progress;
  onAgain: () => void;
  onHome: () => void;
}) {
  const { config } = result;
  const subj = SUBJECTS[config.subject];
  const lv = levelInfo(progress.xp);
  const prevLevel = levelInfo(progress.xp - result.xp).level;
  const acc = result.total ? Math.round((result.correct / result.total) * 100) : 0;

  const zoom = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(zoom, { toValue: 1, duration: 600, easing: Easing.out(Easing.back(2)), useNativeDriver: ND }).start();
  }, [zoom]);

  let emoji = '📘';
  let title = 'Hotovo';
  if (config.mode === 'campaign') {
    const st = result.stars ?? 0;
    emoji = st === 3 ? '🏆' : st > 0 ? '✅' : '💀';
    title = st === 3 ? 'Perfektné!' : st > 0 ? 'Level splnený' : 'Došli životy';
  } else if (config.mode === 'boss') {
    emoji = result.won ? '🏆' : '💀';
    title = result.won ? `${subj.boss} porazený!` : `${subj.boss} vyhral`;
  } else if (config.mode === 'arcade') {
    emoji = result.newBest ? '🥇' : '☄️';
    title = result.newBest ? 'Nový rekord!' : 'Čas vypršal';
  } else {
    emoji = '🩹';
    title = 'Tréning hotový';
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 18, gap: 14, paddingBottom: 40 }}>
      <Animated.View style={{ alignItems: 'center', marginTop: 16, transform: [{ scale: zoom }], opacity: zoom }}>
        <Text style={{ fontSize: 72 }}>{emoji}</Text>
        <Text style={[ui.h1, { textAlign: 'center' }]}>{title}</Text>
        {config.mode === 'campaign' && <Stars n={result.stars ?? 0} size={36} />}
      </Animated.View>

      <Card style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Big label="skóre" value={result.score.toLocaleString('sk-SK')} color={subj.color} />
        <Big label="správne" value={`${result.correct}/${result.total}`} />
        <Big label="úspešnosť" value={`${acc} %`} />
        <Big label="séria" value={`🔥${result.maxStreak}`} />
      </Card>

      <Card style={{ alignItems: 'center', gap: 4 }}>
        <Text style={{ color: C.gold, fontWeight: '900', fontSize: 22 }}>+{result.xp} XP</Text>
        {lv.level > prevLevel ? (
          <Text style={{ color: C.good, fontWeight: '800' }}>
            LEVEL UP! Teraz si level {lv.level}: {lv.rank} 🎉
          </Text>
        ) : (
          <Text style={ui.p}>
            Level {lv.level} · {lv.rank}
          </Text>
        )}
      </Card>

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <GButton title="Znova" icon="🔁" onPress={onAgain} colors={[subj.color, subj.color2]} style={{ flex: 1 }} />
        <GButton title="Menu" icon="🏠" onPress={onHome} colors={['#334155', '#475569']} style={{ flex: 1 }} />
      </View>

      {result.missed.length > 0 && (
        <View style={{ gap: 10 }}>
          <Text style={[ui.h2, { marginTop: 6 }]}>Na zopakovanie ({result.missed.length})</Text>
          <Text style={ui.p}>Tieto otázky sa ti uložili do Tréningu chýb.</Text>
          {result.missed.map((q, i) => (
            <Card key={q.id + i} style={{ gap: 6 }}>
              <Text style={{ color: C.text, fontWeight: '700', fontSize: 15 }}>{q.q}</Text>
              <Text style={{ color: C.good, fontWeight: '800' }}>✓ {q.options[0]}</Text>
              <Text style={{ color: C.dim, fontSize: 14, lineHeight: 20 }}>{q.explain}</Text>
              <Text style={{ color: C.dim, fontSize: 12 }}>📚 {q.src}</Text>
            </Card>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

function Big({ label, value, color = C.text }: { label: string; value: string; color?: string }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ color, fontWeight: '900', fontSize: 20 }}>{value}</Text>
      <Text style={{ color: C.dim, fontSize: 12 }}>{label}</Text>
    </View>
  );
}
