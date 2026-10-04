import type { Step } from '../steps';

// Podrobná lekcia: Skladanie kmitov (prednáška 1.4–1.5, cvičenie 3 pr. 7–9)

const steps: Step[] = [
  {
    title: 'Čo znamená skladať kmity?',
    text:
      'Doteraz kmitalo teleso len jedným spôsobom. Čo ak naň pôsobia dve kmitania naraz? Napríklad závažie visí na pružine, ktorej horný koniec niekto zároveň trasie, alebo do ucha prichádzajú dva tóny súčasne. Tomu sa hovorí skladanie kmitov.\n\n' +
      'Pravidlo je jednoduché: výchylky sa sčítajú. Ak by prvé kmitanie samo posunulo teleso o y₁ a druhé o y₂, spolu ho posunú o y = y₁ + y₂. Pozor, výchylky majú znamienko, takže 2 cm + (−3 cm) = −1 cm.\n\n' +
      'Rozlišujeme dva prípady. Kmity v jednom smere (na prednáške „pozdĺžne“, kapitola 1.4): oba idú napr. hore-dole a výsledok je zase pohyb hore-dole. Kolmé kmity (kapitola 1.5): jeden ide vodorovne, druhý zvisle, a teleso potom kreslí v rovine krivku.',
    analogy:
      'Hojdačku tlačia dvaja. Ak tlačia naraz v rovnakom rytme, hojdá sa oveľa viac. Ak jeden tlačí, keď druhý ťahá, hojdačka takmer stojí. Výsledok závisí od toho, ako sú ich pohyby zladené, a presne to vyjadruje fáza.',
    formula: {
      f: 'y = y₁ + y₂',
      what: 'Skladanie kmitov v jednom smere (princíp superpozície)',
      vars: [
        ['y₁, y₂', 'výchylky jednotlivých kmitaní v tom istom okamihu [m], so znamienkom'],
        ['y', 'výsledná výchylka [m]'],
      ],
    },
    check: {
      q: 'V istom okamihu má prvé kmitanie výchylku y₁ = 2 cm a druhé y₂ = −3 cm (v tom istom smere). Aká je výsledná výchylka?',
      options: ['−1 cm', '5 cm', '1 cm', '−5 cm'],
      explain:
        'Výchylky sa sčítajú aj so znamienkom: y = 2 cm + (−3 cm) = −1 cm. Teleso je 1 cm na zápornej strane od rovnovážnej polohy.',
    },
  },
  {
    title: 'Rovnaké frekvencie: výsledok je zase harmonický',
    text:
      'Najdôležitejší prípad: obe kmitania majú rovnakú uhlovú frekvenciu ω, ale amplitúdy aj počiatočné fázy môžu byť rôzne. Príklad z prednášky: y₁ = 2 cm · sin(4π·t + π/3) a y₂ = 3 cm · sin(4π·t + π/4). Obe majú ω = 4π rad/s.\n\n' +
      'Výsledok y = y₁ + y₂ je opäť jednoduché harmonické kmitanie, a to s tou istou ω. Je to teda zase pekný sínus y = A·sin(ω·t + φ₀), len s novou amplitúdou A a novou počiatočnou fázou φ₀. Frekvencie sa NEsčítajú!\n\n' +
      'Ako nájsť novú amplitúdu? V dvoch špeciálnych prípadoch (synfázne a protifázne kmity) je to veľmi jednoduché, uvidíš v ďalšom kroku. Všeobecný prípad príde hneď potom.',
    formula: {
      f: 'A₁·sin(ω·t + φ₁) + A₂·sin(ω·t + φ₂) = A·sin(ω·t + φ₀)',
      what: 'Skladanie kmitov s rovnakou ω',
      vars: [
        ['A₁, A₂', 'amplitúdy skladaných kmitov [m]'],
        ['φ₁, φ₂', 'ich počiatočné fázy [rad]'],
        ['A, φ₀', 'amplitúda a počiatočná fáza výsledku'],
        ['ω', 'rovnaká pre oba kmity aj pre výsledok [rad/s]'],
      ],
    },
    worked: {
      q: 'Kmity z prednášky: y₁ = 2 cm · sin(4π·t + π/3) a y₂ = 3 cm · sin(4π·t + π/4). Aká je výsledná výchylka v čase t = 0?',
      steps: [
        'Vieme: obe rovnice. Hľadáme: y(0) = y₁(0) + y₂(0).',
        'Dosadíme t = 0 do prvej rovnice: y₁(0) = 2 cm · sin(π/3) = 2 · 0,866 ≈ 1,73 cm.',
        'Dosadíme t = 0 do druhej rovnice: y₂(0) = 3 cm · sin(π/4) = 3 · 0,707 ≈ 2,12 cm.',
        'Sčítame: y(0) ≈ 1,73 cm + 2,12 cm = 3,85 cm.',
        'Kontrola: obe výchylky sú kladné, takže sa sčítajú naplno. Výsledok je menší ako 2 + 3 = 5 cm, lebo ani jeden kmit práve nie je v maxime.',
      ],
      result: 'y(0) ≈ 3,85 cm. Rovnako dostaneš výchylku v akomkoľvek inom čase.',
    },
    check: {
      q: 'Zložíme y₁ = 2 cm · sin(4π·t + π/3) a y₂ = 3 cm · sin(4π·t + π/4). Čo vznikne?',
      options: [
        'Harmonické kmitanie s ω = 4π rad/s',
        'Harmonické kmitanie s ω = 8π rad/s',
        'Rázy',
        'Neharmonické kmitanie',
      ],
      explain:
        'Rovnaké ω znamená harmonický výsledok s tou istou ω = 4π rad/s. Uhlové frekvencie sa nesčítajú, sčítajú sa výchylky.',
    },
  },
  {
    title: 'Synfázne a protifázne kmity',
    text:
      'Synfázne kmity majú rovnakú fázu: idú hore aj dole presne naraz. Navzájom sa zosilňujú a výsledná amplitúda je súčet: A = A₁ + A₂. Na obrázku je modrá krivka y₁, ružová y₂ a žltá ich súčet; pri voľbe „synfázne“ je žltá vyššia ako obe.\n\n' +
      'Protifázne kmity majú fázy posunuté o π (pol otočky): keď je jeden hore, druhý je dole. Navzájom sa oslabujú a výsledná amplitúda je rozdiel: A = |A₁ − A₂|. Prepni obrázok na „protifázne“ a uvidíš, že žltá krivka je nižšia.\n\n' +
      'Absolútna hodnota | | je tam preto, lebo amplitúda musí byť kladná. Na prednáške je napísané (A₁ − A₂); ak vyjde záporné číslo, mínus sa presunie do fázy a výsledok kmitá vo fáze väčšieho kmitu. Ak majú protifázne kmity rovnaké amplitúdy, úplne sa vyrušia (A = 0).',
    analogy:
      'Synfázne: dvaja ľudia skáču na trampolíne v rovnakom rytme a vyletia vysoko. Protifázne: jeden dopadá práve vtedy, keď sa druhý odráža, a trampolína sa skoro nehýbe.',
    fig: 'sum',
    formula: {
      f: 'synfázne (φ₂ = φ₁): A = A₁ + A₂     protifázne (φ₂ = φ₁ ± π): A = |A₁ − A₂|',
      what: 'Výsledná amplitúda v dvoch špeciálnych prípadoch',
      vars: [
        ['synfázne', 'rovnaká fáza, kmity sa zosilňujú'],
        ['protifázne', 'fázy sa líšia o π, kmity sa zoslabujú'],
        ['| |', 'absolútna hodnota, amplitúda je vždy kladná'],
      ],
    },
    worked: {
      q: 'Kmity y₁ = 2 cm · sin(ω·t) a y₂ = 3 cm · sin(ω·t + φ) skladáme (a) synfázne, φ = 0, (b) protifázne, φ = π. Napíš výsledné kmitanie.',
      steps: [
        'Vieme: A₁ = 2 cm, A₂ = 3 cm, rovnaká ω. Hľadáme: výslednú amplitúdu a rovnicu.',
        '(a) φ = 0: y = 2 cm · sin(ω·t) + 3 cm · sin(ω·t) = (2 + 3) cm · sin(ω·t) = 5 cm · sin(ω·t). Teda A = 5 cm.',
        '(b) φ = π: platí sin(x + π) = −sin x, takže y₂ = −3 cm · sin(ω·t).',
        'Sčítame: y = 2 cm · sin(ω·t) − 3 cm · sin(ω·t) = −1 cm · sin(ω·t).',
        'Amplitúda nesmie byť záporná, preto použijeme −sin x = sin(x + π): y = 1 cm · sin(ω·t + π). Teda A = |2 − 3| = 1 cm a výsledok kmitá vo fáze väčšieho (druhého) kmitu.',
      ],
      result: '(a) y = 5 cm · sin(ω·t), (b) y = 1 cm · sin(ω·t + π).',
    },
    check: {
      q: 'Dva protifázne kmity majú amplitúdy 5 cm a 3 cm. Aká je výsledná amplitúda?',
      options: ['2 cm', '8 cm', '−2 cm', '√34 cm ≈ 5,8 cm'],
      explain:
        'Protifázne sa amplitúdy odčítajú: A = |5 − 3| = 2 cm a výsledok je vždy kladný. 8 cm by bolo pri synfáznych kmitoch a √34 cm pri posune o π/2.',
    },
  },
  {
    title: 'Ľubovoľný fázový rozdiel: fázory',
    text:
      'Čo ak fázy nie sú ani rovnaké, ani opačné? Pomôže kružnica z lekcie o kmitoch. Každý kmit si predstav ako šípku (fázor) s dĺžkou rovnou amplitúde, ktorá sa otáča uhlovou rýchlosťou ω. Výchylka kmitu je výška hrotu šípky.\n\n' +
      'Keď majú oba kmity rovnakú ω, obe šípky sa otáčajú rovnako rýchlo a uhol medzi nimi (fázový rozdiel Δφ = φ₂ − φ₁) sa nemení. Ich súčet je tretia šípka, ktorá sa tiež otáča s ω, a jej dĺžka je výsledná amplitúda A. Preto je výsledok zase harmonický.\n\n' +
      'Dĺžku súčtu dvoch šípok, ktoré zvierajú uhol Δφ, vypočítaš kosínusovou vetou (vzorec nižšie). Pre Δφ = 0 dáva A₁ + A₂, pre Δφ = π dáva |A₁ − A₂| a pre Δφ = π/2 dáva √(A₁² + A₂²).',
    formula: {
      f: 'A² = A₁² + A₂² + 2·A₁·A₂·cos(φ₂ − φ₁)     tg φ₀ = (A₁·sin φ₁ + A₂·sin φ₂) / (A₁·cos φ₁ + A₂·cos φ₂)',
      what: 'Amplitúda a fáza zloženého kmitu (rovnaká ω)',
      vars: [
        ['φ₂ − φ₁', 'fázový rozdiel Δφ [rad]'],
        ['A', 'výsledná amplitúda'],
        ['φ₀', 'výsledná počiatočná fáza (pozor na kvadrant, pozri ďalší krok)'],
      ],
    },
    worked: {
      q: 'Nájdi amplitúdu a počiatočnú fázu zloženia kmitov z prednášky: y₁ = 2 cm · sin(4π·t + π/3) a y₂ = 3 cm · sin(4π·t + π/4).',
      steps: [
        'Vieme: A₁ = 2 cm, φ₁ = π/3 (60°), A₂ = 3 cm, φ₂ = π/4 (45°), rovnaká ω = 4π rad/s. Hľadáme: A a φ₀.',
        'Fázový rozdiel: φ₂ − φ₁ = π/4 − π/3 = −π/12 (−15°). Kosínus je párna funkcia, takže cos(−15°) = cos 15° ≈ 0,966.',
        'Dosadíme: A² = 2² + 3² + 2·2·3·0,966 = 4 + 9 + 11,59 = 24,59 cm², takže A ≈ 4,96 cm.',
        'Fáza: čitateľ je 2·sin 60° + 3·sin 45° ≈ 1,732 + 2,121 = 3,853, menovateľ je 2·cos 60° + 3·cos 45° ≈ 1 + 2,121 = 3,121. tg φ₀ ≈ 3,853 / 3,121 ≈ 1,235.',
        'Čitateľ aj menovateľ sú kladné, takže φ₀ je v 1. kvadrante: φ₀ = arctg 1,235 ≈ 0,89 rad (≈ 51°).',
        'Kontrola: fázy sa líšia len o 15°, kmity sú skoro synfázne, preto je A ≈ 4,96 cm len o kúsok menej ako 2 + 3 = 5 cm. A φ₀ ≈ 51° leží medzi 45° a 60°. Sedí.',
      ],
      result: 'y = y₁ + y₂ ≈ 4,96 cm · sin(4π·t + 0,89).',
    },
    deeper:
      'Odkiaľ je vzorec? Dva fázory s dĺžkami A₁ a A₂ zvierajú uhol Δφ. Ak ich pripojíš za seba (koniec prvého na začiatok druhého), vznikne trojuholník, v ktorom je výsledok treťou stranou. Uhol trojuholníka oproti nej je π − Δφ, takže podľa kosínusovej vety A² = A₁² + A₂² − 2·A₁·A₂·cos(π − Δφ) = A₁² + A₂² + 2·A₁·A₂·cos Δφ.\n\n' +
      'Algebraicky: oba sínusy rozložíme vzorcom sin(α + β) = sin α·cos β + cos α·sin β. Dostaneme y = (A₁·cos φ₁ + A₂·cos φ₂)·sin(ω·t) + (A₁·sin φ₁ + A₂·sin φ₂)·cos(ω·t), teda tvar a·sin(ω·t) + b·cos(ω·t). Ako také niečo zlúčiť do jedného sínusu, je presne téma ďalšieho kroku.',
    check: {
      q: 'Dva kmity s rovnakou ω majú amplitúdy 3 cm a 4 cm a sú posunuté o π/2. Aká je výsledná amplitúda?',
      options: ['5 cm', '7 cm', '1 cm', '12 cm'],
      explain:
        'cos(π/2) = 0, takže A² = 3² + 4² = 9 + 16 = 25 a A = 5 cm. Šípky sú na seba kolmé, ako odvesny pravouhlého trojuholníka.',
    },
  },
  {
    title: 'Trik: a·sin + b·cos je jeden sínus',
    text:
      'Kosínus je posunutý sínus (cos x = sin(x + π/2)). Preto a·sin(ω·t) + b·cos(ω·t) je skladanie dvoch kmitov s rovnakou ω a fázovým rozdielom π/2. Výsledok je zase harmonický: A·sin(ω·t + φ₀).\n\n' +
      'Na obrázku sú dva fázory: modrý 3·sin a ružový 4·cos. Točia sa spolu a stále zvierajú pravý uhol. Ich súčet (žltá šípka) je prepona pravouhlého trojuholníka s odvesnami 3 a 4, takže má dĺžku 5. Žltá krivka vpravo je výsledný sínus s amplitúdou 5.\n\n' +
      'Pozor na počiatočnú fázu: tg φ₀ = b/a neurčí uhol jednoznačne, lebo kalkulačka vráti arctg vždy medzi −π/2 a π/2. Ak je a (číslo pri sínuse) záporné, musíš k výsledku pripočítať π. Najistejšie je skontrolovať znamienka: cos φ₀ má znamienko ako a a sin φ₀ ako b.',
    fig: 'tri345',
    formula: {
      f: 'a·sin(ω·t) + b·cos(ω·t) = A·sin(ω·t + φ₀)     A = √(a² + b²)     tg φ₀ = b / a',
      what: 'Zlúčenie sínusu a kosínusu do jedného sínusu',
      vars: [
        ['a', 'číslo pred sínusom (a = A·cos φ₀)'],
        ['b', 'číslo pred kosínusom (b = A·sin φ₀)'],
        ['A', 'výsledná amplitúda'],
        ['φ₀', 'výsledná počiatočná fáza [rad]'],
      ],
    },
    worked: {
      q: 'Je kmitanie opísané funkciou x = 3·sin(ω·t) + 4·cos(ω·t) harmonické? Ak áno, nájdi amplitúdu a počiatočnú fázu. (príklad 7 z 3. cvičenia)',
      steps: [
        'Vieme: x = 3·sin(ω·t) + 4·cos(ω·t). Hľadáme: či je kmitanie harmonické, A a φ₀.',
        'Oba členy majú tú istú ω a kosínus je len posunutý sínus, takže áno, výsledok je harmonický: x = A·sin(ω·t + φ₀).',
        'Rozpíšeme tvar, ktorý chceme dostať (vzorec pre sin(α + β)): A·sin(ω·t + φ₀) = A·cos φ₀ · sin(ω·t) + A·sin φ₀ · cos(ω·t).',
        'Porovnáme čísla pri sin(ω·t) a pri cos(ω·t): A·cos φ₀ = 3 a A·sin φ₀ = 4.',
        'Amplitúda: obe rovnice umocníme a sčítame, sin² + cos² = 1: A² = 3² + 4² = 9 + 16 = 25, takže A = 5.',
        'Fáza: rovnice vydelíme, tg φ₀ = 4/3 ≈ 1,333. Obe čísla (3 aj 4) sú kladné, takže φ₀ je v 1. kvadrante: φ₀ = arctg(4/3) ≈ 0,93 rad (≈ 53,1°).',
        'Kontrola: 5·cos 53,1° ≈ 5 · 0,6 = 3 a 5·sin 53,1° ≈ 5 · 0,8 = 4. Sedí.',
      ],
      result: 'Áno, je harmonické: x = 5·sin(ω·t + 0,93), teda A = 5 a φ₀ ≈ 0,93 rad (53,1°).',
    },
    deeper:
      'Prečo A = √(a² + b²)? Z porovnania máme A·cos φ₀ = a a A·sin φ₀ = b. Obe rovnice umocníme a sčítame: A²·cos² φ₀ + A²·sin² φ₀ = a² + b². Keďže cos² + sin² = 1, ostane A² = a² + b². Vydelením rovníc dostaneme sin φ₀ / cos φ₀ = tg φ₀ = b/a.\n\n' +
      'Je to vlastne Pytagorova veta: a a b sú odvesny, A je prepona a φ₀ je uhol pri odvesne a. Preto sa to tak pekne kreslí šípkami.',
    check: {
      q: 'x = −3·sin(ω·t) + 4·cos(ω·t). Aká je počiatočná fáza φ₀?',
      options: ['≈ 2,21 rad (126,9°)', '≈ −0,93 rad (−53,1°)', '≈ 0,93 rad (53,1°)', '≈ 4,07 rad (233,1°)'],
      explain:
        'A = 5, cos φ₀ = −3/5 (záporný) a sin φ₀ = 4/5 (kladný), teda 2. kvadrant. Kalkulačka dá arctg(4/(−3)) ≈ −0,93 rad, čo je zlý kvadrant. Treba pripočítať π: φ₀ ≈ −0,93 + 3,14 ≈ 2,21 rad.',
    },
  },
  {
    title: 'Rôzne frekvencie: už to nie je harmonické',
    text:
      'Ak majú skladané kmity rôzne frekvencie, výsledok už NIE je jednoduché harmonické kmitanie. Šípky (fázory) sa točia rôzne rýchlo, uhol medzi nimi sa stále mení, a tak sa mení aj dĺžka ich súčtu. Graf výsledku nie je pekný sínus, ale „zubatá“ krivka.\n\n' +
      'Príklad z prednášky: y₁ = 2 cm · sin(3π·t + π/3) a y₂ = 3 cm · sin(7π·t + π/4). Amplitúdy, frekvencie aj fázy sú ľubovoľné a súčet má zložitý tvar.\n\n' +
      'Pozor, „nie harmonické“ neznamená „neperiodické“. Ak je pomer frekvencií zlomok z celých čísel, súčet sa po čase predsa len presne zopakuje, len to nie je sínus. Harmonické = jeden sínus, periodické = opakuje sa.',
    worked: {
      q: 'Je zloženie y₁ = 2 cm · sin(3π·t + π/3) a y₂ = 3 cm · sin(7π·t + π/4) z prednášky harmonické? Je periodické? Ak áno, s akou periódou?',
      steps: [
        'Vieme: ω₁ = 3π rad/s, ω₂ = 7π rad/s. Hľadáme: či je súčet harmonický a či je periodický.',
        'Uhlové frekvencie sú rôzne (3π ≠ 7π), takže súčet NIE JE harmonické kmitanie.',
        'Periódy jednotlivých kmitov: T₁ = 2π/ω₁ = 2π/(3π) = 2/3 s a T₂ = 2π/(7π) = 2/7 s.',
        'Súčet sa zopakuje, až keď sa zopakujú oba kmity naraz, teda po čase, ktorý je celým násobkom T₁ aj T₂. Najmenší spoločný násobok: 3 · (2/3 s) = 2 s a 7 · (2/7 s) = 2 s.',
        'Kontrola: za 2 s urobí prvý kmit presne 3 kmity a druhý presne 7 kmitov, takže sú oba opäť na začiatku.',
      ],
      result: 'Súčet nie je harmonický, ale je periodický s periódou T = 2 s.',
    },
    check: {
      q: 'Je zloženie dvoch harmonických kmitov s rôznymi frekvenciami (v jednom smere) harmonické kmitanie?',
      options: ['Nie, nikdy', 'Áno, vždy', 'Áno, ak majú rovnaké amplitúdy', 'Áno, ak majú rovnaké počiatočné fázy'],
      explain:
        'Harmonický výsledok vznikne len pri rovnakých frekvenciách. Pri rôznych frekvenciách sa uhol medzi fázormi mení a súčet nie je jeden sínus (prednáška, str. 11).',
    },
  },
  {
    title: 'Rázy: keď sú frekvencie blízke',
    text:
      'Zaujímavý prípad nastane, keď sú frekvencie blízke, ale nie rovnaké, napríklad 300 Hz a 302 Hz. Chvíľu sú kmity skoro synfázne a zosilňujú sa, o chvíľu sa jeden predbehne o pol kmitu, sú protifázne a oslabujú sa. Amplitúda výsledku sa preto pomaly mení, „dýcha“, a tomu sa hovorí rázy.\n\n' +
      'Na obrázku je ružová krivka súčet dvoch kmitov s blízkymi frekvenciami. Rýchlo kmitá, ale jej rozkmit sa pomaly zväčšuje a zmenšuje podľa žltej čiarkovanej obálky. Rázy sú teda pomalé kmity amplitúdy výsledného kmitania.\n\n' +
      'Frekvencia rázov (koľkokrát za sekundu je zvuk najhlasnejší) sa rovná rozdielu frekvencií. Pri tónoch 300 Hz a 301 Hz počuješ rázy raz za sekundu, pri 300 Hz a 302 Hz dvakrát za sekundu.',
    analogy:
      'Ladenie gitary: zahráš strunu spolu s ladičkou. Ak je struna skoro naladená, počuješ pomalé „vuuu-vuuu-vuuu“. Čím je bližšie k správnemu tónu, tým pomalšie to pulzuje, a keď pulzovanie zmizne, struna je naladená.',
    fig: 'fyz:skladanie@raz',
    formula: {
      f: 'f_r = |f₂ − f₁|     T_r = 1 / |f₂ − f₁| = 2π / |ω₂ − ω₁|',
      what: 'Frekvencia a perióda rázov',
      vars: [
        ['f₁, f₂', 'frekvencie skladaných kmitov [Hz]'],
        ['ω₁, ω₂', 'ich uhlové frekvencie [rad/s]'],
        ['f_r', 'frekvencia rázov [Hz]: koľkokrát za 1 s je zvuk najhlasnejší'],
        ['T_r', 'perióda rázov [s]: čas medzi dvoma najhlasnejšími okamihmi'],
      ],
    },
    worked: {
      q: 'Zmiešame tóny s frekvenciami f₁ = 300 Hz a f₂ = 302 Hz. Aká je frekvencia a perióda rázov? Vyjde to isté, ak sú zadané uhlové frekvencie ω₁ = 600π rad/s a ω₂ = 604π rad/s? (príklad z prednášky)',
      steps: [
        'Vieme: f₁ = 300 Hz, f₂ = 302 Hz. Hľadáme: f_r a T_r.',
        'Frekvencie sú blízke, ale nie rovnaké, takže vzniknú rázy. Použijeme f_r = |f₂ − f₁| = |302 − 300| Hz = 2 Hz.',
        'Perióda rázov je prevrátená hodnota: T_r = 1/f_r = 1 / (2 Hz) = 0,5 s.',
        'Z uhlových frekvencií: T_r = 2π / |ω₂ − ω₁| = 2π / (604π − 600π) = 2π / (4π) = 0,5 s.',
        'Kontrola: ω = 2π·f, takže 600π rad/s je naozaj 300 Hz a 604π rad/s je 302 Hz. Oba spôsoby dávajú to isté.',
      ],
      result: 'f_r = 2 Hz, T_r = 0,5 s: hlasitosť zosilnie dvakrát za sekundu.',
    },
    deeper:
      'Odvodenie (pre rovnaké amplitúdy A): použijeme vzorec sin α + sin β = 2·sin((α + β)/2)·cos((α − β)/2). Dostaneme y = A·sin(ω₁·t) + A·sin(ω₂·t) = 2A·cos((ω₂ − ω₁)·t/2) · sin((ω₁ + ω₂)·t/2).\n\n' +
      'Druhý činiteľ je rýchly kmit s priemernou frekvenciou, to je tón, ktorý počuješ. Prvý činiteľ sa mení pomaly a hrá rolu amplitúdy: A(t) = 2A·|cos((ω₂ − ω₁)·t/2)|.\n\n' +
      'Prečo f_r = |f₂ − f₁| a nie polovica? Kosínus v obálke má síce frekvenciu |f₂ − f₁|/2, ale hlasitosť závisí od jeho absolútnej hodnoty. Tá má maximum dvakrát za periódu kosínusu (pri +1 aj pri −1), preto je rázov |f₂ − f₁| za sekundu.',
    check: {
      q: 'Ladička má 440 Hz. Keď s ňou zahráš strunu, počuješ 4 rázy za sekundu. Akú frekvenciu má struna?',
      options: ['436 Hz alebo 444 Hz', 'Presne 444 Hz', '110 Hz', '880 Hz'],
      explain:
        'f_r = |f₂ − f₁| = 4 Hz, takže struna má 440 − 4 = 436 Hz alebo 440 + 4 = 444 Hz. Zo samotných rázov sa nedá povedať, či je vyššia alebo nižšia. Gitarista preto strunu trochu pritiahne a počúva, či sa rázy spomalia.',
    },
  },
  {
    title: 'Kolmé kmity: bod kreslí krivku',
    text:
      'Teraz skladáme kmity v dvoch kolmých smeroch: jeden ide vodorovne (os x), druhý zvisle (os y). Teleso sa naraz hýbe do strany aj hore-dole, takže už nekmitá po priamke, ale kreslí v rovine krivku. Jeho poloha je bod [x(t); y(t)].\n\n' +
      'Každá súradnica kmitá harmonicky so svojou amplitúdou, uhlovou frekvenciou a počiatočnou fázou. Pozor, tu sa výchylky NEsčítajú, lebo sú v rôznych smeroch: x hovorí, kde je bod vodorovne, a y, kde je zvisle.\n\n' +
      'Tvar krivky (trajektórie) závisí od dvoch vecí: od pomeru uhlových frekvencií ωₓ : ω_y a od fázového rozdielu Δφ = φ_y − φₓ. Pri rovnakých frekvenciách vzniká vo všeobecnosti elipsa, pri pomere prirodzených čísel takzvané Lissajousove krivky.',
    analogy:
      'Vrecko s pieskom zavesené na šnúre, ktoré sa hojdá naraz dopredu-dozadu aj doľava-doprava. Piesok, ktorý sa z neho sype, nakreslí na zemi elipsu alebo zložitejšiu krivku. Podobné obrazce vídaš na osciloskope alebo pri laserovej show.',
    formula: {
      f: 'x = Aₓ · sin(ωₓ·t + φₓ)     y = A_y · sin(ω_y·t + φ_y)',
      what: 'Dva kolmé kmity',
      vars: [
        ['x, y', 'vodorovná a zvislá výchylka bodu [m]'],
        ['Aₓ, A_y', 'amplitúdy v smere x a y [m]'],
        ['ωₓ, ω_y', 'uhlové frekvencie v smere x a y [rad/s]'],
        ['φₓ, φ_y', 'počiatočné fázy; ich rozdiel Δφ = φ_y − φₓ určuje tvar krivky'],
      ],
    },
    check: {
      q: 'Skladáme dva kolmé kmity x(t) a y(t). Ako dostaneme polohu bodu?',
      options: [
        'x a y sú súradnice bodu [x; y], nesčítajú sa',
        'Sčítame x + y a dostaneme výchylku',
        'Vynásobíme x · y',
        'Odčítame y − x',
      ],
      explain:
        'Kolmé kmity sú v rôznych smeroch, preto sa nesčítajú. Jeden udáva vodorovnú polohu, druhý zvislú, a spolu určujú bod v rovine.',
    },
  },
  {
    title: 'Rovnaké frekvencie: úsečka, kružnica, elipsa',
    text:
      'Ak sú frekvencie rovnaké (ωₓ = ω_y), výsledkom je vždy elipsa. Úsečka a kružnica sú len jej špeciálne prípady: kružnica je elipsa s rovnakými poloosami a úsečka je úplne „spľasnutá“ elipsa. O tvare rozhoduje fázový rozdiel Δφ.\n\n' +
      'Synfázne (Δφ = 0): x aj y sú naraz v maxime aj naraz v nule, bod chodí po šikmej úsečke „/“. Protifázne (Δφ = ±π): keď je x v maxime, y je v minime, a bod chodí po úsečke „\\“. Posun o ±π/2 pri rovnakých amplitúdach dá kružnicu a všetko ostatné elipsu.\n\n' +
      'Na obrázku nechaj pomer 1:1 a prepínaj fázu φ: pri 0 a π uvidíš úsečku, pri π/2 kružnicu a pri π/4 šikmú elipsu. Žltý bod ukazuje, ako sa teleso po krivke pohybuje.',
    fig: 'fyz:skladanie',
    formula: {
      f: 'Δφ = 0: úsečka /     Δφ = ±π: úsečka \\     Δφ = ±π/2 a Aₓ = A_y: kružnica     inak: elipsa',
      what: 'Kolmé kmity s rovnakou frekvenciou',
      vars: [
        ['Δφ', 'fázový rozdiel φ_y − φₓ [rad]'],
        ['Aₓ = A_y', 'rovnaké amplitúdy; ak sú rôzne, posun π/2 dá elipsu s osami v smere x a y'],
      ],
    },
    worked: {
      q: 'Bod kmitá podľa x = 3 cm · sin(ω·t) a y = 3 cm · cos(ω·t). Po akej krivke sa pohybuje?',
      steps: [
        'Vieme: Aₓ = A_y = 3 cm, ω je v oboch smeroch rovnaká. Hľadáme: tvar trajektórie.',
        'Prepíšeme kosínus na sínus: cos(ω·t) = sin(ω·t + π/2). Teda φₓ = 0, φ_y = π/2 a Δφ = π/2.',
        'Rovnaké frekvencie, rovnaké amplitúdy a posun π/2: podľa pravidla je to kružnica.',
        'Overíme to výpočtom. Z rovníc: x/3 = sin(ω·t) a y/3 = cos(ω·t). Umocníme a sčítame: x²/9 + y²/9 = sin² + cos² = 1.',
        'Teda x² + y² = 9, čo je rovnica kružnice so stredom v počiatku a polomerom √9 = 3 cm.',
      ],
      result: 'Kružnica s polomerom 3 cm (bod po nej obieha s uhlovou rýchlosťou ω).',
    },
    deeper:
      'Prečo synfázne vznikne úsečka? Ak x = Aₓ·sin(ω·t) a y = A_y·sin(ω·t), tak y/x = A_y/Aₓ je stále rovnaké číslo. Teda y = (A_y/Aₓ)·x, čo je rovnica priamky cez počiatok, a bod chodí tam a späť po jej kúsku. Pri protifáze je y = −(A_y/Aₓ)·x, priamka klesá.\n\n' +
      'Pri posune π/2 a rôznych amplitúdach dá rovnaký výpočet ako v príklade x²/Aₓ² + y²/A_y² = 1. To je rovnica elipsy s poloosami Aₓ a A_y.',
    check: {
      q: 'x = 4 cm · sin(ω·t), y = 2 cm · cos(ω·t). Akú krivku bod kreslí?',
      options: ['Elipsu s poloosami 4 cm a 2 cm', 'Kružnicu s polomerom 4 cm', 'Úsečku', 'Parabolu'],
      explain:
        'Posun je π/2 (kosínus), ale amplitúdy sú rôzne, takže to nie je kružnica. Platí x²/16 + y²/4 = 1, čo je elipsa s poloosami 4 cm (vodorovne) a 2 cm (zvisle).',
    },
  },
  {
    title: 'Lissajousove krivky',
    text:
      'Ak sú frekvencie rôzne, ale ich pomer je pomer prirodzených čísel (napr. ωₓ : ω_y = 1 : 2, 2 : 3, 3 : 4), vznikajú Lissajousove krivky (čítaj „lisažúove“). Sú to uzavreté obrazce s „uškami“ a slučkami, po ktorých bod stále dookola obieha.\n\n' +
      'Na obrázku prepni pomer na 1:2, 2:3 alebo 3:4 a skús rôzne fázy φ. Pomer určuje, koľko „uší“ má krivka, a fáza ju nakláňa a deformuje. Pomer na obrázku je ωₓ : ω_y, teda prvé číslo patrí vodorovnému kmitu.\n\n' +
      'Na prednáške sú príklady s pomerom 2 : 1 (x = 1,5 cm · sin(2t), y = 1,5 cm · sin(t + π/2) dá osmičku), 3 : 1 a 5 : 7. Na skúške väčšinou stačí vedieť, kedy Lissajousova krivka vzniká a že je periodická.',
    fig: 'fyz:skladanie',
    formula: {
      f: 'ωₓ : ω_y = n : m (n, m prirodzené čísla) ⇒ Lissajousova krivka',
      what: 'Kedy vznikne Lissajousova krivka',
      vars: [
        ['n, m', 'prirodzené čísla (1, 2, 3, …)'],
        ['ωₓ : ω_y', 'pomer uhlových frekvencií (rovnaký ako pomer frekvencií fₓ : f_y)'],
      ],
    },
    deeper:
      'Pomer frekvencií sa dá z obrázka „prečítať“. Za jednu periódu celej krivky sa bod dotkne pravého okraja toľkokrát, koľko kmitov urobí x, a horného okraja toľkokrát, koľko kmitov urobí y. Teda ωₓ : ω_y = (počet dotykov pravého okraja) : (počet dotykov horného okraja). Pravidlo platí pre uzavreté krivky, nie pre tie, po ktorých bod chodí tam a späť po tej istej čiare (napr. oblúk paraboly v príklade 9 z 3. cvičenia).\n\n' +
      'Takto sa kedysi na osciloskope porovnávali frekvencie: do jedného vstupu sa pustil známy signál, do druhého neznámy, a z tvaru Lissajousovej krivky sa určil ich pomer.',
    check: {
      q: 'Kolmé kmity majú uhlové frekvencie ωₓ = 2 rad/s a ω_y = 3 rad/s. Čo bod nakreslí?',
      options: ['Lissajousovu krivku (pomer 2 : 3)', 'Elipsu', 'Úsečku', 'Rázy'],
      explain:
        'Frekvencie sú rôzne a ich pomer 2 : 3 je pomer prirodzených čísel, takže vznikne Lissajousova krivka. Elipsa, úsečka a kružnica vznikajú len pri rovnakých frekvenciách. Rázy patria ku kmitom v jednom smere.',
    },
  },
  {
    title: 'Kedy sa krivka zopakuje? Periodickosť',
    text:
      'Zložený pohyb je periodický, ak sa po nejakom čase T bod vráti na to isté miesto a ide rovnakým smerom. To sa stane len vtedy, keď sa naraz zopakuje kmit v smere x aj kmit v smere y. Za čas T teda musí x urobiť celý počet kmitov a y tiež celý počet kmitov.\n\n' +
      'Matematicky: T = m·Tₓ = n·T_y, kde m a n sú prirodzené čísla. Najmenšie také T je najmenší spoločný násobok periód Tₓ a T_y. Z rovnosti vyplýva Tₓ/T_y = n/m, takže pomer periód musí byť racionálne číslo (zlomok z celých čísel).\n\n' +
      'Ak je pomer iracionálny (napr. Tₓ/T_y = √2), periódy sa nikdy presne „nestretnú“. Krivka sa nikdy nezopakuje a postupne vyplní celý obdĺžnik so stranami 2Aₓ a 2A_y.',
    analogy:
      'Dvaja bežci na okruhu: jeden obehne kolo za 4 minúty, druhý za 6 minút. Spolu na štarte sa stretnú až po 12 minútach (najmenší spoločný násobok), keď má prvý za sebou 3 kolá a druhý 2. Keby bol pomer ich časov iracionálny, na štarte by sa už nikdy presne nestretli.',
    formula: {
      f: 'T = m · Tₓ = n · T_y     Tₓ / T_y = n / m (racionálne číslo)',
      what: 'Perióda zloženého kmitania',
      vars: [
        ['T', 'výsledná perióda = najmenší spoločný násobok Tₓ a T_y [s]'],
        ['Tₓ, T_y', 'periódy kmitov v smere x a y [s]'],
        ['m, n', 'prirodzené čísla: koľko kmitov urobí x a koľko y za čas T'],
      ],
    },
    worked: {
      q: 'Zložením dvoch kolmých kmitaní s periódami Tₓ a T_y vznikne kmitanie s periódou T. Aká je táto perióda? Čo musí byť splnené, aby výsledná perióda T vôbec existovala? Vypočítaj ju pre Tₓ = 0,4 s a T_y = 0,6 s. (príklad 8 z 3. cvičenia)',
      steps: [
        'Vieme: Tₓ a T_y. Hľadáme: T a podmienku, kedy existuje.',
        'Po čase T musí byť bod opäť v tom istom stave, teda x aj y musia urobiť celý počet kmitov: T = m·Tₓ a zároveň T = n·T_y (m, n sú prirodzené čísla).',
        'Z m·Tₓ = n·T_y vyplýva Tₓ/T_y = n/m. Podmienka: pomer periód musí byť racionálne číslo. Inak také T neexistuje a pohyb nie je periodický.',
        'Výsledná perióda je najmenšie také T, teda najmenší spoločný násobok Tₓ a T_y.',
        'Čísla: Tₓ/T_y = 0,4/0,6 = 2/3, čo je racionálne číslo, takže T existuje. Pre m = 3 a n = 2: T = 3·Tₓ = 3 · 0,4 s = 1,2 s a zároveň T = 2·T_y = 2 · 0,6 s = 1,2 s.',
        'Kontrola: za 1,2 s urobí x presne 3 kmity a y presne 2 kmity. Kratší spoločný čas neexistuje (napr. 0,6 s nie je násobok 0,4 s).',
      ],
      result:
        'T je najmenší spoločný násobok Tₓ a T_y a existuje len vtedy, keď je Tₓ/T_y racionálne číslo. Pre 0,4 s a 0,6 s je T = 1,2 s.',
    },
    check: {
      q: 'Periódy kolmých kmitov sú Tₓ = 1 s a T_y = √2 s. Je zložený pohyb periodický?',
      options: [
        'Nie, pomer 1/√2 je iracionálny',
        'Áno, s periódou √2 s',
        'Áno, s periódou (1 + √2) s',
        'Áno, s periódou 1 s',
      ],
      explain:
        '√2 sa nedá zapísať ako zlomok z celých čísel, takže neexistujú prirodzené čísla m, n, pre ktoré m · 1 s = n · √2 s. Krivka sa nikdy presne nezopakuje.',
    },
  },
  {
    title: 'Príklad: kolmé kmity s pomerom 1 : 2',
    text:
      'Posledný príklad z 3. cvičenia spája všetko: kolmé kmity, periodickosť aj goniometrický vzorec. Vodorovne kmitá x = A·sin(ω·t), zvisle y = A·cos(2ω·t), takže zvislý kmit je dvakrát rýchlejší.\n\n' +
      'Ako zistiť tvar krivky? Treba z rovníc vylúčiť čas t: z jednej rovnice vyjadriť výraz s t a dosadiť ho do druhej. Výsledok je rovnica, v ktorej sú len x a y, teda rovnica krivky. Tu pomôže vzorec pre dvojnásobný uhol cos 2α = 1 − 2·sin² α.\n\n' +
      'Na obrázku nastav pomer 1:2 a fázu π/2. Uvidíš presne tento pohyb: bod sa kĺže tam a späť po oblúku paraboly otvorenej nadol, ktorý vyzerá ako oblúk mosta.',
    fig: 'fyz:skladanie',
    formula: {
      f: 'cos 2α = 1 − 2·sin² α     y = A − 2x²/A',
      what: 'Vzorec pre dvojnásobný uhol a výsledná krivka',
      vars: [
        ['α', 'ľubovoľný uhol, tu α = ω·t'],
        ['y = A − 2x²/A', 'parabola s vrcholom v bode [0; A], otvorená nadol'],
      ],
    },
    worked: {
      q: 'Bude kmitanie, ktoré vznikne zložením vodorovného kmitania x = A·sin(ω·t) a zvislého kmitania y = A·cos(2ω·t), periodické? Aký tvar má trajektória? (príklad 9 z 3. cvičenia)',
      steps: [
        'Vieme: ωₓ = ω, ω_y = 2ω. Hľadáme: či je pohyb periodický a po akej krivke ide bod.',
        'Pomer frekvencií ωₓ : ω_y = 1 : 2 je pomer prirodzených čísel (racionálny), takže pohyb JE periodický.',
        'Perióda: Tₓ = 2π/ω a T_y = 2π/(2ω) = π/ω. Najmenší spoločný násobok je T = Tₓ = 2·T_y = 2π/ω.',
        'Tvar: použijeme cos 2α = 1 − 2·sin² α pre α = ω·t, takže y = A·(1 − 2·sin²(ω·t)).',
        'Z prvej rovnice je sin(ω·t) = x/A. Dosadíme: y = A·(1 − 2·x²/A²) = A − 2x²/A.',
        'To je parabola otvorená nadol s vrcholom v bode [0; A]. Keďže x je len medzi −A a A, bod nejde po celej parabole, len po oblúku od [−A; −A] po [A; −A].',
        'Kontrola v dvoch bodoch: pre t = 0 je x = 0 a y = A (vrchol). Pre ω·t = π/2 je x = A a y = A·cos π = −A. Oba body ležia na y = A − 2x²/A. Sedí.',
      ],
      result:
        'Áno, pohyb je periodický s periódou T = 2π/ω. Bod chodí tam a späť po oblúku paraboly y = A − 2x²/A pre x od −A po A.',
    },
    deeper:
      'Ako sa bod po parabole hýbe? Za jednu periódu začne vo vrchole [0; A], zíde doprava dole do [A; −A], vráti sa do vrcholu, zíde doľava dole do [−A; −A] a znova sa vráti do vrcholu. Je to Lissajousova krivka s pomerom 1 : 2, ktorá je taká „spľasnutá“, že bod chodí stále po tej istej čiare tam a späť.\n\n' +
      'Všeobecný postup na tvar krivky: (1) vyjadri sin alebo cos z jednej rovnice, (2) pomocou goniometrických vzorcov prepíš druhú rovnicu tak, aby obsahovala len ten istý výraz, (3) dosaď. Pri rovnakých frekvenciách pomáha sin² + cos² = 1, pri pomere 1 : 2 vzorce pre dvojnásobný uhol.',
  },
  {
    title: 'Zhrnutie: skladanie kmitov',
    text:
      'Skladanie kmitov má dve veľké časti: kmity v jednom smere (výchylky sa sčítajú) a kolmé kmity (bod kreslí krivku). V oboch rozhoduje pomer frekvencií a fázový rozdiel.\n\n' +
      'Pri príklade si najprv zisti, či sú frekvencie rovnaké, blízke, alebo v nejakom pomere. To ti hneď povie, čo vznikne a ktorý vzorec použiť.',
    bullets: [
      'Kmity v jednom smere: y = y₁ + y₂ (sčítajú sa výchylky so znamienkom).',
      'Rovnaké frekvencie → výsledok je harmonický s tou istou ω (frekvencie sa nesčítajú!).',
      'Synfázne: A = A₁ + A₂. Protifázne (posun π): A = |A₁ − A₂|.',
      'Všeobecne: A² = A₁² + A₂² + 2·A₁·A₂·cos(φ₂ − φ₁).',
      'a·sin(ω·t) + b·cos(ω·t) = A·sin(ω·t + φ₀), A = √(a² + b²), tg φ₀ = b/a (kvadrant over podľa znamienok a, b).',
      'Rôzne frekvencie → výsledok nie je harmonický (ale môže byť periodický).',
      'Blízke frekvencie → rázy: f_r = |f₂ − f₁|, T_r = 1/|f₂ − f₁|.',
      'Kolmé kmity s rovnakou frekvenciou → elipsa; Δφ = 0 alebo π → úsečka; Δφ = π/2 a rovnaké amplitúdy → kružnica.',
      'Pomer frekvencií n : m (prirodzené čísla) → Lissajousove krivky.',
      'Periodické je to len vtedy, keď je Tₓ/T_y racionálne; T = najmenší spoločný násobok Tₓ a T_y.',
      'Tvar krivky zistíš vylúčením času t (sin² + cos² = 1, cos 2α = 1 − 2·sin² α).',
    ],
    check: {
      q: 'Tóny 500 Hz a 503 Hz znejú naraz. Koľko rázov za sekundu počuješ?',
      options: ['3', '1,5', '503', '1003'],
      explain: 'f_r = |503 − 500| Hz = 3 Hz, teda 3 rázy za sekundu. Nie polovica, ale celý rozdiel frekvencií.',
    },
  },
];

export default steps;
