import AsyncStorage from '@react-native-async-storage/async-storage';
import { AudioPlayer, createAudioPlayer, setAudioModeAsync } from 'expo-audio';

// Zvukové efekty: Kenney.nl (Interface Sounds, Casino Audio, Digital Audio, Impact Sounds), licencia CC0.
// Prevedené z OGG na WAV (mono), aby hrali aj na iOS a v Safari. Zoznam je v ASSETS.md.
const FILES = {
  tap: require('../assets/kenney/sounds/tap.wav'),
  pop: require('../assets/kenney/sounds/pop.wav'),
  correct: require('../assets/kenney/sounds/correct.wav'),
  wrong: require('../assets/kenney/sounds/wrong.wav'),
  whoosh: require('../assets/kenney/sounds/whoosh.wav'),
  levelup: require('../assets/kenney/sounds/levelup.wav'),
  win: require('../assets/kenney/sounds/win.wav'),
  tick: require('../assets/kenney/sounds/tick.wav'),
  chip: require('../assets/kenney/sounds/chip.wav'),
  chips: require('../assets/kenney/sounds/chips.wav'),
  dice: require('../assets/kenney/sounds/dice.wav'),
  card: require('../assets/kenney/sounds/card.wav'),
  fly: require('../assets/kenney/sounds/fly.wav'),
  crash: require('../assets/kenney/sounds/crash.wav'),
  step: require('../assets/kenney/sounds/step.wav'),
  bell: require('../assets/kenney/sounds/bell.wav'),
};

export type SoundName = keyof typeof FILES;

const KEY = 'skuska-arcade:muted';
const VOLUME: Partial<Record<SoundName, number>> = { tap: 0.6, tick: 0.5, whoosh: 0.35, bell: 0.5, step: 0.7 };
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
