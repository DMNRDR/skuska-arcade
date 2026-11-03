import type { Step } from '../steps';

// Metódy zobrazovania, 2. písomka (cvičenie v 9. týždni, pi 13. 11. 2026). Rozsah presne podľa
// „2 Test - okruh otazok a uloh“ (AIS, dokumentový server, 27. 10. 2026). Výklad podľa prednášok P4 až P7
// a cvičení C5 až C8 (T. Rückschlossová). Rysovačky a pokusy sú v learn/widgets (miesto určuje EXTRAS v registry.ts).

const pisomka2: Step[] = [
  {
    title: 'Čo bude na 2. písomke',
    text: 'Píše sa na cvičení v 9. týždni, teda v piatok 13. 11. Trvá asi 25 až 30 minút a je za 10 bodov. Z prvej písomky máš 2,5 bodu, na skúšku treba spolu aspoň 10 bodov z troch písomiek.\n\nUčiteľka zverejnila presný okruh otázok a úloh. Sú v ňom štyri témy. Každú máš tu ako samostatnú lekciu a všetky otázky aj so vzorovými odpoveďami nájdeš v „Tézach 2. písomky“.',
    bullets: [
      'Axonometria: definícia, Pohlkeho veta, typy, kružnica v kavaliernej axonometrii (rysovanie)',
      'Lineárna perspektíva: stredové premietanie, H, d, úbežník, horizont, priečelná a nepriečelná poloha, vtáčia a žabia',
      'Rotačné plochy: prvky, typy, prieniky gúľ (rysovanie), guľa s valcom a kužeľom',
      'Fotogrametria: prvky vnútornej orientácie (H, f), kde leží S, zvislá snímka štvorca, šikmá snímka kvádra (rysovanie)',
    ],
    check: {
      q: 'Koľko bodov je za 2. písomku?',
      options: ['10', '12', '8', '30'],
      explain: 'Hárok v AIS: 1. písomka max 12 b, 2. písomka max 10 b, 3. písomka max 8 b. Spolu 30.',
    },
  },
  {
    title: 'Ako to stihnúť',
    text: 'Pri každej otázke z okruhu je „načrtnite obrázok“. Náčrt je polovica bodov, tak si pri učení vždy kresli.\n\nNajviac bodov sú rysovacie úlohy. Sú tri: kružnica v kavaliernej axonometrii, prienik gúľ a prvky vnútornej orientácie snímky. Každú máš tu ako rysovačku krok po kroku. Narysuj si ju aspoň raz sám na papier.',
    bullets: [
      'Deň 1: axonometria (lekcia + rysovačka kružnice)',
      'Deň 2: perspektíva (lekcia + pokus s kvádrom)',
      'Deň 3: rotačné plochy (prieniky gúľ)',
      'Deň 4: fotogrametria (množina G, štvorec, kváder)',
      'Deň 5: Tézy 2. písomky v režime Skúšanie',
    ],
  },
  {
    title: 'Označovanie v nových témach',
    text: 'Za chýbajúce označenie sa na prvej písomke strhávali body. Aj teraz popíš všetko, čo zostrojíš.',
    bullets: [
      'Axonometria: osi x, y, z, začiatok O, jednotky jx, jy, jz, priemet bodu A, pôdorys A₁, nárys A₂, bokorys A₃',
      'Stredové premietanie: stred S, priemetňa π, hlavný bod H, dištancia d, priemet Aₛ, úbežník U',
      'Lineárna perspektíva: základnica z, horizont h, predmetová rovina ρ, zorná kružnica',
      'Rotačné plochy: os o, meridián m, rovník kR, hrdlo kH, prienik k',
      'Fotogrametria: úbežníky Ua, Ub, Uc, hlavný bod H, ohnisková vzdialenosť f, sklopené (S)',
    ],
    check: {
      q: 'Ako označíš úbežník priamky a?',
      options: ['Ua (úbežník)', 'H', 'h', 'A₁'],
      explain: 'H je hlavný bod, h horizont a A₁ pôdorys bodu. Úbežník značíme U s indexom priamky alebo smeru.',
    },
  },
];

