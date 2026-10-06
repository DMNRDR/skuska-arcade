import type { Check, Formula, Step, Worked } from '../data/steps';
import { EXTRAS } from './registry';

// Z kroku lekcie (Step) poskladá krátke obrazovky: jedna myšlienka na obrazovku.

export type Slide = { step: number; stepTitle: string; first: boolean } & (
  | { kind: 'text'; text: string; fig?: string }
  | { kind: 'fig'; fig: string }
  | { kind: 'widget'; id: string }
  | { kind: 'analogy'; text: string }
  | { kind: 'formula'; formula: Formula }
  | { kind: 'deeper'; text: string }
  | { kind: 'worked'; worked: Worked }
  | { kind: 'check'; check: Check }
  | { kind: 'bullets'; items: string[] }
);

const ABBR = /(?:\bnapr|\btzv|\bresp|\batď|\bč|\bstr|\bt\.j|\bobr|\bprof|\bdoc|\bIng|\bMgr|\bpr|\bcca|\bvs)\.$/i;

/** Rozdelí dlhý odsek na kúsky po 1–3 vetách (max ~300 znakov), nerozbíja skratky. */
export function chunk(par: string, max = 300): string[] {
  const p = par.trim();
  if (p.length <= max) return [p];
  const sentences: string[] = [];
  let cur = '';
  const re = /([.!?])(\s+)(?=[A-ZÁÄČĎÉÍĹĽŇÓÔŔŠŤÚÝŽ„(0-9])/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(p))) {
    const piece = p.slice(last, m.index + 1);
    cur += piece;
    if (!ABBR.test(cur.trim())) {
      sentences.push(cur.trim());
      cur = '';
    }
    last = m.index + 1 + m[2].length;
  }
  cur += p.slice(last);
  if (cur.trim()) sentences.push(cur.trim());
  const out: string[] = [];
  let buf = '';
  for (const s of sentences) {
    if (buf && (buf + ' ' + s).length > max) {
      out.push(buf);
      buf = s;
    } else buf = buf ? buf + ' ' + s : s;
  }
  if (buf) out.push(buf);
  // príliš krátky posledný kúsok pripoj k predošlému
  if (out.length > 1 && out[out.length - 1].length < 90) {
    const tail = out.pop()!;
    out[out.length - 1] += ' ' + tail;
  }
  return out;
}

export function buildSlides(topicKey: string, steps: Step[]): Slide[] {
  const out: Slide[] = [];
  steps.forEach((st, i) => {
    const base = { step: i, stepTitle: st.title };
    const push = (s: Omit<Slide, 'step' | 'stepTitle' | 'first'> & Partial<Slide>) => {
      out.push({ ...base, first: !out.some((o) => o.step === i), ...(s as object) } as Slide);
    };
    const paras = st.text.split(/\n\s*\n/).flatMap((p) => chunk(p));
    const widgets = EXTRAS[topicKey]?.[i] ?? [];
    // obrázok priložíme k prvému odseku, aby text a obrázok boli spolu
    paras.forEach((p, j) => push({ kind: 'text', text: p, fig: j === 0 && st.fig && paras.length > 1 ? st.fig : undefined }));
    if (st.fig && paras.length <= 1) push({ kind: 'fig', fig: st.fig });
    if (st.analogy) push({ kind: 'analogy', text: st.analogy });
    if (st.formula) push({ kind: 'formula', formula: st.formula });
    widgets.forEach((id) => push({ kind: 'widget', id }));
    if (st.deeper) push({ kind: 'deeper', text: st.deeper });
    if (st.worked) push({ kind: 'worked', worked: st.worked });
    if (st.bullets?.length) push({ kind: 'bullets', items: st.bullets });
    if (st.check) push({ kind: 'check', check: st.check });
  });
  return out;
}
