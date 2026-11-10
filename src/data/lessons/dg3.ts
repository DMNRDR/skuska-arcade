import type { Step } from '../steps';

// Metódy zobrazovania, 3. písomka (13. týždeň, max 8 b): geometrické základy kartografie.
// Rozsah podľa harmonogramu predmetu (témy 9 až 13) a sylabu B1-MZO. Okruh 3T zatiaľ nie je zverejnený,
// preto výklad stavia na oficiálnych „Typoch úloh“ zo skrípt M. Vajsáblová: Metódy zobrazovania pre GaK
// (valcové s. 137, kužeľové s. 150, nepravé a polykónické s. 162, azimutálne s. 198) a na štandardnej
// matematickej kartografii (Vajsáblová, Matematické základy kartografie, 2021). Značenie: U šírka, V dĺžka.
// Všetky čísla v príkladoch overuje skript scripts/check_kart.py.

const pisomka3: Step[] = [
  {
    title: 'Čo bude na 3. písomke',
    text: 'Tretia písomka je za 8 bodov, píše sa v 13. týždni (okolo piatka 11. 12.). Téma je jedna: geometrické základy kartografie, teda ako sa guľa (Zem) prenesie na rovný papier.\n\nUčiteľka okruh otázok 3T ešte nezverejnila. Preto je príprava postavená na oficiálnych „Typoch úloh“ zo skrípt Vajsáblovej. Typ písomky bude ako 1. a 2.: definície s náčrtom a jedna až dve rysovacie úlohy.',
    bullets: [
      'Úvod: referenčné plochy, U a V, zemepisná sieť, skreslenie, delenie zobrazení',
      'Azimutálne: ortografická, gnómonická a stereografická projekcia (pólová, rovníková, všeobecná poloha)',
      'Valcové: Lambertovo, ekvidištančné, Mercatorovo, gnómonické, Braunovo a Gallovo',
      'Kužeľové: Ptolemaiovo, projekcie na kužeľ',
      'Ortodróma a loxodróma',
      'Nepravé (pseudo…) a polykónické zobrazenia',
    ],
    check: {
      q: 'Koľko bodov je za 3. písomku?',
      options: ['8', '10', '12', '30'],
      explain: 'Hárok v AIS: 1. písomka 12 b, 2. písomka 10 b, 3. písomka 8 b. Spolu 30.',
    },
  },
  {
    title: 'Ako sa učiť',
    text: 'Rysovacie úlohy sú takmer vždy rovnaké: „zostrojte obraz zemepisnej siete (napr. 30°) … v … projekcii“. Postup má vždy tri kroky. Z rovnice alebo z rezu meridiánom zistíš, kam padne každá rovnobežka. Potom určíš, ako vyzerajú poludníky. Nakoniec sieť narysuješ a popíšeš.\n\nPreto sa nauč pre každé zobrazenie: rovnicu (ρ alebo y), tvar obrazu poludníkov a rovnobežiek a hlavnú vlastnosť (konformné, ekvivalentné, ekvidištančné, ortodróma → priamka…).',
    bullets: ['Deň 1: Úvod + skreslenie', 'Deň 2: Azimutálne (3 rysovačky)', 'Deň 3: Valcové + kužeľové', 'Deň 4: Ortodróma, nepravé', 'Deň 5: Tézy 3 v režime Skúšanie + Level 4'],
  },
];

