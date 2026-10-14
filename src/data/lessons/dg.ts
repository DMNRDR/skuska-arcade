import type { Step } from '../steps';

// Metódy zobrazovania (deskriptíva), 1. písomka. Rozsah podľa
// ZS_2026-27/Metody_zobrazovania/Skuska/1T_-_Okruh_otazok.pdf, kótované aj podľa Pracovne_listy/PL_2.
// Rysovačky krok po kroku sú pokusy v learn/widgets/deskriptiva.tsx (miesto určuje EXTRAS v registry.ts).

const pisomka: Step[] = [
  {
    title: 'Čo bude na 1. písomke',
    text: 'Písomka trvá 25 až 30 minút a má teoretické aj rysovacie úlohy. Píše sa na cvičení a pokrýva témy prvých štyroch týždňov: kužeľosečky, rovnobežné a kótované premietanie, krivky a plochy, topografické plochy a Mongeovu projekciu.\n\nSpolužiaci, ktorí písali v utorok, mali tri skupiny (A, B, C) a písomku na 12 bodov. Skupina C dostala päť úloh, sú v zozname nižšie. Tvoja skupina môže mať iné zadania, ale z rovnakých tém.\n\nBody sa strácali hlavne za označenie. Nepopísaný bod alebo priamka môže stáť bod, aj keď je konštrukcia správna.',
    bullets: [
      'Parabola: zostroj body paraboly a oskulačnú kružnicu (téma Kužeľosečky)',
      'Čo sa stane s pravým uhlom pri kolmom premietaní (Rovnobežné premietanie)',
      'Bodom B rovnobežka s priamkou MN (Kótované premietanie)',
      'Priemet topografickej plochy a priamky, priesečníky (Topografické plochy)',
      'Mongeova projekcia a pomenovanie osí (Mongeova projekcia)',
    ],
    check: {
      q: 'Za čo spolužiaci na utorkovej písomke najviac strácali body?',
      options: ['Za chýbajúce označenie bodov a priamok', 'Za čas', 'Za výpočty na kalkulačke', 'Za farbu ceruzky'],
      explain: 'Konštrukcie mali dobre, body išli dole za označenie. Popisuj každý bod, ktorý zostrojíš.',
    },
  },
  {
    title: 'Označovanie: za toto sú body',
    text: 'Body označuj veľkými písmenami (A, B, M), priamky malými (a, b, m) a roviny gréckymi (α, β, γ).\n\nPriemet v rovnobežnom premietaní má čiarku: A′. V kótovanom premietaní má priemet index 1 a kótu v zátvorke: A₁(3). V Mongeovej projekcii je pôdorys A₁, nárys A₂ a bokorys A₃.\n\nPravidlo: popíš každý bod, ktorý zostrojíš, aj výsledok úlohy (stopník P, priesečnica r, priesečníky X, Y).',
    bullets: [
      'Body A, B · priamky a, b · roviny α, β',
      'Rovnobežné premietanie: A′, a′',
      'Kótované: A₁(3), hlavná priamka h₁ s kótou v zátvorke, spádové merítko dvojitou čiarou',
      'Monge: A₁ pôdorys, A₂ nárys, A₃ bokorys, základnica x₁,₂',
      'Kužeľosečky: ohniská F₁, F₂ (parabola F), stred S, vrcholy A, B, C, D (parabola V), riadiaca priamka d, os o',
    ],
    check: {
      q: 'Ako označíš nárys bodu A v Mongeovej projekcii?',
      options: ['A₂', 'A₁', 'A′', 'A(2)'],
      explain: 'Index 1 je pôdorys, 2 nárys, 3 bokorys. A′ je priemet v rovnobežnom premietaní, A(2) by bola kóta.',
    },
  },
  {
    title: 'Mongeova projekcia: osi a priemetne',
    text: 'Pôdorysňa π je vodorovná, nárysňa ν je zvislá vzadu a bokorysňa μ je zvislá zboku. Navzájom sú kolmé.\n\nOs x je priesečnica pôdorysne a nárysne, na papieri je to základnica x₁,₂. Os y je priesečnica pôdorysne a bokorysne a smeruje k tebe. Os z je priesečnica nárysne a bokorysne a smeruje hore. Začiatok O je spoločný bod všetkých troch priemetní.',
    fig: 'dg-osi',
    check: {
      q: 'Ktorá os je priesečnicou pôdorysne a nárysne?',
      options: ['x (základnica)', 'y', 'z', 'Žiadna, nepretínajú sa'],
      explain: 'Pôdorysňa π a nárysňa ν sa pretínajú v osi x. Na papieri ju kreslíš ako základnicu x₁,₂.',
    },
  },
];

