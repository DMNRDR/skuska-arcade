import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, Image, LayoutChangeEvent, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { C, Confetti, F, GButton, haptic, Header, Icon, ND, Press, SPRITES, Tag } from '../components/ui';
import { makeEndlessSource, SUBJECTS, TOPICS } from '../data';
import { play } from '../sound';
import { Question } from '../types';
import { rnd, shuffle } from '../util';
import { BoardMap, buildCells, Cell, cellXY, COLS, LAST, SPECIAL_LOOK, TOPIC_TINTS, topicLetter } from './boardMap';
import { GameProps } from './types';

// "Cesta na skúšku" – stolová hra proti spolužiakovi Maťovi.

type Who = 0 | 1; // 0 = ty, 1 = Maťo
type Phase = 'intro' | 'play' | 'end';
type LogItem = { id: number; who: Who | 2; text: string; tone?: 'good' | 'bad' };
type QState = { q: Question; opts: { t: string; ok: boolean }[]; topicName: string; color: string; double: boolean; picked: number | null };

const AI_ACCURACY = 0.65;
const NAMES = ['Ty', 'Maťo'];
const swatchLabel = (k: keyof typeof SPECIAL_LOOK) =>
  k === 'skrat' ? '↑' : k === 'smyk' ? '↓' : k === 'kalk' ? 'P' : SPECIAL_LOOK[k].label({ kind: k, name: '' });
const missedText = (n: number) =>
  n === 1 ? '1 chybná otázka pribudla do opakovania' : n < 5 ? `${n} chybné otázky pribudli do opakovania` : `${n} chybných otázok pribudlo do opakovania`;
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const run = (a: Animated.CompositeAnimation) => new Promise<void>((r) => a.start(() => r()));

const RULES_SPECIAL: { kind: keyof typeof SPECIAL_LOOK; title: string; text: string }[] = [
  { kind: 'konz', title: 'Konzultácia', text: 'Cvičiaci ti to vysvetlí za päť minút. Posun o 3 políčka dopredu.' },
  { kind: 'cvic', title: 'Cvičenie', text: 'Otázka za dvojnásobok: správne +2 políčka, zle −4.' },
  { kind: 'kalk', title: 'Zabudnutá kalkulačka', text: 'Bez nej to nejde. Ďalší ťah vynechávaš.' },
  { kind: 'skrat', title: 'Skrat', text: 'Staré skúšky alebo študijná skupina. Vyšplháš sa po rebríku.' },
  { kind: 'smyk', title: 'Šmyk', text: 'Prespatá prednáška či zlý vzorec. Zošmykneš sa dole.' },
];

