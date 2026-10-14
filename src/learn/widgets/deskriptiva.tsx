import React, { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { C, F, haptic } from '../../components/ui';
import { CH, T, useOnce } from '../kit';
import { DG_PICS, Rys, RYS, rysXml } from './dgGeo';

// Deskriptíva: rysovačky krok po kroku na kriedovej tabuli. Geometria je v dgGeo.ts.

const SUB: Record<string, string> = { '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', ',': ',' };

/** text kroku: <b>…</b> tučne, A_1 dolný index, h^α horný index */
function Rich({ text, style }: { text: string; style: object }) {
  const parts: React.ReactNode[] = [];
  const re = /<b>(.*?)<\/b>|([_^])(\{[^}]*\}|[^\s<])|([^<_^]+|[<_^])/g;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m[1] !== undefined) parts.push(<Rich key={k++} text={m[1]} style={{ fontFamily: F.bodyBold }} />);
    else if (m[2]) {
      const s = m[3].replace(/[{}]/g, '');
      const uni = m[2] === '_' && [...s].every((ch) => SUB[ch]);
      parts.push(
        uni ? (
          [...s].map((ch) => SUB[ch]).join('')
        ) : (
          <Text key={k++} style={{ fontSize: 12 }}>
            {s}
          </Text>
        ),
      );
    } else parts.push(m[4]);
  }
  return <Text style={style}>{parts}</Text>;
}

function Board({ r, upTo }: { r: Rys; upTo: number }) {
  const [, , w, h] = r.vb.split(' ').map(Number);
  const xml = useMemo(() => rysXml(r, upTo), [r, upTo]);
  return (
    <View style={{ width: '100%', aspectRatio: w / h, backgroundColor: CH.bg, borderRadius: 8, overflow: 'hidden' }}>
      <SvgXml xml={xml} width="100%" height="100%" />
    </View>
  );
}

function Btn({ title, onPress, disabled, solid }: { title: string; onPress: () => void; disabled?: boolean; solid?: boolean }) {
  return (
    <Pressable
      disabled={disabled}
      onPress={() => {
        haptic('tap');
        onPress();
      }}
      style={({ pressed }) => ({
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: C.ink,
        backgroundColor: solid ? C.ink : C.sheet,
        opacity: disabled ? 0.35 : pressed ? 0.7 : 1,
        alignItems: 'center',
      })}
    >
      <Text style={{ fontFamily: F.bodyBold, fontSize: 16, color: solid ? C.sheet : C.ink }}>{title}</Text>
    </Pressable>
  );
}

/** konštrukcia: tabuľa + text kroku + tlačidlá; onWin po poslednom kroku */
export function Rysovacka({ id, onWin }: { id: string; onWin?: () => void }) {
  const r = RYS[id];
  const [st, setSt] = useState(0);
  const last = r.steps.length - 1;
  useOnce(st === last, () => onWin?.());
  return (
    <View style={{ gap: 10 }}>
      <Board r={r} upTo={st} />
      <View style={{ borderWidth: 2, borderStyle: 'dashed', borderColor: C.gold, borderRadius: 8, padding: 12, minHeight: 92 }}>
        <Text style={[T.small, { fontFamily: F.monoBold, color: C.gold }]}>
          KROK {st + 1} Z {r.steps.length}
        </Text>
        <Rich text={r.steps[st].t} style={T.lead} />
      </View>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Btn title="Krok späť" disabled={st === 0} onPress={() => setSt(st - 1)} />
        <Btn title={st === last ? 'Hotovo' : 'Ďalší krok'} solid disabled={st === last} onPress={() => setSt(st + 1)} />
      </View>
      <Text style={T.small}>Najprv si krok skús narysovať sám na papier, potom ťukni. Biela = zadané, modrá = pomocné, žltá = práve teraz, ružová = výsledok.</Text>
    </View>
  );
}

/** statický obrázok do kroku lekcie (fig: 'dg-…') */
export function DgPic({ id }: { id: string }) {
  const r = DG_PICS[id];
  return r ? <Board r={r} upTo={0} /> : null;
}

export const DG_PIC_NAMES = Object.keys(DG_PICS);

/** komponent pre registry: jedna konštrukcia = jeden pokus */
export const rys = (id: string) =>
  function DgWidget({ onWin }: { onWin?: () => void }) {
    return <Rysovacka id={id} onWin={onWin} />;
  };
