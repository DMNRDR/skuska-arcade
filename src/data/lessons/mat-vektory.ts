import type { Step } from '../steps';

// Matematika 1, prednáška 1: Vektory v 3D, operácie, skalárny, vektorový a zmiešaný súčin, aplikácie.

const steps: Step[] = [
  {
    title: 'Čo je vektor a načo je dobrý',
    text: 'Doteraz si väčšinou počítal s obyčajnými číslami, napríklad teplota 20 °C alebo dĺžka 5 m. Takému číslu hovoríme skalár: stačí jedno číslo a je jasné, o čo ide. Niektoré veci však jedno číslo neopíše. Keď ti niekto povie „posuň sa o 5 metrov“, hneď sa spýtaš: „A kam?“\n\nVektor je veličina, ktorá má veľkosť aj smer. Predstav si ho ako šípku: dĺžka šípky je veľkosť a hrot ukazuje smer. V geodézii je vektorom napríklad posun z jedného meraného bodu do druhého, vo fyzike sila alebo rýchlosť. Tú istú šípku môžeš posunúť kamkoľvek (bez otáčania) a je to stále ten istý vektor.\n\nV priestore (3D) zapíšeme vektor tromi číslami v okrúhlych zátvorkách: u = (u₁, u₂, u₃). Tieto čísla sa volajú zložky (súradnice) vektora a hovoria, o koľko sa šípka posunie v smere osi x, y a z. Bod naopak zapisujeme v hranatých zátvorkách, napr. A = [1, 2, 3]. Bod je miesto, vektor je posun.\n\nDva špeciálne vektory: nulový vektor o = (0, 0, 0) nemá žiadnu dĺžku ani smer. Opačný vektor −u = (−u₁, −u₂, −u₃) má rovnakú dĺžku ako u, ale ukazuje presne naopak.',
    analogy: 'Vektor je ako pokyn v navigácii: „choď 3 bloky na východ, 1 blok na sever a vyjdi 2 poschodia hore“. To je vektor (3, 1, 2). Nezáleží, odkiaľ vyrážaš, pokyn (posun) je stále rovnaký.',
    check: {
      q: 'Ktorá z týchto veličín je vektor (má veľkosť aj smer)?',
      options: ['Posun o 3 m na sever', 'Hmotnosť 70 kg', 'Teplota 20 °C', 'Čas 5 s'],
      explain: 'Hmotnosť, teplota aj čas sú skaláre: stačí jedno číslo. Posun „o 3 m na sever“ má veľkosť (3 m) aj smer (sever), preto je to vektor.',
    },
  },
  {
    title: 'Vektor z dvoch bodov',
    text: 'Na skúške často dostaneš body, nie vektory. Vektor medzi dvoma bodmi vypočítaš jednoducho: od súradníc koncového bodu odčítaš súradnice začiatočného bodu. Skrátene „koniec mínus začiatok“.\n\nVektor z bodu A do bodu B zapisujeme AB (v zošite so šípkou nad písmenami). Ak by si počítal A − B, dostaneš opačný vektor BA, ktorý ukazuje z B do A. Je to najčastejšia chyba, preto si vždy povedz: „kam idem, mínus odkiaľ idem“.',
    analogy: 'Je to ako zmena teploty: ráno bolo 5 °C, poobede 12 °C. Zmena je 12 − 5 = 7 °C, teda „neskôr mínus skôr“, „koniec mínus začiatok“.',
    formula: {
      f: 'AB = B − A = (b₁ − a₁, b₂ − a₂, b₃ − a₃)',
      what: 'Vektor z bodu A do bodu B',
      vars: [
        ['A = [a₁, a₂, a₃]', 'začiatočný bod (odkiaľ ideš)'],
        ['B = [b₁, b₂, b₃]', 'koncový bod (kam ideš)'],
        ['AB', 'vektor posunu z A do B; opačný je BA = −AB'],
      ],
    },
    worked: {
      q: 'Dané sú body A = [1, 2, 3] a B = [4, 0, 5]. Urči vektory AB a BA.',
      steps: [
        'Vieme: A = [1, 2, 3] je začiatok, B = [4, 0, 5] je koniec.',
        'Hľadáme: vektor AB (z A do B) a vektor BA (z B do A).',
        'Použijeme „koniec mínus začiatok“: AB = B − A, lebo ideme z A do B.',
        'Po zložkách: AB = (4 − 1, 0 − 2, 5 − 3) = (3, −2, 2).',
        'Naopak: BA = A − B = (1 − 4, 2 − 0, 3 − 5) = (−3, 2, −2).',
        'Kontrola: BA má presne opačné znamienka ako AB, teda BA = −AB. Sedí.',
      ],
      result: 'AB = (3, −2, 2), BA = (−3, 2, −2).',
    },
  },
  {
    title: 'Dĺžka vektora a jednotkový vektor',
    text: 'Dĺžka (veľkosť) vektora u sa značí |u|. Vypočítaš ju Pytagorovou vetou: zložky umocníš na druhú, sčítaš a odmocníš. Dĺžka je vždy kladné číslo (alebo 0 pri nulovom vektore), nikdy nie záporná.\n\nVďaka tomu vieš vypočítať aj vzdialenosť dvoch bodov: je to dĺžka vektora AB. Pre AB = (3, −2, 2) z predošlého kroku je |AB| = √(9 + 4 + 4) = √17 ≈ 4,12. V geodézii presne takto dostaneš šikmú dĺžku medzi dvoma bodmi so známymi súradnicami.\n\nJednotkový vektor má dĺžku presne 1. Z ľubovoľného nenulového vektora ho vyrobíš tak, že každú zložku vydelíš jeho dĺžkou. Smer zostane, iba šípku „skrátiš“ alebo „natiahneš“ na dĺžku 1.',
    formula: {
      f: '|u| = √(u₁² + u₂² + u₃²)     u⁰ = u / |u| = (u₁/|u|, u₂/|u|, u₃/|u|)',
      what: 'Dĺžka vektora a jednotkový vektor',
      vars: [
        ['|u|', 'dĺžka vektora u (v tých istých jednotkách ako súradnice, napr. m)'],
        ['u₁², u₂², u₃²', 'druhé mocniny zložiek, vždy ≥ 0, aj (−2)² = 4'],
        ['u⁰', 'jednotkový vektor v smere u, |u⁰| = 1'],
      ],
    },
    deeper: 'Prečo Pytagorova veta? Vezmi vektor u = (u₁, u₂, u₃). Najprv sa pozri iba na „podlahu“ (rovinu xy). Tam je šípka (u₁, u₂) a jej dĺžka je prepona pravouhlého trojuholníka s odvesnami u₁ a u₂, teda √(u₁² + u₂²).\n\nTeraz zober túto „podlahovú“ dĺžku ako jednu odvesnu a výšku u₃ ako druhú odvesnu. Opäť je tam pravý uhol, opäť platí Pytagoras: |u|² = (u₁² + u₂²) + u₃². Preto |u| = √(u₁² + u₂² + u₃²).',
    worked: {
      q: 'Vypočítaj dĺžku vektora u = (2, 3, 6) a nájdi jednotkový vektor v jeho smere.',
      steps: [
        'Vieme: u₁ = 2, u₂ = 3, u₃ = 6.',
        'Hľadáme: dĺžku |u| a jednotkový vektor u⁰.',
        'Použijeme |u| = √(u₁² + u₂² + u₃²), lebo dĺžka je Pytagorova veta v 3D.',
        'Dosadíme: |u| = √(2² + 3² + 6²) = √(4 + 9 + 36) = √49 = 7.',
        'Jednotkový vektor: u⁰ = u / 7 = (2/7, 3/7, 6/7).',
        'Kontrola: |u⁰|² = (4 + 9 + 36)/49 = 49/49 = 1. Dĺžka je naozaj 1.',
      ],
      result: '|u| = 7, u⁰ = (2/7, 3/7, 6/7).',
    },
    check: {
      q: 'Aká je dĺžka vektora (1, −2, 2)?',
      options: ['3', '9', '1', '√5'],
      explain: '√(1² + (−2)² + 2²) = √(1 + 4 + 4) = √9 = 3. Pozor: (−2)² = +4, mínus po umocnení zmizne. Číslo 9 je |u|², ešte ho treba odmocniť.',
    },
  },
  {
    title: 'Sčítanie vektorov a násobok číslom',
    text: 'Vektory sčítavaš po zložkách: prvú s prvou, druhú s druhou, tretiu s treťou. Na obrázku vidíš, čo to znamená: šípky priložíš za seba, najprv u a na jej koniec v. Súčet u + v je šípka od začiatku prvej po koniec druhej, tu (3, 1) + (1, 2) = (4, 3). Rozdiel u − v je to isté ako u + (−v).\n\nSkalárny násobok k·u znamená, že každú zložku vynásobíš číslom k (skalárom). Pri k = 2 je šípka dvakrát dlhšia v tom istom smere, pri k = ½ polovičná. Ak je k záporné, šípka sa otočí na opačnú stranu. Pri k = 0 dostaneš nulový vektor.\n\nDva nenulové vektory, z ktorých jeden je násobkom druhého, sú rovnobežné (kolineárne). Ležia na jednej priamke, iba môžu byť rôzne dlhé alebo opačne otočené. To využiješ pri vzájomnej polohe priamok.',
    fig: 'vecadd',
    analogy: 'Násobok je ako krok: k = 2 znamená dva rovnaké kroky za sebou, k = −1 ten istý krok, ale dozadu.',
    formula: {
      f: 'u + v = (u₁ + v₁, u₂ + v₂, u₃ + v₃)     k·u = (k·u₁, k·u₂, k·u₃)',
      what: 'Súčet vektorov a násobok vektora číslom',
      vars: [
        ['u + v', 'súčet, výsledok je opäť vektor'],
        ['k', 'skalár, teda obyčajné reálne číslo'],
        ['|k·u|', '= |k|·|u|, dĺžka sa zmení |k|-krát'],
      ],
    },
    worked: {
      q: 'u = (1, −2, 3), v = (2, 0, −1). Vypočítaj 2u − 3v.',
      steps: [
        'Vieme: u = (1, −2, 3), v = (2, 0, −1).',
        'Hľadáme: vektor 2u − 3v.',
        'Postup: najprv násobky (každú zložku krát číslo), potom odčítanie po zložkách.',
        '2u = (2, −4, 6), 3v = (6, 0, −3).',
        '2u − 3v = (2 − 6, −4 − 0, 6 − (−3)) = (−4, −4, 9).',
        'Kontrola znamienok: 6 − (−3) = 6 + 3 = 9. Mínus pred zápornou zložkou sa zmení na plus, tu sa robí najviac chýb.',
      ],
      result: '2u − 3v = (−4, −4, 9).',
    },
  },
  {
    title: 'Lineárna kombinácia a závislosť',
    text: 'Lineárna kombinácia vektorov u a v je každý vektor, ktorý dostaneš ako a·u + b·v, kde a, b sú ľubovoľné čísla. Inými slovami: vektory natiahneš (vynásobíš číslom) a sčítaš. Z dvoch nerovnobežných vektorov takto „poskladáš“ každý vektor v ich rovine.\n\nNa skúške sa často pýtajú: „Je vektor w lineárnou kombináciou vektorov u a v?“ Napíšeš w = a·u + b·v po zložkách a dostaneš tri rovnice s dvoma neznámymi a, b. Z dvoch rovníc vypočítaš a, b a tretiu použiješ ako kontrolu. Ak sedí, odpoveď je áno, ak nie, odpoveď je nie.\n\nVektory sú lineárne závislé, ak sa jeden z nich dá vyjadriť ako lineárna kombinácia ostatných. Dva vektory sú závislé, keď sú rovnobežné. Tri vektory v 3D sú závislé, keď ležia v jednej rovine (sú komplanárne). Inak sú lineárne nezávislé.',
    formula: {
      f: 'w = a·u + b·v',
      what: 'Lineárna kombinácia vektorov u a v',
      vars: [
        ['a, b', 'koeficienty, ľubovoľné reálne čísla'],
        ['závislé', 'aspoň jeden vektor je kombináciou ostatných'],
        ['nezávislé', 'žiadny sa nedá vyskladať z ostatných'],
      ],
    },
    worked: {
      q: 'Je w = (4, 3, 5) lineárnou kombináciou vektorov u = (1, 2, 1) a v = (2, −1, 3)?',
      steps: [
        'Vieme: u = (1, 2, 1), v = (2, −1, 3), w = (4, 3, 5).',
        'Hľadáme: čísla a, b, pre ktoré w = a·u + b·v (ak existujú).',
        'Po zložkách: x: a + 2b = 4, y: 2a − b = 3, z: a + 3b = 5.',
        'Z 1. rovnice a = 4 − 2b. Dosadíme do 2.: 2(4 − 2b) − b = 3 → 8 − 5b = 3 → b = 1, potom a = 4 − 2 = 2.',
        'Kontrola v 3. rovnici: a + 3b = 2 + 3 = 5. Sedí!',
        'Overíme celý vektor: 2·(1, 2, 1) + 1·(2, −1, 3) = (2 + 2, 4 − 1, 2 + 3) = (4, 3, 5) = w.',
      ],
      result: 'Áno, w = 2u + v.',
    },
    check: {
      q: 'Sú vektory u = (2, −4, 6) a v = (−1, 2, −3) rovnobežné?',
      options: ['Áno, u = −2·v', 'Nie, majú rôzne znamienka', 'Nie, majú rôznu dĺžku', 'Áno, lebo u·v = 0'],
      explain: '−2·v = (2, −4, 6) = u. Jeden je násobkom druhého, takže sú rovnobežné, len opačne otočené. Rôzna dĺžka ani opačný smer rovnobežnosti nevadia.',
    },
  },
  {
    title: 'Skalárny súčin',
    text: 'Skalárny súčin dvoch vektorov u·v je ČÍSLO (skalár, odtiaľ názov). Vypočítaš ho tak, že vynásobíš zodpovedajúce zložky a výsledky sčítaš. Je to hlavný nástroj na kolmosť a uhly.\n\nZnamienko skalárneho súčinu ti hneď prezradí uhol medzi vektormi. Kladný súčin znamená ostrý uhol (menej ako 90°), nulový znamená pravý uhol (vektory sú kolmé) a záporný znamená tupý uhol (viac ako 90°). Na obrázku si prepni ostrý uhol, kolmé a tupý uhol a sleduj, ako sa mení u·v.\n\nUžitočné vlastnosti: u·v = v·u (poradie nezáleží) a u·u = |u|². Skalárny súčin vektora so sebou samým je teda druhá mocnina jeho dĺžky.',
    fig: 'mat:vektory',
    analogy: 'Keď ťaháš sánky za lano šikmo nahor, iba časť sily ide „dopredu“. Skalárny súčin meria práve to, koľko jeden vektor „ťahá“ v smere druhého. Vo fyzike je práca W = F·s presne skalárny súčin sily a posunu.',
    formula: {
      f: 'u·v = u₁v₁ + u₂v₂ + u₃v₃     u·v = |u|·|v|·cos φ',
      what: 'Skalárny súčin (dva spôsoby, ako ho vyjadriť)',
      vars: [
        ['u·v', 'skalárny súčin, výsledok je číslo, nie vektor'],
        ['φ', 'uhol medzi vektormi, 0° ≤ φ ≤ 180°'],
        ['> 0 / = 0 / < 0', 'ostrý uhol / kolmé vektory / tupý uhol'],
      ],
    },
    deeper: 'Prečo platia oba vzorce naraz? Predstav si trojuholník so stranami u, v a u − v. Kosínusová veta hovorí: |u − v|² = |u|² + |v|² − 2·|u|·|v|·cos φ.\n\nTo isté rozpíš po zložkách: |u − v|² = (u₁ − v₁)² + (u₂ − v₂)² + (u₃ − v₃)² = |u|² + |v|² − 2·(u₁v₁ + u₂v₂ + u₃v₃).\n\nPorovnaj obe rovnosti: |u|² a |v|² sú v oboch, takže musí platiť u₁v₁ + u₂v₂ + u₃v₃ = |u|·|v|·cos φ. Súčet súčinov zložiek je naozaj spojený s uhlom.',
    worked: {
      q: 'Vypočítaj skalárny súčin vektorov u = (1, 2, 3) a v = (4, −1, 0). Aký uhol zvierajú (ostrý, pravý, tupý)?',
      steps: [
        'Vieme: u = (1, 2, 3), v = (4, −1, 0).',
        'Hľadáme: číslo u·v a typ uhla.',
        'Použijeme u·v = u₁v₁ + u₂v₂ + u₃v₃, lebo poznáme zložky.',
        'u·v = 1·4 + 2·(−1) + 3·0 = 4 − 2 + 0 = 2.',
        'Súčin je kladný (2 > 0), takže cos φ > 0 a uhol je ostrý.',
      ],
      result: 'u·v = 2, vektory zvierajú ostrý uhol (nie sú kolmé).',
    },
    check: {
      q: 'Skalárny súčin dvoch nenulových vektorov vyšiel −3. Aký uhol zvierajú?',
      options: ['Tupý (viac ako 90°)', 'Ostrý (menej ako 90°)', 'Pravý (90°)', 'Nedá sa povedať'],
      explain: 'u·v = |u|·|v|·cos φ. Dĺžky sú kladné, takže znamienko určuje cos φ. Záporný kosínus je pri uhloch medzi 90° a 180°, teda pri tupom uhle.',
    },
  },
  {
    title: 'Uhol dvoch vektorov',
    text: 'Zo vzťahu u·v = |u|·|v|·cos φ vyjadríš kosínus uhla: skalárny súčin vydelíš súčinom dĺžok. Potom na kalkulačke stlačíš cos⁻¹ (arccos) a máš uhol.\n\nPostup má vždy tri kroky: 1. skalárny súčin, 2. dĺžky oboch vektorov, 3. dosadiť do vzorca a vypočítať arccos. Výsledok je vždy medzi 0° a 180°.\n\nPozor na kalkulačku: musí byť prepnutá v stupňoch (DEG), ak chceš uhol v stupňoch. V režime RAD dostaneš radiány (napr. 1,047 namiesto 60°). Ak ti vyjde cos φ mimo intervalu ⟨−1, 1⟩, niekde máš chybu vo výpočte.',
    formula: {
      f: 'cos φ = u·v / (|u|·|v|)',
      what: 'Uhol dvoch nenulových vektorov',
      vars: [
        ['u·v', 'skalárny súčin (čitateľ, môže byť záporný)'],
        ['|u|·|v|', 'súčin dĺžok (menovateľ, vždy kladný)'],
        ['φ', 'uhol v stupňoch (kalkulačka v režime DEG), od 0° do 180°'],
      ],
    },
    worked: {
      q: 'Aký uhol zvierajú vektory u = (1, 1, 0) a v = (1, 0, 1)?',
      steps: [
        'Vieme: u = (1, 1, 0), v = (1, 0, 1).',
        'Hľadáme: uhol φ.',
        'Použijeme cos φ = u·v / (|u|·|v|), lebo poznáme zložky oboch vektorov.',
        'Skalárny súčin: u·v = 1·1 + 1·0 + 0·1 = 1.',
        'Dĺžky: |u| = √(1 + 1 + 0) = √2, |v| = √(1 + 0 + 1) = √2.',
        'cos φ = 1 / (√2·√2) = 1/2 = 0,5.',
        'φ = arccos 0,5 = 60°. Kontrola: cos φ je kladný, uhol je ostrý. Sedí.',
      ],
      result: 'φ = 60°.',
    },
  },
  {
    title: 'Kolmosť vektorov',
    text: 'Dva nenulové vektory sú na seba kolmé práve vtedy, keď je ich skalárny súčin nula. Je to preto, že cos 90° = 0. Táto jednoduchá veta sa v analytickej geometrii používa stále dokola.\n\nTypická úloha: vo vektore je neznámy parameter (napr. p) a máš ho určiť tak, aby boli vektory kolmé. Napíšeš skalárny súčin, položíš ho rovný nule a vyriešiš rovnicu pre p.\n\nKolmosť budeš potrebovať všade: pri normálovom vektore roviny, pri vzdialenostiach aj pri kontrole vektorového súčinu.',
    formula: {
      f: 'u ⊥ v  ⇔  u·v = 0',
      what: 'Podmienka kolmosti dvoch nenulových vektorov',
      vars: [
        ['⊥', 'je kolmý na'],
        ['⇔', 'platí práve vtedy, keď (v oboch smeroch)'],
      ],
    },
    worked: {
      q: 'Urči číslo p tak, aby vektory u = (2, p, 1) a v = (3, −1, 4) boli na seba kolmé.',
      steps: [
        'Vieme: u = (2, p, 1), v = (3, −1, 4).',
        'Hľadáme: p, pre ktoré u ⊥ v.',
        'Použijeme podmienku u·v = 0, lebo kolmé vektory majú nulový skalárny súčin.',
        'u·v = 2·3 + p·(−1) + 1·4 = 6 − p + 4 = 10 − p.',
        '10 − p = 0 → p = 10.',
        'Kontrola: (2, 10, 1)·(3, −1, 4) = 6 − 10 + 4 = 0. Sedí.',
      ],
      result: 'p = 10.',
    },
    check: {
      q: 'Sú vektory (1, 2, 2) a (2, −2, 1) na seba kolmé?',
      options: ['Áno, ich skalárny súčin je 0', 'Nie, ich skalárny súčin je 9', 'Nie, majú rôzne zložky', 'Áno, lebo majú rovnakú dĺžku'],
      explain: '1·2 + 2·(−2) + 2·1 = 2 − 4 + 2 = 0, preto sú kolmé. To, že oba majú dĺžku 3, s kolmosťou nesúvisí.',
    },
  },
  {
    title: 'Vektorový súčin',
    text: 'Vektorový súčin u × v je VEKTOR (nie číslo!), ktorý je kolmý na u aj na v naraz. Na obrázku zelená šípka u × v trčí kolmo z roviny, v ktorej ležia u a v. Vektorový súčin existuje iba v 3D.\n\nSmer určí pravidlo pravej ruky: prsty pravej ruky zahneš od u k v a palec ukáže smer u × v. Preto záleží na poradí: v × u = −(u × v), šípka ukazuje presne opačne.\n\nVýpočet si zapamätáš takto: napíš u a v pod seba. Pre 1. zložku zakry 1. stĺpec a zo zvyšných štyroch čísel vypočítaj „krížik“ (ako determinant 2×2). Pre 2. zložku zakry 2. stĺpec, ale výsledok vezmi s opačným znamienkom. Pre 3. zložku zakry 3. stĺpec.\n\nAk sú u a v rovnobežné, u × v = o (nulový vektor). Pre jednotkové vektory osí platí i × j = k, j × k = i, k × i = j.',
    fig: 'cross3d',
    analogy: 'Pravidlo pravej ruky funguje ako skrutka alebo vývrtka: keď ňou otáčaš od u k v, skrutka sa posúva v smere u × v. Keď otáčaš opačne (od v k u), ide opačným smerom.',
    formula: {
      f: 'u × v = (u₂v₃ − u₃v₂,  u₃v₁ − u₁v₃,  u₁v₂ − u₂v₁)     |u × v| = |u|·|v|·sin φ',
      what: 'Vektorový súčin',
      vars: [
        ['1. zložka', 'zakry 1. stĺpec: u₂v₃ − u₃v₂'],
        ['2. zložka', 'zakry 2. stĺpec a otoč znamienko: u₃v₁ − u₁v₃'],
        ['3. zložka', 'zakry 3. stĺpec: u₁v₂ − u₂v₁'],
        ['v × u', '= −(u × v), poradie mení smer'],
      ],
    },
    deeper: 'Prečo je u × v kolmý na u? Stačí overiť, že skalárny súčin je nula: u·(u × v) = u₁(u₂v₃ − u₃v₂) + u₂(u₃v₁ − u₁v₃) + u₃(u₁v₂ − u₂v₁). Keď to roznásobíš, každý člen sa objaví raz s plusom a raz s mínusom (napr. u₁u₂v₃ a −u₂u₁v₃), všetko sa vyruší a vyjde 0. Rovnako pre v.\n\nZápis cez determinant: u × v sa dá zapísať ako „determinant“ s riadkami (i, j, k), (u₁, u₂, u₃), (v₁, v₂, v₃). Rozvojom podľa prvého riadku dostaneš presne vzorec vyššie, aj s mínusom pri strednej zložke (znamienka + − +).',
    worked: {
      q: 'Vypočítaj u × v pre u = (1, 2, 3), v = (4, 5, 6) a over, že je kolmý na oba vektory.',
      steps: [
        'Vieme: u = (1, 2, 3), v = (4, 5, 6).',
        'Hľadáme: vektor u × v.',
        'Použijeme vzorec vektorového súčinu (zakrývanie stĺpcov).',
        '1. zložka (zakry 1. stĺpec): 2·6 − 3·5 = 12 − 15 = −3.',
        '2. zložka (zakry 2. stĺpec, opačné znamienko): 3·4 − 1·6 = 12 − 6 = 6.',
        '3. zložka (zakry 3. stĺpec): 1·5 − 2·4 = 5 − 8 = −3.',
        'Kontrola kolmosti: (−3, 6, −3)·(1, 2, 3) = −3 + 12 − 9 = 0 a (−3, 6, −3)·(4, 5, 6) = −12 + 30 − 18 = 0. Sedí.',
      ],
      result: 'u × v = (−3, 6, −3).',
    },
    check: {
      q: 'Platí u × v = (2, −1, 5). Čomu sa rovná v × u?',
      options: ['(−2, 1, −5)', '(2, −1, 5)', '(5, −1, 2)', 'nulovému vektoru'],
      explain: 'Vektorový súčin je antikomutatívny: v × u = −(u × v). Všetky zložky otočia znamienko.',
    },
  },
  {
    title: 'Aplikácia: obsah rovnobežníka a trojuholníka',
    text: 'Dĺžka vektorového súčinu |u × v| sa rovná obsahu rovnobežníka, ktorý vektory u a v napínajú (žltý rovnobežník na obrázku). Trojuholník je presne polovica rovnobežníka, preto jeho obsah je ½·|u × v|.\n\nAk máš trojuholník ABC zadaný vrcholmi, vypočítaš dva vektory z toho istého vrcholu, napr. AB a AC. Potom ich vektorový súčin, jeho dĺžku a vydelíš dvoma. Nezáleží, ktorý vrchol si vyberieš, vyjde to isté.\n\nNa obrázku si prepni aj „rovnobežné“: rovnobežník sa sploští a obsah je 0. To zodpovedá tomu, že vektorový súčin rovnobežných vektorov je nulový vektor.',
    fig: 'mat:vektory',
    formula: {
      f: 'S = |u × v|  (rovnobežník)     S = ½·|AB × AC|  (trojuholník ABC)',
      what: 'Obsahy pomocou vektorového súčinu',
      vars: [
        ['|u × v|', 'dĺžka vektorového súčinu (v m², ak sú súradnice v m)'],
        ['AB, AC', 'vektory dvoch strán z toho istého vrcholu A'],
        ['½', 'trojuholník je polovica rovnobežníka'],
      ],
    },
    deeper: 'Prečo |u × v| = obsah? Obsah rovnobežníka je základňa krát výška. Základňa je |u|. Výška je kolmá vzdialenosť konca vektora v od priamky s vektorom u, teda |v|·sin φ (pravouhlý trojuholník, v je prepona).\n\nObsah = |u|·|v|·sin φ, a to je presne dĺžka vektorového súčinu. Pri rovnobežných vektoroch je φ = 0°, sin 0° = 0 a obsah je nulový.',
    worked: {
      q: 'Vypočítaj obsah trojuholníka s vrcholmi A = [1, 0, 0], B = [0, 2, 0], C = [0, 0, 3].',
      steps: [
        'Vieme: tri vrcholy A, B, C.',
        'Hľadáme: obsah S trojuholníka ABC.',
        'Použijeme S = ½·|AB × AC|, lebo trojuholník je polovica rovnobežníka napnutého vektormi AB a AC.',
        'AB = B − A = (−1, 2, 0), AC = C − A = (−1, 0, 3).',
        'AB × AC = (2·3 − 0·0, 0·(−1) − (−1)·3, (−1)·0 − 2·(−1)) = (6, 3, 2).',
        '|AB × AC| = √(36 + 9 + 4) = √49 = 7.',
        'S = ½·7 = 3,5.',
      ],
      result: 'S = 3,5 (štvorcových jednotiek).',
    },
  },
  {
    title: 'Zmiešaný súčin',
    text: 'Zmiešaný súčin troch vektorov [u, v, w] je ČÍSLO. Najprv vypočítaš vektorový súčin u × v a potom ho skalárne vynásobíš s w. Odtiaľ názov „zmiešaný“: kombinuje oba súčiny.\n\nRýchlejšia cesta: zmiešaný súčin sa rovná determinantu 3×3, ktorého riadky sú u, v, w. Determinant 3×3 sa naučíš počítať Sarrusovým pravidlom v téme Determinanty, takže si môžeš vybrať spôsob, ktorý ti viac sedí.\n\nZmiešaný súčin môže byť kladný aj záporný. Znamienko hovorí, či je trojica vektorov „pravotočivá“ alebo „ľavotočivá“. Pre objem nás zaujíma iba absolútna hodnota.',
    formula: {
      f: '[u, v, w] = (u × v)·w = det [[u₁, u₂, u₃], [v₁, v₂, v₃], [w₁, w₂, w₃]]',
      what: 'Zmiešaný súčin',
      vars: [
        ['(u × v)·w', 'najprv vektorový súčin, potom skalárny'],
        ['det […]', 'determinant matice, ktorej riadky sú u, v, w (zápis po riadkoch)'],
        ['výsledok', 'číslo: kladné, záporné alebo 0'],
      ],
    },
    worked: {
      q: 'Vypočítaj zmiešaný súčin vektorov u = (1, 2, 0), v = (0, 1, 3), w = (2, 0, 1).',
      steps: [
        'Vieme: u = (1, 2, 0), v = (0, 1, 3), w = (2, 0, 1).',
        'Hľadáme: číslo [u, v, w].',
        'Použijeme [u, v, w] = (u × v)·w: najprv vektorový súčin, potom skalárny.',
        'u × v = (2·3 − 0·1, 0·0 − 1·3, 1·1 − 2·0) = (6, −3, 1).',
        '(u × v)·w = 6·2 + (−3)·0 + 1·1 = 12 + 0 + 1 = 13.',
        'Kontrola determinantom (Sarrus): 1·1·1 + 2·3·2 + 0·0·0 − 0·1·2 − 1·3·0 − 2·0·1 = 1 + 12 = 13. Sedí.',
      ],
      result: '[u, v, w] = 13.',
    },
  },
  {
    title: 'Aplikácia: objem a komplanárnosť',
    text: 'Absolútna hodnota zmiešaného súčinu je objem rovnobežnostena (šikmého „kvádra“), ktorý vektory u, v, w napínajú, ako na obrázku. Štvorsten (trojboký ihlan) s tými istými tromi hranami z jedného vrcholu má objem šesťkrát menší, teda ⅙·|[u, v, w]|.\n\nAk je štvorsten zadaný vrcholmi A, B, C, D, vypočítaš tri vektory z jedného vrcholu: AB, AC, AD. Ich zmiešaný súčin v absolútnej hodnote vydelíš šiestimi.\n\nAk vyjde zmiešaný súčin 0, „kváder“ je úplne sploštený a všetky tri vektory ležia v jednej rovine. Hovoríme, že sú komplanárne (lineárne závislé). Štyri body A, B, C, D ležia v jednej rovine práve vtedy, keď [AB, AC, AD] = 0.',
    fig: 'box',
    analogy: 'Rovnobežnosten si predstav ako balíček kariet, ktorý zošikmíš: tvar sa zmení, ale objem (počet kariet) nie. Objem = obsah podstavy × výška, a presne to zmiešaný súčin počíta.',
    formula: {
      f: 'V = |[u, v, w]|  (rovnobežnosten)     V = ⅙·|[AB, AC, AD]|  (štvorsten ABCD)',
      what: 'Objemy pomocou zmiešaného súčinu',
      vars: [
        ['| |', 'absolútna hodnota, objem je vždy kladný (v m³, ak sú súradnice v m)'],
        ['⅙', 'štvorsten má šestinu objemu rovnobežnostena'],
        ['[u, v, w] = 0', 'vektory sú komplanárne (ležia v jednej rovine)'],
      ],
    },
    deeper: 'Prečo zmiešaný súčin = objem? Objem rovnobežnostena je obsah podstavy × výška. Podstava je rovnobežník z u a v, jeho obsah je |u × v|. Vektor u × v je kolmý na podstavu.\n\nVýška je to, koľko vektor w „vytŕča“ kolmo nad podstavu, teda |w|·|cos α|, kde α je uhol medzi w a u × v. Spolu: |u × v|·|w|·|cos α| = |(u × v)·w|.\n\nPrečo ⅙ pri štvorstene? Štvorsten je ihlan, jeho objem je ⅓·podstava·výška. Jeho podstava je trojuholník, teda polovica rovnobežníka, a výška je rovnaká. ⅓·½ = ⅙.',
    worked: {
      q: 'Vypočítaj objem štvorstena ABCD: A = [1, 1, 1], B = [2, 3, 1], C = [1, 2, 4], D = [3, 1, 2].',
      steps: [
        'Vieme: štyri vrcholy štvorstena.',
        'Hľadáme: objem V.',
        'Použijeme V = ⅙·|[AB, AC, AD]|, lebo štvorsten je šestina rovnobežnostena z hrán AB, AC, AD.',
        'Vektory z vrcholu A: AB = (1, 2, 0), AC = (0, 1, 3), AD = (2, 0, 1).',
        'Sú to presne vektory z predošlého príkladu, takže [AB, AC, AD] = 13.',
        'V = ⅙·|13| = 13/6 ≈ 2,17.',
      ],
      result: 'V = 13/6 ≈ 2,17 (kubických jednotiek).',
    },
    check: {
      q: 'Pre vektory u = (1, 2, 3), v = (4, 5, 6), w = (7, 8, 9) vyšlo [u, v, w] = 0. Čo to znamená?',
      options: ['Ležia v jednej rovine (sú komplanárne)', 'Sú navzájom kolmé', 'Všetky majú nulovú dĺžku', 'Rovnobežnosten má objem 1'],
      explain: 'Nulový objem znamená, že rovnobežnosten je sploštený do roviny. Naozaj, w = 2v − u = (8 − 1, 10 − 2, 12 − 3) = (7, 8, 9), takže w je lineárnou kombináciou u a v.',
    },
  },
  {
    title: 'Zhrnutie',
    text: 'Zopakuj si, čo z ktorého súčinu vyjde a na čo ho použiješ. Na skúške väčšinou stačí rozpoznať, či má byť výsledok číslo alebo vektor, a vybrať správny vzorec.\n\nNajčastejšie chyby: A − B namiesto B − A, zabudnuté mínus pri strednej zložke vektorového súčinu, chýbajúca odmocnina pri dĺžke, kalkulačka v radiánoch namiesto stupňov a zabudnutá ½ alebo ⅙ pri trojuholníku a štvorstene.',
    bullets: [
      'Vektor z bodov: AB = B − A („koniec mínus začiatok“).',
      'Dĺžka: |u| = √(u₁² + u₂² + u₃²); jednotkový vektor u⁰ = u / |u|.',
      'Súčet a násobok po zložkách; rovnobežné vektory: u = k·v.',
      'Lineárna kombinácia w = a·u + b·v: rieš sústavu, tretia rovnica je kontrola.',
      'Skalárny súčin u·v = u₁v₁ + u₂v₂ + u₃v₃ je ČÍSLO; u·v = 0 ⇔ kolmé.',
      'Uhol: cos φ = u·v / (|u|·|v|), kalkulačka v DEG.',
      'Vektorový súčin u × v je VEKTOR kolmý na u aj v; v × u = −(u × v).',
      'Obsah rovnobežníka |u × v|, trojuholníka ½·|AB × AC|.',
      'Zmiešaný súčin [u, v, w] = (u × v)·w = determinant, je ČÍSLO.',
      'Objem rovnobežnostena |[u, v, w]|, štvorstena ⅙·|[AB, AC, AD]|; 0 ⇔ komplanárne.',
    ],
  },
];

export default steps;
