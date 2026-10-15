import type { Step } from '../steps';

// Matematika 1, prednáška 5 (doc. Minarechová, 4. týždeň): Vlastné čísla a vlastné vektory matíc.
// Zdroj: ZS_2026-27/Matematika_1/Prednasky/4 týždeň/Prednaska_5.pdf (príklady 1 až 3 sú z prednášky).

const steps: Step[] = [
  {
    title: 'Čo robí matica s vektorom',
    text: 'Najprv si pripomeň, čo znamená vynásobiť maticu vektorom. Vektor x = (x₁, x₂) si napíšeš ako stĺpec. Prvá zložka výsledku je 1. riadok matice „krát“ vektor: a₁₁·x₁ + a₁₂·x₂. Druhá zložka je 2. riadok krát vektor: a₂₁·x₁ + a₂₂·x₂. Z vektora teda vznikne nový vektor.\n\nMaticu si preto môžeš predstaviť ako stroj, ktorý vektory premieňa: niektoré natiahne, iné skráti, väčšinu z nich aj otočí. Vezmi maticu A = [[1, 2], [4, 3]] (1. riadok 1, 2; 2. riadok 4, 3) a vektor x = (1, 0), ktorý mieri doprava. Výsledok A·x = (1, 4) mieri strmo hore. Matica vektor otočila.\n\nCelá dnešná prednáška je o výnimkách: o vektoroch, ktoré matica NEotočí.',
    formula: {
      f: 'A·x = (a₁₁·x₁ + a₁₂·x₂ ,  a₂₁·x₁ + a₂₂·x₂)',
      what: 'Súčin matice 2×2 a vektora',
      vars: [
        ['A', 'štvorcová matica 2×2, prvky aᵢⱼ (i = riadok, j = stĺpec)'],
        ['x = (x₁, x₂)', 'vektor, ktorý do matice „vkladáš“ (píše sa ako stĺpec)'],
        ['a₁₁·x₁ + a₁₂·x₂', '1. zložka výsledku: 1. riadok krát vektor'],
        ['a₂₁·x₁ + a₂₂·x₂', '2. zložka výsledku: 2. riadok krát vektor'],
      ],
    },
    worked: {
      q: 'A = [[1, 2], [4, 3]]. Vypočítaj A·(1, 0) a A·(1, 1). Ostal smer niektorého vektora rovnaký?',
      steps: [
        'A·(1, 0): 1. zložka 1·1 + 2·0 = 1, 2. zložka 4·1 + 3·0 = 4. Výsledok (1, 4).',
        'Vektor (1, 0) mieril vodorovne, (1, 4) mieri strmo hore. Smer sa zmenil.',
        'A·(1, 1): 1. zložka 1·1 + 2·1 = 3, 2. zložka 4·1 + 3·1 = 7. Výsledok (3, 7).',
        'Keby smer ostal, výsledok by bol násobkom (1, 1), teda mal by obe zložky rovnaké. (3, 7) ich rovnaké nemá, takže aj tento vektor sa otočil.',
      ],
      result: 'A·(1, 0) = (1, 4), A·(1, 1) = (3, 7). Oba vektory matica otočila.',
    },
    check: {
      q: 'Koľko je [[2, 0], [1, 3]]·(1, 2)?',
      options: ['(2, 7)', '(2, 6)', '(4, 5)', '(3, 5)'],
      explain: '1. zložka: 2·1 + 0·2 = 2. 2. zložka: 1·1 + 3·2 = 1 + 6 = 7. Výsledok (2, 7).',
    },
  },
  {
    title: 'Vlastný vektor: smer sa nezmení',
    text: 'Niektoré nenulové vektory matica neotočí, iba ich natiahne, skráti alebo prevráti na opačnú stranu. Ostanú na tej istej priamke cez počiatok. Taký vektor sa volá vlastný vektor matice A. Číslo, ktorým sa pritom vynásobí, je vlastné číslo a označuje sa gréckym písmenom λ (lambda).\n\nV prednáške je to povedané takto: vlastný vektor je taký vektor, ktorého smer sa po aplikácii transformácie A nemení, a vlastné číslo je koeficient zmeny jeho veľkosti.\n\nNa obrázku matica [[2, 1], [1, 2]] sivý vektor otočí. Zelený vektor (1, 1) iba natiahne trojnásobne, preto λ = 3. Žltý (1, −1) nechá presne taký, aký bol, preto λ = 1.',
    analogy: 'Predstav si gumenú plachtu, ktorú niekto naťahuje. Skoro každá šípka nakreslená na plachte sa pri tom stočí. Šípky ležiace presne v smere ťahania sa však iba predĺžia. To sú vlastné vektory a o koľko sa predĺžili, to sú vlastné čísla.',
    fig: 'eigen',
    formula: {
      f: 'A·x = λ·x ,   x ≠ o',
      what: 'Definícia vlastného čísla a vlastného vektora',
      vars: [
        ['A', 'štvorcová matica typu n×n'],
        ['x', 'vlastný vektor: NENULOVÝ vektor, ktorý matica neotočí'],
        ['λ', 'vlastné číslo: koľkokrát sa x natiahne (λ ∈ ℂ, my počítame hlavne reálne)'],
        ['λ·x', 'vektor x vynásobený číslom λ: ten istý smer (alebo opačný, ak λ < 0)'],
        ['o', 'nulový vektor (0, 0); ten je vylúčený'],
      ],
    },
    deeper: 'Prečo musí byť x nenulový? Pre nulový vektor platí A·o = o = λ·o pre ÚPLNE KAŽDÉ číslo λ. Keby sme ho pripustili, každé číslo by bolo „vlastné číslo“ a pojem by nemal zmysel. V prednáške sa to hovorí tak, že sústava A·x = λ·x má mať okrem triviálneho riešenia x = o aj nenulové riešenie.\n\nZáporné λ je v poriadku: vektor sa prevráti na opačnú stranu, ale stále leží na tej istej priamke. λ = 0 je tiež možné: matica vektor „zmačká“ do nuly, A·x = o.',
    check: {
      q: 'Ktorá veta o vlastnom vektore NIE je pravdivá?',
      options: ['Nulový vektor je vlastný vektor každej matice', 'Vlastný vektor matica neotočí, iba natiahne alebo skráti', 'Pri λ < 0 sa vlastný vektor prevráti na opačnú stranu', 'Vlastné číslo hovorí, koľkokrát sa vektor natiahne'],
      explain: 'Vlastný vektor musí byť nenulový. Nulový vektor spĺňa A·o = λ·o pre každé λ, preto sa vylučuje.',
    },
  },
  {
    title: 'Overenie: je to vlastný vektor?',
    text: 'Najjednoduchšia úloha: niekto ti dá maticu aj vektor a ty overíš, či je vektor vlastný. Postup je krátky. Vynásobíš A·v a pozrieš sa, či výsledok je násobok pôvodného v. Ak áno, ten násobok je vlastné číslo λ.\n\nToto je príklad 1 z prednášky. Matica A = [[1, 2], [4, 3]] a tvrdenie: λ₁ = 5, λ₂ = −1 s vlastnými vektormi v⁽¹⁾ = (1, 2)ᵀ a v⁽²⁾ = (−1, 1)ᵀ. Horný index v zátvorke ⁽¹⁾ nie je mocnina, iba poradové číslo vektora. Znak ᵀ (transponovanie) hovorí, že vektor je v skutočnosti stĺpec, len je kvôli miestu napísaný do riadku.\n\nV pokuse nižšie môžeš vektor otáčať sám a hľadať smery, v ktorých sa nestočí.',
    worked: {
      q: 'Over, či v⁽¹⁾ = (1, 2) a v⁽²⁾ = (−1, 1) sú vlastné vektory matice A = [[1, 2], [4, 3]] a s akými vlastnými číslami.',
      steps: [
        'A·v⁽¹⁾: 1. zložka 1·1 + 2·2 = 1 + 4 = 5, 2. zložka 4·1 + 3·2 = 4 + 6 = 10. Výsledok (5, 10).',
        'Je (5, 10) násobok (1, 2)? Áno: (5, 10) = 5·(1, 2). Teda A·v⁽¹⁾ = 5·v⁽¹⁾ a λ₁ = 5.',
        'A·v⁽²⁾: 1. zložka 1·(−1) + 2·1 = −1 + 2 = 1, 2. zložka 4·(−1) + 3·1 = −4 + 3 = −1. Výsledok (1, −1).',
        'Je (1, −1) násobok (−1, 1)? Áno: (1, −1) = −1·(−1, 1). Teda A·v⁽²⁾ = −1·v⁽²⁾ a λ₂ = −1.',
        'λ₂ = −1 znamená, že v⁽²⁾ sa neotočil do iného smeru, iba sa prevrátil na opačnú stranu tej istej priamky a dĺžku nezmenil.',
      ],
      result: 'Obe tvrdenia platia: A·(1, 2) = 5·(1, 2) a A·(−1, 1) = −1·(−1, 1).',
    },
    check: {
      q: 'Je (1, 0) vlastný vektor matice [[3, 1], [0, 2]]? Ak áno, s akým λ?',
      options: ['Áno, λ = 3', 'Áno, λ = 2', 'Áno, λ = 1', 'Nie je'],
      explain: '[[3, 1], [0, 2]]·(1, 0) = (3·1 + 1·0, 0·1 + 2·0) = (3, 0) = 3·(1, 0). Je to vlastný vektor s λ = 3.',
    },
  },
  {
    title: 'Jednotková matica I a matica A − λI',
    text: 'Aby sme vlastné čísla vedeli VYPOČÍTAŤ, a nie iba overiť, potrebujeme jeden trik. V rovnici A·x = λ·x je vľavo matica a vpravo číslo. Matica a číslo sa nedajú od seba odčítať, A − λ nemá zmysel. Pomôže jednotková matica I.\n\nJednotková matica I typu n×n má na hlavnej diagonále jednotky a všade inde nuly, pre 2×2 je to I = [[1, 0], [0, 1]]. Pre každý vektor platí I·x = x, matica I nič nemení (ako násobenie jednotkou). V prednáške 4 a v tejto appke sa jej hovorí aj E, je to to isté.\n\nPreto môžeš napísať λ·x = λ·I·x. Matica λ·I má λ na diagonále a nuly mimo nej. A − λI už odčítať vieš: od prvkov NA DIAGONÁLE odčítaš λ, ostatné prvky ostanú.',
    formula: {
      f: 'A − λI = [[a₁₁ − λ, a₁₂], [a₂₁, a₂₂ − λ]]',
      what: 'Matica A − λI pre maticu 2×2',
      vars: [
        ['I', 'jednotková matica: jednotky na diagonále, inde nuly (inde označená E)'],
        ['λ·I', 'matica s λ na diagonále, inde nuly'],
        ['a₁₁ − λ, a₂₂ − λ', 'λ sa odčíta IBA od prvkov hlavnej diagonály'],
        ['a₁₂, a₂₁', 'prvky mimo diagonály sa nemenia'],
      ],
    },
    check: {
      q: 'Ako vyzerá A − λI pre A = [[1, 2], [3, 2]]?',
      options: ['[[1 − λ, 2], [3, 2 − λ]]', '[[1 − λ, 2 − λ], [3 − λ, 2 − λ]]', '[[1, 2 − λ], [3 − λ, 2]]', '[[1 − λ, 2], [3, 2]]'],
      explain: 'λ odčítaš len na hlavnej diagonále (prvky 1 a 2 vpravo dole). Prvky 2 a 3 mimo diagonály ostanú.',
    },
  },
  {
    title: 'Z A·x = λ·x na homogénnu sústavu',
    text: 'Teraz rovnicu upravíme tak, aby bola vpravo nula. Vyjdeš z A·x = λ·x. Pravú stranu prepíšeš ako λ·I·x a prenesieš ju doľava: A·x − λI·x = o. Vektor x vyberieš pred zátvorku (sprava, lebo pri maticiach záleží na poradí) a dostaneš (A − λI)·x = o.\n\nTo je homogénna sústava lineárnych rovníc: sústava, ktorá má na pravej strane samé nuly. Ako vieš z prednášky 4, homogénna sústava má VŽDY triviálne riešenie x = o (samé nuly). To nás nezaujíma, lebo vlastný vektor nesmie byť nulový. Hľadáme také λ, pre ktoré má sústava aj iné, nenulové riešenie.',
    formula: {
      f: 'A·x = λ·x   ⇔   (A − λI)·x = o',
      what: 'Ekvivalentný tvar definície (sústava (1) z prednášky)',
      vars: [
        ['⇔', '„práve vtedy, keď“: obe rovnice hovoria to isté'],
        ['(A − λI)', 'matica sústavy, závisí od neznámeho čísla λ'],
        ['x', 'neznámy vektor, hľadáme NENULOVÉ riešenie'],
        ['o', 'nulový vektor na pravej strane: sústava je homogénna'],
      ],
    },
    deeper: 'Prečo nemôžeme jednoducho „vydeliť x“? Lebo x je vektor a vektorom sa nedelí. Rovnica A·x = λ·x je v skutočnosti n rovníc naraz (pre 2×2 dve rovnice s neznámymi x₁, x₂), v ktorých je navyše neznáme číslo λ. Prepis na (A − λI)·x = o ich zapíše ako jednu homogénnu sústavu, na ktorú už poznáme vety z prednášky 4.',
    check: {
      q: 'Aké riešenie má sústava (A − λI)·x = o vždy, pre každé λ?',
      options: ['Triviálne x = o', 'Žiadne', 'Práve jedno nenulové', 'x = (1, 1)'],
      explain: 'Každá homogénna sústava má riešenie x = o. Vlastné číslo je také λ, pri ktorom má sústava navyše aj nenulové riešenie.',
    },
  },
  {
    title: 'Prečo |A − λI| = 0',
    text: 'Kedy má homogénna sústava s maticou n×n aj nenulové riešenie? Z prednášky 4: ak je determinant matice sústavy NENULOVÝ, matica je regulárna a sústava má jediné riešenie, a to je triviálne x = o. Nenulové riešenie preto môže existovať iba vtedy, keď je determinant NULOVÝ. Prednáška to hovorí presne: nutná a postačujúca podmienka, aby sústava mala nenulové riešenie, je |A − λI| = 0.\n\nZvislé čiary |…| okolo matice tu neznamenajú absolútnu hodnotu, ale determinant (rovnako ako det). Rovnica |A − λI| = 0 sa volá charakteristická rovnica. Neznáma je v nej iba λ, takže z nej vlastné čísla vypočítaš. Pre maticu 2×2 vyjde kvadratická rovnica, pre 3×3 kubická.\n\nKeď už λ poznáš, vlastné vektory nájdeš ako nenulové riešenia sústavy (A − λ₀I)·x = o, kde λ₀ je jedno konkrétne vlastné číslo.',
    formula: {
      f: '|A − λI| = 0',
      what: 'Charakteristická rovnica: z nej počítaš vlastné čísla',
      vars: [
        ['| … |', 'determinant matice (nie absolútna hodnota!)'],
        ['A − λI', 'matica A s λ odčítaným na diagonále'],
        ['= 0', 'matica musí byť singulárna, inak by existovalo iba riešenie x = o'],
        ['λ', 'jediná neznáma; korene rovnice sú vlastné čísla'],
      ],
    },
    analogy: 'Sústava s det ≠ 0 je ako zámok, ktorý pustí dnu iba jedného hosťa, triviálne riešenie o. Až keď je det = 0, zámok sa „uvoľní“ a vojde celá priamka riešení. Hľadáme teda λ, pri ktorých sa zámok uvoľní.',
    check: {
      q: 'Prečo pri hľadaní vlastných čísel kladieme determinant matice A − λI rovný nule?',
      options: ['Iba vtedy má (A − λI)·x = o aj nenulové riešenie', 'Aby bola matica A regulárna', 'Lebo vlastné čísla sú vždy nulové', 'Aby existovala inverzná matica k A − λI'],
      explain: 'Ak det ≠ 0, sústava má jediné riešenie x = o. Nenulový vlastný vektor existuje len pri det(A − λI) = 0. Vtedy je A − λI singulárna a inverzná k nej NEexistuje.',
    },
  },
  {
    title: 'Charakteristická rovnica matice 2×2',
    text: 'Pre maticu 2×2 vypočítaš determinant krížom: súčin hlavnej diagonály mínus súčin vedľajšej. Hlavná diagonála je teraz (a₁₁ − λ) a (a₂₂ − λ), vedľajšia a₁₂ a a₂₁. Vznikne kvadratická rovnica pre λ a tú vyriešiš diskriminantom.\n\nToto je príklad 2 z prednášky: A = [[1, 2], [3, 2]]. Ak zátvorky roznásobíš, uvidíš pravidlo: pri λ stojí mínus súčet diagonály (tomu sa hovorí stopa matice, tr A) a na konci je det A. Každú maticu 2×2 tak vieš prepísať rovno na λ² − (tr A)·λ + det A = 0.',
    formula: {
      f: '(a₁₁ − λ)(a₂₂ − λ) − a₁₂·a₂₁ = 0   ⇔   λ² − (a₁₁ + a₂₂)·λ + (a₁₁a₂₂ − a₁₂a₂₁) = 0',
      what: 'Charakteristická rovnica matice 2×2',
      vars: [
        ['(a₁₁ − λ)(a₂₂ − λ)', 'súčin hlavnej diagonály matice A − λI'],
        ['a₁₂·a₂₁', 'súčin vedľajšej diagonály (λ v nej nie je)'],
        ['a₁₁ + a₂₂', 'stopa tr A: súčet prvkov na hlavnej diagonále'],
        ['a₁₁a₂₂ − a₁₂a₂₁', 'det A'],
        ['λ₁,₂ = (tr A ± √D)/2', 'korene, D = (tr A)² − 4·det A'],
      ],
    },
    worked: {
      q: 'Vypočítaj vlastné čísla matice A = [[1, 2], [3, 2]] (príklad 2 z prednášky).',
      steps: [
        'A − λI = [[1 − λ, 2], [3, 2 − λ]].',
        '|A − λI| = (1 − λ)(2 − λ) − 2·3 = 0.',
        'Roznásob: (1 − λ)(2 − λ) = 2 − λ − 2λ + λ² = λ² − 3λ + 2. Odčítaj 6: λ² − 3λ − 4 = 0.',
        'Kontrola pravidlom: tr A = 1 + 2 = 3 a det A = 1·2 − 2·3 = −4, teda λ² − 3λ − 4 = 0. Sedí.',
        'Diskriminant D = (−3)² − 4·1·(−4) = 9 + 16 = 25, √D = 5.',
        'λ = (3 ± 5)/2, teda λ₁ = (3 − 5)/2 = −1 a λ₂ = (3 + 5)/2 = 4.',
      ],
      result: 'Vlastné čísla sú λ₁ = −1 a λ₂ = 4.',
    },
    check: {
      q: 'Aká je charakteristická rovnica matice [[4, 1], [2, 3]]?',
      options: ['λ² − 7λ + 10 = 0', 'λ² + 7λ + 10 = 0', 'λ² − 7λ + 14 = 0', 'λ² − 12λ + 2 = 0'],
      explain: 'tr A = 4 + 3 = 7, det A = 4·3 − 1·2 = 10. Teda λ² − 7λ + 10 = 0 a vlastné čísla sú 2 a 5.',
    },
  },
  {
    title: 'Vlastný vektor k λ₁ = −1',
    text: 'Vlastné čísla máme, teraz ku každému nájdeme vlastný vektor. Dosadíš jedno konkrétne λ do matice A − λI a riešiš homogénnu sústavu. Neznáme zložky vektora v prednáške volá v₁⁽¹⁾, v₂⁽¹⁾: dolný index je číslo zložky, horný v zátvorke hovorí, ku ktorému vlastnému číslu vektor patrí.\n\nVšimni si dôležitú vec: po dosadení správneho λ sú obe rovnice sústavy násobkom jedna druhej. To nie je náhoda, presne preto bol determinant nula. Jedna rovnica teda „odpadne“ a ostane jediná rovnica s dvoma neznámymi, ktorá má nekonečne veľa riešení. Vyberieš si jedno nenulové.\n\nAk by ti po dosadení vyšlo iba riešenie (0, 0), máš chybu vo výpočte λ.',
    worked: {
      q: 'Nájdi vlastný vektor matice A = [[1, 2], [3, 2]] k vlastnému číslu λ₁ = −1.',
      steps: [
        'A − λ₁I = [[1 − (−1), 2], [3, 2 − (−1)]] = [[2, 2], [3, 3]]. Pozor na mínus mínus: 1 − (−1) = 2.',
        'Sústava (A − λ₁I)·v⁽¹⁾ = o: 2v₁ + 2v₂ = 0 a 3v₁ + 3v₂ = 0.',
        'Prvú rovnicu vydelíš 2, druhú 3. Obe dajú to isté: v₁ + v₂ = 0. Ekvivalentná sústava má jedinú rovnicu.',
        'Z nej v₂ = −v₁. Zvolíš v₁ = 1 (hocijaké nenulové číslo), potom v₂ = −1.',
        'Skúška: A·(1, −1) = (1·1 + 2·(−1), 3·1 + 2·(−1)) = (−1, 1) = −1·(1, −1). Sedí.',
      ],
      result: 'Vlastný vektor k λ₁ = −1 je napr. v⁽¹⁾ = (1, −1)ᵀ.',
    },
    check: {
      q: 'Po dosadení λ do (A − λI)·x = o ti vyšlo, že jediné riešenie je x = (0, 0). Čo to znamená?',
      options: ['λ nie je vlastné číslo, niekde je chyba', 'Vlastný vektor je (0, 0)', 'Matica nemá vlastné vektory', 'Je to v poriadku, vlastný vektor je nulový'],
      explain: 'Pri správnom vlastnom čísle je det(A − λI) = 0 a sústava má nekonečne veľa riešení. Jediné riešenie o znamená det ≠ 0, teda λ nie je vlastné číslo.',
    },
  },
  {
    title: 'Vlastný vektor k λ₂ = 4 a skúška',
    text: 'Pre druhé vlastné číslo postupuješ úplne rovnako. Dosadíš λ₂ = 4, dostaneš dve rovnice, ktoré sú opäť násobkom jedna druhej, a z jednej z nich vyjadríš vzťah medzi zložkami.\n\nZvyk, ktorý sa ti na písomke vyplatí: na konci vždy sprav skúšku A·v = λ·v. Trvá pár sekúnd a odhalí skoro každú chybu v znamienku.',
    worked: {
      q: 'Nájdi vlastný vektor matice A = [[1, 2], [3, 2]] k vlastnému číslu λ₂ = 4.',
      steps: [
        'A − 4I = [[1 − 4, 2], [3, 2 − 4]] = [[−3, 2], [3, −2]].',
        'Sústava: −3v₁ + 2v₂ = 0 a 3v₁ − 2v₂ = 0. Druhá rovnica je prvá vynásobená −1.',
        'Ostane −3v₁ + 2v₂ = 0, teda 2v₂ = 3v₁ a v₂ = (3/2)·v₁.',
        'Aby nevyšli zlomky, zvolíš v₁ = 2. Potom v₂ = 3.',
        'Skúška: A·(2, 3) = (1·2 + 2·3, 3·2 + 2·3) = (8, 12) = 4·(2, 3). Sedí.',
      ],
      result: 'Vlastný vektor k λ₂ = 4 je napr. v⁽²⁾ = (2, 3)ᵀ.',
    },
    check: {
      q: 'Z rovnice 5v₁ − 4v₂ = 0 vyber vlastný vektor bez zlomkov.',
      options: ['(4, 5)', '(5, 4)', '(1, 1)', '(−4, 5)'],
      explain: '5v₁ = 4v₂. Pre v₁ = 4 je 5·4 = 20 = 4·v₂, teda v₂ = 5. Kontrola: 5·4 − 4·5 = 0.',
    },
  },
  {
    title: 'Vlastný vektor nie je jediný',
    text: 'Pri vlastnom vektore v prednáške stojí „napríklad“. Ak je v vlastný vektor, potom je ním aj 2·v, −v, 100·v a vôbec t·v pre každé číslo t ≠ 0. Všetky ležia na tej istej priamke a matica ich všetky natiahne rovnakým λ. Overíš to jedným riadkom: A·(t·v) = t·(A·v) = t·λ·v = λ·(t·v).\n\nPreto ak spolužiakovi vyšlo (−2, 2) a tebe (1, −1), máte obaja pravdu. Úplná odpoveď je celá priamka: vlastné vektory k λ₁ = −1 sú všetky t·(1, −1), t ≠ 0, a k λ₂ = 4 všetky t·(2, 3), t ≠ 0.',
    formula: {
      f: 'A·v = λ·v   ⇒   A·(t·v) = λ·(t·v)   pre každé t ≠ 0',
      what: 'Násobok vlastného vektora je tiež vlastný vektor',
      vars: [
        ['t', 'ľubovoľné nenulové reálne číslo (parameter)'],
        ['t·v', 'vektor na tej istej priamke ako v'],
        ['⇒', '„z toho vyplýva“'],
      ],
    },
    check: {
      q: 'Vlastný vektor matice k λ = 4 je (2, 3). Ktorý z vektorov je TIEŽ jej vlastný vektor k λ = 4?',
      options: ['(−4, −6)', '(3, 2)', '(2, −3)', '(0, 0)'],
      explain: '(−4, −6) = −2·(2, 3), je to nenulový násobok, teda vlastný vektor. (3, 2) a (2, −3) ležia na iných priamkach a (0, 0) je vylúčený.',
    },
  },
  {
    title: 'Celý príklad od začiatku do konca',
    text: 'Toto je príklad 3 z prednášky, ktorý ostal na samostatné riešenie. Prejdi ho celý a nepreskakuj skúšku. Postup je vždy rovnaký a na písomke ho stačí dodržať krok za krokom:\n\n1. Napíš A − λI. 2. Determinant polož rovný nule. 3. Vyrieš kvadratickú rovnicu. 4. Pre každé λ dosaď a vyrieš sústavu. 5. Sprav skúšku.',
    bullets: [
      '1. A − λI: odčítaj λ na diagonále.',
      '2. |A − λI| = 0: hlavná diagonála krát hlavná mínus vedľajšia krát vedľajšia.',
      '3. Korene λ₁, λ₂ (kontrola: λ₁ + λ₂ = tr A, λ₁·λ₂ = det A).',
      '4. Pre každé λ: (A − λI)·v = o, jedna rovnica odpadne, zvoľ jednu zložku.',
      '5. Skúška A·v = λ·v.',
    ],
    worked: {
      q: 'Vypočítaj vlastné čísla a vlastné vektory matice A = [[7, −4], [5, −2]] (príklad 3 z prednášky).',
      steps: [
        'A − λI = [[7 − λ, −4], [5, −2 − λ]].',
        '|A − λI| = (7 − λ)(−2 − λ) − (−4)·5 = (−14 − 7λ + 2λ + λ²) + 20 = λ² − 5λ + 6 = 0.',
        'Kontrola: tr A = 7 + (−2) = 5, det A = 7·(−2) − (−4)·5 = −14 + 20 = 6. Sedí.',
        'λ² − 5λ + 6 = (λ − 2)(λ − 3) = 0, teda λ₁ = 2, λ₂ = 3.',
        'λ₁ = 2: A − 2I = [[5, −4], [5, −4]], rovnica 5v₁ − 4v₂ = 0 → v⁽¹⁾ = (4, 5). Skúška: A·(4, 5) = (28 − 20, 20 − 10) = (8, 10) = 2·(4, 5).',
        'λ₂ = 3: A − 3I = [[4, −4], [5, −5]], rovnica v₁ − v₂ = 0 → v⁽²⁾ = (1, 1). Skúška: A·(1, 1) = (7 − 4, 5 − 2) = (3, 3) = 3·(1, 1).',
      ],
      result: 'λ₁ = 2 s vlastnými vektormi t·(4, 5), λ₂ = 3 s vlastnými vektormi t·(1, 1), t ≠ 0.',
    },
    check: {
      q: 'Pri príklade 3 si dostal λ² − 5λ + 6 = 0. Ktoré vlastné čísla z toho vyjdú?',
      options: ['2 a 3', '−2 a −3', '1 a 6', '−1 a 6'],
      explain: 'Hľadáš dve čísla so súčtom 5 a súčinom 6: 2 a 3. (λ − 2)(λ − 3) = λ² − 5λ + 6.',
    },
  },
  {
    title: 'Keď to nevyjde pekne',
    text: 'Charakteristická rovnica je kvadratická, a tak môžu nastať tri situácie podľa diskriminantu D.\n\nD > 0: dve rôzne reálne vlastné čísla. To boli všetky príklady doteraz.\n\nD = 0: jedno dvojnásobné vlastné číslo. Napríklad A = [[2, 1], [0, 2]] má (2 − λ)² = 0, teda λ = 2. A − 2I = [[0, 1], [0, 0]] dá rovnicu v₂ = 0, takže vlastné vektory sú iba t·(1, 0). Jedna priamka, nie dve.\n\nD < 0: vlastné čísla sú komplexné. V definícii je preto λ ∈ ℂ. Napríklad otočenie o 90°, matica [[0, −1], [1, 0]], má λ² + 1 = 0, teda λ = ±i. Dáva to zmysel aj geometricky: otočenie o 90° stočí úplne každý vektor, žiadny smer neostane. Prednáška hovorí jasne: vlastné vektory budeme určovať iba pre reálne vlastné čísla.',
    deeper: 'Užitočné skratky na kontrolu, platia pre každú štvorcovú maticu: súčet všetkých vlastných čísel = stopa (súčet diagonály) a súčin všetkých vlastných čísel = det A. Pri trojuholníkovej matici (pod diagonálou samé nuly) sú vlastné čísla priamo prvky na diagonále, lebo determinant trojuholníkovej matice je súčin diagonály: (a₁₁ − λ)(a₂₂ − λ)…\n\nPríklad 3×3: A = [[1, 4, 5], [0, 2, 6], [0, 0, 3]] je horná trojuholníková, takže λ = 1, 2, 3 bez akéhokoľvek počítania.',
    check: {
      q: 'Aké vlastné čísla má matica [[0, −1], [1, 0]] (otočenie o 90°)?',
      options: ['Iba komplexné ±i, žiadne reálne', '1 a −1', '0 a 0', '90 a −90'],
      explain: 'det(A − λI) = λ·λ − (−1)·1 = λ² + 1 = 0 nemá reálne riešenie. Otočenie o 90° nenechá žiadny smer, preto nemá reálny vlastný vektor.',
    },
  },
  {
    title: 'Zhrnutie: vlastné čísla a vektory',
    text: 'Vlastný vektor je nenulový vektor, ktorý matica neotočí, a vlastné číslo hovorí, koľkokrát sa natiahne. Počíta sa to vždy rovnako: charakteristická rovnica dá λ, homogénna sústava dá vektory, skúška overí výsledok.\n\nTypické chyby: odčítať λ aj mimo diagonály, pomýliť si |…| s absolútnou hodnotou, chyba v znamienku pri 1 − (−1), napísať nulový vektor ako výsledok a zabudnúť, že vlastných vektorov je celá priamka t·v.',
    bullets: [
      'Definícia: A·x = λ·x, x ≠ o.',
      'Ekvivalentne: (A − λI)·x = o, homogénna sústava.',
      'Vlastné čísla: |A − λI| = 0 (charakteristická rovnica).',
      '2×2: λ² − (tr A)·λ + det A = 0.',
      'Vlastné vektory: nenulové riešenia (A − λ₀I)·x = o, jedna rovnica odpadne.',
      'Ak je v vlastný vektor, je ním aj t·v pre t ≠ 0.',
      'Kontrola: λ₁ + λ₂ = tr A, λ₁·λ₂ = det A; trojuholníková matica → λ na diagonále.',
      'Komplexné λ: vlastné vektory počítame iba pre reálne λ.',
    ],
    check: {
      q: 'Matica 2×2 má stopu 6 a determinant 8. Aké má vlastné čísla?',
      options: ['2 a 4', '6 a 8', '1 a 8', '−2 a −4'],
      explain: 'λ² − 6λ + 8 = 0 → (λ − 2)(λ − 4) = 0. Kontrola: 2 + 4 = 6 (stopa), 2·4 = 8 (determinant).',
    },
  },
];

export default steps;
