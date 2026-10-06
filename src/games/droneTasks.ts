// Logika hry "Dron geodet": generovanie úloh s vektormi, bezletové zóny, výpočty.
import { fmt, pick, rnd, shuffle } from '../util';

export type Vec = [number, number];

export const N = 10; // mapa je 0…10 × 0…10

export type TaskKind = 'point' | 'mult' | 'sum' | 'mid' | 'dist' | 'near';

export type MapPoint = {
  name: string;
  p: Vec;
  /** zobrazí sa na mape (cieľ úloh typu násobok/súčet je skrytý, kým ho dron nezameria) */
  visible: boolean;
  done?: boolean;
  /** pomocný bod pre úlohu (stred úsečky, kandidáti vzdialenosti) */
  helper?: boolean;
};

export type Task = {
  kind: TaskKind;
  label: string;
  /** veľký text úlohy */
  title: string;
  /** zadané údaje (mono) */
  given: string[];
  target: Vec;
  /** meno cieľového bodu */
  targetName: string;
  /** správny vektor letu */
  answer: Vec;
  /** riešenie krok po kroku */
  steps: string[];
  /** pomocné body, ktoré k úlohe patria (zobrazia sa na mape) */
  helpers: MapPoint[];
  /** cieľ je na mape viditeľný ešte pred letom */
  targetVisible: boolean;
};

export type Zone = { kind: 'crane' | 'power'; x: number; y: number; w: number; h: number };

export const KIND_LABEL: Record<TaskKind, string> = {
  point: 'vektor AB = B − A',
  mult: 'násobok vektora k·u',
  sum: 'súčet vektorov u + v',
  mid: 'stred úsečky',
  dist: 'dĺžka a smer vektora',
  near: 'vzdialenosť bodov |AB|',
};

// ───────── formátovanie ─────────
export const n = (x: number) => fmt(x, 3);
/** číslo v zátvorke, ak je záporné: 2 − (−3) */
export const np = (x: number) => (x < 0 ? `(${n(x)})` : n(x));
export const vec = (v: Vec) => `(${n(v[0])}, ${n(v[1])})`;
export const pt = (v: Vec) => `[${n(v[0])}, ${n(v[1])}]`;
export const add = (a: Vec, b: Vec): Vec => [a[0] + b[0], a[1] + b[1]];
export const sub = (a: Vec, b: Vec): Vec => [a[0] - b[0], a[1] - b[1]];
export const eq = (a: Vec, b: Vec) => a[0] === b[0] && a[1] === b[1];
export const len = (v: Vec) => Math.sqrt(v[0] * v[0] + v[1] * v[1]);
/** spotreba batérie = |v| zaokrúhlená na 1 desatinné miesto */
export const cost = (v: Vec) => Math.round(len(v) * 10) / 10;
const inMap = (p: Vec) => p[0] >= 0 && p[0] <= N && p[1] >= 0 && p[1] <= N;

/** Výpočet dĺžky vektora ako text: √(3² + 4²) = √25 = 5 */
export function lenText(v: Vec): string {
  const s = v[0] * v[0] + v[1] * v[1];
  const r = Math.sqrt(s);
  const exact = Number.isInteger(r);
  return `√(${np(v[0])}² + ${np(v[1])}²) = √${s}${exact ? ` = ${r}` : ` ≈ ${fmt(r, 1)}`}`;
}

/** Úsečka P→Q pretína vnútro zóny? (Liang–Barsky orezanie) */
export function crosses(P: Vec, Q: Vec, z: Zone): boolean {
  const e = 0.02;
  const xmin = z.x + e,
    xmax = z.x + z.w - e,
    ymin = z.y + e,
    ymax = z.y + z.h - e;
  const dx = Q[0] - P[0],
    dy = Q[1] - P[1];
  let t0 = 0,
    t1 = 1;
  const pp = [-dx, dx, -dy, dy];
  const qq = [P[0] - xmin, xmax - P[0], P[1] - ymin, ymax - P[1]];
  for (let i = 0; i < 4; i++) {
    if (pp[i] === 0) {
      if (qq[i] < 0) return false;
    } else {
      const t = qq[i] / pp[i];
      if (pp[i] < 0) t0 = Math.max(t0, t);
      else t1 = Math.min(t1, t);
    }
  }
  return t0 < t1;
}

export function insideZone(p: Vec, zones: Zone[]) {
  return zones.some((z) => p[0] >= z.x && p[0] <= z.x + z.w && p[1] >= z.y && p[1] <= z.y + z.h);
}

