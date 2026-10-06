import * as Haptics from 'expo-haptics';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image, ImageStyle, Platform, Pressable, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import Svg, { Defs, Line, Pattern, Rect } from 'react-native-svg';
import { play } from '../sound';

// Vizuál "zápisník + tabuľa": krémový papier so štvorčekmi, tmavý atrament,
// obrázky na zelenej tabuli, akcent ako geodetický signalizačný oranžový kolík.

export const C = {
  paper: '#F1ECDF',
  paper2: '#E7E0CE',
  sheet: '#FBF8F1',
  ink: '#1D2229',
  ink2: '#4E5562',
  rule: '#CFC5AE',
  grid: 'rgba(60,90,120,0.09)',
  orange: '#DE5A1E',
  blue: '#2A56B8',
  teal: '#1F7A70',
  yellow: '#F2C230',
  mark: '#FFE27A',
  board: '#203630',
  chalk: '#F3F0E6',
  // pôvodné názvy (používajú ich staršie obrazovky)
  bg1: '#F1ECDF',
  bg2: '#E7E0CE',
  card: '#FBF8F1',
  cardBorder: '#CFC5AE',
  text: '#1D2229',
  dim: '#5D6472',
  good: '#22814F',
  bad: '#C4372C',
  gold: '#C98A00',
};

export const F = {
  body: 'SourceSans3_400Regular',
  bodyMed: 'SourceSans3_600SemiBold',
  bodyBold: 'SourceSans3_700Bold',
  head: 'BricolageGrotesque_700Bold',
  headX: 'BricolageGrotesque_800ExtraBold',
  mono: 'JetBrainsMono_500Medium',
  monoBold: 'JetBrainsMono_700Bold',
};

export const ND = Platform.OS !== 'web';

export function haptic(kind: 'ok' | 'bad' | 'tap') {
  play(kind === 'tap' ? 'tap' : kind === 'ok' ? 'correct' : 'wrong');
  if (Platform.OS === 'web') return;
  try {
    if (kind === 'tap') Haptics.selectionAsync();
    else Haptics.notificationAsync(kind === 'ok' ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error);
  } catch {
    // haptika nie je dôležitá
  }
}

// ───────── ikony (Kenney Game Icons, CC0) ─────────
const ICONS = {
  home: require('../../assets/kenney/img/i_home.png'),
  back: require('../../assets/kenney/img/i_arrowLeft.png'),
  soundOn: require('../../assets/kenney/img/i_audioOn.png'),
  soundOff: require('../../assets/kenney/img/i_audioOff.png'),
  star: require('../../assets/kenney/img/i_star.png'),
  trophy: require('../../assets/kenney/img/i_trophy.png'),
  target: require('../../assets/kenney/img/i_target.png'),
  locked: require('../../assets/kenney/img/i_locked.png'),
  question: require('../../assets/kenney/img/i_question.png'),
  check: require('../../assets/kenney/img/i_checkmark.png'),
  cross: require('../../assets/kenney/img/i_cross.png'),
  info: require('../../assets/kenney/img/i_information.png'),
  medal: require('../../assets/kenney/img/i_medal1.png'),
  retry: require('../../assets/kenney/img/i_return.png'),
  next: require('../../assets/kenney/img/i_next.png'),
  prev: require('../../assets/kenney/img/i_previous.png'),
  gear: require('../../assets/kenney/img/i_gear.png'),
};
export type IconName = keyof typeof ICONS;

export function Icon({ name, size = 22, color = C.ink, style }: { name: IconName; size?: number; color?: string; style?: ImageStyle }) {
  return <Image source={ICONS[name]} style={[{ width: size, height: size, tintColor: color }, style]} resizeMode="contain" />;
}

// ───────── sprity (Kenney Boardgame Pack, CC0) ─────────
export const SPRITES = {
  chip: {
    white: require('../../assets/kenney/img/chip_white.png'),
    red: require('../../assets/kenney/img/chip_red.png'),
    blue: require('../../assets/kenney/img/chip_blue.png'),
    green: require('../../assets/kenney/img/chip_green.png'),
    black: require('../../assets/kenney/img/chip_blackwhite.png'),
  },
  die: [
    require('../../assets/kenney/img/die1.png'),
    require('../../assets/kenney/img/die2.png'),
    require('../../assets/kenney/img/die3.png'),
    require('../../assets/kenney/img/die4.png'),
    require('../../assets/kenney/img/die5.png'),
    require('../../assets/kenney/img/die6.png'),
  ],
  pawn: {
    red: require('../../assets/kenney/img/pawn_red.png'),
    blue: require('../../assets/kenney/img/pawn_blue.png'),
  },
};

