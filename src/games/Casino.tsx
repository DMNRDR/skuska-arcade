import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, ImageSourcePropType, LayoutChangeEvent, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Bar, C, Confetti, F, GButton, haptic, Header, Icon, ND, Press, SPRITES } from '../components/ui';
import { makeEndlessSource, SUBJECTS, TOPICS } from '../data';
import { play } from '../sound';
import { Question } from '../types';
import { fmt, pick as pickOne, shuffle } from '../util';
import { buildSectors, CHALK, Felt, FELT_DARK, Sector, topicName, Wheel } from './casinoTable';
import { GameProps } from './types';

// Kasíno Istota: stávkuješ žetónmi podľa toho, ako veľmi si istý odpoveďou.

const START = 200;
const GOAL = 1000;
const ROUNDS = 12;
const DIFF_ODDS: Record<1 | 2 | 3, number> = { 1: 1, 2: 1.5, 3: 2 };
const DIFF_NAME: Record<1 | 2 | 3, string> = { 1: 'ľahká', 2: 'stredná', 3: 'ťažká' };

const DENOMS: { v: number; src: ImageSourcePropType; fg: string }[] = [
  { v: 10, src: SPRITES.chip.white, fg: C.ink },
  { v: 25, src: SPRITES.chip.red, fg: '#fff' },
  { v: 50, src: SPRITES.chip.blue, fg: '#fff' },
  { v: 100, src: SPRITES.chip.black, fg: '#fff' },
];

const CHIP = 42; // veľkosť žetónu na stole
const LETTERS = ['A', 'B', 'C', 'D', 'E'];

type Phase = 'intro' | 'spin' | 'bet' | 'result' | 'end';
type Log = { q: Question; bet: number; bankBefore: number; ok: boolean; odds: number; delta: number };
type P = { x: number; y: number };
type Box = { x: number; y: number; w: number; h: number };
type Fly = { id: number; src: ImageSourcePropType; from: P; to: P; v: Animated.Value; fade: boolean };

/** Rozklad sumy na žetóny (najviac `max` kusov, kvôli animácii). */
function toChips(amount: number, max = 8): number[] {
  const out: number[] = [];
  let rest = amount;
  for (let i = DENOMS.length - 1; i >= 0 && out.length < max; i--) {
    while (rest >= DENOMS[i].v && out.length < max) {
      out.push(i);
      rest -= DENOMS[i].v;
    }
  }
  if (!out.length && amount > 0) out.push(0);
  return out;
}

