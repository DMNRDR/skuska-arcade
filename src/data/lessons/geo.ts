import type { Step } from '../steps';

// Geodézia 1, Zadanie 5: Zákon hromadenia stredných chýb (zadal doc. Marčiš 19. 10. 2026).
// Zdroj: AIS dokumentový server B1-GD1: 5_Zakon_hromadenia_strednych_chyb.pdf (vzorový príklad),
// zadávací hárok Geodezia_1-05.pdf a G1_zad5-vstupne_hodnoty.xlsx (zadanie č. 15, Molnar Adam).
// Interaktívne pokusy sú v learn/widgets/geodezia.tsx (miesto určuje EXTRAS v registry.ts).

const z5: Step[] = [
  {
    title: 'Čo je Zadanie 5',
    text: 'Zadanie 5 sa volá Zákon hromadenia stredných chýb. Je na jedno cvičenie (4 hodiny) a odovzdáva sa len výpočtový protokol, nič sa nemeria v teréne.\n\nMá dve úlohy. V úlohe A máš 6 meraní polomeru kruhovej stavby a počítaš priemer, chyby, obvod a plochu. V úlohe B počítaš výškový rozdiel dvoch bodov z dĺžky a uhla a jeho chybu.\n\nČísla máš vlastné, si zadanie č. 15 v tabuľke G1_zad5-vstupne_hodnoty.xlsx.',
    bullets: [
      'Úloha A: r̄, m₀, mr, pomerná chyba, obvod O ± mO, plocha P ± mP',
      'Úloha B: výškový rozdiel Δh ± mΔh',
      'Odovzdáva sa: výpočtový protokol',
    ],
    check: {
      q: 'Čo sa v Zadaní 5 odovzdáva?',
      options: ['Výpočtový protokol', 'Zápisník z merania v teréne', 'Náčrt teodolitu', 'Nič, je to len cvičenie'],
      explain: 'Zadávací hárok píše „Obsah programu: 1. Výpočtový protokol“.',
    },
  },
  {
    title: 'Tvoje vstupné hodnoty',
    text: 'Toto sú tvoje čísla zo zadania č. 15. Opíš si ich na papier, nech ich máš pred sebou.\n\nÚloha A: polomer kruhovej stavby zmeraný 6-krát.\n\nÚloha B: vodorovná dĺžka d, výškový uhol β, výška prístroja hp a výška cieľa hc. Každá hodnota má aj svoju strednú chybu (md, mβ, mhp, mhc).',
    bullets: [
      'A: r₁ = 131,40 · r₂ = 131,29 · r₃ = 131,15 · r₄ = 131,24 · r₅ = 131,19 · r₆ = 131,17 m',
      'B: d = 201,26 m, md = 0,03 m',
      'B: β = 19,5082 g (19g 50c 82cc), mβ = 5cc',
      'B: hp = 2,31 m, mhp = 0,02 m',
      'B: hc = 2,14 m, mhc = 0,01 m',
    ],
  },
  {
    title: 'Kalkulačka: prepni na gradiány',
    text: 'Uhly v geodézii sú v gradoch (gonoch). Plný kruh má 400 g, pravý uhol 100 g. Jeden grad má 100 c (centezimálnych minút) a jedna minúta 100 cc (sekúnd).\n\nNa kalkulačke stlač DRG (alebo MODE) a vyber GRAD. Ak to zabudneš, tg β vyjde úplne zle.\n\nZápis 19g 50c 82cc je to isté ako 19,5082 g. Číslice idú po dvoch: 19 | 50 | 82.',
    formula: { f: '400 g = 360°     1 g = 100c = 10 000cc', what: 'Gradová miera', vars: [['g', 'grad (gon)'], ['c', 'centezimálna minúta, 1/100 g'], ['cc', 'centezimálna sekunda, 1/100 c']] },
    check: {
      q: 'Koľko je 19g 50c 82cc v gradoch?',
      options: ['19,5082 g', '19,5820 g', '19,0582 g', '195,082 g'],
      explain: 'Minúty a sekundy sú stotiny a desaťtisíciny gradu: 19 + 0,50 + 0,0082.',
    },
  },
  {
    title: 'Postup na cvičení',
    text: 'Pôjdeš v tomto poradí. Každý bod má v Učebni vlastnú tému, tak si ich prejdi postupne.',
    bullets: [
      '1. Stredná chyba od nuly: čo je oprava v, m₀ a mr',
      '2. Zákon hromadenia: ako sa chyba prenesie do výsledku',
      '3. Úloha A: tabuľka opráv, m₀, mr, pomerná chyba, O, P',
      '4. Úloha B: Δh a mΔh',
      '5. Všetko prepíš do výpočtového protokolu',
    ],
  },
  {
    title: 'Výpočtový protokol',
    text: 'Protokol je čistý prepis výpočtu. Do každého kroku napíš vzorec, potom vzorec s dosadenými číslami a nakoniec výsledok s jednotkou.\n\nÚlohu A začni tabuľkou (číslo merania, rᵢ, v, v²) so súčtami. Nezabudni na kontrolu Σv = 0.\n\nNa konci každej úlohy daj výsledok aj s chybou, napríklad O = 824,605 m, mO = 0,24 m.',
    bullets: [
      'Hlavička: predmet, zadanie č. 5, meno, číslo zadania 15, dátum',
      'Úloha A: tabuľka, r̄, m₀, mr, γ, O ± mO, P ± mP',
      'Úloha B: Δh, parciálne derivácie, mΔh',
      'Vzorec → dosadenie → výsledok s jednotkou',
    ],
    check: {
      q: 'Čo má byť pri každom výpočte v protokole?',
      options: ['Vzorec, dosadené čísla a výsledok s jednotkou', 'Len výsledok', 'Len vzorec', 'Fotka kalkulačky'],
      explain: 'Učiteľ chce vidieť, odkiaľ výsledok je. Dosadené čísla ti ušetria body aj pri preklepe.',
    },
  },
];

