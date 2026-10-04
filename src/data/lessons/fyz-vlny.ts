import type { Step } from '../steps';

// Mechanické vlnenie (prednáška 2.1–2.4, príklady 10–13 zo 4. cvičenia, 14–15 z 5. cvičenia, 16–20 zo 6. cvičenia).

const steps: Step[] = [
  {
    title: 'Čo je mechanické vlnenie?',
    text:
      'Predstav si dlhý rad guličiek, ktoré sú navzájom pospájané pružinkami. Keď prvou guličkou trhneš, potiahne cez pružinku druhú, druhá tretiu a tak ďalej. Tento „vzruch“ beží radom ďalej, hoci každá gulička sa iba trochu pohne okolo svojho miesta a vráti sa späť.\n\n' +
      'Presne takto si fyzika predstavuje pružné prostredie (vzduch, vodu, kov, napnuté lano): veľa častíc spojených pružnými väzbami. Mechanické vlnenie je kmitanie, ktoré sa šíri pružným prostredím. Každá častica kmitá okolo svojej rovnovážnej polohy (miesta, kde by v pokoji stála) a toto kmitanie postupne odovzdáva susedom.\n\n' +
      'Vlna sa šíri konečnou rýchlosťou: ďalšia častica sa rozkmitá až o chvíľu neskôr, lebo najprv musí „dostať správu“ od suseda (princíp kauzality – príčina je vždy skôr ako dôsledok). A vlna neprenáša hmotu, iba energiu: po prechode vlny zostanú častice tam, kde boli.\n\n' +
      'Na obrázku sleduj žltú guličku. Iba kmitá hore-dole na svojom mieste, no tvar vlny (vrcholy a doliny) sa posúva doprava. To je celá podstata vlny.',
    analogy:
      'Mexická vlna na štadióne: každý divák iba vstane a sadne si na svoje miesto, nikto nikam neodchádza. Napriek tomu „vlna“ obehne celý štadión. Diváci sú častice, vstávanie je kmitanie a obiehajúca vlna je vlnenie.',
    fig: 'fyz:vlny',
    check: {
      q: 'Čo prenáša mechanická vlna z jedného miesta na druhé?',
      options: ['Energiu, ale nie hmotu', 'Hmotu aj energiu', 'Hmotu, ale nie energiu', 'Nič, mení sa iba tvar na jednom mieste'],
      explain:
        'Častice kmitajú len okolo svojich rovnovážnych polôh, takže hmota zostáva na mieste. Kmitajúce častice však majú energiu a odovzdávajú ju ďalej – preto zvuk dokáže rozkmitať tvoj ušný bubienok.',
    },
  },
  {
    title: 'Priečna a pozdĺžna, postupná a stojatá',
    text:
      'Vlny triedime podľa toho, ktorým smerom kmitajú častice voči smeru šírenia vlny. Pri priečnej vlne kmitajú častice kolmo na smer šírenia (vlna ide doprava, častice hore-dole) – napríklad vlna na lane alebo na strune gitary. Pri pozdĺžnej vlne kmitajú častice v smere šírenia (dopredu-dozadu), takže sa striedajú zhustenia (častice natlačené k sebe) a zriedenia (častice ďalej od seba).\n\n' +
      'Na obrázku je pozdĺžna vlna: guličky sa hýbu iba doľava-doprava a vidíš, ako nimi putujú zhustenia. Takto sa šíri zvuk vo vzduchu. Vo vnútri plynov a kvapalín sa šíria iba pozdĺžne vlny, lebo ich vrstvy sa po sebe ľahko kĺžu (nemajú pružnosť v šmyku); pevné látky vedú oba druhy.\n\n' +
      'Druhé triedenie je podľa rýchlosti šírenia. Postupná vlna sa šíri nenulovou rýchlosťou a prenáša energiu v smere šírenia. Stojatá vlna má rýchlosť šírenia nulovú, „stojí na mieste“ a energiu neprenáša – podrobne ju preberieme na konci lekcie.',
    analogy:
      'Pružinová hračka (slinky) natiahnutá po zemi: keď jej koniec trhneš do boku, beží po nej priečna vlna. Keď koniec rýchlo strčíš dopredu, po pružine bežia zhustené závity – pozdĺžna vlna. Podobne funguje rad ľudí, keď do posledného niekto strčí.',
    fig: 'fyz:vlny@poz',
    check: {
      q: 'Prečo sa zvuk vo vzduchu šíri ako pozdĺžna vlna?',
      options: [
        'Vzduch nemá pružnosť v šmyku, vie sa len stláčať a rozpínať',
        'Lebo vzduch je ľahký',
        'Lebo zvuk má vysokú frekvenciu',
        'Zvuk vo vzduchu je v skutočnosti priečna vlna',
      ],
      explain:
        'Priečna vlna potrebuje, aby susedné vrstvy ťahali jedna druhú do boku (šmyková pružnosť). Plyn to nevie, vie sa len zhustiť a zriediť, preto vedie iba pozdĺžne vlny. V pevnej zemi sa pri zemetrasení šíria oba druhy (využijeme to v príklade 13).',
    },
  },
  {
    title: 'Fáza vlny, vlnové číslo a vlnová funkcia',
    text:
      'Pri kmitoch sme pohyb jednej častice opísali funkciou y = A·sin(ω·t + φ₀). Vlna je zložitejšia: výchylka závisí od času t aj od miesta x, lebo všetky častice kmitajú rovnako, ale s oneskorením. Častica ďalej od zdroja „robí to isté, čo zdroj, iba neskôr“.\n\n' +
      'Toto oneskorenie zachytí fáza vlny φ(x; t) = ω·t − k·x (jednotka rad). Uhlová frekvencia ω je rovnaká ako uhlová frekvencia kmitania častíc a nemení sa ani pri prechode vlny do iného prostredia. Nová veličina je vlnové číslo k: hovorí, o koľko radiánov sa líšia fázy dvoch častíc vzdialených od seba 1 m (v tom istom okamihu). Jednotka je rad·m⁻¹, skrátene m⁻¹.\n\n' +
      'Vlnová funkcia s(x; t) = A·sin(ω·t − k·x) povie výchylku častice v mieste x v čase t. Amplitúda vlny A je amplitúda kmitania častíc. Znamienko mínus pred k·x znamená, že vlna ide v smere +x (doprava); vlna A·sin(ω·t + k·x) ide opačne, doľava.',
    formula: {
      f: 's(x; t) = A · sin(ω·t − k·x)     φ(x; t) = ω·t − k·x',
      what: 'Vlnová funkcia rovinnej postupnej vlny a fáza vlny',
      vars: [
        ['s', 'výchylka častice s rovnovážnou polohou v mieste x, v čase t [m]'],
        ['A', 'amplitúda vlny = najväčšia výchylka častíc [m]'],
        ['ω', 'uhlová frekvencia [rad/s], ω = 2π·f = 2π/T'],
        ['t', 'čas [s]'],
        ['k', 'vlnové číslo [rad/m]: rozdiel fáz dvoch častíc vzdialených 1 m'],
        ['x', 'poloha častice v smere šírenia vlny [m]'],
        ['φ', 'fáza vlny [rad]: v ktorej časti svojho kmitu je častica'],
      ],
    },
    deeper:
      'Odkiaľ sa vzalo −k·x? Zdroj v mieste x = 0 kmitá podľa s(0; t) = A·sin(ω·t). Vlna ide rýchlosťou c, takže do miesta x dorazí za čas x/c. Častica v mieste x preto robí presne to, čo zdroj, ale o x/c neskôr: s(x; t) = A·sin(ω·(t − x/c)).\n\n' +
      'Roznásobíme: ω·(t − x/c) = ω·t − (ω/c)·x. Číslo ω/c nazveme vlnové číslo, k = ω/c. Tak dostaneme s(x; t) = A·sin(ω·t − k·x).\n\n' +
      'Prečo mínus znamená smer doprava? Vrchol vlny je miesto so stálou fázou, napr. ω·t − k·x = π/2. Keď t rastie, musí rásť aj x, aby fáza zostala rovnaká – vrchol sa teda posúva k väčším x. Pri ω·t + k·x by x muselo klesať a vrchol by išiel doľava.',
    worked: {
      q: 'Zvuková vlna je daná rovnicou s(x; t) = 3 nm · sin(1700π rad·s⁻¹ · t − 5 rad·m⁻¹ · x) (príklad z prednášky). Urči amplitúdu, uhlovú frekvenciu, frekvenciu, periódu, vlnové číslo, smer šírenia a výchylku častice v mieste x = 2 m v čase t = 0.',
      steps: [
        'Vieme: rovnicu vlny. Porovnáme ju so všeobecným tvarom s = A·sin(ω·t − k·x) a čísla „odčítame“.',
        'Amplitúda je číslo pred sínusom: A = 3 nm = 3·10⁻⁹ m (nanometre – zvuk hýbe časticami len nepatrne).',
        'Pred t stojí ω = 1700π rad/s ≈ 5341 rad/s. Frekvencia f = ω/(2π) = 1700π/(2π) = 850 Hz.',
        'Perióda T = 1/f = 1/850 s ≈ 0,001 18 s = 1,18 ms.',
        'Pred x stojí k = 5 rad/m. Znamienko je mínus, takže vlna ide v smere +x (doprava).',
        'Výchylka pre x = 2 m, t = 0: fáza φ = 1700π·0 − 5·2 = −10 rad, s = 3 nm · sin(−10) = 3 nm · 0,544 ≈ 1,63 nm.',
        'Pozor: sin(−10) počítaš v RADIÁNOCH (kalkulačka v režime RAD). V stupňoch by vyšlo sin(−10°) ≈ −0,174 a výsledok by bol zlý.',
      ],
      result: 'A = 3 nm, ω = 1700π rad/s, f = 850 Hz, T ≈ 1,18 ms, k = 5 rad/m, smer +x, s(2 m; 0) ≈ 1,63 nm.',
    },
    check: {
      q: 'Vlna má vlnové číslo k = π m⁻¹. Ako kmitajú dve častice vzdialené od seba 1 m?',
      options: ['V protifáze (jedna hore, keď druhá dole)', 'Synfázne (úplne rovnako)', 'S fázovým rozdielom π/2', 'Nedá sa to určiť bez frekvencie'],
      explain:
        'Rozdiel fáz je k·Δx = π·1 = π rad, teda pol otáčky – protifáza. Pri k = 2π m⁻¹ by bol rozdiel 2π a častice by kmitali synfázne (oba prípady sú nakreslené v prednáške).',
    },
  },
  {
    title: 'Vlnová dĺžka a fázová rýchlosť',
    text:
      'Vlnová dĺžka λ (lambda) je vzdialenosť dvoch najbližších miest, ktoré kmitajú úplne rovnako – napríklad dvoch susedných vrcholov. Prednáška ju definuje dvoma rovnocennými spôsobmi: vzdialenosť dvoch vlnoplôch s fázovým rozdielom 2π rad (preto λ = 2π/k), alebo vzdialenosť, ktorú vlna prejde za jednu periódu T (preto λ = c·T).\n\n' +
      'Fázová rýchlosť c je rýchlosť, ktorou sa posúva miesto s rovnakou fázou (napr. vrchol). Platí c = ω/k. Keď spojíme λ = c·T a f = 1/T, dostaneme najpoužívanejší vzťah c = λ·f: rýchlosť = vlnová dĺžka krát frekvencia.\n\n' +
      'Na obrázku je postupná vlna so žltými značkami λ. Za jeden kmit (čas T) sa celý tvar posunie presne o jednu vlnovú dĺžku. Pre vlnu z predchádzajúceho kroku: λ = 2π/5 ≈ 1,26 m a c = ω/k = 1700π/5 ≈ 1068 m/s; skúška: λ·f = 1,257·850 ≈ 1068 m/s.',
    fig: 'lambda',
    formula: {
      f: 'c = ω / k     λ = 2π / k = c · T     c = λ · f',
      what: 'Fázová rýchlosť a vlnová dĺžka',
      vars: [
        ['c', 'fázová rýchlosť vlny [m/s] (zvuk vo vzduchu ≈ 340 m/s)'],
        ['ω', 'uhlová frekvencia [rad/s]'],
        ['k', 'vlnové číslo [rad/m]'],
        ['λ', 'vlnová dĺžka [m]'],
        ['T', 'perióda [s]'],
        ['f', 'frekvencia [Hz = 1/s]'],
      ],
    },
    deeper:
      'Odvodenie c = ω/k (podľa prednášky): sledujme jednu vlnoplochu, teda miesto so stálou fázou. V čase t₁ je v mieste x₁, v čase t₂ v mieste x₂ a fáza sa nezmenila: ω·t₁ − k·x₁ = ω·t₂ − k·x₂.\n\n' +
      'Preusporiadame: ω·(t₂ − t₁) = k·(x₂ − x₁), čiže ω·Δt = k·Δx. Rýchlosť je dráha lomeno čas: c = Δx/Δt = ω/k.\n\n' +
      'A prečo λ = 2π/k? Dve miesta vzdialené λ majú fázy líšiace sa o k·λ a to má byť jedna celá otočka 2π. Z k·λ = 2π vyjde λ = 2π/k. Ak dosadíme k = ω/c = 2π·f/c, dostaneme λ = c/f, teda c = λ·f.',
    worked: {
      q: 'Mechanická vlna prechádza z jedného prostredia do druhého, kde sa šíri polovičnou rýchlosťou. Čo sa stane s jej frekvenciou a vlnovou dĺžkou? (príklad 10 zo 4. cvičenia)',
      steps: [
        'Vieme: c₂ = c₁/2. Hľadáme: f₂ a λ₂ v porovnaní s f₁ a λ₁.',
        'Frekvenciu určuje zdroj: koľkokrát za sekundu kmitne, toľkokrát za sekundu „postrčí“ častice. Častice na rozhraní kmitajú spolu, takže druhé prostredie dostane rovnaký počet kmitov za sekundu: f₂ = f₁ (prednáška: uhlová frekvencia sa pri prechode nemení).',
        'Použijeme c = λ·f, lebo spája rýchlosť, vlnovú dĺžku a frekvenciu: λ = c/f.',
        'λ₂ = c₂/f₂ = (c₁/2)/f₁ = (c₁/f₁)/2 = λ₁/2.',
        'Kontrola číslami: c₁ = 340 m/s, f = 680 Hz → λ₁ = 0,5 m. V druhom prostredí c₂ = 170 m/s → λ₂ = 170/680 = 0,25 m, naozaj polovica.',
      ],
      result: 'Frekvencia sa nezmení, vlnová dĺžka klesne na polovicu.',
    },
    analogy:
      'Vojaci pochodujú v rytme bubna (frekvencia). Keď zídu z cesty do blata, idú pomalšie, ale bubon bije stále rovnako – takže robia kratšie kroky. Kratší krok je kratšia vlnová dĺžka.',
  },
  {
    title: 'Fázový rozdiel dvoch bodov',
    text:
      'Často sa pýtajú: ako „rozladene“ kmitajú dva body, ktoré ležia v rôznych vzdialenostiach od zdroja? Odpoveď dáva fázový rozdiel Δφ – o koľko radiánov je jeden bod vo svojom kmite pozadu za druhým. V tom istom čase t sa fázy ω·t − k·x₁ a ω·t − k·x₂ líšia iba o k·(x₂ − x₁).\n\n' +
      'Preto Δφ = k·Δx = 2π·Δx/λ. Každá celá vlnová dĺžka vzdialenosti pridá jednu celú otočku 2π. Ak Δx = λ, 2λ, 3λ…, body kmitajú synfázne (rovnako); ak Δx = λ/2, 3λ/2…, kmitajú v protifáze (jeden hore, druhý dole).\n\n' +
      'Typická chyba: dosadiť do vzorca samotné vzdialenosti od zdroja (12 m, 16 m) namiesto ich rozdielu. Dôležitý je iba rozdiel Δx. Druhá chyba: zabudnúť si najprv vypočítať λ, keď je zadaná perióda a rýchlosť.',
    formula: {
      f: 'Δφ = k · Δx = 2π · Δx / λ',
      what: 'Fázový rozdiel dvoch bodov na tom istom lúči',
      vars: [
        ['Δφ', 'fázový rozdiel [rad]'],
        ['k', 'vlnové číslo [rad/m]'],
        ['Δx', 'rozdiel vzdialeností bodov od zdroja [m]'],
        ['λ', 'vlnová dĺžka [m]'],
      ],
    },
    worked: {
      q: 'Dva body sú vo vzdialenostiach 12 m a 16 m od zdroja vlnenia. Perióda kmitov je 0,04 s, rýchlosť šírenia vlny 300 m/s. Aký je fázový rozdiel ich kmitania? (príklad 11 zo 4. cvičenia)',
      steps: [
        'Vieme: x₁ = 12 m, x₂ = 16 m, T = 0,04 s, c = 300 m/s. Hľadáme: Δφ.',
        'Použijeme Δφ = 2π·Δx/λ, lebo fázový rozdiel závisí len od toho, akú časť vlnovej dĺžky tvorí rozdiel vzdialeností.',
        'Najprv vlnová dĺžka: λ = c·T = 300 m/s · 0,04 s = 12 m.',
        'Rozdiel vzdialeností: Δx = 16 m − 12 m = 4 m (tretina vlnovej dĺžky).',
        'Δφ = 2π · 4 m / 12 m = 2π/3 rad ≈ 2,09 rad.',
        'Kontrola inou cestou: k = ω/c = (2π/0,04)/300 ≈ 0,524 rad/m a k·Δx ≈ 0,524·4 ≈ 2,09 rad. Sedí. V stupňoch je to 120°.',
      ],
      result: 'Δφ = 2π/3 rad ≈ 2,09 rad (120°).',
    },
    check: {
      q: 'Dva body na tom istom lúči sú od seba vzdialené 3λ. Ako kmitajú?',
      options: ['Synfázne', 'V protifáze', 'S fázovým rozdielom 3 rad', 'Jeden kmitá, druhý stojí'],
      explain:
        'Δφ = 2π·3λ/λ = 6π, to sú tri celé otočky. Po celých otočkách je častica v rovnakom stave, takže body kmitajú synfázne.',
    },
  },
  {
    title: 'Rýchlosť častice nie je rýchlosť vlny',
    text:
      'Pozor na dve úplne rôzne rýchlosti. Fázová rýchlosť c hovorí, ako rýchlo sa šíri tvar vlny (napr. 340 m/s pre zvuk) a je stála. Rýchlosť častice v hovorí, ako rýchlo sa jedna častica práve hýbe pri kmitaní okolo svojej rovnovážnej polohy – a tá sa neustále mení.\n\n' +
      'Rýchlosť častice dostaneme rovnako ako pri kmitoch: zderivujeme výchylku podľa času (miesto x držíme pevné). Z s = A·sin(ω·t − k·x) vyjde v = A·ω·cos(ω·t − k·x) a zrýchlenie a = −A·ω²·sin(ω·t − k·x) = −ω²·s.\n\n' +
      'Postup pri príkladoch: 1) z rovnice zdroja zisti A a ω, 2) vypočítaj k = ω/c, 3) dosaď x a t do fázy, 4) fázu dosaď do vzorcov pre s, v, a. Kalkulačka musí byť v radiánoch!',
    formula: {
      f: 'v = A·ω · cos(ω·t − k·x)     a = −A·ω² · sin(ω·t − k·x) = −ω² · s',
      what: 'Rýchlosť a zrýchlenie kmitajúcej častice v mieste x',
      vars: [
        ['v', 'rýchlosť častice [m/s] (NIE rýchlosť vlny c)'],
        ['a', 'zrýchlenie častice [m/s²]'],
        ['A·ω', 'najväčšia rýchlosť častice vₘₐₓ [m/s]'],
        ['A·ω²', 'najväčšie zrýchlenie častice aₘₐₓ [m/s²]'],
      ],
    },
    deeper:
      'Pri derivovaní podľa času je x konštanta, takže −k·x sa správa ako počiatočná fáza. Derivácia sin(ω·t + konšt.) podľa t je ω·cos(ω·t + konšt.) a derivácia cos(ω·t + konšt.) je −ω·sin(ω·t + konšt.). Preto v = A·ω·cos(…) a a = −A·ω²·sin(…).\n\n' +
      'Porovnaj veľkosti: pri zvuku s A = 3 nm a ω ≈ 5341 rad/s je najväčšia rýchlosť častice A·ω ≈ 1,6·10⁻⁵ m/s, teda 16 mikrometrov za sekundu. Vlna sa pritom šíri rýchlosťou stoviek metrov za sekundu. Sú to naozaj dve celkom iné veci.',
    worked: {
      q: 'Zdroj vlnenia kmitá podľa funkcie s = sin(2,5π·t). Vlna sa šíri rýchlosťou 100 m/s. Aká je výchylka, rýchlosť a zrýchlenie bodu, ktorý leží 20 m od zdroja, v čase 1 s? (príklad 12 zo 4. cvičenia)',
      steps: [
        'Vieme: zdroj s = 1·sin(2,5π·t), teda A = 1 (zadanie jednotku neuvádza, napr. 1 cm) a ω = 2,5π rad/s. Ďalej c = 100 m/s, x = 20 m, t = 1 s. Hľadáme: s, v, a.',
        'Najprv over, či vlna do bodu vôbec dorazila: potrebuje čas x/c = 20/100 = 0,2 s. V čase 1 s už bod kmitá 0,8 s.',
        'Vlnové číslo: k = ω/c = 2,5π/100 = 0,025π rad/m.',
        'Fáza: φ = ω·t − k·x = 2,5π·1 − 0,025π·20 = 2,5π − 0,5π = 2π rad.',
        'Výchylka: s = A·sin(2π) = 0.',
        'Rýchlosť: v = A·ω·cos(2π) = 1·2,5π·1 = 2,5π ≈ 7,85 (cm/s, ak je A v cm).',
        'Zrýchlenie: a = −A·ω²·sin(2π) = 0.',
        'Kontrola zdravým rozumom: perióda je T = 2π/ω = 0,8 s a bod kmitá práve 0,8 s, teda presne jeden celý kmit. Je tam, kde začínal – v rovnovážnej polohe, kde má najväčšiu rýchlosť a nulové zrýchlenie.',
      ],
      result: 's = 0, v = 2,5π ≈ 7,85 (jednotky amplitúdy za sekundu, napr. cm/s), a = 0.',
    },
  },
  {
    title: 'Vlnoplocha, čelo vlny a lúč',
    text:
      'Vlnoplocha je množina bodov (plocha), ktoré majú v danom okamihu rovnakú fázu. Častice na jednej vlnoploche majú rovnakú výchylku – napríklad všetky sú práve na vrchole. Vlny sa šíria „vo vlnoplochách“: vlnoplocha sa posúva a jej fáza sa pritom nemení.\n\n' +
      'Čelo vlny je prvá vlnoplocha – najvzdialenejšie miesto, kam vlna už dorazila; pred ním častice ešte stoja. Lúč je čiara, ktorá je v každom bode kolmá na vlnoplochu a ukazuje smer šírenia. Na obrázku sú vlnoplochy modré kruhy okolo bodového zdroja a lúče žlté šípky.\n\n' +
      'Podľa tvaru vlnoplôch rozlišujeme rovinnú vlnu (vlnoplochy sú roviny, lúče rovnobežné) a sférickú vlnu (vlnoplochy sú gule okolo bodového zdroja, lúče idú zo stredu von). Ďaleko od zdroja je kúsok gule takmer rovný, preto tam sférickú vlnu môžeme brať ako rovinnú.',
    analogy:
      'Hoď kamienok do jazierka: kruhy na hladine sú vlnoplochy, najväčší kruh je čelo vlny a lúče si predstav ako špice kolesa bicykla, ktoré vychádzajú zo stredu kolmo na kruhy.',
    fig: 'wavefront',
    worked: {
      q: 'Priečne seizmické vlny sa šíria rýchlosťou 5 km/s, pozdĺžne 9 km/s. Čelo pozdĺžnej vlny zaznamenala stanica o 2 min skôr ako čelo priečnej. Ako ďaleko je epicentrum? Stačia na určenie jeho polohy údaje z jednej stanice? (príklad 13 zo 4. cvičenia)',
      steps: [
        'Vieme: c⊥ = 5 km/s (priečna), c∥ = 9 km/s (pozdĺžna), Δt = 2 min = 120 s (minúty preveď na sekundy!). Hľadáme: vzdialenosť d.',
        'Obe čelá vyrazili z epicentra v tom istom okamihu a prešli rovnakú dráhu d. Čas cesty je dráha / rýchlosť: t∥ = d/9, t⊥ = d/5 (d v km, t v s).',
        'Pomalšia priečna vlna príde neskôr: t⊥ − t∥ = Δt, teda d/5 − d/9 = 120.',
        'Spoločný menovateľ 45: 9d/45 − 5d/45 = 4d/45 = 120, takže d = 120·45/4 = 1350 km.',
        'Kontrola: 1350/5 = 270 s, 1350/9 = 150 s, rozdiel 120 s = 2 min. Sedí.',
        'Jedna stanica zistí len vzdialenosť: epicentrum leží niekde na kružnici s polomerom 1350 km okolo stanice. Polohu určia až tri stanice – tri kružnice sa pretnú v jednom bode (trilaterácia, rovnaký princíp ako GPS alebo meranie dĺžok v geodézii).',
      ],
      result: 'd = 1350 km. Jedna stanica nestačí, treba aspoň tri (prienik kružníc).',
    },
    check: {
      q: 'Aký uhol zviera lúč s vlnoplochou?',
      options: ['90° (lúč je na vlnoplochu kolmý)', '0° (lúč leží vo vlnoploche)', '45°', 'Závisí od frekvencie'],
      explain:
        'Lúč je podľa definície v každom bode kolmý na vlnoplochu. Pri sférickej vlne sú lúče polomery gule, pri rovinnej vlne rovnobežné priamky kolmé na roviny vlnoplôch.',
    },
  },
  {
    title: 'Rýchlosť vĺn v strune, tyči a plyne',
    text:
      'Rýchlosť vlny neurčuje zdroj, ale prostredie: ako silno vracia vychýlené častice späť (pružnosť – čím tuhšie, tým rýchlejšie) a aké je zotrvačné (hustota – čím ťažšie, tým pomalšie). Preto majú všetky vzorce tvar c = √(pružnosť / hustota).\n\n' +
      'Napnutá struna vedie iba priečne vlny; ich rýchlosť závisí od sily napnutia F a dĺžkovej hustoty ϱL (hmotnosť 1 metra struny). Hrubá tyč vedie pozdĺžne vlny (pružnosť v ťahu – Youngov modul E) aj priečne vlny (pružnosť v šmyku – modul G). Keďže G je menší ako E, priečne vlny sú pomalšie – preto pri zemetrasení prichádzajú pozdĺžne vlny skôr.\n\n' +
      'V plyne závisí rýchlosť zvuku od tlaku a hustoty, alebo – čo je to isté – od teploty. Pre vzduch: κ = 7/5 = 1,4 (dvojatómové molekuly), M = 28,97 g/mol. Typické chyby: teplotu treba v kelvinoch (T = t + 273,15) a molovú hmotnosť v kg/mol (0,028 97 kg/mol, nie 28,97).',
    formula: {
      f: 'struna: c = √(F / ϱL)     tyč: c∥ = √(E / ϱ),  c⊥ = √(G / ϱ)     plyn: c = √(κ·p / ϱ) = √(κ·R·T / M)',
      what: 'Rýchlosť mechanických vĺn v rôznych prostrediach',
      vars: [
        ['F', 'sila napnutia struny [N]'],
        ['ϱL', 'dĺžková hustota struny = hmotnosť 1 m struny [kg/m]'],
        ['E', 'Youngov modul pružnosti v ťahu [Pa]'],
        ['G', 'modul pružnosti v šmyku [Pa]'],
        ['ϱ', 'objemová hustota [kg/m³] (vzduch ≈ 1,204 kg/m³)'],
        ['κ', 'adiabatický index (vzduch 1,4)'],
        ['p', 'tlak plynu [Pa] (atmosférický ≈ 101 325 Pa)'],
        ['R', 'univerzálna plynová konštanta 8,314 J·mol⁻¹·K⁻¹'],
        ['T', 'teplota v KELVINOCH [K]'],
        ['M', 'molová hmotnosť [kg/mol] (vzduch 0,028 97 kg/mol)'],
      ],
    },
    deeper:
      'Prečo c = √(F/ϱL) pri strune? Skontroluj jednotky: F/ϱL má jednotku N / (kg/m) = (kg·m/s²)·(m/kg) = m²/s². Odmocnina dá m/s, teda rýchlosť. Iná kombinácia F a ϱL rýchlosť nedá.\n\n' +
      'Intuícia: silnejšie napnutá struna ťahá vychýlený kúsok späť väčšou silou, takže sa „vzruch“ odovzdá rýchlejšie. Ťažšia struna má väčšiu zotrvačnosť a reaguje pomalšie. Odmocnina znamená, že 4× väčšia sila dá iba 2× väčšiu rýchlosť.\n\n' +
      'Z plynového vzorca vidno c ~ √T: rýchlosť zvuku rastie s odmocninou absolútnej teploty. Oba tvary vzorca pre plyn sú rovnaké, lebo zo stavovej rovnice ideálneho plynu platí p/ϱ = R·T/M.',
    worked: {
      q: 'Aká je rýchlosť zvuku vo vzduchu pri teplote 16 °C? (Overíme hodnotu ≈ 341 m/s, ktorú používa príklad 15 z 5. cvičenia.)',
      steps: [
        'Vieme: κ = 1,4, R = 8,314 J·mol⁻¹·K⁻¹, M = 28,97 g/mol = 0,028 97 kg/mol, t = 16 °C. Hľadáme: c.',
        'Použijeme c = √(κ·R·T/M), lebo poznáme teplotu (nie tlak a hustotu).',
        'Teplota v kelvinoch: T = 16 + 273,15 = 289,15 K.',
        'Čitateľ: κ·R·T = 1,4 · 8,314 · 289,15 ≈ 3365,6 J/mol.',
        'Vydelíme M: 3365,6 / 0,028 97 ≈ 116 176 m²/s².',
        'Odmocnina: c = √116 176 ≈ 340,8 m/s ≈ 341 m/s.',
        'Kontrola: tým istým vzorcom vyjde pri 20 °C ≈ 343 m/s a pri 0 °C ≈ 331 m/s – známe hodnoty, teplejší vzduch vedie zvuk rýchlejšie.',
      ],
      result: 'c ≈ 341 m/s.',
    },
    check: {
      q: 'Silu napnutia struny zväčšíš 4-krát. Ako sa zmení rýchlosť vlny na strune?',
      options: ['Zväčší sa 2-krát', 'Zväčší sa 4-krát', 'Zväčší sa 16-krát', 'Nezmení sa'],
      explain: 'c = √(F/ϱL). Ak F → 4F, tak c → √4 · c = 2c. Odmocnina zmenu „zmierňuje“.',
    },
  },
  {
    title: 'Zvuk stúpajúci do studenšej výšky',
    text:
      'V atmosfére teplota s výškou zvyčajne klesá. Teplotný gradient −0,007 K/m znamená, že na každý meter výšky je vzduch o 0,007 K chladnejší, na kilometer o 7 K. Keďže c ~ √T, zvuk sa smerom nahor spomaľuje.\n\n' +
      'Keď sa rýchlosť po ceste mení, nemôžeš len vydeliť dráhu jednou rýchlosťou. Treba vedieť, ako sa rýchlosť mení s výškou z: c(z) = c₀·√(T(z)/T₀), kde T(z) = T₀ − 0,007·z. Pri takomto lineárnom poklese teploty vyjde pekný výsledok: čas je presne výška delená aritmetickým priemerom rýchlosti dole a hore.\n\n' +
      'Aj tu číha typická chyba: v pomere teplôt musia byť kelviny. Pomer 219,15 K / 289,15 K má fyzikálny zmysel, pomer stupňov Celzia (−54 °C / 16 °C) nie.',
    formula: {
      f: 'c(z) = c₀ · √(T(z) / T₀)     t = 2h / (c₀ + cₕ)',
      what: 'Rýchlosť zvuku vo výške z a čas výstupu do výšky h (pri lineárnom poklese teploty)',
      vars: [
        ['c₀', 'rýchlosť zvuku pri zemi [m/s]'],
        ['T₀', 'teplota pri zemi [K]'],
        ['T(z)', 'teplota vo výške z [K]'],
        ['cₕ', 'rýchlosť zvuku vo výške h [m/s]'],
        ['h', 'výška [m]'],
        ['t', 'čas, za ktorý zvuk vystúpi do výšky h [s]'],
      ],
    },
    deeper:
      'Odvodenie s integrálom: kúsok výšky dz prejde zvuk za čas dt = dz/c(z). Celkový čas je súčet všetkých kúskov: t = ∫₀ʰ dz / c(z) = (√T₀/c₀) · ∫₀ʰ dz / √(T₀ − γ·z), kde γ = 0,007 K/m.\n\n' +
      'Primitívna funkcia k 1/√(T₀ − γ·z) je −(2/γ)·√(T₀ − γ·z). Medzi 0 a h to dá (2/γ)·(√T₀ − √Tₕ). Spolu t = (2·√T₀/(γ·c₀))·(√T₀ − √Tₕ) ≈ 31,35 s.\n\n' +
      'Prečo to vyjde rovnako ako 2h/(c₀ + cₕ)? Lebo c² je úmerné T a T sa mení lineárne s výškou. Z toho h = T₀·(c₀² − cₕ²)/(γ·c₀²) a t = 2T₀·(c₀ − cₕ)/(γ·c₀²); ich podiel je t/h = 2/(c₀ + cₕ). Pri inej závislosti teploty od výšky by táto skratka neplatila.',
    worked: {
      q: 'Od povrchu Zeme sa vertikálne nahor šíri zvuková vlna. Teplota pri zemi je 16 °C, teplotný gradient −0,007 K/m, rýchlosť zvuku pri 16 °C je ≈ 341 m/s. Za aký čas dosiahne výšku 10 km? (príklad 15 z 5. cvičenia)',
      steps: [
        'Vieme: T₀ = 16 + 273,15 = 289,15 K, c₀ = 341 m/s, h = 10 km = 10 000 m, gradient −0,007 K/m. Hľadáme: čas t.',
        'Teplota vo výške 10 km: Tₕ = 289,15 − 0,007·10 000 = 289,15 − 70 = 219,15 K (asi −54 °C).',
        'Rýchlosť vo výške 10 km: cₕ = c₀·√(Tₕ/T₀) = 341·√(219,15/289,15) = 341·√0,7579 ≈ 341·0,8706 ≈ 296,9 m/s.',
        'Použijeme t = 2h/(c₀ + cₕ), lebo teplota klesá lineárne (odvodenie je v „Prečo to tak je?“).',
        't = 2·10 000 / (341 + 296,9) = 20 000 / 637,9 ≈ 31,35 s.',
        'Kontrola: keby bola rýchlosť všade 341 m/s, trvalo by to 10 000/341 ≈ 29,3 s. Hore je zvuk pomalší, takže čas musí byť o niečo dlhší – 31,35 s je rozumné.',
      ],
      result: 't ≈ 31,4 s.',
    },
  },
  {
    title: 'Energia vlny: hustota energie a intenzita',
    text:
      'Vlna prenáša energiu – kmitajúce častice majú kinetickú aj potenciálnu energiu. Hustota energie e hovorí, koľko joulov mechanickej energie je v 1 m³ prostredia, cez ktoré ide vlna. Závisí od hustoty prostredia, od štvorca amplitúdy a od štvorca uhlovej frekvencie: dvojnásobná amplitúda znamená štvornásobnú energiu.\n\n' +
      'Intenzita vlny I (inak hustota energetického toku) hovorí, koľko energie prejde cez plochu 1 m² (kolmú na lúče) za 1 sekundu. Jednotka je J/(m²·s) = W/m². Platí I = e·c: za 1 s vlna dopraví energiu z „hranolčeka“ s podstavou 1 m² a dĺžkou c.\n\n' +
      'Nepleť si tieto pojmy: hustota energie e [J/m³] je „koľko energie je v priestore“, intenzita I [W/m²] je „koľko energie preteká plochou za sekundu“. Spája ich rýchlosť vlny c.',
    analogy:
      'Dážď: hustota energie je ako množstvo vody, ktoré je v 1 m³ vzduchu v podobe kvapiek. Intenzita je, koľko vody napadá do vedra s otvorom 1 m² za 1 sekundu. Čím rýchlejšie kvapky padajú, tým viac vody za sekundu napadá – preto I = e·c.',
    formula: {
      f: 'e = ½ · ϱ · A² · ω²     I = E / (S · t) = ½ · ϱ · A² · ω² · c = e · c',
      what: 'Hustota energie a intenzita mechanickej vlny',
      vars: [
        ['e', 'hustota energie [J/m³]'],
        ['ϱ', 'hustota prostredia [kg/m³]'],
        ['A', 'amplitúda [m]'],
        ['ω', 'uhlová frekvencia [rad/s]'],
        ['I', 'intenzita = hustota energetického toku [W/m²]'],
        ['E', 'energia, ktorá prejde plochou S za čas t [J]'],
        ['S', 'plocha kolmá na lúče [m²]'],
        ['c', 'rýchlosť vlny [m/s]'],
      ],
    },
    deeper:
      'Hustota energie (podľa prednášky): jedna častica s hmotnosťou m₀ kmitá s celkovou energiou E₁ = ½·m₀·A²·ω² (to je ½·m₀·vₘₐₓ², kde vₘₐₓ = A·ω). V objeme V je N častíc, spolu E = N·E₁ = ½·(N·m₀)·A²·ω² = ½·m·A²·ω². Hmotnosť je m = ϱ·V, takže E = ½·ϱ·V·A²·ω² a e = E/V = ½·ϱ·A²·ω².\n\n' +
      'Intenzita: čelo vlny sa za čas t posunie o c·t. Vlna teda „naplnila“ energiou valec s prierezom S a dĺžkou c·t, s objemom V = S·c·t. Energia v ňom je E = e·S·c·t a intenzita I = E/(S·t) = e·c = ½·ϱ·A²·ω²·c.',
    worked: {
      q: 'Aká je energia zvukových vĺn v oblasti tvaru gule s polomerom 5 m so stredom v bodovom zdroji zvuku s výkonom 1,7 W? Rýchlosť zvuku je 340 m/s. (príklad 16 zo 6. cvičenia)',
      steps: [
        'Vieme: P = 1,7 W (zdroj vyžiari 1,7 J každú sekundu), R = 5 m, c = 340 m/s. Hľadáme: energiu E vo vnútri gule.',
        'Úvaha: energia uteká od zdroja rýchlosťou c. V guli je práve tá energia, ktorú zdroj vyžiaril počas posledného času, kým zvuk prejde od stredu po okraj. Staršia energia už guľu opustila.',
        'Čas prechodu cez polomer: t = R/c = 5 m / 340 m/s ≈ 0,0147 s.',
        'Energia: E = P·t = P·R/c = 1,7 W · 5 m / 340 m/s = 0,025 J.',
        'Kontrola jednotkami: W·m/(m/s) = W·s = J. Sedí. (Iný spôsob cez hustotu energie je v ďalšom kroku v „Prečo to tak je?“.)',
      ],
      result: 'E = 0,025 J = 25 mJ.',
    },
  },
  {
    title: 'Sférická vlna: I = P/(4πr²) a A ~ 1/r',
    text:
      'Bodový zdroj vysiela vlny rovnako do všetkých strán – sférickú vlnu. Výkon zdroja P [W] je energia, ktorú vyžiari za 1 sekundu. Vo vzdialenosti r sa celá táto energia musí „pretlačiť“ cez povrch gule s polomerom r, ktorý má obsah 4πr².\n\n' +
      'Na 1 m² teda pripadne I = P/(4πr²). Na obrázku vidíš, že pri dvojnásobnej vzdialenosti sa rovnaký výkon rozdelí na 4× väčšiu plochu, takže intenzita je 4× menšia; pri trojnásobnej 9× menšia. Rovinná vlna sa nerozširuje, preto má intenzitu aj amplitúdu stálu.\n\n' +
      'Keďže I ~ A² (z I = ½·ϱ·A²·ω²·c) a zároveň I ~ 1/r², musí byť A ~ 1/r: amplitúda klesá iba s prvou mocninou vzdialenosti. Vlnová funkcia sférickej vlny je s(r; t) = (A₀/r)·sin(ω·t − k·r).',
    fig: 'sphere',
    formula: {
      f: 'I = P / (4π·r²)     A ~ 1/r     s(r; t) = (A₀ / r) · sin(ω·t − k·r)',
      what: 'Intenzita, amplitúda a vlnová funkcia sférickej vlny',
      vars: [
        ['I', 'intenzita vo vzdialenosti r [W/m²]'],
        ['P', 'výkon zdroja [W]'],
        ['r', 'vzdialenosť od zdroja [m]'],
        ['4π·r²', 'povrch gule s polomerom r [m²]'],
        ['A₀', 'konštanta: amplitúda vo vzdialenosti 1 m od zdroja'],
        ['~', '„je úmerné“: koľkokrát zväčšíš r, toľkokrát sa zmenší A'],
      ],
    },
    deeper:
      'Intenzita (podľa prednášky): I = E/(S·t) = (E/t)·(1/S). Energia za čas je výkon, E/t = P, a plocha je povrch gule S = 4πr². Teda I = P/(4πr²).\n\n' +
      'Amplitúda: dáme do rovnosti oba vzorce pre intenzitu, P/(4πr²) = ½·ϱ·ω²·c·A². Vyjadríme A = (1/ω)·√(P/(2π·ϱ·c))·(1/r). Všetko pred 1/r sú konštanty, preto A ~ 1/r.\n\n' +
      'Príklad 16 inak: hustota energie vo vzdialenosti r je e = I/c = P/(4πr²·c). Tenká guľová vrstva s polomerom r a hrúbkou dr má objem 4πr²·dr a energiu e·4πr²·dr = (P/c)·dr. Sčítaním (integrálom) od 0 po R: E = P·R/c = 1,7·5/340 = 0,025 J – rovnaký výsledok.',
    worked: {
      q: 'Nájdi výkon bodového zdroja zvuku, ak vo vzdialenosti 7,5 m od neho je hustota energetického toku vlny 6,3 mW/m². (príklad 17 zo 6. cvičenia)',
      steps: [
        'Vieme: r = 7,5 m, I = 6,3 mW/m² = 6,3·10⁻³ W/m². Hľadáme: výkon P.',
        '„Hustota energetického toku“ je iný názov pre intenzitu. Použijeme I = P/(4πr²), lebo zdroj je bodový (sférická vlna).',
        'Vyjadríme P: P = I · 4π·r².',
        'Povrch gule: 4π·r² = 4π·7,5² = 4π·56,25 ≈ 706,9 m².',
        'P = 6,3·10⁻³ W/m² · 706,9 m² ≈ 4,45 W.',
        'Kontrola: W/m² · m² = W. Pozor na prevod mW → W (inak vyjde 4453, čo je 1000× viac).',
      ],
      result: 'P ≈ 4,45 W.',
    },
    check: {
      q: 'Vzdiališ sa od bodového zdroja na dvojnásobnú vzdialenosť. Čo sa stane s intenzitou a amplitúdou?',
      options: ['Intenzita klesne 4×, amplitúda 2×', 'Obe klesnú 2×', 'Obe klesnú 4×', 'Intenzita klesne 2×, amplitúda 4×'],
      explain: 'I ~ 1/r²: (1/2)² = 1/4. A ~ 1/r: 1/2. Súhlasí to aj s I ~ A²: (1/2)² = 1/4.',
    },
  },
  {
    title: 'Skladanie vĺn, interferencia a stojatá vlna',
    text:
      'Keď sa v jednom mieste stretnú dve vlny, častica tam dostane výchylku od oboch naraz a výchylky sa (vektorovo) sčítajú: s = s₁ + s₂. Tomu hovoríme skladanie vĺn. Vlny cez seba prejdú a idú ďalej, akoby sa nestretli.\n\n' +
      'Dve vlny sú koherentné, keď majú rovnakú frekvenciu. Skladanie koherentných vĺn sa volá interferencia – vzniká pri nej stály obrazec, kde sa vlny niekde trvalo zosilňujú a inde zoslabujú. Špeciálny prípad: dve rovnaké vlny idúce proti sebe (napr. vlna a jej odraz na konci struny) vytvoria stojatú vlnu.\n\n' +
      'Stojatá vlna sa nikam nešíri. Body, ktoré vôbec nekmitajú, sú uzly (na obrázku červené krúžky); body, ktoré kmitajú s najväčšou amplitúdou, sú kmitne. Susedné uzly sú od seba λ/2, susedné kmitne tiež λ/2 a uzol od susednej kmitne λ/4.',
    analogy:
      'Struna gitary po brnknutí: vidíš rozmazané „vretienko“ – v strede kmitá najviac (kmitňa), na koncoch, kde je struna upevnená, vôbec (uzly). Tvar sa nikam neposúva, len „dýcha“ hore-dole.',
    fig: 'fyz:vlny@stoj',
    formula: {
      f: 's(x; t) = 2A · sin(ω·t) · cos(k·x)     uzol – uzol = kmitňa – kmitňa = λ/2,  uzol – kmitňa = λ/4',
      what: 'Stojatá vlna a vzdialenosti uzlov a kmitní',
      vars: [
        ['A', 'amplitúda každej z dvoch protibežných vĺn [m]'],
        ['2A·|cos(k·x)|', 'amplitúda kmitania bodu v mieste x (každý bod má inú amplitúdu)'],
        ['uzly', 'body, kde cos(k·x) = 0: amplitúda 0'],
        ['kmitne', 'body, kde |cos(k·x)| = 1: amplitúda 2A'],
        ['k', 'vlnové číslo, k = 2π/λ'],
      ],
    },
    deeper:
      'Odvodenie (podľa prednášky): vlna doprava s→ = A·sin(ω·t − k·x), vlna doľava s← = A·sin(ω·t + k·x). Použijeme sin(α ∓ β) = sin α·cos β ∓ cos α·sin β.\n\n' +
      'Súčet: A·sin(ω·t)·cos(k·x) − A·cos(ω·t)·sin(k·x) + A·sin(ω·t)·cos(k·x) + A·cos(ω·t)·sin(k·x). Stredné členy sa odčítajú, zostane s = 2A·sin(ω·t)·cos(k·x). V prednáške je to zapísané aj ako A·sin(ω·t)·cos(k·x), kde A už znamená amplitúdu kmitní.\n\n' +
      'Uzly: cos(k·x) = 0, teda k·x = π/2 + n·π, čiže x = λ/4 + n·λ/2. Kmitne: |cos(k·x)| = 1, teda x = n·λ/2. Odtiaľ vzdialenosti λ/2 a λ/4. Časť sin(ω·t) je pre všetky body rovnaká – všetky kmitajú naraz, iba s rôznou amplitúdou, preto sa tvar neposúva.',
    worked: {
      q: 'Na strune dlhej 120 cm vznikla stojatá vlna. Všetky susedné body s amplitúdou kmitania 3,5 mm sú od seba vzdialené 15 cm. Nájdi amplitúdu kmitní. Ktorému módu vlna zodpovedá? (príklad 20 zo 6. cvičenia)',
      steps: [
        'Vieme: L = 120 cm, body s amplitúdou a = 3,5 mm sú rovnomerne po 15 cm. Hľadáme: amplitúdu kmitní Aₘₐₓ a číslo módu n.',
        'Konce struny sú upevnené, sú to uzly. Ak meriame x od konca, amplitúda bodu je Aₘₐₓ·|sin(k·x)|: v uzle 0, v kmitni Aₘₐₓ.',
        'Medzi dvoma susednými uzlami (úsek λ/2) má amplitúdu 3,5 mm dvojica bodov, symetricky okolo kmitne. Aby boli VŠETKY susedné body rovnako ďaleko, musia ležať v štvrtinách tohto úseku: λ/8, 3λ/8, 5λ/8… od uzla. Susedné sú teda vzdialené λ/4. (Keby to boli kmitne, odpoveď by bola triviálna – zadanie myslí body medzi uzlom a kmitňou.)',
        'λ/4 = 15 cm → λ = 60 cm.',
        'Amplitúda v bode x = λ/8: Aₘₐₓ·sin(2π/λ · λ/8) = Aₘₐₓ·sin(π/4) = Aₘₐₓ·√2/2 = 3,5 mm.',
        'Aₘₐₓ = 3,5 mm · 2/√2 = 3,5·√2 mm ≈ 4,95 mm.',
        'Mód: na strunu s upevnenými koncami sa zmestí celý počet polvĺn, L = n·λ/2 → n = 2L/λ = 2·120/60 = 4.',
        'Kontrola: body sú v 7,5; 22,5; 37,5; … 112,5 cm. Posledný je 7,5 cm od druhého konca, rovnako ako prvý od začiatku – sedí.',
      ],
      result: 'Amplitúda kmitní ≈ 4,95 mm (3,5·√2 mm), ide o 4. mód (4 polvlny, 5 uzlov vrátane koncov).',
    },
    check: {
      q: 'Prostredím sa šíria dve rovnaké rovinné vlny, jedna pozdĺž osi x, druhá pozdĺž osi y (príklad 14 z 5. cvičenia). Po akej dráhe sa pohybuje častica v rovine xy?',
      options: [
        'Po elipse (zložia sa dva kolmé kmity s rovnakou ω); podľa miesta to môže byť aj úsečka alebo kružnica',
        'Vždy po priamke v smere osi x',
        'Častice stoja, vlny sa vyrušia',
        'Po Lissajousovej krivke s pomerom 1 : 2',
      ],
      explain:
        'Ak sú vlny priečne (kmitajú v rovine xy), vlna idúca po x hýbe časticou v smere y a vlna idúca po y v smere x; ak sú pozdĺžne, je to naopak. V oboch prípadoch dostane častica dva navzájom kolmé kmity s rovnakou ω a fázovým rozdielom k·(x − y), ktorý závisí od miesta. Výsledok je elipsa: kde x − y = n·λ/2, je to úsečka, kde x − y = λ/4 + n·λ/2, kružnica.',
    },
  },
  {
    title: 'Vlastné kmity struny, rúry a tyče',
    text:
      'Na strune s pevnými koncami alebo vo vzduchu v rúre sa udržia len také stojaté vlny, ktoré „pasujú“ na konce. Voláme ich vlastné kmity (módy) a každý má svoju frekvenciu. Pravidlo pre konce: pevný koniec struny a uzavretý koniec rúry je uzol; otvorený koniec rúry a voľný koniec tyče je kmitňa.\n\n' +
      'Ak sú oba konce rovnaké (oba uzly alebo obe kmitne), zmestí sa na dĺžku L celý počet polvĺn: L = n·λ/2, teda fₙ = n·c/(2L). Ak je jeden koniec uzol a druhý kmitňa, zmestí sa nepárny počet štvrťvĺn: L = (2n − 1)·λ/4, teda fₙ = (2n − 1)·c/(4L) – iba nepárne násobky základnej frekvencie.\n\n' +
      'Postup: 1) urč, čo je na koncoch (uzol alebo kmitňa), 2) napíš, koľko polvĺn či štvrťvĺn sa zmestí, 3) vyjadri λ a f = c/λ, 4) spočítaj, koľko frekvencií padne do zadaného rozsahu. Dĺžku v cm preveď na metre.',
    formula: {
      f: 'oba konce rovnaké: fₙ = n · c / (2L)     jeden uzol, druhý kmitňa: fₙ = (2n − 1) · c / (4L)',
      what: 'Frekvencie vlastných kmitov (n = 1, 2, 3, …)',
      vars: [
        ['fₙ', 'frekvencia n-tého vlastného kmitu (módu) [Hz]'],
        ['n', 'číslo módu: 1, 2, 3, …'],
        ['c', 'rýchlosť vlny v strune, vo vzduchu alebo v tyči [m/s]'],
        ['L', 'dĺžka struny, rúry alebo tyče [m]'],
      ],
    },
    deeper:
      'Prečo práve tieto dĺžky? Medzi susednými uzlami je vždy λ/2 a medzi uzlom a kmitňou λ/4. Ak sú na oboch koncoch uzly (alebo obe kmitne), dĺžka L musí byť poskladaná z celých polvĺn: L = λ/2, 2·λ/2, 3·λ/2… Odtiaľ λₙ = 2L/n a fₙ = c/λₙ = n·c/(2L).\n\n' +
      'Ak je na jednom konci uzol a na druhom kmitňa, dĺžka je štvrťvlna plus ľubovoľný počet polvĺn: L = λ/4, 3λ/4, 5λ/4… = (2n − 1)·λ/4. Odtiaľ λₙ = 4L/(2n − 1) a fₙ = (2n − 1)·c/(4L).\n\n' +
      'Tyč upevnená v strede (príklad 19): v strede je uzol, oba konce sú voľné (kmitne). Polovica tyče L/2 je teda úsek „uzol – kmitňa“: L/2 = (2n − 1)·λ/4, čiže fₙ = (2n − 1)·c/(2L).',
    worked: {
      q: 'Koľko vlastných kmitov s frekvenciou menšou ako 1250 Hz má vzduchový stĺpec v rúre dlhej 85 cm, ak je rúra (a) otvorená na jednom konci, (b) otvorená na oboch koncoch? Rýchlosť zvuku je 340 m/s. (príklad 18 zo 6. cvičenia)',
      steps: [
        'Vieme: L = 85 cm = 0,85 m, c = 340 m/s, hranica 1250 Hz. Hľadáme: počet módov pod 1250 Hz.',
        '(a) Jeden koniec otvorený (kmitňa), druhý uzavretý (uzol). Použijeme fₙ = (2n − 1)·c/(4L).',
        'c/(4L) = 340/(4·0,85) = 340/3,4 = 100 Hz. Frekvencie: 100, 300, 500, 700, 900, 1100 Hz; ďalšia 1300 Hz je už nad hranicou.',
        '(a) má teda 6 vlastných kmitov.',
        '(b) Oba konce otvorené (obe kmitne, rovnaké konce). Použijeme fₙ = n·c/(2L).',
        'c/(2L) = 340/1,7 = 200 Hz. Frekvencie: 200, 400, 600, 800, 1000, 1200 Hz; ďalšia 1400 Hz je nad hranicou.',
        '(b) má tiež 6 vlastných kmitov.',
      ],
      result: '(a) 6 módov (100 až 1100 Hz, len nepárne násobky 100 Hz), (b) 6 módov (200 až 1200 Hz).',
    },
    check: {
      q: 'Medená tyč dlhá 55 cm je upevnená v strede, rýchlosť pozdĺžnych vĺn v medi je 4720 m/s. Koľko pozdĺžnych vlastných kmitov má v rozsahu 20 Hz až 20 kHz? (príklad 19 zo 6. cvičenia)',
      options: ['2', '4', '5', '1'],
      explain:
        'V strede je uzol, konce sú voľné (kmitne), takže fₙ = (2n − 1)·c/(2L). c/(2L) = 4720/1,1 ≈ 4291 Hz. Frekvencie: 4291 Hz, 3·4291 ≈ 12 873 Hz, 5·4291 ≈ 21 455 Hz (už nad 20 kHz). V rozsahu sú teda 2 vlastné kmity.',
    },
  },
  {
    title: 'Zhrnutie',
    text:
      'Vlna je kmitanie, ktoré sa šíri. Všetko ostatné sú nástroje, ako opísať, kde a kedy čo kmitá, ako rýchlo sa to šíri a koľko energie to nesie.\n\n' +
      'Na skúške si vždy najprv vypíš, čo vieš a čo hľadáš, preveď jednotky do SI a až potom vyber vzorec. Pri sínusoch a kosínusoch maj kalkulačku v radiánoch.',
    bullets: [
      'Vlna = kmitanie šíriace sa pružným prostredím; prenáša energiu, nie hmotu.',
      'Priečna: častice kmitajú kolmo na smer šírenia; pozdĺžna: v smere šírenia (zvuk v plyne). Postupná prenáša energiu, stojatá nie.',
      's(x; t) = A·sin(ω·t − k·x); mínus = šírenie v smere +x, plus = v smere −x.',
      'c = ω/k = λ·f, λ = 2π/k = c·T. Pri prechode do iného prostredia sa f nemení, mení sa c aj λ.',
      'Fázový rozdiel dvoch bodov: Δφ = k·Δx = 2π·Δx/λ.',
      'Rýchlosť častice v = A·ω·cos(ω·t − k·x) nie je rýchlosť vlny c.',
      'Vlnoplocha = body s rovnakou fázou, čelo = prvá vlnoplocha, lúč je kolmý na vlnoplochu.',
      'Struna c = √(F/ϱL), tyč c = √(E/ϱ) alebo √(G/ϱ), plyn c = √(κ·R·T/M) (T v K, M v kg/mol).',
      'e = ½·ϱ·A²·ω², I = e·c; sférická vlna I = P/(4π·r²), A ~ 1/r.',
      'Stojatá vlna s = 2A·sin(ω·t)·cos(k·x): uzol – uzol λ/2, kmitňa – kmitňa λ/2, uzol – kmitňa λ/4.',
      'Vlastné kmity: rovnaké konce fₙ = n·c/(2L), rôzne konce fₙ = (2n − 1)·c/(4L).',
      'Typické chyby: stupne namiesto radiánov, neprevedené cm a mW na m a W, °C namiesto K.',
    ],
  },
];

export default steps;