export default function Board({ subject, progress, onReport, onExit }: GameProps) {
  const topics = TOPICS[subject];
  const cells = useMemo(() => buildCells(topics.length), [topics.length]);
  const bestKey = `hra:${subject}`;

  // ───────── rozmery ─────────
  const [boxW, setBoxW] = useState(360);
  const onLayout = (e: LayoutChangeEvent) => setBoxW(e.nativeEvent.layout.width);
  const boardW = Math.min(boxW - 32 - 10, 600);
  const cw = Math.floor(boardW / COLS);
  const ch = Math.round(cw * 0.8);
  const pawnSize = Math.round(Math.min(46, Math.max(26, cw * 0.56)));
  const geo = useRef({ cw, ch, pawnSize });
  geo.current = { cw, ch, pawnSize };

  // ───────── stav ─────────
  const [phase, setPhase] = useState<Phase>('intro');
  const [pos, setPos] = useState<[number, number]>([0, 0]);
  const [skip, setSkip] = useState<[boolean, boolean]>([false, false]);
  const [active, setActive] = useState<Who>(0);
  const [busy, setBusy] = useState(false);
  const [face, setFace] = useState(5);
  const [roller, setRoller] = useState<Who>(0);
  const [log, setLog] = useState<LogItem[]>([]);
  const [q, setQ] = useState<QState | null>(null);
  const [stats, setStats] = useState({ correct: 0, total: 0, turns: 0 });
  const [result, setResult] = useState<{ won: boolean; score: number; best: number; record: boolean; xp: number } | null>(null);

  const posRef = useRef<[number, number]>([0, 0]);
  const skipRef = useRef<[boolean, boolean]>([false, false]);
  const statsRef = useRef({ correct: 0, total: 0, turns: 0 });
  const missedRef = useRef<Question[]>([]);
  const bestBefore = useRef(0);
  const reported = useRef(false);
  const token = useRef(0);
  const mounted = useRef(true);
  const resolver = useRef<((ok: boolean) => void) | null>(null);
  const logId = useRef(0);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const sources = useRef<Record<string, () => Question>>({});
  const getQuestion = useCallback(
    (topicIdx: number): Question => {
      const id = topics[topicIdx]?.id;
      if (id && !sources.current[id]) sources.current[id] = makeEndlessSource(subject, [id]);
      const got = id ? sources.current[id]() : undefined;
      if (got) return got;
      if (!sources.current.__all) sources.current.__all = makeEndlessSource(subject);
      return sources.current.__all();
    },
    [subject, topics],
  );

  // ───────── animácie pešiakov a kocky ─────────
  const xy = useRef([new Animated.ValueXY(), new Animated.ValueXY()]).current;
  const hop = useRef([new Animated.Value(0), new Animated.Value(0)]).current;
  const spin = useRef(new Animated.Value(0)).current;
  const diceBob = useRef(new Animated.Value(0)).current;

  const target = (w: Who, i: number) => {
    const { cw: W, ch: H, pawnSize: s } = geo.current;
    const p = cellXY(i, W, H);
    const dx = (w === 0 ? -1 : 1) * W * 0.17;
    return { x: p.x + dx - s / 2 + 2, y: p.y - s * 0.62 + 2 };
  };

  // pri zmene rozmerov presadiť pešiakov na ich políčka
  useEffect(() => {
    xy[0].setValue(target(0, posRef.current[0]));
    xy[1].setValue(target(1, posRef.current[1]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cw, ch, pawnSize, phase]);

  // jemné "dýchanie" kocky, keď čaká na hod
  const waiting = phase === 'play' && !busy && active === 0 && !q;
  useEffect(() => {
    if (!waiting) {
      diceBob.setValue(0);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(diceBob, { toValue: 1, duration: 550, easing: Easing.inOut(Easing.quad), useNativeDriver: ND }),
        Animated.timing(diceBob, { toValue: 0, duration: 550, easing: Easing.inOut(Easing.quad), useNativeDriver: ND }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [waiting, diceBob]);

  const setP = (w: Who, v: number) => {
    const n: [number, number] = [...posRef.current] as [number, number];
    n[w] = v;
    posRef.current = n;
    setPos(n);
  };
  const setS = (w: Who, v: boolean) => {
    const n = [...skipRef.current] as [boolean, boolean];
    n[w] = v;
    skipRef.current = n;
    setSkip(n);
  };

  const addLog = (who: Who | 2, text: string, tone?: 'good' | 'bad') => {
    const item = { id: ++logId.current, who, text, tone };
    setLog((l) => [item, ...l].slice(0, 4));
  };

  const stepTo = async (w: Who, to: number) => {
    const H = geo.current.ch;
    play('step');
    await run(
      Animated.parallel([
        Animated.timing(xy[w], { toValue: target(w, to), duration: 200, easing: Easing.inOut(Easing.quad), useNativeDriver: ND }),
        Animated.sequence([
          Animated.timing(hop[w], { toValue: -H * 0.32, duration: 100, easing: Easing.out(Easing.quad), useNativeDriver: ND }),
          Animated.timing(hop[w], { toValue: 0, duration: 100, easing: Easing.in(Easing.quad), useNativeDriver: ND }),
        ]),
      ]),
    );
    setP(w, to);
    await sleep(60);
  };

  const walk = async (w: Who, n: number, t: number) => {
    const dir = n > 0 ? 1 : -1;
    for (let k = 0; k < Math.abs(n); k++) {
      const next = posRef.current[w] + dir;
      if (next < 0 || next > LAST || !alive(t)) break;
      await stepTo(w, next);
    }
  };

  const jump = async (w: Who, to: number) => {
    const H = geo.current.ch;
    await run(
      Animated.parallel([
        Animated.timing(xy[w], { toValue: target(w, to), duration: 650, easing: Easing.inOut(Easing.cubic), useNativeDriver: ND }),
        Animated.sequence([
          Animated.timing(hop[w], { toValue: -H * 0.7, duration: 325, easing: Easing.out(Easing.quad), useNativeDriver: ND }),
          Animated.timing(hop[w], { toValue: 0, duration: 325, easing: Easing.in(Easing.quad), useNativeDriver: ND }),
        ]),
      ]),
    );
    setP(w, to);
    play('step');
  };

  const alive = (t: number) => mounted.current && token.current === t;

  const rollDice = async (w: Who) => {
    setRoller(w);
    play('dice');
    spin.setValue(0);
    Animated.timing(spin, { toValue: 1, duration: 720, easing: Easing.out(Easing.cubic), useNativeDriver: ND }).start();
    const final = rnd(1, 6);
    let last = -1;
    for (let k = 0; k < 9; k++) {
      let f = rnd(0, 5);
      if (f === last) f = (f + 1) % 6;
      last = f;
      setFace(f);
      await sleep(70 + k * 6);
    }
    setFace(final - 1);
    await sleep(380);
    return final;
  };

  // ───────── otázky ─────────
  const askPlayer = (topicIdx: number, double: boolean) =>
    new Promise<boolean>((res) => {
      const qq = getQuestion(topicIdx);
      resolver.current = res;
      setQ({
        q: qq,
        opts: shuffle(qq.options.map((t, i) => ({ t, ok: i === 0 }))),
        topicName: topics[topicIdx]?.name ?? '',
        color: TOPIC_TINTS[topicIdx % TOPIC_TINTS.length],
        double,
        picked: null,
      });
      play('card');
    });

  const answer = (i: number) => {
    if (!q || q.picked !== null) return;
    const ok = q.opts[i].ok;
    haptic(ok ? 'ok' : 'bad');
    const s = statsRef.current;
    statsRef.current = { ...s, correct: s.correct + (ok ? 1 : 0), total: s.total + 1 };
    setStats(statsRef.current);
    if (!ok && !q.q.id.startsWith('gen-') && !missedRef.current.some((m) => m.id === q.q.id)) missedRef.current.push(q.q);
    setQ({ ...q, picked: i });
  };

  const closeQuestion = () => {
    if (!q || q.picked === null) return;
    const ok = q.opts[q.picked].ok;
    setQ(null);
    const r = resolver.current;
    resolver.current = null;
    r?.(ok);
  };

  const resolveLanding = async (w: Who, t: number) => {
    const at = posRef.current[w];
    const cell: Cell = cells[at];
    const who = NAMES[w];
    if (cell.kind === 'topic' || cell.kind === 'cvic') {
      const double = cell.kind === 'cvic';
      const ti = double ? rnd(0, topics.length - 1) : cell.topic ?? 0;
      const tName = topics[ti]?.name ?? '';
      let ok: boolean;
      if (w === 0) {
        ok = await askPlayer(ti, double);
      } else {
        addLog(1, `Maťo rieši otázku: ${tName}${double ? ' (cvičenie ×2)' : ''}…`);
        await sleep(1100);
        ok = Math.random() < AI_ACCURACY;
      }
      if (!alive(t)) return;
      const fwd = double ? 2 : 1;
      const back = double ? 4 : 2;
      if (ok) {
        if (w === 1) play('correct');
        addLog(w, `${w === 0 ? 'Správne' : 'Maťo odpovedal správne'}: +${fwd} ${fwd === 1 ? 'políčko' : 'políčka'}.`, 'good');
        await walk(w, fwd, t);
      } else {
        if (w === 1) play('wrong');
        addLog(w, `${w === 0 ? 'Zle' : 'Maťo sa pomýlil'}: späť o ${back} políčka.`, 'bad');
        await walk(w, -back, t);
      }
      return;
    }
    if (cell.kind === 'konz' || cell.kind === 'skrat' || cell.kind === 'smyk') {
      const to = cell.to ?? at;
      if (cell.kind === 'smyk') {
        play('whoosh');
        addLog(w, `${cell.name}. ${who} padá na políčko ${to}.`, 'bad');
      } else {
        play(cell.kind === 'skrat' ? 'fly' : 'bell');
        addLog(w, `${cell.name}. ${who} skáče na políčko ${to}.`, 'good');
      }
      await sleep(350);
      if (!alive(t)) return;
      await jump(w, to);
      return;
    }
    if (cell.kind === 'kalk') {
      play('wrong');
      addLog(w, `${cell.name}! ${w === 0 ? 'Ďalší ťah vynechávaš.' : 'Maťo vynechá ďalší ťah.'}`, 'bad');
      setS(w, true);
    }
  };

  /** Jeden ťah hráča w. Vráti true, ak hráč došiel na Skúšku. */
  const turn = async (w: Who, t: number): Promise<boolean> => {
    setActive(w);
    if (w === 0) {
      statsRef.current = { ...statsRef.current, turns: statsRef.current.turns + 1 };
      setStats(statsRef.current);
    }
    if (skipRef.current[w]) {
      setS(w, false);
      addLog(w, w === 0 ? 'Stále hľadáš kalkulačku, tento ťah vynechávaš.' : 'Maťo zháňa kalkulačku, ťah vynecháva.');
      await sleep(1300);
      return false;
    }
    const n = await rollDice(w);
    if (!alive(t)) return false;
    addLog(w, `${w === 0 ? 'Hodil si' : 'Maťo hodil'} ${n}.`);
    await walk(w, n, t);
    if (!alive(t)) return false;
    if (posRef.current[w] >= LAST) return true;
    await sleep(250);
    await resolveLanding(w, t);
    return posRef.current[w] >= LAST;
  };

  const finish = (won: boolean) => {
    const s = statsRef.current;
    const score = Math.max(0, 1000 - 20 * s.turns + 50 * s.correct) + (won ? 300 : 0);
    const xp = 8 * s.correct + (won ? 40 : 10);
    const best = Math.max(bestBefore.current, score);
    setResult({ won, score, best, record: score > bestBefore.current, xp });
    setPhase('end');
    play(won ? 'win' : 'wrong');
    if (!reported.current) {
      reported.current = true;
      onReport({ game: 'hra', score, xp, correct: s.correct, total: s.total, missed: missedRef.current });
    }
  };

  const round = async () => {
    if (busy || phase !== 'play' || active !== 0) return;
    const t = token.current;
    setBusy(true);
    if (await turn(0, t)) return alive(t) && finish(true);
    if (!alive(t)) return;
    for (;;) {
      await sleep(700);
      if (!alive(t)) return;
      if (await turn(1, t)) return alive(t) && finish(false);
      if (!alive(t)) return;
      // hráč s kalkulačkovou pauzou: preskočí sa a znova ťahá Maťo
      if (skipRef.current[0]) {
        await sleep(500);
        await turn(0, t);
        if (!alive(t)) return;
        continue;
      }
      break;
    }
    setActive(0);
    setBusy(false);
  };

  const start = () => {
    token.current++;
    posRef.current = [0, 0];
    skipRef.current = [false, false];
    statsRef.current = { correct: 0, total: 0, turns: 0 };
    missedRef.current = [];
    reported.current = false;
    bestBefore.current = progress.gameBest[bestKey] ?? 0;
    resolver.current = null;
    setPos([0, 0]);
    setSkip([false, false]);
    setStats(statsRef.current);
    setActive(0);
    setBusy(false);
    setQ(null);
    setResult(null);
    setFace(5);
    setLog([]);
    hop[0].setValue(0);
    hop[1].setValue(0);
    xy[0].setValue(target(0, 0));
    xy[1].setValue(target(1, 0));
    setPhase('play');
  };

  // ───────── obrazovky ─────────
  const subjName = SUBJECTS[subject].name;

  if (phase === 'intro') {
    const best = progress.gameBest[bestKey] ?? 0;
    return (
      <View style={{ flex: 1 }} onLayout={onLayout}>
        <Header title="Cesta na skúšku" kicker={`Stolová hra · ${subjName}`} onBack={onExit} />
        <ScrollView contentContainerStyle={s.scroll}>
          <Text style={s.lead}>Hádžeš kockou a ideš od Zápisu až na Skúšku. Proti tebe hrá spolužiak Maťo – kto tam bude prvý, vyhráva.</Text>
          <View style={s.ruleCard}>
            <Text style={s.ruleH}>Farebné políčko = otázka z témy</Text>
            <Text style={s.ruleT}>Správne: zostaneš a pridáš si ešte 1 políčko.</Text>
            <Text style={s.ruleT}>Zle: ideš o 2 políčka späť a ukáže sa vysvetlenie.</Text>
          </View>
          <View style={{ gap: 10 }}>
            {RULES_SPECIAL.map((r) => (
              <View key={r.kind} style={s.specRow}>
                <View style={[s.swatch, { backgroundColor: SPECIAL_LOOK[r.kind].fill }]}>
                  <Text style={[s.swatchT, { color: SPECIAL_LOOK[r.kind].fg }]}>{swatchLabel(r.kind)}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.specH}>{r.title}</Text>
                  <Text style={s.specT}>{r.text}</Text>
                </View>
              </View>
            ))}
          </View>
          <Text style={s.small}>Na Skúšku stačí dôjsť aj prestrelením. Skóre: 1000 − 20 za každý ťah + 50 za správnu odpoveď, výhra +300.</Text>
          {best > 0 ? <Tag color={C.orange}>{`REKORD ${best}`}</Tag> : null}
          <GButton title="Štart" subtitle="Hádžeš prvý" icon="next" color={C.orange} onPress={start} />
        </ScrollView>
      </View>
    );
  }

  if (phase === 'end' && result) {
    return (
      <View style={{ flex: 1 }} onLayout={onLayout}>
        {result.won ? <Confetti /> : null}
        <Header title="Cesta na skúšku" kicker={`Koniec hry · ${subjName}`} onBack={onExit} />
        <ScrollView contentContainerStyle={s.scroll}>
          <View style={s.endHead}>
            <Image source={result.won ? SPRITES.pawn.red : SPRITES.pawn.blue} style={{ width: 64, height: 64 }} resizeMode="contain" />
            <View style={{ flex: 1 }}>
              <Text style={s.endTitle}>{result.won ? 'Skúška je tvoja!' : 'Maťo bol rýchlejší'}</Text>
              <Text style={s.lead}>{result.won ? 'Došiel si na Skúšku skôr ako spolužiak.' : 'Tentokrát došiel na Skúšku prvý Maťo. Odveta?'}</Text>
            </View>
          </View>
          <View style={s.statGrid}>
            <Stat label="Skóre" value={String(result.score)} accent />
            <Stat label="Rekord" value={String(result.best)} />
            <Stat label="Správne" value={`${stats.correct}/${stats.total}`} />
            <Stat label="Ťahy" value={String(stats.turns)} />
          </View>
          {result.record ? <Tag color={C.orange}>NOVÝ REKORD</Tag> : null}
          <Text style={s.small}>{`+${result.xp} XP${missedRef.current.length ? ` · ${missedText(missedRef.current.length)}` : ''}`}</Text>
          <GButton title="Hrať znova" icon="retry" color={C.orange} onPress={start} />
          <GButton title="Späť" icon="home" light color={C.sheet} onPress={onExit} />
        </ScrollView>
      </View>
    );
  }

  // ───────── hra ─────────
  const spinDeg = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', (roller === 0 ? 720 : -720) + 'deg'] });
  const spinScale = spin.interpolate({ inputRange: [0, 0.3, 1], outputRange: [1, 1.25, 1] });
  const bob = diceBob.interpolate({ inputRange: [0, 1], outputRange: [0, -4] });
  const latest = log[0];

  return (
    <View style={{ flex: 1 }} onLayout={onLayout}>
      <Header
        title="Cesta na skúšku"
        kicker={subjName}
        onBack={onExit}
        right={<Tag color={C.ink}>{`ŤAH ${Math.max(1, stats.turns)}`}</Tag>}
      />
      <ScrollView contentContainerStyle={[s.scroll, { gap: 12 }]}>
        <View style={s.players}>
          {([0, 1] as Who[]).map((w) => (
            <View key={w} style={[s.player, active === w && s.playerOn]}>
              <Image source={w === 0 ? SPRITES.pawn.red : SPRITES.pawn.blue} style={{ width: 28, height: 28 }} resizeMode="contain" />
              <View style={{ flex: 1 }}>
                <Text style={s.pName} numberOfLines={1}>
                  {w === 0 ? 'Ty' : 'Maťo'}
                </Text>
                <Text style={s.pPos}>{`políčko ${pos[w]}/${LAST}${skip[w] ? ' · pauza' : ''}`}</Text>
              </View>
            </View>
          ))}
        </View>

        <BoardMap cells={cells} cw={cw} ch={ch}>
          {([1, 0] as Who[]).map((w) => (
            <Animated.View
              key={w}
              pointerEvents="none"
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: pawnSize,
                height: pawnSize,
                zIndex: 5 + w,
                transform: [{ translateX: xy[w].x }, { translateY: Animated.add(xy[w].y, hop[w]) }],
              }}
            >
              <Image source={w === 0 ? SPRITES.pawn.red : SPRITES.pawn.blue} style={{ width: pawnSize, height: pawnSize }} resizeMode="contain" />
            </Animated.View>
          ))}
        </BoardMap>

        <View style={s.turnRow}>
          <Animated.View style={{ transform: [{ translateY: bob }, { rotate: spinDeg }, { scale: spinScale }] }}>
            <Pressable
              onPress={round}
              disabled={!waiting}
              accessibilityRole="button"
              accessibilityLabel="Hodiť kockou"
              style={[s.die, waiting && { borderColor: C.orange, borderWidth: 3 }]}
            >
              <Image source={SPRITES.die[face]} style={{ width: 60, height: 60 }} resizeMode="contain" />
            </Pressable>
          </Animated.View>
          <View style={{ flex: 1, gap: 4 }}>
            <Text style={[s.turnH, { color: active === 0 ? C.orange : C.blue }]}>
              {waiting ? 'Tvoj ťah – ťukni na kocku' : active === 0 ? 'Tvoj ťah' : 'Ťahá Maťo…'}
            </Text>
            <Text
              key={latest?.id ?? 0}
              style={[s.logMain, latest?.tone === 'good' && { color: C.good }, latest?.tone === 'bad' && { color: C.bad }]}
            >
              {latest ? latest.text : 'Hádžeš prvý. Ty hráš za oranžovú figúrku, Maťo za modrú.'}
            </Text>
          </View>
        </View>
        {log.length > 1 ? (
          <View style={s.logBox}>
            {log.slice(1, 4).map((l) => (
              <View key={l.id} style={s.logRow}>
                <View style={[s.logDot, { backgroundColor: l.who === 0 ? C.orange : l.who === 1 ? C.blue : C.rule }]} />
                <Text style={s.logOld} numberOfLines={2}>
                  {l.text}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        <View style={s.legend}>
          <Text style={s.legendH}>Témy na trase</Text>
          <View style={s.legendWrap}>
            {topics.map((t, i) => (
              <View key={t.id} style={s.legendItem}>
                <View style={[s.legendSw, { backgroundColor: TOPIC_TINTS[i % TOPIC_TINTS.length] }]}>
                  <Text style={s.legendL}>{topicLetter(i)}</Text>
                </View>
                <Text style={s.legendT} numberOfLines={2}>
                  {t.name}
                </Text>
              </View>
            ))}
          </View>
          <Text style={[s.legendH, { marginTop: 10 }]}>Špeciálne políčka</Text>
          <View style={s.legendWrap}>
            {RULES_SPECIAL.map((r) => (
              <View key={r.kind} style={s.legendItem}>
                <View style={[s.legendSw, { backgroundColor: SPECIAL_LOOK[r.kind].fill }]}>
                  <Text style={[s.legendL, { color: SPECIAL_LOOK[r.kind].fg }]}>{swatchLabel(r.kind)}</Text>
                </View>
                <Text style={s.legendT} numberOfLines={2}>
                  {r.title}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {q ? <QuestionSheet q={q} onPick={answer} onClose={closeQuestion} /> : null}
    </View>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <View style={[s.stat, accent && { backgroundColor: C.mark }]}>
      <Text style={s.statL}>{label}</Text>
      <Text style={s.statV}>{value}</Text>
    </View>
  );
}

function QuestionSheet({ q, onPick, onClose }: { q: QState; onPick: (i: number) => void; onClose: () => void }) {
  const a = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(a, { toValue: 1, duration: 240, easing: Easing.out(Easing.cubic), useNativeDriver: ND }).start();
  }, [a]);
  const done = q.picked !== null;
  const ok = done && q.opts[q.picked!].ok;
  return (
    <View style={s.overlay} testID="board-question">
      <Animated.View style={[s.sheetWrap, { opacity: a, transform: [{ translateY: a.interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) }] }]}>
        <View style={s.qShadow} />
        <View style={s.qCard}>
          <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
              <View style={[s.qTopic, { backgroundColor: q.color }]}>
                <Text style={s.qTopicT}>{q.topicName}</Text>
              </View>
              {q.double ? <Tag color={C.ink} style={{ backgroundColor: C.yellow }}>CVIČENIE ×2</Tag> : null}
            </View>
            <Text style={s.qText}>{q.q.q}</Text>
            <View style={{ gap: 8 }}>
              {q.opts.map((o, i) => {
                const isPicked = q.picked === i;
                const bg = !done ? C.sheet : o.ok ? '#CDEBD8' : isPicked ? '#F3C9C3' : C.sheet;
                return (
                  <View key={i} testID={`board-opt-${i}`}>
                    <Press onPress={() => onPick(i)} disabled={done && !o.ok && !isPicked} color={bg} depth={3} sound={false} inner={s.opt}>
                      <Text style={s.optL}>{'ABCD'[i]}</Text>
                      <Text style={s.optT}>{o.t}</Text>
                      {done && o.ok ? <Icon name="check" size={20} color={C.good} /> : null}
                      {done && isPicked && !o.ok ? <Icon name="cross" size={20} color={C.bad} /> : null}
                    </Press>
                  </View>
                );
              })}
            </View>
            {done ? (
              <View style={[s.feedback, { borderColor: ok ? C.good : C.bad }]}>
                <Text style={[s.fbH, { color: ok ? C.good : C.bad }]}>
                  {ok ? `Správne! Ideš ešte o ${q.double ? 2 : 1} ${q.double ? 'políčka' : 'políčko'} dopredu.` : `Zle. Ideš o ${q.double ? 4 : 2} políčka späť.`}
                </Text>
                {q.q.explain ? <Text style={s.fbT}>{q.q.explain}</Text> : null}
              </View>
            ) : null}
            {done ? <GButton title="Pokračovať" icon="next" color={C.ink} onPress={onClose} /> : null}
          </ScrollView>
        </View>
      </Animated.View>
    </View>
  );
}

const s = StyleSheet.create({
  scroll: { paddingHorizontal: 16, paddingBottom: 32, paddingTop: 4, gap: 16 },
  lead: { fontFamily: F.body, fontSize: 18, lineHeight: 25, color: C.ink },
  ruleCard: { backgroundColor: C.sheet, borderWidth: 1.5, borderColor: C.ink, borderRadius: 8, padding: 14, gap: 4 },
  ruleH: { fontFamily: F.head, fontSize: 19, color: C.ink, marginBottom: 2 },
  ruleT: { fontFamily: F.body, fontSize: 17, lineHeight: 23, color: C.ink },
  specRow: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  swatch: { width: 44, height: 44, borderRadius: 6, borderWidth: 1.5, borderColor: C.ink, alignItems: 'center', justifyContent: 'center' },
  swatchT: { fontFamily: F.monoBold, fontSize: 16 },
  specH: { fontFamily: F.bodyBold, fontSize: 17, color: C.ink },
  specT: { fontFamily: F.body, fontSize: 16, lineHeight: 21, color: C.ink2 },
  small: { fontFamily: F.body, fontSize: 15, lineHeight: 21, color: C.ink2 },
  players: { flexDirection: 'row', gap: 10 },
  player: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8, borderWidth: 1.5, borderColor: C.rule, backgroundColor: C.sheet, minHeight: 48 },
  playerOn: { borderColor: C.orange, borderWidth: 2.5 },
  pName: { fontFamily: F.bodyBold, fontSize: 16, color: C.ink },
  pPos: { fontFamily: F.mono, fontSize: 13, color: C.ink2 },
  turnRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 4 },
  die: { width: 72, height: 72, alignItems: 'center', justifyContent: 'center', borderRadius: 14, borderWidth: 2, borderColor: C.ink, backgroundColor: C.sheet },
  turnH: { fontFamily: F.head, fontSize: 18 },
  logMain: { fontFamily: F.bodyMed, fontSize: 17, lineHeight: 23, color: C.ink },
  logBox: { borderLeftWidth: 3, borderLeftColor: C.rule, paddingLeft: 10, gap: 2 },
  logRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logDot: { width: 9, height: 9, borderRadius: 2, borderWidth: 1, borderColor: C.ink },
  logOld: { flex: 1, fontFamily: F.body, fontSize: 15, lineHeight: 20, color: C.ink2 },
  legend: { backgroundColor: C.sheet, borderWidth: 1.5, borderColor: C.ink, borderRadius: 8, padding: 12 },
  legendH: { fontFamily: F.mono, fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', color: C.orange, marginBottom: 8 },
  legendWrap: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 8, columnGap: 12 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 8, flexBasis: 140, flexGrow: 1 },
  legendSw: { width: 26, height: 26, borderRadius: 4, borderWidth: 1.5, borderColor: C.ink, alignItems: 'center', justifyContent: 'center' },
  legendL: { fontFamily: F.monoBold, fontSize: 13, color: C.ink },
  legendT: { flex: 1, fontFamily: F.body, fontSize: 15, lineHeight: 19, color: C.ink },
  overlay: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(29,34,41,0.45)', justifyContent: 'flex-end', alignItems: 'center', zIndex: 50 },
  sheetWrap: { width: '100%', maxWidth: 620, maxHeight: '92%', paddingHorizontal: 10, paddingBottom: 14 },
  qShadow: { position: 'absolute', left: 16, right: 4, top: 6, bottom: 8, backgroundColor: C.ink, borderRadius: 10 },
  qCard: { backgroundColor: C.paper, borderWidth: 2, borderColor: C.ink, borderRadius: 10, marginRight: 6, flexShrink: 1, overflow: 'hidden' },
  qTopic: { borderWidth: 1.5, borderColor: C.ink, borderRadius: 4, paddingHorizontal: 8, paddingVertical: 3 },
  qTopicT: { fontFamily: F.bodyBold, fontSize: 15, color: C.ink },
  qText: { fontFamily: F.bodyMed, fontSize: 18, lineHeight: 25, color: C.ink },
  opt: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 11, paddingHorizontal: 12, minHeight: 48 },
  optL: { fontFamily: F.monoBold, fontSize: 15, color: C.orange, width: 16 },
  optT: { flex: 1, fontFamily: F.body, fontSize: 17, lineHeight: 22, color: C.ink },
  feedback: { borderLeftWidth: 4, paddingLeft: 12, paddingVertical: 4, gap: 4 },
  fbH: { fontFamily: F.bodyBold, fontSize: 17 },
  fbT: { fontFamily: F.body, fontSize: 16, lineHeight: 22, color: C.ink },
  endHead: { flexDirection: 'row', gap: 14, alignItems: 'center' },
  endTitle: { fontFamily: F.headX, fontSize: 30, color: C.ink, letterSpacing: -0.5 },
  statGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  stat: { flexGrow: 1, flexBasis: 130, backgroundColor: C.sheet, borderWidth: 1.5, borderColor: C.ink, borderRadius: 8, padding: 12 },
  statL: { fontFamily: F.mono, fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', color: C.ink2 },
  statV: { fontFamily: F.monoBold, fontSize: 28, color: C.ink },
});