/** Dve bezletové zóny, ktoré sa neprekrývajú a nezakrývajú štart. */
export function makeZones(start: Vec): Zone[] {
  for (let tries = 0; tries < 200; tries++) {
    const zs: Zone[] = [
      { kind: 'crane', x: rnd(1, 7), y: rnd(1, 7), w: 2, h: 2 },
      { kind: 'power', x: rnd(1, 8), y: rnd(0, 6), w: 1, h: 4 },
    ];
    if (Math.random() < 0.5) zs[1] = { kind: 'power', x: rnd(0, 6), y: rnd(1, 8), w: 4, h: 1 };
    const [a, b] = zs;
    const overlap = a.x < b.x + b.w + 1 && b.x < a.x + a.w + 1 && a.y < b.y + b.h + 1 && b.y < a.y + a.h + 1;
    if (overlap || insideZone(start, zs)) continue;
    if (b.x + b.w > N || b.y + b.h > N) continue;
    return zs;
  }
  return [{ kind: 'crane', x: 6, y: 6, w: 2, h: 2 }];
}

/** Ktoré druhy úloh sú odomknuté podľa poradia kola (obtiažnosť rastie). */
export function kindsFor(round: number): TaskKind[] {
  if (round < 3) return ['point'];
  if (round < 6) return ['point', 'mult', 'mult'];
  if (round < 9) return ['point', 'mult', 'sum', 'sum'];
  if (round < 12) return ['point', 'mult', 'sum', 'mid', 'mid'];
  return ['point', 'mult', 'sum', 'mid', 'dist', 'dist', 'near', 'near'];
}

type Ctx = { A: Vec; zones: Zone[]; taken: Vec[]; nextName: () => string };

const freeSpot = (p: Vec, c: Ctx) => inMap(p) && !insideZone(p, c.zones) && !c.taken.some((t) => eq(t, p)) && !eq(p, c.A);

function randomTarget(c: Ctx, minLen = 2, maxLen = 8): Vec | null {
  for (let i = 0; i < 100; i++) {
    const p: Vec = [rnd(0, N), rnd(0, N)];
    const l = len(sub(p, c.A));
    if (l >= minLen && l <= maxLen && freeSpot(p, c)) return p;
  }
  return null;
}

function makePoint(c: Ctx): Task | null {
  const B = randomTarget(c);
  if (!B) return null;
  const name = c.nextName();
  const v = sub(B, c.A);
  return {
    kind: 'point',
    label: KIND_LABEL.point,
    title: `Prelet na bod ${name} = ${pt(B)}`,
    given: [`A = ${pt(c.A)} (dron)`, `${name} = ${pt(B)}`],
    target: B,
    targetName: name,
    answer: v,
    steps: [
      `Vektor letu je A${name} = ${name} − A`,
      `A${name} = (${n(B[0])} − ${np(c.A[0])}, ${n(B[1])} − ${np(c.A[1])}) = ${vec(v)}`,
      `Kontrola: A + ${vec(v)} = ${pt(B)}`,
    ],
    helpers: [],
    targetVisible: true,
  };
}

function makeMult(c: Ctx): Task | null {
  for (let i = 0; i < 80; i++) {
    const k = pick([2, 2, 3, -1, -2]);
    const u: Vec = [rnd(-3, 3), rnd(-3, 3)];
    if (u[0] === 0 && u[1] === 0) continue;
    const v: Vec = [k * u[0], k * u[1]];
    const B = add(c.A, v);
    if (!freeSpot(B, c) || len(v) < 2) continue;
    const name = c.nextName();
    return {
      kind: 'mult',
      label: KIND_LABEL.mult,
      title: `Posuň sa o ${n(k)}·u a zameraj bod ${name}`,
      given: [`A = ${pt(c.A)} (dron)`, `u = ${vec(u)}`],
      target: B,
      targetName: name,
      answer: v,
      steps: [
        `Násobok: každú zložku vynásobíme číslom ${n(k)}`,
        `${n(k)}·u = (${n(k)}·${np(u[0])}, ${n(k)}·${np(u[1])}) = ${vec(v)}`,
        `${name} = A + ${n(k)}·u = ${pt(c.A)} + ${vec(v)} = ${pt(B)}`,
      ],
      helpers: [],
      targetVisible: false,
    };
  }
  return null;
}

