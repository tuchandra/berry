import type { SpellData } from '@/components/SpellCard';

/**
 * Berry's known spells. Placeholder set for scaffolding — real cantrips and
 * levels 1–3 (with Berry's specific changes) will replace these.
 */
export const cantrips: SpellData[] = [
  {
    name: 'Produce Flame',
    level: 'cantrip',
    school: 'Conjuration',
    castingTime: '1 action',
    range: 'Self',
    components: 'V, S',
    duration: '10 minutes',
    description: [
      'A flickering flame appears in your hand. The flame remains there for the duration and harms neither you nor your equipment. The flame sheds bright light in a 10-foot radius and dim light for an additional 10 feet.',
      'You can also attack with the flame: make a ranged spell attack. On a hit, the target takes 1d8 fire damage.',
    ],
    higherLevels: 'The damage increases by 1d8 at levels 5, 11, and 17.',
  },
];

export const level1: SpellData[] = [
  {
    name: 'Cure Wounds',
    level: 1,
    school: 'Evocation',
    castingTime: '1 action',
    range: 'Touch',
    components: 'V, S',
    duration: 'Instantaneous',
    description: [
      'A creature you touch regains a number of hit points equal to 1d8 + your spellcasting ability modifier.',
    ],
    higherLevels: 'The healing increases by 1d8 for each slot level above 1st.',
  },
];

export const level2: SpellData[] = [];

export const level3: SpellData[] = [];
