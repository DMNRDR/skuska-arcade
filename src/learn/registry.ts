import React from 'react';
import { LimitApproach, LineParam, LnTransform, MonotonyDrag, ParabolaShift, Riemann, SecantTangent } from './widgets/analyza';
import { DopplerMove, LensDrag, MalusTurn, PhaseSum, SnellDrag, SpringPeriod, WaveLambda } from './widgets/fyzika';
import { MatMul, SarrusTap } from './widgets/matice';
import { BossTriangle, CrossCover, VecAB, VecDot } from './widgets/vektory';
import { rys } from './widgets/deskriptiva';
import { EigenDrag } from './widgets/vlastne';

export type WidgetDef = {
  title: string;
  /** krátka výzva nad pokusom */
  lead: string;
  C: (p: { onWin?: () => void }) => React.ReactElement;
  boss?: boolean;
};

export const WIDGETS: Record<string, WidgetDef> = {
  'vec-ab': { title: 'Vyskúšaj: koniec mínus začiatok', lead: 'Posúvaj body A a B. Výpočet pod tabuľou sa mení s nimi.', C: VecAB },
  'vec-dot': { title: 'Vyskúšaj: uhol a skalárny súčin', lead: 'Otáčaj vektor v. Sleduj znamienko u·v.', C: VecDot },
  'cross-cover': { title: 'Vyskúšaj: zakry stĺpec', lead: 'Vektorový súčin po zložkách, každú klikom.', C: CrossCover },
  'boss-triangle': { title: 'Boss príklad', lead: 'Celý skúškový príklad, krok po kroku. Ďalší krok sa odomkne, až keď je predošlý správne.', C: BossTriangle, boss: true },
  matmul: { title: 'Vyskúšaj: riadok krát stĺpec', lead: 'Ťukni na políčko výsledku a uvidíš, odkiaľ sa vzalo.', C: MatMul },
  'eigen-drag': { title: 'Vyskúšaj: smer, ktorý matica neotočí', lead: 'Otáčaj vektor v a hľadaj, kedy A·v ostane na tej istej priamke.', C: EigenDrag },
  sarrus: { title: 'Vyskúšaj: Sarrusovo pravidlo', lead: 'Ťukaj na šesť uhlopriečok a skladaj determinant.', C: SarrusTap },
  secant: { title: 'Vyskúšaj: zo sečnice dotyčnica', lead: 'Zmenšuj krok h a sleduj, kam sa blíži sklon.', C: SecantTangent },
  riemann: { title: 'Vyskúšaj: plocha z obdĺžnikov', lead: 'Pridávaj obdĺžniky a sleduj, ako sa súčet blíži k integrálu.', C: Riemann },
  limit: { title: 'Vyskúšaj: blížime sa k nule', lead: 'Posúvaj x k nule z oboch strán.', C: LimitApproach },
  monotony: { title: 'Vyskúšaj: rastie alebo klesá?', lead: 'Ťahaj bod po krivke a sleduj znamienko f′(x).', C: MonotonyDrag },
  lntrans: { title: 'Vyskúšaj: sedem podôb ln x', lead: 'Úloha z prednášky: prepínaj funkcie a porovnaj so sivým ln x.', C: LnTransform },
  parabola: { title: 'Vyskúšaj: posuň parabolu', lead: 'Tri posuvníky, tri parametre. Trafíš cieľ?', C: ParabolaShift },
  lineparam: { title: 'Vyskúšaj: parameter t', lead: 'Každé t je jeden bod priamky.', C: LineParam },
  spring: { title: 'Pokus: pružina', lead: 'Meň hmotnosť a tuhosť. Závažie kmitá naozaj s vypočítanou periódou.', C: SpringPeriod },
  wave: { title: 'Pokus: vlnová dĺžka', lead: 'Meň frekvenciu a rýchlosť vlny.', C: WaveLambda },
  doppler: { title: 'Pokus: idúca siréna', lead: 'Rozbehni zdroj zvuku a sleduj vlnoplochy.', C: DopplerMove },
  snell: { title: 'Pokus: lom svetla', lead: 'Ťahaj žltý lúč alebo posuvník. Vyber prostredia.', C: SnellDrag },
  lens: { title: 'Pokus: spojka', lead: 'Ťahaj predmet (ružová šípka) k šošovke a od nej.', C: LensDrag },
  malus: { title: 'Pokus: polarizačný filter', lead: 'Otáčaj analyzátor.', C: MalusTurn },
  phase: { title: 'Pokus: dva kmity naraz', lead: 'Meň fázový rozdiel a amplitúdu druhého kmitu.', C: PhaseSum },
  // deskriptíva: rysovačky krok po kroku
  'dg-elipsa': { title: 'Rysuj: 4 body elipsy', lead: 'Dané F₁, F₂ a 2a. Ťukaj Ďalší krok.', C: rys('dg-elipsa') },
  'dg-elipsa-osk': { title: 'Rysuj: oskulačné kružnice elipsy', lead: 'Dané osi AB a CD.', C: rys('dg-elipsa-osk') },
  'dg-hyp': { title: 'Rysuj: 4 body hyperboly', lead: 'Dané F₁, F₂ a 2a.', C: rys('dg-hyp') },
  'dg-hyp-as': { title: 'Rysuj: asymptoty a oskulačné kružnice', lead: 'Dané F₁, F₂ a 2a.', C: rys('dg-hyp-as') },
  'dg-par': { title: 'Rysuj: parabola a oskulačná kružnica', lead: 'Dané F a d. Bolo na utorkovej písomke.', C: rys('dg-par') },
  'dg-k1': { title: 'Rysuj: sklopenie úsečky', lead: 'Skutočná dĺžka, stopník aj spádový uhol naraz.', C: rys('dg-k1') },
  'dg-k2': { title: 'Rysuj: stupňovanie priamky', lead: 'A₁(96), B₁(89).', C: rys('dg-k2') },
  'dg-k3': { title: 'Rysuj: kóta bodu na priamke', lead: 'A₁(38), B₁(45), hľadáš kótu M.', C: rys('dg-k3') },
  'dg-k4': { title: 'Rysuj: spádové merítko z troch bodov', lead: 'A₁(−1), B₁(2), C₁(4).', C: rys('dg-k4') },
  'dg-k5': { title: 'Rysuj: kóta bodu v rovine', lead: 'Rovina daná spádovým merítkom.', C: rys('dg-k5') },
  'dg-k6': { title: 'Rysuj: spádový uhol roviny', lead: 'Sklopenie spádovej priamky.', C: rys('dg-k6') },
  'dg-k7': { title: 'Rysuj: priesečnica dvoch rovín', lead: 'Roviny dané hlavnými priamkami.', C: rys('dg-k7') },
  'dg-k8': { title: 'Rysuj: priesečnica, keď sú hlavné priamky rovnobežné', lead: 'Pomôže pomocná rovina.', C: rys('dg-k8') },
  'dg-t1': { title: 'Rysuj: priesečníky priamky s terénom', lead: 'Metóda profilu. Bolo na utorkovej písomke.', C: rys('dg-t1') },
  'dg-t2': { title: 'Rysuj: spádový uhol plochy v bode', lead: 'Vrstevnice po 1 m, mierka j.', C: rys('dg-t2') },
  'dg-t3': { title: 'Rysuj: krivka s konštantným spádom', lead: 'Spád 2/5 z bodu A.', C: rys('dg-t3') },
  'dg-t4': { title: 'Rysuj: spádnica', lead: 'Z bodu A kolmo cez vrstevnice.', C: rys('dg-t4') },
  'dg-t5': { title: 'Rysuj: rez terénu rovinou', lead: 'Rovina daná spádovým merítkom.', C: rys('dg-t5') },
  'dg-m': { title: 'Rysuj: bokorys bodu', lead: 'Z pôdorysu a nárysu.', C: rys('dg-m') },
  'dg-b': { title: 'Rysuj: teleso v troch priemetoch', lead: 'Nárys, pôdorys, bokorys a bod Q.', C: rys('dg-b') },
};

