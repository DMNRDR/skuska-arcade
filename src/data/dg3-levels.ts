import type { Check } from './steps';

// Úrovne otázok na 3. písomku z Metód zobrazovania (kartografia). options[0] je správna.
// Číselné výsledky overuje scripts/check_kart.py (vzorce z lekcií v data/lessons/dg3.ts).

const c = (q: string, options: string[], explain: string): Check => ({ q, options, explain });

/** Level 1: pojmy */
export const DG3_L1: Check[] = [
  c('Čo je zemepisná šírka U?', ['Uhol spojnice OA s rovinou rovníka', 'Uhol roviny poludníka bodu so základným poludníkom', 'Vzdialenosť bodu od pólu v km', 'Uhol od severného pólu'], 'U sa meria od rovníka (0°) k pólom (±90°). Uhol od pólu je pólová vzdialenosť δ = 90° − U. Druhá možnosť je dĺžka V.'),
  c('Čo je rovnobežka?', ['Kružnica bodov s rovnakou šírkou U', 'Polkružnica bodov s rovnakou dĺžkou V', 'Najkratšia spojnica dvoch bodov', 'Hlavná kružnica cez póly'], 'Rovnobežka: U = konšt., polomer R·cos U. Polkružnica so stálym V je poludník.'),
  c('Ktorá rovnobežka je hlavnou kružnicou?', ['Rovník', 'Rovnobežka 45°', 'Každá', 'Žiadna'], 'Hlavná kružnica má stred v strede gule. Z rovnobežiek len rovník (U = 0°).'),
  c('Čo je kartografická sieť?', ['Obraz zemepisnej siete v rovine', 'Sieť bodov bodového poľa', 'Poludníky na glóbuse', 'Hektárová sieť'], 'Zemepisná sieť (poludníky a rovnobežky) je na guli, jej obraz v mape je kartografická sieť.'),
  c('Čo je konformné zobrazenie?', ['Zachováva uhly', 'Zachováva plochy', 'Zachováva dĺžky poludníkov', 'Nezachováva nič'], 'Konformné = uhlojavné, m_p = m_r. Plochy zachováva ekvivalentné.'),
  c('Čo je ekvivalentné zobrazenie?', ['Zachováva plochy', 'Zachováva uhly', 'Zachováva dĺžky vo všetkých smeroch', 'Zobrazí ortodrómy ako priamky'], 'Ekvivalentné = plochojavné, P = m_p·m_r = 1. Žiadne zobrazenie nezachová dĺžky vo všetkých smeroch.'),
  c('Kde je stred premietania v stereografickej azimutálnej projekcii (pólová poloha)?', ['V protiľahlom (južnom) póle', 'V strede gule', 'V nekonečne', 'V severnom póle'], 'Stereografická: S = protiľahlý pól. Gnómonická: S = O. Ortografická: S nevlastný.'),
  c('Čo je ortodróma?', ['Najkratšia spojnica dvoch bodov na guli', 'Krivka so stálym kurzom', 'Obraz rovníka', 'Rovnobežka cez dva body'], 'Ortodróma = oblúk hlavnej kružnice. Stály kurz má loxodróma.'),
  c('Čo je loxodróma?', ['Krivka, ktorá pretína poludníky pod stálym uhlom', 'Najkratšia cesta', 'Obraz poludníka', 'Kružnica so stredom v strede gule'], 'Loxodróma = stály kurz (azimut). Je dlhšia ako ortodróma.'),
  c('V akej polohe je valcová plocha, ktorej os splýva so zemskou osou?', ['V normálnej (pólovej)', 'V priečnej (rovníkovej)', 'V šikmej', 'V sečnej'], 'Normálna = os plochy je zemská os. Sečná/dotyková hovorí o tom, ako plocha pretína guľu.'),
  c('Čo je Tissotova indikatrix?', ['Elipsa, obraz nekonečne malej kružnice', 'Obraz pólu', 'Mierka mapy', 'Sieť po 30°'], 'Jej poloosi sú extrémne dĺžkové skreslenia v hlavných smeroch. V konformnom zobrazení je to kružnica.'),
  c('Čo majú spoločné všetky pseudocylindrické zobrazenia?', ['Rovnobežky sú rovnobežné priamky', 'Poludníky sú rovnobežné priamky', 'Rovnobežky sú sústredné kružnice', 'Sú konformné'], 'Z valcového zobrazenia „ostali“ priamkové rovnobežky, poludníky sú krivky.'),
];

