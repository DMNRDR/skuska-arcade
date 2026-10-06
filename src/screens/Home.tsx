import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';
import { Bar, C, F, haptic, Icon, IconName, Press, SPRITES } from '../components/ui';
import { countGenerators, countQuestions, questionsByIds, SUBJECTS, TOPICS } from '../data';
import { STEPS } from '../data/steps';
import { GameId } from '../games/types';
import { isMuted, onMutedChange, setMuted } from '../sound';
import { levelInfo, Progress } from '../storage';
import { SubjectId } from '../types';
import { GameConfig } from './Game';
import { SUBJ_COLOR } from './Learn';

export default function Home({
  progress,
  subject,
  setSubject,
  onCampaign,
  onLearn,
  onPlay,
  onGame,
}: {
  progress: Progress;
  subject: SubjectId;
  setSubject: (s: SubjectId) => void;
  onCampaign: () => void;
  onLearn: (topic?: string) => void;
  onPlay: (c: GameConfig) => void;
  onGame: (g: GameId) => void;
}) {
  const subj = SUBJECTS[subject];
  const color = SUBJ_COLOR[subject];
  const lv = levelInfo(progress.xp);
  const topics = TOPICS[subject];
  const starsGot = topics.reduce((a, t) => a + (progress.stars[`${subject}:${t.id}`] ?? 0), 0);
  const missed = questionsByIds(progress.missed, subject).length;
  const [muted, setM] = useState(isMuted());
  useEffect(() => onMutedChange(setM), []);

  // téma, na ktorej študent skončil (prvá rozrobená, inak prvá neprečítaná)
  const status = topics.map((t) => {
    const k = `${subject}:${t.id}`;
    const n = STEPS[k]?.length ?? 0;
    return { t, n, done: Math.min(progress.learned[k] ?? 0, n) };
  });
  const cont = status.find((x) => x.done > 0 && x.done < x.n) ?? status.find((x) => x.done === 0) ?? status[0];
  const best = (g: GameId) => progress.gameBest?.[`${g}:${subject}`] ?? 0;

  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 18, paddingTop: 16, paddingBottom: 40, gap: 22 }}>
      {/* hlavička */}
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <View style={{ flex: 1 }}>
          <Text style={s.word}>Skúška</Text>
          <Text style={s.sub}>Mata 1 a Fyzika 1 · STU SvF · ZS 2026/27</Text>
        </View>
        <Pressable onPress={() => setMuted(!muted)} hitSlop={10} style={s.iconBtn} accessibilityLabel={muted ? 'Zapnúť zvuk' : 'Vypnúť zvuk'}>
          <Icon name={muted ? 'soundOff' : 'soundOn'} size={22} />
        </Pressable>
      </View>

      <View style={{ gap: 6 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Text style={s.level}>
            Level {lv.level} · {lv.rank}
          </Text>
          <Text style={s.mono}>
            {lv.into}/{lv.need} XP
          </Text>
        </View>
        <Bar value={lv.into / lv.need} color={C.ink} height={10} />
      </View>

      {/* predmet ako záložky v zošite */}
      <View style={s.tabs}>
        {(['mat', 'fyz'] as SubjectId[]).map((id) => {
          const on = id === subject;
          return (
            <Pressable
              key={id}
              onPress={() => {
                haptic('tap');
                setSubject(id);
              }}
              style={[s.tab, on && { backgroundColor: SUBJ_COLOR[id], borderBottomColor: SUBJ_COLOR[id] }]}
            >
              <Text style={[s.tabText, on && { color: '#fff' }]}>{SUBJECTS[id].name}</Text>
            </Pressable>
          );
        })}
      </View>

      {/* Učebňa */}
      <View style={{ gap: 10 }}>
        <Text style={s.section}>Učebňa</Text>
        <Press color={color} onPress={() => onLearn(cont.t.id)} inner={{ padding: 18, gap: 6 }}>
          <Text style={[s.mono, { color: '#fff', opacity: 0.9 }]}>{cont.done > 0 ? `POKRAČUJ · KROK ${cont.done}/${cont.n}` : 'ZAČNI TU'}</Text>
          <Text style={s.bigBtn}>{cont.t.name}</Text>
          <Text style={[s.small, { color: '#fff' }]}>Krátke obrazovky, pokusy na dotyk, otázka po každej časti.</Text>
        </Press>
        <Pressable onPress={() => onLearn()} style={({ pressed }) => [s.link, pressed && { opacity: 0.6 }]}>
          <Text style={s.linkText}>Všetky témy ({topics.length})</Text>
          <Icon name="next" size={16} />
        </Pressable>
      </View>

      {/* Hry */}
      <View style={{ gap: 12 }}>
        <Text style={s.section}>Hry na precvičenie</Text>
        <GameRow art={<DroneArt />} title="Dron geodet" text="Zameriavaš body, letíš zadaním vektora. Dlhý let vybije batériu." best={best('dron')} onPress={() => onGame('dron')} />
        <GameRow
          art={<Image source={SPRITES.chip.red} style={{ width: 54, height: 54 }} />}
          title="Kasíno Istota"
          text="Roztoč ruletu, odpovedz a stav žetóny podľa toho, ako si istý."
          best={best('kasino')}
          onPress={() => onGame('kasino')}
        />
        <GameRow
          art={
            <View style={{ flexDirection: 'row' }}>
              <Image source={SPRITES.die[4]} style={{ width: 40, height: 40, transform: [{ rotate: '-10deg' }] }} />
              <Image source={SPRITES.pawn.blue} style={{ width: 30, height: 30, marginLeft: -8, marginTop: 14 }} />
            </View>
          }
          title="Cesta na skúšku"
          text="Stolová hra proti spolužiakovi. Kocka, políčka a otázka na každom."
          best={best('hra')}
          onPress={() => onGame('hra')}
        />
      </View>

      {/* Rýchle kvízy */}
      <View style={{ gap: 2 }}>
        <Text style={[s.section, { marginBottom: 6 }]}>Rýchle kvízy</Text>
        <QuizRow icon="star" title="Kampaň" meta={`${topics.length} levelov · ${starsGot}/${topics.length * 3} hviezd`} onPress={onCampaign} />
        <QuizRow icon="target" title="Meteorový dážď" meta={`60 s na čo najviac odpovedí · rekord ${progress.arcadeBest[subject] ?? 0}`} onPress={() => onPlay({ mode: 'arcade', subject, title: `Meteorový dážď · ${subj.short}` })} />
        <QuizRow icon="medal" title={`Boss: ${subj.boss}`} meta={`2000 HP · porazený ${progress.bossWins[subject] ?? 0}×`} onPress={() => onPlay({ mode: 'boss', subject, title: `Boss · ${subj.boss}` })} />
        <QuizRow
          icon="retry"
          title="Tréning chýb"
          meta={missed ? `${missed} otázok, ktoré si pokazil` : 'zatiaľ žiadne chyby'}
          disabled={!missed}
          onPress={() => onPlay({ mode: 'review', subject, title: `Tréning chýb · ${subj.short}` })}
        />
      </View>

      <Text style={s.foot}>
        {countQuestions(subject)} otázok + {countGenerators(subject)} generátorov príkladov.{' '}
        {subject === 'fyz' ? 'Zdroj: prednáška OsnovaSodpovedamiV3 a zoznam príkladov z cvičení.' : 'Zdroj: tematický plán prednášok z Matematiky 1.'} Zvuky, ikony a herné prvky: Kenney.nl (CC0). Písma: Bricolage Grotesque, Source Sans 3, JetBrains Mono (OFL).
      </Text>
    </ScrollView>
  );
}

