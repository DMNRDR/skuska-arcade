import { Question, Topic } from '../types';

// Zdroj: ZS_2026-27/Metody_zobrazovania/Skuska/1T_-_Okruh_otazok.pdf (tézy na 1. písomku),
//        Dokumenty/MZ_GAK_Prehlad_Semestra_ZS_26-27.pdf, Pracovne_listy/PL_2_-_Kotovane_premietanie.pdf
//        a úlohy skupiny C z utorkovej písomky (od spolužiakov).

export const DG_TOPICS: Topic[] = [
  { id: 'pisomka', subject: 'dg', name: 'Písomka 1: čo bude a označovanie', icon: '📝', src: 'Tézy 1T, utorková písomka' },
  { id: 'kuzelosecky', subject: 'dg', name: 'Kužeľosečky', icon: '⭕', src: 'Cvičenie 1' },
  { id: 'rovnobezne', subject: 'dg', name: 'Rovnobežné premietanie', icon: '🔦', src: 'Prednáška 1, cvičenie 2' },
  { id: 'kotovane', subject: 'dg', name: 'Kótované premietanie', icon: '📏', src: 'Prednáška 1, cvičenie 2, PL 2' },
  { id: 'krivky', subject: 'dg', name: 'Krivky a plochy', icon: '🌀', src: 'Tézy 1T' },
  { id: 'topo', subject: 'dg', name: 'Topografické plochy', icon: '🗺️', src: 'Prednáška 2, cvičenie 3' },
  { id: 'monge', subject: 'dg', name: 'Mongeova projekcia', icon: '🧊', src: 'Prednáška 3, cvičenie 4' },
];

type Row = [topic: string, diff: 1 | 2 | 3, q: string, options: string[], explain: string, src: string];

