import type { Step } from '../steps';

// Matematika 1, cvičenie „K prednáške 10“ (5. týždeň) a prednáška Elementárne funkcie, s. 4–23:
// delenie polynómov, Hornerova schéma, korene a rozklad na súčin, parciálne zlomky.
// Príklady sú z hárku K_prednaske_10.pdf (riešenia cvičiacej), aby sedeli s tým, čo bude na písomke.

const steps: Step[] = [
  {
    title: 'Čo je polynóm',
    text: 'Polynóm (mnohočlen) je súčet mocnín x, pred každou je číslo. Napríklad P(x) = x³ − x² − 8x + 12. Čísla pred mocninami sa volajú koeficienty, najvyššia mocnina je stupeň polynómu.\n\nKoreň polynómu je číslo, po ktorého dosadení vyjde nula. Pre P(x) = x³ − x² − 8x + 12 je to napríklad x = 2, lebo 8 − 4 − 16 + 12 = 0.\n\nKeď poznáš koreň a, polynóm sa dá napísať ako (x − a) krát polynóm o stupeň menší. Výraz (x − a) sa volá koreňový činiteľ. Celá táto lekcia je o tom, ako ten menší polynóm nájsť a ako takto rozložiť polynóm na súčin.',
    analogy: 'Ako pri číslach: 12 = 2·6 = 2·2·3. Polynóm tiež rozkladáme na „prvočinitele“, len tie sú tvaru (x − a) alebo nerozložiteľné kvadratické zátvorky.',
    formula: {
      f: 'P(x) = aₙxⁿ + aₙ₋₁xⁿ⁻¹ + … + a₁x + a₀,   aₙ ≠ 0',
      what: 'Polynóm n-tého stupňa',
      vars: [
        ['x', 'premenná, za ňu dosádzaš čísla'],
        ['aₙ, …, a₀', 'koeficienty: čísla pred mocninami (aj 0, ak mocnina chýba)'],
        ['aₙ', 'vedúci koeficient: číslo pri najvyššej mocnine, nesmie byť 0'],
        ['n', 'stupeň: najvyššia mocnina x'],
        ['a₀', 'absolútny člen: číslo bez x'],
      ],
    },
    bullets: [
      'Koreň: P(a) = 0.',
      'Koreňový činiteľ: (x − a). Pozor, pre koreň −3 je to (x + 3).',
      'Polynóm stupňa n má najviac n reálnych koreňov.',
      'Nepárny stupeň ⇒ aspoň jeden reálny koreň.',
    ],
    check: {
      q: 'Číslo −3 je koreňom polynómu P. Aký je jeho koreňový činiteľ?',
      options: ['(x + 3)', '(x − 3)', '(3x)', '(x − 1/3)'],
      explain: 'Koreňový činiteľ je (x − a). Pre a = −3: x − (−3) = x + 3. Skúška: x + 3 = 0 práve pre x = −3.',
    },
  },
  {
    title: 'Delenie polynómov pod sebou',
    text: 'Polynómy sa delia rovnako ako čísla pri písomnom delení. Vždy sa pozeráš len na NAJVYŠŠIU mocninu.\n\n1. Vydeľ najvyšší člen delenca najvyšším členom deliteľa. To je prvý člen výsledku.\n2. Týmto členom vynásob celého deliteľa a výsledok napíš pod delenca.\n3. Odčítaj (pozor, mení sa znamienko každého člena).\n4. So zvyškom opakuj, kým má zvyšok menší stupeň ako deliteľ.\n\nAk zvyšok nie je 0, pripíšeš ho na koniec ako zlomok: zvyšok / deliteľ.',
    formula: {
      f: 'P(x) : Q(x) = S(x) + R(x) / Q(x)',
      what: 'Delenie so zvyškom',
      vars: [
        ['P(x)', 'delenec: čo delíš'],
        ['Q(x)', 'deliteľ: čím delíš'],
        ['S(x)', 'podiel (výsledok bez zlomku)'],
        ['R(x)', 'zvyšok, má menší stupeň ako Q(x)'],
      ],
    },
    worked: {
      q: 'Príklad 1a z cvičenia: vydeľ (x³ − 1) : (x + 1).',
      steps: [
        'Doplň chýbajúce mocniny nulami: x³ + 0x² + 0x − 1. Inak sa ti pomiešajú stĺpce.',
        'x³ : x = x². Vynásob: x²·(x + 1) = x³ + x². Odčítaj: (x³ + 0x²) − (x³ + x²) = −x².',
        'Zvyšok −x² + 0x − 1. −x² : x = −x. Vynásob: −x·(x + 1) = −x² − x. Odčítaj: 0x − (−x) = x.',
        'Zvyšok x − 1. x : x = 1. Vynásob: 1·(x + 1) = x + 1. Odčítaj: −1 − 1 = −2.',
        'Zvyšok −2 má stupeň 0, menší ako deliteľ (stupeň 1). Končíme.',
        'Skúška: (x + 1)(x² − x + 1) − 2 = x³ + 1 − 2 = x³ − 1. Sedí.',
      ],
      result: '(x³ − 1) : (x + 1) = x² − x + 1 − 2/(x + 1)',
    },
    deeper: 'Prečo sa delí len najvyšší člen? Lebo chceš, aby po odčítaní najvyššia mocnina zmizla. Každý krok tak zníži stupeň zvyšku aspoň o 1 a delenie raz skončí.\n\nPorovnaj s číslami: 17 : 5 = 3, zvyšok 2, teda 17/5 = 3 + 2/5. Pri polynómoch je to presne to isté, len namiesto číslic máš mocniny x.',
    check: {
      q: 'Koľko je (x³ − 1) : (x − 1)?',
      options: ['x² + x + 1', 'x² − x + 1', 'x² + 1', 'x² + x + 1 − 2/(x − 1)'],
      explain: 'Príklad 1b z cvičenia. (x − 1)(x² + x + 1) = x³ + x² + x − x² − x − 1 = x³ − 1, zvyšok je 0. Preto je 1 koreňom x³ − 1.',
    },
  },
  {
    title: 'Hornerova schéma: rýchle delenie (x − a)',
    text: 'Keď delíš polynóm dvojčlenom (x − a), nemusíš písať celé delenie. Stačí tabuľka s koeficientmi, tomu sa hovorí Hornerova schéma.\n\n1. Do horného riadku napíš VŠETKY koeficienty od najvyššej mocniny (chýbajúcu mocninu nahraď 0).\n2. Vľavo napíš číslo a, ktoré skúšaš.\n3. Prvý koeficient len „zhoď“ dolu.\n4. Opakuj: číslo dole vynásob a, výsledok pripíš k ďalšiemu koeficientu hore a sčítaj. Súčet napíš dole.\n5. Posledné číslo dole je zvyšok. Ak je 0, číslo a je koreň.\n\nČísla dole (okrem posledného) sú koeficienty podielu, ktorý má o stupeň menej.',
    analogy: 'Je to ako výťah: číslo dole „vyveziem“ (krát a) o poschodie vyššie do ďalšieho stĺpca, tam ho prirátam a výsledok zase spustím dolu.',
    formula: {
      f: 'bₙ₋₁ = aₙ,   bₖ₋₁ = aₖ + a·bₖ,   zvyšok = a₀ + a·b₀ = P(a)',
      what: 'Hornerova schéma pre delenie (x − a)',
      vars: [
        ['aₖ', 'koeficienty polynómu (horný riadok)'],
        ['a', 'skúšané číslo (kandidát na koreň), píše sa vľavo'],
        ['bₖ', 'čísla v dolnom riadku = koeficienty podielu'],
        ['P(a)', 'posledné číslo dole: zvyšok a zároveň hodnota polynómu v a'],
      ],
    },
    worked: {
      q: 'Príklad 2a z cvičenia: x³ − x² − 8x + 12. Skús a = 2.',
      steps: [
        'Horný riadok: 1 | −1 | −8 | 12. Vľavo 2.',
        'Zhoď 1.',
        '2·1 = 2, −1 + 2 = 1.',
        '2·1 = 2, −8 + 2 = −6.',
        '2·(−6) = −12, 12 + (−12) = 0. Zvyšok 0, takže 2 je koreň.',
        'Dolný riadok 1 | 1 | −6 sú koeficienty podielu x² + x − 6.',
      ],
      result: 'x³ − x² − 8x + 12 = (x − 2)(x² + x − 6)',
    },
    check: {
      q: 'V Hornerovej schéme vyšlo posledné číslo dole 8. Čo to znamená?',
      options: ['a nie je koreň, P(a) = 8', 'a je koreň', 'podiel je 8', 'polynóm má stupeň 8'],
      explain: 'Posledné číslo je zvyšok po delení (x − a), a ten je rovný P(a). Koreň je len pri zvyšku 0. Presne tak si cvičiaca na hárku overovala kandidátov: 1³ − 1 − 8 + 12 = 4 ≠ 0.',
    },
  },
  {
    title: 'Ktoré čísla skúšať',
    text: 'Nemusíš skúšať náhodné čísla. Ak má polynóm celé koeficienty a vedúci koeficient je 1, každý celočíselný koreň DELÍ absolútny člen a₀.\n\nPre x³ − x² − 8x + 12 je a₀ = 12, takže kandidáti sú ±1, ±2, ±3, ±4, ±6, ±12. Na hárku to cvičiaca píše ako ±1, ±2, ±3, ±4 …\n\nZačni od malých čísel. Rýchla kontrola dosadením: P(1) = 1 − 1 − 8 + 12 = 4, nie je koreň. P(2) = 8 − 4 − 16 + 12 = 0, je koreň.',
    formula: {
      f: 'a je celočíselný koreň  ⇒  a delí a₀',
      what: 'Kandidáti na korene (vedúci koeficient 1)',
      vars: [
        ['a₀', 'absolútny člen (číslo bez x)'],
        ['±', 'skúšaj kladné aj záporné delitele'],
      ],
    },
    deeper: 'Prečo? Ak a je koreň, tak aⁿ + … + a₁·a + a₀ = 0, teda a₀ = −a·(aⁿ⁻¹ + … + a₁). Pravá strana je a krát celé číslo, takže a delí a₀.\n\nAk vedúci koeficient nie je 1, kandidáti sú zlomky p/q: p delí a₀ a q delí aₙ. Napríklad pre 2x² − x − 1 sú to ±1, ±1/2.',
    worked: {
      q: 'Kandidáti na celé korene x⁴ + 6x³ + 14x² + 18x + 9 (príklad 2d)?',
      steps: [
        'Vedúci koeficient je 1, absolútny člen a₀ = 9.',
        'Delitele 9: 1, 3, 9.',
        'Všetky koeficienty sú kladné, takže pre kladné x je P(x) > 0. Kladné čísla koreňmi byť nemôžu.',
        'Zostáva skúšať −1, −3, −9.',
      ],
      result: 'Kandidáti −1, −3, −9 (cvičiaca píše ±1, ±3, ±9).',
    },
    check: {
      q: 'Kandidáti na celé korene x³ − 5x² + 8x − 4 sú…',
      options: ['±1, ±2, ±4', '±1, ±5, ±8', 'len 1 a 4', '±1, ±2, ±3, ±4, ±5'],
      explain: 'Absolútny člen je −4, jeho delitele sú 1, 2, 4, so znamienkami ±. Koreň 1: 1 − 5 + 8 − 4 = 0 ✓.',
    },
  },
  {
    title: 'Rozklad na súčin: opakovaný Horner',
    text: 'Keď nájdeš koreň, pokračuješ s MENŠÍM polynómom z dolného riadku. Skúšaš znova, kým ti neostane kvadratický polynóm. Ten dorobíš cez diskriminant alebo ďalším Hornerom.\n\nTo isté číslo môžeš skúsiť aj druhýkrát. Ak vyjde zvyšok 0 znova, je to dvojnásobný koreň a (x − a) bude v rozklade dvakrát.\n\nNa konci vždy urob skúšku: dosaď jeden koreň do pôvodného polynómu. Cvičiaca to robí na každom príklade („sk:“).',
    worked: {
      q: 'Príklad 2a: dokonči rozklad x³ − x² − 8x + 12 = (x − 2)(x² + x − 6).',
      steps: [
        'Pokračuj s x² + x − 6, koeficienty 1 | 1 | −6. Skús znova a = 2.',
        'Zhoď 1. 2·1 = 2, 1 + 2 = 3. 2·3 = 6, −6 + 6 = 0. Zvyšok 0, takže 2 je koreň aj druhýkrát.',
        'Dolný riadok 1 | 3 znamená x + 3.',
        'Skúška koreňa −3 v pôvodnom polynóme: (−3)³ − (−3)² − 8·(−3) + 12 = −27 − 9 + 24 + 12 = 0 ✓.',
      ],
      result: 'x³ − x² − 8x + 12 = (x − 2)(x − 2)(x + 3) = (x − 2)²(x + 3)',
    },
    bullets: [
      'Zvyšok 0 → zapíš (x − a) a pokračuj s dolným riadkom.',
      'Zvyšok ≠ 0 → skús ďalšieho kandidáta (s tým istým polynómom).',
      'Ostane x² + px + q → diskriminant D = p² − 4q.',
      'D < 0 → kvadratická zátvorka je nerozložiteľná, nechaj ju tak.',
    ],
    check: {
      q: 'Rozklad x³ − 5x² + 8x − 4 (príklad 2b) je…',
      options: ['(x − 1)(x − 2)²', '(x + 1)(x + 2)²', '(x − 1)²(x − 2)', '(x − 1)(x − 2)(x − 4)'],
      explain: 'Horner s 1: 1 | −4 | 4 | 0, teda (x − 1)(x² − 4x + 4). Horner s 2: 1 | −2 | 0, teda (x − 2)(x − 2). Spolu (x − 1)(x − 2)².',
    },
  },
  {
    title: 'Pozor na chýbajúcu mocninu',
    text: 'Najčastejšia chyba v Hornerovej schéme: vynecháš nulový koeficient. Ak v polynóme chýba napríklad x², musíš do horného riadku napísať 0, inak sa všetky čísla posunú a výsledok je zlý.\n\nHornerova schéma funguje aj vtedy, keď a NIE JE koreň. Dostaneš podiel a zvyšok, rovnako ako pri delení pod sebou, len rýchlejšie. Pri delení (x + 4) píšeš vľavo −4, lebo x + 4 = x − (−4).',
    worked: {
      q: 'Príklad 1d z cvičenia: (x⁵ + x⁴ + 2x³ − 3x² − 7) : (x + 4).',
      steps: [
        'Chýba x¹, preto horný riadok: 1 | 1 | 2 | −3 | 0 | −7. Vľavo −4.',
        'Zhoď 1. (−4)·1 = −4, 1 − 4 = −3.',
        '(−4)·(−3) = 12, 2 + 12 = 14.',
        '(−4)·14 = −56, −3 − 56 = −59.',
        '(−4)·(−59) = 236, 0 + 236 = 236.',
        '(−4)·236 = −944, −7 − 944 = −951. Zvyšok −951.',
      ],
      result: 'x⁴ − 3x³ + 14x² − 59x + 236 − 951/(x + 4)',
    },
    check: {
      q: 'Horný riadok Hornerovej schémy pre x⁴ − 4x³ + 16x − 16 je…',
      options: ['1 | −4 | 0 | 16 | −16', '1 | −4 | 16 | −16', '−4 | 16 | −16', '1 | 4 | 0 | 16 | 16'],
      explain: 'Mocnina x² chýba, jej koeficient je 0. Polynóm 4. stupňa má vždy 5 koeficientov.',
    },
  },
  {
    title: 'Trojnásobný koreň a nerozložiteľná zátvorka',
    text: 'Dva príklady z hárku ukazujú, čo sa môže stať na konci rozkladu.\n\nV príklade 2c vyjde koreň 2 trikrát po sebe. V príklade 2d ostane kvadratická zátvorka so zápornou diskriminantou, tá už v reálnych číslach rozložiť nejde, a tak ju v rozklade necháš celú.',
    worked: {
      q: 'Príklad 2c: x⁴ − 4x³ + 16x − 16. Príklad 2d: x⁴ + 6x³ + 14x² + 18x + 9.',
      steps: [
        '2c, a = 2: 1 | −4 | 0 | 16 | −16 → 1 | −2 | −4 | 8 | 0. Koreň, ostáva x³ − 2x² − 4x + 8.',
        '2c, a = 2 znova: 1 | 0 | −4 | 0. Ostáva x² − 4 = (x − 2)(x + 2).',
        '2c spolu: (x − 2)(x − 2)(x − 2)(x + 2) = (x − 2)³(x + 2).',
        '2d, a = −1: 1 | 6 | 14 | 18 | 9 → 1 | 5 | 9 | 9 | 0. Koreň, ostáva x³ + 5x² + 9x + 9.',
        '2d, a = −3: 1 | 5 | 9 | 9 → 1 | 2 | 3 | 0. Koreň, ostáva x² + 2x + 3.',
        'D = 2² − 4·1·3 = 4 − 12 = −8 < 0. Zátvorka je nerozložiteľná.',
      ],
      result: '2c: (x − 2)³(x + 2).   2d: (x + 1)(x + 3)(x² + 2x + 3).',
    },
    check: {
      q: 'Ostal ti polynóm x² + 2x + 3. Čo s ním?',
      options: ['Nechám ho tak, D < 0', 'Rozložím na (x + 1)(x + 3)', 'Rozložím na (x − 1)(x − 3)', 'Musím ho ešte deliť Hornerom'],
      explain: 'D = 4 − 12 = −8, reálne korene nemá. (x + 1)(x + 3) = x² + 4x + 3, to je iný polynóm.',
    },
  },
  {
    title: 'Parciálne zlomky: načo sú',
    text: 'Keď sčítaš zlomky, dostaneš jeden veľký zlomok: 1/(x − 3) + 1/(x − 2) = (2x − 5)/((x − 3)(x − 2)). Rozklad na parciálne zlomky je OPAČNÝ postup: veľký zlomok rozbiješ späť na jednoduché kúsky.\n\nBude sa ti to hodiť pri integráloch, lebo jednoduché zlomky A/(x − a) sa integrujú ľahko.\n\nPostup:\n1. Skontroluj, že čitateľ má MENŠÍ stupeň ako menovateľ (rýdzo racionálna funkcia). Ak nie, najprv vydeľ.\n2. Rozlož menovateľ na súčin (Horner, vzorce).\n3. Ku každému činiteľu napíš jeden zlomok s neznámou A, B, C …\n4. Neznáme vypočítaj.',
    formula: {
      f: 'P(x) / ((x − a)(x − b)) = A/(x − a) + B/(x − b)',
      what: 'Rozklad pre dva rôzne lineárne činitele',
      vars: [
        ['P(x)', 'čitateľ, stupeň menší ako menovateľ'],
        ['(x − a), (x − b)', 'činitele menovateľa'],
        ['A, B', 'neznáme čísla, ktoré hľadáš'],
      ],
    },
    bullets: [
      '(x − a) → A/(x − a)',
      '(x − a)² → A/(x − a) + B/(x − a)²',
      'x² + px + q s D < 0 → (Bx + C)/(x² + px + q)',
    ],
    check: {
      q: 'Ako vyzerá rozklad pre 1/(x³ − x)?',
      options: ['A/x + B/(x − 1) + C/(x + 1)', 'A/(x³ − x)', 'A/x + B/x²', '(Ax + B)/(x² − 1)'],
      explain: 'x³ − x = x(x² − 1) = x(x − 1)(x + 1). Tri rôzne lineárne činitele, tri zlomky (príklad 3c z cvičenia).',
    },
  },
  {
    title: 'Parciálne zlomky: porovnanie koeficientov',
    text: 'Takto to robí cvičiaca na hárku. Zlomky vpravo daj na spoločný menovateľ. Menovatele sú na oboch stranách rovnaké, takže sa musia rovnať aj čitatele.\n\nRoznásob a zoskup podľa mocnín x. Koeficient pri x vľavo sa musí rovnať koeficientu pri x vpravo, a rovnako absolútne členy. Dostaneš sústavu rovníc pre A a B.',
    worked: {
      q: 'Príklad 3a: rozlož (2x − 5)/(x² − 5x + 6).',
      steps: [
        'Menovateľ: x² − 5x + 6 = (x − 3)(x − 2) (korene 3 a 2, súčin 6, súčet 5).',
        '(2x − 5)/((x − 3)(x − 2)) = A/(x − 3) + B/(x − 2).',
        'Spoločný menovateľ: A(x − 2) + B(x − 3) = 2x − 5.',
        'Roznásob: Ax − 2A + Bx − 3B = x(A + B) + (−2A − 3B).',
        'Porovnaj: pri x: A + B = 2. Absolútny člen: −2A − 3B = −5.',
        'Z prvej A = 2 − B. Dosaď: −2(2 − B) − 3B = −5 → −4 + 2B − 3B = −5 → −B = −1 → B = 1, A = 1.',
        'Skúška: 1/(x − 3) + 1/(x − 2) = (x − 2 + x − 3)/((x − 3)(x − 2)) = (2x − 5)/(…) ✓.',
      ],
      result: '(2x − 5)/(x² − 5x + 6) = 1/(x − 3) + 1/(x − 2)',
    },
    check: {
      q: 'Z porovnania vyšlo A + B = 0 a −7A − 2B = 5. Koľko je A?',
      options: ['−1', '1', '5', '0'],
      explain: 'Príklad 3b: B = −A, dosadením −7A + 2A = 5 → −5A = 5 → A = −1, B = 1. Výsledok 5/((x − 2)(x − 7)) = −1/(x − 2) + 1/(x − 7).',
    },
  },
  {
    title: 'Rýchlejšie: dosadenie koreňov',
    text: 'Keď sú činitele rôzne a lineárne, existuje skratka. Do rovnice čitateľov dosaď za x korene menovateľa. Vždy vypadnú všetky neznáme okrem jednej.\n\nEšte rýchlejšie je „zakrývacie pravidlo“: A pri (x − a) dostaneš tak, že v pôvodnom zlomku zakryješ prstom (x − a) a do zvyšku dosadíš x = a.\n\nVýsledok je ten istý ako pri porovnávaní koeficientov, len bez sústavy rovníc. Na písomke môžeš použiť ktorýkoľvek spôsob.',
    formula: {
      f: 'A = [P(x) / ostatné činitele] pre x = a',
      what: 'Zakrývacie pravidlo pre A/(x − a)',
      vars: [
        ['a', 'koreň činiteľa (x − a), ku ktorému patrí A'],
        ['ostatné činitele', 'menovateľ bez (x − a)'],
      ],
    },
    worked: {
      q: 'Príklad 3c: rozlož 1/(x³ − x) = A/x + B/(x − 1) + C/(x + 1).',
      steps: [
        'Menovateľ: x³ − x = x(x − 1)(x + 1).',
        'A (zakry x, dosaď x = 0): 1/((0 − 1)(0 + 1)) = 1/(−1) = −1.',
        'B (zakry x − 1, dosaď x = 1): 1/(1·(1 + 1)) = 1/2.',
        'C (zakry x + 1, dosaď x = −1): 1/((−1)·(−1 − 1)) = 1/2.',
        'Kontrola koeficientom pri x²: A + B + C = −1 + 1/2 + 1/2 = 0. Vľavo x² nie je, sedí.',
      ],
      result: '1/(x³ − x) = −1/x + (1/2)/(x − 1) + (1/2)/(x + 1)',
    },
    check: {
      q: '(x + 5)/((x − 3)(x + 1)) = A/(x − 3) + B/(x + 1). Koľko je A?',
      options: ['2', '−1', '8', '1/2'],
      explain: 'Zakry (x − 3), dosaď x = 3: (3 + 5)/(3 + 1) = 8/4 = 2. B: x = −1: 4/(−4) = −1. Je to príklad z prednášky: 2/(x − 3) − 1/(x + 1).',
    },
  },
  {
    title: 'Kvadratický činiteľ: (Bx + C)',
    text: 'Ak menovateľ obsahuje kvadratickú zátvorku, ktorá sa nedá rozložiť (D < 0), patrí k nej zlomok s LINEÁRNYM čitateľom: (Bx + C)/(x² + px + q). Len konštanta by nestačila.\n\nNajprv vypočítaj A dosadením koreňa lineárneho činiteľa, potom B a C porovnaním koeficientov.',
    worked: {
      q: 'Príklad 3d: rozlož 1/(x³ − 1).',
      steps: [
        'Menovateľ: x³ − 1 = (x − 1)(x² + x + 1) (Horner s 1 alebo príklad 1b). Pre x² + x + 1 je D = 1 − 4 < 0.',
        '1/((x − 1)(x² + x + 1)) = A/(x − 1) + (Bx + C)/(x² + x + 1).',
        'Čitatele: 1 = A(x² + x + 1) + (Bx + C)(x − 1).',
        'x = 1: 1 = A·3, teda A = 1/3.',
        'Pri x²: 0 = A + B, teda B = −1/3.',
        'Absolútny člen: 1 = A − C, teda C = 1/3 − 1 = −2/3.',
      ],
      result: '1/(x³ − 1) = (1/3)/(x − 1) − ((1/3)x + 2/3)/(x² + x + 1)',
    },
    check: {
      q: 'Aký zlomok patrí k činiteľu x² + 1 v rozklade?',
      options: ['(Bx + C)/(x² + 1)', 'B/(x² + 1)', 'B/(x + 1) + C/(x − 1)', 'Bx²/(x² + 1)'],
      explain: 'x² + 1 nemá reálne korene (D = −4), je nerozložiteľný. K nemu patrí lineárny čitateľ Bx + C.',
    },
  },
  {
    title: 'Opakovaný činiteľ a nerýdzi zlomok',
    text: 'Ak je v menovateli činiteľ dvakrát, napríklad x², potrebuješ dva zlomky: A/x + B/x². Pri trojnásobnom tri, a tak ďalej.\n\nAk má čitateľ rovnaký alebo VÄČŠÍ stupeň ako menovateľ, parciálne zlomky hneď nejdú. Najprv polynómy vydeľ (krok 2 tejto lekcie), dostaneš polynóm plus rýdzi zlomok, a až ten rozkladáš.',
    worked: {
      q: 'Rozlož (2x² + 1)/(x³ + x²) a (x² + 3)/(x² − 1).',
      steps: [
        'Prvý: x³ + x² = x²(x + 1), činiteľ x je dvakrát → A/x + B/x² + C/(x + 1).',
        '2x² + 1 = A·x(x + 1) + B(x + 1) + C·x². x = 0: 1 = B. x = −1: 3 = C. Pri x²: 2 = A + C, teda A = −1.',
        'Výsledok: −1/x + 1/x² + 3/(x + 1). Skúška: −x² − x + x + 1 + 3x² = 2x² + 1 ✓.',
        'Druhý: čitateľ aj menovateľ majú stupeň 2, najprv deľ: (x² + 3) : (x² − 1) = 1, zvyšok 4.',
        'Takže 1 + 4/(x² − 1) = 1 + 4/((x − 1)(x + 1)). Zakrývanie: pri x = 1: 4/2 = 2, pri x = −1: 4/(−2) = −2.',
      ],
      result: '−1/x + 1/x² + 3/(x + 1)   a   1 + 2/(x − 1) − 2/(x + 1)',
    },
    check: {
      q: 'Čo urobíš ako prvé s (x³ + 2)/(x² − 4)?',
      options: ['Vydelím čitateľa menovateľom', 'Hneď napíšem A/(x − 2) + B/(x + 2)', 'Zderivujem', 'Vynásobím menovateľom'],
      explain: 'Stupeň čitateľa (3) je väčší ako menovateľa (2). Rozklad funguje len pre rýdzi zlomok, preto najprv delenie.',
    },
  },
  {
    title: 'Zhrnutie na písomku',
    text: 'Na hárku k prednáške 10 sú tri typy úloh. Pravdepodobne práve takéto budú na ďalšej písomke (jeden príklad).',
    bullets: [
      '1. Delenie polynómov: doplň nuly za chýbajúce mocniny, deľ najvyšší člen, skúška násobením.',
      '2. Horner: koeficienty hore, kandidát vľavo (delitele a₀), zhoď, krát a, sčítaj. Posledné číslo = zvyšok = P(a).',
      '   Zvyšok 0 → koreň → pokračuj s dolným riadkom. Na konci D pre kvadratickú zátvorku.',
      '   Pri (x + 4) píš vľavo −4.',
      '3. Parciálne zlomky: rýdzi? (inak deľ) → rozlož menovateľ → zlomky A, B, (Bx + C) → dosadenie koreňov / porovnanie koeficientov → skúška.',
      'Výsledok vždy skontroluj dosadením alebo spätným sčítaním.',
    ],
  },
];

export default steps;
