// Tézy na 1. písomku z Metód zobrazovania (deskriptívy), presne podľa dokumentu od učiteľky:
// ZS_2026-27/Metody_zobrazovania/Skuska/1T_-_Okruh_otazok.pdf. Čísla otázok sú ako v dokumente.
// a = vzorová odpoveď (riadky oddelené \n), pic = statický obrázok, rys = rysovačka krok po kroku
// (id z learn/widgets/dgGeo.ts).

export type Teza = {
  id: string;
  sec: string;
  n: string;
  q: string;
  a: string;
  /** rysovacia úloha (pri skúšaní: „narysuj“ namiesto „povedz“) */
  draw?: boolean;
  pic?: string;
  rys?: string;
};

export const TEZY_SECTIONS = ['Kužeľosečky', 'Rovnobežné premietanie', 'Kótované premietanie', 'Krivky a plochy', 'Topografické plochy', 'Mongeova projekcia'];

const K = 'Kužeľosečky', R = 'Rovnobežné premietanie', KP = 'Kótované premietanie', KR = 'Krivky a plochy', T = 'Topografické plochy', M = 'Mongeova projekcia';

export const TEZY: Teza[] = [
  // ───── KUŽEĽOSEČKY ─────
  {
    id: 'k1', sec: K, n: '1', draw: true, rys: 'dg-elipsa',
    q: 'Definujte elipsu, zostrojte 4 ľubovoľné body elipsy, ak sú dané F₁, F₂ a dĺžka 2a.',
    a: 'Elipsa je množina všetkých bodov roviny, ktoré majú od dvoch pevných bodov F₁, F₂ (ohnísk) stály súčet vzdialeností 2a, pričom 2a > |F₁F₂|.\nPostup: stred S úsečky F₁F₂, od S nanes a → vrcholy A, B. Zvoľ R medzi ohniskami, r₁ = |AR|, r₂ = |BR|. Oblúky k(F₁, r₁) a k(F₂, r₂) dajú 2 body, po výmene polomerov ďalšie 2.',
  },
  {
    id: 'k2', sec: K, n: '2', draw: true, rys: 'dg-elipsa-osk',
    q: 'Zostrojte oskulačné kružnice elipsy, ak je dané AB, CD.',
    a: 'Doplň obdĺžnik: roh K nad vrcholom A vo výške C. Spoj A s C. Z bodu K spusti kolmicu na AC: na hlavnej osi pretne stred S_A, na vedľajšej osi stred S_C. Kružnica (S_A, |S_A A|) a (S_C, |S_C C|). Súmerne pre B a D.\nPolomery vyjdú b²/a pri A, B a a²/b pri C, D.',
  },
  {
    id: 'k3', sec: K, n: '3', draw: true, rys: 'dg-hyp',
    q: 'Definujte hyperbolu, zostrojte 4 ľubovoľné body hyperboly, ak sú dané F₁, F₂ a dĺžka 2a.',
    a: 'Hyperbola je množina všetkých bodov roviny, ktoré majú od dvoch pevných bodov F₁, F₂ stály rozdiel vzdialeností (v absolútnej hodnote) 2a, pričom 0 < 2a < |F₁F₂|.\nPostup: S, vrcholy A, B (|SA| = a). Bod R zvoľ na osi mimo úsečky F₁F₂, r₁ = |AR|, r₂ = |BR|. Oblúky k(F₁, r₁), k(F₂, r₂), potom vymeň polomery.',
  },
  {
    id: 'k4', sec: K, n: '4', draw: true, rys: 'dg-hyp-as',
    q: 'Zostrojte vrcholy, asymptoty a oskulačné kružnice hyperboly, ak je dané F₁, F₂ a dĺžka 2a.',
    a: 'Vrcholy: od stredu S nanes a. Kružnica so stredom S cez ohniská (polomer e), vo vrcholoch kolmice na os → obdĺžnik. Asymptoty sú jeho uhlopriečky.\nOskulačná kružnica vo vrchole B: v bode P (kolmica vo vrchole ∩ asymptota) postav kolmicu na asymptotu, pretne os v strede S_B. Polomer b²/a. Súmerne pre A.',
  },
  {
    id: 'k5', sec: K, n: '5', draw: true, rys: 'dg-par',
    q: 'Definujte parabolu, zostrojte 4 ľubovoľné body paraboly, vrchol a oskulačnú kružnicu, ak sú dané F a d.',
    a: 'Parabola je množina všetkých bodov roviny, ktoré majú rovnakú vzdialenosť od pevného bodu F (ohnisko) a pevnej priamky d (riadiaca priamka), F ∉ d.\nOs o ide cez F kolmo na d, päta D. Vrchol V je stred FD, parameter p = |FD|. Body: rovnobežka s d vo vzdialenosti r a oblúk k(F, r) → 2 body, zopakuj s iným r. Oskulačná kružnica vo vrchole: stred na osi vo vzdialenosti p od V, polomer p.',
  },

  // ───── ROVNOBEŽNÉ PREMIETANIE ─────
  {
    id: 'r1', sec: R, n: '1', pic: 'dg-rpkeep',
    q: 'Definujte rovnobežné premietanie. Napíšte a načrtnite, čo zachováva rovnobežné premietanie.',
    a: 'Je daná priemetňa π a smer premietania s, ktorý nie je rovnobežný s π. Rovnobežný priemet bodu A je priesečník A′ priamky vedenej bodom A rovnobežne so smerom s s priemetňou π.\nZachováva: incidenciu, rovnobežnosť (ak priamky nie sú premietacie) a deliaci pomer (stred úsečky → stred priemetu). Útvar v rovine rovnobežnej s π sa premietne v skutočnej veľkosti.',
  },
  {
    id: 'r2', sec: R, n: '2', pic: 'dg-rpdef',
    q: 'Akými prvkami je určené rovnobežné premietanie? Ako zostrojíte obraz bodu? Načrtnite obrázok.',
    a: 'Priemetňou π a smerom premietania s.\nObraz bodu A: bodom A vedieme premietaciu priamku rovnobežnú so smerom s, jej priesečník s π je A′.',
  },
  {
    id: 'r3', sec: R, n: '3', pic: 'dg-rpline',
    q: 'Čo môže byť rovnobežným priemetom a) priamky, b) roviny? Načrtnite obrázky.',
    a: 'a) Priamky: priamka, alebo bod (ak je priamka rovnobežná so smerom premietania, teda premietacia).\nb) Roviny: celá priemetňa, alebo priamka (ak je rovina rovnobežná so smerom premietania, teda premietacia).',
  },
  {
    id: 'r3b', sec: R, n: '3 (2. otázka)', pic: 'dg-rpkeep',
    q: 'Napíšte 3 najdôležitejšie vlastnosti, ktoré zachováva rovnobežné premietanie. Načrtnite obrázky v priestore.',
    a: '1. Incidencia: ak bod leží na priamke, jeho priemet leží na priemete priamky.\n2. Rovnobežnosť: rovnobežné priamky majú rovnobežné priemety (alebo totožné).\n3. Deliaci pomer: pomer, v ktorom bod delí úsečku, sa zachová (stred → stred).',
  },
  {
    id: 'r4', sec: R, n: '4', pic: 'dg-stopa',
    q: 'Čo je to stopník priamky a stopa roviny? Načrtnite obrázky.',
    a: 'Stopník priamky je priesečník priamky s priemetňou.\nStopa roviny je priesečnica roviny s priemetňou (značí sa p s indexom roviny, napr. p₁ pre rovinu α).',
  },
  {
    id: 'r5', sec: R, n: '5', pic: 'dg-hlavne',
    q: 'Čo sú hlavné a spádové priamky roviny? Načrtnite obrázky.',
    a: 'Hlavné priamky roviny sú priamky roviny rovnobežné s priemetňou (sú rovnobežné so stopou roviny).\nSpádové priamky roviny sú priamky roviny kolmé na hlavné priamky (smer najväčšieho spádu).',
  },
  {
    id: 'r7', sec: R, n: '7',
    q: 'Do akého útvaru sa premieta úsečka v šikmom rovnobežnom premietaní? Uveďte všetky možnosti.',
    a: 'Do úsečky rovnako dlhej (napr. ak je rovnobežná s π), kratšej, alebo dlhšej ako pôvodná úsečka.\nDo bodu, ak je úsečka rovnobežná so smerom premietania.',
  },
  {
    id: 'r8', sec: R, n: '8', pic: 'dg-seg',
    q: 'Do akého útvaru sa premieta úsečka v kolmom premietaní? Uveďte všetky možnosti. Napíšte vzorec medzi dĺžkou úsečky a dĺžkou jej kolmého priemetu.',
    a: 'Úsečka rovnobežná s π: úsečka rovnakej dĺžky. Všeobecná poloha: kratšia úsečka. Úsečka kolmá na π: bod. (Dlhšia nikdy.)\n|A₁B₁| = |AB| · cos φ, kde φ je uhol úsečky s priemetňou.',
  },
  {
    id: 'r9a', sec: R, n: '9',
    q: 'Do akého útvaru sa premieta štvorec s dĺžkou strany 5 cm v kolmom premietaní? Uveďte všetky možnosti.',
    a: 'Rovina štvorca ∥ π: štvorec so stranou 5 cm.\nRovina štvorca ⟂ π: úsečka dĺžky od 5 cm do 5√2 ≈ 7,07 cm.\nVšeobecná poloha: rovnobežník (špeciálne obdĺžnik, ak je jedna strana ∥ π, alebo kosoštvorec, ak je uhlopriečka ∥ π).',
  },
  {
    id: 'r9b', sec: R, n: '9 (2. otázka)', pic: 'dg-kruh',
    q: 'Do akého útvaru sa premieta kružnica s polomerom 5 cm v kolmom premietaní? Uveďte všetky možnosti.',
    a: 'Rovina kružnice ∥ π: kružnica s polomerom 5 cm.\nRovina kružnice ⟂ π: úsečka dĺžky 10 cm.\nVšeobecná poloha: elipsa s hlavnou polosou a = 5 cm a vedľajšou b = 5 · cos φ.',
  },
  {
    id: 'r10', sec: R, n: '10',
    q: 'Napíšte, čo platí o kolmom priemete pravého uhla.',
    a: 'Kolmým priemetom pravého uhla je pravý uhol práve vtedy, keď aspoň jedno jeho rameno je rovnobežné s priemetňou a druhé nie je na priemetňu kolmé.',
  },

  // ───── KÓTOVANÉ PREMIETANIE ─────
  {
    id: 'kp1', sec: KP, n: '1', pic: 'dg-kota',
    q: 'Napíšte definíciu kótovaného premietania. Čo je kóta bodu? Načrtnite obrázok.',
    a: 'Kótované premietanie je kolmé premietanie na jednu (vodorovnú) priemetňu π, v ktorom ku kolmému priemetu bodu pripíšeme jeho kótu. Zápis A₁(z).\nKóta bodu je orientovaná vzdialenosť bodu od priemetne: nad π kladná, pod π záporná, v π nula.',
  },
  {
    id: 'kp2', sec: KP, n: '2', pic: 'dg-kpriamka',
    q: 'Čo je to spádový uhol priamky? Načrtnite priestorový obrázok.',
    a: 'Spádový uhol φ priamky je uhol, ktorý priamka zviera s priemetňou, teda uhol priamky s jej kolmým priemetom. 0° ≤ φ ≤ 90°.',
  },
  {
    id: 'kp3', sec: KP, n: '3', pic: 'dg-kpriamka',
    q: 'Čo je to interval priamky? Načrtnite priestorový obrázok.',
    a: 'Interval i priamky je dĺžka kolmého priemetu úsečky na priamke, ktorej koncové body majú rozdiel kót 1 (jednotka). Platí i = 1 / s.',
  },
  {
    id: 'kp4', sec: KP, n: '4',
    q: 'Čo je to spád priamky?',
    a: 'Spád priamky s = tg φ = rozdiel kót dvoch bodov / dĺžka priemetu úsečky medzi nimi. Platí s = 1 / i.',
  },
  {
    id: 'kp5', sec: KP, n: '5',
    q: 'Čo je to stupňovanie priamky?',
    a: 'Stupňovanie priamky je určenie priemetov bodov priamky, ktoré majú celočíselné kóty. Susedné body sú od seba vzdialené o interval.',
  },
  {
    id: 'kp6', sec: KP, n: '6', pic: 'dg-spadrov',
    q: 'Čo je to spádový uhol roviny? Načrtnite priestorový obrázok.',
    a: 'Spádový uhol roviny je uhol, ktorý rovina zviera s priemetňou. Rovná sa spádovému uhlu spádovej priamky roviny.',
  },
  {
    id: 'kp7', sec: KP, n: '7',
    q: 'Čo je to spád roviny, interval roviny, spádové merítko roviny?',
    a: 'Spád roviny je spád jej spádovej priamky (s = tg φ).\nInterval roviny je interval jej spádovej priamky, teda vzdialenosť priemetov susedných hlavných priamok s celočíselnými kótami.\nSpádové merítko roviny je vystupňovaný kolmý priemet spádovej priamky roviny. Kreslí sa dvojitou čiarou.',
  },
  {
    id: 'kp8', sec: KP, n: '8', draw: true, rys: 'dg-k1',
    q: 'Zostrojte dĺžku úsečky AB (graficky), stopník priamky m = AB, vystupňujte priamku m = AB.',
    a: 'Sklopenie: v A₁ a B₁ kolmice na A₁B₁, nanes kóty (opačné znamienka na opačné strany) → (A), (B). |(A)(B)| je skutočná dĺžka. Priesečník (A)(B) s A₁B₁ je stopník P (kóta 0).\nStupňovanie (kóty 96 a 89): z B₁ pomocný lúč so 7 rovnakými dielikmi, posledný spoj s A₁, rovnobežky dajú kóty 90 až 95.',
  },
  {
    id: 'kp9', sec: KP, n: '9', draw: true, rys: 'dg-k1',
    q: 'Určte (graficky) spádový uhol, spád a interval priamky m = AB.',
    a: 'Po sklopení je spádový uhol φ uhol medzi priemetom A₁B₁ a sklopenou priamkou (A)(B).\nSpád s = tg φ = rozdiel kót / |A₁B₁|. Interval i = 1 / s, je to vzdialenosť priemetov bodov s kótami líšiacimi sa o 1.',
  },
  {
    id: 'kp10', sec: KP, n: '10', draw: true, rys: 'dg-k3',
    q: 'Určte (graficky) kótu bodu M, ktorý leží na priamke m = AB (A₁(38), B₁(45)).',
    a: 'Nižší bod A ber ako nulu. V B₁ kolmica, nanes 45 − 38 = 7 j → (B). Spoj A₁ s (B). V M₁ kolmica po sklopenú priamku, jej dĺžka d. Kóta M = 38 + d.',
  },
  {
    id: 'kp11', sec: KP, n: '11', draw: true, rys: 'dg-k4',
    q: 'Zostrojte spádové merítko roviny α (a = ABC, b = A + hlavná priamka, c = dve hlavné priamky).',
    a: 'a) Na úsečke medzi bodmi s najnižšou a najvyššou kótou nájdi bod s kótou tretieho bodu. Spojnica je hlavná priamka. Merítko je na ňu kolmé, kóty prenes hlavnými priamkami a dostupňuj.\nb) Z A₁ kolmica na h₁: päta má kótu h, A svoju, úsek rozdeľ.\nc) Kolmica na hlavné priamky, úsek medzi nimi rozdeľ podľa rozdielu kót.',
  },
  {
    id: 'kp12', sec: KP, n: '12', draw: true, rys: 'dg-k6',
    q: 'Určte (graficky) spádový uhol, spád a interval roviny α.',
    a: 'Sklop spádovú priamku: na merítku v jednej značke kolmo nanes rozdiel kót k druhej značke a spoj. Uhol pri druhej značke je φ.\nInterval roviny = vzdialenosť susedných značiek merítka, spád s = 1 / i = tg φ.',
  },
  {
    id: 'kp13', sec: KP, n: '13', draw: true, rys: 'dg-k5',
    q: 'Určte (graficky) kótu bodu M, ktorý leží v rovine α.',
    a: 'Bodom M₁ veď hlavnú priamku roviny (kolmicu na spádové merítko, resp. rovnobežku s danými hlavnými priamkami). Kótu prečítaj na merítku, prípadne interpoluj medzi hlavnými priamkami.',
  },
  {
    id: 'kp14', sec: KP, n: '14', draw: true, rys: 'dg-k7',
    q: 'Zostrojte priesečnicu rovín α a β.',
    a: 'Nájdi dve dvojice hlavných priamok s rovnakými kótami (napr. kóty 12 a 15 v oboch rovinách). Ich priesečníky ležia v oboch rovinách, spojnica je priesečnica r.\nAk sú hlavné priamky oboch rovín rovnobežné, priesečnica je s nimi rovnobežná. Jeden jej bod nájdeš pomocnou rovinou.',
  },
  {
    id: 'kp15', sec: KP, n: '15', draw: true, pic: 'dg-rovnpriamka',
    q: 'Zostrojte bodom B priamku b rovnobežnú s danou priamkou a (M, N).',
    a: 'b₁ ∥ a₁ cez B₁. Rovnobežné priamky majú rovnaký interval a stúpajú tým istým smerom: dĺžku M₁N₁ (rozdiel kót 45 − 38 = 7) nanes od B₁ v smere stúpania, koncový bod má kótu 5 + 7 = 12.',
  },
  {
    id: 'kp16', sec: KP, n: '16', draw: true, pic: 'dg-rovnrovina',
    q: 'Rovina α je daná dvomi hlavnými priamkami a bod B, ktorý v nej neleží. Zostrojte bodom B rovinu β rovnobežnú s α.',
    a: 'Rovnobežné roviny majú rovnobežné hlavné priamky, rovnaký interval a stúpajú na tú istú stranu. Bodom B₁ veď hlavnú priamku h(5) rovnobežne s hlavnými priamkami roviny α. Vzdialenosť hlavných priamok 13 a 16 nanes kolmo v smere stúpania, dostaneš h(8).',
  },
  {
    id: 'kp17', sec: KP, n: '17', draw: true, rys: 'dg-k5',
    q: 'Určte graficky kótu bodu A ležiaceho v rovine α danej spádovým merítkom.',
    a: 'Z A₁ kolmica na spádové merítko (hlavná priamka). Kde ho pretne, tam prečítaš kótu.',
  },
  {
    id: 'kp18', sec: KP, n: '18', draw: true, rys: 'dg-k4',
    q: 'Určte graficky kótu bodu A ležiaceho v rovine α (K, L, M).',
    a: 'Najprv zostroj spádové merítko roviny KLM (bod s rovnakou kótou na úsečke, hlavná priamka, kolmica). Potom z A₁ kolmica na merítko a prečítaj kótu.',
  },

  // ───── KRIVKY A PLOCHY ─────
  {
    id: 'c1', sec: KR, n: '1', pic: 'dg-dot',
    q: 'Definujte krivku, aké krivky poznáte, čo je dotyčnica krivky, normála krivky?',
    a: 'Krivka je množina bodov, ktorú opíše pohybujúci sa bod (jednoparametrická množina bodov). Rovinné: kružnica, elipsa, parabola, hyperbola, sínusoida. Priestorové: napr. skrutkovica.\nDotyčnica v bode T je hraničná poloha sečnice TX, keď sa X blíži k T. Normála je kolmica na dotyčnicu v bode dotyku.',
  },
  {
    id: 'c2', sec: KR, n: '2',
    q: 'Napíšte, aké analytické vyjadrenia rovinnej krivky poznáme.',
    a: 'Explicitné: y = f(x).\nImplicitné: F(x, y) = 0.\nParametrické: x = x(t), y = y(t), t ∈ I.\nPríklad kružnice: y = √(r² − x²), x² + y² − r² = 0, x = r·cos t, y = r·sin t.',
  },
  {
    id: 'c3', sec: KR, n: '3', pic: 'dg-interp',
    q: 'Aký je rozdiel medzi interpolačnou a aproximačnou krivkou danou množinou bodov? Popíšte a načrtnite.',
    a: 'Interpolačná krivka prechádza všetkými danými bodmi.\nAproximačná krivka nimi prechádzať nemusí, body ju len riadia a krivka sa k nim približuje (napr. Bézierova krivka).',
  },
  {
    id: 'c4', sec: KR, n: '4', pic: 'dg-valec',
    q: 'Definujte valcovú plochu.',
    a: 'Valcová plocha je množina všetkých priamok (površiek) rovnobežných s daným smerom s, ktoré pretínajú danú riadiacu krivku k. Smer s neleží v rovine krivky k.',
  },

  // ───── TOPOGRAFICKÉ PLOCHY ─────
  {
    id: 't1', sec: T, n: '1', pic: 'dg-vrstevnice',
    q: 'Definujte topografickú plochu.',
    a: 'Topografická plocha je časť zemského povrchu (terén), ktorá je oproti Zemi taká malá, že jej zakrivenie zanedbáme. Nedá sa presne vyjadriť rovnicou, zobrazujeme ju v kótovanom premietaní systémom vrstevníc.',
  },
  {
    id: 't2', sec: T, n: '2', pic: 'dg-vrstevnice',
    q: 'Definujte vrstevnicu, systém vrstevníc a topografickú plochu.',
    a: 'Vrstevnica je krivka na ploche, ktorej všetky body majú rovnakú kótu (rez plochy vodorovnou rovinou).\nSystém vrstevníc sú vrstevnice v rovinách s rovnakým výškovým rozdielom (ekvidištanciou).\nTopografická plocha: pozri otázku 1.',
  },
  {
    id: 't3', sec: T, n: '3', draw: true, rys: 'dg-t1',
    q: 'Zostrojte priesečníky priamky s topografickou plochou danou vrstevnicovým plánom, mierka je daná graficky.',
    a: 'Priamkou prelož zvislú rovinu a nakresli profil: v priesečníkoch priemetu priamky s vrstevnicami vynes kolmo výšky (v mierke) a spoj. Do profilu nakresli aj priamku (z kót A, B). Priesečníky priamky s profilom vráť kolmo späť na priemet priamky.',
  },
  {
    id: 't4', sec: T, n: '4', draw: true, rys: 'dg-t2',
    q: 'Definujte spád plochy v bode a zostrojte spádový uhol topografickej plochy v bode M.',
    a: 'Spád plochy v bode je spád dotykovej roviny plochy v tomto bode (rovná sa spádu spádnice).\nKonštrukcia: z M₁ najkratšia spojnica k susednej vrstevnici (kolmo na vrstevnice), v M₁ kolmo nanes výškový rozdiel (ekvidištanciu) v mierke, spoj. Uhol pri dolnom bode je φ.',
  },
  {
    id: 't5', sec: T, n: '5',
    q: 'Definujte spád krivky v bode a spád oblúka krivky.',
    a: 'Spád krivky v bode je spád dotyčnice krivky v tomto bode.\nSpád oblúka krivky je podiel rozdielu kót koncových bodov oblúka a dĺžky priemetu oblúka: s = Δz / d.',
  },
  {
    id: 't6', sec: T, n: '6', draw: true, rys: 'dg-t3',
    q: 'Zostrojte na topografickej ploche krivku s konštantným spádom s = 2/5 prechádzajúcu bodom A.',
    a: 'Interval i = 1 / s = 5/2 = 2,5 m (pri ekvidištancii 1 m). Kružidlom s polomerom 2,5 m (podľa mierky) z A₁ pretni susednú vrstevnicu, z nového bodu ďalšiu atď. Body spoj. Obvykle sú dve riešenia.',
  },
  {
    id: 't7', sec: T, n: '7', draw: true, rys: 'dg-t4',
    q: 'Definujte a zostrojte spádnicu na topografickej ploche prechádzajúcu bodom A.',
    a: 'Spádnica je krivka na ploche, ktorá má v každom bode najväčší spád. Jej priemet pretína vrstevnice kolmo.\nZ A₁ najkratšia spojnica k susednej vrstevnici (kružnica, ktorá sa jej dotkne), z bodu dotyku ďalej, body spoj plynulou krivkou.',
  },
  {
    id: 't8', sec: T, n: '8', draw: true,
    q: 'Zostrojte valcový profil topografickej plochy daný vrstevnicovým plánom pozdĺž krivky l.',
    a: 'Krivku l₁ „narovnaj“: úseky medzi jej priesečníkmi s vrstevnicami nanášaj za sebou na priamku. V každom bode vynes kolmo kótu príslušnej vrstevnice (v mierke). Body spoj plynulou čiarou.',
  },
  {
    id: 't9', sec: T, n: '9', draw: true, rys: 'dg-t5',
    q: 'Zostrojte rez topografickej plochy rovinou α danou spádovou priamkou (merítkom).',
    a: 'V značkách spádového merítka narysuj hlavné priamky roviny (kolmice na merítko). Každá pretne vrstevnicu s rovnakou kótou v bode rezu. Body spoj.',
  },
  {
    id: 't10', sec: T, n: '10', draw: true,
    q: 'Zostrojte prienik dvoch topografických plôch daných vrstevnicovými plánmi.',
    a: 'Nájdi priesečníky vrstevníc s rovnakou kótou z oboch plôch (2 s 2, 4 s 4 …). Spoj ich krivkou.',
  },

  // ───── MONGE ─────
  {
    id: 'm1', sec: M, n: '1', pic: 'dg-monge3d',
    q: 'Napíšte definíciu Mongeovej projekcie. Načrtnite obrázok, ako sa zobrazí bod.',
    a: 'Mongeova projekcia je kolmé premietanie na dve navzájom kolmé priemetne: pôdorysňu π (vodorovná) a nárysňu ν (zvislá). Bod A má pôdorys A₁ a nárys A₂. Nárysňu sklopíme do pôdorysne okolo základnice x₁,₂, A₁ a A₂ ležia na jednej ordinále.',
  },
  {
    id: 'm2', sec: M, n: '2', pic: 'dg-monge2d',
    q: 'Vysvetlite pojmy základnica a ordinála v Mongeovej projekcii.',
    a: 'Základnica x₁,₂ je priesečnica pôdorysne a nárysne.\nOrdinála je spojnica pôdorysu a nárysu toho istého bodu, je kolmá na základnicu.',
  },
  {
    id: 'm3', sec: M, n: '3', draw: true, rys: 'dg-m',
    q: 'Zostrojte bokorys útvarov, ak je daný ich pôdorys a nárys.',
    a: 'Pre každý bod: z nárysu A₂ vodorovná ordinála (rovnaká výška). Vzdialenosť pôdorysu A₁ od základnice prenes štvrťkružnicou so stredom O z osi y₁ na os y₃. Odtiaľ zvislo hore → A₃. Body spoj v rovnakom poradí.',
  },
  {
    id: 'm4', sec: M, n: '4', draw: true, rys: 'dg-b',
    q: 'Zobrazte pôdorys, nárys, bokorys daného telesa v združenej polohe, doplňte priemety bodu ležiaceho na telese.',
    a: 'Nárys (spredu) a pôdorys (zhora) pod sebou na zvislých ordinálach, nárys a bokorys (zboku) vedľa seba v rovnakej výške. Viditeľné hrany plnou čiarou, neviditeľné čiarkovane. Bod na telese: jeho priemety ležia na priemetoch steny, na ktorej leží, a spĺňajú ordinály.',
  },
];