function makeSum(c: Ctx): Task | null {
  for (let i = 0; i < 80; i++) {
    const u: Vec = [rnd(-4, 4), rnd(-4, 4)];
    const w: Vec = [rnd(-4, 4), rnd(-4, 4)];
    if (len(u) === 0 || len(w) === 0) continue;
    const minus = Math.random() < 0.3;
    const v: Vec = minus ? sub(u, w) : add(u, w);
    const B = add(c.A, v);
    if (!freeSpot(B, c) || len(v) < 2) continue;
    const name = c.nextName();
    const op = minus ? '−' : '+';
    return {
      kind: 'sum',
      label: KIND_LABEL.sum,
      title: `Leť o u ${op} v a zameraj bod ${name}`,
      given: [`A = ${pt(c.A)} (dron)`, `u = ${vec(u)}`, `v = ${vec(w)}`],
      target: B,
      targetName: name,
      answer: v,
      steps: [
        `${minus ? 'Rozdiel' : 'Súčet'} vektorov počítame po zložkách`,
        `u ${op} v = (${n(u[0])} ${op} ${np(w[0])}, ${n(u[1])} ${op} ${np(w[1])}) = ${vec(v)}`,
        `${name} = A + ${vec(v)} = ${pt(B)}`,
      ],
      helpers: [],
      targetVisible: false,
    };
  }
  return null;
}

function makeMid(c: Ctx): Task | null {
  for (let i = 0; i < 150; i++) {
    const P: Vec = [rnd(0, N), rnd(0, N)];
    const Q: Vec = [rnd(0, N), rnd(0, N)];
    if ((P[0] + Q[0]) % 2 || (P[1] + Q[1]) % 2) continue;
    if (len(sub(P, Q)) < 4) continue;
    const M: Vec = [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2];
    const v = sub(M, c.A);
    if (!freeSpot(M, c) || !freeSpot(P, c) || !freeSpot(Q, c) || len(v) < 2 || eq(P, c.A) || eq(Q, c.A)) continue;
    const n1 = c.nextName();
    const n2 = c.nextName();
    const name = c.nextName();
    return {
      kind: 'mid',
      label: KIND_LABEL.mid,
      title: `Leť do stredu úsečky ${n1}${n2}`,
      given: [`A = ${pt(c.A)} (dron)`, `${n1} = ${pt(P)}`, `${n2} = ${pt(Q)}`],
      target: M,
      targetName: name,
      answer: v,
      steps: [
        `Stred S = ((x₁ + x₂)/2, (y₁ + y₂)/2)`,
        `S = ((${n(P[0])} + ${n(Q[0])})/2, (${n(P[1])} + ${n(Q[1])})/2) = ${pt(M)}`,
        `Vektor letu AS = S − A = (${n(M[0])} − ${np(c.A[0])}, ${n(M[1])} − ${np(c.A[1])}) = ${vec(v)}`,
      ],
      helpers: [
        { name: n1, p: P, visible: true, helper: true },
        { name: n2, p: Q, visible: true, helper: true },
      ],
      targetVisible: false,
    };
  }
  return null;
}

/** zlomok a/b v základnom tvare: 6/10 → 3/5, 0/2 → 0 */
function frac(a: number, b: number): string {
  const g = (x: number, y: number): number => (y ? g(y, x % y) : x);
  const d = g(Math.abs(a), Math.abs(b)) || 1;
  const p = a / d,
    q = b / d;
  return q === 1 ? n(p) : `${n(p)}/${q}`;
}

// pytagorovské základy: dĺžka je celé číslo
const BASES: Vec[] = [
  [3, 4],
  [4, 3],
  [1, 0],
  [0, 1],
];

function makeDist(c: Ctx): Task | null {
  for (let i = 0; i < 120; i++) {
    const b = pick(BASES);
    const sx = pick([1, -1]),
      sy = pick([1, -1]);
    const base: Vec = [b[0] * sx, b[1] * sy];
    const bl = len(base);
    const m = pick([1, 2]); // smerový vektor s = m·base
    const k = b[0] && b[1] ? 1 : rnd(2, 6); // výsledok = k·base
    const s: Vec = [base[0] * m, base[1] * m];
    const v: Vec = [base[0] * k, base[1] * k];
    const L = bl * k;
    const B = add(c.A, v);
    if (!freeSpot(B, c) || (m === 1 && k === 1)) continue;
    if (m === k) continue;
    const sl = len(s);
    const name = c.nextName();
    const e = `(${frac(s[0], sl)}, ${frac(s[1], sl)})`;
    return {
      kind: 'dist',
      label: KIND_LABEL.dist,
      title: `Leť vzdialenosť ${L} v smere s a zameraj bod ${name}`,
      given: [`A = ${pt(c.A)} (dron)`, `s = ${vec(s)}`, `vzdialenosť d = ${L}`],
      target: B,
      targetName: name,
      answer: v,
      steps: [
        `|s| = ${lenText(s)}`,
        `Jednotkový vektor e = s / |s| = ${e}`,
        `v = d·e = ${L}·${e} = ${vec(v)}`,
        `${name} = A + v = ${pt(B)}`,
      ],
      helpers: [],
      targetVisible: false,
    };
  }
  return null;
}