/** Level 2: vlastnosti, porovnania */
export const DG3_L2: Check[] = [
  c('Ktorá projekcia zobrazí každú ortodrómu ako priamku?', ['Gnómonická', 'Stereografická', 'Ortografická', 'Mercatorovo zobrazenie'], 'Rovina ortodrómy prechádza stredom gule = stredom premietania gnómonickej projekcie.'),
  c('V ktorom zobrazení je loxodróma priamka?', ['Mercatorovom', 'Gnómonickom', 'Lambertovom izocylindrickom', 'Ptolemaiovom'], 'Mercator je konformné valcové zobrazenie, poludníky sú rovnobežné priamky a loxodróma ich pretína pod stálym uhlom.'),
  c('Ktorá azimutálna projekcia zobrazí kružnice na kružnice a je konformná?', ['Stereografická', 'Gnómonická', 'Ortografická', 'Postelovo zobrazenie'], 'Stereografická projekcia je kruhová a konformná.'),
  c('Prečo sa rovník v gnómonickej pólovej projekcii nezobrazí?', ['Lúče zo stredu gule k rovníku sú rovnobežné s priemetňou', 'Leží za priemetňou', 'Je v strede obrazu', 'Zobrazí sa na bod'], 'ρ = R·cotg 0° → ∞. Lúč v rovine rovníka nepretne dotykovú rovinu v póle.'),
  c('Na čo sa zobrazia rovnobežky v gnómonickej projekcii v rovníkovej polohe?', ['Na hyperboly', 'Na kružnice', 'Na rovnobežné úsečky', 'Na paraboly'], 'Kužeľ lúčov zo stredu cez rovnobežku má os ∥ priemetni, rez je hyperbola. Poludníky sú rovnobežné priamky.'),
  c('Na čo sa zobrazia poludníky v ortografickej projekcii v rovníkovej polohe?', ['Na (pol)elipsy', 'Na priamky z jedného bodu', 'Na hyperboly', 'Na kružnice s polomerom R'], 'Poludník je kružnica s polomerom R v rovine pootočenej o V; kolmý priemet je elipsa s polosami R a R·|sin V|.'),
  c('Ktorá podmienka platí pre konformné zobrazenie?', ['m_p = m_r', 'm_p · m_r = 1', 'm_p = 1', 'm_r = 1'], 'Konformné: rovnaké skreslenie vo všetkých smeroch v bode. m_p·m_r = 1 je ekvivalentnosť.'),
  c('Prečo je Lambertovo izocylindrické zobrazenie ekvivalentné?', ['m_p = cos U, m_r = 1/cos U, súčin 1', 'Lebo y = R·U', 'Lebo zachová uhly', 'Lebo je dotykové'], 'Rovnobežky sa predĺžia 1/cos U-krát, poludníky skrátia cos U-krát; plocha ostane rovnaká.'),
  c('Aký je obraz pólu v Mercatorovom zobrazení?', ['Nezobrazí sa (je v nekonečne)', 'Bod', 'Úsečka dĺžky 2πR', 'Kružnica'], 'y = R·ln tg(45° + 45°) = R·ln tg 90° → ∞.'),
  c('Čím sa líšia rovnobežky v polykónickom a kužeľovom zobrazení?', ['V polykónickom nie sú sústredné', 'V polykónickom sú to priamky', 'V kužeľovom nie sú sústredné', 'Nelíšia sa'], 'Polykónické: každá rovnobežka má vlastný dotykový kužeľ, stredy oblúkov sú v rôznych bodoch stredného poludníka.'),
  c('Ktoré valcové zobrazenie zachová dĺžky poludníkov?', ['Ekvidištančné (y = R·U)', 'Mercatorovo', 'Lambertovo', 'Gnómonické valcové'], 'y = R·U je skutočná dĺžka oblúka poludníka od rovníka, m_p = 1.'),
  c('Aký tvar má Wernerovo–Stabeovo zobrazenie sveta?', ['Srdcový (rovnobežky sú sústredné kružnice)', 'Obdĺžnik', 'Elipsa', 'Kruh'], 'Pseudoazimutálne: ρ = R·(90° − U), oblúky rovnobežiek v skutočnej dĺžke → tvar srdca.'),
];

