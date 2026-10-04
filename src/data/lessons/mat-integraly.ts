import type { Step } from '../steps';

// Matematika 1, prednášky 11–12: Neurčitý integrál.
// Primitívna funkcia, pravidlá, tabuľka, substitúcia, per partes, parciálne zlomky, kombinácie metód.

const steps: Step[] = [
  {
    title: 'Opačná úloha k derivovaniu',
    text: 'Pri derivovaní z funkcie F vyrobíš jej deriváciu f = F′. Integrovanie je opačná úloha: poznáš f a hľadáš funkciu F, ktorej derivácia je f. Takú F voláme primitívna funkcia k f.\n\nPríklad: k f(x) = 2x je primitívna funkcia F(x) = x², lebo (x²)′ = 2x. Ku cos x je primitívna sin x, lebo (sin x)′ = cos x. Pri integrovaní teda v hlave čítaš tabuľku derivácií odzadu.\n\nNa obrázku je modrá funkcia f(x) = x²/2 a ružová čiarkovaná jej derivácia x. Pri derivovaní ideš od modrej k ružovej. Pri integrovaní ideš naopak: poznáš ružovú x a hľadáš modrú x²/2. Výsledok integrovania sa vždy dá skontrolovať deriváciou, a to je tvoja najlepšia poistka na skúške.',
    analogy: 'Derivovanie je ako z GPS záznamu polohy auta vyčítať rýchlosť. Integrovanie je opačné: z tachografu (záznamu rýchlosti) zrekonštruovať, kde auto bolo. Kde presne začalo, z rýchlosti nezistíš – to bude tá konštanta C.',
    fig: 'mat:derivacie',
    formula: {
      f: 'F je primitívna funkcia k f  ⇔  F′(x) = f(x)',
      what: 'Primitívna funkcia',
      vars: [
        ['f', 'funkcia, ktorú integruješ (poznáš ju)'],
        ['F', 'primitívna funkcia (hľadáš ju)'],
        ['F′ = f', 'skúška správnosti: zderivuj výsledok'],
      ],
    },
    worked: {
      q: 'Je F(x) = sin x + x³ primitívna funkcia k f(x) = cos x + 3x²?',
      steps: [
        'Vieme: F a f. Hľadáme: či F′ = f.',
        'Použijeme definíciu: stačí F zderivovať.',
        'F′(x) = (sin x)′ + (x³)′ = cos x + 3x².',
        'Porovnaj: cos x + 3x² = f(x) ✓.',
        'Všimni si: aj G(x) = sin x + x³ + 7 má deriváciu cos x + 3x², lebo (7)′ = 0. Primitívnych funkcií je nekonečne veľa.',
      ],
      result: 'Áno, F je primitívna k f (a k f sú primitívne aj všetky F(x) + C).',
    },
  },
  {
    title: 'Neurčitý integrál a konštanta C',
    text: 'Ak je F primitívna k f, tak aj F + 5, F − 2 a vôbec F + C pre ľubovoľné číslo C sú primitívne, lebo derivácia konštanty je nula. Všetky primitívne funkcie sa líšia len o konštantu. Ich celú rodinu zapisujeme ako neurčitý integrál ∫ f(x) dx = F(x) + C.\n\nNa obrázku je rodina F(x) = x²/2 + C (primitívne funkcie k f(x) = x). Žltá krivka sa so zmenou C posúva hore a dole, ale zelená dotyčnica v bode x = 1,5 má stále rovnaký sklon 1,5. Všetky tieto krivky majú rovnakú deriváciu.\n\nZnak ∫ je predĺžené S (z latinského summa). Funkcia za ním je integrand a dx hovorí, podľa ktorej premennej integruješ. Bez + C je odpoveď na skúške neúplná a môžeš stratiť body.',
    fig: 'antideriv',
    formula: {
      f: '∫ f(x) dx = F(x) + C',
      what: 'Neurčitý integrál',
      vars: [
        ['∫', 'znak integrálu'],
        ['f(x)', 'integrand, funkcia, ktorú integruješ'],
        ['dx', 'premenná, podľa ktorej integruješ'],
        ['F(x)', 'jedna primitívna funkcia'],
        ['C', 'integračná konštanta, ľubovoľné reálne číslo'],
      ],
    },
    check: {
      q: '∫ 0 dx = ?',
      options: ['C (ľubovoľná konštanta)', '0', 'x', 'neexistuje'],
      explain: 'Hľadáš funkcie s deriváciou 0. Sú to práve konštanty, preto ∫ 0 dx = C.',
    },
  },
  {
    title: 'Plocha pod grafom',
    text: 'Integrál má aj geometrický význam: plochu pod grafom funkcie. Plochu medzi grafom a osou x na intervale ⟨a, b⟩ si môžeš predstaviť ako súčet tenkých obdĺžnikov. Čím viac a užších obdĺžnikov, tým presnejší výsledok.\n\nNa obrázku je plocha pod f(x) = x²/4 + 1/2 na ⟨0, 4⟩. Pri 2 obdĺžnikoch vyjde 7,000, pri 6 už 7,296 a pri 12 obdĺžnikoch 7,324. Pri 40 obdĺžnikoch je rozdiel od presnej hodnoty 7,333… menší ako 0,001.\n\nPresný výsledok dá primitívna funkcia: plocha = F(b) − F(a). Tento Newtonov–Leibnizov vzorec patrí k určitému integrálu, ktorý budeš podrobne preberať neskôr. Ukazuje však, prečo je hľadanie primitívnych funkcií také dôležité.',
    analogy: 'Plocha pod grafom rýchlosti je prejdená dráha. Ak ideš 2 hodiny rýchlosťou 50 km/h, obdĺžnik pod grafom má rozmery 2 h × 50 km/h a plochu 100 km – presne toľko si prešiel.',
    fig: 'mat:integraly',
    formula: {
      f: 'plocha na ⟨a, b⟩ = F(b) − F(a)',
      what: 'Newtonov–Leibnizov vzorec (náhľad na určitý integrál)',
      vars: [
        ['F', 'ľubovoľná primitívna funkcia k f (konštanta C sa odčíta)'],
        ['a, b', 'začiatok a koniec intervalu'],
      ],
    },
    worked: {
      q: 'Vypočítaj presne plochu pod f(x) = x²/4 + 1/2 na intervale ⟨0, 4⟩ (obrázok).',
      steps: [
        'Vieme: f(x) = x²/4 + 1/2, a = 0, b = 4. Hľadáme: F(4) − F(0).',
        'Primitívna funkcia: F(x) = x³/12 + x/2 (mocninu zvýšime o 1 a vydelíme novým exponentom: x³/3 · 1/4 = x³/12).',
        'Skúška: F′(x) = 3x²/12 + 1/2 = x²/4 + 1/2 ✓.',
        'F(4) = 64/12 + 4/2 = 16/3 + 2 = 22/3. F(0) = 0.',
        'Plocha = 22/3 − 0 = 22/3 ≈ 7,333, presne ako píše obrázok.',
      ],
      result: 'Plocha = 22/3 ≈ 7,333 (štvorcových jednotiek).',
    },
  },
  {
    title: 'Tabuľka základných integrálov',
    text: 'Každý riadok tabuľky derivácií prečítaný odzadu dáva integrál. Tieto vzorce sa treba naučiť naspamäť, všetky ostatné metódy sa k nim snažia integrál previesť.\n\nPri mocnine: exponent zvýš o 1 a vydeľ novým exponentom. Platí pre každé n okrem n = −1, tam by si delil nulou. Pre n = −1, teda 1/x, je výsledok ln|x|. Odmocniny a zlomky najprv prepíš na mocniny: √x = x^(1/2), 1/x² = x⁻².\n\nPozor na znamienka pri sínuse a kosínuse: ∫ sin x dx = −cos x + C (mínus!), lebo (−cos x)′ = sin x.',
    formula: {
      f: '∫ xⁿ dx = xⁿ⁺¹ / (n + 1) + C   (n ≠ −1)     ∫ 1/x dx = ln|x| + C     ∫ eˣ dx = eˣ + C',
      what: 'Tabuľka integrálov',
      vars: [
        ['∫ aˣ dx', '= aˣ / ln a + C'],
        ['∫ sin x dx', '= −cos x + C'],
        ['∫ cos x dx', '= sin x + C'],
        ['∫ 1/cos² x dx', '= tg x + C'],
        ['∫ 1/sin² x dx', '= −cotg x + C'],
        ['∫ 1/(1 + x²) dx', '= arctg x + C'],
        ['∫ 1/√(1 − x²) dx', '= arcsin x + C'],
        ['∫ 1/(a² + x²) dx', '= (1/a)·arctg(x/a) + C'],
      ],
    },
    worked: {
      q: 'Vypočítaj ∫ (√x + 1/x²) dx.',
      steps: [
        'Vieme: dve mocniny v prestrojení. Prepíš: √x = x^(1/2), 1/x² = x⁻².',
        'Integrujeme člen po člene podľa ∫ xⁿ dx = xⁿ⁺¹/(n + 1).',
        '∫ x^(1/2) dx = x^(3/2) / (3/2) = (2/3)·x^(3/2) = (2/3)·x·√x.',
        '∫ x⁻² dx = x⁻¹ / (−1) = −1/x.',
        'Spolu s konštantou: (2/3)·x·√x − 1/x + C.',
        'Skúška: ((2/3)·x^(3/2))′ = x^(1/2) = √x ✓ a (−1/x)′ = 1/x² ✓.',
      ],
      result: '∫ (√x + 1/x²) dx = (2/3)·x·√x − 1/x + C.',
    },
    deeper: 'Prečo ln|x| a nie ln x? Funkcia 1/x je definovaná aj pre záporné x, ale ln x nie. Pre x < 0 platí (ln(−x))′ = (−1)/(−x) = 1/x (reťazové pravidlo). Takže pre kladné x je primitívna ln x, pre záporné ln(−x), a obe spolu zapíšeme ako ln|x|.\n\nPrečo vzorec pre mocninu? Zderivuj výsledok: (xⁿ⁺¹/(n + 1))′ = (n + 1)·xⁿ/(n + 1) = xⁿ ✓.',
    check: {
      q: '∫ x⁴ dx = ?',
      options: ['x⁵/5 + C', '4x³ + C', 'x⁵ + C', 'x⁴/4 + C'],
      explain: 'Exponent zvýš o 1 (na 5) a vydeľ ním: x⁵/5. Odpoveď 4x³ je derivácia, nie integrál. Skúška: (x⁵/5)′ = x⁴ ✓.',
    },
  },
  {
    title: 'Pravidlá: súčet a konštanta',
    text: 'Integrál súčtu je súčet integrálov a konštantu môžeš vytiahnuť pred integrál. Vďaka tomu integruješ dlhé výrazy člen po člene a konštanty si „necháš bokom“. Konštantu C stačí pripísať raz na konci.\n\nPozor, pre súčin a podiel podobné pravidlo NEEXISTUJE: ∫ f·g dx ≠ ∫ f dx · ∫ g dx. Na súčiny a podiely sú metódy substitúcia, per partes a parciálne zlomky, ktoré prídu v ďalších krokoch.',
    formula: {
      f: '∫ [f(x) ± g(x)] dx = ∫ f(x) dx ± ∫ g(x) dx     ∫ c · f(x) dx = c · ∫ f(x) dx',
      what: 'Linearita integrálu',
      vars: [
        ['c', 'konštanta (číslo), môžeš ju vybrať pred ∫'],
        ['f, g', 'funkcie, ktoré vieš integrovať zvlášť'],
      ],
    },
    worked: {
      q: 'Vypočítaj ∫ (6x² − 4·cos x + 3eˣ) dx.',
      steps: [
        'Vieme: súčet troch členov s konštantami. Integrujeme po členoch, konštanty vytiahneme.',
        '∫ 6x² dx = 6·x³/3 = 2x³.',
        '∫ −4·cos x dx = −4·sin x.',
        '∫ 3eˣ dx = 3eˣ.',
        'Spolu: 2x³ − 4·sin x + 3eˣ + C.',
        'Skúška: (2x³ − 4 sin x + 3eˣ)′ = 6x² − 4 cos x + 3eˣ ✓.',
      ],
      result: '∫ (6x² − 4·cos x + 3eˣ) dx = 2x³ − 4·sin x + 3eˣ + C.',
    },
    check: {
      q: '∫ (2x + cos x) dx = ?',
      options: ['x² + sin x + C', 'x² − sin x + C', '2 − sin x + C', 'x² + cos x + C'],
      explain: '∫ 2x dx = x², ∫ cos x dx = sin x. Odpoveď 2 − sin x je derivácia, nie integrál.',
    },
  },
  {
    title: 'Najprv uprav, potom integruj',
    text: 'Veľa integrálov vyzerá na prvý pohľad zložito, ale po úprave sú to len tabuľkové mocniny. Typické úpravy: roznásobiť zátvorky, rozdeliť zlomok na viac zlomkov (ak je v menovateli jediný člen), prepísať odmocniny na mocniny.\n\nPozor, deliť sa smie len vtedy, keď je v menovateli jediný člen: (a + b)/x = a/x + b/x. Naopak x/(a + b) sa takto rozdeliť NEDÁ.\n\nNajčastejšia chyba v tejto téme je integrovať čitateľa a menovateľa zvlášť alebo integrovať súčin ako súčin integrálov. Obe sú zlé.',
    worked: {
      q: 'Vypočítaj ∫ (x³ − 2√x + 1)/x dx.',
      steps: [
        'Vieme: v menovateli je jediný člen x, zlomok môžeme rozdeliť na tri.',
        'x³/x = x², 2√x/x = 2x^(1/2)/x = 2x^(−1/2), 1/x zostane.',
        'Integrál: ∫ (x² − 2x^(−1/2) + 1/x) dx.',
        '∫ x² dx = x³/3; ∫ 2x^(−1/2) dx = 2·x^(1/2)/(1/2) = 4√x; ∫ 1/x dx = ln|x|.',
        'Spolu: x³/3 − 4√x + ln|x| + C.',
        'Skúška: (x³/3)′ = x², (−4√x)′ = −4/(2√x) = −2/√x, (ln|x|)′ = 1/x. Súčet x² − 2/√x + 1/x = (x³ − 2√x + 1)/x ✓.',
      ],
      result: '∫ (x³ − 2√x + 1)/x dx = x³/3 − 4√x + ln|x| + C.',
    },
    check: {
      q: 'Platí ∫ x·eˣ dx = ∫ x dx · ∫ eˣ dx?',
      options: ['Nie, integrál súčinu nie je súčin integrálov', 'Áno, vždy', 'Áno, ak sú obe funkcie spojité', 'Áno, ale treba pripísať + C dvakrát'],
      explain: 'Skúška: (x²/2 · eˣ)′ = x·eˣ + (x²/2)·eˣ ≠ x·eˣ. Správne riešenie je per partes: (x − 1)·eˣ + C.',
    },
  },
  {
    title: 'Substitučná metóda',
    text: 'Substitúcia je reťazové pravidlo odzadu. Vieš, že (sin 3x)′ = 3·cos 3x (obrázok: vnútro 3x, obal sin a „krát derivácia vnútra 3“). Preto ∫ 3·cos 3x dx = sin 3x + C. Integrál, v ktorom je vnorená funkcia a zároveň (aspoň približne) jej derivácia, vieš zjednodušiť.\n\nPostup: vnútornú funkciu označíš novou premennou t = g(x). Vypočítaš dt = g′(x) dx (zderivuješ a pripíšeš dx). Potom v integráli nahradíš VŠETKO, čo obsahuje x, výrazmi s t. Ak niekde zostane x, substitúcia bola zlá alebo treba x vyjadriť z t.\n\nNakoniec zintegruješ v premennej t a vrátiš sa späť dosadením t = g(x). Ak derivácia vnútra sedí až na konštantu (napríklad máš x² namiesto 3x²), konštantu doplníš delením.',
    analogy: 'Preklad: zložitý text (integrál v x) preložíš do jazyka, ktorému rozumieš (premenná t), tam úlohu vyriešiš a výsledok preložíš späť do x. Bez spätného prekladu je odpoveď v inom jazyku, ako bola otázka.',
    fig: 'chain',
    formula: {
      f: '∫ f(g(x)) · g′(x) dx = ∫ f(t) dt,   t = g(x),   dt = g′(x) dx',
      what: 'Substitučná metóda',
      vars: [
        ['t = g(x)', 'nová premenná, zvyčajne „vnútro“'],
        ['dt = g′(x) dx', 'diferenciál, nahradí g′(x) dx v integráli'],
        ['spätná substitúcia', 'na konci dosaď t = g(x)'],
      ],
    },
    worked: {
      q: 'Vypočítaj ∫ x²·(x³ + 1)⁵ dx.',
      steps: [
        'Vieme: vnútro x³ + 1 má deriváciu 3x² a v integráli je x². Sedí to až na konštantu 3. Použijeme substitúciu.',
        't = x³ + 1, dt = 3x² dx, teda x² dx = dt/3.',
        'Prepíš: ∫ (x³ + 1)⁵ · x² dx = ∫ t⁵ · dt/3 = (1/3)·∫ t⁵ dt.',
        '(1/3)·t⁶/6 = t⁶/18.',
        'Späť: (x³ + 1)⁶/18 + C.',
        'Skúška: [(x³ + 1)⁶/18]′ = 6·(x³ + 1)⁵·3x²/18 = x²·(x³ + 1)⁵ ✓.',
      ],
      result: '∫ x²·(x³ + 1)⁵ dx = (x³ + 1)⁶/18 + C.',
    },
    deeper: 'Prečo to funguje? Ak F je primitívna k f, podľa reťazového pravidla [F(g(x))]′ = F′(g(x))·g′(x) = f(g(x))·g′(x). Teda F(g(x)) je primitívna k f(g(x))·g′(x), a to je presne to, čo substitúcia vyrobí: ∫ f(t) dt = F(t) = F(g(x)).\n\nZápis dt = g′(x) dx je diferenciál z lekcie Derivácie. Môžeš ho čítať ako „dt/dx = g′(x)“ prenásobené dx.\n\nAk derivácia vnútra v integráli vôbec nie je (napríklad ∫ (x³ + 1)⁵ dx bez x²), táto jednoduchá substitúcia nepomôže. Vtedy treba roznásobiť alebo hľadať inú metódu.',
  },
  {
    title: 'Rýchle vzorce zo substitúcie',
    text: 'Dva typy substitúcie sú také časté, že sa oplatí poznať hotový výsledok. Prvý: lineárne vnútro ax + b. Integruješ ako bez vnútra a výsledok vydelíš koeficientom a. Napríklad ∫ e^(3x) dx = e^(3x)/3 + C, ∫ cos(5x) dx = sin(5x)/5 + C, ∫ 1/(2x + 1) dx = (1/2)·ln|2x + 1| + C.\n\nDruhý: v čitateli je presne derivácia menovateľa. Výsledok je logaritmus menovateľa: ∫ 2x/(x² + 1) dx = ln(x² + 1) + C.\n\nTypická chyba pri lineárnom vnútri: vynásobiť a namiesto delenia. Skúška deriváciou ťa vždy upozorní: (e^(3x)/3)′ = e^(3x) ✓, ale (3e^(3x))′ = 9e^(3x) ✗.',
    formula: {
      f: '∫ f(ax + b) dx = (1/a) · F(ax + b) + C     ∫ f′(x) / f(x) dx = ln|f(x)| + C',
      what: 'Lineárna substitúcia a logaritmický integrál',
      vars: [
        ['a, b', 'čísla, a ≠ 0'],
        ['F', 'primitívna funkcia k f (z tabuľky)'],
        ['f′/f', 'čitateľ je derivácia menovateľa'],
      ],
    },
    worked: {
      q: 'Vypočítaj ∫ tg x dx.',
      steps: [
        'Vieme: tg x = sin x / cos x. Derivácia menovateľa je (cos x)′ = −sin x.',
        'Čitateľ je až na znamienko derivácia menovateľa. Doplníme mínus: ∫ sin x / cos x dx = −∫ (−sin x)/cos x dx.',
        'Teraz je to tvar ∫ f′/f dx = ln|f|: výsledok −ln|cos x| + C.',
        '(Rovnako substitúciou t = cos x, dt = −sin x dx: −∫ dt/t = −ln|t|.)',
        'Skúška: (−ln|cos x|)′ = −(−sin x)/cos x = sin x / cos x = tg x ✓.',
      ],
      result: '∫ tg x dx = −ln|cos x| + C.',
    },
    check: {
      q: '∫ cos(4x) dx = ?',
      options: ['sin(4x)/4 + C', '4·sin(4x) + C', 'sin(4x) + C', '−sin(4x)/4 + C'],
      explain: 'Lineárne vnútro 4x: integruješ cos → sin a delíš 4. Skúška: (sin(4x)/4)′ = cos(4x)·4/4 = cos(4x) ✓.',
    },
  },
  {
    title: 'Metóda per partes',
    text: 'Per partes (po častiach) použiješ na súčin dvoch rôznych typov funkcií, napríklad x·eˣ, x·cos x, x·ln x. Jednu časť označíš u (tú budeš derivovať), druhú v′ (tú budeš integrovať). Vzorec potom vymení pôvodný integrál za iný, ktorý je, ak si zvolil dobre, jednoduchší.\n\nAko voliť: ak je v súčine polynóm a eˣ, sin x alebo cos x, zvoľ u = polynóm, lebo derivovaním sa zjednoduší (x → 1). Ak je v súčine polynóm a ln x alebo arctg x, zvoľ u = ln x (arctg x), lebo tieto funkcie integrovať nevieš, ale ich derivácie sú jednoduché zlomky.\n\nAk po použití vzorca dostaneš integrál ťažší ako pôvodný, skús zameniť u a v′.',
    analogy: 'Per partes je ako výmenný obchod: pôvodný integrál „predáš“ za hotový súčin u·v a dostaneš nový integrál ∫ u′·v. Obchod sa oplatí, len ak je nový integrál jednoduchší ako ten, ktorý si predal.',
    formula: {
      f: '∫ u · v′ dx = u · v − ∫ u′ · v dx',
      what: 'Metóda per partes',
      vars: [
        ['u', 'časť, ktorú derivuješ (polynóm, ln x, arctg x)'],
        ['v′', 'časť, ktorú integruješ (eˣ, sin x, cos x, polynóm pri ln)'],
        ['u′', 'derivácia u'],
        ['v', 'primitívna funkcia k v′ (bez C)'],
      ],
    },
    worked: {
      q: 'Vypočítaj ∫ x·cos x dx.',
      steps: [
        'Vieme: súčin polynómu x a cos x. Zvolíme u = x (derivovaním zmizne), v′ = cos x.',
        'u′ = 1, v = sin x.',
        'Dosaď do vzorca: x·sin x − ∫ 1·sin x dx.',
        '∫ sin x dx = −cos x, teda x·sin x − (−cos x) = x·sin x + cos x.',
        'Pripíš C: x·sin x + cos x + C.',
        'Skúška: (x·sin x + cos x)′ = sin x + x·cos x − sin x = x·cos x ✓.',
      ],
      result: '∫ x·cos x dx = x·sin x + cos x + C.',
    },
    deeper: 'Odvodenie: pravidlo pre deriváciu súčinu je (u·v)′ = u′·v + u·v′. Zintegruj obe strany: u·v = ∫ u′·v dx + ∫ u·v′ dx. Presuň jeden integrál na druhú stranu a máš ∫ u·v′ dx = u·v − ∫ u′·v dx. Per partes je teda pravidlo pre súčin „odzadu“.\n\nPri výpočte v z v′ konštantu C nepíšeš, pripíšeš ju až na úplnom konci.',
  },
  {
    title: 'Per partes dvakrát a trik s ln x',
    text: 'Pri vyššej mocnine polynómu treba per partes použiť opakovane: každým použitím klesne stupeň polynómu o 1. Pri x²·eˣ teda dvakrát, pri x³·sin x trikrát.\n\nSamotný ln x (alebo arctg x) vyzerá, že nemá súčin. Trik: napíš ho ako ln x · 1 a zvoľ u = ln x, v′ = 1. Potom v = x a u′ = 1/x, súčin u′·v = 1 a integrál je hotový: ∫ ln x dx = x·ln x − x + C.\n\nPri súčine eˣ·sin x sa po dvoch použitiach per partes vráti pôvodný integrál. Vtedy ho označíš I a vyriešiš rovnicu pre I (pozri „Prečo?“).',
    worked: {
      q: 'Vypočítaj ∫ x²·eˣ dx.',
      steps: [
        'Vieme: polynóm stupňa 2 krát eˣ. Zvolíme u = x², v′ = eˣ, teda u′ = 2x, v = eˣ.',
        '1. per partes: x²·eˣ − ∫ 2x·eˣ dx.',
        'Zvyšný integrál opäť per partes: u = 2x, v′ = eˣ, u′ = 2, v = eˣ. ∫ 2x·eˣ dx = 2x·eˣ − ∫ 2eˣ dx = 2x·eˣ − 2eˣ.',
        'Dosaď: x²·eˣ − (2x·eˣ − 2eˣ) = x²·eˣ − 2x·eˣ + 2eˣ. Pozor na mínus pred zátvorkou!',
        'Vyber eˣ: eˣ·(x² − 2x + 2) + C.',
        'Skúška: [eˣ(x² − 2x + 2)]′ = eˣ(x² − 2x + 2) + eˣ(2x − 2) = eˣ·x² ✓.',
      ],
      result: '∫ x²·eˣ dx = eˣ·(x² − 2x + 2) + C.',
    },
    deeper: 'Cyklický prípad: I = ∫ eˣ·sin x dx. Per partes s u = sin x, v′ = eˣ: I = eˣ·sin x − ∫ eˣ·cos x dx. Druhý integrál znova per partes s u = cos x: ∫ eˣ·cos x dx = eˣ·cos x + ∫ eˣ·sin x dx = eˣ·cos x + I.\n\nDosaď: I = eˣ·sin x − eˣ·cos x − I. Teda 2I = eˣ(sin x − cos x) a I = (1/2)·eˣ·(sin x − cos x) + C. Skúška deriváciou: (1/2)eˣ(sin x − cos x) + (1/2)eˣ(cos x + sin x) = eˣ·sin x ✓.',
    check: {
      q: 'Pri ∫ ln x dx metódou per partes zvolíš:',
      options: ['u = ln x, v′ = 1', 'u = 1, v′ = ln x', 'u = x, v′ = ln x', 'per partes sa tu použiť nedá'],
      explain: 'ln x integrovať nevieš (to je práve úloha), ale derivovať áno. Preto u = ln x, v′ = 1, v = x. Výsledok: x·ln x − ∫ x·(1/x) dx = x·ln x − x + C.',
    },
  },
  {
    title: 'Parciálne zlomky',
    text: 'Racionálnu funkciu P(x)/Q(x), kde stupeň čitateľa je menší ako stupeň menovateľa, rozložíš na súčet jednoduchých zlomkov, ktoré vieš integrovať. Najprv rozložíš menovateľ na súčin (nájdeš jeho korene). Potom podľa tvaru činiteľov napíšeš tvar rozkladu s neznámymi konštantami A, B, …\n\nKonštanty nájdeš tak, že rovnosť vynásobíš menovateľom a dosadíš korene, pri ktorých väčšina členov zmizne. Každý zlomok A/(x − a) potom dá A·ln|x − a|.\n\nTvary rozkladu: rôzne lineárne činitele (x − a)(x − b) dajú A/(x − a) + B/(x − b). Dvojnásobný činiteľ (x − a)² dá A/(x − a) + B/(x − a)². Kvadratický činiteľ bez reálnych koreňov (napr. x² + 1) dá (Bx + C)/(x² + 1).',
    analogy: 'Lego: zložitú stavbu rozoberieš na základné kocky, s ktorými už vieš pracovať. Každá kocka (jednoduchý zlomok) sa zintegruje na logaritmus alebo arctg a výsledky potom znova poskladáš.',
    formula: {
      f: 'P(x) / [(x − a)(x − b)] = A/(x − a) + B/(x − b)     ∫ A/(x − a) dx = A · ln|x − a| + C',
      what: 'Rozklad na parciálne zlomky (rôzne lineárne činitele)',
      vars: [
        ['a, b', 'korene menovateľa'],
        ['A, B', 'neznáme konštanty, ktoré dopočítaš'],
        ['(x − a)²', 'dáva A/(x − a) + B/(x − a)²'],
        ['x² + px + q', 'bez reálnych koreňov dáva (Bx + C)/(x² + px + q)'],
      ],
    },
    worked: {
      q: 'Vypočítaj ∫ (x + 5)/(x² + x − 2) dx.',
      steps: [
        'Vieme: stupeň čitateľa 1 < stupeň menovateľa 2, môžeme rovno rozkladať.',
        'Menovateľ: x² + x − 2 = 0 má korene 1 a −2, teda x² + x − 2 = (x − 1)(x + 2).',
        'Tvar: (x + 5)/[(x − 1)(x + 2)] = A/(x + 2) + B/(x − 1). Vynásob menovateľom: x + 5 = A(x − 1) + B(x + 2).',
        'Dosaď x = 1: 6 = 3B, B = 2. Dosaď x = −2: 3 = −3A, A = −1.',
        'Integrál: ∫ [−1/(x + 2) + 2/(x − 1)] dx = −ln|x + 2| + 2·ln|x − 1| + C.',
        'Skúška: −1/(x + 2) + 2/(x − 1) = [−(x − 1) + 2(x + 2)]/[(x + 2)(x − 1)] = (x + 5)/(x² + x − 2) ✓.',
      ],
      result: '∫ (x + 5)/(x² + x − 2) dx = −ln|x + 2| + 2·ln|x − 1| + C.',
    },
    deeper: 'Prečo smieš dosadiť korene, hoci tam pôvodný zlomok nie je definovaný? Rovnosť x + 5 = A(x − 1) + B(x + 2) je rovnosť dvoch polynómov a musí platiť pre všetky x, teda aj pre 1 a −2.\n\nDruhý spôsob je porovnanie koeficientov: pravá strana je (A + B)x + (−A + 2B). Porovnaj s x + 5: A + B = 1 a −A + 2B = 5. Sčítaním 3B = 6, B = 2, A = −1. Rovnaký výsledok.',
    check: {
      q: 'Aký tvar rozkladu zvolíš pre 1/[(x − 1)²·(x + 3)]?',
      options: ['A/(x − 1) + B/(x − 1)² + C/(x + 3)', 'A/(x − 1)² + B/(x + 3)', 'A/(x − 1) + B/(x + 3)', 'A/(x − 1) + B/(x + 3) + C'],
      explain: 'Dvojnásobný činiteľ (x − 1)² potrebuje dva zlomky: s (x − 1) aj s (x − 1)². Spolu s (x + 3) sú to tri neznáme, rovnako ako je stupeň menovateľa 3.',
    },
  },
  {
    title: 'Keď čitateľ nie je menší: najprv vydeľ',
    text: 'Ak má čitateľ rovnaký alebo vyšší stupeň ako menovateľ, parciálne zlomky hneď nepoužiješ. Najprv polynómy vydelíš: dostaneš polynóm (ten integruješ z tabuľky) plus rýdzo racionálny zvyšok (ten rozložíš na parciálne zlomky).\n\nNa obrázku je f(x) = (2x + 1)/(x − 2), čitateľ aj menovateľ majú stupeň 1. Po vydelení (2x + 1)/(x − 2) = 2 + 5/(x − 2). Číslo 2 z delenia je presne žltá vodorovná asymptota y = 2 a zlomok 5/(x − 2) je časť, ktorá pri x = 2 (červená priamka) uteká do nekonečna.\n\nAk v menovateli zostane kvadratický výraz bez reálnych koreňov, napríklad x² + 4, výsledok bude obsahovať arctg: ∫ 1/(x² + 4) dx = (1/2)·arctg(x/2) + C.',
    fig: 'mat:limity@asym',
    worked: {
      q: 'Vypočítaj ∫ (2x + 1)/(x − 2) dx.',
      steps: [
        'Vieme: stupeň čitateľa (1) = stupeň menovateľa (1), najprv delíme.',
        'Delenie: 2x + 1 = 2·(x − 2) + 5, teda (2x + 1)/(x − 2) = 2 + 5/(x − 2).',
        'Integruj po členoch: ∫ 2 dx = 2x.',
        '∫ 5/(x − 2) dx = 5·ln|x − 2| (lineárne vnútro s a = 1).',
        'Spolu: 2x + 5·ln|x − 2| + C.',
        'Skúška: (2x + 5 ln|x − 2|)′ = 2 + 5/(x − 2) = [2(x − 2) + 5]/(x − 2) = (2x + 1)/(x − 2) ✓.',
      ],
      result: '∫ (2x + 1)/(x − 2) dx = 2x + 5·ln|x − 2| + C.',
    },
    deeper: 'Príklad s kvadratickým činiteľom: ∫ 1/[x·(x² + 1)] dx. Tvar: A/x + (Bx + C)/(x² + 1). Po vynásobení: 1 = A(x² + 1) + (Bx + C)·x. Pre x = 0: A = 1. Porovnanie koeficientov pri x²: A + B = 0, teda B = −1; pri x: C = 0.\n\nRozklad je 1/x − x/(x² + 1). Prvý zlomok dá ln|x|, druhý (čitateľ je polovica derivácie menovateľa) dá −(1/2)·ln(x² + 1). Výsledok ln|x| − (1/2)·ln(x² + 1) + C.\n\nOdkiaľ (1/2)·arctg(x/2)? Vytkni 4: 1/(x² + 4) = (1/4)·1/(1 + (x/2)²). Lineárna substitúcia t = x/2 dá (1/4)·2·arctg(x/2) = (1/2)·arctg(x/2).',
    check: {
      q: 'Čo urobíš ako prvé pri ∫ (x³ + 1)/(x − 1) dx?',
      options: ['Vydelím čitateľa menovateľom, lebo stupeň čitateľa je väčší', 'Hneď napíšem A/(x − 1)', 'Použijem per partes', 'Zintegrujem čitateľa a menovateľa zvlášť'],
      explain: 'Stupeň čitateľa (3) je väčší ako stupeň menovateľa (1). Rozklad na parciálne zlomky funguje len pre rýdzo racionálnu funkciu, preto najprv delíš.',
    },
  },
  {
    title: 'Kombinácia metód',
    text: 'Skúškové príklady často potrebujú dve metódy za sebou: najprv substitúciu a potom per partes, alebo per partes a potom logaritmický integrál. Neexistuje jediný recept, ale pomôže ti rozhodovací postup v odrážkach.\n\nPri každom medzivýsledku sa pýtaj: je to už tabuľkový integrál? Ak nie, ktorá metóda ho zjednoduší? A na konci vždy rob skúšku deriváciou, je to jediná istá kontrola.',
    bullets: [
      'Je to po úprave (roznásobenie, delenie, mocniny) tabuľkový integrál? → tabuľka.',
      'Vidíš vnútornú funkciu a (až na konštantu) jej deriváciu? → substitúcia.',
      'Je čitateľ derivácia menovateľa? → ln|menovateľ|.',
      'Súčin rôznych typov (x·eˣ, x·sin x, x·ln x, samotný ln x alebo arctg x)? → per partes.',
      'Racionálna funkcia? → (delenie) + parciálne zlomky.',
      'Odmocnina √x vo vnútri (e^(√x), sin √x)? → substitúcia t = √x, x = t², dx = 2t dt.',
    ],
    worked: {
      q: 'Vypočítaj ∫ e^(√x) dx.',
      steps: [
        'Vieme: odmocnina vo vnútri exponenciály, jej derivácia v integráli nie je. Skúsime substitúciu t = √x.',
        'Z t = √x je x = t², teda dx = 2t dt. Integrál: ∫ eᵗ · 2t dt = ∫ 2t·eᵗ dt.',
        'Súčin 2t·eᵗ: per partes s u = 2t, v′ = eᵗ, u′ = 2, v = eᵗ.',
        '∫ 2t·eᵗ dt = 2t·eᵗ − ∫ 2eᵗ dt = 2t·eᵗ − 2eᵗ = 2eᵗ·(t − 1).',
        'Späť t = √x: 2·e^(√x)·(√x − 1) + C.',
        'Skúška: derivácia = 2e^(√x)·(1/(2√x))·(√x − 1) + 2e^(√x)·(1/(2√x)) = e^(√x)·(√x − 1 + 1)/√x = e^(√x) ✓.',
      ],
      result: '∫ e^(√x) dx = 2·e^(√x)·(√x − 1) + C.',
    },
    deeper: 'Ďalší typický príklad: ∫ arctg x dx. Per partes s u = arctg x, v′ = 1: x·arctg x − ∫ x/(1 + x²) dx. Zvyšný integrál je „čitateľ je polovica derivácie menovateľa“: ∫ x/(1 + x²) dx = (1/2)·ln(1 + x²).\n\nVýsledok: ∫ arctg x dx = x·arctg x − (1/2)·ln(1 + x²) + C. Skúška: (x·arctg x)′ = arctg x + x/(1 + x²) a (−(1/2)ln(1 + x²))′ = −x/(1 + x²), súčet arctg x ✓.',
  },
  {
    title: 'Zhrnutie: neurčitý integrál',
    text: 'Integrovanie je hľadanie funkcie, ktorej derivácia je zadaná. Na rozdiel od derivovania neexistuje jeden mechanický postup pre všetko, preto potrebuješ tabuľku a štyri metódy. Každý výsledok si over deriváciou.\n\nNajčastejšie chyby: chýbajúce + C, zlé znamienko pri ∫ sin x, násobenie namiesto delenia pri lineárnom vnútri a „integrál súčinu = súčin integrálov“.',
    bullets: [
      '∫ f(x) dx = F(x) + C, kde F′ = f. Vždy pripíš + C a urob skúšku deriváciou.',
      '∫ xⁿ dx = xⁿ⁺¹/(n + 1) (n ≠ −1), ∫ 1/x dx = ln|x|, ∫ eˣ dx = eˣ.',
      '∫ sin x dx = −cos x, ∫ cos x dx = sin x, ∫ 1/(1 + x²) dx = arctg x.',
      'Súčet integruj po členoch, konštantu vytiahni; pre súčin také pravidlo neexistuje.',
      'Substitúcia: t = vnútro, dt = (vnútro)′ dx, všetko prepíš na t, na konci späť na x.',
      '∫ f(ax + b) dx = F(ax + b)/a;  ∫ f′/f dx = ln|f|.',
      'Per partes: ∫ u·v′ = u·v − ∫ u′·v; u = polynóm (pri eˣ, sin, cos), u = ln x alebo arctg x (pri polynóme).',
      'Racionálna funkcia: najprv vydeľ (ak treba), rozlož menovateľ, A/(x − a) → A·ln|x − a|.',
    ],
  },
];

export default steps;
