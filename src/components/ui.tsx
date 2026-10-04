import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, Platform, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';

export const C = {
  bg1: '#070b1f',
  bg2: '#141038',
  card: 'rgba(255,255,255,0.06)',
  cardBorder: 'rgba(255,255,255,0.12)',
  text: '#f1f5ff',
  dim: '#9aa3c7',
  good: '#34d399',
  bad: '#fb7185',
  gold: '#fbbf24',
};

export const ND = Platform.OS !== 'web';

export function haptic(kind: 'ok' | 'bad' | 'tap') {
  if (Platform.OS === 'web') return;
  try {
    if (kind === 'tap') Haptics.selectionAsync();
    else Haptics.notificationAsync(kind === 'ok' ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error);
  } catch {
    // haptika nie je dôležitá
  }
}

/** Tmavé vesmírne pozadie s pomaly blikajúcimi hviezdami. */
export function Background({ children, tint }: { children: React.ReactNode; tint?: string }) {
  const stars = useMemo(
    () =>
      Array.from({ length: 40 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2.2 + 0.8,
        delay: Math.random() * 3000,
      })),
    [],
  );
  return (
    <View style={{ flex: 1, backgroundColor: C.bg1 }}>
      <LinearGradient colors={[C.bg1, C.bg2, '#1d0b2e']} style={StyleSheet.absoluteFill} />
      {tint ? (
        <LinearGradient colors={[tint + '33', 'transparent']} style={[StyleSheet.absoluteFill, { height: '45%' }]} />
      ) : null}
      {stars.map((s, i) => (
        <Star key={i} {...s} />
      ))}
      {children}
    </View>
  );
}

function Star({ left, top, size, delay }: { left: number; top: number; size: number; delay: number }) {
  const o = useRef(new Animated.Value(0.2)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(o, { toValue: 0.9, duration: 1400, useNativeDriver: ND }),
        Animated.timing(o, { toValue: 0.2, duration: 1400, useNativeDriver: ND }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [o, delay]);
  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: 'absolute',
        left: `${left}%`,
        top: `${top}%`,
        width: size,
        height: size,
        borderRadius: size,
        backgroundColor: '#fff',
        opacity: o,
      }}
    />
  );
}

/** Tlačidlo s gradientom a "stlačením". */
export function GButton({
  title,
  subtitle,
  onPress,
  colors = ['#6366f1', '#a855f7'],
  style,
  disabled,
  icon,
  small,
}: {
  title: string;
  subtitle?: string;
  onPress: () => void;
  colors?: [string, string];
  style?: ViewStyle;
  disabled?: boolean;
  icon?: string;
  small?: boolean;
}) {
  const s = useRef(new Animated.Value(1)).current;
  const to = (v: number) => Animated.spring(s, { toValue: v, useNativeDriver: ND, speed: 40, bounciness: 8 }).start();
  return (
    <Animated.View style={[{ transform: [{ scale: s }], opacity: disabled ? 0.45 : 1 }, style]}>
      <Pressable
        disabled={disabled}
        onPressIn={() => to(0.95)}
        onPressOut={() => to(1)}
        onPress={() => {
          haptic('tap');
          onPress();
        }}
      >
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.btn, small && { paddingVertical: 10, paddingHorizontal: 14 }]}
        >
          {icon ? <Text style={[styles.btnIcon, small && { fontSize: 18 }]}>{icon}</Text> : null}
          <View style={{ flexShrink: 1 }}>
            <Text style={[styles.btnTitle, small && { fontSize: 15 }]}>{title}</Text>
            {subtitle ? <Text style={styles.btnSub}>{subtitle}</Text> : null}
          </View>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

export function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle | ViewStyle[] }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

/** Animovaný progress bar. */
export function Bar({ value, color, height = 10, bg = 'rgba(255,255,255,0.1)' }: { value: number; color: string; height?: number; bg?: string }) {
  const w = useRef(new Animated.Value(value)).current;
  useEffect(() => {
    Animated.timing(w, { toValue: value, duration: 350, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
  }, [value, w]);
  return (
    <View style={{ height, borderRadius: height, backgroundColor: bg, overflow: 'hidden' }}>
      <Animated.View
        style={{
          height,
          borderRadius: height,
          backgroundColor: color,
          width: w.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'], extrapolate: 'clamp' }),
        }}
      />
    </View>
  );
}

export function Stars({ n, size = 18 }: { n: number; size?: number }) {
  return (
    <Text style={{ fontSize: size, letterSpacing: 2 }}>
      {[0, 1, 2].map((i) => (
        <Text key={i} style={{ color: i < n ? C.gold : 'rgba(255,255,255,0.18)' }}>
          ★
        </Text>
      ))}
    </Text>
  );
}

export const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 18,
  },
  btnIcon: { fontSize: 26 },
  btnTitle: { color: '#fff', fontSize: 18, fontWeight: '800' },
  btnSub: { color: 'rgba(255,255,255,0.85)', fontSize: 13, marginTop: 2 },
  card: {
    backgroundColor: C.card,
    borderColor: C.cardBorder,
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
  },
  h1: { color: C.text, fontSize: 30, fontWeight: '900', letterSpacing: 1 },
  h2: { color: C.text, fontSize: 20, fontWeight: '800' },
  p: { color: C.dim, fontSize: 14, lineHeight: 20 },
});
