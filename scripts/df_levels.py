# Overenie a generovanie úrovní otázok pre 3. písomku z Mat 1 (definičný obor).
# Každá otázka: (f na zobrazenie, python výraz, správna odpoveď, zlé odpovede, kroky)
import math, re, json, sys
import sympy as sp

def cbrt(x): return math.copysign(abs(x) ** (1 / 3), x)
def ln(x): return math.log(x)
def log(x, b=10): return math.log(x, b)
def sqrt(x): return math.sqrt(x)
asin, acos, atan = math.asin, math.acos, math.atan

L1 = [
 ("3x⁴ − 2x² + 7", "3*x**4-2*x**2+7", "ℝ", ["ℝ ∖ {0}", "⟨0, ∞)", "(0, ∞)"],
  ["Je to polynóm: iba sčítanie, násobenie a mocniny s prirodzeným exponentom.", "Nie je tam zlomok s x v menovateli, odmocnina ani logaritmus, nič sa nemôže pokaziť.", "Polynóm má vždy D = ℝ."]),
 ("(x + 1) / (x − 4)", "(x+1)/(x-4)", "ℝ ∖ {4}", ["ℝ ∖ {−1}", "ℝ ∖ {−1; 4}", "(4, ∞)"],
  ["Zlomok → menovateľ ≠ 0: x − 4 ≠ 0.", "x ≠ 4. Čitateľ x + 1 smie byť nula, ten nerieš.", "Vyhodíš jediný bod."]),
 ("5 / (x² − 9)", "5/(x**2-9)", "ℝ ∖ {−3; 3}", ["ℝ ∖ {3}", "ℝ ∖ {9}", "(−3, 3)"],
  ["Menovateľ ≠ 0: x² − 9 ≠ 0.", "x² ≠ 9 → x ≠ 3 a zároveň x ≠ −3 (pozor, kvadrát má DVA korene).", "Vyhodíš dva body."]),
 ("2x / (x² − 5x + 6)", "2*x/(x**2-5*x+6)", "ℝ ∖ {2; 3}", ["ℝ ∖ {−2; −3}", "ℝ ∖ {0}", "ℝ ∖ {6}"],
  ["Menovateľ ≠ 0: x² − 5x + 6 ≠ 0.", "Rozlož: hľadáš dve čísla so súčinom 6 a súčtom 5 → 2 a 3: (x − 2)(x − 3) ≠ 0.", "x ≠ 2 a x ≠ 3. (Kontrola: 4 − 10 + 6 = 0 ✓, 9 − 15 + 6 = 0 ✓.)"]),
 ("x / (x² + 1)", "x/(x**2+1)", "ℝ", ["ℝ ∖ {−1; 1}", "ℝ ∖ {−1}", "ℝ ∖ {0}"],
  ["Menovateľ ≠ 0: x² + 1 ≠ 0.", "x² ≥ 0, takže x² + 1 ≥ 1. Menovateľ nikdy nie je nula.", "Nevypadne žiadny bod: D = ℝ. (x² = −1 nemá reálne riešenie.)"]),
 ("(x² − 1) / (x + 1)", "(x**2-1)/(x+1)", "ℝ ∖ {−1}", ["ℝ", "ℝ ∖ {1}", "ℝ ∖ {−1; 1}"],
  ["Pasca: zlomok sa dá vykrátiť na x − 1, ale definičný obor sa určuje z PÔVODNÉHO predpisu.", "Menovateľ ≠ 0: x + 1 ≠ 0 → x ≠ −1.", "Čitateľ x² − 1 = 0 pre x = ±1 nič nezakazuje."]),
 ("√(2x − 6)", "sqrt(2*x-6)", "⟨3, ∞)", ["(3, ∞)", "(−∞, 3⟩", "⟨−3, ∞)"],
  ["Pod odmocninou ≥ 0: 2x − 6 ≥ 0.", "2x ≥ 6 → x ≥ 3.", "3 patrí (√0 = 0) → lomená zátvorka ⟨3."]),
 ("√(4 − x)", "sqrt(4-x)", "(−∞, 4⟩", ["⟨4, ∞)", "(−∞, 4)", "⟨−4, ∞)"],
  ["Pod odmocninou ≥ 0: 4 − x ≥ 0.", "4 ≥ x, teda x ≤ 4 (čísla naľavo od 4).", "4 patrí → (−∞, 4⟩."]),
 ("1 / √(x + 5)", "1/sqrt(x+5)", "(−5, ∞)", ["⟨−5, ∞)", "ℝ ∖ {−5}", "(5, ∞)"],
  ["Odmocnina chce x + 5 ≥ 0, menovateľ chce √(x + 5) ≠ 0, teda x + 5 ≠ 0.", "Spolu ostro: x + 5 > 0 → x > −5.", "−5 nepatrí (delenie nulou) → okrúhla zátvorka."]),
 ("√(9 − x²)", "sqrt(9-x**2)", "⟨−3, 3⟩", ["(−3, 3)", "(−∞, −3⟩ ∪ ⟨3, ∞)", "⟨0, 3⟩"],
  ["Pod odmocninou ≥ 0: 9 − x² ≥ 0 → x² ≤ 9.", "x² ≤ 9 ⇔ |x| ≤ 3 ⇔ −3 ≤ x ≤ 3 (jeden kus okolo nuly).", "Kraje patria (√0 = 0). Kontrola: x = 0 → √9 ✓, x = 4 → √(−7) ✗ ✓."]),
 ("√x + 1 / (x − 2)", "sqrt(x)+1/(x-2)", "⟨0, 2) ∪ (2, ∞)", ["⟨0, ∞)", "(0, 2) ∪ (2, ∞)", "ℝ ∖ {2}"],
  ["Odmocnina: x ≥ 0.", "Zlomok: x − 2 ≠ 0 → x ≠ 2.", "Prienik: od 0 (patrí) doprava, s dierou v 2."]),
 ("∛(x − 7)", "cbrt(x-7)", "ℝ", ["⟨7, ∞)", "(7, ∞)", "ℝ ∖ {7}"],
  ["Tretia odmocnina je NEPÁRNA, dá sa aj zo záporného čísla: ∛(−8) = −2.", "Žiadna podmienka.", "D = ℝ."]),
]