const axonometria: Step[] = [
  {
    title: 'Čo je axonometria',
    text: 'Axonometria znamená „meranie pozdĺž osí“. Je to rovnobežné premietanie bodov priestoru do jednej axonometrickej priemetne. Spolu s telesom sa premieta aj karteziánska sústava súradníc (O, x, y, z, j), pričom osi x, y, z sa premietnu do troch rôznych priamok.\n\nVýhoda: obrázok sa ľahko zostrojí a dajú sa z neho odčítať rozmery. Nevýhoda: nevyzerá presne tak, ako to vidí oko.',
    formula: {
      f: '(O, x, y, z, j) → (O, x, y, z, jx, jy, jz)',
      what: 'Karteziánska sústava sa premietne do axonometrickej sústavy',
      vars: [
        ['j', 'skutočná jednotka dĺžky'],
        ['jx, jy, jz', 'axonometrické jednotky: priemet jednotky j na každej osi'],
      ],
    },
    check: {
      q: 'Axonometria je…',
      options: ['rovnobežné premietanie do jednej priemetne', 'stredové premietanie', 'kolmé premietanie na dve priemetne', 'premietanie na guľu'],
      explain: 'Je to rovnobežné premietanie. Dve priemetne má Mongeova projekcia, stredové premietanie je perspektíva.',
    },
  },
  {
    title: 'Kolmá alebo šikmá',
    text: 'Delí sa podľa smeru premietania s voči priemetni.\n\nKolmá axonometria: s je kolmý na priemetňu.\nŠikmá axonometria: s nie je kolmý na priemetňu.\n\nNa písomku je šikmá axonometria. Býva zadaná priemetmi osí x, y, z a priemetmi jednotiek jx, jy, jz (prípadne slovom: vojenská, kavalierna, šikmé premietanie).',
    analogy: 'Kolmá je ako tieň v poludnie, keď slnko svieti presne zhora na stenu. Šikmá je ako večerný tieň, natiahnutý do strany.',
    check: {
      q: 'Kedy je axonometria šikmá?',
      options: ['Keď smer premietania nie je kolmý na priemetňu', 'Keď sú osi navzájom kolmé', 'Keď sú všetky jednotky rovnaké', 'Keď je priemetňa vodorovná'],
      explain: 'O type rozhoduje smer premietania s. Ak s nie je kolmý na priemetňu, axonometria je šikmá.',
    },
  },
  {
    title: 'Pohlkeho veta',
    text: 'Ako môže vyzerať axonometrická sústava? Úplne ľubovoľne. To hovorí Pohlkeho veta:\n\nTri úsečky v rovine, ktoré majú spoločný krajný bod a ležia na troch rôznych priamkach, možno vždy považovať za rovnobežný priemet troch navzájom kolmých, rovnako dlhých úsečiek so spoločným krajným bodom (teda jednotiek j na súradnicových osiach).\n\nInak: hocijaké tri čiarky z jedného bodu sú priemetom troch hrán kocky.',
    fig: 'dg-pohlke',
    check: {
      q: 'Čo hovorí Pohlkeho veta?',
      options: [
        'Tri úsečky zo spoločného bodu na troch rôznych priamkach sú vždy rovnobežným priemetom troch kolmých rovnako dlhých úsečiek',
        'Kolmé úsečky sa premietajú vždy kolmo',
        'Rovnobežné premietanie zachováva dĺžky',
        'Os z sa musí premietnuť zvislo',
      ],
      explain: 'Preto si osi a jednotky šikmej axonometrie môžeš zvoliť ľubovoľne, vždy to bude priemet kocky.',
    },
  },
  {
    title: 'Izometria, dimetria, trimetria',
    text: 'Delenie podľa axonometrických jednotiek:\n\nIzometria: všetky tri rovnaké, jx = jy = jz.\nDimetria: dve rovnaké, tretia iná (napríklad jx = jz ≠ jy).\nTrimetria: všetky tri rôzne.\n\nPri kolmej izometrii je axonometrický trojuholník rovnostranný a osi zvierajú 120°. Pri dimetrii je rovnoramenný, pri trimetrii rôznostranný.',
    analogy: 'Izo = rovnaký, di = dva, tri = tri. Koľko rôznych dĺžok jednotiek máš, taký je názov.',
    check: {
      q: 'Kedy hovoríme o dimetrii?',
      options: ['Dve axonometrické jednotky sú rovnaké, tretia iná', 'Všetky tri jednotky sú rovnaké', 'Všetky tri sú rôzne', 'Osi sú kolmé'],
      explain: 'Dimetria: dve zhodné jednotky. Izometria: všetky tri. Trimetria: žiadne dve.',
    },
  },
  {
    title: 'Štyri typy šikmej axonometrie',
    text: 'Delenie podľa jednotiek a uhlov osí. Toto je otázka 5 z okruhu, oplatí sa ju vedieť naspamäť aj s náčrtom.',
    fig: 'dg-ax-typy',
    bullets: [
      'Vojenská: jx = jy = jz, x ⊥ y',
      'Kavalierna: jx = jy = jz, x ⊥ z (alebo y ⊥ z)',
      'Šikmé premietanie: jx = jz, jy < j, x ⊥ z (alebo jy = jz, jx < j, y ⊥ z)',
      'Všeobecná šikmá: osi aj jednotky ľubovoľné (spĺňajú Pohlkeho vetu)',
    ],
    check: {
      q: 'V ktorej axonometrii platí x ⊥ y a všetky jednotky sú rovnaké?',
      options: ['Vo vojenskej', 'V kavaliernej', 'V šikmom premietaní', 'V kolmej izometrii'],
      explain: 'Vojenská: x ⊥ y, jx = jy = jz. Kavalierna má kolmé x a z.',
    },
  },
  {
    title: 'Vojenská axonometria',
    text: 'Priemetňa je pôdorysňa (alebo s ňou rovnobežná). Preto sa zachová tvar aj veľkosť všetkého, čo leží vodorovne: osi x a y sú kolmé a jednotky na nich rovnaké.\n\nSmer premietania zviera s priemetňou 45°, preto aj jednotka na osi z ostane j. Os z sa kreslí zvyčajne zvislo.\n\nPoužitie: veľké územné celky, sídliská, interiéry pre laikov. Kružnica v pôdorysni ostane kružnicou.',
    formula: { f: 'x ⊥ y,  jx = jy = jz = j', what: 'Vojenská axonometria' },
  },
  {
    title: 'Kavalierna a šikmé premietanie',
    text: 'Priemetňa je nárysňa (alebo bokorysňa). Zachová sa tvar prednej steny: osi x a z sú kolmé (prípadne y a z) a jednotky na nich rovnaké.\n\nKavalierna: smer premietania zviera s priemetňou 45°, preto aj jy = j. Hĺbka sa nekráti, teleso vyzerá pretiahnuto.\n\nŠikmé premietanie (kabinetná): uhol je väčší ako 45°, preto jy < j. Odstraňuje neprirodzenú hĺbku. Špeciálny prípad: voľné rovnobežné premietanie, jy = j/2.',
    bullets: ['Kavalierna: x ⊥ z, jx = jy = jz = j', 'Šikmé premietanie: x ⊥ z, jx = jz = j, jy < j'],
    check: {
      q: 'Čím sa líši šikmé premietanie od kavaliernej axonometrie?',
      options: ['Jednotka na hĺbkovej osi je kratšia (jy < j)', 'Os x nie je kolmá na z', 'Priemetňa je pôdorysňa', 'Nič, je to to isté'],
      explain: 'Obe majú x ⊥ z a jx = jz = j. Šikmé premietanie skracuje hĺbku, kavalierna nie.',
    },
  },
  {
    title: 'Kružnica v kavaliernej axonometrii',
    text: 'Rysovacia úloha z okruhu: v kavaliernej axonometrii zobraz kružnicu k(S, r) v pôdorysni, napríklad S(4, 5, 0), r = 3 cm.\n\nKružnica v pôdorysni nie je v kavaliernej rovnobežná s priemetňou, preto sa zobrazí ako elipsa. Dva kolmé priemery kružnice (jeden ∥ x, druhý ∥ y) sa zobrazia do združených priemerov elipsy. Z nich dostaneš body elipsy priečkovou konštrukciou.',
    check: {
      q: 'Na čo sa zobrazia dva kolmé priemery kružnice v šikmej axonometrii?',
      options: ['Na združené priemery elipsy', 'Na hlavnú a vedľajšiu os elipsy', 'Na dve kolmé úsečky', 'Na asymptoty'],
      explain: 'Kolmosť sa v rovnobežnom premietaní nezachová. Priemery ∥ x a ∥ y dajú združené priemery, nie osi elipsy.',
    },
  },
  {
    title: 'Prečo priečková konštrukcia funguje',
    text: 'Elipsa je afinný obraz kružnice. V kružnici so štvorcom okolo nej platí: ak rozdelíš polomer MS aj polovicu strany MX na n rovnakých dielov, spojnice L1 a K1′ sú na seba kolmé (dva zhodné pravouhlé trojuholníky otočené o 90°). Podľa Tálesovej vety ich priesečník leží na kružnici.\n\nAfinita zachováva delenie na rovnaké diely aj priesečníky. Preto rovnaký postup v rovnobežníku dá body elipsy.',
    deeper: 'V súradniciach jednotkovej kružnice: K(1, 0), L(−1, 0), M(0, 1), X(1, 1). Bod k na MS je (0, 1 − k/n), bod k′ na MX je (k/n, 1). Priamky L→k a K→k′ sa pretnú v bode, pre ktorý x² + y² = 1. Napríklad pre n = 4, k = 1 vyjde približne (0,28; 0,96).',
  },
  {
    title: 'Ťahák: axonometria',
    text: 'Toto si zopakuj pred písomkou.',
    bullets: [
      'Definícia: rovnobežné premietanie do jednej priemetne, sústava (O, x, y, z, j) sa premietne do troch rôznych priamok',
      'Šikmá: smer premietania nie je kolmý na priemetňu',
      'Pohlke: 3 úsečky zo spoločného bodu na 3 rôznych priamkach = priemet 3 kolmých rovnako dlhých úsečiek',
      'Izo-, di-, trimetria podľa počtu rovnakých jednotiek',
      'Vojenská x ⊥ y, kavalierna x ⊥ z (j všade rovnaké), šikmé premietanie x ⊥ z, jy < j',
      'Kružnica: združené priemery → rovnobežník dotyčníc → priečková konštrukcia → elipsa',
    ],
  },
];

