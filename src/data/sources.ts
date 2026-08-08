/**
 * Source citations. Every rules element on the site points to a book and, where
 * possible, a live reference page so it can be shown to a DM.
 *
 *  - Spells → D&D 5e Wikidot (covers PHB, XGE, and Tasha's; each page cites its book)
 *  - Beasts → Open5e (SRD stat blocks)
 *  - Subclass features → the Wikidot Circle of Wildfire page (Tasha's)
 */

export interface Book {
  abbr: string;
  name: string;
}

export const BOOKS: Record<string, Book> = {
  PHB: { abbr: 'PHB', name: "Player's Handbook" },
  MM: { abbr: 'MM', name: 'Monster Manual' },
  TCE: { abbr: 'TCE', name: "Tasha's Cauldron of Everything" },
  XGE: { abbr: 'XGE', name: "Xanathar's Guide to Everything" },
  MotM: {
    abbr: 'MotM',
    name: "Mordenkainen's Monsters of the Multiverse (also in Tomb of Annihilation)",
  },
  VGM: { abbr: 'VGM', name: "Volo's Guide to Monsters (also in Tomb of Annihilation)" },
};

export type BookAbbr = keyof typeof BOOKS;

function slug(name: string): string {
  return name
    .toLowerCase()
    .replace(/['’.,()]/g, '')
    .replace(/\s+/g, '-');
}

export const spellRefUrl = (name: string): string =>
  `https://dnd5e.wikidot.com/spell:${slug(name)}`;

export const monsterRefUrl = (name: string): string => `https://open5e.com/monsters/${slug(name)}`;

/** Circle of Wildfire subclass (Wildfire Spirit, Enhanced Bond, circle spells). */
export const WILDFIRE_SUBCLASS_URL = 'https://dnd5e.wikidot.com/druid:wildfire';
/** Base Druid class: Wild Shape, spellcasting, spell slots. */
export const DRUID_CLASS_URL = 'https://dnd5e.wikidot.com/druid';
/** Natural Recovery: spend a short rest to get expended spell slots back. */
export const NATURAL_RECOVERY_URL = 'https://roll20.net/compendium/dnd5e/Druid#toc_12';
/** Outlander background: its two skills, tools, language, and the Wanderer feature. */
export const OUTLANDER_BACKGROUND_URL = 'https://dnd5e.wikidot.com/background:outlander';