const kuzelosecky: Step[] = [
  {
    title: 'Elipsa: definícia',
    text: 'Elipsa je množina bodov roviny, ktoré majú od dvoch pevných bodov F₁, F₂ stály súčet vzdialeností 2a. Platí 2a > |F₁F₂|.\n\nF₁, F₂ sú ohniská a S je stred. A, B sú hlavné vrcholy, C, D vedľajšie vrcholy. a je hlavná polos, b vedľajšia polos, e = |SF₁| je excentricita.',
    fig: 'dg-eldef',
    analogy: 'Zapichni dva špendlíky (ohniská), prehoď cez ne slučku špagátu a ceruzkou ju napni. Keď ťaháš ceruzku dookola, súčet vzdialeností k špendlíkom je stále dĺžka špagátu a nakreslíš elipsu.',
    formula: { f: 'r₁ + r₂ = 2a     a² = b² + e²', what: 'Elipsa', vars: [['r₁, r₂', 'vzdialenosti bodu od ohnísk'], ['a, b', 'hlavná a vedľajšia polos'], ['e', 'excentricita, |SF|']] },
    check: {
      q: 'Bod M má od ohnísk vzdialenosti 7 cm a 3 cm. Na ktorej krivke s 2a = 10 cm leží?',
      options: ['Na elipse', 'Na hyperbole', 'Na parabole', 'Na kružnici so stredom F₁'],
      explain: '7 + 3 = 10. Súčet vzdialeností je 2a, to je elipsa. Pri hyperbole by sedel rozdiel 7 − 3 = 4.',
    },
  },
  {
    title: 'Elipsa: 4 body z ohnísk a 2a',
    text: 'Úloha z téz: zostroj 4 ľubovoľné body elipsy, ak sú dané F₁, F₂ a dĺžka 2a.\n\nTrik: dĺžku 2a rozdelíš bodom R na dva kusy. Tie kusy sú polomery kružidla. Bod R volíš medzi ohniskami.',
  },
  {
    title: 'Elipsa: oskulačné kružnice',
    text: 'Oskulačná kružnica sa ku krivke vo vrchole „pritúli“ najlepšie. Pomôže ti elipsu pekne narysovať.\n\nDané sú osi AB a CD. Polomery vyjdú b²/a pri vrcholoch A, B a a²/b pri C, D, ale počítať ich netreba. Konštrukcia s obdĺžnikom ich nájde.',
  },
  {
    title: 'Hyperbola: definícia',
    text: 'Hyperbola je množina bodov roviny, ktoré majú od dvoch ohnísk F₁, F₂ stály rozdiel vzdialeností (v absolútnej hodnote) 2a. Platí 2a < |F₁F₂|.\n\nMá dve vetvy, dva vrcholy A, B a dve asymptoty, ku ktorým sa vetvy blížia. Pozor na vzťah: pri hyperbole je e² = a² + b².',
    fig: 'dg-hypdef',
    formula: { f: '|r₁ − r₂| = 2a     e² = a² + b²', what: 'Hyperbola', vars: [['r₁, r₂', 'vzdialenosti bodu od ohnísk'], ['a', '|SA|, polovica vzdialenosti vrcholov'], ['e', '|SF|']] },
    check: {
      q: 'Čím sa líši definícia hyperboly od elipsy?',
      options: ['Hyperbola má stály rozdiel vzdialeností, elipsa súčet', 'Hyperbola má len jedno ohnisko', 'Elipsa má riadiacu priamku', 'Ničím'],
      explain: 'Elipsa: r₁ + r₂ = 2a. Hyperbola: |r₁ − r₂| = 2a.',
    },
  },
  {
    title: 'Hyperbola: 4 body',
    text: 'Rovnaký postup ako pri elipse, jediný rozdiel: bod R volíš na osi mimo úsečky F₁F₂, za ohniskom. Rozdiel polomerov |AR| − |BR| je potom presne 2a.',
  },
  {
    title: 'Hyperbola: vrcholy, asymptoty, oskulačné kružnice',
    text: 'Dané sú F₁, F₂ a 2a. Kľúčom je obdĺžnik: kružnica cez ohniská a kolmice vo vrcholoch. Jeho uhlopriečky sú asymptoty a v jeho rohu začína konštrukcia oskulačnej kružnice.',
  },
  {
    title: 'Parabola',
    text: 'Parabola je množina bodov roviny, ktoré majú rovnakú vzdialenosť od pevného bodu F (ohnisko) a od pevnej priamky d (riadiaca priamka). F neleží na d.\n\nOs o ide cez F kolmo na d, päta je D. Vrchol V je v strede úsečky FD. Dĺžka |FD| = p je parameter a oskulačná kružnica vo vrchole má polomer p.\n\nToto bolo na utorkovej písomke: body paraboly a oskulačná kružnica.',
    formula: { f: '|MF| = |Md|     r_osk = p = |FD|', what: 'Parabola', vars: [['F', 'ohnisko'], ['d', 'riadiaca priamka'], ['V', 'vrchol, stred FD'], ['p', 'parameter, polomer oskulačnej kružnice']] },
    check: {
      q: 'Kde leží vrchol paraboly?',
      options: ['V strede medzi F a priamkou d', 'V ohnisku F', 'Na riadiacej priamke d', 'V strede oskulačnej kružnice'],
      explain: 'Vrchol je rovnako ďaleko od F aj od d, preto je v strede úsečky FD na osi.',
    },
  },
];