/** Číslo, ktoré k novej hodnote plynulo dobehne. */
function CountUp({ value, delay = 0, style }: { value: number; delay?: number; style?: object }) {
  const [shown, setShown] = useState(value);
  const shownRef = useRef(value);
  useEffect(() => {
    const from = shownRef.current;
    if (from === value) return;
    let raf = 0;
    let t0 = 0;
    const tick = (ts: number) => {
      if (!t0) t0 = ts;
      const k = Math.min(1, (ts - t0) / 650);
      const v = Math.round(from + (value - from) * (1 - Math.pow(1 - k, 3)));
      shownRef.current = v;
      setShown(v);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    const to = setTimeout(() => (raf = requestAnimationFrame(tick)), delay);
    return () => {
      clearTimeout(to);
      cancelAnimationFrame(raf);
      shownRef.current = value;
    };
  }, [value, delay]);
  return <Text style={style}>{shown}</Text>;
}

function ChipStack({ chips, size = CHIP, max = 12 }: { chips: number[]; size?: number; max?: number }) {
  const shown = chips.slice(-max);
  return (
    <View style={{ width: size, height: size + (shown.length - 1) * 4 }}>
      {shown.map((d, i) => (
        <Image
          key={i}
          source={DENOMS[d].src}
          style={{ position: 'absolute', left: ((i * 7) % 5) - 2, bottom: i * 4, width: size, height: size }}
        />
      ))}
    </View>
  );
}

export default function Casino({ subject, progress, onReport, onExit }: GameProps) {
  const { width } = useWindowDimensions();
  const contentW = Math.min(width, 680);
  const wheelSize = Math.max(240, Math.min(contentW - 32 - 22 - 32, 340));
  const bestKey = `kasino:${subject}`;
  const chipBtn = contentW < 390 ? 52 : 60;

  const sectors = useRef(buildSectors(subject)).current;
  const sources = useRef(new Map<string, () => Question>()).current;
  const anyQ = useRef(makeEndlessSource(subject)).current;

  const [phase, setPhase] = useState<Phase>('intro');
  const [bank, setBank] = useState(START);
  const [round, setRound] = useState(1);
  const [logs, setLogs] = useState<Log[]>([]);
  const [spinId, setSpinId] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [spun, setSpun] = useState<{ sector: Sector; topic: string } | null>(null);
  const [q, setQ] = useState<Question | null>(null);
  const [opts, setOpts] = useState<string[]>([]);
  const [answer, setAnswer] = useState<number | null>(null);
  const [bet, setBet] = useState(0);
  const [stack, setStack] = useState<number[]>([]);
  const [flies, setFlies] = useState<Fly[]>([]);
  const [note, setNote] = useState('');
  const [goalHit, setGoalHit] = useState(false);
  const [party, setParty] = useState(0);
  const [prevBest, setPrevBest] = useState(progress.gameBest[bestKey] ?? 0);

  const wheelAngle = useRef(0);
  const flyId = useRef(0);
  const stackLen = useRef(0);
  const reported = useRef(false);
  const alive = useRef(true);
  const lay = useRef<Record<string, Box>>({}).current;
  const scroll = useRef<ScrollView>(null);
  useEffect(
    () => () => {
      alive.current = false;
    },
    [],
  );

  const onLay = (key: string) => (e: LayoutChangeEvent) => {
    const { x, y, width: w, height: h } = e.nativeEvent.layout;
    lay[key] = { x, y, w, h };
  };
  const center = (...keys: string[]): P => {
    let x = 0;
    let y = 0;
    keys.forEach((k, i) => {
      const b = lay[k] ?? { x: 0, y: 0, w: 0, h: 0 };
      x += b.x + (i === keys.length - 1 ? b.w / 2 : 0);
      y += b.y + (i === keys.length - 1 ? b.h / 2 : 0);
    });
    return { x, y };
  };
  const spotP = (i: number): P => {
    const c = center('zone', 'zoneTop', 'spot');
    return { x: c.x + (((i * 7) % 5) - 2), y: c.y + 17 - Math.min(i, 11) * 4 };
  };
  const bankP = () => center('top', 'bank');
  const houseP = () => center('top', 'house');

  const fly = (src: ImageSourcePropType, from: P, to: P, opts2: { delay?: number; fade?: boolean; dur?: number; onEnd?: () => void } = {}) => {
    const id = ++flyId.current;
    const v = new Animated.Value(0);
    setFlies((f) => [...f, { id, src, from, to, v, fade: !!opts2.fade }]);
    Animated.timing(v, {
      toValue: 1,
      duration: opts2.dur ?? 420,
      delay: opts2.delay ?? 0,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: ND,
    }).start(() => {
      if (!alive.current) return;
      setFlies((f) => f.filter((x) => x.id !== id));
      opts2.onEnd?.();
    });
  };

  // ───────── priebeh hry ─────────
  const startGame = () => {
    reported.current = false;
    setPrevBest(progress.gameBest[bestKey] ?? 0);
    setBank(START);
    setRound(1);
    setLogs([]);
    setGoalHit(false);
    setParty(0);
    newRound();
  };

  const newRound = () => {
    setSpun(null);
    setQ(null);
    setAnswer(null);
    setBet(0);
    setStack([]);
    stackLen.current = 0;
    setFlies([]);
    setNote('');
    setPhase('spin');
    scroll.current?.scrollTo({ y: 0, animated: false });
  };

  const spin = () => {
    if (phase !== 'spin' || spun || spinning) return;
    setSpinning(true);
    setSpinId((s) => s + 1);
  };

  const onSpinDone = (i: number, angle: number) => {
    setSpinning(false);
    wheelAngle.current = angle;
    const sector = sectors[i];
    const topic = sector.topic ?? pickOne(TOPICS[subject]).id;
    setSpun({ sector, topic });
    if (sector.kind === 'jackpot') play('bell');
    else if (sector.kind !== 'topic') play('bell');
    else play('card');
    let src = sources.get(topic);
    if (!src) {
      src = makeEndlessSource(subject, [topic]);
      sources.set(topic, src);
    }
    let question = src() ?? anyQ();
    if (!question) question = anyQ();
    setTimeout(() => {
      if (!alive.current) return;
      setQ(question);
      setOpts(shuffle(question.options));
      setPhase('bet');
      play('card');
    }, 1300);
  };

  const addChip = (d: number) => {
    if (phase !== 'bet') return;
    const room = bank - bet;
    if (room <= 0) {
      setNote(`Viac ako ${bank} žetónov staviť nemôžeš.`);
      haptic('bad');
      return;
    }
    const add = Math.min(DENOMS[d].v, room);
    setBet((b) => b + add);
    setNote('');
    play('chip');
    const i = stackLen.current++;
    fly(DENOMS[d].src, center('zone', 'row', 'c' + d), spotP(i), { onEnd: () => setStack((s) => [...s, d]) });
  };

  const allIn = () => {
    if (phase !== 'bet') return;
    const room = bank - bet;
    if (room <= 0) return;
    setBet(bank);
    setNote('');
    play('chips');
    toChips(room, 6).forEach((d, k) => {
      const i = stackLen.current++;
      fly(DENOMS[d].src, center('zone', 'row', 'c' + d), spotP(i), { delay: k * 70, onEnd: () => setStack((s) => [...s, d]) });
    });
  };

  const clearBet = () => {
    if (phase !== 'bet' || bet === 0) return;
    play('chip');
    const from = stack.map((_, i) => spotP(i));
    const st = stack;
    setStack([]);
    stackLen.current = 0;
    setBet(0);
    st.forEach((d, i) => fly(DENOMS[d].src, from[i], bankP(), { delay: i * 30, dur: 360 }));
  };

  const odds = q && spun ? spun.sector.mult * DIFF_ODDS[q.diff] : 1;

  const confirm = () => {
    if (phase !== 'bet' || !q || answer === null || bet <= 0) return;
    const ok = opts[answer] === q.options[0];
    const delta = ok ? Math.round(bet * odds) : -bet;
    const before = bank;
    const after = Math.max(0, bank + delta);
    setLogs((l) => [...l, { q, bet, bankBefore: before, ok, odds, delta }]);
    setPhase('result');
    const st = stack;
    setStack([]);
    stackLen.current = 0;
    if (ok) {
      haptic('ok');
      st.forEach((d, i) => fly(DENOMS[d].src, spotP(i), bankP(), { delay: 250 + i * 40, dur: 520 }));
      toChips(delta, 8).forEach((d, k) =>
        fly(DENOMS[d].src, houseP(), bankP(), { delay: 150 + k * 80, dur: 620, onEnd: k === 0 ? () => play('chips') : undefined }),
      );
      if (after >= GOAL && !goalHit) {
        setGoalHit(true);
        setParty((p) => p + 1);
        setTimeout(() => alive.current && play('win'), 700);
      } else if (spun?.sector.kind === 'jackpot') setParty((p) => p + 1);
    } else {
      haptic('bad');
      st.forEach((d, i) => fly(DENOMS[d].src, spotP(i), houseP(), { delay: 200 + i * 35, dur: 560, fade: true }));
    }
    setBank(after);
  };

  const finish = (finalLogs: Log[], finalBank: number) => {
    if (!reported.current) {
      reported.current = true;
      const correct = finalLogs.filter((l) => l.ok).length;
      const xp = correct * 8 + Math.floor(finalBank / 40) + (finalBank >= GOAL ? 40 : 0);
      onReport({
        game: 'kasino',
        score: finalBank,
        xp,
        correct,
        total: finalLogs.length,
        missed: finalLogs.filter((l) => !l.ok).map((l) => l.q),
      });
      if (finalBank > prevBest) setTimeout(() => alive.current && play('levelup'), 300);
    }
    setFlies([]);
    setPhase('end');
    scroll.current?.scrollTo({ y: 0, animated: false });
  };

  const next = () => {
    if (bank <= 0 || round >= ROUNDS) finish(logs, bank);
    else {
      setRound((r) => r + 1);
      newRound();
    }
  };

  // ───────── zobrazenie ─────────
  const last = logs[logs.length - 1];
  const kicker = phase === 'intro' ? SUBJECTS[subject].name : phase === 'end' ? 'Koniec hry' : `Kolo ${round} / ${ROUNDS}`;

  const topRow = (
    <View style={s.topRow} onLayout={onLay('top')}>
      <View style={s.bank} onLayout={onLay('bank')}>
        <ChipStack chips={toChips(bank, 5).reverse()} size={34} />
        <View>
          <Text style={s.feltLabel}>Tvoje žetóny</Text>
          <CountUp value={bank} delay={phase === 'result' ? 450 : 0} style={s.bankNum} />
        </View>
      </View>
      <View style={s.house} onLayout={onLay('house')}>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={s.feltLabel}>Kasíno</Text>
          <Text style={s.houseNum}>{phase === 'spin' || phase === 'intro' ? 'bank' : `kurz ×${fmt(odds, 1)}`}</Text>
        </View>
        <ChipStack chips={[3, 3, 3, 3]} size={34} />
      </View>
    </View>
  );

  const flyLayer = flies.map((f) => (
    <Animated.Image
      key={f.id}
      source={f.src}
      style={{
        position: 'absolute',
        left: f.from.x - CHIP / 2,
        top: f.from.y - CHIP / 2,
        width: CHIP,
        height: CHIP,
        zIndex: 30,
        opacity: f.fade ? f.v.interpolate({ inputRange: [0, 0.7, 1], outputRange: [1, 1, 0] }) : 1,
        transform: [
          { translateX: f.v.interpolate({ inputRange: [0, 1], outputRange: [0, f.to.x - f.from.x] }) },
          {
            translateY: f.v.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0, (f.to.y - f.from.y) / 2 - 26, f.to.y - f.from.y],
            }),
          },
          { scale: f.v.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 1.18, 1] }) },
        ],
      }}
    />
  ));

  let body: React.ReactNode = null;

  if (phase === 'intro') {
    body = (
      <>
        <Felt>
          <Text style={s.introTitle}>Stav na svoju istotu</Text>
          <View style={{ gap: 12, marginTop: 14 }}>
            {[
              'Roztoč koleso. Určí tému otázky a násobič: ×2, ×3 alebo Jackpot ×5.',
              'Prečítaj otázku a vyber odpoveď.',
              'Polož žetóny 10 / 25 / 50 / 100. Čím si istejší, tým viac stav.',
              'Správne: vyhráš stávku × násobič × kurz obtiažnosti (ľahká ×1, stredná ×1,5, ťažká ×2). Zle: stávka prepadne.',
            ].map((r, i) => (
              <View key={i} style={{ flexDirection: 'row', gap: 12 }}>
                <Text style={s.ruleNum}>{i + 1}</Text>
                <Text style={s.rule}>{r}</Text>
              </View>
            ))}
          </View>
          <View style={s.introStats}>
            <View>
              <Text style={s.feltLabel}>Štart</Text>
              <Text style={s.statNum}>{START}</Text>
            </View>
            <View>
              <Text style={s.feltLabel}>Cieľ</Text>
              <Text style={s.statNum}>{GOAL}</Text>
            </View>
            <View>
              <Text style={s.feltLabel}>Kôl</Text>
              <Text style={s.statNum}>{ROUNDS}</Text>
            </View>
            <View>
              <Text style={s.feltLabel}>Rekord</Text>
              <Text style={s.statNum}>{prevBest}</Text>
            </View>
          </View>
        </Felt>
        <GButton title="Štart" subtitle="Prvé kolo začína roztočením kolesa" color={C.orange} icon="next" onPress={startGame} style={{ marginTop: 16 }} />
        <Text style={s.fine}>Hrá sa len o virtuálne žetóny bez akejkoľvek hodnoty, nie o skutočné peniaze. Cieľom je naučiť sa odhadnúť vlastnú istotu.</Text>
      </>
    );
  } else if (phase === 'spin') {
    const sec = spun?.sector;
    body = (
      <Felt>
        {topRow}
        <View style={{ alignItems: 'center', marginTop: 8 }}>
          <Wheel sectors={sectors} size={wheelSize} spinId={spinId} startAngle={wheelAngle.current} onDone={onSpinDone} onPress={spin} />
        </View>
        {spun && sec ? (
          <View style={s.spunBox}>
            <Text style={s.spunTitle}>{sec.kind === 'topic' ? 'Téma' : sec.kind === 'jackpot' ? 'Jackpot! Násobič ×5' : `Násobič ${sec.label}`}</Text>
            <Text style={s.spunTopic}>{topicName(subject, spun.topic)}</Text>
          </View>
        ) : (
          <GButton title={spinning ? 'Koleso sa točí…' : 'Roztočiť koleso'} color={C.orange} onPress={spin} disabled={spinning} style={{ marginTop: 10 }} />
        )}
      </Felt>
    );
  } else if ((phase === 'bet' || phase === 'result') && q && spun) {
    const correctIdx = opts.indexOf(q.options[0]);
    const pct = bank > 0 ? Math.round((bet / bank) * 100) : 0;
    body = (
      <Felt>
        {topRow}
        <View style={s.banner}>
          <Text style={s.bannerTopic} numberOfLines={2}>
            {topicName(subject, spun.topic)}
          </Text>
          <Text style={s.bannerOdds}>
            {spun.sector.mult > 1 ? `násobič ×${spun.sector.mult} · ` : ''}
            {DIFF_NAME[q.diff]} ×{fmt(DIFF_ODDS[q.diff], 1)} · kurz ×{fmt(odds, 1)}
          </Text>
        </View>
        <View style={s.qCard}>
          <Text style={s.qText}>{q.q}</Text>
        </View>
        <View style={{ gap: 8, marginTop: 10 }}>
          {opts.map((o, i) => {
            const isPick = answer === i;
            const done = phase === 'result';
            let fill: string = C.sheet;
            if (!done && isPick) fill = C.mark;
            if (done && i === correctIdx) fill = '#CDE8D3';
            if (done && isPick && i !== correctIdx) fill = '#F2C9C3';
            return (
              <Press key={i} color={fill} depth={3} sound={!done} disabled={done && i !== correctIdx && !isPick} onPress={() => !done && setAnswer(i)} inner={s.opt}>
                <Text style={[s.optLetter, isPick && !done && { backgroundColor: C.ink, color: C.mark }]}>{LETTERS[i]}</Text>
                <Text style={s.optText}>{o}</Text>
                {done && i === correctIdx ? <Icon name="check" size={20} color={C.good} /> : null}
                {done && isPick && i !== correctIdx ? <Icon name="cross" size={20} color={C.bad} /> : null}
              </Press>
            );
          })}
        </View>

        <View style={s.zone} onLayout={onLay('zone')}>
          <View style={s.zoneTop} onLayout={onLay('zoneTop')}>
            <View style={s.spot} onLayout={onLay('spot')}>
              <Text style={s.spotLabel}>STÁVKA</Text>
              <View style={{ position: 'absolute', bottom: 18 }}>
                <ChipStack chips={stack} />
              </View>
            </View>
            <View style={{ flex: 1, minWidth: 0 }}>
              {phase === 'bet' ? (
                <>
                  <Text style={s.feltLabel}>Stávka</Text>
                  <Text style={s.betNum}>{bet}</Text>
                  <Text style={s.feltSmall}>{bet > 0 ? `${pct} % tvojho stavu` : 'zatiaľ nič'}</Text>
                  <Text style={[s.feltSmall, { color: C.yellow, marginTop: 4 }]}>možná výhra +{Math.round(bet * odds)}</Text>
                </>
              ) : last ? (
                <>
                  <Text style={[s.resTitle, { color: last.ok ? '#8FE0A8' : '#FF9C8F' }]}>{last.ok ? 'Správne' : 'Nesprávne'}</Text>
                  <Text style={s.betNum}>{last.ok ? `+${last.delta}` : `−${last.bet}`}</Text>
                  <Text style={s.feltSmall}>{last.ok ? `stávka ${last.bet} × kurz ${fmt(last.odds, 1)}` : 'stávka prepadla kasínu'}</Text>
                </>
              ) : null}
            </View>
          </View>

          {phase === 'bet' ? (
            <>
              <View style={s.chipRow} onLayout={onLay('row')}>
                {DENOMS.map((d, i) => (
                  <Pressable
                    key={d.v}
                    onLayout={onLay('c' + i)}
                    onPress={() => addChip(i)}
                    disabled={bet >= bank}
                    accessibilityLabel={`Pridať žetón ${d.v}`}
                    style={({ pressed }) => [s.chipBtn, { width: chipBtn, height: chipBtn, opacity: bet >= bank ? 0.45 : 1, transform: [{ scale: pressed ? 0.92 : 1 }] }]}
                  >
                    <Image source={d.src} style={{ width: chipBtn, height: chipBtn }} />
                    <Text style={[s.chipVal, { color: d.fg }]}>{d.v}</Text>
                  </Pressable>
                ))}
              </View>
              <View style={s.smallRow}>
                <GButton title="All-in" small color={C.yellow} light onPress={allIn} disabled={bet >= bank} style={{ flex: 1 }} />
                <GButton title="Zrušiť" small color={C.sheet} light onPress={clearBet} disabled={bet === 0} style={{ flex: 1 }} />
              </View>
              <Text style={s.hint}>{note || 'Stav veľa, len keď si istý. Keď tipuješ, stav minimum.'}</Text>
            </>
          ) : null}
        </View>

        {phase === 'bet' ? (
          <GButton
            title="Stavím"
            subtitle={answer === null ? 'Najprv vyber odpoveď' : bet === 0 ? 'Polož aspoň jeden žetón' : `${bet} na odpoveď ${LETTERS[answer]}`}
            color={C.orange}
            onPress={confirm}
            disabled={answer === null || bet === 0}
            style={{ marginTop: 14 }}
          />
        ) : (
          <>
            <View style={s.explain}>
              <Text style={s.explainHead}>Vysvetlenie</Text>
              <Text style={s.explainText}>{q.explain}</Text>
            </View>
            {bank <= 0 ? <Text style={[s.hint, { color: '#FFB3A8' }]}>Došli ti žetóny. Hra sa končí.</Text> : null}
            <GButton
              title={bank <= 0 || round >= ROUNDS ? 'Výsledky' : 'Ďalšie kolo'}
              icon="next"
              color={C.orange}
              onPress={next}
              style={{ marginTop: 14 }}
            />
          </>
        )}
        {flyLayer}
      </Felt>
    );
  } else if (phase === 'end') {
    body = <EndScreen logs={logs} bank={bank} prevBest={prevBest} onAgain={startGame} onExit={onExit} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Header title="Kasíno Istota" kicker={kicker} onBack={onExit} />
      {phase !== 'intro' && phase !== 'end' ? (
        <View style={s.goalRow}>
          <View style={{ flex: 1 }}>
            <Bar value={Math.min(1, bank / GOAL)} color={bank >= GOAL ? C.good : C.orange} />
          </View>
          <Text style={s.goalTxt}>
            {bank} / {GOAL}
          </Text>
        </View>
      ) : null}
      <ScrollView ref={scroll} contentContainerStyle={{ padding: 16, paddingTop: 8, paddingBottom: 40 }}>
        {body}
      </ScrollView>
      {party ? <Confetti key={party} top={140} /> : null}
    </View>
  );
}

