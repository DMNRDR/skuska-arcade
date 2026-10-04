import type { Step } from '../steps';
import { FYZ_STEPS } from '../steps-fyz';
import { MAT_STEPS } from '../steps-mat';
import fyz_doppler from './fyz-doppler';
import fyz_em from './fyz-em';
import fyz_kmity from './fyz-kmity';
import fyz_optika from './fyz-optika';
import fyz_skladanie from './fyz-skladanie';
import fyz_sosovky from './fyz-sosovky';
import fyz_vlny from './fyz-vlny';
import mat_derivacie from './mat-derivacie';
import mat_determinanty from './mat-determinanty';
import mat_funkcie from './mat-funkcie';
import mat_geometria from './mat-geometria';
import mat_integraly from './mat-integraly';
import mat_limity from './mat-limity';
import mat_matice from './mat-matice';
import mat_priebeh from './mat-priebeh';
import mat_vektory from './mat-vektory';

// Podrobné lekcie: každá téma má vlastný súbor <predmet>-<téma>.ts s `export default steps`.
// Kým súbor neexistuje, použije sa kratšia verzia zo steps-fyz.ts / steps-mat.ts.
const DETAILED: Record<string, Step[]> = {
  'fyz:doppler': fyz_doppler,
  'fyz:em': fyz_em,
  'fyz:kmity': fyz_kmity,
  'fyz:optika': fyz_optika,
  'fyz:skladanie': fyz_skladanie,
  'fyz:sosovky': fyz_sosovky,
  'fyz:vlny': fyz_vlny,
  'mat:derivacie': mat_derivacie,
  'mat:determinanty': mat_determinanty,
  'mat:funkcie': mat_funkcie,
  'mat:geometria': mat_geometria,
  'mat:integraly': mat_integraly,
  'mat:limity': mat_limity,
  'mat:matice': mat_matice,
  'mat:priebeh': mat_priebeh,
  'mat:vektory': mat_vektory,
};

export const LESSON_STEPS: Record<string, Step[]> = { ...FYZ_STEPS, ...MAT_STEPS, ...DETAILED };
