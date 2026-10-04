import { FYZ_STEPS } from './steps-fyz';
import { MAT_STEPS } from './steps-mat';

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

export type Step = {
  title: string;
  text: string;
  /** prirovnanie zo života */
  analogy?: string;
  /** obrázok: názov z figures.tsx alebo "fyz:kmity" (interaktívny diagram témy) */
  fig?: string;
  formula?: Formula;
  worked?: Worked;
};

export const STEPS: Record<string, Step[]> = { ...FYZ_STEPS, ...MAT_STEPS };