const rows: Row[] = [
  // ───────────── PÍSOMKA, OZNAČOVANIE ─────────────
  ['pisomka', 1, 'Ako označíš pôdorys bodu A v Mongeovej projekcii?', ['A₁', 'A₂', 'A′', 'A(1)'], 'Index 1 je pôdorys, 2 nárys, 3 bokorys.', 'Označovanie'],
  ['pisomka', 1, 'Ako označíš priemet bodu A v rovnobežnom premietaní?', ['A′', 'A₁', 'A₂', '(A)'], 'V rovnobežnom premietaní má priemet čiarku.', 'Označovanie'],
  ['pisomka', 1, 'Čo znamená zápis A₁(3) v kótovanom premietaní?', ['Priemet bodu A s kótou 3', 'Tretí bod na priamke', 'Bod A je 3 cm od základnice', 'Nárys bodu A'], 'Index 1 je priemet, číslo v zátvorke kóta (výška).', 'Označovanie'],
  ['pisomka', 1, 'Akými písmenami označujeme roviny?', ['Gréckymi (α, β, γ)', 'Veľkými latinskými', 'Malými latinskými', 'Číslami'], 'Body veľké, priamky malé, roviny grécke písmená.', 'Označovanie'],
  ['pisomka', 1, 'Ktoré priemetne sú v Mongeovej projekcii?', ['Pôdorysňa π, nárysňa ν (prípadne bokorysňa μ)', 'Len jedna vodorovná priemetňa', 'Dve rovnobežné priemetne', 'Priemetňa a stred premietania'], 'Dve navzájom kolmé priemetne, tretia (bokorysňa) je kolmá na obe.', 'Utorková písomka'],
  ['pisomka', 2, 'Os z v Mongeovej projekcii je priesečnica…', ['nárysne a bokorysne', 'pôdorysne a nárysne', 'pôdorysne a bokorysne', 'pôdorysne a roviny α'], 'π ∩ ν = x, π ∩ μ = y, ν ∩ μ = z.', 'Utorková písomka'],
  ['pisomka', 2, 'Os y v Mongeovej projekcii je priesečnica…', ['pôdorysne a bokorysne', 'pôdorysne a nárysne', 'nárysne a bokorysne', 'nárysne a základnice'], 'π ∩ μ = y, smeruje k pozorovateľovi.', 'Utorková písomka'],
  ['pisomka', 1, 'Spádové merítko roviny sa rysuje…', ['dvojitou čiarou', 'čiarkovane', 'bodkovane', 'vlnovkou'], 'Dvojitá čiara odlíši merítko od obyčajnej priamky.', 'Označovanie'],
  ['pisomka', 1, 'Ako dlho trvá priebežná písomka z Metód zobrazovania?', ['25 až 30 minút', '90 minút', '10 minút', '60 minút'], 'Podľa podmienok predmetu cca 25 až 30 min, teória aj rysovanie.', 'Podmienky predmetu'],

  // ───────────── KUŽEĽOSEČKY ─────────────
  ['kuzelosecky', 1, 'Elipsa je množina bodov roviny, ktoré majú od dvoch ohnísk…', ['stály súčet vzdialeností 2a', 'stály rozdiel vzdialeností 2a', 'rovnakú vzdialenosť', 'stály súčin vzdialeností'], 'r₁ + r₂ = 2a, pričom 2a > |F₁F₂|.', 'Tézy, kužeľosečky 1'],
  ['kuzelosecky', 1, 'Hyperbola je množina bodov roviny, ktoré majú od dvoch ohnísk…', ['stály rozdiel vzdialeností (v absolútnej hodnote) 2a', 'stály súčet vzdialeností 2a', 'rovnakú vzdialenosť', 'vzdialenosť rovnú a'], '|r₁ − r₂| = 2a, pričom 2a < |F₁F₂|.', 'Tézy, kužeľosečky 3'],
  ['kuzelosecky', 1, 'Parabola je množina bodov, ktoré majú rovnakú vzdialenosť od…', ['ohniska F a riadiacej priamky d', 'dvoch ohnísk', 'vrcholu a osi', 'stredu a ohniska'], '|MF| = |Md|, F neleží na d.', 'Tézy, kužeľosečky 5'],
  ['kuzelosecky', 2, 'Aký vzťah platí medzi a, b, e pri elipse?', ['a² = b² + e²', 'e² = a² + b²', 'a = b + e', 'b² = a² + e²'], 'Pravouhlý trojuholník S, C, F: |CF| = a.', 'Kužeľosečky'],
  ['kuzelosecky', 2, 'Aký vzťah platí medzi a, b, e pri hyperbole?', ['e² = a² + b²', 'a² = b² + e²', 'b = a + e', 'e = a·b'], 'Pri hyperbole je ohnisko ďalej od stredu ako vrchol.', 'Kužeľosečky'],
  ['kuzelosecky', 2, 'Pri bodovej konštrukcii elipsy volíš pomocný bod R…', ['medzi ohniskami', 'mimo úsečky F₁F₂', 'na vedľajšej osi', 'v ohnisku'], 'Polomery |AR| a |BR| dávajú súčet 2a.', 'Tézy, kužeľosečky 1'],
  ['kuzelosecky', 2, 'Pri bodovej konštrukcii hyperboly volíš pomocný bod R…', ['na osi mimo úsečky F₁F₂', 'medzi ohniskami', 'na asymptote', 'vo vrchole'], 'Rozdiel polomerov |AR| − |BR| je potom 2a.', 'Tézy, kužeľosečky 3'],
  ['kuzelosecky', 1, 'Kde leží vrchol paraboly?', ['V strede úsečky FD (D je päta kolmice z F na d)', 'V ohnisku', 'Na riadiacej priamke', 'Vo vzdialenosti 2p od F'], 'Vrchol je rovnako ďaleko od F aj od d.', 'Tézy, kužeľosečky 5'],
  ['kuzelosecky', 2, 'Aký polomer má oskulačná kružnica paraboly vo vrchole?', ['p = |FD|', 'p/2', '2p', '|VF|'], 'Stred je na osi vo vzdialenosti p od vrcholu.', 'Utorková písomka'],
  ['kuzelosecky', 2, 'Asymptoty hyperboly sú…', ['uhlopriečky obdĺžnika so stranami 2a a 2b so stredom S', 'dotyčnice vo vrcholoch', 'kolmice v ohniskách', 'osi hyperboly'], 'Obdĺžnik zostrojíš z kružnice cez ohniská a kolmíc vo vrcholoch.', 'Tézy, kužeľosečky 4'],
  ['kuzelosecky', 3, 'Oskulačnú kružnicu elipsy vo vrchole A nájdeš ako…', ['kolmicu z rohu obdĺžnika na spojnicu AC, pretnutú s hlavnou osou', 'kružnicu so stredom v ohnisku', 'kružnicu s polomerom a', 'kolmicu na asymptotu'], 'Stred S_A je na hlavnej osi, polomer b²/a.', 'Tézy, kužeľosečky 2'],
  ['kuzelosecky', 3, 'Bod má od ohnísk 9 cm a 5 cm, 2a = 4 cm. Na ktorej kužeľosečke leží?', ['Na hyperbole', 'Na elipse', 'Na parabole', 'Na žiadnej'], '9 − 5 = 4 = 2a, rozdiel vzdialeností.', 'Kužeľosečky'],

  // ───────────── ROVNOBEŽNÉ PREMIETANIE ─────────────
  ['rovnobezne', 1, 'Akými prvkami je určené rovnobežné premietanie?', ['Priemetňou a smerom premietania', 'Stredom a priemetňou', 'Dvoma priemetňami', 'Bodom a kótou'], 'Smer s nesmie byť rovnobežný s priemetňou.', 'Tézy, RP 2'],
  ['rovnobezne', 1, 'Ktorú vlastnosť rovnobežné premietanie zachováva?', ['Rovnobežnosť priamok', 'Dĺžky úsečiek', 'Veľkosti uhlov', 'Obsahy'], 'Zachováva incidenciu, rovnobežnosť a deliaci pomer.', 'Tézy, RP 1'],
  ['rovnobezne', 1, 'Kedy sa priamka premietne do bodu?', ['Keď je rovnobežná so smerom premietania', 'Keď je rovnobežná s priemetňou', 'Keď je kolmá na stopu', 'Nikdy'], 'Je to premietacia priamka.', 'Tézy, RP 3'],
  ['rovnobezne', 1, 'Kedy sa rovina premietne do priamky?', ['Keď je rovnobežná so smerom premietania', 'Keď je rovnobežná s priemetňou', 'Vždy', 'Nikdy'], 'Premietacia rovina obsahuje smer premietania.', 'Tézy, RP 3'],
  ['rovnobezne', 1, 'Čo je stopník priamky?', ['Priesečník priamky s priemetňou', 'Priemet priamky', 'Najvyšší bod priamky', 'Stred priamky'], 'Bod, kde priamka prebodne priemetňu.', 'Tézy, RP 4'],
  ['rovnobezne', 1, 'Čo je stopa roviny?', ['Priesečnica roviny s priemetňou', 'Spádová priamka roviny', 'Priemet bodu roviny', 'Normála roviny'], 'Priamka, v ktorej rovina pretína priemetňu.', 'Tézy, RP 4'],
  ['rovnobezne', 1, 'Hlavné priamky roviny sú…', ['rovnobežné s priemetňou', 'kolmé na priemetňu', 'kolmé na stopu', 'rovnobežné so smerom premietania'], 'Sú rovnobežné so stopou roviny.', 'Tézy, RP 5'],
  ['rovnobezne', 1, 'Spádové priamky roviny sú…', ['kolmé na hlavné priamky roviny', 'rovnobežné so stopou', 'rovnobežné s priemetňou', 'totožné so stopou'], 'Ukazujú smer najväčšieho spádu.', 'Tézy, RP 5'],
  ['rovnobezne', 2, 'Môže byť v šikmom premietaní priemet úsečky dlhší ako úsečka?', ['Áno', 'Nie, nikdy', 'Len ak je úsečka zvislá', 'Len v kolmom premietaní'], 'Ako tieň pri zapadajúcom slnku. V kolmom premietaní dlhší nikdy nie je.', 'Tézy, RP 7'],
  ['rovnobezne', 2, 'Úsečka dlhá 8 cm zviera s priemetňou 60°. Dĺžka kolmého priemetu je…', ['4 cm', '8 cm', '6,9 cm', '0 cm'], '8 · cos 60° = 4 cm.', 'Tézy, RP 8'],
  ['rovnobezne', 2, 'Štvorec v rovine kolmej na priemetňu sa v kolmom premietaní premietne ako…', ['úsečka', 'štvorec', 'kosoštvorec', 'bod'], 'Celá rovina sa premietne do priamky, štvorec do úsečky (5 až 5√2 cm pri strane 5 cm).', 'Tézy, RP 9'],
  ['rovnobezne', 2, 'Kružnica v rovine šikmej k priemetni sa v kolmom premietaní premietne ako…', ['elipsa', 'kružnica', 'parabola', 'úsečka'], 'Hlavná polos ostane r, vedľajšia je r·cos φ.', 'Tézy, RP 9'],
  ['rovnobezne', 2, 'Kedy je kolmým priemetom pravého uhla pravý uhol?', ['Keď je aspoň jedno rameno rovnobežné s priemetňou (a druhé nie je na ňu kolmé)', 'Vždy', 'Nikdy', 'Keď sú obe ramená kolmé na priemetňu'], 'Veta o pravom uhle, bola na utorkovej písomke.', 'Tézy, RP 10'],
  ['rovnobezne', 3, 'Štvorec so stranou 5 cm v kolmej rovine k priemetni. Najdlhší možný priemet je…', ['5·√2 ≈ 7,1 cm', '5 cm', '10 cm', '2,5 cm'], 'Keď je uhlopriečka rovnobežná s priemetňou.', 'Tézy, RP 9'],

  // ───────────── KÓTOVANÉ PREMIETANIE ─────────────
  ['kotovane', 1, 'Čo je kóta bodu?', ['Orientovaná vzdialenosť bodu od priemetne', 'Vzdialenosť od základnice', 'Dĺžka priemetu', 'Uhol s priemetňou'], 'Nad priemetňou kladná, pod ňou záporná.', 'Tézy, KP 1'],
  ['kotovane', 1, 'Spád priamky je…', ['tg φ, kde φ je spádový uhol', 'sin φ', 'dĺžka priemetu', 'rozdiel kót'], 's = Δz / d = tg φ.', 'Tézy, KP 4'],
  ['kotovane', 1, 'Interval priamky je…', ['dĺžka priemetu úseku, na ktorom kóta stúpne o 1', 'rozdiel kót dvoch bodov', 'skutočná dĺžka úsečky', 'uhol s priemetňou'], 'i = 1 / s.', 'Tézy, KP 3'],
  ['kotovane', 1, 'Priamka má spád 1/3. Aký má interval?', ['3', '1/3', '0,3', '9'], 'i = 1 / s = 3.', 'Tézy, KP 3–4'],
  ['kotovane', 1, 'Čo je stupňovanie priamky?', ['Vyznačenie bodov s celými kótami na priemete', 'Výpočet spádového uhla', 'Sklopenie priamky', 'Hľadanie stopníka'], 'Celočíselné kóty, rovnomerne po intervaloch.', 'Tézy, KP 5'],
  ['kotovane', 2, 'Body A₁(−2,3) a B₁(6,7) sklápaš. Kam nanesieš kóty?', ['Na opačné strany priemetu, lebo majú opačné znamienka', 'Na tú istú stranu', 'Nenanášajú sa', 'Len kótu B'], 'Kde sklopená priamka pretne priemet, je stopník.', 'Tézy, KP 8'],
  ['kotovane', 2, 'Ako zistíš skutočnú dĺžku úsečky v kótovanom premietaní?', ['Sklopením: kolmice v priemetoch, nanesené kóty, spojnica', 'Odmeraním priemetu', 'Vynásobením kót', 'Zo spádového merítka'], 'Sklopená úsečka (A)(B) má skutočnú dĺžku.', 'Tézy, KP 8'],
  ['kotovane', 1, 'Spádové merítko roviny je…', ['vystupňovaný priemet spádovej priamky', 'stopa roviny', 'hlavná priamka s kótou 0', 'ľubovoľná priamka roviny'], 'Rysuje sa dvojitou čiarou, je kolmé na hlavné priamky.', 'Tézy, KP 7'],
  ['kotovane', 2, 'Ako zistíš kótu bodu M v rovine danej spádovým merítkom?', ['Bodom M₁ vedieš kolmicu na merítko a odčítaš kótu', 'Odmeriaš vzdialenosť M₁ od merítka', 'Spojíš M₁ so značkou 0', 'Kóta je vždy 0'], 'Kolmica na merítko je hlavná priamka, všetky jej body majú rovnakú kótu.', 'Tézy, KP 13, 17'],
  ['kotovane', 2, 'Priesečnicu dvoch rovín nájdeš ako spojnicu…', ['priesečníkov hlavných priamok s rovnakými kótami', 'stredov merítok', 'stopníkov', 'najvyšších bodov'], 'Dva body s rovnakou výškou v oboch rovinách.', 'Tézy, KP 14'],
  ['kotovane', 3, 'Hlavné priamky oboch rovín sú rovnobežné. Aká je priesečnica?', ['Rovnobežná s nimi, jej bod nájdeš pomocnou rovinou', 'Neexistuje', 'Kolmá na ne', 'Totožná so stopou'], 'Pomocná rovina γ pretne obe roviny, priesečník tých priesečníc leží na r.', 'Tézy, KP 14c'],
  ['kotovane', 2, 'Bodom B vedieš rovnobežku s priamkou MN. Čo musí mať rovnaké?', ['Smer priemetu, interval a smer stúpania', 'Len smer priemetu', 'Kóty bodov', 'Stopník'], 'Rovnobežné priamky majú aj rovnaký spád. Bolo na utorkovej písomke.', 'Tézy, KP 15'],
  ['kotovane', 2, 'A₁(38), B₁(45), M₁ leží v 0,4 dĺžky A₁B₁ od A₁. Kóta M je…', ['40,8', '41,5', '39,4', '42'], '38 + 0,4 · 7 = 40,8.', 'Tézy, KP 10'],
  ['kotovane', 2, 'Spádový uhol roviny je…', ['spádový uhol jej spádovej priamky', 'uhol hlavnej priamky s priemetňou', 'vždy 45°', 'uhol stopy so základnicou'], 'Hlavné priamky sú vodorovné, s priemetňou zvierajú 0°.', 'Tézy, KP 6'],

  // ───────────── KRIVKY A PLOCHY ─────────────
  ['krivky', 1, 'Dotyčnica krivky v bode T je…', ['hraničná poloha sečnice, keď sa druhý bod blíži k T', 'kolmica na krivku v T', 'ľubovoľná priamka cez T', 'spojnica T so stredom'], 'Normála je kolmica na dotyčnicu v bode dotyku.', 'Tézy, krivky 1'],
  ['krivky', 1, 'Normála krivky v bode T je…', ['kolmica na dotyčnicu v bode T', 'dotyčnica v bode T', 'os krivky', 'sečnica'], 'V rovine krivky kolmá na dotyčnicu.', 'Tézy, krivky 1'],
  ['krivky', 1, 'Zápis x² + y² − 9 = 0 je aké vyjadrenie krivky?', ['Implicitné', 'Explicitné', 'Parametrické', 'Vektorové'], 'F(x, y) = 0, všetko na jednej strane.', 'Tézy, krivky 2'],
  ['krivky', 1, 'Zápis y = x² − 1 je aké vyjadrenie krivky?', ['Explicitné', 'Implicitné', 'Parametrické', 'Polárne'], 'y = f(x).', 'Tézy, krivky 2'],
  ['krivky', 1, 'Zápis x = 2cos t, y = 2sin t je aké vyjadrenie?', ['Parametrické', 'Explicitné', 'Implicitné', 'Žiadne'], 'Súradnice závisia od parametra t.', 'Tézy, krivky 2'],
  ['krivky', 2, 'Interpolačná krivka danej množiny bodov…', ['prechádza všetkými bodmi', 'nemusí prechádzať žiadnym bodom', 'prechádza len krajnými bodmi', 'je vždy priamka'], 'Aproximačná sa k bodom len približuje.', 'Tézy, krivky 3'],
  ['krivky', 2, 'Aproximačná krivka (napr. Bézierova) danými bodmi…', ['nemusí prechádzať, body ju len riadia', 'musí prechádzať všetkými', 'prechádza len stredom', 'je vždy kružnica'], 'Body tvoria riadiaci polygón.', 'Tézy, krivky 3'],
  ['krivky', 2, 'Valcová plocha je tvorená…', ['priamkami rovnakého smeru, ktoré pretínajú riadiacu krivku', 'priamkami cez jeden bod', 'kružnicami s rovnakým stredom', 'vrstevnicami'], 'Priamky cez jeden bod by tvorili kužeľovú plochu.', 'Tézy, krivky 4'],
  ['krivky', 1, 'Ktorá krivka je priestorová?', ['Skrutkovica', 'Elipsa', 'Parabola', 'Kružnica'], 'Skrutkovica neleží v jednej rovine.', 'Tézy, krivky 1'],

  // ───────────── TOPOGRAFICKÉ PLOCHY ─────────────
  ['topo', 1, 'Vrstevnica je…', ['krivka na ploche, ktorej body majú rovnakú kótu', 'krivka najväčšieho spádu', 'priamka s konštantným spádom', 'hranica plochy'], 'Rez plochy vodorovnou rovinou.', 'Tézy, topo 2'],
  ['topo', 1, 'Spádnica topografickej plochy…', ['pretína vrstevnice kolmo', 'ide pozdĺž vrstevníc', 'pretína ich pod 45°', 'je vždy priamka'], 'Je to krivka najväčšieho spádu.', 'Tézy, topo 7'],
  ['topo', 2, 'Krivka má mať spád 2/5, vrstevnice po 1 m. Akú dĺžku zoberieš do kružidla?', ['2,5 m', '0,4 m', '2 m', '5 m'], 'Interval = 1 / s = 5/2 = 2,5 m.', 'Tézy, topo 6'],
  ['topo', 2, 'Krivka má mať spád 1/4, vrstevnice po 1 m. Do kružidla zoberieš…', ['4 m', '0,25 m', '1 m', '5 m'], 'i = 1 / s = 4 m.', 'Tézy, topo 6'],
  ['topo', 2, 'Spád plochy v bode je…', ['spád dotykovej roviny v tom bode', 'výška bodu', 'vzdialenosť k vrstevnici', 'súčet kót'], 'Rovná sa spádu spádnice v tom bode.', 'Tézy, topo 4'],
  ['topo', 2, 'Ako nájdeš priesečníky priamky s topografickou plochou?', ['Profilom: zvislý rez cez priamku a priesečníky s profilom terénu', 'Spojením vrcholov', 'Odmeraním intervalu', 'Nedajú sa nájsť'], 'Alternatívne krycou metódou cez pomocnú rovinu. Bolo na utorkovej písomke.', 'Tézy, topo 3'],
  ['topo', 2, 'Rez topografickej plochy rovinou nájdeš ako…', ['spojnicu priesečníkov vrstevníc a hlavných priamok s rovnakou kótou', 'spojnicu vrcholov', 'kolmicu na merítko', 'vrstevnicu s kótou 0'], 'Rovnaké pravidlo ako pri priesečnici rovín.', 'Tézy, topo 9'],
  ['topo', 2, 'Prienik dvoch topografických plôch nájdeš ako…', ['spojnicu priesečníkov vrstevníc s rovnakou kótou', 'spojnicu spádnic', 'priemer vrstevníc', 'najvyšší bod'], '2 s 2, 4 s 4 a tak ďalej.', 'Tézy, topo 10'],
  ['topo', 1, 'Husté vrstevnice na mape znamenajú…', ['strmý svah', 'rovinu', 'vodnú plochu', 'chybu v mape'], 'Na malú vodorovnú vzdialenosť pripadne veľa výšky.', 'Topografické plochy'],
  ['topo', 2, 'Spád oblúka krivky je…', ['rozdiel kót koncových bodov delený dĺžkou priemetu oblúka', 'dĺžka oblúka', 'uhol dotyčnice', 'súčet kót'], 's = Δz / d.', 'Tézy, topo 5'],

  // ───────────── MONGE ─────────────
  ['monge', 1, 'Mongeova projekcia je kolmé premietanie na…', ['dve navzájom kolmé priemetne', 'jednu priemetňu s kótami', 'dve rovnobežné priemetne', 'guľu'], 'Pôdorysňa π a nárysňa ν.', 'Tézy, Monge 1'],
  ['monge', 1, 'Základnica x₁,₂ je…', ['priesečnica pôdorysne a nárysne', 'spojnica pôdorysu a nárysu', 'os z', 'stopa roviny'], 'Na papieri vodorovná čiara.', 'Tézy, Monge 2'],
  ['monge', 1, 'Ordinála je…', ['spojnica pôdorysu a nárysu bodu, kolmá na základnicu', 'priesečnica priemetní', 'vodorovná čiara', 'spojnica dvoch bodov v náryse'], 'A₁ a A₂ ležia vždy na jednej ordinále.', 'Tézy, Monge 2'],
  ['monge', 1, 'Čo ukazuje vzdialenosť A₂ od základnice?', ['Výšku bodu z', 'Vzdialenosť pred nárysňou y', 'Súradnicu x', 'Nič'], 'Nárys je pohľad spredu, vidíš výšku.', 'Tézy, Monge 1'],
  ['monge', 2, 'Bokorys bodu má s nárysom rovnakú…', ['výšku z', 'súradnicu x', 'súradnicu y', 'ordinálu'], 'Bokorys a nárys ležia na vodorovnej ordinále.', 'Tézy, Monge 3'],
  ['monge', 2, 'Ako prenesieš vzdialenosť y z pôdorysu do bokorysu?', ['Štvrťkružnicou so stredom v začiatku O (alebo priamkou pod 45°)', 'Kolmicou na základnicu', 'Nanesením výšky', 'Nedá sa'], 'Otočí os y₁ do polohy y₃.', 'Tézy, Monge 3'],
  ['monge', 1, 'Aký index má bokorys?', ['3', '1', '2', '0'], 'A₁ pôdorys, A₂ nárys, A₃ bokorys.', 'Označovanie'],
  ['monge', 2, 'Neviditeľné hrany telesa v priemetoch kreslíš…', ['čiarkovane', 'plnou hrubou čiarou', 'vôbec', 'dvojitou čiarou'], 'Viditeľné plnou, neviditeľné čiarkovanou čiarou.', 'Tézy, Monge 4'],
  ['monge', 2, 'Ktoré priemety ležia na zvislej ordinále?', ['Pôdorys a nárys', 'Nárys a bokorys', 'Pôdorys a bokorys', 'Všetky tri'], 'Majú rovnaké x.', 'Tézy, Monge 4'],
];

export const DG_QUESTIONS: Question[] = rows.map(([topic, diff, q, options, explain, src], i) => ({
  id: `dg-${i}`,
  subject: 'dg',
  topic,
  diff,
  q,
  options,
  explain,
  src,
}));