const rovnobezne: Step[] = [
  {
    title: 'Rovnobežné premietanie',
    text: 'Dané sú priemetňa π a smer premietania s, ktorý nie je s π rovnobežný. Bodom A vedieme premietaciu priamku rovnobežnú so smerom s. Jej priesečník s π je priemet A′.\n\nRovnobežné premietanie je teda určené dvoma prvkami: priemetňou a smerom premietania. Ak je smer kolmý na π, ide o kolmé premietanie, inak o šikmé.',
    fig: 'dg-rpdef',
    analogy: 'Slnko a tieň na zemi. Slnečné lúče sú rovnobežné (smer s), zem je priemetňa a tieň je priemet.',
    check: {
      q: 'Akými prvkami je určené rovnobežné premietanie?',
      options: ['Priemetňou a smerom premietania', 'Stredom premietania a priemetňou', 'Dvoma priemetňami', 'Kótou a intervalom'],
      explain: 'Priemetňa π a smer s. Stred premietania patrí k stredovému premietaniu.',
    },
  },
  {
    title: 'Priemet priamky a roviny',
    text: 'Priamka sa premietne ako priamka, alebo ako bod, ak je rovnobežná so smerom premietania (premietacia priamka).\n\nRovina sa premietne ako celá priemetňa, alebo ako priamka, ak je rovnobežná so smerom premietania (premietacia rovina).',
    fig: 'dg-rpline',
  },
  {
    title: 'Čo rovnobežné premietanie zachováva',
    text: 'Tri najdôležitejšie vlastnosti sú incidencia, rovnobežnosť a deliaci pomer. Navyše sa útvar v rovine rovnobežnej s priemetňou premietne v skutočnej veľkosti. Dĺžky a uhly sa vo všeobecnosti nezachovávajú.',
    fig: 'dg-rpkeep',
    bullets: [
      'Incidencia: bod leží na priamke, jeho priemet leží na priemete priamky',
      'Rovnobežnosť: rovnobežné priamky majú rovnobežné priemety',
      'Deliaci pomer: stred úsečky sa premietne do stredu priemetu',
    ],
  },
  {
    title: 'Stopník priamky',
    text: 'Stopník je bod, v ktorom priamka prebodne priemetňu, teda priesečník priamky s priemetňou. Priamka rovnobežná s priemetňou stopník nemá.',
    fig: 'dg-stopnik',
  },
  {
    title: 'Stopa roviny',
    text: 'Stopa roviny je priamka, v ktorej rovina pretína priemetňu. Značí sa p s indexom roviny. Rovina rovnobežná s priemetňou stopu nemá.',
    fig: 'dg-stopa',
  },
  {
    title: 'Hlavné a spádové priamky roviny',
    text: 'Hlavné priamky roviny sú rovnobežné s priemetňou, a teda aj so stopou. Sú to vodorovné čiary na svahu.\n\nSpádové priamky roviny sú kolmé na hlavné priamky. Je to smer, ktorým by sa po rovine kotúľala guľôčka.',
    fig: 'dg-hlavne',
    check: {
      q: 'Aký uhol zvierajú hlavná a spádová priamka tej istej roviny?',
      options: ['90°', '45°', '0°, sú rovnobežné', 'Záleží od roviny'],
      explain: 'Spádová priamka je podľa definície kolmá na hlavné priamky.',
    },
  },
  {
    title: 'Úsečka v šikmom premietaní',
    text: 'V šikmom premietaní môže byť priemet úsečky rovnako dlhý, kratší aj dlhší ako originál. Ak je úsečka rovnobežná so smerom premietania, premietne sa do bodu.',
    bullets: ['úsečka rovnako dlhá (napr. úsečka rovnobežná s priemetňou)', 'kratšia úsečka', 'dlhšia úsečka (tieň pri zapadajúcom slnku)', 'bod (úsečka v smere premietania)'],
  },
  {
    title: 'Úsečka v kolmom premietaní',
    text: 'V kolmom premietaní je priemet úsečky rovnako dlhý (úsečka rovnobežná s π), kratší (všeobecná poloha), alebo je to bod (úsečka kolmá na π). Dlhší nikdy.',
    fig: 'dg-seg',
    formula: { f: '|A₁B₁| = |AB| · cos φ', what: 'Dĺžka kolmého priemetu úsečky', vars: [['φ', 'uhol úsečky s priemetňou'], ['φ = 0°', 'rovnaká dĺžka'], ['φ = 90°', 'bod']] },
    check: {
      q: 'Úsečka dlhá 10 cm zviera s priemetňou uhol 60°. Aký dlhý je jej kolmý priemet?',
      options: ['5 cm', '10 cm', '8,7 cm', '0 cm'],
      explain: '10 · cos 60° = 10 · 0,5 = 5 cm.',
    },
  },
  {
    title: 'Štvorec a kružnica v kolmom premietaní',
    text: 'Štvorec so stranou 5 cm sa premietne ako štvorec 5 cm (rovina rovnobežná s π), ako úsečka dlhá 5 až 5·√2 ≈ 7,1 cm (rovina kolmá na π), alebo ako rovnobežník. Špeciálne obdĺžnik alebo kosoštvorec.\n\nKružnica s polomerom 5 cm sa premietne ako kružnica s polomerom 5 cm, ako úsečka dĺžky 10 cm, alebo ako elipsa s hlavnou polosou a = 5 cm a vedľajšou b = 5 · cos φ.',
    fig: 'dg-kruh',
  },
  {
    title: 'Kolmý priemet pravého uhla',
    text: 'Kolmým priemetom pravého uhla je pravý uhol práve vtedy, keď aspoň jedno jeho rameno je rovnobežné s priemetňou a druhé nie je na ňu kolmé.\n\nPreto je v kótovanom premietaní priemet spádovej priamky kolmý na priemet hlavnej priamky. Táto otázka bola na utorkovej písomke.',
    check: {
      q: 'Kedy sa pravý uhol premietne v kolmom premietaní opäť ako pravý?',
      options: ['Keď je aspoň jedno rameno rovnobežné s priemetňou (a druhé na ňu nie je kolmé)', 'Vždy', 'Nikdy', 'Len keď sú obe ramená kolmé na priemetňu'],
      explain: 'Toto je veta o kolmom priemete pravého uhla.',
    },
  },
];

