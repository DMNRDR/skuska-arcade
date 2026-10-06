import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Figure } from '../components/figures';
import { C, Confetti, F, haptic, Icon, ND, Press } from '../components/ui';
import type { Check, Formula, Worked } from '../data/steps';
import { play } from '../sound';
import { shuffle } from '../util';
import { Stamp } from './kit';
import { WIDGETS } from './registry';
import { Slide } from './slides';

// Prehrávač lekcie: jedna obrazovka = jedna myšlienka. Hlavné tlačidlo "Ďalej" funguje
// ako klikacia prezentácia: pri riešenom príklade najprv odkrýva kroky, potom ide ďalej.

export default function Player({
  slides,
  title,
  color,
  start = 0,
  onClose,
  onDone,
  onStep,
  onXp,
}: {
  slides: Slide[];
  title: string;
  color: string;
  start?: number;
  onClose: () => void;
  onDone: () => void;
  onStep: (step: number) => void;
  onXp: (xp: number) => void;
}) {
  const [i, setI] = useState(Math.min(start, slides.length - 1));
  const [rev, setRev] = useState(0);
  const [party, setParty] = useState(0);
  const [dir, setDir] = useState(1);
  const scroll = useRef<ScrollView>(null);
  const sl = slides[i];
  const steps = useMemo(() => [...new Set(slides.map((s) => s.step))], [slides]);
  const stepCount = steps.length;

  const revTotal = sl.kind === 'worked' ? sl.worked.steps.length + 1 : sl.kind === 'deeper' ? sl.text.split(/\n\s*\n/).length : 0;
  const needReveal = rev < revTotal;

  useEffect(() => {
    onStep(sl.step + 1);
    scroll.current?.scrollTo({ y: 0, animated: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i]);

  const go = (to: number) => {
    if (to < 0) return;
    if (to >= slides.length) {
      onDone();
      return;
    }
    setDir(to > i ? 1 : -1);
    setI(to);
    setRev(0);
    play('pop');
  };
  const next = () => {
    if (needReveal) {
      setRev(rev + 1);
      play('tick');
      setTimeout(() => scroll.current?.scrollToEnd({ animated: true }), 60);
      return;
    }
    go(i + 1);
  };
  const prev = () => go(i - 1);
  const win = (xp: number) => {
    setParty((p) => p + 1);
    onXp(xp);
  };

  // klávesnica na webe: šípky a medzerník
  const keys = useRef({ next, prev });
  keys.current = { next, prev };
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;
    const h = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') keys.current.next();
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') keys.current.prev();
      else return;
      e.preventDefault();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  const label =
    sl.kind === 'worked' && needReveal
      ? rev === 0
        ? 'Ukáž 1. krok'
        : rev === revTotal - 1
          ? 'Ukáž výsledok'
          : 'Ďalší krok'
      : sl.kind === 'deeper' && needReveal
        ? 'Vysvetli'
        : i === slides.length - 1
          ? 'Dokončiť lekciu'
          : 'Ďalej';

  const stepIdx = steps.indexOf(sl.step);

  return (
    <View style={{ flex: 1 }}>
      {party > 0 && <Confetti key={party} top={60} />}
      {/* hlavička: zavrieť, téma, pravítko krokov */}
      <View style={{ paddingHorizontal: 16, paddingTop: 10, gap: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Pressable onPress={onClose} hitSlop={12} style={s.close} accessibilityLabel="Zavrieť lekciu">
            <Icon name="cross" size={16} />
          </Pressable>
          <View style={{ flex: 1 }}>
            <Text style={s.kicker} numberOfLines={1}>
              {title}
            </Text>
            <Text style={s.stepTitle} numberOfLines={1}>
              {stepIdx + 1}/{stepCount} · {sl.stepTitle}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 3 }}>
          {steps.map((st, k) => {
            const firstSlide = slides.findIndex((x) => x.step === st);
            const done = k < stepIdx;
            const cur = k === stepIdx;
            return (
              <Pressable
                key={st}
                onPress={() => go(firstSlide)}
                hitSlop={{ top: 10, bottom: 10 }}
                style={{ flex: 1, height: 8, borderWidth: 1.5, borderColor: C.ink, borderRadius: 2, backgroundColor: done ? C.ink : cur ? color : C.sheet }}
              />
            );
          })}
        </View>
      </View>

      <ScrollView ref={scroll} style={{ flex: 1 }} contentContainerStyle={{ padding: 18, paddingTop: 16, paddingBottom: 30 }} keyboardShouldPersistTaps="handled">
        <SlideIn key={i} dir={dir}>
          <SlideBody sl={sl} rev={rev} color={color} onWin={win} />
        </SlideIn>
      </ScrollView>

      <View style={s.nav}>
        <Press onPress={prev} disabled={i === 0} inner={s.navBack} sound={false}>
          <Icon name="prev" size={20} />
        </Press>
        <Press onPress={next} color={needReveal ? C.yellow : color} style={{ flex: 1 }} inner={s.navNext} sound={false}>
          <Text style={[s.navText, { color: needReveal ? C.ink : '#fff' }]}>{label}</Text>
          <Icon name="next" size={20} color={needReveal ? C.ink : '#fff'} />
        </Press>
      </View>
    </View>
  );
}

function SlideIn({ children, dir }: { children: React.ReactNode; dir: number }) {
  const a = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(a, { toValue: 1, duration: 260, easing: Easing.out(Easing.cubic), useNativeDriver: ND }).start();
  }, [a]);
  return (
    <Animated.View style={{ opacity: a, transform: [{ translateX: a.interpolate({ inputRange: [0, 1], outputRange: [dir * 36, 0] }) }] }}>{children}</Animated.View>
  );
}