/** Papier so štvorčekovou sieťou (ako zošit z matiky). */
export function Background({ children }: { children: React.ReactNode; tint?: string }) {
  return (
    <View style={{ flex: 1, backgroundColor: C.paper }}>
      <Svg width="100%" height="100%" style={StyleSheet.absoluteFill} pointerEvents="none">
        <Defs>
          <Pattern id="grid" width={22} height={22} patternUnits="userSpaceOnUse">
            <Line x1={0} y1={0} x2={22} y2={0} stroke={C.grid} strokeWidth={1} />
            <Line x1={0} y1={0} x2={0} y2={22} stroke={C.grid} strokeWidth={1} />
          </Pattern>
        </Defs>
        <Rect x={0} y={0} width="100%" height="100%" fill="url(#grid)" />
      </Svg>
      {children}
    </View>
  );
}

/** Plynulý príchod obrazovky. */
export function ScreenFade({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  const a = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(a, { toValue: 1, duration: 260, easing: Easing.out(Easing.cubic), useNativeDriver: ND }).start();
  }, [a]);
  return (
    <Animated.View style={[style, { opacity: a, transform: [{ translateY: a.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }] }]}>
      {children}
    </Animated.View>
  );
}

/** Papierové konfety pri úspechu. */
export function Confetti({ count = 36, top = 120 }: { count?: number; top?: number }) {
  const parts = useRef(
    Array.from({ length: count }, () => ({
      v: new Animated.Value(0),
      x: Math.random() * 2 - 1,
      rot: Math.random() * 720 - 360,
      color: [C.orange, C.blue, C.yellow, C.teal, C.ink][Math.floor(Math.random() * 5)],
      delay: Math.random() * 250,
      size: 6 + Math.random() * 7,
    })),
  ).current;
  useEffect(() => {
    Animated.parallel(
      parts.map((p) => Animated.timing(p.v, { toValue: 1, duration: 1500 + Math.random() * 900, delay: p.delay, easing: Easing.out(Easing.quad), useNativeDriver: ND })),
    ).start();
  }, [parts]);
  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, { overflow: 'hidden', zIndex: 20 }]}>
      {parts.map((p, i) => (
        <Animated.View
          key={i}
          style={{
            position: 'absolute',
            left: '50%',
            top,
            width: p.size,
            height: p.size * 0.55,
            backgroundColor: p.color,
            opacity: p.v.interpolate({ inputRange: [0, 0.8, 1], outputRange: [1, 1, 0] }),
            transform: [
              { translateX: p.v.interpolate({ inputRange: [0, 1], outputRange: [0, p.x * 200] }) },
              { translateY: p.v.interpolate({ inputRange: [0, 0.3, 1], outputRange: [0, -120, 380] }) },
              { rotate: p.v.interpolate({ inputRange: [0, 1], outputRange: ['0deg', p.rot + 'deg'] }) },
            ],
          }}
        />
      ))}
    </View>
  );
}

/** Pressable, ktorý sa pri stlačení jemne zmenší a pruží späť. */
export function Bouncy({ children, onPress, disabled, style, scaleTo = 0.96, sound = true }: { children: React.ReactNode; onPress?: () => void; disabled?: boolean; style?: ViewStyle | ViewStyle[]; scaleTo?: number; sound?: boolean }) {
  const s = useRef(new Animated.Value(1)).current;
  const to = (v: number) => Animated.spring(s, { toValue: v, useNativeDriver: ND, speed: 40, bounciness: 10 }).start();
  return (
    <Animated.View style={[{ transform: [{ scale: s }] }, style as ViewStyle]}>
      <Pressable
        disabled={disabled}
        onPressIn={() => to(scaleTo)}
        onPressOut={() => to(1)}
        onPress={() => {
          if (sound) haptic('tap');
          onPress?.();
        }}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}

/** Blok s tvrdým tieňom; pri stlačení "zapadne" do tieňa ako fyzické tlačidlo. */
export function Press({
  children,
  onPress,
  disabled,
  color = C.sheet,
  style,
  inner,
  depth = 4,
  sound = true,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  color?: string;
  style?: ViewStyle | ViewStyle[];
  inner?: ViewStyle | ViewStyle[];
  depth?: number;
  sound?: boolean;
}) {
  const p = useRef(new Animated.Value(0)).current;
  const to = (v: number) => Animated.timing(p, { toValue: v, duration: 70, useNativeDriver: ND }).start();
  return (
    <View style={[{ opacity: disabled ? 0.45 : 1, paddingRight: depth, paddingBottom: depth }, style as ViewStyle]}>
      <View style={{ position: 'absolute', left: depth, top: depth, right: 0, bottom: 0, backgroundColor: C.ink, borderRadius: 8 }} />
      <Animated.View style={{ transform: [{ translateX: p.interpolate({ inputRange: [0, 1], outputRange: [0, depth] }) }, { translateY: p.interpolate({ inputRange: [0, 1], outputRange: [0, depth] }) }] }}>
        <Pressable
          disabled={disabled}
          onPressIn={() => to(1)}
          onPressOut={() => to(0)}
          onPress={() => {
            if (sound) haptic('tap');
            onPress?.();
          }}
          style={[{ backgroundColor: color, borderWidth: 2, borderColor: C.ink, borderRadius: 8 }, inner as ViewStyle]}
        >
          {children}
        </Pressable>
      </Animated.View>
    </View>
  );
}

/** Hlavné tlačidlo. `colors[0]` je farba výplne (ostatné sa ignorujú, ostali kvôli kompatibilite). */
export function GButton({
  title,
  subtitle,
  onPress,
  colors,
  color,
  style,
  disabled,
  icon,
  small,
  light,
}: {
  title: string;
  subtitle?: string;
  onPress: () => void;
  colors?: [string, string];
  color?: string;
  style?: ViewStyle;
  disabled?: boolean;
  icon?: IconName;
  small?: boolean;
  /** svetlé tlačidlo s tmavým textom */
  light?: boolean;
}) {
  const fill = color ?? colors?.[0] ?? C.ink;
  const fg = light ? C.ink : '#fff';
  return (
    <Press onPress={onPress} disabled={disabled} color={fill} style={style} inner={[styles.btn, small ? { paddingVertical: 10, paddingHorizontal: 14 } : {}]}>
      {icon ? <Icon name={icon} size={small ? 18 : 24} color={fg} /> : null}
      <View style={{ flexShrink: 1, flexGrow: 1 }}>
        <Text style={[styles.btnTitle, { color: fg }, small && { fontSize: 16 }]}>{title}</Text>
        {subtitle ? <Text style={[styles.btnSub, { color: fg, opacity: 0.85 }]}>{subtitle}</Text> : null}
      </View>
    </Press>
  );
}

export function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle | ViewStyle[] }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

