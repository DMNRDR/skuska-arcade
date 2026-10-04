import AsyncStorage from '@react-native-async-storage/async-storage';
import { SubjectId } from './types';

export type Progress = {
  xp: number;
  /** hviezdy podľa `${subject}:${topic}` */
  stars: Record<string, number>;
  arcadeBest: Record<SubjectId, number>;
  bossWins: Record<SubjectId, number>;
  answered: number;
  correct: number;
  bestStreak: number;
  /** id otázok, ktoré hráč pokazil (na opakovanie) */
  missed: string[];
};

const KEY = 'skuska-arcade:v1';

export const EMPTY: Progress = {
  xp: 0,
  stars: {},
  arcadeBest: { fyz: 0, mat: 0 },
  bossWins: { fyz: 0, mat: 0 },
  answered: 0,
  correct: 0,
  bestStreak: 0,
  missed: [],
};

export async function loadProgress(): Promise<Progress> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return EMPTY;
    return { ...EMPTY, ...JSON.parse(raw) };
  } catch {
    return EMPTY;
  }
}

export async function saveProgress(p: Progress) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    // ukladanie nie je kritické
  }
}

export const RANKS = ['Prvák', 'Cvičiaci', 'Bakalár', 'Inžinier', 'Doktorand', 'Docent', 'Profesor', 'Akademik', 'Nobelista'];

export function levelInfo(xp: number) {
  // level n potrebuje 100·n·(n+1)/2 XP
  let lvl = 1;
  while (100 * ((lvl * (lvl + 1)) / 2) <= xp) lvl++;
  const prev = 100 * (((lvl - 1) * lvl) / 2);
  const next = 100 * ((lvl * (lvl + 1)) / 2);
  return {
    level: lvl,
    rank: RANKS[Math.min(RANKS.length - 1, Math.floor((lvl - 1) / 2))],
    into: xp - prev,
    need: next - prev,
  };
}