const chyby: Step[] = [
  {
    title: 'Prečo meriame viackrát',
    text: 'Žiadne meranie nie je presné. Keď zmeriaš ten istý polomer šesťkrát, dostaneš šesť trochu iných čísel. Tieto malé rozdiely sú náhodné chyby.\n\nNajlepší odhad skutočnej hodnoty je aritmetický priemer. Stredná chyba hovorí, ako veľmi sa merania rozptyľujú, čiže ako veľmi môžeš výsledku veriť.',
    fig: 'geo-kruh',
    analogy: 'Hádžeš šípky na terč. Priemer zásahov je tvoj najlepší odhad stredu terča. Ak sú šípky rozhádzané, aj ten odhad je menej istý.',
  },
  {
    title: 'Aritmetický priemer r̄',
    text: 'Všetky merania sčítaš a vydelíš ich počtom n. Výsledok je najpravdepodobnejšia hodnota.',
    formula: {
      f: 'r̄ = Σrᵢ / n',
      what: 'Aritmetický priemer',
      vars: [
        ['r̄', 'priemer, „r s pruhom“'],
        ['Σ', 'sigma, súčet všetkého, čo za ňou nasleduje'],
        ['rᵢ', 'i-te meranie (r₁, r₂, … r₆)'],
        ['n', 'počet meraní, u teba 6'],
      ],
    },
    worked: {
      q: 'Tvoje merania: 131,40; 131,29; 131,15; 131,24; 131,19; 131,17 m',
      steps: ['Súčet: 131,40 + 131,29 + 131,15 + 131,24 + 131,19 + 131,17 = 787,44 m', 'Vydeľ počtom: 787,44 / 6'],
      result: 'r̄ = 131,240 m',
    },
  },
  {
    title: 'Oprava v',
    text: 'Oprava hovorí, o koľko treba meranie „opraviť“, aby sa rovnalo priemeru. Počíta sa ako priemer mínus meranie.\n\nOpravy píš v milimetroch, sú to malé čísla. Pozor na znamienko: keď je meranie väčšie ako priemer, oprava vyjde záporná.\n\nKontrola: súčet všetkých opráv musí byť 0 (alebo skoro 0 kvôli zaokrúhleniu). Ak nie je, máš chybu v priemere.',
    formula: { f: 'vᵢ = r̄ − rᵢ     Σv = 0', what: 'Oprava a kontrola', vars: [['vᵢ', 'oprava i-teho merania'], ['r̄', 'priemer'], ['rᵢ', 'i-te meranie']] },
    worked: {
      q: 'Oprava prvého merania r₁ = 131,40 m',
      steps: ['v₁ = r̄ − r₁ = 131,240 − 131,40', '= −0,160 m', 'Prepočet na mm: krát 1000'],
      result: 'v₁ = −160 mm',
    },
    check: {
      q: 'Priemer je 131,240 m a meranie 131,15 m. Aká je oprava?',
      options: ['+90 mm', '−90 mm', '+9 mm', '−0,9 mm'],
      explain: 'v = 131,240 − 131,15 = +0,090 m = +90 mm. Meranie je menšie ako priemer, preto je oprava kladná.',
    },
  },
  {
    title: 'Jednotková stredná chyba m₀',
    text: 'm₀ je stredná chyba jedného merania. Hovorí, o koľko sa jedno meranie typicky líši od priemeru.\n\nOpravy umocníš na druhú (zmiznú znamienka), sčítaš, vydelíš n − 1 a odmocníš.\n\nPrečo n − 1 a nie n? Jedno meranie sme „minuli“ na výpočet priemeru. Keby si mal len jedno meranie, chybu by si nevedel odhadnúť vôbec, a n − 1 = 0 to pekne ukáže.',
    formula: {
      f: 'm₀ = √( Σv² / (n − 1) )',
      what: 'Jednotková stredná chyba (jedného merania)',
      vars: [
        ['m₀', 'stredná chyba jedného merania'],
        ['Σv²', 'súčet druhých mocnín opráv'],
        ['n − 1', 'počet nadbytočných meraní, u teba 5'],
      ],
    },
    check: {
      q: 'Prečo sa opravy pri m₀ umocňujú na druhú?',
      options: ['Aby sa kladné a záporné opravy navzájom nevyrušili', 'Aby vyšlo väčšie číslo', 'Lebo je to v metroch štvorcových', 'Netreba, je to len zvyk'],
      explain: 'Súčet opráv je vždy 0. Až druhé mocniny ukážu, aké veľké odchýlky naozaj boli.',
    },
  },
  {
    title: 'Stredná chyba priemeru mr',
    text: 'Priemer zo 6 meraní je presnejší ako jedno meranie. O koľko? Delíš √n.\n\nZo 4 meraní je priemer 2-krát presnejší, zo 6 meraní asi 2,45-krát. Preto sa oplatí merať viackrát.',
    formula: {
      f: 'mr = m₀ / √n = √( Σv² / (n·(n − 1)) )',
      what: 'Stredná chyba aritmetického priemeru',
      vars: [
        ['mr', 'stredná chyba priemeru r̄'],
        ['m₀', 'jednotková stredná chyba'],
        ['√n', 'odmocnina z počtu meraní, √6 ≈ 2,449'],
      ],
    },
    check: {
      q: 'm₀ = 26 mm, n = 6. Koľko je mr?',
      options: ['≈ 11 mm', '≈ 26 mm', '≈ 4 mm', '≈ 64 mm'],
      explain: '26 / √6 = 26 / 2,449 ≈ 10,6 mm. To je príklad z podkladov od doc. Marčiša (0,011 m).',
    },
  },
  {
    title: 'Pomerná chyba γ',
    text: 'Pomerná chyba porovná chybu s veľkosťou meranej veci. Chyba 1 cm na 100 m je výborná, 1 cm na 1 m je zlá.\n\nPíše sa ako 1 : číslo. Čím väčšie číslo za dvojbodkou, tým presnejšie. Učiteľ ho v príklade zaokrúhlil nadol na stovky (1 : 6565 ≈ 1 : 6500).',
    formula: { f: 'γ = mr / r̄ = 1 : (r̄ / mr)', what: 'Pomerná (relatívna) chyba', vars: [['γ', 'gama, pomerná chyba'], ['r̄', 'priemer v m'], ['mr', 'stredná chyba priemeru v m (rovnaké jednotky!)']] },
    check: {
      q: 'Ktorá pomerná chyba znamená presnejšie meranie?',
      options: ['1 : 6500', '1 : 3400', '1 : 500', 'Všetky sú rovnaké'],
      explain: 'Väčšie číslo = chyba je menšia časť z meranej dĺžky.',
    },
  },
];

