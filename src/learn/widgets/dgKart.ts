// @ts-nocheck
// Kartografia (Metódy zobrazovania, 3. písomka): obrázky a rysovačky. Všetko sa počíta zo zobrazovacích rovníc,
// nič nie je kreslené od oka. Značenie podľa Vajsáblová, Metódy zobrazovania pre GaK: U = zemepisná šírka,
// V = zemepisná dĺžka, R = polomer referenčnej guľovej plochy, ρ = polomer obrazu rovnobežky, ε = uhol poludníkov.
// Triedy (given, aux, res, …) prevedie na farby tabule dgStyle() v dgGeo.ts.

const f = (n) => Math.round(n * 10) / 10;
const rad = (g) => (g * Math.PI) / 180;
const ln = (a, b, c = 'aux') => `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" class="${c}"/>`;
const ci = (o, r, c = 'aux') => `<circle cx="${f(o[0])}" cy="${f(o[1])}" r="${f(r)}" class="${c}"/>`;
const pl = (ps, c = 'cont') => (ps.length > 1 ? `<polyline points="${ps.map((p) => f(p[0]) + ',' + f(p[1])).join(' ')}" class="${c}"/>` : '');
const tx = (x, y, s, c = 'lab') => {
  let out = '', cur = 0, m;
  const re = /([_^])(\{[^}]*\}|.)|([^_^]+)/g;
  while ((m = re.exec(s))) {
    let t, tg, sm = false;
    if (m[3] !== undefined) { t = m[3]; tg = 0; } else { t = m[2].replace(/[{}]/g, ''); tg = m[1] == '_' ? 4 : -5; sm = true; }
    out += `<tspan dy="${tg - cur}"${sm ? ' font-size="9.5"' : ''}>${t}</tspan>`;
    cur = tg;
  }
  return `<text x="${f(x)}" y="${f(y)}" class="${c}">${out}</text>`;
};
const pt = (p, l = '', dx = 6, dy = -6, c = 'dot', tc = '') => `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="2.8" class="${c}"/>` + (l ? tx(p[0] + dx, p[1] + dy, l, tc) : '');
const sk = (n, d = 2) => n.toFixed(d).replace('.', ',');
/** krivka z parametrickej funkcie, preskočí body mimo (null) */
const curve = (fn, a, b, n, c) => {
  let s = '', run = [];
  for (let i = 0; i <= n; i++) {
    const p = fn(a + ((b - a) * i) / n);
    if (p && isFinite(p[0]) && isFinite(p[1]) && Math.abs(p[0]) < 2000 && Math.abs(p[1]) < 2000) run.push(p);
    else { s += pl(run, c); run = []; }
  }
  return s + pl(run, c);
};

// ───────────── zemepisná sieť na guli (náhľad zhora pod uhlom) ─────────────
function sphereView(cx, cy, r, tilt = 22) {
  const t = rad(tilt);
  // bod (U, V) → 3D → otočenie okolo osi x o tilt → kolmý priemet; vráti [x, y, viditeľný]
  return (U, V) => {
    const x = Math.cos(U) * Math.sin(V), y = Math.sin(U), z = Math.cos(U) * Math.cos(V);
    const y2 = y * Math.cos(t) - z * Math.sin(t), z2 = y * Math.sin(t) + z * Math.cos(t);
    return [cx + r * x, cy - r * y2, z2 >= 0];
  };
}
function figSiet() {
  const P = sphereView(150, 150, 105);
  const vis = (fn, a, b, cls) => curve((s) => { const p = fn(s); return p[2] ? p : null; }, a, b, 120, cls);
  let s = ci([150, 150], 105, 'given');
  for (const U of [-60, -30, 30, 60]) s += vis((v) => P(rad(U), v), -Math.PI, Math.PI, 'cont');
  for (let V = -180; V < 180; V += 30) s += vis((u) => P(u, rad(V)), -Math.PI / 2, Math.PI / 2, 'cont');
  s += vis((v) => P(0, v), -Math.PI, Math.PI, 'aux') + tx(250, 168, 'rovník (U = 0°)', 'auxl');
  s += vis((u) => P(u, 0), -Math.PI / 2, Math.PI / 2, 'given') + tx(116, 278, 'základný poludník V = 0°', 'mutl');
  const A = P(rad(40), rad(50)), A0 = P(0, rad(50)), O = [150, 150], N = P(Math.PI / 2, 0);
  s += vis((u) => P(u, rad(50)), 0, rad(40), 'res') + vis((v) => P(0, v), 0, rad(50), 'ang');
  s += ln(O, A, 'dash') + ln(O, A0, 'dash') + pt(O, 'O', -14, 14) + pt(N, 'P (severný pól)', 6, -6) + pt(A, 'A', 6, -6, 'rdot', 'resl');
  s += tx(A0[0] - 6, A0[1] + 18, 'V', 'resl') + tx(A[0] + 4, (A[1] + A0[1]) / 2 + 8, 'U', 'resl');
  s += tx(268, 60, 'rovnobežka = kružnica', 'lab') + tx(268, 76, 'so stálou šírkou U', 'mutl') + tx(268, 104, 'poludník = polkružnica', 'lab') + tx(268, 120, 'so stálou dĺžkou V', 'mutl');
  return s;
}