L2 = [
 ("log₄(2x + 3)", "log(2*x+3,4)", "(−3/2, ∞)", ["⟨−3/2, ∞)", "(3/2, ∞)", "(−∞, −3/2)"],
  ["Logaritmus (s akýmkoľvek základom) chce argument > 0: 2x + 3 > 0.", "2x > −3 → x > −3/2. Pozor na znamienko: −3/2, nie 3/2.", "Ostrá nerovnosť → okrúhla zátvorka."]),
 ("ln(5 − x)", "ln(5-x)", "(−∞, 5)", ["(−∞, 5⟩", "(5, ∞)", "(−5, ∞)"],
  ["Argument > 0: 5 − x > 0.", "5 > x, teda x < 5.", "5 nepatrí (ln 0 neexistuje) → (−∞, 5)."]),
 ("log(x² − 4x)", "log(x**2-4*x)", "(−∞, 0) ∪ (4, ∞)", ["(0, 4)", "(−∞, 0⟩ ∪ ⟨4, ∞)", "(4, ∞)"],
  ["Argument > 0: x² − 4x > 0 → x(x − 4) > 0.", "Korene 0 a 4. Parabola otvorená hore je kladná MIMO koreňov.", "x < 0 alebo x > 4, kraje nie (ostro)."]),
 ("ln(x² + 4)", "ln(x**2+4)", "ℝ", ["(−2, 2)", "(−∞, −2) ∪ (2, ∞)", "(0, ∞)"],
  ["Argument > 0: x² + 4 > 0.", "x² ≥ 0, takže x² + 4 ≥ 4 > 0 vždy.", "Podmienka platí pre každé x: D = ℝ."]),
 ("√(x + 3) + ln(1 − x)", "sqrt(x+3)+ln(1-x)", "⟨−3, 1)", ["(−3, 1)", "⟨−3, 1⟩", "⟨−3, ∞)"],
  ["Odmocnina: x + 3 ≥ 0 → x ≥ −3.", "Logaritmus: 1 − x > 0 → x < 1.", "Prienik: −3 ≤ x < 1. −3 patrí, 1 nie."]),
 ("1 / ln x", "1/ln(x)", "(0, 1) ∪ (1, ∞)", ["(0, ∞)", "(1, ∞)", "ℝ ∖ {0}"],
  ["Logaritmus: x > 0.", "Menovateľ: ln x ≠ 0. ln je nula iba z jednotky → x ≠ 1.", "Od 0 doprava s dierou v 1."]),
 ("ln x + √(4 − x)", "ln(x)+sqrt(4-x)", "(0, 4⟩", ["⟨0, 4⟩", "(0, 4)", "(−∞, 4⟩"],
  ["Logaritmus: x > 0.", "Odmocnina: 4 − x ≥ 0 → x ≤ 4.", "Prienik: 0 < x ≤ 4 → (0, 4⟩."]),
 ("log₂(x − 1) / (x − 3)", "log(x-1,2)/(x-3)", "(1, 3) ∪ (3, ∞)", ["(1, ∞)", "⟨1, 3) ∪ (3, ∞)", "ℝ ∖ {3}"],
  ["Logaritmus: x − 1 > 0 → x > 1.", "Menovateľ: x − 3 ≠ 0 → x ≠ 3.", "Od 1 (nepatrí) doprava s dierou v 3."]),
 ("√((x − 2) / (x + 3))", "sqrt((x-2)/(x+3))", "(−∞, −3) ∪ ⟨2, ∞)", ["(−∞, −3⟩ ∪ ⟨2, ∞)", "(−3, 2⟩", "(−∞, −3) ∪ (2, ∞)"],
  ["Podmienka: (x − 2)/(x + 3) ≥ 0, menovateľ x ≠ −3.", "Nulové body: 2 (čitateľ), −3 (menovateľ).", "Tabuľka: x = −4 → (−6)/(−1) = 6 > 0 (+);  x = 0 → (−2)/3 < 0 (−);  x = 3 → 1/6 > 0 (+).", "Plusové kúsky. 2 patrí (zlomok = 0, √0 = 0), −3 nie (delenie nulou)."]),
 ("ln((x + 1) / (4 − x))", "ln((x+1)/(4-x))", "(−1, 4)", ["(−∞, −1) ∪ (4, ∞)", "⟨−1, 4)", "(−1, 4⟩"],
  ["Logaritmus: (x + 1)/(4 − x) > 0.", "Nulové body: −1 (čitateľ), 4 (menovateľ).", "Tabuľka: x = −2 → (−1)/6 < 0 (−);  x = 0 → 1/4 > 0 (+);  x = 5 → 6/(−1) < 0 (−).", "Plusový je stredný kúsok, kraje nie (ostro): (−1, 4). Pozor, 4 − x má x so znamienkom mínus, preto sú znamienka obrátené oproti bežnému vzoru."]),
 ("√((3 − x) / (x + 1))", "sqrt((3-x)/(x+1))", "(−1, 3⟩", ["⟨−1, 3⟩", "(−∞, −1) ∪ ⟨3, ∞)", "(−1, 3)"],
  ["Podmienka: (3 − x)/(x + 1) ≥ 0 a x ≠ −1.", "Nulové body: 3 (čitateľ), −1 (menovateľ).", "Tabuľka: x = −2 → 5/(−1) < 0 (−);  x = 0 → 3/1 > 0 (+);  x = 4 → (−1)/5 < 0 (−).", "Plusový je stred. 3 patrí (√0), −1 nie (delenie nulou)."]),
 ("√(1/x − 1)", "sqrt(1/x-1)", "(0, 1⟩", ["(0, 1)", "⟨0, 1⟩", "(−∞, 0) ∪ ⟨1, ∞)"],
  ["Podmienka: 1/x − 1 ≥ 0. NEnásob x-om (nevieš, či je kladné), preveď na jeden zlomok.", "1/x − 1 = (1 − x)/x ≥ 0, menovateľ x ≠ 0.", "Nulové body 1 a 0. Tabuľka: x = −1 → 2/(−1) < 0 (−);  x = 1/2 → (1/2)/(1/2) = 1 > 0 (+);  x = 2 → (−1)/2 < 0 (−).", "Plusový stred. 1 patrí (√0), 0 nie (delenie nulou)."]),
]

