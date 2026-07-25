/**
 * Berry's notable gear. Magic items the party carries or that Berry holds, plus
 * loot worth remembering. Descriptions are what we know at the table — several of
 * these haven't been fully identified, so they're deliberately vague.
 */

export interface Item {
  name: string;
  /** What it does, as far as we know. */
  detail?: string;
  /** How many, if more than one. */
  count?: number;
}

export const inventory: Item[] = [
  { name: 'Bag of Holding' },
  { name: 'Chimes of Opening' },
  { name: 'Lantern of Revealing', detail: 'Can reveal invisible enemies.' },
  { name: 'Helm of Languages' },
  { name: 'Swim Ring' },
  { name: 'Platinum Ring' },
  { name: 'Mimic Teeth', count: 18 },
];