// ───────────── polohy priemetne (rez meridiánom) ─────────────
function figPolohy() {
  let s = '';
  const pan = (cx, ang, title, sub) => {
    const O = [cx, 150], r = 48, T = [cx + r * Math.cos(ang), 150 - r * Math.sin(ang)], d = [Math.sin(ang), Math.cos(ang)];
    return ci(O, r, 'given') + ln([cx, 150 - r - 14], [cx, 150 + r + 14], 'dash') + ln([T[0] - 62 * d[0], T[1] - 62 * d[1]], [T[0] + 62 * d[0], T[1] + 62 * d[1]], 'res') + pt(T, '', 0, 0, 'rdot') + pt([cx, 150 - r], 'P', -14, -2) + tx(cx - 52, 36, title, 'lab') + tx(cx - 52, 240, sub, 'mutl');
  };
  return pan(66, Math.PI / 2, 'pólová (normálna)', 'dotyk v póle') + pan(200, 0, 'rovníková (priečna)', 'dotyk na rovníku') + pan(334, Math.PI / 4, 'všeobecná (šikmá)', 'dotyk inde');
}

// ───────────── azimutálne projekcie v pólovej polohe: rez + sieť (rysovačky) ─────────────
/** typ: 'orto' | 'gnom' | 'stereo' */
function azStepsPolar(typ) {
  const R = typ === 'orto' ? 80 : typ === 'gnom' ? 48 : 44;
  const O = [100, 205], Pp = [O[0], O[1] - R], tY = O[1] - R; // dotyková rovina v póle P
  const C = [302, 150]; // stred siete (obraz pólu)
  const Us = typ === 'gnom' ? [60, 30] : [60, 30, 0];
  const rho = (U) => (typ === 'orto' ? R * Math.cos(rad(U)) : typ === 'gnom' ? R / Math.tan(rad(U)) : 2 * R * Math.tan(rad((90 - U) / 2)));
  const onM = (U) => [O[0] + R * Math.cos(rad(U)), O[1] - R * Math.sin(rad(U))];
  const S = typ === 'gnom' ? O : typ === 'stereo' ? [O[0], O[1] + R] : null;
  const name = { orto: 'ortografická', gnom: 'gnómonická', stereo: 'stereografická' }[typ];
  const centre = { orto: 'Stred premietania S je v nekonečne: premietacie lúče sú rovnobežné so zemskou osou (kolmé na priemetňu).', gnom: 'Stred premietania S je v strede gule O. Lúče idú zo stredu Zeme.', stereo: 'Stred premietania S je protiľahlý pól (južný pól), priemetňa je dotyková rovina v severnom póle P.' }[typ];
  const formula = { orto: 'ρ = R · cos U', gnom: 'ρ = R · cotg U', stereo: 'ρ = 2R · tg((90° − U)/2)' }[typ];
  const steps = [];
  steps.push({
    t: `<b>Dané:</b> referenčná guľová plocha s polomerom R, priemetňa π sa dotýka gule v severnom póle P (pólová poloha). Vľavo kreslíme <b>rez meridiánom</b> (pomocný obrázok), vpravo vznikne <b>sieť</b>. Projekcia: ${name}.`,
    d: () => ci(O, R, 'given') + ln([O[0] - R - 10, O[1]], [O[0] + R + 10, O[1]], 'dash') + ln([O[0], O[1] + R + 8], [O[0], tY - 12], 'dash') + ln([O[0] - 20, tY], [196, tY], 'given') + pt(O, 'O', -14, 14) + pt(Pp, 'P', -14, -4) + tx(176, tY - 6, 'π', 'lab') + tx(O[0] + R + 2, O[1] + 14, 'rovník', 'mutl'),
  });
  steps.push({
    t: `${centre} Na meridiáne vyznač body so šírkou U = ${Us.map((u) => u + '°').join(', ')} (uhol od rovníka, merané zo stredu O).`,
    d: () => Us.map((U) => ln(O, onM(U), 'dash') + pt(onM(U), U + '°', 5, 2, 'adot', 'auxl')).join('') + (S && typ === 'stereo' ? pt(S, 'S', -16, 4, 'adot', 'auxl') : '') + (typ === 'gnom' ? tx(O[0] + 6, O[1] - 6, '= S', 'auxl') : ''),
  });
  steps.push({
    t: typ === 'orto' ? 'Z každého bodu spusti <b>kolmicu na priemetňu</b> (rovnobežne s osou). Vzdialenosť pätiek od P je ρ = R·cos U.' : typ === 'gnom' ? 'Lúčom zo stredu O cez každý bod pretni priemetňu. Vzdialenosť od P je ρ = R·cotg U. Rovník (U = 0°) dá lúč rovnobežný s π, preto sa <b>nezobrazí</b>.' : 'Lúčom zo S (južný pól) cez každý bod pretni priemetňu. Vzdialenosť od P je ρ = 2R·tg((90° − U)/2). Rovník má ρ = 2R.',
    d: () => Us.map((U) => { const M = onM(U), F = [O[0] + rho(U), tY]; return (S ? ln(S, F, 'aux') : ln(M, F, 'aux')) + pt(F, '', 0, 0, 'rdot'); }).join(''),
  });
  steps.push({
    t: `Vzdialenosti z priemetne sú polomery obrazov rovnobežiek: ${Us.map((U) => `ρ(${U}°) = ${sk(rho(U) / R)}·R`).join(', ')}. Prenes ich kružidlom do siete. Obraz pólu P je stred, rovnobežky sú <b>sústredné kružnice</b>.`,
    d: () => Us.map((U) => ci(C, rho(U), 'res') + tx(C[0] + 4, C[1] - rho(U) - 3, U + '°', 'resl')).join('') + pt(C, 'P', 5, 12),
  });
  steps.push({
    t: 'Poludníky sú <b>polpriamky z obrazu pólu</b> a zvierajú skutočné uhly ε = V (pri sieti 30° každých 30°). Azimutálne projekcie v pólovej polohe zachovávajú uhly v póle (azimuty).',
    d: () => { let s = ''; const L = rho(Us[Us.length - 1]) + 8; for (let V = 0; V < 360; V += 30) s += ln(C, [C[0] + L * Math.sin(rad(V)), C[1] + L * Math.cos(rad(V))], 'res'); return s + tx(C[0] - 4, C[1] + L + 14, 'V = 0°', 'mutl'); },
  });
  const note = { orto: 'Zobrazí sa jedna hemisféra (rovník = obrys s ρ = R). Rovnobežky sa k rovníku zhusťujú. Dĺžky rovnobežiek sa zachovajú (2πρ = 2πR·cos U), zobrazenie je ekvidištančné v rovnobežkách.', gnom: 'Zobrazí sa menej ako hemisféra, rovnobežky sa k rovníku rýchlo riedia. Hlavná vlastnosť: každá hlavná kružnica (ortodróma) sa zobrazí ako <b>priamka</b>, lebo jej rovina prechádza stredom S = O.', stereo: 'Celá guľa okrem bodu S sa zobrazí do roviny. Zobrazenie je <b>konformné</b> (zachová uhly) a kružnice na guli sa zobrazia ako kružnice alebo priamky.' }[typ];
  steps.push({ t: `<b>Výsledok, ${formula}.</b> ${note}`, d: () => tx(206, 292, formula, 'resl') });
  return steps;
}