function SlideBody({ sl, rev, color, onWin }: { sl: Slide; rev: number; color: string; onWin: (xp: number) => void }) {
  const head = sl.first ? <Text style={s.h}>{sl.stepTitle}</Text> : null;
  switch (sl.kind) {
    case 'text':
      return (
        <View style={{ gap: 18 }}>
          {head}
          <Marked text={sl.text} />
          {sl.fig ? <Figure fig={sl.fig} /> : null}
        </View>
      );
    case 'fig':
      return (
        <View style={{ gap: 14 }}>
          {head}
          <Text style={s.label}>Obrázok · ťukaj na prepínače</Text>
          <Figure fig={sl.fig} />
        </View>
      );
    case 'widget': {
      const W = WIDGETS[sl.id];
      if (!W) return null;
      return (
        <View style={{ gap: 12 }}>
          <Text style={[s.label, W.boss && { color: C.bad }]}>{W.boss ? 'Boss' : 'Na dotyk'}</Text>
          <Text style={s.h}>{W.title}</Text>
          <Text style={s.lead}>{W.lead}</Text>
          <W.C onWin={() => onWin(W.boss ? 40 : 15)} />
        </View>
      );
    }
    case 'analogy':
      return (
        <View style={{ gap: 14 }}>
          {head}
          <View style={s.note}>
            <Text style={[s.label, { color: C.ink2 }]}>Predstav si</Text>
            <Text style={[s.body, { fontSize: 20, lineHeight: 30 }]}>{sl.text}</Text>
          </View>
        </View>
      );
    case 'formula':
      return <FormulaSlide f={sl.formula} color={color} head={head} />;
    case 'deeper': {
      const paras = sl.text.split(/\n\s*\n/);
      return (
        <View style={{ gap: 14 }}>
          <Text style={s.label}>Prečo to platí?</Text>
          <Text style={s.h}>{sl.stepTitle}: odkiaľ to je</Text>
          <Text style={s.lead}>Pre zvedavých. Ťukaj na žlté tlačidlo dole a odvodenie sa odkryje po kúskoch.</Text>
          {paras.slice(0, rev).map((p, k) => (
            <SlideIn key={k} dir={0}>
              <Text style={s.body}>{p.trim()}</Text>
            </SlideIn>
          ))}
        </View>
      );
    }
    case 'worked':
      return <WorkedSlide w={sl.worked} rev={rev} color={color} />;
    case 'check':
      return <CheckSlide c={sl.check} color={color} onWin={() => onWin(5)} />;
    case 'bullets':
      return <BulletsSlide items={sl.items} head={head} onWin={() => onWin(5)} />;
  }
}

