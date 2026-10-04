import type { Step } from '../steps';

// Matematika 1, prednáška 4: Determinanty, inverzná matica, metódy riešenia SLAR, maticové rovnice, vlastné čísla a vektory.

const steps: Step[] = [
  {
    title: 'Determinant 2×2',
    text: 'Determinant je jedno číslo, ktoré vypočítaš zo ŠTVORCOVEJ matice (2×2, 3×3, …). Značí sa det A alebo |A| (zvislé čiary okolo matice). Obdĺžniková matica determinant nemá.\n\nPre maticu 2×2 je výpočet jednoduchý: vynásob prvky na hlavnej diagonále (zľava hore doprava dole) a odčítaj súčin prvkov na vedľajšej diagonále (sprava hore doľava dole). Na obrázku je zelená hlavná a ružová vedľajšia diagonála: 2·4 − 3·1 = 5.\n\nDeterminant ti povie, či je matica regulárna (det ≠ 0) alebo singulárna (det = 0). Pomôže ti riešiť sústavy rovníc aj hľadať inverznú maticu.',
    fig: 'det2',
    formula: {
      f: 'det [[a, b], [c, d]] = a·d − b·c',
      what: 'Determinant matice 2×2',
      vars: [
        ['a·d', 'súčin na hlavnej diagonále (so znamienkom +)'],
        ['b·c', 'súčin na vedľajšej diagonále (so znamienkom −)'],
        ['det A', 'číslo, môže byť kladné, záporné aj 0'],
      ],
    },
    worked: {
      q: 'Vypočítaj determinant matice A = [[3, −2], [4, 1]].',
      steps: [
        'Vieme: a = 3, b = −2, c = 4, d = 1.',
        'Hľadáme: det A.',
        'Použijeme det = a·d − b·c, lebo ide o maticu 2×2.',
        'Hlavná diagonála: 3·1 = 3. Vedľajšia diagonála: (−2)·4 = −8.',
        'det A = 3 − (−8) = 3 + 8 = 11.',
        'Pozor na znamienka: odčítavaš záporné číslo, takže sa v skutočnosti pripočíta.',
      ],
      result: 'det A = 11.',
    },
  },
  {
    title: 'Čo determinant znamená',
    text: 'Maticu 2×2 si môžeš predstaviť ako stroj, ktorý deformuje rovinu: každý bod presunie na nové miesto. Jednotkový štvorec sa zmení na rovnobežník. Absolútna hodnota determinantu hovorí, koľkokrát sa zväčšil obsah. Prepni si na obrázku jednotlivé voľby.\n\nAk je determinant záporný, obrazec sa navyše „prevráti“ ako v zrkadle. Ak je det = 0, štvorec sa sploští do úsečky a obsah je 0. Splošteninu už nevieš vrátiť späť, preto singulárna matica nemá inverznú maticu.\n\nSúvis s vektormi: |det| matice 2×2 z dvoch vektorov je obsah rovnobežníka, ktorý napínajú. |det| matice 3×3 z troch vektorov je objem rovnobežnostena, teda absolútna hodnota zmiešaného súčinu.',
    fig: 'mat:determinanty',
    analogy: 'Matica je ako gumená plachta, ktorú natiahneš: det = 2 znamená, že každý kúsok plachty má teraz dvojnásobný obsah. det = 0 je, akoby si plachtu zroloval do čiary: z čiary už pôvodný obrázok nezrekonštruuješ.',
    check: {
      q: 'Determinant štvorcovej matice je 0. Čo platí?',
      options: ['Matica je singulárna a nemá inverznú', 'Matica je regulárna', 'Matica je určite nulová', 'Matica má hodnosť n'],
      explain: 'det = 0 znamená, že matica „sploští“ priestor. Je singulárna, jej hodnosť je menšia ako n a inverzná matica neexistuje. Nulová byť nemusí, napr. [[1, 2], [2, 4]] má det = 4 − 4 = 0.',
    },
  },
  {
    title: 'Determinant 3×3: Sarrusovo pravidlo',
    text: 'Pre maticu 3×3 použi Sarrusovo pravidlo. Prvé dva stĺpce opíš ešte raz vpravo vedľa matice. Potom máš tri uhlopriečky smerom dole doprava (na obrázku zelené) a tri smerom hore doprava (ružové).\n\nSúčiny troch čísel na zelených uhlopriečkach sčítaš a súčiny na ružových odčítaš. Výsledok je determinant.\n\nPOZOR: Sarrusovo pravidlo platí IBA pre matice 3×3. Pre 4×4 a väčšie nefunguje, tam musíš použiť rozvoj podľa riadku alebo úpravu na trojuholníkový tvar.',
    fig: 'sarrus',
    formula: {
      f: 'det [[a, b, c], [d, e, f], [g, h, i]] = aei + bfg + cdh − ceg − afh − bdi',
      what: 'Sarrusovo pravidlo (iba pre 3×3)',
      vars: [
        ['aei, bfg, cdh', 'tri uhlopriečky dole doprava, so znamienkom +'],
        ['ceg, afh, bdi', 'tri uhlopriečky hore doprava, so znamienkom −'],
      ],
    },
    deeper: 'Odkiaľ Sarrus? Rozviň determinant 3×3 podľa 1. riadku (postup je v ďalšom kroku): a·(ei − fh) − b·(di − fg) + c·(dh − eg). Po roznásobení: aei − afh − bdi + bfg + cdh − ceg. Je to presne tých istých šesť členov ako v Sarrusovom pravidle, len inak usporiadaných.\n\nPri 4×4 by rozvoj dal 24 členov, ale „uhlopriečky“ nakreslené ako pri Sarrusovi dajú iba 8. Preto Sarrus pre väčšie matice nefunguje.',
    worked: {
      q: 'Vypočítaj det A pre A = [[2, −1, 3], [1, 0, 2], [4, 1, −1]].',
      steps: [
        'Vieme: a = 2, b = −1, c = 3, d = 1, e = 0, f = 2, g = 4, h = 1, i = −1.',
        'Hľadáme: det A. Použijeme Sarrusovo pravidlo, lebo matica je 3×3.',
        'Plusové uhlopriečky: aei = 2·0·(−1) = 0, bfg = (−1)·2·4 = −8, cdh = 3·1·1 = 3. Spolu 0 − 8 + 3 = −5.',
        'Mínusové uhlopriečky: ceg = 3·0·4 = 0, afh = 2·2·1 = 4, bdi = (−1)·1·(−1) = 1. Spolu 0 + 4 + 1 = 5.',
        'det A = (−5) − 5 = −10.',
        'Kontrolu urobíme v ďalšom kroku iným spôsobom (rozvojom).',
      ],
      result: 'det A = −10.',
    },
    check: {
      q: 'Pre ktoré matice môžeš použiť Sarrusovo pravidlo?',
      options: ['Iba pre 3×3', 'Pre všetky štvorcové matice', 'Pre 3×3 aj 4×4', 'Aj pre obdĺžnikové matice'],
      explain: 'Sarrus je „trik“ iba pre 3×3. Pri 4×4 by si dostal nesprávny výsledok, tam treba rozvoj alebo Gaussovu elimináciu.',
    },
  },
  {
    title: 'Rozvoj podľa riadku alebo stĺpca',
    text: 'Univerzálny spôsob pre maticu akejkoľvek veľkosti je rozvoj (Laplaceov rozvoj). Vyberieš si jeden riadok (alebo stĺpec). Každý jeho prvok vynásobíš znamienkom zo „šachovnice“ a determinantom menšej matice, ktorá vznikne vyškrtnutím riadku a stĺpca tohto prvku. Všetko sčítaš.\n\nMenší determinant po vyškrtnutí sa volá minor Mᵢⱼ. Znamienko je (−1)ⁱ⁺ʲ: na mieste (1, 1) je +, vedľa −, potom + a tak ďalej, striedavo ako políčka šachovnice.\n\nTrik: vyber si riadok alebo stĺpec s čo najviac nulami. Nula krát čokoľvek je nula, takže tie členy vôbec nemusíš počítať.',
    analogy: 'Znamienka si predstav ako šachovnicu: ľavý horný roh je biely (+) a farby sa striedajú. Pre 3×3 to je: + − + / − + − / + − +.',
    formula: {
      f: 'det A = aᵢ₁·Aᵢ₁ + aᵢ₂·Aᵢ₂ + … + aᵢₙ·Aᵢₙ     Aᵢⱼ = (−1)ⁱ⁺ʲ · Mᵢⱼ',
      what: 'Rozvoj determinantu podľa i-teho riadku',
      vars: [
        ['Mᵢⱼ', 'minor: determinant matice bez i-teho riadku a j-teho stĺpca'],
        ['(−1)ⁱ⁺ʲ', 'znamienko zo šachovnice: + ak je i + j párne, − ak nepárne'],
        ['Aᵢⱼ', 'algebraický doplnok = minor so znamienkom'],
      ],
    },
    worked: {
      q: 'Vypočítaj det [[2, −1, 3], [1, 0, 2], [4, 1, −1]] rozvojom podľa 2. riadku.',
      steps: [
        'Vieme: 2. riadok je (1, 0, 2) a obsahuje nulu, preto ho vyberieme. Znamienka 2. riadku sú − + −.',
        'Prvok a₂₁ = 1, znamienko −. Vyškrtneme 2. riadok a 1. stĺpec: M₂₁ = det [[−1, 3], [1, −1]] = (−1)·(−1) − 3·1 = 1 − 3 = −2. Člen: −1·(−2) = 2.',
        'Prvok a₂₂ = 0, jeho člen je 0, nepočítame.',
        'Prvok a₂₃ = 2, znamienko −. Vyškrtneme 2. riadok a 3. stĺpec: M₂₃ = det [[2, −1], [4, 1]] = 2·1 − (−1)·4 = 6. Člen: −2·6 = −12.',
        'Súčet: 2 + 0 − 12 = −10.',
        'Kontrola: Sarrusovo pravidlo v predošlom kroku dalo tiež −10. Sedí.',
      ],
      result: 'det A = −10.',
    },
  },
  {
    title: 'Vlastnosti determinantu',
    text: 'Determinant sa dá počítať aj šikovnejšie: maticu upravíš na trojuholníkový tvar (pod diagonálou nuly) a determinant je potom súčin prvkov na diagonále. Musíš však vedieť, ako ktorá úprava determinant mení.\n\nPripočítanie násobku iného riadku determinant NEMENÍ. Výmena dvoch riadkov zmení jeho znamienko. Vynásobenie jedného riadku číslom k vynásobí aj determinant číslom k. Animácia ukazuje úpravu iba pripočítavaním násobkov riadkov, takže determinant ostáva celý čas rovnaký.\n\nPozor na rozdiel: k·A násobí VŠETKY riadky naraz, takže det(k·A) = kⁿ·det A, nie k·det A.',
    fig: 'gauss',
    bullets: [
      'det Aᵀ = det A (riadky a stĺpce sú rovnocenné).',
      'Výmena dvoch riadkov → determinant zmení znamienko.',
      'Riadok krát k → determinant krát k; det(k·A) = kⁿ·det A.',
      'Pripočítanie násobku iného riadku → determinant sa nezmení.',
      'Nulový riadok, dva rovnaké alebo úmerné riadky → det = 0.',
      'Trojuholníková matica → det = súčin prvkov na diagonále.',
      'det(A·B) = det A · det B; det(A⁻¹) = 1 / det A.',
    ],
    worked: {
      q: 'Vypočítaj det [[1, 2, 1], [2, 5, 3], [1, 3, 4]] úpravou na trojuholníkový tvar.',
      steps: [
        'Vieme: úpravy typu Rᵢ − k·Rⱼ determinant nemenia.',
        'R₂ − 2·R₁ = (0, 1, 1), R₃ − R₁ = (0, 1, 3).',
        'R₃ − R₂ = (0, 0, 2). Matica [[1, 2, 1], [0, 1, 1], [0, 0, 2]] je trojuholníková.',
        'det = súčin diagonály = 1·1·2 = 2.',
        'Kontrola Sarrusom: 1·5·4 + 2·3·1 + 1·2·3 − 1·5·1 − 1·3·3 − 2·2·4 = 20 + 6 + 6 − 5 − 9 − 16 = 2. Sedí.',
      ],
      result: 'det A = 2.',
    },
    check: {
      q: 'Matica A má rozmer 3×3 a det A = 5. Koľko je det(2·A)?',
      options: ['40', '10', '30', '25'],
      explain: '2·A vynásobí dvoma všetky 3 riadky a každý pridá faktor 2: det(2A) = 2³·5 = 8·5 = 40.',
    },
  },
  {
    title: 'Inverzná matica 2×2',
    text: 'Inverzná matica A⁻¹ je taká matica, ktorá „odčiní“ účinok A: A·A⁻¹ = A⁻¹·A = E. Pri číslach je inverzné k 5 číslo 1/5, lebo 5·(1/5) = 1. Maticami sa však nedelí, namiesto delenia sa násobí inverznou maticou.\n\nInverzná matica existuje iba pre štvorcovú maticu s det A ≠ 0 (regulárnu). Pre maticu 2×2 je hotový vzorec: vymeň prvky na hlavnej diagonále, zmeň znamienka prvkov na vedľajšej diagonále a celé vydeľ determinantom.\n\nVždy si urob skúšku A·A⁻¹ = E. Ak nevyjde jednotková matica, máš niekde chybu.',
    analogy: 'Inverzná matica je ako tlačidlo „Späť“ (Ctrl+Z): A urobí zmenu a A⁻¹ ju presne vráti. Ak A všetko sploštila (det = 0), niet čo vrátiť a „Späť“ neexistuje.',
    formula: {
      f: 'A⁻¹ = 1/(ad − bc) · [[d, −b], [−c, a]]',
      what: 'Inverzná matica k A = [[a, b], [c, d]]',
      vars: [
        ['ad − bc', 'determinant, nesmie byť 0'],
        ['[[d, −b], [−c, a]]', 'a a d vymeníš, b a c dostanú opačné znamienko'],
        ['A·A⁻¹ = E', 'skúška správnosti'],
      ],
    },
    deeper: 'Odkiaľ vzorec? Vynásob A = [[a, b], [c, d]] maticou [[d, −b], [−c, a]]. Prvok (1, 1) = a·d + b·(−c) = ad − bc, prvok (1, 2) = a·(−b) + b·a = 0, prvok (2, 1) = c·d + d·(−c) = 0, prvok (2, 2) = c·(−b) + d·a = ad − bc.\n\nVyšla matica (ad − bc)·E. Stačí ju teda vydeliť číslom ad − bc a dostaneš presne E. To sa dá iba vtedy, keď ad − bc ≠ 0.',
    worked: {
      q: 'Nájdi inverznú maticu k A = [[2, 1], [5, 3]].',
      steps: [
        'Vieme: a = 2, b = 1, c = 5, d = 3.',
        'Determinant: det A = 2·3 − 1·5 = 6 − 5 = 1 ≠ 0, inverzná matica existuje.',
        'Vymeníme diagonálu a otočíme znamienka: [[3, −1], [−5, 2]].',
        'Vydelíme det = 1: A⁻¹ = [[3, −1], [−5, 2]].',
        'Skúška: A·A⁻¹ = [[2·3 + 1·(−5), 2·(−1) + 1·2], [5·3 + 3·(−5), 5·(−1) + 3·2]] = [[1, 0], [0, 1]] = E. Sedí.',
      ],
      result: 'A⁻¹ = [[3, −1], [−5, 2]].',
    },
  },
  {
    title: 'Inverzná matica Gauss-Jordanovou metódou',
    text: 'Pre väčšie matice (3×3 a viac) použi Gauss-Jordanovu metódu. Vedľa matice A napíš jednotkovú maticu E: [A | E]. Potom elementárnymi riadkovými úpravami upravuj ľavú časť, kým z nej nebude E. Každú úpravu rob s CELÝM riadkom, aj s jeho pravou časťou.\n\nKeď je vľavo E, vpravo je hľadaná A⁻¹: [A | E] → [E | A⁻¹]. Najprv vyrob nuly pod diagonálou (ako pri Gaussovi), potom nad diagonálou (to je „Jordanova“ časť) a nakoniec riadky vydeľ tak, aby boli na diagonále jednotky.\n\nAk sa ti počas úprav vľavo objaví nulový riadok, matica je singulárna a inverzná matica neexistuje.',
    formula: {
      f: '[A | E]  →  riadkové úpravy  →  [E | A⁻¹]',
      what: 'Gauss-Jordanova metóda pre inverznú maticu',
      vars: [
        ['[A | E]', 'matica A a vedľa nej jednotková matica'],
        ['úpravy', 'vždy s celým riadkom (ľavá aj pravá časť)'],
        ['[E | A⁻¹]', 'keď je vľavo E, vpravo je inverzná matica'],
      ],
    },
    worked: {
      q: 'Nájdi A⁻¹ pre A = [[1, 1, 1], [1, 2, 2], [1, 2, 3]].',
      steps: [
        'Zapíšeme [A | E]: R₁ = (1, 1, 1 | 1, 0, 0), R₂ = (1, 2, 2 | 0, 1, 0), R₃ = (1, 2, 3 | 0, 0, 1).',
        'Nuly v 1. stĺpci: R₂ − R₁ = (0, 1, 1 | −1, 1, 0), R₃ − R₁ = (0, 1, 2 | −1, 0, 1).',
        'Nula v 2. stĺpci dole: R₃ − R₂ = (0, 0, 1 | 0, −1, 1). Ľavá časť je trojuholníková.',
        'Nuly nad diagonálou v 3. stĺpci: R₂ − R₃ = (0, 1, 0 | −1, 2, −1), R₁ − R₃ = (1, 1, 0 | 1, 1, −1).',
        'Nula nad diagonálou v 2. stĺpci: R₁ − R₂ = (1, 0, 0 | 2, −1, 0). Vľavo je E.',
        'Skúška: 1. riadok A krát 1. stĺpec A⁻¹: 1·2 + 1·(−1) + 1·0 = 1, krát 2. stĺpec: −1 + 2 − 1 = 0. Rovnako vyjde celá matica E.',
      ],
      result: 'A⁻¹ = [[2, −1, 0], [−1, 2, −1], [0, −1, 1]].',
    },
  },
  {
    title: 'Sústavy rovníc a Frobeniova veta',
    text: 'SLAR znamená sústava lineárnych algebraických rovníc: neznáme sú v nej iba v prvej mocnine (žiadne x², xy ani sin x). Zapíšeš ju maticovo A·x = b a k nej rozšírenú maticu (A|b).\n\nKoľko riešení má sústava, rozhodne Frobeniova veta pomocou hodností. Na obrázku vidíš tri možnosti pre 2 rovnice s 2 neznámymi ako dve priamky: pretnú sa, sú rovnobežné alebo splývajú.\n\nHomogénna sústava má pravú stranu b = 0. Tá má vždy aspoň triviálne riešenie x = 0. Netriviálne (nenulové) riešenie má práve vtedy, keď h(A) < n, pri štvorcovej matici teda keď det A = 0. To budeš potrebovať pri vlastných vektoroch.',
    fig: 'lines2',
    analogy: 'Dve rovnice s dvoma neznámymi sú ako dve cesty na mape. Križovatka je jedno riešenie, dve rovnobežné cesty sa nestretnú nikdy (žiadne riešenie) a dve cesty po tej istej trase majú spoločné všetky body (nekonečne veľa riešení).',
    bullets: [
      'h(A) ≠ h(A|b) → sústava NEMÁ riešenie.',
      'h(A) = h(A|b) = n → práve JEDNO riešenie (n = počet neznámych).',
      'h(A) = h(A|b) < n → NEKONEČNE VEĽA riešení, n − h voľných parametrov.',
    ],
    formula: {
      f: 'A·x = b má riešenie  ⇔  h(A) = h(A|b)',
      what: 'Frobeniova veta',
      vars: [
        ['h(A)', 'hodnosť matice sústavy'],
        ['h(A|b)', 'hodnosť rozšírenej matice'],
        ['n − h', 'počet voľných neznámych (parametrov)'],
      ],
    },
    deeper: 'Prečo Frobeniova veta platí? Po Gaussovej eliminácii vidíš každú rovnicu „naholo“. Ak má rozšírená matica väčšiu hodnosť ako A, vznikol riadok (0 0 … 0 | c) s c ≠ 0, teda rovnica 0 = c, a tá nemá riešenie.\n\nAk sú hodnosti rovnaké, taký riadok nevznikol a sústavu vieš vyriešiť odspodu. Ak je pivotov (h) toľko ako neznámych (n), každá neznáma je jednoznačne určená. Ak je ich menej, n − h neznámych pivot nemá, môžu byť ľubovoľné a sú to parametre.',
    check: {
      q: 'Po eliminácii vyšlo h(A) = 2 a h(A|b) = 3. Koľko riešení má sústava?',
      options: ['Žiadne', 'Práve jedno', 'Nekonečne veľa', 'Tri'],
      explain: 'Hodnosti sa nerovnajú, podľa Frobeniovej vety riešenie neexistuje. V matici vznikol riadok typu (0 0 0 | c) s c ≠ 0, teda nezmyselná rovnica 0 = c.',
    },
  },
  {
    title: 'Gaussova eliminačná metóda',
    text: 'Gaussova eliminácia je najuniverzálnejší spôsob riešenia sústavy, funguje vždy. Rozšírenú maticu (A|b) upravíš na stupňovitý tvar. Posledný riadok potom obsahuje iba jednu neznámu, ktorú hneď vypočítaš.\n\nPotom ideš odspodu nahor (spätné dosadenie): vypočítanú neznámu dosadíš do predposledného riadku, z neho vypočítaš ďalšiu atď. Na konci urob skúšku dosadením do pôvodných rovníc.\n\nAnimácia ukazuje úpravu matice A z príkladu nižšie. Rovnaké úpravy robíš aj so stĺpcom pravých strán.',
    fig: 'gauss',
    worked: {
      q: 'Vyrieš Gaussovou elimináciou: x + 2y + z = 8, 2x + 5y + 3z = 21, x + 3y + 4z = 19.',
      steps: [
        'Rozšírená matica: R₁ = (1, 2, 1 | 8), R₂ = (2, 5, 3 | 21), R₃ = (1, 3, 4 | 19).',
        'R₂ − 2·R₁ = (0, 1, 1 | 5), R₃ − R₁ = (0, 1, 3 | 11).',
        'R₃ − R₂ = (0, 0, 2 | 6). Stupňovitý tvar, h(A) = h(A|b) = 3 = n, sústava má jedno riešenie.',
        'Posledný riadok: 2z = 6 → z = 3.',
        '2. riadok: y + z = 5 → y = 5 − 3 = 2.',
        '1. riadok: x + 2y + z = 8 → x = 8 − 4 − 3 = 1.',
        'Skúška v 2. rovnici: 2·1 + 5·2 + 3·3 = 2 + 10 + 9 = 21. Sedí.',
      ],
      result: 'x = 1, y = 2, z = 3.',
    },
  },
  {
    title: 'Gauss-Jordan a nekonečne veľa riešení',
    text: 'Gauss-Jordanova metóda pokračuje v úpravách aj nad diagonálou, kým v každom stĺpci s pivotom nie je iba jedna jednotka. Riešenie potom prečítaš priamo, bez spätného dosadzovania.\n\nAk po eliminácii vznikne nulový riadok (0 0 0 | 0), rovnica 0 = 0 nič nehovorí a sústava má menej „užitočných“ rovníc ako neznámych. Podľa Frobeniovej vety má nekonečne veľa riešení. Neznámu bez pivota zvolíš ako parameter (napr. z = t) a ostatné vyjadríš pomocou t.\n\nAk by vznikol riadok (0 0 0 | 5), znamenal by rovnicu 0 = 5, čo je nezmysel: sústava nemá riešenie.',
    worked: {
      q: 'Vyrieš sústavu: x + y + z = 6, x + 2y + 3z = 14, 2x + 3y + 4z = 20.',
      steps: [
        'Rozšírená matica: R₁ = (1, 1, 1 | 6), R₂ = (1, 2, 3 | 14), R₃ = (2, 3, 4 | 20).',
        'R₂ − R₁ = (0, 1, 2 | 8), R₃ − 2·R₁ = (0, 1, 2 | 8).',
        'R₃ − R₂ = (0, 0, 0 | 0). h(A) = h(A|b) = 2 < 3, nekonečne veľa riešení s 3 − 2 = 1 parametrom.',
        'Jordanov krok: R₁ − R₂ = (1, 0, −1 | −2). Zostali rovnice x − z = −2 a y + 2z = 8.',
        'Zvolíme z = t: y = 8 − 2t, x = −2 + t.',
        'Skúška pre t = 0, teda (−2, 8, 0): −2 + 8 + 0 = 6 ✓, −2 + 16 + 0 = 14 ✓, −4 + 24 + 0 = 20 ✓.',
      ],
      result: '(x, y, z) = (−2 + t, 8 − 2t, t), t ∈ ℝ (nekonečne veľa riešení).',
    },
  },
  {
    title: 'Cramerovo pravidlo',
    text: 'Cramerovo pravidlo rieši sústavu pomocou determinantov. Dá sa použiť iba vtedy, keď je matica sústavy štvorcová (rovnako veľa rovníc ako neznámych) a det A ≠ 0.\n\nPre každú neznámu xᵢ vyrobíš maticu Aᵢ: v matici A nahradíš i-ty stĺpec stĺpcom pravých strán b. Potom xᵢ = det Aᵢ / det A. Pre 2 neznáme počítaš 3 determinanty, pre 3 neznáme 4 determinanty.\n\nAk det A = 0, Cramerovo pravidlo nepoužiješ (delil by si nulou). Sústava vtedy nemá riešenie alebo ich má nekonečne veľa a musíš použiť Gaussovu elimináciu.',
    formula: {
      f: 'xᵢ = det Aᵢ / det A',
      what: 'Cramerovo pravidlo',
      vars: [
        ['A', 'matica sústavy, štvorcová, det A ≠ 0'],
        ['Aᵢ', 'matica A, v ktorej je i-ty stĺpec nahradený pravou stranou b'],
        ['xᵢ', 'i-ta neznáma (x₁ = x, x₂ = y, x₃ = z)'],
      ],
    },
    deeper: 'Prečo to funguje (pre 2×2)? Sústava je ax + by = e, cx + dy = f. Prvú rovnicu vynásob číslom d, druhú číslom b a odčítaj ich: (ad − bc)·x = ed − bf. Preto x = (ed − bf)/(ad − bc).\n\nV menovateli je det A a v čitateli det [[e, b], [f, d]], teda matica A s prvým stĺpcom nahradeným pravou stranou. Presne to hovorí Cramerovo pravidlo. Pre y to vyjde podobne.',
    worked: {
      q: 'Vyrieš Cramerovým pravidlom: x + y + z = 6, x − y + z = 2, 2x + y − z = 1.',
      steps: [
        'Vieme: A = [[1, 1, 1], [1, −1, 1], [2, 1, −1]], b = (6, 2, 1).',
        'det A (Sarrus): (1·(−1)·(−1) + 1·1·2 + 1·1·1) − (1·(−1)·2 + 1·1·1 + 1·1·(−1)) = (1 + 2 + 1) − (−2 + 1 − 1) = 4 + 2 = 6 ≠ 0.',
        'A₁ (1. stĺpec nahradený b) = [[6, 1, 1], [2, −1, 1], [1, 1, −1]]: det = (6 + 1 + 2) − (−1 + 6 − 2) = 9 − 3 = 6.',
        'A₂ (2. stĺpec nahradený b) = [[1, 6, 1], [1, 2, 1], [2, 1, −1]]: det = (−2 + 12 + 1) − (4 + 1 − 6) = 11 + 1 = 12.',
        'A₃ (3. stĺpec nahradený b) = [[1, 1, 6], [1, −1, 2], [2, 1, 1]]: det = (−1 + 4 + 6) − (−12 + 2 + 1) = 9 + 9 = 18.',
        'x = 6/6 = 1, y = 12/6 = 2, z = 18/6 = 3.',
        'Skúška v 3. rovnici: 2·1 + 2 − 3 = 1. Sedí.',
      ],
      result: 'x = 1, y = 2, z = 3.',
    },
  },
  {
    title: 'Inverzná matica a maticové rovnice',
    text: 'Ak je A regulárna, sústavu A·x = b vyriešiš aj tak, že obe strany vynásobíš ZĽAVA maticou A⁻¹: A⁻¹·A·x = A⁻¹·b, a keďže A⁻¹·A = E, dostaneš x = A⁻¹·b. Napríklad pre 2x + y = 3, 5x + 3y = 7 a A⁻¹ = [[3, −1], [−5, 2]] je x = 3·3 − 1·7 = 2 a y = −5·3 + 2·7 = −1.\n\nRovnako riešiš maticové rovnice, v ktorých je neznámou celá matica X. Pri A·X = B je X vpravo od A, preto násobíš A⁻¹ zľava: X = A⁻¹·B. Pri X·A = B je X vľavo od A, preto násobíš A⁻¹ sprava: X = B·A⁻¹.\n\nKeďže A⁻¹·B ≠ B·A⁻¹, výsledky týchto dvoch rovníc sa líšia. Najčastejšia chyba je „vydeliť“ maticou alebo násobiť z nesprávnej strany. Matice sa nedelia!',
    formula: {
      f: 'A·x = b  ⇒  x = A⁻¹·b     A·X = B  ⇒  X = A⁻¹·B     X·A = B  ⇒  X = B·A⁻¹',
      what: 'Riešenie pomocou inverznej matice',
      vars: [
        ['A⁻¹ zľava', 'keď je neznáma vpravo od A'],
        ['A⁻¹ sprava', 'keď je neznáma vľavo od A'],
        ['podmienka', 'det A ≠ 0 (A je regulárna)'],
      ],
    },
    worked: {
      q: 'A = [[2, 1], [5, 3]], B = [[1, 0], [2, 1]]. Vyrieš rovnice A·X = B a X·A = B.',
      steps: [
        'Vieme: A⁻¹ = [[3, −1], [−5, 2]] (z kroku o inverznej matici 2×2).',
        'A·X = B: X = A⁻¹·B = [[3, −1], [−5, 2]]·[[1, 0], [2, 1]].',
        'Riadky A⁻¹ krát stĺpce B: 1. riadok (3·1 − 1·2, 3·0 − 1·1) = (1, −1), 2. riadok (−5·1 + 2·2, −5·0 + 2·1) = (−1, 2). X = [[1, −1], [−1, 2]].',
        'X·A = B: X = B·A⁻¹ = [[1, 0], [2, 1]]·[[3, −1], [−5, 2]].',
        'Riadky B krát stĺpce A⁻¹: 1. riadok (1·3 + 0·(−5), 1·(−1) + 0·2) = (3, −1), 2. riadok (2·3 + 1·(−5), 2·(−1) + 1·2) = (1, 0). X = [[3, −1], [1, 0]].',
        'Skúška prvej: A·[[1, −1], [−1, 2]] = [[2 − 1, −2 + 2], [5 − 3, −5 + 6]] = [[1, 0], [2, 1]] = B. Sedí.',
      ],
      result: 'A·X = B: X = [[1, −1], [−1, 2]]; X·A = B: X = [[3, −1], [1, 0]]. Každá rovnica má iný výsledok!',
    },
    check: {
      q: 'Ako vyriešiš maticovú rovnicu X·A = B (A je regulárna)?',
      options: ['X = B·A⁻¹', 'X = A⁻¹·B', 'X = B / A', 'X = A·B⁻¹'],
      explain: 'X je vľavo od A, preto obe strany vynásobíš A⁻¹ SPRAVA: X·A·A⁻¹ = B·A⁻¹, teda X = B·A⁻¹. Maticami sa nedelí.',
    },
  },
  {
    title: 'Vlastné čísla a vlastné vektory',
    text: 'Keď maticou A vynásobíš vektor v, väčšinou dostaneš vektor, ktorý ukazuje iným smerom. Niektoré špeciálne vektory však matica iba natiahne alebo skráti a smer ostane rovnaký (prípadne presne opačný). Taký nenulový vektor je vlastný vektor a číslo λ (lambda), ktorým sa natiahne, je vlastné číslo: A·v = λ·v.\n\nNa obrázku matica [[2, 1], [1, 2]] sivý vektor otočí, ale zelený (1, 1) iba natiahne trojnásobne (λ = 3) a žltý (1, −1) nechá tak, ako je (λ = 1).\n\nPostup má dva kroky. 1. Vlastné čísla nájdeš z charakteristickej rovnice det(A − λE) = 0: od prvkov na diagonále odčítaš λ a determinant položíš rovný nule. 2. Pre každé λ vyriešiš homogénnu sústavu (A − λE)·v = 0. Tá má nekonečne veľa riešení a vlastný vektor je ktorékoľvek nenulové z nich.',
    fig: 'eigen',
    formula: {
      f: 'A·v = λ·v, v ≠ o     det(A − λ·E) = 0     (A − λ·E)·v = 0',
      what: 'Vlastné čísla a vlastné vektory',
      vars: [
        ['λ', 'vlastné číslo (koľkokrát sa vektor natiahne)'],
        ['v', 'vlastný vektor, nesmie byť nulový'],
        ['A − λE', 'matica A, ktorej od každého prvku na diagonále odčítaš λ'],
        ['det(A − λE) = 0', 'charakteristická rovnica'],
      ],
    },
    deeper: 'Prečo det(A − λE) = 0? Rovnicu A·v = λ·v prepíšeš ako A·v − λ·E·v = 0, teda (A − λE)·v = 0. To je homogénna sústava. Chceme nenulové riešenie v a to existuje iba vtedy, keď je matica A − λE singulárna, teda keď je jej determinant 0.\n\nUžitočné kontroly: súčet vlastných čísel = súčet prvkov na diagonále (stopa matice) a súčin vlastných čísel = det A. Pre [[2, 1], [1, 2]]: 1 + 3 = 2 + 2 a 1·3 = 4 − 1. Vlastné čísla trojuholníkovej matice sú priamo prvky na jej diagonále.',
    worked: {
      q: 'Nájdi vlastné čísla a vlastné vektory matice A = [[2, 1], [1, 2]].',
      steps: [
        'A − λE = [[2 − λ, 1], [1, 2 − λ]].',
        'det(A − λE) = (2 − λ)² − 1·1 = 0 → (2 − λ)² = 1 → 2 − λ = 1 alebo 2 − λ = −1.',
        'Vlastné čísla: λ₁ = 1, λ₂ = 3.',
        'λ = 3: A − 3E = [[−1, 1], [1, −1]], rovnica −v₁ + v₂ = 0 → v₂ = v₁. Vlastný vektor napr. (1, 1).',
        'λ = 1: A − E = [[1, 1], [1, 1]], rovnica v₁ + v₂ = 0 → v₂ = −v₁. Vlastný vektor napr. (1, −1).',
        'Skúška: A·(1, 1) = (2 + 1, 1 + 2) = (3, 3) = 3·(1, 1) a A·(1, −1) = (2 − 1, 1 − 2) = (1, −1) = 1·(1, −1). Sedí.',
      ],
      result: 'λ₁ = 1 s vlastnými vektormi t·(1, −1), λ₂ = 3 s vlastnými vektormi t·(1, 1), t ≠ 0.',
    },
  },
  {
    title: 'Zhrnutie',
    text: 'Determinant je jedno číslo zo štvorcovej matice, ktoré rozhoduje, či je matica regulárna. Stojí na ňom inverzná matica, Cramerovo pravidlo aj vlastné čísla. Pri sústave si najprv rozmysli, ktorá metóda je najkratšia: Gauss funguje vždy, Cramer a inverzná matica iba pre štvorcové sústavy s det ≠ 0.\n\nTypické chyby: Sarrus použitý na 4×4, zabudnuté znamienka zo šachovnice pri rozvoji, det(k·A) = k·det A (správne je kⁿ), násobenie inverznou maticou z nesprávnej strany a nulový „vlastný vektor“.',
    bullets: [
      'det 2×2 = ad − bc; 3×3 Sarrus (iba 3×3) alebo rozvoj so znamienkami + − +.',
      'Úpravy: výmena riadkov mení znamienko, Rᵢ + k·Rⱼ nemení nič, trojuholníková matica → súčin diagonály.',
      'det A ≠ 0 ⇔ A je regulárna ⇔ existuje A⁻¹.',
      'A⁻¹ (2×2) = 1/(ad − bc)·[[d, −b], [−c, a]]; väčšie: [A | E] → [E | A⁻¹].',
      'Frobenius: h(A) ≠ h(A|b) → žiadne riešenie; = n → jedno; < n → nekonečne veľa (n − h parametrov).',
      'Gauss: stupňovitý tvar + spätné dosadenie; Gauss-Jordan: nuly aj nad diagonálou.',
      'Cramer: xᵢ = det Aᵢ / det A (iba štvorcová sústava, det A ≠ 0).',
      'A·X = B → X = A⁻¹·B; X·A = B → X = B·A⁻¹.',
      'Vlastné čísla: det(A − λE) = 0; vlastné vektory: (A − λE)·v = 0, v ≠ o.',
    ],
    check: {
      q: 'Aké sú vlastné čísla trojuholníkovej matice [[2, 5], [0, 3]]?',
      options: ['2 a 3', '2 a 5', '0 a 5', '5 a 3'],
      explain: 'det(A − λE) = (2 − λ)(3 − λ) − 5·0 = (2 − λ)(3 − λ) = 0, teda λ = 2 a λ = 3. Pri trojuholníkovej matici sú vlastné čísla priamo na diagonále.',
    },
  },
];

export default steps;