/** Kam sa vložia pokusy: téma → { index kroku lekcie: id pokusov } (zobrazia sa po výklade kroku). */
export const EXTRAS: Record<string, Record<number, string[]>> = {
  'mat:vektory': { 1: ['vec-ab'], 5: ['vec-dot'], 8: ['cross-cover'], 9: ['boss-triangle'] },
  'mat:matice': { 3: ['matmul'] },
  'mat:determinanty': { 2: ['sarrus'] },
  'mat:vlastne': { 2: ['eigen-drag'] },
  'mat:derivacie': { 1: ['secant'] },
  'mat:integraly': { 2: ['riemann'] },
  'mat:limity': { 8: ['limit'] },
  'mat:priebeh': { 1: ['monotony'] },
  'mat:funkcie': { 8: ['lntrans'], 17: ['parabola'] },
  'mat:geometria': { 1: ['lineparam'] },
  'fyz:kmity': { 9: ['spring'] },
  'fyz:skladanie': { 3: ['phase'] },
  'fyz:vlny': { 3: ['wave'] },
  'fyz:doppler': { 2: ['doppler'] },
  'fyz:optika': { 5: ['snell'] },
  'fyz:sosovky': { 10: ['lens'] },
  'fyz:em': { 9: ['malus'] },
  'dg:kuzelosecky': { 1: ['dg-elipsa'], 2: ['dg-elipsa-osk'], 4: ['dg-hyp'], 5: ['dg-hyp-as'], 6: ['dg-par'] },
  'dg:kotovane': { 2: ['dg-k1'], 3: ['dg-k2'], 4: ['dg-k3'], 6: ['dg-k4'], 7: ['dg-k5'], 8: ['dg-k6'], 9: ['dg-k7'], 10: ['dg-k8'] },
  'dg:topo': { 1: ['dg-t1'], 2: ['dg-t2'], 4: ['dg-t3'], 5: ['dg-t4'], 6: ['dg-t5'] },
  'dg:monge': { 2: ['dg-m'], 4: ['dg-b'] },
};
