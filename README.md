# berry

A static reference site for **Onyberyus ("Berry")**, a level 7 Wildfire Druid.

Live at **[tusharc.dev/berry](https://tusharc.dev/berry)**.

Sections: character overview, **Mechanics** (spell save DC, attack modifiers, action
economy), **Proficiencies & Languages**, **Combat Tracker** (spell slots, hit points,
concentration), **Spells** (cantrips + levels 1–4), **Wild Shape**, **Summons**, a combat
flowchart, and **Inventory**. Statblocks are styled after the Obsidian
[fantasy-statblocks](https://github.com/Obsidian-TTRPG-Community/fantasy-statblocks) plugin.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- Biome (lint/format)
- Deployed to GitHub Pages via Actions

## Develop

```sh
bun install
bun run dev        # dev server
bun run build      # production build to dist/
bun run lint       # biome check
bun run format     # biome format --write
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes
`dist/` to GitHub Pages. The Vite `base` is `/berry/` in production so assets resolve
under `tusharc.dev/berry/`.

## Content

Character data lives in `src/data/`:

- `character.ts` — core numbers, skills, proficiency sources, languages, spell slots
- `wildfire-spirit.ts` — the summonable Wildfire Spirit statblock
- `spells.ts` — known cantrips and leveled spells
- `beasts.ts` — Wild Shape forms and Conjure Animals picks
- `inventory.ts` — magic items and notable loot

Berry's own notes use one shared style: the `Note` component in `components/ui.tsx` on
dark sections, and the `note` field on `SpellCard` / `Statblock` on the parchment cards.

Reusable components: `src/components/ui.tsx` (sections, cards, notes), `Statblock.tsx`,
`SpellCard.tsx`, and `Combat.tsx`.

The Combat Tracker is the only stateful part of the site. It keeps spent spell slots,
the HP log, concentration, and the prepared-spell selection in `localStorage` (see
`data/storage.ts` and `data/prepared.ts`) — nothing is sent anywhere, and clearing site
data resets to a fresh long rest.