const uvod: Step[] = [
  {
    title: 'Aký tvar má Zem',
    text: 'Skutočný tvar Zeme je geoid: plocha, ktorú by mala hladina mora predĺžená pod kontinenty. Je hrboľatá a matematicky ju nevieme jednoducho opísať.\n\nPreto ju nahrádzame jednoduchšou referenčnou plochou. Presnejšia je rotačný elipsoid (napr. Besselov, WGS84), jednoduchšia je guľová plocha s polomerom R ≈ 6 380 km. V tejto písomke pracujeme len s referenčnou guľovou plochou.',
    bullets: ['geoid: skutočný tvar (hladinová plocha)', 'rotačný elipsoid: presná náhrada (geodézia)', 'referenčná guľová plocha s polomerom R: jednoduchá náhrada (malé mierky, táto písomka)'],
    check: { q: 'Akú referenčnú plochu používame v kartografických projekciách na tejto písomke?', options: ['Guľovú plochu s polomerom R', 'Geoid', 'Rotačný paraboloid', 'Rovinu'], explain: 'Geoid je skutočný tvar, elipsoid presná náhrada. Projekcie, ktoré rysujeme, premietajú referenčnú guľovú plochu.' },
  },
  {
    title: 'Zemepisné súradnice U a V',
    text: 'Polohu bodu A na guli určujú dva uhly. Zemepisná šírka U je uhol medzi spojnicou OA a rovinou rovníka: od −90° (južný pól) cez 0° (rovník) po 90° (severný pól). Zemepisná dĺžka V je uhol medzi rovinou poludníka bodu A a rovinou základného poludníka (Greenwich, V = 0°): od −180° po 180°.\n\nNa obrázku: oblúk U ide po poludníku od rovníka k bodu A, oblúk V ide po rovníku od základného poludníka.',
    fig: 'dg-kart-siet',
    formula: { f: 'A = [U, V],   U ∈ ⟨−90°, 90°⟩,   V ∈ (−180°, 180°⟩', what: 'zemepisné súradnice', vars: [['U', 'zemepisná šírka (od rovníka)'], ['V', 'zemepisná dĺžka (od základného poludníka)'], ['O', 'stred referenčnej guľovej plochy'], ['R', 'polomer referenčnej guľovej plochy']] },
    check: { q: 'Aká je zemepisná šírka severného pólu?', options: ['U = 90°', 'U = 0°', 'V = 90°', 'U = 180°'], explain: 'Šírka sa meria od rovníka (0°) k pólu (90°). Dĺžka V v póle nie je určená, všetky poludníky sa tam stretnú.' },
  },
  {
    title: 'Poludníky a rovnobežky',
    text: 'Poludník je polkružnica z pólu do pólu, všetky jeho body majú rovnakú dĺžku V. Je to polovica hlavnej kružnice (jej rovina prechádza stredom O).\n\nRovnobežka je kružnica, všetky jej body majú rovnakú šírku U. Leží v rovine rovnobežnej s rovníkom a má polomer r = R·cos U. Jediná rovnobežka, ktorá je hlavnou kružnicou, je rovník (U = 0°).\n\nPoludníky a rovnobežky spolu tvoria zemepisnú sieť. Jej obraz v rovine je kartografická sieť.',
    formula: { f: 'r = R · cos U      oblúk poludníka = R · ΔU      oblúk rovnobežky = R · cos U · ΔV', what: 'dĺžky na guli (uhly v radiánoch)', vars: [['r', 'polomer rovnobežky so šírkou U'], ['ΔU', 'rozdiel šírok v radiánoch'], ['ΔV', 'rozdiel dĺžok v radiánoch']] },
    check: { q: 'Aký polomer má rovnobežka s U = 60° na guli s R = 6 380 km?', options: ['3 190 km', '6 380 km', '5 525 km', '0 km'], explain: 'r = R·cos 60° = 6 380 · 0,5 = 3 190 km. Rovnobežky sa k pólu zmenšujú.' },
  },
  {
    title: 'Kartografické zobrazenie',
    text: 'Kartografické zobrazenie je predpis, ktorý každému bodu [U, V] referenčnej plochy priradí bod v rovine. Píše sa zobrazovacími rovnicami: x = f₁(U, V), y = f₂(U, V), alebo polárne ρ = f(U), ε = g(V).\n\nAk obraz vznikne naozajstným premietaním zo stredu S na rovinu, valec alebo kužeľ, hovoríme o kartografickej projekcii (perspektívne zobrazenie). Ostatné sú zobrazenia dané len rovnicami (napr. Mercatorovo).',
    formula: { f: 'x = f₁(U, V),  y = f₂(U, V)     alebo     ρ = f(U),  ε = g(V)', what: 'zobrazovacie rovnice', vars: [['x, y', 'pravouhlé súradnice v rovine'], ['ρ', 'polomer (vzdialenosť od obrazu pólu)'], ['ε', 'uhol obrazu poludníka']] },
    check: { q: 'Čím sa líši kartografická projekcia od všeobecného kartografického zobrazenia?', options: ['Projekcia vzniká geometrickým premietaním zo stredu S', 'Projekcia je vždy konformná', 'Projekcia sa robí len na rovinu', 'Nelíši sa ničím'], explain: 'Projekcia = perspektívne zobrazenie (premietanie zo stredu S, aj nevlastného). Zobrazenie môže byť dané len rovnicami.' },
  },
  {
    title: 'Skreslenie',
    text: 'Guľu nemožno rozvinúť do roviny bez deformácie. Každé zobrazenie niečo skreslí. Dĺžkové skreslenie (modul) m = ds′/ds je pomer dĺžky obrazu malého úseku k jeho skutočnej dĺžke. V poludníku ho značíme m_p, v rovnobežke m_r.\n\nPlošné skreslenie P je pomer plôch. Ak sa poludníky a rovnobežky zobrazia kolmo, platí P = m_p · m_r. Uhlové skreslenie je zmena uhlov.\n\nTissotova indikatrix: nekonečne malá kružnica na guli sa zobrazí ako elipsa. Jej poloosi sú extrémne skreslenia v hlavných smeroch.',
    fig: 'dg-kart-tissot',
    formula: { f: 'm = ds′ / ds      P = m_p · m_r', what: 'skreslenie', vars: [['m_p', 'dĺžkové skreslenie v poludníku'], ['m_r', 'dĺžkové skreslenie v rovnobežke'], ['P', 'plošné skreslenie'], ['m = 1', 'dĺžka sa v danom smere zachová']] },
    check: { q: 'V Mercatorovom zobrazení je na rovnobežke 60° m_p = m_r = 2. Aké je plošné skreslenie?', options: ['P = 4', 'P = 2', 'P = 1', 'P = 0,5'], explain: 'P = m_p · m_r = 2 · 2 = 4. Grónsko vyzerá v Mercatorovi obrovské práve preto.' },
  },
  {
    title: 'Konformné, ekvivalentné, ekvidištančné',
    text: 'Podľa toho, čo zobrazenie zachová, ich delíme na štyri skupiny.\n\nKonformné (uhlojavné) zachová uhly: m_p = m_r v každom bode, indikatrix je kružnica. Ekvivalentné (plochojavné) zachová plochy: P = 1. Ekvidištančné zachová dĺžky v jednom smere, napr. v poludníkoch (m_p = 1) alebo v rovnobežkách (m_r = 1). Vyrovnávacie (kompenzačné) nezachová nič presne, ale skreslenia sú malé a vyvážené.\n\nŽiadne zobrazenie nemôže byť naraz konformné aj ekvivalentné.',
    bullets: ['konformné: m_p = m_r (kružnice ostanú malými kružnicami)', 'ekvivalentné: m_p · m_r = 1', 'ekvidištančné v poludníkoch: m_p = 1; v rovnobežkách: m_r = 1', 'vyrovnávacie: kompromis'],
    check: { q: 'Ktorá podmienka platí pre ekvivalentné zobrazenie s kolmou sieťou?', options: ['m_p · m_r = 1', 'm_p = m_r', 'm_p = 1', 'm_r = 0'], explain: 'Ekvivalentné = plochy sa zachovajú, P = m_p·m_r = 1. Podmienka m_p = m_r je konformnosť, m_p = 1 ekvidištančnosť v poludníkoch.' },
  },
  {
    title: 'Delenie podľa plochy a polohy',
    text: 'Podľa zobrazovacej plochy: azimutálne (rovina), valcové (valec), kužeľové (kužeľ). Valec aj kužeľ sa potom rozvinú do roviny. Ďalej sú nepravé (pseudo…) a polykónické zobrazenia.\n\nPodľa polohy osi plochy voči zemskej osi: pólová alebo normálna (os splýva so zemskou osou), rovníková alebo priečna (os je kolmá na zemskú os), všeobecná alebo šikmá (iná).\n\nPlocha môže byť dotyková (dotýka sa gule v bode alebo v jednej kružnici) alebo sečná (pretína guľu, napr. v dvoch rovnobežkách). Na dotykovej alebo sečnej kružnici sa dĺžky zachovajú (m = 1).',
    fig: 'dg-kart-polohy',
    check: { q: 'Valcová plocha, ktorej os je kolmá na zemskú os, je v polohe…', options: ['rovníkovej (priečnej)', 'pólovej (normálnej)', 'všeobecnej (šikmej)', 'dotykovej'], explain: 'Normálna: os valca = zemská os. Priečna (rovníková): os ⊥ zemská os. Šikmá: iný uhol. „Dotyková“ hovorí o dotyku, nie o polohe.' },
  },
];

