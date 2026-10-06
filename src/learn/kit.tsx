import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, PanResponder, Platform, Pressable, Text, TextInput, View, ViewStyle } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { K } from '../components/diagrams';
import { C, F, haptic, ND } from '../components/ui';
import { play } from '../sound';

// Stavebnice pre interaktívne obrazovky Učebne: tabuľa s ťahateľnými bodmi, posuvník,
// vstup čísla, okamžitá odozva. Všetko funguje dotykom aj myšou (web).

export const CH = {
  text: K.text,
  dim: K.dim,
  grid: 'rgba(243,240,230,0.10)',
  axis: 'rgba(243,240,230,0.45)',
  a: '#FFD25E', // žltá krieda
  b: '#7CC8F2', // modrá
  c: '#F59AC0', // ružová
  d: '#7EE2A8', // zelená
  e: '#FFA46B', // oranžová
  bg: K.bg1,
};

export const sk = (x: number, d = 2) => {
  if (!isFinite(x)) return x > 0 ? '∞' : '−∞';
  const r = Number(x.toFixed(d));
  return String(Object.is(r, -0) ? 0 : r).replace('.', ',').replace(/^-/, '−');
};
/** číslo v zátvorke, ak je záporné: 3·(−2) */
export const par = (x: number, d = 2) => (x < 0 ? `(${sk(x, d)})` : sk(x, d));

type Handle = { id: string; x: number; y: number };

/**
 * Tabuľa so SVG. Ak dostane `handles`, dajú sa ťahať (najbližší bod v okruhu ~28 px).
 * Súradnice v `onDrag` sú vo viewBoxe (0..w, 0..h).
 */
export function Chalk({
  w = 320,
  h = 220,
  children,
  handles,
  onDrag,
  onRelease,
  grid = 20,
  style,
}: {
  w?: number;
  h?: number;
  children: React.ReactNode;
  handles?: Handle[];
  onDrag?: (id: string, x: number, y: number) => void;
  onRelease?: (id: string) => void;
  grid?: number;
  style?: ViewStyle;
}) {
  const ref = useRef<View>(null);
  const box = useRef({ x: 0, y: 0, w: 1, h: 1 });
  const active = useRef<string | null>(null);
  const hRef = useRef(handles);
  hRef.current = handles;
  const cb = useRef({ onDrag, onRelease });
  cb.current = { onDrag, onRelease };

  const toLocal = (px: number, py: number) => ({
    x: ((px - box.current.x) / box.current.w) * w,
    y: ((py - box.current.y) / box.current.h) * h,
  });

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !!hRef.current?.length,
      onMoveShouldSetPanResponder: () => !!hRef.current?.length,
      onStartShouldSetPanResponderCapture: () => false,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: (e) => {
        const { pageX, pageY } = e.nativeEvent;
        const pick = () => {
          const p = toLocal(pageX, pageY);
          let best: string | null = null;
          let bd = 34 * (w / Math.max(1, box.current.w)) + 6;
          for (const hd of hRef.current ?? []) {
            const d = Math.hypot(hd.x - p.x, hd.y - p.y);
            if (d < bd) {
              bd = d;
              best = hd.id;
            }
          }
          active.current = best;
          if (best) {
            play('tick');
            cb.current.onDrag?.(best, p.x, p.y);
          }
        };
        ref.current?.measure((_x, _y, mw, mh, px, py) => {
          box.current = { x: px, y: py, w: mw, h: mh };
          pick();
        });
      },
      onPanResponderMove: (e) => {
        if (!active.current) return;
        const p = toLocal(e.nativeEvent.pageX, e.nativeEvent.pageY);
        cb.current.onDrag?.(active.current, Math.max(0, Math.min(w, p.x)), Math.max(0, Math.min(h, p.y)));
      },
      onPanResponderRelease: () => {
        if (active.current) cb.current.onRelease?.(active.current);
        active.current = null;
      },
      onPanResponderTerminate: () => {
        active.current = null;
      },
    }),
  ).current;

  return (
    <View
      ref={ref}
      {...pan.panHandlers}
      style={[
        { backgroundColor: K.bg1, borderRadius: 6, borderWidth: 6, borderColor: '#6B4F35', overflow: 'hidden' },
        Platform.OS === 'web' ? ({ touchAction: 'none', cursor: handles?.length ? 'grab' : 'default', userSelect: 'none' } as object) : null,
        style,
      ]}
    >
      <Svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', aspectRatio: w / h }}>
        {grid > 0 &&
          Array.from({ length: Math.floor(w / grid) + 1 }, (_, i) => <Line key={'v' + i} x1={i * grid} y1={0} x2={i * grid} y2={h} stroke={CH.grid} />)}
        {grid > 0 &&
          Array.from({ length: Math.floor(h / grid) + 1 }, (_, i) => <Line key={'h' + i} x1={0} y1={i * grid} x2={w} y2={i * grid} stroke={CH.grid} />)}
        {children}
      </Svg>
    </View>
  );
}

