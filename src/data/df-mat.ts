import type { Step } from './steps';

// 3. písomka z Matematiky 1: iba definičný obor funkcie.
// Príklady sú z poznámok spolužiačky (Paula, 30. 10. 2026) a z prednášky Funkcie (4. týždeň).
// Všetky výsledky overené v sympy (continuous_domain) a numericky.

/** Časť 1: päť pravidiel, každé s obrázkom (číselná os), mini príkladom a otázkou. */
export const DF_RULES: Step[] = [
  {
    title: 'Čo je definičný obor',
    text: 'Definičný obor D(f) sú všetky čísla x, ktoré SMIEŠ dosadiť do funkcie. Hľadáš teda zakázané situácie, kde sa výpočet „pokazí“.\n\nNa písomke stačí poznať päť pravidiel. Ku každému je podmienka, ktorú napíšeš, vyriešiš a výsledok zapíšeš intervalom.',
    analogy: 'Automat na kávu berie iba niektoré mince. Definičný obor je zoznam mincí, ktoré automat zoberie. Ostatné vypľuje.',
    bullets: ['zlomok: menovateľ ≠ 0', 'párna odmocnina: pod ňou ≥ 0', 'logaritmus: argument > 0', 'tg a cotg: cos ≠ 0, resp. sin ≠ 0', 'arcsin a arccos: argument od −1 do 1'],
  },
  {
    title: 'Pravidlo 1: zlomok',
    text: 'Nulou deliť nesmieš. Kedykoľvek vidíš zlomok s x v menovateli, napíš podmienku MENOVATEĽ ≠ 0. Z osi potom vyhodíš iba jednotlivé body.',
    fig: 'os|ℝ ∖ {0}',
    formula: {
      f: 'f(x) = p(x) / q(x)   →   q(x) ≠ 0',
      what: 'podmienka pre zlomok',
      vars: [
        ['q(x)', 'menovateľ, to čo je pod zlomkovou čiarou'],
        ['≠ 0', 'nesmie byť nula, ostatné čísla sú v poriadku'],
        ['p(x)', 'čitateľ môže byť čokoľvek, aj nula'],
      ],
    },
    worked: {
      q: 'f(x) = 1/x',
      steps: ['Zlomok → menovateľ ≠ 0.', 'x ≠ 0.', 'Na osi je celá priamka okrem jednej diery v nule (obrázok vyššie).'],
      result: 'D(f) = ℝ ∖ {0}',
    },
    check: {
      q: 'f(x) = 3 / (x − 5). D(f) = ?',
      options: ['ℝ ∖ {5}', 'ℝ ∖ {−5}', '(5, ∞)', 'ℝ'],
      explain: 'x − 5 ≠ 0 → x ≠ 5. Vyhodíš jediný bod 5, inak môžeš dosadiť čokoľvek.',
    },
  },
  {
    title: 'Pravidlo 2: párna odmocnina',
    text: 'Z ZÁPORNÉHO čísla druhú (štvrtú…) odmocninu nevypočítaš. Pod odmocninou musí byť číslo väčšie alebo rovné nule. Nula je v poriadku, √0 = 0, preto krajný bod PATRÍ (plný krúžok).\n\nPozor: ak je odmocnina v MENOVATELI, nesmie byť ani nula. Vtedy je podmienka ostrá: > 0.',
    fig: 'os|(−∞, 3⟩',
    formula: {
      f: '√u   →   u ≥ 0          1 / √u   →   u > 0',
      what: 'podmienka pre párnu odmocninu',
      vars: [
        ['u', 'všetko, čo je pod odmocninou'],
        ['≥ 0', 'nezáporné: kladné alebo nula'],
        ['> 0', 'odmocnina v menovateli: aj nula je zakázaná'],
        ['∛', 'tretia (nepárna) odmocnina nemá podmienku'],
      ],
    },
    worked: {
      q: 'f(x) = √(15 − 5x)',
      steps: ['Pod odmocninou ≥ 0: 15 − 5x ≥ 0.', 'Presuň 5x doprava: 15 ≥ 5x.', 'Vydeľ 5: 3 ≥ x, teda x ≤ 3.', '3 patrí (√0 = 0), preto lomená zátvorka. Os je vyfarbená naľavo od 3.'],
      result: 'D(f) = (−∞, 3⟩',
    },
    check: {
      q: 'f(x) = √(x + 4). D(f) = ?',
      options: ['⟨−4, ∞)', '(−4, ∞)', '⟨4, ∞)', '(−∞, −4⟩'],
      explain: 'x + 4 ≥ 0 → x ≥ −4. Bod −4 patrí (√0 = 0), preto lomená zátvorka ⟨−4. Pri ∞ je vždy okrúhla.',
    },
  },
  {
    title: 'Pravidlo 3: logaritmus',
    text: 'Logaritmus existuje iba z KLADNÉHO čísla. Nula už nie (ln 0 neexistuje). Podmienka je preto ostrá: argument > 0, a krajný bod NEPATRÍ (prázdny krúžok).\n\nPlatí pre ln, log aj log s akýmkoľvek základom, napríklad log₄.',
    fig: 'os|(−3/2, ∞)',
    formula: {
      f: 'ln u,  log u,  logₐ u   →   u > 0',
      what: 'podmienka pre logaritmus',
      vars: [
        ['u', 'argument, to čo je v zátvorke za ln'],
        ['> 0', 'OSTRO väčšie ako nula, nula nesmie'],
        ['logₐ', 'základ a na podmienke nič nemení'],
      ],
    },
    worked: {
      q: 'f(x) = log₄(2x + 3)',
      steps: ['Argument > 0: 2x + 3 > 0.', 'Presuň 3: 2x > −3.', 'Vydeľ 2: x > −3/2.', 'Ostrá nerovnosť → okrúhla zátvorka, −3/2 nepatrí (prázdny krúžok).'],
      result: 'D(f) = (−3/2, ∞)',
    },
    check: {
      q: 'f(x) = ln(6 − 2x). D(f) = ?',
      options: ['(−∞, 3)', '(−∞, 3⟩', '(3, ∞)', '(−3, ∞)'],
      explain: '6 − 2x > 0 → 6 > 2x → x < 3. Ostro, takže 3 nepatrí: (−∞, 3).',
    },
  },
  {
    title: 'Pravidlo 4: tangens a kotangens',
    text: 'tg je zlomok sin/cos a cotg je cos/sin. Takže zase pravidlo zlomku: pri tg cos ≠ 0, pri cotg sin ≠ 0.\n\ncos je nula v bodoch π/2 + kπ a sin v bodoch kπ (k je ľubovoľné celé číslo). Diery sa preto opakujú donekonečna s periódou.',
    fig: 'os|ℝ ∖ {π/4 + kπ/2; k ∈ ℤ}',
    formula: {
      f: 'tg u = sin u / cos u   →   u ≠ π/2 + kπ          cotg u = cos u / sin u   →   u ≠ kπ',
      what: 'podmienka pre tg a cotg',
      vars: [
        ['u', 'argument v zátvorke, napríklad 2x − π'],
        ['π/2 + kπ', 'kde je cos nulový (…, −π/2, π/2, 3π/2, …)'],
        ['kπ', 'kde je sin nulový (…, −π, 0, π, 2π, …)'],
        ['k ∈ ℤ', 'k je ľubovoľné celé číslo'],
      ],
    },
    worked: {
      q: 'f(x) = tg(2x − π)',
      steps: [
        'tg = sin/cos, preto cos(2x − π) ≠ 0.',
        'cos je 0 v π/2 + kπ: 2x − π ≠ π/2 + kπ.',
        'Presuň π: 2x ≠ 3π/2 + kπ.',
        'Vydeľ 2 (aj periódu!): x ≠ 3π/4 + kπ/2.',
        'To isté ako π/4 + kπ/2 (3π/4 = π/4 + π/2, posun o jednu periódu). Diery: …, −π/4, π/4, 3π/4, 5π/4, …',
      ],
      result: 'D(f) = ℝ ∖ {π/4 + kπ/2; k ∈ ℤ}',
    },
    check: {
      q: 'f(x) = cotg(2x). D(f) = ?',
      options: ['ℝ ∖ {kπ/2; k ∈ ℤ}', 'ℝ ∖ {π/4 + kπ/2; k ∈ ℤ}', 'ℝ ∖ {kπ; k ∈ ℤ}', 'ℝ ∖ {π/2 + kπ; k ∈ ℤ}'],
      explain: 'cotg = cos/sin → sin(2x) ≠ 0 → 2x ≠ kπ → x ≠ kπ/2. Možnosť kπ je zlá, lebo zabudla vydeliť periódu dvomi (chýba napr. π/2).',
    },
  },
  {
    title: 'Pravidlo 5: arcsin a arccos',
    text: 'sin a cos dávajú iba čísla od −1 do 1. Preto ich „spätné“ funkcie arcsin a arccos vedia spracovať iba čísla od −1 do 1. Dostaneš dvojitú nerovnosť a kraje PATRIA.',
    fig: 'os|⟨2, 3⟩',
    formula: {
      f: 'arcsin u,  arccos u   →   −1 ≤ u ≤ 1',
      what: 'podmienka pre arcsin a arccos',
      vars: [
        ['u', 'argument v zátvorke'],
        ['−1 ≤ u ≤ 1', 'dvojitá nerovnosť, uprav všetky tri strany naraz'],
        ['≤', 'kraje patria, arcsin 1 aj arcsin(−1) existujú'],
      ],
    },
    worked: {
      q: 'f(x) = arcsin(5 − 2x)',
      steps: ['−1 ≤ 5 − 2x ≤ 1.', 'Odčítaj 5 od všetkých troch strán: −6 ≤ −2x ≤ −4.', 'Vydeľ (−2), záporné číslo, oba znaky sa otočia: 3 ≥ x ≥ 2.', 'Zapíš od menšieho: 2 ≤ x ≤ 3.'],
      result: 'D(f) = ⟨2, 3⟩',
    },
    check: {
      q: 'f(x) = arccos(x + 2). D(f) = ?',
      options: ['⟨−3, −1⟩', '(−3, −1)', '⟨1, 3⟩', '⟨−1, 1⟩'],
      explain: '−1 ≤ x + 2 ≤ 1 → odčítaj 2 → −3 ≤ x ≤ −1. Kraje patria: ⟨−3, −1⟩.',
    },
  },
  {
    title: 'Zhrnutie pravidiel',
    text: 'Toto sú všetky zakázané situácie. Pri zloženej funkcii (napríklad ln(√(…))) postupuj zvnútra von a podmienku napíš pre každú vrstvu.',
    bullets: ['zlomok: menovateľ ≠ 0 → diera (prázdny bod)', '√: pod ňou ≥ 0, kraj patrí; v menovateli > 0', 'ln, log: argument > 0, kraj nepatrí', 'tg: cos ≠ 0 → ≠ π/2 + kπ;  cotg: sin ≠ 0 → ≠ kπ', 'arcsin, arccos: −1 ≤ argument ≤ 1, kraje patria'],
  },
];