const azimut: Step[] = [
  {
    title: 'Azimutálne projekcie: princíp',
    text: 'Priemetňa je rovina. V pólovej polohe sa dotýka gule v severnom póle P. Obraz pólu je stred, poludníky sú polpriamky z neho a zvierajú skutočné uhly ε = V. Rovnobežky sú sústredné kružnice s polomermi ρ = f(U).\n\nTri projekcie sa líšia iba stredom premietania S. Ortografická: S je v nekonečne (kolmé premietanie). Gnómonická: S je stred gule O. Stereografická: S je protiľahlý (južný) pól.',
    formula: { f: 'ortografická ρ = R·cos U     gnómonická ρ = R·cotg U     stereografická ρ = 2R·tg((90° − U)/2)', what: 'pólová poloha, dotyková rovina v póle P, ε = V', vars: [['ρ', 'polomer obrazu rovnobežky so šírkou U'], ['ε = V', 'poludník sa zobrazí pod skutočným uhlom'], ['90° − U', 'pólová vzdialenosť δ (uhol od pólu)']] },
    check: { q: 'Kde je stred premietania v gnómonickej projekcii?', options: ['V strede gule O', 'V protiľahlom póle', 'V nekonečne', 'V dotykovom bode'], explain: 'Gnómonická = centrálna, S = O. Stereografická má S v protiľahlom póle, ortografická v nekonečne.' },
  },
  {
    title: 'Ortografická projekcia',
    text: 'Premietacie lúče sú rovnobežné a kolmé na priemetňu. V pólovej polohe sa rovnobežka zobrazí ako kružnica so skutočným polomerom ρ = R·cos U. Zobrazí sa len jedna hemisféra, rovník je obrys (ρ = R).\n\nK rovníku sa rovnobežky zhusťujú. Dĺžky rovnobežiek sa zachovajú (2πρ = 2πR·cos U), preto je ortografická projekcia v pólovej polohe ekvidištančná v rovnobežkách. Tak vyzerá Zem odfotená z veľkej diaľky.\n\nNižšie si sieť narysuj krok po kroku.',
    worked: { q: 'R = 4 cm, sieť 30°, pólová poloha', steps: ['U = 60°: ρ = 4·cos 60° = 2,00 cm', 'U = 30°: ρ = 4·cos 30° = 3,46 cm', 'U = 0° (rovník): ρ = 4,00 cm = obrys', 'poludníky: polpriamky po 30°'], result: 'sústredné kružnice 2,00; 3,46; 4,00 cm + 12 polpriamok' },
    check: { q: 'Aký polomer má v ortografickej pólovej projekcii obraz rovnobežky 60°, ak R = 4 cm?', options: ['2 cm', '3,46 cm', '2,31 cm', '4 cm'], explain: 'ρ = R·cos U = 4·0,5 = 2 cm.' },
  },
  {
    title: 'Gnómonická projekcia',
    text: 'Stred premietania je stred gule. Lúč zo stredu O pod uhlom U pretne dotykovú rovinu vo vzdialenosti ρ = R·cotg U od pólu. Rovník (U = 0°) dá lúč rovnobežný s priemetňou, preto sa nezobrazí. Zobrazí sa menej ako hemisféra a rovnobežky sa k rovníku rýchlo riedia.\n\nKľúčová vlastnosť: každá hlavná kružnica leží v rovine cez O = S, takže sa zobrazí ako priamka. Ortodróma (najkratšia cesta) je v gnómonickej mape úsečka. Preto ju používali navigátori.',
    worked: { q: 'R = 4 cm, sieť 30°, pólová poloha', steps: ['U = 60°: ρ = 4·cotg 60° = 2,31 cm', 'U = 30°: ρ = 4·cotg 30° = 6,93 cm', 'U = 0°: ρ → ∞, rovník sa nezobrazí'], result: 'kružnice 2,31 a 6,93 cm + polpriamky po 30°' },
    check: { q: 'Čo sa v gnómonickej projekcii zobrazí ako priamka?', options: ['Každá ortodróma (hlavná kružnica)', 'Každá loxodróma', 'Každá rovnobežka', 'Nič'], explain: 'Rovina hlavnej kružnice prechádza stredom gule = stredom premietania S, preto je jej obrazom priamka. Rovnobežky (okrem rovníka) nie sú hlavné kružnice.' },
  },
  {
    title: 'Stereografická projekcia',
    text: 'Stred premietania je protiľahlý pól, priemetňa je dotyková rovina v póle P. Zobrazí sa celá guľa okrem bodu S. Rovník má ρ = 2R.\n\nStereografická projekcia je konformná (zachová uhly). Navyše každá kružnica na guli sa zobrazí ako kružnica (ak neprechádza bodom S) alebo ako priamka (ak prechádza bodom S). Používa sa pre polárne oblasti (UPS, Universal Polar Stereographic).\n\nPozor: ak je priemetňou rovina rovníka, vzorec je ρ = R·tg((90° − U)/2). Obraz je len zmenšený na polovicu, tvar siete je rovnaký.',
    worked: { q: 'R = 4 cm, sieť 30°, dotyková rovina v póle', steps: ['U = 60°: ρ = 8·tg 15° = 2,14 cm', 'U = 30°: ρ = 8·tg 30° = 4,62 cm', 'U = 0°: ρ = 8·tg 45° = 8,00 cm'], result: 'kružnice 2,14; 4,62; 8,00 cm + polpriamky po 30°' },
    check: { q: 'Ktorá azimutálna projekcia je konformná?', options: ['Stereografická', 'Gnómonická', 'Ortografická', 'Žiadna'], explain: 'Stereografická zachová uhly a kružnice zobrazí na kružnice. Gnómonická zobrazí ortodrómy ako priamky, ortografická je pohľad z nekonečna.' },
  },
  {
    title: 'Rovníková poloha',
    text: 'Priemetňa sa dotýka gule v bode rovníka. Stredný poludník a rovník sa zobrazia ako dve kolmé priamky.\n\nOrtografická: poludníky sú elipsy (polovice), rovnobežky sú úsečky rovnobežné s rovníkom, vo vzdialenosti R·sin U.\nGnómonická: poludníky sú rovnobežné priamky kolmé na rovník (vo vzdialenosti R·tg V), rovnobežky sú hyperboly.\nStereografická: poludníky aj rovnobežky sú kružnicové oblúky, ktoré sa pretínajú pod pravým uhlom. Poludníky prechádzajú obrazmi oboch pólov.',
    fig: 'dg-kart-az-rovn',
    check: { q: 'Na čo sa zobrazia rovnobežky v gnómonickej projekcii v rovníkovej polohe?', options: ['Na hyperboly', 'Na kružnice', 'Na úsečky rovnobežné s rovníkom', 'Na elipsy'], explain: 'Kužeľ lúčov zo stredu O cez rovnobežku pretne zvislú priemetňu v hyperbole (os kužeľa je rovnobežná s priemetňou). Rovník je výnimka, je to priamka.' },
  },
  {
    title: 'Všeobecná poloha',
    text: 'Priemetňa sa dotýka gule v bode so šírkou 0° < U₀ < 90°. Obraz pólu už nie je stred obrázka.\n\nOrtografická: rovnobežky sú elipsy (alebo ich časti), poludníky sú elipsy cez obraz pólu.\nGnómonická: poludníky sú priamky cez obraz pólu (sú to hlavné kružnice). Rovnobežky sú kužeľosečky, podľa šírky elipsy, parabola alebo hyperboly. Rovník je priamka.\nStereografická: všetky obrazy sú kružnice alebo priamky (poludníky cez obraz pólu).',
    bullets: ['ortografická: elipsy', 'gnómonická: poludníky priamky, rovnobežky kužeľosečky', 'stereografická: kružnice (konformná)'],
    check: { q: 'Na čo sa zobrazia poludníky v gnómonickej projekcii vo všeobecnej polohe?', options: ['Na priamky prechádzajúce obrazom pólu', 'Na kružnice', 'Na hyperboly', 'Na rovnobežné priamky'], explain: 'Poludník je polovica hlavnej kružnice, gnómonická projekcia ho zobrazí ako priamku. Všetky prechádzajú pólom, takže aj jeho obrazom.' },
  },
  {
    title: 'Azimutálne zobrazenia (nie projekcie)',
    text: 'Okrem troch projekcií sú azimutálne zobrazenia dané len rovnicou ρ = f(U):\n\nPostelovo ekvidištančné: ρ = R·(90° − U) v radiánoch. Polomer je skutočná dĺžka poludníka od pólu (m_p = 1). Je to znak OSN.\nLambertovo ekvivalentné: ρ = 2R·sin((90° − U)/2). Zachová plochy.\n\nPri rovnakom R platí pre rovnobežku 30°: ortografická 0,87R < Lambertovo 1,00R < Postelovo 1,05R < stereografická 1,15R < gnómonická 1,73R.',
    formula: { f: 'Postel ρ = R·δ      Lambert ρ = 2R·sin(δ/2)      δ = 90° − U', what: 'neperspektívne azimutálne zobrazenia', vars: [['δ', 'pólová vzdialenosť (v radiánoch pri Postelovi)'], ['Postel', 'ekvidištančné v poludníkoch'], ['Lambert', 'ekvivalentné']] },
    check: { q: 'Ktoré azimutálne zobrazenie zachová dĺžky poludníkov?', options: ['Postelovo', 'Lambertovo', 'Gnómonická projekcia', 'Stereografická projekcia'], explain: 'Postelovo: ρ = R·δ, presne dĺžka oblúka poludníka od pólu, m_p = 1.' },
  },
];

