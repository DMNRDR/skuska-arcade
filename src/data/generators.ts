import { Generator } from '../types';
import { fmt, numOptions, pick, poly, rnd, uniq } from '../util';

// Generátory náhodných výpočtových príkladov, aby sa otázky neopakovali donekonečna.
// Vzorce sú tie isté ako v prednáškach (Fyzika) a v tematickom pláne (Matematika).

const deg = (r: number) => (r * 180) / Math.PI;
const rad = (d: number) => (d * Math.PI) / 180;
const pi = (n: number) => (n === 1 ? 'π' : `${n}π`);
const vec = (v: number[]) => '(' + v.map((x) => fmt(x)).join(', ') + ')';

/** a·x + b·y + c·z + d = 0 bez nulových členov a s pekným znamienkom */
function linEq(terms: [number, string][]): string {
  const parts = terms.filter(([a]) => a !== 0);
  return (
    parts
      .map(([a, v], i) => {
        const abs = Math.abs(a);
        const body = (abs === 1 && v ? '' : String(abs)) + v;
        if (i === 0) return (a < 0 ? '−' : '') + body;
        return (a < 0 ? ' − ' : ' + ') + body;
      })
      .join('') + ' = 0'
  );
}

export const GENERATORS: Generator[] = [
  // ───────────── FYZIKA ─────────────
  {
    subject: 'fyz', topic: 'kmity',
    make: () => {
      const T = pick([0.2, 0.25, 0.4, 0.5, 2, 4, 5, 8, 10]);
      return {
        diff: 1, q: `Kmitanie má periódu T = ${fmt(T)} s. Aká je jeho frekvencia?`,
        options: numOptions(1 / T, [T, 2 / T, 1 / (2 * T)], 3, 'Hz'),
        explain: `f = 1/T = 1/${fmt(T)} = ${fmt(1 / T, 3)} Hz.`, src: 'P str. 2 (generované)',
      };
    },
  },
  {
    subject: 'fyz', topic: 'kmity',
    make: () => {
      const f = rnd(1, 12);
      return {
        diff: 1, q: `Frekvencia kmitov je f = ${f} Hz. Aká je uhlová frekvencia ω?`,
        options: uniq([`${pi(2 * f)} rad/s`, `${pi(f)} rad/s`, `${pi(4 * f)} rad/s`, `${f} rad/s`]),
        explain: `ω = 2π·f = 2π·${f} = ${pi(2 * f)} rad/s.`, src: 'P str. 5 (generované)',
      };
    },
  },
  {
    subject: 'fyz', topic: 'kmity',
    make: () => {
      const m = pick([0.1, 0.2, 0.4, 0.5, 1, 2]);
      const k = pick([10, 20, 40, 50, 100, 200]);
      const T = 2 * Math.PI * Math.sqrt(m / k);
      return {
        diff: 2, q: `Závažie m = ${fmt(m)} kg kmitá na pružine s tuhosťou k = ${k} N/m. Perióda?`,
        options: numOptions(T, [2 * Math.PI * Math.sqrt(k / m), Math.sqrt(m / k), 2 * Math.PI * (m / k)], 3, 's'),
        explain: `T = 2π·√(m/k) = 2π·√(${fmt(m)}/${k}) ≈ ${fmt(T, 3)} s.`, src: 'C 2, pr. 2 (generované)',
      };
    },
  },
  {
    subject: 'fyz', topic: 'kmity',
    make: () => {
      const A = rnd(2, 9);
      const w = rnd(2, 10);
      return {
        diff: 2, q: `Amplitúda je ${A} cm, uhlová frekvencia ${w} rad/s. Aká je maximálna rýchlosť?`,
        options: numOptions((A * w) / 100, [(A * w * w) / 100, A / w / 100, (A * w) / 10], 3, 'm/s'),
        explain: `v_max = A·ω = 0,0${A} m · ${w} s⁻¹ = ${fmt((A * w) / 100, 3)} m/s.`, src: 'P str. 6 (generované)',
      };
    },
  },
  {
    subject: 'fyz', topic: 'kmity',
    make: () => {
      const k = pick([20, 50, 100, 200, 400]);
      const A = pick([2, 5, 10, 20]);
      const E = 0.5 * k * (A / 100) ** 2;
      return {
        diff: 2, q: `Pružina k = ${k} N/m, amplitúda ${A} cm. Celková mechanická energia?`,
        options: numOptions(E, [k * (A / 100) ** 2, 0.5 * k * (A / 100), 0.5 * k * A * A], 4, 'J'),
        explain: `E = ½·k·A² = ½·${k}·(${fmt(A / 100)})² = ${fmt(E, 4)} J.`, src: 'P str. 9 (generované)',
      };
    },
  },
  {
    subject: 'fyz', topic: 'skladanie',
    make: () => {
      const f1 = rnd(200, 520);
      const d = rnd(1, 6);
      return {
        diff: 1, q: `Skladáme kmity s frekvenciami ${f1} Hz a ${f1 + d} Hz. Frekvencia rázov?`,
        options: numOptions(d, [2 * f1 + d, f1 + d / 2, d / 2], 2, 'Hz'),
        explain: `f_r = |f₂ − f₁| = ${d} Hz, perióda rázov ${fmt(1 / d, 3)} s.`, src: 'P str. 12 (generované)',
      };
    },
  },
  {
    subject: 'fyz', topic: 'skladanie',
    make: () => {
      const [a, b, c] = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [1, 1, Math.SQRT2]]);
      return {
        diff: 2, q: `x = ${a}·sin(ωt) + ${b}·cos(ωt). Aká je amplitúda výsledného kmitania?`,
        options: numOptions(c, [a + b, Math.abs(b - a), a * b], 2),
        explain: `A = √(${a}² + ${b}²) = ${fmt(c)}.`, src: 'C 3, pr. 7 (generované)',
      };
    },
  },
  {
    subject: 'fyz', topic: 'skladanie',
    make: () => {
      const A1 = rnd(1, 9);
      const A2 = rnd(1, 9);
      const syn = Math.random() < 0.5;
      const ans = syn ? A1 + A2 : Math.abs(A1 - A2);
      return {
        diff: 1, q: `Dva ${syn ? 'synfázne' : 'protifázne'} kmity v jednom smere: A₁ = ${A1} cm, A₂ = ${A2} cm. Výsledná amplitúda?`,
        options: numOptions(ans, [syn ? Math.abs(A1 - A2) : A1 + A2, Math.sqrt(A1 * A1 + A2 * A2), A1 * A2], 2, 'cm'),
        explain: syn ? 'Synfázne sa zosilnia: A₁ + A₂.' : 'Protifázne sa zoslabia: |A₁ − A₂|.', src: 'P str. 10 (generované)',
      };
    },
  },
  {
    subject: 'fyz', topic: 'vlny',
    make: () => {
      const f = pick([85, 170, 340, 680, 1700, 3400]);
      return {
        diff: 1, q: `Zvuk s frekvenciou ${f} Hz sa šíri rýchlosťou 340 m/s. Vlnová dĺžka?`,
        options: numOptions(340 / f, [f / 340, 340 * f, 680 / f], 3, 'm'),
        explain: `λ = c/f = c·T = 340/${f} = ${fmt(340 / f, 3)} m.`, src: 'P str. 23 (generované)',
      };
    },
  },
  {
    subject: 'fyz', topic: 'vlny',
    make: () => {
      const P = pick([1, 2, 5, 10, 50]);
      const r = pick([1, 2, 5, 10]);
      const I = P / (4 * Math.PI * r * r);
      return {
        diff: 2, q: `Bodový zdroj s výkonom ${P} W. Intenzita vo vzdialenosti ${r} m?`,
        options: numOptions(I, [P / (4 * Math.PI * r), P / (r * r), P / (2 * Math.PI * r * r)], 4, 'W/m²'),
        explain: `I = P/(4πr²) = ${P}/(4π·${r * r}) ≈ ${fmt(I, 4)} W/m².`, src: 'P str. 29 (generované)',
      };
    },
  },
  {
    subject: 'fyz', topic: 'vlny',
    make: () => {
      const lam = pick([0.2, 0.4, 0.5, 1, 2, 3]);
      return {
        diff: 1, q: `Stojatá vlna má vlnovú dĺžku ${fmt(lam)} m. Vzdialenosť susedných uzlov?`,
        options: numOptions(lam / 2, [lam, lam / 4, 2 * lam], 3, 'm'),
        explain: `Susedné uzly sú od seba λ/2 = ${fmt(lam / 2, 3)} m.`, src: 'P str. 32 (generované)',
      };
    },
  },
  {
    subject: 'fyz', topic: 'doppler',
    make: () => {
      const f = pick([400, 500, 680, 1000]);
      const v = pick([10, 17, 20, 34]);
      const app = Math.random() < 0.5;
      const ans = f / (1 + (app ? -1 : 1) * (v / 340));
      return {
        diff: 2,
        q: `Zdroj ${f} Hz sa ${app ? 'približuje k' : 'vzďaľuje od'} stojaceho prijímača rýchlosťou ${v} m/s (c = 340 m/s). Vnímaná frekvencia?`,
        options: numOptions(ans, [f / (1 + (app ? 1 : -1) * (v / 340)), f * (1 + (app ? 1 : -1) * (v / 340)), f], 0, 'Hz'),
        explain: `f′ = f/(1 ${app ? '−' : '+'} v/c) = ${f}/(1 ${app ? '−' : '+'} ${v}/340) ≈ ${fmt(ans, 0)} Hz.`,
        src: 'P str. 34 (generované)',
      };
    },
  },
  {
    subject: 'fyz', topic: 'doppler',
    make: () => {
      const lam = pick([0.5, 1, 2]);
      const n = rnd(0, 3);
      const max = Math.random() < 0.5;
      const d = max ? 2 * n * (lam / 2) : (2 * n + 1) * (lam / 2);
      return {
        diff: 2, q: `λ = ${fmt(lam)} m, dráhový rozdiel v bode P je ${fmt(d)} m. Čo je v bode P?`,
        options: max ? ['Interferenčné maximum', 'Interferenčné minimum', 'Uzol stojatej vlny', 'Nedá sa určiť'] : ['Interferenčné minimum', 'Interferenčné maximum', 'Kmitňa stojatej vlny', 'Nedá sa určiť'],
        explain: `Δ/(λ/2) = ${fmt(d / (lam / 2))}: ${max ? 'párny' : 'nepárny'} násobok polvlny → ${max ? 'maximum' : 'minimum'}.`,
        src: 'P str. 37 (generované)',
      };
    },
  },
  {
    subject: 'fyz', topic: 'em',
    make: () => {
      const e = pick([1.5, 2, 2.25, 4, 9]);
      const n = Math.sqrt(e);
      return {
        diff: 2, q: `Nemagnetické prostredie (μᵣ = 1) má permitivitu εᵣ = ${fmt(e)}. Index lomu?`,
        options: numOptions(n, [e, 1 / n, e * e], 3),
        explain: `n = √(εᵣ·μᵣ) = √${fmt(e)} ≈ ${fmt(n, 3)}.`, src: 'C 8, pr. 28 (generované)',
      };
    },
  },
  {
    subject: 'fyz', topic: 'em',
    make: () => {
      const n = pick([1.25, 1.33, 1.5, 2, 2.4]);
      const c = 3e8 / n;
      return {
        diff: 1, q: `Akou rýchlosťou sa šíri svetlo v prostredí s indexom lomu ${fmt(n)}? (c₀ = 3·10⁸ m/s)`,
        options: numOptions(c / 1e8, [3 * n, 3 / (n * n), 3], 2, '·10⁸ m/s'),
        explain: `c = c₀/n = 3·10⁸/${fmt(n)} ≈ ${fmt(c / 1e8, 2)}·10⁸ m/s.`, src: 'P str. 52 (generované)',
      };
    },
  },
  {
    subject: 'fyz', topic: 'optika',
    make: () => {
      const a = pick([30, 45, 60]);
      const n = pick([1.33, 1.5, 1.6]);
      const b = deg(Math.asin(Math.sin(rad(a)) / n));
      return {
        diff: 2, q: `Lúč ide zo vzduchu (n = 1) do prostredia s n = ${fmt(n)} pod uhlom dopadu ${a}°. Uhol lomu?`,
        options: numOptions(b, [a, deg(Math.asin(Math.min(1, Math.sin(rad(a)) * n * 0.9))), a / n], 1, '°'),
        explain: `sin β = sin ${a}°/${fmt(n)} → β ≈ ${fmt(b, 1)}° (láme sa ku kolmici).`, src: 'P str. 52 (generované)',
      };
    },
  },
  {
    subject: 'fyz', topic: 'optika',
    make: () => {
      const n1 = pick([1.33, 1.5, 1.6, 2.4]);
      const ac = deg(Math.asin(1 / n1));
      return {
        diff: 2, q: `Aký je kritický uhol úplného odrazu na rozhraní prostredie (n = ${fmt(n1)}) → vzduch?`,
        options: numOptions(ac, [90 - ac, deg(Math.atan(n1)), deg(Math.acos(1 / n1)) + 5], 1, '°'),
        explain: `sin α_krit = n₂/n₁ = 1/${fmt(n1)} → α_krit ≈ ${fmt(ac, 1)}°.`, src: 'P str. 54 (generované)',
      };
    },
  },
  {
    subject: 'fyz', topic: 'sosovky',
    make: () => {
      const fcm = pick([10, 20, 25, 40, 50, -20, -25, -50]);
      const D = 100 / fcm;
      return {
        diff: 1, q: `${fcm > 0 ? 'Spojka' : 'Rozptylka'} má ohniskovú vzdialenosť ${fcm} cm. Optická mohutnosť?`,
        options: numOptions(D, [-D, fcm / 100, 1 / fcm], 2, 'dpt'),
        explain: `D = 1/f = 1/(${fmt(fcm / 100)} m) = ${fmt(D)} dpt.`, src: 'P str. 67 (generované)',
      };
    },
  },
  {
    subject: 'fyz', topic: 'sosovky',
    make: () => {
      const D1 = pick([2, 3, 4, 5, 8, 10]);
      const D2 = pick([-1, -2, -3, 2, 4]);
      return {
        diff: 1, q: `Dve blízke tenké šošovky s mohutnosťami ${D1} dpt a ${fmt(D2)} dpt. Výsledná mohutnosť?`,
        options: numOptions(D1 + D2, [D1 - D2, D1 * D2, (D1 * D2) / (D1 + D2 || 1)], 2, 'dpt'),
        explain: `D = D₁ + D₂ = ${fmt(D1 + D2)} dpt.`, src: 'P str. 81 (generované)',
      };
    },
  },
  {
    subject: 'fyz', topic: 'sosovky',
    make: () => {
      const n = pick([1.5, 1.52, 1.6]);
      const R = pick([10, 20, 25, 50]);
      // dvojvypuklá symetrická: R1 = +R, R2 = −R
      const D = (n - 1) * (2 / (R / 100));
      return {
        diff: 3, q: `Symetrická dvojvypuklá šošovka, n = ${fmt(n)}, |R₁| = |R₂| = ${R} cm, vo vzduchu. Optická mohutnosť?`,
        options: numOptions(D, [D / 2, n * (2 / (R / 100)), 0], 2, 'dpt'),
        explain: `D = (n − 1)·(1/R₁ − 1/R₂) = ${fmt(n - 1)}·(1/${fmt(R / 100)} + 1/${fmt(R / 100)}) ≈ ${fmt(D)} dpt.`,
        src: 'P str. 61 (generované)',
      };
    },
  },

  // ───────────── MATEMATIKA ─────────────
  {
    subject: 'mat', topic: 'vektory',
    make: () => {
      const u = [rnd(-4, 5), rnd(-4, 5), rnd(-4, 5)];
      const v = [rnd(-4, 5), rnd(-4, 5), rnd(-4, 5)];
      const dot = u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
      return {
        diff: 1, q: `u = ${vec(u)}, v = ${vec(v)}. Skalárny súčin u·v = ?`,
        options: numOptions(dot, [u[0] * v[0] + u[1] * v[1] - u[2] * v[2], dot + rnd(1, 4), u[0] + v[0] + u[1] + v[1] + u[2] + v[2]], 0),
        explain: `u·v = ${u.map((x, i) => `${fmt(x)}·${fmt(v[i])}`).join(' + ')} = ${fmt(dot)}.`, src: 'Tematický plán: Prednáška 1 (generované)',
      };
    },
  },
  {
    subject: 'mat', topic: 'vektory',
    make: () => {
      const u = [rnd(-3, 3), rnd(-3, 3), rnd(-3, 3)];
      const v = [rnd(-3, 3), rnd(-3, 3), rnd(-3, 3)];
      const c = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
      const neg = c.map((x) => -x);
      const swap = [u[1] * v[2] + u[2] * v[1], u[2] * v[0] + u[0] * v[2], u[0] * v[1] + u[1] * v[0]];
      const mul = [u[0] * v[0], u[1] * v[1], u[2] * v[2]];
      return {
        diff: 2, q: `u = ${vec(u)}, v = ${vec(v)}. Vektorový súčin u × v = ?`,
        options: uniq([vec(c), vec(neg), vec(swap), vec(mul), vec(c.map((x, i) => x + (i === 1 ? 1 : 0)))]),
        explain: `u × v = (u₂v₃ − u₃v₂, u₃v₁ − u₁v₃, u₁v₂ − u₂v₁) = ${vec(c)}.`, src: 'Tematický plán: Prednáška 1 (generované)',
      };
    },
  },
  {
    subject: 'mat', topic: 'geometria',
    make: () => {
      const [n, len] = pick([[[1, 2, 2], 3], [[2, -1, 2], 3], [[2, 3, 6], 7], [[0, 3, 4], 5], [[2, 6, -3], 7]] as [number[], number][]);
      const P = [rnd(-3, 4), rnd(-3, 4), rnd(-3, 4)];
      const d = rnd(-9, 9);
      const val = n[0] * P[0] + n[1] * P[1] + n[2] * P[2] + d;
      const eq = linEq([[n[0], 'x'], [n[1], 'y'], [n[2], 'z'], [d, '']]);
      return {
        diff: 2, q: `Vzdialenosť bodu [${P.map((x) => fmt(x)).join(', ')}] od roviny ${eq}?`,
        options: numOptions(Math.abs(val) / len, [Math.abs(val), Math.abs(val) / (len * len), Math.abs(val - d) / len], 3),
        explain: `|${val}| / √(${n.map((x) => x * x).join(' + ')}) = ${Math.abs(val)}/${len} ≈ ${fmt(Math.abs(val) / len, 3)}.`,
        src: 'Tematický plán: Prednáška 2 (generované)',
      };
    },
  },
  {
    subject: 'mat', topic: 'matice',
    make: () => {
      const A = [[rnd(-3, 4), rnd(-3, 4)], [rnd(-3, 4), rnd(-3, 4)]];
      const B = [[rnd(-3, 4), rnd(-3, 4)], [rnd(-3, 4), rnd(-3, 4)]];
      const mul = (X: number[][], Y: number[][]) => [
        [X[0][0] * Y[0][0] + X[0][1] * Y[1][0], X[0][0] * Y[0][1] + X[0][1] * Y[1][1]],
        [X[1][0] * Y[0][0] + X[1][1] * Y[1][0], X[1][0] * Y[0][1] + X[1][1] * Y[1][1]],
      ];
      const m = (M: number[][]) => `[[${M[0].map((x) => fmt(x)).join(', ')}], [${M[1].map((x) => fmt(x)).join(', ')}]]`;
      const AB = mul(A, B);
      const BA = mul(B, A);
      const elem = [[A[0][0] * B[0][0], A[0][1] * B[0][1]], [A[1][0] * B[1][0], A[1][1] * B[1][1]]];
      return {
        diff: 2, q: `A = ${m(A)}, B = ${m(B)}. Aký je súčin A·B?`,
        options: uniq([m(AB), m(BA), m(elem), m([[AB[0][0] + 1, AB[0][1]], AB[1]])]),
        explain: `Prvok (i, j) = i-ty riadok A · j-ty stĺpec B. Pozor, B·A = ${m(BA)} je iný!`,
        src: 'Tematický plán: Prednáška 3 (generované)',
      };
    },
  },
  {
    subject: 'mat', topic: 'determinanty',
    make: () => {
      const [a, b, c, d] = [rnd(-5, 6), rnd(-5, 6), rnd(-5, 6), rnd(-5, 6)];
      const det = a * d - b * c;
      return {
        diff: 1, q: `det [[${[a, b].map((x) => fmt(x)).join(', ')}], [${[c, d].map((x) => fmt(x)).join(', ')}]] = ?`,
        options: numOptions(det, [a * d + b * c, a * b - c * d, b * c - a * d], 0),
        explain: `a·d − b·c = ${a}·${d} − ${b}·${c} = ${det}.`, src: 'Tematický plán: Prednáška 4 (generované)',
      };
    },
  },
  {
    subject: 'mat', topic: 'determinanty',
    make: () => {
      const M = [0, 1, 2].map(() => [rnd(-3, 3), rnd(-3, 3), rnd(-3, 3)]);
      const [[a, b, c], [d, e, f], [g, h, i]] = M;
      const det = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
      const wrongSign = a * (e * i - f * h) + b * (d * i - f * g) + c * (d * h - e * g);
      const diagOnly = a * e * i + b * f * g + c * d * h;
      return {
        diff: 3, q: `det ${'['}${M.map((r) => '[' + r.map((x) => fmt(x)).join(', ') + ']').join(', ')}] = ?`,
        options: numOptions(det, [wrongSign, diagOnly, -det], 0),
        explain: `Sarrusovo pravidlo / rozvoj podľa 1. riadku: ${a}·(${e * i - f * h}) − ${b}·(${d * i - f * g}) + ${c}·(${d * h - e * g}) = ${det}.`,
        src: 'Tematický plán: Prednáška 4 (generované)',
      };
    },
  },
  {
    subject: 'mat', topic: 'determinanty',
    make: () => {
      const a = rnd(-4, 6);
      const d = rnd(-4, 6);
      const b = rnd(-5, 5);
      const sym = Math.random() < 0.5;
      if (sym) {
        const p = rnd(1, 5);
        const q = rnd(1, 4);
        return {
          diff: 3, q: `Vlastné čísla matice [[${p}, ${q}], [${q}, ${p}]]?`,
          options: uniq([`${p + q} a ${p - q}`, `${p} a ${p}`, `${p + q} a ${q - p}`, `${p * p - q * q} a 0`]),
          explain: `det(A − λE) = (${p} − λ)² − ${q * q} = 0 → λ = ${p} ± ${q}.`, src: 'Tematický plán: Prednáška 4 (generované)',
        };
      }
      return {
        diff: 2, q: `Vlastné čísla trojuholníkovej matice [[${fmt(a)}, ${fmt(b)}], [0, ${fmt(d)}]]?`,
        options: uniq([`${fmt(a)} a ${fmt(d)}`, `${fmt(a)} a ${fmt(b)}`, `${fmt(a + d)} a 0`, `${fmt(a * d)} a ${fmt(b)}`, `${fmt(-a)} a ${fmt(-d)}`]),
        explain: 'Vlastné čísla trojuholníkovej matice sú prvky na diagonále.', src: 'Tematický plán: Prednáška 4 (generované)',
      };
    },
  },
  {
    subject: 'mat', topic: 'limity',
    make: () => {
      const a = rnd(1, 9);
      const b = rnd(1, 9);
      const ra = rnd(1, 3);
      const rb = rnd(1, 3);
      const ans = ra === rb ? fmt(a / b, 3) : ra > rb ? '∞' : '0';
      return {
        diff: 2, q: `lim (x→∞) (${poly([[a, ra], [rnd(1, 9), 0]])}) / (${poly([[b, rb], [-rnd(1, 9), 0]])}) = ?`,
        options: uniq([ans, ...['0', '∞', fmt(a / b, 3), fmt(b / a, 3), '1'].filter((o) => o !== ans)]),
        explain: ra === rb ? 'Rovnaké stupne → podiel vedúcich koeficientov.' : ra > rb ? 'Čitateľ má vyšší stupeň → ∞.' : 'Menovateľ má vyšší stupeň → 0.',
        src: 'Tematický plán: Prednáška 6 (generované)',
      };
    },
  },
  {
    subject: 'mat', topic: 'derivacie',
    make: () => {
      const a = rnd(1, 6) * (Math.random() < 0.3 ? -1 : 1);
      const n = rnd(2, 5);
      const b = rnd(-6, 6);
      const x0 = rnd(-2, 3);
      const val = a * n * x0 ** (n - 1) + b;
      return {
        diff: 2, q: `f(x) = ${poly([[a, n], [b, 1]])}. Aká je f′(${x0})?`,
        options: numOptions(val, [a * x0 ** n + b * x0, a * n * x0 ** n + b, a * (n - 1) * x0 ** (n - 1) + b], 0),
        explain: `f′(x) = ${poly([[a * n, n - 1], [b, 0]])}, f′(${x0}) = ${val}.`, src: 'Tematický plán: Prednáška 7 (generované)',
      };
    },
  },
  {
    subject: 'mat', topic: 'derivacie',
    make: () => {
      const k = rnd(2, 9);
      const f = pick([
        { f: `sin(${k}x)`, d: `${k}·cos(${k}x)`, w: [`cos(${k}x)`, `−${k}·cos(${k}x)`, `${k}·sin(${k}x)`] },
        { f: `cos(${k}x)`, d: `−${k}·sin(${k}x)`, w: [`${k}·sin(${k}x)`, `−sin(${k}x)`, `−${k}·cos(${k}x)`] },
        { f: `e^(${k}x)`, d: `${k}·e^(${k}x)`, w: [`e^(${k}x)`, `${k}x·e^(${k}x−1)`, `e^(${k}x)/${k}`] },
        { f: `ln(${k}x)`, d: `1/x`, w: [`${k}/x`, `1/(${k}x)`, `${k}·ln x`] },
      ]);
      return {
        diff: 2, q: `Derivácia funkcie ${f.f} = ?`,
        options: uniq([f.d, ...f.w]),
        explain: `Derivácia zloženej funkcie: vonkajšia · vnútorná (${k}x)′ = ${k}.${f.f.startsWith('ln') ? ` Pri ln: ${k}/(${k}x) = 1/x.` : ''}`,
        src: 'Tematický plán: Prednáška 7 (generované)',
      };
    },
  },
  {
    subject: 'mat', topic: 'priebeh',
    make: () => {
      const a = rnd(1, 4);
      const b = rnd(-8, 8) * 2;
      const xv = -b / (2 * a);
      return {
        diff: 1, q: `V ktorom bode má f(x) = ${poly([[a, 2], [b, 1], [rnd(-5, 5), 0]])} lokálne minimum?`,
        options: numOptions(xv, [-xv, b / a, xv + 1], 2).map((s) => 'x = ' + s),
        explain: `f′(x) = ${poly([[2 * a, 1], [b, 0]])} = 0 → x = ${fmt(xv)}, f′′ = ${2 * a} > 0.`, src: 'Tematický plán: Prednáška 10 (generované)',
      };
    },
  },
  {
    subject: 'mat', topic: 'integraly',
    make: () => {
      const n = rnd(1, 5);
      const a = (n + 1) * rnd(1, 3);
      const res = poly([[a / (n + 1), n + 1]]);
      return {
        diff: 1, q: `∫ ${poly([[a, n]])} dx = ?`,
        options: uniq([res + ' + C', poly([[a * n, n - 1]]) + ' + C', poly([[a, n + 1]]) + ' + C', poly([[a / n, n + 1]]) + ' + C', poly([[a / (n + 1), n]]) + ' + C', poly([[a, n + 1]]) + '/' + n + ' + C']),
        explain: `∫ xⁿ dx = xⁿ⁺¹/(n + 1): ${a}/${n + 1} = ${fmt(a / (n + 1))}.`, src: 'Tematický plán: Prednáška 11 (generované)',
      };
    },
  },
  {
    subject: 'mat', topic: 'integraly',
    make: () => {
      const k = rnd(2, 7);
      const f = pick([
        { f: `e^(${k}x)`, r: `e^(${k}x)/${k}`, w: [`${k}·e^(${k}x)`, `e^(${k}x)`, `e^(${k}x+1)/(${k}x+1)`] },
        { f: `cos(${k}x)`, r: `sin(${k}x)/${k}`, w: [`${k}·sin(${k}x)`, `−sin(${k}x)/${k}`, `sin(${k}x)`] },
        { f: `sin(${k}x)`, r: `−cos(${k}x)/${k}`, w: [`cos(${k}x)/${k}`, `−${k}·cos(${k}x)`, `−cos(${k}x)`] },
      ]);
      return {
        diff: 2, q: `∫ ${f.f} dx = ?`,
        options: uniq([f.r + ' + C', ...f.w.map((w) => w + ' + C')]),
        explain: `Lineárna substitúcia t = ${k}x, dx = dt/${k}.`, src: 'Tematický plán: Prednáška 11 (generované)',
      };
    },
  },
];
