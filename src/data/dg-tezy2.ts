import type { Teza } from './dg-tezy';

// Tézy na 2. písomku z Metód zobrazovania, presne podľa dokumentu od učiteľky
// „2 Test - okruh otazok a uloh“ (AIS, dokumentový server, 27. 10. 2026). Čísla otázok sú ako v dokumente
// (v perspektíve má dokument dvakrát číslo 14, druhú značíme 15).
// Odpovede podľa prednášok P4 až P7 a cvičení C5 až C8 (T. Rückschlossová).

export const TEZY2_SECTIONS = ['Axonometria', 'Lineárna perspektíva', 'Rotačné plochy', 'Geometrické základy fotogrametrie'];

const A = 'Axonometria', L = 'Lineárna perspektíva', R = 'Rotačné plochy', F = 'Geometrické základy fotogrametrie';

export const TEZY2: Teza[] = [
  // ───── AXONOMETRIA ─────
  {
    id: 'a1', sec: A, n: '1',
    q: 'Napíšte definíciu axonometrie.',
    a: 'Axonometria je rovnobežné premietanie bodov euklidovského priestoru E₃ do jednej axonometrickej priemetne, do ktorej sa premieta aj karteziánska sústava súradníc (O, x, y, z, j), pričom osi x, y, z sa premietajú do troch rôznych priamok.\nVýsledkom je axonometrická sústava (O, x, y, z, jx, jy, jz), jx, jy, jz sú axonometrické jednotky.',
  },
  {
    id: 'a2', sec: A, n: '2', pic: 'dg-ax-typy',
    q: 'Kedy je axonometria šikmá? Načrtnite, ako býva zadaná.',
    a: 'Šikmá je vtedy, keď smer premietania s nie je kolmý na axonometrickú priemetňu (kolmá: s ⊥ priemetňa).\nZadaná býva priemetmi osí x, y, z zo spoločného bodu O a axonometrickými jednotkami jx, jy, jz na nich (prípadne typom: vojenská, kavalierna, šikmé premietanie).',
  },
  {
    id: 'a3', sec: A, n: '3', pic: 'dg-pohlke',
    q: 'Napíšte Pohlkeho vetu. Načrtnite obrázok.',
    a: 'Tri úsečky v rovine, ktoré majú spoločný krajný bod a ležia na troch rôznych priamkach, možno vždy považovať za rovnobežný priemet troch navzájom kolmých, rovnako dlhých úsečiek so spoločným krajným bodom (t. j. jednotiek j na pravouhlých súradnicových osiach).\nNáčrt: tri ľubovoľné úsečky jx, jy, jz z bodu O a k nim doplnená kocka (rovnobežky s nimi).',
  },
  {
    id: 'a4', sec: A, n: '4',
    q: 'Čo platí pre axonometrický trojuholník a axonometrické jednotky v izometrii, dimetrii a trimetrii?',
    a: 'Izometria: jx = jy = jz, axonometrický trojuholník je rovnostranný (v kolmej izometrii zvierajú osi 120°).\nDimetria: dve jednotky sú rovnaké, tretia iná (jx = jy ≠ jz alebo jx = jz ≠ jy alebo jy = jz ≠ jx), trojuholník je rovnoramenný.\nTrimetria: všetky tri jednotky sú rôzne, trojuholník je rôznostranný.',
  },
  {
    id: 'a5', sec: A, n: '5', pic: 'dg-ax-typy',
    q: 'Opíšte vojenskú axonometriu (kavaliernu axonometriu, šikmé premietanie, všeobecnú šikmú axonometriu), napíšte, čo platí pre axonometrické osi a jednotky. Načrtnite obrázok.',
    a: 'Vojenská: priemetňa ∥ pôdorysňa, x ⊥ y, jx = jy = jz = j (smer premietania 45°). Zachová tvar útvarov v pôdorysni, vhodná na mapy, sídliská.\nKavalierna: priemetňa ∥ nárysňa (bokorysňa), x ⊥ z (alebo y ⊥ z), jx = jy = jz = j. Zachová tvar prednej steny, hĺbka nekrátená.\nŠikmé premietanie (kabinetná): x ⊥ z, jx = jz = j, jy < j (alebo y ⊥ z, jy = jz = j, jx < j), uhol premietania väčší ako 45°. Voľné rovnobežné premietanie: jy = j/2.\nVšeobecná šikmá: osi aj jednotky ľubovoľné, spĺňajú Pohlkeho vetu.',
  },
  {
    id: 'a6', sec: A, n: '6', draw: true, rys: 'dg-ax-kruh',
    q: 'V zadanej šikmej axonometrii zostrojte obraz kružnice k(S, r) v pôdorysni (nárysni, bokorysni). Zostrojte združené priemery elipsy, priečkovou konštrukciou body elipsy a elipsu načrtnite. Napíšte vzťah medzi jx, jy, jz a j. Napr. v kavaliernej axonometrii k(S, r) v pôdorysni, S(4, 5, 0), r = 3 cm.',
    a: '1. Bod S zostroj zo súradníc (4 na os x, potom 5 rovnobežne s y).\n2. Združené priemery: KL ∥ x, MN ∥ y, polomer r nanesený ako r·jx a r·jy (v kavaliernej jx = jy = jz = j).\n3. V K, L dotyčnice ∥ y, v M, N dotyčnice ∥ x → rovnobežník.\n4. Priečková konštrukcia: MS a MX rozdeľ na n dielov (1, 2, 3 a 1′, 2′, 3′), priesečníky L1 ∩ K1′, L2 ∩ K2′, L3 ∩ K3′ sú body elipsy. Rovnako v ostatných štvrtinách.\n5. Elipsu načrtni. Vzťah: kavalierna jx = jy = jz = j, šikmé premietanie jx = jz = j, jy < j (v nárysni sa kružnica zobrazí ako kružnica).',
  },

  // ───── LINEÁRNA PERSPEKTÍVA ─────
  {
    id: 'l1', sec: L, n: '1', pic: 'dg-sp-def',
    q: 'Napíšte definíciu stredového premietania, stačí svojimi slovami.',
    a: 'Je daná priemetňa π a bod S (stred premietania), ktorý v nej neleží. Stredový priemet bodu A je priesečník Aₛ priamky SA s priemetňou π. Všetky premietacie priamky prechádzajú bodom S.\n(Presnejšie v prednáške: bodu A sa priradí dvojica [A₁, Aₛ], kde A₁ je kolmý priemet a Aₛ stredový priemet do π.)',
  },
  {
    id: 'l2', sec: L, n: '2', pic: 'dg-sp-def',
    q: 'Čím je určené stredové premietanie? Načrtnite obrázok.',
    a: 'Vlastnou rovinou π (priemetňa) a vlastným bodom S ∉ π (stred premietania).\nNa papieri prvkami vnútornej orientácie: hlavný bod H a dištancia d, alebo dištančnou kružnicou (H; r = d).',
  },
  {
    id: 'l3', sec: L, n: '3', pic: 'dg-sp-def',
    q: 'Vysvetlite pojmy hlavný bod, dištancia, dištančná kružnica, načrtnite obrázok.',
    a: 'Hlavný bod H: kolmý priemet stredu premietania S do priemetne π.\nDištancia d = |SH|: vzdialenosť stredu premietania od priemetne.\nDištančná kružnica: kružnica v π so stredom H a polomerom d. Graficky určuje S aj d.',
  },
  {
    id: 'l4', sec: L, n: '4',
    q: 'Aké sú vlastnosti stredového premietania, porovnajte s rovnobežným premietaním, načrtnite obrázky.',
    a: 'Stredové: zachováva incidenciu, priamka (nie cez S) sa zobrazí ako priamka. Nezachováva rovnobežnosť (rovnobežky sa zbiehajú do úbežníka), deliaci pomer ani veľkosť (vzdialenejšie je menšie). Útvar v rovine ∥ π sa zobrazí podobný. Nie je bijektívne: bod Aₛ má veľa vzorov na premietacej priamke.\nRovnobežné: zachováva incidenciu, rovnobežnosť aj deliaci pomer, útvar v rovine ∥ π sa zobrazí zhodný.\nNáčrt: koľajnice v stredovom sa zbiehajú, v rovnobežnom ostanú rovnobežné.',
  },
  {
    id: 'l5', sec: L, n: '5',
    q: 'Čo je stredovým priemetom priamky, ktorá neprechádza stredom premietania? Načrtnite obrázok.',
    a: 'Priamka. Premietacie priamky jej bodov tvoria premietaciu rovinu cez S, jej priesečnica s π je obraz priamky. Obraz prechádza stopníkom priamky (priesečník s π) a jej úbežníkom.\n(Priamka cez S sa zobrazí ako bod, volá sa smerová priamka.)',
  },
  {
    id: 'l6', sec: L, n: '6', pic: 'dg-ubeznik',
    q: 'Vysvetlite pojmy úbežník priamky a úbežnica roviny, načrtnite obrázok.',
    a: 'Úbežník priamky je stredový priemet jej nevlastného bodu. Zostrojí sa ako priesečník π so smerovou priamkou (cez S rovnobežne s danou). Všetky rovnobežky majú spoločný úbežník.\nÚbežnica roviny je obraz nevlastnej priamky roviny: priesečnica π so smerovou rovinou (cez S rovnobežne s danou). Ležia na nej úbežníky všetkých priamok roviny. Príklad: horizont je úbežnica vodorovnej roviny.',
  },
  {
    id: 'l7', sec: L, n: '7', pic: 'dg-lp-pojmy',
    q: 'Napíšte definíciu lineárnej perspektívy, stačí vlastnými slovami, načrtnite obrázok.',
    a: 'Lineárna perspektíva je špeciálny prípad stredového premietania, v ktorom premietame útvary ležiace v zornom priestore. Ten je ohraničený rotačnou kužeľovou plochou s vrcholom S, osou o kolmou na priemetňu π a vrcholovým uhlom najviac 45°. Premietajú sa objekty spojené s vodorovnou predmetovou rovinou ρ.',
  },
  {
    id: 'l8', sec: L, n: '8', pic: 'dg-lp-pojmy',
    q: 'Vysvetlite pojmy základnica a horizont v lineárnej perspektíve, načrtnite obrázok.',
    a: 'Základnica z = π ∩ ρ: stopa predmetovej roviny ρ (priesečnica priemetne so zemou).\nHorizont h = π ∩ ρₛ, kde ρₛ je smerová rovina predmetovej roviny (cez S, ∥ ρ). Je to úbežnica predmetovej roviny, leží vo výške oka. Vo zvislej perspektíve prechádza hlavným bodom H.',
  },
  {
    id: 'l9', sec: L, n: '9',
    q: 'Čo je zorná kužeľová plocha? Čím je určená? Čo je dištančná kružnica? Čo je zorná kružnica? Načrtnite obrázok.',
    a: 'Zorná kužeľová plocha je rotačná kužeľová plocha, ktorá ohraničuje zorný priestor. Je určená vrcholom S, osou o kolmou na π (os záberu, ide cez H) a vrcholovým uhlom.\nDištančná kružnica: v π so stredom H a polomerom d.\nZorná kružnica: priesečník zornej kužeľovej plochy s priemetňou, stred H. Pre zorný uhol 90° má polomer d, teda splýva s dištančnou kružnicou (kz = d).',
  },
  {
    id: 'l10', sec: L, n: '10',
    q: 'Aké prvky LP si volíme, aby bola perspektíva správne zobrazená? Načrtnite obrázok.',
    a: 'Stred premietania S (oko, jeho polohu a výšku), os o zorného kužeľa (smer pohľadu, približne do stredu objektu) a priemetňu π kolmú na os o (napr. cez prednú hranu). Volíme ich tak, aby celý objekt ležal v zornom kuželi, teda jeho obraz vnútri zornej kružnice. Tým sú dané H, d, horizont h a základnica z.',
  },
  {
    id: 'l11', sec: L, n: '11', pic: 'dg-lp-polohy',
    q: 'Ako si volíme prvky perspektívy, ak chceme zobraziť objekt v priečelnej alebo nepriečelnej polohe? Načrtnite obrázok.',
    a: 'Priečelná: os o volíme kolmo na zvislú stenu objektu, priemetňa je rovnobežná s touto stenou. Stena sa zobrazí v skutočnom tvare (alebo podobne), hĺbkové hrany smerujú do H.\nNepriečelná: objekt je voči priemetni pootočený, žiadna stena nie je ∥ π. Vodorovné hrany majú dva vlastné úbežníky na horizonte.',
  },
  {
    id: 'l12', sec: L, n: '12',
    q: 'Vysvetlite rozdiel medzi stredovým premietaním a lineárnou perspektívou.',
    a: 'Stredové premietanie premieta celý priestor (okrem S) a stred aj priemetňa sú ľubovoľné. Lineárna perspektíva je jeho špeciálny prípad: premieta len zorný priestor (zorný kužeľ s osou kolmou na π), objekty stoja na predmetovej rovine ρ a pracuje sa so základnicou a horizontom. Zodpovedá ľudskému videniu a fotke.',
  },
  {
    id: 'l13', sec: L, n: '13', pic: 'dg-lp-vtacia',
    q: 'Čím sa líši šikmá a zvislá perspektíva? Načrtnite obrázok.',
    a: 'Zvislá: priemetňa π je kolmá na predmetovú rovinu ρ, os zorného kužeľa je vodorovná, horizont ide cez H a zvislé hrany sa zobrazia zvislo (úbežník zvislých priamok je nevlastný).\nŠikmá: π nie je kolmá na ρ (60° ≤ ω < 90°), os nie je vodorovná, horizont nejde cez H a zvislé hrany sa zbiehajú do vlastného úbežníka.',
  },
  {
    id: 'l14', sec: L, n: '14', pic: 'dg-lp-vtacia',
    q: 'Čím sa líši vtáčia a žabia perspektíva? Načrtnite obrázok.',
    a: 'Obe sú šikmé.\nŽabia: S je v ostrom uhle rovín π a ρ, pozorovateľ pozerá hore (z podhľadu), horizont je pod H, zvislé hrany sa zbiehajú hore.\nVtáčia: S je v tupom uhle rovín π a ρ, pozorovateľ pozerá dole (z nadhľadu), horizont je nad H, zvislé hrany sa zbiehajú dole.',
  },
  {
    id: 'l15', sec: L, n: '14 (druhá)',
    q: 'Vysvetlite rozdiel medzi lineárnou a nelineárnou perspektívou. Aké druhy nelineárnej perspektívy poznáte?',
    a: 'Lineárna premieta na rovinu, priamky sa zobrazia ako priamky. Nelineárna premieta na zakrivenú plochu (ktorú potom rozvinieme), priamky sa zobrazia ako krivky.\nDruhy: valcová (cylindrická, panoráma), kužeľová (kónická), guľová (sférická, „rybie oko“). Valcová a kužeľová sa uplatňujú v kartografii.',
  },

  // ───── ROTAČNÉ PLOCHY ─────
  {
    id: 'p1', sec: R, n: '1', pic: 'dg-rot',
    q: 'Definujte rotačnú plochu a pomenujte na nej dôležité prvky. Načrtnite obrázok.',
    a: 'Rotačná plocha vzniká rotáciou čiary k okolo priamky o, pričom k neleží na o ani v rovine kolmej na o.\nPrvky: os rotácie o, tvoriaca čiara k, rovnobežkové kružnice (v rovinách kolmých na os, stred na osi): rovník kR (lokálne max. polomer), hrdlo kH (lokálne min.), kráterová, všeobecná. Meridián: rez rovinou cez os, súmerný podľa osi, tvoria ho dva polmeridiány, všetky meridiány sú zhodné.',
  },
  {
    id: 'p2', sec: R, n: '2',
    q: 'Napíšte, aké druhy rotačných plôch poznáme.',
    a: 'Priamkové (rotuje priamka): valcová (p ∥ o), kužeľová (p rôznobežná s o), jednodielny rotačný hyperboloid (p mimobežná s o).\nCyklické (rotuje kružnica): guľová plocha, anuloid (toroid, axoid, melonoid), globoid.\nKvadratické (kužeľosečka okolo svojej osi).\nVšeobecné (ľubovoľná krivka).',
  },
  {
    id: 'p3', sec: R, n: '3',
    q: 'Charakterizujte kvadratické rotačné plochy.',
    a: 'Vznikajú rotáciou kužeľosečky okolo jej osi: guľová plocha, rotačný elipsoid (sploštený / pretiahnutý), rotačný paraboloid, rotačný hyperboloid jednodielny a dvojdielny. Singulárne: rotačná valcová plocha (meridián = dve rovnobežky) a rotačná kužeľová plocha (dve rôznobežky). Sú to plochy 2. stupňa, napr. guľa x² + y² + z² = r², elipsoid (x² + y²)/a² + z²/b² = 1.',
  },
  {
    id: 'p4', sec: R, n: '4', draw: true, rys: 'dg-gule2',
    q: 'Zostrojte prienik rotačných plôch (2 guľové plochy, 3 guľové plochy, časť anuloidu a guľová plocha).',
    a: 'Dve gule: spoločná os je spojnica stredov ₁O₂O, meridiány sa pretnú v K, K′. Prienik je kružnica k (rotácia K), v priemete úsečka KK′ kolmá na ₁O₂O.\nTri gule: dvojice dajú kružnice ₁k, ₂k, ₃k, ich spoločné body R, R′ majú priemet v priesečníku priemetov kružníc, výšku zistíš v sklopení roviny jednej kružnice. Ak sú priemery gúľ strany ostrouhlého △ABC, priemety kružníc sú výšky trojuholníka.\nAnuloid (melonoid z oblúka AB) a guľa so stredom na osi AB: prienik je kružnica, rotácia priesečníka K meridiánov.',
  },
  {
    id: 'p5', sec: R, n: '5', pic: 'dg-gula-valec',
    q: 'Načrtnite a popíšte, čo môže byť prienikom guľovej plochy a súosej valcovej plochy.',
    a: 'Dotyková valcová plocha (polomer = polomer gule): rovníková kružnica k.\nSečná valcová plocha (menší polomer): dve rovnobežkové kružnice ₁k, ₂k s rovnakým polomerom, súmerné podľa rovníka.\nVäčší polomer: prázdny prienik.',
  },
  {
    id: 'p6', sec: R, n: '6', pic: 'dg-gula-kuzel',
    q: 'Načrtnite a popíšte, čo môže byť prienikom guľovej plochy a súosej kužeľovej plochy.',
    a: 'Dotyková kužeľová plocha: jedna rovnobežková kružnica k (dotyková).\nSečná kužeľová plocha: dve rovnobežkové kružnice ₁k, ₂k (rôzne polomery).\nKužeľ mimo gule: prázdny prienik.',
  },

  // ───── FOTOGRAMETRIA ─────
  {
    id: 'f1', sec: F, n: '1',
    q: 'Čo je fotogrametria, ako ju rozdeľujeme, ako je chápaná projekcia snímky?',
    a: 'Fotogrametria je vedecká a technická disciplína, ktorá sa zaoberá získavaním informácií o tvare, rozmeroch a polohe objektov na základe ich fotografických snímok a ďalších obrazových záznamov (bez priameho kontaktu).\nDelenie: podľa spôsobu snímkovania pozemná (terestrická) a letecká, podľa počtu snímok jednosnímková a dvojsnímková (stereofotogrametria).\nSnímka je stredový priemet: projekčné centrum S, rovina snímky π.',
  },
  {
    id: 'f2', sec: F, n: '2',
    q: 'Pomenujte základné geometrické pojmy na fotogrametrickej snímke. Čo sú prvky vnútornej orientácie snímky?',
    a: 'S projekčné centrum, π rovina snímky, o os záberu (kolmá na π, cez S), H hlavný bod (o ∩ π), f = cₖ = |HS| konštanta kamery (ohnisková vzdialenosť), h horizont, hlavný úbežník (úbežník spádových priamok), snímkový nadir (úbežník zvislého smeru).\nPrvky vnútornej orientácie sú H a f. Určujú polohu projekčného centra voči rovine snímky.',
  },
  {
    id: 'f3', sec: F, n: '3',
    q: 'Aké druhy snímok poznáte?',
    a: 'Zvislá snímka (pozemná), zodpovedá zvislej perspektíve.\nŠikmá (sklonená) letecká snímka, zodpovedá vtáčej šikmej perspektíve.\nŠikmá pozemná snímka, zodpovedá žabej šikmej perspektíve.',
  },
  {
    id: 'f4', sec: F, n: '4',
    q: 'Presne vymenujte, čo je nutné poznať na snímke, aby bolo možné rekonštruovať prvky vnútornej orientácie.',
    a: '3 dvojice úbežníkov takých smerov, ktorých vzájomné uhly poznáme, pričom žiadne dve dvojice neurčujú tú istú množinu projekčných centier; v každej dvojici je aspoň jeden úbežník vlastný; aspoň jeden z úbežníkov neleží s ostatnými na jednej priamke.',
  },
  {
    id: 'f5', sec: F, n: '5', pic: 'dg-fg-mnoziny',
    q: 'Na akom útvare leží projekčné centrum S, ak poznáte 2 vlastné úbežníky dvoch smerov, ktoré zvierajú ostrý uhol α?',
    a: 'Na časti anuloidu (melonoide) s osou UaUb, ktorého meridiánom je oblúk s tetivou UaUb a obvodovým uhlom α. V rovine cez UaUb je to množina G(UaUb, α): dva súmerné kružnicové oblúky väčšie ako polkružnica (body Ua, Ub nepatria).',
  },
  {
    id: 'f6', sec: F, n: '6', pic: 'dg-fg-mnoziny',
    q: 'Na akom útvare leží S, ak poznáte 2 vlastné úbežníky dvoch smerov, ktoré zvierajú tupý uhol β?',
    a: 'Tiež na časti anuloidu s osou UaUb (meridián: oblúk s tetivou UaUb a obvodovým uhlom β). V rovine množina G(UaUb, β): dva súmerné oblúky menšie ako polkružnica (opačné časti kružníc ako pri ostrom uhle).',
  },
  {
    id: 'f7', sec: F, n: '7', pic: 'dg-fg-mnoziny',
    q: 'Na akom útvare leží S, ak poznáte 2 vlastné úbežníky dvoch smerov, ktoré zvierajú uhol 90°?',
    a: 'Na guľovej ploche s priemerom UaUb (bez bodov Ua, Ub). V rovine je to Tálesova kružnica nad UaUb.',
  },
  {
    id: 'f8', sec: F, n: '8', pic: 'dg-fg-nevl',
    q: 'Na akom útvare leží S, ak poznáte jeden vlastný a jeden nevlastný úbežník dvoch smerov, ktoré zvierajú uhol α, ktorý nie je pravý?',
    a: 'Na rotačnej kužeľovej ploche s vrcholom v bode Ua (vlastný úbežník), ktorej os je rovnobežná so smerom b (nevlastný úbežník) a povrchové priamky zvierajú s osou uhol α.',
  },
  {
    id: 'f9', sec: F, n: '9', pic: 'dg-fg-nevl',
    q: 'Na akom útvare leží S, ak poznáte jeden vlastný a jeden nevlastný úbežník dvoch smerov, ktoré zvierajú pravý uhol?',
    a: 'V rovine, ktorá prechádza vlastným úbežníkom Ua a je kolmá na smer b (nevlastného úbežníka).',
  },
  {
    id: 'f10', sec: F, n: '10', draw: true, rys: 'dg-fg-stvorec',
    q: 'Nájdite prvky vnútornej orientácie zvislej snímky útvaru (štvorca, obdĺžnika so známym pomerom strán, pravidelného šesťuholníka a pod.).',
    a: 'Štvorec: Ua, Ub (strany, 90°) → guľa nad UaUb; Ub, Uu (strana, uhlopriečka, 45°) → melonoid; prienik je kružnica k. Ua, Uc (strana, zvislica, 90°, Uc nevlastný) → rovina cez h. V sklopení: Tálesova kružnica nad UaUb ∩ oblúky G(UuUb, 45°) = (S), (S′). H = päta kolmice z (S) na h, f = |(S)H| (polomer k).\nObdĺžnik a : b: uhol uhlopriečky so stranou φ, tg φ = b/a (pre 7 : 3 asi 23,2°). Šesťuholník: smery strán 60° (120°), dvojice úbežníkov dajú melonoidy. Vždy H na horizonte, f = polomer kružnice k.',
  },
  {
    id: 'f11', sec: F, n: '11', draw: true, rys: 'dg-fg-kvader',
    q: 'Nájdite prvky vnútornej orientácie šikmej snímky kvádra.',
    a: 'Úbežníky Ua, Ub, Uc troch navzájom kolmých hrán: každá dvojica 90° → gule s priemermi UaUb, UbUc, UaUc. Prienik dvoch gúľ je kružnica, jej kolmý priemet je výška trojuholníka UaUbUc. H = priesečník výšok (k₁ ∩ l₁ ∩ n₁).\nf: sklop rovinu kružnice k (priemer UcP, P päta výšky): Tálesova polkružnica nad UcP, kolmica v H ju pretne v (S), f = |(S)H|.',
  },
];
