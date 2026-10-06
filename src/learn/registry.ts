import React from 'react';
import { LimitApproach, LineParam, MonotonyDrag, ParabolaShift, Riemann, SecantTangent } from './widgets/analyza';
import { DopplerMove, LensDrag, MalusTurn, PhaseSum, SnellDrag, SpringPeriod, WaveLambda } from './widgets/fyzika';
import { MatMul, SarrusTap } from './widgets/matice';
import { BossTriangle, CrossCover, VecAB, VecDot } from './widgets/vektory';

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
  sarrus: { title: 'Vyskúšaj: Sarrusovo pravidlo', lead: 'Ťukaj na šesť uhlopriečok a skladaj determinant.', C: SarrusTap },
  secant: { title: 'Vyskúšaj: zo sečnice dotyčnica', lead: 'Zmenšuj krok h a sleduj, kam sa blíži sklon.', C: SecantTangent },
  riemann: { title: 'Vyskúšaj: plocha z obdĺžnikov', lead: 'Pridávaj obdĺžniky a sleduj, ako sa súčet blíži k integrálu.', C: Riemann },
  limit: { title: 'Vyskúšaj: blížime sa k nule', lead: 'Posúvaj x k nule z oboch strán.', C: LimitApproach },
  monotony: { title: 'Vyskúšaj: rastie alebo klesá?', lead: 'Ťahaj bod po krivke a sleduj znamienko f′(x).', C: MonotonyDrag },
  parabola: { title: 'Vyskúšaj: posuň parabolu', lead: 'Tri posuvníky, tri parametre. Trafíš cieľ?', C: ParabolaShift },
  lineparam: { title: 'Vyskúšaj: parameter t', lead: 'Každé t je jeden bod priamky.', C: LineParam },
  spring: { title: 'Pokus: pružina', lead: 'Meň hmotnosť a tuhosť. Závažie kmitá naozaj s vypočítanou periódou.', C: SpringPeriod },
  wave: { title: 'Pokus: vlnová dĺžka', lead: 'Meň frekvenciu a rýchlosť vlny.', C: WaveLambda },
  doppler: { title: 'Pokus: idúca siréna', lead: 'Rozbehni zdroj zvuku a sleduj vlnoplochy.', C: DopplerMove },
  snell: { title: 'Pokus: lom svetla', lead: 'Ťahaj žltý lúč alebo posuvník. Vyber prostredia.', C: SnellDrag },
  lens: { title: 'Pokus: spojka', lead: 'Ťahaj predmet (ružová šípka) k šošovke a od nej.', C: LensDrag },
  malus: { title: 'Pokus: polarizačný filter', lead: 'Otáčaj analyzátor.', C: MalusTurn },
  phase: { title: 'Pokus: dva kmity naraz', lead: 'Meň fázový rozdiel a amplitúdu druhého kmitu.', C: PhaseSum },
};

/** Kam sa vložia pokusy: téma → { index kroku lekcie: id pokusov } (zobrazia sa po výklade kroku). */
export const EXTRAS: Record<string, Record<number, string[]>> = {
  'mat:vektory': { 1: ['vec-ab'], 5: ['vec-dot'], 8: ['cross-cover'], 9: ['boss-triangle'] },
  'mat:matice': { 3: ['matmul'] },
  'mat:determinanty': { 2: ['sarrus'] },
  'mat:derivacie': { 1: ['secant'] },
  'mat:integraly': { 2: ['riemann'] },
  'mat:limity': { 8: ['limit'] },
  'mat:priebeh': { 1: ['monotony'] },
  'mat:funkcie': { 8: ['parabola'] },
  'mat:geometria': { 1: ['lineparam'] },
  'fyz:kmity': { 9: ['spring'] },
  'fyz:skladanie': { 3: ['phase'] },
  'fyz:vlny': { 3: ['wave'] },
  'fyz:doppler': { 2: ['doppler'] },
  'fyz:optika': { 5: ['snell'] },
  'fyz:sosovky': { 10: ['lens'] },
  'fyz:em': { 9: ['malus'] },
};
