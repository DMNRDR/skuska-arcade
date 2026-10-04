import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Background, C } from './src/components/ui';
import { SUBJECTS } from './src/data';
import Campaign from './src/screens/Campaign';
import Game, { GameConfig, GameResult } from './src/screens/Game';
import Home from './src/screens/Home';
import Results from './src/screens/Results';
import { EMPTY, loadProgress, Progress, saveProgress } from './src/storage';
import { SubjectId } from './src/types';

type Screen =
  | { name: 'home' }
  | { name: 'campaign' }
  | { name: 'game'; config: GameConfig; key: number }
  | { name: 'results'; result: GameResult };

export default function App() {
  const [progress, setProgress] = useState<Progress | null>(null);
  const [subject, setSubject] = useState<SubjectId>('fyz');
  const [screen, setScreen] = useState<Screen>({ name: 'home' });

  useEffect(() => {
    loadProgress().then(setProgress);
  }, []);

  const update = useCallback((fn: (p: Progress) => Progress) => {
    setProgress((prev) => {
      const next = fn(prev ?? EMPTY);
      saveProgress(next);
      return next;
    });
  }, []);

  const play = (config: GameConfig) => setScreen({ name: 'game', config, key: Date.now() });

  const finish = (result: GameResult) => {
    update((p) => {
      const { config } = result;
      const next: Progress = {
        ...p,
        xp: p.xp + result.xp,
        answered: p.answered + result.total,
        correct: p.correct + result.correct,
        bestStreak: Math.max(p.bestStreak, result.maxStreak),
        stars: { ...p.stars },
        arcadeBest: { ...p.arcadeBest },
        bossWins: { ...p.bossWins },
      };
      if (config.mode === 'campaign' && config.topic) {
        const k = `${config.subject}:${config.topic}`;
        next.stars[k] = Math.max(next.stars[k] ?? 0, result.stars ?? 0);
      }
      if (config.mode === 'arcade') next.arcadeBest[config.subject] = Math.max(p.arcadeBest[config.subject] ?? 0, result.score);
      if (config.mode === 'boss' && result.won) next.bossWins[config.subject] = (p.bossWins[config.subject] ?? 0) + 1;
      // zoznam chýb: pridaj nové chyby, odober správne zodpovedané pri tréningu
      const missedNow = result.missed.filter((q) => !q.id.startsWith('gen-')).map((q) => q.id);
      const fixed = new Set(result.fixed);
      next.missed = [...new Set([...p.missed.filter((id) => !fixed.has(id)), ...missedNow])].slice(-150);
      return next;
    });
    setScreen({ name: 'results', result });
  };

  const tint = SUBJECTS[subject].color;

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Background tint={tint}>
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
          <View style={{ flex: 1, width: '100%', maxWidth: 620, alignSelf: 'center' }}>
            {!progress ? (
              <ActivityIndicator color={C.text} style={{ marginTop: 80 }} />
            ) : screen.name === 'home' ? (
              <Home
                progress={progress}
                subject={subject}
                setSubject={setSubject}
                onCampaign={() => setScreen({ name: 'campaign' })}
                onPlay={play}
              />
            ) : screen.name === 'campaign' ? (
              <Campaign progress={progress} subject={subject} onBack={() => setScreen({ name: 'home' })} onPlay={play} />
            ) : screen.name === 'game' ? (
              <Game key={screen.key} config={screen.config} progress={progress} onFinish={finish} onQuit={() => setScreen({ name: 'home' })} />
            ) : (
              <Results
                result={screen.result}
                progress={progress}
                onAgain={() => play(screen.result.config)}
                onHome={() => setScreen(screen.result.config.mode === 'campaign' ? { name: 'campaign' } : { name: 'home' })}
              />
            )}
          </View>
        </SafeAreaView>
      </Background>
    </SafeAreaProvider>
  );
}