// ───────────── ortodróma v gnómonickej pólovej projekcii ─────────────
function stOrtoGnom() {
  const R = 52, C = [200, 150];
  const P = (U, V) => { const r = R / Math.tan(rad(U)); return [C[0] + r * Math.sin(rad(V)), C[1] + r * Math.cos(rad(V))]; };
  const A = P(50, -60), B = P(40, 70);
  const net = () => { let s = ''; for (const U of [75, 60, 45, 30]) s += ci(C, R / Math.tan(rad(U)), 'cont') + tx(C[0] + 3, C[1] - R / Math.tan(rad(U)) - 2, U + '°', 'mutl'); for (let V = -180; V < 180; V += 30) s += ln(C, [C[0] + 140 * Math.sin(rad(V)), C[1] + 140 * Math.cos(rad(V))], 'cont'); return s + pt(C, 'P', 5, -6); };
  // loxodróma (pre porovnanie): V = V_A + k·ln tg(45°+U/2)
  const qA = Math.log(Math.tan(rad(45 + 50 / 2))), qB = Math.log(Math.tan(rad(45 + 40 / 2))), k = (70 + 60) / (qB - qA);
  const lox = curve((t) => { const U = 50 + (40 - 50) * t, V = -60 + k * (Math.log(Math.tan(rad(45 + U / 2))) - qA); return P(U, V); }, 0, 1, 60, 'ang');
  return [
    { t: '<b>Dané:</b> gnómonická projekcia v pólovej polohe, R = 52 (sieť po 15° v šírke, 30° v dĺžke) a body A(U = 50°, V = −60°), B(U = 40°, V = 70°). Zostroj obraz ortodrómy AB.', d: () => net() },
    { t: 'Obraz bodu: rovnobežka s U má polomer ρ = R·cotg U, poludník je polpriamka pod uhlom V. A_g leží na ρ = R·cotg 50° = 0,84·R, B_g na ρ = R·cotg 40° = 1,19·R.', d: () => pt(A, 'A_g', -24, -6, 'rdot', 'resl') + pt(B, 'B_g', 6, -6, 'rdot', 'resl') },
    { t: 'Ortodróma leží v rovine cez stred gule O. V gnómonickej projekcii je S = O, celá táto rovina sa premietne do jednej priamky. <b>Obraz ortodrómy je úsečka A_gB_g.</b>', d: () => ln(A, B, 'res') },
    { t: 'Pre porovnanie (žltá): loxodróma z A do B. Pretína poludníky pod stálym uhlom, preto sa v tejto projekcii zakriví. Ortodróma je kratšia, loxodróma má stály kurz.', d: () => lox },
    { t: 'Prakticky: priesečníky úsečky A_gB_g s poludníkmi odčítaš (U, V) a prenesieš do inej mapy, napr. do Mercatorovej. Tam ortodrómu nakreslíš po bodoch.', d: () => '' },
  ];
}

