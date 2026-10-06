// Učebňa: stručné vysvetlenia tém. Fyzika podľa prednášky OsnovaSodpovedamiV3 a cvičení,
// Matematika podľa tematického plánu prednášok.

export type Lesson = {
  /** úvodná veta: o čom téma je */
  intro: string;
  /** hlavné myšlienky */
  points: string[];
  /** vzorce: [vzorec, čo znamená] */
  formulas: [string, string][];
  /** typické chyby a triky */
  tips: string[];
  /** riešený príklad */
  example?: { q: string; a: string };
};

export const LESSONS: Record<string, Lesson> = {
  // ───────────── FYZIKA ─────────────
  'fyz:kmity': {
    intro: 'Kmitanie je pohyb, ktorý sa opakuje. Harmonické kmitanie opisuje sínus a je základ celej Fyziky 1.',
    points: [
      'Perióda T je čas jedného kmitu, frekvencia f je počet kmitov za sekundu.',
      'Obnovovacia sila ťahá teleso späť do rovnovážnej polohy a má opačný smer ako výchylka.',
      'y = A·sin(ωt + φ₀): A je amplitúda (vždy kladná), ω uhlová frekvencia, φ₀ počiatočná fáza.',
      'Predstav si bod obiehajúci po kružnici s polomerom A. Jeho tieň na osi kmitá harmonicky.',
      'V rovnovážnej polohe je rýchlosť najväčšia a zrýchlenie nulové. V krajnej polohe je to naopak.',
      'Energia sa prelieva medzi kinetickou a potenciálnou, ich súčet ½kA² sa nemení.',
    ],
    formulas: [
      ['f = 1/T', 'frekvencia z periódy [Hz]'],
      ['ω = 2π·f = 2π/T', 'uhlová frekvencia [rad/s]'],
      ['v = A·ω·cos(ωt + φ₀)', 'rýchlosť, v_max = A·ω'],
      ['a = −A·ω²·sin(ωt + φ₀) = −ω²·y', 'zrýchlenie, a_max = A·ω²'],
      ['F = −k·y', 'sila pružiny'],
      ['ω = √(k/m),  T = 2π·√(m/k)', 'pružinový oscilátor'],
      ['E = ½kA² = ½mv² + ½ky²', 'zákon zachovania energie'],
      ['1/k = 1/k₁ + 1/k₂  |  k = k₁ + k₂', 'pružiny za sebou | vedľa seba'],
    ],
    tips: [
      'ω nie je f. Pri f = 2 Hz je ω = 4π rad/s.',
      'Kalkulačka musí byť v radiánoch (RAD).',
      'Prevádzaj jednotky: cm → m, g → kg, min → s.',
      'Maximálna záporná výchylka −8 cm znamená A = 8 cm.',
    ],
    example: {
      q: 'Závažie 0,1 kg na pružine 10 N/m. Aká je perióda?',
      a: 'T = 2π·√(m/k) = 2π·√(0,1/10) = 2π·0,1 ≈ 0,63 s.',
    },
  },
  'fyz:skladanie': {
    intro: 'Keď na teleso pôsobia dve kmitania naraz, ich výchylky sa sčítajú. Výsledok závisí od frekvencií a fáz.',
    points: [
      'Rovnaké frekvencie v jednom smere dajú opäť harmonické kmitanie.',
      'Synfázne kmity (rovnaká fáza) sa zosilnia, protifázne (fázy sa líšia o π) sa zoslabia.',
      'Blízke, ale nie rovnaké frekvencie dajú rázy: amplitúda pomaly „dýcha“.',
      'Kolmé kmity s rovnakou frekvenciou dajú elipsu. Pri fáze 0 alebo π je to úsečka, pri π/2 a rovnakých amplitúdach kružnica.',
      'Frekvencie v pomere prirodzených čísel (2:1, 3:1…) dajú Lissajousove krivky.',
      'Pohyb je periodický, len keď je pomer periód Tₓ/T_y racionálne číslo.',
    ],
    formulas: [
      ['A = A₁ + A₂', 'synfázne kmity'],
      ['A = |A₁ − A₂|', 'protifázne kmity'],
      ['f_r = |f₂ − f₁|,  T_r = 1/|f₂ − f₁|', 'rázy'],
      ['a·sin ωt + b·cos ωt → A = √(a² + b²), tg φ₀ = b/a', 'zlúčenie sínusu a kosínusu'],
    ],
    tips: ['Tóny 300 Hz a 302 Hz spolu znejú so zosilňovaním 2× za sekundu.', 'cos x = sin(x + π/2), takže sínus a kosínus sa líšia len fázou.'],
    example: { q: 'Je x = 3 sin ωt + 4 cos ωt harmonické?', a: 'Áno, A = √(9 + 16) = 5 a tg φ₀ = 4/3, teda φ₀ ≈ 0,93 rad.' },
  },
  'fyz:vlny': {
    intro: 'Vlnenie je kmitanie, ktoré sa šíri prostredím. Prenáša energiu, ale nie hmotu.',
    points: [
      'Priečna vlna: častice kmitajú kolmo na smer šírenia. Pozdĺžna: pozdĺž smeru šírenia.',
      'Postupná vlna prenáša energiu, stojatá má nulovú rýchlosť šírenia a energiu neprenáša.',
      'Pri prechode do iného prostredia sa frekvencia nemení. Mení sa rýchlosť a vlnová dĺžka.',
      'Vlnoplocha spája body s rovnakou fázou, lúč je na ňu kolmý, čelo vlny je prvá vlnoplocha.',
      'Intenzita sférickej vlny klesá s 1/r², amplitúda s 1/r. Rovinná vlna má intenzitu konštantnú.',
      'Stojatá vlna vzniká z dvoch rovnakých protibežných vĺn. Má uzly (nekmitajú) a kmitne.',
      'Koherentné vlny majú rovnakú frekvenciu a ich skladanie sa volá interferencia.',
    ],
    formulas: [
      ['s(x, t) = A·sin(ωt − kx)', 'postupná vlna'],
      ['c = ω/k', 'fázová rýchlosť'],
      ['λ = 2π/k = c·T = c/f', 'vlnová dĺžka'],
      ['c = √(F/ϱ_L)', 'priečne vlny v strune'],
      ['c = √(κRT/M)', 'zvuk v plyne'],
      ['I = P/(4πr²)', 'intenzita sférickej vlny [W/m²]'],
      ['s = 2A·sin(ωt)·cos(kx)', 'stojatá vlna, uzly sú λ/2 od seba'],
    ],
    tips: ['Uzol a susedná kmitňa sú od seba λ/4.', 'Fázový rozdiel dvoch bodov: Δφ = 2π·Δx/λ.'],
    example: { q: 'Body 12 m a 16 m od zdroja, T = 0,04 s, c = 300 m/s. Fázový rozdiel?', a: 'λ = c·T = 12 m, Δφ = 2π·4/12 = 2π/3.' },
  },
  'fyz:doppler': {
    intro: 'Pohyb zdroja alebo prijímača mení frekvenciu, ktorú počujeme. Dve vlny z dvoch zdrojov sa môžu zosilniť aj vyrušiť.',
    points: [
      'Keď sa zdroj blíži, vlny sa pred ním zhusťujú a počujeme vyšší tón.',
      'Keď prijímač ide ku zdroju, stretáva vlnoplochy častejšie, frekvencia tiež stúpa.',
      'Dráhový rozdiel Δ = d₂ − d₁ rozhoduje, či je v bode maximum alebo minimum.',
      'Čiary maxím a miním dvoch zdrojov sú hyperboly.',
      'Huygensov princíp: každý bod čela vlny je zdroj druhotnej vlny. Z neho vyjde zákon odrazu aj lomu.',
      'Refrakcia je zakrivenie lúčov v nehomogénnom prostredí, k vrstve s menšou rýchlosťou.',
      'Difrakcia je ohyb vĺn okolo prekážky do geometrického tieňa.',
    ],
    formulas: [
      ['f′ = f / (1 ∓ v/c)', 'pohyblivý zdroj („−“ keď sa blíži)'],
      ['f′ = f·(1 ± v/c)', 'pohyblivý prijímač („+“ keď ide ku zdroju)'],
      ['Δ_max = 2n·λ/2', 'maximum: párny násobok polvlny'],
      ['Δ_min = (2n + 1)·λ/2', 'minimum: nepárny násobok polvlny'],
      ['α = β', 'zákon odrazu'],
      ['sin α / sin β = c₁/c₂', 'zákon lomu'],
    ],
    tips: ['Pri zdroji je zlomok (deliš), pri prijímači násobíš.', 'Rýchlosti v km/h prepočítaj: 72 km/h = 20 m/s.'],
    example: { q: 'Siréna znie 1,125× vyššie pri približovaní ako pri vzďaľovaní. Rýchlosť sanitky (c = 340 m/s)?', a: '(1 + v/c)/(1 − v/c) = 1,125 → v/c = 0,125/2,125 → v = 20 m/s.' },
  },
  'fyz:em': {
    intro: 'Elektromagnetická vlna je priečne vlnenie elektrického a magnetického poľa. Šíri sa aj vákuom.',
    points: [
      'Vektory E a B sú navzájom kolmé, kolmé na smer šírenia a kmitajú synfázne.',
      'Vo vákuu je rýchlosť c₀ ≈ 3·10⁸ m/s, v materiáli je menšia.',
      'Polarizácia hovorí, akú krivku opisuje koniec vektora E: úsečku, kružnicu alebo elipsu.',
      'Polarizovať sa dá len priečna vlna.',
      'Kruhová polarizácia vznikne z dvoch kolmých lineárnych vĺn s posunom π/2 a rovnakými amplitúdami.',
    ],
    formulas: [
      ['c = 1/√(ε·μ)', 'rýchlosť v materiáli'],
      ['c₀ = 1/√(ε₀·μ₀) ≈ 3·10⁸ m/s', 'rýchlosť vo vákuu'],
      ['n = c₀/c = √(εᵣ·μᵣ)', 'index lomu'],
    ],
    tips: ['Pri prechode do iného prostredia sa frekvencia nemení, λ sa mení ako rýchlosť.'],
    example: { q: 'Parafín má εᵣ = 2, μᵣ = 1. Index lomu?', a: 'n = √(2·1) = √2 ≈ 1,41.' },
  },
  'fyz:optika': {
    intro: 'Geometrická optika opisuje svetlo ako lúče. Stačia na to tri zákony: priamočiare šírenie, odraz a lom.',
    points: [
      'Svetlo je EM vlnenie s vlnovou dĺžkou 380 až 760 nm.',
      'Bodový zdroj vrhá len tieň, plošný zdroj aj polotieň.',
      'Zrkadlový odraz je od hladkého povrchu, difúzny od drsného.',
      'Obraz v rovinnom zrkadle je rovnako ďaleko za zrkadlom a má vymenenú pravú a ľavú stranu.',
      'Z opticky redšieho do hustejšieho prostredia sa lúč láme ku kolmici, naopak od kolmice.',
      'Úplný odraz nastane pri prechode do prostredia s menším n, ak je uhol dopadu väčší ako kritický.',
      'Trajektória lúča nezávisí od smeru chodu (princíp obrátiteľnosti).',
    ],
    formulas: [
      ['n = c₀/c', 'absolútny index lomu'],
      ['n₁·sin α₁ = n₂·sin α₂', 'Snellov zákon'],
      ['sin α_krit = n₂/n₁', 'kritický uhol (len ak n₂ < n₁)'],
      ['tg α = n', 'odrazený lúč kolmý na lomený (Brewster)'],
    ],
    tips: ['Uhly sa vždy merajú od kolmice, nie od plochy.', 'Pri zrkadle: kolmica na zrkadlo je osou uhla medzi dopadajúcim a odrazeným lúčom (samotné zrkadlo je osou uhla medzi smermi ich šírenia).'],
    example: { q: 'Kritický uhol pre sklo (n = 1,5) → vzduch?', a: 'sin α = 1/1,5 = 0,667 → α ≈ 41,8°.' },
  },
  'fyz:sosovky': {
    intro: 'Tenká šošovka láme lúče tak, že vzniká obraz. Všetko určuje jedno číslo: optická mohutnosť D.',
    points: [
      'Spojka má D > 0 a rovnobežné lúče zbieha do ohniska. Rozptylka má D < 0 a lúče rozbieha.',
      'Lúč cez optický stred sa neláme. Lúč rovnobežný s osou ide po spojke cez ohnisko F.',
      'Predmet pred 2f spojky: obraz skutočný, zmenšený, medzi f a 2f.',
      'Predmet v 2f: obraz skutočný, rovnako veľký, v 2f.',
      'Predmet medzi f a 2f: obraz skutočný, zväčšený, za 2f.',
      'Predmet v ohnisku: obraz v nekonečne. Medzi ohniskom a šošovkou: lupa, obraz neskutočný a zväčšený.',
      'Rozptylka dá vždy neskutočný a zmenšený obraz.',
      'Vonkajší povrch sféry má kladný polomer krivosti, vnútorný záporný.',
    ],
    formulas: [
      ['D = (n − 1)·(1/R₁ − 1/R₂)', 'rovnica „brúsiča šošoviek“ [dpt = m⁻¹]'],
      ['f = 1/D', 'ohnisková vzdialenosť'],
      ['x′ = x / (1 + D·x)', 'zobrazovacia rovnica tenkej šošovky'],
      ['Z = −y′/y', 'priečne zväčšenie (|Z| > 1 zväčšený)'],
      ['D = D₁ + D₂', 'dve blízke tenké šošovky'],
    ],
    tips: ['V kvapaline sa n v rovnici nahrádza pomerom n_skla/n_kvapaliny.', 'Ohnisková vzdialenosť v cm: D = 100/f.'],
    example: { q: 'Šošovka +5 dpt. Ohnisková vzdialenosť?', a: 'f = 1/5 m = 20 cm.' },
  },

  // ───────────── MATEMATIKA ─────────────
  'mat:vektory': {
    intro: 'Vektory v 3D sú trojice čísel. Tri súčiny ti povedia uhol, kolmý smer a objem.',
    points: [
      'Skalárny súčin je číslo. Nula znamená, že vektory sú kolmé.',
      'Vektorový súčin je vektor kolmý na oba. Jeho veľkosť je obsah rovnobežníka.',
      'u × v = −(v × u), poradie je dôležité. Pre rovnobežné vektory je výsledok nulový vektor.',
      'Zmiešaný súčin [u, v, w] = (u × v)·w je objem rovnobežnostena. Nula znamená, že ležia v jednej rovine.',
      'Lineárna kombinácia: w = a·u + b·v.',
    ],
    formulas: [
      ['u·v = u₁v₁ + u₂v₂ + u₃v₃', 'skalárny súčin'],
      ['cos φ = u·v / (|u|·|v|)', 'uhol vektorov'],
      ['u × v = (u₂v₃ − u₃v₂, u₃v₁ − u₁v₃, u₁v₂ − u₂v₁)', 'vektorový súčin'],
      ['|u| = √(u₁² + u₂² + u₃²)', 'dĺžka vektora'],
      ['S△ = ½·|u × v|', 'obsah trojuholníka'],
      ['V = ⅙·|[u, v, w]|', 'objem štvorstena'],
    ],
    tips: ['Vektorový súčin si počítaj ako determinant s i, j, k v prvom riadku.', 'Pri prostrednej zložke pozor na znamienko.'],
    example: { q: 'u = (1, 2, 3), v = (4, −1, 0). u·v = ?', a: '4 − 2 + 0 = 2.' },
  },
  'mat:geometria': {
    intro: 'Priamky a roviny v priestore zapisujeme rovnicami. Všetko sa točí okolo smerového a normálového vektora.',
    points: [
      'Priamka: X = A + t·s, kde A je bod a s smerový vektor.',
      'Rovina: ax + by + cz + d = 0, kde (a, b, c) je normálový vektor.',
      'Dve priamky v priestore sú rovnobežné, rôznobežné alebo mimobežné.',
      'Priamka je rovnobežná s rovinou, keď s·n = 0. Kolmá, keď s je násobok n.',
      'Uhol rovín je uhol normál. Uhol priamky a roviny počítame cez sínus.',
    ],
    formulas: [
      ['d = |ax₀ + by₀ + cz₀ + d| / √(a² + b² + c²)', 'vzdialenosť bodu od roviny'],
      ['cos φ = |n₁·n₂| / (|n₁|·|n₂|)', 'uhol dvoch rovín'],
      ['sin φ = |s·n| / (|s|·|n|)', 'uhol priamky a roviny'],
      ['d = |[AB, s₁, s₂]| / |s₁ × s₂|', 'vzdialenosť mimobežiek'],
    ],
    tips: ['Normálu roviny prečítaš z koeficientov pri x, y, z.', 'Rovinu cez tri body nájdeš cez vektorový súčin dvoch vektorov v nej.'],
    example: { q: 'Vzdialenosť bodu [1, 2, 3] od roviny 2x − y + 2z − 3 = 0?', a: '|2 − 2 + 6 − 3| / √9 = 3/3 = 1.' },
  },
  'mat:matice': {
    intro: 'Matica je tabuľka čísel. Učíme sa ich sčítať, násobiť a upravovať na stupňovitý tvar.',
    points: [
      'Súčin A·B existuje, keď má A toľko stĺpcov, koľko má B riadkov. (m×n)·(n×p) = m×p.',
      'Násobenie matíc nie je komutatívne: A·B ≠ B·A.',
      'Prvok súčinu (i, j) je i-ty riadok A krát j-ty stĺpec B.',
      'Gaussova eliminácia upraví maticu na stupňovitý tvar. Riadkové úpravy nemenia hodnosť.',
      'Hodnosť je počet nenulových riadkov po eliminácii.',
      'Regulárna matica je štvorcová s det ≠ 0, singulárna má det = 0.',
    ],
    formulas: [
      ['(A·B)ᵀ = Bᵀ·Aᵀ', 'transpozícia súčinu'],
      ['A·E = E·A = A', 'jednotková matica'],
    ],
    tips: ['Ak je jeden riadok násobkom druhého, hodnosť klesne.'],
    example: { q: 'Hodnosť [[1, 2], [2, 4]]?', a: 'Druhý riadok je 2× prvý, po úprave ostane jeden nenulový riadok, h = 1.' },
  },
  'mat:determinanty': {
    intro: 'Determinant je číslo, ktoré povie, či má matica inverznú. Pomocou neho a hodnosti riešime sústavy rovníc.',
    points: [
      'Výmena dvoch riadkov zmení znamienko determinantu. Pripočítanie násobku riadku ho nezmení.',
      'Inverzná matica existuje práve keď det A ≠ 0.',
      'Frobeniova veta: sústava má riešenie práve keď h(A) = h(A|b).',
      'Ak h = n, riešenie je jedno. Ak h < n, je ich nekonečne veľa s n − h parametrami.',
      'Homogénna sústava má vždy aspoň riešenie x = 0.',
      'Vlastné číslo λ a vlastný vektor v ≠ 0 spĺňajú A·v = λ·v.',
    ],
    formulas: [
      ['det [[a, b], [c, d]] = ad − bc', 'determinant 2×2'],
      ['det(A·B) = det A · det B', 'súčin'],
      ['A⁻¹ = 1/(ad − bc)·[[d, −b], [−c, a]]', 'inverzná 2×2'],
      ['xᵢ = det Aᵢ / det A', 'Cramerovo pravidlo'],
      ['det(A − λE) = 0', 'charakteristická rovnica'],
      ['A·X = B → X = A⁻¹·B', 'maticová rovnica'],
    ],
    tips: ['Vlastné čísla trojuholníkovej matice sú na diagonále.', 'Súčet vlastných čísel = stopa, súčin = determinant.', 'Inverznú maticu hľadaj úpravou [A | E] → [E | A⁻¹].'],
    example: { q: 'det [[2, 3], [1, 4]] = ?', a: '2·4 − 3·1 = 5.' },
  },
  'mat:funkcie': {
    intro: 'Pred deriváciami treba poznať základné funkcie: kde sú definované, aké hodnoty nadobúdajú a ako vyzerajú.',
    points: [
      'Párna funkcia: f(−x) = f(x), graf súmerný podľa osi y (cos x, x²).',
      'Nepárna funkcia: f(−x) = −f(x), súmerná podľa počiatku (sin x, x³).',
      'Inverznú funkciu má len prostá funkcia. Inverzná k eˣ je ln x.',
      'Zložená funkcia (f ∘ g)(x) = f(g(x)), najprv sa počíta vnútorná g.',
    ],
    formulas: [
      ['ln x: D = (0, ∞)', 'logaritmus len pre kladné x'],
      ['eˣ: H = (0, ∞)', 'exponenciála je vždy kladná'],
      ['arcsin x: D = ⟨−1, 1⟩, H = ⟨−π/2, π/2⟩', 'cyklometrická funkcia'],
      ['arctg x: D = ℝ, H = (−π/2, π/2)', 'cyklometrická funkcia'],
      ['ln(ab) = ln a + ln b', 'logaritmus súčinu'],
    ],
    tips: ['Pri definičnom obore hľadaj menovateľ ≠ 0, odmocninu ≥ 0 a logaritmus > 0.'],
    example: { q: 'Definičný obor √(4 − x²)?', a: '4 − x² ≥ 0 → x ∈ ⟨−2, 2⟩.' },
  },
  'mat:limity': {
    intro: 'Limita hovorí, k čomu sa funkcia blíži. Pomocou nej definujeme spojitosť a asymptoty.',
    points: [
      'Funkcia je spojitá v a, keď lim f(x) = f(a).',
      'Pri x → ∞ u podielu polynómov rozhoduje najvyšší stupeň.',
      'Pri 0/0 skús vyňať a vykrátiť, alebo neskôr L’Hospitala.',
      'Vertikálna asymptota je tam, kde funkcia uteká do ±∞ (napr. nula menovateľa).',
      'Šikmá asymptota y = kx + q, vodorovná je špeciálny prípad k = 0.',
    ],
    formulas: [
      ['lim (x→0) sin x / x = 1', 'dôležitá limita'],
      ['lim (n→∞) (1 + 1/n)ⁿ = e', 'Eulerovo číslo'],
      ['k = lim f(x)/x,  q = lim (f(x) − kx)', 'šikmá asymptota'],
    ],
    tips: ['Rovnaký stupeň → podiel vedúcich koeficientov. Vyšší čitateľ → ∞. Vyšší menovateľ → 0.'],
    example: { q: 'lim (x→1) (x² − 1)/(x − 1)?', a: '(x − 1)(x + 1)/(x − 1) = x + 1 → 2.' },
  },
  'mat:derivacie': {
    intro: 'Derivácia je smernica dotyčnice, teda rýchlosť zmeny funkcie. Na skúške je jej veľa.',
    points: [
      'Pravidlá: súčin, podiel a zložená funkcia (vonkajšia krát vnútorná).',
      'Logaritmické derivovanie sa hodí pre f(x)^g(x), napr. xˣ.',
      'Implicitnú funkciu derivuj celú rovnicu, y berieš ako funkciu x.',
      'Parametrickú funkciu derivuješ ako ψ′(t)/φ′(t).',
      'Diferenciál df = f′(x)·dx slúži na približný výpočet.',
      'L’Hospitalovo pravidlo platí len pre 0/0 a ∞/∞.',
    ],
    formulas: [
      ['(xⁿ)′ = n·xⁿ⁻¹', 'mocnina'],
      ['(sin x)′ = cos x, (cos x)′ = −sin x', 'goniometrické'],
      ['(eˣ)′ = eˣ, (ln x)′ = 1/x', 'exponenciála a logaritmus'],
      ['(tg x)′ = 1/cos² x, (arctg x)′ = 1/(1 + x²)', ''],
      ['(uv)′ = u′v + uv′', 'súčin'],
      ['(u/v)′ = (u′v − uv′)/v²', 'podiel'],
      ['[f(g(x))]′ = f′(g(x))·g′(x)', 'zložená funkcia'],
      ['y − f(x₀) = f′(x₀)(x − x₀)', 'dotyčnica'],
      ['eˣ ≈ 1 + x + x²/2! + x³/3!', 'Maclaurinov polynóm'],
    ],
    tips: ['Najčastejšia chyba: zabudnutá vnútorná derivácia, napr. (sin 3x)′ = 3 cos 3x.'],
    example: { q: '(ln(x² + 1))′ = ?', a: '1/(x² + 1) · 2x = 2x/(x² + 1).' },
  },
  'mat:priebeh': {
    intro: 'Priebeh funkcie je kompletný rozbor: kde rastie, kde má extrémy, aká je zakrivená a aké má asymptoty.',
    points: [
      'f′ > 0: rastie, f′ < 0: klesá.',
      'Stacionárny bod: f′(x) = 0. Tam hľadáme extrémy.',
      'f′′ > 0 v stacionárnom bode je minimum, f′′ < 0 je maximum.',
      'f′′ > 0: konvexná (∪), f′′ < 0: konkávna (∩). Zmena je inflexný bod.',
      'Globálne extrémy na ⟨a, b⟩: porovnaj hodnoty v stacionárnych bodoch, bodoch bez derivácie a v krajoch.',
      'Postup: definičný obor, párnosť, priesečníky s osami, asymptoty, f′, f′′, tabuľka, graf.',
    ],
    formulas: [['f′(x₀) = 0 ∧ f′′(x₀) ≠ 0', 'postačujúca podmienka extrému']],
    tips: ['x³ má v nule stacionárny bod, ale nie extrém. f′ tam nemení znamienko.'],
    example: { q: 'Extrémy f(x) = x³ − 3x?', a: 'f′ = 3x² − 3 = 0 → x = ±1. f′′(−1) = −6 → max, f′′(1) = 6 → min.' },
  },
  'mat:integraly': {
    intro: 'Neurčitý integrál je opak derivácie: hľadáme funkciu F, ktorej derivácia je f.',
    points: [
      'Vždy pripíš + C, primitívnych funkcií je nekonečne veľa.',
      'Per partes sa hodí na súčin, napr. x·eˣ, x·sin x, ln x.',
      'Substitúcia sa hodí, keď v integrále vidíš funkciu aj jej deriváciu.',
      'Racionálne funkcie rozlož na parciálne zlomky a integruj po kúskoch.',
    ],
    formulas: [
      ['∫ xⁿ dx = xⁿ⁺¹/(n + 1) + C', 'n ≠ −1'],
      ['∫ 1/x dx = ln|x| + C', ''],
      ['∫ eˣ dx = eˣ + C', ''],
      ['∫ sin x dx = −cos x + C,  ∫ cos x dx = sin x + C', ''],
      ['∫ 1/(1 + x²) dx = arctg x + C', ''],
      ['∫ u·v′ dx = u·v − ∫ u′·v dx', 'per partes'],
      ['∫ f′(x)/f(x) dx = ln|f(x)| + C', 'užitočná substitúcia'],
    ],
    tips: ['Pri lineárnej substitúcii delíš koeficientom: ∫ e³ˣ dx = e³ˣ/3 + C.', 'Výsledok si over deriváciou.'],
    example: { q: '∫ x·eˣ dx = ?', a: 'u = x, v′ = eˣ: x·eˣ − ∫ eˣ dx = (x − 1)·eˣ + C.' },
  },
};