/** Level 3: konštrukcie a výpočty krok po kroku */
export const DG3_L3: Check[] = [
  c('Ortografická pólová projekcia, R = 4 cm. Polomer obrazu rovnobežky 30°?', ['3,46 cm', '2,00 cm', '6,93 cm', '4,62 cm'], '1) Ortografická: ρ = R·cos U.\n2) ρ = 4·cos 30° = 4·0,866 = 3,46 cm.\n(2,00 je 60°, 6,93 gnómonická, 4,62 stereografická.)'),
  c('Gnómonická pólová projekcia, R = 4 cm. Polomer obrazu rovnobežky 30°?', ['6,93 cm', '3,46 cm', '2,31 cm', '8,00 cm'], '1) Gnómonická: ρ = R·cotg U.\n2) cotg 30° = √3 = 1,732.\n3) ρ = 4·1,732 = 6,93 cm.'),
  c('Stereografická pólová projekcia (dotyková rovina v póle), R = 4 cm. Polomer obrazu rovníka?', ['8 cm', '4 cm', '∞ (nezobrazí sa)', '5,66 cm'], '1) ρ = 2R·tg((90° − U)/2).\n2) U = 0°: ρ = 8·tg 45° = 8 cm.\n(4 cm by vyšlo pri priemetni v rovine rovníka; ∞ je gnómonická.)'),
  c('Stereografická pólová projekcia, R = 4 cm. Polomer obrazu rovnobežky 60°?', ['2,14 cm', '2,00 cm', '2,31 cm', '1,07 cm'], '1) ρ = 2R·tg((90° − 60°)/2) = 8·tg 15°.\n2) tg 15° = 0,268.\n3) ρ = 2,14 cm. (1,07 cm je vzorec pre priemetňu v rovine rovníka.)'),
  c('Mercatorovo zobrazenie, R = 3 cm. Vzdialenosť rovnobežky 60° od rovníka?', ['3,95 cm', '2,60 cm', '3,14 cm', '5,20 cm'], '1) y = R·ln tg(45° + U/2) = 3·ln tg 75°.\n2) tg 75° = 3,732, ln 3,732 = 1,317.\n3) y = 3,95 cm.'),
  c('Lambertovo izocylindrické, R = 3 cm. Vzdialenosť rovnobežky 60° od rovníka?', ['2,60 cm', '3,95 cm', '3,14 cm', '1,50 cm'], '1) y = R·sin U.\n2) y = 3·0,866 = 2,60 cm.'),
  c('Braunova stereografická valcová projekcia, R = 3 cm. y pre rovnobežku 60°?', ['3,46 cm', '5,20 cm', '2,60 cm', '3,95 cm'], '1) Pohyblivý stred S na guli (c = R): y = 2R·tg(U/2).\n2) y = 6·tg 30° = 6·0,577 = 3,46 cm.'),
  c('Ptolemaiovo zobrazenie, R = 4 cm, dotykový kužeľ v U₀ = 45°. Polomer obrazu rovnobežky 30°?', ['5,05 cm', '4,00 cm', '2,95 cm', '6,93 cm'], '1) ρ = R·cotg U₀ + R·(U₀ − U), rozdiel v radiánoch.\n2) R·cotg 45° = 4.\n3) 45° − 30° = 15° = π/12 = 0,262 rad → 4·0,262 = 1,05.\n4) ρ = 5,05 cm.'),
  c('Kužeľové zobrazenie, dotykový kužeľ v U₀ = 30°. Pod akým uhlom ε sa zobrazí poludník V = 60°?', ['30°', '60°', '52°', '15°'], '1) ε = V·sin U₀.\n2) ε = 60°·0,5 = 30°.'),
  c('Gnómonická valcová projekcia, R = 3 cm. y pre rovnobežku 45°?', ['3,00 cm', '2,12 cm', '2,64 cm', '2,36 cm'], '1) S = O: y = R·tg U.\n2) y = 3·tg 45° = 3 cm.\n(2,12 Lambert, 2,64 Mercator, 2,36 ekvidištančné.)'),
  c('Ortografická projekcia: obraz ortodrómy je elipsa. Aká je jej hlavná polos?', ['R (polomer gule)', '|O₁A₁|', 'Vzdialenosť A₁B₁', 'R·cos U'], 'Kolmý priemet hlavnej kružnice s polomerom R: hlavná polos ostane R (smer priesečnice roviny ortodrómy s rovinou obrysu), elipsa sa dotýka obrysu.'),
  c('Stereografická pólová projekcia, obraz rovníka má polomer 8 cm, |PA_s| = 4 cm. Kde je obraz antipodálneho bodu A*?', ['Na opačnej strane od P, |PA_s*| = 16 cm', 'V bode P', 'Na tej istej strane, 16 cm', 'Na opačnej strane, 4 cm'], '1) |PA_s|·|PA_s*| = r_g² = 64.\n2) |PA_s*| = 64/4 = 16 cm.\n3) Antipód má dĺžku V + 180°, teda leží na opačnej polpriamke.'),
  c('Wernerovo–Stabeovo zobrazenie, R = 4 cm. Polomer obrazu rovnobežky 30°?', ['4,19 cm', '6,93 cm', '3,46 cm', '2,09 cm'], '1) ρ = R·(90° − U) v radiánoch.\n2) 60° = π/3 = 1,047.\n3) ρ = 4,19 cm.'),
];