/** Časť 2: zápis intervalov, kombinácie podmienok, tabuľka znamienok. */
export const DF_COMBO: Step[] = [
  {
    title: 'Zápis intervalov',
    text: 'Lomená zátvorka ⟨ ⟩ znamená, že krajný bod PATRÍ (≤, ≥). Okrúhla ( ) znamená, že NEPATRÍ (<, >, ≠). Pri ∞ a −∞ je vždy okrúhla, nekonečno nie je číslo.\n\nKeď výsledok tvoria dva kusy, spojíš ich znakom ∪ (zjednotenie). ℝ ∖ {2} znamená „všetky čísla okrem 2“.',
    fig: 'os|⟨−2, 1) ∪ (3, ∞)',
    formula: {
      f: 'x ≥ a → ⟨a, ∞)     x > a → (a, ∞)     a ≤ x < b → ⟨a, b)     A ∪ B     ℝ ∖ {a}',
      what: 'zápis množín',
      vars: [
        ['⟨', 'bod patrí (≤, ≥), na osi plný krúžok'],
        ['(', 'bod nepatrí (<, >), na osi prázdny krúžok'],
        ['∞', 'nekonečno, zátvorka pri ňom je vždy okrúhla'],
        ['∪', 'zjednotenie: spája dva kusy osi'],
        ['ℝ ∖ {a}', 'všetky reálne čísla okrem a'],
      ],
    },
    check: {
      q: 'Ako zapíšeš „x ≥ 2“?',
      options: ['⟨2, ∞)', '(2, ∞)', '⟨2, ∞⟩', '(−∞, 2⟩'],
      explain: '2 patrí (≥) → ⟨2. Pri ∞ je vždy okrúhla zátvorka.',
    },
  },
  {
    title: 'Viac podmienok naraz',
    text: 'Keď je vo funkcii viac nebezpečných miest, musia platiť VŠETKY podmienky naraz. Na osi si ich nakresli pod seba a nechaj iba to, čo platí všade (prienik).',
    fig: 'os|⟨−2, 2) ∪ (2, 3)',
    worked: {
      q: 'f(x) = √(x + 2) / ln(3 − x)',
      steps: [
        'Tri nebezpečné miesta: odmocnina, logaritmus, menovateľ.',
        'Odmocnina: x + 2 ≥ 0 → x ≥ −2.',
        'Logaritmus: 3 − x > 0 → x < 3.',
        'Menovateľ: ln(3 − x) ≠ 0. ln je 0 iba z jednotky: 3 − x ≠ 1 → x ≠ 2.',
        'Prienik: od −2 (patrí) po 3 (nepatrí), s dierou v 2.',
      ],
      result: 'D(f) = ⟨−2, 2) ∪ (2, 3)',
    },
    check: {
      q: 'Podmienky vyšli x ≥ −1 a x < 4. D(f) = ?',
      options: ['⟨−1, 4)', '(−1, 4)', '⟨−1, 4⟩', '(−∞, 4)'],
      explain: 'Obe naraz: −1 ≤ x < 4. −1 patrí (≥), 4 nie (<): ⟨−1, 4).',
    },
  },
  {
    title: 'Odmocnina v menovateli',
    text: 'Odmocnina chce ≥ 0, menovateľ chce ≠ 0. Dohromady vyjde ostrá nerovnosť > 0 a krajný bod nepatrí.',
    fig: 'os|(3, ∞)',
    worked: {
      q: 'g(x) = 1 / √(x − 3)',
      steps: ['Odmocnina: x − 3 ≥ 0 → x ≥ 3.', 'Menovateľ: √(x − 3) ≠ 0 → x − 3 ≠ 0 → x ≠ 3.', 'Spolu: x > 3, bod 3 vypadol.'],
      result: 'D(g) = (3, ∞)',
    },
    check: {
      q: 'f(x) = 2 / √(x + 1). D(f) = ?',
      options: ['(−1, ∞)', '⟨−1, ∞)', '(1, ∞)', 'ℝ ∖ {−1}'],
      explain: 'x + 1 ≥ 0 a zároveň x + 1 ≠ 0 → x + 1 > 0 → x > −1: (−1, ∞).',
    },
  },
  {
    title: 'Kvadrát pod odmocninou',
    text: 'Pri x² si pomôž absolútnou hodnotou: x² ≥ 4 je to isté ako |x| ≥ 2. Vyjdú DVA kusy osi (ďaleko od nuly), spojíš ich ∪. Pri x² ≤ 4 vyjde jeden kus okolo nuly.',
    fig: 'os|(−∞, −2⟩ ∪ ⟨2, ∞)',
    worked: {
      q: 'f(x) = √(x² − 4)',
      steps: ['Pod odmocninou ≥ 0: x² − 4 ≥ 0.', 'x² ≥ 4 → |x| ≥ 2.', 'Teda x ≤ −2 alebo x ≥ 2. Kraje patria (√0 = 0).', 'Pozor, NIE x ≥ ±2. Kontrola: x = 0 dá √(−4), nedá sa ✓; x = 3 dá √5 ✓.'],
      result: 'D(f) = (−∞, −2⟩ ∪ ⟨2, ∞)',
    },
    check: {
      q: 'f(x) = ln(9 − x²). D(f) = ?',
      options: ['(−3, 3)', '⟨−3, 3⟩', '(−∞, −3) ∪ (3, ∞)', '(3, ∞)'],
      explain: '9 − x² > 0 → x² < 9 → |x| < 3 → −3 < x < 3. Ostro (logaritmus): (−3, 3).',
    },
  },
  {
    title: 'Tabuľka znamienok',
    text: 'Keď je pod odmocninou alebo v logaritme ZLOMOK, nestačí riešiť čitateľ a menovateľ zvlášť. Použi tabuľku znamienok:\n\n1. Nájdi nulové body čitateľa a menovateľa. 2. Nakresli ich na os, rozdelia ju na kúsky. 3. Z každého kúska dosaď jedno číslo a zisti znamienko zlomku. 4. Vyber kúsky so správnym znamienkom.',
    fig: 'zn|−1; 1|+; −; +',
    worked: {
      q: 'f(x) = √((x + 1) / (x − 1))',
      steps: [
        'Podmienka: (x + 1)/(x − 1) ≥ 0 a menovateľ x − 1 ≠ 0.',
        'Nulové body: čitateľ x = −1, menovateľ x = 1.',
        'x = −2: (−1)/(−3) = 1/3 > 0 → kúsok (−∞, −1) je +.',
        'x = 0: 1/(−1) = −1 < 0 → kúsok (−1, 1) je −.',
        'x = 2: 3/1 = 3 > 0 → kúsok (1, ∞) je +.',
        'Berieš plusové kúsky. −1 patrí (zlomok = 0, √0 = 0), 1 nepatrí (delenie nulou).',
      ],
      result: 'D(f) = (−∞, −1⟩ ∪ (1, ∞)',
    },
    check: {
      q: 'f(x) = ln((x − 3) / (x + 2)). D(f) = ?',
      options: ['(−∞, −2) ∪ (3, ∞)', '(−2, 3)', '(−∞, −2⟩ ∪ ⟨3, ∞)', '(3, ∞)'],
      explain: 'Nulové body −2 a 3. Znamienka: (−∞, −2) +, (−2, 3) −, (3, ∞) +. Logaritmus chce > 0, kraje nepatria: (−∞, −2) ∪ (3, ∞).',
    },
  },
  {
    title: 'Logaritmus zlomku s odmocninou',
    text: 'Odmocnina v menovateli je vždy kladná (keď existuje). Preto o znamienku zlomku rozhoduje iba čitateľ.',
    fig: 'os|(2, ∞)',
    worked: {
      q: 'f(x) = ln((x − 2) / √(x + 4))',
      steps: [
        'Odmocnina v menovateli: x + 4 > 0 → x > −4.',
        'Logaritmus: (x − 2)/√(x + 4) > 0. Menovateľ je kladný, takže stačí x − 2 > 0 → x > 2.',
        'Prienik x > −4 a x > 2: platí to prísnejšie, x > 2.',
        'Kontrola: x = 0 dá ln(−2/2) = ln(−1), nedá sa ✓; x = 5 dá ln(3/3) = ln 1 = 0 ✓.',
      ],
      result: 'D(f) = (2, ∞)',
    },
  },
  {
    title: 'Postup na písomku',
    text: 'Každý príklad rieš rovnako. Na konci vždy dosaď jedno číslo zvnútra a jedno zvonka a over, či to sedí.',
    bullets: [
      '1. Nájdi všetky nebezpečné miesta (zlomok, √, ln, tg, arcsin).',
      '2. Ku každému napíš podmienku (≠ 0, ≥ 0, > 0, …).',
      '3. Každú podmienku vyrieš zvlášť (pri zlomku tabuľka znamienok).',
      '4. Nakresli všetko na jednu os a urob prienik.',
      '5. Zapíš intervalom: ⟨ ⟩ patrí, ( ) nepatrí, ∪ spája kusy.',
      '6. Skúška dosadením jedného čísla.',
    ],
  },
];