function makeNear(c: Ctx): Task | null {
  for (let i = 0; i < 120; i++) {
    const b = pick(BASES.slice(0, 2));
    const D = 5;
    const v: Vec = [b[0] * pick([1, -1]), b[1] * pick([1, -1])];
    const B = add(c.A, v);
    if (!freeSpot(B, c)) continue;
    // dvaja "falošní" kandidáti s inou dĺžkou
    const fakes: Vec[] = [];
    for (let j = 0; j < 60 && fakes.length < 2; j++) {
      const f: Vec = [c.A[0] + rnd(-5, 5), c.A[1] + rnd(-5, 5)];
      const fl = len(sub(f, c.A));
      if (Math.abs(fl - D) < 0.05 || fl < 3 || fl > 7) continue;
      if (!freeSpot(f, c) || fakes.some((g) => len(sub(g, f)) < 2) || len(sub(f, B)) < 2) continue;
      fakes.push(f);
    }
    if (fakes.length < 2) continue;
    const all = shuffle([B, ...fakes]);
    const names = all.map(() => c.nextName());
    const ti = all.findIndex((p) => eq(p, B));
    const name = names[ti];
    const lines = all.map((p, j) => {
      const d = sub(p, c.A);
      return `|A${names[j]}| = ${lenText(d)}`;
    });
    return {
      kind: 'near',
      label: KIND_LABEL.near,
      title: `Leť na ten bod, ktorý je od dronu vzdialený presne ${D}`,
      given: [`A = ${pt(c.A)} (dron)`, ...all.map((p, j) => `${names[j]} = ${pt(p)}`)],
      target: B,
      targetName: name,
      answer: v,
      steps: [`Dĺžka vektora |u| = √(x² + y²)`, ...lines, `Správny je ${name}, vektor letu ${vec(v)}`],
      helpers: all.filter((_, j) => j !== ti).map((p) => ({ name: names[all.indexOf(p)], p, visible: true, helper: true })),
      targetVisible: true,
    };
  }
  return null;
}

const MAKERS: Record<TaskKind, (c: Ctx) => Task | null> = {
  point: makePoint,
  mult: makeMult,
  sum: makeSum,
  mid: makeMid,
  dist: makeDist,
  near: makeNear,
};

/** Vytvorí úlohu pre dané kolo. Novšie typy úloh majú väčšiu váhu (sú v zozname viackrát). */
export function makeTask(round: number, A: Vec, zones: Zone[], taken: Vec[], nextName: () => string): Task {
  const kinds = kindsFor(round);
  // prvé kolo nového typu: vždy ten nový
  const fresh = [3, 6, 9, 12].indexOf(round);
  const order: TaskKind[] = fresh >= 0 ? [(['mult', 'sum', 'mid', 'dist'] as TaskKind[])[fresh]] : [];
  for (let i = 0; i < 6; i++) order.push(pick(kinds));
  order.push('point');
  for (const k of order) {
    // mená (nextName) sa berú až po úspešnom vytvorení úlohy
    const ctx: Ctx = { A, zones, taken, nextName };
    const t = MAKERS[k](ctx);
    if (t) return t;
  }
  // núdzová úloha: krátky let (vždy existuje)
  const B: Vec = A[0] < N - 1 ? [A[0] + 2, A[1]] : [A[0] - 2, A[1]];
  const name = nextName();
  return {
    kind: 'point',
    label: KIND_LABEL.point,
    title: `Prelet na bod ${name} = ${pt(B)}`,
    given: [`A = ${pt(A)} (dron)`, `${name} = ${pt(B)}`],
    target: B,
    targetName: name,
    answer: sub(B, A),
    steps: [`A${name} = ${name} − A = ${vec(sub(B, A))}`],
    helpers: [],
    targetVisible: true,
  };
}
