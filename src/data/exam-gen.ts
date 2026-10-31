import { Generator } from '../types';
import { fmt, numOptions, pick, poly, rnd, shuffle, sup, uniq } from '../util';

// Generátory na prípravu na skúšku z Matematiky 1 (týždne 1 až 6).
// Vysvetlenie je vždy postup krok po kroku (riadky oddelené \n), aby sa dalo hneď skontrolovať, kde je chyba.
// META.last drží parametre posledného príkladu; používa ho iba overovací skript, appka ho ignoruje.

export const META: { last: Record<string, unknown> | null } = { last: null };
const meta = (m: Record<string, unknown>) => {
  META.last = m;
};

type V = number[];
const vec = (v: V) => '(' + v.map((x) => fmt(x)).join(', ') + ')';
const pt = (v: V) => '[' + v.map((x) => fmt(x)).join(', ') + ']';
/** číslo do súčinu: záporné v zátvorke */
const pn = (x: number) => (x < 0 ? `(${fmt(x)})` : fmt(x));
const dot = (u: V, v: V) => u.reduce((a, x, i) => a + x * v[i], 0);
const cross = (u: V, v: V) => [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
const add = (u: V, v: V) => u.map((x, i) => x + v[i]);
const sub = (u: V, v: V) => u.map((x, i) => x - v[i]);
const scale = (u: V, k: number) => u.map((x) => x * k);
const r3 = (lo = -3, hi = 3) => [rnd(lo, hi), rnd(lo, hi), rnd(lo, hi)];
const nz = (v: V) => v.some((x) => x !== 0);
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const sum = (xs: number[]) => xs.reduce((a, x) => a + x, 0);
const SUBS = '₀₁₂₃₄₅₆₇₈₉';
const sb = (n: number) => String(n).split('').map((c) => SUBS[+c]).join('');

/** zlomok p/q v základnom tvare, „−3/4“ alebo celé číslo */
export function frac(p: number, q: number): string {
  if (q < 0) {
    p = -p;
    q = -q;
  }
  const g = gcd(p, q) || 1;
  p /= g;
  q /= g;
  return q === 1 ? fmt(p) : `${p < 0 ? '−' : ''}${Math.abs(p)}/${q}`;
}
/** √n, pri štvorci rovno číslo */
const root = (n: number) => (Number.isInteger(Math.sqrt(n)) ? fmt(Math.sqrt(n)) : `√${n}`);
/** a·x + b */
const lin = (a: number, b: number) => poly([[a, 1], [b, 0]]);
/** a·t + b (parameter priamky) */
const lt = (a: number, b: number) => lin(a, b).replace('x', 't');
/** k·x bez jednotky: x, −x, 3x */
const kx = (k: number, v = 'x') => (k === 1 ? v : k === -1 ? '−' + v : fmt(k) + v);
/** činiteľ (x − a) */
const fx = (a: number) => (a === 0 ? 'x' : a < 0 ? `(x + ${fmt(-a)})` : `(x − ${fmt(a)})`);
/** výraz v zátvorke, iba ak má viac členov */
const par = (e: string) => (/[ +−]/.test(e.slice(1)) ? `(${e})` : e);
/** „= 4“ pri presnom čísle, inak „≈ 1,17“ */
const approx = (x: number, dp = 2) => (Math.abs(x - Math.round(x * 10 ** dp) / 10 ** dp) < 1e-12 ? '= ' : '≈ ') + fmt(x, dp);
/** výraz + c so správnym znamienkom */
const plusC = (s: string, c: number) => (c === 0 ? s : `${s} ${c < 0 ? '−' : '+'} ${fmt(Math.abs(c))}`);

/** a·x + b·y + c·z + d = 0 bez nulových členov */
function linEq(terms: [number, string][], rhs?: number): string {
  const parts = terms.filter(([a]) => a !== 0);
  const left = parts
    .map(([a, v], i) => {
      const abs = Math.abs(a);
      const body = (abs === 1 && v ? '' : String(abs)) + v;
      if (i === 0) return (a < 0 ? '−' : '') + body;
      return (a < 0 ? ' − ' : ' + ') + body;
    })
    .join('');
  return (left || '0') + ' = ' + (rhs === undefined ? '0' : fmt(rhs));
}
const plane = (n: V, d: number) => linEq([[n[0], 'x'], [n[1], 'y'], [n[2], 'z'], [d, '']]);

type M2 = number[][];
const mul = (X: M2, Y: M2) => X.map((r) => Y[0].map((_, j) => sum(r.map((x, k) => x * Y[k][j]))));
const mat = (M: M2) => '[' + M.map((r) => '[' + r.map((x) => fmt(x)).join(', ') + ']').join(', ') + ']';
const sameM = (X: M2, Y: M2) => X.every((r, i) => r.every((x, j) => x === Y[i][j]));
const det3 = (m: M2) =>
  m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);

/** hodnosť matice Gaussovou elimináciou (malé celé čísla, stačí tolerancia) */
export function rank(rows: M2): number {
  const a = rows.map((r) => [...r]);
  let rk = 0;
  for (let c = 0; c < a[0].length && rk < a.length; c++) {
    let p = rk;
    while (p < a.length && Math.abs(a[p][c]) < 1e-9) p++;
    if (p === a.length) continue;
    [a[rk], a[p]] = [a[p], a[rk]];
    for (let i = rk + 1; i < a.length; i++) {
      const f = a[i][c] / a[rk][c];
      for (let j = c; j < a[0].length; j++) a[i][j] -= f * a[rk][j];
    }
    rk++;
  }
  return rk;
}

const NICE_COS: Record<number, string> = { 30: '√3/2', 45: '√2/2', 60: '1/2', 90: '0', 120: '−1/2', 135: '−√2/2', 150: '−√3/2' };
const angleOf = (cs: number) => (Math.acos(Math.max(-1, Math.min(1, cs))) * 180) / Math.PI;
const niceAngle = (deg: number, list: number[]) => list.find((a) => Math.abs(deg - a) < 1e-6);
const angleOptions = (ok: number, list: number[]) => uniq([`${ok}°`, ...shuffle(list.filter((a) => a !== ok)).map((a) => `${a}°`)]);

// pytagorejské štvorice: a² + b² + c² = d²
const QUADS: [number, number, number, number][] = [
  [1, 2, 2, 3], [2, 3, 6, 7], [1, 4, 8, 9], [4, 4, 7, 9], [2, 6, 9, 11], [0, 3, 4, 5], [6, 6, 7, 11], [2, 10, 11, 15], [0, 6, 8, 10], [3, 4, 12, 13],
];

const S = 'Príprava na skúšku';

// ───────────── DEFINIČNÝ OBOR (3. písomka) ─────────────
// Výsledok je vždy text v tvare, ktorý vie nakresliť aj číselná os: „⟨−2, 2) ∪ (2, 3)“, „ℝ ∖ {1; 3}“,
// pri tg/cotg „ℝ ∖ {π/4 + kπ/2; k ∈ ℤ}“.

/** p·π/q: „0“, „π“, „3π/4“, „−π/2“ */
export function piFrac(p: number, q: number): string {
  const g = gcd(p, q) || 1;
  p /= g;
  q /= g;
  if (q < 0) {
    p = -p;
    q = -q;
  }
  if (p === 0) return '0';
  const n = Math.abs(p) === 1 ? 'π' : `${Math.abs(p)}π`;
  return (p < 0 ? '−' : '') + n + (q === 1 ? '' : `/${q}`);
}
const set = (xs: number[]) => `ℝ ∖ {${[...new Set(xs)].sort((p, q) => p - q).map((x) => fmt(x)).join('; ')}}`;
/** interval s krajmi ako zlomky: lb/rb sú '⟨' '(' a '⟩' ')' */
const iv = (lb: string, a: number | string, b: number | string, rb: string) => `${lb}${typeof a === 'number' ? fmt(a) : a}, ${typeof b === 'number' ? fmt(b) : b}${rb}`;
/** zlomok −c/a ako text a číslo */
const fr = (p: number, q: number) => ({ t: frac(p, q), v: p / q });
const SUBN = '₀₁₂₃₄₅₆₇₈₉';

export const DF_KINDS = ['rac', 'sqrt', 'sqrtden', 'kruh', 'vonk', 'log', 'ln', 'lnk', 'tg', 'cotg', 'asin', 'sqfrac', 'lnfrac', 'lnsq', 'mix', 'mix2', 'mix3', 'logb', 'cbrt', 'atan'] as const;
export type DfKind = (typeof DF_KINDS)[number];
export const DF_LABEL: Record<DfKind, string> = {
  rac: 'zlomok', sqrt: 'odmocnina', sqrtden: 'odmocnina v menovateli', kruh: 'odmocnina z k² − x²', vonk: 'odmocnina z x² − k²',
  log: 'logaritmus', ln: 'ln z x² − k²', lnk: 'ln z k² − x²', tg: 'tangens', cotg: 'kotangens', asin: 'arcsin a arccos',
  sqfrac: 'podiel pod odmocninou', lnfrac: 'logaritmus zlomku', lnsq: 'ln a odmocnina v menovateli', mix: 'odmocnina a zlomok', mix2: 'odmocnina a logaritmus', mix3: 'odmocnina delená logaritmom',
  logb: 'logaritmus pod odmocninou', cbrt: 'nepárna odmocnina', atan: 'arctg a odmocnina',
};

