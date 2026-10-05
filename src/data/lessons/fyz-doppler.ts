import type { Step } from '../steps';

// Dopplerov jav, interferencia z dvoch zdrojov, Huygensov princíp, odraz, lom, refrakcia a difrakcia
// (prednáška 2.5–2.8, príklady 21–22 zo 6. cvičenia a 23 zo 7. cvičenia).

const steps: Step[] = [
  {
    title: 'Čo je Dopplerov jav?',
    text:
      'Určite si to zažil: sanitka sa k tebe blíži a siréna znie vyššie, prejde okolo a zrazu znie hlbšie. Siréna pritom celý čas vysiela rovnaký tón. Mení sa iba to, čo počuješ ty.\n\n' +
      'Dopplerov jav je zmena frekvencie zvuku, ktorú vníma prijímač (ucho, mikrofón), spôsobená pohybom zdroja alebo prijímača. Výška tónu je frekvencia: vyšší tón = viac kmitov za sekundu. Keď sa zdroj a prijímač k sebe približujú, prijímač vníma vyššiu frekvenciu, keď sa vzďaľujú, nižšiu.\n\n' +
      'Pri zvuku záleží na tom, kto sa hýbe voči vzduchu – zdroj, alebo prijímač. Preto sú v prednáške dva rôzne vzorce. Frekvenciu, ktorú vysiela zdroj, označujeme f, a frekvenciu, ktorú vníma prijímač, f′ (f s čiarkou).',
    analogy:
      'Stojíš na nástupišti a kamarát z idúceho vlaku ti hádže loptičky, presne jednu za sekundu. Keď sa vlak blíži, každá ďalšia loptička letí kratšiu dráhu, takže ti prilietajú častejšie ako raz za sekundu. Keď sa vzďaľuje, prilietajú zriedkavejšie. Loptičky sú vrcholy zvukovej vlny.',
    check: {
      q: 'Sanitka s rovnomerne znejúcou sirénou ťa práve minula a ďalej sa vzďaľuje stálou rýchlosťou. Čo počuješ?',
      options: ['Nižší tón, ako siréna vysiela', 'Vyšší tón, ako siréna vysiela', 'Rovnaký tón, len tichší', 'Tón, ktorý stále klesá až k nule'],
      explain:
        'Pri vzďaľovaní je f′ = f/(1 + v/c), teda menšia ako f – tón je nižší. Pri stálej rýchlosti je však ustálený, neklesá donekonečna. Že je zároveň tichší, je pravda, ale výška tónu sa zmenila.',
    },
  },
  {
    title: 'Stojaci zdroj: nič sa nemení',
    text:
      'Najprv prípad bez pohybu. Zdroj kmitá s periódou T a každú periódu vyšle jednu vlnoplochu (napríklad jedno zhustenie vzduchu). Vlnoplochy sa od neho rozbiehajú rýchlosťou zvuku c ako sústredné kruhy – na obrázku modré kruhy, žlté šípky sú lúče. Vzdialenosť susedných vlnoplôch je vlnová dĺžka λ = c·T.\n\n' +
      'Ucho v podstate počíta, koľko vlnoplôch k nemu dorazí za sekundu. Ak zdroj aj ucho stoja, prichádzajú vlnoplochy vzdialené od seba λ a letia rýchlosťou c, takže jedna príde každých λ/c = T sekúnd. Ucho počuje presne frekvenciu f = 1/T.\n\n' +
      'Frekvencia sa teda môže zmeniť len dvoma spôsobmi: buď sa zmení vzdialenosť vlnoplôch λ (to spraví pohyblivý zdroj), alebo rýchlosť, ktorou ich ucho stretáva (to spraví pohyblivý prijímač). Na týchto dvoch myšlienkach stojí celé odvodenie.',
    fig: 'wavefront',
  },
  {
    title: 'Pohybuje sa zdroj',
    text:
      'Zdroj ide rýchlosťou v k prijímaču. Vyšle vlnoplochu a kým vyšle ďalšiu (o čas T), sám sa posunie dopredu o v·T. Nová vlnoplocha preto štartuje bližšie k predchádzajúcej: vpredu sú vlnoplochy natlačené, ich vzdialenosť je λ′ = c·T − v·T. Vzadu je to naopak, λ′ = c·T + v·T.\n\n' +
      'Na obrázku ide zdroj doprava. Vpredu (vpravo) sú kruhy zhustené – vyšší tón, vzadu (vľavo) zriedené – nižší tón. Prepni v/c na 0 a uvidíš sústredné kruhy; pri 0,8 sa vlnoplochy vpredu takmer zlievajú.\n\n' +
      'Prijímač stojí, vlnoplochy k nemu letia rýchlosťou c, ale sú od seba len λ′. Vníma teda frekvenciu f′ = c/λ′, z čoho vyjde vzorec nižšie. Pri pohybe zdroja vo vzorci DELÍME.',
    fig: 'fyz:doppler',
    formula: {
      f: 'f′ = f / (1 ∓ v/c)',
      what: 'Pohyblivý zdroj, stojaci prijímač (pohyb voči vzduchu)',
      vars: [
        ['f′', 'frekvencia, ktorú vníma prijímač [Hz]'],
        ['f', 'frekvencia, ktorú vysiela zdroj [Hz]'],
        ['v', 'rýchlosť zdroja voči vzduchu [m/s]'],
        ['c', 'rýchlosť zvuku [m/s] (≈ 340 m/s)'],
        ['−', 'zdroj sa pohybuje K prijímaču (menší menovateľ → vyššia f′)'],
        ['+', 'zdroj sa pohybuje OD prijímača (väčší menovateľ → nižšia f′)'],
      ],
    },
    deeper:
      'Odvodenie (podľa prednášky): stojaci zdroj má vlnovú dĺžku λ = c·T. Pohyblivý zdroj sa za periódu T posunie o v·T, takže dopplerovská vlnová dĺžka je λ′ = c·T ∓ v·T = (c ∓ v)·T = (c ∓ v)/f.\n\n' +
      'Prijímač stojí, vlnoplochy k nemu idú rýchlosťou c, takže vníma λ′ = c·T′ = c/f′. Porovnáme: c/f′ = (c ∓ v)/f, teda f′/c = f/(c ∓ v) a f′ = f·c/(c ∓ v).\n\n' +
      'Vydelíme čitateľa aj menovateľa číslom c: f′ = f/(1 ∓ v/c). Zaujímavosť: keď sa zdroj blíži rýchlosťou zvuku (v = c), menovateľ je 0 – vlnoplochy sa zlejú do jednej rázovej vlny. To je „sonický tresk“ nadzvukového lietadla.',
    worked: {
      q: 'Sanitka so sirénou 640 Hz ide rýchlosťou 72 km/h. Akú frekvenciu počuje stojaci chodec, keď sa sanitka (a) blíži, (b) vzďaľuje? Rýchlosť zvuku je 340 m/s.',
      steps: [
        'Vieme: f = 640 Hz, v = 72 km/h, c = 340 m/s. Hľadáme: f′ pri približovaní a pri vzďaľovaní.',
        'Najprv jednotky: 72 km/h = 72/3,6 m/s = 20 m/s. (Typická chyba: dosadiť 72 a miešať km/h s m/s.)',
        'Hýbe sa zdroj, prijímač stojí → použijeme f′ = f/(1 ∓ v/c).',
        'v/c = 20/340 ≈ 0,0588.',
        '(a) Blíži sa → mínus: f′ = 640/(1 − 20/340) = 640·340/320 = 680 Hz.',
        '(b) Vzďaľuje sa → plus: f′ = 640/(1 + 20/340) = 640·340/360 ≈ 604,4 Hz.',
        'Kontrola: pri približovaní vyššia (680 > 640), pri vzďaľovaní nižšia (604 < 640). Sedí.',
      ],
      result: '(a) 680 Hz, (b) ≈ 604 Hz.',
    },
  },
  {
    title: 'Pohybuje sa prijímač',
    text:
      'Teraz zdroj stojí, takže vlnoplochy sú pravidelné sústredné kruhy vzdialené λ = c·T. Pohybuje sa prijímač rýchlosťou v. Ak ide oproti vlnoplochám (ku zdroju), stretáva ich častejšie – vzájomná rýchlosť je c + v. Ak ide od zdroja, vlnoplochy ho musia dobiehať a vzájomná rýchlosť je len c − v.\n\n' +
      'Čas medzi dvoma stretnutiami (perióda, ako ju vníma prijímač) je T′ = λ/(c ± v). Z toho f′ = (c ± v)/λ = f·(1 ± v/c). Pri pohybe prijímača vo vzorci NÁSOBÍME.\n\n' +
      'Všimni si, že vzorce pre pohyb zdroja a prijímača nie sú rovnaké, hoci sa v oboch prípadoch zdroj a prijímač približujú rovnakou rýchlosťou. Zvuk sa šíri vo vzduchu, a tak rozhoduje, kto sa hýbe voči vzduchu. Pri malých rýchlostiach (v oveľa menšie ako c) však oba vzorce dávajú takmer rovnaké čísla.',
    analogy:
      'Stojíš v mori a vlny ti narážajú do nôh raz za 5 sekúnd. Keď začneš brodiť smerom k nim, narážajú častejšie; keď od nich, zriedkavejšie. Vlny sa nezmenili, zmenil sa iba tvoj pohyb.',
    formula: {
      f: 'f′ = f · (1 ± v/c)',
      what: 'Pohyblivý prijímač, stojaci zdroj (pohyb voči vzduchu)',
      vars: [
        ['f′', 'frekvencia, ktorú vníma prijímač [Hz]'],
        ['f', 'frekvencia zdroja [Hz]'],
        ['v', 'rýchlosť prijímača voči vzduchu [m/s]'],
        ['c', 'rýchlosť zvuku [m/s]'],
        ['+', 'prijímač ide KU zdroju (vyššia f′)'],
        ['−', 'prijímač ide OD zdroja (nižšia f′)'],
      ],
    },
    deeper:
      'Odvodenie (podľa prednášky): zdroj stojí, vlnoplochy sú od seba λ = c·T. Prijímač ide oproti nim rýchlosťou v a vlnoplochy idú oproti nemu rýchlosťou c, takže sa k sebe blížia rýchlosťou c + v. Ďalšiu vlnoplochu, vzdialenú λ, stretne o čas T′ = λ/(c + v). Pri pohybe od zdroja je T′ = λ/(c − v).\n\n' +
      'Dosadíme λ = c·T: T′ = c·T/(c ± v) = T/(1 ± v/c). Frekvencia je prevrátená hodnota periódy: f′ = 1/T′ = f·(1 ± v/c).\n\n' +
      'Ak sa hýbu obaja, vzorce sa spoja: f′ = f · (c ± rýchlosť prijímača) / (c ∓ rýchlosť zdroja), horné znamienka pri pohybe k sebe. Napríklad siréna 640 Hz ide rýchlosťou 20 m/s a oproti nej cyklista 10 m/s: f′ = 640·(340 + 10)/(340 − 20) = 640·350/320 = 700 Hz.',
    worked: {
      q: 'Cyklista ide rýchlosťou 10 m/s k stojacej siréne, ktorá vysiela 680 Hz. Akú frekvenciu počuje, keď ide k siréne, a akú, keď ide od nej? Rýchlosť zvuku je 340 m/s.',
      steps: [
        'Vieme: f = 680 Hz, v = 10 m/s (hýbe sa prijímač), c = 340 m/s, zdroj stojí. Hľadáme: f′.',
        'Hýbe sa prijímač → použijeme f′ = f·(1 ± v/c).',
        'v/c = 10/340 = 1/34.',
        'K siréne → plus: f′ = 680·(1 + 1/34) = 680·35/34 = 700 Hz.',
        'Od sirény → mínus: f′ = 680·(1 − 1/34) = 680·33/34 = 660 Hz.',
        'Kontrola: zmena je ±20 Hz, čo je 1/34 z 680 Hz – rovnaký zlomok ako v/c. Pri pohybe prijímača je zmena nahor aj nadol rovnako veľká.',
      ],
      result: 'K siréne 700 Hz, od sirény 660 Hz.',
    },
  },
  {
    title: 'Ako nepomýliť znamienka',
    text:
      'Najčastejšia chyba pri Dopplerovi je zlé znamienko. Nemusíš sa ho učiť naspamäť, stačí jedno pravidlo: keď sa zdroj a prijímač k sebe približujú, frekvencia musí vyjsť VYŠŠIA; keď sa vzďaľujú, NIŽŠIA. Znamienko vyber tak, aby to vyšlo.\n\n' +
      'Druhá vec je správny vzorec. Opýtaj sa: kto sa hýbe voči vzduchu? Zdroj (siréna, vlak, reproduktor na aute) → delíme, f′ = f/(1 ∓ v/c). Prijímač (ty, mikrofón) → násobíme, f′ = f·(1 ± v/c).\n\n' +
      'Tretia chyba sú jednotky: v aj c musia byť v rovnakých jednotkách (km/h prepočítaš na m/s delením 3,6). A nezamieňaj frekvenciu s periódou: keď sa frekvencia zvýši, perióda aj trvanie signálu sa skrátia.',
    bullets: [
      'Približujú sa → f′ > f; vzďaľujú sa → f′ < f.',
      'Hýbe sa zdroj → f′ = f / (1 ∓ v/c), horné znamienko pri približovaní.',
      'Hýbe sa prijímač → f′ = f · (1 ± v/c), horné znamienko pri približovaní.',
      'v a c v m/s (km/h : 3,6 = m/s).',
      'Perióda a trvanie signálu sa menia opačne ako frekvencia (T′ = 1/f′).',
    ],
    check: {
      q: 'Ideš autom rýchlosťou v PREČ od stojaceho reproduktora, ktorý hrá frekvenciu f. Ktorý vzorec použiješ?',
      options: ['f′ = f · (1 − v/c)', 'f′ = f / (1 − v/c)', 'f′ = f · (1 + v/c)', 'f′ = f / (1 + v/c)'],
      explain:
        'Hýbe sa prijímač (ty), takže násobíme. Vzďaľuješ sa, frekvencia musí klesnúť, preto mínus: f′ = f·(1 − v/c). Pozor: f/(1 + v/c) je vzorec pre vzďaľujúci sa ZDROJ – dáva podobné, ale nie rovnaké číslo.',
    },
  },
  {
    title: 'Príklad: ako rýchlo ide sanitka?',
    text:
      'Často nepoznáme frekvenciu sirény f, ale poznáme pomer dvoch frekvencií: pri približovaní a pri vzďaľovaní. To stačí, lebo pri delení sa neznáma f vykráti. Takéto „pomerové“ úlohy sú na skúške obľúbené.\n\n' +
      'Postup: napíš f′ pre približovanie aj pre vzďaľovanie, vydeľ ich a dostaneš rovnicu, v ktorej je neznáma iba v/c. Pomôže skratka u = v/c, s ktorou sa rovnica ľahšie upravuje. Na konci nezabudni vynásobiť u rýchlosťou zvuku.',
    worked: {
      q: 'Stojaci pozorovateľ vníma, že tón sirény sanitky je 1,125-krát vyšší, keď sa sanitka približuje, ako keď sa vzďaľuje. Aká je rýchlosť sanitky? Rýchlosť zvuku je 340 m/s. (príklad 21 zo 6. cvičenia)',
      steps: [
        'Vieme: f₁/f₂ = 1,125 (f₁ pri približovaní, f₂ pri vzďaľovaní), c = 340 m/s. Hľadáme: v.',
        'Hýbe sa zdroj (sanitka), pozorovateľ stojí → f′ = f/(1 ∓ v/c).',
        'Približovanie: f₁ = f/(1 − v/c). Vzďaľovanie: f₂ = f/(1 + v/c).',
        'Pomer: f₁/f₂ = (1 + v/c)/(1 − v/c). Neznáma f sa vykrátila.',
        'Označ u = v/c: (1 + u)/(1 − u) = 1,125 → 1 + u = 1,125 − 1,125·u.',
        '2,125·u = 0,125 → u = 0,125/2,125 ≈ 0,058 82.',
        'v = u·c = 0,058 82 · 340 m/s = 20 m/s.',
        'Kontrola: 20 m/s = 72 km/h, rozumná rýchlosť sanitky. A z príkladu v kroku 3: 680 Hz / 604,4 Hz = 1,125. Sedí.',
      ],
      result: 'v = 20 m/s = 72 km/h.',
    },
  },
  {
    title: 'Príklad: ako dlho trúbi vlak?',
    text:
      'Dopplerov jav nemení iba výšku tónu, ale aj trvanie signálu. Na obrázku vidíš, že vlnoplochy pred idúcim zdrojom sú natlačené: posledná vlnoplocha signálu vyjde z bližšieho miesta ako prvá, a preto dorazí „skôr, ako by mala“. Signál sa pri približovaní skráti a pri vzďaľovaní natiahne.\n\n' +
      'Počet kmitov v signáli sa nemení – koľko kmitov zdroj vyslal, toľko ich prijímač aj počuje. Ak je frekvencia vyššia, tie isté kmity prebehnú rýchlejšie, takže trvanie je kratšie. Trvanie sa mení opačne ako frekvencia: t′ = t·(1 ∓ v/c).',
    fig: 'fyz:doppler',
    worked: {
      q: 'Vlak idúci rýchlosťou 72 km/h trúbi 2 s. Ako dlho trvá zvukový signál, ktorý počuje stojaci pozorovateľ, ak sa vlak (a) približuje, (b) vzďaľuje? Rýchlosť zvuku je za daných podmienok 340 m/s. (príklad 22 zo 6. cvičenia)',
      steps: [
        'Vieme: t = 2 s, v = 72 km/h = 20 m/s, c = 340 m/s. Teplotu vzduchu nepotrebujeme, lebo rýchlosť zvuku je zadaná. Hľadáme: t′.',
        'Úvaha bez vzorca: na začiatku trúbenia je vlak vo vzdialenosti D, prvý zvuk príde za D/c. Na konci (o 2 s) je vlak o v·2 s = 40 m bližšie, posledný zvuk príde v čase 2 + (D − 40)/c.',
        'Trvanie: t′ = 2 + (D − 40)/c − D/c = 2 − 40/340 ≈ 2 − 0,118 = 1,882 s. Neznáma vzdialenosť D sa vykrátila.',
        'Všeobecne: t′ = t·(1 − v/c) pri približovaní a t′ = t·(1 + v/c) pri vzďaľovaní. To isté vyjde z f′ = f/(1 ∓ v/c), lebo trvanie = počet kmitov × perióda a perióda je 1/f′.',
        '(a) t′ = 2·(1 − 20/340) = 2·320/340 ≈ 1,88 s.',
        '(b) t′ = 2·(1 + 20/340) = 2·360/340 ≈ 2,12 s.',
        'Kontrola: pri približovaní kratšie, pri vzďaľovaní dlhšie a odchýlka od 2 s je v oboch prípadoch 0,118 s. Sedí.',
      ],
      result: '(a) ≈ 1,88 s, (b) ≈ 2,12 s.',
    },
  },
  {
    title: 'Interferencia vĺn z dvoch zdrojov',
    text:
      'Teraz máme dva zdroje Z₁ a Z₂, ktoré vysielajú vlny s rovnakou frekvenciou a v rovnakej fáze (napr. dva reproduktory na tom istom zosilňovači). Do bodu P prídu dve vlny: jedna prejde dráhu d₁, druhá d₂. Rozdiel Δ = d₂ − d₁ sa volá dráhový rozdiel.\n\n' +
      'Ak je Δ celý počet vlnových dĺžok (0, λ, 2λ…), vlny prídu „vrchol na vrchol“ a zosilnia sa – interferenčné maximum (najväčšia amplitúda). Ak je navyše polovica vlnovej dĺžky (λ/2, 3λ/2…), príde „vrchol na dolinu“ a vlny sa zoslabia – interferenčné minimum (najmenšia amplitúda).\n\n' +
      'Prednáška to píše cez polvlny: maximum je párny násobok polvlny (2n·λ/2), minimum nepárny násobok ((2n + 1)·λ/2), kde n je celé číslo, aj záporné. Na obrázku sú vlny z dvoch zdrojov; na žltej osi uprostred sú oba zdroje rovnako ďaleko, Δ = 0, a je tam maximum MAX₀.',
    analogy:
      'Dvaja ľudia hádžu kamene do jazera v rovnakom rytme. Niekde sa vlny stretnú hrebeň s hrebeňom a voda poriadne skáče, inde hrebeň s dolinou a voda je takmer pokojná. Tieto miesta sa nemenia – to je interferenčný obrazec.',
    fig: 'interference',
    formula: {
      f: 'Δ = d₂ − d₁     maximum: Δ = 2n · λ/2 = n · λ     minimum: Δ = (2n + 1) · λ/2',
      what: 'Dráhový rozdiel a podmienky interferenčných maxím a miním (n = 0, ±1, ±2, …)',
      vars: [
        ['Δ', 'dráhový rozdiel [m]'],
        ['d₁, d₂', 'vzdialenosti bodu P od zdrojov Z₁ a Z₂ [m]'],
        ['λ', 'vlnová dĺžka [m], λ = c/f'],
        ['n', 'celé číslo, poradie maxima alebo minima (MAXₙ, MINₙ)'],
      ],
    },
    deeper:
      'Prečo práve tieto podmienky? Vlna z každého zdroja má v bode P fázu ω·t − k·d. Rozdiel fáz je k·(d₂ − d₁) = 2π·Δ/λ. Ak Δ = n·λ, rozdiel fáz je n·2π – kmity sú synfázne a ich amplitúdy sa sčítajú. Ak Δ = (2n + 1)·λ/2, rozdiel fáz je (2n + 1)·π – kmity sú v protifáze a amplitúdy sa odčítajú.\n\n' +
      'Zdroje sú koherentné (rovnaká frekvencia), takže tento rozdiel fáz sa v čase nemení. Každý bod P má preto stálu amplitúdu a obrazec „stojí“. Pri nekoherentných zdrojoch by sa fázový rozdiel stále menil a stály obrazec by nevznikol.\n\n' +
      'Prednáška pri týchto vzorcoch uvádza podmienku λ ≪ |Z₁Z₂| (vlnová dĺžka je oveľa menšia ako vzdialenosť zdrojov). Dráhový rozdiel nikdy nemôže byť väčší ako |Z₁Z₂| (trojuholníková nerovnosť), takže len pri malej λ vznikne veľa maxím a miním.',
    worked: {
      q: 'Dva reproduktory hrajú synfázne tón 680 Hz, rýchlosť zvuku je 340 m/s. Bod P je 3,00 m od prvého a 3,75 m od druhého reproduktora. Je v ňom maximum alebo minimum?',
      steps: [
        'Vieme: f = 680 Hz, c = 340 m/s, d₁ = 3,00 m, d₂ = 3,75 m. Hľadáme: či je v P maximum, alebo minimum.',
        'Vlnová dĺžka: λ = c/f = 340/680 = 0,5 m.',
        'Dráhový rozdiel: Δ = d₂ − d₁ = 3,75 − 3,00 = 0,75 m.',
        'Koľko polvĺn to je? Δ/(λ/2) = 0,75/0,25 = 3 – nepárny počet polvĺn, teda (2n + 1)·λ/2 pre n = 1.',
        'Nepárny násobok polvlny → minimum (MIN₁).',
        'Kontrola: 0,75 m = 1,5·λ, teda jeden a pol vlny – vrchol jednej vlny príde spolu s dolinou druhej.',
      ],
      result: 'V bode P je interferenčné minimum (Δ = 3·λ/2).',
    },
  },
  {
    title: 'Interferenčný obraz: hyperboly',
    text:
      'Kde všade je napríklad maximum MAX₁? Všade, kde Δ = d₂ − d₁ = λ. Množina bodov v rovine, ktorých rozdiel vzdialeností od dvoch pevných bodov je stály, je v matematike vetva hyperboly a zdroje Z₁, Z₂ sú jej ohniská.\n\n' +
      'Interferenčný obraz je preto sústava hyperbol očíslovaných celými číslami: MAX₀ je priamka – os medzi zdrojmi (Δ = 0), vedľa nej MIN₀ a MIN₋₁ (Δ = ±λ/2), potom MAX₁ a MAX₋₁ (Δ = ±λ) atď. Maximá a minimá sa pravidelne striedajú a čím je λ menšia, tým sú hyperboly hustejšie.\n\n' +
      'Zaujímavosť pre geodetov: rovnakú geometriu využívala hyperbolická rádiová navigácia (napr. LORAN). Loď zmerala rozdiel časov príchodu signálov z dvoch vysielačov, teda dráhový rozdiel, a vedela, na ktorej hyperbole leží. Druhá dvojica vysielačov dala druhú hyperbolu a ich priesečník určil polohu.',
    check: {
      q: 'Ktorá krivka spája všetky body, v ktorých je interferenčné maximum MAX₂ (Δ = 2λ)?',
      options: [
        'Vetva hyperboly s ohniskami v zdrojoch',
        'Kružnica so stredom v jednom zdroji',
        'Elipsa s ohniskami v zdrojoch',
        'Priamka rovnobežná so spojnicou zdrojov',
      ],
      explain:
        'Stály ROZDIEL vzdialeností od dvoch bodov dáva hyperbolu. Stály SÚČET vzdialeností by dal elipsu – to si nepleť. Priamka je iba MAX₀ (Δ = 0), čo je špeciálny prípad.',
    },
  },
  {
    title: 'Príklad: dva reproduktory',
    text:
      'Na skúške sa často pýtajú opačne: poznáme polohu minima alebo maxima a máme zistiť vlnovú dĺžku či frekvenciu. Postup je vždy rovnaký: zo súradníc vypočítaj vzdialenosti d₁ a d₂ (Pytagorova veta), z nich dráhový rozdiel Δ a podľa toho, o ktoré maximum alebo minimum ide, vyjadri λ.\n\n' +
      'Na strednej osi je MAX₀ (Δ = 0). Keď sa posúvaš bokom, dráhový rozdiel rastie a prvé minimum prichádza pri |Δ| = λ/2. Počítaj presne cez Pytagorovu vetu: približné vzorce predpokladajú, že prijímač je veľmi ďaleko od zdrojov, a to tu neplatí.',
    worked: {
      q: 'Dva reproduktory sú 2,5 m od seba a hrajú rovnaký tón. Prijímač je 3,5 m od stredu medzi nimi (kolmo na ich spojnicu). Keď ho posunieme rovnobežne so spojnicou reproduktorov o 1,55 m, zachytí prvé interferenčné minimum. Aká je frekvencia zvuku? Rýchlosť zvuku je 340 m/s. (príklad 23 zo 7. cvičenia)',
      steps: [
        'Vieme: vzdialenosť reproduktorov 2,5 m, vzdialenosť prijímača od ich spojnice 3,5 m, posun 1,55 m, c = 340 m/s. Hľadáme: f.',
        'Súradnice: počiatok v strede medzi reproduktormi, Z₁ = (−1,25; 0), Z₂ = (1,25; 0), prijímač P = (1,55; 3,5).',
        'Vzdialenosť od Z₁: d₁ = √((1,55 + 1,25)² + 3,5²) = √(2,8² + 3,5²) = √(7,84 + 12,25) = √20,09 ≈ 4,482 m.',
        'Vzdialenosť od Z₂: d₂ = √((1,55 − 1,25)² + 3,5²) = √(0,3² + 3,5²) = √(0,09 + 12,25) = √12,34 ≈ 3,513 m.',
        'Veľkosť dráhového rozdielu: |Δ| = 4,482 − 3,513 ≈ 0,969 m.',
        'Prvé minimum: |Δ| = λ/2 → λ = 2·0,969 ≈ 1,939 m.',
        'Frekvencia: f = c/λ = 340/1,939 ≈ 175 Hz.',
        'Kontrola: 175 Hz · 1,939 m ≈ 340 m/s. Pozor: približný vzorec Δ ≈ (vzdialenosť zdrojov)·(posun)/(vzdialenosť prijímača) = 2,5·1,55/3,5 ≈ 1,107 m by dal f ≈ 154 Hz – tu je nepresný, lebo prijímač nie je ďaleko.',
      ],
      result: 'f ≈ 175 Hz (λ ≈ 1,94 m).',
    },
  },
  {
    title: 'Huygensov princíp',
    text:
      'Ako „vie“ vlna, kam má ísť ďalej? Holandský fyzik Christiaan Huygens prišiel s jednoduchou myšlienkou: každý bod, do ktorého vlna práve dorazila (každý bod čela vlny), sa stane malým zdrojom nových, druhotných vlniek. Tie sa šíria do všetkých strán rovnakou rýchlosťou ako pôvodná vlna.\n\n' +
      'Nové čelo vlny o chvíľu neskôr je obálka všetkých týchto vlniek – plocha, ktorá sa ich všetkých zvonka dotýka. Na obrázku je modrá čiara staré čelo, žlté oblúčiky sú vlnky a zelená prerušovaná čiara je nové čelo.\n\n' +
      'Znie to ako trik, ale je to veľmi užitočné: z Huygensovho princípu odvodíme zákon odrazu, zákon lomu aj to, prečo sa vlna ohýba za prekážku (difrakcia). V rovnorodom prostredí sú všetky vlnky rovnaké a čelo sa iba posúva ďalej.',
    analogy:
      'Rad ľudí podáva vedrá s vodou: každý, kto vedro dostane, ho hneď podá ďalej. Nezáleží, kto začal – „vlna“ vedier ide ďalej, lebo každý článok sa správa ako nový štartér. Podobne každý bod čela vlny „naštartuje“ ďalšie vlnky.',
    fig: 'huygens',
    check: {
      q: 'Čo je podľa Huygensovho princípu nové čelo vlny?',
      options: [
        'Obálka druhotných vlniek, ktoré vychádzajú z bodov starého čela',
        'Prvá vlnoplocha, ktorú vyšle zdroj',
        'Miesto, kde je interferenčné maximum',
        'Kolmica na staré čelo vlny',
      ],
      explain:
        'Body starého čela sa stanú zdrojmi druhotných vĺn a ich spoločná obálka tvorí nové čelo. Kolmica na čelo je lúč, nie čelo.',
    },
  },
  {
    title: 'Zákon odrazu a lomu vlny',
    text:
      'Keď vlna narazí na prekážku, odrazí sa. Uhly meriame vždy od kolmice na plochu, nie od plochy samotnej: uhol dopadu α je medzi dopadajúcim lúčom a kolmicou, uhol odrazu β medzi odrazeným lúčom a kolmicou. Zákon odrazu hovorí: α = β.\n\n' +
      'Keď vlna prechádza cez rozhranie do prostredia s inou rýchlosťou, zmení smer – láme sa. Zákon lomu: sin α / sin β = c₁/c₂, kde β je teraz uhol lomu v druhom prostredí. Ak je druhé prostredie rýchlejšie (c₂ > c₁), lúč sa láme od kolmice (β > α); ak je pomalšie, ku kolmici.\n\n' +
      'Pri prechode do rýchlejšieho prostredia môže sin β vyjsť väčší ako 1 – taký uhol neexistuje a vlna do druhého prostredia neprejde, celá sa odrazí (úplný odraz). Hraničný (kritický) uhol dopadu je ten, pri ktorom β = 90°: sin αₖ = c₁/c₂. Pri výpočte maj kalkulačku v stupňoch (DEG), keď sú uhly v stupňoch.',
    formula: {
      f: 'odraz: α = β     lom: sin α / sin β = c₁ / c₂',
      what: 'Zákon odrazu a zákon lomu vlny',
      vars: [
        ['α', 'uhol dopadu, meraný od kolmice na rozhranie [°]'],
        ['β', 'uhol odrazu (pri odraze) alebo uhol lomu (pri lome), od kolmice [°]'],
        ['c₁', 'rýchlosť vlny v prostredí, odkiaľ vlna prichádza [m/s]'],
        ['c₂', 'rýchlosť vlny v prostredí, kam vlna prechádza [m/s]'],
      ],
    },
    deeper:
      'Odraz cez Huygensov princíp (podľa prednášky): čelo dopadajúcej vlny AB dopadá šikmo, bod A sa dotkne plochy prvý, bod B má do plochy ešte kus |BB′|. Kým B dobehne do B′, z bodu A sa rozšíri druhotná vlnka do vzdialenosti |AA′|. Obe idú v tom istom prostredí rovnakou rýchlosťou, takže |BB′| = |AA′|. Pravouhlé trojuholníky AB′B a AB′A′ majú spoločnú preponu AB′ a rovnako dlhú odvesnu, sú zhodné, a preto α = β.\n\n' +
      'Lom: rovnaká úvaha, ale vlnka z A ide v druhom prostredí rýchlosťou c₂, kým B ide v prvom rýchlosťou c₁. Za ten istý čas platí |BB′|/c₁ = |AA′|/c₂, teda |BB′|/|AA′| = c₁/c₂.\n\n' +
      'V pravouhlých trojuholníkoch so spoločnou preponou AB′ je |BB′| = |AB′|·sin α a |AA′| = |AB′|·sin β. Vydelením dostaneme sin α / sin β = c₁/c₂.',
    worked: {
      q: 'Zvuk dopadá zo vzduchu (c₁ = 340 m/s) na vodnú hladinu (vo vode c₂ = 1480 m/s) pod uhlom 10° od kolmice. Pod akým uhlom sa láme? Od akého uhla dopadu už do vody vôbec neprenikne?',
      steps: [
        'Vieme: α = 10°, c₁ = 340 m/s, c₂ = 1480 m/s. Hľadáme: uhol lomu β a kritický uhol αₖ.',
        'Použijeme zákon lomu sin α / sin β = c₁/c₂, lebo vlna prechádza do iného prostredia.',
        'Vyjadríme: sin β = sin α · c₂/c₁ = sin 10° · 1480/340 = 0,1736 · 4,353 ≈ 0,756.',
        'β = arcsin 0,756 ≈ 49,1°. Voda je rýchlejšia, lúč sa láme od kolmice (49,1° > 10°) – sedí.',
        'Kritický uhol: β = 90°, sin 90° = 1, takže sin αₖ = c₁/c₂ = 340/1480 ≈ 0,2297 → αₖ ≈ 13,3°.',
        'Pri uhle dopadu väčšom ako 13,3° sa zvuk od hladiny úplne odrazí. Preto pod vodou takmer nepočuť, čo sa rozpráva na brehu.',
      ],
      result: 'β ≈ 49,1°; pri uhloch dopadu nad ≈ 13,3° nastane úplný odraz.',
    },
    check: {
      q: 'Vlna prechádza do prostredia, v ktorom je POMALŠIA. Ako sa lúč zlomí?',
      options: ['Ku kolmici (uhol lomu je menší ako uhol dopadu)', 'Od kolmice', 'Vôbec sa nezlomí', 'Vždy sa úplne odrazí'],
      explain:
        'sin β = sin α · c₂/c₁ a c₂ < c₁, takže sin β < sin α, čiže β < α – lúč sa priblíži ku kolmici. Úplný odraz hrozí len pri prechode do rýchlejšieho prostredia.',
    },
  },
  {
    title: 'Refrakcia a difrakcia',
    text:
      'Refrakcia je postupné zakrivenie lúča v nehomogénnom prostredí, kde sa rýchlosť vlny mení z miesta na miesto. Najjednoduchšie je vrstvené prostredie, kde rýchlosť závisí len od jednej súradnice, napr. od výšky. Lúč sa v ňom ohýba smerom k vrstve s menšou rýchlosťou šírenia.\n\n' +
      'Príklad: v noci býva pri zemi studený vzduch (pomalší zvuk) a vyššie teplejší. Zvuk, ktorý ide šikmo hore, sa ohne naspäť k zemi, a preto je v noci počuť ďaleko. Geodetov sa to týka priamo: aj svetlo v atmosfére sa takto zakrivuje (terestrická refrakcia) a pri presnom meraní uhlov sa to musí opravovať.\n\n' +
      'Difrakcia (ohyb) je ohyb vlny okolo okrajov prekážky alebo za štrbinou do oblasti geometrického tieňa. Štrbina sa podľa Huygensa stane zdrojom druhotných vĺn, ktoré sa šíria aj do strán. Na obrázku rovinná vlna prejde štrbinou a za ňou sa rozlieva v oblúkoch aj do sivých „tieňových“ oblastí; difrakcia je výrazná, keď je štrbina porovnateľná s vlnovou dĺžkou.',
    fig: 'diffraction',
    deeper:
      'Prečo sa lúč ohýba k pomalšej vrstve? Rozkrájaj prostredie na tenké vrstvy. Na rozhraní i-tej a (i + 1)-vej vrstvy platí zákon lomu sin αᵢ₊₁ / sin αᵢ = cᵢ₊₁/cᵢ. Ak rýchlosť z vrstvy do vrstvy klesá, je každý ďalší uhol (od kolmice na vrstvy) o máličko menší a lúč sa postupne stáča – do pomalšej oblasti. Pri nekonečne tenkých vrstvách sa lomená čiara zmení na hladkú krivku.\n\n' +
      'Inak cez vlnoplochy: časť vlnoplochy v pomalšom prostredí zaostáva, časť v rýchlejšom predbieha. Vlnoplocha sa tak natáča a lúč (kolmý na ňu) sa stáča k pomalšej strane – ako auto, ktoré zíde pravými kolesami do štrku a stáča sa doprava.\n\n' +
      'Difrakcia a vlnová dĺžka: zvuk má vlnovú dĺžku od centimetrov po metre (pri 340 Hz je λ = 1 m), teda rozmer dverí – preto počuješ rozhovor spoza rohu. Svetlo má λ okolo 0,5 µm, na dverách sa ohne nepatrne, a tak za roh nevidíš.',
    check: {
      q: 'Prečo počuješ rozhovor z vedľajšej miestnosti cez otvorené dvere, aj keď ľudí nevidíš?',
      options: [
        'Zvuk má vlnovú dĺžku porovnateľnú s dverami, preto sa za nimi výrazne ohýba (difrakcia)',
        'Zvuk je rýchlejší ako svetlo',
        'Svetlo sa nikdy neohýba, zvuk áno, lebo je pozdĺžny',
        'Zvuk sa odráža, svetlo nie',
      ],
      explain:
        'Difrakcia je výrazná, keď je otvor porovnateľný s λ. Zvuk (λ okolo 1 m) sa za dverami rozleje do „tieňa“, svetlo (λ okolo 0,5 µm) ide takmer priamo. Svetlo sa tiež ohýba a odráža, ale ohyb vidno až na veľmi malých otvoroch. A zvuk je oveľa pomalší ako svetlo.',
    },
  },
  {
    title: 'Zhrnutie',
    text:
      'Dopplerov jav: pohyb mení frekvenciu, ktorú počuješ – podľa toho, či sa hýbe zdroj alebo prijímač, delíš alebo násobíš. Interferencia: o tom, či sa vlny zosilnia alebo zoslabia, rozhoduje dráhový rozdiel.\n\n' +
      'Huygensov princíp vysvetľuje odraz, lom aj ohyb vĺn. Pri všetkých úlohách si najprv napíš, čo vieš a čo hľadáš, a skontroluj jednotky aj znamienka.',
    bullets: [
      'Dopplerov jav: približovanie → vyššia frekvencia, vzďaľovanie → nižšia.',
      'Hýbe sa zdroj: f′ = f / (1 ∓ v/c) – delíme; horné znamienko pri približovaní.',
      'Hýbe sa prijímač: f′ = f · (1 ± v/c) – násobíme; horné znamienko pri približovaní.',
      'Trvanie signálu sa mení opačne ako frekvencia: pri pohyblivom zdroji t′ = t·(1 ∓ v/c).',
      'Pomerové úlohy: vydeľ f′ pri približovaní a pri vzďaľovaní, neznáma f sa vykráti.',
      'Dráhový rozdiel Δ = d₂ − d₁; maximum Δ = n·λ, minimum Δ = (2n + 1)·λ/2.',
      'Maximá a minimá ležia na hyperbolách s ohniskami v zdrojoch; MAX₀ je os medzi zdrojmi.',
      'Huygens: každý bod čela je zdroj vlniek, nové čelo je ich obálka.',
      'Odraz α = β; lom sin α / sin β = c₁/c₂; uhly vždy od kolmice; kritický uhol sin αₖ = c₁/c₂.',
      'Refrakcia: lúč sa ohýba k pomalšej vrstve. Difrakcia: ohyb do tieňa, výrazný pri otvore porovnateľnom s λ.',
      'Jednotky: km/h : 3,6 = m/s; v a c vždy v rovnakých jednotkách.',
    ],
  },
];

export default steps;
