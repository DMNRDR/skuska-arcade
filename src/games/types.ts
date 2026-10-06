import { Progress } from '../storage';
import { Question, SubjectId } from '../types';

export type GameId = 'dron' | 'kasino' | 'hra';

/** Výsledok jednej hry pre spoločné ukladanie postupu. */
export type GameReport = {
  game: GameId;
  /** skóre, z ktorého sa počíta rekord (väčšie = lepšie) */
  score: number;
  xp: number;
  correct: number;
  total: number;
  /** pokazené otázky z banky (generované s id "gen-…" sa ignorujú) */
  missed: Question[];
};

export type GameProps = {
  subject: SubjectId;
  progress: Progress;
  /** uloží výsledok (XP, rekord, chyby); hra potom sama ukáže svoju záverečnú obrazovku */
  onReport: (r: GameReport) => void;
  onExit: () => void;
};