export function dfMake(t: DfKind) {
  let f = '', ans = '', wrong: string[] = [], steps: string[] = [];
  const m: Record<string, unknown> = { t };
  if (t === 'sqrt' || t === 'sqrtden') {
    const a = pick([-3, -2, -1, 1, 2, 3, 5]), x0 = fr(-rnd(-6, 6), 1).v, b = -a * x0 || 0;
    Object.assign(m, { a, b });
    const den = t === 'sqrtden';
    const k = pick([1, 2, 3, 5]);
    f = den ? `${k} / √(${lin(a, b)})` : `√(${lin(a, b)})`;
    const L = den ? '(' : '⟨', R = den ? ')' : '⟩';
    ans = a > 0 ? iv(L, x0, '∞', ')') : iv('(', '−∞', x0, R);
    wrong = a > 0 ? [iv('(', '−∞', x0, R), iv(den ? '⟨' : '(', x0, '∞', ')'), set([x0])] : [iv(L, x0, '∞', ')'), iv('(', '−∞', x0, den ? '⟩' : ')'), set([x0])];
    steps = den
      ? [`1) Odmocnina je v menovateli: musí byť ≥ 0 (odmocnina) a zároveň ≠ 0 (menovateľ). Spolu ${lin(a, b)} > 0 (OSTRO).`, `2) ${kx(a)} > ${fmt(-b)}  →  x ${a > 0 ? '>' : '<'} ${fmt(x0)}${a < 0 ? ' (delíš záporným, znak sa otočí)' : ''}.`, `3) Krajný bod nepatrí, okrúhla zátvorka: D(f) = ${ans}.`]
      : [`1) Pod párnou odmocninou nesmie byť záporné číslo: ${lin(a, b)} ≥ 0.`, `2) ${kx(a)} ≥ ${fmt(-b)}  →  x ${a > 0 ? '≥' : '≤'} ${fmt(x0)}${a < 0 ? ' (delíš záporným, znak sa otočí)' : ''}.`, `3) Krajný bod patrí (√0 = 0), lomená zátvorka: D(f) = ${ans}.`];
  } else if (t === 'rac') {
    let r1 = 0, r2 = 0;
    do {
      r1 = rnd(-5, 5); r2 = rnd(-5, 5);
    } while (r1 >= r2);
    Object.assign(m, { r1, r2 });
    const den = poly([[1, 2], [-(r1 + r2), 1], [r1 * r2, 0]]);
    f = `${pick([1, 2, 3, 5])} / (${den})`;
    ans = set([r1, r2]);
    wrong = [set([-r1, -r2]), iv('(', r1, r2, ')'), 'ℝ', set([r1 + r2])];
    steps = ['1) Menovateľ nesmie byť 0.', `2) ${den} = 0  →  ${fx(r1)}${fx(r2)} = 0 (dve čísla so súčinom ${fmt(r1 * r2)} a súčtom ${fmt(r1 + r2)}).`, `3) Vyhodíš x = ${fmt(r1)} a x = ${fmt(r2)}: D(f) = ${ans}.`];
  } else if (t === 'kruh' || t === 'lnk') {
    const k = rnd(1, 6), ln = t === 'lnk';
    Object.assign(m, { k });
    f = ln ? `ln(${k * k} − x²)` : `√(${k * k} − x²)`;
    ans = ln ? iv('(', -k, k, ')') : iv('⟨', -k, k, '⟩');
    wrong = [ln ? iv('⟨', -k, k, '⟩') : iv('(', -k, k, ')'), `(−∞, −${k}${ln ? ')' : '⟩'} ∪ ${ln ? '(' : '⟨'}${k}, ∞)`, iv('⟨', 0, k, '⟩'), iv('(', k * k, '∞', ')')];
    steps = [
      `1) ${ln ? 'Argument logaritmu musí byť kladný' : 'Pod odmocninou nezáporné číslo'}: ${k * k} − x² ${ln ? '>' : '≥'} 0.`,
      `2) x² ${ln ? '<' : '≤'} ${k * k}  ⇔  |x| ${ln ? '<' : '≤'} ${k}, teda −${k} ${ln ? '<' : '≤'} x ${ln ? '<' : '≤'} ${k} (čísla bližšie k nule ako ${k}).`,
      `3) D(f) = ${ans}.`,
    ];
  } else if (t === 'vonk' || t === 'ln') {
    const k = rnd(1, 5), ln = t === 'ln';
    Object.assign(m, { k });
    f = ln ? `ln(x² − ${k * k})` : `√(x² − ${k * k})`;
    const [l, r] = ln ? [')', '('] : ['⟩', '⟨'];
    ans = `(−∞, −${k}${l} ∪ ${r}${k}, ∞)`;
    wrong = [ln ? `(−∞, −${k}⟩ ∪ ⟨${k}, ∞)` : `(−∞, −${k}) ∪ (${k}, ∞)`, iv('(', -k, k, ')'), iv('⟨', -k, k, '⟩'), iv(r, k, '∞', ')')];
    steps = [
      `1) ${ln ? 'Argument logaritmu musí byť kladný' : 'Pod odmocninou nezáporné číslo'}: x² − ${k * k} ${ln ? '>' : '≥'} 0.`,
      `2) x² ${ln ? '>' : '≥'} ${k * k}  ⇔  |x| ${ln ? '>' : '≥'} ${k}, teda x ${ln ? '<' : '≤'} −${k} alebo x ${ln ? '>' : '≥'} ${k} (dva kusy, spája ich ∪).`,
      `3) D(f) = ${ans}.`,
    ];
  } else if (t === 'log') {
    const a = pick([-3, -2, -1, 1, 2, 3, 4]), c = rnd(-7, 7), B = pick([2, 3, 4, 10]);
    const x0 = fr(-c, a);
    Object.assign(m, { a, c });
    f = `log${String(B).split('').map((d) => SUBN[+d]).join('')}(${lin(a, c)})`;
    ans = a > 0 ? iv('(', x0.t, '∞', ')') : iv('(', '−∞', x0.t, ')');
    wrong = a > 0 ? [iv('⟨', x0.t, '∞', ')'), iv('(', '−∞', x0.t, ')'), iv('(', frac(c, a), '∞', ')')] : [iv('(', '−∞', x0.t, '⟩'), iv('(', x0.t, '∞', ')'), iv('(', '−∞', frac(c, a), ')')];
    steps = [
      `1) Logaritmus (s akýmkoľvek základom) chce kladný argument: ${lin(a, c)} > 0.`,
      `2) ${kx(a)} > ${fmt(-c)}  →  x ${a > 0 ? '>' : '<'} ${x0.t}${a < 0 ? ' (delíš záporným, znak sa otočí)' : ''}.`,
      `3) Nerovnosť je ostrá → okrúhla zátvorka: D(f) = ${ans}.`,
    ];
  } else if (t === 'tg' || t === 'cotg') {
    const a = pick([1, 2, 3, 4]), cq = pick([-4, -2, -1, 0, 1, 2, 4]);
    const tg = t === 'tg';
    // nuly menovateľa: tg → a·x + c = π/2 + kπ, cotg → a·x + c = kπ; v štvrtinách π
    const base = tg ? 2 - cq : -cq;
    const n = ((base % 4) + 4) % 4;
    const per = a === 1 ? 'kπ' : `kπ/${a}`;
    const withPer = (x0: string, p: string) => (x0 === '0' ? p : `${x0} + ${p}`);
    const S0 = (x0: string, p: string) => `ℝ ∖ {${withPer(x0, p)}; k ∈ ℤ}`;
    ans = S0(piFrac(n, 4 * a), per);
    // kandidát [čitateľ, menovateľ, d]: x ≠ (čit/men)·π + k·π/d; ekvivalentné so správnou množinou sa vyhodia
    const per2 = (d: number) => (d === 1 ? 'kπ' : `kπ/${d}`);
    const same = ([u, w, d]: number[]) => d === a && Number.isInteger(Math.round(((u / w - n / (4 * a)) * a) * 1e9) / 1e9);
    wrong = [[(n + 2) % 4, 4 * a, a], [n, 4, 1], [n, 4 * a, a === 1 ? 2 : 1], [base, 4, a], [(n + 1) % 4, 4 * a, a], [n, 4, a === 1 ? 2 : a]]
      .filter((c) => !same(c))
      .map(([u, w, d]) => S0(piFrac(u, w), per2(d)));
    Object.assign(m, { a, cq, tg });
    const arg = cq === 0 ? kx(a) : `${kx(a)} ${cq < 0 ? '−' : '+'} ${piFrac(Math.abs(cq), 4)}`;
    f = `${tg ? 'tg' : 'cotg'}(${arg})`;
    steps = [
      tg ? `1) tg u = sin u / cos u, menovateľ: cos(${arg}) ≠ 0.` : `1) cotg u = cos u / sin u, menovateľ: sin(${arg}) ≠ 0.`,
      tg ? `2) cos je 0 v π/2 + kπ: ${arg} ≠ π/2 + kπ.` : `2) sin je 0 v kπ: ${arg} ≠ kπ.`,
      `3) Presuň ${cq === 0 ? 'nič, posun je 0' : piFrac(cq, 4) + ' na druhú stranu'}: ${kx(a)} ≠ ${withPer(piFrac(base, 4), 'kπ')}.`,
      a === 1
        ? `4) x ≠ ${withPer(piFrac(base, 4), per)}${base !== n ? `, čo je tá istá množina ako ${withPer(piFrac(n, 4), per)} (posun o celú periódu π)` : ''}.`
        : `4) Vydeľ ${a} (aj periódu!): x ≠ ${withPer(piFrac(base, 4 * a), per)}${piFrac(base, 4 * a) !== piFrac(n, 4 * a) ? `, čo je tá istá množina ako ${withPer(piFrac(n, 4 * a), per)} (posun o celú periódu)` : ''}.`,
      `5) D(f) = ${ans}.`,
    ];
  } else if (t === 'asin') {
    const a = pick([-2, -1, 1, 2]), b = pick([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]), cos = Math.random() < 0.5;
    Object.assign(m, { a, b });
    const p = fr(-1 - b, a), q = fr(1 - b, a);
    const [lo, hi] = p.v < q.v ? [p, q] : [q, p];
    f = `${cos ? 'arccos' : 'arcsin'}(${lin(a, b)})`;
    ans = iv('⟨', lo.t, hi.t, '⟩');
    const ord = (u: number, v: number) => (u < v ? iv('⟨', frac(u, 1), frac(v, 1), '⟩') : iv('⟨', frac(v, 1), frac(u, 1), '⟩'));
    const ordF = (u: { t: string; v: number }, v: { t: string; v: number }) => (u.v < v.v ? iv('⟨', u.t, v.t, '⟩') : iv('⟨', v.t, u.t, '⟩'));
    wrong = [iv('(', lo.t, hi.t, ')'), ordF(fr(-1 + b, a), fr(1 + b, a)), iv('⟨', -1, 1, '⟩'), ord(-1 - b, 1 - b)];
    steps = [
      `1) ${cos ? 'arccos' : 'arcsin'} vie spracovať iba čísla od −1 do 1: −1 ≤ ${lin(a, b)} ≤ 1.`,
      `2) Odčítaj ${pn(b)} od všetkých troch strán: ${fmt(-1 - b)} ≤ ${kx(a)} ≤ ${fmt(1 - b)}.`,
      `3) Vydeľ ${pn(a)}${a < 0 ? ' (záporné → oba znaky sa otočia)' : ''}: ${lo.t} ≤ x ≤ ${hi.t}.`,
      `4) Kraje patria (${cos ? 'arccos' : 'arcsin'}(±1) existuje): D(f) = ${ans}.`,
    ];
  } else if (t === 'sqfrac' || t === 'lnfrac') {
    let p = 0, q = 0;
    do {
      p = rnd(-5, 5); q = rnd(-5, 5);
    } while (p === q);
    const ln = t === 'lnfrac';
    Object.assign(m, { p, q });
    const [m1, m2] = p < q ? [p, q] : [q, p];
    const cl = (v: number) => !ln && v === p; // nula čitateľa patrí len pri odmocnine
    ans = `(−∞, ${fmt(m1)}${cl(m1) ? '⟩' : ')'} ∪ ${cl(m2) ? '⟨' : '('}${fmt(m2)}, ∞)`;
    wrong = [`(−∞, ${fmt(m1)}⟩ ∪ ⟨${fmt(m2)}, ∞)`, `(−∞, ${fmt(m1)}) ∪ (${fmt(m2)}, ∞)`, iv(cl(m1) ? '⟨' : '(', m1, m2, cl(m2) ? '⟩' : ')'), iv('(', m2, '∞', ')')];
    const fr2 = `${par(lin(1, -p))} / ${par(lin(1, -q))}`;
    f = ln ? `ln(${fr2})` : `√(${fr2})`;
    const sg = (x: number) => ((x - p) * (x - q) > 0 ? '+' : '−');
    steps = [
      ln ? `1) Logaritmus: ${fr2} > 0 (a menovateľ ≠ 0).` : `1) Odmocnina: ${fr2} ≥ 0, menovateľ ≠ 0, teda x ≠ ${fmt(q)}.`,
      `2) Nulové body: čitateľ x = ${fmt(p)}, menovateľ x = ${fmt(q)}. Rozdelia os na 3 intervaly.`,
      `3) Tabuľka znamienok (dosaď hocijaké číslo z intervalu): (−∞, ${fmt(m1)}) → ${sg(m1 - 1)},  (${fmt(m1)}, ${fmt(m2)}) → ${sg((m1 + m2) / 2)},  (${fmt(m2)}, ∞) → ${sg(m2 + 1)}.`,
      ln ? '4) Berieš plusové intervaly, krajné body nie (zlomok tam je 0 alebo nedefinovaný).' : `4) Berieš plusové intervaly. x = ${fmt(p)} patrí (zlomok = 0, √0 = 0), x = ${fmt(q)} nie (delenie nulou).`,
      `5) D(f) = ${ans}.`,
    ];
  } else if (t === 'lnsq') {
    let p = 0, q = 0;
    do {
      p = rnd(-3, 5); q = rnd(-2, 6);
    } while (p <= -q);
    Object.assign(m, { p, q });
    f = `ln(${par(lin(1, -p))} / √(${lin(1, q)}))`;
    ans = iv('(', p, '∞', ')');
    wrong = [iv('(', -q, '∞', ')'), iv('⟨', p, '∞', ')'), iv('(', -q, p, ')'), `${iv('(', -q, p, ')')} ∪ (${fmt(p)}, ∞)`];
    steps = [
      `1) Odmocnina v menovateli: ${lin(1, q)} > 0  →  x > ${fmt(-q)}.`,
      `2) Logaritmus: celý zlomok > 0. Menovateľ √(…) je kladný, takže stačí čitateľ: ${lin(1, -p)} > 0  →  x > ${fmt(p)}.`,
      `3) Prienik: x > ${fmt(-q)} a zároveň x > ${fmt(p)} → platí to väčšie, x > ${fmt(p)}.`,
      `4) D(f) = ${ans}.`,
    ];
  } else if (t === 'logb') {
    // √(a − log_B x), B = 2 alebo 0,5 (prednáška: h(x) = √(2 − log₀,₅ x))
    const a = rnd(1, 3), half = Math.random() < 0.5;
    const b = 2 ** a;
    Object.assign(m, { a, half });
    f = `√(${a} − log${half ? '₀,₅' : '₂'} x)`;
    const hb = half ? iv('⟨', frac(1, b), '∞', ')') : iv('(', 0, b, '⟩');
    ans = hb;
    wrong = half ? [iv('(', 0, frac(1, b), '⟩'), iv('⟨', b, '∞', ')'), iv('(', frac(1, b), '∞', ')')] : [iv('⟨', b, '∞', ')'), iv('(', 0, b, ')'), iv('(', '−∞', b, '⟩'), iv('⟨', frac(1, b), '∞', ')')];
    steps = [
      '1) Logaritmus: x > 0.',
      `2) Odmocnina: ${a} − log${half ? '₀,₅' : '₂'} x ≥ 0  →  log${half ? '₀,₅' : '₂'} x ≤ ${a}.`,
      `3) ${a} = log${half ? '₀,₅' : '₂'} ${half ? frac(1, b) : b} (lebo ${half ? '0,5' : '2'}${sup(a)} = ${half ? frac(1, b) : b}).`,
      half ? `4) Základ 0,5 < 1, logaritmus klesá → znak sa OTOČÍ: x ≥ ${frac(1, b)}.` : `4) Základ 2 > 1, logaritmus rastie → znak ostáva: x ≤ ${b}.`,
      `5) Spolu s x > 0: D(f) = ${ans}.`,
    ];
  } else if (t === 'cbrt') {
    const q = rnd(-5, 4), p = q + pick([-3, -2, -1, 1, 2, 3]);
    Object.assign(m, { p, q });
    f = `∛(${lin(1, -p)}) + ln(${lin(1, -q)})`;
    ans = iv('(', q, '∞', ')');
    wrong = [iv('⟨', q, '∞', ')'), iv('⟨', p, '∞', ')'), iv('(', p, '∞', ')'), set([q]), 'ℝ'].filter((w) => w !== ans);
    steps = [`1) ∛ je nepárna odmocnina, dá sa aj zo záporného čísla → žiadna podmienka.`, `2) Logaritmus: ${lin(1, -q)} > 0  →  x > ${fmt(q)}.`, `3) D(f) = ${ans}.`];
  } else if (t === 'atan') {
    let p = 0, q = 0;
    do {
      p = rnd(-4, 3); q = rnd(-3, 5);
    } while (p >= q);
    Object.assign(m, { p, q });
    f = `arctg(1 / √(${poly([[1, 2], [-(p + q), 1], [p * q, 0]])}))`;
    ans = `(−∞, ${fmt(p)}) ∪ (${fmt(q)}, ∞)`;
    wrong = [`(−∞, ${fmt(p)}⟩ ∪ ⟨${fmt(q)}, ∞)`, iv('(', p, q, ')'), set([p, q]), iv('(', q, '∞', ')')];
    steps = [
      '1) arctg nemá podmienku (prijme každé číslo).',
      `2) Odmocnina v menovateli: ${poly([[1, 2], [-(p + q), 1], [p * q, 0]])} > 0.`,
      `3) Rozlož: ${fx(p)}${fx(q)} > 0. Parabola otvorená hore je kladná MIMO koreňov ${fmt(p)} a ${fmt(q)}.`,
      `4) Ostro, kraje nie: D(f) = ${ans}.`,
    ];
  } else if (t === 'mix') {
    const p = rnd(-4, 3), q = p + rnd(1, 4);
    Object.assign(m, { p, q });
    f = `√(${lin(1, -p)}) / (${lin(1, -q)})`;
    ans = `${iv('⟨', p, q, ')')} ∪ (${fmt(q)}, ∞)`;
    wrong = [iv('⟨', p, '∞', ')'), `${iv('(', p, q, ')')} ∪ (${fmt(q)}, ∞)`, set([q]), iv('(', q, '∞', ')')];
    steps = [`1) Odmocnina: ${lin(1, -p)} ≥ 0  →  x ≥ ${fmt(p)}.`, `2) Menovateľ: ${lin(1, -q)} ≠ 0  →  x ≠ ${fmt(q)}.`, `3) Na osi: od ${fmt(p)} (patrí) doprava, s dierou v ${fmt(q)}.`, `4) D(f) = ${ans}.`];
  } else if (t === 'mix2') {
    const p = rnd(-5, 3), q = p + rnd(1, 5);
    Object.assign(m, { p, q });
    f = `√(${lin(1, -p)}) + ln(${lin(-1, q)})`;
    ans = iv('⟨', p, q, ')');
    wrong = [iv('(', p, q, ')'), iv('⟨', p, q, '⟩'), iv('⟨', p, '∞', ')'), iv('(', '−∞', q, ')')];
    steps = [`1) Odmocnina: ${lin(1, -p)} ≥ 0  →  x ≥ ${fmt(p)}.`, `2) Logaritmus: ${lin(-1, q)} > 0  →  x < ${fmt(q)}.`, `3) Musí platiť oboje (prienik): ${fmt(p)} ≤ x < ${fmt(q)}.`, `4) D(f) = ${ans}.`];
  } else {
    const p = rnd(-5, 2), q = p + rnd(2, 5);
    Object.assign(m, { p, q });
    f = `√(${lin(1, -p)}) / ln(${lin(-1, q)})`;
    ans = `${iv('⟨', p, q - 1, ')')} ∪ ${iv('(', q - 1, q, ')')}`;
    wrong = [iv('⟨', p, q, ')'), `${iv('(', p, q - 1, ')')} ∪ ${iv('(', q - 1, q, ')')}`, `${iv('⟨', p, q - 1, ')')} ∪ (${fmt(q - 1)}, ∞)`, iv('⟨', p, q - 1, ')')];
    steps = [
      `1) Odmocnina: ${lin(1, -p)} ≥ 0  →  x ≥ ${fmt(p)}.`,
      `2) Logaritmus: ${lin(-1, q)} > 0  →  x < ${fmt(q)}.`,
      `3) Menovateľ: ln(${lin(-1, q)}) ≠ 0. ln je 0 iba z jednotky: ${lin(-1, q)} ≠ 1  →  x ≠ ${fmt(q - 1)}.`,
      `4) Prienik ⟨${fmt(p)}, ${fmt(q)}) bez bodu ${fmt(q - 1)}: D(f) = ${ans}.`,
    ];
  }
  meta({ ...m, ans });
  return {
    diff: 2 as const,
    q: `Urči definičný obor funkcie f(x) = ${f}.`,
    options: uniq([ans, ...shuffle(wrong.filter((x) => x !== ans))]),
    explain: steps.join('\n'),
    src: `${S}: definičný obor (generované)`,
  };
}