const perspektiva: Step[] = [
  {
    title: 'Stredové premietanie',
    text: 'Máme bod S (stred premietania) a priemetňu π, S neleží v π. Stredový priemet bodu A je priesečník Aₛ priamky SA s priemetňou.\n\nVšetky premietacie priamky idú jedným bodom, ako lúče do oka alebo do objektívu. Preto bližšie veci vyzerajú väčšie.',
    fig: 'dg-sp-def',
    analogy: 'Dürer to robil doslova: oko pri pevnom priezore (S), sklenená doska pred ním (π) a obrys predmetu obkresľoval priamo na sklo.',
    check: {
      q: 'Kde leží stredový priemet Aₛ bodu A?',
      options: ['V priesečníku priamky SA s priemetňou π', 'V päte kolmice z A na π', 'Na priamke rovnobežnej so smerom s', 'V bode H'],
      explain: 'Premieta sa cez stred S. Kolmica z A na π dáva kolmý priemet A₁, nie stredový.',
    },
  },
  {
    title: 'Čím je určené: H, d, dištančná kružnica',
    text: 'Stredové premietanie je určené priemetňou π a stredom S. Na papieri ho zadáme prvkami vnútornej orientácie:\n\nHlavný bod H je kolmý priemet stredu S do priemetne.\nDištancia d = |SH| je vzdialenosť stredu od priemetne.\nDištančná kružnica má stred H a polomer d. Graficky nahrádza S aj d naraz.',
    formula: { f: 'd = |SH|,   dištančná kružnica (H; r = d)', what: 'Prvky vnútornej orientácie', vars: [['H', 'hlavný bod, päta kolmice zo S na π'], ['d', 'dištancia']] },
    check: {
      q: 'Čo je hlavný bod H?',
      options: ['Kolmý priemet stredu premietania S do priemetne', 'Úbežník zvislých priamok', 'Priesečník horizontu a základnice', 'Stred zornej kružnice v priestore'],
      explain: 'H je päta kolmice zo S na π. Leží v ňom aj úbežník priamok kolmých na priemetňu.',
    },
  },
  {
    title: 'Vlastnosti oproti rovnobežnému',
    text: 'Stredové premietanie zachováva incidenciu (bod na priamke ostane na priamke) a priamka sa zobrazí ako priamka.\n\nNezachováva rovnobežnosť (koľajnice sa zbiehajú), deliaci pomer (stred úsečky nie je v strede obrazu) ani veľkosť: vzdialenejší predmet je menší. Rovnobežné premietanie rovnobežnosť aj deliaci pomer zachováva.\n\nZachová sa len to, čo leží v rovine rovnobežnej s priemetňou: tam je obraz podobný (rovnoľahlý).',
    bullets: ['Rovnobežné: zachová rovnobežnosť aj deliaci pomer', 'Stredové: rovnobežky sa zbiehajú do úbežníka, deliaci pomer sa mení', 'Obe: zachovajú incidenciu, priamka → priamka'],
    check: {
      q: 'Čo stredové premietanie NEzachováva?',
      options: ['Rovnobežnosť priamok', 'Incidenciu', 'To, že priamka sa zobrazí ako priamka', 'Nič, zachováva všetko'],
      explain: 'Rovnobežky, ktoré nie sú rovnobežné s priemetňou, sa zbiehajú do jedného úbežníka.',
    },
  },
  {
    title: 'Úbežník priamky',
    text: 'Stredovým priemetom priamky, ktorá neprechádza stredom S, je priamka. (Priamka cez S sa zobrazí ako bod, volá sa smerová priamka.)\n\nRovnobežné priamky majú spoločný nevlastný bod (smer). Jeho stredový priemet je úbežník U. Nájdeš ho tak, že stredom S vedieš rovnobežku s priamkou a pretneš ju s priemetňou.\n\nAk je priamka rovnobežná s priemetňou, úbežník je nevlastný: obraz je rovnobežný s priamkou.',
    fig: 'dg-ubeznik',
    check: {
      q: 'Ako zostrojíš úbežník priamky a?',
      options: ['Stredom S vedieš rovnobežku s a, jej priesečník s π je úbežník', 'Spustíš kolmicu z a na π', 'Pretneš a s horizontom', 'Je to vždy bod H'],
      explain: 'Úbežník je priemet nevlastného bodu priamky. Smerová priamka cez S rovnobežná s a ho vytne na π.',
    },
  },
  {
    title: 'Úbežnica roviny',
    text: 'Všetky priamky jednej roviny majú úbežníky na jednej priamke. To je úbežnica roviny, obraz jej nevlastnej priamky. Zostrojíš ju ako priesečnicu priemetne so smerovou rovinou (rovina cez S rovnobežná s danou).\n\nNajdôležitejšia úbežnica: úbežnica vodorovnej roviny je horizont h. Všetky vodorovné smery majú úbežníky na h.',
    check: {
      q: 'Čo je horizont?',
      options: ['Úbežnica vodorovnej (predmetovej) roviny', 'Stopa predmetovej roviny', 'Zorná kružnica', 'Priamka cez H a S'],
      explain: 'Stopa predmetovej roviny je základnica z. Horizont je jej úbežnica, vo výške oka.',
    },
  },
  {
    title: 'Lineárna perspektíva',
    text: 'Lineárna perspektíva je špeciálny prípad stredového premietania. Premietame len útvary v zornom priestore: vnútri rotačnej kužeľovej plochy s vrcholom S, osou o kolmou na π (os záberu) a vrcholovým uhlom najviac 45° (podľa prednášky).\n\nPriesečník zorného kužeľa s priemetňou je zorná kružnica so stredom H. Ďalej pracujeme so zornou kružnicou s polomerom d, čo zodpovedá zornému uhlu 90°.',
    analogy: 'Je to fotka: S je objektív, π je snímač, d je ohnisková vzdialenosť a zorná kružnica je to, čo sa zmestí do záberu.',
    check: {
      q: 'Čím je určená zorná kužeľová plocha?',
      options: ['Vrcholom S, osou o kolmou na π a vrcholovým uhlom', 'Horizontom a základnicou', 'Dvoma úbežníkmi', 'Predmetovou rovinou'],
      explain: 'Vrchol je stred premietania, os je kolmica na priemetňu (os záberu), uhol obmedzuje, čo ešte vidíme bez skreslenia.',
    },
  },
  {
    title: 'Základnica a horizont',
    text: 'V lineárnej perspektíve premietame objekty postavené na vodorovnej predmetovej rovine ρ (zem).\n\nZákladnica z = π ∩ ρ, stopa predmetovej roviny (kde snímka stojí na zemi).\nHorizont h = úbežnica ρ, priesečník π so smerovou rovinou cez S rovnobežnou s ρ. Je vo výške oka.\n\nČo je nad úrovňou oka, zobrazí sa nad h, čo je pod ňou, pod h. Všetko vo výške oka padne na h.',
    fig: 'dg-lp-pojmy',
    check: {
      q: 'Základnica je…',
      options: ['priesečnica priemetne a predmetovej roviny', 'úbežnica predmetovej roviny', 'priamka vo výške oka', 'os záberu'],
      explain: 'z = π ∩ ρ. Horizont h je úbežnica ρ vo výške oka.',
    },
  },
  {
    title: 'Ako zvoliť prvky perspektívy',
    text: 'Aby perspektíva nebola skreslená, volíme:\n\nStred S (oko, stanovisko) vo vhodnej výške a dosť ďaleko, aby celý objekt bol v zornom kuželi (vnútri zornej kružnice).\nOs o (smer pohľadu) približne do stredu objektu.\nPriemetňu π kolmo na os o, najčastejšie cez prednú hranu objektu.\n\nTým sú určené H, d, h aj z. V prednáške: dištancia d (pri fotoaparáte zaostrenom na nekonečno je to ohnisková vzdialenosť f).',
  },
  {
    title: 'Priečelná a nepriečelná poloha',
    text: 'Priečelná: jedna zvislá stena objektu je rovnobežná s priemetňou. Os o volíme kolmo na túto stenu. Predná stena má skutočný tvar, hĺbkové hrany (kolmé na π) smerujú do H. Šírkové hrany majú nevlastný úbežník.\n\nNepriečelná: žiadna stena nie je rovnobežná s π (objekt je pootočený). Vodorovné hrany majú dva vlastné úbežníky na horizonte.',
    fig: 'dg-lp-polohy',
    check: {
      q: 'Kam smerujú hĺbkové hrany v priečelnej polohe?',
      options: ['Do hlavného bodu H', 'Do dvoch úbežníkov na okraji', 'Sú rovnobežné', 'Do bodu na základnici'],
      explain: 'Sú kolmé na priemetňu, takže sú rovnobežné so SH. Ich úbežník je H.',
    },
  },
  {
    title: 'Zvislá a šikmá, vtáčia a žabia',
    text: 'Zvislá: priemetňa je kolmá na predmetovú rovinu (os o vodorovná). Horizont ide cez H a zvislé hrany sú na obraze zvislé.\n\nŠikmá: priemetňa nie je kolmá na ρ, uhol 60° ≤ ω < 90°. Zvislé hrany sa zbiehajú do vlastného úbežníka.\n\nŽabia: S je v ostrom uhle rovín π a ρ, pozeráme hore (z podhľadu), h je pod H.\nVtáčia: S je v tupom uhle, pozeráme dole (z nadhľadu), h je nad H.',
    fig: 'dg-lp-vtacia',
    check: {
      q: 'Kde je horizont vo vtáčej perspektíve?',
      options: ['Nad hlavným bodom H', 'Pod hlavným bodom H', 'Prechádza cez H', 'Splýva so základnicou'],
      explain: 'Pozeráme dole, os záberu mieri pod horizont, takže horizont je nad H. Pri žabej naopak.',
    },
  },
  {
    title: 'Stredové vs. lineárna, nelineárna perspektíva',
    text: 'Stredové premietanie premieta celý priestor (okrem S). Lineárna perspektíva je jeho špeciálny prípad: len zorný priestor, objekty na predmetovej rovine, s horizontom a základnicou. Je to model fotky a ľudského videnia.\n\nLineárna perspektíva premieta na rovinu, priamky ostanú priamkami. Nelineárna premieta na zakrivenú plochu (alebo ju takto rozvinie), priamky sa ohnú. Druhy: valcová (cylindrická, panoráma), kužeľová (kónická), guľová (sférická, „rybie oko“). Valcová a kužeľová sa používajú aj v kartografii.',
    check: {
      q: 'Ktorá perspektíva je nelineárna?',
      options: ['Valcová (panoráma)', 'Zvislá', 'Vtáčia', 'Šikmá'],
      explain: 'Zvislá, šikmá, vtáčia aj žabia sú lineárne (priemetňa je rovina). Valcová premieta na valec.',
    },
  },
];