// ───────────── ortodróma v ortografickej projekcii (A, B na tej istej hemisfére) ─────────────
function stOrtoOrtho() {
  const R = 100, O = [200, 150];
  // 3D body na guli (z > 0 = nad rovinou obrysu, smerom k pozorovateľovi)
  const A3 = [-0.85, 0.35], B3 = [0.3, 0.45];
  const zA = Math.sqrt(1 - A3[0] ** 2 - A3[1] ** 2), zB = Math.sqrt(1 - B3[0] ** 2 - B3[1] ** 2);
  const P2 = (p) => [O[0] + R * p[0], O[1] - R * p[1]];
  const A1 = P2(A3), B1 = P2(B3);
  // sklopenie: kolmice na A1B1 dĺžky zA, zB na tú istú stranu
  const d = [B1[0] - A1[0], B1[1] - A1[1]], L = Math.hypot(d[0], d[1]), u = [d[0] / L, d[1] / L], nrm = [-u[1], u[0]];
  const Asl = [A1[0] + nrm[0] * R * zA, A1[1] + nrm[1] * R * zA], Bsl = [B1[0] + nrm[0] * R * zB, B1[1] + nrm[1] * R * zB];
  const tX = zA / (zA - zB), X = [A1[0] + d[0] * tX, A1[1] + d[1] * tX]; // priesečník (A)(B) s A1B1
  const ou = (() => { const w = [X[0] - O[0], X[1] - O[1]], l = Math.hypot(w[0], w[1]); return [w[0] / l, w[1] / l]; })();
  const on = [-ou[1], ou[0]];
  const K = [O[0] + R * ou[0], O[1] + R * ou[1]], Lv = [O[0] - R * ou[0], O[1] - R * ou[1]];
  // afinita: A° na kružnici, na kolmici k osi cez A1 (tá istá strana)
  const sA = (A1[0] - O[0]) * ou[0] + (A1[1] - O[1]) * ou[1], hA = (A1[0] - O[0]) * on[0] + (A1[1] - O[1]) * on[1];
  const sgn = Math.sign(hA), hC = sgn * Math.sqrt(R * R - sA * sA);
  const Ao = [O[0] + sA * ou[0] + hC * on[0], O[1] + sA * ou[1] + hC * on[1]];
  const M = [O[0] + sgn * R * on[0], O[1] + sgn * R * on[1]];
  const lx = (p, dd, q, e) => { const c = dd[0] * e[1] - dd[1] * e[0], w = [q[0] - p[0], q[1] - p[1]], t = (w[0] * e[1] - w[1] * e[0]) / c; return [p[0] + dd[0] * t, p[1] + dd[1] * t]; };
  const Y = lx(Ao, [M[0] - Ao[0], M[1] - Ao[1]], O, ou);
  const M1 = lx(Y, [A1[0] - Y[0], A1[1] - Y[1]], O, on);
  const b = Math.hypot(M1[0] - O[0], M1[1] - O[1]);
  const n3 = [A3[1] * zB - zA * B3[1], zA * B3[0] - A3[0] * zB, A3[0] * B3[1] - A3[1] * B3[0]];
  const res = (P1) => { const w = [P1[0] - O[0], P1[1] - O[1]], s2 = w[0] * ou[0] + w[1] * ou[1], h2 = w[0] * on[0] + w[1] * on[1]; return (s2 / R) ** 2 + (h2 / b) ** 2 - 1; };
  const _chk = { b, bTrue: (R * Math.abs(n3[2])) / Math.hypot(...n3), resA: res(A1), resB: res(B1), X };
  const ell = (from, to, cls) => curve((t) => [O[0] + R * Math.cos(t) * ou[0] + b * Math.sin(t) * on[0], O[1] + R * Math.cos(t) * ou[1] + b * Math.sin(t) * on[1]], from, to, 90, cls);
  const out = [
    { t: '<b>Dané:</b> ortografická projekcia, obrys gule g (kružnica so stredom O₁ a polomerom R) a priemety A₁, B₁ dvoch bodov na <b>tej istej</b> (prednej) hemisfére. Zostroj obraz ortodrómy AB.', d: () => `<circle cx="${O[0]}" cy="${O[1]}" r="${R}" class="given"/>` + pt(O, 'O_1', -18, 14) + pt(A1, 'A_1', -22, -6) + pt(B1, 'B_1', 6, -6) + tx(O[0] + R * 0.72, O[1] - R * 0.78, 'g', 'lab') },
    { t: 'Výška bodu nad rovinou obrysu: v A₁ veď kolmicu na O₁A₁, pretne g v (A). Úsečka A₁(A) je výška z_A (Pytagoras: z² = R² − |O₁A₁|²). Rovnako z_B.', d: () => { const h = (P1, z) => { const w = [P1[0] - O[0], P1[1] - O[1]], l = Math.hypot(w[0], w[1]), n2 = [-w[1] / l, w[0] / l], Q = [P1[0] + n2[0] * R * z, P1[1] + n2[1] * R * z]; return ln(O, Q, 'dash') + ln(P1, Q, 'aux') + pt(Q, '', 0, 0, 'adot'); }; return h(A1, zA) + h(B1, zB); } },
    { t: 'Sklop priamku AB okolo A₁B₁: v A₁ a B₁ nanes kolmo na A₁B₁ (na tú istú stranu, lebo body sú na tej istej hemisfére) výšky z_A, z_B → (A), (B). Priamka (A)(B) pretne A₁B₁ v bode X: tam priamka AB prechádza rovinou obrysu.', d: () => ln(A1, B1, 'cont') + ln(A1, Asl, 'aux') + ln(B1, Bsl, 'aux') + pt(Asl, '(A)', 4, -6, 'adot', 'auxl') + pt(Bsl, '(B)', 4, -6, 'adot', 'auxl') + ln(Asl, X, 'aux') + ln(B1, X, 'dash') + pt(X, 'X', 6, 12, 'adot', 'auxl') },
    { t: 'Rovina ortodrómy prechádza stredom gule, bodmi A, B aj bodom X. Jej priesečnica s rovinou obrysu je priamka O₁X: to je <b>hlavná os</b> obrazu. Hlavné vrcholy K, L ležia na obryse g, hlavná polos a = R.', d: () => ln(K, Lv, 'res') + pt(K, 'K', 6, 4, 'rdot', 'resl') + pt(Lv, 'L', -14, 4, 'rdot', 'resl') },
    { t: 'Vedľajšiu polos b nájdi <b>afinitou</b> kružnica g → elipsa (os afinity O₁X): kolmica z A₁ na os pretne g v A°. Spoj A° s bodom M kružnice na kolmici k osi v O₁, dostaneš Y na osi. Priamka YA₁ pretne kolmicu v M₁. b = |O₁M₁|.', d: () => ln(A1, Ao, 'aux') + pt(Ao, 'A°', 4, -6, 'adot', 'auxl') + ln(O, M, 'dash') + pt(M, 'M', 4, -4, 'adot', 'auxl') + ln(Ao, Y, 'aux') + ln(Y, M1, 'aux') + pt(Y, 'Y', 4, 12, 'adot', 'auxl') + pt(M1, 'M_1', 6, 4, 'rdot', 'resl') },
    { t: `<b>Výsledok:</b> obraz ortodrómy je <b>elipsa</b> so stredom O₁, a = R, b = |O₁M₁| (tu ${sk(b / R)}·R), dotýka sa obrysu g v K a L a prechádza bodmi A₁, B₁. Ak sú A, B na rôznych hemisférach, výšky nanášaš na opačné strany a X padne medzi A₁ a B₁.`, d: () => ell(0, 2 * Math.PI, 'res') },
  ];
  out._chk = _chk;
  return out;
}