const valcove: Step[] = [
  {
    title: 'Valcové zobrazenia: princíp',
    text: 'Guľu obalíme valcom. V normálnej polohe je os valca zemská os. Dotykový valec sa dotýka gule v rovníku, sečný ju pretína v dvoch rovnobežkách ±U₀.\n\nPo rozvinutí sú poludníky rovnobežné priamky v rovnakých vzdialenostiach a rovnobežky sú priamky na ne kolmé. Sieť je teda pravouhlá. Zobrazenia sa líšia jedine tým, ako ďaleko od rovníka padne rovnobežka: y = f(U).',
    formula: { f: 'x = R · V     (sečný: x = R·cos U₀ · V)      y = f(U)', what: 'valcové zobrazenia v normálnej polohe, V v radiánoch', vars: [['x', 'vzdialenosť poludníka od základného poludníka'], ['y', 'vzdialenosť rovnobežky od rovníka'], ['U₀', 'šírka sečných rovnobežiek'], ['2πR', 'dĺžka obrazu rovníka (dotykový valec)']] },
    check: { q: 'Ako vyzerajú poludníky v každom valcovom zobrazení v normálnej polohe?', options: ['Rovnobežné priamky v rovnakých odstupoch', 'Polpriamky z jedného bodu', 'Kružnicové oblúky', 'Sínusoidy'], explain: 'Poludníky sú tvoriace priamky valca, po rozvinutí rovnobežné priamky. Rovnomerne, lebo x = R·V.' },
  },
  {
    title: 'Projekcie so stredom S',
    text: 'Perspektívne valcové projekcie: rez meridiánom, stred premietania S leží v rovine rovníka na opačnej strane, vo vzdialenosti c = |SO| od stredu. Pri každom poludníku sa S „posunie“ (pohyblivý stred). Pre dotykový valec vychádza:\n\ny = R·sin U·(R + c) / (c + R·cos U)\n\nŠpeciálne prípady: c = 0 (S = O) je gnómonická valcová, y = R·tg U. c = R (S na guli) je stereografická (Braunova), y = 2R·tg(U/2). c → ∞ (rovnobežné lúče) je Lambertova izocylindrická, y = R·sin U.',
    formula: { f: 'y = R·sin U · (R + c) / (c + R·cos U)', what: 'valcová projekcia s pohyblivým stredom S, dotykový valec', vars: [['c', 'vzdialenosť stredu S od stredu gule'], ['c = 0', 'gnómonická: y = R·tg U'], ['c = R', 'Braunova stereografická: y = 2R·tg(U/2)'], ['c → ∞', 'Lambertova: y = R·sin U']] },
    check: { q: 'Čo dostaneš z valcovej projekcie s pohyblivým stredom S, ak c = |SO| = R?', options: ['Braunovu stereografickú projekciu', 'Mercatorovo zobrazenie', 'Lambertovo izocylindrické', 'Gnómonickú valcovú'], explain: 'S leží na guli (protiľahlý bod rovníka) = stereografická. Pre dotykový valec Braun, pre sečný v 45° Gall.' },
  },
  {
    title: 'Lambertovo izocylindrické',
    text: 'Lúče sú rovnobežné s rovinou rovníka a kolmé na os (S v nekonečne). Rovnobežka sa premietne do výšky y = R·sin U, pól do výšky R.\n\nZobrazenie je ekvivalentné: rovnobežky sa natiahnu (m_r = 1/cos U), poludníky skrátia (m_p = cos U), súčin je 1. Pri póloch sú tvary veľmi sploštené.',
    fig: 'dg-kart-v-lambert',
    worked: { q: 'R = 3 cm, sieť 30°', steps: ['U = 30°: y = 3·sin 30° = 1,50 cm', 'U = 60°: y = 3·sin 60° = 2,60 cm', 'U = 90°: y = 3,00 cm (pól je úsečka dĺžky 2πR)'], result: 'rovnobežky vo výškach 1,50; 2,60; 3,00 cm' },
    check: { q: 'Prečo je Lambertovo izocylindrické zobrazenie ekvivalentné?', options: ['m_p = cos U a m_r = 1/cos U, súčin je 1', 'Zachováva uhly', 'Poludníky majú skutočnú dĺžku', 'Pól je bod'], explain: 'Plošné skreslenie P = m_p·m_r = cos U · (1/cos U) = 1.' },
  },
  {
    title: 'Ekvidištančné v poludníkoch',
    text: 'Najjednoduchšie valcové zobrazenie (štvorcová sieť pri rovnakom kroku): y = R·U, kde U je v radiánoch. Vzdialenosť rovnobežky od rovníka je teda skutočná dĺžka oblúka poludníka.\n\nPoludníky majú skutočnú dĺžku (m_p = 1), rovnobežky sú predĺžené (m_r = 1/cos U). Pól je úsečka.',
    fig: 'dg-kart-v-ekvi',
    worked: { q: 'R = 3 cm, sieť 30°', steps: ['U = 30° = π/6: y = 3·0,524 = 1,57 cm', 'U = 60° = π/3: y = 3,14 cm', 'U = 90°: y = 3·π/2 = 4,71 cm', 'poludníky po 30°: x = 3·π/6 = 1,57 cm'], result: 'štvorcová sieť so stranou 1,57 cm' },
    check: { q: 'Aká je v ekvidištančnom valcovom zobrazení (R = 3 cm) vzdialenosť rovnobežky 60° od rovníka?', options: ['3,14 cm', '2,60 cm', '3,95 cm', '5,20 cm'], explain: 'y = R·U = 3 · π/3 = π ≈ 3,14 cm. 2,60 je Lambert, 3,95 Mercator, 5,20 gnómonická.' },
  },
  {
    title: 'Mercatorovo zobrazenie',
    text: 'Mercator (1569) chcel mapu pre námorníkov: konformnú, aby kurz odčítaný na mape platil aj na mori. Rovnobežky sú v rovnobežnom smere natiahnuté o 1/cos U, preto ich musí rovnako natiahnuť aj v poludníku: y = R·ln tg(45° + U/2).\n\nVlastnosti: konformné, pól je v nekonečne (nezobrazí sa). Loxodróma (krivka so stálym kurzom) je priamka. Plochy pri póloch sú veľmi zväčšené (P = 1/cos² U, na 60° štvornásobne).\n\nNie je to projekcia (nevzniká premietaním zo stredu S). V Typoch úloh je aj perspektívna náhrada so stredom S, |SO| = 0,4R.',
    fig: 'dg-kart-v-merc',
    worked: { q: 'R = 3 cm', steps: ['U = 30°: y = 3·ln tg 60° = 3·0,549 = 1,65 cm', 'U = 60°: y = 3·ln tg 75° = 3·1,317 = 3,95 cm', 'U = 90°: y → ∞'], result: 'rovnobežky 1,65; 3,95 cm, pól sa nezobrazí' },
    check: { q: 'Čo je v Mercatorovom zobrazení priamka?', options: ['Loxodróma', 'Ortodróma', 'Každá kružnica', 'Obraz pólu'], explain: 'Mercator je konformný valcový: loxodróma pretína priame poludníky pod stálym uhlom, teda je to priamka. Ortodróma je priamka v gnómonickej projekcii.' },
  },
  {
    title: 'Gnómonická, Braunova a Gallova',
    text: 'Gnómonická valcová (S = O): y = R·tg U. Rovnobežky sa k pólu riedia ešte rýchlejšie ako v Mercatorovi, pól sa nezobrazí.\n\nBraunova stereografická (dotykový valec, S na opačnom konci priemeru rovníka): y = 2R·tg(U/2). Pól sa zobrazí do výšky 2R.\n\nGallova stereografická: valec je sečný v U₀ = 45°, x = R·cos 45°·V, y = R·(1 + cos 45°)·tg(U/2).\n\nPre R = 3 cm a U = 60°: Lambert 2,60 < ekvidištančné 3,14 < Braun 3,46 < Mercator 3,95 < gnómonická 5,20.',
    fig: 'dg-kart-v-braun',
    check: { q: 'V ktorom valcovom zobrazení (R rovnaké) je rovnobežka 60° najďalej od rovníka?', options: ['Gnómonickom (y = R·tg U)', 'Mercatorovom', 'Braunovom', 'Lambertovom'], explain: 'tg 60° = 1,73 > ln tg 75° = 1,32 > 2·tg 30° = 1,15 > sin 60° = 0,87.' },
  },
];

