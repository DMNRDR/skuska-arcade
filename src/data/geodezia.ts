import { Question, Topic } from '../types';

// Zdroj: AIS dokumentový server B1-GD1 (doc. Marčiš): Zadanie 5 – Zákon hromadenia stredných chýb,
//        5_Zakon_hromadenia_strednych_chyb.pdf (vzorový príklad), G1_zad5-vstupne_hodnoty.xlsx (zadanie č. 15).

export const GEO_TOPICS: Topic[] = [
  { id: 'z5', subject: 'geo', name: 'Zadanie 5: čo ťa čaká', icon: '📋', src: 'Zadávací hárok Z5' },
  { id: 'chyby', subject: 'geo', name: 'Stredná chyba od nuly', icon: '🎯', src: 'Podklady Z5, úloha A' },
  { id: 'zakon', subject: 'geo', name: 'Zákon hromadenia stredných chýb', icon: '🧮', src: 'Podklady Z5' },
  { id: 'ulohaA', subject: 'geo', name: 'Úloha A: kruhová stavba', icon: '⭕', src: 'Zadanie č. 15, úloha A' },
  { id: 'ulohaB', subject: 'geo', name: 'Úloha B: výškový rozdiel', icon: '⛰️', src: 'Zadanie č. 15, úloha B' },
];

type Row = [topic: string, diff: 1 | 2 | 3, q: string, options: string[], explain: string, src: string];

