import type { Step } from '../steps';

// Matematika 1, prednáška 3: Matice, operácie, násobenie, Gaussov tvar, elementárne úpravy, hodnosť, regulárna a singulárna matica.

const steps: Step[] = [
  {
    title: 'Čo je matica',
    text: 'Matica je obdĺžniková tabuľka čísel usporiadaných do riadkov a stĺpcov. Rozmer matice zapisujeme m×n: m je počet riadkov, n počet stĺpcov (vždy najprv riadky!). Matica 2×3 má teda 2 riadky a 3 stĺpce.\n\nPrvok matice A v i-tom riadku a j-tom stĺpci označujeme aᵢⱼ. Napríklad a₂₃ je prvok v 2. riadku a 3. stĺpci. V tejto aplikácii maticu píšeme po riadkoch: [[1, 2, 3], [4, 5, 6]] znamená 1. riadok 1, 2, 3 a 2. riadok 4, 5, 6.\n\nPrečo matice? Sústava rovníc s mnohými neznámymi sa dá zapísať ako jedna matica a riešiť mechanickým postupom. V geodézii sú matice všade: transformácie súradníc, vyrovnanie meraní metódou najmenších štvorcov, výpočty v GIS.',
    analogy: 'Matica je ako tabuľka v Exceli: riadky sú napríklad študenti, stĺpce predmety a čísla známky. Prvok a₂₃ je „známka 2. študenta z 3. predmetu“.',
    check: {
      q: 'Aký rozmer má matica [[1, 2, 3], [4, 5, 6]] a čo je jej prvok a₂₃?',
      options: ['2×3, a₂₃ = 6', '3×2, a₂₃ = 6', '2×3, a₂₃ = 5', '3×2, a₂₃ = 3'],
      explain: 'Matica má 2 riadky a 3 stĺpce, teda 2×3. Prvok a₂₃ je v 2. riadku (4, 5, 6) na 3. mieste, teda 6.',
    },
  },
  {
    title: 'Špeciálne matice a transponovanie',
    text: 'Niektoré matice majú vlastné mená a budeš ich stretávať stále. Štvorcová matica má rovnako veľa riadkov ako stĺpcov (n×n). Jej prvky a₁₁, a₂₂, …, aₙₙ tvoria hlavnú diagonálu (zľava hore doprava dole).\n\nTransponovaná matica Aᵀ vznikne tak, že riadky prepíšeš ako stĺpce: prvý riadok sa stane prvým stĺpcom, druhý druhým atď. Z matice m×n vznikne matica n×m. Matica, pre ktorú platí Aᵀ = A, sa volá symetrická (je súmerná podľa hlavnej diagonály).',
    bullets: [
      'Nulová matica O: samé nuly.',
      'Jednotková matica E (niekde I): jednotky na diagonále, inde nuly, napr. E = [[1, 0], [0, 1]].',
      'Diagonálna matica: nenulové prvky iba na hlavnej diagonále.',
      'Horná trojuholníková: pod diagonálou samé nuly, napr. [[1, 2, 1], [0, 1, 1], [0, 0, 2]].',
      'Symetrická: aᵢⱼ = aⱼᵢ, napr. [[2, 1], [1, 2]].',
    ],
    worked: {
      q: 'Urči transponovanú maticu k A = [[1, 2, 3], [4, 5, 6]].',
      steps: [
        'Vieme: A má rozmer 2×3, riadky (1, 2, 3) a (4, 5, 6).',
        'Hľadáme: Aᵀ, ktorá bude mať rozmer 3×2.',
        '1. riadok A sa stane 1. stĺpcom: stĺpec 1, 2, 3.',
        '2. riadok A sa stane 2. stĺpcom: stĺpec 4, 5, 6.',
        'Zapíšeme po riadkoch: 1. riadok Aᵀ je 1, 4; 2. riadok 2, 5; 3. riadok 3, 6.',
        'Kontrola: prvok a₂₃ = 6 musí byť v Aᵀ na mieste (3, 2). Je tam. Sedí.',
      ],
      result: 'Aᵀ = [[1, 4], [2, 5], [3, 6]] (rozmer 3×2).',
    },
  },
  {
    title: 'Sčítanie a násobenie číslom',
    text: 'Sčítať (aj odčítať) môžeš iba matice rovnakého rozmeru. Sčítavaš prvok po prvku: prvok na mieste (1, 1) s prvkom na mieste (1, 1) atď. Matice 2×2 a 2×3 sa sčítať nedajú.\n\nNásobenie matice číslom k (skalárom) znamená vynásobiť číslom k každý prvok. Platia obvyklé pravidlá ako pri číslach: A + B = B + A a k·(A + B) = k·A + k·B.',
    formula: {
      f: '(A + B)ᵢⱼ = aᵢⱼ + bᵢⱼ     (k·A)ᵢⱼ = k·aᵢⱼ',
      what: 'Sčítanie matíc a násobok matice číslom',
      vars: [
        ['aᵢⱼ', 'prvok matice A v i-tom riadku a j-tom stĺpci'],
        ['k', 'reálne číslo (skalár)'],
        ['rozmer', 'A a B musia mať rovnaký rozmer'],
      ],
    },
    worked: {
      q: 'A = [[1, −2], [0, 3]], B = [[4, 1], [−1, 2]]. Vypočítaj 2A − B.',
      steps: [
        'Vieme: A aj B majú rozmer 2×2, môžeme ich odčítať.',
        'Hľadáme: maticu 2A − B.',
        'Najprv 2A, každý prvok krát 2: 2A = [[2, −4], [0, 6]].',
        'Odčítame B prvok po prvku: (1, 1): 2 − 4 = −2, (1, 2): −4 − 1 = −5.',
        '(2, 1): 0 − (−1) = 1, (2, 2): 6 − 2 = 4.',
        'Kontrola znamienka: 0 − (−1) = +1, mínus a mínus dáva plus.',
      ],
      result: '2A − B = [[−2, −5], [1, 4]].',
    },
  },
  {
    title: 'Násobenie matíc: riadok krát stĺpec',
    text: 'Násobenie matíc NIE JE násobenie prvok po prvku. Prvok súčinu A·B na mieste (i, j) dostaneš tak, že zoberieš i-ty RIADOK matice A a j-ty STĹPEC matice B, vynásobíš ich prvky po dvojiciach a výsledky sčítaš. Je to vlastne skalárny súčin riadku a stĺpca.\n\nSleduj animáciu: zvýraznený riadok matice A sa „prenásobí“ so zvýrazneným stĺpcom matice B a výsledok padne do žltého políčka. 1. riadok × 1. stĺpec dá prvok (1, 1), 1. riadok × 2. stĺpec dá prvok (1, 2) a tak ďalej.\n\nPomôcka: prst ľavej ruky ide po riadku zľava doprava, prst pravej ruky po stĺpci zhora dole. Čísla, na ktorých sú prsty naraz, vynásobíš a všetko sčítaš.',
    fig: 'mat:matice',
    analogy: 'Nákup: riadok sú počty kusov (2 rožky a 1 mlieko), stĺpec sú ceny 0,15 € a 1,20 €. Spolu zaplatíš 2·0,15 + 1·1,20 = 1,50 €. Presne takto sa násobí riadok so stĺpcom.',
    formula: {
      f: '(A·B)ᵢⱼ = aᵢ₁·b₁ⱼ + aᵢ₂·b₂ⱼ + … + aᵢₙ·bₙⱼ',
      what: 'Prvok súčinu: i-ty riadok A krát j-ty stĺpec B',
      vars: [
        ['i', 'číslo riadku v A (aj vo výsledku)'],
        ['j', 'číslo stĺpca v B (aj vo výsledku)'],
        ['n', 'počet stĺpcov A = počet riadkov B'],
      ],
    },
    deeper: 'Prečo práve riadok krát stĺpec? Matice vznikli zo sústav rovníc. Ak y₁ = 1·x₁ + 2·x₂ a y₂ = 3·x₁ + 4·x₂, zapíšeme to ako y = A·x s A = [[1, 2], [3, 4]]: každý riadok A sa „prenásobí“ so stĺpcom neznámych x.\n\nKeď potom aj x vyjadríš pomocou ďalších premenných, x = B·z, dosadením dostaneš y = A·(B·z). Po roznásobení vyjde koeficient pri každom z presne ako súčet súčinov riadku A a stĺpca B. Súčin A·B teda znamená „najprv urob B, potom A“, a preto na poradí záleží.',
    worked: {
      q: 'Vypočítaj [[1, 2], [3, 4]] · [[5, 6], [7, 8]] (ako v animácii).',
      steps: [
        'Vieme: A = [[1, 2], [3, 4]], B = [[5, 6], [7, 8]], obe 2×2, výsledok bude 2×2.',
        'Prvok (1, 1): 1. riadok A (1, 2) × 1. stĺpec B (5, 7): 1·5 + 2·7 = 5 + 14 = 19.',
        'Prvok (1, 2): 1. riadok (1, 2) × 2. stĺpec (6, 8): 1·6 + 2·8 = 6 + 16 = 22.',
        'Prvok (2, 1): 2. riadok (3, 4) × 1. stĺpec (5, 7): 3·5 + 4·7 = 15 + 28 = 43.',
        'Prvok (2, 2): 2. riadok (3, 4) × 2. stĺpec (6, 8): 3·6 + 4·8 = 18 + 32 = 50.',
      ],
      result: 'A·B = [[19, 22], [43, 50]].',
    },
  },
  {
    title: 'Kedy sa matice dajú násobiť',
    text: 'Riadok A a stĺpec B musia mať rovnako veľa prvkov, inak by si nemal čo s čím násobiť. Preto počet stĺpcov prvej matice musí byť rovný počtu riadkov druhej matice.\n\nPomôcka: napíš rozmery vedľa seba, (m×n)·(n×p). Vnútorné čísla sa musia rovnať a vonkajšie ti dajú rozmer výsledku m×p. Napríklad (2×3)·(3×2) = 2×2, ale (2×3)·(2×3) sa nedá.\n\nPozor: aj keď sa dá vypočítať A·B, nemusí sa dať B·A. A aj keď sa dajú obe, môžu mať rôzny rozmer.',
    formula: {
      f: '(m×n) · (n×p) = (m×p)',
      what: 'Rozmer súčinu matíc',
      vars: [
        ['n', 'vnútorné rozmery sa musia rovnať'],
        ['m×p', 'vonkajšie rozmery = rozmer výsledku'],
      ],
    },
    worked: {
      q: 'A = [[1, 0, 2], [−1, 3, 1]] (2×3), B = [[3, 1], [2, 1], [1, 0]] (3×2). Vypočítaj A·B. Aký rozmer by mala B·A?',
      steps: [
        'Vieme: (2×3)·(3×2), vnútorné trojky sa rovnajú, výsledok bude 2×2.',
        '(1, 1): 1. riadok (1, 0, 2) × 1. stĺpec (3, 2, 1) = 3 + 0 + 2 = 5.',
        '(1, 2): (1, 0, 2) × 2. stĺpec (1, 1, 0) = 1 + 0 + 0 = 1.',
        '(2, 1): 2. riadok (−1, 3, 1) × (3, 2, 1) = −3 + 6 + 1 = 4.',
        '(2, 2): (−1, 3, 1) × (1, 1, 0) = −1 + 3 + 0 = 2.',
        'B·A: (3×2)·(2×3), vnútorné dvojky sa rovnajú, výsledok by bol 3×3. A·B a B·A majú dokonca rôzny rozmer.',
      ],
      result: 'A·B = [[5, 1], [4, 2]] (2×2); B·A by bola matica 3×3.',
    },
    check: {
      q: 'Matica A má rozmer 3×2 a matica B tiež 3×2. Dá sa vypočítať A·B?',
      options: ['Nie, lebo 2 ≠ 3', 'Áno, výsledok 3×2', 'Áno, výsledok 3×3', 'Áno, výsledok 2×2'],
      explain: '(3×2)·(3×2): vnútorné čísla sú 2 a 3, nerovnajú sa, súčin neexistuje. Dal by sa napríklad A·Bᵀ = (3×2)·(2×3), výsledok 3×3.',
    },
  },
  {
    title: 'Pozor: na poradí záleží',
    text: 'Pri číslach platí 3·5 = 5·3. Pri maticiach vo všeobecnosti A·B ≠ B·A! Hovoríme, že násobenie matíc nie je komutatívne, a preto si vždy strážiš, z ktorej strany násobíš. Animácia ukazuje A·B. Skús si vypočítať B·A a uvidíš, že vyjde niečo iné.\n\nOstatné pravidlá fungujú ako pri číslach: (A·B)·C = A·(B·C), takže zátvorky môžeš presúvať, a A·(B + C) = A·B + A·C. Jednotková matica sa správa ako jednotka: A·E = E·A = A.\n\nPri transponovaní súčinu sa poradie otočí: (A·B)ᵀ = Bᵀ·Aᵀ.',
    fig: 'mat:matice',
    analogy: 'Ponožky a topánky: najprv ponožky, potom topánky. Opačné poradie dá úplne iný výsledok. A keď sa vyzúvaš, ideš v opačnom poradí, najprv topánky a potom ponožky. Rovnako sa otáča poradie pri (A·B)ᵀ = Bᵀ·Aᵀ.',
    formula: {
      f: 'A·B ≠ B·A     (A·B)ᵀ = Bᵀ·Aᵀ     A·E = E·A = A',
      what: 'Pravidlá násobenia matíc',
      vars: [
        ['A·B ≠ B·A', 'vo všeobecnosti, poradie nesmieš meniť'],
        ['Bᵀ·Aᵀ', 'transponovaný súčin = súčin transponovaných v opačnom poradí'],
        ['E', 'jednotková matica, „jednotka“ pre násobenie'],
      ],
    },
    worked: {
      q: 'Pre A = [[1, 2], [3, 4]] a B = [[5, 6], [7, 8]] vypočítaj B·A a porovnaj s A·B = [[19, 22], [43, 50]].',
      steps: [
        'Teraz je vľavo B, takže berieme riadky B a stĺpce A.',
        '(1, 1): (5, 6) × (1, 3) = 5 + 18 = 23.',
        '(1, 2): (5, 6) × (2, 4) = 10 + 24 = 34.',
        '(2, 1): (7, 8) × (1, 3) = 7 + 24 = 31.',
        '(2, 2): (7, 8) × (2, 4) = 14 + 32 = 46.',
        'Porovnanie: [[23, 34], [31, 46]] ≠ [[19, 22], [43, 50]].',
      ],
      result: 'B·A = [[23, 34], [31, 46]] ≠ A·B. Na poradí naozaj záleží.',
    },
    check: {
      q: 'Čomu sa rovná (A·B)ᵀ?',
      options: ['Bᵀ·Aᵀ', 'Aᵀ·Bᵀ', 'B·A', 'A·B'],
      explain: 'Pri transponovaní súčinu sa poradie matíc otočí. Aᵀ·Bᵀ by často nemalo ani správny rozmer.',
    },
  },
  {
    title: 'Matica sústavy rovníc',
    text: 'Hlavný dôvod, prečo sa učíš matice, sú sústavy lineárnych rovníc. Sústavu zapíšeš ako A·x = b: A je matica koeficientov (čísla pred neznámymi), x je stĺpec neznámych a b je stĺpec pravých strán.\n\nRozšírená matica sústavy (A|b) je matica A, ku ktorej za zvislú čiaru pripíšeš stĺpec pravých strán. S ňou budeš robiť Gaussovu elimináciu. Ak neznáma v niektorej rovnici chýba, napíš na jej miesto 0, na to sa často zabúda.\n\nKaždá rovnica s dvoma neznámymi je priamka v rovine (na obrázku). Riešenie sústavy je ich spoločný bod. Priamky sa môžu pretnúť (jedno riešenie), byť rovnobežné (žiadne riešenie) alebo splývať (nekonečne veľa riešení). Ktorý prípad nastane, zistíš z hodnosti matice.',
    fig: 'lines2',
    worked: {
      q: 'Zapíš sústavu x + 2y + z = 8, 2x + 5y + 3z = 21, x + 3y + 4z = 19 maticovo a napíš rozšírenú maticu.',
      steps: [
        'Matica koeficientov: riadky sú čísla pred x, y, z v jednotlivých rovniciach.',
        'A = [[1, 2, 1], [2, 5, 3], [1, 3, 4]], stĺpec neznámych x = (x, y, z)ᵀ, stĺpec pravých strán b = (8, 21, 19)ᵀ (ᵀ tu znamená, že ide o stĺpec).',
        'Rozšírená matica: (A|b) = [[1, 2, 1 | 8], [2, 5, 3 | 21], [1, 3, 4 | 19]].',
        'Kontrola: 1. riadok A krát stĺpec x dá 1·x + 2·y + 1·z, čo je ľavá strana 1. rovnice.',
      ],
      result: 'A·x = b, kde A = [[1, 2, 1], [2, 5, 3], [1, 3, 4]], b = (8, 21, 19)ᵀ; (A|b) = [[1, 2, 1 | 8], [2, 5, 3 | 21], [1, 3, 4 | 19]].',
    },
  },
  {
    title: 'Elementárne riadkové úpravy',
    text: 'S riadkami matice smieš robiť tri „povolené ťahy“, ktoré nemenia riešenie sústavy ani hodnosť matice. Volajú sa elementárne riadkové úpravy a stojí na nich celá Gaussova eliminácia.\n\nZápis R₂ − 2·R₁ znamená: nový 2. riadok = starý 2. riadok mínus dvojnásobok 1. riadku. Prvý riadok pritom ostáva nezmenený! Úpravu rob prvok po prvku cez celý riadok, aj cez stĺpec pravých strán.\n\nZakázané je napríklad násobiť riadok nulou (stratil by si rovnicu) alebo pri riešení sústavy miešať stĺpce.',
    bullets: [
      '1. Výmena dvoch riadkov (Rᵢ ↔ Rⱼ).',
      '2. Vynásobenie riadku NENULOVÝM číslom (k·Rᵢ, k ≠ 0).',
      '3. Pripočítanie násobku iného riadku (Rᵢ + k·Rⱼ).',
    ],
    analogy: 'Rovnica je ako rovnováha na váhach. Keď obe strany vynásobíš rovnakým číslom alebo na obe strany pridáš to isté (inú rovnicu), váhy ostanú v rovnováhe a riešenie sa nezmení.',
    deeper: 'Prečo úpravy nemenia riešenie? Ak čísla x, y, z spĺňajú dve rovnice, spĺňajú aj ich súčet a aj rovnicu vynásobenú číslom. Naopak, každú úpravu vieš vrátiť späť: výmenu opäť výmenou, násobenie číslom k delením číslom k, pripočítanie k·Rⱼ odčítaním k·Rⱼ. Preto má nová sústava presne tie isté riešenia ako pôvodná.\n\nPreto je zakázané násobiť nulou: takú úpravu už vrátiť nevieš a rovnica sa navždy stratí.',
    check: {
      q: 'Ktorá úprava NIE JE elementárna riadková úprava?',
      options: ['Vynásobenie riadku nulou', 'Výmena dvoch riadkov', 'Vynásobenie riadku číslom −3', 'Pripočítanie dvojnásobku 1. riadku k 3. riadku'],
      explain: 'Násobiť sa smie iba nenulovým číslom. Nulou by si riadok vymazal a zmenil by sa význam sústavy aj hodnosť matice.',
    },
  },
  {
    title: 'Gaussov (stupňovitý) tvar',
    text: 'Cieľom Gaussovej eliminácie je dostať maticu do stupňovitého (Gaussovho) tvaru: každý ďalší riadok začína viac nulami ako predošlý, takže nenulové prvky tvoria „schody“ a pod nimi sú samé nuly. Prvý nenulový prvok riadku sa volá vedúci prvok (pivot).\n\nAnimácia ukazuje presne to: maticu [[1, 2, 1], [2, 5, 3], [1, 3, 4]] upravujeme tromi krokmi. Najprv vyrobíme nuly v 1. stĺpci pod jednotkou, potom nulu v 2. stĺpci pod druhým pivotom.\n\nTip: je výhodné mať na mieste pivota číslo 1 (ak treba, vymeň riadky). Potom násobky, ktoré odčítavaš, sú priamo čísla pod pivotom a vyhneš sa zlomkom.',
    fig: 'gauss',
    bullets: [
      '1. Vyber pivot v 1. stĺpci (ideálne 1) a daj jeho riadok navrch.',
      '2. Pod pivotom vyrob nuly: od každého riadku odčítaj vhodný násobok 1. riadku.',
      '3. Prvý riadok „zakry“ a to isté zopakuj so zvyšnou menšou maticou.',
      '4. Skonči, keď sú pod schodmi samé nuly.',
    ],
    worked: {
      q: 'Uprav maticu A = [[1, 2, 1], [2, 5, 3], [1, 3, 4]] na stupňovitý tvar.',
      steps: [
        'Pivot je a₁₁ = 1. Pod ním potrebujeme nuly namiesto 2 a 1.',
        'R₂ − 2·R₁: (2 − 2, 5 − 4, 3 − 2) = (0, 1, 1).',
        'R₃ − R₁: (1 − 1, 3 − 2, 4 − 1) = (0, 1, 3).',
        'Pivot 2. riadku je 1 na mieste (2, 2). Pod ním je 1, preto R₃ − R₂: (0, 1 − 1, 3 − 1) = (0, 0, 2).',
        'Matica [[1, 2, 1], [0, 1, 1], [0, 0, 2]] má pod diagonálou samé nuly.',
      ],
      result: 'Stupňovitý tvar: [[1, 2, 1], [0, 1, 1], [0, 0, 2]].',
    },
  },
  {
    title: 'Hodnosť matice',
    text: 'Hodnosť matice h(A) je počet nenulových riadkov v stupňovitom tvare. Nenulový riadok je taký, ktorý má aspoň jeden prvok rôzny od nuly. Matica z predošlého kroku má po úprave 3 nenulové riadky, takže h(A) = 3, ako ukazuje aj animácia.\n\nČo hodnosť znamená? Udáva, koľko riadkov je naozaj „nových“, teda lineárne nezávislých. Ak je nejaký riadok kombináciou iných (napríklad dvojnásobkom iného), po eliminácii z neho zostanú samé nuly a do hodnosti sa nepočíta.\n\nHodnosť nikdy nie je väčšia ako počet riadkov ani ako počet stĺpcov: h(A) ≤ min(m, n). Elementárne úpravy hodnosť nemenia, preto ju počítaš práve Gaussovou elimináciou.',
    fig: 'gauss',
    formula: {
      f: 'h(A) = počet nenulových riadkov v stupňovitom tvare     h(A) ≤ min(m, n)',
      what: 'Hodnosť matice',
      vars: [
        ['h(A)', 'hodnosť matice (inde aj rank alebo r(A))'],
        ['m, n', 'počet riadkov a počet stĺpcov'],
        ['nulový riadok', 'samé nuly, do hodnosti sa nepočíta'],
      ],
    },
    deeper: 'Prečo nulový riadok znamená závislosť? Ak sa riadok úpravami zmenil na samé nuly, znamená to, že keď si od neho odčítal vhodné násobky ostatných riadkov, nič nezostalo. Bol teda zložený z ostatných riadkov, bol ich lineárnou kombináciou.\n\nNenulové riadky stupňovitého tvaru sú naopak nezávislé: každý má pivot v stĺpci, v ktorom majú všetky nižšie riadky nulu, takže ho z nich vyskladať nevieš. Ich počet je preto presne počet nezávislých riadkov.',
    worked: {
      q: 'Urči hodnosť matice A = [[1, 2, 3], [2, 4, 6], [1, 1, 1]].',
      steps: [
        'Vieme: matica 3×3, pivot a₁₁ = 1.',
        'R₂ − 2·R₁: (2 − 2, 4 − 4, 6 − 6) = (0, 0, 0). Druhý riadok bol dvojnásobkom prvého, preto zmizol.',
        'R₃ − R₁: (1 − 1, 1 − 2, 1 − 3) = (0, −1, −2).',
        'Vymeníme R₂ ↔ R₃, aby bol nulový riadok dole: [[1, 2, 3], [0, −1, −2], [0, 0, 0]].',
        'Nenulové riadky sú 2.',
      ],
      result: 'h(A) = 2.',
    },
  },
  {
    title: 'Hodnosť obdĺžnikovej matice',
    text: 'Hodnosť počítaš rovnako aj pri matici, ktorá nie je štvorcová. Schody nemusia byť pravidelné: pivot v ďalšom riadku môže „preskočiť“ jeden alebo viac stĺpcov. To je v poriadku, dôležité je iba to, aby každý ďalší riadok začínal viac nulami.\n\nČasto určuješ hodnosť matice s parametrom. Urobíš elimináciu a sleduješ, pre ktoré hodnoty parametra vznikne nulový riadok.',
    worked: {
      q: 'Urči hodnosť matice A = [[1, 2, −1, 3], [2, 4, 1, 0], [3, 6, 0, 3]] (rozmer 3×4).',
      steps: [
        'Vieme: 3 riadky a 4 stĺpce, takže h(A) ≤ 3.',
        'R₂ − 2·R₁: (2 − 2, 4 − 4, 1 + 2, 0 − 6) = (0, 0, 3, −6).',
        'R₃ − 3·R₁: (3 − 3, 6 − 6, 0 + 3, 3 − 9) = (0, 0, 3, −6).',
        'V 2. stĺpci sú už nuly, pivot 2. riadku je až v 3. stĺpci (to je ten „preskočený“ schod).',
        'R₃ − R₂: (0, 0, 0, 0).',
        'Stupňovitý tvar [[1, 2, −1, 3], [0, 0, 3, −6], [0, 0, 0, 0]] má 2 nenulové riadky.',
      ],
      result: 'h(A) = 2.',
    },
    check: {
      q: 'Pre aké číslo a má matica [[1, 2], [3, a]] hodnosť 1?',
      options: ['a = 6', 'a = 0', 'a = 3', 'a = 2'],
      explain: 'R₂ − 3·R₁ = (0, a − 6). Tento riadok je nulový pri a = 6 a vtedy h = 1. Pre iné a je h = 2.',
    },
  },
  {
    title: 'Regulárna a singulárna matica',
    text: 'Pri štvorcovej matici n×n rozlišujeme dva prípady. Regulárna matica má plnú hodnosť h(A) = n: žiadny riadok nie je zbytočný. Singulárna matica má h(A) < n: po eliminácii v nej vznikne aspoň jeden nulový riadok.\n\nRegulárna matica má inverznú maticu A⁻¹ a nenulový determinant, singulárna nie. Obrázok to ukazuje geometricky: matica premení štvorec na rovnobežník. Pri singulárnej matici (voľba det 0) sa štvorec sploští do úsečky a späť ho už „rozbaliť“ nevieš. Determinantom a inverzným maticiam sa venuje ďalšia téma.\n\nSústava A·x = b so štvorcovou regulárnou maticou A má vždy práve jedno riešenie.',
    fig: 'mat:determinanty',
    worked: {
      q: 'Je matica A = [[1, 2, 3], [4, 5, 6], [7, 8, 9]] regulárna, alebo singulárna?',
      steps: [
        'Vieme: štvorcová matica 3×3, regulárna je, ak h(A) = 3.',
        'R₂ − 4·R₁: (4 − 4, 5 − 8, 6 − 12) = (0, −3, −6).',
        'R₃ − 7·R₁: (7 − 7, 8 − 14, 9 − 21) = (0, −6, −12).',
        'R₃ − 2·R₂: (0, −6 + 6, −12 + 12) = (0, 0, 0).',
        'Vznikol nulový riadok, h(A) = 2 < 3.',
      ],
      result: 'h(A) = 2, matica je singulárna (nemá inverznú maticu, det A = 0).',
    },
    check: {
      q: 'Matica 3×3 má po Gaussovej eliminácii jeden nulový riadok. Čo platí?',
      options: ['h(A) = 2, matica je singulárna', 'h(A) = 3, matica je regulárna', 'h(A) = 1, matica je regulárna', 'Matica má inverznú maticu'],
      explain: 'Dva nenulové riadky dávajú h(A) = 2 < 3. Matica nemá plnú hodnosť, je singulárna a inverznú maticu nemá.',
    },
  },
  {
    title: 'Zhrnutie',
    text: 'Matice sú tabuľky čísel a najviac práce s nimi je pri násobení a pri Gaussovej eliminácii. Hodnosť ti povie, koľko „naozajstných“ riadkov matica má, a rozhoduje o regulárnosti aj o riešiteľnosti sústav.\n\nTypické chyby: rozmer zapísaný ako stĺpce×riadky, násobenie prvok po prvku namiesto riadok × stĺpec, prehodené poradie A·B a B·A a chyby v znamienkach pri úprave R₂ − k·R₁.',
    bullets: [
      'Rozmer m×n = riadky × stĺpce; aᵢⱼ je v i-tom riadku a j-tom stĺpci.',
      'Aᵀ: riadky sa stanú stĺpcami.',
      'Sčítanie a násobok číslom: prvok po prvku, rovnaký rozmer.',
      'Násobenie: riadok × stĺpec, (m×n)·(n×p) = m×p.',
      'A·B ≠ B·A; (A·B)ᵀ = Bᵀ·Aᵀ; A·E = E·A = A.',
      'Elementárne úpravy: výmena riadkov, násobenie nenulovým číslom, pripočítanie násobku iného riadku.',
      'Stupňovitý tvar: pod schodmi nuly; hodnosť = počet nenulových riadkov.',
      'Štvorcová n×n: h = n → regulárna (det ≠ 0, existuje A⁻¹); h < n → singulárna.',
    ],
  },
];

export default steps;
