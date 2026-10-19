// Geodézia 1, Zadanie 5: praktický návod na cvičenie (Po 19. 10. 2026, 12:00, B321).
// Výpočet sa robí v Exceli, čísla sú zo zadania č. 15 (G1_zad5-vstupne_hodnoty.xlsx, Molnar Adam).
// Výsledky sú prepočítané podľa vzorového príkladu 5_Zakon_hromadenia_strednych_chyb.pdf.

export type Cell = [cell: string, write: string, note?: string];

export type NavodStep = {
  title: string;
  /** čo spraviť, jedna veta = jeden krok */
  todo: string[];
  /** čo napísať do buniek Excelu */
  cells?: Cell[];
  /** čo ti má vyjsť (kontrola) */
  expect?: string[];
  tip?: string;
};

export const NAVOD: NavodStep[] = [
  {
    title: 'Pred cvičením',
    todo: [
      'Vezmi si notebook s Excelom a kalkulačku.',
      'Kalkulačku prepni na GRAD (tlačidlo DRG alebo MODE). Displej má ukazovať G alebo GRAD.',
      'V AIS (Dokumentový server → Geodézia 1) maj stiahnuté: zadávací hárok Zadania 5, vzorový príklad a tabuľku vstupných hodnôt.',
    ],
    tip: 'Všetky tri súbory sú aj v projekte v priečinku Geodezia_1/Zadanie_5.',
  },
  {
    title: 'Nájdi svoje čísla',
    todo: [
      'Otvor G1_zad5-vstupne_hodnoty.xlsx.',
      'Hárok „Uloha A“: nájdi riadok Molnar Adam, číslo zadania 15.',
      'Hárok „Uloha B“: znova riadok Molnar Adam, číslo 15.',
      'Skontroluj, či máš tieto čísla:',
    ],
    expect: [
      'A: r₁…r₆ = 131,40 · 131,29 · 131,15 · 131,24 · 131,19 · 131,17 m',
      'B: d = 201,26 m (md 0,03 m), β = 19,5082 g (mβ 5cc)',
      'B: hp = 2,31 m (mhp 0,02 m), hc = 2,14 m (mhc 0,01 m)',
    ],
  },
  {
    title: 'Založ si súbor',
    todo: [
      'Nový Excel, ulož ho ako MOLNAR_Zadanie_5.xlsx.',
      'Do buniek A1 a A2 napíš hlavičku (bunky v tomto návode sú pre hárok, kde začínaš od A1).',
    ],
    cells: [
      ['A1', 'Geodézia 1 – Zadanie č. 5: Zákon hromadenia stredných chýb'],
      ['A2', 'Adam Molnar, zadanie č. 15, 19. 10. 2026'],
    ],
    tip: 'Excel v slovenčine píše desatinnú čiarku. Čísla píš s čiarkou: 131,40.',
  },
  {
    title: 'Úloha A: tabuľka meraní',
    todo: ['Do riadku 4 napíš hlavičku tabuľky.', 'Pod ňu čísla meraní 1 až 6 a ich polomery.'],
    cells: [
      ['A4 · B4 · C4 · D4', 'č.  ·  r [m]  ·  v [mm]  ·  v² [mm²]'],
      ['A5 až A10', '1, 2, 3, 4, 5, 6'],
      ['B5 až B10', '131,40 · 131,29 · 131,15 · 131,24 · 131,19 · 131,17'],
    ],
  },
  {
    title: 'Úloha A: priemer',
    todo: ['Do A11 napíš Σ a sčítaj polomery.', 'Do A12 napíš r̄ [m] a vypočítaj priemer.', 'Bunku B12 si naformátuj na 3 desatinné miesta.'],
    cells: [
      ['B11', '=SUM(B5:B10)'],
      ['B12', '=B11/6'],
    ],
    expect: ['Σr = 787,44 m', 'r̄ = 131,240 m'],
  },
  {
    title: 'Úloha A: opravy v a v²',
    todo: [
      'Do C5 napíš vzorec opravy (priemer mínus meranie, krát 1000 na mm).',
      'Do D5 jej druhú mocninu.',
      'Označ C5:D5 a potiahni za rožok dole po riadok 10.',
      'Do C11 a D11 súčty.',
    ],
    cells: [
      ['C5', '=($B$12-B5)*1000', 'doláre držia priemer na mieste'],
      ['D5', '=C5^2'],
      ['C11', '=SUM(C5:C10)'],
      ['D11', '=SUM(D5:D10)'],
    ],
    expect: ['v = −160 · −50 · +90 · 0 · +50 · +70 mm', 'Σv = 0 (kontrola sedí)', 'Σv² = 43 600 mm²'],
    tip: 'Ak Σv nevyšlo 0, máš preklep v polomeroch alebo v priemere.',
  },
  {
    title: 'Úloha A: m₀, mr a pomerná chyba',
    todo: ['Do A13 až A15 napíš názvy: m₀ [mm], mr [mm], γ = 1 :', 'Vedľa nich vzorce.'],
    cells: [
      ['B13', '=SQRT(D11/(6-1))', 'm₀ = √(Σv² / (n − 1))'],
      ['B14', '=B13/SQRT(6)', 'mr = m₀ / √n'],
      ['B15', '=B12/(B14/1000)', 'r̄ / mr, obe v metroch'],
    ],
    expect: ['m₀ = 93,4 mm = 0,093 m', 'mr = 38,1 mm = 0,038 m', 'γ = 1 : 3 443, do protokolu napíš 1 : 3 400'],
    tip: 'Učiteľ vo vzore pomernú chybu zaokrúhlil nadol na stovky (1 : 6565 ≈ 1 : 6500).',
  },
  {
    title: 'Úloha A: obvod a plocha',
    todo: ['Do A16 až A19 napíš: O [m], mO [m], P [m²], mP [m²].', 'Vedľa nich vzorce.'],
    cells: [
      ['B16', '=2*PI()*B12', 'O = 2πr'],
      ['B17', '=2*PI()*B14/1000', 'mO = 2π · mr'],
      ['B18', '=PI()*B12^2', 'P = πr²'],
      ['B19', '=2*PI()*B12*B14/1000', 'mP = 2πr · mr'],
    ],
    expect: ['O = 824,605 m, mO = 0,24 m', 'P = 54 110,6 m² → 54 111 m², mP = 31 m²'],
  },
  {
    title: 'Úloha B: vstupné hodnoty',
    todo: ['O pár riadkov nižšie (od riadku 22) si urob tabuľku: veličina, hodnota, stredná chyba.'],
    cells: [
      ['A22 · B22 · C22', 'd [m]  ·  201,26  ·  0,03'],
      ['A23 · B23 · C23', 'β [g]  ·  19,5082  ·  5   (mβ v cc)'],
      ['A24 · B24 · C24', 'hp [m]  ·  2,31  ·  0,02'],
      ['A25 · B25 · C25', 'hc [m]  ·  2,14  ·  0,01'],
      ['A26 · B26', 'ρ [cc]  ·  =200/PI()*10000'],
    ],
    expect: ['ρ = 636 619,8 cc'],
  },
  {
    title: 'Úloha B: výškový rozdiel Δh',
    todo: [
      'Excel počíta uhly v radiánoch, preto β prevedieš: krát π a deleno 200.',
      'Do A27 tg β, do A28 Δh [m].',
    ],
    cells: [
      ['B27', '=TAN(B23*PI()/200)'],
      ['B28', '=B22*B27+B24-B25', 'Δh = d · tg β + hp − hc'],
    ],
    expect: ['tg β = 0,316400', 'Δh = 63,849 m → 63,85 m'],
    tip: 'Over si tg β aj na kalkulačke v GRAD: tan(19,5082) = 0,3164. Ak ti vyjde 0,354, kalkulačka je v stupňoch.',
  },
  {
    title: 'Úloha B: stredná chyba mΔh',
    todo: ['Každý člen zákona hromadenia daj do vlastnej bunky (A29 až A32), potom ich spoj v A33.'],
    cells: [
      ['B29', '=B27*C22', 'vplyv dĺžky: tg β · md'],
      ['B30', '=B22/COS(B23*PI()/200)^2*C23/B26', 'vplyv uhla: d/cos²β · mβ/ρ'],
      ['B31', '=C24', 'vplyv hp'],
      ['B32', '=C25', 'vplyv hc'],
      ['B33', '=SQRT(B29^2+B30^2+B31^2+B32^2)', 'mΔh'],
    ],
    expect: ['členy: 0,0095 · 0,0017 · 0,02 · 0,01 m', 'mΔh = 0,024 m → 0,02 m'],
  },
  {
    title: 'Výpočtový protokol',
    todo: [
      'Úvod začni vetou „Cieľom úlohy je…“ a opíš, čo počítaš v úlohe A a v úlohe B.',
      'Pri každom výsledku napíš vzorec, potom vzorec s dosadenými číslami a výsledok s jednotkou.',
      'Úloha A: tabuľka (č., rᵢ, v, v²) so súčtami, potom r̄, m₀, mr, γ, O ± mO, P ± mP.',
      'Úloha B: zadané hodnoty, Δh, štyri členy chyby a mΔh.',
      'Na koniec tabuľka výsledkov.',
    ],
    expect: [
      'r̄ = 131,240 m, mr = 0,038 m, γ = 1 : 3 400',
      'O = 824,605 m, mO = 0,24 m',
      'P = 54 111 m², mP = 31 m²',
      'Δh = 63,85 m, mΔh = 0,02 m',
    ],
    tip: 'Vzor protokolu je 5_Zakon_hromadenia_strednych_chyb.pdf, drž sa jeho poradia. Ak chceš, spravím ti protokol hotový ako pri Zadaní 3.',
  },
  {
    title: 'Odovzdanie',
    todo: [
      'Protokol ulož ako PDF: MOLNAR_Zadanie_5.pdf.',
      'Miesto odovzdania v AIS pre Zadanie 5 zatiaľ nie je otvorené (stav 19. 10. ráno). Keď ho doc. Marčiš otvorí, nájdeš ho v Miestach odovzdania.',
    ],
    tip: 'Odovzdám ti ho aj ja, ale až keď mi napíšeš „odovzdaj“.',
  },
];
