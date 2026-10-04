import type { Step } from '../steps';

// Prednáška 3.1–3.2 (str. 48–55): svetlo, zdroje, prostredia, priamočiare šírenie, odraz, lom, úplný odraz.
// Cvičenie 7: príklady 24–27, cvičenie 9: príklady 30–34, cvičenie 10: príklady 35–36 (úplný odraz).

const steps: Step[] = [
  {
    title: 'Svetlo, lúče, zdroje a prostredia',
    text: 'Svetlo je elektromagnetické vlnenie, ktoré vidí ľudské oko. Podľa dohody má vlnovú dĺžku 380 nm < λ < 760 nm (nm = nanometer = 10⁻⁹ m).\n\nGeometrická optika si život zjednodušuje: vlnovú povahu svetla vynechá a svetlo kreslí ako lúče – priamky so šípkou, ktoré ukazujú, kadiaľ svetlo ide. Na obrázku vidíš kruhové vlnoplochy okolo zdroja a lúče, ktoré sú na ne vždy kolmé. Súvislá oblasť priestoru vyplnená lúčmi je zväzok lúčov (napríklad kužeľ svetla z baterky).\n\nBodový zdroj svetla je taký, ktorého rozmery môžeme zanedbať v porovnaní so vzdialenosťou osvetľovaných predmetov – napríklad hviezda, hoci je obrovská. Plošný zdroj je každý zdroj, ktorý nie je bodový, napríklad žiarivka nad stolom alebo okno.\n\nOptické prostredie môže byť priehľadné, priesvitné alebo nepriehľadné – rozdiely sú v odrážkach.',
    fig: 'wavefront',
    analogy: 'Lúč je ako dráha guľôčky: zaujíma nás len to, kade letí, kde sa odrazí a kde zmení smer – nie z čoho je. Presne takto rieši geometrická optika dráhu svetla.',
    bullets: [
      'Priehľadné prostredie: svetlo prechádza bez výraznejšieho rozptylu, index lomu je všade rovnaký, predmety za ním vidíš ostro (okenné sklo, čistá voda, vzduch).',
      'Priesvitné prostredie: svetlo prechádza, ale prostredie sa skladá z oblastí s rôznym indexom lomu, predmety vidíš rozmazane (matné sklo, papier na pečenie).',
      'Nepriehľadné prostredie: svetlo neprepustí (drevo, kov, betón).',
    ],
    check: {
      q: 'Cez matné sklo v kúpeľni vidíš len rozmazané tvary. Aké je to prostredie?',
      options: ['priesvitné', 'priehľadné', 'nepriehľadné', 'bodové'],
      explain: 'Svetlo prejde, ale predmety vidíš rozmazane – to je priesvitné prostredie (má oblasti s rôznym indexom lomu). Cez priehľadné by si videl ostro, cez nepriehľadné vôbec. „Bodový“ je pojem pre zdroj, nie pre prostredie.',
    },
  },
  {
    title: 'Priamočiare šírenie: tieň a polotieň',
    text: 'Prvý zákon geometrickej optiky: v prostredí s konštantným indexom lomu sa svetlo šíri priamočiaro. Preto za nepriehľadnou prekážkou vzniká tieň.\n\nTieň je oblasť priestoru (3D útvar, nie len škvrna na stene!), do ktorej nedopadne žiadny lúč. Polotieň je oblasť, kam dopadá len časť lúčov z plošného zdroja. Na obrázku prepínaj zdroje: bodový zdroj vrhá len ostrý tieň, plošný zdroj vrhá v strede tieň a okolo neho polotieň.\n\nPrečo? Z bodového zdroja ide do každého miesta jediný lúč – prekážka ho buď zablokuje, alebo nie. Z plošného zdroja ide do každého miesta veľa lúčov z rôznych častí zdroja a prekážka môže zablokovať len niektoré z nich.',
    fig: 'shadow',
    worked: {
      q: 'Zvislá palica dlhá 1 m vrhá na rovnom teréne tieň dlhý 1,5 m. Elektrický stĺp vedľa nej vrhá v tom istom čase tieň 12 m. Aký vysoký je stĺp?',
      steps: [
        'Vieme: palica h₁ = 1 m, jej tieň s₁ = 1,5 m; tieň stĺpa s₂ = 12 m.',
        'Hľadáme: výšku stĺpa h₂.',
        'Slnko je tak ďaleko, že jeho lúče sú prakticky rovnobežné. Palica, jej tieň a lúč tvoria pravouhlý trojuholník; stĺp, jeho tieň a lúč tvoria podobný trojuholník s rovnakým uhlom (svetlo ide priamočiaro).',
        'Podobnosť trojuholníkov: h₂/s₂ = h₁/s₁ → h₂ = s₂·h₁/s₁.',
        'Dosadíme: h₂ = 12 m · 1 m / 1,5 m = 8 m.',
        'Kontrola: tieň je pri palici aj pri stĺpe 1,5-krát dlhší ako predmet: 8 · 1,5 = 12 ✓.',
      ],
      result: 'Stĺp je vysoký 8 m. (Takto vraj meral výšku pyramíd už Tháles.)',
    },
  },
  {
    title: 'Zákon odrazu',
    text: 'Keď svetlo dopadne na hladký povrch (zrkadlo, pokojná hladina), odrazí sa podľa zákona odrazu: uhol odrazu sa rovná uhlu dopadu. Dopadajúci lúč, odrazený lúč a kolmica k povrchu ležia v jednej rovine.\n\nNajdôležitejšie: uhly sa merajú od kolmice (normály) k povrchu, nie od povrchu! Ak lúč zviera s povrchom 40°, uhol dopadu je 90° − 40° = 50°.\n\nOdraz od hladkého povrchu je zrkadlový. Od drsného povrchu (papier, stena) sa svetlo rozptýli do všetkých strán – to je difúzny odraz, pre ktorý zákon odrazu neplatí. Vďaka difúznemu odrazu vidíme aj predmety, ktoré samy nesvietia.',
    analogy: 'Biliardová guľa narazí na mantinel a odrazí sa pod rovnakým uhlom, pod akým prišla – to je zrkadlový odraz. Keby bol mantinel z hrubého kameňa, guľa by odletela kamkoľvek – to je difúzny odraz.',
    formula: {
      f: 'α′ = α',
      what: 'Zákon odrazu (platí pre zrkadlový odraz)',
      vars: [
        ['α', 'uhol dopadu, meraný od kolmice k povrchu [°]'],
        ['α′', 'uhol odrazu, meraný od kolmice k povrchu [°]'],
      ],
    },
    worked: {
      q: 'Slnečný lúč zviera s povrchom Zeme uhol 40°. Pod akým uhlom voči horizontu treba umiestniť rovinné zrkadlo, aby slnečný lúč prenikol do hlbokej studne (zvisle nadol)? (príklad 25 zo 7. cvičenia)',
      steps: [
        'Vieme: dopadajúci lúč ide šikmo nadol, 40° pod horizontom. Odrazený lúč má ísť zvisle nadol, teda 90° pod horizontom.',
        'Hľadáme: uhol zrkadla voči horizontu.',
        'Zo zákona odrazu: zrkadlo zviera s dopadajúcim aj s odrazeným lúčom rovnaký uhol (sú to doplnky do 90° k uhlom dopadu a odrazu, ktoré sú rovnaké).',
        'Zrkadlo preto musí ležať „presne v strede“ medzi smermi 40° a 90°: (40° + 90°) / 2 = 65°.',
        'Kontrola: dopadajúci lúč zviera so zrkadlom 65° − 40° = 25°, odrazený 90° − 65° = 25° ✓. Uhol dopadu aj odrazu (od kolmice) je 90° − 25° = 65° ✓.',
      ],
      result: 'Zrkadlo treba nakloniť pod uhlom 65° voči horizontu.',
    },
    deeper: 'Zákon odrazu sa dá odvodiť z Huygensovho princípu (kapitola o vlnách), ale aj z toho, že svetlo si vyberá najkratšiu cestu.\n\nSvetlo ide z bodu A cez zrkadlo do bodu B. Preklop bod B podľa zrkadla na druhú stranu – dostaneš B′. Každá cesta A → zrkadlo → B je rovnako dlhá ako cesta A → zrkadlo → B′. Najkratšia cesta z A do B′ je priamka a tá pretne zrkadlo práve v bode, kde je uhol dopadu rovný uhlu odrazu.',
  },
  {
    title: 'Rovinné zrkadlo: obraz a oblasť viditeľnosti',
    text: 'Pozri na obrázok: lúč z predmetu sa odrazí od zrkadla a príde do oka. Oko nevie, že sa lúč odrazil, a predĺži ho dozadu po priamke. Preto vidí obraz za zrkadlom – v mieste, kde sa pretínajú predĺženia lúčov.\n\nPre bod Z a jeho obraz Z′ platí |ZP| = |Z′P| – majú rovnakú kolmú vzdialenosť od zrkadla (P je päta kolmice). Obraz je neskutočný (svetlo tam v skutočnosti nie je), rovnako veľký, nie je posunutý ani otočený, ale má vymenenú pravú a ľavú stranu. Predmety sa zobrazujú bod po bode.\n\nOblasť viditeľnosti bodu Z je časť priestoru, z ktorej vidno jeho obraz v zrkadle. Ohraničujú ju lúče odrazené od okrajov zrkadla, teda priamky z obrazu Z′ cez okraje zrkadla. Konštrukcia pre šachovú figúrku (príklad 30 z 9. cvičenia) je v odrážkach.\n\nV príklade 31 (spätné zrkadlo v aute) použi trik: nakresli obraz zadného okna za zrkadlom. Vodič sa pozerá do zrkadla ako cez okienko na tento obraz, takže zrkadlo musí obraz okna presne pokryť. Potom stačí podobnosť trojuholníkov s vrcholom v oku.',
    fig: 'mirror',
    analogy: 'Keď si dáš palec pred oko, zakryje celý dom v diaľke. Malé spätné zrkadlo blízko oka podobne „pokryje“ obraz celého zadného okna, hoci je oveľa menšie.',
    bullets: [
      '1. Z význačných bodov figúrky (vrch, päta, okraje) spusti kolmice na zrkadlo.',
      '2. Za zrkadlom nanes na každú kolmicu rovnakú vzdialenosť – dostaneš obrazy bodov A′, B′, …',
      '3. Spoj ich – obraz figúrky je rovnako veľký a „zrkadlovo“ otočený.',
      '4. Pre každý krajný bod obrazu veď priamky cez oba okraje zrkadla – medzi nimi je oblasť viditeľnosti toho bodu.',
      '5. Celá figúrka je viditeľná tam, kde sa oblasti viditeľnosti všetkých jej bodov prekrývajú – vyšrafuj spoločnú časť.',
    ],
    worked: {
      q: 'Zadné okno auta má rozmery 120 cm × 45 cm. Vodič sedí 2 m od zadného okna. Aké najmenšie rozmery musí mať vnútorné spätné zrkadlo visiace 0,5 m pred vodičom, aby mal najväčší možný rozhľad za auto? (príklad 31 z 9. cvičenia)',
      steps: [
        'Vieme: okno 120 cm × 45 cm, oko–okno 2 m (dozadu), oko–zrkadlo 0,5 m (dopredu).',
        'Hľadáme: rozmery zrkadla a × b, pri ktorých vidno celé zadné okno.',
        'Vzdialenosť zrkadlo–okno: 0,5 m + 2 m = 2,5 m. Obraz okna je teda 2,5 m za zrkadlom.',
        'Vzdialenosť oko–obraz okna: 0,5 m + 2,5 m = 3 m.',
        'Podobné trojuholníky (vrchol v oku): a / 120 cm = 0,5 m / 3 m = 1/6.',
        'a = 120 / 6 = 20 cm, b = 45 / 6 = 7,5 cm.',
        'Kontrola: zrkadlo je 6-krát bližšie k oku ako obraz okna, preto stačí, aby bolo 6-krát menšie ✓.',
      ],
      result: 'Zrkadlo musí mať aspoň 20 cm × 7,5 cm.',
    },
    check: {
      q: 'Stojíš 2 m pred rovinným zrkadlom. Ako ďaleko od teba je tvoj obraz?',
      options: ['4 m', '2 m', '1 m', 'v nekonečne'],
      explain: 'Obraz je rovnako ďaleko za zrkadlom, ako si ty pred ním: 2 m za zrkadlom. Od teba je teda 2 + 2 = 4 m. Častá chyba je odpovedať 2 m.',
    },
  },
  {
    title: 'Index lomu',
    text: 'V látke sa svetlo šíri pomalšie ako vo vákuu. Absolútny index lomu n hovorí, koľkokrát: n = c₀/c. Vákuum má n = 1, vzduch prakticky tiež 1 (presne 1,0003), voda 1,33, sklo okolo 1,5, diamant 2,42.\n\nRelatívny index lomu porovnáva dve prostredia navzájom: n₁,₂ = c₁/c₂ (rýchlosť v prvom prostredí delená rýchlosťou v druhom). Keďže c₁ = c₀/n₁ a c₂ = c₀/n₂, platí n₁,₂ = n₂/n₁. Absolútny index lomu je vlastne relatívny index medzi vákuom a daným prostredím.\n\nProstredie s väčším n voláme opticky hustejšie (svetlo je v ňom pomalšie), s menším n opticky redšie. S hustotou v kg/m³ to nesúvisí – olej je ľahší ako voda, ale opticky hustejší.',
    formula: {
      f: 'n = c₀ / c     n₁,₂ = c₁ / c₂ = n₂ / n₁',
      what: 'Absolútny a relatívny index lomu',
      vars: [
        ['n', 'absolútny index lomu prostredia (bez jednotky, n ≥ 1)'],
        ['c₀', 'rýchlosť svetla vo vákuu, 3·10⁸ m/s'],
        ['c', 'rýchlosť svetla v prostredí [m/s]'],
        ['n₁,₂', 'relatívny index lomu medzi 1. a 2. prostredím'],
        ['c₁, c₂', 'rýchlosti svetla v 1. a 2. prostredí [m/s]'],
      ],
    },
    worked: {
      q: 'Akou rýchlosťou sa šíri svetlo vo vode (n = 1,33) a v skle (n = 1,5)? Aký je relatívny index lomu pri prechode z vody do skla?',
      steps: [
        'Vieme: c₀ = 3·10⁸ m/s, n_v = 1,33, n_s = 1,5.',
        'Hľadáme: c_v, c_s a n_v,s.',
        'Z n = c₀/c vyjadríme c = c₀/n.',
        'Voda: c_v = 3·10⁸ / 1,33 ≈ 2,26·10⁸ m/s. Sklo: c_s = 3·10⁸ / 1,5 = 2,00·10⁸ m/s.',
        'Relatívny index: n_v,s = c_v/c_s = 2,26 / 2,00 ≈ 1,13.',
        'Kontrola: n_s/n_v = 1,5/1,33 ≈ 1,13 ✓. V skle je svetlo pomalšie ako vo vode ✓.',
      ],
      result: 'Vo vode ≈ 2,26·10⁸ m/s, v skle 2,0·10⁸ m/s, relatívny index lomu voda → sklo ≈ 1,13.',
    },
    check: {
      q: 'Svetlo má v istej látke rýchlosť 2,4·10⁸ m/s. Aký je jej index lomu?',
      options: ['1,25', '0,8', '2,4', '1,5'],
      explain: 'n = c₀/c = 3·10⁸ / 2,4·10⁸ = 1,25. Výsledok 0,8 vznikne, keď zlomok otočíš – ale index lomu látky nikdy nie je menší ako 1.',
    },
  },
  {
    title: 'Snellov zákon lomu',
    text: 'Keď lúč dopadne šikmo na rozhranie dvoch priehľadných prostredí, časť svetla sa odrazí a časť prejde do druhého prostredia – ale zmení smer. Tomu hovoríme lom svetla. Ako veľmi sa zlomí, hovorí Snellov zákon.\n\nPravidlo na zapamätanie: z opticky redšieho do hustejšieho prostredia (n₁ < n₂, napr. vzduch → sklo) sa lúč láme KU kolmici – uhol lomu je menší ako uhol dopadu. Z hustejšieho do redšieho (sklo → vzduch) sa láme OD kolmice. Na obrázku vyskúšaj oba smery a rôzne uhly.\n\nPri kolmom dopade (α = 0°) sa lúč neláme vôbec. Všetky uhly sa merajú od kolmice na rozhranie a kalkulačka musí byť prepnutá na stupne (DEG), nie radiány!',
    fig: 'fyz:optika',
    formula: {
      f: 'n₁ · sin α₁ = n₂ · sin α₂     sin α₁ / sin α₂ = c₁ / c₂',
      what: 'Snellov zákon lomu',
      vars: [
        ['n₁, n₂', 'absolútne indexy lomu 1. a 2. prostredia'],
        ['α₁', 'uhol dopadu – uhol lúča od kolmice v 1. prostredí [°]'],
        ['α₂', 'uhol lomu – uhol lúča od kolmice v 2. prostredí [°]'],
        ['c₁, c₂', 'rýchlosti svetla v 1. a 2. prostredí [m/s]'],
      ],
    },
    worked: {
      q: 'Potápač vidí Slnko pod uhlom 60° voči hladine vody. Aká je skutočná výška Slnka nad horizontom? Index lomu vody je 1,333. (príklad 26 zo 7. cvičenia)',
      steps: [
        'Vieme: lúč vo vode zviera s hladinou 60°, n_vzduchu = 1, n_vody = 1,333.',
        'Hľadáme: uhol Slnka nad horizontom (od vodorovnej roviny).',
        'Prevedieme na uhol od kolmice: vo vode α₂ = 90° − 60° = 30°.',
        'Snell (vzduch → voda): 1 · sin α₁ = 1,333 · sin 30° = 1,333 · 0,5 = 0,6665.',
        'α₁ = arcsin 0,6665 ≈ 41,8° (od kolmice, vo vzduchu).',
        'Výška nad horizontom: 90° − 41,8° = 48,2°.',
        'Kontrola: zo vzduchu do vody sa lúč láme ku kolmici, takže vo vzduchu musí byť uhol od kolmice väčší (41,8° > 30°) ✓. Potápačovi sa Slnko zdá vyššie (60°), než v skutočnosti je.',
      ],
      result: 'Slnko je v skutočnosti asi 48,2° nad horizontom.',
    },
    deeper: 'Odvodenie z Huygensovho princípu. Rovné čelo vlny dopadá šikmo na rozhranie. Jeho jeden okraj sa už dotkol rozhrania, druhý je ešte v 1. prostredí. Za čas t prejde druhý okraj dráhu c₁·t a dotkne sa rozhrania vo vzdialenosti d od prvého bodu. Medzitým sa vlnka z prvého bodu rozšíri v 2. prostredí na polomer c₂·t.\n\nZ dvoch pravouhlých trojuholníkov so spoločnou preponou d: sin α₁ = c₁·t/d a sin α₂ = c₂·t/d. Podelením: sin α₁ / sin α₂ = c₁/c₂.\n\nDosadíme c₁ = c₀/n₁, c₂ = c₀/n₂: sin α₁ / sin α₂ = n₂/n₁, čiže n₁·sin α₁ = n₂·sin α₂. Lom teda vzniká preto, lebo sa svetlo v rôznych prostrediach šíri rôzne rýchlo.',
  },
  {
    title: 'Odrazený lúč kolmý na lomený',
    text: 'Na rozhraní sa svetlo spravidla čiastočne odrazí a čiastočne zlomí – vidíš to na výklade obchodu: vidíš tovar (lomené svetlo) aj svoj odraz. Odrazený lúč sa riadi zákonom odrazu, lomený Snellovým zákonom.\n\nV príklade 24 zo 7. cvičenia hľadáme uhol dopadu, pri ktorom sú odrazený a lomený lúč na seba kolmé. Pomôže náčrt: odrazený lúč zviera s rozhraním uhol 90° − α (nad rozhraním), lomený uhol 90° − β (pod rozhraním). Uhol medzi nimi je ich súčet, 180° − (α + β), a ten má byť 90°.\n\nTento uhol sa volá Brewsterov uhol. Zaujímavosť (súvis s polarizáciou): odrazené svetlo je pri ňom úplne lineárne polarizované. Preto polarizačné okuliare tak dobre tlmia odlesky od vody a mokrej cesty.',
    worked: {
      q: 'Svetelný lúč dopadá zo vzduchu na rozhranie s prostredím s indexom lomu n, pričom sa čiastočne odráža a čiastočne láme. Urči uhol dopadu, pri ktorom je odrazený lúč kolmý na lomený. Vyčísli pre sklo n = 1,5. (príklad 24 zo 7. cvičenia)',
      steps: [
        'Vieme: n₁ = 1 (vzduch), n₂ = n. Uhol dopadu α = uhol odrazu, uhol lomu β.',
        'Hľadáme: α, pri ktorom je odrazený lúč ⊥ lomený.',
        'Geometria: (90° − α) + (90° − β) = 90° → α + β = 90°, teda β = 90° − α.',
        'Snell: sin α = n · sin β = n · sin(90° − α) = n · cos α.',
        'Vydelíme cos α: tg α = n (všeobecne tg α = n₂/n₁).',
        'Pre sklo: tg α = 1,5 → α = arctg 1,5 ≈ 56,3°, potom β = 90° − 56,3° = 33,7°.',
        'Kontrola: sin 56,3° ≈ 0,832 a 1,5 · sin 33,7° ≈ 1,5 · 0,555 ≈ 0,832 ✓.',
      ],
      result: 'tg α = n (všeobecne n₂/n₁); pre sklo α ≈ 56,3°, pre vodu (n = 1,333) α ≈ 53,1°.',
    },
  },
  {
    title: 'Obrátiteľnosť a nezávislosť lúčov',
    text: 'Princíp obrátiteľnosti (zámennosti chodu lúčov): trajektória lúča medzi dvoma bodmi nezávisí od smeru chodu. Ak svetlo ide z bodu P₁ do P₂ nejakou cestou (s odrazmi a lomami), z P₂ do P₁ pôjde presne tou istou cestou opačne. Preto: keď ty vidíš niekoho v zrkadle, aj on vidí teba.\n\nPrincíp nezávislosti: lúče, ktoré prechádzajú tým istým bodom, sa navzájom neovplyvňujú. Dva lúče baterky sa skrížia a každý pokračuje, akoby tam ten druhý nebol.\n\nObrátiteľnosť je pri výpočtoch veľmi praktická: ak lúč vstúpi do vody pod uhlom 30° a po odraze sa vracia k hladine pod tým istým uhlom, z vody vyjde opäť pod 30°. Presne to využijeme v príklade.',
    worked: {
      q: 'Na vodorovnom dne vodojemu hlbokého 1,2 m leží rovinné zrkadlo. V akej vzdialenosti od miesta dopadu sa lúč vynorí z vody (po odraze od zrkadla)? Uhol dopadu na vodnú hladinu je 30°, index lomu vody 1,333. (príklad 27 zo 7. cvičenia)',
      steps: [
        'Vieme: h = 1,2 m, α = 30° (od kolmice), n = 1,333.',
        'Hľadáme: vzdialenosť x medzi miestom vstupu a miestom výstupu lúča na hladine.',
        'Lom na hladine (Snell): sin β = sin 30° / 1,333 = 0,5 / 1,333 ≈ 0,375 → β ≈ 22,0°.',
        'Cestou dole sa lúč posunie vodorovne o h · tg β = 1,2 · tg 22,0° ≈ 1,2 · 0,405 ≈ 0,486 m.',
        'Na zrkadle: uhol odrazu = uhol dopadu = 22,0°, cesta hore je zrkadlovo rovnaká, posun opäť 0,486 m.',
        'Spolu: x = 2 · h · tg β ≈ 2 · 0,486 ≈ 0,97 m.',
        'Kontrola (obrátiteľnosť): lúč dopadá zdola na hladinu pod 22,0°, vyjde von pod 30° – symetricky so vstupom ✓.',
      ],
      result: 'Lúč sa vynorí asi 0,97 m od miesta dopadu (a vyjde z vody opäť pod uhlom 30°).',
    },
    check: {
      q: 'Vidíš v spätnom zrkadle oči vodiča. Vidí on v tom istom zrkadle tvoje oči?',
      options: [
        'Áno – princíp obrátiteľnosti chodu lúčov',
        'Nie, zrkadlo prepúšťa svetlo len jedným smerom',
        'Len ak je zrkadlo duté',
        'Len ak sedíte v rovnakej výške',
      ],
      explain: 'Lúč z jeho očí do tvojich ide tou istou cestou ako lúč z tvojich očí do jeho, len opačne. Ak teda ty vidíš jeho oči, on vidí tvoje.',
    },
  },
  {
    title: 'Úplný odraz a kritický uhol',
    text: 'Keď ide svetlo z hustejšieho do redšieho prostredia (napríklad zo skla do vzduchu), láme sa od kolmice – uhol lomu je väčší ako uhol dopadu. Ak uhol dopadu zväčšuješ, uhol lomu raz dosiahne 90° a lomený lúč sa kĺže po rozhraní. Tento uhol dopadu je kritický uhol α_krit.\n\nPri ešte väčšom (nadkritickom) uhle dopadu lúč do druhého prostredia neprejde vôbec a celý sa odrazí späť – podľa rovnakého zákona ako pri zrkadle. To je úplný odraz. Pri podkritickom uhle platí zákon lomu, pri uhle presne kritickom je uhol lomu 90°.\n\nÚplný odraz nastane iba pri prechode do prostredia s menším indexom lomu (n₂ < n₁). Zo vzduchu do vody k nemu nikdy nedôjde – vtedy sa lúč láme ku kolmici a vždy nájde cestu dnu.',
    formula: {
      f: 'sin α_krit = n₂ / n₁',
      what: 'Kritický uhol (existuje len pre n₂ < n₁)',
      vars: [
        ['α_krit', 'kritický uhol dopadu, meraný od kolmice [°]'],
        ['n₁', 'index lomu prostredia, v ktorom lúč ide (hustejšie)'],
        ['n₂', 'index lomu prostredia za rozhraním (redšie)'],
      ],
    },
    worked: {
      q: 'Kritický uhol úplného odrazu sústavy voda–vzduch je 49°, sústavy sklo–vzduch je 42°. Aký je kritický uhol sústavy sklo–voda? (príklad 33 z 9. cvičenia)',
      steps: [
        'Vieme: voda–vzduch: sin 49° = 1/n_v; sklo–vzduch: sin 42° = 1/n_s (n_vzduchu = 1).',
        'Hľadáme: α_krit pre lúč zo skla do vody: sin α = n_v/n_s.',
        'Indexy netreba počítať zvlášť: n_v/n_s = (1/sin 49°) / (1/sin 42°) = sin 42° / sin 49°.',
        'Dosadíme: sin 42° ≈ 0,6691, sin 49° ≈ 0,7547 → sin α ≈ 0,6691 / 0,7547 ≈ 0,8866.',
        'α = arcsin 0,8866 ≈ 62,4°.',
        'Kontrola: n_v = 1/0,7547 ≈ 1,33 (voda), n_s = 1/0,6691 ≈ 1,49 (sklo) – realistické ✓. Sklo a voda sú si opticky bližšie ako sklo a vzduch, preto je kritický uhol väčší (62,4° > 42°) ✓.',
      ],
      result: 'Kritický uhol sústavy sklo–voda je asi 62,4°.',
    },
    deeper: 'Odvodenie: kritický uhol je taký uhol dopadu, pri ktorom je uhol lomu 90°. Dosadíme do Snellovho zákona: n₁·sin α_krit = n₂·sin 90° = n₂, teda sin α_krit = n₂/n₁ = n₁,₂.\n\nKeďže sínus nemôže byť väčší ako 1, musí byť n₂ < n₁ – preto úplný odraz nastáva len pri prechode do opticky redšieho prostredia.\n\nUžitočné hodnoty: sklo (1,5) → vzduch: α_krit = arcsin(1/1,5) ≈ 41,8°; voda (1,333) → vzduch: α_krit ≈ 48,6°.',
    check: {
      q: 'Svetlo ide zo vzduchu do skla pod uhlom dopadu 80°. Nastane úplný odraz?',
      options: [
        'Nie – pri prechode do hustejšieho prostredia úplný odraz nenastáva',
        'Áno, lebo 80° je viac ako 42°',
        'Áno, vždy pri uhle nad 45°',
        'Len ak je sklo dostatočne hrubé',
      ],
      explain: 'Úplný odraz vyžaduje n₂ < n₁, teda prechod do opticky redšieho prostredia. Zo vzduchu (1) do skla (1,5) sa lúč láme ku kolmici a vždy prejde (časť sa síce odrazí, ale nie všetko).',
    },
  },
  {
    title: 'Priezor na dne lode',
    text: 'Pri úplnom odraze sa oplatí myslieť aj „naopak“, pomocou obrátiteľnosti. Lúč, ktorý ide z vody do vzduchu presne pod kritickým uhlom, vychádza tesne pozdĺž rozhrania (pod 90°). Obrátene: lúč, ktorý prichádza zo vzduchu takmer rovnobežne s rozhraním, sa vo vode zlomí práve na kritický uhol – šikmejšie to nejde.\n\nPozorovateľ v lodi preto cez priezor vidí len kužeľ morského dna s polovičným vrcholovým uhlom α_krit (meraným od zvislice). Z miest mimo tohto kužeľa sa svetlo do lode nedostane – na rozhraní sa úplne odrazí. Rovnako ryba pod hladinou vidí celý svet nad vodou stlačený do kužeľa (tzv. Snellovo okno).',
    analogy: 'Je to ako pozerať sa cez lievik: na jednej strane je široký svet, na druhej len úzky kužeľ. Spod hladiny vidíš všetko, čo je nad vodou, ale len v kuželi s uhlom α_krit od zvislice.',
    worked: {
      q: 'Na pozorovanie morských živočíchov je na dne lode osadený priezor s polomerom 40 cm. Akú veľkú plochu morského dna vzdialeného 5 m možno cez tento priezor pozorovať? Index lomu vody je 1,4. (príklad 32 z 9. cvičenia)',
      steps: [
        'Vieme: polomer priezoru R = 0,4 m, vzdialenosť dna h = 5 m, n_vody = 1,4, v lodi je vzduch (n = 1).',
        'Hľadáme: plochu S kruhu na dne, z ktorého môže prísť svetlo do lode.',
        'Najšikmejší lúč, ktorý ešte prejde do lode, zviera vo vode s kolmicou kritický uhol: sin α_krit = 1/1,4 ≈ 0,714 → α_krit ≈ 45,6°.',
        'Od okraja priezoru siaha viditeľná oblasť ďalej o h · tg α_krit = 5 · tg 45,6° ≈ 5 · 1,021 ≈ 5,10 m.',
        'Polomer viditeľného kruhu: r = R + h · tg α_krit ≈ 0,4 + 5,10 = 5,50 m.',
        'Plocha: S = π · r² = π · 5,50² ≈ 95 m².',
        'Kontrola: keby sme priezor brali ako bod, vyšlo by π · 5,10² ≈ 82 m² – skutočný priezor plochu trochu zväčší ✓.',
      ],
      result: 'Cez priezor možno pozorovať asi 95 m² dna (kruh s polomerom ≈ 5,5 m).',
    },
  },
  {
    title: 'Optické vlákno',
    text: 'Optické vlákno je tenké sklenené alebo plastové vlákno. Svetlo vo vnútri dopadá na jeho stenu pod uhlom väčším ako kritický, preto sa úplne odrazí – a tak stále dokola. Na obrázku vidíš, ako lúč „cikcak“ putuje vláknom a nemôže uniknúť. Takto sa prenáša internet aj svetlo v mnohých meracích prístrojoch.\n\nAk lúč ide vo vlákne pod uhlom θ voči osi vlákna, na stenu dopadá pod uhlom 90° − θ (od kolmice na stenu). Vo vlákne ostanú len lúče, pre ktoré 90° − θ ≥ α_krit. Na kolmo zrezanom konci vlákna tieto lúče vyjdú von a rozbiehajú sa do kužeľa.\n\nPozor na uhly: pri stene sa uhol meria od kolmice na stenu, na konci vlákna od kolmice na koncovú plochu, a to je os vlákna. Je to tá istá geometria, len z dvoch strán.',
    fig: 'fiber',
    worked: {
      q: 'Tenkým optickým káblom svietime kolmo na stenu. Aký bude polomer svetelnej škvrny, ak držíme koniec kábla 5 cm od steny? Kábel je vyrobený z materiálu s indexom lomu 1,2. (príklad 34 z 9. cvičenia)',
      steps: [
        'Vieme: n = 1,2, okolie je vzduch (n = 1), vzdialenosť d = 5 cm, kábel je tenký (jeho hrúbku zanedbáme).',
        'Hľadáme: polomer škvrny r = d · tg γ, kde γ je najväčší uhol (od osi), pod ktorým lúč vyjde z konca kábla.',
        'Kritický uhol na stene: sin α_krit = 1/1,2 ≈ 0,833 → α_krit ≈ 56,4°.',
        'Najväčší uhol lúča voči osi kábla, pri ktorom ešte ostane vnútri: θ_max = 90° − 56,4° = 33,6°.',
        'Na konci kábla (Snell, kábel → vzduch): sin γ = 1,2 · sin 33,6° ≈ 1,2 · 0,553 ≈ 0,663 → γ ≈ 41,55°.',
        'Polomer škvrny: r = 5 cm · tg 41,55° ≈ 5 · 0,886 ≈ 4,4 cm.',
        'Kontrola iným spôsobom: sin γ = n · cos α_krit = √(n² − 1) = √(1,44 − 1) = √0,44 ≈ 0,663 ✓.',
      ],
      result: 'Svetelná škvrna bude mať polomer asi 4,4 cm.',
    },
  },
  {
    title: 'Ohnutý optický kábel',
    text: 'Kábel nie je vždy rovný. Keď sa ohne, lúče, ktoré v rovnom úseku išli rovnobežne s osou, narazia na vonkajšiu stenu ohybu pod menším uhlom dopadu. Ak je ohyb príliš ostrý, uhol klesne pod kritický a svetlo unikne von.\n\nKľúčové pozorovanie: na guľovej (kruhovej) stene je kolmica vždy polomer, teda smeruje do stredu ohybu. Lúč, ktorý ide vo vzdialenosti d od stredu ohybu, narazí na vonkajšiu stenu s polomerom R pod uhlom α, pre ktorý sin α = d/R. Najhoršie je na tom lúč pri vnútornom okraji kábla (najmenšie d).\n\nPríklady 35 a 36 sú z 10. cvičenia a oba stoja na úplnom odraze. Tu je príklad 35 o ohybe kábla, v ďalšom kroku príklad 36 o odrazke.',
    worked: {
      q: 'Aký musí byť vonkajší polomer R ohybu optického kábla s hrúbkou l, aby sa svetlo šíriace sa pozdĺž rovného úseku kábla nedostalo von? Index lomu materiálu kábla je n. (príklad 35 z 10. cvičenia)',
      steps: [
        'Vieme: hrúbka kábla l, index lomu n, okolie je vzduch. V rovnom úseku idú lúče rovnobežne s osou.',
        'Hľadáme: najmenšie R, pri ktorom sa všetky lúče na vonkajšej stene úplne odrazia.',
        'Kde začína ohyb, lúč pokračuje rovno a narazí na vonkajšiu stenu (kružnica s polomerom R). Ak ide vo vzdialenosti d od stredu ohybu, uhol dopadu spĺňa sin α = d/R (kolmica na stenu je polomer).',
        'Najmenší uhol dopadu má lúč pri vnútornej stene: d = R − l, teda sin α = (R − l)/R.',
        'Podmienka úplného odrazu: sin α ≥ sin α_krit = 1/n → (R − l)/R ≥ 1/n.',
        'Úprava: n·(R − l) ≥ R → n·R − R ≥ n·l → R·(n − 1) ≥ n·l → R ≥ n·l / (n − 1).',
        'Číselne pre n = 1,5 a l = 1 mm: R ≥ 1,5 · 1 / 0,5 = 3 mm. Kontrola: čím väčšie n, tým menšie n/(n − 1), tým ostrejší ohyb kábel znesie ✓.',
      ],
      result: 'R ≥ n·l / (n − 1); napríklad pre n = 1,5 musí byť vonkajší polomer ohybu aspoň 3-násobok hrúbky kábla.',
    },
  },
  {
    title: 'Odrazka',
    text: 'Odrazka na bicykli vracia svetlo späť tam, odkiaľ prišlo (na rovnakom princípe, len v 3D, fungujú aj odrazné hranoly pre totálnu stanicu). V priereze je to rovnoramenný pravouhlý trojuholník: svetlo vstúpi preponou, úplne sa odrazí od oboch odvesien a vyjde späť preponou.\n\nPrečo ide späť rovnobežne? Odraz od steny obráti tú zložku smeru lúča, ktorá je na stenu kolmá. Odvesny sú na seba kolmé, takže po dvoch odrazoch sú obrátené obe zložky – lúč ide presne opačným smerom. Pri výstupe cez preponu sa zlomí presne opačne ako pri vstupe (obrátiteľnosť), a preto je vychádzajúci lúč rovnobežný so vstupujúcim.\n\nOdrazka však funguje len vtedy, keď na oboch odvesnách nastane úplný odraz. To obmedzuje, ako šikmo môže svetlo na odrazku dopadať.',
    worked: {
      q: 'Dokáž, že lúč vychádzajúci z odrazky je rovnobežný so vstupujúcim. Pre index lomu materiálu 1,5 nájdi interval uhlov dopadu, pri ktorých odrazka lúče odráža. Prierez odrazky je rovnoramenný pravouhlý trojuholník. (príklad 36 z 10. cvičenia)',
      steps: [
        'Vieme: n = 1,5, okolie je vzduch; odvesny zvierajú s preponou 45° a navzájom 90°.',
        'Rovnobežnosť: každý odraz obráti zložku smeru kolmú na danú odvesnu. Odvesny sú kolmé, po dvoch odrazoch sú obrátené obe zložky → lúč ide presne opačným smerom. Výstup cez preponu je zrkadlovým opakom vstupu (obrátiteľnosť) → vychádzajúci lúč ∥ vstupujúci.',
        'Interval: na preponu dopadá lúč pod uhlom α, v skle ide pod uhlom β od kolmice na preponu: sin α = 1,5 · sin β.',
        'Kolmice na odvesny zvierajú s kolmicou na preponu 45°. Na prvú odvesnu preto lúč dopadá pod uhlom 45° − β a na druhú pod 90° − (45° − β) = 45° + β.',
        'Úplný odraz na oboch: 45° − |β| ≥ α_krit, kde sin α_krit = 1/1,5 → α_krit ≈ 41,81°. Teda |β| ≤ 45° − 41,81° = 3,19°.',
        'Späť na vstup: sin α ≤ 1,5 · sin 3,19° ≈ 1,5 · 0,0556 ≈ 0,0835 → |α| ≤ 4,8°.',
        'Kontrola: pri kolmom dopade (α = 0) sú oba uhly 45° > 41,8° ✓ – odrazka funguje najlepšie, keď na ňu svietiš takmer kolmo.',
      ],
      result: 'Odrazka odráža lúče s uhlom dopadu približne od −4,8° do +4,8° (voči kolmici na preponu).',
    },
    check: {
      q: 'Prečo odrazka funguje, aj keď jej odvesny nie sú postriebrené?',
      options: [
        'Na odvesnách nastáva úplný odraz',
        'Sklo odráža vždy všetko svetlo',
        'Prepona funguje ako zrkadlo',
        'Svetlo sa v skle spomalí až na nulu',
      ],
      explain: 'Lúč dopadá na odvesny zvnútra (zo skla do vzduchu) pod uhlom okolo 45°, čo je viac ako kritický uhol 41,8°. Preto sa úplne odrazí a žiadne zrkadlo nie je potrebné.',
    },
  },
  {
    title: 'Zhrnutie',
    text: 'Geometrická optika stojí na niekoľkých jednoduchých zákonoch. Ak ich vieš použiť a nepomýliš si uhly od kolmice s uhlami od povrchu, zvládneš všetky príklady zo 7., 9. aj 10. cvičenia.',
    bullets: [
      'Svetlo: EM vlnenie s 380 nm < λ < 760 nm; v geometrickej optike ho kreslíme ako lúče.',
      'Bodový zdroj vrhá len tieň, plošný zdroj aj polotieň. Prostredia: priehľadné (ostro), priesvitné (rozmazane), nepriehľadné.',
      'I. zákon: v prostredí s konštantným n sa svetlo šíri priamočiaro (tiene, podobné trojuholníky).',
      'Zákon odrazu: α′ = α. Zrkadlový odraz od hladkého, difúzny od drsného povrchu.',
      'Rovinné zrkadlo: obraz je rovnako ďaleko za zrkadlom, rovnako veľký, neskutočný, s vymenenou pravou a ľavou stranou.',
      'Index lomu: n = c₀/c; relatívny n₁,₂ = c₁/c₂ = n₂/n₁.',
      'Snellov zákon: n₁·sin α₁ = n₂·sin α₂. Do hustejšieho ku kolmici, do redšieho od kolmice.',
      'Odrazený ⊥ lomený (Brewster): tg α = n₂/n₁.',
      'Obrátiteľnosť: dráha lúča nezávisí od smeru chodu. Nezávislosť: lúče sa neovplyvňujú.',
      'Úplný odraz: len do prostredia s menším n a pri α > α_krit; sin α_krit = n₂/n₁.',
      'Typické chyby: uhol od povrchu namiesto od kolmice, kalkulačka v radiánoch, otočený zlomok n₂/n₁.',
    ],
  },
];

export default steps;