/** Posuvník: ťahaj palec alebo ťukni kamkoľvek na dráhu. */
export function Slider({
  value,
  min,
  max,
  step = 0,
  onChange,
  label,
  unit = '',
  color = C.orange,
  fmt,
  marks,
}: {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  label?: string;
  unit?: string;
  color?: string;
  fmt?: (v: number) => string;
  marks?: { v: number; l: string }[];
}) {
  const ref = useRef<View>(null);
  const box = useRef({ x: 0, w: 1 });
  const last = useRef(value);
  const cb = useRef(onChange);
  cb.current = onChange;
  const cfg = useRef({ min, max, step });
  cfg.current = { min, max, step };

  const set = (pageX: number) => {
    const { min: a, max: b, step: s } = cfg.current;
    let t = (pageX - box.current.x) / box.current.w;
    t = Math.max(0, Math.min(1, t));
    let v = a + t * (b - a);
    if (s > 0) v = Math.round((v - a) / s) * s + a;
    v = Number(v.toFixed(6));
    if (v !== last.current) {
      last.current = v;
      if (s > 0) play('tick');
      cb.current(v);
    }
  };
  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: (e) => {
        const px = e.nativeEvent.pageX;
        ref.current?.measure((_x, _y, mw, _h, pageX) => {
          box.current = { x: pageX, w: mw };
          set(px);
        });
      },
      onPanResponderMove: (e) => set(e.nativeEvent.pageX),
    }),
  ).current;
  const t = (value - min) / (max - min || 1);
  return (
    <View style={{ gap: 6 }}>
      {label ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Text style={{ fontFamily: F.bodyMed, fontSize: 16, color: C.ink }}>{label}</Text>
          <Text style={{ fontFamily: F.monoBold, fontSize: 17, color }}>
            {fmt ? fmt(value) : sk(value)}
            {unit ? ' ' + unit : ''}
          </Text>
        </View>
      ) : null}
      <View
        ref={ref}
        {...pan.panHandlers}
        style={[{ height: 44, justifyContent: 'center' }, Platform.OS === 'web' ? ({ touchAction: 'none', cursor: 'pointer', userSelect: 'none' } as object) : null]}
      >
        <View style={{ height: 8, borderRadius: 4, backgroundColor: C.paper2, borderWidth: 1.5, borderColor: C.ink }} />
        <View style={{ position: 'absolute', left: 0, width: `${t * 100}%`, height: 8, borderRadius: 4, backgroundColor: color, borderWidth: 1.5, borderColor: C.ink }} />
        <View
          pointerEvents="none"
          style={{ position: 'absolute', left: `${t * 100}%`, marginLeft: -14, width: 28, height: 28, borderRadius: 14, backgroundColor: C.sheet, borderWidth: 2.5, borderColor: C.ink }}
        />
      </View>
      {marks ? (
        <View style={{ height: 16 }}>
          {marks.map((m) => (
            <Text
              key={m.v}
              style={{ position: 'absolute', left: `${((m.v - min) / (max - min)) * 100}%`, width: 60, marginLeft: -30, textAlign: 'center', fontFamily: F.mono, fontSize: 11, color: C.ink2 }}
            >
              {m.l}
            </Text>
          ))}
        </View>
      ) : null}
    </View>
  );
}

/** Pole na číslo (boss príklady). Akceptuje čiarku aj bodku a znamienko −. */
export function NumIn({ value, onChange, state, width = 64, placeholder = '?' }: { value: string; onChange: (s: string) => void; state?: 'ok' | 'bad' | null; width?: number; placeholder?: string }) {
  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      placeholderTextColor={C.rule}
      keyboardType="numbers-and-punctuation"
      inputMode="decimal"
      style={{
        width,
        height: 46,
        borderWidth: 2,
        borderColor: state === 'ok' ? C.good : state === 'bad' ? C.bad : C.ink,
        backgroundColor: state === 'ok' ? '#E3F3E8' : state === 'bad' ? '#FBE4E1' : C.sheet,
        borderRadius: 6,
        textAlign: 'center',
        fontFamily: F.monoBold,
        fontSize: 18,
        color: C.ink,
      }}
    />
  );
}

export const parseNum = (s: string) => {
  const t = s.replace(/\s/g, '').replace(',', '.').replace('−', '-');
  if (!t || t === '-' || t === '.') return NaN;
  return Number(t);
};