const rotacne: Step[] = [
  {
    title: 'Rotačná plocha a jej prvky',
    text: 'Rotačná plocha vznikne otáčaním čiary k okolo priamky o. Čiara nesmie ležať na osi ani v rovine kolmej na os.\n\nOs rotácie o, tvoriaca čiara k.\nRovnobežková kružnica: dráha jedného bodu, leží v rovine kolmej na os, stred má na osi. Špeciálne: rovník kR (lokálne najväčší polomer), hrdlo kH (najmenší), kráterová kružnica.\nMeridián: rez rovinou cez os. Je súmerný podľa osi, skladá sa z dvoch polmeridiánov, všetky meridiány sú zhodné.',
    fig: 'dg-rot',
    check: {
      q: 'Čo je meridián rotačnej plochy?',
      options: ['Rez rovinou, ktorá obsahuje os rotácie', 'Rez rovinou kolmou na os', 'Najväčšia rovnobežková kružnica', 'Tvoriaca čiara'],
      explain: 'Rez kolmý na os je rovnobežková kružnica. Meridián je rez rovinou cez os.',
    },
  },
  {
    title: 'Druhy rotačných plôch',
    text: 'Podľa tvoriacej čiary:',
    bullets: [
      'Priamkové: rotuje priamka. ∥ s osou → valcová plocha, rôznobežná → kužeľová, mimobežná → jednodielny rotačný hyperboloid',
      'Cyklické: rotuje kružnica. Os v rovine kružnice cez stred → guľová plocha, os v rovine mimo stredu → anuloid (toroid, axoid, melonoid), os mimo roviny → globoid',
      'Kvadratické: kužeľosečka rotuje okolo svojej osi',
      'Všeobecné: ľubovoľná krivka',
    ],
    check: {
      q: 'Čo vznikne rotáciou priamky mimobežnej s osou?',
      options: ['Jednodielny rotačný hyperboloid', 'Valcová plocha', 'Kužeľová plocha', 'Anuloid'],
      explain: 'Rovnobežná dá valec, rôznobežná kužeľ, mimobežná jednodielny hyperboloid.',
    },
  },
  {
    title: 'Kvadratické rotačné plochy',
    text: 'Vznikajú rotáciou kužeľosečky okolo jej osi:\n\nGuľová plocha (kružnica okolo priemeru), rotačný elipsoid (sploštený okolo vedľajšej osi, pretiahnutý okolo hlavnej), rotačný paraboloid, rotačný hyperboloid jednodielny a dvojdielny.\n\nSingulárne: rotačná valcová plocha (meridián sú dve rovnobežky) a rotačná kužeľová plocha (dve rôznobežky).\n\nPre geodéziu je dôležitý sploštený rotačný elipsoid: model Zeme.',
    formula: { f: '(x² + y²)/a² + z²/b² = 1', what: 'Rotačný elipsoid s osou z', vars: [['a', 'polomer rovníka'], ['b', 'polos v smere osi (b < a: sploštený)']] },
  },
  {
    title: 'Prienik súosých plôch, dve gule',
    text: 'Kľúčová vlastnosť: prienikom dvoch rotačných plôch so spoločnou osou sú rovnobežkové kružnice. Vzniknú rotáciou priesečníkov meridiánov.\n\nPre gule: každá priamka cez stred je os gule. Preto majú každé dve gule spoločnú os, spojnicu stredov. Ich prienik (ak existuje) je kružnica v rovine kolmej na spojnicu stredov.\n\nPrieniky rysujeme v kolmom priemete do jednej priemetne, v ktorej ležia všetky meridiány.',
    check: {
      q: 'Čo je prienikom dvoch guľových plôch (ak sa pretínajú)?',
      options: ['Kružnica v rovine kolmej na spojnicu stredov', 'Dva body', 'Elipsa', 'Priamka'],
      explain: 'Majú spoločnú os (spojnicu stredov), prienik je rovnobežková kružnica.',
    },
  },
  {
    title: 'Tri gule',
    text: 'Tri gule s nekolineárnymi stredmi: každá dvojica sa pretína v kružnici. Tri kružnice majú spoločné dva body R a R′, súmerné podľa priemetne. Ich priemet nájdeš v priesečníku priemetov kružníc, vzdialenosť od priemetne v sklopení roviny jednej z kružníc.\n\nŠpeciálny prípad z okruhu: priemery gúľ sú strany ostrouhlého trojuholníka ABC. Priemety kružníc sú potom výšky trojuholníka a priemet bodov R, R′ je priesečník výšok.',
  },
  {
    title: 'Guľa a súosý valec',
    text: 'Prienik guľovej plochy a súosej valcovej plochy:\n\nPolomer valca = polomer gule: valec sa gule dotýka, prienik je rovník (jedna kružnica).\nPolomer valca menší: valec je sečný, prienik sú dve rovnobežkové kružnice s rovnakým polomerom.\nPolomer valca väčší: žiadny prienik.\n\nPoužitie: zobrazenie referenčnej gule na valec (valcové kartografické zobrazenia).',
    fig: 'dg-gula-valec',
    check: {
      q: 'Čo je prienikom gule a súosého sečného valca?',
      options: ['Dve rovnobežkové kružnice s rovnakým polomerom', 'Jedna kružnica', 'Elipsa', 'Dva body'],
      explain: 'Dotykový valec dá rovník, sečný dve kružnice súmerné podľa rovníka.',
    },
  },
  {
    title: 'Guľa a súosý kužeľ',
    text: 'Prienik guľovej plochy a súosej kužeľovej plochy:\n\nDotyková kužeľová plocha: prienik je jedna rovnobežková kružnica (dotyková).\nSečná kužeľová plocha: dve rovnobežkové kružnice (rôzne polomery).\nKužeľ mimo gule: žiadny prienik.\n\nPoužitie: kužeľové kartografické zobrazenia.',
    fig: 'dg-gula-kuzel',
  },
];