const zakon: Step[] = [
  {
    title: 'O čom je zákon hromadenia',
    text: 'Často nemeriaš priamo to, čo chceš. Zmeriaš polomer a chceš obvod. Zmeriaš dĺžku a uhol a chceš výšku.\n\nVýsledok je funkcia meraných veličín. Zákon hromadenia stredných chýb povie, akú chybu bude mať výsledok, keď poznáš chyby meraní.',
    analogy: 'Recept na koláč: keď trochu nepresne odvážiš múku aj cukor, koláč bude nepresný „trochu z oboch“. Zákon hromadenia spočíta, koľko z každého.',
  },
  {
    title: 'Vzorec zákona hromadenia',
    text: 'Pre každú meranú veličinu urobíš tri veci: zderivuješ funkciu podľa nej, vynásobíš jej strednou chybou a umocníš na druhú. Všetko sčítaš a odmocníš.\n\nDerivácia hovorí, ako citlivo výsledok reaguje na danú veličinu. Ak je veľká, aj malá chyba v meraní narobí veľkú chybu vo výsledku.',
    formula: {
      f: 'y = f(x₁, x₂, …)\nmy = √( (∂f/∂x₁ · m₁)² + (∂f/∂x₂ · m₂)² + … )',
      what: 'Zákon hromadenia stredných chýb',
      vars: [
        ['y', 'výsledok, ktorý počítaš (O, P, Δh)'],
        ['x₁, x₂', 'merané veličiny (r, d, β …)'],
        ['∂f/∂x', 'parciálna derivácia: derivuješ podľa x, ostatné berieš ako konštanty'],
        ['m₁, m₂', 'stredné chyby meraných veličín'],
        ['my', 'stredná chyba výsledku'],
      ],
    },
    deeper: 'Chyby sa sčítavajú v druhých mocninách, lebo sú náhodné a nezávislé. Raz sa jedna trafí nahor a druhá nadol, takže sa čiastočne vyrušia. Preto je výsledná chyba menšia ako obyčajný súčet chýb.\n\nPríklad: dve chyby po 3 mm dajú √(9 + 9) = 4,2 mm, nie 6 mm.',
  },
  {
    title: 'Jedna veličina: obvod kruhu',
    text: 'Keď výsledok závisí len od jednej veličiny, pod odmocninou je len jeden člen a odmocnina sa „zje“ s druhou mocninou.\n\nObvod O = 2·π·r. Derivácia podľa r je 2·π (π je len číslo). Takže mO = 2·π·mr.',
    formula: { f: 'O = 2πr     mO = (∂O/∂r) · mr = 2π · mr', what: 'Chyba obvodu', vars: [['∂O/∂r', 'derivácia 2πr podľa r = 2π'], ['mr', 'stredná chyba polomeru']] },
    check: {
      q: 'Aká je derivácia plochy P = π·r² podľa r?',
      options: ['2·π·r', 'π·r', 'π', '2·π'],
      explain: 'Derivácia r² je 2r, π je konštanta. Preto mP = 2·π·r·mr.',
    },
  },
  {
    title: 'Viac veličín: sčítaj druhé mocniny',
    text: 'Pri Δh = d·tg β + hp − hc sú štyri merané veličiny. Pre každú spravíš člen (derivácia · chyba) a pod odmocninou ich sčítaš na druhú.\n\nDerivácie: podľa d je tg β, podľa β je d / cos²β, podľa hp je 1 a podľa hc je −1. Mínus nevadí, po umocnení zmizne.',
    bullets: ['∂Δh/∂d = tg β', '∂Δh/∂β = d / cos²β (a uhol treba deliť ρ)', '∂Δh/∂hp = 1', '∂Δh/∂hc = −1'],
    check: {
      q: 'Prečo nevadí, že derivácia podľa hc je −1?',
      options: ['Člen sa umocňuje na druhú, takže znamienko zmizne', 'Lebo hc je malé', 'Lebo sa to odčíta', 'Vadí, chyba vyjde záporná'],
      explain: '(−1 · mhc)² = mhc². Stredná chyba je vždy kladná.',
    },
  },
  {
    title: 'Uhol v chybe: čo je ρ',
    text: 'Keď derivuješ podľa uhla, chyba uhla musí byť v radiánoch. Chybu máš v cc (centezimálnych sekundách), tak ju vydelíš číslom ρ.\n\nρ (ró) je počet cc v jednom radiáne: ρ = 200 / π · 10 000 ≈ 636 620 cc.',
    formula: { f: 'mβ [rad] = mβ[cc] / ρ     ρ = 636 620 cc', what: 'Prevod chyby uhla na radiány', vars: [['ρ', 'ró, cc v jednom radiáne'], ['mβ', 'stredná chyba uhla']] },
    check: {
      q: 'Koľko je 5cc v radiánoch?',
      options: ['≈ 0,0000079 rad', '5 rad', '0,05 rad', '≈ 0,0079 rad'],
      explain: '5 / 636 620 = 7,85 · 10⁻⁶ rad. Je to veľmi malý uhol.',
    },
  },
];

