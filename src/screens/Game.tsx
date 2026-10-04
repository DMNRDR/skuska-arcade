import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TopicDiagram } from '../components/diagrams';
import { Bar, C, Card, GButton, haptic, ND, styles as ui } from '../components/ui';
import { buildTopicSet, makeEndlessSource, questionsByIds, SUBJECTS, TOPICS } from '../data';
import { Progress } from '../storage';
import { Mode, Question, SubjectId } from '../types';
import { shuffle } from '../util';

export type GameConfig = {
  mode: Mode;
  subject: SubjectId;
  topic?: string;
  title: string;
};

export type GameResult = {
  config: GameConfig;
  score: number;
  correct: number;
  total: number;
  maxStreak: number;
  stars?: number;
  won?: boolean;
  xp: number;
  missed: Question[];
  fixed: string[];
  newBest: boolean;
};

const RULES: Record<Mode, { lives: number; perQ: number; global: number; fifty: number; boost: number; auto: boolean }> = {
  campaign: { lives: 3, perQ: 45, global: 0, fifty: 1, boost: 0, auto: false },
  arcade: { lives: Infinity, perQ: 0, global: 60, fifty: 2, boost: 2, auto: true },
  boss: { lives: 3, perQ: 30, global: 0, fifty: 2, boost: 1, auto: true },
  review: { lives: Infinity, perQ: 0, global: 0, fifty: 0, boost: 0, auto: false },
};

export const BOSS_HP = 2000;
const CAMPAIGN_LEN = 8;
const LETTERS = ['A', 'B', 'C', 'D'];

type Opt = { text: string; correct: boolean };

type G = {
  q: Question | null;
  opts: Opt[];
  phase: 'ask' | 'feedback';
  chosen: number | null; // -1 = vypršal čas
  wasCorrect: boolean;
  hidden: number[];
  score: number;
  streak: number;
  maxStreak: number;
  correct: number;
  total: number;
  lives: number;
  bossHp: number;
  shield: number;
  qElapsed: number;
  gLeft: number;
  fifty: number;
  boost: number;
  gain: number;
  crit: boolean;
  blocked: boolean;
  missed: Question[];
  fixed: string[];
  idx: number;
};

export const multFor = (streak: number) => (streak >= 10 ? 4 : streak >= 6 ? 3 : streak >= 3 ? 2 : 1);

const toOpts = (q: Question): Opt[] => shuffle(q.options.map((text, i) => ({ text, correct: i === 0 })));