/** Text so zvýraznenými slovami PÍSANÝMI VEĽKÝM (dôležité pojmy v lekciách). */
function Marked({ text }: { text: string }) {
  const parts = text.split(/(\b[A-ZÁÄČĎÉÍĹĽŇÓÔŔŠŤÚÝŽ]{3,}(?:\s+[A-ZÁÄČĎÉÍĹĽŇÓÔŔŠŤÚÝŽ]{2,})*\b)/);
  return (
    <Text style={s.body}>
      {parts.map((p, k) =>
        k % 2 === 1 ? (
          <Text key={k} style={{ backgroundColor: C.mark, fontFamily: F.bodyBold }}>
            {p}
          </Text>
        ) : (
          <Text key={k}>{p}</Text>
        ),
      )}
    </Text>
  );
}

/** Vzorec: ťukaj na symboly, každý sa vysvetlí a rozsvieti vo vzorci. */
function FormulaSlide({ f, color, head }: { f: Formula; color: string; head: React.ReactNode }) {
  const vars = f.vars ?? [];
  const [sel, setSel] = useState<number | null>(null);
  const [seen, setSeen] = useState<Set<number>>(new Set());
  const sym = sel !== null ? vars[sel][0] : null;
  // časti symbolu, ktoré sa dajú nájsť vo vzorci (napr. "A = [a₁, a₂, a₃]" → "A")
  const needle = sym ? (f.f.includes(sym) ? sym : sym.split(/\s*[=,(]\s*/)[0].trim()) : null;
  const lines = f.f.split(/\s{3,}/);
  const all = vars.length > 0 && seen.size === vars.length;
  return (
    <View style={{ gap: 14 }}>
      {head}
      <Text style={s.label}>Vzorec · {f.what}</Text>
      <View style={s.formula}>
        {lines.map((line, k) => {
          const pieces = needle && needle.length > 0 && line.includes(needle) ? line.split(needle) : [line];
          return (
            <Text key={k} style={s.formulaText}>
              {pieces.map((p, j) => (
                <React.Fragment key={j}>
                  {j > 0 && <Text style={{ backgroundColor: C.mark, color: C.ink }}>{needle}</Text>}
                  {p}
                </React.Fragment>
              ))}
            </Text>
          );
        })}
      </View>
      {vars.length > 0 && (
        <>
          <Text style={s.lead}>Ťukni na každý symbol a zisti, čo znamená ({seen.size}/{vars.length}).</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {vars.map(([v], k) => {
              const on = sel === k;
              const was = seen.has(k);
              return (
                <Pressable
                  key={k}
                  onPress={() => {
                    haptic('tap');
                    setSel(k);
                    setSeen(new Set([...seen, k]));
                  }}
                  style={({ pressed }) => [
                    s.sym,
                    { backgroundColor: on ? color : was ? C.paper2 : C.sheet, transform: [{ translateY: pressed ? 2 : 0 }] },
                  ]}
                >
                  <Text style={{ fontFamily: F.monoBold, fontSize: 17, color: on ? '#fff' : C.ink }}>{v}</Text>
                </Pressable>
              );
            })}
          </View>
          {sel !== null && (
            <SlideIn key={sel} dir={0}>
              <View style={s.meaning}>
                <Text style={{ fontFamily: F.monoBold, fontSize: 18, color }}>{vars[sel][0]}</Text>
                <Text style={[s.body, { fontSize: 19 }]}>{vars[sel][1]}</Text>
              </View>
            </SlideIn>
          )}
          <Stamp show={all} text="ROZUMIEM" color={C.teal} />
        </>
      )}
    </View>
  );
}

function WorkedSlide({ w, rev, color }: { w: Worked; rev: number; color: string }) {
  const shown = Math.min(rev, w.steps.length);
  const result = rev > w.steps.length;
  return (
    <View style={{ gap: 14 }}>
      <Text style={s.label}>Riešený príklad</Text>
      <Text style={[s.body, { fontFamily: F.bodyMed }]}>{w.q}</Text>
      {rev === 0 && <Text style={s.lead}>Skús to najprv sám na papieri. Potom ťukaj na žlté tlačidlo a postup sa odkryje krok po kroku.</Text>}
      <View style={{ gap: 12 }}>
        {w.steps.slice(0, shown).map((st, k) => (
          <SlideIn key={k} dir={0}>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Text style={[s.num, { color }]}>{String(k + 1).padStart(2, '0')}</Text>
              <Text style={[s.body, { flex: 1, fontSize: 18, lineHeight: 27 }]}>{st}</Text>
            </View>
          </SlideIn>
        ))}
      </View>
      {result && (
        <SlideIn dir={0}>
          <View style={s.result}>
            <Text style={[s.label, { color: C.good }]}>Výsledok</Text>
            <Text style={[s.body, { fontFamily: F.bodyBold }]}>{w.result}</Text>
          </View>
        </SlideIn>
      )}
    </View>
  );
}

function CheckSlide({ c, color, onWin }: { c: Check; color: string; onWin: () => void }) {
  const opts = useMemo(() => shuffle(c.options.map((t, k) => ({ t, ok: k === 0 }))), [c]);
  const [chosen, setChosen] = useState<number | null>(null);
  const [tries, setTries] = useState(0);
  const shake = useRef(new Animated.Value(0)).current;
  const ok = chosen !== null && opts[chosen].ok;
  return (
    <View style={{ gap: 14 }}>
      <Text style={s.label}>Over si to</Text>
      <Text style={s.h}>{c.q}</Text>
      <Animated.View style={{ gap: 10, transform: [{ translateX: shake }] }}>
        {opts.map((o, k) => {
          const fb = chosen !== null;
          const isC = chosen === k;
          const bg = fb && o.ok && ok ? '#DDF1E4' : isC && !o.ok ? '#FBE3DF' : C.sheet;
          const bc = fb && o.ok && ok ? C.good : isC && !o.ok ? C.bad : C.ink;
          return (
            <Pressable
              key={k}
              disabled={ok}
              onPress={() => {
                setChosen(k);
                if (o.ok) {
                  haptic('ok');
                  if (tries === 0) onWin();
                } else {
                  haptic('bad');
                  setTries(tries + 1);
                  shake.setValue(0);
                  Animated.sequence([10, -10, 7, -7, 0].map((x) => Animated.timing(shake, { toValue: x, duration: 45, useNativeDriver: ND }))).start();
                }
              }}
              style={({ pressed }) => [s.opt, { backgroundColor: bg, borderColor: bc, transform: [{ translateY: pressed ? 2 : 0 }] }]}
            >
              <Text style={[s.optLetter, { color: bc === C.ink ? color : bc }]}>{'ABCD'[k]}</Text>
              <Text style={[s.body, { flex: 1, fontSize: 18, lineHeight: 25 }]}>{o.t}</Text>
            </Pressable>
          );
        })}
      </Animated.View>
      {chosen !== null && (
        <SlideIn key={chosen} dir={0}>
          <View style={[s.result, { borderLeftColor: ok ? C.good : C.bad, backgroundColor: ok ? '#DDF1E4' : '#FBE3DF' }]}>
            <Text style={[s.label, { color: ok ? C.good : C.bad }]}>{ok ? (tries === 0 ? 'Správne na prvý pokus' : 'Správne') : 'Ešte nie, skús inú možnosť'}</Text>
            {ok ? <Text style={s.body}>{c.explain}</Text> : null}
          </View>
        </SlideIn>
      )}
      <Stamp show={ok && tries === 0} text="+5 XP" color={C.orange} />
    </View>
  );
}

function BulletsSlide({ items, head, onWin }: { items: string[]; head: React.ReactNode; onWin: () => void }) {
  const [on, setOn] = useState<Set<number>>(new Set());
  const all = on.size === items.length;
  const fired = useRef(false);
  useEffect(() => {
    if (all && !fired.current) {
      fired.current = true;
      play('levelup');
      onWin();
    }
  }, [all, onWin]);
  return (
    <View style={{ gap: 12 }}>
      {head}
      <Text style={s.lead}>Odškrtni, čo už vieš. Čo nevieš, nájdeš v lekcii aj v ťaháku.</Text>
      {items.map((b, k) => {
        const v = on.has(k);
        return (
          <Pressable
            key={k}
            onPress={() => {
              play(v ? 'tap' : 'step');
              const n = new Set(on);
              if (v) n.delete(k);
              else n.add(k);
              setOn(n);
            }}
            style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: C.rule }}
          >
            <View style={[s.box, v && { backgroundColor: C.ink }]}>{v ? <Icon name="check" size={14} color="#fff" /> : null}</View>
            <Text style={[s.body, { flex: 1, fontSize: 17, lineHeight: 24, color: v ? C.ink2 : C.ink }]}>{b}</Text>
          </Pressable>
        );
      })}
      <Stamp show={all} text="ZOPAKOVANÉ" />
    </View>
  );
}

