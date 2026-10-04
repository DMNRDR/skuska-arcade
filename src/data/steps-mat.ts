import type { Step } from './steps';

// Lekcie krok po kroku pre Matematiku 1 (podľa tematického plánu prednášok).

export const MAT_STEPS: Record<string, Step[]> = {
  'mat:vektory': [
    {
      title: 'Čo je vektor?',
      text: 'Vektor je šípka: má smer a dĺžku. V priestore ho zapíšeme tromi číslami u = (u₁, u₂, u₃), koľko ide v smere x, y a z. Vektory sčítavame po zložkách, ako keby sme šípky priložili za seba.',
      analogy: 'Navigácia: „choď 3 km na východ a 1 km na sever“ je vektor (3, 1).',
      fig: 'vecadd',
      formula: {
        f: 'u + v = (u₁ + v₁, u₂ + v₂, u₃ + v₃)     |u| = √(u₁² + u₂² + u₃²)',
        what: 'Súčet a dĺžka vektora',
        vars: [['u₁, u₂, u₃', 'zložky vektora (súradnice)'], ['|u|', 'dĺžka (veľkosť) vektora, Pytagorova veta v 3D']],
      },
      worked: {
        q: 'Aká je dĺžka vektora u = (2, 3, 6)?',
        steps: ['Umocni zložky: 2² = 4, 3² = 9, 6² = 36.', 'Sčítaj: 4 + 9 + 36 = 49.', 'Odmocni: √49.'],
        result: '|u| = 7.',
      },
    },
    {
      title: 'Skalárny súčin: sú kolmé?',
      text: 'Skalárny súčin dvoch vektorov je ČÍSLO. Vynásob zodpovedajúce zložky a sčítaj. Ak vyjde 0, vektory sú na seba kolmé. Ak je kladný, zvierajú ostrý uhol, ak záporný, tupý. Vyskúšaj na obrázku.',
      fig: 'mat:vektory',
      formula: {
        f: 'u · v = u₁v₁ + u₂v₂ + u₃v₃ = |u|·|v|·cos φ',
        what: 'Skalárny súčin',
        vars: [['φ', 'uhol medzi vektormi'], ['cos φ = u·v / (|u|·|v|)', 'takto vypočítaš uhol']],
      },
      worked: {
        q: 'u = (1, 2, 3), v = (4, −1, 0). Sú kolmé?',
        steps: ['u·v = 1·4 + 2·(−1) + 3·0.', '= 4 − 2 + 0 = 2.', '2 ≠ 0.'],
        result: 'Nie sú kolmé, zvierajú ostrý uhol (súčin je kladný).',
      },
    },
    {
      title: 'Vektorový súčin: kolmá šípka',
      text: 'Vektorový súčin u × v je VEKTOR, ktorý je kolmý na u aj na v. Jeho dĺžka je obsah rovnobežníka, ktorý u a v napínajú. Poradie je dôležité: v × u ukazuje presne opačne.',
      fig: 'cross3d',
      formula: {
        f: 'u × v = (u₂v₃ − u₃v₂,  u₃v₁ − u₁v₃,  u₁v₂ − u₂v₁)',
        what: 'Vektorový súčin',
        vars: [
          ['1. zložka', 'zakry 1. stĺpec: u₂v₃ − u₃v₂'],
          ['2. zložka', 'zakry 2. stĺpec, POZOR na znamienko: u₃v₁ − u₁v₃'],
          ['3. zložka', 'zakry 3. stĺpec: u₁v₂ − u₂v₁'],
          ['|u × v|', 'obsah rovnobežníka; trojuholník má polovicu'],
        ],
      },
      worked: {
        q: 'u = (1, 0, 0), v = (0, 1, 0). u × v = ?',
        steps: ['1. zložka: 0·0 − 0·1 = 0.', '2. zložka: 0·0 − 1·0 = 0.', '3. zložka: 1·1 − 0·0 = 1.'],
        result: 'u × v = (0, 0, 1), teda os z. Platí i × j = k.',
      },
    },
    {
      title: 'Zmiešaný súčin: objem',
      text: 'Zmiešaný súčin troch vektorov je číslo: najprv u × v, potom skalárne s w. Jeho absolútna hodnota je objem rovnobežnostena. Ak vyjde 0, všetky tri vektory ležia v jednej rovine.',
      fig: 'box',
      formula: {
        f: '[u, v, w] = (u × v) · w     V_štvorsten = ⅙ · |[u, v, w]|',
        what: 'Zmiešaný súčin',
        vars: [['[u, v, w]', 'dá sa počítať aj ako determinant 3×3 z u, v, w'], ['= 0', 'vektory sú komplanárne (lineárne závislé)']],
      },
    },
  ],

  'mat:geometria': [
    {
      title: 'Rovnica priamky',
      text: 'Priamku určíš bodom A a smerom s. Každý bod priamky dostaneš, keď od A prejdeš t-násobok vektora s. Parameter t je ľubovoľné číslo.',
      fig: 'lineparam',
      formula: {
        f: 'X = A + t · s',
        what: 'Parametrická rovnica priamky',
        vars: [['A', 'jeden bod priamky'], ['s', 'smerový vektor'], ['t', 'parameter, ľubovoľné reálne číslo']],
      },
      worked: {
        q: 'Priamka cez A = [1, 2, 0] so smerom s = (2, −1, 3). Aký bod dostaneš pre t = 2?',
        steps: ['X = A + 2·s.', '2·s = (4, −2, 6).', 'X = [1 + 4, 2 − 2, 0 + 6].'],
        result: 'X = [5, 0, 6].',
      },
    },
    {
      title: 'Rovnica roviny',
      text: 'Rovinu najlepšie popíše vektor, ktorý z nej trčí kolmo, normálový vektor n = (a, b, c). Jeho zložky sú priamo čísla pred x, y, z v rovnici.',
      fig: 'mat:geometria',
      formula: {
        f: 'a·x + b·y + c·z + d = 0',
        what: 'Všeobecná rovnica roviny',
        vars: [['(a, b, c)', 'normálový vektor n, kolmý na rovinu'], ['d', 'posun roviny'], ['x, y, z', 'súradnice ľubovoľného bodu roviny']],
      },
      worked: {
        q: 'Rovina má normálu n = (3, −2, 1) a prechádza bodom [1, 1, 1]. Jej rovnica?',
        steps: ['3x − 2y + z + d = 0.', 'Dosaď bod: 3 − 2 + 1 + d = 0.', 'd = −2.'],
        result: '3x − 2y + z − 2 = 0.',
      },
    },
    {
      title: 'Ako ležia dve priamky',
      text: 'V rovine sa priamky buď pretnú, alebo sú rovnobežné. V priestore je ešte tretia možnosť: mimobežky. Nie sú rovnobežné, ale ani sa nestretnú, jedna ide „ponad“ druhú.',
      fig: 'skew',
    },
    {
      title: 'Vzdialenosť bodu od roviny',
      text: 'Dosaď bod do ľavej strany rovnice roviny. Ak by ležal v rovine, vyšla by nula. Čím ďalej je, tým väčšie číslo vyjde. Aby to boli presne metre, vydelíš dĺžkou normály.',
      fig: 'dist',
      formula: {
        f: 'd = |a·x₀ + b·y₀ + c·z₀ + d| / √(a² + b² + c²)',
        what: 'Vzdialenosť bodu P [x₀, y₀, z₀] od roviny',
        vars: [['čitateľ', 'dosadený bod do rovnice roviny, v absolútnej hodnote'], ['menovateľ', 'dĺžka normálového vektora |n|']],
      },
      worked: {
        q: 'Vzdialenosť bodu [1, 2, 3] od roviny 2x − y + 2z − 3 = 0?',
        steps: ['Dosaď: 2·1 − 2 + 2·3 − 3 = 3.', '|3| = 3.', '|n| = √(4 + 1 + 4) = 3.', 'd = 3 / 3.'],
        result: 'd = 1.',
      },
    },
    {
      title: 'Uhly',
      text: 'Uhol dvoch rovín = uhol ich normál. Uhol priamky s rovinou počítame cez sínus, lebo normála je k rovine kolmá (90° − uhol).',
      formula: {
        f: 'roviny: cos φ = |n₁·n₂| / (|n₁|·|n₂|)     priamka–rovina: sin φ = |s·n| / (|s|·|n|)',
        what: 'Uhly v priestore',
        vars: [['n₁, n₂', 'normály rovín'], ['s', 'smerový vektor priamky'], ['| |', 'absolútna hodnota, aby vyšiel ostrý uhol']],
      },
    },
  ],

  'mat:matice': [
    {
      title: 'Čo je matica?',
      text: 'Matica je tabuľka čísel s riadkami a stĺpcami. Rozmer 2×3 znamená 2 riadky a 3 stĺpce. Prvok a₂₃ je v 2. riadku a 3. stĺpci. Matice sčítavame prvok po prvku.',
      analogy: 'Excel tabuľka: riadky sú študenti, stĺpce predmety, čísla sú známky.',
    },
    {
      title: 'Násobenie matíc',
      text: 'Toto je najdôležitejšie. Prvok výsledku na mieste (i, j) dostaneš tak, že i-ty RIADOK prvej matice „prenásobíš“ s j-tym STĹPCOM druhej (ako skalárny súčin). Sleduj animáciu.',
      fig: 'mat:matice',
      formula: {
        f: '(A·B)ᵢⱼ = aᵢ₁·b₁ⱼ + aᵢ₂·b₂ⱼ + …',
        what: 'Riadok krát stĺpec',
        vars: [
          ['(m×n)·(n×p)', 'stĺpcov prvej musí byť toľko ako riadkov druhej'],
          ['výsledok', 'má rozmer m×p'],
          ['A·B ≠ B·A', 'poradie sa NESMIE meniť'],
        ],
      },
      worked: {
        q: '[[1, 2], [3, 4]] · [[5, 6], [7, 8]] = ?',
        steps: ['(1,1): 1·5 + 2·7 = 19.', '(1,2): 1·6 + 2·8 = 22.', '(2,1): 3·5 + 4·7 = 43.', '(2,2): 3·6 + 4·8 = 50.'],
        result: '[[19, 22], [43, 50]].',
      },
    },
    {
      title: 'Gaussova eliminácia',
      text: 'Maticu upravujeme na „schodíky“ (stupňovitý tvar): pod diagonálou chceme samé nuly. Smieš: vymeniť dva riadky, vynásobiť riadok nenulovým číslom, pripočítať k riadku násobok iného riadku.',
      fig: 'gauss',
    },
    {
      title: 'Hodnosť',
      text: 'Hodnosť h(A) je počet nenulových riadkov po Gaussovej eliminácii. Hovorí, koľko riadkov je naozaj „rôznych“ (lineárne nezávislých). Ak je riadok násobkom iného, po úprave z neho zostanú nuly.',
      worked: {
        q: 'Hodnosť [[1, 2], [2, 4]]?',
        steps: ['R₂ − 2·R₁ = [2 − 2, 4 − 4] = [0, 0].', 'Zostal 1 nenulový riadok.'],
        result: 'h = 1. Matica je singulárna (det = 0).',
      },
    },
    {
      title: 'Regulárna a singulárna',
      text: 'Štvorcová matica n×n je regulárna, ak má hodnosť n (det ≠ 0). Potom má inverznú maticu. Singulárna má det = 0 a inverznú nemá.',
      formula: { f: '(A·B)ᵀ = Bᵀ·Aᵀ     A·E = A', what: 'Užitočné pravidlá', vars: [['ᵀ', 'transponovanie: riadky sa stanú stĺpcami'], ['E', 'jednotková matica (1 na diagonále)']] },
    },
  ],

  'mat:determinanty': [
    {
      title: 'Determinant 2×2',
      text: 'Determinant je jedno číslo vypočítané zo štvorcovej matice. Pre 2×2: súčin hlavnej diagonály mínus súčin vedľajšej.',
      fig: 'det2',
      formula: { f: 'det [[a, b], [c, d]] = a·d − b·c', what: 'Determinant 2×2', vars: [['a·d', 'hlavná diagonála (zľava hore doprava dole)'], ['b·c', 'vedľajšia diagonála']] },
    },
    {
      title: 'Čo determinant znamená',
      text: 'Matica premieňa (deformuje) rovinu. Determinant hovorí, koľkokrát sa zväčší plocha. Ak je det = 0, všetko sa sploští do priamky a späť sa to už vrátiť nedá, preto inverzná matica neexistuje. Záporný det znamená, že sa obraz aj prevráti.',
      fig: 'mat:determinanty',
    },
    {
      title: 'Determinant 3×3 (Sarrus)',
      text: 'Opíš prvé dva stĺpce za maticu. Sčítaj súčiny troch uhlopriečok dole doprava, odčítaj súčiny troch uhlopriečok hore doprava.',
      fig: 'sarrus',
      worked: {
        q: 'det [[1, 2, 0], [0, 1, 3], [2, 0, 1]] = ?',
        steps: ['Plusové: 1·1·1 + 2·3·2 + 0·0·0 = 1 + 12 + 0 = 13.', 'Mínusové: 0·1·2 + 1·3·0 + 2·0·1 = 0.', '13 − 0.'],
        result: 'det = 13.',
      },
    },
    {
      title: 'Inverzná matica',
      text: 'Inverzná matica A⁻¹ „odčiní“ maticu A: A·A⁻¹ = E. Existuje len pri det ≠ 0. Pri 2×2 je na to rýchly vzorec. Pri väčších upravuješ [A | E] Gaussom, kým vľavo nevznikne E, vpravo je potom A⁻¹.',
      formula: {
        f: 'A⁻¹ = 1/(ad − bc) · [[d, −b], [−c, a]]',
        what: 'Inverzná matica 2×2',
        vars: [['ad − bc', 'determinant, nesmie byť 0'], ['[[d, −b], [−c, a]]', 'vymeníš a ↔ d, b a c dostanú mínus']],
      },
      worked: {
        q: 'Inverzná k [[2, 1], [5, 3]]?',
        steps: ['det = 2·3 − 1·5 = 1.', 'Vymeň diagonálu a otoč znamienka: [[3, −1], [−5, 2]].', 'Vydeľ det = 1.'],
        result: 'A⁻¹ = [[3, −1], [−5, 2]]. Skúška: A·A⁻¹ = E.',
      },
    },
    {
      title: 'Sústavy rovníc',
      text: 'Každá rovnica s dvoma neznámymi je priamka. Riešenie sústavy je ich priesečník. Môže byť jeden, žiadny (rovnobežky) alebo nekonečne veľa (tá istá priamka). Rozhodne o tom Frobeniova veta.',
      fig: 'lines2',
      formula: {
        f: 'riešiteľná ⇔ h(A) = h(A|b)     xᵢ = det Aᵢ / det A',
        what: 'Frobeniova veta a Cramerovo pravidlo',
        vars: [
          ['h(A)', 'hodnosť matice sústavy'],
          ['h(A|b)', 'hodnosť rozšírenej matice (s pravou stranou)'],
          ['h = n', 'jedno riešenie (n = počet neznámych)'],
          ['h < n', 'nekonečne veľa, n − h parametrov'],
          ['Aᵢ', 'matica A, kde i-ty stĺpec nahradíš pravou stranou b'],
        ],
      },
      worked: {
        q: 'Cramer: 2x + y = 5, x − y = 1.',
        steps: ['det A = 2·(−1) − 1·1 = −3.', 'det A₁ (stĺpec x → [5, 1]): 5·(−1) − 1·1 = −6.', 'det A₂ (stĺpec y → [5, 1]): 2·1 − 5·1 = −3.', 'x = −6/−3, y = −3/−3.'],
        result: 'x = 2, y = 1.',
      },
    },
    {
      title: 'Vlastné čísla a vektory',
      text: 'Väčšinu vektorov matica otočí. Niektoré však len natiahne alebo skráti v tom istom smere. To sú vlastné vektory a koeficient natiahnutia je vlastné číslo λ.',
      fig: 'eigen',
      formula: {
        f: 'A·v = λ·v     det(A − λ·E) = 0',
        what: 'Vlastné číslo λ a vlastný vektor v',
        vars: [['λ', 'vlastné číslo („lambda“)'], ['v', 'vlastný vektor, nesmie byť nulový'], ['det(A − λE) = 0', 'charakteristická rovnica, z nej vypočítaš λ']],
      },
      worked: {
        q: 'Vlastné čísla [[2, 1], [1, 2]]?',
        steps: ['A − λE = [[2 − λ, 1], [1, 2 − λ]].', 'det = (2 − λ)² − 1 = 0.', '(2 − λ)² = 1 → 2 − λ = ±1.'],
        result: 'λ₁ = 1, λ₂ = 3.',
      },
    },
  ],

  'mat:funkcie': [
    {
      title: 'Čo je funkcia?',
      text: 'Funkcia je pravidlo: každému x priradí PRÁVE JEDNO y. Definičný obor D sú všetky x, ktoré môžeš dosadiť. Obor hodnôt H sú všetky y, ktoré môžu vyjsť.',
      fig: 'machine',
      formula: {
        f: 'D: menovateľ ≠ 0,  √(…) ≥ 0,  ln(…) > 0',
        what: 'Ako hľadať definičný obor',
        vars: [['zlomok', 'nesmieš deliť nulou'], ['odmocnina', 'pod ňou nesmie byť záporné číslo'], ['logaritmus', 'len kladné číslo']],
      },
      worked: {
        q: 'Definičný obor f(x) = √(4 − x²)?',
        steps: ['Pod odmocninou musí byť ≥ 0: 4 − x² ≥ 0.', 'x² ≤ 4.', '−2 ≤ x ≤ 2.'],
        result: 'D = ⟨−2, 2⟩.',
      },
    },
    {
      title: 'Párna a nepárna',
      text: 'Párna funkcia je zrkadlová podľa osi y: f(−x) = f(x). Nepárna je súmerná podľa počiatku: f(−x) = −f(x). Väčšina funkcií nie je ani jedna.',
      fig: 'parity',
    },
    {
      title: 'Základné funkcie',
      text: 'Toto sú stavebné kocky, z ktorých sa skladá všetko ostatné. Prezri si ich grafy a zapamätaj si tvar, definičný obor a obor hodnôt.',
      fig: 'mat:funkcie',
    },
    {
      title: 'Inverzná funkcia',
      text: 'Inverzná funkcia robí opak: ak f premení 2 na 7, f⁻¹ premení 7 na 2. Graf dostaneš zrkadlením podľa priamky y = x. Existuje len pre prostú funkciu (rôzne x dajú rôzne y).',
      fig: 'inverse',
      formula: { f: 'e^(ln x) = x     ln(eˣ) = x', what: 'eˣ a ln x sú navzájom inverzné', vars: [['ln(a·b)', '= ln a + ln b']] },
    },
  ],

  'mat:limity': [
    {
      title: 'Čo je limita?',
      text: 'Limita hovorí, ku ktorému číslu sa hodnota funkcie blíži, keď sa x blíži k nejakému bodu. Funkcia tam ani nemusí byť definovaná. Sleduj, ako sa body na obrázku blížia k 1.',
      fig: 'mat:limity',
      formula: { f: 'lim (x→0) sin x / x = 1', what: 'Dôležitá limita', vars: [['lim (x→a)', '„limita, keď x ide k a“']] },
    },
    {
      title: 'Krátenie pri 0/0',
      text: 'Ak po dosadení vyjde 0/0, nie je to koniec. Rozlož čitateľ aj menovateľ a vykráť spoločný činiteľ.',
      worked: {
        q: 'lim (x→1) (x² − 1)/(x − 1)?',
        steps: ['Dosadenie: 0/0, treba upraviť.', 'x² − 1 = (x − 1)(x + 1).', 'Vykráť (x − 1): zostane x + 1.', 'Dosaď x = 1: 1 + 1.'],
        result: 'Limita = 2.',
      },
    },
    {
      title: 'Limita v nekonečne',
      text: 'Pri podiele polynómov a x → ∞ rozhoduje len najvyššia mocnina. Rovnaký stupeň: podiel koeficientov. Vyšší hore: ∞. Vyšší dole: 0.',
      fig: 'mat:limity@inf',
      worked: {
        q: 'lim (x→∞) (3x² + 1)/(x² − 5)?',
        steps: ['Vydeľ čitateľ aj menovateľ x²: (3 + 1/x²)/(1 − 5/x²).', '1/x² → 0.', '(3 + 0)/(1 − 0).'],
        result: 'Limita = 3.',
      },
    },
    {
      title: 'Asymptoty',
      text: 'Asymptota je priamka, ku ktorej sa graf donekonečna približuje. Vertikálna (x = a) je tam, kde funkcia uteká do nekonečna, napríklad nula v menovateli. Vodorovná (y = b) je limita v ±∞.',
      fig: 'mat:limity@asym',
      formula: {
        f: 'šikmá: y = kx + q,  k = lim f(x)/x,  q = lim (f(x) − kx)',
        what: 'Šikmá asymptota',
        vars: [['k', 'smernica; ak k = 0, je to vodorovná asymptota']],
      },
    },
    {
      title: 'Spojitosť',
      text: 'Funkcia je spojitá, ak ju nakreslíš bez zdvihnutia ceruzky. Presne: limita v bode sa rovná hodnote v bode.',
      fig: 'continuity',
      formula: { f: 'lim (x→a) f(x) = f(a)', what: 'Spojitosť v bode a' },
    },
  ],

  'mat:derivacie': [
    {
      title: 'Čo je derivácia?',
      text: 'Derivácia f′(x) je sklon (smernica) dotyčnice ku grafu v bode x. Hovorí, ako rýchlo sa funkcia mení. Kladná: rastie. Záporná: klesá. Nulová: vrchol alebo dno. Sleduj žltú dotyčnicu.',
      analogy: 'Tachometer v aute: vzdialenosť je funkcia, rýchlosť je jej derivácia.',
      fig: 'mat:derivacie',
    },
    {
      title: 'Základné derivácie',
      text: 'Tieto sa treba naučiť naspamäť ako malú násobilku. Pri mocnine: exponent zíde dole a zníži sa o 1.',
      formula: {
        f: '(xⁿ)′ = n·xⁿ⁻¹',
        what: 'Tabuľka derivácií',
        vars: [
          ['(c)′', '= 0, konštanta sa nemení'],
          ['(x³)′', '= 3x²'],
          ['(sin x)′', '= cos x'],
          ['(cos x)′', '= −sin x'],
          ['(eˣ)′', '= eˣ'],
          ['(ln x)′', '= 1/x'],
          ['(tg x)′', '= 1/cos² x'],
          ['(arctg x)′', '= 1/(1 + x²)'],
        ],
      },
    },
    {
      title: 'Súčin a podiel',
      text: 'Súčin dvoch funkcií NEderivuješ ako súčin derivácií. Musíš použiť pravidlá.',
      formula: {
        f: '(u·v)′ = u′·v + u·v′     (u/v)′ = (u′·v − u·v′) / v²',
        what: 'Pravidlá pre súčin a podiel',
        vars: [['u, v', 'dve funkcie'], ['u′, v′', 'ich derivácie']],
      },
      worked: {
        q: '(x²·sin x)′ = ?',
        steps: ['u = x², v = sin x.', "u′ = 2x, v′ = cos x.", "u′v + uv′ = 2x·sin x + x²·cos x."],
        result: '(x²·sin x)′ = 2x·sin x + x²·cos x.',
      },
    },
    {
      title: 'Zložená funkcia (reťazové pravidlo)',
      text: 'Keď je jedna funkcia vnorená v druhej, derivuješ zvonka dnu: derivácia vonkajšej (vnútro necháš) KRÁT derivácia vnútornej. Toto je najčastejšia chyba na skúške.',
      fig: 'chain',
      formula: { f: '[f(g(x))]′ = f′(g(x)) · g′(x)', what: 'Derivácia zloženej funkcie', vars: [['f', 'vonkajšia funkcia'], ['g', 'vnútorná funkcia']] },
      worked: {
        q: '(ln(x² + 1))′ = ?',
        steps: ['Vonkajšia ln, vnútorná x² + 1.', 'Derivácia ln: 1/(vnútro) = 1/(x² + 1).', 'Derivácia vnútra: 2x.', 'Vynásob.'],
        result: '2x / (x² + 1).',
      },
    },
    {
      title: 'Dotyčnica',
      text: 'Dotyčnica sa grafu dotýka v bode x₀ a má sklon f′(x₀). Normála je na ňu kolmá, má sklon −1/f′(x₀).',
      formula: { f: 'y − f(x₀) = f′(x₀) · (x − x₀)', what: 'Rovnica dotyčnice', vars: [['x₀', 'bod dotyku'], ['f′(x₀)', 'smernica dotyčnice']] },
      worked: {
        q: 'Dotyčnica k f(x) = x² v bode x₀ = 1?',
        steps: ['f(1) = 1.', "f′(x) = 2x → f′(1) = 2.", 'y − 1 = 2·(x − 1).'],
        result: 'y = 2x − 1.',
      },
    },
    {
      title: 'L’Hospital a Taylor',
      text: 'L’Hospitalovo pravidlo: pri limite typu 0/0 alebo ∞/∞ môžeš zderivovať zvlášť čitateľ a menovateľ. Taylorov polynóm nahradí zložitú funkciu jednoduchým polynómom v okolí bodu, kalkulačky tak počítajú sínus.',
      fig: 'taylor',
      formula: {
        f: 'lim f/g = lim f′/g′     eˣ ≈ 1 + x + x²/2! + x³/3!',
        what: 'L’Hospital a Maclaurinov rozvoj',
        vars: [['n!', 'faktoriál: 3! = 1·2·3 = 6'], ['podmienka', 'L’Hospital LEN pre 0/0 alebo ∞/∞']],
      },
      worked: {
        q: 'lim (x→0) (eˣ − 1)/x?',
        steps: ['Dosadenie: (1 − 1)/0 = 0/0.', 'Derivuj čitateľ: eˣ. Derivuj menovateľ: 1.', 'lim eˣ/1 pri x → 0 = e⁰.'],
        result: 'Limita = 1.',
      },
    },
  ],

  'mat:priebeh': [
    {
      title: 'Rastie alebo klesá?',
      text: 'Kde je derivácia kladná, funkcia rastie. Kde je záporná, klesá. Stačí teda nájsť, kde je f′ = 0, a zistiť znamienka medzi týmito bodmi.',
      fig: 'mat:priebeh',
    },
    {
      title: 'Extrémy (vrcholy a doliny)',
      text: 'Na vrchole aj v doline je dotyčnica vodorovná, teda f′(x) = 0. Takému bodu hovoríme stacionárny. Či je to max alebo min, zistíš druhou deriváciou.',
      fig: 'extrema',
      formula: {
        f: "f′(x₀) = 0  a  f′′(x₀) < 0 → max,  f′′(x₀) > 0 → min",
        what: 'Postačujúca podmienka extrému',
        vars: [["f′′", 'druhá derivácia = derivácia derivácie']],
      },
      worked: {
        q: 'Extrémy f(x) = x³ − 3x?',
        steps: ["f′(x) = 3x² − 3.", '3x² − 3 = 0 → x² = 1 → x = ±1.', "f′′(x) = 6x.", "f′′(−1) = −6 < 0 → maximum, f(−1) = 2.", "f′′(1) = 6 > 0 → minimum, f(1) = −2."],
        result: 'Lokálne max [−1, 2], lokálne min [1, −2].',
      },
    },
    {
      title: 'Konvexná a konkávna',
      text: 'Druhá derivácia hovorí o zakrivení. f′′ > 0: graf je ako miska ∪ (konvexná). f′′ < 0: ako kopec ∩ (konkávna). Kde sa zakrivenie mení, je inflexný bod.',
      fig: 'convex',
    },
    {
      title: 'Celý postup na skúške',
      text: '1. Definičný obor. 2. Párnosť, priesečníky s osami. 3. Asymptoty (limity). 4. f′: monotónnosť a extrémy. 5. f′′: konvexnosť a inflexné body. 6. Tabuľka a náčrt grafu. Pozor: x³ má v 0 stacionárny bod, ale nie extrém, lebo f′ tam nemení znamienko.',
    },
  ],

  'mat:integraly': [
    {
      title: 'Integrál je opak derivácie',
      text: 'Pri derivovaní zo funkcie F dostaneš f. Pri integrovaní hľadáš naopak takú F, ktorej derivácia je f. Takú F voláme primitívna funkcia. Konštanta pri derivovaní zmizne, preto vždy pripíš + C.',
      fig: 'antideriv',
      formula: { f: '∫ f(x) dx = F(x) + C,  kde F′(x) = f(x)', what: 'Neurčitý integrál', vars: [['∫ … dx', 'znak integrálu, dx hovorí, že premenná je x'], ['C', 'ľubovoľná konštanta']] },
    },
    {
      title: 'Plocha pod krivkou',
      text: 'Integrál má aj geometrický význam: je to plocha pod grafom. Rozdelíš ju na tenké obdĺžniky a sčítaš. Čím viac obdĺžnikov, tým presnejšie. Pridaj obdĺžniky na obrázku.',
      fig: 'mat:integraly',
    },
    {
      title: 'Základné integrály',
      text: 'Každý vzorec z tabuľky derivácií prečítaný naopak dá integrál. Pri mocnine: exponent zvýš o 1 a vydeľ novým exponentom.',
      formula: {
        f: '∫ xⁿ dx = xⁿ⁺¹ / (n + 1) + C   (n ≠ −1)',
        what: 'Tabuľka integrálov',
        vars: [
          ['∫ 1/x dx', '= ln|x| + C'],
          ['∫ eˣ dx', '= eˣ + C'],
          ['∫ sin x dx', '= −cos x + C'],
          ['∫ cos x dx', '= sin x + C'],
          ['∫ 1/(1 + x²) dx', '= arctg x + C'],
          ['∫ 1/cos² x dx', '= tg x + C'],
        ],
      },
      worked: {
        q: '∫ (6x² + 4x) dx = ?',
        steps: ['Integruj každý člen zvlášť.', '∫ 6x² dx = 6·x³/3 = 2x³.', '∫ 4x dx = 4·x²/2 = 2x².', 'Pripíš konštantu.'],
        result: '2x³ + 2x² + C. Skúška deriváciou: 6x² + 4x ✓',
      },
    },
    {
      title: 'Substitúcia',
      text: 'Ak v integrále vidíš vnútornú funkciu a zároveň jej deriváciu, nahraď vnútro novou premennou t. Je to reťazové pravidlo odzadu.',
      formula: { f: 't = g(x),  dt = g′(x) dx', what: 'Substitučná metóda', vars: [['t', 'nová premenná, „vnútro“'], ['dt', 'diferenciál, nahradí g′(x) dx']] },
      worked: {
        q: '∫ 2x·cos(x²) dx = ?',
        steps: ['Vnútro je x², jeho derivácia 2x tam je!', 't = x², dt = 2x dx.', '∫ cos t dt = sin t + C.', 'Vráť x: t = x².'],
        result: 'sin(x²) + C.',
      },
    },
    {
      title: 'Per partes',
      text: 'Na súčin dvoch rôznych funkcií (napr. x·eˣ). Jednu zderivuješ (u, mala by sa zjednodušiť, napr. x), druhú zintegruješ (v′).',
      formula: { f: '∫ u·v′ dx = u·v − ∫ u′·v dx', what: 'Metóda per partes', vars: [['u', 'tú derivuješ (x, ln x…)'], ["v′", 'tú integruješ (eˣ, sin x…)']] },
      worked: {
        q: '∫ x·eˣ dx = ?',
        steps: ["u = x → u′ = 1.", "v′ = eˣ → v = eˣ.", 'x·eˣ − ∫ 1·eˣ dx.', 'x·eˣ − eˣ + C.'],
        result: '(x − 1)·eˣ + C.',
      },
    },
    {
      title: 'Parciálne zlomky',
      text: 'Zložitý zlomok rozložíš na súčet jednoduchých, z ktorých každý vieš zintegrovať (väčšinou na ln).',
      worked: {
        q: '∫ 1/(x(x + 1)) dx = ?',
        steps: ['1/(x(x + 1)) = A/x + B/(x + 1).', '1 = A(x + 1) + Bx. Pre x = 0: A = 1. Pre x = −1: B = −1.', '∫ (1/x − 1/(x + 1)) dx.'],
        result: 'ln|x| − ln|x + 1| + C.',
      },
    },
  ],
};
