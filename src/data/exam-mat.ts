import type { Formula, Worked } from './steps';

// Príprava na skúšku z Matematiky 1: celé doterajšie učivo (týždne 1 až 6) v šiestich okruhoch.
// Každý okruh: čo musíš vedieť → ťahák (vzorce po symboloch) → pasce → riešený typový príklad → precvičovanie.
// Čísla v riešených príkladoch sú overené výpočtom (sympy). Precvičovanie berie generátory z exam-gen.ts.

export type ExamTopic = {
  id: string;
  no: string;
  title: string;
  /** týždeň a prednáška podľa harmonogramu */
  week: string;
  /** témy Učebne, kde je celý výklad */
  lessons: string[];
  /** témy generátorov na precvičovanie */
  gens: string[];
  know: string[];
  sheet: { title: string; text: string; formula: Formula }[];
  traps: string[];
  worked: { text: string; worked: Worked };
};

export const EXAM_TOPICS: ExamTopic[] = [
  {
    id: 'vektory',
    no: '01',
    title: 'Vektory a súčiny',
    week: '1. týždeň · prednáška 1',
    lessons: ['vektory'],
    gens: ['vektory'],
    know: [
      'vektor z dvoch bodov: koniec mínus začiatok',
      'dĺžka vektora (veľkosť)',
      'skalárny súčin a uhol dvoch vektorov',
      'kolmosť: skalárny súčin je 0',
      'vektorový súčin a obsah trojuholníka',
      'zmiešaný súčin a objem (rovnobežnosten, štvorsten)',
    ],
    sheet: [
      {
        title: 'Vektor z dvoch bodov',
        text: 'Vektor AB ukazuje z bodu A do bodu B. Vždy počítaš KONIEC mínus ZAČIATOK, po zložkách.',
        formula: {
          f: 'AB = B − A = (b₁ − a₁, b₂ − a₂, b₃ − a₃)',
          what: 'súradnice vektora',
          vars: [
            ['AB', 'vektor so začiatkom v A a koncom v B'],
            ['A = [a₁, a₂, a₃]', 'začiatočný bod (hranaté zátvorky = bod)'],
            ['B = [b₁, b₂, b₃]', 'koncový bod'],
            ['b₁ − a₁', 'prvá zložka: rozdiel x-ových súradníc'],
          ],
        },
      },
      {
        title: 'Dĺžka vektora',
        text: 'Dĺžka je Pytagorova veta v priestore: druhá mocnina každej zložky, sčítať, odmocniť.',
        formula: {
          f: '|u| = √(u₁² + u₂² + u₃²)',
          what: 'veľkosť vektora',
          vars: [
            ['|u|', 'dĺžka (veľkosť) vektora u, vždy ≥ 0'],
            ['u₁, u₂, u₃', 'zložky vektora u'],
            ['√', 'odmocnina, nezabudni na ňu na konci'],
          ],
        },
      },
      {
        title: 'Skalárny súčin a uhol',
        text: 'Skalárny súčin je ČÍSLO: vynásob zodpovedajúce zložky a sčítaj. Z neho dostaneš uhol, a keď vyjde 0, vektory sú kolmé.',
        formula: {
          f: 'u·v = u₁v₁ + u₂v₂ + u₃v₃     cos φ = u·v / (|u|·|v|)',
          what: 'skalárny súčin a uhol',
          vars: [
            ['u·v', 'skalárny súčin, výsledok je jedno číslo'],
            ['u₁v₁', 'súčin prvých zložiek (x krát x)'],
            ['cos φ', 'kosínus uhla medzi vektormi'],
            ['φ', 'uhol vektorov, od 0° do 180°'],
            ['|u|·|v|', 'súčin dĺžok oboch vektorov'],
          ],
        },
      },
      {
        title: 'Vektorový súčin',
        text: 'Vektorový súčin je VEKTOR kolmý na oba. Jeho dĺžka je obsah rovnobežníka, polovica je obsah trojuholníka.',
        formula: {
          f: 'u × v = (u₂v₃ − u₃v₂,  u₃v₁ − u₁v₃,  u₁v₂ − u₂v₁)     S▵ = ½·|AB × AC|',
          what: 'vektorový súčin a obsah',
          vars: [
            ['u × v', 'vektorový súčin, výsledok je vektor'],
            ['u₂v₃ − u₃v₂', '1. zložka: zakry 1. stĺpec, krížom 2 a 3'],
            ['u₃v₁ − u₁v₃', '2. zložka: pozor, poradie 3 a 1'],
            ['u₁v₂ − u₂v₁', '3. zložka: zakry 3. stĺpec, krížom 1 a 2'],
            ['S▵', 'obsah trojuholníka ABC'],
            ['½', 'polovica rovnobežníka'],
          ],
        },
      },
      {
        title: 'Zmiešaný súčin a objem',
        text: 'Zmiešaný súčin troch vektorov je číslo = determinant z ich zložiek. Jeho absolútna hodnota je objem rovnobežnostena, šestina je objem štvorstena.',
        formula: {
          f: '[u, v, w] = (u × v)·w     V = |[u, v, w]|     V₄ = |[u, v, w]| / 6',
          what: 'zmiešaný súčin a objem',
          vars: [
            ['[u, v, w]', 'zmiešaný súčin = determinant 3×3 s riadkami u, v, w'],
            ['(u × v)·w', 'najprv vektorový súčin, potom skalárne s w'],
            ['V', 'objem rovnobežnostena'],
            ['V₄', 'objem štvorstena (6-krát menší)'],
            ['|…|', 'absolútna hodnota, objem je kladný'],
          ],
        },
      },
    ],
    traps: [
      'u·v je číslo, u × v je vektor. Nepleť si ich.',
      'u × v = −(v × u), poradie mení znamienko.',
      'Druhá zložka vektorového súčinu je u₃v₁ − u₁v₃ (nie u₁v₃ − u₃v₁).',
      'Obsah trojuholníka je ½ dĺžky vektorového súčinu, nie celá dĺžka.',
      'Zmiešaný súčin = 0 → vektory ležia v jednej rovine (komplanárne).',
    ],
    worked: {
      text: 'Typová skúšková úloha: z bodov urči vektory, obsah trojuholníka a objem štvorstena.',
      worked: {
        q: 'Dané sú body A = [1, 0, 2], B = [3, 1, 1], C = [2, 3, 0], D = [1, 1, 4]. Vypočítaj obsah trojuholníka ABC a objem štvorstena ABCD.',
        steps: [
          'Vieme: štyri body. Hľadáme: obsah S trojuholníka a objem V štvorstena. Oboje počítame z vektorov s počiatkom v A.',
          'AB = B − A = (2, 1, −1),  AC = C − A = (1, 3, −2),  AD = D − A = (0, 1, 2).',
          'AB × AC: 1. zložka 1·(−2) − (−1)·3 = −2 + 3 = 1.',
          '2. zložka (−1)·1 − 2·(−2) = −1 + 4 = 3.  3. zložka 2·3 − 1·1 = 6 − 1 = 5.  Teda AB × AC = (1, 3, 5).',
          'Kontrola kolmosti: (1, 3, 5)·AB = 2 + 3 − 5 = 0 ✓ a (1, 3, 5)·AC = 1 + 9 − 10 = 0 ✓.',
          '|AB × AC| = √(1 + 9 + 25) = √35.  S = ½·√35 ≈ 2,96.',
          'Zmiešaný súčin: (AB × AC)·AD = 1·0 + 3·1 + 5·2 = 13.',
          'V = |13| / 6 = 13/6 ≈ 2,17.',
        ],
        result: 'S = ½·√35 ≈ 2,96 j²,  V = 13/6 ≈ 2,17 j³.',
      },
    },
  },
  {
    id: 'geometria',
    no: '02',
    title: 'Priamky a roviny v 3D',
    week: '1. a 2. týždeň · prednáška 2',
    lessons: ['geometria'],
    gens: ['geometria'],
    know: [
      'parametrická rovnica priamky (bod + t·smer)',
      'všeobecná rovnica roviny a normálový vektor',
      'rovina cez tri body (normála = vektorový súčin)',
      'vzájomná poloha: dve priamky, priamka a rovina, dve roviny',
      'uhly: dvoch priamok, dvoch rovín, priamky a roviny',
      'vzdialenosť bodu od roviny, bodu od priamky, mimobežiek',
    ],
    sheet: [
      {
        title: 'Priamka',
        text: 'Priamku určí jeden bod a smer. Každé reálne t dá jeden bod priamky.',
        formula: {
          f: 'p: X = A + t·s     x = a₁ + t·s₁,  y = a₂ + t·s₂,  z = a₃ + t·s₃',
          what: 'parametrická rovnica priamky',
          vars: [
            ['X', 'ľubovoľný bod priamky'],
            ['A', 'pevný bod, ktorým priamka prechádza'],
            ['s', 'smerový vektor (ukazuje, kam priamka ide)'],
            ['t', 'parameter, ľubovoľné reálne číslo'],
          ],
        },
      },
      {
        title: 'Rovina',
        text: 'Rovinu určí bod a normálový vektor, ktorý na ňu stojí kolmo. Koeficienty pri x, y, z SÚ normálový vektor.',
        formula: {
          f: 'ρ: a·x + b·y + c·z + d = 0     n = (a, b, c)',
          what: 'všeobecná rovnica roviny',
          vars: [
            ['n', 'normálový vektor, kolmý na rovinu'],
            ['a, b, c', 'koeficienty pri x, y, z = zložky n'],
            ['d', 'dopočítaš dosadením bodu roviny: d = −(a·x₀ + b·y₀ + c·z₀)'],
          ],
        },
      },
      {
        title: 'Uhly',
        text: 'Uhol vždy rátaš z vektorov a s absolútnou hodnotou, lebo uhol priamok a rovín je od 0° do 90°. Pri priamke a rovine je sínus.',
        formula: {
          f: 'cos α = |s₁·s₂| / (|s₁|·|s₂|)     cos α = |n₁·n₂| / (|n₁|·|n₂|)     sin α = |s·n| / (|s|·|n|)',
          what: 'uhol priamok, rovín, priamky a roviny',
          vars: [
            ['s₁, s₂', 'smerové vektory dvoch priamok'],
            ['n₁, n₂', 'normálové vektory dvoch rovín'],
            ['sin α', 'priamka a rovina: SÍNUS, lebo normála je kolmá na rovinu'],
            ['|…|', 'absolútna hodnota, aby uhol bol ostrý'],
          ],
        },
      },
      {
        title: 'Vzdialenosti',
        text: 'Bod od roviny: dosaď bod do ľavej strany rovnice a vydeľ dĺžkou normály. Mimobežky: objem rovnobežnostena delený obsahom podstavy.',
        formula: {
          f: 'v(P, ρ) = |a·p₁ + b·p₂ + c·p₃ + d| / √(a² + b² + c²)     v(p, q) = |[AB, s₁, s₂]| / |s₁ × s₂|',
          what: 'vzdialenosť bodu od roviny a mimobežiek',
          vars: [
            ['P = [p₁, p₂, p₃]', 'bod, ktorého vzdialenosť hľadáš'],
            ['a·p₁ + … + d', 'bod dosadený do rovnice roviny'],
            ['√(a² + b² + c²)', 'dĺžka normálového vektora |n|'],
            ['[AB, s₁, s₂]', 'zmiešaný súčin: A na p, B na q'],
            ['|s₁ × s₂|', 'dĺžka vektorového súčinu smerov'],
          ],
        },
      },
    ],
    traps: [
      'Dve priamky: najprv porovnaj smery (s₁ × s₂). Rovnobežné smery → rovnobežné alebo totožné. Rôzne smery → zmiešaný súčin [AB, s₁, s₂]: 0 = rôznobežné, inak mimobežné.',
      'Priamka a rovina: s·n = 0 → rovnobežná (alebo leží v rovine), s·n ≠ 0 → pretína.',
      'Pri priamke a rovine je v uhle SÍNUS, nie kosínus.',
      'Normálu roviny cez tri body môžeš vydeliť spoločným deliteľom, rovina sa nezmení.',
      'Na konci dosaď bod do rovnice ako skúšku.',
    ],
    worked: {
      text: 'Typová úloha: priamka a rovina. Poloha, priesečník aj uhol naraz.',
      worked: {
        q: 'Priamka p: X = [1, 2, 0] + t·(1, −1, 2), rovina ρ: 2x + y − z − 3 = 0. Urči ich vzájomnú polohu, priesečník a uhol.',
        steps: [
          'Vieme: s = (1, −1, 2), n = (2, 1, −1). Hľadáme: polohu, priesečník P a uhol α.',
          'Poloha: s·n = 1·2 + (−1)·1 + 2·(−1) = 2 − 1 − 2 = −1 ≠ 0 → priamka rovinu pretína.',
          'Bod priamky: x = 1 + t,  y = 2 − t,  z = 2t. Dosaď do roviny: 2(1 + t) + (2 − t) − 2t − 3 = 0.',
          'Uprav: 2 + 2t + 2 − t − 2t − 3 = 1 − t = 0, teda t = 1.',
          'Priesečník: P = [1 + 1, 2 − 1, 2·1] = [2, 1, 2].  Skúška: 2·2 + 1 − 2 − 3 = 0 ✓',
          'Uhol: |s| = √(1 + 1 + 4) = √6,  |n| = √(4 + 1 + 1) = √6.',
          'sin α = |s·n| / (|s|·|n|) = |−1| / (√6·√6) = 1/6 ≈ 0,1667.',
          'α = arcsin(1/6) ≈ 9,59°.',
        ],
        result: 'Priamka pretína rovinu v bode P = [2, 1, 2] pod uhlom α ≈ 9,59°.',
      },
    },
  },
  {
    id: 'matice',
    no: '03',
    title: 'Matice a hodnosť',
    week: '2. týždeň · prednáška 3',
    lessons: ['matice'],
    gens: ['matice'],
    know: [
      'typ matice m×n (riadky × stĺpce)',
      'sčítanie, násobenie číslom, transponovanie',
      'násobenie matíc: riadok krát stĺpec',
      'kedy sa matice dajú násobiť a že A·B ≠ B·A',
      'elementárne riadkové úpravy a stupňovitý (Gaussov) tvar',
      'hodnosť matice, regulárna a singulárna matica',
    ],
    sheet: [
      {
        title: 'Násobenie matíc',
        text: 'Prvok výsledku na mieste (i, j) dostaneš tak, že i-ty riadok prvej matice skalárne vynásobíš j-tym stĺpcom druhej.',
        formula: {
          f: 'cᵢⱼ = aᵢ₁·b₁ⱼ + aᵢ₂·b₂ⱼ + … + aᵢₙ·bₙⱼ     (m×n)·(n×p) = m×p',
          what: 'súčin A·B',
          vars: [
            ['cᵢⱼ', 'prvok výsledku v i-tom riadku a j-tom stĺpci'],
            ['aᵢ₁ … aᵢₙ', 'i-ty riadok matice A'],
            ['b₁ⱼ … bₙⱼ', 'j-ty stĺpec matice B'],
            ['n', 'stĺpce A musia = riadky B, inak súčin neexistuje'],
            ['m×p', 'výsledok: riadky z A, stĺpce z B'],
          ],
        },
      },
      {
        title: 'Hodnosť',
        text: 'Úpravami dostaneš maticu do stupňovitého tvaru (pod každým „schodom“ nuly). Hodnosť je počet nenulových riadkov.',
        formula: {
          f: 'h(A) = počet nenulových riadkov v stupňovitom tvare     h(A) ≤ min(m, n)',
          what: 'hodnosť matice',
          vars: [
            ['h(A)', 'hodnosť: koľko riadkov je naozaj nezávislých'],
            ['stupňovitý tvar', 'každý riadok začína viac vpravo ako predošlý'],
            ['min(m, n)', 'hodnosť nikdy nepresiahne počet riadkov ani stĺpcov'],
          ],
        },
      },
      {
        title: 'Regulárna matica',
        text: 'Štvorcová matica n×n je regulárna, keď má plnú hodnosť. Vtedy má nenulový determinant aj inverznú maticu.',
        formula: {
          f: 'A regulárna  ⇔  h(A) = n  ⇔  det A ≠ 0  ⇔  existuje A⁻¹',
          what: 'regulárna a singulárna matica',
          vars: [
            ['n', 'rozmer štvorcovej matice'],
            ['det A ≠ 0', 'determinant je nenulový'],
            ['A⁻¹', 'inverzná matica, A·A⁻¹ = E'],
            ['singulárna', 'opak: h(A) < n, det A = 0, inverzná neexistuje'],
          ],
        },
      },
    ],
    traps: [
      'A·B ≠ B·A, na poradí záleží.',
      'Typ 2×3 znamená 2 riadky a 3 stĺpce (najprv riadky).',
      'Povolené úpravy: výmena riadkov, násobenie riadku nenulovým číslom, pripočítanie násobku iného riadku.',
      'Ak je jeden riadok násobkom iného alebo súčtom iných, po úprave vyjde nulový a hodnosť klesne.',
    ],
    worked: {
      text: 'Typová úloha: hodnosť matice Gaussovou elimináciou.',
      worked: {
        q: 'Urči hodnosť matice A s riadkami R1 = (1, 2, −1, 3), R2 = (2, 4, 1, 0), R3 = (3, 6, 0, 3).',
        steps: [
          'Vieme: matica 3×4, hodnosť bude najviac 3. Cieľ: stupňovitý tvar, pod prvou jednotkou nuly.',
          'R2 − 2·R1 = (2 − 2, 4 − 4, 1 + 2, 0 − 6) = (0, 0, 3, −6).',
          'R3 − 3·R1 = (3 − 3, 6 − 6, 0 + 3, 3 − 9) = (0, 0, 3, −6).',
          'Nové R2 a R3 sú rovnaké: R3 − R2 = (0, 0, 0, 0).',
          'Stupňovitý tvar: (1, 2, −1, 3), (0, 0, 3, −6), (0, 0, 0, 0). Nenulové riadky sú dva.',
          'Kontrola: pôvodne R3 = R1 + R2 (1 + 2 = 3, 2 + 4 = 6, −1 + 1 = 0, 3 + 0 = 3) ✓, preto jeden riadok „zmizol“.',
        ],
        result: 'h(A) = 2.',
      },
    },
  },
  {
    id: 'sustavy',
    no: '04',
    title: 'Determinanty, sústavy, vlastné čísla',
    week: '3. a 4. týždeň · prednášky 4 a 5',
    lessons: ['determinanty', 'vlastne'],
    gens: ['determinanty', 'vlastne'],
    know: [
      'determinant 2×2 a 3×3 (Sarrus, rozvoj podľa riadku)',
      'inverzná matica (2×2 vzorcom, 3×3 doplnkami alebo Gauss-Jordanom)',
      'Frobeniova veta: koľko riešení má sústava',
      'Gaussova eliminácia a Cramerovo pravidlo',
      'maticová rovnica A·X = B a X·A = B',
      'vlastné čísla det(A − λE) = 0 a vlastné vektory',
    ],
    sheet: [
      {
        title: 'Determinant',
        text: '2×2: hlavná uhlopriečka mínus vedľajšia. 3×3: Sarrus, tri „plusové“ uhlopriečky mínus tri „mínusové“.',
        formula: {
          f: 'det [[a, b], [c, d]] = a·d − b·c     det 3×3 = aei + bfg + cdh − ceg − afh − bdi',
          what: 'determinant',
          vars: [
            ['a·d', 'hlavná uhlopriečka (zľava hore doprava dole)'],
            ['b·c', 'vedľajšia uhlopriečka, odčíta sa'],
            ['aei, bfg, cdh', 'tri smery doprava dole (Sarrus +)'],
            ['ceg, afh, bdi', 'tri smery doľava dole (Sarrus −)'],
          ],
        },
      },
      {
        title: 'Inverzná matica',
        text: '2×2: vymeň a a d, otoč znamienka b a c, vydeľ determinantom. Väčšie: doplnky alebo Gauss-Jordan [A | E] → [E | A⁻¹].',
        formula: {
          f: 'A⁻¹ = (1/det A)·[[d, −b], [−c, a]]     A⁻¹ = (1/det A)·(A*)ᵀ',
          what: 'inverzná matica',
          vars: [
            ['1/det A', 'celé sa delí determinantom, preto musí byť ≠ 0'],
            ['[[d, −b], [−c, a]]', 'pri 2×2: výmena diagonály a zmena znamienok'],
            ['A*', 'matica algebraických doplnkov Aᵢⱼ = (−1)ⁱ⁺ʲ·Mᵢⱼ'],
            ['ᵀ', 'transponovanie: riadky ↔ stĺpce'],
          ],
        },
      },
      {
        title: 'Frobeniova veta',
        text: 'Porovnaj hodnosť matice sústavy A a rozšírenej matice (A|b). Hneď vieš, či a koľko riešení má sústava.',
        formula: {
          f: 'h(A) ≠ h(A|b) → žiadne     h(A) = h(A|b) = n → jedno     h(A) = h(A|b) < n → ∞ (n − h parametrov)',
          what: 'počet riešení sústavy',
          vars: [
            ['h(A)', 'hodnosť matice koeficientov'],
            ['h(A|b)', 'hodnosť rozšírenej matice (s pravou stranou)'],
            ['n', 'počet neznámych'],
            ['n − h', 'koľko neznámych bude voľných (parametrov)'],
          ],
        },
      },
      {
        title: 'Cramer a maticová rovnica',
        text: 'Cramer: nahraď stĺpec neznámej pravou stranou a vydeľ determinantom. Maticovú rovnicu násob inverznou z tej strany, kde stojí A.',
        formula: {
          f: 'xᵢ = Dᵢ / D     A·X = B → X = A⁻¹·B     X·A = B → X = B·A⁻¹',
          what: 'Cramerovo pravidlo a maticová rovnica',
          vars: [
            ['D', 'determinant matice sústavy, musí byť ≠ 0'],
            ['Dᵢ', 'determinant, kde i-ty stĺpec nahradíš pravou stranou b'],
            ['A⁻¹·B', 'A stojí vľavo od X → násob zľava'],
            ['B·A⁻¹', 'A stojí vpravo od X → násob sprava'],
          ],
        },
      },
      {
        title: 'Vlastné čísla a vektory',
        text: 'Vlastný vektor matica len natiahne, neotočí. Vlastné čísla sú korene charakteristickej rovnice.',
        formula: {
          f: 'A·x = λ·x     det(A − λE) = 0     2×2: λ² − (a + d)·λ + (ad − bc) = 0',
          what: 'vlastné čísla a vektory',
          vars: [
            ['λ', 'vlastné číslo (koľkokrát sa vektor natiahne)'],
            ['x', 'vlastný vektor, nenulový'],
            ['E', 'jednotková matica, λ odčítaš len na diagonále'],
            ['a + d', 'stopa matice (súčet diagonály) = λ₁ + λ₂'],
            ['ad − bc', 'determinant = λ₁·λ₂'],
          ],
        },
      },
    ],
    traps: [
      'det A = 0 → inverzná neexistuje a Cramer sa nedá použiť.',
      'Pri 3×3 inverznej nezabudni na šachovnicu znamienok + − + a na transponovanie.',
      'A·X = B rieš ako X = A⁻¹·B, nie B·A⁻¹ (matice nekomutujú).',
      'Vlastný vektor dostaneš z (A − λE)·x = o, vyjde s parametrom. Ľubovoľný nenulový násobok je tiež vlastný vektor.',
      'Na konci vždy skúška: dosaď riešenie do všetkých rovníc, resp. A·A⁻¹ = E.',
    ],
    worked: {
      text: 'Typová úloha: sústava troch rovníc Gaussovou elimináciou a Frobeniovou vetou.',
      worked: {
        q: 'Vyrieš sústavu  x + y + z = 6,  2x − y + z = 3,  x + 2y − z = 2.',
        steps: [
          'Vieme: 3 rovnice, 3 neznáme. Rozšírená matica (A|b): (1, 1, 1 | 6), (2, −1, 1 | 3), (1, 2, −1 | 2).',
          'R2 − 2·R1 = (0, −3, −1 | −9).  R3 − R1 = (0, 1, −2 | −4).',
          'Vynuluj y v treťom riadku: 3·R3 + R2 = (0, 3 − 3, −6 − 1 | −12 − 9) = (0, 0, −7 | −21).',
          'Stupňovitý tvar má 3 nenulové riadky: h(A) = h(A|b) = 3 = n → práve jedno riešenie (Frobenius).',
          'Spätný chod: −7z = −21 → z = 3.',
          '−3y − z = −9 → −3y − 3 = −9 → y = 2.',
          'x + y + z = 6 → x = 6 − 2 − 3 = 1.',
          'Skúška: 1 + 2 + 3 = 6 ✓,  2 − 2 + 3 = 3 ✓,  1 + 4 − 3 = 2 ✓.  (Cramer: D = 7, rovnaký výsledok.)',
        ],
        result: 'x = 1, y = 2, z = 3.',
      },
    },
  },
  {
    id: 'funkcie',
    no: '05',
    title: 'Funkcie a polynómy',
    week: '4. a 5. týždeň · prednáška 5 a hárok K prednáške 10',
    lessons: ['funkcie', 'polynomy'],
    gens: ['funkcie', 'polynomy'],
    know: [
      'definičný obor D(f): menovateľ, odmocnina, logaritmus',
      'párna a nepárna funkcia',
      'monotónnosť, ohraničenosť, prostá funkcia',
      'inverzná funkcia (vymeň x a y, vyjadri y)',
      'zložená funkcia f(g(x))',
      'polynómy: Hornerova schéma, korene, rozklad, parciálne zlomky',
    ],
    sheet: [
      {
        title: 'Definičný obor',
        text: 'D(f) sú všetky x, pre ktoré sa dá f(x) vypočítať. Pozri sa na každú „nebezpečnú“ časť a napíš podmienku. Na konci urob prienik.',
        formula: {
          f: 'p/q: q ≠ 0     √u: u ≥ 0     ln u, log u: u > 0     tg u: cos u ≠ 0     arcsin u: −1 ≤ u ≤ 1',
          what: 'podmienky pre D(f)',
          vars: [
            ['q ≠ 0', 'menovateľ nesmie byť nula'],
            ['u ≥ 0', 'pod párnou odmocninou nezáporné číslo'],
            ['u > 0', 'logaritmus iba z kladného čísla (ostro!)'],
            ['−1 ≤ u ≤ 1', 'arcsin, arccos iba z tohto intervalu'],
          ],
        },
      },
      {
        title: 'Párna a nepárna',
        text: 'Dosaď −x namiesto x. Ak dostaneš to isté, funkcia je párna. Ak dostaneš všetko s opačným znamienkom, je nepárna.',
        formula: {
          f: 'párna: f(−x) = f(x)     nepárna: f(−x) = −f(x)',
          what: 'párnosť',
          vars: [
            ['f(−x)', 'do funkcie dosadíš −x'],
            ['párna', 'graf súmerný podľa osi y (x², cos x, |x|)'],
            ['nepárna', 'graf súmerný podľa počiatku (x³, sin x, 1/x)'],
            ['D(f)', 'musí byť súmerný okolo nuly, inak ani jedno'],
          ],
        },
      },
      {
        title: 'Inverzná funkcia',
        text: 'Inverzná existuje iba k prostej funkcii. Postup je stále rovnaký: vymeň x a y a vyjadri y.',
        formula: {
          f: 'y = f(x)  →  x = f(y)  →  y = f⁻¹(x)     D(f⁻¹) = H(f),  H(f⁻¹) = D(f)',
          what: 'inverzná funkcia',
          vars: [
            ['f⁻¹', 'inverzná funkcia (nie 1/f!)'],
            ['x = f(y)', 'krok „vymeň x a y“'],
            ['D(f⁻¹) = H(f)', 'definičný obor inverznej je obor hodnôt pôvodnej'],
            ['prostá', 'rôzne x dávajú rôzne y, inak inverzná neexistuje'],
          ],
        },
      },
      {
        title: 'Hornerova schéma',
        text: 'Rýchly výpočet P(c) a delenie (x − c). Prvý koeficient opíšeš, potom stále: krát c a pripočítaj ďalší koeficient.',
        formula: {
          f: 'b₀ = a₀     bₖ = aₖ + c·bₖ₋₁     posledné b = P(c) = zvyšok',
          what: 'Hornerova schéma',
          vars: [
            ['aₖ', 'koeficienty polynómu od najvyššej mocniny, aj nuly'],
            ['c', 'číslo, ktoré dosádzaš (delíš x − c)'],
            ['bₖ', 'čísla v spodnom riadku'],
            ['zvyšok = 0', 'c je koreň, ostatné b sú koeficienty podielu'],
          ],
        },
      },
    ],
    traps: [
      'Pri ln je podmienka OSTRÁ (> 0), pri odmocnine NEOSTRÁ (≥ 0).',
      'Viac podmienok naraz = prienik, nie zjednotenie.',
      'f⁻¹(x) nie je 1/f(x).',
      'V Hornerovi nezabudni na nulové koeficienty chýbajúcich mocnín.',
      'Celočíselné korene hľadaj medzi deliteľmi absolútneho člena.',
      'f(g(x)) ≠ g(f(x)): najprv vnútorná funkcia.',
    ],
    worked: {
      text: 'Typová úloha: definičný obor s odmocninou aj logaritmom v menovateli.',
      worked: {
        q: 'Urči definičný obor funkcie f(x) = √(x + 2) / ln(3 − x).',
        steps: [
          'Vieme: tri nebezpečné miesta: odmocnina, logaritmus a menovateľ. Každé dá jednu podmienku.',
          'Odmocnina: x + 2 ≥ 0 → x ≥ −2.',
          'Logaritmus: 3 − x > 0 → x < 3.',
          'Menovateľ: ln(3 − x) ≠ 0. Logaritmus je 0 iba z jednotky: 3 − x ≠ 1 → x ≠ 2.',
          'Prienik: x ≥ −2 a x < 3 dá ⟨−2, 3). Ešte vyhodíme x = 2.',
          'Kontrola: x = 0 → √2 / ln 3 ≈ 1,29 dá sa ✓.  x = 2 → √4 / ln 1 = 2/0 nedá sa ✓.',
        ],
        result: 'D(f) = ⟨−2, 2) ∪ (2, 3).',
      },
    },
  },
  {
    id: 'limity',
    no: '06',
    title: 'Limity a asymptoty',
    week: '6. týždeň · prednáška 6',
    lessons: ['limity'],
    gens: ['limity'],
    know: [
      'čo je limita a jednostranná limita',
      'spojitosť a druhy nespojitosti',
      'typ 0/0: rozklad a krátenie, rozšírenie odmocniny',
      'limita v nekonečne racionálnej funkcie',
      'dôležité limity: sin x / x a číslo e',
      'asymptoty: zvislá, vodorovná, šikmá',
    ],
    sheet: [
      {
        title: 'Postup pri limite',
        text: 'Vždy najprv DOSAĎ. Ak vyjde číslo, máš hotovo. Ak vyjde 0/0 alebo ∞/∞, výraz uprav. Ak vyjde číslo/0, rátaj jednostranné limity.',
        formula: {
          f: 'c/0 → ±∞     0/0, ∞/∞, ∞ − ∞, 0·∞, 1^∞ → uprav',
          what: 'čo robiť po dosadení',
          vars: [
            ['c/0', 'nenulové číslo delené nulou: limita je +∞ alebo −∞ podľa znamienka'],
            ['0/0', 'rozlož na súčin a vykráť, pri odmocnine rozšír'],
            ['∞/∞', 'vydeľ najvyššou mocninou'],
            ['1^∞', 'nie je 1! Vedie na číslo e'],
          ],
        },
      },
      {
        title: 'Racionálna funkcia v nekonečne',
        text: 'Pri x → ±∞ rozhodujú iba najvyššie mocniny v čitateli a menovateli.',
        formula: {
          f: 'st. čitateľa < st. menovateľa → 0     rovnaké → aₙ/bₙ     väčší → ±∞',
          what: 'limita podielu polynómov v ±∞',
          vars: [
            ['st.', 'stupeň = najvyššia mocnina x'],
            ['aₙ', 'koeficient pri najvyššej mocnine v čitateli'],
            ['bₙ', 'koeficient pri najvyššej mocnine v menovateli'],
          ],
        },
      },
      {
        title: 'Dôležité limity',
        text: 'Tieto dve si zapamätaj, veľa príkladov sa na ne prevedie.',
        formula: {
          f: 'lim (x→0) sin x / x = 1     lim (x→∞) (1 + 1/x)ˣ = e     lim (x→∞) (1 + k/x)ˣ = eᵏ',
          what: 'dôležité limity',
          vars: [
            ['sin x / x', 'v radiánoch, pre malé x je sin x ≈ x'],
            ['e', 'Eulerovo číslo ≈ 2,718'],
            ['k', 'ľubovoľné číslo; sin(kx)/x → k'],
          ],
        },
      },
      {
        title: 'Spojitosť',
        text: 'Funkcia je spojitá v bode a, ak sa limita zľava, limita sprava a hodnota f(a) rovnajú.',
        formula: {
          f: 'lim (x→a⁻) f(x) = lim (x→a⁺) f(x) = f(a)',
          what: 'spojitosť v bode',
          vars: [
            ['x → a⁻', 'zľava (x < a)'],
            ['x → a⁺', 'sprava (x > a)'],
            ['f(a)', 'funkčná hodnota musí existovať'],
          ],
        },
      },
      {
        title: 'Asymptoty',
        text: 'Zvislá je tam, kde funkcia uteká do nekonečna (typicky nulový menovateľ). Šikmá y = kx + q ráta dve limity, vodorovná je jej špeciálny prípad s k = 0.',
        formula: {
          f: 'zvislá x = a: lim (x→a±) f(x) = ±∞     k = lim f(x)/x     q = lim (f(x) − k·x)',
          what: 'asymptoty',
          vars: [
            ['x = a', 'asymptota bez smernice (zvislá)'],
            ['y = kx + q', 'asymptota so smernicou'],
            ['k', 'smernica, lim f(x)/x pre x → ±∞'],
            ['q', 'posun, lim (f(x) − kx)'],
            ['k = 0', 'vodorovná asymptota y = q'],
          ],
        },
      },
    ],
    traps: [
      'Nula v menovateli neznamená vždy asymptotu: ak sa činiteľ vykráti, je tam iba „diera“.',
      'c/0 nie je 0 ani „neurčitý výraz“, je to ±∞.',
      '1^∞ je neurčitý výraz, výsledok nie je 1.',
      'Limita existuje, len keď sa jednostranné limity rovnajú.',
      'Šikmú asymptotu rátaj pre x → +∞ aj x → −∞.',
    ],
    worked: {
      text: 'Typová úloha: limita 0/0 a všetky asymptoty jednej funkcie.',
      worked: {
        q: 'f(x) = (x² − 4) / (x² − 3x + 2). Vypočítaj lim (x→2) f(x) a nájdi asymptoty.',
        steps: [
          'Vieme: racionálna funkcia, menovateľ je 0 pre x = 1 a x = 2. Hľadáme: limitu v 2 a asymptoty.',
          'Rozlož: x² − 4 = (x − 2)(x + 2),  x² − 3x + 2 = (x − 1)(x − 2).',
          'Pre x ≠ 2 vykráť (x − 2): f(x) = (x + 2)/(x − 1).',
          'lim (x→2) f(x) = (2 + 2)/(2 − 1) = 4. V x = 2 je iba „diera“, NIE asymptota.',
          'x → 1⁺: (1 + 2)/(0⁺) = 3/0⁺ = +∞.  x → 1⁻: 3/0⁻ = −∞. Teda x = 1 je zvislá asymptota.',
          'x → ±∞: rovnaké stupne (2 a 2), podiel vedúcich koeficientov 1/1 = 1. Vodorovná asymptota y = 1.',
          'Šikmá: k = lim f(x)/x = 0, takže šikmá je práve tá vodorovná y = 1.',
        ],
        result: 'lim (x→2) f(x) = 4;  asymptoty x = 1 a y = 1.',
      },
    },
  },
];
