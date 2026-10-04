# Skúška Arcade

Študijná hra na Fyziku 1 a Matematiku 1 (STU SvF, ZS 2026/27). Expo / React Native, beží na mobile cez Expo Go aj vo webe.

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

- **Kampaň:** level za každú tému z prednášok, 8 otázok, 3 životy, 1 až 3 hviezdy, levely sa odomykajú postupne.
- **Arcade (Meteorový dážď):** 60 s, +3 s za správnu, −5 s za chybu, combo násobič až x4, rekord.
- **Boss:** zraz bossovi 2000 HP; rýchla odpoveď = kritický zásah, chyba = stratený život. Power-upy 50/50 a štít.
- **Tréning chýb:** opakuje otázky, ktoré si pokazil (po správnej odpovedi zmiznú zo zoznamu).

Za všetko sa zbiera XP a levely (Prvák → Nobelista). Postup sa ukladá v zariadení.

## Odkiaľ sú otázky

- `src/data/fyzika.ts` – z `ZS_2026-27/Fyzika_1/Prednasky/OsnovaSodpovedamiV3.pdf`, `Cvicenia/ZoznamPrikladov.pdf` a riešení v `Briefing_1`. Pri každej otázke je uvedená strana prednášky alebo číslo príkladu.
- `src/data/matematika.ts` – z tematického plánu `ZS_2026-27/Matematika_1/Skuska/Harmonogram_Mat1_GaK.pdf` (prednášky z Maty v repe zatiaľ nie sú).
- `src/data/generators.ts` – generátory náhodných výpočtových príkladov (perióda, Doppler, Snell, šošovky, determinanty, vektorové súčiny, derivácie, integrály…).

Nové otázky stačí pripísať do poľa `rows` (prvá možnosť je vždy správna, poradie sa mieša).