/** Level 4: skúšobná písomka, pool (mix definícií, vlastností a výpočtov ako na písomke) */
export const DG3_L4: Check[] = [
  c('Ktorá projekcia je ekvidištančná v rovnobežkách v pólovej polohe?', ['Ortografická', 'Gnómonická', 'Stereografická', 'Žiadna azimutálna'], 'Ortografická: ρ = R·cos U je skutočný polomer rovnobežky, takže jej dĺžka 2πρ sa zachová.'),
  c('Postelovo azimutálne zobrazenie, R = 4 cm. Polomer obrazu rovníka?', ['6,28 cm', '8,00 cm', '4,00 cm', '5,66 cm'], 'ρ = R·(90° − U) = 4·π/2 = 6,28 cm (skutočná dĺžka poludníka od pólu). 8 stereografická, 4 ortografická, 5,66 Lambertovo.'),
  c('Lambertovo azimutálne ekvivalentné, R = 4 cm. Polomer obrazu rovnobežky 30°?', ['4,00 cm', '4,19 cm', '3,46 cm', '4,62 cm'], 'ρ = 2R·sin((90° − U)/2) = 8·sin 30° = 4,00 cm.'),
  c('Gallova stereografická projekcia: valec je sečný v rovnobežke…', ['45°', '30°', '0° (dotykový)', '60°'], 'Gall: sečný valec v U₀ = 45°, x = R·cos 45°·V, y = R·(1 + cos 45°)·tg(U/2). Dotykový je Braunov.'),
  c('V Mercatorovom zobrazení je m na rovnobežke 60° rovné…', ['2', '1', '0,5', '4'], 'm_p = m_r = 1/cos 60° = 2. Plošné skreslenie je 4.'),
  c('Aký obraz má pól v Ptolemaiovom zobrazení (U₀ = 45°)?', ['Kružnicový oblúk', 'Bod', 'Nezobrazí sa', 'Priamka'], 'ρ(90°) = R·(cotg 45° − π/4) = 0,21·R > 0, teda oblúk.'),
  c('Gnómonická projekcia vo všeobecnej polohe: obraz poludníkov?', ['Priamky cez obraz pólu', 'Kružnice', 'Elipsy', 'Rovnobežné priamky'], 'Poludníky sú časti hlavných kružníc → priamky; všetky prechádzajú pólom.'),
  c('Na akom zobrazení je postavený S-JTSK?', ['Křovákovo: dvojité konformné kužeľové v šikmej polohe', 'Mercatorovo', 'Gauss-Krügerovo valcové', 'Ptolemaiovo'], 'Křovákovo zobrazenie: elipsoid → guľa (konformne), potom konformné kužeľové v šikmej polohe.'),
  c('Gnómonická pólová projekcia, R = 5 cm. Polomer obrazu rovnobežky 45°?', ['5,00 cm', '3,54 cm', '7,07 cm', '4,14 cm'], 'ρ = R·cotg 45° = 5 cm. (3,54 je ortografická R·cos 45°, 4,14 stereografická 2R·tg 22,5°.)'),
  c('Mercatorovo–Sansonovo zobrazenie: ktorá vlastnosť platí?', ['Je ekvivalentné', 'Je konformné', 'Poludníky sú priamky', 'Pól je úsečka'], 'x = R·V·cos U, y = R·U: rovnobežky v skutočnej dĺžke a skutočných vzdialenostiach → plochy sa zachovajú. Pól je bod.'),
  c('V stereografickej pólovej projekcii sa loxodróma zobrazí ako…', ['Logaritmická špirála', 'Priamka', 'Kružnica', 'Elipsa'], 'Projekcia je konformná, poludníky sú polpriamky z P; krivka pretínajúca ich pod stálym uhlom je logaritmická špirála.'),
  c('Gnómonická kužeľová projekcia, R = 4 cm, dotykový kužeľ v U₀ = 45°. ρ pre U = 60°?', ['2,93 cm', '2,95 cm', '4,00 cm', '2,31 cm'], 'ρ = R·cotg U₀ − R·tg(U − U₀) = 4 − 4·tg 15° = 4 − 1,07 = 2,93 cm. (2,95 je Ptolemaiovo.)'),
  c('Ortografická rovníková poloha: rovnobežka 30° je úsečka vo vzdialenosti od rovníka (R = 4 cm)…', ['2,00 cm', '3,46 cm', '2,31 cm', '2,09 cm'], 'y = R·sin U = 4·0,5 = 2,00 cm.'),
  c('Ktoré zobrazenie je kompromisné (vyrovnávacie)?', ['Eckertovo priamkové vyrovnávacie', 'Mercatorovo', 'Lambertovo izocylindrické', 'Stereografická projekcia'], 'Vyrovnávacie nezachová presne nič. Mercator a stereografická sú konformné, Lambert ekvivalentné.'),
];
