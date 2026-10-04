import type { Step } from '../steps';

// Matematika 1, prednáška 10: Priebeh funkcie.
// Monotónnosť, lokálne a globálne extrémy, konvexnosť a konkávnosť, inflexné body,
// kompletný priebeh na vzorovom príklade f(x) = x²/(x − 1).

const steps: Step[] = [
  {
    title: 'Čo znamená vyšetriť priebeh funkcie',
    text: 'Vyšetriť priebeh funkcie znamená zistiť len výpočtom všetko podstatné o jej grafe a potom ho nakresliť: kde je funkcia definovaná, kde pretína osi, kam uteká (asymptoty), kde rastie a klesá, kde má vrcholy a doliny a ako je zakrivená. Je to „veľká“ skúšková úloha, ktorá spája všetko predošlé: definičný obor, limity aj derivácie.\n\nNa obrázku je výsledok takého vyšetrovania pre f(x) = x³ − 3x. Zelené časti grafu rastú, červená klesá, žlté body sú maximum (x = −1) a minimum (x = 1) a fialový bod v nule je inflexný bod, kde sa graf z „kopca“ (konkávny) mení na „misku“ (konvexný). Pohyblivý bod s bielou dotyčnicou a nápis vpravo hore ukazujú, aké znamienko má práve derivácia.\n\nPrvá derivácia f′ ti povie, kde funkcia rastie a klesá a kde má extrémy. Druhá derivácia f′′ ti povie, ako je graf zakrivený a kde sú inflexné body. V tejto lekcii sa to naučíš krok po kroku a na konci prejdeme jeden celý skúškový príklad.',
    analogy: 'Výškový profil terénu (geodet pozná): z mapy s vrstevnicami zostrojíš rez – kde terén stúpa, kde je vrchol, kde dolina, kde sa svah láme. Priebeh funkcie je presne taký profil, len ho počítaš z rovnice namiesto merania v teréne.',
    fig: 'mat:priebeh',
    bullets: [
      'f′ > 0: rastie,  f′ < 0: klesá,  f′ = 0: kandidát na extrém.',
      'f′′ > 0: konvexná ∪,  f′′ < 0: konkávna ∩,  zmena znamienka f′′: inflexný bod.',
      'Limity v krajných bodoch D(f) a v ±∞: asymptoty.',
    ],
  },
  {
    title: 'Monotónnosť z prvej derivácie',
    text: 'Platí veta: ak je f′(x) > 0 na celom intervale, funkcia je na ňom rastúca; ak je f′(x) < 0, je klesajúca. Dôvod je jednoduchý: kladná smernica dotyčnice v každom bode znamená, že graf všade stúpa.\n\nPostup je rovnaký ako pri nerovniciach v lekcii Funkcie (metóda nulových bodov). Nájdeš body, kde f′ = 0 alebo kde f′ neexistuje, a k nim pridáš body mimo D(f). Tieto body rozdelia D(f) na intervaly. Na každom zistíš znamienko f′ dosadením jedného skúšobného čísla.\n\nNa obrázku prepni na x³/6 − x. Ružová čiarkovaná krivka je f′(x) = x²/2 − 1. Kde je ružová nad osou x (f′ > 0), modrý graf stúpa; kde je pod osou (medzi −1,41 a 1,41), modrý graf klesá. Body, kde ružová pretína os x, sú vrcholy modrej.',
    fig: 'mat:derivacie',
    formula: {
      f: 'f′(x) > 0 na I  ⇒  f rastie na I     f′(x) < 0 na I  ⇒  f klesá na I',
      what: 'Monotónnosť a znamienko derivácie',
      vars: [
        ['I', 'interval (kúsok osi x bez dier)'],
        ['deliace body', 'f′ = 0, f′ neexistuje, body mimo D(f)'],
      ],
    },
    worked: {
      q: 'Urči intervaly monotónnosti funkcie f(x) = x³ − 3x.',
      steps: [
        'Vieme: D(f) = ℝ. Hľadáme: znamienko f′ na jednotlivých intervaloch.',
        'f′(x) = 3x² − 3 = 3(x² − 1) = 3(x − 1)(x + 1).',
        'Nulové body f′: x = −1 a x = 1. Delia os na (−∞, −1), (−1, 1), (1, ∞).',
        'Skúšobné body: f′(−2) = 12 − 3 = 9 > 0; f′(0) = −3 < 0; f′(2) = 9 > 0.',
        'Teda: na (−∞, −1⟩ rastie, na ⟨−1, 1⟩ klesá, na ⟨1, ∞) rastie.',
        'Kontrola s obrázkom z kroku 1: zelená, červená, zelená ✓.',
      ],
      result: 'f rastie na (−∞, −1⟩ a na ⟨1, ∞), klesá na ⟨−1, 1⟩.',
    },
    deeper: 'Prečo nepíšeme „rastie na (−∞, −1⟩ ∪ ⟨1, ∞)“? Monotónnosť na zjednotení intervalov nemusí platiť. Príklad 1/x: klesá na (−∞, 0) aj na (0, ∞), ale nie na ich zjednotení, lebo f(−1) = −1 < f(1) = 1. Preto intervaly vymenúvaj zvlášť („na … a na …“).\n\nKrajné body (napr. −1 a 1) môžeš do intervalu monotónnosti zahrnúť, ak je tam funkcia spojitá. V niektorých skriptách sa píšu otvorené intervaly; obe verzie sa zvyčajne uznávajú.',
    check: {
      q: 'f′(x) = (x − 2)·eˣ. Kde funkcia f klesá?',
      options: ['na (−∞, 2⟩', 'na ⟨2, ∞)', 'nikde', 'všade'],
      explain: 'eˣ je vždy kladné, takže znamienko f′ určuje len (x − 2). To je záporné pre x < 2, preto tam f klesá.',
    },
  },
  {
    title: 'Lokálne extrémy',
    text: 'Funkcia má v bode x₀ lokálne maximum, ak je f(x₀) najväčšia hodnota v nejakom okolí x₀ (malý kúsok vľavo aj vpravo). Lokálne minimum podobne s najmenšou hodnotou. Spoločne ich voláme lokálne extrémy. Slovo „lokálne“ znamená, že porovnávame len s blízkymi bodmi.\n\nNutná podmienka: ak má funkcia v x₀ extrém a derivácia tam existuje, potom f′(x₀) = 0. Taký bod sa volá stacionárny bod. Na obrázku vidíš, že na vrchole aj na dne je žltá dotyčnica vodorovná.\n\nStacionárny bod je však len kandidát. Či je to naozaj maximum alebo minimum, zistíš jednou z dvoch metód: 1) zmena znamienka f′ (z + na − je maximum, z − na + minimum), alebo 2) znamienko druhej derivácie: f′′(x₀) < 0 je maximum (graf je tam kopec ∩), f′′(x₀) > 0 minimum (miska ∪). Ak f′′(x₀) = 0, druhá metóda nerozhodne a treba použiť prvú.',
    analogy: 'Na vrchole kopca chvíľu kráčaš úplne po rovine: predtým si stúpal (f′ > 0), potom budeš klesať (f′ < 0). Tá chvíľa „po rovine“ je f′ = 0. V doline je to naopak: najprv klesáš, potom stúpaš.',
    fig: 'extrema',
    formula: {
      f: 'f′(x₀) = 0  a  f′′(x₀) < 0  ⇒  lokálne maximum     f′(x₀) = 0  a  f′′(x₀) > 0  ⇒  lokálne minimum',
      what: 'Postačujúca podmienka extrému (test druhou deriváciou)',
      vars: [
        ['x₀', 'stacionárny bod (f′(x₀) = 0)'],
        ['f′′(x₀)', 'druhá derivácia v tomto bode (zakrivenie)'],
        ['f′′(x₀) = 0', 'test nerozhodne, skúmaj zmenu znamienka f′'],
      ],
    },
    worked: {
      q: 'Nájdi lokálne extrémy funkcie f(x) = x³ − 3x testom druhou deriváciou.',
      steps: [
        'Vieme: f′(x) = 3x² − 3, stacionárne body x = ±1 (z predošlého kroku).',
        'Druhá derivácia: f′′(x) = 6x.',
        'x = −1: f′′(−1) = −6 < 0, teda lokálne maximum. Hodnota f(−1) = −1 + 3 = 2.',
        'x = 1: f′′(1) = 6 > 0, teda lokálne minimum. Hodnota f(1) = 1 − 3 = −2.',
        'Kontrola metódou znamienok: pri −1 sa f′ mení z + na − (max), pri 1 z − na + (min) ✓.',
      ],
      result: 'Lokálne maximum v bode [−1, 2], lokálne minimum v bode [1, −2].',
    },
    check: {
      q: 'f′(x₀) = 0 a f′′(x₀) = 0. Čo vieš o bode x₀?',
      options: ['Nič isté, treba skúmať zmenu znamienka f′', 'Určite je tam maximum', 'Určite je tam minimum', 'Určite je tam inflexný bod'],
      explain: 'Test druhou deriváciou vtedy nerozhoduje. Napríklad x⁴ má v nule minimum, −x⁴ maximum a x³ ani jedno, a všetky tri majú f′(0) = f′′(0) = 0.',
    },
  },
  {
    title: 'Pasce pri extrémoch',
    text: 'Pasca 1: f′ = 0 ešte neznamená extrém. Funkcia x³ má f′(x) = 3x², v nule je f′(0) = 0, ale f′ je kladná vľavo aj vpravo. Funkcia stále rastie, len sa v nule na chvíľu „zastaví“. Je to stacionárny bod, ale nie extrém.\n\nPasca 2: extrém môže byť aj tam, kde derivácia neexistuje. Funkcia |x| má v nule ostrý hrot a minimum, hoci f′(0) neexistuje. Kandidátov na extrém preto hľadaj medzi bodmi, kde f′ = 0, aj medzi bodmi z D(f), kde f′ neexistuje.\n\nPasca 3: body mimo D(f) (napríklad zvislá asymptota) nie sú extrémy, ale musíš ich zahrnúť medzi deliace body intervalov, lebo tam môže f′ zmeniť znamienko.',
    worked: {
      q: 'Nájdi lokálne extrémy funkcie f(x) = x⁴ − 4x³.',
      steps: [
        'Vieme: D(f) = ℝ, polynóm. Hľadáme: stacionárne body a zmenu znamienka f′.',
        'f′(x) = 4x³ − 12x² = 4x²(x − 3). Stacionárne body: x = 0 a x = 3.',
        'Znamienko: 4x² ≥ 0 vždy, rozhoduje (x − 3). Na (−∞, 0) je f′ < 0, na (0, 3) je f′ < 0, na (3, ∞) je f′ > 0.',
        'x = 0: znamienko sa nemení (− a −), extrém tu NIE JE. (Test f′′ by zlyhal: f′′ = 12x² − 24x, f′′(0) = 0.)',
        'x = 3: zmena z − na +, lokálne minimum. f(3) = 81 − 108 = −27. (f′′(3) = 108 − 72 = 36 > 0 ✓.)',
      ],
      result: 'Jediný lokálny extrém: minimum [3, −27]. V bode 0 je stacionárny bod bez extrému.',
    },
    check: {
      q: 'Ktorá funkcia má v x = 0 lokálne minimum, hoci f′(0) neexistuje?',
      options: ['|x|', 'x³', 'x', 'sin x'],
      explain: '|x| ≥ 0 a |0| = 0, takže v nule je minimum. Graf má tam hrot, smernica zľava −1 a sprava +1, preto derivácia neexistuje.',
    },
  },
  {
    title: 'Globálne extrémy na uzavretom intervale',
    text: 'Globálne (absolútne) maximum je najväčšia hodnota funkcie na celom skúmanom intervale, globálne minimum najmenšia. Spojitá funkcia na uzavretom intervale ⟨a, b⟩ ich má vždy (Weierstrassova veta).\n\nGlobálny extrém môže byť vo vnútri intervalu (vtedy je to aj lokálny extrém), ale aj v krajnom bode a alebo b. Preto vypočítaš funkčné hodnoty vo všetkých kandidátoch a jednoducho ich porovnáš. Druhá derivácia tu netreba.\n\nTypická chyba: zabudnúť na krajné body alebo započítať stacionárny bod, ktorý leží mimo intervalu.',
    analogy: 'Túra po hrebeni z bodu A do bodu B: najvyšší bod celej túry môže byť niektorý vrchol po ceste, ale aj samotný cieľ, ak končíš na vysokom štíte. Preto porovnáš všetky vrcholy aj oba konce trasy.',
    bullets: [
      '1. Nájdi stacionárne body (f′ = 0) a body, kde f′ neexistuje, ktoré ležia VO VNÚTRI ⟨a, b⟩.',
      '2. Pridaj krajné body a a b.',
      '3. Vypočítaj f vo všetkých kandidátoch.',
      '4. Najväčšia hodnota je globálne maximum, najmenšia globálne minimum.',
    ],
    worked: {
      q: 'Nájdi globálne extrémy funkcie f(x) = x³ − 3x na intervale ⟨0, 3⟩.',
      steps: [
        'Vieme: f je spojitá, interval je uzavretý, extrémy existujú.',
        'Stacionárne body: f′ = 3x² − 3 = 0, teda x = ±1. Do ⟨0, 3⟩ patrí len x = 1 (−1 vynecháš).',
        'Kandidáti: x = 0, x = 1, x = 3.',
        'Hodnoty: f(0) = 0, f(1) = 1 − 3 = −2, f(3) = 27 − 9 = 18.',
        'Porovnaj: najväčšia 18, najmenšia −2.',
      ],
      result: 'Globálne maximum 18 v bode x = 3 (krajný bod!), globálne minimum −2 v bode x = 1.',
    },
    deeper: 'Na intervale ⟨−2, 2⟩ by kandidáti boli −2, −1, 1, 2 s hodnotami f(−2) = −8 + 6 = −2, f(−1) = 2, f(1) = −2, f(2) = 8 − 6 = 2. Globálne maximum 2 sa dosahuje v dvoch bodoch (−1 a 2) a globálne minimum −2 tiež v dvoch (−2 a 1). To je v poriadku, hodnota extrému je jediná, bodov môže byť viac.\n\nNa otvorenom intervale alebo na celom ℝ globálne extrémy existovať nemusia: x³ − 3x na ℝ nemá ani globálne maximum, ani minimum, lebo ide do ±∞.',
    check: {
      q: 'Pozemok tvaru obdĺžnika má obvod 40 m. Pri akých rozmeroch má najväčšiu plochu?',
      options: ['10 m × 10 m', '15 m × 5 m', '12 m × 8 m', '20 m × 0 m'],
      explain: 'Strany x a 20 − x, plocha S(x) = x(20 − x) = 20x − x². S′(x) = 20 − 2x = 0 dá x = 10. S′′ = −2 < 0, je to maximum. Štvorec 10 × 10 má plochu 100 m², napríklad 12 × 8 len 96 m².',
    },
  },
  {
    title: 'Konvexnosť a konkávnosť',
    text: 'Funkcia je konvexná na intervale, ak je jej graf prehnutý ako miska ∪ („drží vodu“). Graf vtedy leží nad každou svojou dotyčnicou. Konkávna je prehnutá ako kopec ∩ a graf leží pod dotyčnicami.\n\nRozhoduje druhá derivácia: f′′ > 0 znamená, že f′ (smernica) rastie, dotyčnice sa pri pohybe doprava stáčajú nahor a graf je konvexný. f′′ < 0 znamená konkávny graf. Na obrázku sa žltá gulička hojdá v zelenej miske (konvexná) a modrá zíde z červeného kopca (konkávna).\n\nPostup hľadania intervalov je rovnaký ako pri monotónnosti, len so znamienkom f′′ namiesto f′. Pozor na názvy: v niektorých knihách sa používa „konvexná nahor/nadol“. Na STU platí: konvexná = ∪, konkávna = ∩.',
    analogy: 'Konvexný úsek cesty je ako údolie: ak v ňom zastavíš na neutráli, auto sa skotúľa do stredu. Konkávny úsek je ako hrb mosta: auto z neho samo zíde dole.',
    fig: 'convex',
    formula: {
      f: 'f′′(x) > 0 na I  ⇒  f je konvexná (∪)     f′′(x) < 0 na I  ⇒  f je konkávna (∩)',
      what: 'Zakrivenie a druhá derivácia',
      vars: [
        ['f′′', 'druhá derivácia, derivácia f′'],
        ['∪', 'konvexná, „miska“'],
        ['∩', 'konkávna, „kopec“'],
      ],
    },
    worked: {
      q: 'Urči intervaly konvexnosti a konkávnosti funkcie f(x) = x³ − 3x.',
      steps: [
        'Vieme: f′(x) = 3x² − 3. Hľadáme: znamienko f′′.',
        'f′′(x) = 6x. Nulový bod: x = 0.',
        'Pre x < 0 je 6x < 0, funkcia je konkávna ∩.',
        'Pre x > 0 je 6x > 0, funkcia je konvexná ∪.',
        'Kontrola s obrázkom z kroku 1: nápisy „konkávna ∩“ vľavo a „konvexná ∪“ vpravo ✓. Maximum (x = −1) leží na konkávnej časti, minimum (x = 1) na konvexnej, presne podľa testu f′′.',
      ],
      result: 'f je konkávna na (−∞, 0⟩ a konvexná na ⟨0, ∞).',
    },
  },
  {
    title: 'Inflexné body',
    text: 'Inflexný bod je bod grafu, v ktorom sa funkcia mení z konvexnej na konkávnu alebo naopak. Dotyčnica v ňom graf „pretína“: z jednej strany je graf nad ňou, z druhej pod ňou.\n\nNutná podmienka (ak f′′ existuje): f′′(x₀) = 0. Ale pozor, nestačí to. Inflexný bod je tam len vtedy, keď f′′ v x₀ naozaj zmení znamienko. Funkcia x⁴ má f′′(x) = 12x², v nule je f′′(0) = 0, ale f′′ je kladná z oboch strán, takže inflexia tam nie je (x⁴ je všade konvexná).\n\nNa obrázku je fialový bod v nule inflexný bod funkcie x³ − 3x: vľavo je kopec, vpravo miska. Bod, ktorý nepatrí do D(f), nemôže byť inflexný, aj keď sa v ňom mení zakrivenie (napríklad pri zvislej asymptote).',
    fig: 'mat:priebeh',
    formula: {
      f: 'inflexný bod x₀:  f′′(x₀) = 0  a  f′′ mení v x₀ znamienko',
      what: 'Inflexný bod',
      vars: [
        ['f′′(x₀) = 0', 'nutná podmienka (len kandidát)'],
        ['zmena znamienka', 'postačujúca: z + na − alebo z − na +'],
        ['[x₀, f(x₀)]', 'inflexný bod zapisuj aj s y-ovou súradnicou'],
      ],
    },
    worked: {
      q: 'Nájdi inflexné body funkcie f(x) = x⁴ − 6x².',
      steps: [
        'Vieme: D(f) = ℝ. f′(x) = 4x³ − 12x, f′′(x) = 12x² − 12 = 12(x − 1)(x + 1).',
        'Kandidáti: f′′ = 0 pre x = −1 a x = 1.',
        'Znamienko f′′: f′′(−2) = 36 > 0 (∪), f′′(0) = −12 < 0 (∩), f′′(2) = 36 > 0 (∪).',
        'V oboch kandidátoch sa znamienko mení, oba sú inflexné body.',
        'y-súradnice: f(−1) = 1 − 6 = −5, f(1) = −5.',
        'Kontrola: funkcia je párna, inflexné body sú súmerné podľa osi y ✓.',
      ],
      result: 'Inflexné body [−1, −5] a [1, −5]; konvexná na (−∞, −1⟩ a ⟨1, ∞), konkávna na ⟨−1, 1⟩.',
    },
    check: {
      q: 'Ak f′′(x₀) = 0, je v x₀ určite inflexný bod?',
      options: ['Nie, f′′ musí v x₀ aj zmeniť znamienko', 'Áno, vždy', 'Áno, ak navyše f′(x₀) = 0', 'Nie, inflexný bod je tam, kde f′ = 0'],
      explain: 'f′′(x₀) = 0 je len kandidát. Napríklad x⁴: f′′(0) = 0, ale f′′ = 12x² je kladná z oboch strán, takže inflexia v nule nie je.',
    },
  },
  {
    title: 'Recept: kompletný priebeh funkcie',
    text: 'Na skúške postupuj vždy v rovnakom poradí. Každý krok ti dá kúsok skladačky a na konci ich zložíš do tabuľky a náčrtu. Ak niečo nesedí (napríklad graf by musel „preskočiť“), niekde je chyba vo výpočte.\n\nVšetky výsledky na konci zapíš do tabuľky: v riadkoch intervaly a významné body, v stĺpcoch znamienko f′, znamienko f′′ a správanie (↗ ↘ ∪ ∩). Tabuľka je najrýchlejšia kontrola, že je všetko konzistentné.\n\nV ďalších piatich krokoch prejdeme celý priebeh funkcie f(x) = x²/(x − 1) presne podľa tohto receptu.',
    bullets: [
      '1. Definičný obor D(f).',
      '2. Párnosť, nepárnosť (ak áno, stačí skúmať x ≥ 0), prípadne periodickosť.',
      '3. Priesečníky s osami: s osou y [0, f(0)], s osou x riešiš f(x) = 0. Znamienko f (kde je graf nad a kde pod osou x).',
      '4. Spojitosť a asymptoty: zvislé (body mimo D), vodorovné alebo šikmé (limity v ±∞).',
      '5. f′: intervaly monotónnosti a lokálne extrémy.',
      '6. f′′: intervaly konvexnosti a konkávnosti, inflexné body.',
      '7. Tabuľka, obor hodnôt H(f) a náčrt grafu.',
    ],
  },
  {
    title: 'Vzorový príklad 1/5: D(f), párnosť, priesečníky',
    text: 'Vyšetríme priebeh funkcie f(x) = x²/(x − 1). Začneme „lacnými“ krokmi, ktoré nevyžadujú derivácie: kde je funkcia definovaná, či je súmerná a kde pretína osi.\n\nZnamienko funkcie sa oplatí určiť hneď. Neskôr ti pomôže pri asymptotách: ak je funkcia vľavo od x = 1 záporná, graf sa pri asymptote musí blížiť k −∞, nie k +∞.',
    worked: {
      q: 'f(x) = x²/(x − 1): urči D(f), párnosť, priesečníky s osami a znamienko funkcie.',
      steps: [
        'D(f): menovateľ x − 1 ≠ 0, teda D(f) = ℝ∖{1}.',
        'Párnosť: D(f) nie je súmerný (−1 ∈ D, ale 1 ∉ D), preto funkcia nie je ani párna, ani nepárna.',
        'Priesečník s osou y: f(0) = 0/(−1) = 0, bod [0, 0].',
        'Priesečník s osou x: x²/(x − 1) = 0, teda x² = 0, x = 0. Opäť bod [0, 0], iný nie je.',
        'Znamienko: x² ≥ 0, takže rozhoduje menovateľ. Pre x < 1 (x ≠ 0) je f(x) < 0, pre x > 1 je f(x) > 0.',
        'Kontrola: f(−1) = 1/(−2) = −0,5 < 0 ✓, f(3) = 9/2 = 4,5 > 0 ✓.',
      ],
      result: 'D(f) = ℝ∖{1}; ani párna, ani nepárna; jediný priesečník s osami [0, 0]; f < 0 pre x < 1, f > 0 pre x > 1.',
    },
  },
  {
    title: 'Vzorový príklad 2/5: asymptoty',
    text: 'Teraz zistíme, kam graf uteká. Jediný bod mimo D(f) je x = 1, to je kandidát na zvislú asymptotu. Potom pozrieme limity v ±∞.\n\nČitateľ má stupeň 2 a menovateľ 1, teda o jeden viac. Podľa lekcie Limity očakávame šikmú asymptotu a žiadnu vodorovnú.',
    worked: {
      q: 'Nájdi všetky asymptoty funkcie f(x) = x²/(x − 1).',
      steps: [
        'Zvislá v x = 1: lim (x→1⁺) x²/(x − 1) = 1/0⁺ = +∞ a lim (x→1⁻) = 1/0⁻ = −∞. Teda x = 1 je zvislá asymptota.',
        'Vodorovná: lim (x→±∞) x²/(x − 1) = ±∞ (stupeň čitateľa je väčší), vodorovná asymptota nie je.',
        'Šikmá, k: k = lim x²/(x(x − 1)) = lim x²/(x² − x) = 1.',
        'Šikmá, q: q = lim [x²/(x − 1) − x] = lim [(x² − x² + x)/(x − 1)] = lim x/(x − 1) = 1.',
        'Šikmá asymptota y = x + 1, rovnaká v +∞ aj v −∞.',
        'Kontrola: f(100) = 10000/99 ≈ 101,01, priamka dáva 101 ✓.',
      ],
      result: 'Zvislá asymptota x = 1, šikmá asymptota y = x + 1, vodorovná nie je.',
    },
    deeper: 'Delenie polynómov dá elegantný tvar: x² = (x − 1)(x + 1) + 1, teda f(x) = x + 1 + 1/(x − 1). Hneď vidno šikmú asymptotu y = x + 1 (zlomok 1/(x − 1) ide v ±∞ k nule).\n\nNavyše vidno, z ktorej strany sa graf prikladá: pre x → +∞ je 1/(x − 1) > 0, graf je nad asymptotou; pre x → −∞ je zlomok záporný, graf je pod ňou. Tento tvar sa hodí aj na derivovanie v ďalších krokoch.',
    check: {
      q: 'Prečo f(x) = x²/(x − 1) nemá vodorovnú asymptotu?',
      options: ['Lebo lim (x→±∞) f(x) = ±∞, nie konečné číslo', 'Lebo má zvislú asymptotu', 'Lebo f(0) = 0', 'Lebo nie je párna'],
      explain: 'Vodorovná asymptota y = b vyžaduje konečnú limitu b v +∞ alebo −∞. Tu je stupeň čitateľa väčší ako menovateľa, limity sú nekonečné. Funkcia môže mať naraz zvislú aj vodorovnú asymptotu, to nie je dôvod.',
    },
  },
  {
    title: 'Vzorový príklad 3/5: monotónnosť a extrémy',
    text: 'Teraz prvá derivácia. Zlomok derivujeme podľa pravidla pre podiel a čitateľ rozložíme na súčin, aby sa dalo ľahko určiť znamienko.\n\nMenovateľ derivácie (x − 1)² je vždy kladný, takže znamienko f′ určuje len čitateľ. Bod x = 1 do D(f) nepatrí, ale delí intervaly, preto ho zaradíme medzi deliace body.',
    worked: {
      q: 'Urči intervaly monotónnosti a lokálne extrémy funkcie f(x) = x²/(x − 1).',
      steps: [
        'f′(x) = [2x·(x − 1) − x²·1]/(x − 1)² = (x² − 2x)/(x − 1)² = x(x − 2)/(x − 1)².',
        'Deliace body: f′ = 0 pre x = 0 a x = 2; bod mimo D: x = 1.',
        'Znamienko čitateľa x(x − 2): f′(−1) = 3/4 > 0; f′(0,5) = −3 < 0; f′(1,5) = −3 < 0; f′(3) = 3/4 > 0.',
        'Rastie na (−∞, 0⟩, klesá na ⟨0, 1) a na (1, 2⟩, rastie na ⟨2, ∞).',
        'x = 0: zmena z + na −, lokálne maximum f(0) = 0. x = 2: zmena z − na +, lokálne minimum f(2) = 4/1 = 4.',
      ],
      result: 'Lokálne maximum [0, 0], lokálne minimum [2, 4]; rastie na (−∞, 0⟩ a ⟨2, ∞), klesá na ⟨0, 1) a (1, 2⟩.',
    },
    deeper: 'Zaujímavosť: lokálne maximum (hodnota 0) je nižšie ako lokálne minimum (hodnota 4). Nie je to chyba. „Lokálne“ znamená len v okolí bodu a medzi nimi je zvislá asymptota, kde graf uteká do −∞ a vracia sa z +∞.\n\nKontrola cez tvar f(x) = x + 1 + 1/(x − 1): f′(x) = 1 − 1/(x − 1)². Rovnica f′ = 0 dá (x − 1)² = 1, teda x − 1 = ±1, x = 0 alebo x = 2. Rovnaký výsledok ✓.',
  },
  {
    title: 'Vzorový príklad 4/5: konvexnosť a inflexia',
    text: 'Druhú deriváciu by si mohol počítať z f′ = (x² − 2x)/(x − 1)² opäť pravidlom pre podiel, ale je to zdĺhavé. Rýchlejšie je derivovať tvar f(x) = x + 1 + 1/(x − 1), ktorý sme získali delením.\n\nPripomeň si: inflexný bod musí patriť do D(f) a f′′ musí v ňom zmeniť znamienko.',
    worked: {
      q: 'Urči intervaly konvexnosti, konkávnosti a inflexné body funkcie f(x) = x²/(x − 1).',
      steps: [
        'Použi f(x) = x + 1 + (x − 1)⁻¹. Potom f′(x) = 1 − (x − 1)⁻² a f′′(x) = 2(x − 1)⁻³ = 2/(x − 1)³.',
        'f′′ nie je nikde nulová (čitateľ 2 ≠ 0). Znamienko mení len v bode x = 1, ktorý nepatrí do D(f).',
        'Pre x < 1 je (x − 1)³ < 0, teda f′′ < 0: funkcia je konkávna ∩.',
        'Pre x > 1 je (x − 1)³ > 0, teda f′′ > 0: funkcia je konvexná ∪.',
        'Inflexný bod nie je: x = 1 ∉ D(f).',
        'Kontrola s extrémami: f′′(0) = −2 < 0 potvrdzuje maximum, f′′(2) = 2 > 0 minimum ✓.',
      ],
      result: 'Konkávna na (−∞, 1), konvexná na (1, ∞), inflexné body nie sú.',
    },
    check: {
      q: 'Prečo x = 1 nie je inflexný bod funkcie x²/(x − 1)?',
      options: ['Lebo 1 nepatrí do D(f), graf tam nemá bod', 'Lebo f′′(1) = 0', 'Lebo f′(1) = 0', 'Je to inflexný bod'],
      explain: 'Zakrivenie sa okolo x = 1 naozaj mení, ale v x = 1 funkcia nie je definovaná (zvislá asymptota). Inflexný bod je bod grafu, a ten tam neexistuje.',
    },
  },
  {
    title: 'Vzorový príklad 5/5: tabuľka, H(f) a graf',
    text: 'Všetko zložíme dokopy. Ľavá vetva grafu prichádza z −∞ zospodu šikmej asymptoty y = x + 1, stúpa až do maxima [0, 0] a potom padá k −∞ pri zvislej asymptote x = 1. Celá je konkávna (kopec).\n\nPravá vetva zostupuje z +∞ pri x = 1 do minima [2, 4] a potom stúpa a prikladá sa zhora k asymptote y = x + 1. Celá je konvexná (miska). Graf pripomína rozťahanú hyperbolu otočenú pozdĺž šikmej priamky.\n\nObor hodnôt prečítaš z grafu: ľavá vetva pokrýva všetko od −∞ po maximum 0, pravá všetko od minima 4 po +∞. Hodnoty medzi 0 a 4 funkcia nikdy nedosiahne.',
    bullets: [
      '(−∞, 0): f′ > 0 ↗, f′′ < 0 ∩',
      'x = 0: lokálne maximum [0, 0]',
      '(0, 1): f′ < 0 ↘, f′′ < 0 ∩',
      'x = 1: zvislá asymptota, zľava f → −∞, sprava f → +∞',
      '(1, 2): f′ < 0 ↘, f′′ > 0 ∪',
      'x = 2: lokálne minimum [2, 4]',
      '(2, ∞): f′ > 0 ↗, f′′ > 0 ∪',
      'Šikmá asymptota y = x + 1 v ±∞',
    ],
    worked: {
      q: 'Urči obor hodnôt H(f) funkcie f(x) = x²/(x − 1) a over náčrt kontrolnými bodmi.',
      steps: [
        'Ľavá vetva (x < 1): spojitá, ide z −∞ (pri x → −∞) hore do maxima 0 a späť do −∞ (pri x → 1⁻). Pokrýva (−∞, 0⟩.',
        'Pravá vetva (x > 1): ide z +∞ (pri x → 1⁺) dole do minima 4 a späť do +∞. Pokrýva ⟨4, ∞).',
        'Zjednotenie: H(f) = (−∞, 0⟩ ∪ ⟨4, ∞).',
        'Kontrolné body: f(−1) = −0,5 a f(0,5) = 0,25/(−0,5) = −0,5, obe pod maximom 0 ✓.',
        'f(1,5) = 2,25/0,5 = 4,5 a f(3) = 9/2 = 4,5, obe nad minimom 4 ✓.',
      ],
      result: 'H(f) = (−∞, 0⟩ ∪ ⟨4, ∞).',
    },
    check: {
      q: 'Aký je obor hodnôt funkcie f(x) = x²/(x − 1)?',
      options: ['(−∞, 0⟩ ∪ ⟨4, ∞)', 'ℝ', '⟨0, 4⟩', '(−∞, 0) ∪ (4, ∞)'],
      explain: 'Ľavá vetva dosahuje maximum 0 (vrátane), pravá minimum 4 (vrátane). Hodnoty medzi 0 a 4 funkcia nenadobúda. Preto lomené zátvorky pri 0 a 4.',
    },
  },
  {
    title: 'Zhrnutie: priebeh funkcie',
    text: 'Priebeh funkcie je recept zložený z krokov, ktoré už poznáš. Najdôležitejšie je nič nevynechať a výsledky skontrolovať tabuľkou: znamienka f′ a f′′ sa musia zhodovať s extrémami, asymptotami a znamienkom funkcie.\n\nAk ti niečo nesedí, napríklad maximum vychádza na konvexnej časti, vráť sa k derivácii, chyba je takmer vždy tam.',
    bullets: [
      'Poradie: D(f) → párnosť → priesečníky a znamienko → asymptoty → f′ → f′′ → tabuľka, H(f), graf.',
      'f′ > 0 rastie, f′ < 0 klesá. Deliace body: f′ = 0, f′ neexistuje, body mimo D(f).',
      'Lokálny extrém: f′ mení znamienko (+ → − max, − → + min), alebo f′′ < 0 max, f′′ > 0 min.',
      'f′(x₀) = 0 nestačí (x³ v nule); extrém môže byť aj bez derivácie (|x| v nule).',
      'Globálne extrémy na ⟨a, b⟩: porovnaj f v stacionárnych bodoch vnútri a v krajných bodoch a, b.',
      'f′′ > 0 konvexná ∪, f′′ < 0 konkávna ∩.',
      'Inflexný bod: f′′ = 0 A zmena znamienka f′′, bod musí patriť do D(f).',
      'Pri racionálnej funkcii sa oplatí deliť polynómy: x²/(x − 1) = x + 1 + 1/(x − 1).',
    ],
  },
];

export default steps;
