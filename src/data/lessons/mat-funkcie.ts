import type { Step } from '../steps';

// Matematika 1, prednáška 5: Reálna funkcia jednej reálnej premennej.
// Pojem funkcie, D(f), H(f), operácie, vlastnosti, elementárne funkcie.

const steps: Step[] = [
  {
    title: 'Čo je funkcia?',
    text: 'Funkcia je pravidlo, ktoré každému povolenému číslu x priradí PRÁVE JEDNO číslo y. Píšeme y = f(x) a čítame „y sa rovná f od x“. Číslo x je vstup (hovoríme mu aj nezávislá premenná alebo argument), číslo y je výstup (funkčná hodnota).\n\nNa obrázku je funkcia ako stroj s pravidlom f(x) = x². Vložíš −2 a vypadne 4, vložíš 3 a vypadne 9. Kľúčové je slovo „práve jedno“: pre jeden vstup stroj nikdy nevyhodí dve rôzne čísla. Naopak to nevadí: dva rôzne vstupy smú dať ten istý výstup, napríklad f(−2) = f(2) = 4.\n\nGraf funkcie sú všetky body [x, f(x)] nakreslené v rovine. Či je nejaká krivka grafom funkcie, zistíš testom zvislou priamkou: každá zvislá priamka ju smie pretnúť najviac raz. Kružnica tento test nesplní, preto nie je grafom funkcie.',
    analogy: 'Automat na nápoje: stlačíš tlačidlo B3 (vstup) a vypadne vždy tá istá plechovka (výstup). Keby z toho istého tlačidla raz vypadla kola a raz voda, automat by nebol spoľahlivý – a v matematike by to nebola funkcia. Že dve rôzne tlačidlá dávajú tú istú kolu, je v poriadku.',
    fig: 'machine',
    formula: {
      f: 'y = f(x)',
      what: 'Zápis funkcie',
      vars: [
        ['x', 'vstup, nezávislá premenná (argument)'],
        ['f', 'meno pravidla, teda funkcie'],
        ['f(x)', 'funkčná hodnota v bode x, výstup'],
        ['[x, f(x)]', 'bod grafu funkcie (súradnice v rovine)'],
      ],
    },
    worked: {
      q: 'Daná je f(x) = x² − 2x. Vypočítaj f(3), f(−1) a f(a + 1).',
      steps: [
        'Vieme: predpis f(x) = x² − 2x. Hľadáme: hodnoty pre rôzne vstupy. Postup: všade, kde je v predpise x, napíšeš vstup V ZÁTVORKE.',
        'f(3) = 3² − 2·3 = 9 − 6 = 3.',
        'f(−1) = (−1)² − 2·(−1) = 1 + 2 = 3. Pozor na zátvorky: (−1)² = +1.',
        'f(a + 1) = (a + 1)² − 2·(a + 1) = a² + 2a + 1 − 2a − 2.',
        'Zjednoduš: a² + 2a + 1 − 2a − 2 = a² − 1.',
        'Kontrola: pre a = 2 má vyjsť f(3) = 3. Naozaj a² − 1 = 4 − 1 = 3 ✓.',
      ],
      result: 'f(3) = 3, f(−1) = 3, f(a + 1) = a² − 1.',
    },
    check: {
      q: 'Ktorá rovnica NEurčuje y ako funkciu premennej x?',
      options: ['x² + y² = 1', 'y = x² + 1', 'y = |x|', 'y = 5'],
      explain: 'Pri x² + y² = 1 (kružnica) dostaneš pre x = 0 dve hodnoty: y = 1 aj y = −1. Funkcia však musí dať práve jednu. Konštanta y = 5 je úplne v poriadku funkcia: každému x priradí to isté číslo 5.',
    },
  },
  {
    title: 'Definičný obor D(f)',
    text: 'Definičný obor D(f) je množina všetkých x, ktoré smieš do funkcie dosadiť. Keď dostaneš iba predpis, napríklad f(x) = √(x − 1), hľadáš najväčšiu množinu x, pre ktoré má predpis zmysel.\n\nV praxi hľadáš „zakázané“ situácie. Hlavné sú tri: delenie nulou, párna odmocnina zo záporného čísla a logaritmus z čísla, ktoré nie je kladné. K nim pribudnú tangens (cos x ≠ 0), kotangens (sin x ≠ 0) a funkcie arcsin, arccos (argument musí byť medzi −1 a 1). Ak je v predpise viac takých miest, musia platiť všetky podmienky naraz.\n\nVýsledok zapíš intervalom. Lomená zátvorka ⟨ ⟩ znamená, že krajný bod do množiny patrí, okrúhla ( ) znamená, že nepatrí. Pri ∞ je zátvorka vždy okrúhla, lebo nekonečno nie je číslo. Znak ∪ (zjednotenie) spája viac kúskov a ℝ∖{1} znamená „všetky reálne čísla okrem 1“.',
    formula: {
      f: 'A / B:  B ≠ 0     √A:  A ≥ 0     ln A, logₐ A:  A > 0     arcsin A, arccos A:  −1 ≤ A ≤ 1',
      what: 'Podmienky pre definičný obor',
      vars: [
        ['B ≠ 0', 'menovateľ zlomku nesmie byť nula'],
        ['A ≥ 0', 'pod párnou odmocninou (√, ⁴√…) nezáporné číslo, nula smie'],
        ['A > 0', 'logaritmus len z kladného čísla, nula NESMIE'],
        ['tg A', 'cos A ≠ 0, teda A ≠ π/2 + k·π (k je celé číslo)'],
        ['∛A', 'nepárna odmocnina ide aj zo záporného čísla, žiadna podmienka'],
      ],
    },
    worked: {
      q: 'Urči definičný obor funkcie f(x) = √(x + 3) / (x − 1).',
      steps: [
        'Vieme: v predpise je odmocnina aj zlomok. Hľadáme: všetky x, pre ktoré má výraz zmysel.',
        'Podmienka odmocniny: x + 3 ≥ 0, teda x ≥ −3.',
        'Podmienka menovateľa: x − 1 ≠ 0, teda x ≠ 1.',
        'Obe podmienky musia platiť naraz (prienik): x ≥ −3 a zároveň x ≠ 1.',
        'Na číselnej osi: od −3 (vrátane) doprava až do nekonečna, ale s „dierou“ v bode 1.',
        'Kontrola: x = −3 dá √0 / (−4) = 0, to ide. x = 1 dá delenie nulou, to nejde. x = −4 dá √(−1), to nejde.',
      ],
      result: 'D(f) = ⟨−3, 1) ∪ (1, ∞).',
    },
    deeper: 'Prečo práve tieto zákazy? Delenie nulou nemá zmysel: 6 / 2 = 3, lebo 3 · 2 = 6, ale 6 / 0 = ? by znamenalo ? · 0 = 6, a také číslo neexistuje.\n\nOdmocnina √a je nezáporné číslo, ktoré umocnené na druhú dá a. Lenže druhá mocnina reálneho čísla nikdy nie je záporná, takže √(−4) medzi reálnymi číslami neexistuje. Pri tretej odmocnine problém nie je: ∛(−8) = −2, lebo (−2)³ = −8.\n\nLogaritmus ln a je exponent, na ktorý treba umocniť e, aby vyšlo a. Lenže eʸ je vždy kladné, nech je y akékoľvek. Preto ln 0 ani ln(−5) neexistujú.',
    check: {
      q: 'Aký je definičný obor funkcie f(x) = ln(x − 2)?',
      options: ['(2, ∞)', '⟨2, ∞)', 'ℝ∖{2}', '(0, ∞)'],
      explain: 'Argument logaritmu musí byť kladný: x − 2 > 0, teda x > 2. Bod 2 nepatrí (ln 0 neexistuje), preto okrúhla zátvorka. Odpoveď (0, ∞) je definičný obor samotného ln x, nie ln(x − 2).',
    },
  },
  {
    title: 'D(f) s kvadratickou nerovnicou',
    text: 'Na skúške býva pod odmocninou alebo v logaritme kvadratický výraz, napríklad ln(x² − 4x + 3). Vtedy musíš vyriešiť kvadratickú nerovnicu. Najspoľahlivejšia je metóda nulových bodov.\n\nNajprv nájdeš nulové body výrazu (kde sa rovná nule), napríklad cez diskriminant. Tieto body rozdelia číselnú os na intervaly. Na každom intervale má výraz stále to isté znamienko, takže stačí dosadiť jedno skúšobné číslo z každého intervalu.\n\nPozor na typickú chybu: z x² > 4 NEPLATÍ x > ±2. Správne je x < −2 alebo x > 2, čo zistíš práve metódou nulových bodov.',
    formula: {
      f: 'ax² + bx + c = 0  ⇒  x₁,₂ = (−b ± √D) / (2a),  D = b² − 4ac     ax² + bx + c = a·(x − x₁)·(x − x₂)',
      what: 'Korene kvadratickej rovnice a rozklad',
      vars: [
        ['a, b, c', 'koeficienty pri x², x a absolútny člen'],
        ['D', 'diskriminant: D > 0 dva korene, D = 0 jeden, D < 0 žiadny reálny'],
        ['x₁, x₂', 'korene, teda nulové body výrazu'],
      ],
    },
    bullets: [
      '1. Nájdi nulové body výrazu (a body, kde nie je definovaný).',
      '2. Vyznač ich na číselnej osi, rozdelia ju na intervaly.',
      '3. Z každého intervalu dosaď jedno skúšobné číslo a zisti znamienko.',
      '4. Vyber intervaly so správnym znamienkom; pri „≥“ krajné body pridaj, pri „>“ nie.',
    ],
    worked: {
      q: 'Urči definičný obor funkcie f(x) = ln(x² − 4x + 3).',
      steps: [
        'Vieme: je tam logaritmus, jeho argument musí byť kladný. Hľadáme: x, pre ktoré x² − 4x + 3 > 0.',
        'Nulové body: x² − 4x + 3 = 0. Diskriminant D = (−4)² − 4·1·3 = 16 − 12 = 4.',
        'x₁,₂ = (4 ± √4) / 2 = (4 ± 2) / 2, teda x₁ = 1 a x₂ = 3. Rozklad: (x − 1)(x − 3).',
        'Body 1 a 3 delia os na intervaly (−∞, 1), (1, 3), (3, ∞).',
        'Skúšobné čísla: x = 0 dá 0 − 0 + 3 = 3 > 0 ✓; x = 2 dá 4 − 8 + 3 = −1 < 0 ✗; x = 4 dá 16 − 16 + 3 = 3 > 0 ✓.',
        'Body 1 a 3 nepatria, lebo tam je argument 0 a ln 0 neexistuje (nerovnica je ostrá „>“).',
      ],
      result: 'D(f) = (−∞, 1) ∪ (3, ∞).',
    },
    deeper: 'Prečo na intervale medzi nulovými bodmi nemôže znamienko „preskočiť“? Výraz x² − 4x + 3 je spojitý (jeho graf je súvislá parabola). Ak by mal v bode 0 kladnú hodnotu a v bode 2 zápornú, musel by niekde medzi nimi prejsť nulou. Lenže všetky nulové body sme už našli, takže medzi nimi ďalší neexistuje.\n\nPri parabole to vidíš aj z grafu: y = x² − 4x + 3 je parabola otvorená nahor (a = 1 > 0), ktorá pretína os x v bodoch 1 a 3. Nad osou x (kladná) je vľavo od 1 a vpravo od 3, pod osou medzi nimi.',
  },
  {
    title: 'Obor hodnôt H(f)',
    text: 'Obor hodnôt H(f) je množina všetkých čísel y, ktoré môžu z funkcie vyjsť. Kým D(f) hovorí, čo smieš do stroja vložiť, H(f) hovorí, čo z neho môže vypadnúť.\n\nH(f) sa hľadá ťažšie ako D(f). Pomôže ti znalosť grafov základných funkcií (oplatí sa ich vedieť naspamäť) a úpravy výrazu. Pri kvadratickej funkcii je najlepšia úprava doplnenie na štvorec, lebo štvorec (…)² je vždy ≥ 0.\n\nNeskôr, v lekcii Priebeh funkcie, budeš H(f) určovať z extrémov a limít. Teraz si zapamätaj obory hodnôt základných funkcií (pozri odrážky).',
    formula: {
      f: 'x² + bx + c = (x + b/2)² + c − b²/4',
      what: 'Doplnenie na štvorec',
      vars: [
        ['(x + b/2)²', 'štvorec, vždy ≥ 0, nula pre x = −b/2'],
        ['c − b²/4', 'najmenšia hodnota výrazu (vrchol paraboly)'],
      ],
    },
    bullets: [
      'x²: H = ⟨0, ∞)',
      '√x: H = ⟨0, ∞)',
      'eˣ: H = (0, ∞), nikdy nie je nula ani záporná',
      'ln x: H = ℝ',
      'sin x, cos x: H = ⟨−1, 1⟩',
      'arctg x: H = (−π/2, π/2)',
    ],
    worked: {
      q: 'Urči obor hodnôt funkcie f(x) = x² + 2x + 3.',
      steps: [
        'Vieme: kvadratická funkcia, D(f) = ℝ. Hľadáme: všetky hodnoty, ktoré môže nadobudnúť.',
        'Použijeme doplnenie na štvorec, lebo štvorec vieme odhadnúť zdola nulou. Tu b = 2, b/2 = 1.',
        'x² + 2x + 3 = (x + 1)² − 1 + 3 = (x + 1)² + 2.',
        '(x + 1)² ≥ 0 pre každé x a nadobúda všetky hodnoty od 0 vyššie. Preto f(x) = (x + 1)² + 2 ≥ 2.',
        'Najmenšia hodnota 2 nastane pre x = −1. Kontrola: f(−1) = 1 − 2 + 3 = 2 ✓.',
      ],
      result: 'H(f) = ⟨2, ∞).',
    },
    check: {
      q: 'Aký je obor hodnôt funkcie f(x) = 2 + sin x?',
      options: ['⟨1, 3⟩', '⟨−1, 1⟩', '⟨2, 3⟩', 'ℝ'],
      explain: 'sin x je medzi −1 a 1. Keď pripočítaš 2, posunieš celé rozmedzie o 2 hore: od −1 + 2 = 1 do 1 + 2 = 3.',
    },
  },
  {
    title: 'Operácie s funkciami a zložená funkcia',
    text: 'Funkcie môžeš sčítať, odčítať, násobiť aj deliť: (f + g)(x) = f(x) + g(x) a podobne. Nová funkcia je definovaná tam, kde sú definované obe pôvodné. Pri podiele f/g navyše musí byť g(x) ≠ 0.\n\nNajdôležitejšia operácia je zloženie (f ∘ g)(x) = f(g(x)). Najprv na x zapôsobí vnútorná funkcia g a jej výsledok vložíš do vonkajšej funkcie f. Na obrázku číslo x = 1 prejde najprv vnútornou funkciou 3x (vznikne 3) a potom vonkajšou sin (vznikne sin 3 ≈ 0,14). Text o derivácii pod obrázkom využiješ až v lekcii Derivácie.\n\nPoradie pri zložení je dôležité: f ∘ g a g ∘ f sú väčšinou úplne iné funkcie. Rozpoznať, čo je vnútro a čo obal, budeš potrebovať pri derivovaní aj integrovaní.',
    analogy: 'Práčka a sušička: bielizeň najprv vyperieš (vnútorná funkcia g), potom vysušíš (vonkajšia f). Ak to urobíš v opačnom poradí, výsledok je úplne iný – suchá a potom mokrá bielizeň.',
    fig: 'chain',
    formula: {
      f: '(f + g)(x) = f(x) + g(x)     (f · g)(x) = f(x) · g(x)     (f ∘ g)(x) = f(g(x))',
      what: 'Operácie s funkciami',
      vars: [
        ['g', 'vnútorná funkcia (pôsobí prvá)'],
        ['f', 'vonkajšia funkcia (pôsobí na výsledok g)'],
        ['D(f ∘ g)', 'x ∈ D(g) a zároveň g(x) ∈ D(f)'],
      ],
    },
    worked: {
      q: 'f(x) = x², g(x) = x + 3. Urči (f ∘ g)(x), (g ∘ f)(x) a obe hodnoty v x = 1.',
      steps: [
        'Vieme: f umocní na druhú, g pripočíta 3. Hľadáme: obe zloženia.',
        'f ∘ g: najprv g, potom f. Do f vložíme g(x) = x + 3: f(x + 3) = (x + 3)².',
        'g ∘ f: najprv f, potom g. Do g vložíme f(x) = x²: g(x²) = x² + 3.',
        'Hodnoty v x = 1: (f ∘ g)(1) = (1 + 3)² = 16, (g ∘ f)(1) = 1² + 3 = 4.',
        'Kontrola: 16 ≠ 4, poradie naozaj mení výsledok.',
      ],
      result: '(f ∘ g)(x) = (x + 3)², (g ∘ f)(x) = x² + 3; v x = 1 vyjde 16 a 4.',
    },
    deeper: 'Definičný obor zloženej funkcie: x musí patriť do D(g) a výsledok g(x) musí patriť do D(f). Príklad: f(x) = ln x a g(x) = x − 2. Potom (f ∘ g)(x) = ln(x − 2) a podmienka je g(x) = x − 2 > 0, teda D = (2, ∞).\n\nZložiť sa dá aj viac funkcií: sin²(3x) = (sin(3x))² vznikne z troch krokov: x → 3x → sin(3x) → (sin(3x))². Pri derivovaní budeš tieto vrstvy „šúpať“ zvonka dnu.',
    check: {
      q: 'f(x) = x², g(x) = sin x. Čo je (f ∘ g)(x)?',
      options: ['(sin x)² = sin² x', 'sin(x²)', 'x² · sin x', '2x · cos x'],
      explain: 'f ∘ g znamená: najprv g, teda sin x, a výsledok vložíš do f, ktorá ho umocní: (sin x)². Funkcia sin(x²) by bola g ∘ f.',
    },
  },
  {
    title: 'Párna a nepárna funkcia',
    text: 'Párna funkcia spĺňa f(−x) = f(x): pre x a −x dáva tú istú hodnotu. Jej graf je zrkadlový podľa osi y. Príklady: x², x⁴, cos x, |x|.\n\nNepárna funkcia spĺňa f(−x) = −f(x): pre −x dáva opačnú hodnotu. Jej graf je súmerný podľa počiatku (otočíš ho o 180° a vyzerá rovnako). Príklady: x, x³, sin x, tg x, 1/x. Na obrázku prepínaj párna/nepárna a sleduj žlté body f(x) a f(−x).\n\nPostup je vždy rovnaký: dosaď −x, uprav a porovnaj s f(x) a s −f(x). Väčšina funkcií nie je ani párna, ani nepárna. Podmienka navyše: definičný obor musí byť súmerný podľa nuly (s každým x obsahuje aj −x).',
    fig: 'parity',
    formula: {
      f: 'párna:  f(−x) = f(x)     nepárna:  f(−x) = −f(x)',
      what: 'Párnosť funkcie',
      vars: [
        ['f(−x)', 'do predpisu dosadíš −x (v zátvorke!)'],
        ['(−x)²', '= x², párna mocnina „zje“ mínus'],
        ['(−x)³', '= −x³, nepárna mocnina mínus nechá'],
      ],
    },
    worked: {
      q: 'Zisti párnosť: a) f(x) = x³ − 2x, b) g(x) = x⁴ + cos x, c) h(x) = x² + x.',
      steps: [
        'Vieme: všetky tri majú D = ℝ, ten je súmerný. Postup: dosadíme −x a porovnáme.',
        'a) f(−x) = (−x)³ − 2·(−x) = −x³ + 2x = −(x³ − 2x) = −f(x), teda nepárna.',
        'b) g(−x) = (−x)⁴ + cos(−x) = x⁴ + cos x = g(x), teda párna (cos je párna funkcia).',
        'c) h(−x) = (−x)² + (−x) = x² − x. To sa nerovná h(x) = x² + x ani −h(x) = −x² − x.',
        'Kontrola c) číslami: h(1) = 2, h(−1) = 0. Pri párnej by vyšlo 2, pri nepárnej −2. Nevyšlo ani jedno.',
      ],
      result: 'a) nepárna, b) párna, c) ani párna, ani nepárna.',
    },
    deeper: 'Užitočné pravidlá pre súčin (podobne ako pri znamienkach + a −): párna · párna = párna, nepárna · nepárna = párna, párna · nepárna = nepárna. Napríklad x·sin x je párna (nepárna · nepárna).\n\nPrečo nás párnosť zaujíma? Ak je funkcia párna alebo nepárna, stačí ju vyšetriť pre x ≥ 0 a druhú polovicu grafu dokreslíš zrkadlením. Pri priebehu funkcie ti to ušetrí polovicu práce.\n\nTypická chyba: −x² nie je (−x)². Výraz −x² znamená −(x²), napríklad pre x = 3 je −9, kým (−3)² = 9.',
    check: {
      q: 'Ktorá funkcia je párna?',
      options: ['f(x) = x² + cos x', 'f(x) = x³', 'f(x) = x + 1', 'f(x) = sin x'],
      explain: 'x² aj cos x sú párne, ich súčet je párny: f(−x) = x² + cos x = f(x). x³ a sin x sú nepárne, x + 1 nie je ani jedno.',
    },
  },
  {
    title: 'Monotónnosť a ohraničenosť',
    text: 'Funkcia je rastúca na intervale, ak pre x₁ < x₂ platí f(x₁) < f(x₂): keď ideš po osi x doprava, graf stúpa. Klesajúca je, ak f(x₁) > f(x₂): graf klesá. Ak dovolíš aj rovnosť, hovoríme neklesajúca (≤) a nerastúca (≥). Spoločný názov je monotónna funkcia.\n\nMonotónnosť zvyčajne platí len na kúskoch. Na obrázku je f(x) = x³ − 3x: zelené časti rastú (vľavo od −1 a vpravo od 1), červená časť medzi −1 a 1 klesá. V lekcii Priebeh funkcie sa naučíš tieto intervaly vypočítať deriváciou.\n\nFunkcia je ohraničená zdola, ak existuje číslo d, pod ktoré graf nikdy neklesne (f(x) ≥ d), a zhora, ak existuje h, nad ktoré nikdy nevystúpi (f(x) ≤ h). Ohraničená je, ak platí oboje. sin x je ohraničená (−1 ≤ sin x ≤ 1), x² len zdola (nulou), x³ ani zdola, ani zhora.',
    analogy: 'Turistická trasa na výškovom profile: kde pri chôdzi zľava doprava stúpaš, úsek je rastúci, kde zostupuješ, klesajúci. Ohraničenosť: trasa nikdy nevystúpi vyššie ako najvyšší štít pohoria a nezíde nižšie ako dno doliny.',
    fig: 'mat:priebeh',
    formula: {
      f: 'rastúca:  x₁ < x₂ ⇒ f(x₁) < f(x₂)     klesajúca:  x₁ < x₂ ⇒ f(x₁) > f(x₂)     ohraničená:  d ≤ f(x) ≤ h',
      what: 'Monotónnosť a ohraničenosť',
      vars: [
        ['x₁, x₂', 'ľubovoľné dva body intervalu, x₁ je vľavo'],
        ['⇒', '„z toho vyplýva“'],
        ['d, h', 'dolná a horná hranica hodnôt'],
      ],
    },
    worked: {
      q: 'Dokáž z definície, že f(x) = −2x + 5 je klesajúca na ℝ.',
      steps: [
        'Vieme: f(x) = −2x + 5. Hľadáme: dôkaz, že z x₁ < x₂ vyplýva f(x₁) > f(x₂).',
        'Zober ľubovoľné x₁ < x₂.',
        'Vynásob nerovnosť číslom −2. Násobenie ZÁPORNÝM číslom otočí znak nerovnosti: −2x₁ > −2x₂.',
        'Pripočítaj 5 k obom stranám (to znak nemení): −2x₁ + 5 > −2x₂ + 5, teda f(x₁) > f(x₂).',
        'Kontrola číslami: f(0) = 5, f(1) = 3. Väčšie x dalo menšiu hodnotu ✓.',
      ],
      result: 'f(x) = −2x + 5 je klesajúca na celom ℝ (priamka so zápornou smernicou −2).',
    },
  },
  {
    title: 'Prostá funkcia a inverzná funkcia',
    text: 'Funkcia je prostá, ak rôzne vstupy dávajú rôzne výstupy: z x₁ ≠ x₂ vyplýva f(x₁) ≠ f(x₂). Overíš to testom vodorovnou priamkou: každá vodorovná priamka pretne graf najviac raz. Funkcia x² na celom ℝ prostá nie je (f(−2) = f(2) = 4), ale na ⟨0, ∞) už áno. Každá rastúca alebo klesajúca funkcia je prostá.\n\nInverzná funkcia f⁻¹ robí opačnú prácu: ak f premení a na b, tak f⁻¹ premení b späť na a. Existuje iba k prostej funkcii, inak by nevedela, ktorý z viacerých vstupov má vrátiť. Platí D(f⁻¹) = H(f) a H(f⁻¹) = D(f).\n\nGraf inverznej funkcie dostaneš zrkadlením podľa priamky y = x. Na obrázku je žltá eˣ a zelená ln x: bod [a, b] na jednej krivke má zrkadlový bod [b, a] na druhej. Pozor: f⁻¹(x) NIE JE 1/f(x), mínus jednotka tu neznamená prevrátenú hodnotu.',
    analogy: 'Šifrovanie: f zašifruje správu, f⁻¹ ju rozšifruje. Aby sa dalo jednoznačne rozšifrovať, nesmú sa dve rôzne správy zašifrovať rovnako – preto musí byť f prostá.',
    fig: 'inverse',
    formula: {
      f: 'f(a) = b  ⇔  f⁻¹(b) = a     f⁻¹(f(x)) = x     D(f⁻¹) = H(f)',
      what: 'Inverzná funkcia',
      vars: [
        ['f⁻¹', 'inverzná funkcia (čítaj „f na mínus prvú“)'],
        ['⇔', '„práve vtedy, keď“ (platí oboma smermi)'],
        ['y = x', 'os súmernosti grafov f a f⁻¹'],
      ],
    },
    bullets: [
      '1. Over, že f je prostá (napr. je rastúca alebo klesajúca).',
      '2. Napíš y = f(x).',
      '3. Z rovnice vyjadri x pomocou y.',
      '4. Vymeň označenie x ↔ y, dostaneš y = f⁻¹(x).',
    ],
    worked: {
      q: 'Nájdi inverznú funkciu k f(x) = 2x + 3.',
      steps: [
        'Vieme: f(x) = 2x + 3 je priamka so smernicou 2 > 0, teda rastúca a prostá. Inverzná existuje.',
        'Napíš y = 2x + 3.',
        'Vyjadri x: 2x = y − 3, x = (y − 3) / 2.',
        'Vymeň x ↔ y, aby bola premenná opäť x: y = (x − 3) / 2.',
        'Kontrola: f(1) = 5 a f⁻¹(5) = (5 − 3) / 2 = 1 ✓. Funkcia f⁻¹ naozaj vrátila pôvodný vstup.',
      ],
      result: 'f⁻¹(x) = (x − 3) / 2, D(f⁻¹) = ℝ.',
    },
    deeper: 'Prečo zrkadlenie podľa y = x? Ak bod [a, b] leží na grafe f, znamená to f(a) = b. Pre inverznú platí f⁻¹(b) = a, teda na jej grafe leží bod [b, a]. Výmena súradníc x ↔ y je presne zrkadlenie podľa priamky y = x.\n\nAk funkcia nie je prostá, zúžime jej definičný obor na kúsok, kde prostá je. Tak vznikla napríklad √x ako inverzná k x² na ⟨0, ∞) a arcsin x ako inverzná k sin x na ⟨−π/2, π/2⟩.',
    check: {
      q: 'Kedy existuje inverzná funkcia k funkcii f?',
      options: ['Keď je f prostá', 'Vždy', 'Keď je f párna', 'Keď f(0) = 0'],
      explain: 'Inverzná funkcia musí ku každému výstupu vrátiť jediný vstup, preto f musí byť prostá. Párna funkcia (okrem triviálneho prípadu D(f) = {0}) prostá nie je, lebo f(−x) = f(x).',
    },
  },
  {
    title: 'Polynomické a mocninové funkcie',
    text: 'Polynóm (mnohočlen) je súčet násobkov mocnín x: P(x) = aₙxⁿ + … + a₁x + a₀. Najvyššia mocnina n s nenulovým koeficientom je stupeň polynómu. Definičný obor je vždy ℝ. Stupeň 0 je konštanta, stupeň 1 priamka y = kx + q (k je smernica, q posun na osi y), stupeň 2 parabola.\n\nKoreň (nulový bod) polynómu je číslo x₀, pre ktoré P(x₀) = 0. Polynóm stupňa n má najviac n reálnych koreňov. Ak je x₀ koreň, polynóm sa dá napísať ako (x − x₀) · (iný polynóm). Celočíselné korene hľadaj medzi deliteľmi absolútneho člena a₀.\n\nMocninová funkcia je xʳ. Pri prirodzenom r = n: párne n dá párnu funkciu tvaru U, nepárne n nepárnu funkciu. Záporný exponent znamená zlomok, x⁻ⁿ = 1/xⁿ (D = ℝ∖{0}), zlomkový exponent odmocninu, x^(1/2) = √x (D = ⟨0, ∞)).',
    formula: {
      f: 'P(x) = aₙxⁿ + aₙ₋₁xⁿ⁻¹ + … + a₁x + a₀     x⁻ⁿ = 1/xⁿ     x^(m/n) = ⁿ√(xᵐ)',
      what: 'Polynóm a mocniny',
      vars: [
        ['n', 'stupeň polynómu (najvyššia mocnina)'],
        ['aₙ', 'vedúci koeficient, nesmie byť 0'],
        ['xᵃ · xᵇ', '= xᵃ⁺ᵇ (exponenty sa sčítajú)'],
        ['xᵃ / xᵇ', '= xᵃ⁻ᵇ (exponenty sa odčítajú)'],
        ['(xᵃ)ᵇ', '= xᵃ·ᵇ (exponenty sa násobia)'],
      ],
    },
    worked: {
      q: 'Nájdi korene polynómu P(x) = x³ − x² − 4x + 4 a rozlož ho na súčin.',
      steps: [
        'Vieme: polynóm 3. stupňa, má najviac 3 korene. Hľadáme: x, pre ktoré P(x) = 0.',
        'Skúsime vybrať spoločné časti (metóda združovania): x³ − x² = x²(x − 1) a −4x + 4 = −4(x − 1).',
        'Teda P(x) = x²(x − 1) − 4(x − 1) = (x − 1)(x² − 4).',
        'x² − 4 je rozdiel štvorcov: x² − 4 = (x − 2)(x + 2). Spolu P(x) = (x − 1)(x − 2)(x + 2).',
        'Súčin je nula, keď je nula niektorý činiteľ: x = 1, x = 2, x = −2.',
        'Kontrola: P(2) = 8 − 4 − 8 + 4 = 0 ✓, P(−2) = −8 − 4 + 8 + 4 = 0 ✓.',
      ],
      result: 'Korene −2, 1, 2; P(x) = (x − 1)(x − 2)(x + 2).',
    },
    check: {
      q: 'Aký je definičný obor funkcie f(x) = x⁻²?',
      options: ['ℝ∖{0}', 'ℝ', '(0, ∞)', '⟨0, ∞)'],
      explain: 'x⁻² = 1/x², teda zlomok s menovateľom x². Ten je nula len pre x = 0, ostatné čísla sú povolené (aj záporné, lebo x² je kladné).',
    },
  },
  {
    title: 'Racionálne funkcie',
    text: 'Racionálna funkcia je podiel dvoch polynómov: R(x) = P(x) / Q(x). Definičný obor sú všetky x okrem koreňov menovateľa Q. Nulové body funkcie sú korene čitateľa P (ak tam menovateľ nie je nulový).\n\nNajjednoduchší príklad je lineárna lomená funkcia (ax + b) / (cx + d). Jej graf je hyperbola s dvoma asymptotami, priamkami, ku ktorým sa graf donekonečna približuje. Na obrázku je f(x) = (2x + 1) / (x − 2): červená čiarkovaná zvislá priamka x = 2 je tam, kde je menovateľ nula, a žltá vodorovná y = 2 je hodnota, ku ktorej sa graf blíži ďaleko vľavo aj vpravo.\n\nAsymptoty presne vypočítaš v lekcii Limity. Zapamätaj si zatiaľ jedno: ak je stupeň čitateľa väčší alebo rovný stupňu menovateľa, oplatí sa najprv polynómy vydeliť. To využiješ aj pri integráloch.',
    fig: 'mat:limity@asym',
    formula: {
      f: 'R(x) = P(x) / Q(x),   D(R) = {x : Q(x) ≠ 0}',
      what: 'Racionálna funkcia',
      vars: [
        ['P(x)', 'polynóm v čitateli'],
        ['Q(x)', 'polynóm v menovateli, nesmie byť nulový'],
        ['rýdzo racionálna', 'stupeň P je menší ako stupeň Q'],
      ],
    },
    worked: {
      q: 'Pre f(x) = (2x + 1) / (x − 2) urči D(f), priesečníky s osami a správanie pri x = 2.',
      steps: [
        'Vieme: racionálna funkcia. Hľadáme: D(f), priesečníky s osami x a y.',
        'D(f): menovateľ x − 2 ≠ 0, teda x ≠ 2. D(f) = ℝ∖{2}.',
        'Priesečník s osou x (f(x) = 0): zlomok je nula, keď je nula čitateľ: 2x + 1 = 0, x = −1/2. Bod [−1/2, 0].',
        'Priesečník s osou y (x = 0): f(0) = 1 / (−2) = −1/2. Bod [0, −1/2].',
        'Pri x = 2: f(2,1) = 5,2 / 0,1 = 52 a f(1,9) = 4,8 / (−0,1) = −48. Hodnoty utekajú do ±∞, preto je tam zvislá asymptota.',
        'Ďaleko vpravo: f(100) = 201 / 98 ≈ 2,05. Graf sa blíži k y = 2, presne ako na obrázku.',
      ],
      result: 'D(f) = ℝ∖{2}; priesečníky [−1/2, 0] a [0, −1/2]; asymptoty x = 2 a y = 2.',
    },
    deeper: 'Delenie polynómov: (2x + 1) / (x − 2) = 2 + 5 / (x − 2). Overíš to spätne: 2·(x − 2) + 5 = 2x − 4 + 5 = 2x + 1 ✓.\n\nZ tohto tvaru je všetko jasné. Pre veľké x je zlomok 5 / (x − 2) skoro nula, takže f(x) ≈ 2, odtiaľ vodorovná asymptota y = 2. Pri x blízko 2 je menovateľ skoro nula a zlomok obrovský, odtiaľ zvislá asymptota x = 2.',
  },
  {
    title: 'Exponenciálna a logaritmická funkcia',
    text: 'Exponenciálna funkcia je f(x) = aˣ, kde základ a je kladný a rôzny od 1. D = ℝ, H = (0, ∞): výsledok je vždy kladný. Pre a > 1 rastie, pre 0 < a < 1 klesá. Každá prechádza bodom [0, 1], lebo a⁰ = 1. Najdôležitejšia je eˣ so základom e ≈ 2,718 (Eulerovo číslo).\n\nLogaritmická funkcia logₐ x je inverzná k aˣ. Odpovedá na otázku: na koľkú treba umocniť a, aby vyšlo x? Napríklad log₂ 8 = 3, lebo 2³ = 8. D = (0, ∞), H = ℝ a graf prechádza bodom [1, 0]. Prirodzený logaritmus ln x má základ e, dekadický log x má základ 10.\n\nNa obrázku si prepni eˣ a ln x. eˣ je vždy nad osou x a vľavo sa k nej prikladá, ln x existuje len vpravo od nuly a pri nule padá do −∞. Typické chyby: ln(a + b) NIE JE ln a + ln b a (ln x)² NIE JE ln(x²).',
    analogy: 'Kolónia baktérií, ktorá sa každú hodinu zdvojnásobí, rastie ako 2ˣ: nikdy nie je záporná a rastie čoraz rýchlejšie. Logaritmus log₂ odpovedá na opačnú otázku: koľko hodín (zdvojnásobení) treba, aby z 1 baktérie bolo 1024? log₂ 1024 = 10.',
    fig: 'mat:funkcie',
    formula: {
      f: 'logₐ x = y  ⇔  aʸ = x     logₐ(u·v) = logₐ u + logₐ v     logₐ(u/v) = logₐ u − logₐ v     logₐ(uʳ) = r · logₐ u',
      what: 'Logaritmus a jeho pravidlá',
      vars: [
        ['a', 'základ: a > 0, a ≠ 1'],
        ['ln x', '= logₑ x, prirodzený logaritmus'],
        ['e^(ln x) = x', 'eˣ a ln x sa navzájom rušia (sú inverzné)'],
        ['logₐ x', '= ln x / ln a (prechod k inému základu)'],
        ['ln 1 = 0, ln e = 1', 'lebo e⁰ = 1 a e¹ = e'],
      ],
    },
    worked: {
      q: 'Vypočítaj: a) log₂ 32, b) ln √e, c) log 0,001, d) vyrieš rovnicu eˣ = 5.',
      steps: [
        'Postup pri a) až c): pýtaš sa, na koľkú treba umocniť základ.',
        'a) 2⁵ = 32, teda log₂ 32 = 5.',
        'b) √e = e^(1/2), teda ln √e = 1/2.',
        'c) 0,001 = 10⁻³, teda log 0,001 = −3.',
        'd) Na obe strany použi ln (ruší eˣ): x = ln 5 ≈ 1,609.',
        'Kontrola d): e^1,609 ≈ 5,0 ✓ (kalkulačka).',
      ],
      result: 'a) 5, b) 1/2, c) −3, d) x = ln 5 ≈ 1,609.',
    },
    deeper: 'Prečo práve číslo e? Zo všetkých exponenciál aˣ je eˣ jediná, ktorej graf má v bode [0, 1] sklon presne 1. Dôsledok: derivácia eˣ je opäť eˣ, čo bude v deriváciách a integráloch veľmi pohodlné.\n\nČíslo e vzniká aj pri úrokoch: ak 1 euro úročíš sadzbou 100 % ročne, ale úroky pripisuješ n-krát za rok, na konci máš (1 + 1/n)ⁿ eur. Pre n = 12 je to asi 2,613, pre n → ∞ sa to blíži k e ≈ 2,718.\n\nPravidlo ln(u·v) = ln u + ln v plynie z mocnín: eᵃ · eᵇ = eᵃ⁺ᵇ. Logaritmus premieňa násobenie na sčítanie, preto sa kedysi počítalo s logaritmickými tabuľkami.',
    check: {
      q: 'log₃ 81 = ?',
      options: ['4', '3', '27', '1/4'],
      explain: 'Hľadáš exponent: 3⁴ = 3·3·3·3 = 81, teda log₃ 81 = 4.',
    },
  },
  {
    title: 'Goniometrické funkcie a periodickosť',
    text: 'V matematickej analýze meriame uhly v radiánoch, nie v stupňoch. Plný uhol 360° = 2π rad, priamy uhol 180° = π rad. Prevod: uhol v stupňoch vynásob π/180. Pozor: kalkulačka musí byť pri týchto výpočtoch v režime RAD, nie DEG, inak dostaneš nezmysly.\n\nNa jednotkovej kružnici (polomer 1) má bod pod uhlom x súradnice [cos x, sin x]. Preto sú sin x a cos x vždy medzi −1 a 1, D = ℝ, H = ⟨−1, 1⟩. sin x je nepárna, cos x párna. Ďalej tg x = sin x / cos x (D: x ≠ π/2 + kπ) a cotg x = cos x / sin x (D: x ≠ kπ), obe s H = ℝ.\n\nFunkcia je periodická s periódou T, ak f(x + T) = f(x) pre všetky x: graf sa každých T opakuje. sin a cos majú periódu 2π, tg a cotg periódu π. Funkcia sin(kx) má periódu 2π/k. Na obrázku je sínus (prepni aj cos): vlnovka, ktorá sa opakuje každých 2π ≈ 6,28.',
    analogy: 'Ruské koleso: výška kabínky nad osou kolesa je presne sínus uhla otočenia (krát polomer). Po jednom celom otočení (2π) je kabínka znova na tom istom mieste – preto sa sínus opakuje dookola.',
    fig: 'mat:funkcie',
    formula: {
      f: 'sin² x + cos² x = 1     tg x = sin x / cos x     α(rad) = α(°) · π / 180',
      what: 'Základné vzťahy goniometrických funkcií',
      vars: [
        ['sin 0; π/6; π/4; π/3; π/2', '= 0; 1/2; √2/2; √3/2; 1'],
        ['cos 0; π/6; π/4; π/3; π/2', '= 1; √3/2; √2/2; 1/2; 0'],
        ['π/6; π/4; π/3; π/2', '= 30°; 45°; 60°; 90°'],
        ['T', 'perióda: sin, cos 2π; tg, cotg π'],
      ],
    },
    worked: {
      q: 'Preveď 135° na radiány a urči sin, cos a tg tohto uhla.',
      steps: [
        'Vieme: α = 135°. Hľadáme: α v radiánoch a hodnoty sin, cos, tg.',
        'Prevod: 135 · π / 180 = 3π/4 (skrátili sme 135/180 = 3/4).',
        '135° = 180° − 45°, uhol leží v 2. kvadrante (vľavo hore na kružnici).',
        'V 2. kvadrante je y-súradnica kladná, x-súradnica záporná: sin 135° = sin 45° = √2/2, cos 135° = −cos 45° = −√2/2.',
        'tg = sin / cos = (√2/2) / (−√2/2) = −1.',
        'Kontrola: sin² + cos² = 1/2 + 1/2 = 1 ✓.',
      ],
      result: '135° = 3π/4; sin = √2/2, cos = −√2/2, tg = −1.',
    },
    deeper: 'Prečo sin² x + cos² x = 1? Bod [cos x, sin x] leží na kružnici s polomerom 1. Pravouhlý trojuholník s odvesnami |cos x| a |sin x| má preponu 1, takže podľa Pytagorovej vety cos² x + sin² x = 1².\n\nPrečo sin(kx) má periódu 2π/k? Vnútro kx prejde celú periódu 2π, keď x prejde dĺžku 2π/k. Napríklad sin(2x) sa opakuje už po π, je teda „dvakrát rýchlejší“.\n\nZnamienka podľa kvadrantov: v 1. kvadrante (0 až π/2) sú všetky kladné, v 2. (π/2 až π) len sin, v 3. (π až 3π/2) len tg a cotg, v 4. (3π/2 až 2π) len cos.',
    check: {
      q: 'Aká je (najmenšia) perióda funkcie f(x) = sin(2x)?',
      options: ['π', '2π', '4π', 'π/4'],
      explain: 'Perióda sin(kx) je 2π/k = 2π/2 = π. Vnútro 2x „beží“ dvakrát rýchlejšie, takže sa vlnovka zopakuje dvakrát skôr.',
    },
  },
  {
    title: 'Cyklometrické funkcie',
    text: 'Cyklometrické funkcie (arcsin, arccos, arctg, arccotg) sú inverzné ku goniometrickým. Odpovedajú na otázku: aký uhol má daný sínus (kosínus, tangens)? Napríklad arcsin(1/2) = π/6, lebo sin(π/6) = 1/2.\n\nProblém: sin x nie je prostá, rovnaký sínus má nekonečne veľa uhlov. Preto sa sínus zúži na interval ⟨−π/2, π/2⟩, kde rastie a je prostý, a až k tomuto kúsku sa robí inverzná funkcia. Podobne cos na ⟨0, π⟩, tg na (−π/2, π/2) a cotg na (0, π). Výsledok cyklometrickej funkcie musí vždy ležať v tomto intervale.\n\nV obrázku z predošlého kroku si prepni arctg x: je definovaná pre všetky x a jej graf sa zľava blíži k −π/2 a sprava k π/2 (fialové čiarkované priamky sú vodorovné asymptoty). Pozor: arcsin x NIE JE 1/sin x. Tlačidlo sin⁻¹ na kalkulačke znamená arcsin.',
    formula: {
      f: 'arcsin x = y  ⇔  sin y = x  a  y ∈ ⟨−π/2, π/2⟩',
      what: 'Cyklometrické funkcie: definičné obory a obory hodnôt',
      vars: [
        ['arcsin x', 'D = ⟨−1, 1⟩, H = ⟨−π/2, π/2⟩'],
        ['arccos x', 'D = ⟨−1, 1⟩, H = ⟨0, π⟩'],
        ['arctg x', 'D = ℝ, H = (−π/2, π/2)'],
        ['arccotg x', 'D = ℝ, H = (0, π)'],
      ],
    },
    worked: {
      q: 'Vypočítaj a) arcsin(1/2), b) arccos(−1/2), c) arctg(−1) a d) urči D(f) pre f(x) = arcsin(2x − 1).',
      steps: [
        'a) Hľadáš uhol z ⟨−π/2, π/2⟩ so sínusom 1/2: je to π/6 (30°).',
        'b) Hľadáš uhol z ⟨0, π⟩ s kosínusom −1/2: cos(π/3) = 1/2, uhol v 2. kvadrante je π − π/3 = 2π/3 (120°).',
        'c) Hľadáš uhol z (−π/2, π/2) s tangensom −1: je to −π/4. Odpoveď 3π/4 má tiež tangens −1, ale neleží v obore hodnôt arctg.',
        'd) Argument arcsin musí byť z ⟨−1, 1⟩: −1 ≤ 2x − 1 ≤ 1.',
        'Pripočítaj 1: 0 ≤ 2x ≤ 2, vydeľ 2: 0 ≤ x ≤ 1.',
        'Kontrola d): x = 0 dá arcsin(−1) = −π/2, x = 1 dá arcsin 1 = π/2, oba existujú ✓.',
      ],
      result: 'a) π/6, b) 2π/3, c) −π/4, d) D(f) = ⟨0, 1⟩.',
    },
    check: {
      q: 'Aký je obor hodnôt funkcie arccos x?',
      options: ['⟨0, π⟩', '⟨−π/2, π/2⟩', '⟨−1, 1⟩', 'ℝ'],
      explain: 'arccos je inverzná ku cos zúženému na ⟨0, π⟩, takže výsledky sú uhly z ⟨0, π⟩. ⟨−1, 1⟩ je jej definičný obor (vstupy), nie obor hodnôt.',
    },
  },
  {
    title: 'Zhrnutie: funkcie',
    text: 'Funkcia priradí každému x z definičného oboru práve jedno y. Pri každej funkcii sa pýtaš: čo smiem dosadiť (D), čo môže vyjsť (H), a aké má vlastnosti. Elementárne funkcie sú stavebné kocky, z ktorých operáciami a skladaním vznikajú všetky funkcie na skúške.\n\nOpakuj si grafy základných funkcií, kým ich nevieš nakresliť naspamäť. Ušetria ti čas pri definičných oboroch, limitách aj priebehu funkcie.',
    bullets: [
      'D(f): menovateľ ≠ 0, pod párnou odmocninou ≥ 0, v logaritme > 0, v arcsin a arccos od −1 do 1.',
      'Kvadratické nerovnice rieš metódou nulových bodov; z x² > 4 vyplýva x < −2 alebo x > 2.',
      'H(f): pri kvadratickej funkcii doplň na štvorec; poznaj H základných funkcií.',
      '(f ∘ g)(x) = f(g(x)): najprv vnútorná g, potom vonkajšia f; poradie je dôležité.',
      'Párna f(−x) = f(x) (súmerná podľa osi y), nepárna f(−x) = −f(x) (súmerná podľa počiatku).',
      'Rastúca: väčšie x dá väčšie y. Prostá: rôzne x dajú rôzne y. Inverzná existuje len k prostej, graf zrkadlíš podľa y = x.',
      'eˣ > 0 vždy, ln x len pre x > 0; ln(u·v) = ln u + ln v, ln(uʳ) = r·ln u.',
      'Uhly v radiánoch, kalkulačka v RAD; sin² x + cos² x = 1; perióda sin, cos je 2π, tg je π.',
      'arcsin: D = ⟨−1, 1⟩, H = ⟨−π/2, π/2⟩; arctg: D = ℝ, H = (−π/2, π/2).',
    ],
  },
];

export default steps;
