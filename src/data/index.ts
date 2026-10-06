import { Question, SubjectId, Topic } from '../types';
import { shuffle } from '../util';
import { FYZ_QUESTIONS, FYZ_TOPICS } from './fyzika';
import { GENERATORS } from './generators';
import { MAT_QUESTIONS, MAT_TOPICS } from './matematika';

export const SUBJECTS: Record<SubjectId, { name: string; short: string; color: string; color2: string; icon: string; boss: string; bossIcon: string }> = {
  fyz: { name: 'Fyzika 1', short: 'Fyzika', color: '#2A56B8', color2: '#1D3F8A', icon: 'F', boss: 'Kráľ Oscilátor', bossIcon: '' },
  mat: { name: 'Matematika 1', short: 'Mata', color: '#DE5A1E', color2: '#B4441A', icon: 'M', boss: 'Determinátor', bossIcon: '' },
};

export const TOPICS: Record<SubjectId, Topic[]> = { fyz: FYZ_TOPICS, mat: MAT_TOPICS };

const ALL: Question[] = [...FYZ_QUESTIONS, ...MAT_QUESTIONS];

let genCounter = 0;

function fromGenerator(subject: SubjectId, topic?: string): Question | null {
  const gens = GENERATORS.filter((g) => g.subject === subject && (!topic || g.topic === topic));
  if (!gens.length) return null;
  const g = gens[Math.floor(Math.random() * gens.length)];
  for (let tries = 0; tries < 5; tries++) {
    const made = g.make();
    if (made.options.length >= 3) return { ...made, id: `gen-${genCounter++}`, subject, topic: g.topic };
  }
  return null;
}

/** Zostaví sadu otázok pre úroveň kampane (téma) – mix statických a generovaných. */
export function buildTopicSet(subject: SubjectId, topic: string, count: number): Question[] {
  const stat = shuffle(ALL.filter((q) => q.subject === subject && q.topic === topic));
  const hasGen = GENERATORS.some((g) => g.subject === subject && g.topic === topic);
  const nGen = hasGen ? Math.min(3, Math.floor(count / 3)) : 0;
  const out: Question[] = stat.slice(0, count - nGen);
  while (out.length < count) {
    const g = hasGen ? fromGenerator(subject, topic) : null;
    if (!g) break;
    out.push(g);
  }
  return shuffle(out);
}

/** Nekonečný zdroj otázok pre arcade/boss: nerepete, kým sa neminú statické. */
export function makeEndlessSource(subject: SubjectId, topics?: string[]) {
  let pool: Question[] = [];
  const refill = () => {
    pool = shuffle(ALL.filter((q) => q.subject === subject && (!topics || topics.includes(q.topic))));
  };
  refill();
  return (): Question => {
    if (Math.random() < 0.3) {
      const g = fromGenerator(subject, topics ? topics[Math.floor(Math.random() * topics.length)] : undefined);
      if (g) return g;
    }
    if (!pool.length) refill();
    return pool.pop()!;
  };
}

export function questionsByIds(ids: string[], subject: SubjectId): Question[] {
  const set = new Set(ids);
  return ALL.filter((q) => q.subject === subject && set.has(q.id));
}

export function countQuestions(subject: SubjectId) {
  return ALL.filter((q) => q.subject === subject).length;
}

export function countGenerators(subject: SubjectId) {
  return GENERATORS.filter((g) => g.subject === subject).length;
}
