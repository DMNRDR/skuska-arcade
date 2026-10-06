import type { Step } from './steps';

// Lekcie krok po kroku pre Fyziku 1 (podľa prednášky OsnovaSodpovedamiV3 a cvičení).

export const FYZ_STEPS: Record<string, Step[]> = {
  'fyz:kmity': [
    {
      title: 'Čo je kmitanie?',
      text: 'Kmitanie je pohyb, ktorý sa stále opakuje: tam a späť, tam a späť. Fyzika to skúma na závaží zavesenom na pružine. Keď ho potiahneš a pustíš, kmitá okolo jedného miesta, ktoré voláme rovnovážna poloha.',
      analogy: 'Hojdačka, kyvadlo hodín, struna gitary, aj tvoje srdce. Všetko sa to opakuje dookola.',
      fig: 'spring',
    },
    {
      title: 'Prečo to vôbec kmitá?',
      text: 'Keď závažie vychýliš, pružina ho ťahá späť. Táto sila sa volá obnovovacia sila. Čím viac ho vychýliš, tým silnejšie ťahá. Závažie sa rozbehne k stredu, ale nezastaví sa tam, lebo má rýchlosť. Prestrelí na druhú stranu, pružina ho zabrzdí a ťahá späť… a tak stále dookola.',
      formula: {
        f: 'F = −k · y',
        what: 'Sila pružiny (Hookov zákon)',
        vars: [
          ['F', 'obnovovacia sila [N, newton]'],
          ['k', 'tuhosť pružiny [N/m]: koľko newtonov treba na natiahnutie o 1 m. Tvrdá pružina má veľké k.'],
          ['y', 'výchylka z rovnovážnej polohy [m]'],
          ['−', 'mínus znamená, že sila ide OPAČNE ako výchylka (potiahneš dole → ťahá hore)'],
        ],
      },
    },
    {
      title: 'Perióda a frekvencia',
      text: 'Perióda T je čas jedného celého kmitu (tam a späť). Frekvencia f hovorí, koľko kmitov stihne za 1 sekundu. Sú to prevrátené hodnoty: keď jeden kmit trvá 0,5 s, za sekundu stihne 2 kmity.',
      fig: 'period',
      formula: {
        f: 'f = 1 / T',
        what: 'Frekvencia z periódy',
        vars: [
          ['f', 'frekvencia [Hz, hertz] = počet kmitov za 1 sekundu'],
          ['T', 'perióda [s] = čas jedného kmitu'],
        ],
      },
      worked: {
        q: 'Kmitanie má periódu T = 5 s. Aká je frekvencia?',
        steps: ['Vieme: T = 5 s. Hľadáme f.', 'Použijeme f = 1/T.', 'Dosadíme: f = 1/5 s.'],
        result: 'f = 0,2 Hz, za 1 sekundu prebehne len 0,2 kmitu (jeden kmit za 5 s).',
      },
    },
    {
      title: 'Kružnica a sínus: odkiaľ je vzorec',
      text: 'Predstav si bod, ktorý obieha po kružnici. Keď sa naň pozrieš zboku, vidíš len, ako ide hore a dole. Presne tak vyzerá harmonické kmitanie. Výška bodu je A·sin(uhol) a uhol rastie rovnomerne s časom: uhol = ω·t. Skús si zmeniť rýchlosť a amplitúdu na obrázku.',
      fig: 'fyz:kmity',
      formula: {
        f: 'y = A · sin(ω·t + φ₀)',
        what: 'Rovnica harmonického kmitania',
        vars: [
          ['y', 'okamžitá výchylka v čase t [m]'],
          ['A', 'amplitúda = najväčšia výchylka, VŽDY kladná [m]'],
          ['ω', 'uhlová frekvencia [rad/s]: ako rýchlo rastie uhol'],
          ['t', 'čas [s]'],
          ['φ₀', 'počiatočná fáza [rad]: uhol v čase t = 0; kladné φ₀ posúva graf doľava'],
          ['ω·t + φ₀', 'celé toto sa volá fáza'],
        ],
      },
    },
    {
      title: 'Uhlová frekvencia ω',
      text: 'Jeden celý kmit = jedna otočka po kružnici = uhol 2π radiánov. Ak bod stihne f otočiek za sekundu, uhol narastie o 2π·f za sekundu. To je ω.',
      formula: {
        f: 'ω = 2π · f = 2π / T',
        what: 'Prepočet medzi ω, f a T',
        vars: [
          ['ω', 'uhlová frekvencia [rad/s]'],
          ['2π', 'uhol jednej celej otočky (360°) v radiánoch'],
          ['f', 'frekvencia [Hz]'],
        ],
      },
      worked: {
        q: 'y = 0,2 cm · sin(4π·t − π/4). Nájdi A, ω, f, T a φ₀.',
        steps: [
          'Porovnaj so vzorom y = A·sin(ω·t + φ₀).',
          'Pred sínusom je A = 0,2 cm.',
          'Pri t je ω = 4π rad/s.',
          'f = ω/(2π) = 4π/(2π) = 2 Hz.',
          'T = 1/f = 1/2 = 0,5 s.',
          'Zvyšok v zátvorke je φ₀ = −π/4.',
        ],
        result: 'A = 0,2 cm, ω = 4π rad/s, f = 2 Hz, T = 0,5 s, φ₀ = −π/4 (príklad 3 z 1. cvičenia).',
      },
    },
    {
      title: 'Rýchlosť a zrýchlenie',
      text: 'V krajnej polohe sa teleso na chvíľu zastaví (otáča smer), takže rýchlosť je 0. Tam ho však pružina ťahá najviac, takže zrýchlenie je najväčšie. V strede je to naopak: letí najrýchlejšie, ale sila je nulová.',
      fig: 'yva',
      formula: {
        f: 'v_max = A·ω     a_max = A·ω²',
        what: 'Najväčšia rýchlosť a najväčšie zrýchlenie',
        vars: [
          ['v_max', 'maximálna rýchlosť [m/s], dosiahne ju v rovnovážnej polohe'],
          ['a_max', 'maximálne zrýchlenie [m/s²], dosiahne ho v krajnej polohe'],
          ['A·ω', 'je to obvodová rýchlosť bodu na kružnici'],
        ],
      },
    },
    {
      title: 'Ako rýchlo kmitá pružina?',
      text: 'Tvrdšia pružina (väčšie k) kmitá rýchlejšie. Ťažšie závažie (väčšie m) kmitá pomalšie, lebo sa ťažšie rozbieha.',
      formula: {
        f: 'ω = √(k/m)     T = 2π·√(m/k)',
        what: 'Pružinový oscilátor',
        vars: [
          ['k', 'tuhosť pružiny [N/m]'],
          ['m', 'hmotnosť závažia [kg]'],
          ['T', 'perióda [s]'],
        ],
      },
      worked: {
        q: 'Závažie m = 0,1 kg na pružine s k = 10 N/m. Aká je perióda?',
        steps: ['Vieme: m = 0,1 kg, k = 10 N/m. Hľadáme T.', 'T = 2π·√(m/k).', 'm/k = 0,1/10 = 0,01.', '√0,01 = 0,1.', 'T = 2π·0,1 = 0,2π.'],
        result: 'T ≈ 0,63 s (príklad 2 z 2. cvičenia).',
      },
    },
    {
      title: 'Energia sa prelieva',
      text: 'Pri pohybe má teleso kinetickú energiu (pohybovú), natiahnutá pružina má potenciálnu (uloženú). Počas kmitu sa jedna mení na druhú, ale ich súčet je stále rovnaký. Preto sa amplitúda nemení.',
      fig: 'energy',
      formula: {
        f: '½·k·A²  =  ½·m·v²  +  ½·k·y²',
        what: 'Zákon zachovania energie',
        vars: [
          ['½·k·A²', 'celková energia E [J], stále rovnaká'],
          ['½·m·v²', 'kinetická energia Ek: najväčšia v strede'],
          ['½·k·y²', 'potenciálna energia Ep: najväčšia na kraji'],
        ],
      },
      worked: {
        q: 'Celková energia E = 10 μJ, najväčšia sila F_max = 1·10⁻³ N. Aká je amplitúda?',
        steps: [
          'Vieme: E = ½·k·A² a F_max = k·A (najväčšia sila je pri najväčšej výchylke).',
          'Vydelíme rovnice: E / F_max = (½·k·A²)/(k·A) = A/2.',
          'Teda A = 2E / F_max.',
          'A = 2·10·10⁻⁶ / 10⁻³ = 0,02 m.',
        ],
        result: 'A = 2 cm (príklad 5 z 2. cvičenia).',
      },
    },
    {
      title: 'Dve pružiny naraz',
      text: 'Za sebou: obe nesú rovnakú silu a každá sa natiahne, takže spolu sa natiahnu viac, sú MÄKŠIE. Vedľa seba: delia sa o záťaž, sú TVRDŠIE. Pozor, je to presne naopak ako pri odporoch v elektrine.',
      fig: 'springs2',
      formula: {
        f: 'za sebou: 1/k = 1/k₁ + 1/k₂     vedľa seba: k = k₁ + k₂',
        what: 'Výsledná tuhosť',
        vars: [['k₁, k₂', 'tuhosti jednotlivých pružín'], ['k', 'výsledná tuhosť']],
      },
    },
  ],

  'fyz:skladanie': [
    {
      title: 'Dva kmity naraz',
      text: 'Ak na teleso pôsobia dve kmitania v tom istom smere, výchylky sa jednoducho sčítajú: y = y₁ + y₂. Ak majú rovnakú frekvenciu, výsledok je opäť pekný sínus.',
      analogy: 'Ako keď dvaja tlačia hojdačku. Keď tlačia naraz, hojdá sa viac. Keď proti sebe, takmer stojí.',
      fig: 'sum',
      formula: {
        f: 'synfázne: A = A₁ + A₂     protifázne: A = |A₁ − A₂|',
        what: 'Výsledná amplitúda',
        vars: [
          ['synfázne', 'rovnaká fáza, idú hore aj dole naraz'],
          ['protifázne', 'fázy sa líšia o π, jeden hore a druhý dole'],
          ['| |', 'absolútna hodnota, amplitúda nemôže byť záporná'],
        ],
      },
    },
    {
      title: 'Rázy',
      text: 'Ak majú kmity BLÍZKE (ale nie rovnaké) frekvencie, raz sa stretnú v rovnakej fáze (zosilnia sa) a o chvíľu v opačnej (vyrušia sa). Hlasitosť tak pomaly „dýcha“. To sú rázy. Hudobníci ich počujú pri ladení gitary.',
      fig: 'fyz:skladanie@raz',
      formula: {
        f: 'f_r = |f₂ − f₁|     T_r = 1 / |f₂ − f₁|',
        what: 'Frekvencia a perióda rázov',
        vars: [['f₁, f₂', 'frekvencie dvoch tónov [Hz]'], ['f_r', 'koľkokrát za sekundu zosilnie hlasitosť']],
      },
      worked: {
        q: 'Tóny 300 Hz a 302 Hz znejú spolu. Aké sú rázy?',
        steps: ['f_r = |302 − 300| = 2 Hz.', 'T_r = 1/2 = 0,5 s.'],
        result: 'Hlasitosť zosilnie 2× za sekundu.',
      },
    },
    {
      title: 'Kolmé kmity: krivky na obrazovke',
      text: 'Teraz jeden kmit ide vodorovne (x) a druhý zvisle (y). Bod potom kreslí krivku. Pri rovnakých frekvenciách je to elipsa, úsečka alebo kružnica, podľa fázového posunu. Pri pomere frekvencií ako 1:2 či 2:3 vzniknú Lissajousove krivky. Vyskúšaj na obrázku.',
      fig: 'fyz:skladanie',
      formula: {
        f: 'x = A·sin(ωₓt),  y = A·sin(ω_y·t + φ)',
        what: 'Kolmé kmity',
        vars: [
          ['φ = 0 alebo π', 'úsečka'],
          ['φ = π/2 a rovnaké A', 'kružnica'],
          ['iné φ', 'elipsa'],
          ['ωₓ : ω_y = n : m', 'Lissajousova krivka'],
        ],
      },
    },
    {
      title: 'Kedy sa krivka zopakuje?',
      text: 'Krivka je periodická, len keď sa obe periódy niekedy „stretnú“, teda keď je ich pomer zlomok z celých čísel (racionálne číslo). Výsledná perióda je potom najmenší spoločný násobok Tₓ a T_y.',
      worked: {
        q: 'Je pohyb x = A·sin(ωt), y = A·cos(2ωt) periodický?',
        steps: [
          'Pomer frekvencií je 1 : 2, to je racionálne číslo → áno, periodický.',
          'Tvar zistíme cez vzorec cos 2α = 1 − 2·sin²α.',
          'sin(ωt) = x/A, takže y = A·(1 − 2x²/A²).',
          'To je rovnica paraboly.',
        ],
        result: 'Bod chodí tam a späť po oblúku paraboly (príklad 9 z 3. cvičenia).',
      },
    },
    {
      title: 'Trik: sínus + kosínus',
      text: 'Súčet a·sin(ωt) + b·cos(ωt) je opäť jeden sínus. Amplitúdu nájdeš ako preponu pravouhlého trojuholníka s odvesnami a a b.',
      fig: 'tri345',
      formula: {
        f: 'A = √(a² + b²)     tg φ₀ = b / a',
        what: 'Zlúčenie sínusu a kosínusu',
        vars: [['a', 'číslo pred sínusom'], ['b', 'číslo pred kosínusom'], ['φ₀', 'počiatočná fáza výsledku']],
      },
      worked: {
        q: 'x = 3·sin(ωt) + 4·cos(ωt). Amplitúda a fáza?',
        steps: ['a = 3, b = 4.', 'A = √(9 + 16) = √25 = 5.', 'tg φ₀ = 4/3 → φ₀ ≈ 0,93 rad (53°).'],
        result: 'x = 5·sin(ωt + 0,93) (príklad 7 z 3. cvičenia).',
      },
    },
  ],

  'fyz:vlny': [
    {
      title: 'Čo je vlna?',
      text: 'Vlna je kmitanie, ktoré sa šíri. Prvá častica rozkmitá druhú, druhá tretiu… Každá častica kmitá len na svojom mieste, ale „vzruch“ letí ďalej. Vlna teda prenáša energiu, nie hmotu.',
      analogy: 'Mexická vlna na štadióne: ľudia len vstanú a sadnú si, ale vlna obehne celý štadión.',
      fig: 'fyz:vlny',
    },
    {
      title: 'Priečna a pozdĺžna vlna',
      text: 'Pri priečnej vlne kmitajú častice kolmo na smer šírenia (vlna na lane). Pri pozdĺžnej kmitajú v smere šírenia a vznikajú zhustenia a zriedenia (zvuk vo vzduchu). Prepni na obrázku na „Pozdĺžna“.',
      fig: 'fyz:vlny@poz',
    },
    {
      title: 'Vlnová dĺžka, frekvencia, rýchlosť',
      text: 'Vlnová dĺžka λ je vzdialenosť dvoch susedných vrcholov. Za jednu periódu sa vlna posunie presne o jednu λ. Preto rýchlosť = dráha / čas = λ / T. Keď vlna prejde do iného prostredia, frekvencia sa NEMENÍ (určuje ju zdroj), mení sa rýchlosť a s ňou λ.',
      fig: 'lambda',
      formula: {
        f: 'c = λ / T = λ · f     λ = 2π / k',
        what: 'Základný vzťah pre vlny',
        vars: [
          ['c', 'rýchlosť šírenia vlny [m/s] (zvuk vo vzduchu ≈ 340 m/s)'],
          ['λ', 'vlnová dĺžka [m] („lambda“)'],
          ['f', 'frekvencia [Hz], rovnaká ako frekvencia zdroja'],
          ['k', 'vlnové číslo [rad/m]: o koľko sa zmení fáza na 1 m'],
        ],
      },
      worked: {
        q: 'Vlna prejde do prostredia, kde sa šíri polovičnou rýchlosťou. Čo sa stane s f a λ?',
        steps: ['Frekvencia určuje zdroj, tá sa nemení.', 'λ = c/f, c klesne na polovicu, f ostane.', 'Preto aj λ klesne na polovicu.'],
        result: 'f rovnaká, λ polovičná (príklad 10 zo 4. cvičenia).',
      },
    },
    {
      title: 'Rovnica vlny a fázový rozdiel',
      text: 'Výchylka častice závisí od času aj od miesta. Dve častice vzdialené o Δx kmitajú s fázovým posunom k·Δx. Ak je Δx = λ, posun je 2π a kmitajú rovnako (synfázne). Ak λ/2, kmitajú opačne (protifázne).',
      formula: {
        f: 's(x, t) = A·sin(ω·t − k·x)     Δφ = 2π · Δx / λ',
        what: 'Postupná vlna',
        vars: [
          ['s', 'výchylka častice v mieste x a čase t'],
          ['ω·t − k·x', 'fáza vlny; mínus znamená šírenie doprava'],
          ['Δφ', 'fázový rozdiel dvoch bodov [rad]'],
          ['Δx', 'ich vzdialenosť [m]'],
        ],
      },
      worked: {
        q: 'Body 12 m a 16 m od zdroja, T = 0,04 s, c = 300 m/s. Fázový rozdiel?',
        steps: ['Najprv λ = c·T = 300·0,04 = 12 m.', 'Δx = 16 − 12 = 4 m.', 'Δφ = 2π·4/12 = 2π/3.'],
        result: 'Δφ = 2π/3 rad (príklad 11 zo 4. cvičenia).',
      },
    },
    {
      title: 'Vlnoplochy, lúče a intenzita',
      text: 'Vlnoplocha spája body, ktoré kmitajú rovnako (majú rovnakú fázu). Lúč ukazuje smer šírenia a je vždy kolmý na vlnoplochy. Od bodového zdroja sa energia rozlieva na stále väčšiu guľu, preto intenzita klesá so štvorcom vzdialenosti.',
      fig: 'wavefront',
    },
    {
      title: 'Prečo zvuk slabne so vzdialenosťou',
      text: 'Zdroj vyžiari za sekundu energiu P (výkon). Vo vzdialenosti r sa rozloží na povrch gule 4πr². Na 1 m² teda pripadne P/(4πr²). To je intenzita.',
      fig: 'sphere',
      formula: {
        f: 'I = P / (4π·r²)',
        what: 'Intenzita sférickej vlny',
        vars: [
          ['I', 'intenzita [W/m²] = energia, ktorá prejde 1 m² za 1 s'],
          ['P', 'výkon zdroja [W]'],
          ['4π·r²', 'povrch gule s polomerom r'],
        ],
      },
    },
    {
      title: 'Stojatá vlna',
      text: 'Keď sa vlna odrazí a stretne sama so sebou (napr. na strune gitary), vznikne stojatá vlna. Niektoré body vôbec nekmitajú (uzly), iné kmitajú najviac (kmitne). Vlna sa nikam nehýbe a neprenáša energiu.',
      fig: 'fyz:vlny@stoj',
      formula: {
        f: 's = 2A·sin(ωt)·cos(kx)',
        what: 'Stojatá vlna',
        vars: [
          ['uzol – uzol', 'vzdialenosť λ/2'],
          ['kmitňa – kmitňa', 'vzdialenosť λ/2'],
          ['uzol – kmitňa', 'vzdialenosť λ/4'],
        ],
      },
    },
  ],

  'fyz:doppler': [
    {
      title: 'Dopplerov jav',
      text: 'Keď sa sanitka blíži, siréna znie vyššie. Keď sa vzďaľuje, nižšie. Zdroj „dobieha“ vlny, ktoré vyslal, takže pred ním sú vlny natlačené (kratšia λ = vyššia f) a za ním roztiahnuté.',
      analogy: 'Kačka plávajúca po rybníku: vlny pred ňou sú husté, za ňou riedke.',
      fig: 'fyz:doppler',
    },
    {
      title: 'Vzorce: pohybuje sa zdroj',
      text: 'Ak sa hýbe ZDROJ, delíme. Ak ide k tebe, menovateľ je menší ako 1, takže frekvencia je vyššia.',
      formula: {
        f: "f′ = f / (1 ∓ v/c)",
        what: 'Pohyblivý zdroj, stojaci prijímač',
        vars: [
          ["f′", 'frekvencia, ktorú počuješ [Hz]'],
          ['f', 'frekvencia, ktorú zdroj vysiela [Hz]'],
          ['v', 'rýchlosť zdroja [m/s]'],
          ['c', 'rýchlosť zvuku [m/s] (≈ 340)'],
          ['−', 'zdroj sa BLÍŽI'],
          ['+', 'zdroj sa VZĎAĽUJE'],
        ],
      },
      worked: {
        q: 'Siréna znie 1,125× vyššie pri približovaní ako pri vzďaľovaní. Rýchlosť sanitky (c = 340 m/s)?',
        steps: [
          'Približovanie: f₁ = f/(1 − v/c). Vzďaľovanie: f₂ = f/(1 + v/c).',
          'Pomer: f₁/f₂ = (1 + v/c)/(1 − v/c) = 1,125.',
          'Označme u = v/c: 1 + u = 1,125 − 1,125u.',
          '2,125u = 0,125 → u ≈ 0,0588.',
          'v = 0,0588 · 340.',
        ],
        result: 'v = 20 m/s = 72 km/h (príklad 21 zo 6. cvičenia).',
      },
    },
    {
      title: 'Vzorce: pohybuje sa prijímač',
      text: 'Ak sa hýbeš TY (prijímač), násobíme. Keď ideš oproti vlnám, stretávaš ich častejšie.',
      formula: {
        f: "f′ = f · (1 ± v/c)",
        what: 'Pohyblivý prijímač, stojaci zdroj',
        vars: [
          ['v', 'rýchlosť prijímača [m/s]'],
          ['+', 'prijímač ide KU zdroju'],
          ['−', 'prijímač ide OD zdroja'],
        ],
      },
    },
    {
      title: 'Interferencia: vlny z dvoch zdrojov',
      text: 'Keď sa stretnú dve vlny s rovnakou frekvenciou, sčítajú sa. Rozhoduje dráhový rozdiel Δ, teda o koľko je bod bližšie k jednému zdroju. Ak je rozdiel celý počet vlnových dĺžok, vrcholy sa stretnú s vrcholmi (maximum). Ak o polovicu viac, vrchol stretne dolinu (minimum).',
      fig: 'interference',
      formula: {
        f: 'max: Δ = 2n · λ/2     min: Δ = (2n + 1) · λ/2',
        what: 'Podmienky interferencie',
        vars: [
          ['Δ = d₂ − d₁', 'dráhový rozdiel: rozdiel vzdialeností od zdrojov [m]'],
          ['n', 'celé číslo 0, ±1, ±2…'],
          ['2n·λ/2', 'párny násobok polvlny = celé vlnové dĺžky'],
        ],
      },
    },
    {
      title: 'Huygensov princíp, odraz a lom',
      text: 'Každý bod čela vlny sa správa ako malý zdroj nových vlniek. Ich spoločná obálka je nové čelo. Z toho vyjde, že uhol odrazu sa rovná uhlu dopadu, a pri prechode do iného prostredia sa vlna láme.',
      fig: 'huygens',
      formula: {
        f: 'odraz: α = β     lom: sin α / sin β = c₁ / c₂',
        what: 'Zákony odrazu a lomu',
        vars: [
          ['α', 'uhol dopadu (meria sa od kolmice!)'],
          ['β', 'uhol odrazu alebo lomu'],
          ['c₁, c₂', 'rýchlosti v prvom a druhom prostredí'],
        ],
      },
    },
    {
      title: 'Difrakcia a refrakcia',
      text: 'Difrakcia: vlna sa ohne okolo prekážky alebo za štrbinou aj do tieňa. Refrakcia: v prostredí, kde sa rýchlosť plynulo mení (teplý a studený vzduch), sa lúč postupne zakriví smerom k vrstve s menšou rýchlosťou.',
      fig: 'diffraction',
    },
  ],

  'fyz:em': [
    {
      title: 'Elektromagnetická vlna',
      text: 'Svetlo, rádio, Wi-Fi aj röntgen sú elektromagnetické vlny. Kmitá v nich elektrické pole E a magnetické pole B. Obe sú kolmé na seba aj na smer šírenia, takže je to priečna vlna. Na rozdiel od zvuku nepotrebuje vzduch, šíri sa aj vákuom (preto vidíme Slnko).',
      fig: 'fyz:em',
    },
    {
      title: 'Spektrum',
      text: 'Elektromagnetické vlny sa líšia len vlnovou dĺžkou. Ľudské oko vidí iba úzky pásik od 380 nm do 760 nm. Kratšie vlny majú viac energie (UV, röntgen), dlhšie menej (infračervené, mikrovlny, rádio).',
      fig: 'spectrum',
    },
    {
      title: 'Rýchlosť a index lomu',
      text: 'Vo vákuu letí každá EM vlna rýchlosťou c₀ ≈ 300 000 km/s. V látke je pomalšia. Koľkokrát pomalšia, to udáva index lomu n.',
      formula: {
        f: 'c = 1/√(ε·μ)     n = c₀/c = √(εᵣ·μᵣ)',
        what: 'Rýchlosť EM vlny v látke',
        vars: [
          ['ε', 'permitivita látky (elektrická vlastnosť)'],
          ['μ', 'permeabilita látky (magnetická vlastnosť)'],
          ['εᵣ, μᵣ', 'relatívne hodnoty: koľkokrát viac ako vo vákuu'],
          ['n', 'index lomu, vždy ≥ 1'],
        ],
      },
      worked: {
        q: 'Parafín má permitivitu εᵣ = 2 a permeabilitu μᵣ = 1. Index lomu?',
        steps: ['n = √(εᵣ·μᵣ).', 'n = √(2·1) = √2.'],
        result: 'n ≈ 1,41 (príklad 28 z 8. cvičenia).',
      },
    },
    {
      title: 'Polarizácia',
      text: 'Polarizácia hovorí, ako presne kmitá vektor E v rovine kolmej na smer šírenia. Môže kmitať po úsečke (lineárna), točiť sa po kružnici (kruhová) alebo po elipse (eliptická). Polarizovať sa dá len priečna vlna, preto zvuk vo vzduchu polarizovaný byť nemôže.',
      analogy: 'Polarizačné okuliare prepustia len svetlo kmitajúce jedným smerom, preto odstránia odlesky od vody.',
      fig: 'polar',
    },
  ],

  'fyz:optika': [
    {
      title: 'Svetlo ide rovno',
      text: 'V rovnakom prostredí sa svetlo šíri priamočiaro. Preto vznikajú tiene. Bodový zdroj (malá žiarovka ďaleko) vrhá ostrý tieň. Plošný zdroj (veľké okno) vrhá aj polotieň, kam dopadá len časť svetla.',
      fig: 'shadow',
    },
    {
      title: 'Odraz a zrkadlo',
      text: 'Od hladkého povrchu sa svetlo odrazí pod rovnakým uhlom, pod akým dopadlo (zrkadlový odraz). Od drsného povrchu sa rozptýli do všetkých strán (difúzny odraz). Preto vidíme aj predmety, ktoré nesvietia. V rovinnom zrkadle je obraz rovnako ďaleko za zrkadlom ako predmet pred ním.',
      fig: 'mirror',
    },
    {
      title: 'Index lomu',
      text: 'Index lomu n hovorí, koľkokrát pomalšie ide svetlo v látke ako vo vákuu. Voda má n ≈ 1,33, sklo ≈ 1,5. Látka s väčším n je opticky hustejšia.',
      formula: {
        f: 'n = c₀ / c',
        what: 'Absolútny index lomu',
        vars: [['c₀', 'rýchlosť svetla vo vákuu ≈ 3·10⁸ m/s'], ['c', 'rýchlosť svetla v látke']],
      },
    },
    {
      title: 'Lom svetla (Snellov zákon)',
      text: 'Keď svetlo prechádza do inej látky, zmení smer. Do hustejšej sa láme KU kolmici, do redšej OD kolmice. Vyskúšaj na obrázku rôzne uhly. Uhly sa vždy merajú od kolmice na rozhranie, nie od povrchu!',
      fig: 'fyz:optika',
      formula: {
        f: 'n₁ · sin α₁ = n₂ · sin α₂',
        what: 'Snellov zákon lomu',
        vars: [
          ['n₁', 'index lomu prostredia, odkiaľ svetlo ide'],
          ['α₁', 'uhol dopadu (od kolmice)'],
          ['n₂', 'index lomu prostredia, kam svetlo ide'],
          ['α₂', 'uhol lomu (od kolmice)'],
        ],
      },
      worked: {
        q: 'Potápač vidí Slnko pod uhlom 60° nad hladinou (n_vody = 1,333). Aká je skutočná výška Slnka?',
        steps: [
          '60° nad hladinou = 30° od kolmice (vo vode), α₂ = 30°.',
          'Snell: 1·sin α₁ = 1,333·sin 30° = 1,333·0,5 = 0,667.',
          'α₁ = arcsin 0,667 ≈ 41,8° od kolmice.',
          'Výška nad obzorom = 90° − 41,8°.',
        ],
        result: 'Slnko je v skutočnosti asi 48° nad obzorom (príklad 26 zo 7. cvičenia).',
      },
    },
    {
      title: 'Úplný odraz',
      text: 'Keď svetlo ide z hustejšej do redšej látky (zo skla do vzduchu) a dopadá veľmi šikmo, už nedokáže vyjsť von a celé sa odrazí späť. Hraničný uhol je kritický uhol. Takto funguje optický kábel internetu.',
      fig: 'fiber',
      formula: {
        f: 'sin α_krit = n₂ / n₁',
        what: 'Kritický uhol',
        vars: [
          ['n₁', 'hustejšie prostredie, kde je svetlo (napr. sklo 1,5)'],
          ['n₂', 'redšie prostredie za rozhraním (napr. vzduch 1)'],
          ['podmienka', 'existuje len ak n₂ < n₁'],
        ],
      },
      worked: {
        q: 'Kritický uhol voda–vzduch je 49°, sklo–vzduch 42°. Aký je pre sklo–voda?',
        steps: [
          'sin 49° = 1/n_v → n_v = 1/sin 49°.',
          'sin 42° = 1/n_s → n_s = 1/sin 42°.',
          'Sklo–voda: sin α = n_v/n_s = sin 42°/sin 49° = 0,669/0,755 ≈ 0,887.',
          'α = arcsin 0,887.',
        ],
        result: 'α_krit ≈ 62° (príklad 33 z 9. cvičenia).',
      },
    },
  ],

  'fyz:sosovky': [
    {
      title: 'Spojka a rozptylka',
      text: 'Šošovka je sklíčko s guľatými plochami. Spojka (hrubšia v strede, ako lupa) zbieha rovnobežné lúče do jedného bodu, ohniska F. Rozptylka (tenšia v strede) lúče roztiahne, akoby vychádzali z ohniska pred ňou.',
      fig: 'lenses',
    },
    {
      title: 'Optická mohutnosť',
      text: 'Ako silno šošovka láme, udáva optická mohutnosť D v dioptriách. Okuliare „+2“ majú D = +2 dpt. Kladné D je spojka, záporné rozptylka. Ohnisková vzdialenosť je prevrátená hodnota.',
      formula: {
        f: 'D = (n − 1) · (1/R₁ − 1/R₂)     f = 1/D',
        what: 'Rovnica „brúsiča šošoviek“',
        vars: [
          ['D', 'optická mohutnosť [dpt = 1/m]'],
          ['n', 'index lomu skla (vo vode: n_skla / n_vody)'],
          ['R₁, R₂', 'polomery krivosti oboch plôch [m]; vypuklá plocha z pohľadu svetla +, dutá −'],
          ['f', 'ohnisková vzdialenosť [m]'],
        ],
      },
      worked: {
        q: 'Symetrická dvojvypuklá šošovka, n = 1,5, |R| = 25 cm. Aké je D a f?',
        steps: ['R₁ = +0,25 m, R₂ = −0,25 m (dvojvypuklá).', '1/R₁ − 1/R₂ = 4 − (−4) = 8 m⁻¹.', 'D = (1,5 − 1)·8 = 4 dpt.', 'f = 1/4 m.'],
        result: 'D = 4 dpt, f = 25 cm.',
      },
    },
    {
      title: 'Ako nakresliť obraz',
      text: 'Stačia dva lúče z vrcholu predmetu: (1) rovnobežný s osou, po spojke ide cez ohnisko F′, (2) cez stred šošovky, ten sa neláme. Kde sa pretnú, tam je obraz. Ak sa pretnú len ich predĺženia dozadu, obraz je neskutočný (vidíš ho, ale nedá sa zachytiť na papier).',
      fig: 'fyz:sosovky',
    },
    {
      title: 'Kde vznikne obraz pri spojke',
      text: 'Posúvaj predmet na obrázku a sleduj obraz. Ďaleko za 2F: zmenšený (fotoaparát). V 2F: rovnako veľký. Medzi F a 2F: zväčšený (projektor). V F: obraz v nekonečne. Bližšie ako F: lupa, zväčšený a priamy, ale neskutočný.',
      fig: 'fyz:sosovky@-1.5',
      formula: {
        f: "x′ = x / (1 + D·x)     Z = −y′ / y",
        what: 'Zobrazovacia rovnica a zväčšenie',
        vars: [
          ['x', 'poloha predmetu (pred šošovkou je záporná) [m]'],
          ["x′", 'poloha obrazu [m]'],
          ['Z', 'priečne zväčšenie: |Z| > 1 zväčšený, |Z| < 1 zmenšený'],
        ],
      },
    },
    {
      title: 'Viac šošoviek naraz',
      text: 'Dve tenké šošovky tesne pri sebe sa správajú ako jedna, ktorej mohutnosť je súčet. Preto sa dioptrie okuliarov a oka jednoducho sčítajú.',
      formula: { f: 'D = D₁ + D₂', what: 'Sústava blízkych tenkých šošoviek', vars: [['D₁, D₂', 'mohutnosti šošoviek [dpt]']] },
      worked: {
        q: 'Šošovka +3 dpt a šošovka −2 dpt tesne pri sebe. Výsledok?',
        steps: ['D = 3 + (−2) = 1 dpt.', 'f = 1/1 = 1 m.'],
        result: 'Slabá spojka s ohniskom 1 m.',
      },
    },
  ],
};
