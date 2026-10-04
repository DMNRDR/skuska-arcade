import type { Step } from '../steps';

// Prednáška 3.3 (str. 56–81): sférické a tenké šošovky, rovnica brúsiča šošoviek, transformačné vzťahy,
// priečne zväčšenie (Z = −y′/y, Z > 0 = skutočný obraz), zobrazovanie spojkou a rozptylkou, sústava D = D₁ + D₂.
// Znamienková konvencia z prednášky: počiatok v optickom strede O, os x v smere svetla, predmet má x < 0.
// Cvičenie 10: príklad 37 (35 a 36 sú o úplnom odraze – v lekcii fyz-optika), cvičenie 11: príklady 38–42.

const steps: Step[] = [
  {
    title: 'Čo je šošovka',
    text: 'Sférická šošovka je predmet z priehľadného materiálu (sklo, plast), ohraničený dvoma guľovými (sférickými) plochami. Tieto plochy lámu svetlo, preto sa volajú lomivé plochy. Šošovky nájdeš v okuliaroch, fotoaparáte, mikroskope aj v ďalekohľade teodolitu či nivelačného prístroja.\n\nSpojka (v strede hrubšia) zbieha rovnobežné lúče do jedného bodu – ohniska F. Rozptylka (v strede tenšia) ich rozbieha, akoby vychádzali z ohniska pred ňou. Na obrázku prepínaj medzi nimi a sleduj bodky svetla.\n\nZákladné pojmy: hlavná optická os je priamka cez stredy oboch guľových plôch. Vrcholy V₁ a V₂ sú miesta, kde os pretína povrchy šošovky. Stredová hrúbka šošovky je vzdialenosť vrcholov |V₁V₂|.',
    fig: 'lenses',
    analogy: 'Spojka je lievik na svetlo: rovnobežné lúče zvedie do jedného bodu. Preto sa lupou dá na slnku zapáliť papier – všetko svetlo, ktoré dopadne na lupu, sa sústredí do malej škvrny v ohnisku.',
  },
  {
    title: 'Polomer krivosti so znamienkom',
    text: 'Každá plocha šošovky je kúsok gule (sféry). Sféra má dva povrchy: vonkajší (odvrátený od stredu) a vnútorný (privrátený k stredu). V prednáške má polomer krivosti znamienko: vonkajší povrch má kladný polomer krivosti R = +r, vnútorný záporný R = −r.\n\nPríklad z prednášky: stojíš na povrchu Zeme zvonku – pre teba je polomer krivosti R = +6378 km. Keby si stál vo vnútri obrovskej dutej gule na jej vnútornej stene, mal by si R = −6378 km.\n\nPri šošovke sa pýtame z pohľadu svetla, ktoré na plochu dopadá. Ak plocha k svetlu „vystupuje“ (svetlo narazí na vonkajšiu stranu gule, stred krivosti je za plochou), R > 0. Ak je plocha voči svetlu vyhĺbená (svetlo príde k vnútornej strane, stred je pred plochou), R < 0. Rovinná plocha má R → ∞, teda 1/R = 0.',
    analogy: 'Polievková lyžica: zadná, vypuklá strana je vonkajší povrch (R > 0), predná strana, kde je polievka, je vnútorný povrch (R < 0). Tá istá plocha má teda opačné znamienko podľa toho, z ktorej strany na ňu ideš.',
    check: {
      q: 'Svetlo ide zľava doprava. Prvá plocha dvojdutej šošovky je voči svetlu vyhĺbená. Aké znamienko má R₁?',
      options: ['záporné', 'kladné', 'nulové', 'závisí od indexu lomu'],
      explain: 'Svetlo prichádza k vnútornej (vyhĺbenej) strane sféry, stred krivosti je pred plochou, preto R₁ < 0. Pri dvojdutej šošovke je naopak R₂ > 0. Znamienko závisí len od geometrie, nie od materiálu.',
    },
  },
  {
    title: 'Ako guľová plocha zbieha svetlo',
    text: 'Prečo zakrivená plocha zbieha lúče? Pri prechode zo vzduchu do skla sa lúč láme ku kolmici. Na guľovej ploche je kolmica v každom bode iná – vždy smeruje do stredu gule. Lúče ďalej od osi dopadajú šikmejšie, lámu sa viac, a preto sa všetky stáčajú k osi.\n\nPre lúče blízko osi (paraxiálne lúče) sú uhly malé a platí sin α ≈ α (v radiánoch). Snellov zákon sa zjednoduší na α ≈ n·β a ukáže sa, že všetky takéto lúče sa stretnú v jednom bode. Lúče ďaleko od osi sa stretávajú trochu inde (tzv. sférická vada), preto sa v optike počíta s paraxiálnymi lúčmi.\n\nRovnobežné paraxiálne lúče, ktoré dopadnú zo vzduchu na guľovú plochu s polomerom R zo skla s indexom n, sa po lome zbiehajú do bodu vo vzdialenosti s = n·R/(n − 1) od vrcholu plochy.',
    formula: {
      f: 's = n · R / (n − 1)',
      what: 'Kam sa po lome na jednej guľovej ploche (vzduch → sklo) zbiehajú rovnobežné paraxiálne lúče',
      vars: [
        ['s', 'vzdialenosť bodu zbehnutia od vrcholu plochy [m]'],
        ['R', 'polomer guľovej plochy [m]'],
        ['n', 'index lomu skla'],
      ],
    },
    worked: {
      q: 'Zväzok priamych (rovnobežných s osou) paraxiálnych lúčov dopadajúci na povrch sklenenej gule sa zbieha do bodu vzdialeného dva polomery gule od stredu gule. Vypočítaj index lomu skla. (príklad 37 z 10. cvičenia)',
      steps: [
        'Vieme: lúče sú rovnobežné s osou a blízko nej; bod zbehnutia je 2R od stredu gule, teda 3R od vrcholu (miesta vstupu).',
        'Hľadáme: n.',
        'Výklad zadania: berieme lom na povrchu gule, kde lúče vstupujú – hľadáme bod, do ktorého po vstupe do skla smerujú (lom na zadnej ploche pozri v „Prečo?“).',
        'Lúč vo výške h: kolmica na povrch smeruje do stredu gule, uhol dopadu α ≈ h/R, uhol lomu β ≈ α/n.',
        'Lomený lúč zviera s osou uhol α − β = (h/R)·(1 − 1/n) a os pretne vo vzdialenosti s ≈ h/(α − β) = n·R/(n − 1) od vrcholu. Výška h sa vykrátila – všetky paraxiálne lúče sa stretnú v jednom bode.',
        'Podmienka: s = 3R → n·R/(n − 1) = 3R → n = 3·(n − 1) → n = 3n − 3 → n = 1,5.',
        'Kontrola: vzdialenosť od stredu je s − R = R/(n − 1) = R/0,5 = 2R ✓; n = 1,5 je typické sklo ✓.',
      ],
      result: 'Index lomu skla je n = 1,5.',
    },
    deeper: 'Odvodenie s = n·R/(n − 1): lúč rovnobežný s osou vo výške h dopadne na guľu. Kolmica v mieste dopadu je polomer, a ten zviera s osou uhol α, pre ktorý sin α = h/R. Pre malé uhly sin α ≈ α, takže α ≈ h/R. Snell: 1·sin α = n·sin β → α ≈ n·β → β ≈ h/(n·R).\n\nLomený lúč sa od kolmice odklonil o β, takže voči osi je sklonený o α − β ≈ (h/R)·(n − 1)/n. Na osi sa ocitne po prejdení vodorovnej vzdialenosti s ≈ h/(α − β) = n·R/(n − 1).\n\nAk by sme rátali aj s lomom na zadnej ploche (lúč z gule naozaj vyjde), celá guľa funguje ako šošovka s ohniskom vo vzdialenosti n·R/(2·(n − 1)) od stredu. Pre bod vo vzdialenosti 2R by potom vyšlo n = 4/3 ≈ 1,33. Výsledok 1,5 (typické sklo) naznačuje, že zadanie myslí lom na prvej ploche – ak si nie si istý, na cvičení sa opýtaj.',
  },
  {
    title: 'Polguľa a úplný odraz',
    text: 'Lom na guľovej ploche a úplný odraz sa spoja v príklade 38 z 11. cvičenia. Rovnobežný zväzok dopadá kolmo na rovnú stenu polgule – tam sa neláme. Láme sa až na guľovej ploche pri výstupe zo skla do vzduchu, teda z hustejšieho do redšieho prostredia.\n\nLúč vo vzdialenosti h od osi dopadá na guľovú plochu pod uhlom α, pre ktorý sin α = h/R (kolmica je polomer). Čím ďalej od osi, tým väčší uhol. Keď α prekročí kritický uhol, lúč už von nevyjde a úplne sa odrazí – presne ako na obrázku, keď prepneš smer sklo → vzduch a zvolíš uhol nad kritickým. Hraničný lúč vychádza pod 90°, teda po dotyčnici ku guli.\n\nPríklady 35 a 36 z 10. cvičenia (ohyb optického kábla a odrazka) stoja tiež na úplnom odraze. Nájdeš ich vyriešené v lekcii Geometrická optika.',
    fig: 'fyz:optika',
    worked: {
      q: 'Na polguľu s polomerom 2 cm zo skla s indexom lomu 1,41 dopadá (kolmo na rovnú stenu) rovnobežný zväzok lúčov. Aký je polomer svetelnej škvrny na tienidle vzdialenom 4,82 cm od stredu polgule? (príklad 38 z 11. cvičenia)',
      steps: [
        'Vieme: R = 2 cm, n = 1,41, tienidlo je L = 4,82 cm od stredu S, rovnou stenou prejdú lúče bez lomu.',
        'Hľadáme: polomer škvrny r.',
        'Kritický uhol na guľovej ploche (sklo → vzduch): sin α_krit = 1/1,41 ≈ 0,709 → α_krit ≈ 45° (presnejšie 45,2°).',
        'Krajný lúč, ktorý ešte vyjde, dopadá na guľu v bode B, kde polomer SB zviera s osou 45°. Vyjde pod 90°, teda po dotyčnici v bode B.',
        'Dotyčnica je kolmá na polomer, takže trojuholník S – B – priesečník dotyčnice s osou je pravouhlý a rovnoramenný. Dotyčnica pretne os vo vzdialenosti R/cos 45° = 2/0,707 ≈ 2,83 cm od stredu.',
        'Za týmto bodom sa lúč vzďaľuje od osi pod uhlom 45°, takže na tienidle je od osi vzdialený 4,82 − 2,83 ≈ 1,99 cm.',
        'Lúče bližšie k osi sa lámu menej (paraxiálne sa zbiehajú až asi 6,9 cm od stredu), na tienidle sú preto bližšie k osi. Okraj škvrny tvorí krajný lúč.',
        'Kontrola: 4,82 ≈ 2·(1 + √2) a 1,41 ≈ √2 – zadanie je zostavené tak, aby vyšlo r = R ✓.',
      ],
      result: 'Polomer svetelnej škvrny je približne 2 cm.',
    },
  },
  {
    title: 'Tenká šošovka a rovnica brúsiča šošoviek',
    text: 'Tenká šošovka je model, v ktorom je hrúbka šošovky zanedbateľná oproti polomerom oboch plôch: |V₁V₂| ≪ |R₁| a |V₁V₂| ≪ |R₂|. Vrcholy vtedy splynú do jedného bodu – optického stredu O. Každá iná priamka cez O je vedľajšia optická os. Hrubé šošovky optický stred ani vedľajšie osi nemajú.\n\nAko silno tenká šošovka láme, vyjadruje optická mohutnosť D, ktorú dáva rovnica „brúsiča šošoviek“. Má dve časti: materiálový faktor (n − 1) hovorí, ako silno láme materiál, a geometrický faktor G = 1/R₁ − 1/R₂ hovorí, aký tvar má šošovka. R₁ je plocha, na ktorú svetlo dopadne prvá.\n\nJednotka je dioptria: 1 dpt = 1 m⁻¹. Polomery preto VŽDY dosadzuj v metroch! Okuliare „+2“ majú D = +2 dpt. Kladné D znamená spojku, záporné rozptylku.',
    formula: {
      f: 'D = (n − 1) · (1/R₁ − 1/R₂)     G = 1/R₁ − 1/R₂',
      what: 'Rovnica brúsiča šošoviek (optická mohutnosť tenkej šošovky)',
      vars: [
        ['D', 'optická mohutnosť [dpt = m⁻¹]'],
        ['n', 'relatívny index lomu materiálu šošovky voči okoliu (vo vzduchu = index lomu skla)'],
        ['R₁', 'polomer krivosti prvej lomivej plochy so znamienkom [m]'],
        ['R₂', 'polomer krivosti druhej lomivej plochy so znamienkom [m]'],
        ['G', 'geometrický faktor [m⁻¹]'],
      ],
    },
    worked: {
      q: 'Dvojvypuklá šošovka zo skla s indexom lomu 1,5 má obe plochy s polomerom 25 cm. Aká je jej optická mohutnosť?',
      steps: [
        'Vieme: n = 1,5, |R₁| = |R₂| = 25 cm = 0,25 m (prevod na metre!).',
        'Hľadáme: D. Použijeme rovnicu brúsiča šošoviek, lebo poznáme materiál aj polomery.',
        'Znamienka: prvá plocha k svetlu vystupuje → R₁ = +0,25 m; druhú plochu svetlo zasiahne zvnútra gule → R₂ = −0,25 m.',
        'Geometrický faktor: G = 1/0,25 − 1/(−0,25) = 4 + 4 = 8 m⁻¹.',
        'D = (1,5 − 1) · 8 = 0,5 · 8 = 4 dpt.',
        'Kontrola: D > 0 → spojka, ako má dvojvypuklá šošovka vo vzduchu byť ✓.',
      ],
      result: 'D = +4 dpt (spojka).',
    },
    deeper: 'Prečo práve (n − 1)·G? Tenkú šošovku si predstav ako veľa malých hranolčekov. Tenký hranol s malým lámavým uhlom A odkloní lúč o uhol (n − 1)·A.\n\nVo výške y nad osou zvierajú plochy šošovky uhol A = y/R₁ − y/R₂ = y·G (kolmice na plochy smerujú do stredov krivosti, ktoré sú vo vzdialenostiach R₁ a R₂). Lúč sa tam teda odkloní o (n − 1)·G·y = D·y. Rovnobežný lúč vo výške y sa skloní o D·y a os pretne vo vzdialenosti y/(D·y) = 1/D – rovnako pre všetky y! Preto sa paraxiálne lúče stretnú v jednom bode.\n\nV prednáške je to zapísané ako β = D·y_B + δ: sklon lúča za šošovkou β je sklon pred ňou δ zmenený o D·y_B, kde y_B je výška bodu dopadu nad O. Pre y_B = 0 (optický stred) je β = δ – lúč cez optický stred sa neláme.',
    check: {
      q: 'Ktorý lúč prejde tenkou šošovkou bez zmeny smeru?',
      options: ['lúč cez optický stred O', 'lúč rovnobežný s hlavnou optickou osou', 'lúč smerujúci do ohniska', 'žiadny, každý lúč sa láme'],
      explain: 'Zo vzťahu β = D·y_B + δ: pre lúč cez optický stred je y_B = 0, takže β = δ – sklon sa nezmení. Lúč rovnobežný s osou sa naopak láme do ohniska.',
    },
  },
  {
    title: 'Vypuklé a duté šošovky',
    text: 'Podľa znamienka geometrického faktora G delíme šošovky na vypuklé (G > 0, v strede hrubšie) a duté (G < 0, v strede tenšie). Vo vzduchu je n − 1 > 0, takže vypuklé šošovky sú spojky a duté rozptylky. Prehľad z prednášky je v odrážkach.\n\nTenká šošovka má len jednu hodnotu optickej mohutnosti – nezáleží na tom, z ktorej strany na ňu svieti svetlo (optická symetria). Keď ju otočíš o 180°, plochy sa vymenia a zmenia znamienka: R₁ ↦ −R₂, R₂ ↦ −R₁, a G vyjde rovnaké.',
    bullets: [
      'dvojvypuklá: R₁ > 0, R₂ < 0 → G > 0',
      'ploskovypuklá: jedna plocha rovinná (1/R = 0), druhá vypuklá → G > 0',
      'dutovypuklá (v strede hrubšia): R₂ > R₁ > 0 alebo R₁ < R₂ < 0 → G > 0',
      'dvojdutá: R₁ < 0, R₂ > 0 → G < 0',
      'ploskodutá: jedna plocha rovinná, druhá dutá → G < 0',
      'vypukloduté (v strede tenšie): R₁ > R₂ > 0 alebo R₂ < R₁ < 0 → G < 0',
    ],
    worked: {
      q: 'Ploskovypuklá šošovka (n = 1,5) má vypuklú plochu s polomerom 10 cm. Aká je jej optická mohutnosť, keď svetlo dopadá (a) najprv na vypuklú plochu, (b) najprv na rovnú plochu?',
      steps: [
        'Vieme: n = 1,5, polomer vypuklej plochy 0,10 m, rovná plocha má 1/R = 0.',
        '(a) Vypuklá plocha je prvá a vystupuje k svetlu: R₁ = +0,10 m, R₂ → ∞.',
        'G = 1/0,10 − 0 = 10 m⁻¹, D = 0,5 · 10 = 5 dpt.',
        '(b) Šošovka otočená: R₁ → ∞, vypuklú plochu svetlo zasiahne zvnútra gule: R₂ = −0,10 m.',
        'G = 0 − 1/(−0,10) = +10 m⁻¹, D = 0,5 · 10 = 5 dpt.',
        'Kontrola: obe orientácie dávajú rovnaké D – optická symetria tenkej šošovky ✓.',
      ],
      result: 'D = +5 dpt v oboch prípadoch.',
    },
    check: {
      q: 'Dvojdutá šošovka má |R₁| = |R₂| = 20 cm a index lomu 1,5. Aká je jej optická mohutnosť?',
      options: ['−5 dpt', '+5 dpt', '−2,5 dpt', '+2,5 dpt'],
      explain: 'Dvojdutá: R₁ = −0,2 m, R₂ = +0,2 m. G = 1/(−0,2) − 1/0,2 = −5 − 5 = −10 m⁻¹, D = 0,5 · (−10) = −5 dpt. Ak zabudneš na znamienka, vyjde nesprávne +5 alebo 0.',
    },
  },
  {
    title: 'Šošovka z rozmerov: príklady 39 a 40',
    text: 'V príkladoch 39 a 40 z 11. cvičenia nepoznáš polomery plôch, ale hrúbku šošovky v strede, na okraji a jej priemer. Polomer krivosti treba najprv dopočítať z výšky oblúka (sagity).\n\nSagita s hovorí, o koľko sa guľová plocha na šírke šošovky „vydúva“. Pri symetrickej šošovke (obe plochy rovnaké) pripadá na každú plochu polovica rozdielu hrúbok: s = |hrúbka v strede − hrúbka na okraji| / 2. Z polovice priemeru a a sagity s dostaneš polomer z Pytagorovej vety.\n\nPozor: zadanie nehovorí, že je šošovka symetrická, ale bez toho sa nedá vyriešiť jednoznačne – preto ju za symetrickú považujeme. A ako vždy: dĺžky prepočítaj na metre.',
    formula: {
      f: 'R = (a² + s²) / (2·s)',
      what: 'Polomer guľovej plochy z polovice priemeru a a sagity s',
      vars: [
        ['R', 'polomer guľovej plochy (bez znamienka) [m]'],
        ['a', 'polovica priemeru šošovky [m]'],
        ['s', 'sagita – výška oblúka jednej plochy [m]'],
      ],
    },
    deeper: 'Odvodenie: nakresli rez guľou. Stred gule, okraj šošovky a päta kolmice na osi tvoria pravouhlý trojuholník. Prepona je R (od stredu ku okraju), jedna odvesna je a (polovica priemeru), druhá je R − s (od stredu k rovine okraja).\n\nPytagoras: R² = a² + (R − s)² = a² + R² − 2·R·s + s². R² sa odčíta a ostane 0 = a² − 2·R·s + s², teda R = (a² + s²)/(2·s).\n\nKeďže s je oveľa menšie ako a, často stačí približne R ≈ a²/(2·s).',
    worked: {
      q: '(39) Tenká sklenená dvojvypuklá šošovka má stredovú hrúbku 5 mm, koncovú hrúbku 3 mm a priemer 40 mm. (40) Tenká sklenená dvojdutá šošovka má stredovú hrúbku 1,5 mm, koncovú 3 mm a priemer 40 mm. Index lomu skla je 1,52. Vypočítaj optické mohutnosti. (príklady 39 a 40 z 11. cvičenia)',
      steps: [
        'Vieme: a = 40/2 = 20 mm, n = 1,52; obe šošovky považujeme za symetrické.',
        '(39) Sagita jednej plochy: s = (5 − 3)/2 = 1 mm.',
        '(39) Polomer: R = (20² + 1²)/(2 · 1) = 401/2 = 200,5 mm = 0,2005 m.',
        '(39) Dvojvypuklá: R₁ = +0,2005 m, R₂ = −0,2005 m → G = 2/0,2005 ≈ 9,975 m⁻¹ → D = 0,52 · 9,975 ≈ +5,19 dpt.',
        '(40) Sagita: s = (3 − 1,5)/2 = 0,75 mm; polomer R = (400 + 0,5625)/(2 · 0,75) ≈ 267,0 mm = 0,2670 m.',
        '(40) Dvojdutá: R₁ = −0,2670 m, R₂ = +0,2670 m → G = −2/0,2670 ≈ −7,49 m⁻¹ → D = 0,52 · (−7,49) ≈ −3,89 dpt.',
        'Kontrola: vypuklá šošovka vyšla spojka (D > 0), dutá rozptylka (D < 0) ✓. Približný vzorec R ≈ a²/(2s) dá +5,2 dpt a −3,9 dpt – takmer to isté ✓.',
      ],
      result: '(39) D ≈ +5,19 dpt; (40) D ≈ −3,89 dpt.',
    },
  },
  {
    title: 'Šošovka v kvapaline',
    text: 'Rovnica brúsiča šošoviek obsahuje relatívny index lomu: n = n_šošovky / n_okolia. Vo vzduchu (n_okolia ≈ 1) je to obyčajný index lomu skla. Vo vode je to menšie číslo, takže šošovka láme slabšie – preto pod vodou bez okuliarov vidíš rozmazane.\n\nGeometrický faktor G pritom ostáva rovnaký, tvar šošovky sa nemení. Stačí teda z merania vo vzduchu zistiť G a použiť ho v novom prostredí.\n\nZaujímavosť: ak je okolie opticky hustejšie ako šošovka (n_okolia > n_šošovky), je (n − 1) záporné a spojka sa zmení na rozptylku. Presne to sa deje v príklade 41.',
    analogy: 'Vzduchová bublina vo vode má tvar spojky (je v strede „najhrubšia“), a predsa svetlo rozptyľuje – lebo vzduch je opticky redší ako voda okolo. Nerozhoduje len tvar, ale aj to, či je šošovka opticky hustejšia alebo redšia ako okolie.',
    formula: {
      f: 'D_k = (n_s / n_k − 1) · G',
      what: 'Optická mohutnosť šošovky ponorenej v kvapaline',
      vars: [
        ['D_k', 'optická mohutnosť v kvapaline [dpt]'],
        ['n_s', 'index lomu materiálu šošovky'],
        ['n_k', 'index lomu kvapaliny (okolia)'],
        ['G', 'geometrický faktor 1/R₁ − 1/R₂ [m⁻¹], rovnaký ako vo vzduchu'],
      ],
    },
    worked: {
      q: 'Optická mohutnosť tenkej sklenenej šošovky je vo vzduchu +5 dpt a v kvapaline −1 dpt. Aký je index lomu kvapaliny? Index lomu skla je 1,52. (príklad 41 z 11. cvičenia)',
      steps: [
        'Vieme: D_vzd = +5 dpt, D_k = −1 dpt, n_s = 1,52.',
        'Hľadáme: n_k.',
        'Vo vzduchu: D_vzd = (n_s − 1) · G → G = 5 / 0,52 ≈ 9,615 m⁻¹.',
        'V kvapaline: D_k = (n_s/n_k − 1) · G → n_s/n_k − 1 = −1 / 9,615 = −0,104.',
        'n_s/n_k = 1 − 0,104 = 0,896 → n_k = 1,52 / 0,896 ≈ 1,70.',
        'Kontrola: n_k > n_s, preto spojka v kvapaline rozptyľuje (D < 0) ✓.',
      ],
      result: 'Index lomu kvapaliny je asi 1,70.',
    },
    check: {
      q: 'Sklenená spojka (n = 1,5) sa ponorí do vody (n = 1,33). Čo sa s ňou stane?',
      options: ['ostane spojkou, ale bude asi 4-krát slabšia', 'zmení sa na rozptylku', 'bude silnejšou spojkou', 'jej optická mohutnosť bude nulová'],
      explain: 'Relatívny index je 1,5/1,33 ≈ 1,13, takže n − 1 ≈ 0,13 namiesto 0,5 vo vzduchu. G sa nemení, preto je D asi 0,5/0,13 ≈ 3,9-krát menšie. Na rozptylku by sa zmenila, až keby bola kvapalina opticky hustejšia ako sklo.',
    },
  },
  {
    title: 'Transformačné vzťahy: kde vznikne obraz',
    text: 'Teraz to najdôležitejšie: keď poznáš D, vieš vypočítať, kde vznikne obraz. Súradnice z prednášky: počiatok je v optickom strede O, os x ide pozdĺž hlavnej optickej osi v smere svetla (zľava doprava), os y kolmo hore. Predmet stojí pred šošovkou, preto má zápornú súradnicu x!\n\nBod A so súradnicami (x; y) sa zobrazí do bodu A′ so súradnicami x′ = x/(1 + D·x) a y′ = y/(1 + D·x). Ak vyjde x′ > 0, obraz je za šošovkou a pretínajú sa v ňom samotné lúče – je skutočný (dá sa zachytiť na tienidlo). Ak x′ < 0, pretínajú sa len predĺženia lúčov – obraz je neskutočný.\n\nOhnisková vzdialenosť je f = 1/D. Hlavné ohnisko F leží na osi v x = f – je to obraz bodu nekonečne ďaleko na osi. Na obrázku je predmet medzi F a 2F pred spojkou, presne ako v príklade nižšie: obraz je za šošovkou, väčší a prevrátený.',
    fig: 'fyz:sosovky@-1.5',
    formula: {
      f: 'x′ = x / (1 + D·x)     y′ = y / (1 + D·x)     f = 1 / D',
      what: 'Transformačné vzťahy tenkej šošovky (prvý je zobrazovacia rovnica) a ohnisková vzdialenosť',
      vars: [
        ['x', 'vodorovná súradnica predmetu – pred šošovkou záporná [m]'],
        ['y', 'výška predmetu (zvislá súradnica) [m]'],
        ['x′', 'vodorovná súradnica obrazu: > 0 skutočný, < 0 neskutočný [m]'],
        ['y′', 'výška obrazu; opačné znamienko ako y = prevrátený [m]'],
        ['D', 'optická mohutnosť [dpt]'],
        ['f', 'ohnisková vzdialenosť [m], spojka f > 0, rozptylka f < 0'],
      ],
    },
    worked: {
      q: 'Spojka má optickú mohutnosť +5 dpt. Predmet vysoký 2 cm stojí 30 cm pred ňou. Kde vznikne obraz a aký bude?',
      steps: [
        'Vieme: D = 5 dpt, x = −0,30 m (pred šošovkou → záporné!), y = 0,02 m.',
        'Hľadáme: x′ a y′. Použijeme transformačné vzťahy, lebo poznáme D aj polohu predmetu.',
        'Menovateľ: 1 + D·x = 1 + 5 · (−0,30) = 1 − 1,5 = −0,5.',
        'x′ = −0,30 / (−0,5) = +0,60 m → obraz je 60 cm za šošovkou, je skutočný.',
        'y′ = 0,02 / (−0,5) = −0,04 m → obraz má 4 cm a záporné znamienko znamená, že je prevrátený.',
        'Kontrola: f = 1/5 = 0,2 m; predmet je medzi f a 2f (20–40 cm pred šošovkou), takže obraz má byť skutočný, zväčšený a za 2f ✓.',
      ],
      result: 'Obraz je 60 cm za šošovkou, skutočný, prevrátený a 2-krát zväčšený (4 cm).',
    },
    deeper: 'Odkiaľ sú transformačné vzťahy? Z bodu A(x; y) vedieme dva lúče. Lúč cez optický stred sa neláme, ide po priamke Y = (y/x)·X. Lúč rovnobežný s osou dopadne na šošovku vo výške y a spojka ho skloní k osi tak, že na každý meter klesne o D·y: za šošovkou ide po priamke Y = y − D·y·X.\n\nPriesečník: (y/x)·X = y − D·y·X → X·(1/x + D) = 1 → X = 1/(1/x + D) = x/(1 + D·x). To je x′. Výšku dopočítame z prvej priamky: y′ = (y/x)·x′ = y/(1 + D·x).\n\nOhnisko: pre x → −∞ je 1/x → 0, takže x′ = 1/(1/x + D) → 1/D = f a y′ → 0. Bod nekonečne ďaleko na osi sa zobrazí do hlavného ohniska.',
  },
  {
    title: 'Priečne zväčšenie Z',
    text: 'Priečne zväčšenie porovnáva výšku obrazu a predmetu. V prednáške je definované so znamienkom mínus: Z = −y′/y. Po dosadení transformačných vzťahov vyjde Z = −1/(1 + D·x) = −x′/x.\n\nVeľkosť |Z| hovorí o veľkosti obrazu: |Z| > 1 zväčšený, |Z| < 1 zmenšený, |Z| = 1 verný (rovnako veľký). Znamienko hovorí o druhu obrazu: Z > 0 skutočný (a prevrátený), Z < 0 neskutočný (a priamy). Na obrázku je predmet presne v 2F – obraz je v 2F za šošovkou a rovnako veľký, Z = 1.\n\nPozor, typická chyba: v mnohých učebniciach a na internete sa zväčšenie definuje bez mínusu (y′/y) a znamienka sú tam opačne. Na skúške používaj definíciu z prednášky: Z > 0 znamená skutočný obraz.',
    fig: 'fyz:sosovky@-2',
    formula: {
      f: 'Z = −y′ / y = −1 / (1 + D·x) = −x′ / x',
      what: 'Priečne zväčšenie tenkej šošovky (definícia z prednášky)',
      vars: [
        ['Z', 'priečne zväčšenie (bez jednotky): Z > 0 skutočný, Z < 0 neskutočný'],
        ['|Z|', '> 1 zväčšený, < 1 zmenšený, = 1 verný obraz'],
        ['y, y′', 'výška predmetu a obrazu'],
        ['x, x′', 'súradnica predmetu (< 0) a obrazu'],
      ],
    },
    worked: {
      q: 'Tá istá spojka (D = +5 dpt), ale predmet stojí 60 cm pred ňou. Urči polohu obrazu a priečne zväčšenie.',
      steps: [
        'Vieme: D = 5 dpt, x = −0,60 m.',
        'Hľadáme: x′ a Z.',
        'Menovateľ: 1 + D·x = 1 + 5 · (−0,60) = 1 − 3 = −2.',
        'x′ = −0,60 / (−2) = +0,30 m → obraz je za šošovkou, skutočný.',
        'Z = −1 / (1 + D·x) = −1 / (−2) = +0,5.',
        'Z > 0 → skutočný; |Z| = 0,5 < 1 → zmenšený na polovicu. Kontrola: Z = −x′/x = −0,30/(−0,60) = 0,5 ✓.',
      ],
      result: 'Obraz je 30 cm za šošovkou, skutočný, prevrátený a zmenšený na polovicu (Z = 0,5).',
    },
    check: {
      q: 'Pri výpočte ti vyšlo priečne zväčšenie Z = −3. Aký je obraz?',
      options: ['neskutočný, priamy, 3-krát zväčšený', 'skutočný, prevrátený, 3-krát zväčšený', 'neskutočný, 3-krát zmenšený', 'skutočný, 3-krát zmenšený'],
      explain: 'Podľa prednášky Z < 0 znamená neskutočný (a priamy) obraz a |Z| = 3 > 1 znamená 3-krát zväčšený. Takto zobrazuje lupa.',
    },
  },
  {
    title: 'Konštrukcia obrazu a poloha predmetu pri spojke',
    text: 'Obraz sa dá aj nakresliť. Z vrcholu predmetu stačia dva lúče: priamy lúč (rovnobežný s osou) po spojke prejde hlavným ohniskom F za šošovkou a lúč cez optický stred O sa neláme. Kde sa pretnú, tam je vrchol obrazu. Ak sa za šošovkou rozbiehajú, predĺž ich dozadu – obraz je neskutočný.\n\nŠikmý lúč (nejde cez O ani nie je rovnobežný s osou) zostrojíš pomocou ohniskovej roviny – roviny cez F kolmej na os. Nakresli s ním rovnobežný pomocný lúč cez O; kde pomocný lúč pretne ohniskovú rovinu, je vedľajšie ohnisko F′ a cez neho prejde aj tvoj lúč.\n\nNa obrázku je žltý lúč priamy a zelený ide cez stred. Na osi sú vyznačené súradnice −2f, −f (pred šošovkou) a f, 2f (za šošovkou), presne ako na obrázkoch v prednáške. Hlavné ohnisko F je v bode f. Prepínaj polohy predmetu a porovnaj s odrážkami.',
    fig: 'fyz:sosovky@-3.5',
    analogy: 'Projektor robí presne to, čo poloha „medzi F a 2F“: malý obrázok kúsok za ohniskom premietne ako obrovský prevrátený obraz na plátno. Preto sa do starých diaprojektorov vkladali diapozitívy hore nohami.',
    bullets: [
      'za 2F (x < −2f): obraz medzi f a 2f, skutočný, zmenšený, prevrátený, 0 < Z < 1 (fotoaparát, oko, objektív ďalekohľadu)',
      'v 2F (x = −2f): obraz v 2f, skutočný, rovnako veľký, prevrátený, Z = 1',
      'medzi F a 2F (−2f < x < −f): obraz za 2f, skutočný, zväčšený, prevrátený, Z > 1 (projektor)',
      'v F (x = −f): lúče za šošovkou idú rovnobežne, obraz je v nekonečne (reflektor, baterka)',
      'medzi F a šošovkou (−f < x < 0): obraz pred šošovkou, neskutočný, zväčšený, priamy, Z < −1 (lupa)',
    ],
    check: {
      q: 'Spojka má ohniskovú vzdialenosť 25 cm. Predmet stojí 50 cm pred ňou. Aký je obraz?',
      options: ['skutočný, rovnako veľký, 50 cm za šošovkou', 'skutočný, zmenšený, 25 cm za šošovkou', 'neskutočný, zväčšený, pred šošovkou', 'v nekonečne'],
      explain: 'D = 1/0,25 = 4 dpt, x = −0,5 m = −2f. Potom 1 + D·x = 1 − 2 = −1, x′ = −0,5/(−1) = +0,5 m a Z = −1/(−1) = 1. Predmet v 2F dáva skutočný, rovnako veľký, prevrátený obraz v 2f.',
    },
  },
  {
    title: 'Lupa a rozptylka',
    text: 'Lupa je spojka, ku ktorej priložíš predmet bližšie, ako je ohnisko. Lúče sa za šošovkou rozbiehajú a nepretnú sa – oko ich však predĺži dozadu a vidí zväčšený, priamy, neskutočný obraz na tej istej strane ako predmet. Na obrázku sú tieto predĺženia čiarkované.\n\nRozptylka (D < 0, teda aj f < 0) dá zo skutočného predmetu vždy rovnaký typ obrazu: neskutočný, priamy, zmenšený, ležiaci medzi ohniskom a šošovkou na strane predmetu (f < x′ < 0, −1 < Z < 0). Prepni na obrázku na rozptylku a vyskúšaj rôzne polohy – obraz sa mení len málo. Rozptylky nosia krátkozrakí.\n\nPri rozptylke pozor na znamienka: D aj f sú záporné a dosadzujú sa so znamienkom. Typická chyba je dosadiť D kladne.',
    fig: 'fyz:sosovky@-0.5',
    worked: {
      q: 'Lupa má optickú mohutnosť +10 dpt. Poštová známka vysoká 1 cm je 5 cm pred ňou. Kde a aký obraz vidíš?',
      steps: [
        'Vieme: D = 10 dpt, f = 1/10 = 0,10 m, x = −0,05 m, y = 1 cm → predmet je medzi F a šošovkou.',
        'Hľadáme: x′, y′ a Z.',
        'Menovateľ: 1 + D·x = 1 + 10 · (−0,05) = 1 − 0,5 = 0,5.',
        'x′ = −0,05 / 0,5 = −0,10 m → obraz je 10 cm pred šošovkou (na strane predmetu) → neskutočný.',
        'y′ = 1 cm / 0,5 = 2 cm (rovnaké znamienko ako y → priamy); Z = −1/0,5 = −2.',
        'Kontrola: Z < −1 → neskutočný a zväčšený, presne ako má lupa ✓.',
      ],
      result: 'Vidíš neskutočný, priamy, 2-krát zväčšený obraz (2 cm) vo vzdialenosti 10 cm pred lupou.',
    },
    check: {
      q: 'Rozptylka má D = −5 dpt. Predmet stojí 20 cm pred ňou. Kde je obraz?',
      options: ['10 cm pred šošovkou, neskutočný, zmenšený na polovicu', '10 cm za šošovkou, skutočný', '20 cm za šošovkou, rovnako veľký', 'v nekonečne'],
      explain: '1 + D·x = 1 + (−5)·(−0,2) = 2, x′ = −0,2/2 = −0,1 m (pred šošovkou → neskutočný), Z = −1/2 = −0,5 (neskutočný, zmenšený na polovicu). Ak by si dosadil D = +5, vyšlo by nesprávne x′ → ∞.',
    },
  },
  {
    title: 'Sústava blízkych šošoviek',
    text: 'Dve tenké šošovky tesne pri sebe sa správajú ako jedna tenká šošovka, ktorej optická mohutnosť je súčet: D = D₁ + D₂. Preto sa s dioptriami tak dobre počíta – optické mohutnosti okuliarov a oka sa jednoducho sčítajú.\n\nPlatí to aj pre „šošovky“ z iných materiálov, napríklad z vody alebo vzduchu. Každú časť sústavy spočítaj zvlášť rovnicou brúsiča šošoviek (s relatívnym indexom lomu voči okoliu) a výsledky sčítaj. Presne tak sa rieši príklad 42.',
    analogy: 'Je to ako sčítanie peňazí: +3 € a −2 € je +1 €. Spojka +3 dpt a rozptylka −2 dpt tesne pri sebe dajú slabú spojku +1 dpt.',
    formula: {
      f: 'D = D₁ + D₂',
      what: 'Optická mohutnosť sústavy dvoch blízkych tenkých šošoviek',
      vars: [
        ['D', 'výsledná optická mohutnosť [dpt]'],
        ['D₁, D₂', 'optické mohutnosti jednotlivých šošoviek (so znamienkom) [dpt]'],
      ],
    },
    worked: {
      q: 'Tenká ploskodutá sklenená šošovka je ponorená vo vode vo vodorovnej polohe tak, že priestor pod ňou (v dutine) je vyplnený vzduchom. Polomer dutej plochy je 15 cm, index lomu vody 1,33, skla 1,52. Aká je optická mohutnosť takejto sústavy? (príklad 42 z 11. cvičenia)',
      steps: [
        'Predstava: dutina šošovky je otočená nadol a je v nej vzduchová bublina tvaru ploskovypuklej „šošovky“. Okolo celej sústavy je voda, svetlo ide zhora nadol.',
        'Sústava = sklenená ploskodutá šošovka + vzduchová ploskovypuklá šošovka tesne pri sebe → D = D₁ + D₂, obe voči vode.',
        'Sklo: R₁ → ∞, R₂ = +0,15 m (stred krivosti dutej plochy je pod ňou) → G₁ = −1/0,15 ≈ −6,67 m⁻¹; n_rel = 1,52/1,33 ≈ 1,143 → D₁ = 0,143 · (−6,67) ≈ −0,95 dpt.',
        'Vzduch: tá istá guľová plocha je pre vzduch prvá, R₁ = +0,15 m, R₂ → ∞ → G₂ = +6,67 m⁻¹; n_rel = 1/1,33 ≈ 0,752 → D₂ = (0,752 − 1) · 6,67 ≈ −1,65 dpt.',
        'Spolu: D = −0,95 + (−1,65) ≈ −2,61 dpt.',
        'Kontrola: obe časti rozptyľujú (sklo je duté, vzduch je vo vode opticky redší) → výsledok musí byť záporný ✓. Skrátene: D = (1 − n_s)/(n_v · R) = −0,52/(1,33 · 0,15) ≈ −2,61 dpt ✓.',
      ],
      result: 'D ≈ −2,6 dpt – sústava je rozptylka.',
    },
  },
  {
    title: 'Zhrnutie',
    text: 'Celá kapitola o šošovkách sa dá zhrnúť do niekoľkých vzorcov a pravidiel. Najviac chýb na skúške vzniká v znamienkach (polomery, súradnica predmetu, zväčšenie) a v jednotkách (centimetre namiesto metrov).',
    bullets: [
      'Polomer krivosti: vonkajší povrch R > 0, vnútorný R < 0 (z pohľadu dopadajúceho svetla); rovina 1/R = 0.',
      'Tenká šošovka: hrúbka ≪ polomery; má optický stred O, lúč cez O sa neláme (β = D·y_B + δ, y_B = 0).',
      'Rovnica brúsiča: D = (n − 1)·(1/R₁ − 1/R₂), n je relatívny index voči okoliu; 1 dpt = 1 m⁻¹, polomery v metroch!',
      'Vypuklé (G > 0) sú vo vzduchu spojky, duté (G < 0) rozptylky; otočenie šošovky D nezmení.',
      'Z rozmerov: sagita s = rozdiel hrúbok / 2, R = (a² + s²)/(2s).',
      'Transformačné vzťahy: x′ = x/(1 + D·x), y′ = y/(1 + D·x); predmet má x < 0, x′ > 0 = skutočný obraz.',
      'Ohnisková vzdialenosť f = 1/D; hlavné ohnisko F je v x = f.',
      'Priečne zväčšenie Z = −y′/y = −1/(1 + D·x): Z > 0 skutočný (prevrátený), Z < 0 neskutočný (priamy); |Z| > 1 zväčšený.',
      'Spojka: za 2F zmenšený, v 2F verný, F–2F zväčšený (všetko skutočné), v F nekonečno, pred F lupa (neskutočný, zväčšený).',
      'Rozptylka: vždy neskutočný, priamy, zmenšený obraz.',
      'Blízke šošovky: D = D₁ + D₂.',
    ],
  },
];

export default steps;