export default function Game({
  config,
  progress,
  onFinish,
  onQuit,
}: {
  config: GameConfig;
  progress: Progress;
  onFinish: (r: GameResult) => void;
  onQuit: () => void;
}) {
  const rules = RULES[config.mode];
  const subj = SUBJECTS[config.subject];

  // zdroj otázok
  const source = useMemo(() => {
    if (config.mode === 'campaign' && config.topic) {
      const list = buildTopicSet(config.subject, config.topic, CAMPAIGN_LEN);
      return { next: () => list.shift() ?? null, total: list.length };
    }
    if (config.mode === 'review') {
      const list = shuffle(questionsByIds(progress.missed, config.subject)).slice(0, 12);
      return { next: () => list.shift() ?? null, total: list.length };
    }
    const gen = makeEndlessSource(config.subject);
    return { next: () => gen(), total: 0 };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [g, setG] = useState<G>(() => {
    const q = source.next();
    return {
      q,
      opts: q ? toOpts(q) : [],
      phase: 'ask',
      chosen: null,
      wasCorrect: false,
      hidden: [],
      score: 0,
      streak: 0,
      maxStreak: 0,
      correct: 0,
      total: 0,
      lives: rules.lives,
      bossHp: BOSS_HP,
      shield: 0,
      qElapsed: 0,
      gLeft: rules.global,
      fifty: rules.fifty,
      boost: rules.boost,
      gain: 0,
      crit: false,
      blocked: false,
      missed: [],
      fixed: [],
      idx: 1,
    };
  });
  const gRef = useRef(g);
  gRef.current = g;
  const finished = useRef(false);

  // ── animácie ──
  const shake = useRef(new Animated.Value(0)).current;
  const enter = useRef(new Animated.Value(0)).current;
  const pop = useRef(new Animated.Value(0)).current;
  const bossHit = useRef(new Animated.Value(0)).current;
  const flash = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    enter.setValue(0);
    Animated.timing(enter, { toValue: 1, duration: 320, easing: Easing.out(Easing.back(1.4)), useNativeDriver: ND }).start();
  }, [g.idx, enter]);

  const doShake = () => {
    shake.setValue(0);
    Animated.sequence(
      [10, -10, 8, -8, 4, 0].map((v) => Animated.timing(shake, { toValue: v, duration: 45, useNativeDriver: ND })),
    ).start();
    flash.setValue(1);
    Animated.timing(flash, { toValue: 0, duration: 500, useNativeDriver: ND }).start();
  };
  const doPop = () => {
    pop.setValue(0);
    Animated.timing(pop, { toValue: 1, duration: 900, easing: Easing.out(Easing.cubic), useNativeDriver: ND }).start();
    if (config.mode === 'boss') {
      bossHit.setValue(0);
      Animated.sequence([
        Animated.timing(bossHit, { toValue: 1, duration: 80, useNativeDriver: ND }),
        Animated.timing(bossHit, { toValue: -1, duration: 80, useNativeDriver: ND }),
        Animated.timing(bossHit, { toValue: 0.5, duration: 80, useNativeDriver: ND }),
        Animated.timing(bossHit, { toValue: 0, duration: 80, useNativeDriver: ND }),
      ]).start();
    }
  };

  // ── koniec hry ──
  const finish = useCallback(
    (st: G, won?: boolean) => {
      if (finished.current) return;
      finished.current = true;
      let stars: number | undefined;
      if (config.mode === 'campaign') stars = st.lives > 0 ? Math.max(0, Math.min(3, st.lives)) : 0;
      const prevBest = progress.arcadeBest[config.subject] ?? 0;
      const xp = Math.round(st.score / 25) + st.correct * 5 + (won ? 150 : 0) + (stars ?? 0) * 25;
      onFinish({
        config,
        score: st.score,
        correct: st.correct,
        total: st.total,
        maxStreak: st.maxStreak,
        stars,
        won,
        xp,
        missed: st.missed,
        fixed: st.fixed,
        newBest: config.mode === 'arcade' && st.score > prevBest,
      });
    },
    [config, onFinish, progress.arcadeBest],
  );

  // ── odpoveď ──
  const answer = useCallback(
    (choice: number) => {
      const st = gRef.current;
      if (st.phase !== 'ask' || !st.q) return;
      const q = st.q;
      const ok = choice >= 0 && st.opts[choice]?.correct;
      const n: G = { ...st, phase: 'feedback', chosen: choice, wasCorrect: !!ok, total: st.total + 1, gain: 0, crit: false, blocked: false };
      if (ok) {
        n.streak = st.streak + 1;
        n.maxStreak = Math.max(st.maxStreak, n.streak);
        n.correct = st.correct + 1;
        const mult = multFor(n.streak);
        const speed = rules.perQ ? Math.round(Math.max(0, 1 - st.qElapsed / rules.perQ) * 50) : 0;
        let gain = 100 * q.diff * mult + speed;
        if (config.mode === 'boss' && st.qElapsed < 8) {
          gain = Math.round(gain * 1.5);
          n.crit = true;
        }
        n.gain = gain;
        n.score = st.score + gain;
        if (config.mode === 'arcade') n.gLeft = st.gLeft + 3;
        if (config.mode === 'boss') n.bossHp = Math.max(0, st.bossHp - gain);
        if (config.mode === 'review') n.fixed = [...st.fixed, q.id];
        haptic('ok');
        doPop();
      } else {
        n.streak = 0;
        n.missed = [...st.missed, q];
        if (config.mode === 'boss' && st.shield > 0) {
          n.shield = st.shield - 1;
          n.blocked = true;
        }
        else if (isFinite(st.lives)) n.lives = st.lives - 1;
        if (config.mode === 'arcade') n.gLeft = Math.max(0, st.gLeft - 5);
        haptic('bad');
        doShake();
      }
      setG(n);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [config.mode, rules.perQ],
  );

  // ── ďalšia otázka ──
  const next = useCallback(() => {
    const st = gRef.current;
    if (st.phase !== 'feedback' || finished.current) return;
    if (config.mode === 'boss' && st.bossHp <= 0) return finish(st, true);
    if (st.lives <= 0) return finish(st, false);
    if (config.mode === 'arcade' && st.gLeft <= 0) return finish(st);
    const q = source.next();
    if (!q) return finish(st, true);
    setG({ ...st, q, opts: toOpts(q), phase: 'ask', chosen: null, hidden: [], qElapsed: 0, idx: st.idx + 1 });
  }, [config.mode, finish, source]);

  // automatický posun po správnej odpovedi v arcade/boss
  useEffect(() => {
    if (g.phase === 'feedback' && g.wasCorrect && rules.auto) {
      const t = setTimeout(next, g.bossHp <= 0 ? 1400 : 850);
      return () => clearTimeout(t);
    }
  }, [g.phase, g.wasCorrect, g.idx, g.bossHp, rules.auto, next]);

  // ── časovač ──
  useEffect(() => {
    if (g.phase !== 'ask' || (!rules.perQ && !rules.global)) return;
    let last = Date.now();
    const iv = setInterval(() => {
      const now = Date.now();
      const dt = (now - last) / 1000;
      last = now;
      const st = gRef.current;
      if (st.phase !== 'ask' || finished.current) return;
      const n = { ...st, qElapsed: st.qElapsed + dt, gLeft: rules.global ? st.gLeft - dt : st.gLeft };
      if (rules.global && n.gLeft <= 0) {
        clearInterval(iv);
        finish({ ...n, gLeft: 0 });
        return;
      }
      gRef.current = n;
      setG(n);
      if (rules.perQ && n.qElapsed >= rules.perQ) answer(-1);
    }, 100);
    return () => clearInterval(iv);
  }, [g.phase, g.idx, rules.perQ, rules.global, answer, finish]);

  // ── power-upy ──
  const onFifty = () => {
    const st = gRef.current;
    if (st.fifty <= 0 || st.phase !== 'ask' || st.opts.length < 3) return;
    const wrong = st.opts.map((o, i) => (o.correct ? -1 : i)).filter((i) => i >= 0);
    setG({ ...st, fifty: st.fifty - 1, hidden: shuffle(wrong).slice(0, st.opts.length === 4 ? 2 : 1) });
  };
  const onBoost = () => {
    const st = gRef.current;
    if (st.boost <= 0 || st.phase !== 'ask') return;
    if (config.mode === 'arcade') setG({ ...st, boost: st.boost - 1, gLeft: st.gLeft + 10 });
    else setG({ ...st, boost: st.boost - 1, shield: st.shield + 1 });
  };

  if (!g.q) {
    return (
      <View style={{ padding: 24, gap: 16 }}>
        <Text style={ui.h2}>Žiadne otázky na tréning 🎉</Text>
        <Text style={ui.p}>Zatiaľ nemáš žiadne chyby. Zahraj si kampaň alebo arcade.</Text>
        <GButton title="Späť" onPress={onQuit} />
      </View>
    );
  }

  const q = g.q;
  const topic = TOPICS[config.subject].find((t) => t.id === q.topic);
  const mult = multFor(g.streak);
  const timeFrac = rules.global ? Math.min(1, g.gLeft / rules.global) : rules.perQ ? Math.max(0, 1 - g.qElapsed / rules.perQ) : 1;
  const timeColor = timeFrac < 0.25 ? C.bad : timeFrac < 0.5 ? C.gold : C.good;

  return (
    <View style={{ flex: 1 }}>
      {/* červený záblesk pri chybe */}
      <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: C.bad, opacity: flash.interpolate({ inputRange: [0, 1], outputRange: [0, 0.18] }), zIndex: 5 }]} />

      {/* HUD */}
      <View style={s.hud}>
        <Pressable onPress={onQuit} hitSlop={12} style={s.quit}>
          <Text style={{ color: C.dim, fontSize: 18, fontWeight: '800' }}>✕</Text>
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={s.hudTitle} numberOfLines={1}>
            {config.title}
          </Text>
          <Text style={s.hudSub}>
            {source.total ? `Otázka ${g.idx} / ${source.total}` : `Otázka ${g.idx}`}
            {isFinite(g.lives) ? '   ' + '❤️'.repeat(Math.max(0, g.lives)) + '🖤'.repeat(Math.max(0, rules.lives - g.lives)) : ''}
            {g.shield > 0 ? '  🛡️' : ''}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={s.score}>{g.score.toLocaleString('sk-SK')}</Text>
          <Text style={[s.combo, { color: mult > 1 ? C.gold : C.dim }]}>{mult > 1 ? `🔥 x${mult}` : `séria ${g.streak}`}</Text>
        </View>
      </View>

      {(rules.perQ > 0 || rules.global > 0) && (
        <View style={{ paddingHorizontal: 16, marginBottom: 6 }}>
          <Bar value={timeFrac} color={timeColor} height={7} />
          {rules.global > 0 && <Text style={[s.hudSub, { textAlign: 'right', marginTop: 2 }]}>⏱ {Math.ceil(g.gLeft)} s</Text>}
        </View>
      )}

      <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 6, gap: 12, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
        {config.mode === 'boss' && (
          <Card style={{ flexDirection: 'row', alignItems: 'center', gap: 14, borderColor: subj.color + '66' }}>
            <Animated.Text
              style={{
                fontSize: 48,
                transform: [
                  { translateX: bossHit.interpolate({ inputRange: [-1, 1], outputRange: [-12, 12] }) },
                  { rotate: bossHit.interpolate({ inputRange: [-1, 1], outputRange: ['-12deg', '12deg'] }) },
                ],
              }}
            >
              {g.bossHp <= 0 ? '💥' : subj.bossIcon}
            </Animated.Text>
            <View style={{ flex: 1, gap: 6 }}>
              <Text style={{ color: C.text, fontWeight: '900', fontSize: 16 }}>{subj.boss}</Text>
              <Bar value={g.bossHp / BOSS_HP} color={C.bad} height={12} />
              <Text style={s.hudSub}>
                {g.bossHp} / {BOSS_HP} HP
              </Text>
            </View>
          </Card>
        )}

        <Animated.View
          style={{
            opacity: enter,
            transform: [{ translateX: shake }, { translateY: enter.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) }],
          }}
        >
          <Card style={{ borderColor: subj.color + '55', gap: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
              <Text style={[s.chip, { color: subj.color, borderColor: subj.color + '66' }]} numberOfLines={1}>
                {topic?.icon} {topic?.name}
              </Text>
              <Text style={[s.chip, { color: C.dim }]}>{'●'.repeat(q.diff)}{'○'.repeat(3 - q.diff)}</Text>
            </View>
            <Text style={s.question}>{q.q}</Text>
          </Card>
        </Animated.View>

        {/* plávajúce body */}
        <Animated.Text
          pointerEvents="none"
          style={[
            s.pop,
            {
              opacity: pop.interpolate({ inputRange: [0, 0.15, 0.8, 1], outputRange: [0, 1, 1, 0] }),
              transform: [{ translateY: pop.interpolate({ inputRange: [0, 1], outputRange: [0, -50] }) }, { scale: pop.interpolate({ inputRange: [0, 0.2, 1], outputRange: [0.6, 1.25, 1] }) }],
            },
          ]}
        >
          +{g.gain}
          {g.crit ? ' KRIT!' : ''}
        </Animated.Text>

        <View style={{ gap: 10 }}>
          {g.opts.map((o, i) => {
            if (g.hidden.includes(i)) return <View key={i} style={[s.opt, { opacity: 0.15 }]} />;
            const fb = g.phase === 'feedback';
            const isChosen = g.chosen === i;
            const bg = fb && o.correct ? 'rgba(52,211,153,0.22)' : fb && isChosen ? 'rgba(251,113,133,0.22)' : 'rgba(255,255,255,0.05)';
            const border = fb && o.correct ? C.good : fb && isChosen ? C.bad : 'rgba(255,255,255,0.14)';
            return (
              <Pressable key={i} disabled={fb} onPress={() => answer(i)} style={({ pressed }) => [s.opt, { backgroundColor: bg, borderColor: border, transform: [{ scale: pressed ? 0.98 : 1 }] }]}>
                <View style={[s.letter, { backgroundColor: fb && o.correct ? C.good : fb && isChosen ? C.bad : subj.color + '33' }]}>
                  <Text style={{ color: '#fff', fontWeight: '900' }}>{fb && o.correct ? '✓' : fb && isChosen ? '✕' : LETTERS[i]}</Text>
                </View>
                <Text style={s.optText}>{o.text}</Text>
              </Pressable>
            );
          })}
        </View>

        {g.phase === 'ask' && (rules.fifty > 0 || rules.boost > 0) && (
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {rules.fifty > 0 && <GButton small icon="✂️" title={`50/50 ×${g.fifty}`} onPress={onFifty} disabled={g.fifty <= 0} colors={['#334155', '#475569']} style={{ flex: 1 }} />}
            {rules.boost > 0 && (
              <GButton
                small
                icon={config.mode === 'arcade' ? '⏱️' : '🛡️'}
                title={config.mode === 'arcade' ? `+10 s ×${g.boost}` : `Štít ×${g.boost}`}
                onPress={onBoost}
                disabled={g.boost <= 0 || (config.mode === 'boss' && g.shield > 0)}
                colors={['#334155', '#475569']}
                style={{ flex: 1 }}
              />
            )}
          </View>
        )}

        {g.phase === 'feedback' && (!g.wasCorrect || !rules.auto) && (
          <Card style={{ gap: 8, borderColor: g.wasCorrect ? C.good : C.bad }}>
            <Text style={{ color: g.wasCorrect ? C.good : C.bad, fontSize: 18, fontWeight: '900' }}>
              {g.wasCorrect ? `Správne! +${g.gain}` : g.chosen === -1 ? 'Čas vypršal ⌛' : g.blocked ? 'Vedľa, ale štít ťa ochránil 🛡️' : 'Vedľa'}
            </Text>
            <Text style={{ color: C.text, fontSize: 15, lineHeight: 21 }}>{q.explain}</Text>
            <Text style={{ color: C.dim, fontSize: 12 }}>📚 {q.src}</Text>
            <ShowPicture id={`${config.subject}:${q.topic}`} />
            <GButton title={nextLabel(config.mode, g, source.total)} onPress={next} colors={[subj.color, subj.color2]} style={{ marginTop: 6 }} />
          </Card>
        )}
        {g.phase === 'feedback' && g.wasCorrect && rules.auto && (
          <Text style={{ color: C.good, textAlign: 'center', fontWeight: '800' }}>{g.bossHp <= 0 ? 'BOSS PORAZENÝ! 🏆' : 'Správne!'}</Text>
        )}
      </ScrollView>
    </View>
  );
}

