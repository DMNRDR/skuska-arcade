// Geodézia 1, Zadanie 7: Meranie zvislých uhlov (Po 9. 11. 2026, cvičenie, doc. Marčiš).
// 5 zvislých uhlov v 3 skupinách prístrojmi Nivel System DT-2 a Trimble C5, priemerná indexová chyba.
// Vzorce a príklad sú z učiteľovho 7_Meranie_zvislych_uhlov.pdf (2i = 400 − (Z_I + Z_II), ε = 100 − z).

import type { NavodStep } from './geo-navod';

export const NAVOD7: NavodStep[] = [
  {
    title: 'Čo dnes robíš',
    todo: [
      'Odmeriaš 5 zvislých uhlov (na 5 cieľov) v 3 skupinách.',
      'Dvoma prístrojmi: Nivel System DT-2 a Trimble C5.',
      'Na stanovisku ste dvaja, ale meria každý sám. Ciele ti ukáže vedúci cvičenia.',
      'Z meraní vypočítaš indexovú chybu i a jej priemer.',
    ],
    expect: [
      'Odovzdáš: technickú správu s výpočtom priemernej indexovej chyby',
      'a vypočítané zápisníky s čiastkovými indexovými chybami',
    ],
  },
  {
    title: 'Čo si vziať',
    todo: [
      'Zápisník meraných zvislých uhlov, vytlačený 2×: jeden pre DT-2, jeden pre C5 (je v AIS na dokumentovom serveri).',
      'Ceruzku a gumu (do zápisníka sa píše ceruzkou).',
      'Kalkulačku prepnutú na GRAD.',
      'Prístroj, statív a batériu dostaneš na cvičení.',
    ],
    tip: 'Zápisník aj zadanie sú v projekte v priečinku Geodezia_1/Zadanie_7.',
  },
  {
    title: 'Pojmy: zenitový uhol Z',
    todo: [
      'Prístroj meria zvislý uhol ako zenitový uhol Z.',
      'Z sa meria od zenitu (kolmo hore) dole k cieľu.',
      'Hore (zenit) = 0 g. Vodorovne = 100 g. Kolmo dole = 200 g.',
      'Cieľ nad horizontom má Z menšie ako 100 g, cieľ pod horizontom väčšie ako 100 g.',
    ],
    expect: ['ε = 100 g − Z … výškový uhol (od vodorovnej roviny)', 'Z = 95,7525 g → ε = +4,2475 g (cieľ je nad horizontom)'],
    tip: 'Rozklad: ε (epsilon) = výškový uhol, 100 g = vodorovný smer, Z = zenitový uhol. Kladné ε = cieľ hore, záporné = dole.',
  },
  {
    title: 'Pojmy: indexová chyba i',
    todo: [
      'Index je značka, od ktorej prístroj číta zvislý kruh.',
      'Keď index nie je presne tam, kde má byť, všetky Z sú posunuté o rovnaký malý uhol. To je indexová chyba i.',
      'Preto meriaš v dvoch polohách ďalekohľadu: v I. polohe je chyba s jedným znamienkom, v II. s opačným.',
      'Keby prístroj nemal chybu, platilo by presne Z_I + Z_II = 400 g.',
    ],
    expect: ['2i = 400 g − (Z_I + Z_II)', 'i = (400 g − Σ) / 2, kde Σ = Z_I + Z_II'],
    tip: 'Rozklad: Z_I = čítanie v I. polohe, Z_II = čítanie v II. polohe, Σ = ich súčet, i = indexová chyba (vychádza v cc, napr. +5cc).',
  },
  {
    title: 'Postav prístroj',
    todo: [
      'Postav statív nad bod, hlavu statívu približne vodorovne.',
      'Prístroj zacentruj nad bod (optický alebo laserový olovnica).',
      'Urovnaj: najprv krabicová libela nohami statívu, potom alidádová (elektronická) libela stavacími skrutkami.',
      'Zapni prístroj a v nastaveniach skontroluj: uhly v gon (grady) a zvislý uhol ako zenitový.',
    ],
    expect: ['Kontrola: ďalekohľad dáš približne vodorovne → displej ukazuje V ≈ 100 g'],
    tip: 'Pri zvislých uhloch záleží na dobrom urovnaní. Ak V pri vodorovnom ďalekohľade ukazuje okolo 0 g alebo %, máš zlé nastavenie zvislého uhla, oprav ho v menu.',
  },
  {
    title: 'Ciele a zápisník',
    todo: [
      'Vedúci cvičenia ti určí 5 cieľov (napr. hrot, roh budovy, terč), najlepšie v rôznych výškach.',
      'Do zápisníka hore napíš stanovisko, prístroj, dátum, meno.',
      'Do stĺpca „smer na“ napíš čísla cieľov 1 až 5.',
      'Odfoť si alebo načrtni, kam presne mieriš, aby si v každej skupine cielil na ten istý bod.',
    ],
    cellsTitle: 'Zápisník: jeden cieľ = 3 riadky',
    cells: [
      ['I', 'čítanie Z v I. polohe', 'g · c · cc'],
      ['II', 'čítanie Z v II. polohe', 'g · c · cc'],
      ['Σ', 'súčet I + II', 'má byť blízko 400 g'],
    ],
  },
  {
    title: '1. skupina: I. poloha',
    todo: [
      'I. poloha = zvislý kruh je vľavo, keď pozeráš do okulára.',
      'Zacieľ na cieľ 1. Pri zvislom uhle rozhoduje VODOROVNÁ ryska: polož ju presne na bod.',
      'Bod maj blízko stredu kríža (pri zvislej ryske).',
      'Jemne doladi zvislou ustanovkou, odčítaj Z a zapíš do riadku I, 1. skupina.',
      'To isté pre ciele 2, 3, 4, 5.',
    ],
    expect: ['Cieľ nad horizontom: Z_I je trochu menej ako 100 g (napr. 95,7523)'],
    tip: 'Zapisuj celé čítanie: 95 g · 75 c · 23 cc. Nič neprepisuj, chybu preškrtni a napíš vedľa.',
  },
  {
    title: '1. skupina: II. poloha',
    todo: [
      'Preklop ďalekohľad cez zenit a otoč alidádu o 200 g. Teraz je zvislý kruh vpravo.',
      'Zacieľ na ten istý bod, opäť vodorovnou ryskou. Ideš odzadu: 5, 4, 3, 2, 1.',
      'Odčítaj Z a zapíš do riadku II.',
      'Hneď sčítaj I + II do riadku Σ.',
    ],
    expect: ['Z_II je okolo 300 g (napr. 304,2467)', 'Σ = 399,9990 → blízko 400 g, meranie je v poriadku'],
    tip: 'Ak Σ vyjde ďaleko od 400 g (napríklad o 0,05 g a viac), si asi cielil na iný bod. Zmeraj ten cieľ znova v oboch polohách.',
  },
  {
    title: '2. a 3. skupina',
    todo: [
      'Celé to zopakuj ešte 2×: I. poloha 1 až 5, II. poloha 5 až 1.',
      'Výsledky píš do stĺpcov 2. skupina a 3. skupina.',
      'Potom vymeníš prístroj a celé to spravíš aj s druhým prístrojom (DT-2 aj Trimble C5) do druhého zápisníka.',
      'Kolega z dvojice meria to isté samostatne do svojho zápisníka.',
    ],
    expect: ['Na prístroj: 5 cieľov × 3 skupiny = 15 hodnôt indexovej chyby i'],
  },
  {
    title: 'Výpočet: indexová chyba i',
    todo: [
      'Pre každý cieľ a každú skupinu: Σ = Z_I + Z_II.',
      'Rozdiel od 400 g vydeľ dvoma, to je i.',
      'i zapíš do zápisníka (napr. do Poznámok alebo vedľa riadku Σ), so znamienkom.',
    ],
    cellsTitle: 'Príklad z učiteľovho zadania (1. skupina)',
    cells: [
      ['Z_I', '95,7523 g'],
      ['Z_II', '304,2467 g'],
      ['Σ', '399,9990 g'],
      ['2i', '400 − 399,9990 = 0,0010 g = 10cc'],
      ['i', '+5cc', 'kladné, lebo Σ vyšla menej ako 400'],
    ],
    tip: 'Prevod jednotiek: 1 g = 100 c = 10 000 cc. Takže 0,0010 g = 10 cc.',
  },
  {
    title: 'Výpočet: opravené Z',
    todo: [
      'K obom čítaniam pripočítaj i: Z′_I = Z_I + i a Z′_II = Z_II + i.',
      'Do zápisníka do stĺpca „Z′ + i“ sa píšu len c a cc.',
      'Kontrola: Z′_I + Z′_II musí dať presne 400,0000 g (v Σ riadku „00 00“).',
    ],
    cellsTitle: 'Príklad (3 skupiny, ten istý cieľ)',
    cells: [
      ['1. sk.', '95,7523 + 5cc = 95,7528', '304,2467 + 5cc = 304,2472'],
      ['2. sk.', '95,7515 + 4cc = 95,7519', 'Σ = 399,9992, i = +4cc'],
      ['3. sk.', '95,7523 + 6cc = 95,7529', 'Σ = 399,9988, i = +6cc'],
    ],
    expect: ['Σ opravených = 400,0000 g v každej skupine'],
  },
  {
    title: 'Výpočet: priemer a ε',
    todo: [
      'Priemerné Z cieľa = súčet opravených Z_I z 3 skupín / 3.',
      'Zapíš ho do stĺpca „Priemer z … skupín“.',
      'Výškový uhol ε = 100 g − Z.',
    ],
    cells: [
      ['Z', '(95,7528 + 95,7519 + 95,7529) / 3 = 95,7525 g'],
      ['ε', '100 − 95,7525 = +4,2475 g', 'kladné: cieľ je nad horizontom'],
    ],
    expect: ['Z = 95,7525 g, ε = +4,2475 g (presne ako v učiteľovom príklade)'],
  },
  {
    title: 'Kalkulačka: over si svoje čísla',
    todo: ['Napíš svoje čítanie z I. a II. polohy (v gradoch, s čiarkou alebo bodkou).', 'Kalkulačka ti dá Σ, i a opravené uhly.'],
    calc: true,
  },
  {
    title: 'Priemerná indexová chyba',
    todo: [
      'Pre jeden prístroj máš 15 hodnôt i (5 cieľov × 3 skupiny).',
      'Sčítaj ich a vydeľ 15.',
      'To isté zvlášť pre DT-2 a zvlášť pre Trimble C5.',
    ],
    expect: ['i_p = Σ i / n, kde n = 15', 'príklad: i = +5, +4, +6 cc → i_p = 15 / 3 = +5cc'],
    tip: 'Rozklad: i_p = priemerná indexová chyba, Σ i = súčet všetkých čiastkových i, n = ich počet. Hodnoty i by mali byť podobné. Ak jedna veľmi trčí, je to asi chyba v cielení alebo zápise.',
  },
  {
    title: 'Elaborát',
    todo: [
      'Technická správa: začni „Cieľom úlohy je…“, potom prístroje (DT-2, Trimble C5), miesto a dátum merania, metóda (3 skupiny v 2 polohách).',
      'V správe vzorce 2i = 400 − (Z_I + Z_II), Z′ = Z + i, ε = 100 − z, i_p = Σi / n a výsledky i_p pre oba prístroje.',
      'Prílohy: vypočítané zápisníky (pre každý prístroj) s čiastkovými indexovými chybami.',
    ],
    tip: 'Keď mi pošleš fotky zápisníkov, spravím ti výpočty aj elaborát. V AIS ho odovzdám až po tvojom „odovzdaj“.',
  },
];
