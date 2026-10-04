import type { Step } from '../steps';

// Prednáška 2.9 (str. 45–47): EM vlna, rýchlosť, index lomu, polarizácia. Cvičenie 8: príklady 28–29.

const steps: Step[] = [
  {
    title: 'Čo je elektromagnetická vlna',
    text: 'Svetlo zo Slnka, signál mobilu, Wi-Fi, rádio, mikrovlnka aj röntgen v nemocnici majú jedno spoločné: všetko sú to elektromagnetické (skrátene EM) vlny. Líšia sa len tým, aká dlhá je jedna vlna. Fyzikálne je to stále tá istá vec.\n\nPre geodeta je to dôležité dvojnásobne. Totálna stanica meria vzdialenosť pomocou svetelného alebo infračerveného lúča a GNSS prijímač (GPS) zachytáva rádiové vlny z družíc. Keď vieš, ako a ako rýchlo sa EM vlna šíri, rozumieš, prečo tieto prístroje vôbec fungujú.\n\nV mechanickej vlne (zvuk, vlna na lane) kmitajú častice látky. V EM vlne nekmitá žiadna látka – kmitá elektrické a magnetické pole. Preto EM vlna nepotrebuje vzduch ani vodu a prejde aj prázdnym vesmírom, teda vákuom.',
    analogy: 'Mexická vlna na štadióne potrebuje divákov – bez nich nie je čo dvíhať. Tak je na tom zvuk: potrebuje vzduch. Svetlo nepotrebuje nič, preto k nám doletí zo Slnka cez prázdny vesmír.',
    check: {
      q: 'Prečo zo Zeme vidíme Slnko, ale nepočujeme ho?',
      options: [
        'Svetlo (EM vlna) sa šíri aj vákuom, zvuk potrebuje látku',
        'Zvuk je príliš pomalý a nestihne doletieť',
        'Slnko nevydáva žiadne kmity',
        'Zvuk sa cestou mení na svetlo',
      ],
      explain: 'Medzi Slnkom a Zemou je takmer dokonalé vákuum. Zvuk je mechanická vlna – kmitajú pri ňom častice vzduchu, a kde nie sú častice, zvuk sa nešíri. EM vlna je kmitanie poľa a to sa vákuom šíri bez problémov.',
    },
  },
  {
    title: 'Elektrické a magnetické pole',
    text: 'Pole je vlastnosť priestoru: v každom bode hovorí, akou silou by tam pôsobilo na nejaké teleso. Gravitačné pole Zeme nevidíš, ale cítiš ho – ťahá každé teleso nadol.\n\nElektrické pole (značka E) pôsobí silou na elektrické náboje, napríklad na elektróny v anténe. Magnetické pole (značka B) pôsobí na magnety a na pohybujúce sa náboje – preto sa strelka kompasu natáča k severu.\n\nKľúčový objav 19. storočia (Faraday, Maxwell): meniace sa elektrické pole vytvára magnetické pole a meniace sa magnetické pole vytvára elektrické. Jedno „rodí“ druhé a takto sa spolu posúvajú priestorom. To je elektromagnetická vlna.',
    analogy: 'Dvaja štafetoví bežci si neustále podávajú kolík: E vytvorí B, B vytvorí E, a tak stále dokola. Celá dvojica sa pritom rúti dopredu rýchlosťou svetla.',
    deeper: 'Jednotky: intenzita elektrického poľa E sa meria vo voltoch na meter [V/m], magnetická indukcia B v teslách [T].\n\nNavyše (nie je to v prednáške, ale hodí sa): vo vákuu sú amplitúdy oboch zložiek previazané vzťahom E₀ = c₀·B₀. Napríklad pre E₀ = 300 V/m je B₀ = 300 / (3·10⁸) = 1·10⁻⁶ T = 1 μT. Magnetická zložka nie je „slabšia“ – len jednotky sú také, že číslo vyjde malé.',
  },
  {
    title: 'Ako vyzerá EM vlna',
    text: 'Pozri sa na obrázok. Vlna letí doprava. Ružová krivka je elektrické pole E – kmitá hore a dole. Modrá krivka je magnetické pole B – kmitá „do hĺbky“, teda kolmo na E aj na smer letu.\n\nVšimni si, že keď je ružová vlna najvyššie, aj modrá je najďalej od osi, a keď ružová prechádza nulou, aj modrá je nulová. Hovoríme, že E a B kmitajú synfázne – v rovnakej fáze, ako dvaja tanečníci, ktorí robia ten istý pohyb naraz.\n\nZ prednášky si zapamätaj štyri vlastnosti EM vlny, ktoré sú v odrážkach. Na skúške sa na ne často pýtajú ako na „teóriu“.',
    fig: 'fyz:em',
    bullets: [
      'EM vlna je priečne vlnenie – E aj B kmitajú kolmo na smer šírenia.',
      'Vektor E je kolmý na vektor B.',
      'E a B kmitajú synfázne (maximá aj nuly majú v rovnakom mieste a v rovnakom čase).',
      'Šíri sa aj vo vákuu, nepotrebuje žiadnu látku.',
    ],
    check: {
      q: 'Ako sú navzájom orientované vektor E, vektor B a smer šírenia EM vlny?',
      options: [
        'Všetky tri sú navzájom kolmé',
        'E a B sú rovnobežné, smer šírenia je na ne kolmý',
        'E kmitá v smere šírenia, B kolmo naň',
        'B kmitá v smere šírenia, E kolmo naň',
      ],
      explain: 'EM vlna je priečna, takže E aj B sú kolmé na smer šírenia. Navyše sú kolmé aj na seba. Sú to tri navzájom kolmé smery – ako tri hrany kocky vychádzajúce z jedného rohu.',
    },
  },
  {
    title: 'Vlnová funkcia EM vlny',
    text: 'Rovnako ako mechanickú vlnu vieme aj EM vlnu zapísať vzorcom. V prednáške sa vlna šíri v smere osi y, elektrické pole kmitá v smere osi z a magnetické v smere osi x.\n\nZápis (0; 0; E_z) znamená vektor, ktorý má len z-ovú zložku – šípku pozdĺž osi z. Funkcia sin(ω·t − k·y) hovorí, ako sa veľkosť tejto šípky mení v čase t a na mieste y. Obe zložky majú ten istý sínus, a presne to znamená „synfázne“.\n\nUhlová frekvencia ω = 2π·f hovorí, ako rýchlo pole kmitá na jednom mieste. Vlnové číslo k = 2π/λ hovorí, ako rýchlo sa mení fáza, keď sa posunieš v priestore. Rýchlosť vlny je c = ω/k = λ·f.',
    formula: {
      f: 'E(y; t) = (0; 0; E_z) · sin(ω·t − k·y)     B(y; t) = (B_x; 0; 0) · sin(ω·t − k·y)',
      what: 'Rovinná EM vlna šíriaca sa v smere osi y (E v smere z, B v smere x)',
      vars: [
        ['E_z', 'amplitúda elektrickej zložky [V/m]'],
        ['B_x', 'amplitúda magnetickej zložky [T]'],
        ['ω', 'uhlová frekvencia, ω = 2π·f [rad/s]'],
        ['k', 'vlnové číslo, k = 2π/λ [rad/m]'],
        ['t', 'čas [s]'],
        ['y', 'poloha v smere šírenia [m]'],
      ],
    },
    worked: {
      q: 'EM vlna s frekvenciou f = 5 MHz sa šíri vákuom (c₀ = 3·10⁸ m/s). Urči vlnovú dĺžku λ, uhlovú frekvenciu ω a vlnové číslo k.',
      steps: [
        'Vieme: f = 5 MHz = 5·10⁶ Hz (mega = milión), c₀ = 3·10⁸ m/s.',
        'Hľadáme: λ, ω, k.',
        'Vlnová dĺžka z c = λ·f: λ = c₀/f = 3·10⁸ / 5·10⁶ = 60 m.',
        'Uhlová frekvencia: ω = 2π·f = 2π · 5·10⁶ ≈ 3,14·10⁷ rad/s.',
        'Vlnové číslo: k = 2π/λ = 2π/60 ≈ 0,105 rad/m.',
        'Kontrola: ω/k = 3,14·10⁷ / 0,105 ≈ 3·10⁸ m/s = c₀ ✓.',
      ],
      result: 'λ = 60 m, ω ≈ 3,14·10⁷ rad/s, k ≈ 0,105 rad/m.',
    },
    deeper: 'Prečo je vo vzorci ω·t − k·y (s mínusom)? Sleduj jeden vrchol vlny. Na ňom má fáza ω·t − k·y stále tú istú hodnotu. Keď čas t rastie, musí rásť aj y, aby rozdiel ostal rovnaký – vrchol sa teda posúva k väčším y. Mínus znamená, že vlna ide v kladnom smere osi y.\n\nRýchlosť vrcholu: z ω·t − k·y = konšt. vyjadríš y = (ω/k)·t − konšt./k, takže vrchol sa pohybuje rýchlosťou ω/k. Keďže ω = 2π·f a k = 2π/λ, vyjde ω/k = λ·f.\n\nNavyše: smer šírenia je vždy daný „pravidlom pravej ruky“ – z × x = y. Ak poznáš smer E a B, poznáš aj smer, kam vlna letí.',
  },
  {
    title: 'Rýchlosť vo vákuu: c₀',
    text: 'Ako rýchlo letí EM vlna, určujú dve vlastnosti prostredia. Permitivita ε (epsilon) hovorí, ako prostredie reaguje na elektrické pole. Permeabilita μ (mí) hovorí, ako reaguje na magnetické pole.\n\nAj prázdny priestor má tieto vlastnosti – sú to prírodné konštanty ε₀ (permitivita vákua) a μ₀ (permeabilita vákua). Keď ich dosadíš do vzorca, vyjde rýchlosť svetla vo vákuu c₀ ≈ 3·10⁸ m/s, teda 300 000 km za sekundu. Za jednu sekundu by svetlo obletelo Zem asi 7,5-krát.\n\nDôležité: vo vákuu letia všetky EM vlny rovnako rýchlo – rádiové aj röntgenové. Rýchlosť vo vákuu nezávisí od frekvencie.',
    formula: {
      f: 'c₀ = 1 / √(ε₀ · μ₀) ≈ 3·10⁸ m/s',
      what: 'Rýchlosť EM vlny vo vákuu',
      vars: [
        ['c₀', 'rýchlosť svetla vo vákuu [m/s]'],
        ['ε₀', 'permitivita vákua, 8,854·10⁻¹² F/m (farad na meter)'],
        ['μ₀', 'permeabilita vákua, 1,257·10⁻⁶ H/m (henry na meter)'],
      ],
    },
    worked: {
      q: 'Over z hodnôt ε₀ = 8,854·10⁻¹² F/m a μ₀ = 1,257·10⁻⁶ H/m, že c₀ ≈ 3·10⁸ m/s.',
      steps: [
        'Vieme: ε₀ = 8,854·10⁻¹² F/m, μ₀ = 1,257·10⁻⁶ H/m.',
        'Hľadáme: c₀. Použijeme c₀ = 1/√(ε₀·μ₀), lebo je to vzorec pre vákuum.',
        'Súčin: 8,854 · 1,257 ≈ 11,13 a 10⁻¹² · 10⁻⁶ = 10⁻¹⁸ (mocniny sa pri násobení sčítajú), spolu ε₀·μ₀ ≈ 11,13·10⁻¹⁸ s²/m².',
        'Odmocnina: √(11,13·10⁻¹⁸) = √11,13 · 10⁻⁹ ≈ 3,336·10⁻⁹ s/m (párny exponent sa odmocní ľahko: polovica z −18 je −9).',
        'Prevrátená hodnota: c₀ = 1 / (3,336·10⁻⁹) ≈ 2,998·10⁸ m/s.',
        'Kontrola jednotiek: F·H = s², takže 1/√(s²/m²) = m/s ✓.',
      ],
      result: 'c₀ ≈ 2,998·10⁸ m/s ≈ 3·10⁸ m/s.',
    },
  },
  {
    title: 'Rýchlosť v látke a index lomu',
    text: 'V látke (sklo, voda, parafín) sú permitivita a permeabilita iné ako vo vákuu, spravidla väčšie. Preto je tam EM vlna pomalšia: c = 1/√(ε·μ).\n\nPohodlnejšie je porovnávať s vákuom. Relatívna permitivita εᵣ = ε/ε₀ hovorí, koľkokrát je ε väčšia ako vo vákuu, podobne relatívna permeabilita μᵣ = μ/μ₀. Sú to čísla bez jednotky. Väčšina látok (sklo, voda, plasty) má μᵣ ≈ 1 – voláme ich nemagnetické.\n\nIndex lomu n hovorí, koľkokrát je vlna v látke pomalšia ako vo vákuu: n = c₀/c. Po dosadení vzorcov vyjde jednoduché n = √(εᵣ·μᵣ). Vo vákuu je n = 1, v každej látke n > 1.',
    formula: {
      f: 'c = 1 / √(ε · μ)     n = c₀ / c = √(εᵣ · μᵣ)',
      what: 'Rýchlosť EM vlny v látke a index lomu',
      vars: [
        ['c', 'rýchlosť EM vlny v látke [m/s]'],
        ['ε, μ', 'permitivita [F/m] a permeabilita [H/m] látky'],
        ['εᵣ = ε/ε₀', 'relatívna permitivita (bez jednotky)'],
        ['μᵣ = μ/μ₀', 'relatívna permeabilita (bez jednotky), pre nemagnetické látky 1'],
        ['n', 'index lomu (bez jednotky), n ≥ 1'],
      ],
    },
    worked: {
      q: 'Pri predvádzaní lomu EM vĺn použil Hertz parafínový hranol. Urči index lomu parafínu, ak jeho permitivita je 2 a permeabilita 1 (príklad 28 z 8. cvičenia).',
      steps: [
        'Vieme: εᵣ = 2, μᵣ = 1 (hodnoty bez jednotky sú relatívne – „koľkokrát viac ako vákuum“).',
        'Hľadáme: index lomu n.',
        'Použijeme n = √(εᵣ·μᵣ), lebo poznáme práve relatívnu permitivitu a permeabilitu.',
        'Dosadíme: n = √(2 · 1) = √2.',
        'Vypočítame: n ≈ 1,41.',
        'Kontrola: n > 1 ✓. Rýchlosť v parafíne c = c₀/n ≈ 3·10⁸ / 1,41 ≈ 2,12·10⁸ m/s – menšia ako vo vákuu ✓.',
      ],
      result: 'n = √2 ≈ 1,41.',
    },
    deeper: 'Odvodenie n = √(εᵣ·μᵣ):\n\nn = c₀/c = [1/√(ε₀·μ₀)] / [1/√(ε·μ)] = √(ε·μ) / √(ε₀·μ₀) = √((ε/ε₀)·(μ/μ₀)) = √(εᵣ·μᵣ).\n\nPozor na pascu: voda má pre pomaly sa meniace pole εᵣ ≈ 81, ale √81 = 9 nie je jej index lomu pre svetlo (ten je 1,33). Permitivita totiž závisí od frekvencie – pri frekvencii svetla je εᵣ vody len asi 1,77 a √1,77 ≈ 1,33. Na skúške jednoducho dosaď hodnoty zo zadania.',
    check: {
      q: 'Látka má εᵣ = 4 a μᵣ = 1. Koľkokrát je v nej EM vlna pomalšia ako vo vákuu?',
      options: ['2-krát', '4-krát', '16-krát', '0,5-krát'],
      explain: 'Koľkokrát je vlna pomalšia, udáva index lomu: n = √(εᵣ·μᵣ) = √(4·1) = 2. Častá chyba je zabudnúť na odmocninu a povedať 4.',
    },
  },
  {
    title: 'Prechod do iného prostredia: čo sa mení',
    text: 'Keď EM vlna prejde z jednej látky do druhej, frekvencia f ostane rovnaká. Rozhranie ju „odovzdá“ ďalej v rovnakom rytme – koľko kmitov za sekundu príde, toľko aj odíde.\n\nMení sa rýchlosť, a preto aj vlnová dĺžka: λ = c/f. V látke s indexom lomu n je λ = λ₀/n, teda n-krát kratšia ako vo vákuu. Keď vlna z látky vyjde späť do vákua, λ sa zasa n-krát predĺži.\n\nTypická chyba: myslieť si, že sa mení frekvencia. Nemení! Farba svetla je daná frekvenciou, preto červené svetlo ostane červené aj pod vodou.',
    analogy: 'Rad vojakov pochoduje z asfaltu do blata. Kroky robia stále v rovnakom rytme (frekvencia sa nemení), ale v blate sú kroky kratšie (kratšia vlnová dĺžka), a preto celý rad postupuje pomalšie (menšia rýchlosť).',
    formula: {
      f: 'λ = c / f     λ = λ₀ / n',
      what: 'Vlnová dĺžka v látke (frekvencia sa pri prechode nemení)',
      vars: [
        ['λ₀', 'vlnová dĺžka vo vákuu [m]'],
        ['λ', 'vlnová dĺžka v látke [m]'],
        ['n', 'index lomu látky'],
        ['f', 'frekvencia – rovnaká v oboch prostrediach [Hz]'],
      ],
    },
    worked: {
      q: 'EM vlna s frekvenciou 5 MHz prechádza z nemagnetického prostredia s permitivitou 2 do vákua. O koľko sa zväčší jej vlnová dĺžka? (príklad 29 z 8. cvičenia)',
      steps: [
        'Vieme: f = 5·10⁶ Hz, εᵣ = 2, nemagnetické prostredie → μᵣ = 1, c₀ = 3·10⁸ m/s.',
        'Hľadáme: Δλ = λ₀ − λ (rozdiel vlnovej dĺžky vo vákuu a v látke).',
        'Index lomu látky: n = √(εᵣ·μᵣ) = √2 ≈ 1,414.',
        'Vo vákuu: λ₀ = c₀/f = 3·10⁸ / 5·10⁶ = 60 m.',
        'V látke: λ = λ₀/n = 60/1,414 ≈ 42,4 m (frekvencia je rovnaká, rýchlosť je √2-krát menšia).',
        'Rozdiel: Δλ = 60 − 42,4 ≈ 17,6 m.',
        'Kontrola: λ₀/λ = 60/42,4 ≈ 1,41 = √2 ✓. Vo vákuu je vlna rýchlejšia, preto dlhšia ✓.',
      ],
      result: 'Vlnová dĺžka sa zväčší zo 42,4 m na 60 m, teda o ≈ 17,6 m (√2-krát).',
    },
    check: {
      q: 'Svetlo prejde zo vzduchu do vody. Čo sa NEzmení?',
      options: ['frekvencia', 'rýchlosť', 'vlnová dĺžka', 'smer lúča pri šikmom dopade'],
      explain: 'Frekvencia je daná zdrojom a rozhranie ju nezmení. Vo vode je svetlo pomalšie, takže sa skráti vlnová dĺžka λ = c/f a pri šikmom dopade sa lúč aj zlomí (zmení smer).',
    },
  },
  {
    title: 'c = λ·f v praxi: rádio, GPS, svetlo',
    text: 'Obrázok pripomína: vlnová dĺžka λ je vzdialenosť dvoch susedných vrcholov a za jednu periódu sa vlna posunie presne o λ. Preto c = λ·f. Pre EM vlny vo vákuu (a prakticky aj vo vzduchu) je c = c₀ = 3·10⁸ m/s.\n\nVďaka tomu z frekvencie hneď dostaneš vlnovú dĺžku a naopak. Rádio FM na 100 MHz má λ = 3 m, Wi-Fi na 2,4 GHz má λ = 12,5 cm, zelené svetlo s λ = 500 nm má frekvenciu 6·10¹⁴ Hz.\n\nPozor na predpony: k (kilo) = 10³, M (mega) = 10⁶, G (giga) = 10⁹; nm (nanometer) = 10⁻⁹ m, μm (mikrometer) = 10⁻⁶ m. Väčšina chýb vo výpočtoch je práve v predponách.',
    fig: 'lambda',
    formula: {
      f: 'c₀ = λ · f',
      what: 'Vzťah rýchlosti, vlnovej dĺžky a frekvencie (vo vákuu)',
      vars: [
        ['c₀', 'rýchlosť svetla vo vákuu, 3·10⁸ m/s'],
        ['λ', 'vlnová dĺžka [m]'],
        ['f', 'frekvencia [Hz = 1/s]'],
      ],
    },
    worked: {
      q: 'Družice GPS vysielajú signál L1 s frekvenciou 1575,42 MHz. Aká je jeho vlnová dĺžka?',
      steps: [
        'Vieme: f = 1575,42 MHz = 1575,42·10⁶ Hz ≈ 1,575·10⁹ Hz, c₀ = 3·10⁸ m/s.',
        'Hľadáme: λ.',
        'Použijeme c₀ = λ·f, lebo signál sa šíri (prakticky) vákuom a vzduchom. Vyjadríme λ = c₀/f.',
        'Dosadíme: λ = 3·10⁸ / 1,575·10⁹ ≈ 0,190 m.',
        'Kontrola: Wi-Fi s vyššou frekvenciou 2,4 GHz má 12,5 cm, GPS s nižšou frekvenciou musí mať dlhšiu vlnu ✓.',
      ],
      result: 'λ ≈ 0,19 m = 19 cm. Geodetické GNSS prijímače merajú aj fázu tejto vlny, a tak dosahujú presnosť na centimetre až milimetre.',
    },
  },
  {
    title: 'Elektromagnetické spektrum',
    text: 'Všetky EM vlny sú rovnakého druhu, líšia sa len vlnovou dĺžkou (a teda frekvenciou). Keď ich zoradíme podľa λ, dostaneme spektrum. Na obrázku sú vľavo kratšie vlny (gama, röntgen, UV) a vpravo dlhšie (IR, mikrovlny, rádio). Ľudské oko vidí iba úzky farebný pásik od 380 nm (fialová) po 760 nm (červená) – to nazývame svetlo.\n\nČím kratšia vlna, tým vyššia frekvencia a tým viac energie nesie. Preto UV žiarenie spáli pokožku a röntgen prejde telom, kým rádiové vlny sú pre nás neškodné.\n\nHranice medzi oblasťami nie sú ostré, sú to približné dohody. Podstatné je poradie.',
    fig: 'spectrum',
    bullets: [
      'gama: kratšie ako ≈ 0,01 nm (rádioaktivita)',
      'röntgen: ≈ 0,01 nm až 10 nm (lekárske snímky)',
      'ultrafialové (UV): ≈ 10 nm až 380 nm (opaľovanie)',
      'viditeľné svetlo: 380 nm až 760 nm (fialová, modrá, zelená, žltá, oranžová, červená)',
      'infračervené (IR): 760 nm až ≈ 1 mm (teplo, diaľkomery, diaľkové ovládače)',
      'mikrovlny: ≈ 1 mm až ≈ 1 m (mikrovlnka, Wi-Fi, GPS, radar)',
      'rádiové vlny: dlhšie ako ≈ 1 m (rozhlas, televízia)',
    ],
    check: {
      q: 'Ktoré z týchto žiarení má najväčšiu frekvenciu?',
      options: ['röntgenové', 'červené svetlo', 'infračervené', 'rádiové vlny'],
      explain: 'Frekvencia f = c₀/λ, takže najkratšia vlnová dĺžka znamená najväčšiu frekvenciu. Z ponúknutých má najkratšiu λ röntgen (nanometre a menej).',
    },
  },
  {
    title: 'Polarizácia: ako kmitá vektor E',
    text: 'Pri priečnej vlne nestačí povedať, že kmitá kolmo na smer šírenia – kolmých smerov je nekonečne veľa. Polarizácia je vlastnosť priečnych vĺn, ktorá určuje geometrickú orientáciu kmitov v rovine kolmej na smer šírenia.\n\nPri EM vlne sa podľa dohody sleduje elektrický vektor E. Predstav si, že sa pozeráš proti prichádzajúcej vlne a sleduješ koniec šípky E. Na obrázku to vidíš: koniec šípky kreslí úsečku, kružnicu alebo elipsu – a podľa toho hovoríme o lineárnej, kruhovej alebo eliptickej polarizácii.\n\nPozdĺžna vlna (napríklad zvuk vo vzduchu) polarizovaná byť nemôže. Jej kmity idú v smere šírenia, takže v kolmej rovine nie je nič, čo by sa dalo orientovať.',
    fig: 'polar',
    analogy: 'Prevlečieš lano cez plot so zvislými latkami. Keď lanom kmitáš hore-dole, vlna prejde. Keď kmitáš do strán, latky ju zastavia. Takto funguje polarizačný filter, napríklad v slnečných okuliaroch – prepustí len kmity v jednom smere.',
    check: {
      q: 'Ktorá vlna NEMÔŽE byť polarizovaná?',
      options: ['zvuk vo vzduchu', 'svetlo', 'rádiová vlna', 'vlna na napnutom lane'],
      explain: 'Polarizácia je vlastnosť priečnych vĺn. Zvuk vo vzduchu je pozdĺžna vlna – častice kmitajú v smere šírenia, a preto nemá zmysel hovoriť o orientácii kmitov v kolmej rovine. Svetlo, rádiová vlna aj vlna na lane sú priečne.',
    },
  },
  {
    title: 'Lineárna, kruhová a eliptická polarizácia',
    text: 'Lineárna polarizácia: koniec vektora E kmitá po úsečke tam a späť. Smer kmitania je stále ten istý, mení sa len veľkosť a znamienko. Takto je polarizovaná napríklad vlna z rovnej (tyčovej) antény alebo svetlo mnohých laserov.\n\nKruhová polarizácia: vektor E má stále rovnakú dĺžku, ale otáča sa – jeho koniec opisuje kružnicu. Eliptická polarizácia: vektor sa otáča a pritom mení dĺžku, koniec opisuje elipsu. Úsečka aj kružnica sú vlastne špeciálne prípady elipsy (úplne stlačená elipsa, alebo elipsa s rovnakými polosami).\n\nPri kruhovej aj eliptickej polarizácii rozlišujeme smer otáčania: pravotočivú a ľavotočivú. Signály GPS sú napríklad pravotočivo kruhovo polarizované – preto má GNSS anténa špeciálnu konštrukciu.',
    bullets: [
      'lineárna: koniec E opisuje úsečku',
      'kruhová: koniec E opisuje kružnicu (pravotočivá alebo ľavotočivá)',
      'eliptická: koniec E opisuje elipsu (pravotočivá alebo ľavotočivá)',
      'vždy sa pozeráme do roviny kolmej na smer šírenia',
    ],
  },
  {
    title: 'Ako vzniká kruhová a eliptická polarizácia',
    text: 'Kruhová a eliptická polarizácia vzniká zložením (interferenciou) dvoch lineárne polarizovaných vĺn, ktoré majú rovnakú frekvenciu (sú koherentné), šíria sa rovnakým smerom (os y), jedna kmitá v smere osi x a druhá v smere osi z a sú voči sebe fázovo posunuté o φ₀.\n\nJe to presne to isté ako skladanie dvoch navzájom kolmých kmitov z kapitoly o kmitoch. Na obrázku nechaj pomer 1:1 a meň fázu: pri φ = 0 a φ = π vznikne úsečka, pri π/2 kružnica, pri π/4 elipsa.\n\nAk chceš zistiť, akú krivku koniec E kreslí, vylúčiš z oboch rovníc čas (parameter t). Dostaneš rovnicu elipsy, z ktorej vyčítaš všetky špeciálne prípady. Amplitúdy tu označujeme a a b (v prednáške E0x a E0z).',
    fig: 'fyz:skladanie',
    formula: {
      f: 'E_x = a · sin(ω·t − k·y)     E_z = b · sin(ω·t − k·y + φ₀)     (E_x/a)² + (E_z/b)² − 2·(E_x/a)·(E_z/b)·cos φ₀ = sin² φ₀',
      what: 'Dve kolmé lineárne polarizované vlny a krivka, ktorú spolu kreslí koniec vektora E',
      vars: [
        ['E_x, E_z', 'zložky elektrického poľa v smere osí x a z [V/m]'],
        ['a, b', 'amplitúdy zložiek (v prednáške E0x, E0z) [V/m]'],
        ['φ₀', 'vzájomný fázový posun [rad]'],
        ['ω, k', 'rovnaká uhlová frekvencia a vlnové číslo oboch vĺn'],
      ],
    },
    deeper: 'Odvodenie rovnice elipsy. Označ θ = ω·t − k·y, u = E_x/a a v = E_z/b. Potom u = sin θ a v = sin(θ + φ₀) = sin θ·cos φ₀ + cos θ·sin φ₀.\n\nZ toho v − u·cos φ₀ = cos θ·sin φ₀. Umocníme na druhú a použijeme cos² θ = 1 − sin² θ = 1 − u²: v² − 2uv·cos φ₀ + u²·cos² φ₀ = (1 − u²)·sin² φ₀. Presunieme u²·sin² φ₀ doľava a využijeme cos² + sin² = 1: u² + v² − 2uv·cos φ₀ = sin² φ₀.\n\nŠpeciálne prípady: pre φ₀ = n·π je sin φ₀ = 0 a cos φ₀ = (−1)ⁿ, rovnica sa zmení na (u − (−1)ⁿ·v)² = 0, teda E_z = (−1)ⁿ·(b/a)·E_x – priamka, lineárna polarizácia. Pre φ₀ = (2n + 1)·π/2 je cos φ₀ = 0 a sin² φ₀ = 1, takže u² + v² = 1 – elipsa s osami v smere x a z; ak navyše a = b, dostaneš E_x² + E_z² = a² – kružnicu.',
  },
  {
    title: 'Riešime: aká je polarizácia?',
    text: 'Postup pri úlohe „aká je polarizácia výslednej vlny“ je vždy rovnaký. Najprv skontroluj, či majú obe zložky rovnakú frekvenciu a rovnaký smer šírenia – inak sa stála polarizácia nevytvorí. Potom sa pozri na fázový posun φ₀ a na amplitúdy a, b a použi odrážky.\n\nPozor na fázu: zadáva sa v radiánoch (π/2 = 90°, π = 180°). A pozor na častú chybu: dve kolmé zložky sa nikdy navzájom „nevyrušia“, aj keď sú v protifáze – ležia v rôznych smeroch, takže ich súčet je šikmá šípka, nie nula.',
    bullets: [
      'φ₀ = 0, π, 2π, … (celý násobok π) → lineárna, E_z = ±(b/a)·E_x',
      'φ₀ = π/2, 3π/2, … (nepárny násobok π/2) a a = b → kruhová, E_x² + E_z² = a²',
      'φ₀ = π/2, 3π/2, … a a ≠ b → eliptická s osami v smere x a z',
      'iný posun (napr. π/4) → eliptická, elipsa je „naklonená“',
    ],
    worked: {
      q: 'Dve vlny sa šíria v smere osi y: E_x = 3·sin(ω·t − k·y) a E_z = 4·sin(ω·t − k·y + φ₀), amplitúdy vo V/m. Aká je polarizácia výslednej vlny, ak (a) φ₀ = 0, (b) φ₀ = π/2?',
      steps: [
        'Vieme: a = 3 V/m, b = 4 V/m, rovnaké ω aj k → vlny sú koherentné a idú rovnakým smerom.',
        '(a) φ₀ = 0: cos φ₀ = 1, sin φ₀ = 0. Rovnica: (E_x/3)² + (E_z/4)² − 2·(E_x/3)·(E_z/4) = 0, čo je (E_x/3 − E_z/4)² = 0.',
        'Z toho E_z = (4/3)·E_x – priamka cez počiatok → lineárna polarizácia.',
        'Najväčšia veľkosť E je √(3² + 4²) = 5 V/m a smer kmitania zviera s osou x uhol arctg(4/3) ≈ 53,1°.',
        '(b) φ₀ = π/2: cos φ₀ = 0, sin φ₀ = 1. Rovnica: (E_x/3)² + (E_z/4)² = 1.',
        'To je elipsa s polosou 3 v smere x a 4 v smere z → eliptická polarizácia (kruhová by bola len pri a = b).',
      ],
      result: '(a) lineárna, amplitúda 5 V/m pod uhlom ≈ 53,1° od osi x; (b) eliptická s polosami 3 V/m a 4 V/m.',
    },
    check: {
      q: 'E_x = 2·sin(ω·t − k·y), E_z = 2·sin(ω·t − k·y + π). Aká je polarizácia?',
      options: ['lineárna, E_z = −E_x', 'kruhová', 'eliptická', 'žiadna, vlny sa vyrušia'],
      explain: 'Posun φ₀ = π je celý násobok π, takže polarizácia je lineárna: E_z = (−1)¹·(2/2)·E_x = −E_x. Koniec vektora E kmitá po úsečke pod uhlom 135° od osi x. Nevyrušia sa, lebo ležia na rôznych osiach.',
    },
  },
  {
    title: 'Zhrnutie',
    text: 'EM vlna je kmitanie elektrického a magnetického poľa, ktoré sa šíri aj vákuom. Všetko podstatné z kapitoly 2.9 je v odrážkach. Ak vieš tieto body vysvetliť vlastnými slovami a vypočítať príklady 28 a 29, si na skúšku pripravený.',
    bullets: [
      'EM vlna je priečna: E ⊥ B, obe kolmé na smer šírenia, kmitajú synfázne, šíri sa aj vo vákuu.',
      'Vlnová funkcia: E = (0; 0; E_z)·sin(ω·t − k·y), B = (B_x; 0; 0)·sin(ω·t − k·y).',
      'Vo vákuu: c₀ = 1/√(ε₀·μ₀) ≈ 3·10⁸ m/s, rovnaká pre všetky frekvencie.',
      'V látke: c = 1/√(ε·μ), index lomu n = c₀/c = √(εᵣ·μᵣ) (nezabudni na odmocninu!).',
      'Pri prechode do iného prostredia sa frekvencia NEmení, mení sa rýchlosť a vlnová dĺžka: λ = λ₀/n.',
      'c = λ·f – pozor na predpony (MHz = 10⁶ Hz, GHz = 10⁹ Hz, nm = 10⁻⁹ m).',
      'Spektrum od najkratších vĺn: gama, röntgen, UV, svetlo (380–760 nm), IR, mikrovlny, rádio.',
      'Polarizácia = krivka, ktorú kreslí koniec vektora E: úsečka (lineárna), kružnica (kruhová), elipsa (eliptická). Len priečne vlny.',
      'Kruhová/eliptická vzniká zložením dvoch kolmých lineárne polarizovaných koherentných vĺn s fázovým posunom φ₀.',
      'φ₀ = n·π → lineárna; φ₀ = nepárny násobok π/2 a rovnaké amplitúdy → kruhová; inak eliptická.',
    ],
  },
];

export default steps;