/** jeden generátor na každý typ (pre 3. písomku) */
export const DF_GENS: Generator[] = DF_KINDS.map((k) => ({ subject: 'mat', topic: 'funkcie', make: () => dfMake(k) }));

export const EXAM_GENS: Generator[] = [
  // ───────────── 1. VEKTORY ─────────────
  {
    subject: 'mat', topic: 'vektory',
    make: () => {
      const [p, q, r, len] = pick(QUADS);
      const u = shuffle([p, q, r]).map((x) => (Math.random() < 0.5 ? -x : x) || 0);
      const A = r3(-4, 4);
      const B = add(A, u);
      const s2 = dot(u, u);
      meta({ A, B, ans: len });
      return {
        diff: 1,
        q: `Body A = ${pt(A)} a B = ${pt(B)}. Aká je dĺžka úsečky AB?`,
        options: numOptions(len, [s2, sum(u.map(Math.abs)), len + 1], 0),
        explain: [
          `1) Vektor AB = B − A = ${vec(u)}.`,
          `2) |AB| = √(${u.map((x) => pn(x) + '²').join(' + ')}) = √(${u.map((x) => x * x).join(' + ')}) = √${s2}.`,
          `3) √${s2} = ${len}.`,
        ].join('\n'),
        src: `${S}: dĺžka vektora (generované)`,
      };
    },
  },
  {
    subject: 'mat', topic: 'vektory',
    make: () => {
      let a = 0, b = 0, c = 0, d = 1, e = 0, s = 0, t = 0;
      do {
        a = rnd(-4, 4); b = rnd(-4, 4); c = rnd(-4, 4); e = rnd(-4, 4); d = pick([-2, -1, 1, 2]);
        s = a * c + b * e;
        t = -s / d || 0;
      } while (!Number.isInteger(t) || Math.abs(t) > 9 || (a === 0 && b === 0));
      meta({ u: [a, t, b], v: [c, d, e], ans: t });
      const dt = `${d < 0 ? '−' : '+'} ${Math.abs(d) === 1 ? '' : Math.abs(d)}t`;
      return {
        diff: 2,
        q: `Pre aké t sú vektory u = (${fmt(a)}, t, ${fmt(b)}) a v = ${vec([c, d, e])} na seba kolmé?`,
        options: numOptions(t, [-t, s, t + 1], 0).map((o) => 't = ' + o),
        explain: [
          '1) Kolmé vektory majú skalárny súčin 0: u·v = 0.',
          `2) u·v = ${pn(a)}·${pn(c)} + t·${pn(d)} + ${pn(b)}·${pn(e)} = ${fmt(s)} ${dt}.`,
          `3) ${fmt(s)} ${dt} = 0  →  t = ${fmt(t)}.`,
          `4) Skúška: ${pn(a)}·${pn(c)} + ${pn(t)}·${pn(d)} + ${pn(b)}·${pn(e)} = ${fmt(a * c + t * d + b * e)} ✓`,
        ].join('\n'),
        src: `${S}: kolmosť vektorov (generované)`,
      };
    },
  },
  {
    subject: 'mat', topic: 'vektory',
    make: () => {
      let u: V, v: V, c: V;
      do {
        u = r3(); v = r3(); c = cross(u, v);
      } while (!nz(c));
      const A = r3(-3, 4);
      const B = add(A, u);
      const C = add(A, v);
      const n2 = dot(c, c);
      const Sx = Math.sqrt(n2) / 2;
      meta({ A, B, C, ans: Sx });
      return {
        diff: 2,
        q: `Vypočítaj obsah trojuholníka ABC: A = ${pt(A)}, B = ${pt(B)}, C = ${pt(C)}.`,
        options: numOptions(Sx, [2 * Sx, n2 / 2, sum(c.map(Math.abs)) / 2], 2),
        explain: [
          `1) AB = B − A = ${vec(u)},  AC = C − A = ${vec(v)}.`,
          `2) AB × AC = (${pn(u[1])}·${pn(v[2])} − ${pn(u[2])}·${pn(v[1])}, ${pn(u[2])}·${pn(v[0])} − ${pn(u[0])}·${pn(v[2])}, ${pn(u[0])}·${pn(v[1])} − ${pn(u[1])}·${pn(v[0])}) = ${vec(c)}.`,
          `3) |AB × AC| = √(${c.map((x) => x * x).join(' + ')}) = ${root(n2)}.`,
          `4) S = ½·|AB × AC| = ½·${root(n2)} ${approx(Sx)}.`,
        ].join('\n'),
        src: `${S}: obsah trojuholníka (generované)`,
      };
    },
  },
  {
    subject: 'mat', topic: 'vektory',
    make: () => {
      let u: V, v: V, w: V, m = 0;
      do {
        u = r3(); v = r3(); w = r3(); m = dot(cross(u, v), w);
      } while (m === 0);
      const c = cross(u, v);
      const tetra = Math.random() < 0.5;
      const ans = tetra ? Math.abs(m) / 6 : Math.abs(m);
      meta({ u, v, w, tetra, ans });
      return {
        diff: 3,
        q: tetra
          ? `Štvorsten má z jedného vrcholu hrany u = ${vec(u)}, v = ${vec(v)}, w = ${vec(w)}. Aký má objem?`
          : `Aký objem má rovnobežnosten určený vektormi u = ${vec(u)}, v = ${vec(v)}, w = ${vec(w)}?`,
        options: numOptions(ans, tetra ? [Math.abs(m), Math.abs(m) / 2, Math.abs(m) / 3] : [Math.abs(m) / 6, Math.abs(m) / 2, Math.abs(m) + 2], 2),
        explain: [
          `1) u × v = ${vec(c)}.`,
          `2) Zmiešaný súčin [u, v, w] = (u × v)·w = ${c.map((x, i) => `${pn(x)}·${pn(w[i])}`).join(' + ')} = ${fmt(m)}.`,
          tetra
            ? `3) Objem štvorstena = |[u, v, w]| / 6 = ${Math.abs(m)}/6 ${frac(Math.abs(m), 6) !== `${Math.abs(m)}/6` ? `= ${frac(Math.abs(m), 6)} ` : ''}${approx(ans)}.`
            : `3) Objem rovnobežnostena = |[u, v, w]| = |${fmt(m)}| = ${Math.abs(m)}.`,
        ].join('\n'),
        src: `${S}: zmiešaný súčin a objem (generované)`,
      };
    },
  },
  {
    subject: 'mat', topic: 'vektory',
    make: () => {
      const LIST = [30, 45, 60, 90, 120, 135, 150];
      let u: V = [1, 0, 0], v: V = [0, 1, 0], ang: number | undefined;
      do {
        u = r3(-2, 2); v = r3(-2, 2);
        ang = nz(u) && nz(v) ? niceAngle(angleOf(dot(u, v) / Math.sqrt(dot(u, u) * dot(v, v))), LIST) : undefined;
      } while (ang === undefined);
      const d = dot(u, v), p = dot(u, u), q = dot(v, v);
      meta({ u, v, ans: ang });
      return {
        diff: 2,
        q: `Aký uhol zvierajú vektory u = ${vec(u)} a v = ${vec(v)}?`,
        options: angleOptions(ang, LIST),
        explain: [
          `1) u·v = ${u.map((x, i) => `${pn(x)}·${pn(v[i])}`).join(' + ')} = ${fmt(d)}.`,
          `2) |u| = √${p},  |v| = √${q}.`,
          `3) cos φ = u·v / (|u|·|v|) = ${fmt(d)} / √${p * q} ${approx(d / Math.sqrt(p * q), 3)}.`,
          `4) To je ${NICE_COS[ang]}, teda φ = ${ang}°.`,
        ].join('\n'),
        src: `${S}: uhol vektorov (generované)`,
      };
    },
  },

  // ───────────── 2. ANALYTICKÁ GEOMETRIA ─────────────
  {
    subject: 'mat', topic: 'geometria',
    make: () => {
      let s1: V;
      do s1 = r3(); while (!nz(s1));
      const A1 = r3();
      const kind = pick(['rov', 'tot', 'roz', 'mim']);
      let s2: V = s1, A2: V = A1;
      if (kind === 'rov' || kind === 'tot') {
        s2 = scale(s1, pick([-2, -1, 2]));
        if (kind === 'tot') A2 = add(A1, scale(s1, pick([-2, -1, 1, 2])));
        else {
          let w: V;
          do w = r3(); while (!nz(cross(w, s1)));
          A2 = add(A1, w);
        }
      } else if (kind === 'roz') {
        do s2 = r3(); while (!nz(cross(s1, s2)));
        const P = add(A1, scale(s1, rnd(-2, 2)));
        A2 = sub(P, scale(s2, rnd(-2, 2)));
      } else {
        let w: V;
        do {
          s2 = r3(); w = r3();
        } while (!nz(cross(s1, s2)) || dot(cross(s1, s2), w) === 0);
        A2 = add(A1, w);
      }
      // poloha sa určí výpočtom, nie z konštrukcie
      const c = cross(s1, s2);
      const AB = sub(A2, A1);
      const mix = dot(c, AB);
      const L = ['rovnobežné (rôzne)', 'totožné', 'rôznobežné (pretínajú sa)', 'mimobežné'];
      const truth = !nz(c) ? (nz(cross(AB, s1)) ? L[0] : L[1]) : mix === 0 ? L[2] : L[3];
      meta({ A1, s1, A2, s2, ans: truth });
      const lines = [`1) Smery: s₁ = ${vec(s1)}, s₂ = ${vec(s2)}.`, `2) s₁ × s₂ = ${vec(c)}${nz(c) ? ' ≠ o, smery nie sú rovnobežné.' : ' = o, smery sú rovnobežné.'}`];
      if (!nz(c)) {
        lines.push(`3) Leží bod A₂ = ${pt(A2)} na p? A₁A₂ = ${vec(AB)}, A₁A₂ × s₁ = ${vec(cross(AB, s1))}.`);
        lines.push(nz(cross(AB, s1)) ? '4) Nie je nulový, bod na p neleží → rovnobežné rôzne.' : '4) Je nulový, bod leží na p → priamky sú totožné.');
      } else {
        lines.push(`3) A₁A₂ = ${vec(AB)}, zmiešaný súčin [A₁A₂, s₁, s₂] = (s₁ × s₂)·A₁A₂ = ${fmt(mix)}.`);
        lines.push(mix === 0 ? '4) Je 0, priamky ležia v jednej rovine → rôznobežné.' : '4) Nie je 0, priamky neležia v jednej rovine → mimobežné.');
      }
      return {
        diff: 3,
        q: `Aká je vzájomná poloha priamok\np: X = ${pt(A1)} + t·${vec(s1)}\nq: X = ${pt(A2)} + r·${vec(s2)}?`,
        options: [truth, ...shuffle(L.filter((x) => x !== truth))],
        explain: lines.join('\n'),
        src: `${S}: vzájomná poloha priamok (generované)`,
      };
    },
  },
  {
    subject: 'mat', topic: 'geometria',
    make: () => {
      let n: V, s: V;
      do {
        n = r3(); s = r3(-2, 2);
      } while (!nz(n) || !nz(s) || dot(n, s) === 0);
      const A = r3();
      const t0 = rnd(-3, 3);
      const X = add(A, scale(s, t0));
      const d = -dot(n, X);
      const ns = dot(n, s);
      const c0 = dot(n, A) + d;
      meta({ A, s, n, d, ans: X });
      return {
        diff: 2,
        q: `Nájdi priesečník priamky p: X = ${pt(A)} + t·${vec(s)} a roviny ρ: ${plane(n, d)}.`,
        options: uniq([pt(X), pt(add(A, scale(s, -t0))), pt(add(A, scale(s, t0 + 1))), pt(A), pt(add(A, scale(s, t0 - 1)))]),
        explain: [
          `1) Bod priamky: x = ${lt(s[0], A[0])}, y = ${lt(s[1], A[1])}, z = ${lt(s[2], A[2])}.`,
          `2) Dosaď do roviny: ${fmt(ns)}·t ${c0 < 0 ? '−' : '+'} ${fmt(Math.abs(c0))} = 0.`,
          `3) t = ${fmt(t0)}.`,
          `4) X = ${pt(A)} + ${pn(t0)}·${vec(s)} = ${pt(X)}.`,
          `5) Skúška: ${n.map((x, i) => `${pn(x)}·${pn(X[i])}`).join(' + ')} ${d < 0 ? '−' : '+'} ${fmt(Math.abs(d))} = ${fmt(dot(n, X) + d)} ✓`,
        ].join('\n'),
        src: `${S}: priesečník priamky s rovinou (generované)`,
      };
    },
  },
  {
    subject: 'mat', topic: 'geometria',
    make: () => {
      const LIST = [30, 45, 60, 90];
      let n1: V = [1, 0, 0], n2: V = [0, 1, 0], ang: number | undefined;
      do {
        n1 = r3(-2, 2); n2 = r3(-2, 2);
        ang = nz(n1) && nz(n2) ? niceAngle(angleOf(Math.abs(dot(n1, n2)) / Math.sqrt(dot(n1, n1) * dot(n2, n2))), LIST) : undefined;
      } while (ang === undefined);
      const d1 = rnd(-6, 6), d2 = rnd(-6, 6);
      const d = Math.abs(dot(n1, n2)), p = dot(n1, n1), q = dot(n2, n2);
      meta({ n1, n2, ans: ang });
      return {
        diff: 2,
        q: `Aký uhol zvierajú roviny ρ: ${plane(n1, d1)} a σ: ${plane(n2, d2)}?`,
        options: angleOptions(ang, LIST),
        explain: [
          `1) Normálové vektory: n₁ = ${vec(n1)}, n₂ = ${vec(n2)}.`,
          `2) |n₁·n₂| = |${n1.map((x, i) => `${pn(x)}·${pn(n2[i])}`).join(' + ')}| = ${d}.`,
          `3) cos α = |n₁·n₂| / (|n₁|·|n₂|) = ${d} / (√${p}·√${q}) ${approx(d / Math.sqrt(p * q), 3)}.`,
          `4) To je ${NICE_COS[ang]}, teda α = ${ang}°.`,
        ].join('\n'),
        src: `${S}: uhol dvoch rovín (generované)`,
      };
    },
  },
  {
    subject: 'mat', topic: 'geometria',
    make: () => {
      let u: V, v: V, raw: V;
      do {
        u = r3(); v = r3(); raw = cross(u, v);
      } while (!nz(raw));
      const g = gcd(gcd(raw[0], raw[1]), raw[2]);
      const sign = (raw.find((x) => x !== 0) ?? 1) < 0 ? -1 : 1;
      const n = raw.map((x) => (sign * x) / g || 0);
      const A = r3(), B = add(A, u), C = add(A, v);
      const d = -dot(n, A) || 0;
      const passes = (m: V, e: number) => [A, B, C].every((P) => dot(m, P) + e === 0);
      const n2 = [n[0], -n[1], n[2]];
      const wrong: [V, number][] = [[n, -d], [n2, -dot(n2, A)], [u, -dot(u, A)], [n, d + 1]];
      meta({ A, B, C, n, d });
      return {
        diff: 3,
        q: `Napíš všeobecnú rovnicu roviny cez body A = ${pt(A)}, B = ${pt(B)}, C = ${pt(C)}.`,
        options: uniq([plane(n, d), ...wrong.filter(([m, e]) => nz(m) && !passes(m, e)).map(([m, e]) => plane(m, e))]),
        explain: [
          `1) AB = ${vec(u)},  AC = ${vec(v)}.`,
          `2) Normála n = AB × AC = ${vec(raw)}${g !== 1 || sign < 0 ? ` → vydelíme ${fmt(sign * g)}: n = ${vec(n)}` : ''}.`,
          `3) Rovnica ${linEq([[n[0], 'x'], [n[1], 'y'], [n[2], 'z']]).replace(' = 0', '')} + d = 0, dosaď A: d = −(${n.map((x, i) => `${pn(x)}·${pn(A[i])}`).join(' + ')}) = ${fmt(d)}.`,
          `4) Skúška B: ${fmt(dot(n, B) + d)} = 0 ✓, C: ${fmt(dot(n, C) + d)} = 0 ✓`,
        ].join('\n'),
        src: `${S}: rovina cez tri body (generované)`,
      };
    },
  },

  // ───────────── 3. MATICE ─────────────
  {
    subject: 'mat', topic: 'matice',
    make: () => {
      const r = pick([1, 2, 2, 3]);
      const row = () => [rnd(-3, 3), rnd(-3, 3), rnd(-3, 3), rnd(-3, 3)];
      let base: M2 = [];
      let relOf: (lab: (i: number) => string) => string = () => '';
      if (r === 1) {
        let R1: V;
        do R1 = row(); while (!nz(R1));
        const k = pick([-2, -1, 2, 3]), m = pick([-3, 2, -2].filter((x) => x !== k));
        base = [R1, scale(R1, k), scale(R1, m)];
        relOf = (lab) => `${lab(1)} = ${fmt(k)}·${lab(0)} a ${lab(2)} = ${fmt(m)}·${lab(0)}, všetky riadky sú násobky jedného.`;
      } else if (r === 2) {
        let R1: V, R2: V;
        do {
          R1 = row(); R2 = row();
        } while (rank([R1, R2]) < 2);
        const a = pick([1, -1, 2]), b = pick([1, -1, 2, -2]);
        base = [R1, R2, add(scale(R1, a), scale(R2, b))];
        relOf = (lab) => `${lab(2)} = ${kx(a, lab(0))} ${b < 0 ? '−' : '+'} ${kx(Math.abs(b), lab(1))}, teda po úprave ${lab(2)} vyjde nulový.`;
      } else {
        do base = [row(), row(), row()];
        while (rank(base) < 3);
        relOf = () => 'Žiadny riadok nie je kombináciou ostatných, v stupňovitom tvare ostanú 3 nenulové riadky.';
      }
      const order = shuffle([0, 1, 2]);
      const rows = order.map((i) => base[i]);
      const lab = (i: number) => `R${order.indexOf(i) + 1}`;
      const h = rank(rows);
      meta({ rows, ans: h });
      return {
        diff: 2,
        q: `Aká je hodnosť matice A s riadkami\n${rows.map((x, i) => `R${i + 1} = ${vec(x)}`).join('\n')}?`,
        options: uniq([`h(A) = ${h}`, ...[1, 2, 3, 4].filter((x) => x !== h).map((x) => `h(A) = ${x}`)]),
        explain: [`1) ${relOf(lab)}`, `2) Hodnosť = počet nenulových riadkov v stupňovitom tvare = ${h}.`].join('\n'),
        src: `${S}: hodnosť matice (generované)`,
      };
    },
  },
  {
    subject: 'mat', topic: 'matice',
    make: () => {
      const m = rnd(1, 4), n = rnd(2, 4), q = rnd(1, 4);
      const ok = Math.random() < 0.7;
      const p = ok ? n : pick([1, 2, 3, 4].filter((x) => x !== n));
      const NO = 'súčin A·B neexistuje';
      const ans = ok ? `${m}×${q}` : NO;
      meta({ m, n, p, q, ans });
      return {
        diff: 1,
        q: `Matica A je typu ${m}×${n}, matica B je typu ${p}×${q}. Akého typu je súčin A·B?`,
        options: uniq([ans, ...[`${n}×${p}`, `${m}×${n}`, `${p}×${q}`, `${q}×${m}`, `${m + 1}×${q}`, `${m}×${q + 1}`, NO].filter((x) => x !== ans)]),
        explain: ok
          ? `1) Počet stĺpcov A = ${n}, počet riadkov B = ${p}: rovnajú sa, súčin existuje.\n2) Výsledok má počet riadkov z A a počet stĺpcov z B: ${m}×${q}.`
          : `1) Počet stĺpcov A = ${n}, počet riadkov B = ${p}.\n2) ${n} ≠ ${p}, riadok A sa nedá „prenásobiť“ so stĺpcom B, súčin neexistuje.`,
        src: `${S}: kedy sa dá násobiť (generované)`,
      };
    },
  },
  {
    subject: 'mat', topic: 'matice',
    make: () => {
      const A = [0, 1].map(() => [rnd(-3, 4), rnd(-3, 4), rnd(-3, 4)]);
      const B = [0, 1, 2].map(() => [rnd(-3, 4), rnd(-3, 4)]);
      const i = rnd(0, 1), j = rnd(0, 1);
      const terms = [0, 1, 2].map((k) => A[i][k] * B[k][j]);
      const c = sum(terms);
      meta({ A, B, i, j, ans: c });
      return {
        diff: 1,
        q: `A = ${mat(A)} (2×3), B = ${mat(B)} (3×2). Aký je prvok c${sb(i + 1)}${sb(j + 1)} súčinu C = A·B?`,
        options: numOptions(c, [terms[0] + terms[1], -c, sum([0, 1, 2].map((k) => A[1 - i][k] * B[k][j]))], 0),
        explain: [
          `1) c${sb(i + 1)}${sb(j + 1)} = ${i + 1}. riadok A · ${j + 1}. stĺpec B.`,
          `2) ${vec(A[i])} · ${vec(B.map((r) => r[j]))} = ${[0, 1, 2].map((k) => `${pn(A[i][k])}·${pn(B[k][j])}`).join(' + ')}`,
          `3) = ${terms.map((x) => pn(x)).join(' + ')} = ${fmt(c)}.`,
        ].join('\n'),
        src: `${S}: násobenie matíc (generované)`,
      };
    },
  },

  // ───────────── 4. DETERMINANTY, SÚSTAVY, MATICOVÁ ROVNICA ─────────────
  {
    subject: 'mat', topic: 'determinanty',
    make: () => {
      const n = rnd(2, 4), m = rnd(2, 4);
      const hA = rnd(1, Math.min(m, n));
      const hAb = hA < m && Math.random() < 0.35 ? hA + 1 : hA;
      const par = (k: number) => `nekonečne veľa riešení (${k} ${k === 1 ? 'parameter' : 'parametre'})`;
      const L = ['nemá riešenie', 'práve jedno riešenie', par(1), par(2), par(3)];
      const ans = hAb > hA ? L[0] : hA === n ? L[1] : par(n - hA);
      meta({ n, m, hA, hAb, ans });
      return {
        diff: 2,
        q: `Sústava ${m} rovnice o ${n} neznámych má h(A) = ${hA} a h(A|b) = ${hAb}. Koľko má riešení?`,
        options: uniq([ans, ...shuffle(L.filter((x) => x !== ans))]),
        explain: [
          '1) Frobeniova veta: sústava je riešiteľná, len keď h(A) = h(A|b).',
          hAb > hA
            ? `2) ${hA} ≠ ${hAb}, sústava nemá riešenie (v stupňovitom tvare vyjde 0 = nenulové číslo).`
            : hA === n
              ? `2) ${hA} = ${hAb} a hodnosť = počet neznámych n = ${n} → práve jedno riešenie.`
              : `2) ${hA} = ${hAb}, ale hodnosť < n = ${n} → nekonečne veľa riešení s n − h = ${n} − ${hA} = ${n - hA} ${n - hA === 1 ? 'parametrom' : 'parametrami'}.`,
        ].join('\n'),
        src: `${S}: Frobeniova veta (generované)`,
      };
    },
  },
  {
    subject: 'mat', topic: 'determinanty',
    make: () => {
      let a = 0, b = 0, c = 0, d = 0;
      do {
        a = rnd(-3, 4); b = rnd(-3, 4); c = rnd(-3, 4); d = rnd(-3, 4);
      } while (Math.abs(a * d - b * c) !== 1);
      const D = a * d - b * c;
      const A = [[a, b], [c, d]];
      const Ai = [[d / D, -b / D], [-c / D, a / D]].map((r) => r.map((x) => x || 0));
      let X: M2;
      do X = [[rnd(-3, 3), rnd(-3, 3)], [rnd(-3, 3), rnd(-3, 3)]];
      while (X.flat().filter((x) => x !== 0).length < 3);
      const left = Math.random() < 0.5;
      const B = left ? mul(A, X) : mul(X, A);
      const wrong = [
        left ? mul(B, Ai) : mul(Ai, B),
        mul(A, B),
        mul(B, A),
        [[X[0][0], X[1][0]], [X[0][1], X[1][1]]],
        X.map((r) => r.map((x) => -x || 0)),
        [[X[0][0] + 1, X[0][1]], [X[1][0], X[1][1] - 1]],
      ].filter((W) => !sameM(W, X));
      meta({ A, B, left, ans: X });
      return {
        diff: 3,
        q: `Vyrieš maticovú rovnicu ${left ? 'A·X = B' : 'X·A = B'}, kde A = ${mat(A)}, B = ${mat(B)}.`,
        options: uniq([mat(X), ...wrong.map(mat)]),
        explain: [
          `1) det A = ${pn(a)}·${pn(d)} − ${pn(b)}·${pn(c)} = ${fmt(D)} ≠ 0, A⁻¹ existuje.`,
          `2) A⁻¹ = (1/${fmt(D)})·${mat([[d, -b], [-c, a]])} = ${mat(Ai)}.`,
          left ? '3) Rovnicu vynásob ZĽAVA maticou A⁻¹: X = A⁻¹·B.' : '3) Rovnicu vynásob SPRAVA maticou A⁻¹: X = B·A⁻¹.',
          `4) X = ${mat(left ? mul(Ai, B) : mul(B, Ai))}.`,
          `5) Skúška: ${left ? 'A·X' : 'X·A'} = ${mat(left ? mul(A, X) : mul(X, A))} = B ✓`,
        ].join('\n'),
        src: `${S}: maticová rovnica (generované)`,
      };
    },
  },
  {
    subject: 'mat', topic: 'determinanty',
    make: () => {
      const sol = r3(-3, 3);
      let M: M2, D = 0;
      do {
        M = [0, 1, 2].map(() => [rnd(-2, 3), rnd(-2, 3), rnd(-2, 3)]);
        D = det3(M);
      } while (D === 0 || Math.abs(D) > 30 || M.some((r) => !nz(r)));
      const b = M.map((r) => dot(r, sol));
      const col = (k: number) => M.map((r, i) => r.map((x, j) => (j === k ? b[i] : x)));
      const Ds = [0, 1, 2].map((k) => det3(col(k)));
      const eq = (r: V, rhs: number) => linEq([[r[0], 'x'], [r[1], 'y'], [r[2], 'z']], rhs);
      const so = (v: V) => `x = ${fmt(v[0])}, y = ${fmt(v[1])}, z = ${fmt(v[2])}`;
      const [x, y, z] = sol;
      meta({ M, b, ans: sol });
      return {
        diff: 3,
        q: `Vyrieš sústavu:\n${M.map((r, i) => eq(r, b[i])).join('\n')}`,
        options: uniq([so(sol), so([y, x, z]), so([x, z, y]), so([-x, y, z]), so([x, y, z + 1]), so([x + 1, y - 1, z])]),
        explain: [
          `1) D = det A = ${fmt(D)} ≠ 0, h(A) = h(A|b) = 3 = n → práve jedno riešenie (Frobenius).`,
          `2) Cramer: Dx = ${fmt(Ds[0])}, Dy = ${fmt(Ds[1])}, Dz = ${fmt(Ds[2])} (stĺpec neznámej nahradíš pravou stranou).`,
          `3) x = Dx/D = ${frac(Ds[0], D)}, y = Dy/D = ${frac(Ds[1], D)}, z = Dz/D = ${frac(Ds[2], D)}.`,
          `4) Skúška v 1. rovnici: ${M[0].map((c, i) => `${pn(c)}·${pn(sol[i])}`).join(' + ')} = ${fmt(dot(M[0], sol))} ✓ (rovnako dosaď do ostatných).`,
          '(Gaussovou elimináciou vyjde to isté, pozri riešený príklad.)',
        ].join('\n'),
        src: `${S}: sústava 3×3 (generované)`,
      };
    },
  },

  // ───────────── 5. FUNKCIE ─────────────
  { subject: 'mat', topic: 'funkcie', make: () => dfMake(pick(DF_KINDS)) },
  {
    subject: 'mat', topic: 'funkcie',
    make: () => {
      const L = ['párna', 'nepárna', 'ani párna, ani nepárna', 'párna aj nepárna'];
      if (Math.random() < 0.55) {
        let e1 = 0, e2 = 0;
        do {
          e1 = rnd(0, 5); e2 = rnd(1, 5);
        } while (e1 === e2);
        const a = pick([-4, -3, -2, -1, 1, 2, 3, 5]), b = pick([-5, -2, -1, 1, 2, 3, 4]);
        const terms = [[a, Math.max(e1, e2)], [b, Math.min(e1, e2)]] as [number, number][];
        const evens = terms.filter(([, e]) => e % 2 === 0).length;
        const ans = evens === 2 ? L[0] : evens === 0 ? L[1] : L[2];
        const neg = terms.map(([c, e]) => [e % 2 ? -c : c, e] as [number, number]);
        meta({ terms, ans });
        return {
          diff: 1,
          q: `Je funkcia f(x) = ${poly(terms)} párna, nepárna, alebo ani jedno?`,
          options: [ans, ...L.filter((x) => x !== ans)],
          explain: [
            '1) Dosaď −x: párna mocnina znamienko „zje“, nepárna ho nechá.',
            `2) f(−x) = ${poly(neg)}.`,
            evens === 2 ? '3) f(−x) = f(x) → párna (graf súmerný podľa osi y).' : evens === 0 ? '3) f(−x) = −f(x) → nepárna (graf súmerný podľa počiatku).' : '3) Nie je to ani f(x), ani −f(x) → ani párna, ani nepárna.',
          ].join('\n'),
          src: `${S}: párnosť funkcie (generované)`,
        };
      }
      const ITEMS: { f: string; ans: number; why: string; fn: (x: number) => number }[] = [
        { f: 'x²·cos x', ans: 0, why: '(−x)²·cos(−x) = x²·cos x, lebo cos je párna', fn: (x) => x * x * Math.cos(x) },
        { f: 'x·sin x', ans: 0, why: '(−x)·sin(−x) = (−x)·(−sin x) = x·sin x', fn: (x) => x * Math.sin(x) },
        { f: 'x³·cos x', ans: 1, why: '(−x)³·cos(−x) = −x³·cos x = −f(x)', fn: (x) => x ** 3 * Math.cos(x) },
        { f: 'sin x + x', ans: 1, why: 'sin(−x) + (−x) = −sin x − x = −f(x)', fn: (x) => Math.sin(x) + x },
        { f: 'cos x + x', ans: 2, why: 'cos(−x) − x = cos x − x, to nie je f(x) ani −f(x)', fn: (x) => Math.cos(x) + x },
        { f: 'eˣ − e⁻ˣ', ans: 1, why: 'e⁻ˣ − eˣ = −(eˣ − e⁻ˣ) = −f(x)', fn: (x) => Math.exp(x) - Math.exp(-x) },
        { f: 'eˣ + e⁻ˣ', ans: 0, why: 'e⁻ˣ + eˣ = f(x)', fn: (x) => Math.exp(x) + Math.exp(-x) },
        { f: 'x / (x² + 1)', ans: 1, why: '(−x)/((−x)² + 1) = −x/(x² + 1) = −f(x)', fn: (x) => x / (x * x + 1) },
        { f: 'ln(x² + 1)', ans: 0, why: 'ln((−x)² + 1) = ln(x² + 1) = f(x)', fn: (x) => Math.log(x * x + 1) },
        { f: 'eˣ', ans: 2, why: 'e⁻ˣ = 1/eˣ, to nie je eˣ ani −eˣ', fn: (x) => Math.exp(x) },
        { f: '|x| + cos x', ans: 0, why: '|−x| + cos(−x) = |x| + cos x = f(x)', fn: (x) => Math.abs(x) + Math.cos(x) },
        { f: 'sin x · cos x', ans: 1, why: 'sin(−x)·cos(−x) = −sin x·cos x = −f(x)', fn: (x) => Math.sin(x) * Math.cos(x) },
        { f: 'x² + sin x', ans: 2, why: 'x² − sin x, to nie je f(x) ani −f(x)', fn: (x) => x * x + Math.sin(x) },
      ];
      const it = pick(ITEMS);
      meta({ fn: it.fn, ans: L[it.ans] });
      return {
        diff: 2,
        q: `Je funkcia f(x) = ${it.f} párna, nepárna, alebo ani jedno?`,
        options: [L[it.ans], ...L.filter((_, k) => k !== it.ans)],
        explain: `1) Vypočítaj f(−x): ${it.why}.\n2) Preto je ${L[it.ans]}.\nPamätaj: cos je párna, sin a x³ nepárne, párna·párna = párna, nepárna·nepárna = párna, párna·nepárna = nepárna.`,
        src: `${S}: párnosť funkcie (generované)`,
      };
    },
  },
  {
    subject: 'mat', topic: 'funkcie',
    make: () => {
      const t = pick(['lin', 'exp', 'lom']);
      if (t === 'lin') {
        const a = pick([-5, -4, -3, -2, 2, 3, 4, 5]), b = pick([-7, -5, -3, -2, -1, 1, 2, 4, 6]);
        // (p·x + q)/r so znamienkom v čitateli
        const R = (p: number, q: number, r: number): string => (r < 0 ? R(-p, -q, -r) : r === 1 ? lin(p, q) : `(${lin(p, q)})/${r}`);
        const ans = R(1, -b, a);
        meta({ t, a, b, ans });
        return {
          diff: 2,
          q: `Nájdi inverznú funkciu k f(x) = ${lin(a, b)}.`,
          options: uniq([ans, ...[R(1, b, a), lin(a, -b), R(1, -a, b), `1/(${lin(a, b)})`].filter((x) => x !== ans)]),
          explain: [
            `1) Napíš y = ${lin(a, b)}.`,
            `2) Vymeň x a y: x = ${lin(a, b).replace('x', 'y')}.`,
            `3) Vyjadri y: ${kx(a, 'y')} = ${lin(1, -b)}  →  y = (${lin(1, -b)})/${pn(a)}.`,
            `4) f⁻¹(x) = ${ans}.  Skúška: f(f⁻¹(x)) = ${pn(a)}·(${lin(1, -b)})/${pn(a)} ${b < 0 ? '−' : '+'} ${Math.abs(b)} = x ✓`,
          ].join('\n'),
          src: `${S}: inverzná funkcia (generované)`,
        };
      }
      if (t === 'exp') {
        const a = pick([-3, -2, -1, 1, 2, 3]), b = pick([-4, -2, -1, 1, 2, 3, 5]);
        const ans = plusC(`ln(${lin(1, -b)})`, a);
        meta({ t, a, b, ans });
        return {
          diff: 3,
          q: `Nájdi inverznú funkciu k f(x) = ${plusC(`e^(${lin(1, -a)})`, b)}.`,
          options: uniq([ans, plusC(`ln(${lin(1, b)})`, a), plusC(`ln(${lin(1, -b)})`, -a), plusC(`e^(${lin(1, a)})`, -b)]),
          explain: [
            `1) y = ${plusC(`e^(${lin(1, -a)})`, b)}, vymeň x a y: x = ${plusC(`e^(${lin(1, -a).replace('x', 'y')})`, b)}.`,
            `2) Osamostatni exponenciálu: ${lin(1, -b)} = e^(${lin(1, -a).replace('x', 'y')}).`,
            `3) Zlogaritmuj (ln je inverzná k eˣ): ln(${lin(1, -b)}) = ${lin(1, -a).replace('x', 'y')}.`,
            `4) y = ${ans}.  Pozor na D(f⁻¹) = H(f) = (${fmt(b)}, ∞).`,
          ].join('\n'),
          src: `${S}: inverzná funkcia (generované)`,
        };
      }
      let a = 0, b = 0;
      do {
        a = pick([-4, -3, -2, -1, 1, 2, 3, 5]); b = pick([-3, -2, -1, 1, 2, 4]);
      } while (a + b === 0);
      const ans = `(${lin(b, a)})/(x − 1)`;
      meta({ t, a, b, ans });
      return {
        diff: 3,
        q: `Nájdi inverznú funkciu k f(x) = (${lin(1, a)})/(${lin(1, -b)}).`,
        options: uniq([ans, `(${lin(1, -b)})/(${lin(1, a)})`, `(${lin(a, b)})/(x − 1)`, `(${lin(b, -a)})/(x − 1)`, `(${lin(b, a)})/(x + 1)`, `(${lin(b, a)})/(${lin(1, -b)})`, `(${lin(-b, a)})/(x − 1)`, `(${lin(b, a)})/(${lin(1, b)})`].filter((o) => {
          const [nu, de] = o.slice(1, -1).split(')/(');
          return nu !== de;
        })),
        explain: [
          `1) Vymeň x a y: x = (${lin(1, a).replace('x', 'y')})/(${lin(1, -b).replace('x', 'y')}).`,
          `2) Vynásob menovateľom: x·(${lin(1, -b).replace('x', 'y')}) = ${lin(1, a).replace('x', 'y')}  →  xy ${b < 0 ? '+' : '−'} ${kx(Math.abs(b))} = ${lin(1, a).replace('x', 'y')}.`,
          `3) Členy s y doľava: xy − y = ${lin(b, a)}  →  y·(x − 1) = ${lin(b, a)}.`,
          `4) f⁻¹(x) = ${ans}.`,
        ].join('\n'),
        src: `${S}: inverzná funkcia (generované)`,
      };
    },
  },
  {
    subject: 'mat', topic: 'polynomy',
    make: () => {
      const n = pick([3, 4]);
      const co = [pick([-2, -1, 1, 2, 3]), ...Array.from({ length: n }, () => rnd(-5, 5))];
      const c = pick([-3, -2, -1, 1, 2, 3]);
      const bs: number[] = [];
      co.forEach((a, k) => bs.push(k === 0 ? a : a + c * bs[k - 1]));
      const val = bs[n];
      meta({ co, c, ans: val });
      const P = poly(co.map((a, k) => [a, n - k] as [number, number]));
      return {
        diff: 2,
        q: `P(x) = ${P}. Hornerovou schémou vypočítaj P(${fmt(c)}), čiže zvyšok po delení ${fx(c)}.`,
        options: numOptions(val, [bs[n - 1], co.reduce((acc, a) => acc * -c + a, 0), val + c], 0),
        explain: [
          `1) Koeficienty (aj nulové!): ${co.map((x) => fmt(x)).join(' | ')}, vľavo píšeš c = ${fmt(c)}.`,
          `2) Prvý opíšeš: ${fmt(bs[0])}.`,
          ...bs.slice(1).map((x, k) => `${k + 3}) ${fmt(co[k + 1])} + ${pn(c)}·${pn(bs[k])} = ${fmt(x)}`),
          `→ Posledné číslo je zvyšok: P(${fmt(c)}) = ${fmt(val)}${val === 0 ? `, takže ${fmt(c)} je koreň` : ''}.`,
        ].join('\n'),
        src: `${S}: Hornerova schéma (generované)`,
      };
    },
  },
  {
    subject: 'mat', topic: 'funkcie',
    make: () => {
      const p = rnd(-5, 5), a = pick([-3, -2, -1, 2, 3]), b = rnd(-4, 4), x0 = rnd(-3, 3);
      const f = (x: number) => x * x + p;
      const g = (x: number) => a * x + b;
      const fg = f(g(x0)), gf = g(f(x0));
      meta({ p, a, b, x0, ans: fg });
      return {
        diff: 1,
        q: `f(x) = ${poly([[1, 2], [p, 0]])}, g(x) = ${lin(a, b)}. Vypočítaj (f ∘ g)(${fmt(x0)}) = f(g(${fmt(x0)})).`,
        options: numOptions(fg, [gf, f(x0) * g(x0), f(x0) + g(x0)], 0),
        explain: [
          `1) Najprv vnútorná: g(${fmt(x0)}) = ${pn(a)}·${pn(x0)} + ${pn(b)} = ${fmt(g(x0))}.`,
          `2) Výsledok vlož do f: f(${fmt(g(x0))}) = ${pn(g(x0))}² + ${pn(p)} = ${fmt(fg)}.`,
          `Pozor: g(f(${fmt(x0)})) = ${fmt(gf)} je iné číslo, na poradí záleží.`,
        ].join('\n'),
        src: `${S}: zložená funkcia (generované)`,
      };
    },
  },

  // ───────────── 6. LIMITY ─────────────
  {
    subject: 'mat', topic: 'limity',
    make: () => {
      let a = 0, p = 0, q = 0, r = 0;
      do {
        a = rnd(-3, 3); p = rnd(-4, 4); q = rnd(-5, 5); r = rnd(-4, 4);
      } while (a + r === 0);
      const num = a * a + p * a + q, den = a + r;
      const ans = frac(num, den);
      meta({ a, p, q, r, ans: num / den });
      return {
        diff: 1,
        q: `lim (x→${fmt(a)}) ${par(poly([[1, 2], [p, 1], [q, 0]]))} / ${par(lin(1, r))} = ?`,
        options: uniq([ans, ...[frac(q, r || 1), frac(num, 1), '∞', '0', frac(-num, den), frac(num + den, den), '1'].filter((x) => x !== ans)]),
        explain: [
          `1) Menovateľ pre x = ${fmt(a)}: ${pn(a)} + ${pn(r)} = ${fmt(den)} ≠ 0, funkcia je tam spojitá → stačí dosadiť.`,
          `2) Čitateľ: ${pn(a)}² + ${pn(p)}·${pn(a)} + ${pn(q)} = ${fmt(num)}.`,
          `3) Limita = ${fmt(num)}/${pn(den)} = ${ans}.`,
        ].join('\n'),
        src: `${S}: limita dosadením (generované)`,
      };
    },
  },
  {
    subject: 'mat', topic: 'limity',
    make: () => {
      let a = 0, b = 0, c = 0;
      do {
        a = rnd(-3, 3); b = rnd(-4, 4); c = rnd(-4, 4);
      } while (a === b || a === c || b === c);
      const N = poly([[1, 2], [-(a + b), 1], [a * b, 0]]);
      const Dn = poly([[1, 2], [-(a + c), 1], [a * c, 0]]);
      const ans = frac(a - b, a - c);
      meta({ a, b, c, ans: (a - b) / (a - c) });
      return {
        diff: 2,
        q: `lim (x→${fmt(a)}) (${N}) / (${Dn}) = ?`,
        options: uniq([ans, ...[frac(a + b, a + c || 1), '0', '∞', frac(b, c || 1), '1'].filter((x) => x !== ans)]),
        explain: [
          `1) Dosadenie dá 0/0, obe časti majú koreň x = ${fmt(a)}.`,
          `2) Rozlož: čitateľ = ${fx(a)}${fx(b)}, menovateľ = ${fx(a)}${fx(c)}.`,
          `3) Vykráť ${fx(a)}: zostane ${fx(b)} / ${fx(c)}.`,
          `4) Teraz dosaď x = ${fmt(a)}: (${fmt(a)} − ${pn(b)}) / (${fmt(a)} − ${pn(c)}) = ${fmt(a - b)}/${pn(a - c)} = ${ans}.`,
        ].join('\n'),
        src: `${S}: limita typu 0/0 (generované)`,
      };
    },
  },
  {
    subject: 'mat', topic: 'limity',
    make: () => {
      const k = rnd(1, 9);
      let m = rnd(1, 9);
      if (m === k) m = k === 9 ? 2 : k + 1;
      const t = pick(['sx', 'ss', 'tx']);
      const top = t === 'tx' ? `tg(${kx(k)})` : `sin(${kx(k)})`;
      const bot = t === 'ss' ? `sin(${kx(m)})` : par(kx(m));
      const ans = frac(k, m);
      meta({ k, m, t, ans: k / m });
      return {
        diff: 2,
        q: `lim (x→0) ${top} / ${bot} = ?`,
        options: uniq([ans, ...[frac(m, k), '1', '0', frac(k * m, 1)].filter((x) => x !== ans)]),
        explain: [
          `1) Dôležitá limita: sin u / u → 1, keď u → 0 (u = ${kx(k)}).`,
          t === 'ss'
            ? `2) Rozpíš: [sin(${kx(k)})/(${kx(k)})] · [(${kx(m)})/sin(${kx(m)})] · (${kx(k)})/(${kx(m)}).`
            : `2) Rozšír ${k}: ${top}/${bot} = (${k}/${m}) · ${top}/(${kx(k)}).`,
          t === 'tx' ? '3) tg u / u = (sin u / u)·(1/cos u) → 1·1 = 1.' : '3) Zlomky so sínusom idú k 1.',
          `4) Zostane ${k}/${m}${ans !== `${k}/${m}` ? ` = ${ans}` : ''}.`,
        ].join('\n'),
        src: `${S}: limita sin x / x (generované)`,
      };
    },
  },
  {
    subject: 'mat', topic: 'limity',
    make: () => {
      const k = pick([-3, -2, -1, 1, 2, 3, 4]), m = rnd(1, 4);
      const eP = (n: number) => (n === 0 ? '1' : n === 1 ? 'e' : 'e' + sup(n));
      const ans = eP(k * m);
      meta({ k, m, ans: Math.exp(k * m) });
      return {
        diff: 2,
        q: `lim (x→∞) (1 ${k < 0 ? '−' : '+'} ${Math.abs(k)}/x)^(${kx(m)}) = ?`,
        options: uniq([ans, ...[eP(k), eP(k + m), '1', '∞', eP(m)].filter((x) => x !== ans)]),
        explain: [
          `1) Známe: (1 + k/x)ˣ → eᵏ, tu k = ${fmt(k)}.`,
          m === 1 ? '2) Exponent je presne x, nič netreba prepisovať.' : `2) Exponent ${kx(m)} prepíš: (1 ${k < 0 ? '−' : '+'} ${Math.abs(k)}/x)^(${kx(m)}) = [(1 ${k < 0 ? '−' : '+'} ${Math.abs(k)}/x)ˣ]${sup(m)}.`,
          m === 1 ? `3) Výsledok ${ans}.` : `3) Vnútro → ${eP(k)}, celé → (${eP(k)})${sup(m)} = ${ans}.`,
          'Pozor: 1^∞ je neurčitý výraz, výsledok NIE JE 1.',
        ].join('\n'),
        src: `${S}: limita s číslom e (generované)`,
      };
    },
  },
  {
    subject: 'mat', topic: 'limity',
    make: () => {
      const a = rnd(1, 6);
      const ans = frac(1, 2 * a);
      meta({ a, ans: 1 / (2 * a) });
      return {
        diff: 3,
        q: `lim (x→0) (√(x + ${a * a}) − ${a}) / x = ?`,
        options: uniq([ans, ...[frac(1, a), '0', fmt(2 * a), '∞', frac(1, a * a)].filter((x) => x !== ans)]),
        explain: [
          `1) Dosadenie dá (${a} − ${a})/0 = 0/0.`,
          `2) Rozšír výrazom (√(x + ${a * a}) + ${a}): v čitateli vznikne (x + ${a * a}) − ${a * a} = x.`,
          `3) Zostane x / [x·(√(x + ${a * a}) + ${a})] = 1 / (√(x + ${a * a}) + ${a}).`,
          `4) Dosaď 0: 1/(${a} + ${a}) = ${ans}.`,
        ].join('\n'),
        src: `${S}: limita s odmocninou (generované)`,
      };
    },
  },
  {
    subject: 'mat', topic: 'limity',
    make: () => {
      const a = rnd(-4, 4), k = pick([-6, -3, -2, -1, 1, 2, 3, 5]), right = Math.random() < 0.5;
      const ans = k > 0 === right ? '+∞' : '−∞';
      meta({ a, k, right, ans });
      return {
        diff: 2,
        q: `lim (x→${fmt(a)}${right ? '⁺' : '⁻'}) ${fmt(k)} / ${par(lin(1, -a))} = ?`,
        options: [ans, ...['+∞', '−∞', '0', 'neexistuje'].filter((x) => x !== ans)],
        explain: [
          `1) x ide k ${fmt(a)} ${right ? 'sprava (x > ' + fmt(a) + ')' : 'zľava (x < ' + fmt(a) + ')'}, takže ${lin(1, -a)} → 0${right ? '⁺' : '⁻'} (${right ? 'malé kladné' : 'malé záporné'} číslo).`,
          `2) ${fmt(k)} / 0${right ? '⁺' : '⁻'}: veľkosť rastie nad všetky medze, znamienko ${k > 0 ? 'plus' : 'mínus'} · ${right ? 'plus' : 'mínus'} = ${ans === '+∞' ? 'plus' : 'mínus'}.`,
          `3) Limita = ${ans}. (Obojstranná limita v ${fmt(a)} neexistuje, x = ${fmt(a)} je zvislá asymptota.)`,
        ].join('\n'),
        src: `${S}: jednostranná limita (generované)`,
      };
    },
  },
  {
    subject: 'mat', topic: 'limity',
    make: () => {
      let p = 0, q = 0, r = 0;
      do {
        p = pick([-3, -2, -1, 1, 2, 3, 4]); q = rnd(-5, 5); r = pick([-4, -3, -2, -1, 1, 2, 3, 5]);
      } while (p * r + q === 0);
      const as = (x: number, y: number) => `x = ${fmt(x)} a y = ${fmt(y)}`;
      const ans = as(r, p);
      meta({ p, q, r, ans: [r, p] });
      return {
        diff: 2,
        q: `Aké asymptoty bez smernice (zvislú) a so smernicou (vodorovnú) má f(x) = ${par(lin(p, q))} / ${par(lin(1, -r))}?`,
        options: uniq([ans, ...[as(-r, p), as(r, q), as(p, r), as(r, 0)].filter((x) => x !== ans)]),
        explain: [
          `1) Zvislá: menovateľ = 0 pri x = ${fmt(r)}, čitateľ tam je ${pn(p)}·${pn(r)} + ${pn(q)} = ${fmt(p * r + q)} ≠ 0 → limita je ±∞, asymptota x = ${fmt(r)}.`,
          `2) Vodorovná: lim (x→±∞) ${par(lin(p, q))} / ${par(lin(1, -r))}, rovnaké stupne → podiel vedúcich koeficientov ${fmt(p)}/1.`,
          `3) Asymptoty: ${ans}.`,
        ].join('\n'),
        src: `${S}: asymptoty lineárnej lomenej (generované)`,
      };
    },
  },
  {
    subject: 'mat', topic: 'limity',
    make: () => {
      let b = 0, c = 0, r = 0;
      do {
        b = rnd(-5, 5); c = rnd(-5, 5); r = pick([-4, -3, -2, -1, 1, 2, 3, 4]);
      } while (r * r + b * r + c === 0);
      const q = b + r, R = r * r + b * r + c;
      const ans = `y = ${lin(1, q)}`;
      meta({ b, c, r, ans: [1, q] });
      return {
        diff: 3,
        q: `Nájdi šikmú asymptotu funkcie f(x) = (${poly([[1, 2], [b, 1], [c, 0]])}) / (${lin(1, -r)}).`,
        options: uniq([ans, ...[`y = ${lin(1, b)}`, `y = ${lin(1, b - r)}`, 'y = x', `y = ${lin(1, c)}`, `y = ${lin(1, -q)}`].filter((x) => x !== ans)]),
        explain: [
          '1) Šikmá asymptota y = kx + q: k = lim f(x)/x, q = lim (f(x) − kx).',
          `2) k = lim (${poly([[1, 2], [b, 1], [c, 0]])}) / (x² ${-r < 0 ? '−' : '+'} ${kx(Math.abs(r))}) = 1.`,
          `3) q = lim (f(x) − x) = lim (${lin(b + r, c)}) / (${lin(1, -r)}) = ${fmt(q)}.`,
          `4) Kontrola delením (Horner s ${fmt(r)}): 1 | ${fmt(q)} | zvyšok ${fmt(R)}, teda f(x) = ${lin(1, q)} ${R < 0 ? '−' : '+'} ${fmt(Math.abs(R))}/(${lin(1, -r)}).`,
          `5) Šikmá asymptota: ${ans}.`,
        ].join('\n'),
        src: `${S}: šikmá asymptota (generované)`,
      };
    },
  },
  {
    subject: 'mat', topic: 'limity',
    make: () => {
      const a = rnd(-3, 3), k = pick([-4, -3, -2, -1, 1, 2, 3, 4]);
      const c = k * a - a * a;
      meta({ a, k, ans: c });
      return {
        diff: 2,
        q: `Pre aké c je funkcia f(x) = x² + c pre x < ${fmt(a)} a f(x) = ${kx(k)} pre x ≥ ${fmt(a)} spojitá?`,
        options: numOptions(c, [k * a + a * a, a * a - k * a, k * a], 0).map((o) => 'c = ' + o),
        explain: [
          `1) Spojitosť v ${fmt(a)}: limita zľava = limita sprava = f(${fmt(a)}).`,
          `2) Zľava: ${pn(a)}² + c = ${fmt(a * a)} + c.  Sprava aj f(${fmt(a)}): ${pn(k)}·${pn(a)} = ${fmt(k * a)}.`,
          `3) ${fmt(a * a)} + c = ${fmt(k * a)}  →  c = ${fmt(c)}.`,
        ].join('\n'),
        src: `${S}: spojitosť s parametrom (generované)`,
      };
    },
  },
];