L3 = [
 ("arcsin(5 − 2x)", "asin(5-2*x)", "⟨2, 3⟩", ["(2, 3)", "⟨−3, −2⟩", "⟨−1, 1⟩"],
  ["arcsin berie iba čísla od −1 do 1: −1 ≤ 5 − 2x ≤ 1.", "Odčítaj 5 od všetkých troch strán: −6 ≤ −2x ≤ −4.", "Vydeľ −2. Delíš ZÁPORNÝM, oba znaky sa otočia: 3 ≥ x ≥ 2.", "Zapíš od menšieho: 2 ≤ x ≤ 3. Kraje patria (arcsin(±1) existuje)."]),
 ("arcsin(2x + 1)", "asin(2*x+1)", "⟨−1, 0⟩", ["⟨0, 1⟩", "(−1, 0)", "⟨−1, 1⟩"],
  ["−1 ≤ 2x + 1 ≤ 1 (príklad z prednášky).", "Odčítaj 1: −2 ≤ 2x ≤ 0.", "Vydeľ 2 (kladné, znaky ostávajú): −1 ≤ x ≤ 0."]),
 ("arccos((x − 1) / 2)", "acos((x-1)/2)", "⟨−1, 3⟩", ["⟨−3, 1⟩", "(−1, 3)", "⟨0, 2⟩"],
  ["arccos tiež iba od −1 do 1: −1 ≤ (x − 1)/2 ≤ 1.", "Vynásob 2: −2 ≤ x − 1 ≤ 2.", "Pripočítaj 1: −1 ≤ x ≤ 3."]),
 ("arccos(3x − 2)", "acos(3*x-2)", "⟨1/3, 1⟩", ["⟨−1, −1/3⟩", "(1/3, 1)", "⟨1, 3⟩"],
  ["−1 ≤ 3x − 2 ≤ 1.", "Pripočítaj 2: 1 ≤ 3x ≤ 3.", "Vydeľ 3: 1/3 ≤ x ≤ 1."]),
 ("arcsin(log₂ x)", "asin(log(x,2))", "⟨1/2, 2⟩", ["(0, 2⟩", "⟨−1, 1⟩", "(1/2, 2)"],
  ["Logaritmus: x > 0.", "arcsin: −1 ≤ log₂ x ≤ 1.", "Prepíš čísla na logaritmy: −1 = log₂(1/2), 1 = log₂ 2. Základ 2 > 1, znaky ostávajú: 1/2 ≤ x ≤ 2.", "Prienik s x > 0 nič nemení: ⟨1/2, 2⟩."]),
 ("arcsin(x − 1) + ln x", "asin(x-1)+ln(x)", "(0, 2⟩", ["⟨0, 2⟩", "(0, 2)", "⟨−1, 1⟩"],
  ["arcsin: −1 ≤ x − 1 ≤ 1 → 0 ≤ x ≤ 2.", "Logaritmus: x > 0.", "Prienik: 0 vypadne kvôli logaritmu → (0, 2⟩."]),
 ("arccos(x/3) / (x − 1)", "acos(x/3)/(x-1)", "⟨−3, 1) ∪ (1, 3⟩", ["⟨−3, 3⟩", "(−3, 1) ∪ (1, 3)", "ℝ ∖ {1}"],
  ["arccos: −1 ≤ x/3 ≤ 1 → −3 ≤ x ≤ 3.", "Menovateľ: x − 1 ≠ 0 → x ≠ 1.", "⟨−3, 3⟩ s dierou v 1."]),
 ("√(x + 2) / ln(3 − x)", "sqrt(x+2)/ln(3-x)", "⟨−2, 2) ∪ (2, 3)", ["⟨−2, 3)", "(−2, 2) ∪ (2, 3)", "⟨−2, 2) ∪ (2, ∞)"],
  ["Odmocnina: x + 2 ≥ 0 → x ≥ −2.", "Logaritmus: 3 − x > 0 → x < 3.", "Menovateľ: ln(3 − x) ≠ 0 → 3 − x ≠ 1 → x ≠ 2.", "Prienik: ⟨−2, 3) bez bodu 2."]),
 ("ln(x + 4) / √(1 − x)", "ln(x+4)/sqrt(1-x)", "(−4, 1)", ["(−4, 1⟩", "⟨−4, 1)", "(−4, ∞)"],
  ["Logaritmus: x + 4 > 0 → x > −4.", "Odmocnina v MENOVATELI: 1 − x > 0 (ostro!) → x < 1.", "Prienik: −4 < x < 1."]),
 ("√(2 − log₀,₅ x)", "sqrt(2-log(x,0.5))", "⟨1/4, ∞)", ["(0, 1/4⟩", "⟨4, ∞)", "(1/4, ∞)"],
  ["Logaritmus: x > 0.", "Odmocnina: 2 − log₀,₅ x ≥ 0 → log₀,₅ x ≤ 2.", "2 = log₀,₅(1/4), lebo 0,5² = 1/4.", "Základ 0,5 < 1 → logaritmus KLESÁ → znak sa otočí: x ≥ 1/4 (prednáška, slajd 30)."]),
 ("√(log₂(x − 1))", "sqrt(log(x-1,2))", "⟨2, ∞)", ["(1, ∞)", "(2, ∞)", "⟨1, 2⟩"],
  ["Logaritmus: x − 1 > 0 → x > 1.", "Odmocnina: log₂(x − 1) ≥ 0 = log₂ 1.", "Základ 2 > 1, znak ostáva: x − 1 ≥ 1 → x ≥ 2.", "Prienik s x > 1: ⟨2, ∞)."]),
 ("ln(√(x + 3) − 1)", "ln(sqrt(x+3)-1)", "(−2, ∞)", ["⟨−3, ∞)", "(−3, ∞)", "(1, ∞)"],
  ["Odmocnina: x + 3 ≥ 0 → x ≥ −3.", "Logaritmus: √(x + 3) − 1 > 0 → √(x + 3) > 1.", "Obe strany sú nezáporné, smieš umocniť: x + 3 > 1 → x > −2.", "Prienik: x > −2."]),
 ("arctg(1 / √(x² − 4x + 3))", "atan(1/sqrt(x**2-4*x+3))", "(−∞, 1) ∪ (3, ∞)", ["(1, 3)", "(−∞, 1⟩ ∪ ⟨3, ∞)", "ℝ"],
  ["arctg nemá podmienku (prednáška, slajd 31).", "Odmocnina v menovateli: x² − 4x + 3 > 0 → (x − 1)(x − 3) > 0.", "Parabola otvorená hore je kladná mimo koreňov: x < 1 alebo x > 3, ostro."]),
 ("∛(2 − ln x)", "cbrt(2-ln(x))", "(0, ∞)", ["(0, e²⟩", "ℝ", "⟨e², ∞)"],
  ["∛ je nepárna odmocnina → bez podmienky (pasca: nepíš 2 − ln x ≥ 0).", "Logaritmus: x > 0.", "D = (0, ∞) (prednáška, slajd 30)."]),
]

