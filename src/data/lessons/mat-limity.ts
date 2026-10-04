import type { Step } from '../steps';

// Matematika 1, prednáška 6: Spojitosť a limita funkcie, asymptoty funkcie.

const steps: Step[] = [
  {
    title: 'Čo je limita?',
    text: 'Limita odpovedá na otázku: ku ktorému číslu sa blížia hodnoty f(x), keď sa x blíži k číslu a? Zapisujeme lim (x→a) f(x) = L a čítame „limita f(x) pre x idúce k a sa rovná L“. Dôležité: nezaujíma nás hodnota PRIAMO v bode a, len to, čo sa deje v jeho tesnej blízkosti. Funkcia v bode a nemusí byť vôbec definovaná.\n\nNa obrázku je f(x) = sin x / x. V nule ju vypočítať nevieš, vyšlo by 0/0 (prázdny krúžok). Ružové body sa však pri x → 0 zľava aj sprava jasne blížia k výške 1. Preto lim (x→0) sin x / x = 1.\n\nOveriť si to môžeš kalkulačkou v radiánoch: sin 0,1 / 0,1 ≈ 0,9983 a sin 0,01 / 0,01 ≈ 0,99998. Čím bližšie k nule, tým bližšie k 1, hoci samotnú jednotku pre žiadne x ≠ 0 presne nedostaneš.',
    analogy: 'Ideš k dverám a každým krokom prejdeš polovicu zostávajúcej vzdialenosti. Dverí sa nikdy nedotkneš, ale je úplne jasné, KAM sa blížiš. Limita je miesto, kam smeruješ, nie miesto, kde práve stojíš.',
    fig: 'mat:limity',
    formula: {
      f: 'lim (x→a) f(x) = L',
      what: 'Zápis limity',
      vars: [
        ['lim', 'limes, latinsky „hranica“'],
        ['x → a', 'x sa blíži k číslu a, ale nikdy sa mu nerovná'],
        ['L', 'hodnota limity (môže byť aj +∞ alebo −∞)'],
        ['a', 'môže byť číslo alebo aj +∞, −∞ (limita v nekonečne)'],
      ],
    },
    deeper: 'Presná definícia znie: lim (x→a) f(x) = L, ak hodnoty f(x) budú ľubovoľne blízko L (bližšie ako akékoľvek zvolené malé číslo ε), pokiaľ je x dostatočne blízko a (bližšie ako nejaké δ), pričom x ≠ a.\n\nInými slovami: ak mi povieš „chcem, aby sa f(x) líšilo od L menej ako o 0,001“, ja ti vždy viem povedať, ako blízko k a musí byť x. Na skúške túto definíciu prakticky nepoužiješ, ale vysvetľuje, prečo nás hodnota f(a) nezaujíma.',
  },
  {
    title: 'Prvý krok vždy: dosaď',
    text: 'Elementárne funkcie (polynómy, zlomky, odmocniny, eˣ, ln, sin, cos…) a všetko, čo z nich poskladáš, sú spojité v každom bode svojho definičného oboru. Pre spojitú funkciu je limita rovná obyčajnej funkčnej hodnote. Prvý krok pri každej limite je preto jednoduchý: skús dosadiť.\n\nAk po dosadení vyjde normálne číslo, máš hotovo. Ak vyjde niečo ako 0/0, ∞/∞ alebo 5/0, dosadenie nestačí a treba pokračovať ďalšími technikami z tejto lekcie.\n\nLimity sa dajú sčítať, odčítať, násobiť a deliť po častiach, ak čiastkové limity existujú (a pri delení menovateľ nemá limitu 0). Preto môžeš veľké výrazy rozdeliť na menšie kúsky.',
    formula: {
      f: 'lim (f ± g) = lim f ± lim g     lim (f · g) = lim f · lim g     lim (f / g) = lim f / lim g,  ak lim g ≠ 0',
      what: 'Počítanie s limitami',
      vars: [
        ['lim f, lim g', 'limity jednotlivých častí v tom istom bode'],
        ['podmienka', 'pravidlá platia, ak čiastkové limity sú konečné čísla'],
      ],
    },
    worked: {
      q: 'Vypočítaj lim (x→2) (x² + 3x − 1) / (x + 1).',
      steps: [
        'Vieme: podiel polynómov, menovateľ pri x = 2 je 3 ≠ 0, funkcia je v bode 2 spojitá. Hľadáme: limitu.',
        'Použijeme dosadenie, lebo pre spojitú funkciu je limita rovná f(2).',
        'Čitateľ: 2² + 3·2 − 1 = 4 + 6 − 1 = 9.',
        'Menovateľ: 2 + 1 = 3.',
        'Podiel: 9 / 3 = 3.',
        'Kontrola kalkulačkou: x = 2,001 dá (4,004001 + 6,003 − 1) / 3,001 ≈ 3,001, blízko 3 ✓.',
      ],
      result: 'lim (x→2) (x² + 3x − 1) / (x + 1) = 3.',
    },
    check: {
      q: 'lim (x→π) cos x = ?',
      options: ['−1', '1', '0', 'π'],
      explain: 'cos x je spojitá, stačí dosadiť: cos π = −1 (bod na jednotkovej kružnici úplne vľavo).',
    },
  },
  {
    title: 'Jednostranné limity',
    text: 'Niekedy sa funkcia správa inak, keď prichádzaš k bodu a zľava (x < a), a inak, keď sprava (x > a). Preto zavádzame jednostranné limity: lim (x→a⁻) je limita zľava, lim (x→a⁺) limita sprava. Malé mínus a plus pri a hovoria, z ktorej strany ideš.\n\nObyčajná (obojstranná) limita existuje práve vtedy, keď existujú obe jednostranné a majú rovnakú hodnotu. Na obrázku je skok v bode x = 3: ružový bod prichádza zľava a hodnoty sa blížia k 1, žltý bod sprava a hodnoty sa blížia k 3. Keďže 1 ≠ 3, limita v bode 3 neexistuje.\n\nJednostranné limity počítaš hlavne pri funkciách zadaných po častiach (rôzne predpisy pre x < a a x ≥ a), pri absolútnej hodnote a pri zlomkoch, kde menovateľ ide k nule.',
    analogy: 'Most cez rieku sa stavia z oboch brehov naraz. Robotníci zľava a sprava sa musia stretnúť v rovnakej výške. Ak ľavá polovica končí vo výške 1 m a pravá vo výške 3 m, most nie je spojený – obojstranná limita neexistuje.',
    fig: 'continuity',
    formula: {
      f: 'lim (x→a) f(x) = L  ⇔  lim (x→a⁻) f(x) = lim (x→a⁺) f(x) = L',
      what: 'Kedy limita existuje',
      vars: [
        ['x → a⁻', 'x sa blíži k a zľava, teda x < a'],
        ['x → a⁺', 'x sa blíži k a sprava, teda x > a'],
      ],
    },
    worked: {
      q: 'f(x) = x² pre x < 1 a f(x) = 2x + 1 pre x ≥ 1. Existuje lim (x→1) f(x)?',
      steps: [
        'Vieme: funkcia je zadaná po častiach, predpis sa mení v bode 1. Hľadáme: obe jednostranné limity v bode 1.',
        'Zľava (x < 1) platí predpis x²: lim (x→1⁻) x² = 1² = 1.',
        'Sprava (x > 1) platí predpis 2x + 1: lim (x→1⁺) (2x + 1) = 2 + 1 = 3.',
        'Porovnaj: 1 ≠ 3, jednostranné limity sa líšia.',
        'Kontrola: f(0,999) ≈ 0,998 a f(1,001) = 3,002, hodnoty naozaj „skáču“ z 1 na 3, presne ako na obrázku.',
      ],
      result: 'lim (x→1) f(x) neexistuje (zľava 1, sprava 3), v bode 1 je skok.',
    },
    check: {
      q: 'lim (x→0⁻) 1/x = ?',
      options: ['−∞', '+∞', '0', '1'],
      explain: 'Zľava sú x malé záporné čísla (−0,1; −0,01…), takže 1/x je −10, −100, … a ide do −∞. Sprava by išla do +∞, preto obojstranná limita v nule neexistuje.',
    },
  },
  {
    title: 'Spojitosť funkcie',
    text: 'Funkcia je spojitá v bode a, ak platia tri veci naraz: f(a) existuje, lim (x→a) f(x) existuje, a obe čísla sú rovnaké. Názorne: graf v okolí a nakreslíš bez zdvihnutia ceruzky. Funkcia je spojitá na intervale, ak je spojitá v každom jeho bode.\n\nAk niektorá z podmienok neplatí, funkcia má v a bod nespojitosti. Rozlišujeme tri druhy (pozri odrážky). Najčastejšia skúšková úloha: nájdi parameter tak, aby funkcia zadaná po častiach bola spojitá. Stačí požadovať, aby sa limita zľava rovnala limite sprava a hodnote f(a).',
    formula: {
      f: 'f je spojitá v a  ⇔  lim (x→a) f(x) = f(a)',
      what: 'Spojitosť v bode',
      vars: [
        ['f(a)', 'hodnota musí existovať (a ∈ D(f))'],
        ['lim (x→a) f(x)', 'limita musí existovať (zľava = sprava)'],
        ['=', 'a tieto dve čísla sa musia rovnať'],
      ],
    },
    bullets: [
      'Odstrániteľná nespojitosť: limita existuje, ale f(a) chýba alebo je iná („diera“ v grafe). Príklad (x² − 1)/(x − 1) v bode 1.',
      'Nespojitosť 1. druhu (skok): obe jednostranné limity sú konečné, ale rôzne (obrázok z predošlého kroku).',
      'Nespojitosť 2. druhu: aspoň jedna jednostranná limita je nekonečná alebo neexistuje. Príklad 1/x v bode 0.',
    ],
    worked: {
      q: 'Urči c tak, aby funkcia f(x) = x² + c pre x < 2 a f(x) = 3x pre x ≥ 2 bola spojitá v bode 2.',
      steps: [
        'Vieme: oba predpisy sú spojité, problém môže byť len v bode 2. Hľadáme: c, pri ktorom sa časti „stretnú“.',
        'Hodnota a limita sprava: f(2) = 3·2 = 6 a lim (x→2⁺) 3x = 6.',
        'Limita zľava: lim (x→2⁻) (x² + c) = 4 + c.',
        'Podmienka spojitosti: 4 + c = 6, teda c = 2.',
        'Kontrola: pre c = 2 je ľavá časť x² + 2, v bode 2 dáva 6, rovnako ako pravá ✓.',
      ],
      result: 'c = 2.',
    },
    check: {
      q: 'Funkcia f(x) = (x² − 1)/(x − 1) v bode x = 1:',
      options: ['nie je spojitá, ale limita tam existuje a je 2', 'je spojitá', 'nemá tam limitu', 'má tam zvislú asymptotu'],
      explain: 'f(1) neexistuje (0/0), preto spojitá nie je. Po vykrátení (x² − 1)/(x − 1) = x + 1 je limita 1 + 1 = 2. Je to odstrániteľná nespojitosť, „diera“ v priamke y = x + 1.',
    },
  },
  {
    title: 'Nekonečno a neurčité výrazy',
    text: 'Limita môže vyjsť aj +∞ alebo −∞: funkcia vtedy rastie (klesá) nad všetky medze. Nekonečno nie je číslo, ale pri limitách s ním počítame podľa intuitívnych pravidiel: obrovské plus obrovské je obrovské, malé číslo delené obrovským je takmer nula a podobne.\n\nPozor na výraz typu číslo / 0, napríklad 5/0. Nie je to 0 ani „neurčitý výraz“. Hodnoty sú obrovské a výsledok je +∞ alebo −∞ podľa znamienka menovateľa. Preto vtedy počítaš jednostranné limity a zisťuješ, či ide menovateľ k nule z kladnej strany (0⁺) alebo zo zápornej (0⁻).\n\nNeurčité výrazy sú tie, pri ktorých výsledok dopredu nevieš, môže vyjsť čokoľvek. Vtedy treba výraz upraviť (krátiť, rozšíriť, deliť najvyššou mocninou) alebo použiť L’Hospitalovo pravidlo z lekcie Derivácie.',
    formula: {
      f: 'c / (±∞) = 0     c / 0⁺ = +∞  (c > 0)     ∞ + ∞ = ∞     c · ∞ = ∞  (c > 0)',
      what: 'Počítanie s nekonečnom (určité výrazy)',
      vars: [
        ['0⁺', 'kladné číslo blížiace sa k nule (0,1; 0,01; …)'],
        ['0⁻', 'záporné číslo blížiace sa k nule; c / 0⁻ = −∞ pre c > 0'],
        ['c', 'konečné číslo'],
      ],
    },
    bullets: [
      'Neurčité výrazy: 0/0,  ∞/∞,  ∞ − ∞,  0 · ∞,  1^∞,  0⁰,  ∞⁰.',
      'Určité (netreba upravovať): c/∞ = 0, ∞ + ∞ = ∞, c/0± = ±∞ podľa znamienok, ∞ · ∞ = ∞.',
    ],
    worked: {
      q: 'Vypočítaj lim (x→2⁻) (x + 1)/(x − 2) a lim (x→2⁺) (x + 1)/(x − 2).',
      steps: [
        'Vieme: dosadenie dá 3/0, teda „číslo / 0“. Hľadáme: znamienko nekonečna z každej strany.',
        'Zľava (x < 2, napr. 1,99): menovateľ x − 2 je malé záporné číslo, 0⁻. Čitateľ je blízko 3 > 0.',
        'Teda zľava: 3 / 0⁻ = −∞.',
        'Sprava (x > 2, napr. 2,01): menovateľ je malé kladné číslo, 0⁺. Teda 3 / 0⁺ = +∞.',
        'Kontrola: f(1,99) = 2,99 / (−0,01) = −299 a f(2,01) = 3,01 / 0,01 = 301 ✓.',
      ],
      result: 'Zľava −∞, sprava +∞; obojstranná limita neexistuje a priamka x = 2 je zvislá asymptota.',
    },
    check: {
      q: 'Ktorý výraz je neurčitý (treba ho ďalej upraviť)?',
      options: ['∞ − ∞', '5 / ∞', '∞ + ∞', '3 · ∞'],
      explain: '∞ − ∞ môže vyjsť čokoľvek: (x + 5) − x → 5, ale x² − x → ∞. Ostatné sú určité: 5/∞ = 0, ∞ + ∞ = ∞, 3·∞ = ∞.',
    },
  },
  {
    title: 'Typ 0/0: rozlož a vykráť',
    text: 'Ak pri limite x → a vyjde po dosadení 0/0 a ide o podiel polynómov, znamená to, že čitateľ aj menovateľ majú spoločný činiteľ (x − a). Každý polynóm, ktorý má v bode a nulu, sa totiž dá napísať ako (x − a) · (niečo).\n\nPostup: rozlož čitateľ aj menovateľ na súčin, vykráť (x − a) a potom znova dosaď. Krátiť smieš, lebo pri limite je x ≠ a, takže x − a ≠ 0.\n\nNa rozklad použi vzorce nižšie alebo korene kvadratickej rovnice: ax² + bx + c = a(x − x₁)(x − x₂). Typická chyba: po vykrátení zabudnúť dosadiť a nechať v odpovedi x.',
    analogy: 'Ako pri zlomku 6/8 = 3/4: spoločný činiteľ 2 vykrátiš a hodnota sa nezmení. Tu je spoločný činiteľ (x − 2), ktorý spôsoboval 0/0. Keď ho odstrániš, problém zmizne a stačí dosadiť.',
    formula: {
      f: 'a² − b² = (a − b)(a + b)     a³ − b³ = (a − b)(a² + ab + b²)     ax² + bx + c = a(x − x₁)(x − x₂)',
      what: 'Vzorce na rozklad',
      vars: [
        ['x₁, x₂', 'korene kvadratického trojčlena'],
        ['(x − a)', 'činiteľ, ktorý spôsobuje 0/0 a ktorý vykrátiš'],
      ],
    },
    worked: {
      q: 'Vypočítaj lim (x→2) (x² − 5x + 6)/(x² − 4).',
      steps: [
        'Vieme: dosadenie dá (4 − 10 + 6)/(4 − 4) = 0/0. Hľadáme: spoločný činiteľ (x − 2).',
        'Čitateľ: x² − 5x + 6 má korene 2 a 3 (súčet 5, súčin 6), teda (x − 2)(x − 3).',
        'Menovateľ: x² − 4 = (x − 2)(x + 2) podľa vzorca a² − b².',
        'Vykráť (x − 2): zostane (x − 3)/(x + 2).',
        'Teraz dosaď x = 2: (2 − 3)/(2 + 2) = −1/4.',
        'Kontrola kalkulačkou: x = 2,001 dá pôvodný výraz ≈ −0,2497, blízko −0,25 ✓.',
      ],
      result: 'lim (x→2) (x² − 5x + 6)/(x² − 4) = −1/4.',
    },
    deeper: 'Prečo musí byť (x − a) činiteľom? Ak delíš polynóm P(x) dvojčlenom (x − a), dostaneš P(x) = (x − a)·Q(x) + r, kde r je zvyšok (číslo). Dosaď x = a: P(a) = 0·Q(a) + r = r. Ak teda P(a) = 0, zvyšok je nula a (x − a) delí P(x) bez zvyšku.\n\nNiekedy po vykrátení vyjde znova 0/0. Vtedy má koreň a násobnosť 2 a krátiš ešte raz.',
  },
  {
    title: 'Typ 0/0 s odmocninou: rozšír',
    text: 'Keď je v limite odmocnina a vyjde 0/0, rozklad nepomôže. Použiješ trik s rozšírením: zlomok vynásobíš výrazom, ktorý sa líši len znamienkom (napríklad √A − B rozšíriš (√A + B)). Násobíš čitateľa aj menovateľa tým istým, takže hodnota sa nemení.\n\nVďaka vzorcu (a − b)(a + b) = a² − b² sa odmocnina umocní a zmizne. Potom sa zvyčajne objaví činiteľ, ktorý sa dá vykrátiť, a môžeš dosadiť.\n\nTypická chyba: roznásobiť aj menovateľ. Menovateľ nechaj v tvare súčinu, budeš z neho krátiť.',
    formula: {
      f: '(√A − B)(√A + B) = A − B²',
      what: 'Rozšírenie na rozdiel štvorcov',
      vars: [
        ['√A + B', 'združený výraz k √A − B (rovnaké členy, opačné znamienko)'],
        ['A − B²', 'výsledok už neobsahuje odmocninu'],
      ],
    },
    worked: {
      q: 'Vypočítaj lim (x→0) (√(x + 4) − 2)/x.',
      steps: [
        'Vieme: dosadenie dá (√4 − 2)/0 = 0/0. Hľadáme: úpravu, ktorá odstráni odmocninu.',
        'Rozšír zlomok výrazom (√(x + 4) + 2)/(√(x + 4) + 2).',
        'Čitateľ: (√(x + 4) − 2)(√(x + 4) + 2) = (x + 4) − 4 = x.',
        'Menovateľ nechaj ako súčin: x · (√(x + 4) + 2).',
        'Vykráť x: zostane 1/(√(x + 4) + 2).',
        'Dosaď x = 0: 1/(√4 + 2) = 1/4. Kontrola: x = 0,001 dá (√4,001 − 2)/0,001 ≈ 0,24998 ✓.',
      ],
      result: 'lim (x→0) (√(x + 4) − 2)/x = 1/4.',
    },
    check: {
      q: 'Akým výrazom rozšíriš (√x − 3)/(x − 9) pri x → 9?',
      options: ['(√x + 3)/(√x + 3)', '(√x − 3)/(√x − 3)', 'x/x', '(x + 9)/(x + 9)'],
      explain: 'Združený výraz k √x − 3 je √x + 3. Čitateľ potom bude x − 9, vykráti sa s menovateľom a zostane 1/(√x + 3) → 1/6.',
    },
  },
  {
    title: 'Limita v nekonečne a racionálne funkcie',
    text: 'Limita pre x → ∞ hovorí, k čomu sa blíži funkcia, keď x neobmedzene rastie. Pri podiele polynómov dostaneš typ ∞/∞. Rozhoduje iba najvyššia mocnina v čitateli a v menovateli, ostatné členy sú oproti nej zanedbateľné.\n\nTrik: vydeľ čitateľa aj menovateľa najvyššou mocninou x z menovateľa. Všetky členy tvaru 1/x, 5/x², … idú k nule. Na obrázku je (3x² + 1)/(x² + 2): rovnaký stupeň hore aj dole, preto sa graf blíži k podielu vedúcich koeficientov 3/1 = 3 (žltá priamka).\n\nPre x → −∞ postupuješ rovnako, len si strážiš znamienka nepárnych mocnín: (−x)³ je záporné. Ďalej si pamätaj poradie rýchlosti rastu pre x → ∞: ln x rastie pomalšie ako ľubovoľná mocnina x a tá pomalšie ako eˣ.',
    analogy: 'Keď počítaš majetok milionára, drobné vo vrecku nehrajú rolu. Pri obrovskom x je člen 3x² „milión“ a člen 1 sú „drobné“. Rozhodujú len najvyššie mocniny.',
    fig: 'mat:limity@inf',
    formula: {
      f: 'n < m:  limita = 0     n = m:  limita = aₙ / bₘ     n > m:  limita = ±∞',
      what: 'lim (x→±∞) (aₙxⁿ + …) / (bₘxᵐ + …)',
      vars: [
        ['n, m', 'stupeň čitateľa a stupeň menovateľa'],
        ['aₙ, bₘ', 'koeficienty pri najvyšších mocninách'],
        ['±∞', 'znamienko zistíš dosadením veľkého (záporného) čísla'],
      ],
    },
    worked: {
      q: 'Vypočítaj lim (x→∞) (2x³ − x + 1)/(5x³ + 4x²).',
      steps: [
        'Vieme: typ ∞/∞, stupeň hore aj dole je 3. Hľadáme: limitu.',
        'Vydeľ čitateľa aj menovateľa x³: (2 − 1/x² + 1/x³)/(5 + 4/x).',
        'Pre x → ∞ idú 1/x², 1/x³ aj 4/x k nule.',
        'Zostane (2 − 0 + 0)/(5 + 0) = 2/5.',
        'Kontrola: x = 1000 dá ≈ 0,3997, blízko 0,4 ✓. Súhlasí to aj s pravidlom n = m: 2/5.',
      ],
      result: 'lim (x→∞) (2x³ − x + 1)/(5x³ + 4x²) = 2/5 = 0,4.',
    },
    check: {
      q: 'lim (x→∞) (x + 1)/(x² + 3) = ?',
      options: ['0', '1', '∞', '1/3'],
      explain: 'Stupeň menovateľa (2) je väčší ako stupeň čitateľa (1), menovateľ rastie oveľa rýchlejšie, preto zlomok ide k nule.',
    },
  },
  {
    title: 'Dôležité limity',
    text: 'Niektoré limity sa nedajú vypočítať krátením ani rozšírením a treba ich poznať naspamäť (sú v každej tabuľke). Najdôležitejšia je lim (x→0) sin x / x = 1. Platí len pre uhol v radiánoch.\n\nPrečo to tak je, vidíš na obrázku: pri 1 člene je žltý polynóm jednoducho priamka y = x a v okolí nuly takmer splýva s modrým sin x. Pre malé x teda sin x ≈ x, a preto sin x / x ≈ 1. Prepni na viac členov a uvidíš, že ďalšie členy upresňujú sínus ďalej od nuly.\n\nTieto limity platia aj vtedy, keď namiesto x je iný výraz, ktorý ide k nule: lim sin(□)/□ = 1, ak □ → 0. Na skúške preto zlomok upravíš tak, aby sa v menovateli objavilo presne to isté, čo je v sínuse.',
    fig: 'taylor',
    formula: {
      f: 'lim (x→0) sin x / x = 1     lim (x→±∞) (1 + 1/x)ˣ = e     lim (x→0) (eˣ − 1)/x = 1     lim (x→0) ln(1 + x)/x = 1',
      what: 'Dôležité limity (naspamäť)',
      vars: [
        ['e', 'Eulerovo číslo ≈ 2,718'],
        ['x', 'v sin x vždy v radiánoch'],
        ['(1 + a/x)ˣ', '→ eᵃ pre x → ∞'],
      ],
    },
    worked: {
      q: 'Vypočítaj lim (x→0) sin(5x)/(2x).',
      steps: [
        'Vieme: dosadenie dá 0/0. Hľadáme: tvar sin(□)/□, kde □ = 5x.',
        'Potrebujeme v menovateli 5x. Rozšír: sin(5x)/(2x) = (5/2) · sin(5x)/(5x).',
        'Pre x → 0 aj 5x → 0, teda sin(5x)/(5x) → 1.',
        'Limita = (5/2) · 1 = 5/2.',
        'Kontrola kalkulačkou (RAD): x = 0,001 dá sin 0,005 / 0,002 ≈ 2,49999 ✓.',
      ],
      result: 'lim (x→0) sin(5x)/(2x) = 5/2 = 2,5.',
    },
    deeper: 'Odkiaľ (1 + 1/x)ˣ → e? Výraz je typu 1^∞, ktorý je neurčitý: základ je takmer 1, ale umocňuješ na obrovské číslo. Tieto dve tendencie „bojujú“ a výsledok je presne e ≈ 2,718. Pre x = 10 je hodnota 2,594, pre x = 1000 už 2,717.\n\nVšeobecne lim (x→∞) (1 + a/x)ˣ = eᵃ. Dôvod: (1 + a/x)ˣ = [(1 + a/x)^(x/a)]ᵃ a vnútro je presne tvar (1 + 1/t)ᵗ s t = x/a → ∞.\n\nPočítanie v stupňoch by dalo inú konštantu: sin 1° ≈ 0,01745, teda sin x / x ≈ π/180 pre x v stupňoch. Preto analýza pracuje výhradne s radiánmi.',
    check: {
      q: 'lim (x→∞) (1 + 2/x)ˣ = ?',
      options: ['e²', 'e', '1', '∞'],
      explain: 'Podľa vzorca (1 + a/x)ˣ → eᵃ s a = 2. Odpoveď 1 je typická chyba: „1 na čokoľvek je 1“ tu neplatí, lebo základ nie je presne 1 (typ 1^∞ je neurčitý).',
    },
  },
  {
    title: 'Asymptoty: zvislá a vodorovná',
    text: 'Asymptota je priamka, ku ktorej sa graf funkcie neobmedzene približuje. Zvislá asymptota (bez smernice) x = a je tam, kde aspoň jedna jednostranná limita v bode a je +∞ alebo −∞. Kandidáti sú body, ktoré nepatria do D(f): nulové body menovateľa, okraj definičného oboru logaritmu (ln x má zvislú asymptotu x = 0).\n\nVodorovná asymptota y = b je tam, kde lim (x→+∞) f(x) = b alebo lim (x→−∞) f(x) = b, pričom b je konečné číslo. Obe strany vyšetri zvlášť: eˣ má vodorovnú asymptotu y = 0 len vľavo, arctg x má vpravo y = π/2 a vľavo y = −π/2.\n\nNa obrázku je f(x) = (2x + 1)/(x − 2). Červená zvislá priamka x = 2 je tam, kde je menovateľ nula, a graf pri nej uteká hore aj dole. Žltá vodorovná priamka y = 2 je limita v ±∞, ku ktorej sa graf prikladá ďaleko vľavo aj vpravo.',
    analogy: 'Asymptota je ako zvodidlo pri diaľnici: auto (graf) ide popri ňom čoraz tesnejšie, čím ďalej ide. Rozdiel je v tom, že vodorovnú asymptotu graf smie aj pretnúť (napríklad pri sin x / x), zvislú nikdy.',
    fig: 'mat:limity@asym',
    formula: {
      f: 'zvislá x = a:  lim (x→a⁻) f(x) = ±∞  alebo  lim (x→a⁺) f(x) = ±∞     vodorovná y = b:  lim (x→+∞) f(x) = b  alebo  lim (x→−∞) f(x) = b',
      what: 'Asymptoty bez smernice a vodorovné',
      vars: [
        ['a', 'bod mimo D(f) alebo na jeho okraji, kde funkcia uteká do ±∞'],
        ['b', 'konečná limita v +∞ alebo −∞'],
      ],
    },
    worked: {
      q: 'Nájdi zvislé a vodorovné asymptoty funkcie f(x) = (2x + 1)/(x − 2).',
      steps: [
        'Vieme: D(f) = ℝ∖{2}. Kandidát na zvislú asymptotu je x = 2.',
        'lim (x→2⁺) (2x + 1)/(x − 2) = 5/0⁺ = +∞ a lim (x→2⁻) = 5/0⁻ = −∞. Teda x = 2 je zvislá asymptota.',
        'Vodorovná: lim (x→±∞) (2x + 1)/(x − 2). Stupne sú rovnaké (1 a 1), limita = 2/1 = 2.',
        'Obe strany dávajú 2, teda y = 2 je vodorovná asymptota vľavo aj vpravo.',
        'Kontrola: f(1000) = 2001/998 ≈ 2,005, blízko 2 ✓. Súhlasí to s obrázkom.',
      ],
      result: 'Zvislá asymptota x = 2, vodorovná asymptota y = 2.',
    },
    check: {
      q: 'Má f(x) = (x² − 4)/(x − 2) zvislú asymptotu x = 2?',
      options: ['Nie, limita v 2 je konečná (4), je tam len „diera“', 'Áno, lebo menovateľ je v 2 nulový', 'Áno, lebo 2 nepatrí do D(f)', 'Nie, lebo f nie je definovaná nikde'],
      explain: '(x² − 4)/(x − 2) = (x − 2)(x + 2)/(x − 2) = x + 2 → 4. Limita je konečná, takže zvislá asymptota tam nie je. Nulový menovateľ je len kandidát, rozhoduje limita.',
    },
  },
  {
    title: 'Šikmá asymptota',
    text: 'Niektoré funkcie sa v nekonečne neprikladajú k vodorovnej priamke, ale k šikmej priamke y = kx + q. Volá sa šikmá asymptota (asymptota so smernicou). Vodorovná asymptota je jej špeciálny prípad s k = 0.\n\nSmernicu k a posun q vypočítaš dvomi limitami (vzorec nižšie). Obe musia vyjsť ako konečné čísla, inak šikmá asymptota neexistuje. Ak k = ∞, funkcia rastie rýchlejšie ako každá priamka (napr. x²). Vyšetri zvlášť x → +∞ a x → −∞, výsledky sa môžu líšiť.\n\nPri racionálnej funkcii je šikmá asymptota práve vtedy, keď je stupeň čitateľa o 1 väčší ako stupeň menovateľa. Vtedy ju nájdeš aj delením polynómov.',
    formula: {
      f: 'y = kx + q     k = lim (x→±∞) f(x) / x     q = lim (x→±∞) [f(x) − k·x]',
      what: 'Šikmá asymptota',
      vars: [
        ['k', 'smernica asymptoty (musí byť konečná)'],
        ['q', 'posun asymptoty na osi y (musí byť konečný)'],
        ['k = 0', 'asymptota je vodorovná y = q'],
      ],
    },
    worked: {
      q: 'Nájdi šikmú asymptotu funkcie f(x) = (x² + 1)/(x − 1).',
      steps: [
        'Vieme: stupeň čitateľa 2, menovateľa 1, rozdiel 1, šikmá asymptota je pravdepodobná. Hľadáme: k a q.',
        'k = lim f(x)/x = lim (x² + 1)/(x² − x). Rovnaký stupeň, k = 1/1 = 1.',
        'q = lim [(x² + 1)/(x − 1) − x] = lim [(x² + 1 − x(x − 1))/(x − 1)] = lim (x + 1)/(x − 1).',
        'Rovnaký stupeň, q = 1/1 = 1. Rovnako pre x → +∞ aj x → −∞.',
        'Asymptota: y = 1·x + 1 = x + 1.',
        'Kontrola: f(100) = 10001/99 ≈ 101,02 a priamka dáva 101, rozdiel sa zmenšuje ✓.',
      ],
      result: 'Šikmá asymptota y = x + 1 (v +∞ aj v −∞).',
    },
    deeper: 'Odkiaľ vzorce? Ak sa graf blíži k priamke, pre veľké x platí f(x) ≈ kx + q. Vydeľ x: f(x)/x ≈ k + q/x. Keďže q/x → 0, dostaneš k = lim f(x)/x. Potom f(x) − kx ≈ q, odtiaľ druhý vzorec.\n\nDelením polynómov to vidíš priamo: x² + 1 = (x − 1)(x + 1) + 2, teda f(x) = x + 1 + 2/(x − 1). Pre veľké x je zlomok 2/(x − 1) skoro nula a zostane priamka x + 1. Navyše vidno, že pre x → +∞ je zlomok kladný (graf je nad asymptotou) a pre x → −∞ záporný (pod ňou).',
  },
  {
    title: 'Skúšková úloha: všetky asymptoty',
    text: 'Na skúške dostaneš funkciu a úlohu „nájdi všetky asymptoty“. Postupuj systematicky podľa odrážok, nič nevynechaj. Najprv definičný obor, lebo z neho vidíš kandidátov na zvislé asymptoty. Potom limity v nekonečnách.\n\nPamätaj: v jednom smere (napríklad x → +∞) môže mať funkcia buď vodorovnú, alebo šikmú asymptotu, nikdy obe naraz. Zvislých asymptot môže byť viac.',
    bullets: [
      '1. Urči D(f). Body mimo D (a okraje D) sú kandidáti na zvislé asymptoty.',
      '2. V každom kandidátovi a vypočítaj limitu zľava aj sprava. Ak je aspoň jedna ±∞, x = a je zvislá asymptota.',
      '3. Vypočítaj lim (x→+∞) f(x) a lim (x→−∞) f(x). Konečné číslo b dá vodorovnú asymptotu y = b.',
      '4. Ak je limita v nekonečne ±∞, skús šikmú: k = lim f(x)/x, q = lim (f(x) − kx).',
      '5. Výsledok over dosadením veľkého x a hodnôt blízko zvislých asymptot.',
    ],
    worked: {
      q: 'Nájdi všetky asymptoty funkcie f(x) = (3x² + 2)/(x² − 1).',
      steps: [
        'D(f): x² − 1 ≠ 0, teda x ≠ ±1. Kandidáti na zvislé asymptoty: x = 1 a x = −1.',
        'x = 1: čitateľ → 3 + 2 = 5. Sprava (x > 1) je x² − 1 > 0, limita 5/0⁺ = +∞. Zľava 5/0⁻ = −∞. Teda x = 1 je zvislá asymptota.',
        'x = −1: čitateľ → 5. Sprava (napr. −0,9) je x² − 1 = −0,19 < 0, limita −∞. Zľava (−1,1) je x² − 1 = 0,21 > 0, limita +∞. Teda x = −1 je zvislá asymptota.',
        'V ±∞: rovnaký stupeň 2, limita = 3/1 = 3. Vodorovná asymptota y = 3 na oboch stranách.',
        'Šikmá: keďže v ±∞ je vodorovná asymptota, šikmá neexistuje (k = lim f(x)/x = 0).',
        'Kontrola: f je párna (iba x²), asymptoty sú súmerné podľa osi y ✓. f(100) = 30002/9999 ≈ 3,0005 ✓.',
      ],
      result: 'Zvislé asymptoty x = 1 a x = −1, vodorovná asymptota y = 3, šikmá nie je.',
    },
    check: {
      q: 'Ktorá funkcia má šikmú asymptotu?',
      options: ['(x² + 1)/x', '(x + 1)/x', '1/(x² + 1)', 'x²'],
      explain: '(x² + 1)/x = x + 1/x, pre veľké x sa blíži k priamke y = x. (x + 1)/x má vodorovnú y = 1, 1/(x² + 1) vodorovnú y = 0 a x² nemá žiadnu, lebo k = lim x² / x = ∞.',
    },
  },
  {
    title: 'Zhrnutie: limity a asymptoty',
    text: 'Limita opisuje, kam sa blížia hodnoty funkcie, a nezáleží pri nej na hodnote v samotnom bode. Pri každej limite začni dosadením a podľa toho, čo vyjde, vyber techniku.\n\nAsymptoty sú len iný spôsob, ako zapísať limity, ktoré vyšli nekonečné (zvislé) alebo limity v nekonečne (vodorovné a šikmé). Tento postup budeš potrebovať v lekcii Priebeh funkcie.',
    bullets: [
      'Dosaď. Vyšlo číslo? Hotovo (funkcia je spojitá).',
      'Vyšlo c/0? Výsledok je ±∞, znamienko urči jednostrannými limitami.',
      '0/0 pri polynómoch: rozlož a vykráť (x − a). 0/0 s odmocninou: rozšír združeným výrazom.',
      '∞/∞ pri x → ±∞: vydeľ najvyššou mocninou; n < m → 0, n = m → aₙ/bₘ, n > m → ±∞.',
      'Naspamäť: sin x / x → 1 (radiány), (1 + 1/x)ˣ → e, (eˣ − 1)/x → 1.',
      'Limita existuje ⇔ limita zľava = limita sprava. Spojitosť: lim (x→a) f(x) = f(a).',
      'Zvislá asymptota x = a: jednostranná limita v a je ±∞. Nulový menovateľ je len kandidát.',
      'Vodorovná y = b: lim (x→±∞) f(x) = b. Šikmá y = kx + q: k = lim f/x, q = lim (f − kx).',
      'Neurčité výrazy: 0/0, ∞/∞, ∞ − ∞, 0·∞, 1^∞, 0⁰, ∞⁰. Na ďalšie pomôže L’Hospitalovo pravidlo.',
    ],
  },
];

export default steps;