const kuzelove: Step[] = [
  {
    title: 'Kužeľové zobrazenia: princíp',
    text: 'Guľu obalíme kužeľom, v normálnej polohe je jeho os zemská os. Dotykový kužeľ sa dotýka gule v rovnobežke U₀, sečný ju pretína v dvoch rovnobežkách U₁, U₂.\n\nPo rozvinutí kužeľa do roviny (kruhová výseč) sú poludníky polpriamky z vrcholu a rovnobežky sústredné kružnicové oblúky. Uhly medzi poludníkmi sa zmenšia: ε = n·V, kde pre dotykový kužeľ n = sin U₀ (konštanta kužeľa).',
    formula: { f: 'ε = n · V,  n = sin U₀      ρ₀ = R · cotg U₀      ρ = f(U)', what: 'kužeľové zobrazenia v normálnej polohe', vars: [['n', 'konštanta kužeľa (0 < n < 1)'], ['ρ₀', 'polomer obrazu dotykovej rovnobežky = dĺžka tvoriacej priamky'], ['U₀', 'šírka dotykovej rovnobežky']] },
    check: { q: 'Pod akým uhlom ε sa zobrazí poludník V = 90° na dotykovom kuželi v U₀ = 45°?', options: ['ε ≈ 63,6°', 'ε = 90°', 'ε = 45°', 'ε = 127°'], explain: 'ε = V · sin U₀ = 90° · 0,707 = 63,6°. Kužeľ sa po rozvinutí „nezatvorí“ do 360°.' },
  },
  {
    title: 'Ptolemaiovo zobrazenie',
    text: 'Ptolemaiovo kužeľové zobrazenie je ekvidištančné v poludníkoch, na dotykovom kuželi v U₀. Dotyková rovnobežka sa zobrazí v skutočnej dĺžke (polomer R·cotg U₀) a ostatné rovnobežky sa od nej nanášajú v skutočných vzdialenostiach oblúkov poludníka.\n\nPól sa zobrazí ako kružnicový oblúk, nie ako bod.',
    fig: 'dg-kart-ptolemaios',
    formula: { f: 'ρ = R·cotg U₀ + R·(U₀ − U)      ε = V · sin U₀', what: 'Ptolemaiovo ekvidištančné kužeľové zobrazenie (U v radiánoch)', vars: [['R·(U₀ − U)', 'skutočná dĺžka poludníka medzi U₀ a U'], ['m_p = 1', 'poludníky v skutočnej dĺžke'], ['m_r = 1', 'iba na rovnobežke U₀']] },
    worked: { q: 'R = 4 cm, U₀ = 45°', steps: ['ρ₀ = 4·cotg 45° = 4,00 cm', 'U = 30°: ρ = 4 + 4·(π/12) = 5,05 cm', 'U = 60°: ρ = 4 − 1,05 = 2,95 cm', 'U = 90°: ρ = 4 − 4·π/4 = 0,86 cm (pól je oblúk)', 'U = 0°: ρ = 4 + π = 7,14 cm'], result: 'sústredné oblúky 0,86; 2,95; 4,00; 5,05; 7,14 cm, ε = 0,707·V' },
    check: { q: 'Na čo sa zobrazí pól v Ptolemaiovom zobrazení?', options: ['Na kružnicový oblúk', 'Na bod (vrchol kužeľa)', 'Nezobrazí sa', 'Na priamku'], explain: 'ρ(90°) = R·cotg U₀ − R·(90° − U₀) > 0, napr. 0,86 cm pre R = 4, U₀ = 45°. Je to oblúk okolo vrcholu.' },
  },
  {
    title: 'Kužeľové projekcie',
    text: 'Pri projekciách sa body premietajú na kužeľ zo stredu S. Gnómonická kužeľová (S = O) na dotykový kužeľ v U₀: lúč zo stredu pod uhlom U pretne tvoriacu priamku vo vzdialenosti R·tg(U − U₀) od bodu dotyku. Preto ρ = R·cotg U₀ − R·tg(U − U₀).\n\nPodobne vznikajú projekcie so stredom S na zemskej osi, s pohyblivým stredom v rovine rovníka alebo stereografická kužeľová. Sečný kužeľ v U₁, U₂ zachová dĺžky dvoch rovnobežiek.\n\nKonformné kužeľové zobrazenie (Lambertovo) je základom Křovákovho zobrazenia S-JTSK. To je dvojité konformné kužeľové zobrazenie v šikmej polohe, v ňom máš body z geodézie aj z Kokeša.',
    formula: { f: 'gnómonická kužeľová:  ρ = R·cotg U₀ − R·tg(U − U₀),   ε = V·sin U₀', what: 'dotykový kužeľ v U₀, stred S = O', vars: [['R·cotg U₀', 'ρ₀ dotykovej rovnobežky'], ['R·tg(U − U₀)', 'posun po tvoriacej priamke smerom k vrcholu']] },
    check: { q: 'Na akom zobrazení je postavený S-JTSK (Křovákovo zobrazenie)?', options: ['Konformné kužeľové v šikmej polohe', 'Mercatorovo valcové', 'Gnómonické azimutálne', 'Ptolemaiovo'], explain: 'Křovák: dvojité konformné kužeľové zobrazenie v šikmej (všeobecnej) polohe.' },
  },
];