/** tlačidlo, ktoré pod vysvetlením ukáže interaktívny obrázok témy */
function ShowPicture({ id }: { id: string }) {
  const [on, setOn] = useState(false);
  if (!on)
    return (
      <Pressable onPress={() => setOn(true)} style={{ alignSelf: 'flex-start', paddingVertical: 6 }}>
        <Text style={{ color: '#7dd3fc', fontWeight: '800', fontSize: 14 }}>🖼️ Ukáž mi to na obrázku</Text>
      </Pressable>
    );
  return <TopicDiagram id={id} />;
}

function nextLabel(mode: Mode, g: G, total: number) {
  if (g.lives <= 0) return 'Koniec hry';
  if (mode === 'arcade' && g.gLeft <= 0) return 'Výsledky';
  if ((mode === 'campaign' || mode === 'review') && g.idx >= total) return 'Výsledky';
  return 'Ďalej →';
}

const s = StyleSheet.create({
  hud: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingTop: 10, paddingBottom: 8 },
  quit: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' },
  hudTitle: { color: C.text, fontWeight: '800', fontSize: 16 },
  hudSub: { color: C.dim, fontSize: 13, marginTop: 2 },
  score: { color: C.text, fontWeight: '900', fontSize: 22, fontVariant: ['tabular-nums'] },
  combo: { fontWeight: '800', fontSize: 13 },
  chip: { fontSize: 12, fontWeight: '700', borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 3, overflow: 'hidden', flexShrink: 1 },
  question: { color: C.text, fontSize: 20, fontWeight: '700', lineHeight: 28 },
  opt: { flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 58, padding: 12, borderRadius: 16, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.14)' },
  letter: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  optText: { color: C.text, fontSize: 16, flex: 1, lineHeight: 22 },
  pop: { position: 'absolute', alignSelf: 'center', top: 120, zIndex: 10, color: C.gold, fontSize: 30, fontWeight: '900', textShadowColor: '#000', textShadowRadius: 8 },
});
