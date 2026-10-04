import { LESSON_STEPS } from './lessons';

export type Formula = {
  f: string;
  what: string;
  /** [symbol, čo znamená] */
  vars?: [string, string][];
};

export type Worked = {
  q: string;
  steps: string[];
  result: string;
};

/** malá kontrolná otázka priamo v kroku; options[0] je správna */
export type Check = {
  q: string;
  options: string[];
  explain: string;
};

export type Step = {
  title: string;
  /** výklad; odseky oddeľ prázdnym riadkom (\n\n) */
  text: string;
  /** prirovnanie zo života */
  analogy?: string;
  /** odrážky: postup, zoznam, zhrnutie */
  bullets?: string[];
  /** obrázok: názov z figures.tsx alebo "fyz:kmity" (interaktívny diagram témy), "fyz:vlny@stoj" s počiatočným režimom */
  fig?: string;
  formula?: Formula;
  worked?: Worked;
  /** "Prečo?" rozbaľovacie hlbšie vysvetlenie / odvodenie */
  deeper?: string;
  check?: Check;
};

export const STEPS: Record<string, Step[]> = LESSON_STEPS;