L4 = [
 ("√(x² − 5x + 6) / ln x", "sqrt(x**2-5*x+6)/ln(x)", "(0, 1) ∪ (1, 2⟩ ∪ ⟨3, ∞)", ["(0, 2⟩ ∪ ⟨3, ∞)", "(−∞, 2⟩ ∪ ⟨3, ∞)", "(0, 1) ∪ (1, 2) ∪ (3, ∞)"],
  ["Odmocnina: x² − 5x + 6 ≥ 0 → (x − 2)(x − 3) ≥ 0 → x ≤ 2 alebo x ≥ 3.", "Logaritmus: x > 0.", "Menovateľ: ln x ≠ 0 → x ≠ 1.", "Prienik: (0, 2⟩ ∪ ⟨3, ∞) a vyhoď 1."]),
 ("ln((x² − 1) / (x + 3))", "ln((x**2-1)/(x+3))", "(−3, −1) ∪ (1, ∞)", ["(−∞, −3) ∪ (−1, 1)", "(1, ∞)", "⟨−3, −1⟩ ∪ ⟨1, ∞)"],
  ["Logaritmus: (x − 1)(x + 1)/(x + 3) > 0.", "Nulové body: −3, −1, 1 → štyri kúsky.", "Tabuľka: x = −4 → (−5)(−3)/(−1) < 0 (−);  x = −2 → (−3)(−1)/1 > 0 (+);  x = 0 → (−1)(1)/3 < 0 (−);  x = 2 → (1)(3)/5 > 0 (+).", "Plusové kúsky, kraje nie (ostro)."]),
 ("arcsin((x + 1)/3) + √x", "asin((x+1)/3)+sqrt(x)", "⟨0, 2⟩", ["⟨−4, 2⟩", "(0, 2⟩", "⟨0, ∞)"],
  ["arcsin: −1 ≤ (x + 1)/3 ≤ 1 → −3 ≤ x + 1 ≤ 3 → −4 ≤ x ≤ 2.", "Odmocnina: x ≥ 0.", "Prienik: ⟨0, 2⟩."]),
 ("log₄(2x + 3) + √(6 − x) / (x − 1)", "log(2*x+3,4)+sqrt(6-x)/(x-1)", "(−3/2, 1) ∪ (1, 6⟩", ["(−3/2, 6⟩", "⟨−3/2, 1) ∪ (1, 6⟩", "(3/2, 6⟩"],
  ["Logaritmus: 2x + 3 > 0 → x > −3/2.", "Odmocnina: 6 − x ≥ 0 → x ≤ 6.", "Menovateľ: x ≠ 1.", "Prienik: (−3/2, 6⟩ bez 1."]),
 ("arccos(2x − 3) + 1 / ln x", "acos(2*x-3)+1/ln(x)", "(1, 2⟩", ["⟨1, 2⟩", "(0, 2⟩", "(1, 2)"],
  ["arccos: −1 ≤ 2x − 3 ≤ 1 → 2 ≤ 2x ≤ 4 → 1 ≤ x ≤ 2.", "Logaritmus: x > 0. Menovateľ: ln x ≠ 0 → x ≠ 1.", "Z ⟨1, 2⟩ vypadne 1: (1, 2⟩."]),
 ("√(4 − x²) + ln(x + 1)", "sqrt(4-x**2)+ln(x+1)", "(−1, 2⟩", ["⟨−2, 2⟩", "⟨−1, 2⟩", "(−1, 2)"],
  ["Odmocnina: 4 − x² ≥ 0 → |x| ≤ 2 → −2 ≤ x ≤ 2.", "Logaritmus: x + 1 > 0 → x > −1.", "Prienik: −1 < x ≤ 2."]),
 ("√((x + 2)/(x − 3)) + ln(5 − x)", "sqrt((x+2)/(x-3))+ln(5-x)", "(−∞, −2⟩ ∪ (3, 5)", ["(−∞, −2⟩ ∪ ⟨3, 5)", "(−2, 3)", "(−∞, −2) ∪ (3, 5⟩"],
  ["Odmocnina: (x + 2)/(x − 3) ≥ 0, x ≠ 3. Tabuľka: (−∞, −2) +, (−2, 3) −, (3, ∞) + → (−∞, −2⟩ ∪ (3, ∞).", "Logaritmus: 5 − x > 0 → x < 5.", "Prienik: (−∞, −2⟩ ∪ (3, 5)."]),
 ("√(3 − log₂ x)", "sqrt(3-log(x,2))", "(0, 8⟩", ["⟨8, ∞)", "(0, 8)", "(−∞, 8⟩"],
  ["Logaritmus: x > 0.", "Odmocnina: log₂ x ≤ 3 = log₂ 8.", "Základ 2 > 1, znak ostáva: x ≤ 8.", "Spolu: (0, 8⟩."]),
 ("ln(4 − x²) / x", "ln(4-x**2)/x", "(−2, 0) ∪ (0, 2)", ["(−2, 2)", "⟨−2, 0) ∪ (0, 2⟩", "(−∞, −2) ∪ (2, ∞)"],
  ["Logaritmus: 4 − x² > 0 → x² < 4 → −2 < x < 2.", "Menovateľ: x ≠ 0.", "(−2, 2) s dierou v 0."]),
 ("arcsin(5 − 2x) · ln(x − 2)", "asin(5-2*x)*ln(x-2)", "(2, 3⟩", ["⟨2, 3⟩", "(2, ∞)", "(2, 3)"],
  ["arcsin: −1 ≤ 5 − 2x ≤ 1 → −6 ≤ −2x ≤ −4 → 2 ≤ x ≤ 3 (delenie −2 otočí znaky).", "Logaritmus: x − 2 > 0 → x > 2.", "Prienik: 2 vypadne → (2, 3⟩."]),
 ("√(ln(x − 2))", "sqrt(ln(x-2))", "⟨3, ∞)", ["(2, ∞)", "⟨2, ∞)", "(3, ∞)"],
  ["Logaritmus: x − 2 > 0 → x > 2.", "Odmocnina: ln(x − 2) ≥ 0 = ln 1 → x − 2 ≥ 1 → x ≥ 3.", "Prienik: ⟨3, ∞)."]),
 ("1 / √(x² + 2x − 8) + arcsin(x/5)", "1/sqrt(x**2+2*x-8)+asin(x/5)", "⟨−5, −4) ∪ (2, 5⟩", ["(−∞, −4) ∪ (2, ∞)", "⟨−5, 5⟩", "⟨−5, −4⟩ ∪ ⟨2, 5⟩"],
  ["Odmocnina v menovateli: x² + 2x − 8 > 0 → (x + 4)(x − 2) > 0 → x < −4 alebo x > 2.", "arcsin: −1 ≤ x/5 ≤ 1 → −5 ≤ x ≤ 5.", "Prienik: ⟨−5, −4) ∪ (2, 5⟩."]),
]