function GameRow({ art, title, text, best, onPress }: { art: React.ReactNode; title: string; text: string; best: number; onPress: () => void }) {
  return (
    <Press onPress={onPress} inner={{ flexDirection: 'row', alignItems: 'center', gap: 14, padding: 12 }}>
      <View style={{ width: 64, height: 64, alignItems: 'center', justifyContent: 'center', backgroundColor: C.paper2, borderRadius: 6 }}>{art}</View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={s.gameTitle}>{title}</Text>
        <Text style={s.small}>{text}</Text>
        {best > 0 && <Text style={s.mono}>rekord {best}</Text>}
      </View>
    </Press>
  );
}

function QuizRow({ icon, title, meta, onPress, disabled }: { icon: IconName; title: string; meta: string; onPress: () => void; disabled?: boolean }) {
  return (
    <Pressable
      disabled={disabled}
      onPress={() => {
        haptic('tap');
        onPress();
      }}
      style={({ pressed }) => [s.qrow, { opacity: disabled ? 0.4 : pressed ? 0.6 : 1 }]}
    >
      <Icon name={icon} size={22} />
      <View style={{ flex: 1 }}>
        <Text style={s.qTitle}>{title}</Text>
        <Text style={s.mono}>{meta}</Text>
      </View>
      <Icon name="next" size={16} color={C.ink2} />
    </Pressable>
  );
}

