# Skúška Arcade

Študijná hra na Fyziku 1 a Matematiku 1 (STU SvF, ZS 2026/27). Expo / React Native, beží na mobile cez Expo Go aj vo webe.

**Hraj online:** https://dmnrdr.github.io/skuska-arcade/
**Android APK:** [Releases](https://github.com/DMNRDR/skuska-arcade/releases/latest)

## Spustenie

```bash
cd skola/skuska-arcade
npm install
npx expo start
```

- **Mobil:** nainštaluj si Expo Go (App Store / Google Play), mobil musí byť na tej istej Wi-Fi ako počítač, naskenuj QR kód z terminálu.
- **Web:** v termináli stlač `w` (alebo `npx expo start --web`), otvorí sa http://localhost:8081.
- Ak mobil QR kód nevidí (iná sieť), použi `npx expo start --tunnel`.

## Režimy

- **Učebňa:** 16 tém (9 z Maty, 7 z Fyziky). Každá lekcia je klikacia prezentácia: jedna myšlienka na obrazovku, veľký text, vzorce, kde ťukneš na symbol a zistíš, čo znamená, riešené príklady odkrývané krok po kroku, mini otázky s okamžitou odozvou a 19 pokusov na dotyk (ťahanie bodov A, B s výpočtom AB = B − A, uhol a skalárny súčin s „KOLMÉ“ pri 90°, vektorový súčin „zakry stĺpec“, násobenie matíc klikom na políčko, Sarrus, sečnica → dotyčnica, obdĺžniky pod grafom, pružina, vlna, Doppler, Snellov zákon, šošovka, Malus, skladanie kmitov, boss príklad s odomykanými krokmi). Na konci boss témy a ťahák. Na webe funguje aj šípkami na klávesnici.
- **Dron geodet:** zameriavaš body na mape, dron letí podľa vektora, ktorý zadáš. Let stojí batériu podľa |v|, bezletové zóny a kontrolné body pýtajú otázky.
- **Kasíno Istota:** ruleta vyberie tému a násobič, potom staviaš žetóny podľa toho, ako si istý odpoveďou. Len virtuálne žetóny. Na konci kalibrácia istoty.
- **Cesta na skúšku:** stolová hra s kockou proti spolužiakovi, na farebnom políčku otázka z danej témy, rebríky a šmyky.
- **Kampaň:** level za každú tému z prednášok, 8 otázok, 3 životy, 1 až 3 hviezdy, levely sa odomykajú postupne.
- **Arcade (Meteorový dážď):** 60 s, +3 s za správnu, −5 s za chybu, combo násobič až x4, rekord.
- **Boss:** zraz bossovi 2000 HP; rýchla odpoveď = kritický zásah, chyba = stratený život. Power-upy 50/50 a štít.
- **Tréning chýb:** opakuje otázky, ktoré si pokazil (po správnej odpovedi zmiznú zo zoznamu).

Za všetko sa zbiera XP a levely (Prvák → Nobelista). Postup sa ukladá v zariadení.

## Odkiaľ sú otázky

- `src/data/fyzika.ts` – z `ZS_2026-27/Fyzika_1/Prednasky/OsnovaSodpovedamiV3.pdf`, `Cvicenia/ZoznamPrikladov.pdf` a riešení v `Briefing_1`. Pri každej otázke je uvedená strana prednášky alebo číslo príkladu.
- `src/data/matematika.ts` – z tematického plánu `ZS_2026-27/Matematika_1/Skuska/Harmonogram_Mat1_GaK.pdf` (prednášky z Maty v repe zatiaľ nie sú).
- `src/data/steps-fyz.ts`, `src/data/steps-mat.ts` – lekcie Učebne krok po kroku, `src/data/learn.ts` – ťaháky.
- `src/components/diagrams.tsx`, `src/components/figures.tsx` – animované SVG obrázky (react-native-svg).
- `src/learn/` – prehrávač lekcií (`Player.tsx`), delenie krokov na obrazovky (`slides.ts`), pokusy na dotyk (`widgets/`) a kde sa v lekciách objavia (`registry.ts`).
- `src/games/` – Dron geodet, Kasíno Istota, Cesta na skúšku.
- Assety a licencie: [ASSETS.md](ASSETS.md) (Kenney.nl CC0, písma OFL).
- `src/data/generators.ts` – generátory náhodných výpočtových príkladov (perióda, Doppler, Snell, šošovky, determinanty, vektorové súčiny, derivácie, integrály…).

## Build

- Web (GitHub Pages): `EXPO_BASE_URL=/skuska-arcade npx expo export -p web`, obsah `dist/` ide do vetvy `gh-pages`.
- APK: `npx expo prebuild -p android`, v `android/settings.gradle` daj `rootProject.name` bez diakritiky a medzier, potom `cd android && ./gradlew assembleRelease`. Na Windows builduj z krátkej cesty (napr. `subst S: <priečinok>`), inak CMake narazí na limit 260 znakov.

Nové otázky stačí pripísať do poľa `rows` (prvá možnosť je vždy správna, poradie sa mieša).
