import React, { useEffect, useRef } from 'react';
import { Animated, Easing, ScrollView, Text, View } from 'react-native';
import { C, Card, Confetti, F, GButton, Icon, IconName, ND, Stars, styles as ui } from '../components/ui';
import { play } from '../sound';
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
  const celebrate = (config.mode === 'campaign' && (result.stars ?? 0) >= 2) || (config.mode === 'boss' && !!result.won) || (config.mode === 'arcade' && result.newBest);
  useEffect(() => {
    const t = setTimeout(() => play(celebrate ? 'win' : lv.level > prevLevel ? 'levelup' : 'pop'), 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    Animated.timing(zoom, { toValue: 1, duration: 600, easing: Easing.out(Easing.back(2)), useNativeDriver: ND }).start();
  }, [zoom]);

  let icon: IconName = 'check';
  let title = 'Hotovo';
  if (config.mode === 'campaign') {
    const st = result.stars ?? 0;
    icon = st === 3 ? 'trophy' : st > 0 ? 'check' : 'cross';
    title = st === 3 ? 'Perfektné!' : st > 0 ? 'Level splnený' : 'Došli životy';
  } else if (config.mode === 'boss') {
    icon = result.won ? 'trophy' : 'cross';
    title = result.won ? `${subj.boss} porazený!` : `${subj.boss} vyhral`;
  } else if (config.mode === 'arcade') {
    icon = result.newBest ? 'medal' : 'target';
    title = result.newBest ? 'Nový rekord!' : 'Čas vypršal';
  } else {
    icon = 'retry';
    title = 'Tréning hotový';
  }

  return (
    <View style={{ flex: 1 }}>
    {celebrate && <Confetti />}
    <ScrollView contentContainerStyle={{ padding: 18, gap: 14, paddingBottom: 40 }}>
      <Animated.View style={{ alignItems: 'flex-start', gap: 8, marginTop: 16, transform: [{ scale: zoom }], opacity: zoom }}>
        <Icon name={icon} size={56} color={subj.color} />
        <Text style={ui.h1}>{title}</Text>
        {config.mode === 'campaign' && <Stars n={result.stars ?? 0} size={36} />}
      </Animated.View>

      <Card style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Big label="skóre" value={result.score.toLocaleString('sk-SK')} color={subj.color} />
        <Big label="správne" value={`${result.correct}/${result.total}`} />
        <Big label="úspešnosť" value={`${acc} %`} />
        <Big label="séria" value={`${result.maxStreak}`} />
      </Card>

      <Card style={{ alignItems: 'center', gap: 4 }}>
        <Text style={{ color: C.gold, fontFamily: F.headX, fontSize: 22 }}>+{result.xp} XP</Text>
        {lv.level > prevLevel ? (
          <Text style={{ color: C.good, fontFamily: F.head }}>
            LEVEL UP! Teraz si level {lv.level}: {lv.rank}
          </Text>
        ) : (
          <Text style={ui.p}>
            Level {lv.level} · {lv.rank}
          </Text>
        )}
      </Card>

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <GButton title="Znova" icon="retry" onPress={onAgain} color={subj.color} style={{ flex: 1 }} />
        <GButton title="Menu" icon="home" light color={C.sheet} onPress={onHome} style={{ flex: 1 }} />
      </View>

      {result.missed.length > 0 && (
        <View style={{ gap: 10 }}>
          <Text style={[ui.h2, { marginTop: 6 }]}>Na zopakovanie ({result.missed.length})</Text>
          <Text style={ui.p}>Tieto otázky sa ti uložili do Tréningu chýb.</Text>
          {result.missed.map((q, i) => (
            <Card key={q.id + i} style={{ gap: 6 }}>
              <Text style={{ color: C.ink, fontFamily: F.bodyBold, fontSize: 15 }}>{q.q}</Text>
              <Text style={{ color: C.good, fontFamily: F.head }}>✓ {q.options[0]}</Text>
              <Text style={{ color: C.dim, fontSize: 14, lineHeight: 20 }}>{q.explain}</Text>
              <Text style={{ color: C.dim, fontSize: 13 }}>zdroj: {q.src}</Text>
            </Card>
          ))}
        </View>
      )}
    </ScrollView>
    </View>
  );
}

function Big({ label, value, color = C.text }: { label: string; value: string; color?: string }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ color, fontFamily: F.headX, fontSize: 20 }}>{value}</Text>
      <Text style={{ color: C.dim, fontSize: 12 }}>{label}</Text>
    </View>
  );
}