// ───────────── valcové zobrazenia v normálnej polohe ─────────────
const VALC = {
  ekvi: { y: (U) => U, max: 90, name: 'ekvidištančné v poludníkoch: y = R·U (U v radiánoch)' },
  lambert: { y: (U) => Math.sin(U), max: 90, name: 'Lambertovo izocylindrické (ekvivalentné): y = R·sin U' },
  merc: { y: (U) => Math.log(Math.tan(Math.PI / 4 + U / 2)), max: 60, name: 'Mercatorovo (konformné): y = R·ln tg(45° + U/2)' },
  gnom: { y: (U) => Math.tan(U), max: 60, name: 'gnómonická valcová projekcia: y = R·tg U' },
  braun: { y: (U) => 2 * Math.tan(U / 2), max: 90, name: 'Braunova stereografická (dotyková): y = 2R·tg(U/2)' },
};
function figValc(key, lox = false) {
  const v = VALC[key], R = 52, c = [200, 132];
  const X = (V) => c[0] + R * rad(V), Yp = (U) => c[1] - R * v.y(rad(U));
  let s = '';
  const Us = [-90, -60, -30, 0, 30, 60, 90].filter((U) => Math.abs(U) <= v.max);
  const top = Yp(Math.min(v.max, 90)), bot = Yp(-Math.min(v.max, 90));
  for (let V = -180; V <= 180; V += 30) s += ln([X(V), top], [X(V), bot], V === 0 ? 'given' : 'cont');
  for (const U of Us) s += ln([X(-180), Yp(U)], [X(180), Yp(U)], U === 0 ? 'given' : 'cont') + tx(X(180) + 3, Yp(U) + 4, U + '°', 'mutl');
  if (v.max < 90) s += tx(X(-180), top - 8, 'pól sa nezobrazí (je v nekonečne)', 'mutl');
  if (lox) {
    // loxodróma s kurzom 60°: v Mercatorovej mape priamka
    s += ln([X(-150), Yp(-50)], [X(-150) + (Yp(-50) - Yp(55)) * Math.tan(rad(60)), Yp(55)], 'res') + tx(X(-150) + 20, Yp(-30), 'loxodróma = priamka', 'resl');
  }
  return s + tx(14, 270, v.name, 'lab');
}
function figTissot() {
  // Tissotova indikatrix: Mercator (kružnice rastú 1/cos U) vs. Lambert izocylindrické (elipsy, plocha rovnaká)
  let s = '';
  const pan = (cx, key, title) => {
    const R = 40, v = VALC[key], Y = (U) => 150 - R * v.y(rad(U));
    let t = ln([cx - 80, Y(0)], [cx + 80, Y(0)], 'given') + tx(cx - 80, 30, title, 'lab');
    for (const U of [0, 30, 60]) {
      const mp = key === 'merc' ? 1 / Math.cos(rad(U)) : Math.cos(rad(U)), mr = 1 / Math.cos(rad(U)), r0 = 9;
      t += ln([cx - 80, Y(U)], [cx + 80, Y(U)], 'cont') + tx(cx + 84, Y(U) + 4, U + '°', 'mutl');
      for (const V of [-50, 0, 50]) t += `<ellipse cx="${f(cx + V)}" cy="${f(Y(U))}" rx="${f(r0 * mr)}" ry="${f(r0 * mp)}" class="res"/>`;
    }
    return t;
  };
  return pan(100, 'merc', 'Mercator: kružnice rastú') + pan(300, 'lambert', 'Lambert: elipsy, rovnaká plocha') + tx(14, 222, 'Mercator: m_p = m_r = 1/cos U (tvar ostane)', 'mutl') + tx(14, 238, 'Lambert: m_p = cos U, m_r = 1/cos U, m_p·m_r = 1 (plocha ostane)', 'mutl');
}