function EndScreen({ logs, bank, prevBest, onAgain, onExit }: { logs: Log[]; bank: number; prevBest: number; onAgain: () => void; onExit: () => void }) {
  const good = logs.filter((l) => l.ok);
  const bad = logs.filter((l) => !l.ok);
  const avgPct = (ls: Log[]) => (ls.length ? ls.reduce((a, l) => a + l.bet / Math.max(1, l.bankBefore), 0) / ls.length : null);
  const avgBet = (ls: Log[]) => (ls.length ? Math.round(ls.reduce((a, l) => a + l.bet, 0) / ls.length) : 0);
  const pg = avgPct(good);
  const pb = avgPct(bad);
  const record = bank > prevBest;
  const won = bank >= GOAL;

  let verdict: string;
  if (pg === null) verdict = 'Žiadna správna odpoveď. Pred ďalšou hrou si zopakuj teóriu v Učebni.';
  else if (pb === null) verdict = 'Všetko správne. Ak si si bol istý, nabudúce kľudne stav viac.';
  else if (pg - pb >= 0.1) verdict = 'Dobrá kalibrácia: pri správnych odpovediach si stavil výrazne viac. Vieš odhadnúť, čo vieš.';
  else if (pb - pg >= 0.1) verdict = 'Najviac si stavil práve na zlé odpovede. Pozor na prehnanú istotu, tieto témy si zopakuj.';
  else verdict = 'Stávkoval si skoro rovnako bez ohľadu na to, či si vedel. Skús viac rozlišovať istotu od tipu.';

  const row = (label: string, ls: Log[], p: number | null, color: string) => (
    <View style={{ gap: 6 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
        <Text style={s.calLabel}>
          {label} ({ls.length})
        </Text>
        <Text style={s.calNum}>{p === null ? '—' : `${Math.round(p * 100)} %`}</Text>
      </View>
      <Bar value={p ?? 0} color={color} height={14} />
      <Text style={s.calSub}>{p === null ? 'žiadne také kolo' : `priemerne ${avgBet(ls)} žetónov zo stavu`}</Text>
    </View>
  );

  return (
    <View>
      <Felt>
        <Text style={s.feltLabel}>{bank <= 0 ? 'Bankrot' : won ? 'Cieľ splnený' : 'Konečný stav'}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 12, marginTop: 4 }}>
          <Text style={s.finalNum}>{bank}</Text>
          <Text style={[s.feltSmall, { marginBottom: 10 }]}>žetónov</Text>
        </View>
        <Text style={s.endLine}>
          {record ? `Nový rekord! Predtým ${prevBest}.` : `Rekord: ${prevBest}`} · správne {good.length} / {logs.length}
        </Text>
        <View style={s.dots}>
          {logs.map((l, i) => (
            <View key={i} style={[s.dot, { borderColor: l.ok ? '#8FE0A8' : '#FF9C8F' }]}>
              <Icon name={l.ok ? 'check' : 'cross'} size={14} color={l.ok ? '#8FE0A8' : '#FF9C8F'} />
              <Text style={s.dotTxt}>{Math.round((l.bet / Math.max(1, l.bankBefore)) * 100)}%</Text>
            </View>
          ))}
        </View>
      </Felt>
      {won || (record && bank > START) ? <Confetti top={60} /> : null}

      <View style={s.calCard}>
        <Text style={s.calHead}>Kalibrácia istoty</Text>
        <Text style={s.calIntro}>Koľko percent svojho stavu si priemerne stavil:</Text>
        <View style={{ gap: 14, marginTop: 12 }}>
          {row('Pri správnych odpovediach', good, pg, C.good)}
          {row('Pri zlých odpovediach', bad, pb, C.bad)}
        </View>
        <Text style={s.verdict}>{verdict}</Text>
      </View>

      <View style={{ gap: 12, marginTop: 16 }}>
        <GButton title="Hrať znova" icon="retry" color={C.orange} onPress={onAgain} />
        <GButton title="Späť" icon="back" color={C.sheet} light onPress={onExit} />
      </View>
      <Text style={s.fine}>Hrá sa len o virtuálne žetóny, nie o skutočné peniaze.</Text>
    </View>
  );
}