/** Hlavička obrazovky: späť + nadpis zarovnaný vľavo. */
export function Header({ title, kicker, onBack, right }: { title: string; kicker?: string; onBack?: () => void; right?: React.ReactNode }) {
  return (
    <View style={styles.header}>
      {onBack ? (
        <Pressable
          onPress={() => {
            haptic('tap');
            onBack();
          }}
          hitSlop={12}
          style={styles.back}
          accessibilityLabel="Späť"
        >
          <Icon name="back" size={20} />
        </Pressable>
      ) : null}
      <View style={{ flex: 1 }}>
        {kicker ? <Text style={styles.kicker}>{kicker}</Text> : null}
        <Text style={styles.h2} numberOfLines={2}>
          {title}
        </Text>
      </View>
      {right}
    </View>
  );
}

/** Malý štítok v monospace (ako popiska v technickom výkrese). */
export function Tag({ children, color = C.ink2, style }: { children: React.ReactNode; color?: string; style?: TextStyle }) {
  return <Text style={[styles.tag, { color, borderColor: color }, style]}>{children}</Text>;
}

/** Ukazovateľ postupu ako pravítko s dielikmi. */
export function Bar({ value, color = C.orange, height = 10 }: { value: number; color?: string; height?: number; bg?: string }) {
  const w = useRef(new Animated.Value(value)).current;
  useEffect(() => {
    Animated.timing(w, { toValue: value, duration: 350, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
  }, [value, w]);
  return (
    <View style={{ height, borderWidth: 1.5, borderColor: C.ink, borderRadius: 3, backgroundColor: C.sheet, overflow: 'hidden' }}>
      <Animated.View style={{ height: '100%', backgroundColor: color, width: w.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'], extrapolate: 'clamp' }) }} />
    </View>
  );
}

export function Stars({ n, size = 18 }: { n: number; size?: number }) {
  return (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {[0, 1, 2].map((i) => (
        <Icon key={i} name="star" size={size} color={i < n ? C.orange : C.rule} />
      ))}
    </View>
  );
}

export const styles = StyleSheet.create({
  btn: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, paddingHorizontal: 16 },
  btnTitle: { color: '#fff', fontSize: 18, fontFamily: F.head },
  btnSub: { color: '#fff', fontSize: 14, marginTop: 1, fontFamily: F.body },
  card: { backgroundColor: C.sheet, borderColor: C.ink, borderWidth: 1.5, borderRadius: 8, padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 },
  back: { width: 44, height: 44, borderRadius: 8, borderWidth: 2, borderColor: C.ink, backgroundColor: C.sheet, alignItems: 'center', justifyContent: 'center' },
  kicker: { fontFamily: F.mono, fontSize: 11, letterSpacing: 1.2, color: C.orange, textTransform: 'uppercase' },
  tag: { fontFamily: F.mono, fontSize: 11, letterSpacing: 0.5, borderWidth: 1, borderRadius: 3, paddingHorizontal: 6, paddingVertical: 2, alignSelf: 'flex-start', overflow: 'hidden' },
  h1: { color: C.ink, fontSize: 34, fontFamily: F.headX, letterSpacing: -0.5 },
  h2: { color: C.ink, fontSize: 22, fontFamily: F.head, letterSpacing: -0.2 },
  p: { color: C.dim, fontSize: 15, lineHeight: 21, fontFamily: F.body },
});