const ortodroma: Step[] = [
  {
    title: 'Ortodróma',
    text: 'Ortodróma je najkratšia spojnica dvoch bodov na guli. Je to kratší oblúk hlavnej kružnice, ktorá nimi prechádza (kružnica so stredom v strede gule O, jej rovina je OAB).\n\nPoludníky a rovník sú ortodrómy. Ostatné rovnobežky nie sú: ak letíš z A do B po rovnobežke, letíš dlhšie. Ortodróma je vydutá smerom k pólu a pretína každý poludník pod iným uhlom (kurz sa stále mení).',
    fig: 'dg-kart-orto-loxo',
    check: { q: 'Čo je ortodróma?', options: ['Najkratšia spojnica dvoch bodov na guli, oblúk hlavnej kružnice', 'Krivka so stálym kurzom', 'Obraz rovnobežky', 'Spojnica bodov po rovnobežke'], explain: 'Ortodróma = oblúk hlavnej kružnice (rovina cez stred gule). Krivka so stálym kurzom je loxodróma.' },
  },
  {
    title: 'Loxodróma',
    text: 'Loxodróma pretína všetky poludníky pod rovnakým uhlom (stály azimut, kurz). Lodi sa podľa nej ľahko riadi: kompas stále na tom istom smere.\n\nAk kurz nie je 0°, 90°, 180° ani 270°, loxodróma sa ako špirála nekonečne veľa ráz otočí okolo pólu, ale má konečnú dĺžku. Je dlhšia ako ortodróma (okrem poludníka a rovníka, kde splývajú).\n\nMercator: loxodróma = priamka. V stereografickej pólovej projekcii je loxodróma logaritmická špirála (konformná projekcia zachová stály uhol s polpriamkami poludníkov).',
    bullets: ['ortodróma: najkratšia, mení kurz', 'loxodróma: stály kurz, dlhšia', 'Mercator: loxodróma → priamka', 'gnómonická: ortodróma → priamka', 'stereografická pólová: ortodróma → kružnica (alebo priamka cez pól), loxodróma → logaritmická špirála'],
    check: { q: 'V ktorom zobrazení je loxodróma priamka?', options: ['Mercatorovom', 'Gnómonickom', 'Ortografickom', 'Lambertovom izocylindrickom'], explain: 'Mercator je konformné valcové zobrazenie, poludníky sú rovnobežné priamky, takže čiara so stálym uhlom k nim je priamka.' },
  },
  {
    title: 'Ortodróma v gnómonickej projekcii',
    text: 'Úloha: v gnómonickej projekcii sú dané body A, B (ich zemepisné súradnice). Nájdi obraz ortodrómy.\n\nRiešenie je najkratšie zo všetkých: zobraz A a B (ρ = R·cotg U, uhol V) a spoj ich úsečkou. Funguje to v každej polohe, nielen v pólovej. Navigátori takto našli trasu a body z gnómonickej mapy preniesli do Mercatorovej.',
    check: { q: 'Prečo je obraz ortodrómy v gnómonickej projekcii priamka?', options: ['Rovina ortodrómy prechádza stredom premietania S = O', 'Lebo projekcia je konformná', 'Lebo ortodróma je rovnobežka', 'Nie je priamka'], explain: 'Všetky premietacie lúče bodov ortodrómy ležia v jej rovine (prechádza O = S). Rovina pretne priemetňu v priamke.' },
  },
  {
    title: 'Ortodróma v ortografickej projekcii',
    text: 'Typ úlohy zo skrípt: dané sú obrys g a priemety A₁, B₁. Body A, B ležia na tej istej (alebo na rôznych) hemisfére vzhľadom na priemetňu.\n\nRovina ortodrómy prechádza stredom gule. Kolmým priemetom hlavnej kružnice je elipsa so stredom v O₁, ktorej hlavná polos je R (dotýka sa obrysu g). Hlavnú os nájdeš ako priesečnicu roviny OAB s rovinou obrysu. Bod tejto priamky dostaneš sklopením priamky AB, vedľajšiu polos afinitou. Celý postup je v rysovačke.',
    check: { q: 'Aký obraz má ortodróma v ortografickej projekcii (vo všeobecnosti)?', options: ['Elipsa so stredom v obraze stredu gule a hlavnou polosou R', 'Priamka', 'Kružnica s polomerom R', 'Hyperbola'], explain: 'Kolmý priemet kružnice s polomerom R je elipsa s a = R. Je to úsečka iba vtedy, keď je rovina ortodrómy kolmá na priemetňu, a celý obrys, keď je s ňou rovnobežná.' },
  },
  {
    title: 'Ortodróma v stereografickej projekcii',
    text: 'Stereografická projekcia zobrazí kružnice ako kružnice. Hlavná kružnica cez A a B prechádza aj protiľahlými (antipodálnymi) bodmi A*, B*. Obraz ortodrómy je preto kružnica cez A_s, B_s a A_s*.\n\nAko nájsť A_s*: ak je g obraz rovníka s polomerom r_g (r_g = 2R pre dotykovú rovinu, r_g = R pre rovinu rovníka), leží A_s* na polpriamke opačnej k PA_s a platí |PA_s| · |PA_s*| = r_g². Stred kružnice je priesečník osí úsečiek A_sB_s a A_sA_s*.\n\nAk ortodróma prechádza pólom (je to poludník), jej obraz je priamka cez P.',
    formula: { f: '|PA_s| · |PA_s*| = r_g²', what: 'obraz antipodálneho bodu v stereografickej pólovej projekcii', vars: [['P', 'obraz pólu (stred)'], ['A_s*', 'obraz bodu protiľahlého k A, na opačnej strane od P'], ['r_g', 'polomer obrazu rovníka']] },
    check: { q: 'Na čo sa v stereografickej pólovej projekcii zobrazí ortodróma, ktorá neprechádza pólom?', options: ['Na kružnicu (oblúk)', 'Na priamku', 'Na elipsu', 'Na logaritmickú špirálu'], explain: 'Stereografická projekcia zachová kružnice. Priamkou je obraz len vtedy, keď kružnica prechádza stredom premietania S. Hlavná kružnica cez S prechádza aj pólom P, takže je to poludník.' },
  },
];

