import type { Step } from '../steps';

// Matematika 1, prednáška 2: Priamky a roviny v 3D, vzájomné polohy, uhly, vzdialenosti.

const steps: Step[] = [
  {
    title: 'Priamky a roviny v priestore',
    text: 'Analytická geometria opisuje geometrické útvary rovnicami. Namiesto kreslenia počítaš: bod je trojica čísel, priamka a rovina sú rovnice. V geodézii presne takto pracuješ so zameranými bodmi, s osami ciest alebo so sklonom terénu.\n\nPotrebuješ dva druhy vektorov. Smerový vektor s ukazuje, kam priamka ide (leží v jej smere). Normálový vektor n trčí z roviny kolmo von, ako stožiar z rovnej strechy. Takmer každá úloha v tejto téme je práca s týmito dvoma vektormi.\n\nZ témy Vektory už poznáš skalárny súčin (kolmosť, uhol), vektorový súčin (kolmý vektor, obsah) a zmiešaný súčin (objem). Tu použiješ všetky tri. Body zapisujeme v hranatých zátvorkách A = [1, 2, 3], vektory v okrúhlych s = (1, 2, 3).',
    analogy: 'Súradnice sú ako adresa v meste s výškovými domami: x je ulica, y číslo domu a z poschodie. Rovnica priamky alebo roviny je potom „zoznam všetkých adries“, ktoré na nej ležia.',
    check: {
      q: 'Čo je normálový vektor roviny?',
      options: ['Vektor kolmý na rovinu', 'Vektor ležiaci v rovine', 'Ľubovoľný bod roviny', 'Vektor dĺžky 1 ležiaci v rovine'],
      explain: 'Normála znamená kolmica, normálový vektor je vždy kolmý na rovinu. Vektory, ktoré v rovine ležia, sú jej smerové vektory.',
    },
  },
  {
    title: 'Parametrická rovnica priamky',
    text: 'Priamku jednoznačne určíš jedným jej bodom A a smerovým vektorom s. Každý bod X priamky dostaneš tak, že z bodu A prejdeš t-násobok vektora s. Číslo t sa volá parameter a môže byť ľubovoľné reálne číslo: kladné t ide jedným smerom, záporné opačným a t = 0 dáva bod A.\n\nNa obrázku sa ružový bod X pohybuje po priamke podľa toho, ako sa mení t. Po zložkách dostaneš tri rovnice, pre x, y a z zvlášť. Ak máš zadané dva body A a B, smerový vektor je s = B − A.\n\nAk chceš zistiť, či bod P leží na priamke, dosadíš ho za X a z každej rovnice vypočítaš t. Ak vo všetkých troch vyjde to isté t, bod na priamke leží. Ak nie, neleží.',
    fig: 'lineparam',
    analogy: 'Vlak na rovných koľajniciach: A je stanica, s hovorí, kam a o koľko sa vlak posunie za hodinu, a t je čas v hodinách. Poloha vlaku po t hodinách je A + t·s. Záporné t ukazuje, kde bol pred odchodom.',
    formula: {
      f: 'X = A + t·s     x = a₁ + t·s₁,  y = a₂ + t·s₂,  z = a₃ + t·s₃',
      what: 'Parametrická rovnica priamky',
      vars: [
        ['A = [a₁, a₂, a₃]', 'ľubovoľný známy bod priamky'],
        ['s = (s₁, s₂, s₃)', 'smerový vektor, nenulový'],
        ['t ∈ ℝ', 'parameter, ľubovoľné reálne číslo'],
        ['X = [x, y, z]', 'bežný (ľubovoľný) bod priamky'],
      ],
    },
    deeper: 'Smerový vektor nie je jediný: každý jeho nenulový násobok (napr. 2s alebo −s) opisuje tú istú priamku. Aj bod A môžeš vymeniť za iný bod priamky. Preto môžu dvaja ľudia napísať rôzne rovnice tej istej priamky a obaja majú pravdu.\n\nKanonický tvar: ak sú všetky zložky sᵢ nenulové, z každej rovnice vyjadríš t a položíš ich do rovnosti: (x − a₁)/s₁ = (y − a₂)/s₂ = (z − a₃)/s₃. Je to tá istá priamka, len zapísaná bez parametra.',
    worked: {
      q: 'Napíš parametrické rovnice priamky cez body A = [1, 2, 0] a B = [3, 1, 3]. Leží na nej bod P = [5, 0, 6]? A bod Q = [3, 1, 4]?',
      steps: [
        'Vieme: dva body priamky A, B a skúšané body P, Q.',
        'Hľadáme: rovnice priamky a či na nej P a Q ležia.',
        'Smerový vektor: s = B − A = (3 − 1, 1 − 2, 3 − 0) = (2, −1, 3).',
        'Rovnice: x = 1 + 2t, y = 2 − t, z = 3t.',
        'Bod P: z x: 5 = 1 + 2t → t = 2. Z y: 0 = 2 − t → t = 2. Zo z: 6 = 3t → t = 2. Všade t = 2, bod P na priamke leží.',
        'Bod Q: z x: 3 = 1 + 2t → t = 1. Z y: 1 = 2 − t → t = 1. Zo z: 4 = 3t → t = 4/3. Parametre sa líšia, Q na priamke neleží.',
      ],
      result: 'x = 1 + 2t, y = 2 − t, z = 3t (t ∈ ℝ); P leží na priamke (t = 2), Q neleží.',
    },
  },
  {
    title: 'Všeobecná rovnica roviny',
    text: 'Rovinu najjednoduchšie určíš jedným jej bodom A = [x₀, y₀, z₀] a normálovým vektorom n = (a, b, c), ktorý je na rovinu kolmý. Na obrázku je to žltá šípka, ktorá trčí z fialovej roviny.\n\nRovnica roviny má tvar ax + by + cz + d = 0. Čísla pred x, y, z sú priamo zložky normálového vektora. To si zapamätaj: normálu z rovnice roviny „prečítaš“ bez počítania. Číslo d dopočítaš tak, že do rovnice dosadíš známy bod.\n\nBod leží v rovine práve vtedy, keď po dosadení jeho súradníc vyjde ľavá strana rovnice rovná nule. Ak niektorá premenná v rovnici chýba, jej koeficient je 0 (napr. rovina 2x − z + 7 = 0 má n = (2, 0, −1)).',
    fig: 'mat:geometria',
    analogy: 'Normála je ako klinec zatlčený kolmo do dosky. Keď dosku posunieš, klinec ukazuje stále rovnakým smerom. Všetky rovnobežné roviny majú rovnakú normálu, líšia sa iba číslom d (posunom).',
    formula: {
      f: 'a(x − x₀) + b(y − y₀) + c(z − z₀) = 0     ax + by + cz + d = 0',
      what: 'Rovnica roviny s normálou n = (a, b, c) cez bod A = [x₀, y₀, z₀]',
      vars: [
        ['(a, b, c)', 'normálový vektor n, kolmý na rovinu'],
        ['[x₀, y₀, z₀]', 'známy bod roviny'],
        ['d', 'číslo, ktoré dopočítaš dosadením bodu'],
        ['[x, y, z]', 'ľubovoľný bod roviny'],
      ],
    },
    deeper: 'Odkiaľ rovnica? Vezmi ľubovoľný bod X = [x, y, z] roviny. Vektor AX = (x − x₀, y − y₀, z − z₀) leží celý v rovine.\n\nNormála je kolmá na všetko, čo v rovine leží, teda aj na AX. Kolmosť znamená nulový skalárny súčin: n·AX = 0. Po zložkách: a(x − x₀) + b(y − y₀) + c(z − z₀) = 0.\n\nKeď zátvorky roznásobíš, všetky čísla bez x, y, z zhrnieš do jedného čísla d = −(a·x₀ + b·y₀ + c·z₀) a dostaneš ax + by + cz + d = 0.',
    worked: {
      q: 'Napíš rovnicu roviny s normálou n = (3, −2, 1), ktorá prechádza bodom A = [1, 1, 1]. Leží v nej bod B = [0, 0, 2]?',
      steps: [
        'Vieme: n = (3, −2, 1), bod A = [1, 1, 1].',
        'Hľadáme: rovnicu roviny a či B leží v rovine.',
        'Zložky normály napíšeme pred x, y, z: 3x − 2y + z + d = 0.',
        'Dosadíme A: 3·1 − 2·1 + 1 + d = 0 → 2 + d = 0 → d = −2.',
        'Rovnica: 3x − 2y + z − 2 = 0.',
        'Bod B: 3·0 − 2·0 + 2 − 2 = 0. Vyšla nula, B v rovine leží.',
      ],
      result: 'ρ: 3x − 2y + z − 2 = 0; bod B v nej leží.',
    },
    check: {
      q: 'Aký normálový vektor má rovina 2x − z + 7 = 0?',
      options: ['(2, 0, −1)', '(2, −1, 7)', '(2, −1, 0)', '(2, 1, −1)'],
      explain: 'Člen s y chýba, takže pri y je 0. Normála je (2, 0, −1). Číslo 7 je d a do normály nepatrí.',
    },
  },
  {
    title: 'Rovina cez tri body',
    text: 'Často dostaneš rovinu zadanú tromi bodmi A, B, C, ktoré neležia na jednej priamke. Normálu ešte nemáš, ale vieš si ju vyrobiť: vektory AB a AC ležia v rovine a ich vektorový súčin je kolmý na oba, teda na celú rovinu.\n\nPostup: 1. vypočítaj AB a AC, 2. n = AB × AC, 3. napíš ax + by + cz + d = 0 a dosaď jeden z bodov, aby si dostal d, 4. kontrola: dosaď zvyšné dva body, musí vyjsť 0.\n\nNa obrázku vidíš presne to: dva vektory u, v ležia v rovine a zelený u × v je na ne kolmý. Ten zelený vektor je normála hľadanej roviny.',
    fig: 'cross3d',
    formula: {
      f: 'n = AB × AC',
      what: 'Normála roviny cez body A, B, C',
      vars: [
        ['AB, AC', 'dva vektory ležiace v rovine (B − A a C − A)'],
        ['n', 'normálový vektor, kolmý na AB aj AC'],
        ['n = o', 'body ležia na jednej priamke a rovinu neurčujú'],
      ],
    },
    deeper: 'Parametrický tvar roviny: rovinu môžeš zapísať podobne ako priamku, len s dvoma parametrami: X = A + t·u + r·v, kde u, v sú dva nerovnobežné vektory v rovine (napr. AB a AC). Všeobecnú rovnicu z neho dostaneš práve cez n = u × v.\n\nÚsekový tvar: ak rovina pretína osi v bodoch [p, 0, 0], [0, q, 0] a [0, 0, r], jej rovnica je x/p + y/q + z/r = 1. V príklade nižšie vyjde 6x + 3y + 2z = 6, po vydelení šiestimi x/1 + y/2 + z/3 = 1, čo presne sedí so zadanými bodmi na osiach.',
    worked: {
      q: 'Nájdi všeobecnú rovnicu roviny cez body A = [1, 0, 0], B = [0, 2, 0], C = [0, 0, 3].',
      steps: [
        'Vieme: tri body roviny.',
        'Hľadáme: rovnicu ax + by + cz + d = 0.',
        'Vektory v rovine: AB = B − A = (−1, 2, 0), AC = C − A = (−1, 0, 3).',
        'Normála n = AB × AC = (2·3 − 0·0, 0·(−1) − (−1)·3, (−1)·0 − 2·(−1)) = (6, 3, 2).',
        'Rovnica: 6x + 3y + 2z + d = 0. Dosadíme A: 6 + d = 0 → d = −6.',
        'Kontrola: B: 0 + 6 + 0 − 6 = 0 ✓, C: 0 + 0 + 6 − 6 = 0 ✓.',
      ],
      result: 'ρ: 6x + 3y + 2z − 6 = 0.',
    },
  },
  {
    title: 'Vzájomná poloha dvoch priamok',
    text: 'V rovine sa dve priamky buď pretnú, alebo sú rovnobežné. V priestore pribudne tretia možnosť: mimobežky. Tie nie sú rovnobežné, ale ani sa nikde nestretnú, jedna ide „ponad“ druhú. Prepni si na obrázku všetky tri prípady.\n\nO polohe rozhodneš v dvoch krokoch. Najprv sa pozri na smerové vektory s₁ a s₂: ak je jeden násobkom druhého, priamky sú rovnobežné (alebo totožné). Ak nie sú násobky, priamky sú rôznobežné alebo mimobežné a rozhodne sústava rovníc.\n\nPri rovnobežných rozlíšiš totožné od rôznych tak, že skúsiš, či bod jednej priamky leží na druhej. Pri nerovnobežných položíš súradnice oboch priamok do rovnosti (každá priamka má svoj vlastný parameter!) a riešiš sústavu: ak má riešenie, priamky sa pretínajú, ak nemá, sú mimobežné.',
    fig: 'skew',
    analogy: 'Mimobežky poznáš z nadjazdu: cesta pod mostom a cesta na moste idú rôznymi smermi, ale nikdy sa nestretnú, lebo sú v inej výške.',
    bullets: [
      's₁ = k·s₂ a priamky majú spoločný bod → totožné',
      's₁ = k·s₂ a nemajú spoločný bod → rovnobežné rôzne',
      's₁ nie je násobkom s₂ a sústava má riešenie → rôznobežné (priesečník)',
      's₁ nie je násobkom s₂ a sústava nemá riešenie → mimobežné',
      'Skratka: [AB, s₁, s₂] = 0 ⇔ priamky ležia v jednej rovine (nie sú mimobežné)',
    ],
    check: {
      q: 'Smerové vektory dvoch priamok nie sú násobkami a sústava ich rovníc nemá riešenie. Priamky sú…',
      options: ['mimobežné', 'rovnobežné', 'rôznobežné', 'totožné'],
      explain: 'Nie sú rovnobežné (smery nie sú násobky) a nemajú spoločný bod (sústava nemá riešenie). To je presne definícia mimobežiek.',
    },
  },
  {
    title: 'Riešený príklad: priesečník dvoch priamok',
    text: 'Pozor na najčastejšiu chybu: obe priamky nesmú mať ten istý parameter. Prvú zapíš s parametrom t, druhú s parametrom r. Inak by si hľadal bod, do ktorého obe priamky prídu „v rovnakom čase“, a to je iná úloha.\n\nRovnosť x-ových, y-ových a z-ových súradníc dá tri rovnice s dvoma neznámymi t a r. Dve rovnice použiješ na výpočet t a r, tretiu na kontrolu. Ak kontrola sedí, priamky sa pretínajú a priesečník dostaneš dosadením t do prvej priamky. Ak nesedí, priamky sú mimobežné.',
    worked: {
      q: 'Urči vzájomnú polohu priamok p: X = [1, 0, 3] + t·(1, 2, −1) a q: X = [0, 3, 0] + r·(2, −1, 2).',
      steps: [
        'Vieme: p má bod [1, 0, 3] a smer s₁ = (1, 2, −1), q má bod [0, 3, 0] a smer s₂ = (2, −1, 2).',
        'Smery: je (2, −1, 2) násobkom (1, 2, −1)? Pomer x-ových zložiek je 2/1 = 2, y-ových −1/2 = −0,5. Nie sú násobky, priamky nie sú rovnobežné.',
        'Rovnosť súradníc: x: 1 + t = 2r, y: 2t = 3 − r, z: 3 − t = 2r.',
        'Z 1. a 3. rovnice (obe sa rovnajú 2r): 1 + t = 3 − t → 2t = 2 → t = 1, potom 2r = 2 → r = 1.',
        'Kontrola v 2. rovnici: 2·1 = 3 − 1 → 2 = 2. Sedí, priamky sa pretínajú.',
        'Priesečník: t = 1 do p: [1 + 1, 0 + 2, 3 − 1] = [2, 2, 2]. Kontrola v q s r = 1: [0 + 2, 3 − 1, 0 + 2] = [2, 2, 2].',
      ],
      result: 'Priamky sú rôznobežné, pretínajú sa v bode P = [2, 2, 2].',
    },
  },
  {
    title: 'Priamka a rovina',
    text: 'Priamka so smerom s a rovina s normálou n môžu byť v troch polohách. Rozhodne skalárny súčin s·n. Ak s·n ≠ 0, priamka nie je s rovinou rovnobežná a pretne ju v jednom bode (priesečník).\n\nAk s·n = 0, smer priamky je kolmý na normálu, takže priamka ide „popri“ rovine. Buď je s rovinou rovnobežná, alebo v nej celá leží. Rozhodneš dosadením bodu A priamky do rovnice roviny: ak vyjde 0, priamka leží v rovine. Špeciálny prípad pretínania (s·n ≠ 0) je, keď je s násobkom n: vtedy je priamka na rovinu kolmá. Na obrázku si prepni kolmá, rovnobežná a pretína.\n\nPriesečník nájdeš tak, že x, y, z z parametrických rovníc priamky dosadíš do rovnice roviny. Dostaneš jednu rovnicu pre t, vypočítaš ho a dosadíš späť do priamky.',
    fig: 'mat:geometria',
    bullets: [
      's·n ≠ 0 → priamka pretína rovinu v jednom bode',
      's·n = 0 a bod A priamky leží v rovine → priamka leží v rovine',
      's·n = 0 a bod A v rovine neleží → priamka je s rovinou rovnobežná',
      's = k·n → priamka je na rovinu kolmá',
    ],
    worked: {
      q: 'Nájdi priesečník priamky p: x = 1 + t, y = 2 − t, z = 3 + 2t s rovinou ρ: 2x + y − z − 4 = 0.',
      steps: [
        'Vieme: smer priamky s = (1, −1, 2), normála roviny n = (2, 1, −1).',
        'Poloha: s·n = 1·2 + (−1)·1 + 2·(−1) = 2 − 1 − 2 = −1 ≠ 0, priamka rovinu pretína.',
        'Dosadíme priamku do roviny: 2(1 + t) + (2 − t) − (3 + 2t) − 4 = 0.',
        'Pozor na mínus pred zátvorkou: −(3 + 2t) = −3 − 2t. Spolu: 2 + 2t + 2 − t − 3 − 2t − 4 = 0 → −3 − t = 0 → t = −3.',
        'Bod: x = 1 − 3 = −2, y = 2 + 3 = 5, z = 3 − 6 = −3.',
        'Kontrola v rovine: 2·(−2) + 5 − (−3) − 4 = −4 + 5 + 3 − 4 = 0. Sedí.',
      ],
      result: 'Priesečník P = [−2, 5, −3].',
    },
  },
  {
    title: 'Dve roviny',
    text: 'Dve roviny v priestore nemôžu byť mimobežné. Buď sú rovnobežné (prípadne totožné), alebo sa pretínajú v priamke, ktorej hovoríme priesečnica.\n\nRozhodnú normály. Ak je n₁ násobkom n₂, roviny sú rovnobežné. Ak sú v rovnakom pomere aj čísla d, roviny sú totožné (je to tá istá rovnica vynásobená číslom). Ak normály nie sú násobky, roviny sa pretínajú.\n\nPriesečnica leží v oboch rovinách, preto je jej smer kolmý na obe normály. Taký vektor už poznáš: s = n₁ × n₂. Bod priesečnice nájdeš tak, že jednu súradnicu zvolíš (napr. y = 0) a zvyšné dve dopočítaš z oboch rovníc.',
    analogy: 'Otvorená kniha: dve strany sú dve roviny a stretávajú sa v chrbte knihy, čo je priamka (priesečnica). Strany zatvorenej knihy sú ako rovnobežné roviny tesne nad sebou.',
    formula: {
      f: 's = n₁ × n₂',
      what: 'Smerový vektor priesečnice dvoch rovín',
      vars: [
        ['n₁, n₂', 'normály rovín (koeficienty pri x, y, z)'],
        ['s', 'smer priesečnice, kolmý na n₁ aj n₂'],
        ['s = o', 'normály sú rovnobežné, roviny sa v priamke nepretínajú'],
      ],
    },
    worked: {
      q: 'Nájdi priesečnicu rovín ρ₁: x + y + z − 3 = 0 a ρ₂: x − y + 2z − 2 = 0.',
      steps: [
        'Vieme: n₁ = (1, 1, 1), n₂ = (1, −1, 2). Nie sú násobky, roviny sa pretínajú.',
        'Smer: s = n₁ × n₂ = (1·2 − 1·(−1), 1·1 − 1·2, 1·(−1) − 1·1) = (3, −1, −2).',
        'Bod: zvolíme y = 0. Rovnice sa zmenia na x + z = 3 a x + 2z = 2.',
        'Odčítame prvú od druhej: z = −1, potom x = 3 − (−1) = 4. Bod P = [4, 0, −1].',
        'Kontrola: ρ₁: 4 + 0 − 1 − 3 = 0 ✓, ρ₂: 4 − 0 − 2 − 2 = 0 ✓. Smer: s·n₁ = 3 − 1 − 2 = 0 ✓, s·n₂ = 3 + 1 − 4 = 0 ✓.',
      ],
      result: 'Priesečnica: X = [4, 0, −1] + t·(3, −1, −2), t ∈ ℝ.',
    },
    check: {
      q: 'Roviny x + 2y − z + 1 = 0 a 2x + 4y − 2z + 5 = 0 sú…',
      options: ['rovnobežné rôzne', 'totožné', 'rôznobežné', 'mimobežné'],
      explain: 'Normály (1, 2, −1) a (2, 4, −2) sú násobky (×2), roviny sú rovnobežné. Totožné by boli, keby sa aj d zdvojnásobilo (1 → 2), ale je tam 5. Mimobežné môžu byť iba priamky.',
    },
  },
  {
    title: 'Uhol dvoch priamok a dvoch rovín',
    text: 'Uhol dvoch priamok je uhol ich smerových vektorov a uhol dvoch rovín je uhol ich normál. Použiješ teda známy vzorec pre uhol vektorov, s jedným rozdielom: v čitateli je absolútna hodnota.\n\nPrečo absolútna hodnota? Priamka nemá „predok a zadok“, smer s aj −s opisuje tú istú priamku. Uhol priamok (aj rovín) preto berieme vždy ten menší, z intervalu ⟨0°, 90°⟩. Absolútna hodnota zaručí, že kosínus bude kladný a uhol ostrý alebo pravý.\n\nPriamky alebo roviny sú na seba kolmé, keď je čitateľ nula, teda s₁·s₂ = 0 alebo n₁·n₂ = 0.',
    formula: {
      f: 'priamky: cos φ = |s₁·s₂| / (|s₁|·|s₂|)     roviny: cos φ = |n₁·n₂| / (|n₁|·|n₂|)',
      what: 'Uhol dvoch priamok a dvoch rovín',
      vars: [
        ['s₁, s₂', 'smerové vektory priamok'],
        ['n₁, n₂', 'normálové vektory rovín'],
        ['| | v čitateli', 'absolútna hodnota, aby φ ∈ ⟨0°, 90°⟩'],
      ],
    },
    worked: {
      q: 'Aký uhol zvierajú roviny ρ₁: x + y − 1 = 0 a ρ₂: y + z + 2 = 0?',
      steps: [
        'Vieme: n₁ = (1, 1, 0) (pri z nie je nič, teda 0), n₂ = (0, 1, 1).',
        'Hľadáme: uhol φ rovín.',
        'Použijeme cos φ = |n₁·n₂| / (|n₁|·|n₂|), lebo uhol rovín je uhol ich normál.',
        'n₁·n₂ = 1·0 + 1·1 + 0·1 = 1.',
        '|n₁| = √(1 + 1 + 0) = √2, |n₂| = √(0 + 1 + 1) = √2.',
        'cos φ = 1 / (√2·√2) = 1/2 → φ = 60° (kalkulačka v DEG).',
      ],
      result: 'φ = 60°.',
    },
  },
  {
    title: 'Uhol priamky a roviny',
    text: 'Tu je zrada: uhol priamky s rovinou NIE JE uhol vektorov s a n. Normála je na rovinu kolmá, preto uhol medzi s a n je doplnok hľadaného uhla do 90°. Namiesto kosínusu preto použiješ sínus.\n\nVzorec vyzerá presne ako pre uhol vektorov, len vľavo je sin φ namiesto cos φ. Ak vyjde s·n = 0, priamka je s rovinou rovnobežná (uhol 0°). Ak je s násobkom n, priamka je kolmá (uhol 90°).',
    formula: {
      f: 'sin φ = |s·n| / (|s|·|n|)',
      what: 'Uhol priamky a roviny',
      vars: [
        ['s', 'smerový vektor priamky'],
        ['n', 'normálový vektor roviny'],
        ['φ', 'uhol priamky s rovinou, 0° až 90°; pozor, je tu SÍNUS'],
      ],
    },
    deeper: 'Predstav si priamku, ktorá prepichne rovinu, a normálu v tom istom bode. Priamka, jej kolmý priemet do roviny a normála ležia v jednej rovine. Uhol priamky s rovinou je φ (medzi priamkou a jej priemetom) a uhol priamky s normálou označme α.\n\nPriemet a normála sú na seba kolmé, preto φ + α = 90°. Vzorec pre uhol vektorov dá cos α = |s·n| / (|s|·|n|). Keďže cos α = cos(90° − φ) = sin φ, platí sin φ = |s·n| / (|s|·|n|).',
    worked: {
      q: 'Aký uhol zviera priamka so smerom s = (1, 1, 0) s rovinou ρ: y + z − 5 = 0?',
      steps: [
        'Vieme: s = (1, 1, 0), z rovnice roviny n = (0, 1, 1).',
        'Hľadáme: uhol φ priamky s rovinou.',
        'Použijeme sin φ = |s·n| / (|s|·|n|), lebo ide o priamku a rovinu (normála je na rovinu kolmá).',
        's·n = 1·0 + 1·1 + 0·1 = 1, |s| = √2, |n| = √2.',
        'sin φ = 1/2 → φ = 30°.',
        'Porovnaj s predošlým krokom: tie isté vektory dali pre dve roviny 60°. Keby si tu omylom použil kosínus, dostal by si 60° namiesto správnych 30°.',
      ],
      result: 'φ = 30°.',
    },
    check: {
      q: 'Pri uhle priamky a roviny ti vyšlo |s·n| / (|s|·|n|) = 0,5. Aký je uhol?',
      options: ['30°', '60°', '45°', '90°'],
      explain: 'Pri priamke a rovine je to sínus: sin φ = 0,5 → φ = 30°. Hodnota 60° by vyšla, keby si to omylom bral ako kosínus.',
    },
  },
  {
    title: 'Vzdialenosť bodu od roviny',
    text: 'Vzdialenosť bodu P od roviny je dĺžka kolmice spustenej z P na rovinu, ako žltá čiarkovaná úsečka na obrázku. Pätu kolmice nemusíš hľadať, existuje priamy vzorec.\n\nPostup: dosaď súradnice bodu do ľavej strany rovnice roviny. Ak by bod ležal v rovine, vyšla by nula. Číslo, ktoré vyjde, je úmerné vzdialenosti. Aby to bola skutočná vzdialenosť, vezmi absolútnu hodnotu a vydeľ dĺžkou normály.\n\nRovnaký vzorec použiješ aj na vzdialenosť dvoch rovnobežných rovín: zober ľubovoľný bod jednej roviny a vypočítaj jeho vzdialenosť od druhej.',
    fig: 'dist',
    formula: {
      f: 'v(P, ρ) = |a·x₀ + b·y₀ + c·z₀ + d| / √(a² + b² + c²)',
      what: 'Vzdialenosť bodu P = [x₀, y₀, z₀] od roviny ρ: ax + by + cz + d = 0',
      vars: [
        ['čitateľ', 'bod dosadený do rovnice roviny, v absolútnej hodnote'],
        ['menovateľ', 'dĺžka normály |n| = √(a² + b² + c²)'],
        ['v', 'vzdialenosť v jednotkách súradníc (napr. m), vždy ≥ 0'],
      ],
    },
    deeper: 'Odkiaľ vzorec? Zober ľubovoľný bod R = [r₁, r₂, r₃] roviny a vektor RP. Vzdialenosť je dĺžka priemetu RP do smeru normály (kolmice na rovinu), teda |RP·n| / |n|.\n\nRozpíš RP·n = a(x₀ − r₁) + b(y₀ − r₂) + c(z₀ − r₃) = a·x₀ + b·y₀ + c·z₀ − (a·r₁ + b·r₂ + c·r₃). Bod R leží v rovine, preto a·r₁ + b·r₂ + c·r₃ + d = 0, teda a·r₁ + b·r₂ + c·r₃ = −d.\n\nZostane a·x₀ + b·y₀ + c·z₀ + d, presne čitateľ vzorca. Menovateľ |n| je dĺžka normály.',
    worked: {
      q: 'Aká je vzdialenosť bodu P = [1, 2, 3] od roviny ρ: 2x − y + 2z − 3 = 0?',
      steps: [
        'Vieme: P = [1, 2, 3], a = 2, b = −1, c = 2, d = −3.',
        'Hľadáme: vzdialenosť v(P, ρ).',
        'Použijeme vzorec pre vzdialenosť bodu od roviny.',
        'Čitateľ: |2·1 − 1·2 + 2·3 − 3| = |2 − 2 + 6 − 3| = |3| = 3.',
        'Menovateľ: √(2² + (−1)² + 2²) = √(4 + 1 + 4) = √9 = 3.',
        'v = 3 / 3 = 1.',
      ],
      result: 'v(P, ρ) = 1.',
    },
    check: {
      q: 'Po dosadení bodu P do rovnice roviny vyšla ľavá strana 0. Aká je vzdialenosť P od roviny?',
      options: ['0, bod leží v rovine', '1', 'Rovná sa |n|', 'Nedá sa určiť'],
      explain: 'Čitateľ je 0, teda aj vzdialenosť je 0. Bod, ktorý spĺňa rovnicu roviny, v nej leží.',
    },
  },
  {
    title: 'Vzdialenosť bodu od priamky',
    text: 'Na vzdialenosť bodu P od priamky (bod A, smer s) použiješ vektorový súčin. Vektory AP a s napínajú rovnobežník. Jeho obsah je |AP × s| a jeho základňa je |s|. Výška rovnobežníka je presne hľadaná vzdialenosť.\n\nPostup: 1. vektor AP = P − A, 2. vektorový súčin AP × s, 3. jeho dĺžka, 4. vydeliť dĺžkou s. Pozor, delíš dĺžkou smerového vektora, nie dĺžkou AP.',
    formula: {
      f: 'v(P, p) = |AP × s| / |s|',
      what: 'Vzdialenosť bodu P od priamky p: X = A + t·s',
      vars: [
        ['AP', 'vektor z bodu A priamky do bodu P'],
        ['|AP × s|', 'obsah rovnobežníka z AP a s'],
        ['|s|', 'dĺžka smerového vektora (základňa rovnobežníka)'],
      ],
    },
    deeper: 'Obsah rovnobežníka = základňa × výška. Ak je základňou vektor s, obsah je |s|·v, kde v je výška, teda kolmá vzdialenosť bodu P od priamky.\n\nObsah rovnobežníka poznáme aj ako |AP × s|. Z rovnosti |s|·v = |AP × s| vyjde v = |AP × s| / |s|.\n\nKontrola Pytagorovou vetou: AP je prepona, jeho priemet na priamku má dĺžku |AP·s| / |s| a vzdialenosť je druhá odvesna: v² = |AP|² − (AP·s)² / |s|².',
    worked: {
      q: 'Vypočítaj vzdialenosť bodu P = [2, 3, 1] od priamky p: X = [1, 1, 0] + t·(1, 2, 2).',
      steps: [
        'Vieme: A = [1, 1, 0], s = (1, 2, 2), P = [2, 3, 1].',
        'Hľadáme: vzdialenosť v(P, p).',
        'Použijeme v = |AP × s| / |s|, lebo výška rovnobežníka je hľadaná vzdialenosť.',
        'AP = P − A = (1, 2, 1).',
        'AP × s = (2·2 − 1·2, 1·1 − 1·2, 1·2 − 2·1) = (2, −1, 0), |AP × s| = √(4 + 1 + 0) = √5.',
        '|s| = √(1 + 4 + 4) = 3, takže v = √5 / 3 ≈ 0,745.',
        'Kontrola Pytagorom: |AP|² = 6, AP·s = 1 + 4 + 2 = 7, v² = 6 − 49/9 = 5/9, v = √5/3. Sedí.',
      ],
      result: 'v(P, p) = √5/3 ≈ 0,75.',
    },
  },
  {
    title: 'Vzdialenosť mimobežiek',
    text: 'Dve mimobežky majú najkratšiu vzdialenosť meranú po ich spoločnej kolmici (na obrázku žltá úsečka d v režime mimobežné). Vypočítaš ju cez zmiešaný súčin: rovnobežnosten z vektorov AB, s₁, s₂ má objem |[AB, s₁, s₂]| a podstavu s obsahom |s₁ × s₂|. Jeho výška je hľadaná vzdialenosť.\n\nA je bod prvej priamky, B bod druhej. Ak vyjde zmiešaný súčin 0, priamky ležia v jednej rovine a nie sú mimobežné (sú rôznobežné alebo rovnobežné).\n\nTýmto výpočtom zároveň overíš, či sú priamky mimobežné: ak nie sú rovnobežné a zmiešaný súčin je nenulový, ide o mimobežky.',
    fig: 'skew',
    formula: {
      f: 'v(p, q) = |[AB, s₁, s₂]| / |s₁ × s₂|',
      what: 'Vzdialenosť mimobežiek p: X = A + t·s₁ a q: X = B + r·s₂',
      vars: [
        ['[AB, s₁, s₂]', 'zmiešaný súčin = (s₁ × s₂)·AB, objem rovnobežnostena'],
        ['|s₁ × s₂|', 'obsah podstavy rovnobežnostena'],
        ['AB', 'vektor z bodu prvej priamky do bodu druhej'],
      ],
    },
    deeper: 'Objem rovnobežnostena = obsah podstavy × výška. Podstava je rovnobežník zo smerov s₁ a s₂ s obsahom |s₁ × s₂|. Vektor s₁ × s₂ je kolmý na obe priamky, je to smer ich spoločnej kolmice.\n\nVýška rovnobežnostena je to, koľko vektor AB „vytŕča“ v smere s₁ × s₂, a to je presne vzdialenosť mimobežiek. Preto v = objem / podstava = |[AB, s₁, s₂]| / |s₁ × s₂|.',
    worked: {
      q: 'Over, že priamky p: X = [1, 0, 0] + t·(1, 1, 0) a q: X = [0, 0, 2] + r·(0, 1, 1) sú mimobežné, a vypočítaj ich vzdialenosť.',
      steps: [
        'Vieme: A = [1, 0, 0], s₁ = (1, 1, 0), B = [0, 0, 2], s₂ = (0, 1, 1).',
        'Smery nie sú násobky (s₁ má z-ovú zložku 0, s₂ má x-ovú zložku 0), priamky nie sú rovnobežné.',
        'AB = B − A = (−1, 0, 2).',
        's₁ × s₂ = (1·1 − 0·1, 0·0 − 1·1, 1·1 − 1·0) = (1, −1, 1), |s₁ × s₂| = √3.',
        '[AB, s₁, s₂] = (s₁ × s₂)·AB = 1·(−1) + (−1)·0 + 1·2 = 1 ≠ 0, priamky sú mimobežné.',
        'v = |1| / √3 = 1/√3 ≈ 0,577.',
      ],
      result: 'Priamky sú mimobežné, v(p, q) = 1/√3 ≈ 0,58.',
    },
  },
  {
    title: 'Zhrnutie',
    text: 'Celá téma stojí na troch otázkach: aký je smerový vektor, aká je normála a ktorý súčin vektorov použiť. Keď si nevieš rady, nakresli si situáciu a pýtaj sa, ktoré vektory sú na seba kolmé alebo rovnobežné.\n\nTypické chyby: rovnaký parameter pre dve priamky, kosínus namiesto sínusu pri priamke a rovine, zabudnutá absolútna hodnota a zabudnuté delenie dĺžkou normály alebo smerového vektora.',
    bullets: [
      'Priamka: X = A + t·s (bod + násobok smeru), cez dva body s = B − A.',
      'Rovina: ax + by + cz + d = 0, normála n = (a, b, c); cez tri body n = AB × AC.',
      'Dve priamky: smery násobky → rovnobežné/totožné; inak sústava (parametre t a r) → priesečník alebo mimobežky.',
      'Priamka a rovina: s·n ≠ 0 → pretína; s·n = 0 → rovnobežná alebo leží v rovine; s = k·n → kolmá.',
      'Dve roviny: n₁ = k·n₂ → rovnobežné/totožné; inak priesečnica so smerom n₁ × n₂.',
      'Uhol priamok: cos φ = |s₁·s₂| / (|s₁|·|s₂|), uhol rovín rovnako cez normály.',
      'Uhol priamky a roviny: SÍNUS, sin φ = |s·n| / (|s|·|n|).',
      'Bod a rovina: v = |ax₀ + by₀ + cz₀ + d| / √(a² + b² + c²).',
      'Bod a priamka: v = |AP × s| / |s|.',
      'Mimobežky: v = |[AB, s₁, s₂]| / |s₁ × s₂|.',
    ],
  },
];

export default steps;