const ulohaA: Step[] = [
  {
    title: 'Zadanie úlohy A',
    text: 'Polomer kruhovej stavby si zmeral na 6 miestach. Vypočítaj strednú hodnotu polomeru, jednotkovú strednú chybu, strednú chybu polomeru a pomernú chybu. Potom obvod a plochu stavby aj s ich strednými chybami.',
    fig: 'geo-kruh',
    bullets: ['r₁ = 131,40 m · r₂ = 131,29 m · r₃ = 131,15 m', 'r₄ = 131,24 m · r₅ = 131,19 m · r₆ = 131,17 m'],
  },
  {
    title: 'Krok 1: priemer',
    text: 'Sčítaj šesť meraní a vydeľ šiestimi. Priemer píš na tri desatinné miesta (milimetre).',
    worked: { q: 'r̄ = Σrᵢ / n', steps: ['Σrᵢ = 787,44 m', 'r̄ = 787,44 / 6'], result: 'r̄ = 131,240 m' },
  },
  {
    title: 'Krok 2: tabuľka opráv',
    text: 'Pre každé meranie vypočítaj v = r̄ − rᵢ v milimetroch a jeho druhú mocninu. Na konci sčítaj stĺpce.',
    bullets: ['v₁ = −160 mm, v² = 25 600', 'v₂ = −50 mm, v² = 2 500', 'v₃ = +90 mm, v² = 8 100', 'v₄ = 0 mm, v² = 0', 'v₅ = +50 mm, v² = 2 500', 'v₆ = +70 mm, v² = 4 900', 'Σv = 0 (kontrola sedí), Σv² = 43 600 mm²'],
  },
  {
    title: 'Krok 3: m₀ a mr',
    text: 'Zo Σv² vypočítaš jednotkovú strednú chybu a z nej chybu priemeru. Výsledky si nechaj aj v mm, aj v m.',
    worked: {
      q: 'Σv² = 43 600 mm², n = 6',
      steps: ['m₀ = √(Σv² / (n − 1)) = √(43 600 / 5) = √8 720', 'm₀ = 93,4 mm = 0,093 m', 'mr = m₀ / √n = 93,4 / √6 = 93,4 / 2,449'],
      result: 'm₀ = 0,093 m, mr = 38,1 mm = 0,038 m',
    },
    check: {
      q: 'Prečo je mr menšia ako m₀?',
      options: ['Priemer zo 6 meraní je presnejší ako jedno meranie', 'Lebo sme zaokrúhlili', 'Lebo n − 1 = 5', 'Nie je, sú rovnaké'],
      explain: 'mr = m₀ / √6. Viac meraní, presnejší priemer.',
    },
  },
  {
    title: 'Krok 4: pomerná chyba',
    text: 'Vydeľ priemer chybou priemeru (oboje v metroch). Výsledok zaokrúhli nadol na stovky ako v príklade.',
    worked: { q: 'γ = 1 : (r̄ / mr)', steps: ['r̄ / mr = 131,240 / 0,0381', '= 3 443'], result: 'γ = 1 : 3 443 ≈ 1 : 3 400' },
  },
  {
    title: 'Krok 5: obvod a jeho chyba',
    text: 'Obvod kruhu je 2·π·r. Chybu dostaneš zo zákona hromadenia: derivácia podľa r je 2·π, krát mr.',
    worked: {
      q: 'O = 2πr̄, mO = 2π·mr',
      steps: ['O = 2 · π · 131,240 = 824,605 m', 'mO = 2 · π · 0,0381', '= 0,240 m'],
      result: 'O = 824,605 m, mO = 0,24 m',
    },
  },
  {
    title: 'Krok 6: plocha a jej chyba',
    text: 'Plocha kruhu je π·r². Derivácia podľa r je 2·π·r, takže mP = 2·π·r̄·mr. Plochu zaokrúhli na celé m², chybu tiež.',
    worked: {
      q: 'P = πr̄², mP = 2πr̄·mr',
      steps: ['P = π · 131,240² = π · 17 223,94', 'P = 54 110,6 m²', 'mP = 2 · π · 131,240 · 0,0381 = 31,4 m²'],
      result: 'P = 54 111 m², mP = 31 m²',
    },
    check: {
      q: 'Prečo je mP oveľa väčšie číslo ako mO?',
      options: ['Plocha rastie s r², takže je na chybu r citlivejšia', 'Lebo je v m²', 'Lebo sme zabudli odmocninu', 'Je to chyba vo výpočte'],
      explain: 'Derivácia 2πr = 824,6 je oveľa väčšia ako 2π = 6,28. Citlivosť funkcie sa násobí chybou.',
    },
  },
  {
    title: 'Skontroluj sa',
    text: 'Vypočítaj úlohu A sám na kalkulačke a výsledky zadaj do políčok. Zelené znamená, že sedí s riešením.',
  },
];

