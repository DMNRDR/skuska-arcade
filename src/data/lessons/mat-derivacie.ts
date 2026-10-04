import type { Step } from '../steps';

// Matematika 1, prednášky 7–9: Diferenciálny počet.
// Pojem derivácie, pravidlá, zložená, logaritmické, implicitná a parametrická derivácia,
// vyššie derivácie, dotyčnica a normála, diferenciál, Taylorov polynóm, L’Hospitalovo pravidlo.

const steps: Step[] = [
  {
    title: 'Čo je derivácia?',
    text: 'Derivácia meria, ako rýchlo sa funkcia mení. Geometricky je derivácia f′(x₀) smernica (sklon) dotyčnice ku grafu v bode x₀. Smernica priamky hovorí, o koľko priamka stúpne, keď sa posunieš o 1 doprava: je to číslo k v rovnici y = kx + q.\n\nZ derivácie hneď vidíš správanie funkcie: ak f′(x₀) > 0, funkcia v tom mieste rastie, ak f′(x₀) < 0, klesá, a ak f′(x₀) = 0, dotyčnica je vodorovná (napríklad na vrchole alebo na dne).\n\nNa obrázku sa žltý bod kĺže po modrom grafe a žltá úsečka je dotyčnica. Ružová čiarkovaná krivka je derivácia f′(x): v každom x ukazuje, aký strmý je modrý graf. Prepni na sin x a uvidíš, že derivácia sínusu vyzerá ako kosínus.',
    analogy: 'Tachometer v aute: prejdená dráha je funkcia času a rýchlosť, ktorú ukazuje tachometer, je jej derivácia. Keď stojíš, rýchlosť je 0; keď cúvaš, je záporná.',
    fig: 'mat:derivacie',
    formula: {
      f: 'k = Δy / Δx = tg α',
      what: 'Smernica priamky',
      vars: [
        ['Δy', 'o koľko sa zmení y (výška)'],
        ['Δx', 'o koľko sa zmení x (posun doprava)'],
        ['α', 'uhol, ktorý priamka zviera s kladnou osou x'],
        ['f′(x₀)', 'smernica dotyčnice v bode x₀'],
      ],
    },
    check: {
      q: 'Funkcia v bode x₀ klesá. Čo platí pre f′(x₀)?',
      options: ['f′(x₀) < 0', 'f′(x₀) > 0', 'f′(x₀) = 0', 'f(x₀) < 0'],
      explain: 'Klesanie znamená zápornú smernicu dotyčnice, teda f′(x₀) < 0. Samotná hodnota f(x₀) môže byť kladná aj záporná, o raste či klesaní nehovorí.',
    },
  },
  {
    title: 'Definícia derivácie',
    text: 'Ako zistiť smernicu dotyčnice? Najprv nakreslíš sečnicu, priamku cez dva body grafu: [x₀, f(x₀)] a [x₀ + h, f(x₀ + h)]. Jej smernica je podiel zmeny výšky a zmeny x: (f(x₀ + h) − f(x₀)) / h.\n\nTeraz posúvaš druhý bod k prvému, teda h → 0. Sečnica sa otáča a blíži sa k dotyčnici. Smernica dotyčnice je preto limita smerníc sečníc. To je definícia derivácie.\n\nDerivácia sa označuje f′(x), y′ alebo dy/dx (čítaj „dé y podľa dé x“). Zápis dy/dx pripomína, že ide o podiel veľmi malej zmeny y a veľmi malej zmeny x. Na skúške niekedy chcú deriváciu z definície, inak používaš tabuľku a pravidlá.',
    formula: {
      f: 'f′(x₀) = lim (h→0) [f(x₀ + h) − f(x₀)] / h',
      what: 'Derivácia funkcie v bode x₀',
      vars: [
        ['h', 'malý posun od bodu x₀ (blíži sa k nule)'],
        ['f(x₀ + h) − f(x₀)', 'zmena funkčnej hodnoty (Δy)'],
        ['podiel', 'smernica sečnice; po limite smernica dotyčnice'],
        ['dy/dx', 'iný zápis derivácie (Leibnizov)'],
      ],
    },
    worked: {
      q: 'Vypočítaj z definície deriváciu f(x) = x² v bode x₀ = 3.',
      steps: [
        'Vieme: f(x) = x², x₀ = 3. Hľadáme: f′(3) = lim (h→0) [f(3 + h) − f(3)] / h.',
        'f(3 + h) = (3 + h)² = 9 + 6h + h². f(3) = 9.',
        'Rozdiel: f(3 + h) − f(3) = 6h + h².',
        'Vydeľ h: (6h + h²)/h = 6 + h (krátiť smieš, lebo h ≠ 0).',
        'Limita pre h → 0: 6 + 0 = 6.',
        'Kontrola tabuľkou: (x²)′ = 2x, v bode 3 je to 2·3 = 6 ✓.',
      ],
      result: 'f′(3) = 6, dotyčnica k parabole v bode [3, 9] má smernicu 6.',
    },
    deeper: 'Fyzikálne: ak s(t) je dráha, podiel [s(t + h) − s(t)] / h je priemerná rýchlosť za čas h. Keď h zmenšuješ, dostaneš okamžitú rýchlosť, presne tú, ktorú ukazuje tachometer.\n\nDerivácia nemusí existovať. Funkcia |x| má v nule hrot: sprava je smernica +1, zľava −1. Jednostranné limity podielu sa líšia, takže f′(0) neexistuje. Platí: ak má funkcia v bode deriváciu, je tam spojitá. Naopak to neplatí (|x| je v nule spojitá, ale derivácia tam nie je).',
  },
  {
    title: 'Tabuľka derivácií',
    text: 'Počítať každú deriváciu z definície by bolo zdĺhavé. Preto existuje tabuľka derivácií základných funkcií, ktorú sa treba naučiť naspamäť ako malú násobilku. Každý riadok bol raz odvodený z definície.\n\nNajčastejšie použiješ pravidlo pre mocninu: exponent zíde dopredu a zníži sa o 1. Platí pre ľubovoľný reálny exponent, teda aj pre odmocniny a zlomky. Stačí ich najprv prepísať na mocninu: √x = x^(1/2), 1/x³ = x⁻³, ∛(x²) = x^(2/3).\n\nTypické chyby: (cos x)′ má mínus, (ln x)′ = 1/x platí len pre x > 0 a (eˣ)′ = eˣ, nie x·eˣ⁻¹ (exponent nie je konštanta, pravidlo pre mocninu tu neplatí).',
    formula: {
      f: '(c)′ = 0     (xⁿ)′ = n · xⁿ⁻¹     (eˣ)′ = eˣ     (ln x)′ = 1/x',
      what: 'Tabuľka derivácií',
      vars: [
        ['(aˣ)′', '= aˣ · ln a'],
        ['(logₐ x)′', '= 1 / (x · ln a)'],
        ['(sin x)′', '= cos x'],
        ['(cos x)′', '= −sin x'],
        ['(tg x)′', '= 1 / cos² x'],
        ['(cotg x)′', '= −1 / sin² x'],
        ['(arcsin x)′', '= 1 / √(1 − x²)'],
        ['(arccos x)′', '= −1 / √(1 − x²)'],
        ['(arctg x)′', '= 1 / (1 + x²)'],
        ['(arccotg x)′', '= −1 / (1 + x²)'],
      ],
    },
    worked: {
      q: 'Zderivuj: a) √x, b) 1/x³, c) x·√x.',
      steps: [
        'Vieme: všetky tri sú mocniny v prestrojení. Postup: prepíš na xⁿ a použi (xⁿ)′ = n·xⁿ⁻¹.',
        'a) √x = x^(1/2). Derivácia: (1/2)·x^(1/2 − 1) = (1/2)·x^(−1/2) = 1/(2√x).',
        'b) 1/x³ = x⁻³. Derivácia: −3·x⁻⁴ = −3/x⁴.',
        'c) x·√x = x¹·x^(1/2) = x^(3/2). Derivácia: (3/2)·x^(1/2) = (3/2)·√x.',
        'Kontrola c) v bode x = 4: (3/2)·√4 = 3. Numericky [f(4,001) − f(3,999)] / 0,002 ≈ 3,000 ✓.',
      ],
      result: 'a) 1/(2√x), b) −3/x⁴, c) (3/2)·√x.',
    },
    deeper: 'Prečo (xⁿ)′ = n·xⁿ⁻¹? Pre n = 3: (x + h)³ = x³ + 3x²h + 3xh² + h³. Rozdiel s x³ vydelený h je 3x² + 3xh + h², čo pre h → 0 dá 3x². Pre všeobecné n vyjde z binomickej vety vždy n·xⁿ⁻¹.\n\nPrečo (sin x)′ = cos x? Využije sa vzorec sin(x + h) − sin x = 2·cos(x + h/2)·sin(h/2) a dôležitá limita sin t / t → 1. Po vydelení h dostaneš cos(x + h/2) · [sin(h/2)/(h/2)] → cos x · 1.\n\nPrečo (eˣ)′ = eˣ? [e^(x+h) − eˣ]/h = eˣ · (eʰ − 1)/h a dôležitá limita (eʰ − 1)/h → 1.',
    check: {
      q: '(1/x)′ = ?',
      options: ['−1/x²', '1/x²', 'ln x', '−1/x'],
      explain: '1/x = x⁻¹, derivácia −1·x⁻² = −1/x². Odpoveď ln x je opačný smer: ln x je funkcia, ktorej derivácia je 1/x.',
    },
  },
  {
    title: 'Súčet, súčin a podiel',
    text: 'Konštanta pred funkciou pri derivovaní zostane a súčet (rozdiel) derivuješ člen po člene. Preto (5x³ − 4x + 7)′ = 15x² − 4.\n\nSúčin dvoch funkcií sa NEderivuje ako súčin derivácií. Platí pravidlo (u·v)′ = u′·v + u·v′: raz derivuješ prvú, raz druhú a sčítaš. Napríklad (x²·sin x)′ = 2x·sin x + x²·cos x.\n\nPre podiel platí (u/v)′ = (u′·v − u·v′) / v². Pozor na poradie v čitateli, je tam mínus: najprv derivuješ horný (u′·v). Ak je v čitateli len konštanta, je jednoduchšie prepísať zlomok na mocninu: 3/x² = 3x⁻², derivácia −6x⁻³.',
    analogy: 'Obdĺžnikové pole so stranami u a v, ktorým obom rastie dĺžka. Prírastok plochy tvoria dva tenké pásy pozdĺž strán: jeden s plochou u′·v, druhý u·v′. Preto má pravidlo pre súčin dva členy, nie súčin prírastkov u′·v′.',
    formula: {
      f: '(c · f)′ = c · f′     (f ± g)′ = f′ ± g′     (u · v)′ = u′ · v + u · v′     (u / v)′ = (u′ · v − u · v′) / v²',
      what: 'Pravidlá derivovania',
      vars: [
        ['c', 'konštanta (číslo)'],
        ['u, v', 'dve funkcie premennej x'],
        ['u′, v′', 'ich derivácie'],
        ['v²', 'menovateľ na druhú, nesmie byť nula'],
      ],
    },
    worked: {
      q: 'Zderivuj f(x) = (x² + 1)/(x − 1).',
      steps: [
        'Vieme: podiel, u = x² + 1, v = x − 1. Použijeme pravidlo pre podiel.',
        'Derivácie: u′ = 2x, v′ = 1.',
        'Dosaď: f′(x) = [2x·(x − 1) − (x² + 1)·1] / (x − 1)².',
        'Uprav čitateľ: 2x² − 2x − x² − 1 = x² − 2x − 1.',
        'f′(x) = (x² − 2x − 1)/(x − 1)².',
        'Kontrola v bode x = 2: (4 − 4 − 1)/1 = −1. Numericky [f(2,001) − f(1,999)]/0,002 ≈ −1,000 ✓.',
      ],
      result: 'f′(x) = (x² − 2x − 1)/(x − 1)².',
    },
    deeper: 'Odvodenie pravidla pre súčin: u(x + h)·v(x + h) − u(x)·v(x) = [u(x + h) − u(x)]·v(x + h) + u(x)·[v(x + h) − v(x)]. (Pridali sme a ubrali člen u(x)·v(x + h).) Vydeľ h a pošli h → 0: dostaneš u′·v + u·v′.\n\nPravidlo pre podiel z neho vyplýva: u = (u/v)·v, takže u′ = (u/v)′·v + (u/v)·v′. Vyjadri (u/v)′ a uprav, vyjde (u′v − uv′)/v².',
    check: {
      q: '(5x³ − 4x + 7)′ = ?',
      options: ['15x² − 4', '15x² − 4 + 7', '5x² − 4', '15x³ − 4x'],
      explain: 'Derivuj člen po člene: (5x³)′ = 15x², (−4x)′ = −4, (7)′ = 0, lebo konštanta sa nemení.',
    },
  },
  {
    title: 'Zložená funkcia (reťazové pravidlo)',
    text: 'Keď je jedna funkcia vnorená do druhej, napríklad sin(3x) alebo (x² + 1)⁵, derivuješ zvonka dnu: derivácia vonkajšej funkcie (vnútro necháš nedotknuté) KRÁT derivácia vnútornej funkcie. Toto je najčastejší zdroj chýb na skúške, ľudia zabúdajú na „krát derivácia vnútra“.\n\nNa obrázku číslo x prejde najprv vnútornou funkciou 3x a potom vonkajšou sin. Derivácia: vonkajšia sin sa zmení na cos (s pôvodným vnútrom 3x) a vynásobí sa deriváciou vnútra (3x)′ = 3. Spolu (sin 3x)′ = 3·cos 3x.\n\nAk je vrstiev viac, derivuješ postupne každú a všetky derivácie vynásobíš. Najprv si vždy povedz nahlas: „čo je obal a čo je vnútro?“',
    analogy: 'Cibuľa alebo matrioška: šúpeš vrstvy zvonka dnu. Každá vrstva prispeje do výsledku svojou deriváciou a všetko sa vynásobí. Ak niektorú vrstvu preskočíš, výsledok je zlý.',
    fig: 'chain',
    formula: {
      f: '[f(g(x))]′ = f′(g(x)) · g′(x)',
      what: 'Derivácia zloženej funkcie',
      vars: [
        ['f', 'vonkajšia funkcia (obal)'],
        ['g', 'vnútorná funkcia (vnútro)'],
        ['f′(g(x))', 'derivácia obalu, vnútro ostáva nezmenené'],
        ['g′(x)', 'derivácia vnútra, „krát“ na konci'],
      ],
    },
    bullets: [
      '(e^g)′ = e^g · g′,  napr. (e^(x²))′ = 2x·e^(x²)',
      '(ln g)′ = g′ / g,  napr. (ln(x² + 1))′ = 2x/(x² + 1)',
      '(sin g)′ = cos g · g′,  (cos g)′ = −sin g · g′',
      '(gⁿ)′ = n · gⁿ⁻¹ · g′,  (√g)′ = g′ / (2√g)',
    ],
    worked: {
      q: 'Zderivuj y = (x² + 1)⁵.',
      steps: [
        'Vieme: obal je „niečo na piatu“, vnútro je x² + 1. Použijeme reťazové pravidlo.',
        'Derivácia obalu: 5·(niečo)⁴, vnútro necháme: 5·(x² + 1)⁴.',
        'Derivácia vnútra: (x² + 1)′ = 2x.',
        'Vynásob: y′ = 5·(x² + 1)⁴ · 2x = 10x·(x² + 1)⁴.',
        'Kontrola v x = 1: 10·1·2⁴ = 160. Numericky ≈ 160,0 ✓. (Roznásobiť (x² + 1)⁵ a derivovať by tiež šlo, ale je to oveľa dlhšie.)',
      ],
      result: 'y′ = 10x·(x² + 1)⁴.',
    },
    deeper: 'Tri vrstvy: y = sin²(3x) = (sin(3x))². Obal: (…)², stredná vrstva: sin, vnútro: 3x. Derivácia: 2·sin(3x) · cos(3x) · 3 = 6·sin(3x)·cos(3x).\n\nPrečo sa derivácie násobia? Ak sa vnútro g mení 3-krát rýchlejšie ako x a obal f sa mení 2-krát rýchlejšie ako g, celok sa mení 2·3 = 6-krát rýchlejšie ako x. V Leibnizovom zápise to vyzerá ako krátenie zlomkov: dy/dx = (dy/dg) · (dg/dx).',
    check: {
      q: '(e^(3x))′ = ?',
      options: ['3·e^(3x)', 'e^(3x)', '3x·e^(3x − 1)', 'e³'],
      explain: 'Obal eᵘ sa nezmení, vnútro 3x má deriváciu 3. Výsledok e^(3x)·3. Odpoveď 3x·e^(3x − 1) je chybné použitie pravidla pre mocninu.',
    },
  },
  {
    title: 'Logaritmické derivovanie',
    text: 'Čo s funkciou, kde je premenná v základe aj v exponente, napríklad xˣ alebo x^(sin x)? Pravidlo (xⁿ)′ potrebuje konštantný exponent, pravidlo (aˣ)′ konštantný základ. Ani jedno tu nepasuje.\n\nTrik: rovnicu y = xˣ zlogaritmuješ. Dostaneš ln y = x·ln x, kde už exponent „zišiel dole“ a je tam obyčajný súčin. Obe strany zderivuješ podľa x. Ľavá strana je zložená funkcia (ln obal, y vnútro), takže (ln y)′ = y′/y. Nakoniec vynásobíš y.\n\nTá istá metóda zjednoduší aj derivovanie dlhých súčinov a podielov, lebo logaritmus z nich urobí súčty.',
    formula: {
      f: 'y = u^v  ⇒  ln y = v · ln u  ⇒  y′ = y · (v · ln u)′',
      what: 'Logaritmické derivovanie',
      vars: [
        ['u, v', 'funkcie premennej x (základ a exponent), u > 0'],
        ['(ln y)′', '= y′ / y podľa reťazového pravidla'],
      ],
    },
    worked: {
      q: 'Zderivuj y = xˣ (pre x > 0).',
      steps: [
        'Vieme: x je v základe aj v exponente. Použijeme logaritmické derivovanie.',
        'Zlogaritmuj: ln y = ln(xˣ) = x · ln x.',
        'Zderivuj obe strany podľa x. Ľavá: y′/y. Pravá (súčin): 1·ln x + x·(1/x) = ln x + 1.',
        'Teda y′/y = ln x + 1, odtiaľ y′ = y · (ln x + 1).',
        'Dosaď späť y = xˣ: y′ = xˣ · (ln x + 1).',
        'Kontrola v x = 2: 4·(ln 2 + 1) ≈ 6,773, numericky ≈ 6,773 ✓.',
      ],
      result: '(xˣ)′ = xˣ · (ln x + 1).',
    },
    deeper: 'Ten istý výsledok dostaneš prepisom cez exponenciálu: xˣ = e^(x·ln x). Je to zložená funkcia s obalom e^(…) a vnútrom x·ln x. Derivácia: e^(x·ln x) · (ln x + 1) = xˣ·(ln x + 1).\n\nTypická chyba: (xˣ)′ = x·xˣ⁻¹. To je pravidlo pre mocninu, ktoré platí len pre konštantný exponent. Iná chyba: (xˣ)′ = xˣ·ln x, to je pravidlo pre aˣ s konštantným základom. Správny výsledok je vlastne súčet oboch: xˣ·ln x + x·xˣ⁻¹ = xˣ(ln x + 1).',
  },
  {
    title: 'Derivácia implicitnej funkcie',
    text: 'Niekedy nie je y zadané vzorcom y = …, ale rovnicou, v ktorej sú x aj y pomiešané, napríklad kružnica x² + y² = 25. Hovoríme, že y je zadané implicitne (nepriamo). Vyjadriť y je často ťažké alebo nemožné.\n\nPostup: zderivuj celú rovnicu podľa x a predstavuj si, že y je nejaká funkcia y(x). Každý člen s y je preto zložená funkcia a za jeho deriváciu pripíšeš „krát y′“. Napríklad (y²)′ = 2y·y′. Nakoniec z rovnice vyjadríš y′.\n\nVýsledok obsahuje x aj y. Ak chceš smernicu v konkrétnom bode, dosadíš obe súradnice bodu.',
    formula: {
      f: '(y²)′ = 2y · y′     (x · y)′ = 1 · y + x · y′     (sin y)′ = cos y · y′',
      what: 'Derivovanie členov s y podľa x',
      vars: [
        ['y′', 'hľadaná derivácia dy/dx'],
        ['· y′', 'pripíšeš ku každej derivácii výrazu s y (reťazové pravidlo)'],
      ],
    },
    worked: {
      q: 'Kružnica x² + y² = 25. Vypočítaj y′ v bode A = [3, 4].',
      steps: [
        'Vieme: y je zadané implicitne, bod A leží na kružnici (9 + 16 = 25). Hľadáme: y′ v bode A.',
        'Zderivuj obe strany podľa x: 2x + 2y·y′ = 0 (pravá strana 25 je konštanta, derivácia 0).',
        'Vyjadri y′: 2y·y′ = −2x, teda y′ = −x/y.',
        'Dosaď A: y′ = −3/4.',
        'Kontrola geometriou: polomer z [0, 0] do [3, 4] má smernicu 4/3. Dotyčnica ku kružnici je kolmá na polomer, takže má smernicu −3/4 (súčin smerníc −1) ✓.',
      ],
      result: 'y′ = −x/y, v bode [3, 4] je y′ = −3/4.',
    },
    deeper: 'Pre geodetov užitočné: meridiánový rez zemským elipsoidom je elipsa x²/a² + y²/b² = 1 (a je hlavná, b vedľajšia poloos). Implicitným derivovaním: 2x/a² + 2y·y′/b² = 0, odtiaľ y′ = −b²x / (a²y). Pre a = b dostaneš opäť kružnicu a y′ = −x/y.\n\nPrečo y′ pri y²? Lebo y závisí od x. Je to rovnaké ako (g(x)²)′ = 2g(x)·g′(x), len namiesto g píšeme y.',
    check: {
      q: 'Pri implicitnom derivovaní podľa x je (y³)′ = ?',
      options: ['3y² · y′', '3y²', '3x²', '(y′)³'],
      explain: 'y je funkcia premennej x, takže y³ je zložená funkcia: derivácia obalu 3y² krát derivácia vnútra y′.',
    },
  },
  {
    title: 'Derivácia funkcie zadanej parametricky',
    text: 'Krivku môžeš zadať aj tak, že obe súradnice bodu sú funkciami pomocnej premennej t (parametra): x = φ(t), y = ψ(t). Parameter t si môžeš predstaviť ako čas: pre každý okamih t vieš, kde sa bod nachádza. Napríklad kružnica s polomerom r: x = r·cos t, y = r·sin t.\n\nSmernicu dotyčnice (dy/dx) dostaneš ako podiel: ako rýchlo sa mení y podľa t, delené tým, ako rýchlo sa mení x podľa t. Vyžaduje sa φ′(t) ≠ 0.\n\nAk hľadáš dotyčnicu v bode zadanom hodnotou t₀, vypočítaš z t₀ aj súradnice bodu x₀ = φ(t₀), y₀ = ψ(t₀).',
    analogy: 'Mravec lezie po papieri a ty si každú sekundu zapíšeš jeho polohu x a y. Sklon jeho cesty je (ako rýchlo ide hore) / (ako rýchlo ide doprava). Ak ide 3 mm/s hore a 2 mm/s doprava, sklon je 3/2.',
    formula: {
      f: 'x = φ(t),  y = ψ(t)     y′ = dy/dx = ψ′(t) / φ′(t)',
      what: 'Derivácia parametricky zadanej funkcie',
      vars: [
        ['t', 'parameter (napr. čas)'],
        ['φ′(t)', 'derivácia x podľa t (rýchlosť vo vodorovnom smere)'],
        ['ψ′(t)', 'derivácia y podľa t (rýchlosť vo zvislom smere)'],
        ['φ′(t) ≠ 0', 'inak je dotyčnica zvislá'],
      ],
    },
    worked: {
      q: 'Krivka x = t², y = t³ − 3t. Urči y′ a bod krivky pre t = 2.',
      steps: [
        'Vieme: φ(t) = t², ψ(t) = t³ − 3t. Hľadáme: y′ = ψ′(t)/φ′(t) v t = 2.',
        'φ′(t) = 2t, ψ′(t) = 3t² − 3.',
        'y′ = (3t² − 3)/(2t).',
        'Pre t = 2: y′ = (12 − 3)/4 = 9/4.',
        'Bod: x = 2² = 4, y = 8 − 6 = 2. Teda [4, 2].',
        'Dotyčnica (bonus): y − 2 = (9/4)·(x − 4).',
      ],
      result: 'y′(t) = (3t² − 3)/(2t); pre t = 2 je bod [4, 2] a smernica 9/4.',
    },
    deeper: 'Odvodenie: zmena y za malý čas dt je dy ≈ ψ′(t)·dt a zmena x je dx ≈ φ′(t)·dt. Podiel dy/dx = ψ′(t)·dt / (φ′(t)·dt) = ψ′(t)/φ′(t), dt sa vykráti.\n\nDruhá derivácia (potrebná pri konvexnosti) sa počíta tak, že prvú deriváciu y′(t) opäť zderivuješ podľa t a vydelíš φ′(t): y′′ = [y′(t)]′ / φ′(t) = (ψ′′φ′ − ψ′φ′′) / (φ′)³.',
  },
  {
    title: 'Derivácie vyšších rádov',
    text: 'Derivácia je opäť funkcia, takže ju môžeš derivovať znova. Druhá derivácia f′′ je derivácia prvej derivácie, tretia f′′′ je derivácia druhej, a tak ďalej. n-tú deriváciu značíme f⁽ⁿ⁾.\n\nDruhá derivácia hovorí, ako sa mení sklon grafu, teda o zakrivení. Ak f′′ > 0, sklon rastie a graf je prehnutý ako miska; ak f′′ < 0, je prehnutý ako kopec. To využiješ v lekcii Priebeh funkcie.\n\nUžitočné pozorovania: polynóm stupňa n má (n + 1)-vú deriváciu nulovú, lebo každým derivovaním klesne stupeň o 1. Derivácie sin x sa opakujú po štyroch krokoch: sin → cos → −sin → −cos → sin.',
    analogy: 'Auto: poloha s(t), rýchlosť v = s′ (tachometer) a zrýchlenie a = s′′ (ako ťa tlačí do sedadla). Tretia derivácia (ryv) hovorí, ako prudko sa mení zrýchlenie – preto je plynulé brzdenie príjemnejšie ako trhané.',
    formula: {
      f: 'f′′(x) = (f′(x))′     f⁽ⁿ⁾(x) = (f⁽ⁿ⁻¹⁾(x))′',
      what: 'Vyššie derivácie',
      vars: [
        ['f′′', 'druhá derivácia (zakrivenie, zrýchlenie)'],
        ['f⁽ⁿ⁾', 'n-tá derivácia, n v zátvorke, aby sa nezmýlilo s mocninou'],
      ],
    },
    worked: {
      q: 'f(x) = 2x³ − 5x² + e^(2x). Vypočítaj f′, f′′, f′′′ a hodnotu f′′(0).',
      steps: [
        'Vieme: súčet, derivujeme člen po člene. Pri e^(2x) nezabudni na vnútornú deriváciu 2.',
        'f′(x) = 6x² − 10x + 2e^(2x).',
        'f′′(x) = 12x − 10 + 4e^(2x).',
        'f′′′(x) = 12 + 8e^(2x).',
        'f′′(0) = 0 − 10 + 4·e⁰ = −10 + 4 = −6.',
        'Kontrola numericky: [f(h) − 2f(0) + f(−h)]/h² pre h = 0,0001 ≈ −6,0 ✓.',
      ],
      result: 'f′ = 6x² − 10x + 2e^(2x), f′′ = 12x − 10 + 4e^(2x), f′′′ = 12 + 8e^(2x), f′′(0) = −6.',
    },
    check: {
      q: 'f(x) = sin x. Koľko je f⁽⁴⁾(x)?',
      options: ['sin x', '−sin x', 'cos x', '−cos x'],
      explain: 'sin → cos → −sin → −cos → sin. Po štyroch derivovaniach si späť na začiatku.',
    },
  },
  {
    title: 'Dotyčnica a normála',
    text: 'Dotyčnica sa grafu dotýka v bode T = [x₀, y₀], kde y₀ = f(x₀), a má smernicu f′(x₀). Rovnicu dostaneš zo vzorca priamky danej bodom a smernicou. Normála je priamka cez ten istý bod, kolmá na dotyčnicu. Dve priamky sú kolmé, ak súčin ich smerníc je −1, preto má normála smernicu −1/f′(x₀).\n\nNa obrázku sa žltý bod kĺže po grafe a žltá úsečka je dotyčnica. V maxime (zelený bod) a minime (červený bod) je vodorovná: tam f′(x₀) = 0, dotyčnica má rovnicu y = y₀ a normála je zvislá priamka x = x₀.\n\nTypické chyby: dosadiť x₀ do f′ namiesto do f pri výpočte y₀, alebo nechať v rovnici f′(x) so všeobecným x namiesto čísla f′(x₀).',
    fig: 'extrema',
    formula: {
      f: 'dotyčnica:  y − y₀ = f′(x₀) · (x − x₀)     normála:  y − y₀ = −1/f′(x₀) · (x − x₀)',
      what: 'Rovnice dotyčnice a normály',
      vars: [
        ['x₀', 'x-ová súradnica bodu dotyku'],
        ['y₀', '= f(x₀), dosadzuješ do f, nie do f′'],
        ['f′(x₀)', 'smernica dotyčnice (číslo)'],
        ['−1/f′(x₀)', 'smernica normály (kolmej priamky)'],
      ],
    },
    worked: {
      q: 'Napíš rovnicu dotyčnice a normály ku grafu f(x) = x³ − 2x v bode x₀ = 1.',
      steps: [
        'Vieme: x₀ = 1. Hľadáme: y₀ a smernicu.',
        'y₀ = f(1) = 1 − 2 = −1. Bod dotyku T = [1, −1].',
        'f′(x) = 3x² − 2, f′(1) = 3 − 2 = 1.',
        'Dotyčnica: y − (−1) = 1·(x − 1), teda y + 1 = x − 1, y = x − 2.',
        'Normála: smernica −1/1 = −1. y + 1 = −1·(x − 1), teda y = −x.',
        'Kontrola: obe priamky prechádzajú bodom [1, −1] (1 − 2 = −1, −1 = −1) a súčin smerníc 1·(−1) = −1 ✓.',
      ],
      result: 'Dotyčnica y = x − 2, normála y = −x.',
    },
    check: {
      q: 'Smernica dotyčnice v bode je 2. Aká je smernica normály?',
      options: ['−1/2', '−2', '1/2', '2'],
      explain: 'Kolmé priamky majú súčin smerníc −1: 2 · k = −1, teda k = −1/2.',
    },
  },
  {
    title: 'Diferenciál a približný výpočet',
    text: 'Keď sa na graf pozrieš veľmi zblízka, vyzerá takmer ako priamka, ako jeho dotyčnica. Preto v blízkosti bodu x₀ môžeš funkciu nahradiť dotyčnicou: f(x₀ + Δx) ≈ f(x₀) + f′(x₀)·Δx. Funguje to tým lepšie, čím je Δx menšie.\n\nČlen f′(x₀)·dx sa volá diferenciál funkcie, značí sa df. Je to zmena výšky po dotyčnici, keď sa x zmení o dx. Skutočná zmena funkcie Δf je trochu iná, ale pre malé dx je rozdiel zanedbateľný.\n\nV geodézii sa diferenciál používa na šírenie chýb meraní: ak zmeriaš veličinu x s chybou dx, výsledok f(x) má chybu približne df = f′(x)·dx.',
    analogy: 'Zem je guľa, ale na futbalovom ihrisku ju pokojne považuješ za rovinu. Rovnako je graf funkcie „zblízka“ takmer priamka – dotyčnica. Diferenciál je výpočet na tejto „plochej mape“.',
    formula: {
      f: 'df = f′(x) · dx     f(x₀ + Δx) ≈ f(x₀) + f′(x₀) · Δx',
      what: 'Diferenciál a lineárna aproximácia',
      vars: [
        ['dx, Δx', 'malá zmena premennej x'],
        ['df', 'diferenciál: zmena po dotyčnici'],
        ['x₀', 'bod, kde hodnotu aj deriváciu poznáš presne'],
        ['d²f', '= f′′(x) · dx², diferenciál 2. rádu'],
      ],
    },
    worked: {
      q: 'Pomocou diferenciálu vypočítaj približne √4,02.',
      steps: [
        'Vieme: f(x) = √x. Blízko 4,02 je číslo 4, kde √4 = 2 vieme presne. Teda x₀ = 4, Δx = 0,02.',
        'Hľadáme: f(4 + 0,02) ≈ f(4) + f′(4)·0,02.',
        'f′(x) = 1/(2√x), f′(4) = 1/(2·2) = 1/4 = 0,25.',
        'Dosaď: √4,02 ≈ 2 + 0,25·0,02 = 2 + 0,005 = 2,005.',
        'Kontrola kalkulačkou: √4,02 = 2,004994… Chyba je len asi 0,000006 ✓.',
      ],
      result: '√4,02 ≈ 2,005.',
    },
    deeper: 'Príklad šírenia chyby: strana štvorcovej parcely a = 10 m je zmeraná s chybou da = 0,01 m. Plocha S = a², dS = 2a·da = 2·10·0,01 = 0,2 m². Plocha 100 m² je teda známa s chybou asi ±0,2 m².\n\nPrečo je odhad dobrý? Rozdiel medzi skutočnou hodnotou a dotyčnicou je úmerný (Δx)², pri Δx = 0,02 je (Δx)² = 0,0004, čo je oveľa menej ako samotné Δx. Presnejšie odhady dá Taylorov polynóm (ďalší krok).',
  },
  {
    title: 'Taylorov a Maclaurinov polynóm',
    text: 'Dotyčnica je najlepšia priamka, ktorá napodobňuje funkciu v okolí bodu x₀. Ešte lepšie ju napodobní polynóm vyššieho stupňa, ktorý má v x₀ rovnakú hodnotu, rovnakú prvú deriváciu, rovnakú druhú deriváciu atď. To je Taylorov polynóm Tₙ stupňa n. Ak x₀ = 0, volá sa Maclaurinov.\n\nNa obrázku je modrý sin x a žltý jeho Maclaurinov polynóm. S 1 členom je to priamka y = x, s 2 členmi x − x³/3! a s každým ďalším členom sedí s funkciou na dlhšom úseku. Takto počítajú hodnoty sínusu kalkulačky.\n\nVo vzorci je n! (n faktoriál) = 1·2·3·…·n, napríklad 3! = 6, 4! = 24, 5! = 120 a 0! = 1. Na skúške typicky počítaš T₂ alebo T₃ v danom bode a s ním približnú hodnotu.',
    fig: 'taylor',
    formula: {
      f: 'Tₙ(x) = f(x₀) + f′(x₀)·(x − x₀) + f′′(x₀)/2! · (x − x₀)² + … + f⁽ⁿ⁾(x₀)/n! · (x − x₀)ⁿ     eˣ ≈ 1 + x + x²/2! + x³/3!     sin x ≈ x − x³/3! + x⁵/5!     cos x ≈ 1 − x²/2! + x⁴/4!',
      what: 'Taylorov polynóm a známe Maclaurinove rozvoje',
      vars: [
        ['x₀', 'stred rozvoja (bod, kde poznáš derivácie)'],
        ['n', 'stupeň polynómu'],
        ['n!', 'faktoriál: 1·2·…·n'],
        ['Maclaurin', 'Taylorov polynóm so stredom x₀ = 0'],
      ],
    },
    worked: {
      q: 'Napíš Taylorov polynóm 2. stupňa funkcie f(x) = ln x v bode x₀ = 1 a vypočítaj ním približne ln 1,1.',
      steps: [
        'Vieme: x₀ = 1, n = 2. Hľadáme: f(1), f′(1), f′′(1).',
        'f(1) = ln 1 = 0.',
        'f′(x) = 1/x, f′(1) = 1.',
        'f′′(x) = −1/x², f′′(1) = −1.',
        'T₂(x) = 0 + 1·(x − 1) + (−1)/2! · (x − 1)² = (x − 1) − (x − 1)²/2.',
        'ln 1,1 ≈ T₂(1,1) = 0,1 − 0,01/2 = 0,1 − 0,005 = 0,095. Kalkulačka: ln 1,1 = 0,09531… ✓.',
      ],
      result: 'T₂(x) = (x − 1) − (x − 1)²/2; ln 1,1 ≈ 0,095.',
    },
    deeper: 'Prečo koeficienty f⁽ᵏ⁾(x₀)/k!? Chceme, aby polynóm mal v x₀ rovnaké derivácie ako f. Člen c·(x − x₀)ᵏ zderivovaný k-krát dá c·k! a ostatné členy v bode x₀ zmiznú. Aby k-ta derivácia vyšla f⁽ᵏ⁾(x₀), musí byť c = f⁽ᵏ⁾(x₀)/k!.\n\nPre eˣ sú všetky derivácie eˣ a v nule rovné 1, preto eˣ ≈ 1 + x + x²/2 + x³/6. Napríklad e^0,1 ≈ 1 + 0,1 + 0,005 + 0,000167 = 1,105167, presná hodnota je 1,105171.\n\nRozdiel f(x) − Tₙ(x) sa volá zvyšok Rₙ(x). Pre x blízko x₀ je malý, rádovo (x − x₀)ⁿ⁺¹.',
    check: {
      q: 'Maclaurinov polynóm 2. stupňa funkcie cos x je:',
      options: ['1 − x²/2', '1 + x²/2', 'x − x³/6', '1 − x'],
      explain: 'cos 0 = 1, (cos)′(0) = −sin 0 = 0, (cos)′′(0) = −cos 0 = −1. T₂ = 1 + 0·x − x²/2! = 1 − x²/2. x − x³/6 patrí sínusu.',
    },
  },
  {
    title: 'L’Hospitalovo pravidlo',
    text: 'Pri limite typu 0/0 alebo ∞/∞ smieš čitateľ a menovateľ zderivovať ZVLÁŠŤ a vypočítať limitu nového zlomku. Ak vyjde znova 0/0 alebo ∞/∞, pravidlo môžeš použiť opäť.\n\nNa obrázku je sin x / x, typ 0/0 v nule. L’Hospital: (sin x)′ / (x)′ = cos x / 1 → cos 0 = 1. Dostal si tú istú dôležitú limitu, ktorú body na obrázku ukazujú.\n\nTri typické chyby: 1) Zlomok derivovať podľa pravidla pre podiel. To je zle, čitateľ a menovateľ sa derivujú samostatne. 2) Použiť pravidlo aj tam, kde nie je 0/0 ani ∞/∞, napríklad pri 1/0, a dostať nezmysel. 3) Pri typoch 0·∞ alebo ∞ − ∞ zabudnúť výraz najprv prepísať na zlomok.',
    fig: 'mat:limity',
    formula: {
      f: 'lim (x→a) f(x)/g(x) = lim (x→a) f′(x)/g′(x)     (len pre typ 0/0 alebo ∞/∞)',
      what: 'L’Hospitalovo pravidlo',
      vars: [
        ['f′, g′', 'derivácia čitateľa a derivácia menovateľa, každá zvlášť'],
        ['a', 'číslo alebo ±∞'],
        ['0 · ∞', 'prepíš: f·g = f / (1/g), dostaneš 0/0 alebo ∞/∞'],
      ],
    },
    worked: {
      q: 'Vypočítaj lim (x→0) (1 − cos x)/x².',
      steps: [
        'Vieme: dosadenie dá (1 − 1)/0 = 0/0. Môžeme použiť L’Hospitala.',
        'Derivuj čitateľ: (1 − cos x)′ = sin x. Derivuj menovateľ: (x²)′ = 2x.',
        'Nová limita: lim sin x / (2x). Dosadenie dá znova 0/0.',
        'Ešte raz: (sin x)′ = cos x, (2x)′ = 2. Limita cos x / 2 → cos 0 / 2 = 1/2.',
        'Kontrola kalkulačkou (RAD): x = 0,01 dá (1 − cos 0,01)/0,0001 ≈ 0,499996 ✓.',
      ],
      result: 'lim (x→0) (1 − cos x)/x² = 1/2.',
    },
    deeper: 'Typ 0·∞: lim (x→0⁺) x·ln x. Prepíš na zlomok: ln x / (1/x), to je typ −∞/∞. L’Hospital: (1/x) / (−1/x²) = −x → 0. Kontrola: 0,001·ln 0,001 ≈ −0,0069, naozaj blízko 0.\n\nPrečo pravidlo funguje? Pri 0/0 v bode a platí f(a) = g(a) = 0. Pre x blízko a je f(x) ≈ f′(a)·(x − a) a g(x) ≈ g′(a)·(x − a) (diferenciál). Podiel je približne f′(a)/g′(a), lebo (x − a) sa vykráti.\n\nPomocou L’Hospitala sa dá ukázať aj poradie rastu: lim (x→∞) x/eˣ = lim 1/eˣ = 0, teda eˣ rastie rýchlejšie ako x.',
    check: {
      q: 'Kedy NEsmieš použiť L’Hospitalovo pravidlo?',
      options: ['Pri lim (x→0) (x + 1)/x, lebo to nie je 0/0 ani ∞/∞', 'Pri lim (x→0) sin x / x', 'Pri lim (x→∞) eˣ / x', 'Pri lim (x→0) (eˣ − 1)/x'],
      explain: '(x + 1)/x dá po dosadení 1/0, teda ±∞ (podľa strany). L’Hospital by nesprávne dal 1/1 = 1. Ostatné sú typu 0/0 alebo ∞/∞.',
    },
  },
  {
    title: 'Zhrnutie: derivácie',
    text: 'Derivácia je smernica dotyčnice a rýchlosť zmeny funkcie. V praxi ju takmer nikdy nepočítaš z definície, ale tabuľkou a pravidlami. Najviac bodov sa na skúške stráca pri reťazovom pravidle a pri znamienkach.\n\nKaždý výsledok sa dá overiť: dosaď konkrétne číslo a porovnaj s [f(x + 0,001) − f(x − 0,001)] / 0,002 na kalkulačke.',
    bullets: [
      'f′(x₀) = lim (h→0) [f(x₀ + h) − f(x₀)]/h; f′ > 0 rastie, f′ < 0 klesá, f′ = 0 vodorovná dotyčnica.',
      'Tabuľka: (xⁿ)′ = n·xⁿ⁻¹, (eˣ)′ = eˣ, (ln x)′ = 1/x, (sin x)′ = cos x, (cos x)′ = −sin x, (arctg x)′ = 1/(1 + x²).',
      '(u·v)′ = u′v + uv′,  (u/v)′ = (u′v − uv′)/v².',
      'Zložená: derivácia obalu (vnútro nechaj) KRÁT derivácia vnútra.',
      'xˣ a podobné: zlogaritmuj, zderivuj, vynásob y. (xˣ)′ = xˣ(ln x + 1).',
      'Implicitná: derivuj rovnicu podľa x, pri členoch s y pripíš ·y′, vyjadri y′.',
      'Parametrická: y′ = ψ′(t)/φ′(t).',
      'Dotyčnica: y − f(x₀) = f′(x₀)(x − x₀); normála so smernicou −1/f′(x₀).',
      'Diferenciál: f(x₀ + Δx) ≈ f(x₀) + f′(x₀)·Δx; Taylor: Tₙ = Σ f⁽ᵏ⁾(x₀)/k! · (x − x₀)ᵏ.',
      'L’Hospital len pri 0/0 alebo ∞/∞; čitateľ a menovateľ derivuj ZVLÁŠŤ.',
    ],
  },
];

export default steps;