const neprave: Step[] = [
  {
    title: 'Nepravé zobrazenia',
    text: 'Pravé valcové, kužeľové a azimutálne zobrazenia majú poludníky ako priamky (rovnobežné alebo z jedného bodu). Nepravé (pseudo…) zobrazenia si z „pravého“ nechajú iba tvar rovnobežiek. Poludníky sú krivky, súmerné podľa stredného poludníka, ktorý je priamka.\n\nPseudocylindrické: rovnobežky sú rovnobežné priamky. Pseudokónické: rovnobežky sú sústredné kružnicové oblúky. Pseudoazimutálne: rovnobežky sú sústredné kružnice.',
    fig: 'dg-kart-neprave',
    bullets: ['pseudocylindrické: rovnobežky = rovnobežné priamky, poludníky = krivky', 'pseudokónické: rovnobežky = sústredné kružnicové oblúky', 'pseudoazimutálne: rovnobežky = sústredné kružnice'],
    check: { q: 'Čo platí pre pseudocylindrické zobrazenie?', options: ['Rovnobežky sú rovnobežné priamky, poludníky krivky', 'Poludníky sú rovnobežné priamky', 'Rovnobežky sú sústredné kružnice', 'Všetko sú priamky'], explain: 'Z valcového ostali priamkové rovnobežky, poludníky sú krivky (napr. sínusoidy pri Sansonovom zobrazení).' },
  },
  {
    title: 'Pseudocylindrické zobrazenia',
    text: 'Mercatorovo–Sansonovo (sínusoidálne): x = R·V·cos U, y = R·U. Rovnobežky majú skutočnú dĺžku a skutočné vzdialenosti (ekvidištančné v strednom poludníku a v rovnobežkách), zobrazenie je ekvivalentné. Poludníky sú sínusoidy.\n\nĎalšie z Typov úloh: Eckertovo priamkové vyrovnávacie (poludníky lomené priamky, pól je úsečka), ekvidištančné priamkové zobrazenia, Apianovo a Loritzovo kružnicové (poludníky sú kružnicové oblúky). Známe je aj Mollweideho ekvivalentné (poludníky elipsy).',
    formula: { f: 'x = R · V · cos U,   y = R · U', what: 'Mercatorovo–Sansonovo sínusoidálne zobrazenie (U, V v radiánoch)', vars: [['y = R·U', 'rovnobežky v skutočných vzdialenostiach'], ['x = R·V·cos U', 'rovnobežky v skutočnej dĺžke'], ['cos U', 'preto sú poludníky sínusoidy']] },
    check: { q: 'Aký tvar majú poludníky v Sansonovom zobrazení?', options: ['Sínusoidy', 'Elipsy', 'Rovnobežné priamky', 'Kružnice'], explain: 'x = R·V·cos U pre stále V je kosínus (sínus) závislosť od y = R·U, teda sínusoida.' },
  },
  {
    title: 'Pseudokónické a pseudoazimutálne',
    text: 'Bonneovo pseudokónické: rovnobežky sú sústredné kružnicové oblúky v skutočných vzdialenostiach na strednom poludníku a v skutočnej dĺžke. Je ekvivalentné.\n\nWernerovo–Stabeovo pseudoazimutálne: rovnobežky sú sústredné kružnice so stredom v obraze pólu, polomer ρ = R·(90° − U) (skutočná dĺžka poludníka od pólu). Na každej rovnobežke sa nanesie jej skutočná dĺžka. Je ekvidištančné na základnom poludníku aj na rovnobežkách, svet má tvar srdca.',
    formula: { f: 'Werner–Stab:  ρ = R·(π/2 − U),   oblúk rovnobežky = R·cos U·V', what: 'pseudoazimutálne zobrazenie ekvidištančné na základnom poludníku a na rovnobežkách', vars: [['ρ', 'polomer obrazu rovnobežky'], ['R·cos U·V', 'skutočná dĺžka oblúka rovnobežky']] },
    check: { q: 'Akú vzdialenosť od obrazu pólu má rovnobežka U = 30° vo Wernerovom–Stabeovom zobrazení (R = 4 cm)?', options: ['4,19 cm', '6,93 cm', '3,46 cm', '2,00 cm'], explain: 'ρ = R·(90° − 30°) v radiánoch = 4 · π/3 = 4,19 cm.' },
  },
  {
    title: 'Polykónické zobrazenia',
    text: 'Polykónické zobrazenie berie pre každú rovnobežku vlastný dotykový kužeľ. Každá rovnobežka sa zobrazí ako kružnicový oblúk s polomerom R·cotg U, so stredom na obraze stredného poludníka. Oblúky preto NIE sú sústredné.\n\nHasslerovo (americké) polykónické: stredný poludník je priamka v skutočnej dĺžke (rovnobežky v skutočných vzdialenostiach), rovnobežky v skutočnej dĺžke. Rovník je priamka.\n\nKruhové zobrazenia (Grintenovo, Nicolosiho) zobrazia svet alebo hemisféru do kruhu, poludníky aj rovnobežky sú kružnicové oblúky.',
    fig: 'dg-kart-polykon',
    check: { q: 'Čím sa líšia rovnobežky v polykónickom a v kužeľovom zobrazení?', options: ['V polykónickom nie sú sústredné (každá má svoj kužeľ)', 'V polykónickom sú to priamky', 'Nelíšia sa', 'V polykónickom sú to elipsy'], explain: 'Kužeľové: jeden kužeľ, sústredné oblúky. Polykónické: veľa kužeľov, stredy oblúkov ležia na strednom poludníku v rôznych bodoch.' },
  },
];

export const DG3_STEPS: Record<string, Step[]> = {
  'dg:pisomka3': pisomka3,
  'dg:kart-uvod': uvod,
  'dg:kart-azimut': azimut,
  'dg:kart-valcove': valcove,
  'dg:kart-kuzelove': kuzelove,
  'dg:kart-ortodroma': ortodroma,
  'dg:kart-neprave': neprave,
};
