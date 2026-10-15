import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Bar, C, F, GButton, haptic, Header } from '../components/ui';
import { Teza, TEZY, TEZY_SECTIONS } from '../data/dg-tezy';
import { DgPic, Rysovacka } from '../learn/widgets/deskriptiva';
import { shuffle } from '../util';

// Tézy na 1. písomku z deskriptívy: prehľad otázok so vzorovými odpoveďami a skúšanie
// (odpovieš sám, odkryješ vzor, označíš vedel / nevedel; nevedené sa vrátia na koniec).

const COLOR = C.teal;
type Filter = 'teoria' | 'rys' | 'vsetko';

export default function Tezy({ onBack, onXp }: { onBack: () => void; onXp: (xp: number) => void }) {
  const [mode, setMode] = useState<'prehlad' | 'skusanie'>('prehlad');
  return (
    <View style={{ flex: 1 }}>
      <Header kicker="Metódy zobrazovania" title="Tézy 1. písomky" onBack={onBack} />
      <View style={s.modes}>
        {(['prehlad', 'skusanie'] as const).map((m) => (
          <Pressable
            key={m}
            onPress={() => {
              haptic('tap');
              setMode(m);
            }}
            style={[s.mode, mode === m && s.modeOn]}
          >
            <Text style={[s.modeText, mode === m && { color: '#fff' }]}>{m === 'prehlad' ? 'Prehľad a vysvetlenie' : 'Skúšanie'}</Text>
          </Pressable>
        ))}
      </View>
      {mode === 'prehlad' ? <Prehlad /> : <Skusanie onXp={onXp} />}
    </View>
  );
}

function Answer({ t }: { t: Teza }) {
  return (
    <View style={{ gap: 12 }}>
      {t.a.split('\n').map((p, i) => (
        <Text key={i} style={s.body}>
          {p}
        </Text>
      ))}
      {t.rys ? <Rysovacka id={t.rys} /> : t.pic ? <DgPic id={t.pic} /> : null}
    </View>
  );
}

function Tag({ draw }: { draw?: boolean }) {
  return <Text style={[s.tag, { color: draw ? C.orange : COLOR, borderColor: draw ? C.orange : COLOR }]}>{draw ? 'RYSOVANIE' : 'TEÓRIA'}</Text>;
}

