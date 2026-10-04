import AsyncStorage from '@react-native-async-storage/async-storage';
import { AudioPlayer, createAudioPlayer, setAudioModeAsync } from 'expo-audio';

// Krátke zvukové efekty (vygenerované WAV v assets/sounds). Dajú sa vypnúť tlačidlom 🔊 v menu.
const FILES = {
  tap: require('../assets/sounds/tap.wav'),
  pop: require('../assets/sounds/pop.wav'),
  correct: require('../assets/sounds/correct.wav'),
  wrong: require('../assets/sounds/wrong.wav'),
  whoosh: require('../assets/sounds/whoosh.wav'),
  levelup: require('../assets/sounds/levelup.wav'),
  win: require('../assets/sounds/win.wav'),
  tick: require('../assets/sounds/tick.wav'),
};

export type SoundName = keyof typeof FILES;

const KEY = 'skuska-arcade:muted';
const VOLUME: Partial<Record<SoundName, number>> = { tap: 0.5, tick: 0.4, whoosh: 0.5 };
const players: Partial<Record<SoundName, AudioPlayer>> = {};
let muted = false;
let ready = false;
const listeners = new Set<(m: boolean) => void>();

export async function initSound() {
  try {
    muted = (await AsyncStorage.getItem(KEY)) === '1';
  } catch {
    // predvolene zapnuté
  }
  try {
    await setAudioModeAsync({ playsInSilentMode: false });
  } catch {
    // na webe nie je potrebné
  }
  ready = true;
  listeners.forEach((l) => l(muted));
}

export function play(name: SoundName) {
  if (muted || !ready) return;
  try {
    let p = players[name];
    if (!p) {
      p = createAudioPlayer(FILES[name]);
      p.volume = VOLUME[name] ?? 0.8;
      players[name] = p;
    }
    p.seekTo(0);
    p.play();
  } catch {
    // zvuk nie je kritický
  }
}

export function isMuted() {
  return muted;
}

export function setMuted(m: boolean) {
  muted = m;
  AsyncStorage.setItem(KEY, m ? '1' : '0').catch(() => {});
  listeners.forEach((l) => l(m));
}

export function onMutedChange(l: (m: boolean) => void) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}
