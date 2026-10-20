import type { Step } from '../steps';

// Podrobná lekcia: dve kolmé rovinné vlny (cvičenie 5, príklad 5.1)

const steps: Step[] = [
  {
    title: 'Dve vlny sa stretnú v jednom bode',
    text:
      'Máme dve totožné rovinné vlny. Prvá sa šíri v smere osi x, druhá v smere osi y. Sledujeme jednu časticu prostredia v pevnom bode P[x; y] a pýtame sa, akú krivku táto častica opisuje počas kmitania.\n\n' +
      'Pri PRIEČNYCH vlnách je výchylka kolmá na smer šírenia. Vlna idúca po osi x preto vychyľuje časticu v smere y a vlna idúca po osi y v smere x. Častica dostane dve kolmé zložky pohybu naraz.\n\n' +
      'Nezamieňaj si smer šírenia vlny so smerom pohybu častice. Vlna môže bežať doprava, hoci častica kmitá hore-dole.',
    analogy:
      'Predstav si korok na vode, na ktorý prichádzajú dve pravidelné vlny z dvoch kolmých smerov. Korok necestuje s vlnou; obe vlnenia mu iba prikazujú, kam sa má v danom okamihu vychýliť.',
    formula: {
      f: 'sᵧ = A₁·sin(ωt − kx)     sₓ = A₂·sin(ωt − ky)',
      what: 'Zložky výchylky pri dvoch kolmých priečnych vlnách',
      vars: [
        ['sₓ, sᵧ', 'okamžité zložky výchylky sledovanej častice [m]'],
        ['A₁, A₂', 'amplitúdy oboch vĺn [m]'],
        ['ω', 'uhlová frekvencia oboch vĺn [rad/s]'],
        ['k', 'vlnové číslo k = 2π/λ [rad/m]'],
        ['x, y', 'súradnice pevného bodu P, nie výchylky častice [m]'],
      ],
    },
    check: {
      q: 'Priečna vlna sa šíri v smere osi x. V akom smere môže kmitať častica v tomto príklade?',
      options: ['V smere osi y', 'Iba v smere osi x', 'Častica sa musí pohybovať spolu s vlnou', 'Častica vôbec nekmitá'],
      explain: 'Pri priečnej vlne je výchylka kolmá na smer šírenia. Vlna ide po osi x, ale jej častica kmitá v smere y.',
    },
  },
  {
    title: 'Polohu bodu premeníme na fázový rozdiel',
    text:
      'V bode P majú obe vlny rovnakú frekvenciu, ale spravidla nie rovnakú fázu. Prvá fáza obsahuje kx, druhá ky. Keď ich odčítame, časový člen ωt sa zruší a zostane iba rozdiel súradníc x − y.\n\n' +
      'Preto sa tvar trajektórie nemení s časom. Rozhoduje poloha bodu v rovine cez jedinú veličinu Δφ = k(x − y). Body s rovnakým x − y majú rovnaký typ pohybu a ležia na priamkach rovnobežných s y = x.',
    formula: {
      f: 'Δφ = (ωt − ky) − (ωt − kx) = k(x − y) = 2π·(x − y)/λ',
      what: 'Fázový rozdiel oboch zložiek pohybu',
      vars: [
        ['Δφ', 'fázový rozdiel [rad]'],
        ['x − y', 'rozdiel súradníc sledovaného bodu [m]'],
        ['λ', 'vlnová dĺžka [m]'],
      ],
    },
    worked: {
      q: 'Vlnová dĺžka je λ = 4 m a bod má x − y = 1 m. Aký je fázový rozdiel?',
      steps: [
        'Vieme: λ = 4 m, x − y = 1 m. Hľadáme Δφ.',
        'Dosadíme: Δφ = 2π·(x − y)/λ = 2π·1/4.',
        'Skrátime: Δφ = π/2 rad.',
      ],
      result: 'Zložky pohybu sú posunuté o π/2. Pri rovnakých amplitúdach bude trajektória kružnica.',
    },
    check: {
      q: 'Ak sa x − y zväčší o jednu vlnovú dĺžku λ, o koľko sa zmení Δφ?',
      options: ['O 2π, takže typ pohybu sa zopakuje', 'O π, takže sa pohyb obráti', 'O π/2', 'Nezmení sa'],
      explain: 'Δφ = 2π(x − y)/λ. Prírastok λ pridá 2π, čo je celá fáza, preto dostaneme rovnakú trajektóriu.',
    },
  },
  {
    title: 'Priamka, elipsa alebo kružnica',
    text:
      'Obe zložky majú rovnakú frekvenciu a sú na seba kolmé. Ich zloženie je preto vo všeobecnosti ELIPSA. Fázový rozdiel určuje, ako veľmi je elipsa „otvorená“ a natočená.\n\n' +
      'Ak Δφ = 0 alebo π, obe zložky dosahujú svoje extrémy naraz a trajektória spľasne na PRIAMKU. Ak Δφ = π/2 alebo 3π/2, zložky sú posunuté o štvrť periódy: vznikne elipsa s osami sₓ, sᵧ. Pri rovnakých amplitúdach A₁ = A₂ je táto elipsa KRUŽNICA.\n\n' +
      'V pokuse posúvaj polohu bodu (x − y)/λ a pomer amplitúd. Farebný bod ukazuje okamžitú výchylku častice, stopa ukazuje celú trajektóriu.',
    formula: {
      f: 'Δφ = nπ → priamka     Δφ = (2n + 1)π/2 → elipsa; ak A₁ = A₂, kružnica',
      what: 'Špeciálne tvary trajektórie',
      vars: [['n', 'ľubovoľné celé číslo 0, ±1, ±2…']],
    },
    check: {
      q: 'Zložky majú rovnaké amplitúdy a fázový rozdiel π/2. Akú krivku opisuje častica?',
      options: ['Kružnicu', 'Priamku', 'Parabolu', 'Hyperbolu'],
      explain: 'Posun π/2 dá elipsu s poloosami A₁ a A₂. Keď A₁ = A₂, obe poloosi sú rovnaké, takže ide o kružnicu.',
    },
  },
  {
    title: 'Rovnica trajektórie bez času',
    text:
      'Aby sme dokázali tvar krivky, musíme z oboch rovníc odstrániť čas t. Najprv vydelíme každú zložku jej amplitúdou: X = sₓ/A₂ a Y = sᵧ/A₁. Potom použijeme sínus súčtu a vzťah sin²u + cos²u = 1.\n\n' +
      'Výsledná rovnica už neobsahuje t, iba okamžité súradnice výchylky X, Y a stály fázový rozdiel Δφ. To je rovnica elipsy. Keď sin Δφ = 0, pravá strana zmizne a elipsa sa zmení na priamku.',
    formula: {
      f: 'X = sₓ/A₂,  Y = sᵧ/A₁     X² + Y² − 2XY·cos Δφ = sin² Δφ',
      what: 'Všeobecná rovnica trajektórie častice',
      vars: [
        ['X, Y', 'bezrozmerné výchylky vydelené vlastnými amplitúdami'],
        ['cos Δφ', 'určuje natočenie a tvar elipsy'],
        ['sin² Δφ', 'pri Δφ = nπ je nulové a vznikne priamka'],
      ],
    },
    deeper:
      'Označme u = ωt − kx. Potom Y = sin u a druhá zložka je X = sin(u + Δφ) = sin u·cos Δφ + cos u·sin Δφ.\n\n' +
      'Presunieme prvý člen: X − Y·cos Δφ = cos u·sin Δφ. Umocníme: (X − Y·cos Δφ)² = cos²u·sin²Δφ. Keďže cos²u = 1 − sin²u = 1 − Y², dostaneme (X − Y·cos Δφ)² = (1 − Y²)·sin²Δφ. Po roznásobení a použití cos²Δφ + sin²Δφ = 1 vyjde X² + Y² − 2XY·cos Δφ = sin²Δφ.',
    check: {
      q: 'Čo dostaneme z rovnice trajektórie pri Δφ = π/2?',
      options: ['X² + Y² = 1', 'X = Y', 'X² − Y² = 1', 'X + Y = 0'],
      explain: 'cos(π/2) = 0 a sin²(π/2) = 1, preto ostane X² + Y² = 1. V pôvodných mierkach je to elipsa; pri A₁ = A₂ kružnica.',
    },
  },
  {
    title: 'Kde v rovine vzniknú špeciálne trajektórie?',
    text:
      'Teraz vrátime Δφ = k(x − y) späť do podmienok. Priamkový pohyb vznikne na celej rodine rovnobežných priamok x − y = nλ/2. Medzi nimi ležia priamky, na ktorých je fázový rozdiel nepárny násobok π/2. Tam vzniká elipsa s osami v smeroch sₓ a sᵧ, pri rovnakých amplitúdach kružnica.\n\n' +
      'Keď sa v rovine posunieš tak, že x − y narastie o λ/4, prejdeš zo špeciálneho priamkového prípadu do špeciálneho eliptického alebo kruhového prípadu. Po ďalšom λ/4 si opäť na priamke, ale častica po nej kmitá s opačným sklonom.',
    formula: {
      f: 'priamka: x − y = n·λ/2     elipsa/kružnica: x − y = (2n + 1)·λ/4',
      what: 'Rodiny špeciálnych bodov v rovine xy',
      vars: [
        ['n', 'celé číslo'],
        ['λ/4', 'zmena x − y medzi susedným priamkovým a kruhovým prípadom'],
      ],
    },
    worked: {
      q: 'Bod má x − y = 3λ/4 a amplitúdy sú rovnaké. Akú trajektóriu má častica?',
      steps: [
        'Dosadíme do fázy: Δφ = 2π·(3λ/4)/λ = 3π/2.',
        'Je to nepárny násobok π/2, takže X² + Y² = 1.',
        'Amplitúdy sú rovnaké, preto elipsa má rovnaké poloosi.',
      ],
      result: 'Častica opisuje kružnicu. Opačné znamienko fázy iba obráti smer obiehania.',
    },
    check: {
      q: 'Na ktorej rodine priamok opisujú častice priamkovú trajektóriu?',
      options: ['x − y = nλ/2', 'x + y = nλ/4', 'x − y = (2n + 1)λ/4', 'x·y = nλ'],
      explain: 'Priamka vzniká pri Δφ = nπ. Z k(x − y) = nπ a k = 2π/λ dostaneme x − y = nλ/2.',
    },
  },
  {
    title: 'Priečne a pozdĺžne: čo sa zmení?',
    text:
      'Pri POZDĹŽNYCH vlnách kmitá častica v smere šírenia. Vlna idúca po osi x teda vytvára zložku sₓ a vlna idúca po osi y zložku sᵧ. Oproti priečnemu prípadu sa iba zmení, ku ktorej osi patrí ktorá amplitúda a fáza.\n\n' +
      'Podmienky pre priamku, elipsu a kružnicu ostávajú rovnaké, pretože stále skladáme dve kolmé harmonické zložky s rovnakou frekvenciou a fázovým rozdielom k(x − y). V pokuse prepni „Pozdĺžne vlny“ a porovnaj smer pohybu bodu.',
    formula: {
      f: 'pozdĺžne: sₓ = A₁·sin(ωt − kx)     sᵧ = A₂·sin(ωt − ky)',
      what: 'Zložky výchylky pri dvoch kolmých pozdĺžnych vlnách',
      vars: [
        ['sₓ', 'výchylka od vlny, ktorá sa šíri po osi x'],
        ['sᵧ', 'výchylka od vlny, ktorá sa šíri po osi y'],
      ],
    },
    check: {
      q: 'Čo sa pri prepnutí z priečnych na pozdĺžne vlny v tomto príklade nezmení?',
      options: ['Podmienky Δφ pre priamku, elipsu a kružnicu', 'Smer výchylky každej jednotlivej vlny', 'Priradenie amplitúd k osiam', 'Rovnica každej zložky bez zmeny'],
      explain: 'Zmení sa smer výchylky jednotlivých vĺn, ale stále ide o dve kolmé harmonické zložky s rovnakým Δφ = k(x − y), preto podmienky tvarov ostanú.',
    },
  },
  {
    title: 'Zhrnutie príkladu 5.1',
    text:
      'Postup je vždy rovnaký: napíš obe zložky výchylky, vypočítaj ich fázový rozdiel, odstráň z rovníc čas a podľa Δφ urči tvar trajektórie. Najväčšia pasca je zameniť súradnice bodu x, y za výchylky sₓ, sᵧ.',
    bullets: [
      'Dve kolmé rovinné vlny dajú častici dve kolmé harmonické zložky pohybu.',
      'Fázový rozdiel v bode P je Δφ = k(x − y) = 2π(x − y)/λ.',
      'Všeobecne vzniká elipsa.',
      'Δφ = nπ, teda x − y = nλ/2 → priamková trajektória.',
      'Δφ = (2n + 1)π/2, teda x − y = (2n + 1)λ/4 → elipsa s osami sₓ, sᵧ.',
      'Ak sú v poslednom prípade amplitúdy rovnaké, elipsa je kružnica.',
      'Priečne a pozdĺžne vlny majú inak priradené smery výchyliek, podmienky tvarov sú rovnaké.',
    ],
    check: {
      q: 'Bod má x − y = λ/2. Akú trajektóriu opisuje bez ohľadu na pomer amplitúd?',
      options: ['Priamku', 'Kružnicu', 'Elipsu s osami sₓ, sᵧ', 'Parabolu'],
      explain: 'Δφ = 2π·(λ/2)/λ = π. Zložky sú v protifáze a elipsa sa zrúti na priamku.',
    },
  },
];

export default steps;
