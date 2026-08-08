/**
 * Berry's gear — what he wears, what he fights with, and the loot worth
 * remembering. Descriptions are what we know at the table, so several of these
 * are deliberately vague: the seeds bought from Coral haven't done anything yet.
 * Items other players carry live in `partyItems` at the bottom.
 */

export interface Item {
  name: string;
  /** What it does, as far as we know. */
  detail?: string;
  /** How many, if more than one. */
  count?: number;
  /** Reference page, where one exists. */
  url?: string;
}

export const worn: Item[] = [
  {
    name: 'Studded Leather Armor',
    detail:
      'AC 12 + DEX. The shoulders have basilisk fangs sticking up out of them, which give +1 to Intimidation checks.',
    url: 'https://dnd5e.wikidot.com/wondrous-items:studded-leather-armor',
  },
];

export const weapons: Item[] = [
  { name: 'Longsword' },
  { name: 'Quarterstaff' },
  { name: 'Sickle' },
  { name: 'Darts', count: 20 },
];

export const inventory: Item[] = [
  {
    name: 'Bag of Holding',
    detail: 'Beeb has one too.',
    url: 'https://www.dndbeyond.com/magic-items/4581-bag-of-holding',
  },
  { name: 'Lantern of Revealing', detail: 'Can reveal invisible enemies.' },
  { name: 'Helm of Languages' },
  { name: 'Swim Ring' },
  { name: 'Platinum Ring' },
  { name: 'Basilisk Fangs', detail: 'Spares, beyond the ones set into the armor.' },
  { name: 'Golden Quill Pendant', detail: 'Buys entrance into Candlekeep.' },
  { name: 'Mimic Teeth', count: 18 },
];

export const seeds: Item[] = [
  { name: 'Poison Leaf seeds', detail: 'Bought from Coral. Effect unknown.' },
  { name: 'Weeping Creeping Vine seeds', detail: 'Bought from Coral. Effect unknown.' },
  { name: 'Tomato seeds' },
];

/** Notable items the rest of the party carries — worth knowing who to ask. */
export interface PartyItem extends Item {
  owner: string;
}

export const partyItems: PartyItem[] = [
  {
    owner: 'Gloomy',
    name: "Serpent's Fang",
    detail: 'Magic sword — adds 1d10 poison damage.',
    url: 'https://dnd5e.wikidot.com/wondrous-items:serpent-s-fang',
  },
  {
    owner: 'Beeb',
    name: 'Serpent Scale Armor',
    detail: 'Full DEX bonus to AC, and no disadvantage on DEX (Stealth) checks.',
    url: 'https://dnd5e.wikidot.com/wondrous-items:serpent-scale-armor',
  },
  {
    owner: 'Beeb',
    name: 'Chime of Opening',
    url: 'https://www.dndbeyond.com/magic-items/4602-chime-of-opening',
  },
  {
    owner: 'Beeb',
    name: 'Bag of Holding',
    url: 'https://www.dndbeyond.com/magic-items/4581-bag-of-holding',
  },
];