const rows: Row[] = [
  // ───────────── ZADANIE 5 ─────────────
  ['z5', 1, 'Čo sa odovzdáva v Zadaní 5?', ['Výpočtový protokol', 'Zápisník z terénu', 'Náčrt stanoviska', 'Fotka prístroja'], 'Zadávací hárok: Obsah programu – 1. Výpočtový protokol.', 'Zadávací hárok'],
  ['z5', 1, 'Koľko gradov má plný kruh?', ['400 g', '360 g', '200 g', '100 g'], 'Pravý uhol má 100 g, plný kruh 400 g.', 'Gradová miera'],
  ['z5', 1, 'Na aký režim prepneš kalkulačku pri úlohe B?', ['GRAD', 'DEG', 'RAD', 'Je to jedno'], 'Uhol β je zadaný v gradoch.', 'Podklady Z5'],
  ['z5', 2, 'Koľko cc má jeden grad?', ['10 000 cc', '100 cc', '3 600 cc', '1 000 cc'], '1 g = 100 c, 1 c = 100 cc.', 'Gradová miera'],
  ['z5', 2, 'Ako zapíšeš 19,5082 g v gradoch, minútach a sekundách?', ['19g 50c 82cc', '19g 5c 82cc', '19g 58c 20cc', '195g 08c 20cc'], 'Číslice za čiarkou idú po dvoch: 50 | 82.', 'Gradová miera'],
  ['z5', 1, 'Koľko úloh má Zadanie 5?', ['Dve (A a B)', 'Jednu', 'Tri', 'Päť'], 'A: kruhová stavba, B: výškový rozdiel.', 'Zadávací hárok'],

  // ───────────── STREDNÁ CHYBA ─────────────
  ['chyby', 1, 'Najpravdepodobnejšia hodnota z viacerých meraní tej istej veličiny je…', ['aritmetický priemer', 'najväčšie meranie', 'prvé meranie', 'medián vynásobený n'], 'r̄ = Σr / n.', 'Podklady Z5'],
  ['chyby', 1, 'Ako sa počíta oprava v?', ['v = r̄ − rᵢ', 'v = rᵢ − r̄', 'v = rᵢ / r̄', 'v = (r̄ − rᵢ)²'], 'Priemer mínus meranie (tak je to v podkladoch).', 'Podklady Z5'],
  ['chyby', 1, 'Aký je súčet všetkých opráv Σv?', ['0', 'n', 'Σv²', 'm₀'], 'To je kontrola správneho priemeru.', 'Podklady Z5'],
  ['chyby', 2, 'Vzorec jednotkovej strednej chyby je…', ['m₀ = √(Σv² / (n − 1))', 'm₀ = Σv / n', 'm₀ = √(Σv² / n²)', 'm₀ = Σv² / (n − 1)'], 'Pod odmocninou súčet štvorcov opráv deleno n − 1.', 'Podklady Z5'],
  ['chyby', 2, 'Stredná chyba aritmetického priemeru je…', ['mr = m₀ / √n', 'mr = m₀ · √n', 'mr = m₀ / n', 'mr = m₀ − n'], 'Priemer je √n-krát presnejší ako jedno meranie.', 'Podklady Z5'],
  ['chyby', 2, 'Prečo delíme n − 1 a nie n?', ['Jedno meranie sme použili na výpočet priemeru', 'Lebo prvé meranie sa nepočíta', 'Aby vyšla menšia chyba', 'Je to len zaokrúhlenie'], 'Počet nadbytočných meraní je n − 1.', 'Podklady Z5'],
  ['chyby', 2, 'Priemer 131,240 m, meranie 131,40 m. Oprava v je…', ['−160 mm', '+160 mm', '−16 mm', '+0,16 mm'], '131,240 − 131,40 = −0,160 m.', 'Zadanie č. 15'],
  ['chyby', 2, 'Pomerná chyba sa zapisuje ako…', ['1 : (r̄ / mr)', 'mr · r̄', 'r̄ − mr', 'mr²'], 'Napríklad 1 : 6500 v príklade z podkladov.', 'Podklady Z5'],
  ['chyby', 3, 'm₀ = 26 mm, n = 6. Stredná chyba priemeru mr je približne…', ['11 mm', '26 mm', '4 mm', '64 mm'], '26 / √6 = 10,6 mm.', 'Podklady Z5'],

  // ───────────── ZÁKON HROMADENIA ─────────────
  ['zakon', 1, 'Zákon hromadenia stredných chýb určuje…', ['strednú chybu výsledku vypočítaného z meraných veličín', 'priemer meraní', 'počet meraní', 'opravu v'], 'Chyby meraní sa „nahromadia“ vo výsledku funkcie.', 'Podklady Z5'],
  ['zakon', 2, 'Člen pre jednu veličinu v zákone hromadenia je…', ['(∂f/∂x · mx)²', '∂f/∂x + mx', 'mx / ∂f/∂x', 'f(x) · mx'], 'Derivácia krát chyba, na druhú.', 'Podklady Z5'],
  ['zakon', 2, 'Stredná chyba obvodu O = 2πr je…', ['mO = 2π · mr', 'mO = π · mr²', 'mO = 2π · r · mr', 'mO = mr / 2π'], 'Derivácia 2πr podľa r je 2π.', 'Podklady Z5'],
  ['zakon', 2, 'Stredná chyba plochy P = πr² je…', ['mP = 2π · r · mr', 'mP = π · mr²', 'mP = 2π · mr', 'mP = π · r · mr'], 'Derivácia πr² podľa r je 2πr.', 'Podklady Z5'],
  ['zakon', 2, 'Dve nezávislé chyby po 3 mm dajú spolu…', ['≈ 4,2 mm', '6 mm', '3 mm', '9 mm'], '√(3² + 3²) = √18 ≈ 4,24 mm.', 'Zákon hromadenia'],
  ['zakon', 2, 'Prečo chybu uhla v cc delíme ρ?', ['Aby bola v radiánoch', 'Aby bola v gradoch', 'Aby bola v metroch', 'Lebo je to zaokrúhlenie'], 'Derivácie goniometrických funkcií platia pre radiány.', 'Podklady Z5'],
  ['zakon', 3, 'Koľko je ρ v cc?', ['≈ 636 620', '≈ 206 265', '400', '10 000'], 'ρ = 200/π · 10 000. 206 265 je ρ v stupňových sekundách.', 'Podklady Z5'],
  ['zakon', 3, 'Derivácia d · tg β podľa β je…', ['d / cos²β', 'd · cos β', 'tg β', '−d / sin²β'], '(tg β)′ = 1 / cos²β.', 'Podklady Z5'],

  // ───────────── ÚLOHA A ─────────────
  ['ulohaA', 1, 'Aký je priemer tvojich 6 meraní polomeru (zadanie č. 15)?', ['131,240 m', '131,400 m', '131,215 m', '787,44 m'], '787,44 / 6 = 131,240 m.', 'Zadanie č. 15'],
  ['ulohaA', 2, 'Aký je súčet Σv² v tvojej úlohe A?', ['43 600 mm²', '0 mm²', '3 484 mm²', '8 720 mm²'], '25 600 + 2 500 + 8 100 + 0 + 2 500 + 4 900.', 'Zadanie č. 15'],
  ['ulohaA', 2, 'Tvoja jednotková stredná chyba m₀ je…', ['≈ 93 mm', '≈ 38 mm', '≈ 26 mm', '≈ 8 720 mm'], '√(43 600 / 5) = √8 720 = 93,4 mm.', 'Zadanie č. 15'],
  ['ulohaA', 2, 'Tvoja stredná chyba priemeru mr je…', ['≈ 38 mm', '≈ 93 mm', '≈ 15 mm', '≈ 228 mm'], '93,4 / √6 = 38,1 mm.', 'Zadanie č. 15'],
  ['ulohaA', 2, 'Obvod tvojej stavby O je…', ['824,605 m', '412,302 m', '54 110,6 m', '131,240 m'], '2 · π · 131,240.', 'Zadanie č. 15'],
  ['ulohaA', 3, 'Plocha tvojej stavby P a jej chyba mP sú…', ['54 111 m², 31 m²', '54 111 m², 0,24 m²', '17 224 m², 31 m²', '824,6 m², 5 m²'], 'P = π · 131,24², mP = 2π · 131,24 · 0,0381.', 'Zadanie č. 15'],
  ['ulohaA', 3, 'Tvoja pomerná chyba polomeru je približne…', ['1 : 3 400', '1 : 6 500', '1 : 340', '1 : 34 000'], '131,240 / 0,0381 = 3 443.', 'Zadanie č. 15'],

  // ───────────── ÚLOHA B ─────────────
  ['ulohaB', 1, 'Vzorec trigonometrického výškového rozdielu je…', ['Δh = d · tg β + hp − hc', 'Δh = d · sin β − hp + hc', 'Δh = d / tg β', 'Δh = d · cos β + hp + hc'], 'Výška zámery d·tg β, plus prístroj, mínus cieľ.', 'Podklady Z5'],
  ['ulohaB', 1, 'Čo je hp?', ['Výška prístroja nad bodom A', 'Výška cieľa nad B', 'Výškový rozdiel', 'Vodorovná dĺžka'], 'hc je výška cieľa.', 'Podklady Z5'],
  ['ulohaB', 2, 'Koľko je tg(19,5082 g)?', ['0,3164', '0,3543', '0,9534', '19,5082'], 'V režime GRAD. 0,3543 by bolo v stupňoch.', 'Zadanie č. 15'],
  ['ulohaB', 2, 'Tvoj výškový rozdiel Δh je…', ['63,85 m', '63,68 m', '67,99 m', '201,26 m'], '201,26 · 0,3164 + 2,31 − 2,14.', 'Zadanie č. 15'],
  ['ulohaB', 2, 'Derivácia Δh podľa hc je…', ['−1', '1', '0', 'tg β'], 'hc sa odčítava. Po umocnení znamienko zmizne.', 'Podklady Z5'],
  ['ulohaB', 3, 'Tvoja stredná chyba mΔh je približne…', ['0,02 m', '0,04 m', '0,24 m', '0,002 m'], '√(0,0095² + 0,0017² + 0,02² + 0,01²) = 0,024 m.', 'Zadanie č. 15'],
  ['ulohaB', 3, 'Ktorý člen najviac zväčšuje tvoju mΔh?', ['mhp = 0,02 m', 'mβ = 5cc', 'mhc = 0,01 m', 'md = 0,03 m'], 'tg β · md = 0,0095 m, uhol 0,0017 m, hp 0,02 m.', 'Zadanie č. 15'],
];

export const GEO_QUESTIONS: Question[] = rows.map(([topic, diff, q, options, explain, src], i) => ({
  id: `geo-${topic}-${i}`,
  subject: 'geo',
  topic,
  diff,
  q,
  options,
  explain,
  src,
}));