const kotovane: Step[] = [
  {
    title: 'Kótované premietanie',
    text: 'Kótované premietanie je kolmé premietanie na jednu vodorovnú priemetňu π. K priemetu každého bodu pripíšeme jeho kótu.\n\nKóta bodu je jeho vzdialenosť od priemetne so znamienkom: nad priemetňou plus, pod ňou mínus. Zápis A₁(3). Bod v priemetni má kótu 0.',
    fig: 'dg-kota',
    analogy: 'Turistická mapa s výškami: vidíš zhora, kde vrchol je, a číslo ti povie, ako je vysoko.',
  },
  {
    title: 'Priamka: spádový uhol, spád, interval',
    text: 'Spádový uhol φ je uhol priamky s priemetňou. Spád je s = tg φ, teda rozdiel kót delený dĺžkou priemetu. Interval i je dĺžka priemetu úseku, na ktorom kóta stúpne o 1.\n\nStupňovanie priamky znamená vyznačiť na jej priemete body s celými kótami. Strmá priamka má veľký spád a malý interval.',
    fig: 'dg-kpriamka',
    formula: { f: 's = tg φ = Δz / d = 1 / i', what: 'Spád priamky', vars: [['Δz', 'rozdiel kót'], ['d', 'dĺžka priemetu'], ['i', 'interval']] },
    check: {
      q: 'Priamka má interval i = 4 j. Aký má spád?',
      options: ['1/4', '4', '40 %', 'Nedá sa určiť'],
      explain: 's = 1 / i = 1/4. Na 4 jednotky vodorovne stúpne o 1.',
    },
  },
  {
    title: 'Skutočná dĺžka, stopník, spádový uhol',
    text: 'Úlohy 8 a 9 z téz. Všetko vyrieši jedno sklopenie: zvislý pravouhlý trojuholník nad priemetom položíme do papiera. Kóty s opačným znamienkom nanášaš na opačné strany.',
  },
  {
    title: 'Stupňovanie priamky',
    text: 'Pri veľkých kótach (96 a 89) nenanášaš celé kóty. Stačí rozdiel 7: úsečku rozdelíš na 7 rovnakých dielov pomocným lúčom a rovnobežkami.',
  },
  {
    title: 'Kóta bodu na priamke',
    text: 'Počítaj od nižšieho bodu, ten berieš ako nulu. Sklopíš priamku, v M₁ postavíš kolmicu a odmeriaš výšku nad nižším bodom.',
  },
  {
    title: 'Rovina: spád, interval, spádové merítko',
    text: 'Spádový uhol roviny je uhol roviny s priemetňou, teda spádový uhol jej spádovej priamky. Spád a interval roviny sú spád a interval spádovej priamky.\n\nSpádové merítko je vystupňovaný priemet spádovej priamky. Rysuje sa dvojitou čiarou a samo určuje celú rovinu. Hlavné priamky sú naň kolmé.',
    fig: 'dg-spadrov',
  },
  {
    title: 'Spádové merítko roviny z troch bodov',
    text: 'Hľadáš dva body roviny s rovnakou kótou: tie určia hlavnú priamku. Merítko je na ňu kolmé.\n\nAk je rovina daná bodom A a hlavnou priamkou h: z A₁ veď kolmicu na h₁ a úsek rozdeľ podľa rozdielu kót. Ak dvoma hlavnými priamkami: kolmica na ne a úsek medzi nimi rozdeľ.',
  },
  {
    title: 'Kóta bodu v rovine',
    text: 'Bodom M₁ veď hlavnú priamku, teda kolmicu na spádové merítko. Všetky jej body majú rovnakú kótu ako M, takže kótu prečítaš na merítku.',
  },
  {
    title: 'Spádový uhol a interval roviny',
    text: 'Rovnaké sklopenie ako pri priamke, len sklápaš spádovú priamku. Na merítku vezmi dve značky, v jednej nanes kolmo ich rozdiel kót a spoj.',
  },
  {
    title: 'Priesečnica dvoch rovín',
    text: 'Pravidlo: pretínaj hlavné priamky s rovnakou kótou. Ich priesečník leží v oboch rovinách. Dva také body určia priesečnicu.',
    check: {
      q: 'Ako nájdeš priesečnicu dvoch rovín v kótovanom premietaní?',
      options: ['Spojím priesečníky hlavných priamok s rovnakou kótou', 'Spojím stopníky spádových priamok', 'Pretnem spádové merítka', 'Spojím stredy merítok'],
      explain: 'Hlavné priamky s rovnakou kótou ležia v jednej výške, ich priesečník patrí obom rovinám.',
    },
  },
  {
    title: 'Priesečnica pri rovnobežných hlavných priamkach',
    text: 'Ak sú hlavné priamky oboch rovín rovnobežné, nepretnú sa. Priesečnica je s nimi tiež rovnobežná, stačí nájsť jeden jej bod. Pomôže tretia, pomocná rovina γ.',
  },
  {
    title: 'Rovnobežka bodom B',
    text: 'Rovnobežné priamky majú rovnobežné priemety, rovnaký interval a stúpajú tým istým smerom. Bodom B₁ veď b₁ rovnobežne s a₁. Dĺžku M₁N₁ (rozdiel kót 7) nanes od B₁ v smere stúpania a dostaneš bod s kótou 5 + 7 = 12.\n\nToto bolo na utorkovej písomke.',
    fig: 'dg-rovnpriamka',
    check: {
      q: 'Čo musíš pri rovnobežke v kótovanom premietaní dodržať okrem rovnobežného priemetu?',
      options: ['Rovnaký interval a rovnaký smer stúpania', 'Rovnaké kóty', 'Kolmosť na stopu', 'Nič'],
      explain: 'Rovnobežné priamky majú rovnaký spád, teda rovnaký interval, a stúpajú na tú istú stranu.',
    },
  },
  {
    title: 'Rovnobežná rovina bodom B',
    text: 'Rovnobežné roviny majú rovnobežné hlavné priamky, rovnaký interval a stúpajú na tú istú stranu. Bodom B₁(5) veď hlavnú priamku s kótou 5 a vo vzdialenosti, akú majú dané hlavné priamky 13 a 16, nakresli hlavnú priamku s kótou 8.',
    fig: 'dg-rovnrovina',
  },
];