# ---------- parser odpovedí ----------
def num(s):
    s = s.strip().replace('−', '-').replace('∞', 'oo').replace('e²', 'E**2')
    return sp.nsimplify(sp.sympify(s))

def parse(s):
    s = s.strip()
    if s == 'ℝ': return sp.S.Reals
    m = re.fullmatch(r'ℝ ∖ \{(.*)\}', s)
    if m: return sp.S.Reals - sp.FiniteSet(*[num(t) for t in m.group(1).split(';')])
    out = sp.S.EmptySet
    for part in s.split('∪'):
        part = part.strip()
        lb, rb = part[0], part[-1]
        a, b = part[1:-1].split(',')
        out = out | sp.Interval(num(a), num(b), lb == '(', rb == ')')
    return out

def defined(expr, x):
    try:
        v = eval(expr, {**globals(), 'x': x})
        return isinstance(v, float) or isinstance(v, int)
    except (ValueError, ZeroDivisionError, OverflowError):
        return False

bad = 0
for name, lvl in [('L1', L1), ('L2', L2), ('L3', L3), ('L4', L4)]:
    for f, py, ans, wrong, steps in lvl:
        A = parse(ans)
        # numerická kontrola na mriežke + okolo krajných bodov
        pts = [i / 400 for i in range(-6000, 6001)]
        ends = [float(e) for e in A.boundary if e.is_finite]
        for e in ends: pts += [e, e - 1e-7, e + 1e-7]
        mism = [p for p in pts if defined(py, p) != bool(A.contains(sp.Float(p) if p not in ends else sp.nsimplify(p)))]
        if mism:
            bad += 1; print(name, f, 'MISMATCH', mism[:6])
        for w in wrong:
            if parse(w) == A: bad += 1; print(name, f, 'WRONG==ANS', w)
        if len(set(wrong + [ans])) != 4: bad += 1; print(name, f, 'dup options')
