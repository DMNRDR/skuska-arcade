import { BricolageGrotesque_700Bold, BricolageGrotesque_800ExtraBold } from '@expo-google-fonts/bricolage-grotesque';
import { JetBrainsMono_500Medium, JetBrainsMono_700Bold } from '@expo-google-fonts/jetbrains-mono';
import { SourceSans3_400Regular, SourceSans3_600SemiBold, SourceSans3_700Bold } from '@expo-google-fonts/source-sans-3';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Background, C, ScreenFade } from './src/components/ui';
import Board from './src/games/Board';
import Casino from './src/games/Casino';
import Drone from './src/games/Drone';
import { GameId, GameReport } from './src/games/types';
import Campaign from './src/screens/Campaign';
import Game, { GameConfig, GameResult } from './src/screens/Game';
import Home from './src/screens/Home';
import Learn from './src/screens/Learn';
import Results from './src/screens/Results';
import { initSound } from './src/sound';
import { EMPTY, loadProgress, Progress, saveProgress } from './src/storage';
import { SubjectId } from './src/types';

type Screen =
  | { name: 'home' }
  | { name: 'campaign' }
  | { name: 'learn'; topic?: string }
  | { name: 'game'; config: GameConfig; key: number }
  | { name: 'results'; result: GameResult }
  | { name: 'play'; game: GameId; key: number };

const GAMES = { dron: Drone, kasino: Casino, hra: Board };

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    BricolageGrotesque_700Bold,
    BricolageGrotesque_800ExtraBold,
    SourceSans3_400Regular,
    SourceSans3_600SemiBold,
    SourceSans3_700Bold,
    JetBrainsMono_500Medium,
    JetBrainsMono_700Bold,
  });
  const [progress, setProgress] = useState<Progress | null>(null);
  const [subject, setSubject] = useState<SubjectId>('mat');
  const [screen, setScreen] = useState<Screen>({ name: 'home' });

  useEffect(() => {
    loadProgress().then(setProgress);
    initSound();
  }, []);

  const screenKey = screen.name + ('key' in screen ? screen.key : '');

  const update = useCallback((fn: (p: Progress) => Progress) => {
    setProgress((prev) => {
      const next = fn(prev ?? EMPTY);
      saveProgress(next);
      return next;
    });
  }, []);

  const play = (config: GameConfig) => setScreen({ name: 'game', config, key: Date.now() });
  const home = () => setScreen({ name: 'home' });

  const mergeMissed = (prev: string[], missed: { id: string }[], fixed: string[] = []) => {
    const missedNow = missed.filter((q) => !q.id.startsWith('gen-')).map((q) => q.id);
    const f = new Set(fixed);
    return [...new Set([...prev.filter((id) => !f.has(id)), ...missedNow])].slice(-150);
  };

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
      next.missed = mergeMissed(p.missed, result.missed, result.fixed);
      return next;
    });
    setScreen({ name: 'results', result });
  };

  const report = (r: GameReport) => {
    update((p) => {
      const k = `${r.game}:${subject}`;
      return {
        ...p,
        xp: p.xp + r.xp,
        answered: p.answered + r.total,
        correct: p.correct + r.correct,
        gameBest: { ...p.gameBest, [k]: Math.max(p.gameBest[k] ?? 0, r.score) },
        missed: mergeMissed(p.missed, r.missed),
      };
    });
  };

  const ready = progress && (fontsLoaded || fontError);
  let body: React.ReactNode = null;
  if (!ready) body = <ActivityIndicator color={C.ink} style={{ marginTop: 80 }} />;
  else if (screen.name === 'home')
    body = (
      <Home
        progress={progress}
        subject={subject}
        setSubject={setSubject}
        onCampaign={() => setScreen({ name: 'campaign' })}
        onLearn={(topic) => setScreen({ name: 'learn', topic })}
        onPlay={play}
        onGame={(game) => setScreen({ name: 'play', game, key: Date.now() })}
      />
    );
  else if (screen.name === 'campaign') body = <Campaign progress={progress} subject={subject} onBack={home} onPlay={play} />;
  else if (screen.name === 'learn')
    body = (
      <Learn
        progress={progress}
        subject={subject}
        initialTopic={screen.topic}
        onBack={home}
        onPlay={play}
        onLearned={(k, n) => {
          if ((progress.learned[k] ?? 0) < n) update((p) => ({ ...p, learned: { ...p.learned, [k]: Math.max(p.learned[k] ?? 0, n) } }));
        }}
        onXp={(xp) => update((p) => ({ ...p, xp: p.xp + xp }))}
      />
    );
  else if (screen.name === 'game') body = <Game key={screen.key} config={screen.config} progress={progress} onFinish={finish} onQuit={home} />;
  else if (screen.name === 'play') {
    const G = GAMES[screen.game];
    body = <G key={screen.key} subject={subject} progress={progress} onReport={report} onExit={home} />;
  } else
    body = (
      <Results
        result={screen.result}
        progress={progress}
        onAgain={() => play(screen.result.config)}
        onHome={() => setScreen(screen.result.config.mode === 'campaign' ? { name: 'campaign' } : { name: 'home' })}
      />
    );

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Background>
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
          <ScreenFade key={screenKey} style={{ flex: 1, width: '100%', maxWidth: 680, alignSelf: 'center' }}>
            {body}
          </ScreenFade>
        </SafeAreaView>
      </Background>
    </SafeAreaProvider>
  );
}