// ───────────── azimutálne v rovníkovej polohe ─────────────
function figAzRovn() {
  let s = '';
  const pan = (cx, typ, title, R) => {
    const C = [cx, 140];
    const P = (U, V) => {
      const u = rad(U), v = rad(V), cc = Math.cos(u) * Math.cos(v);
      if (typ === 'orto') return cc < -1e-9 ? null : [C[0] + R * Math.cos(u) * Math.sin(v), C[1] - R * Math.sin(u)];
      if (typ === 'gnom') return cc < 0.5 ? null : [C[0] + R * Math.tan(v), C[1] - (R * Math.tan(u)) / Math.cos(v)];
      const k = 2 / (1 + cc);
      return [C[0] + R * k * Math.cos(u) * Math.sin(v), C[1] - R * k * Math.sin(u)];
    };
    let t = tx(cx - 60, 26, title, 'lab');
    if (typ !== 'gnom') t += ci(C, typ === 'orto' ? R : 2 * R, 'given');
    for (let V = -90; V <= 90; V += 30) if (typ !== 'gnom' || Math.abs(V) <= 30) t += curve((U) => P(U, V), -89.9, 89.9, 90, V === 0 ? 'given' : 'res');
    for (let U = -60; U <= 60; U += 30) t += curve((V) => P(U, V), -90, 90, 90, U === 0 ? 'given' : 'cont');
    return t;
  };
  return pan(68, 'orto', 'ortografická', 58) + pan(200, 'stereo', 'stereografická', 29) + pan(334, 'gnom', 'gnómonická', 28) + tx(14, 236, 'ružové = poludníky, sivé = rovnobežky (sieť 30°)', 'mutl') + tx(14, 252, 'gnóm.: rovnobežky = hyperboly; orto.: rovnobežky = úsečky', 'mutl');
}