/** Zelený / červený pásik s odozvou, ktorý sa pri objavení jemne odrazí. */
export function Verdict({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  const a = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    a.setValue(0);
    Animated.spring(a, { toValue: 1, useNativeDriver: ND, speed: 18, bounciness: 12 }).start();
  }, [a, ok, children]);
  return (
    <Animated.View
      style={{
        transform: [{ scale: a.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] }) }],
        opacity: a,
        backgroundColor: ok ? '#DDF1E4' : '#FBE3DF',
        borderLeftWidth: 5,
        borderLeftColor: ok ? C.good : C.bad,
        padding: 12,
        borderRadius: 4,
      }}
    >
      <Text style={{ fontFamily: F.body, fontSize: 17, lineHeight: 24, color: C.ink }}>{children}</Text>
    </Animated.View>
  );
}

/** Pečiatka, ktorá "dopadne" na papier, keď je úloha splnená. */
export function Stamp({ show, text = 'SPLNENÉ', color = C.good }: { show: boolean; text?: string; color?: string }) {
  const a = useRef(new Animated.Value(0)).current;
  const was = useRef(false);
  useEffect(() => {
    if (show && !was.current) {
      play('correct');
      a.setValue(0);
      Animated.timing(a, { toValue: 1, duration: 260, easing: Easing.out(Easing.back(2.2)), useNativeDriver: ND }).start();
    }
    if (!show) a.setValue(0);
    was.current = show;
  }, [show, a]);
  if (!show) return null;
  return (
    <Animated.View
      pointerEvents="none"
      style={{
        alignSelf: 'flex-start',
        borderWidth: 3,
        borderColor: color,
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 2,
        transform: [{ rotate: '-6deg' }, { scale: a.interpolate({ inputRange: [0, 1], outputRange: [2.2, 1] }) }],
        opacity: a,
      }}
    >
      <Text style={{ fontFamily: F.monoBold, fontSize: 16, letterSpacing: 2, color }}>{text}</Text>
    </Animated.View>
  );
}

/** Výrazný vzorec (monospace), voliteľne s farebnými časťami: [text, farba?][] */
export function Eq({ parts, size = 20, center }: { parts: (string | [string, string])[]; size?: number; center?: boolean }) {
  return (
    <Text style={{ fontFamily: F.monoBold, fontSize: size, lineHeight: size * 1.45, color: C.ink, textAlign: center ? 'center' : 'left' }}>
      {parts.map((p, i) =>
        typeof p === 'string' ? (
          <Text key={i}>{p}</Text>
        ) : (
          <Text key={i} style={{ color: p[1] }}>
            {p[0]}
          </Text>
        ),
      )}
    </Text>
  );
}

/** Úloha na obrazovke (malý cieľ, ktorý treba splniť). */
export function Goal({ children, done }: { children: React.ReactNode; done?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start' }}>
      <View style={{ width: 22, height: 22, marginTop: 2, borderWidth: 2, borderColor: C.ink, borderRadius: 3, backgroundColor: done ? C.good : C.sheet, alignItems: 'center', justifyContent: 'center' }}>
        {done ? <Text style={{ color: '#fff', fontFamily: F.monoBold, fontSize: 13, lineHeight: 16 }}>✓</Text> : null}
      </View>
      <Text style={{ flex: 1, fontFamily: F.bodyMed, fontSize: 17, lineHeight: 24, color: done ? C.good : C.ink, textDecorationLine: done ? 'line-through' : 'none' }}>{children}</Text>
    </View>
  );
}

/** Malé prepínacie tlačidlo (výber možnosti). */
export function Toggle({ on, label, onPress, color = C.ink }: { on: boolean; label: string; onPress: () => void; color?: string }) {
  return (
    <Pressable
      onPress={() => {
        haptic('tap');
        onPress();
      }}
      style={({ pressed }) => ({
        minHeight: 40,
        paddingHorizontal: 12,
        justifyContent: 'center',
        borderRadius: 6,
        borderWidth: 2,
        borderColor: C.ink,
        backgroundColor: on ? color : C.sheet,
        transform: [{ translateY: pressed ? 1 : 0 }],
      })}
    >
      <Text style={{ fontFamily: F.bodyBold, fontSize: 15, color: on ? '#fff' : C.ink }}>{label}</Text>
    </Pressable>
  );
}

/** Hook: raz zahrá oslavu, keď sa podmienka splní. */
export function useOnce(cond: boolean, fn: () => void) {
  const done = useRef(false);
  useEffect(() => {
    if (cond && !done.current) {
      done.current = true;
      fn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cond]);
}

/** čas v sekundách pre animácie (~30 fps), dá sa pozastaviť */
export function useClock(running = true) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!running) return;
    const start = Date.now() - t * 1000;
    const iv = setInterval(() => setT((Date.now() - start) / 1000), 33);
    return () => clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);
  return t;
}

export const T = {
  lead: { fontFamily: F.body, fontSize: 18, lineHeight: 26, color: C.ink } as const,
  small: { fontFamily: F.body, fontSize: 15, lineHeight: 21, color: C.ink2 } as const,
  mono: { fontFamily: F.mono, fontSize: 16, color: C.ink } as const,
};