function Prehlad() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 48, gap: 10 }}>
      <Text style={s.lead}>Všetky otázky z dokumentu od učiteľky („1T – Okruh otázok“), čísla sedia s dokumentom. Ťukni na otázku a uvidíš vzorovú odpoveď a obrázok. Pri rysovaní si konštrukciu odkrývaš krok po kroku.</Text>
      {TEZY_SECTIONS.map((sec) => (
        <View key={sec} style={{ gap: 8 }}>
          <Text style={s.section}>{sec}</Text>
          {TEZY.filter((t) => t.sec === sec).map((t) => {
            const on = open === t.id;
            return (
              <View key={t.id} style={[s.card, on && { borderColor: COLOR }]}>
                <Pressable
                  onPress={() => {
                    haptic('tap');
                    setOpen(on ? null : t.id);
                  }}
                  style={{ gap: 6 }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={s.num}>{t.n}.</Text>
                    <Tag draw={t.draw} />
                    <Text style={[s.meta, { marginLeft: 'auto' }]}>{on ? 'skryť' : 'ukáž odpoveď'}</Text>
                  </View>
                  <Text style={s.q}>{t.q}</Text>
                </Pressable>
                {on && (
                  <View style={{ marginTop: 10 }}>
                    <Answer t={t} />
                  </View>
                )}
              </View>
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
}

function Skusanie({ onXp }: { onXp: (xp: number) => void }) {
  const [filter, setFilter] = useState<Filter>('teoria');
  const [queue, setQueue] = useState<Teza[] | null>(null);
  const [total, setTotal] = useState(0);
  const [shown, setShown] = useState(false);
  const [firstTry, setFirstTry] = useState<Set<string>>(new Set());
  const [missed, setMissed] = useState<Set<string>>(new Set());

  const pool = useMemo(() => TEZY.filter((t) => (filter === 'vsetko' ? true : filter === 'rys' ? t.draw : !t.draw)), [filter]);

  const start = (items: Teza[]) => {
    setQueue(shuffle(items));
    setTotal(items.length);
    setShown(false);
    setFirstTry(new Set());
    setMissed(new Set());
  };

  if (!queue) {
    return (
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: 48 }}>
        <Text style={s.lead}>Dostaneš otázku z téz. Odpovedz nahlas alebo na papier (pri rysovaní narysuj), potom si odkry vzorovú odpoveď a úprimne označ, či si ju vedel. Čo nevieš, vráti sa na koniec.</Text>
        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
          {(
            [
              ['teoria', 'Teória'],
              ['rys', 'Rysovanie'],
              ['vsetko', 'Všetko'],
            ] as [Filter, string][]
          ).map(([f, l]) => (
            <Pressable key={f} onPress={() => setFilter(f)} style={[s.chip, filter === f && s.chipOn]}>
              <Text style={[s.chipText, filter === f && { color: '#fff' }]}>{l}</Text>
            </Pressable>
          ))}
        </View>
        <Text style={s.meta}>{pool.length} otázok</Text>
        <GButton icon="target" color={COLOR} title="Začni skúšanie" subtitle="Náhodné poradie" onPress={() => start(pool)} />
      </ScrollView>
    );
  }

  if (!queue.length) {
    const known = firstTry.size;
    const wrong = TEZY.filter((t) => missed.has(t.id));
    return (
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: 48 }}>
        <Text style={s.big}>
          Napoprvé si vedel {known} z {total}
        </Text>
        <Bar value={total ? known / total : 0} color={COLOR} height={12} />
        {wrong.length > 0 ? (
          <>
            <Text style={s.section}>Tieto si zopakuj</Text>
            {wrong.map((t) => (
              <Text key={t.id} style={s.body}>
                {t.sec}, {t.n}. {t.q}
              </Text>
            ))}
            <GButton icon="retry" color={C.orange} title="Skúšaj len tieto" onPress={() => start(wrong)} />
          </>
        ) : (
          <Text style={s.lead}>Všetko napoprvé. Si pripravený.</Text>
        )}
        <GButton icon="next" light color={C.sheet} title="Nové skúšanie" onPress={() => setQueue(null)} />
      </ScrollView>
    );
  }

  const t = queue[0];
  const done = total - new Set(queue.map((x) => x.id)).size;
  const answer = (knew: boolean) => {
    haptic(knew ? 'ok' : 'bad');
    if (knew) {
      if (!missed.has(t.id)) {
        setFirstTry(new Set(firstTry).add(t.id));
        onXp(3);
      }
      setQueue(queue.slice(1));
    } else {
      setMissed(new Set(missed).add(t.id));
      setQueue([...queue.slice(1), t]);
    }
    setShown(false);
  };

  return (
    <ScrollView key={t.id + queue.length} contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: 48 }}>
      <View style={{ gap: 6 }}>
        <Text style={s.meta}>
          Hotovo {done} z {total}
        </Text>
        <Bar value={total ? done / total : 0} color={COLOR} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Text style={s.section}>
          {t.sec} · {t.n}.
        </Text>
        <Tag draw={t.draw} />
      </View>
      <Text style={s.big}>{t.q}</Text>
      {!shown ? (
        <>
          <Text style={s.lead}>{t.draw ? 'Narysuj to na papier a povedz si postup.' : 'Odpovedz nahlas alebo si to napíš.'}</Text>
          <GButton icon="info" color={COLOR} title="Ukáž odpoveď" onPress={() => setShown(true)} />
        </>
      ) : (
        <>
          <View style={[s.card, { borderColor: COLOR }]}>
            <Answer t={t} />
          </View>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <View style={{ flex: 1 }}>
              <GButton color={C.good} title="Vedel som" onPress={() => answer(true)} />
            </View>
            <View style={{ flex: 1 }}>
              <GButton color={C.bad} title="Nevedel som" onPress={() => answer(false)} />
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  modes: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, paddingBottom: 8 },
  mode: { flex: 1, paddingVertical: 10, borderRadius: 8, borderWidth: 2, borderColor: C.ink, backgroundColor: C.sheet, alignItems: 'center' },
  modeOn: { backgroundColor: COLOR, borderColor: COLOR },
  modeText: { fontFamily: F.bodyBold, fontSize: 15, color: C.ink },
  lead: { fontFamily: F.body, fontSize: 17, lineHeight: 24, color: C.ink2 },
  body: { fontFamily: F.body, fontSize: 18, lineHeight: 26, color: C.ink },
  big: { fontFamily: F.head, fontSize: 22, lineHeight: 28, color: C.ink },
  q: { fontFamily: F.bodyMed, fontSize: 17, lineHeight: 24, color: C.ink },
  num: { fontFamily: F.monoBold, fontSize: 14, color: C.ink },
  meta: { fontFamily: F.mono, fontSize: 12, color: C.ink2 },
  section: { fontFamily: F.monoBold, fontSize: 12, letterSpacing: 1.4, color: C.ink2, textTransform: 'uppercase', marginTop: 6 },
  tag: { fontFamily: F.monoBold, fontSize: 10, letterSpacing: 1, borderWidth: 1.5, borderRadius: 4, paddingHorizontal: 5, paddingVertical: 1 },
  card: { backgroundColor: C.sheet, borderWidth: 2, borderColor: C.rule, borderRadius: 8, padding: 12 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, borderWidth: 2, borderColor: C.ink, backgroundColor: C.sheet },
  chipOn: { backgroundColor: C.ink },
  chipText: { fontFamily: F.bodyBold, fontSize: 15, color: C.ink },
});
