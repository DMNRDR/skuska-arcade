# Overenie čísel v lekciách, tézach a leveloch 3. písomky z Metód zobrazovania (kartografia).
# Spusti: python scripts/check_kart.py  → vypíše NESEDÍ pri chybe.
from math import *
d = radians
def cot(x): return 1 / tan(x)
T = [  # (popis, vypočítané, očakávané v texte)
 ('orto R4 U60', 4*cos(d(60)), 2.00), ('orto R4 U30', 4*cos(d(30)), 3.46),
 ('gnom R4 U60', 4*cot(d(60)), 2.31), ('gnom R4 U30', 4*cot(d(30)), 6.93),
 ('stereo R4 U60', 8*tan(d(15)), 2.14), ('stereo R4 U30', 8*tan(d(30)), 4.62), ('stereo R4 U0', 8*tan(d(45)), 8.00), ('stereo R4 U-30', 8*tan(d(60)), 13.86),
 ('postel R4 rovnik', 4*pi/2, 6.28), ('lambert az R4 U30', 8*sin(d(30)), 4.00),
 ('lambert valc R3 U30', 3*sin(d(30)), 1.50), ('lambert valc R3 U60', 3*sin(d(60)), 2.60),
 ('ekvi R3 U30', 3*pi/6, 1.57), ('ekvi R3 U60', 3*pi/3, 3.14), ('ekvi R3 U90', 3*pi/2, 4.71),
 ('merc R3 U30', 3*log(tan(d(60))), 1.65), ('merc R3 U60', 3*log(tan(d(75))), 3.95),
 ('gnom valc R3 U60', 3*tan(d(60)), 5.20), ('gnom valc R3 U45', 3*tan(d(45)), 3.00), ('braun R3 U60', 6*tan(d(30)), 3.46),
 ('merc R3 U45', 3*log(tan(d(67.5))), 2.64), ('ekvi R3 U45', 3*pi/4, 2.36), ('lambert R3 U45', 3*sin(d(45)), 2.12),
 ('ptol R4 U0=45 U30', 4 + 4*d(15), 5.05), ('ptol U60', 4 - 4*d(15), 2.95), ('ptol U0', 4 + 4*d(45), 7.14), ('ptol U90', 4 - 4*d(45), 0.86),
 ('eps V90 U0=45', 90*sin(d(45)), 63.6), ('eps V60 U0=30', 60*sin(d(30)), 30.0),
 ('gnom kuzel U60', 4 - 4*tan(d(15)), 2.93), ('werner R4 U30', 4*pi/3, 4.19),
 ('gnom R5 U45', 5*cot(d(45)), 5.00), ('orto R5 U45', 5*cos(d(45)), 3.54), ('stereo R5 U45', 10*tan(d(22.5)), 4.14),
 ('orto rovn R4 U30', 4*sin(d(30)), 2.00), ('antipod 64/4', 64/4, 16.0), ('merc m 60', 1/cos(d(60)), 2.0),
 ('rovnobezka 60 km', 6380*cos(d(60)), 3190), ('pomer 30: orto', cos(d(30)), 0.87), ('lamb', 2*sin(d(30)), 1.00), ('postel', pi/3, 1.05), ('stereo', 2*tan(d(30)), 1.15), ('gnom', cot(d(30)), 1.73),
 ('sin U0=45 n', sin(d(45)), 0.707),
]
bad = 0
for name, val, exp in T:
    dec = len(str(exp).split('.')[1]) if '.' in str(exp) else 0
    ok = abs(round(val, max(dec, 2)) - exp) <= 0.5 * 10 ** (-max(dec, 1)) + 1e-9 if dec else round(val) == exp
    if not ok: bad += 1; print('NESEDÍ', name, val, exp)
print('kontrol:', len(T), 'chyby:', bad)