/** Dron zhora (vlastná kresba). */
function DroneArt() {
  return (
    <Svg width={56} height={56} viewBox="0 0 56 56">
      <Line x1={12} y1={12} x2={44} y2={44} stroke={C.ink} strokeWidth={4} />
      <Line x1={44} y1={12} x2={12} y2={44} stroke={C.ink} strokeWidth={4} />
      {[
        [12, 12],
        [44, 12],
        [12, 44],
        [44, 44],
      ].map(([x, y]) => (
        <Circle key={`${x}${y}`} cx={x} cy={y} r={9} fill={C.sheet} stroke={C.ink} strokeWidth={2} />
      ))}
      <Rect x={20} y={20} width={16} height={16} rx={3} fill={C.orange} stroke={C.ink} strokeWidth={2} />
      <Path d="M24 28 L32 28" stroke={C.ink} strokeWidth={2} />
    </Svg>
  );
}

const s = StyleSheet.create({
  word: { fontFamily: F.headX, fontSize: 46, lineHeight: 50, color: C.ink, letterSpacing: -1.5 },
  sub: { fontFamily: F.mono, fontSize: 12, color: C.ink2, marginTop: 2 },
  iconBtn: { width: 44, height: 44, borderRadius: 8, borderWidth: 2, borderColor: C.ink, backgroundColor: C.sheet, alignItems: 'center', justifyContent: 'center' },
  level: { fontFamily: F.bodyBold, fontSize: 17, color: C.ink },
  mono: { fontFamily: F.mono, fontSize: 12, color: C.ink2 },
  tabs: { flexDirection: 'row', gap: 6, borderBottomWidth: 2, borderBottomColor: C.ink },
  tab: { paddingHorizontal: 16, paddingVertical: 10, borderWidth: 2, borderBottomWidth: 0, borderColor: C.ink, borderTopLeftRadius: 8, borderTopRightRadius: 8, backgroundColor: C.sheet, marginBottom: -2 },
  tabText: { fontFamily: F.head, fontSize: 17, color: C.ink },
  section: { fontFamily: F.monoBold, fontSize: 12, letterSpacing: 1.6, color: C.ink2, textTransform: 'uppercase' },
  bigBtn: { fontFamily: F.headX, fontSize: 28, lineHeight: 32, color: '#fff' },
  small: { fontFamily: F.body, fontSize: 15, lineHeight: 20, color: C.ink2 },
  link: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', paddingVertical: 6 },
  linkText: { fontFamily: F.bodyBold, fontSize: 16, color: C.ink, textDecorationLine: 'underline' },
  gameTitle: { fontFamily: F.head, fontSize: 19, color: C.ink },
  qrow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 12, borderBottomWidth: 1.5, borderBottomColor: C.rule },
  qTitle: { fontFamily: F.bodyBold, fontSize: 17, color: C.ink },
  foot: { fontFamily: F.body, fontSize: 13, lineHeight: 18, color: C.ink2 },
});