// ───────────── Mercator: ortodróma vs. loxodróma ─────────────
function figOrtoLoxo() {
  const R = 50, c = [200, 150];
  const X = (V) => c[0] + R * rad(V), Y = (U) => c[1] - R * Math.log(Math.tan(Math.PI / 4 + rad(U) / 2));
  let s = '';
  for (let V = -150; V <= 150; V += 30) s += ln([X(V), Y(70)], [X(V), Y(-20)], 'cont');
  for (const U of [-15, 0, 15, 30, 45, 60, 70]) s += ln([X(-150), Y(U)], [X(150), Y(U)], U === 0 ? 'given' : 'cont') + tx(X(150) + 3, Y(U) + 4, U + '°', 'mutl');
  // A (U 40°, V −120°), B (U 40°, V 100°): ortodróma cez sférickú interpoláciu
  const toV = (U, V) => [Math.cos(rad(U)) * Math.cos(rad(V)), Math.cos(rad(U)) * Math.sin(rad(V)), Math.sin(rad(U))];
  const a = toV(40, -100), b = toV(40, 60), om = Math.acos(a[0] * b[0] + a[1] * b[1] + a[2] * b[2]);
  s += curve((t) => { const w1 = Math.sin((1 - t) * om) / Math.sin(om), w2 = Math.sin(t * om) / Math.sin(om); const p = [w1 * a[0] + w2 * b[0], w1 * a[1] + w2 * b[1], w1 * a[2] + w2 * b[2]]; const U = (Math.asin(p[2]) * 180) / Math.PI; const V = (Math.atan2(p[1], p[0]) * 180) / Math.PI; return [X(V), Y(U)]; }, 0, 1, 80, 'res');
  s += ln([X(-100), Y(40)], [X(60), Y(40)], 'ang') + pt([X(-100), Y(40)], 'A', -14, -4) + pt([X(60), Y(40)], 'B', 6, -4);
  return s + tx(14, 268, 'žltá loxodróma (rovnobežka 40°) = priamka, ružová ortodróma = krivka k pólu', 'mutl');
}

// ───────────── kužeľové: Ptolemaiovo (ekvidištančné v poludníkoch) ─────────────
function figPtolemaios() {
  const R = 72, U0 = 45, n = Math.sin(rad(U0)), A = [200, 92];
  const rho = (U) => R / Math.tan(rad(U0)) + R * (rad(U0) - rad(U));
  const P = (U, V) => { const e = n * rad(V), r = rho(U); return [A[0] + r * Math.sin(e), A[1] + r * Math.cos(e)]; };
  let s = pt(A, 'V_k', 6, -4);
  for (let V = -180; V <= 180; V += 30) s += ln(P(90, V), P(0, V), V === 0 ? 'given' : 'cont');
  for (const U of [90, 60, 30, 0]) s += curve((V) => P(U, V), -180, 180, 120, U === U0 ? 'res' : U === 0 ? 'given' : 'cont');
  s += curve((V) => P(U0, V), -180, 180, 120, 'res') + tx(P(U0, 40)[0] + 4, P(U0, 40)[1] + 14, 'U₀ = 45° (dĺžka zachovaná)', 'resl');
  return s + tx(14, 262, 'ρ = R·cotg U₀ + R·(U₀ − U), ε = V·sin U₀; pól je oblúk', 'mutl');
}