const fotogrametria: Step[] = [
  {
    title: 'Čo je fotogrametria',
    text: 'Fotogrametria je vedná a technická disciplína, ktorá získava informácie o tvare, rozmeroch a polohe objektov z ich fotografických snímok, bez priameho kontaktu. Robia sa z nej mapy, ortofotomapy a 3D modely.\n\nDelenie: podľa spôsobu snímkovania pozemná (terestrická) a letecká (aerofotogrametria), podľa počtu snímok jednosnímková a dvojsnímková (stereofotogrametria).\n\nSnímku chápeme ako stredový priemet: objektív je projekčné centrum S.',
    check: {
      q: 'Ako sa v geometrii chápe fotogrametrická snímka?',
      options: ['Ako stredový priemet s projekčným centrom S', 'Ako rovnobežný priemet', 'Ako Mongeova projekcia', 'Ako kótované premietanie'],
      explain: 'Kamera = stredové premietanie: S je objektív, rovina snímky je priemetňa.',
    },
  },
  {
    title: 'Typy snímok',
    text: 'Zvislá snímka (pozemná): rovina snímky je zvislá, zodpovedá zvislej perspektíve.\nŠikmá letecká: zodpovedá vtáčej šikmej perspektíve.\nŠikmá pozemná: zodpovedá žabej šikmej perspektíve.',
    check: {
      q: 'Ktorej perspektíve zodpovedá šikmá letecká snímka?',
      options: ['Vtáčej šikmej', 'Žabej šikmej', 'Zvislej', 'Žiadnej'],
      explain: 'Z lietadla pozeráme dole, teda vtáčia perspektíva.',
    },
  },
  {
    title: 'Prvky vnútornej orientácie',
    text: 'S projekčné centrum, π rovina snímky, o os záberu (kolmá na π, ide cez S), H hlavný bod (priesečník osi záberu so snímkou), f = |HS| konštanta kamery cₖ (ohnisková vzdialenosť).\n\nPrvky vnútornej orientácie sú H a f. Určujú, kde je projekčné centrum voči snímke. Ich hľadanie sa v digitálnej fotogrametrii volá kalibrácia snímky.\n\nNa snímke ešte: horizont h (úbežnica vodorovnej roviny), hlavný úbežník (úbežník spádových priamok), snímkový nadir (úbežník zvislého smeru).',
    formula: { f: '(H, f),   f = |HS| = cₖ', what: 'Prvky vnútornej orientácie snímky' },
    check: {
      q: 'Čo sú prvky vnútornej orientácie snímky?',
      options: ['Hlavný bod H a ohnisková vzdialenosť f', 'Horizont a základnica', 'Úbežníky troch smerov', 'Súradnice objektu'],
      explain: 'H a f jednoznačne určujú polohu projekčného centra S voči rovine snímky.',
    },
  },
  {
    title: 'Kde leží S: dva vlastné úbežníky',
    text: 'Ak poznáme úbežníky Ua, Ub dvoch smerov a vieme, aký uhol tie smery v skutočnosti zvierajú, S musí vidieť úsečku UaUb presne pod týmto uhlom.\n\nα ≠ 90° (ostrý aj tupý): S leží na časti anuloidu (melonoide) s osou UaUb. V rovine: množina G(UaUb, α), dva súmerné kružnicové oblúky.\nα = 90°: S leží na guľovej ploche s priemerom UaUb. V rovine: Tálesova kružnica.\n\nPre ostrý uhol sú oblúky väčšie ako polkružnica, pre tupý menšie.',
    fig: 'dg-fg-mnoziny',
    check: {
      q: 'Smery zvierajú 90°, úbežníky sú vlastné. Kde leží S?',
      options: ['Na guľovej ploche s priemerom UaUb', 'Na rovine kolmej na UaUb', 'Na kužeľovej ploche', 'Na priamke UaUb'],
      explain: 'Z bodov gule nad priemerom UaUb vidíš tento priemer pod pravým uhlom (Tálesova veta v priestore).',
    },
  },
  {
    title: 'Zostroj množinu G(AB, α)',
    text: 'Konštrukcia z prednášky (príklad 3.1). Podľa vety o obvodovom a stredovom uhle: os úsečky, uhol α pri bode A, kolmica, stred O, oblúky. Najprv si ju pozri, potom ju narysuj sám pre 50°.',
  },
  {
    title: 'Kde leží S: jeden úbežník nevlastný',
    text: 'Ak je smer b rovnobežný so snímkou, jeho úbežník je nevlastný. Potom:\n\nα ≠ 90°: S leží na kužeľovej ploche s vrcholom Ua, osou rovnobežnou so smerom b, povrchové priamky zvierajú s osou uhol α.\nα = 90°: S leží v rovine cez Ua kolmej na smer b.\n\nAk sú oba úbežníky nevlastné, S môže byť hocikde. Preto v každej dvojici musí byť aspoň jeden úbežník vlastný.',
    fig: 'dg-fg-nevl',
    check: {
      q: 'Ua vlastný, Ub nevlastný, uhol 90°. Kde leží S?',
      options: ['V rovine cez Ua kolmej na smer b', 'Na guli', 'Na kužeľovej ploche', 'Na melonoide'],
      explain: 'Pri pravom uhle s nevlastným úbežníkom je množinou rovina cez Ua kolmá na smer b.',
    },
  },
  {
    title: 'Čo treba poznať na snímke',
    text: 'Jedna dvojica úbežníkov dá plochu, dve plochy dajú krivku, tri plochy dajú dva body S a S′ (súmerné podľa snímky). Preto musíme poznať:',
    bullets: [
      '3 dvojice úbežníkov takých smerov, ktorých vzájomné uhly poznáme',
      'žiadne dve dvojice neurčujú tú istú množinu projekčných centier',
      'v každej dvojici je aspoň jeden úbežník vlastný',
      'aspoň jeden z úbežníkov neleží s ostatnými na jednej priamke',
    ],
    check: {
      q: 'Koľko dvojíc úbežníkov so známym uhlom treba na určenie H a f?',
      options: ['3', '1', '2', '4'],
      explain: 'Každá dvojica dá jednu plochu. Prienik troch plôch sú dva body S, S′.',
    },
  },
  {
    title: 'Zvislá snímka štvorca',
    text: 'Príklad 3.2: štvorcová sieť na podlahe a zvislý stĺp na zvislej snímke.\n\nUa, Ub (strany, 90°) → guľa. Ub, Uu (strana a uhlopriečka, 45°) → melonoid. Ich prienik je kružnica k. Ua, Uc (strana a zvislica, 90°, Uc nevlastný) → rovina. Rovina pretne k v S a S′.\n\nVýsledok: H leží na horizonte, f je polomer kružnice k.',
  },
  {
    title: 'Obdĺžnik a šesťuholník',
    text: 'Rovnaký postup, len iné uhly:\n\nObdĺžnik 7 : 3: strany 90° (guľa nad UaUb), uhlopriečka so stranou zviera uhol, pre ktorý tg φ = 3/7, teda asi 23,2° (melonoid). So zvislicou rovina.\n\nPravidelný šesťuholník: smery strán zvierajú 60° (alebo 120°), máš tri úbežníky strán na horizonte, dvojice dajú melonoidy, so zvislicou rovina.\n\nPri zvislej snímke vždy: H na horizonte, f = polomer kružnice k.',
    check: {
      q: 'Aký uhol zvierajú smery strán pravidelného šesťuholníka?',
      options: ['60° (resp. 120°)', '90°', '45°', '30°'],
      explain: 'Vnútorný uhol je 120°, smery susedných strán zvierajú 60°.',
    },
  },
  {
    title: 'Šikmá snímka kvádra',
    text: 'Príklad 3.6/3.7: poznáme úbežníky Ua, Ub, Uc troch navzájom kolmých hrán.\n\nKaždá dvojica je 90° → tri gule s priemermi UaUb, UbUc, UaUc. Prienik dvoch gúľ je kružnica, jej priemet je výška trojuholníka úbežníkov. H je priesečník výšok (ortocentrum). f zistíš v sklopení roviny jednej kružnice: Tálesova polkružnica nad UcP, kolmica v H.',
    formula: { f: 'f² = |HUc| · |HP|', what: 'Kontrola: Euklidova veta o výške v sklopenom pravouhlom trojuholníku', vars: [['P', 'päta výšky z Uc na UaUb']] },
  },
];

export const DG2_STEPS: Record<string, Step[]> = {
  'dg:pisomka2': pisomka2,
  'dg:axonometria': axonometria,
  'dg:perspektiva': perspektiva,
  'dg:rotacne': rotacne,
  'dg:fotogrametria': fotogrametria,
};