const s = StyleSheet.create({
  close: { width: 38, height: 38, borderRadius: 8, borderWidth: 2, borderColor: C.ink, backgroundColor: C.sheet, alignItems: 'center', justifyContent: 'center' },
  kicker: { fontFamily: F.mono, fontSize: 11, letterSpacing: 1.2, color: C.orange, textTransform: 'uppercase' },
  stepTitle: { fontFamily: F.bodyBold, fontSize: 15, color: C.ink },
  h: { fontFamily: F.head, fontSize: 27, lineHeight: 32, color: C.ink, letterSpacing: -0.3 },
  label: { fontFamily: F.monoBold, fontSize: 12, letterSpacing: 1.4, color: C.orange, textTransform: 'uppercase' },
  lead: { fontFamily: F.body, fontSize: 16, lineHeight: 23, color: C.ink2 },
  body: { fontFamily: F.body, fontSize: 20, lineHeight: 30, color: C.ink },
  note: { backgroundColor: C.mark, padding: 18, gap: 8, borderRadius: 2, transform: [{ rotate: '-0.8deg' }], shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 6, shadowOffset: { width: 2, height: 4 }, elevation: 3 },
  formula: { backgroundColor: C.sheet, borderWidth: 2, borderColor: C.ink, borderRadius: 6, padding: 16, gap: 10 },
  formulaText: { fontFamily: F.monoBold, fontSize: 21, lineHeight: 32, color: C.ink },
  sym: { minHeight: 44, minWidth: 48, paddingHorizontal: 12, borderWidth: 2, borderColor: C.ink, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  meaning: { borderLeftWidth: 5, borderLeftColor: C.ink, paddingLeft: 14, paddingVertical: 6, gap: 4 },
  num: { fontFamily: F.monoBold, fontSize: 16, lineHeight: 27, width: 26 },
  result: { borderLeftWidth: 5, borderLeftColor: C.good, backgroundColor: '#DDF1E4', padding: 14, gap: 6 },
  opt: { flexDirection: 'row', gap: 12, alignItems: 'center', minHeight: 56, padding: 12, borderWidth: 2, borderRadius: 6 },
  optLetter: { fontFamily: F.monoBold, fontSize: 16, width: 18 },
  box: { width: 24, height: 24, marginTop: 2, borderWidth: 2, borderColor: C.ink, borderRadius: 3, alignItems: 'center', justifyContent: 'center' },
  nav: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, paddingTop: 10, paddingBottom: 12, borderTopWidth: 1.5, borderTopColor: C.ink, backgroundColor: C.paper },
  navBack: { width: 56, height: 54, alignItems: 'center', justifyContent: 'center' },
  navNext: { height: 54, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  navText: { fontFamily: F.head, fontSize: 19, color: '#fff' },
});