// ───────────── nepravé a polykónické ─────────────
function figNeprave() {
  let s = '';
  const R = 26;
  // Sanson (sínusoidálne): x = R·V·cos U, y = R·U
  const S0 = [96, 120], Ps = (U, V) => [S0[0] + R * rad(V) * Math.cos(rad(U)), S0[1] - R * rad(U)];
  for (let V = -180; V <= 180; V += 30) s += curve((U) => Ps(U, V), -90, 90, 60, V === 0 ? 'given' : 'res');
  for (let U = -60; U <= 60; U += 30) s += ln(Ps(U, -180), Ps(U, 180), U === 0 ? 'given' : 'cont');
  s += tx(10, 22, 'pseudocylindrické (Sanson)', 'lab') + tx(10, 218, 'rovnobežky = priamky', 'mutl');
  // Werner–Stab: ρ = R(π/2 − U), oblúk rovnobežky má skutočnú dĺžku
  const W0 = [300, 66], Rw = 22, Pw = (U, V) => { const r = Rw * (Math.PI / 2 - rad(U)); const e = r < 1e-9 ? 0 : (Rw * rad(V) * Math.cos(rad(U))) / r; return [W0[0] + r * Math.sin(e), W0[1] + r * Math.cos(e)]; };
  for (let V = -180; V <= 180; V += 30) s += curve((U) => Pw(U, V), -89, 89.9, 80, V === 0 ? 'given' : 'res');
  for (let U = -60; U <= 60; U += 30) s += curve((V) => Pw(U, V), -180, 180, 80, U === 0 ? 'given' : 'cont');
  s += tx(232, 22, 'pseudoazimutálne', 'lab') + tx(232, 218, '(Werner–Stab)', 'mutl');
  return s;
}
function figPolykon() {
  const R = 54, c = [200, 200];
  const P = (U, V) => {
    const u = rad(U), v = rad(V);
    if (Math.abs(U) < 1e-6) return [c[0] + R * v, c[1]];
    const E = v * Math.sin(u), ct = 1 / Math.tan(u);
    return [c[0] + R * ct * Math.sin(E), c[1] - R * (u + ct * (1 - Math.cos(E)))];
  };
  let s = '';
  for (let V = -150; V <= 150; V += 30) s += curve((U) => P(U, V), 0, 75, 60, V === 0 ? 'given' : 'res');
  for (const U of [0, 15, 30, 45, 60, 75]) s += curve((V) => P(U, V), -150, 150, 90, U === 0 ? 'given' : 'cont');
  return s + tx(14, 236, 'rovnobežky: NEsústredné oblúky s polomerom R·cotg U', 'mutl') + tx(14, 252, 'stredný poludník: priamka so skutočnou dĺžkou', 'mutl');
}

const one = (d, vb = '0 0 400 300') => ({ vb, steps: [{ t: '', d }] });

export const RYS_KART = {
  'kart-orto-pol': { vb: '0 0 400 300', steps: azStepsPolar('orto') },
  'kart-gnom-pol': { vb: '0 0 400 300', steps: azStepsPolar('gnom') },
  'kart-stereo-pol': { vb: '0 0 400 300', steps: azStepsPolar('stereo') },
  'kart-orto-gnom': { vb: '0 0 400 300', steps: stOrtoGnom() },
  'kart-orto-ortho': { vb: '0 0 400 300', steps: stOrtoOrtho() },
};

export const PICS_KART = {
  'dg-kart-siet': one(figSiet),
  'dg-kart-polohy': one(figPolohy, '0 0 400 250'),
  'dg-kart-v-ekvi': one(() => figValc('ekvi'), '0 0 400 280'),
  'dg-kart-v-lambert': one(() => figValc('lambert'), '0 0 400 280'),
  'dg-kart-v-merc': one(() => figValc('merc', true), '0 0 400 280'),
  'dg-kart-v-gnom': one(() => figValc('gnom'), '0 0 400 280'),
  'dg-kart-v-braun': one(() => figValc('braun'), '0 0 400 280'),
  'dg-kart-tissot': one(figTissot, '0 0 400 245'),
  'dg-kart-az-rovn': one(figAzRovn, '0 0 400 262'),
  'dg-kart-orto-loxo': one(figOrtoLoxo, '0 0 400 280'),
  'dg-kart-ptolemaios': one(figPtolemaios, '0 0 400 272'),
  'dg-kart-neprave': one(figNeprave, '0 0 400 230'),
  'dg-kart-polykon': one(figPolykon, '0 0 400 262'),
};

/** kontrola (scripts/check_kart.mjs): b z konštrukcie vs. b = R·|n_z|/|n| a zvyšky elipsy v A₁, B₁ */
export function _checkOrtho() {
  return stOrtoOrtho()._chk;
}