const krivky: Step[] = [
  {
    title: 'Krivka, dotyčnica, normála',
    text: 'Krivka je dráha pohybujúceho sa bodu. Rovinné krivky sú napríklad kružnica, elipsa, parabola, hyperbola a sínusoida, priestorová je napríklad skrutkovica.\n\nDotyčnica je hraničná poloha sečnice, keď sa druhý priesečník blíži k bodu dotyku. Normála je kolmica na dotyčnicu v bode dotyku.',
    fig: 'dg-dot',
  },
  {
    title: 'Tri zápisy rovinnej krivky',
    text: 'Explicitné vyjadrenie má y vyjadrené: y = f(x). Implicitné má všetko na jednej strane: F(x, y) = 0. Parametrické používa tretie písmeno t: x = x(t), y = y(t).',
    bullets: ['Explicitné: y = √(r² − x²) (polkružnica)', 'Implicitné: x² + y² − r² = 0', 'Parametrické: x = r·cos t, y = r·sin t'],
    check: {
      q: 'Zápis x = 3·cos t, y = 3·sin t je aké vyjadrenie krivky?',
      options: ['Parametrické', 'Explicitné', 'Implicitné', 'Polárne'],
      explain: 'Súradnice sú vyjadrené pomocou parametra t. Je to kružnica s polomerom 3.',
    },
  },
  {
    title: 'Interpolačná a aproximačná krivka',
    text: 'Interpolačná krivka prechádza všetkými danými bodmi. Aproximačná nimi prechádzať nemusí: body ju len riadia a ona sa k nim približuje, napríklad Bézierova krivka.',
    fig: 'dg-interp',
  },
  {
    title: 'Valcová plocha',
    text: 'Valcová plocha je plocha tvorená priamkami rovnakého smeru s, ktoré pretínajú danú riadiacu krivku k. Smer s neleží v rovine krivky. Ak je k kružnica, dostaneš obyčajný valec.',
    fig: 'dg-valec',
  },
];

