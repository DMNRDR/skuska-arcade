export const rnd = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const pick = <T,>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];

export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Slovenský zápis čísla: desatinná čiarka, bez zbytočných núl. */
export function fmt(x: number, dp = 2): string {
  if (!isFinite(x)) return x > 0 ? '∞' : '−∞';
  const r = Number(x.toFixed(dp));
  const s = String(Object.is(r, -0) ? 0 : r).replace('.', ',');
  return s.replace(/^-/, '−');
}

/** Vytvorí 4 rôzne možnosti: správnu + distraktory (duplicitné sa zahodia, doplní sa posunom). */
export function numOptions(correct: number, wrong: number[], dp = 2, unit = ''): string[] {
  const u = !unit ? '' : /^[°·]/.test(unit) ? unit : ' ' + unit;
  const seen = new Set<string>();
  const out: string[] = [];
  const add = (v: number) => {
    const s = fmt(v, dp) + u;
    if (!seen.has(s) && isFinite(v)) {
      seen.add(s);
      out.push(s);
    }
  };
  add(correct);
  wrong.forEach(add);
  let k = 1;
  while (out.length < 4 && k < 50) {
    add(correct * (1 + 0.5 * k) + k);
    k++;
  }
  return out.slice(0, 4);
}

/** Pre zoznam textových možností: správna prvá, bez duplicít, max 4. */
export function uniq(options: string[]): string[] {
  return [...new Set(options)].slice(0, 4);
}

export const sup = (n: number) =>
  String(n)
    .split('')
    .map((c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'['0123456789'.indexOf(c)] ?? (c === '-' ? '⁻' : c))
    .join('');

/** Pekný zápis polynómového člena a·xⁿ */
export function term(a: number, n: number, first = false): string {
  if (a === 0) return '';
  const sign = a < 0 ? (first ? '−' : ' − ') : first ? '' : ' + ';
  const abs = Math.abs(a);
  const coef = abs === 1 && n !== 0 ? '' : fmt(abs, 3);
  const x = n === 0 ? '' : n === 1 ? 'x' : 'x' + sup(n);
  return sign + coef + x;
}

export function poly(terms: [number, number][]): string {
  const t = terms.filter(([a]) => a !== 0);
  if (!t.length) return '0';
  return t.map(([a, n], i) => term(a, n, i === 0)).join('');
}