const s = StyleSheet.create({
  goalRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, paddingBottom: 4 },
  goalTxt: { fontFamily: F.mono, fontSize: 15, color: C.ink },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', gap: 8 },
  bank: { flexDirection: 'row', alignItems: 'flex-end', gap: 10 },
  house: { flexDirection: 'row', alignItems: 'flex-end', gap: 10 },
  feltLabel: { fontFamily: F.mono, fontSize: 12, letterSpacing: 1, color: 'rgba(243,240,230,0.75)', textTransform: 'uppercase' },
  feltSmall: { fontFamily: F.body, fontSize: 15, color: 'rgba(243,240,230,0.85)' },
  bankNum: { fontFamily: F.monoBold, fontSize: 26, color: CHALK },
  houseNum: { fontFamily: F.mono, fontSize: 15, color: C.yellow, marginTop: 2 },
  introTitle: { fontFamily: F.headX, fontSize: 28, color: CHALK, letterSpacing: -0.3 },
  ruleNum: { fontFamily: F.monoBold, fontSize: 18, color: C.yellow, width: 18 },
  rule: { flex: 1, fontFamily: F.body, fontSize: 18, lineHeight: 25, color: CHALK },
  introStats: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, marginTop: 18, paddingTop: 14, borderTopWidth: 1, borderTopColor: 'rgba(243,240,230,0.25)' },
  statNum: { fontFamily: F.monoBold, fontSize: 24, color: CHALK },
  fine: { fontFamily: F.body, fontSize: 13, color: C.dim, marginTop: 12, lineHeight: 18 },
  spunBox: { marginTop: 8, padding: 12, borderRadius: 8, backgroundColor: 'rgba(0,0,0,0.22)', borderWidth: 1, borderColor: 'rgba(243,240,230,0.25)' },
  spunTitle: { fontFamily: F.mono, fontSize: 14, color: C.yellow, textTransform: 'uppercase', letterSpacing: 0.8 },
  spunTopic: { fontFamily: F.head, fontSize: 22, color: CHALK, marginTop: 2 },
  banner: { marginTop: 14, paddingVertical: 8, borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'rgba(243,240,230,0.3)', borderStyle: 'dashed' },
  bannerTopic: { fontFamily: F.head, fontSize: 19, color: CHALK },
  bannerOdds: { fontFamily: F.mono, fontSize: 14, color: C.yellow, marginTop: 2 },
  qCard: { marginTop: 12, backgroundColor: C.sheet, borderRadius: 8, borderWidth: 2, borderColor: C.ink, padding: 14 },
  qText: { fontFamily: F.bodyMed, fontSize: 17, lineHeight: 24, color: C.ink },
  opt: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10, paddingHorizontal: 12, minHeight: 48 },
  optLetter: { fontFamily: F.monoBold, fontSize: 15, color: C.ink, width: 26, height: 26, lineHeight: 24, textAlign: 'center', borderWidth: 1.5, borderColor: C.ink, borderRadius: 13, overflow: 'hidden' },
  optText: { flex: 1, fontFamily: F.body, fontSize: 16, lineHeight: 22, color: C.ink },
  zone: { marginTop: 16, padding: 12, borderRadius: 12, borderWidth: 1.5, borderColor: 'rgba(243,240,230,0.35)', backgroundColor: 'rgba(0,0,0,0.12)' },
  zoneTop: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  spot: { width: 112, height: 112, borderRadius: 56, borderWidth: 2, borderStyle: 'dashed', borderColor: 'rgba(243,240,230,0.55)', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: FELT_DARK },
  spotLabel: { fontFamily: F.mono, fontSize: 11, letterSpacing: 1.2, color: 'rgba(243,240,230,0.6)', marginTop: 8 },
  betNum: { fontFamily: F.monoBold, fontSize: 32, color: CHALK },
  resTitle: { fontFamily: F.head, fontSize: 20 },
  chipRow: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6, marginTop: 14, width: '100%', maxWidth: 340, alignSelf: 'center' },
  chipBtn: { alignItems: 'center', justifyContent: 'center' },
  chipVal: { position: 'absolute', fontFamily: F.monoBold, fontSize: 15 },
  smallRow: { flexDirection: 'row', gap: 10, marginTop: 12 },
  hint: { fontFamily: F.body, fontSize: 15, color: 'rgba(243,240,230,0.85)', marginTop: 10, lineHeight: 21 },
  explain: { marginTop: 14, backgroundColor: C.sheet, borderRadius: 8, borderWidth: 2, borderColor: C.ink, padding: 14 },
  explainHead: { fontFamily: F.mono, fontSize: 12, color: C.orange, letterSpacing: 1, textTransform: 'uppercase' },
  explainText: { fontFamily: F.body, fontSize: 16, lineHeight: 23, color: C.ink, marginTop: 4 },
  finalNum: { fontFamily: F.monoBold, fontSize: 56, color: CHALK, lineHeight: 64 },
  endLine: { fontFamily: F.body, fontSize: 16, color: CHALK, marginTop: 4 },
  dots: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 14 },
  dot: { flexDirection: 'row', alignItems: 'center', gap: 3, borderWidth: 1.5, borderRadius: 6, paddingHorizontal: 6, paddingVertical: 4, minWidth: 64 },
  dotTxt: { fontFamily: F.mono, fontSize: 13, color: CHALK },
  calCard: { marginTop: 16, backgroundColor: C.sheet, borderWidth: 1.5, borderColor: C.ink, borderRadius: 8, padding: 16 },
  calHead: { fontFamily: F.head, fontSize: 21, color: C.ink },
  calIntro: { fontFamily: F.body, fontSize: 15, color: C.ink2, marginTop: 2 },
  calLabel: { fontFamily: F.bodyMed, fontSize: 16, color: C.ink, flexShrink: 1 },
  calNum: { fontFamily: F.monoBold, fontSize: 16, color: C.ink },
  calSub: { fontFamily: F.body, fontSize: 14, color: C.ink2 },
  verdict: { fontFamily: F.bodyMed, fontSize: 16, lineHeight: 23, color: C.ink, marginTop: 14, paddingTop: 12, borderTopWidth: 1, borderTopColor: C.rule },
});