/** Časť 3: príklady z prednášky doc. Minarechovej (Funkcie, základné vlastnosti, slajdy 30 a 31). */
export const DF_LECTURE: Step[] = [
  {
    title: 'Prednáška 1: nepárna odmocnina',
    text: 'Tretia (a každá nepárna) odmocnina sa dá vypočítať aj zo záporného čísla, ∛(−8) = −2. Preto NEMÁ podmienku. Ostane len to, čo je vo vnútri.',
    fig: 'os|(0, ∞)',
    worked: {
      q: 'f(x) = ∛(2 − ln x)',
      steps: ['∛ nemá podmienku, ignoruj ju.', 'Vo vnútri je ln x: argument > 0 → x > 0.', 'Iné nebezpečné miesto tam nie je.'],
      result: 'D(f) = (0, ∞)',
    },
  },
  {
    title: 'Prednáška 2: logaritmus a kosínus',
    text: 'Podmienka pre logaritmus môže viesť na goniometrickú nerovnicu. Pomôže jednotková kružnica: kde je cos x väčší ako dané číslo.',
    fig: 'os|(−π/6, π/6)',
    worked: {
      q: 'g(x) = ln(2·cos x − √3)',
      steps: [
        'Argument > 0: 2·cos x − √3 > 0 → cos x > √3/2.',
        'cos x = √3/2 v bodoch ±π/6. Väčší je medzi nimi, napravo na kružnici: −π/6 < x < π/6.',
        'Kosínus má periódu 2π, takže sa to opakuje: (−π/6 + 2kπ, π/6 + 2kπ).',
        'Kontrola: x = 0 dá ln(2 − √3) ≈ ln 0,27 ✓; x = π/2 dá ln(−√3), nedá sa ✓.',
      ],
      result: 'D(g) = ∪ (−π/6 + 2kπ, π/6 + 2kπ), k ∈ ℤ',
    },
  },
  {
    title: 'Prednáška 3: logaritmus so základom menším ako 1',
    text: 'Pozor na základ! Ak je základ logaritmu medzi 0 a 1 (napríklad 0,5), logaritmus KLESÁ. Keď sa ho zbavuješ, znak nerovnosti sa OTOČÍ.',
    fig: 'os|⟨1/4, ∞)',
    worked: {
      q: 'h(x) = √(2 − log₀,₅ x)',
      steps: [
        'Logaritmus: x > 0.',
        'Odmocnina: 2 − log₀,₅ x ≥ 0 → log₀,₅ x ≤ 2.',
        '2 = log₀,₅ (0,5²) = log₀,₅ (1/4). Teda log₀,₅ x ≤ log₀,₅ (1/4).',
        'Základ 0,5 < 1 → funkcia klesá → znak sa otočí: x ≥ 1/4.',
        'Prienik s x > 0: x ≥ 1/4. Kontrola: x = 1 dá √(2 − 0) ✓; x = 0,2 dá √(2 − 2,32), nedá sa ✓.',
      ],
      result: 'D(h) = ⟨1/4, ∞)',
    },
    check: {
      q: 'f(x) = √(3 − log₂ x). D(f) = ?',
      options: ['(0, 8⟩', '⟨8, ∞)', '(0, 8)', '⟨1/8, ∞)'],
      explain: 'x > 0 a log₂ x ≤ 3 = log₂ 8. Základ 2 > 1, znak sa NEotočí: x ≤ 8. Spolu (0, 8⟩.',
    },
  },
  {
    title: 'Prednáška 4: zlomok pod odmocninou',
    text: 'Rovnaký typ ako v Pauliných poznámkach, len s vymenenými znamienkami. Tabuľka znamienok rozhodne.',
    fig: 'zn|−1; 1|+; −; +',
    worked: {
      q: 'i(x) = √((x − 1) / (x + 1))',
      steps: [
        '(x − 1)/(x + 1) ≥ 0 a x ≠ −1.',
        'Nulové body: 1 (čitateľ), −1 (menovateľ).',
        'x = −2: (−3)/(−1) = 3 → +.  x = 0: (−1)/1 → −.  x = 2: 1/3 → +.',
        'Plusové kúsky. 1 patrí (√0), −1 nie (delenie nulou).',
      ],
      result: 'D(i) = (−∞, −1) ∪ ⟨1, ∞)',
    },
  },
  {
    title: 'Prednáška 5: arcsin',
    text: 'Dvojitá nerovnosť, upravuješ všetky tri strany naraz.',
    fig: 'os|⟨−1, 0⟩',
    worked: {
      q: 'j(x) = arcsin(2x + 1)',
      steps: ['−1 ≤ 2x + 1 ≤ 1.', 'Odčítaj 1: −2 ≤ 2x ≤ 0.', 'Vydeľ 2: −1 ≤ x ≤ 0.'],
      result: 'D(j) = ⟨−1, 0⟩',
    },
  },
  {
    title: 'Prednáška 6: arctg nemá podmienku',
    text: 'arctg (arctan) a arccotg prijmú ľubovoľné číslo. Podmienky robí len to, čo je vnútri.',
    fig: 'os|(−∞, 1) ∪ (3, ∞)',
    worked: {
      q: 'k(x) = arctg(1 / √(x² − 4x + 3))',
      steps: [
        'arctg: bez podmienky.',
        'Odmocnina v menovateli: x² − 4x + 3 > 0.',
        'Rozlož: (x − 1)(x − 3) > 0. Parabola otvorená hore je kladná mimo koreňov.',
        'x < 1 alebo x > 3, kraje nie (ostrá nerovnosť).',
      ],
      result: 'D(k) = (−∞, 1) ∪ (3, ∞)',
    },
  },
  {
    title: 'Z ďalšej prednášky: známe funkcie',
    text: 'Tieto definičné obory si zapamätaj, nemusíš ich odvodzovať.',
    bullets: ['polynóm: D = ℝ', 'racionálna funkcia P/Q: D = ℝ mínus korene menovateľa Q', 'eˣ (exponenciála): D = ℝ', 'ln x, logₐ x: D = (0, ∞)', 'sin, cos, arctg: D = ℝ', '∛x (nepárna odmocnina): D = ℝ'],
  },
];