print('chyby:', bad)

def ts_str(s): return json.dumps(s, ensure_ascii=False)
if bad == 0 and len(sys.argv) > 1:
    with open(sys.argv[1], 'w', encoding='utf-8') as o:
        o.write("import type { Check } from './steps';\n\n")
        o.write("// Úrovne otázok pre 3. písomku z Mat 1 (definičný obor), 11. 11. 2026.\n")
        o.write("// GENEROVANÉ skriptom df_levels.py: každá odpoveď overená numericky (mriežka 0,0025 na ⟨−15, 15⟩ + okolie krajných bodov)\n")
        o.write("// a zlé možnosti skontrolované, že sa líšia od správnej. options[0] je správna.\n")
        o.write("// L3 a časť L4 podľa prednášky doc. Minarechovej Funkcie, základné vlastnosti, slajdy 30 a 31.\n\n")
        for name, lvl in [('L1', L1), ('L2', L2), ('L3', L3), ('L4', L4)]:
            o.write(f"export const DF_{name}: Check[] = [\n")
            for f, py, ans, wrong, steps in lvl:
                ex = '\n'.join(f'{i+1}) {s}' for i, s in enumerate(steps)) + f'\n→ D(f) = {ans}'
                o.write(f"  {{ q: {ts_str('Urči definičný obor funkcie f(x) = ' + f + '.')}, options: {ts_str([ans] + wrong)}, explain: {ts_str(ex)} }},\n")
            o.write("];\n\n")
    print('zapísané', sys.argv[1])