const topo: Step[] = [
  {
    title: 'Topografická plocha a vrstevnice',
    text: 'Topografická plocha je časť zemského povrchu (terén). Nedá sa presne opísať rovnicou, preto ju zobrazujeme vrstevnicami v kótovanom premietaní.\n\nVrstevnica je krivka na ploche, ktorej všetky body majú rovnakú kótu. Je to rez plochy vodorovnou rovinou. Systém vrstevníc má rovnaký výškový rozdiel medzi susednými vrstevnicami. Husté vrstevnice znamenajú strmý svah.',
    fig: 'dg-vrstevnice',
    check: {
      q: 'Čo je vrstevnica?',
      options: ['Krivka na ploche, ktorej body majú rovnakú kótu', 'Najstrmšia krivka na ploche', 'Priemet spádnice', 'Hranica mapy'],
      explain: 'Vrstevnica spája body s rovnakou výškou, je to rez terénu vodorovnou rovinou.',
    },
  },
  {
    title: 'Priesečníky priamky s terénom',
    text: 'Úloha 3 z téz, bola aj na utorkovej písomke. Priamkou preložíš zvislú rovinu a nakreslíš profil terénu. Kde priamka pretne profil, tam prebodáva terén.',
  },
  {
    title: 'Spád plochy v bode',
    text: 'Spád plochy v bode je spád dotykovej roviny plochy v tom bode. Rovná sa spádu spádnice, ktorej priemet je kolmý na vrstevnice.',
  },
  {
    title: 'Spád krivky',
    text: 'Spád krivky v bode je spád jej dotyčnice v tom bode. Spád oblúka krivky je výškový rozdiel koncových bodov oblúka delený dĺžkou jeho priemetu.',
    formula: { f: 's = Δz / d', what: 'Spád oblúka', vars: [['Δz', 'rozdiel kót koncových bodov'], ['d', 'dĺžka priemetu (pôdorysu) oblúka']] },
  },
  {
    title: 'Krivka s konštantným spádom',
    text: 'Spád 2/5 znamená 2 m výšky na 5 m vodorovne, teda na 1 m výšky (jednu vrstevnicu) pripadne 2,5 m. Do kružidla zoberieš interval 1 / s a pretínaš vrstevnicu za vrstevnicou.',
    check: {
      q: 'Krivka má mať spád 1/4, vrstevnice sú po 1 m. Akú dĺžku zoberieš do kružidla?',
      options: ['4 m', '0,25 m', '1 m', '5 m'],
      explain: 'Interval = 1 : s = 4 m. Na každý meter výšky pripadnú 4 m v pôdoryse.',
    },
  },
  {
    title: 'Spádnica',
    text: 'Spádnica je krivka najväčšieho spádu, tadiaľ by stekala voda. Jej priemet pretína vrstevnice kolmo. Z bodu hľadáš najkratšiu spojnicu k susednej vrstevnici a opakuješ.',
  },
  {
    title: 'Rez terénu rovinou',
    text: 'Rovnaké pravidlo ako pri priesečnici rovín: pretínaj čiary s rovnakou kótou. Hlavné priamky roviny sú kolmice na spádové merítko v jeho značkách.',
  },
  {
    title: 'Profil a prienik dvoch plôch',
    text: 'Valcový profil pozdĺž krivky l: krivku narovnáš na priamku (úseky medzi priesečníkmi s vrstevnicami nanášaš za sebou), v každom bode vynesieš kolmo kótu a body spojíš.\n\nPrienik dvoch topografických plôch: nájdeš priesečníky vrstevníc s rovnakou kótou (2 s 2, 4 s 4) a spojíš ich krivkou.',
  },
];

