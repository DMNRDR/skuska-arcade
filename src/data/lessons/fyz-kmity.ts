import type { Step } from '../steps';

// Podrobná lekcia: Kmity (prednáška 1.1–1.3, cvičenie 1 pr. 1–5, cvičenie 2 pr. 1–5, cvičenie 3 pr. 6)

const steps: Step[] = [
  {
    title: 'Čo je kmitanie?',
    text:
      'Kmitanie je pohyb, ktorý sa opakuje: tam a späť, tam a späť. Na prednáške je to „približne alebo presne sa opakujúci pohyb čohokoľvek“. Keď kmitá poloha nejakého telesa (napr. závažia), hovoríme o mechanickom kmitaní.\n\n' +
      'Teleso si vo fyzike často predstavujeme ako hmotný bod (skratka HB): bod, ktorý má hmotnosť, ale jeho rozmery nás nezaujímajú. Ak sa pohyb opakuje úplne presne, stále rovnako, ide o periodické kmitanie. Práve tým sa budeme zaoberať.\n\n' +
      'Každé kmitanie má jedno „pokojné“ miesto, okolo ktorého sa teleso hýbe. Volá sa rovnovážna poloha. Keby si teleso do nej opatrne položil a nedotkol sa ho, zostalo by tam stáť.\n\n' +
      'Prečo nás to zaujíma? Kmitanie je základ celej fyziky vĺn: zvuk, svetlo aj zemetrasenie sú kmitania, ktoré sa šíria. Bez kmitov nepochopíš vlny ani optiku.',
    analogy:
      'Hojdačka na ihrisku: rozhojdáš ju a ona chodí dopredu a dozadu okolo najnižšieho bodu. Najnižší bod je jej rovnovážna poloha. Rovnako kmitá kyvadlo hodín, struna gitary alebo závažie na pružine.',
    check: {
      q: 'Ktorý z týchto pohybov je periodické kmitanie?',
      options: [
        'Závažie na pružine, ktoré sa stále rovnako hýbe hore a dole',
        'Auto, ktoré ide rovno po diaľnici',
        'Kameň, ktorý padá z mosta',
        'Lopta, ktorá sa kotúľa z kopca',
      ],
      explain:
        'Periodické kmitanie sa presne opakuje okolo rovnovážnej polohy. Auto, padajúci kameň aj kotúľajúca sa lopta idú stále jedným smerom a nevracajú sa späť.',
    },
  },
  {
    title: 'Prečo to kmitá? Obnovovacia sila',
    text:
      'Zaves závažie na pružinu a nechaj ho visieť: je v pokoji, v rovnovážnej polohe. Teraz ho potiahni o kúsok dole. Pružina sa natiahne a začne ho ťahať hore, späť. Keď ho naopak zdvihneš, pružina ho tlačí dole.\n\n' +
      'Takáto sila sa volá obnovovacia sila, lebo „obnovuje“ pôvodný stav. Podľa prednášky sa snaží dostať teleso do rovnovážnej polohy, závisí od výchylky a má opačný smer ako výchylka. Rovnovážna poloha je presne to miesto, kde je obnovovacia sila nulová.\n\n' +
      'Výchylka y je vzdialenosť telesa od rovnovážnej polohy so znamienkom (napr. nad ňou kladná, pod ňou záporná). Na obrázku je výchylka ružová úsečka a sila zelená šípka. Všimni si, že šípka ukazuje vždy k žltej čiarkovanej čiare (rovnováha) a je tým dlhšia, čím ďalej je závažie.\n\n' +
      'Prečo sa závažie v rovnovážnej polohe nezastaví? Lebo tam prilieta s rýchlosťou a teleso v pohybe chce pokračovať (zotrvačnosť). Prestrelí na druhú stranu, tam ho sila zabrzdí a otočí, a celé sa to opakuje.',
    analogy:
      'Gulička v miske: kdekoľvek ju na stene misky pustíš, skotúľa sa dole, prebehne cez dno na druhú stranu a vráti sa. Dno misky je rovnovážna poloha a šikmá stena misky „vyrába“ obnovovaciu silu.',
    fig: 'spring',
    formula: {
      f: 'F = −k · y',
      what: 'Sila pružiny (Hookov zákon), najznámejšia obnovovacia sila',
      vars: [
        ['F', 'obnovovacia sila [N, newton]'],
        ['k', 'tuhosť pružiny [N/m]: koľko newtonov treba na natiahnutie o 1 meter. Tvrdá pružina má veľké k, mäkká malé.'],
        ['y', 'výchylka z rovnovážnej polohy [m], môže byť kladná aj záporná'],
        ['−', 'mínus znamená „opačným smerom ako výchylka“. Nie je to chyba, je to podstata kmitania!'],
      ],
    },
    deeper:
      'Podľa 2. Newtonovho zákona je zrýchlenie a = F/m. Pre pružinu teda a = −(k/m)·y: zrýchlenie je úmerné výchylke a má opačné znamienko. Práve táto vlastnosť zaručí, že pohyb bude pekný sínus (harmonické kmitanie). Neskôr z nej odvodíme aj ω = √(k/m).\n\n' +
      'Obnovovacia sila nemusí byť len od pružiny. Na prednáške je aj gravitácia: Slnko ťahá Zem silou F = −G·M·m·r⃗/r³, kde r⃗ je vektor od Slnka k Zemi. Mínus opäť znamená „späť k stredu“. Rovnaký nápad použijeme na konci lekcie pri tuneli cez Zem.',
    check: {
      q: 'Pružina má tuhosť k = 50 N/m. Závažie potiahneš 4 cm pod rovnovážnu polohu. Aká sila naň pôsobí?',
      options: ['2 N smerom hore', '200 N smerom hore', '2 N smerom dole', '12,5 N smerom hore'],
      explain:
        'Najprv jednotky: 4 cm = 0,04 m. Veľkosť sily je k·|y| = 50 N/m · 0,04 m = 2 N. Smer je opačný ako výchylka: závažie je dole, sila ťahá hore. (200 N vyjde, ak zabudneš previesť cm na m.)',
    },
  },
  {
    title: 'Perióda a frekvencia',
    text:
      'Jeden kmit je celý pohyb tam a späť: teleso vyjde z nejakého miesta a vráti sa doň tak, že sa hýbe rovnakým smerom ako na začiatku. Čas jedného kmitu sa volá perióda a označuje sa T. Jednotka je sekunda (s).\n\n' +
      'Frekvencia f hovorí, koľko kmitov stihne teleso za 1 sekundu. Jednotka je hertz (Hz), pričom 1 Hz = 1 s⁻¹ = jeden kmit za sekundu. Perióda a frekvencia sú prevrátené hodnoty: čím kratšie trvá jeden kmit, tým viac ich stihne za sekundu.\n\n' +
      'Príklad z prednášky: kmitanie s periódou T = 5 s má frekvenciu f = 1/5 = 0,2 Hz, teda za 1 sekundu prebehne len 0,2 kmitu. Na obrázku prepínaj T na 1, 2 alebo 3 s. Žltá úsečka ukazuje dĺžku jednej periódy, zelená amplitúdu A (najväčšiu výchylku) a v popise vidíš príslušnú frekvenciu.',
    fig: 'period',
    formula: {
      f: 'f = 1 / T     f = N / t     T = t / N',
      what: 'Frekvencia a perióda',
      vars: [
        ['f', 'frekvencia [Hz = s⁻¹], počet kmitov za 1 s'],
        ['T', 'perióda [s], čas jedného kmitu'],
        ['N', 'počet kmitov (číslo bez jednotky)'],
        ['t', 'čas, za ktorý teleso urobí N kmitov [s]'],
      ],
    },
    worked: {
      q: 'Oscilátor vykoná za čas t = 1 min presne N = 60 kmitov. Aká je jeho frekvencia a perióda? (časť príkladu 4 z 1. cvičenia)',
      steps: [
        'Vieme: N = 60 kmitov, t = 1 min. Hľadáme: f a T.',
        'Najprv jednotky: frekvencia je „za sekundu“, preto prevedieme čas: t = 1 min = 60 s.',
        'Použijeme f = N/t, lebo frekvencia je počet kmitov za jednotku času: f = 60 / 60 s = 1 s⁻¹ = 1 Hz.',
        'Perióda je prevrátená hodnota: T = 1/f = 1 / (1 Hz) = 1 s.',
        'Kontrola: 60 kmitov po 1 s trvá spolu 60 s = 1 min. Sedí.',
      ],
      result: 'f = 1 Hz, T = 1 s (jeden kmit za sekundu).',
    },
    deeper:
      'Periodické kmitanie má na prednáške presnú podmienku: P(t) = P(t + T). Slovami: kde je teleso v ľubovoľnom okamihu t, tam bude aj o jednu periódu neskôr. Preto sa graf kmitania skladá z rovnakých kúskov dĺžky T, ktoré sa opakujú.\n\n' +
      'Prečo f = 1/T? Ak jeden kmit trvá T sekúnd, za 1 sekundu sa ich zmestí 1/T. Napríklad pri T = 0,25 s sa za sekundu zmestia 4 kmity, teda f = 4 Hz.',
    check: {
      q: 'Jeden kmit trvá T = 0,5 s. Aká je frekvencia?',
      options: ['2 Hz', '0,5 Hz', '5 Hz', '0,2 Hz'],
      explain: 'f = 1/T = 1 / 0,5 s = 2 Hz. Za sekundu stihne dva kmity.',
    },
  },
  {
    title: 'Kružnica, sínus a radiány',
    text:
      'Predstav si bod, ktorý rovnomerne obieha po kružnici s polomerom A. Keď sa naň pozrieš presne zboku, krúženie nevidíš, vidíš len, ako ide hore a dole. Tento „tieň“ kmitá a je to presne harmonické kmitanie, najdôležitejší typ kmitania.\n\n' +
      'Na obrázku modrý bod obieha po kružnici. Žltá čiarkovaná čiara prenáša jeho výšku na zvislú os, kde žltý bod (tieň) kmitá hore a dole. Keď výšku kreslíme v čase, vznikne ružová vlnovka, sínusoida. Prepínačom ω zrýchliš obiehanie a prepínačom A zmeníš polomer kružnice, a tým aj rozkmit.\n\n' +
      'Výška bodu je y = A·sin φ, kde φ je uhol, o ktorý sa bod otočil. Vo fyzike kmitov meriame uhly v radiánoch, nie v stupňoch: celá otočka (360°) je 2π radiánov a polovica (180°) je π radiánov. π ≈ 3,14 je len číslo, takže aj uhol v radiánoch je obyčajné číslo.\n\n' +
      'POZOR, najčastejšia chyba: kalkulačka musí byť prepnutá na radiány (RAD, nie DEG). Inak ti sin(π/2) vyjde 0,027 namiesto 1 a celý príklad je zle.',
    analogy:
      'Kolotoč večer: ak sa naň pozeráš presne zboku a na koníku svieti lampa, vidíš, ako sa svetielko pohybuje len doľava a doprava. Krúženie sa pri pohľade z boku „zmení“ na kmitanie.',
    fig: 'fyz:kmity',
    formula: {
      f: 'y = A · sin φ     2π rad = 360°     π rad = 180°     1 rad ≈ 57,3°',
      what: 'Výška bodu na kružnici a prevod uhlov',
      vars: [
        ['y', 'výška bodu nad stredom kružnice = výchylka [m]'],
        ['A', 'polomer kružnice = amplitúda [m]'],
        ['φ', 'uhol otočenia [rad] (čítaj „fí“)'],
        ['rad', 'radián, jednotka uhla; 2π rad je celá otočka'],
      ],
    },
    bullets: [
      'π/2 rad = 90°, π/4 rad = 45°, 3π/2 rad = 270°',
      'sin 0 = 0, sin(π/2) = 1, sin π = 0, sin(3π/2) = −1',
      'sínus je vždy medzi −1 a +1, preto y je vždy medzi −A a +A',
      'po celej otočke sa všetko opakuje: sin(φ + 2π) = sin φ',
    ],
    deeper:
      'Prečo práve sínus? Spoj stred kružnice s bodom: to je polomer A, prepona pravouhlého trojuholníka. Výška bodu y je odvesna oproti uhlu φ. V pravouhlom trojuholníku platí sin φ = protiľahlá odvesna / prepona = y/A, takže y = A·sin φ.\n\n' +
      'Čo je radián? Uhol v radiánoch je dĺžka oblúka delená polomerom. Celý obvod kružnice má dĺžku 2π·r, takže celá otočka je 2π·r / r = 2π rad. Prevod: uhol v stupňoch = uhol v radiánoch · 180/π.',
    check: {
      q: 'Na kalkulačke ti sin(π/2) vyšlo 0,027. Čo je zle?',
      options: [
        'Kalkulačka počíta v stupňoch (DEG), treba ju prepnúť na radiány (RAD)',
        'Nič, sin(π/2) naozaj je 0,027',
        'Treba π/2 ešte vynásobiť dvoma',
        'Sínus sa v radiánoch nedá počítať',
      ],
      explain:
        'sin(π/2) = sin 90° = 1. Kalkulačka v režime DEG chápe π/2 ≈ 1,57 ako 1,57 stupňa a sin 1,57° ≈ 0,027. Vo fyzike kmitov vždy prepni na RAD.',
    },
  },
  {
    title: 'Rovnica harmonického kmitania a amplitúda',
    text:
      'Bod na kružnici sa otáča rovnomerne, takže jeho uhol rastie s časom stále rovnako rýchlo. Ak sa za každú sekundu otočí o uhol ω a na začiatku (v čase t = 0) už bol natočený o uhol φ₀, tak v čase t je jeho uhol ω·t + φ₀. Dosadíme to do y = A·sin φ a máme rovnicu harmonického kmitania.\n\n' +
      'Túto rovnicu sa nauč naspamäť, takmer každý príklad začína ňou. Celý výraz v zátvorke, ω·t + φ₀, sa volá fáza kmitania: je to „uhol“, v ktorom je kmit práve teraz. Počiatočná fáza φ₀ je fáza v čase t = 0.\n\n' +
      'Amplitúda A je najväčšia výchylka, akú teleso dosiahne, takže sa hýbe medzi polohami −A a +A. Amplitúda je VŽDY kladná: je to veľkosť rozkmitu, ako polomer kružnice. Ak zadanie povie „maximálna záporná výchylka je −8 cm“, amplitúda je 8 cm.',
    formula: {
      f: 'y = A · sin(ω·t + φ₀)',
      what: 'Rovnica jednoduchého harmonického kmitania',
      vars: [
        ['y', 'okamžitá výchylka v čase t [m], môže byť kladná aj záporná'],
        ['A', 'amplitúda = najväčšia výchylka [m], vždy kladná'],
        ['ω', 'uhlová frekvencia [rad/s] (čítaj „omega“): o koľko radiánov narastie uhol za 1 s'],
        ['t', 'čas [s]'],
        ['φ₀', 'počiatočná fáza [rad]: fáza v čase t = 0'],
        ['ω·t + φ₀', 'fáza kmitania φ(t) [rad]'],
      ],
    },
    worked: {
      q: 'Ukáž, že amplitúda A v rovnici y = A·sin(ω·t + φ₀) je rovná najväčšej výchylke y_max. (príklad 1 z 1. cvičenia)',
      steps: [
        'Vieme: y = A·sin(ω·t + φ₀), kde A > 0. Hľadáme: najväčšiu možnú hodnotu y.',
        'Výchylka je súčin čísla A a sínusu. A sa s časom nemení, mení sa len sínus.',
        'Sínus akéhokoľvek uhla je vždy medzi −1 a +1: −1 ≤ sin(ω·t + φ₀) ≤ 1.',
        'Celú nerovnicu vynásobíme kladným číslom A (znamienka nerovnosti sa nezmenia): −A ≤ y ≤ A.',
        'Najväčšia hodnota y nastane, keď je sínus rovný 1, a vtedy y = A·1 = A. Stane sa to napríklad, keď je fáza π/2.',
      ],
      result: 'y_max = A. Amplitúda je najväčšia výchylka a teleso kmitá medzi −A a +A.',
    },
    deeper:
      'Prečo „harmonické“? Sínus a kosínus sa v matematike volajú harmonické funkcie. Kmitanie, ktoré sa dá opísať jednou takou funkciou, je jednoduché harmonické kmitanie.\n\n' +
      'Sínus a kosínus majú rovnaký tvar, sú len posunuté o π/2. Preto sa harmonické kmitanie dá zapísať aj kosínusom. Ako sa medzi nimi prechádza, uvidíš o tri kroky ďalej.',
    check: {
      q: 'Oscilátor sa najviac vychýli do polohy −8 cm (najväčšia záporná výchylka). Aká je amplitúda?',
      options: ['8 cm', '−8 cm', '16 cm', '4 cm'],
      explain:
        'Amplitúda je veľkosť najväčšej výchylky, vždy kladná. Teleso kmitá medzi −8 cm a +8 cm, takže A = 8 cm. (16 cm je vzdialenosť medzi krajnými polohami, nie amplitúda.)',
    },
  },
  {
    title: 'Uhlová frekvencia ω',
    text:
      'Jeden celý kmit zodpovedá jednej celej otočke bodu po kružnici, teda uhlu 2π radiánov. Ak teleso urobí f kmitov za sekundu, uhol (fáza) narastie každú sekundu o f-krát 2π. Toto číslo je uhlová frekvencia ω.\n\n' +
      'Príklad z prednášky: 5 kmitov za sekundu (f = 5 Hz) znamená, že fáza narastie za sekundu o 5·2π = 10π rad. Teda ω = 10π rad/s ≈ 31,4 rad/s.\n\n' +
      'Pozor, ω a f nie sú to isté! Obe hovoria, ako rýchlo to kmitá, ale ω je 2π-krát väčšia. Keď v rovnici vidíš sin(4π·t), tak ω = 4π rad/s, ale f = 2 Hz. Typická chyba je napísať f = 4π alebo ω = 2.',
    formula: {
      f: 'ω = 2π · f     ω = 2π / T     T = 2π / ω',
      what: 'Prepočet medzi ω, f a T',
      vars: [
        ['ω', 'uhlová frekvencia [rad/s = rad·s⁻¹]'],
        ['2π', 'uhol jednej celej otočky (jedného kmitu) v radiánoch'],
        ['f', 'frekvencia [Hz]'],
        ['T', 'perióda [s]'],
      ],
    },
    worked: {
      q: 'Ukáž, že medzi uhlovou frekvenciou a periódou harmonického kmitania platí T = 2π/ω. (príklad 2 z 1. cvičenia)',
      steps: [
        'Vieme: y = A·sin(ω·t + φ₀) a že sínus sa zopakuje po uhle 2π. Hľadáme: vzťah medzi T a ω.',
        'Za jednu periódu T sa teleso vráti do rovnakého stavu, takže fáza musí narásť presne o jednu celú otočku, teda o 2π.',
        'Fáza v čase t je ω·t + φ₀. Fáza v čase t + T je ω·(t + T) + φ₀ = ω·t + φ₀ + ω·T.',
        'Rozdiel týchto fáz je ω·T a ten sa musí rovnať 2π: ω·T = 2π.',
        'Vydelíme ω: T = 2π/ω. A keďže f = 1/T, dostaneme aj ω = 2π·f.',
      ],
      result: 'T = 2π/ω (a z toho ω = 2π·f = 2π/T).',
    },
    deeper:
      'Prečo sa ω volá „uhlová“? V obraze kružnice je ω uhlová rýchlosť bodu, ktorý obieha: za sekundu sa otočí o ω radiánov. Celú otočku (2π) teda spraví za čas 2π/ω, a to je perióda.\n\n' +
      'Jednotka rad/s sa niekedy píše len s⁻¹, lebo radián je bezrozmerný. Na skúške ale píš rad/s alebo rad·s⁻¹, aby bolo jasné, že ide o ω, a nie o f.',
    check: {
      q: 'Oscilátor kmitá s frekvenciou f = 2 Hz. Aká je jeho uhlová frekvencia?',
      options: ['4π rad/s ≈ 12,6 rad/s', '2 rad/s', '2π rad/s ≈ 6,3 rad/s', 'π rad/s ≈ 3,1 rad/s'],
      explain: 'ω = 2π·f = 2π·2 = 4π rad/s ≈ 12,57 rad/s. Frekvenciu treba vždy vynásobiť 2π.',
    },
  },
  {
    title: 'Fáza a počiatočná fáza: rozober rovnicu',
    text:
      'Fáza φ(t) = ω·t + φ₀ hovorí, v ktorej časti kmitu teleso práve je. Fáza 0 znamená, že teleso prechádza rovnovážnou polohou smerom nahor, π/2 je horná krajná poloha, π opäť stred (smerom nadol) a 3π/2 dolná krajná poloha. Fáza rastie s časom rovnomerne (je to lineárna funkcia času) a jej jednotka je radián.\n\n' +
      'Počiatočná fáza φ₀ je fáza v čase t = 0, teda „kde kmit začal“. Na grafe posúva sínus doľava: graf A·sin(ω·t + φ₀) je oproti A·sin(ω·t) posunutý doľava, ak je φ₀ kladná. Záporná φ₀ ho posúva doprava.\n\n' +
      'Ako rozobrať zadanú rovnicu? Prilož ju k vzoru y = A·sin(ω·t + φ₀): číslo pred sínusom je A, číslo pri t je ω a zvyšok v zátvorke je φ₀. Potom dopočítaj f = ω/(2π) a T = 1/f. Výchylku v nejakom čase dostaneš tak, že ten čas dosadíš.',
    formula: {
      f: 'φ(t) = ω·t + φ₀     f = ω / (2π)     T = 1 / f',
      what: 'Fáza a čo všetko z rovnice vyčítaš',
      vars: [
        ['φ(t)', 'fáza v čase t [rad]'],
        ['φ₀', 'počiatočná fáza = fáza v čase t = 0 [rad]'],
        ['ω', 'číslo pri t v zátvorke [rad/s]'],
      ],
    },
    worked: {
      q: 'Závažie na pružinke kmitá podľa y(t) = 0,2 cm · sin(4π rad·s⁻¹ · t − π/4 rad). Nájdi amplitúdu, uhlovú frekvenciu, frekvenciu, periódu, fázu v okamihu t = 0 a výchylku v okamihu t = 0. (príklad 3 z 1. cvičenia)',
      steps: [
        'Vieme: y(t) = 0,2 cm · sin(4π·t − π/4). Hľadáme: A, ω, f, T, φ(0), y(0).',
        'Porovnáme so vzorom y = A·sin(ω·t + φ₀). Číslo pred sínusom: A = 0,2 cm.',
        'Číslo pri t: ω = 4π rad/s (≈ 12,57 rad/s).',
        'Frekvencia: f = ω/(2π) = 4π/(2π) = 2 Hz. Perióda: T = 1/f = 1/2 = 0,5 s.',
        'Zvyšok v zátvorke je φ₀. Pozor na znamienko: „− π/4“ je to isté ako „+ (−π/4)“, takže φ₀ = −π/4 rad. Fáza v čase t = 0 je φ(0) = 4π·0 − π/4 = −π/4 rad.',
        'Výchylka v čase t = 0: dosadíme t = 0, y(0) = 0,2 cm · sin(−π/4) = 0,2 cm · (−√2/2) ≈ 0,2 · (−0,707) ≈ −0,14 cm.',
        'Kontrola: |y(0)| = 0,14 cm je menej ako A = 0,2 cm, to sedí. Záporné znamienko znamená, že na začiatku je teleso pod rovnovážnou polohou.',
      ],
      result: 'A = 0,2 cm, ω = 4π rad/s, f = 2 Hz, T = 0,5 s, φ(0) = −π/4 rad, y(0) ≈ −0,14 cm.',
    },
    deeper:
      'Prečo počiatočná fáza posúva graf doľava? Graf A·sin(ω·t + φ₀) prechádza nulou smerom nahor (začiatok kmitu) vtedy, keď ω·t + φ₀ = 0, teda v čase t = −φ₀/ω. Pre kladné φ₀ je to záporný čas, kmit „začal skôr“, a preto je celý graf posunutý doľava.\n\n' +
      'Čo ak je pred sínusom záporné číslo, napr. y = −3 cm · sin(ω·t)? Amplitúda nesmie byť záporná, preto mínus „schováme“ do fázy pomocou −sin x = sin(x + π). Teda y = 3 cm · sin(ω·t + π), takže A = 3 cm a φ₀ = π.',
    check: {
      q: 'Okamžitá výchylka je y = 5 cm · sin(2π rad·s⁻¹ · t + 3π/2 rad). Aká je výchylka v okamihu t = 8/3 s? (príklad z prednášky)',
      options: ['2,5 cm', '5 cm', '−2,5 cm', '0 cm'],
      explain:
        'Fáza: 2π·8/3 + 3π/2 = 16π/3 + 3π/2 = 32π/6 + 9π/6 = 41π/6. Odčítame celé otočky (6π = 36π/6) a zostane 5π/6, teda 150°. sin(5π/6) = 0,5, takže y = 5 cm · 0,5 = 2,5 cm.',
    },
  },
  {
    title: 'Sínus alebo kosínus? Zostav rovnicu sám',
    text:
      'Harmonické kmitanie sa dá zapísať sínusom aj kosínusom. Kosínus je totiž len sínus posunutý o π/2 (štvrť otočky): cos x = sin(x + π/2). Obe funkcie majú rovnaký tvar vlny a líšia sa len tým, kde začínajú: sínus v nule, kosínus v maxime.\n\n' +
      'Na cvičení preto stretneš aj tvar y = A·cos(ω·t + φ₀). Písmená znamenajú presne to isté: A je amplitúda, ω uhlová frekvencia a φ₀ počiatočná fáza (fáza v čase t = 0, len teraz vo vnútri kosínusu).\n\n' +
      'Opačná úloha k rozboru rovnice je zostaviť rovnicu zo slovného zadania. Postup je vždy rovnaký: z počtu kmitov a času nájdi f a potom ω = 2π·f. Z najväčšej výchylky urč amplitúdu (kladnú!) a z údaja o začiatku počiatočnú fázu.',
    formula: {
      f: 'y = A · cos(ω·t + φ₀)     cos x = sin(x + π/2)     sin x = cos(x − π/2)',
      what: 'Kosínusový tvar a prevod medzi sínusom a kosínusom',
      vars: [
        ['cos', 'kosínus: rovnaký tvar ako sínus, posunutý o π/2'],
        ['A, ω, φ₀', 'rovnaký význam ako pri sínuse'],
      ],
    },
    worked: {
      q: 'Harmonický oscilátor kmitá podľa y(t) = ? · cos(? + ?). Nahraď otázniky, ak vieš: za čas t = 1 min vykoná N = 60 kmitov, maximálna záporná výchylka je −8 cm a fáza v okamihu t = 0 je 3π/2 rad. (príklad 4 z 1. cvičenia)',
      steps: [
        'Vieme: t = 1 min = 60 s, N = 60, najväčšia záporná výchylka −8 cm, fáza v t = 0 je 3π/2 rad. Hľadáme: A, ω, φ₀ a celú rovnicu.',
        'Frekvencia: f = N/t = 60 / 60 s = 1 Hz. Uhlová frekvencia: ω = 2π·f = 2π·1 = 2π rad/s.',
        'Amplitúda: teleso ide najďalej do −8 cm, takže kmitá medzi −8 cm a +8 cm. A = 8 cm (kladná!).',
        'Počiatočná fáza je fáza v čase t = 0: φ₀ = 3π/2 rad.',
        'Dosadíme do vzoru: y(t) = 8 cm · cos(2π rad·s⁻¹ · t + 3π/2 rad).',
        'Kontrola: y(0) = 8 cm · cos(3π/2) = 8 cm · 0 = 0, kmit začína v rovnovážnej polohe. Navyše cos(x + 3π/2) = sin x, takže je to to isté ako y = 8 cm · sin(2π·t), čo naozaj začína v nule.',
      ],
      result: 'y(t) = 8 cm · cos(2π rad·s⁻¹ · t + 3π/2 rad), čo sa dá zjednodušiť na y(t) = 8 cm · sin(2π rad·s⁻¹ · t).',
    },
    deeper:
      'Odkiaľ je cos(x + 3π/2) = sin x? Použijeme rozkladací vzorec cos(α + β) = cos α · cos β − sin α · sin β. Pre β = 3π/2 je cos(3π/2) = 0 a sin(3π/2) = −1, takže cos(x + 3π/2) = cos x · 0 − sin x · (−1) = sin x.\n\n' +
      'Rovnako sa odvodí cos x = sin(x + π/2): sin(x + π/2) = sin x · cos(π/2) + cos x · sin(π/2) = sin x · 0 + cos x · 1 = cos x. Tieto vzorce nájdeš v učiteľovom súbore „Užitočné goniometrické vzorčeky“.',
    check: {
      q: 'Teleso kmitá podľa y = 3 cm · cos(ω·t). Kde je v čase t = 0?',
      options: [
        'V hornej krajnej polohe, y = 3 cm',
        'V rovnovážnej polohe, y = 0',
        'V dolnej krajnej polohe, y = −3 cm',
        'Nedá sa to určiť',
      ],
      explain: 'cos 0 = 1, takže y(0) = 3 cm · 1 = 3 cm. Kosínus začína v maxime, sínus v nule.',
    },
  },
  {
    title: 'Rýchlosť a zrýchlenie',
    text:
      'Kedy ide kmitajúce teleso najrýchlejšie? Na obrázku je ružová krivka výchylka y, zelená rýchlosť v a žltá zrýchlenie a, pod sebou v rovnakom čase. Keď je výchylka najväčšia (krajná poloha), teleso sa na okamih zastaví a otáča smer, takže v = 0. Keď prechádza stredom (y = 0), letí najrýchlejšie.\n\n' +
      'So zrýchlením je to naopak. Zrýchlenie spôsobuje sila a obnovovacia sila F = −k·y je najväčšia v krajnej polohe, takže tam je najväčšie aj zrýchlenie. V strede je sila nulová, a teda aj zrýchlenie. Zrýchlenie má vždy opačné znamienko ako výchylka: a = −ω²·y.\n\n' +
      'V obraze kružnice: bod obieha stálou obvodovou rýchlosťou A·ω. Jeho tieň má celú túto rýchlosť práve vtedy, keď bod prechádza bokom kružnice, a to je stred kmitu. Preto v_max = A·ω. Podobne dostredivé zrýchlenie bodu na kružnici je A·ω², a to je najväčšie zrýchlenie kmitu.',
    fig: 'yva',
    formula: {
      f: 'v = A·ω · cos(ω·t + φ₀)     a = −A·ω² · sin(ω·t + φ₀) = −ω²·y     v_max = A·ω     a_max = A·ω²',
      what: 'Rýchlosť a zrýchlenie harmonického kmitania',
      vars: [
        ['v', 'okamžitá rýchlosť [m/s]'],
        ['a', 'okamžité zrýchlenie [m/s²]'],
        ['A·ω', 'amplitúda rýchlosti = najväčšia rýchlosť (v rovnovážnej polohe)'],
        ['A·ω²', 'amplitúda zrýchlenia = najväčšie zrýchlenie (v krajnej polohe)'],
      ],
    },
    worked: {
      q: 'Harmonicky kmitajúcemu oscilátoru sme v istom okamihu namerali: vzdialenosť od rovnovážnej polohy |x| = 4·10⁻² m, veľkosť rýchlosti |v| = 0,05 m/s, veľkosť zrýchlenia |a| = 0,8 m/s². Aká je amplitúda, uhlová frekvencia, perióda, maximálna rýchlosť a maximálne zrýchlenie? (príklad 1 z 2. cvičenia)',
      steps: [
        'Vieme: |x| = 0,04 m, |v| = 0,05 m/s, |a| = 0,8 m/s², všetko v tom istom okamihu (výchylka sa tu volá x). Hľadáme: ω, A, T, v_max, a_max.',
        'Najprv ω. Použijeme a = −ω²·x, lebo spája zrýchlenie a výchylku a neobsahuje neznámu A. Pre veľkosti platí |a| = ω²·|x|, teda ω = √(|a| / |x|).',
        'Dosadíme: ω = √(0,8 m/s² / 0,04 m) = √(20 s⁻²) ≈ 4,47 rad/s.',
        'Amplitúda: použijeme A² = x² + v²/ω² (odvodenie je v „Prečo?“). A² = 0,04² + 0,05²/20 = 0,0016 + 0,000125 = 0,001725 m², takže A = √0,001725 ≈ 0,0415 m ≈ 4,15 cm.',
        'Perióda: T = 2π/ω = 2π / 4,47 ≈ 1,40 s.',
        'Maximálna rýchlosť: v_max = A·ω ≈ 0,0415 m · 4,47 s⁻¹ ≈ 0,19 m/s. Maximálne zrýchlenie: a_max = A·ω² ≈ 0,0415 m · 20 s⁻² ≈ 0,83 m/s².',
        'Kontrola: A = 4,15 cm je len o kúsok viac ako |x| = 4 cm, teleso je blízko krajnej polohy. Preto je rýchlosť 0,05 m/s malá oproti v_max a zrýchlenie 0,8 m/s² je blízko a_max. Všetko do seba zapadá.',
      ],
      result: 'ω ≈ 4,47 rad/s, A ≈ 4,15 cm, T ≈ 1,40 s, v_max ≈ 0,19 m/s, a_max ≈ 0,83 m/s².',
    },
    deeper:
      'Odkiaľ sú vzorce pre v a a? Bod na kružnici prejde obvod 2π·A za čas T, takže má obvodovú rýchlosť 2π·A/T = A·ω. Jej zvislá zložka, ktorú vidí tieň, je A·ω·cos φ. Dostredivé zrýchlenie bodu je A·ω² a smeruje do stredu, jeho zvislá zložka je −A·ω²·sin φ. Ak vieš derivovať, v = dy/dt a a = dv/dt dajú presne to isté.\n\n' +
      'Odkiaľ je A² = y² + v²/ω²? Z rovníc máme y/A = sin(ω·t + φ₀) a v/(A·ω) = cos(ω·t + φ₀). Pre každý uhol platí sin² + cos² = 1, takže (y/A)² + (v/(A·ω))² = 1. Po vynásobení A² dostaneme y² + v²/ω² = A².\n\n' +
      'A prečo a = −ω²·y? Stačí porovnať: y = A·sin(…) a a = −A·ω²·sin(…) = −ω²·(A·sin(…)) = −ω²·y.',
    check: {
      q: 'Kde má harmonický oscilátor nulovú rýchlosť a najväčšie zrýchlenie?',
      options: [
        'V krajnej polohe (y = ±A)',
        'V rovnovážnej polohe (y = 0)',
        'V polovici amplitúdy (y = A/2)',
        'Nikde, oboje je stále rovnaké',
      ],
      explain:
        'V krajnej polohe sa teleso zastaví a otočí (v = 0). Pružina je tam najviac natiahnutá alebo stlačená, takže sila aj zrýchlenie sú najväčšie: |a| = ω²·A.',
    },
  },
  {
    title: 'Pružinový oscilátor: od čoho závisí perióda',
    text:
      'Pružinový harmonický oscilátor (skratka PHO) je závažie s hmotnosťou m na pružine s tuhosťou k. Je to učebnicový príklad harmonického kmitania. Otázka znie: ako rýchlo bude kmitať? Odpoveď: ω = √(k/m).\n\n' +
      'Dáva to zmysel. Tvrdšia pružina (väčšie k) ťahá silnejšie, závažie rýchlejšie otáča smer a kmitá rýchlejšie, takže perióda je kratšia. Ťažšie závažie (väčšie m) sa ťažšie rozbieha aj brzdí, kmitá pomalšie a perióda je dlhšia.\n\n' +
      'Zaujímavosť: perióda vôbec nezávisí od amplitúdy! Či závažie potiahneš o 1 cm alebo o 5 cm, jeden kmit trvá rovnako dlho. Pri väčšej amplitúde má teleso dlhšiu cestu, ale ide aj rýchlejšie. Pozor na jednotky: hmotnosť vždy v kilogramoch (100 g = 0,1 kg) a tuhosť v N/m.',
    formula: {
      f: 'ω = √(k / m)     T = 2π · √(m / k)     k = m · ω²',
      what: 'Pružinový harmonický oscilátor',
      vars: [
        ['k', 'tuhosť pružiny [N/m]'],
        ['m', 'hmotnosť závažia [kg]'],
        ['ω', 'uhlová frekvencia [rad/s]'],
        ['T', 'perióda [s]'],
      ],
    },
    worked: {
      q: 'Aká je perióda harmonických kmitov závažia s hmotnosťou 0,1 kg na pružine s tuhosťou 10 N/m? (príklad 2 z 2. cvičenia)',
      steps: [
        'Vieme: m = 0,1 kg, k = 10 N/m. Hľadáme: T.',
        'Použijeme T = 2π·√(m/k), lebo poznáme práve m a k pružinového oscilátora.',
        'Podiel pod odmocninou: m/k = 0,1 kg / (10 N/m) = 0,01 s² (lebo N = kg·m/s², a teda kg / (N/m) = s²).',
        'Odmocnina: √(0,01 s²) = 0,1 s.',
        'T = 2π · 0,1 s = 0,2π s ≈ 0,63 s.',
        'Kontrola inou cestou: ω = √(k/m) = √100 = 10 rad/s a T = 2π/ω = 2π/10 ≈ 0,63 s. Sedí.',
      ],
      result: 'T = 0,2π s ≈ 0,63 s.',
    },
    deeper:
      'Odvodenie ω = √(k/m): Podľa 2. Newtonovho zákona m·a = F a pre pružinu F = −k·y, takže m·a = −k·y. Z harmonického kmitania zároveň vieme, že a = −ω²·y. Dosadíme: m·(−ω²·y) = −k·y a po vydelení −y dostaneme m·ω² = k, teda ω = √(k/m).\n\n' +
      'Keď poznáme ω, perióda je T = 2π/ω = 2π/√(k/m) = 2π·√(m/k). Vzťah k = m·ω² sa hodí, keď máš zistiť tuhosť pružiny z nameraného kmitania.',
    check: {
      q: 'Závažie s hmotnosťou 100 g na pružine harmonicky kmitá s maximálnou rýchlosťou v_max = 0,1 m/s a maximálnou výchylkou x_max = 1 cm. Aká je tuhosť pružiny? (príklad 4 z 2. cvičenia)',
      options: ['10 N/m', '1 N/m', '100 N/m', '0,1 N/m'],
      explain:
        'Jednotky: m = 0,1 kg, A = x_max = 0,01 m. Z v_max = A·ω je ω = v_max/A = 0,1 / 0,01 = 10 rad/s. Potom k = m·ω² = 0,1 kg · 100 s⁻² = 10 N/m.',
    },
  },
  {
    title: 'Energia: prelieva sa, ale nemizne',
    text:
      'Kmitajúce závažie má dva druhy energie. Kinetická (pohybová) energia Ek = ½·m·v² závisí od rýchlosti. Potenciálna energia Ep = ½·k·y² je uložená v pružine a závisí od toho, ako veľmi je natiahnutá alebo stlačená.\n\n' +
      'Počas kmitu sa energia neustále prelieva. V krajnej polohe je v = 0, takže všetka energia je potenciálna: E = ½·k·A². V rovnovážnej polohe je y = 0, takže všetka energia je kinetická: E = ½·m·v_max². Na obrázku sa striedajú zelený stĺpec Ek a ružový Ep, ale žltý stĺpec ich súčtu E sa nemení.\n\n' +
      'Celková mechanická energia sa nemení, lebo amplitúda je konštantná (trenie zanedbávame). Všimni si, že E závisí od A²: dvojnásobná amplitúda znamená štvornásobnú energiu.',
    analogy:
      'Peniaze v dvoch vreckách: raz máš všetko v ľavom (Ep), raz všetko v pravom (Ek), väčšinou časť tu a časť tam. Presúvaš ich sem a tam, ale spolu máš stále rovnakú sumu.',
    fig: 'energy',
    formula: {
      f: '½·k·A² = ½·m·v² + ½·k·y²     E = ½·k·A² = ½·m·v_max²',
      what: 'Zákon zachovania mechanickej energie PHO',
      vars: [
        ['½·k·A²', 'celková mechanická energia E [J], stále rovnaká'],
        ['½·m·v²', 'kinetická energia Ek [J]: najväčšia v strede'],
        ['½·k·y²', 'potenciálna energia Ep [J]: najväčšia v krajnej polohe'],
        ['μJ', 'mikrojoule, 1 μJ = 10⁻⁶ J'],
      ],
    },
    worked: {
      q: 'Aká je amplitúda harmonických kmitov, ak celková mechanická energia oscilátora je E = 10 μJ a obnovovacia sila dosahuje najväčšiu hodnotu F_max = 1·10⁻³ N? (príklad 5 z 2. cvičenia)',
      steps: [
        'Vieme: E = 10 μJ = 10·10⁻⁶ J = 1·10⁻⁵ J, F_max = 1·10⁻³ N. Hľadáme: A. Neznáme je aj k, ale to nevadí.',
        'Obe informácie zapíšeme vzorcami. Energia: E = ½·k·A². Najväčšia sila je pri najväčšej výchylke (y = A): F_max = k·A.',
        'Máme dve rovnice a dve neznáme (k a A). Trik: rovnice vydelíme a k sa vykráti: E / F_max = (½·k·A²) / (k·A) = ½·A.',
        'Vyjadríme A: A = 2·E / F_max.',
        'Dosadíme: A = 2 · 1·10⁻⁵ J / 1·10⁻³ N = 2·10⁻² m = 0,02 m = 2 cm (J/N = N·m/N = m).',
        'Kontrola: k = F_max/A = 10⁻³ / 0,02 = 0,05 N/m a E = ½ · 0,05 · 0,02² = 10⁻⁵ J = 10 μJ. Sedí.',
      ],
      result:
        'A = 0,02 m = 2 cm. (V zozname príkladov je preklep E = 10 J; s ním by vyšlo A = 20 km, čo je nezmysel. Učiteľ to v riešení opravil na 10 μJ.)',
    },
    deeper:
      'Odvodenie Ep a E (príklad 3 z 2. cvičenia): Aby si pružinu natiahol o y, musíš ťahať silou, ktorá rastie od 0 po k·y. Práca je plocha pod grafom sily, čo je trojuholník so základňou y a výškou k·y: W = ½·y·k·y = ½·k·y². Táto práca sa uloží v pružine ako potenciálna energia Ep = ½·k·y².\n\n' +
      'Celková energia je E = Ek + Ep = ½·m·v² + ½·k·y². V krajnej polohe je v = 0 a y = A, takže E = ½·k·A². Overenie dosadením: ½·m·(A·ω·cos)² + ½·k·(A·sin)² = ½·A²·(m·ω²·cos² + k·sin²) a keďže m·ω² = k, vyjde ½·k·A²·(cos² + sin²) = ½·k·A².\n\n' +
      'Z energie sa dá vyrátať aj rýchlosť v ľubovoľnej polohe: ½·m·v² = ½·k·(A² − y²), teda v = ω·√(A² − y²).',
    check: {
      q: 'Oscilátoru zdvojnásobíš amplitúdu (pružina je tá istá). Čo sa stane s jeho celkovou energiou?',
      options: ['Zväčší sa 4-krát', 'Zväčší sa 2-krát', 'Nezmení sa', 'Zmenší sa na polovicu'],
      explain: 'E = ½·k·A². Ak A → 2A, tak A² → 4A², a energia je teda 4-krát väčšia.',
    },
  },
  {
    title: 'Dve pružiny: za sebou a vedľa seba',
    text:
      'Často treba zistiť, ako sa správajú dve pružiny s tuhosťami k₁ a k₂ spolu. Chceme ich nahradiť jednou náhradnou pružinou s výslednou tuhosťou k, ktorá sa správa rovnako.\n\n' +
      'Za sebou (jedna visí na druhej): obe nesú tú istú silu a každá sa natiahne. Predĺženia sa sčítajú, takže celok sa natiahne viac, je MÄKŠÍ. Výsledná tuhosť je dokonca menšia ako tá menšia z k₁ a k₂.\n\n' +
      'Vedľa seba (obe držia závažie spolu): obe sa natiahnu rovnako a delia sa o záťaž. Sily sa sčítajú, celok je TVRDŠÍ a k = k₁ + k₂. Na obrázku vľavo kmitajú pružiny za sebou (viac a pomalšie), vpravo vedľa seba (menej a rýchlejšie).\n\n' +
      'Pozor: je to presne naopak ako pri odporoch v elektrine, kde sa sčítavajú odpory zapojené za sebou. Nemusíš sa to biflovať, stačí si to vždy rýchlo odvodiť (pozri príklad).',
    analogy:
      'Vedľa seba je ako keď ťažkú tašku nesú dvaja: každý ťahá menej a taška sa skoro nepohne (tvrdé). Za sebou je ako keď spojíš dve gumičky do jednej dlhšej: rovnakým ťahom ju natiahneš oveľa viac (mäkké).',
    fig: 'springs2',
    formula: {
      f: 'za sebou: 1/k = 1/k₁ + 1/k₂, teda k = k₁·k₂ / (k₁ + k₂)     vedľa seba: k = k₁ + k₂',
      what: 'Výsledná tuhosť dvoch pružín',
      vars: [
        ['k₁, k₂', 'tuhosti jednotlivých pružín [N/m]'],
        ['k', 'výsledná (náhradná) tuhosť [N/m]'],
      ],
    },
    worked: {
      q: 'Majme dve pružiny s tuhosťami k₁ a k₂. Akú výslednú tuhosť majú, keď sú zapojené (a) za sebou, (b) vedľa seba? Potom dosaď k₁ = 20 N/m a k₂ = 30 N/m. (príklad 5 z 1. cvičenia)',
      steps: [
        'Vieme: k₁, k₂ a Hookov zákon F = k·y (veľkosti). Hľadáme: také k, aby pre celú sústavu platilo F = k·y, kde y je celkové predĺženie.',
        '(a) Za sebou: obidvoma pružinami ide tá istá sila F. Prvá sa predĺži o y₁ = F/k₁, druhá o y₂ = F/k₂.',
        'Celkové predĺženie je súčet: y = y₁ + y₂ = F/k₁ + F/k₂. Náhradná pružina má y = F/k, takže F/k = F/k₁ + F/k₂. Po vydelení F: 1/k = 1/k₁ + 1/k₂.',
        '(b) Vedľa seba: obe sa predĺžia o rovnaké y. Prvá ťahá silou k₁·y, druhá k₂·y a spolu držia závažie: F = k₁·y + k₂·y = (k₁ + k₂)·y. Teda k = k₁ + k₂.',
        'Čísla pre (a): 1/k = 1/20 + 1/30 = 3/60 + 2/60 = 5/60, takže k = 60/5 = 12 N/m. (Alebo k = 20·30 / (20 + 30) = 600/50 = 12 N/m.)',
        'Čísla pre (b): k = 20 + 30 = 50 N/m.',
        'Kontrola: za sebou je 12 N/m menej ako 20 N/m (mäkšie), vedľa seba je 50 N/m viac ako 30 N/m (tvrdšie). Sedí.',
      ],
      result: '(a) za sebou: 1/k = 1/k₁ + 1/k₂ (pre čísla 12 N/m), (b) vedľa seba: k = k₁ + k₂ (pre čísla 50 N/m).',
    },
    deeper:
      'Čo to urobí s kmitaním? Perióda je T = 2π·√(m/k). Mäkšia sústava (za sebou) má menšie k, a teda dlhšiu periódu: kmitá pomalšie. Tvrdšia sústava (vedľa seba) kmitá rýchlejšie.\n\n' +
      'Pre dve rovnaké pružiny s tuhosťou k₀ je výsledok za sebou k₀/2 a vedľa seba 2·k₀. Perióda sa teda pri zapojení za sebou zväčší √2-krát a pri zapojení vedľa seba sa √2-krát zmenší.',
    check: {
      q: 'Dve rovnaké pružiny, každá s tuhosťou 40 N/m, zapojíš za sebou. Aká je výsledná tuhosť?',
      options: ['20 N/m', '80 N/m', '40 N/m', '1600 N/m'],
      explain:
        '1/k = 1/40 + 1/40 = 2/40 = 1/20, takže k = 20 N/m. Za sebou je to mäkšie, preto menej ako 40 N/m. (80 N/m by bolo vedľa seba.)',
    },
  },
  {
    title: 'Tunel cez Zem: nečakané kmitanie',
    text:
      'Príklad 6 z 3. cvičenia: medzi Bratislavou a Košicami je v zemi vyvŕtaný priamy tunel s koľajnicami. Vlak sa v ňom pustí z pokoja, bez motora, bez trenia a bez odporu vzduchu. Ako dlho by trvala cesta?\n\n' +
      'Kľúčová myšlienka: vo vnútri Zeme ťahá gravitácia vlak k stredu Zeme. Zložka tejto sily pozdĺž tunela je úmerná vzdialenosti x od stredu tunela a má opačné znamienko. To je presne obnovovacia sila ako pri pružine, F = −k·x, len „tuhosť“ je k = m·g/R. Vlak teda harmonicky kmitá okolo stredu tunela!\n\n' +
      'Cesta z jedného konca na druhý je polovica kmitu (len „tam“, nie „späť“). A prekvapenie: výsledok vôbec nezávisí od dĺžky tunela. Cesta Bratislava – Košice by trvala rovnako dlho ako Bratislava – Sydney.',
    formula: {
      f: 'F = −(m·g/R) · x     ω = √(g / R)     t = T/2 = π · √(R / g)',
      what: 'Vlak v tuneli ako pružinový oscilátor',
      vars: [
        ['x', 'vzdialenosť vlaku od stredu tunela [m]'],
        ['R', 'polomer Zeme [m]'],
        ['g', 'gravitačné zrýchlenie na povrchu Zeme [m/s²]'],
        ['m·g/R', '„tuhosť“ tejto prírodnej pružiny [N/m]'],
      ],
    },
    worked: {
      q: 'Koľko by trvala cesta vlaku priamym tunelom z Bratislavy do Košíc (bez trenia, z pokoja)? Polomer Zeme R_Z = 6378 km, g ≈ 10 m/s². (príklad 6 z 3. cvičenia)',
      steps: [
        'Vieme: R = 6378 km = 6 378 000 m, g ≈ 10 m/s², vlak štartuje z pokoja, takže koniec tunela je krajná poloha. Hľadáme: čas cesty t.',
        'Sila pozdĺž tunela je F = −(m·g/R)·x, teda ako pri pružine s k = m·g/R. Použijeme vzorec PHO: ω = √(k/m) = √((m·g/R)/m) = √(g/R). Hmotnosť vlaku sa vykráti.',
        'Perióda: T = 2π/ω = 2π·√(R/g).',
        'Cesta z jedného konca na druhý je polovica kmitu: t = T/2 = π·√(R/g).',
        'Dosadíme: R/g = 6 378 000 m / 10 m/s² = 637 800 s² a √637 800 s² ≈ 798,6 s.',
        't = π · 798,6 s ≈ 2509 s. Na minúty: 2509 / 60 ≈ 41,8 min.',
        'Kontrola jednotiek: √(m / (m/s²)) = √(s²) = s. Sedí.',
      ],
      result: 't ≈ 2509 s ≈ 42 min, a to pre akýkoľvek priamy tunel cez Zem.',
    },
    deeper:
      'Prečo je sila vo vnútri Zeme úmerná vzdialenosti od stredu? Ak má Zem všade rovnakú hustotu, na teleso vo vzdialenosti r od stredu pôsobí len hmota „pod ním“, teda guľa s polomerom r a hmotnosťou M·r³/R³. Gravitačná sila je potom F = G·(M·r³/R³)·m / r² = (G·M/R²)·m·r/R = m·g·r/R, lebo g = G·M/R². Sila rastie lineárne s r, presne ako pri pružine.\n\n' +
      'Tunel neprechádza stredom Zeme, ale to nevadí. Do smeru tunela pripadá len časť sily a tá je úmerná vzdialenosti x od stredu tunela: F_x = −(m·g/R)·x. Kolmá časť sily len tlačí vlak do koľajníc.\n\n' +
      'Prečo nehrá rolu dĺžka tunela? Lebo perióda harmonického kmitania nezávisí od amplitúdy. Dlhší tunel znamená väčšiu amplitúdu a vlak v strede ide rýchlejšie, ale čas zostane rovnaký.',
    check: {
      q: 'Ako by sa zmenil čas cesty, keby bol tunel dvakrát dlhší (do vzdialenejšieho mesta)?',
      options: [
        'Nezmenil by sa, stále asi 42 min',
        'Bol by dvakrát dlhší',
        'Bol by √2-krát dlhší',
        'Bol by polovičný',
      ],
      explain:
        'Čas je t = π·√(R/g) a dĺžka tunela v ňom vôbec nie je. Perióda harmonického kmitania nezávisí od amplitúdy: dlhší tunel znamená len väčšiu rýchlosť v strede.',
    },
  },
  {
    title: 'Zhrnutie: čo si zapamätať',
    text:
      'Tu je celá kapitola o kmitoch na jednom mieste. Ak rozumieš každej odrážke, zvládneš príklady z 1., 2. aj 3. cvičenia.\n\n' +
      'Na skúške si najprv vypíš, čo vieš a čo hľadáš, a všetky údaje preveď na základné jednotky (m, kg, s). Potom nájdi vzorec, ktorý spája známe a hľadané veličiny, a na konci urob kontrolu.',
    bullets: [
      'Kmitanie = opakujúci sa pohyb okolo rovnovážnej polohy, kde je obnovovacia sila nulová.',
      'Obnovovacia sila ťahá späť: F = −k·y (mínus = opačný smer ako výchylka).',
      'Perióda T = čas 1 kmitu [s], frekvencia f = 1/T = počet kmitov za 1 s [Hz].',
      'Uhlová frekvencia ω = 2π·f = 2π/T [rad/s]. Pozor, ω ≠ f!',
      'Harmonické kmitanie: y = A·sin(ω·t + φ₀). A = amplitúda (vždy kladná), ω·t + φ₀ = fáza, φ₀ = počiatočná fáza (posúva graf doľava).',
      'Kosínus je posunutý sínus: cos x = sin(x + π/2).',
      'Rýchlosť v = A·ω·cos(ω·t + φ₀), najväčšia v strede: v_max = A·ω.',
      'Zrýchlenie a = −ω²·y, najväčšie na kraji: a_max = A·ω².',
      'Z hodnôt v jednom okamihu: ω = √(|a| / |y|) a A² = y² + v²/ω².',
      'Pružinový oscilátor: ω = √(k/m), T = 2π·√(m/k); perióda nezávisí od amplitúdy.',
      'Energia: ½·k·A² = ½·m·v² + ½·k·y², súčet sa nemení.',
      'Pružiny za sebou: 1/k = 1/k₁ + 1/k₂ (mäkšie), vedľa seba: k = k₁ + k₂ (tvrdšie).',
      'Tunel cez Zem: ω = √(g/R), cesta trvá T/2 ≈ 42 min pre akýkoľvek tunel.',
      'Typické chyby: kalkulačka v DEG namiesto RAD, neprevedené cm a g na m a kg, záporná amplitúda, zámena ω a f.',
    ],
    check: {
      q: 'Čo sa stane s periódou pružinového oscilátora, ak hmotnosť závažia zväčšíš 4-krát?',
      options: ['Zväčší sa 2-krát', 'Zväčší sa 4-krát', 'Zmenší sa 2-krát', 'Nezmení sa'],
      explain: 'T = 2π·√(m/k). Ak m → 4m, tak √(4m) = 2·√m, takže perióda sa zdvojnásobí.',
    },
  },
];

export default steps;