const ulohaB: Step[] = [
  {
    title: 'Zadanie úlohy B',
    text: 'Urči výškový rozdiel Δh bodov A a B a jeho strednú chybu mΔh. Prístroj stojí na bode A, cieľ je na bode B.\n\nZmerala sa vodorovná dĺžka d, výškový uhol β (od vodorovnej roviny hore na cieľ), výška prístroja hp a výška cieľa hc.',
    fig: 'geo-trig',
    bullets: ['d = 201,26 m, md = 0,03 m', 'β = 19,5082 g, mβ = 5cc', 'hp = 2,31 m, mhp = 0,02 m', 'hc = 2,14 m, mhc = 0,01 m'],
  },
  {
    title: 'Odkiaľ je vzorec Δh',
    text: 'Pozri obrázok. Ďalekohľad je vo výške hp nad bodom A. Zámera ide hore pod uhlom β až na cieľ.\n\nV pravouhlom trojuholníku je tg β = protiľahlá / priľahlá. Priľahlá je d, takže výška zámery nad vodorovnou čiarou je d·tg β.\n\nK tomu pripočítaš hp (prístroj je vyššie ako bod A) a odpočítaš hc (cieľ je vyššie ako bod B).',
    fig: 'geo-trig',
    formula: {
      f: 'Δh = d · tg β + hp − hc',
      what: 'Trigonometrický výškový rozdiel',
      vars: [
        ['Δh', 'výškový rozdiel bodov A a B'],
        ['d', 'vodorovná dĺžka'],
        ['β', 'výškový uhol (v gradoch)'],
        ['hp', 'výška prístroja nad A'],
        ['hc', 'výška cieľa nad B'],
      ],
    },
  },
  {
    title: 'Krok 1: Δh',
    text: 'Kalkulačka musí byť v GRAD. Najprv tg β, potom dosaď.',
    worked: {
      q: 'Δh = d · tg β + hp − hc',
      steps: ['tg(19,5082 g) = 0,316400', 'd · tg β = 201,26 · 0,316400 = 63,679 m', 'Δh = 63,679 + 2,31 − 2,14'],
      result: 'Δh = 63,849 m ≈ 63,85 m',
    },
    check: {
      q: 'Kalkulačka ti dala tg β = 0,354. Čo je zle?',
      options: ['Je prepnutá v stupňoch (DEG), nie v GRAD', 'Nič, je to správne', 'Treba radiány', 'Zle si opísal d'],
      explain: 'tan(19,5082°) = 0,354, ale tan(19,5082 g) = 0,3164. Uhly v zadaní sú v gradoch.',
    },
  },
  {
    title: 'Krok 2: štyri členy chyby',
    text: 'Pre každú veličinu derivácia krát chyba. Pri uhle chybu vydelíš ρ = 636 620, aby bola v radiánoch.\n\ncos(19,5082 g) = 0,953415, takže cos²β = 0,909001.',
    worked: {
      q: 'Členy zákona hromadenia',
      steps: [
        'd: tg β · md = 0,316400 · 0,03 = 0,00949 m',
        'β: d / cos²β · mβ / ρ = 201,26 / 0,909001 · 5 / 636 620 = 0,00174 m',
        'hp: 1 · mhp = 0,02 m',
        'hc: −1 · mhc → 0,01 m',
      ],
      result: '0,00949 · 0,00174 · 0,02 · 0,01 (všetko v m)',
    },
  },
  {
    title: 'Krok 3: mΔh',
    text: 'Členy umocni, sčítaj a odmocni. Výsledok zaokrúhli na centimetre ako v príklade.',
    formula: {
      f: 'mΔh = √( (tg β·md)² + (d/cos²β · mβ/ρ)² + mhp² + mhc² )',
      what: 'Stredná chyba výškového rozdielu',
      vars: [
        ['tg β · md', 'vplyv chyby dĺžky'],
        ['d/cos²β · mβ/ρ', 'vplyv chyby uhla'],
        ['mhp, mhc', 'vplyv chýb výšky prístroja a cieľa'],
      ],
    },
    worked: {
      q: 'Dosadenie',
      steps: ['mΔh = √(0,00949² + 0,00174² + 0,02² + 0,01²)', '= √(0,0000901 + 0,0000030 + 0,0004 + 0,0001) = √0,000593'],
      result: 'mΔh = 0,024 m ≈ 0,02 m, Δh = 63,85 m',
    },
  },
  {
    title: 'Ktorá chyba najviac škodí?',
    text: 'Pohni posuvníkmi a sleduj, ktorý stĺpec rastie. U teba najviac prispieva výška prístroja hp, potom hc a dĺžka. Uhol s 5cc skoro nič.',
    check: {
      q: 'Ktorá chyba najviac zväčšuje mΔh v tvojom zadaní?',
      options: ['mhp = 0,02 m (výška prístroja)', 'mβ = 5cc (uhol)', 'md = 0,03 m (dĺžka)', 'Všetky rovnako'],
      explain: 'Člen dĺžky je tg β · 0,03 = 0,0095 m, čo je menej ako 0,02 m. Člen uhla je len 0,0017 m.',
    },
  },
  {
    title: 'Skontroluj sa',
    text: 'Vypočítaj úlohu B sám a zadaj výsledky. Zelené políčko = sedí.',
  },
];

export const GEO_STEPS: Record<string, Step[]> = {
  'geo:z5': z5,
  'geo:chyby': chyby,
  'geo:zakon': zakon,
  'geo:ulohaA': ulohaA,
  'geo:ulohaB': ulohaB,
};