const monge: Step[] = [
  {
    title: 'Mongeova projekcia',
    text: 'Mongeova projekcia je kolmé premietanie na dve navzájom kolmé priemetne: pôdorysňu π (vodorovnú) a nárysňu ν (zvislú). Pôdorys A₁ je pohľad zhora, nárys A₂ pohľad spredu.\n\nPriemetne sa pretínajú v základnici x₁,₂. Nárysňu potom sklopíme do pôdorysne a oba priemety máme na jednom papieri.',
    fig: 'dg-monge3d',
  },
  {
    title: 'Základnica a ordinála',
    text: 'Základnica x₁,₂ je priesečnica pôdorysne a nárysne, na papieri vodorovná čiara. Ordinála je spojnica A₁ a A₂ a je vždy kolmá na základnicu.\n\nVzdialenosť A₂ od základnice je výška z, vzdialenosť A₁ od základnice je y.',
    fig: 'dg-monge2d',
    check: {
      q: 'Bod má A₁ 2 cm pod základnicou a A₂ 5 cm nad ňou. Ako vysoko je bod nad pôdorysňou?',
      options: ['5 cm', '2 cm', '7 cm', '3 cm'],
      explain: 'Výšku z ukazuje nárys: vzdialenosť A₂ od základnice, teda 5 cm.',
    },
  },
  {
    title: 'Bokorys bodu',
    text: 'Bokorys je tretí pohľad, na bokorysňu kolmú na obe priemetne. Výšku berieš z nárysu, vzdialenosť y z pôdorysu a prenesieš ju štvrťkružnicou.',
  },
  {
    title: 'Teleso: tri pohľady',
    text: 'Úloha z téz: zobraz pôdorys, nárys a bokorys telesa a doplň priemety bodu. Na obrázku je schod: vysoká časť vľavo vzadu, nízky stupeň vpravo vpredu. Šípky ukazujú smery pohľadov.\n\nSkús si najprv načrtnúť, čo vidíš spredu, zhora a zboku. Riešenie je na ďalšej obrazovke.',
    fig: 'dg-body',
  },
  {
    title: 'Teleso v združených priemetoch',
    text: 'Nárys a pôdorys sú pod sebou (rovnaké x). Nárys a bokorys sú vedľa seba (rovnaká výška z). Viditeľné hrany kreslíš plnou čiarou, neviditeľné čiarkovane.',
    check: {
      q: 'Ktoré priemety bodu ležia v rovnakej výške?',
      options: ['Nárys a bokorys', 'Pôdorys a nárys', 'Pôdorys a bokorys', 'Žiadne'],
      explain: 'Nárys aj bokorys ukazujú výšku z. Pôdorys a nárys sú pod sebou na zvislej ordinále.',
    },
  },
];

export const DG_STEPS: Record<string, Step[]> = {
  'dg:pisomka': pisomka,
  'dg:kuzelosecky': kuzelosecky,
  'dg:rovnobezne': rovnobezne,
  'dg:kotovane': kotovane,
  'dg:krivky': krivky,
  'dg:topo': topo,
  'dg:monge': monge,
};
