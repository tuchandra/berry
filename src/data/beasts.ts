import type { StatblockData } from '@/components/Statblock';
import { BOOKS, monsterRefUrl } from '@/data/sources';

/**
 * Beast forms for Wild Shape and creatures summoned via Conjure Animals.
 * Values are from the Monster Manual / SRD.
 */

const mmSource = (name: string) => ({
  abbr: BOOKS.MM.abbr,
  name: BOOKS.MM.name,
  url: monsterRefUrl(name),
});

export const octopus: StatblockData = {
  name: 'Octopus',
  source: mmSource('Octopus'),
  subtitle: 'Small beast, unaligned',
  topProps: [
    { label: 'Armor Class', value: '12' },
    { label: 'Hit Points', value: '3 (1d6)' },
    { label: 'Speed', value: '5 ft., swim 30 ft.' },
  ],
  abilities: { str: 4, dex: 15, con: 11, int: 3, wis: 10, cha: 4 },
  bottomProps: [
    { label: 'Skills', value: 'Perception +2, Stealth +4' },
    { label: 'Senses', value: 'darkvision 30 ft., passive Perception 12' },
  ],
  sections: [
    {
      entries: [
        {
          name: 'Hold Breath',
          text: 'While out of water, the octopus can hold its breath for 30 minutes.',
        },
        {
          name: 'Underwater Camouflage',
          text: 'The octopus has advantage on Dexterity (Stealth) checks made while underwater.',
        },
        {
          name: 'Water Breathing',
          text: 'The octopus can breathe only underwater.',
        },
      ],
    },
    {
      heading: 'Actions',
      entries: [
        {
          name: 'Tentacles',
          text: "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 1 bludgeoning damage, and the target is grappled (escape DC 10). Until this grapple ends, the octopus can't use its tentacles on another target.",
        },
        {
          name: 'Ink Cloud (Recharges after a Short or Long Rest)',
          text: 'A 5-foot-radius cloud of ink extends around the octopus if it is underwater. The area is heavily obscured for 1 minute. After releasing the ink, the octopus can use the Dash action as a bonus action.',
        },
      ],
    },
  ],
};

export const badger: StatblockData = {
  name: 'Badger',
  source: mmSource('Badger'),
  subtitle: 'Tiny beast, unaligned',
  topProps: [
    { label: 'Armor Class', value: '10' },
    { label: 'Hit Points', value: '3 (1d4 + 1)' },
    { label: 'Speed', value: '20 ft., burrow 5 ft.' },
  ],
  abilities: { str: 4, dex: 11, con: 12, int: 2, wis: 12, cha: 5 },
  bottomProps: [{ label: 'Senses', value: 'darkvision 30 ft., passive Perception 11' }],
  sections: [
    {
      entries: [
        {
          name: 'Keen Smell',
          text: 'The badger has advantage on Wisdom (Perception) checks that rely on smell.',
        },
      ],
    },
    {
      heading: 'Actions',
      entries: [
        {
          name: 'Bite',
          text: 'Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 1 piercing damage.',
        },
      ],
    },
  ],
};

export const ape: StatblockData = {
  name: 'Ape',
  source: mmSource('Ape'),
  subtitle: 'Medium beast, unaligned',
  topProps: [
    { label: 'Armor Class', value: '12' },
    { label: 'Hit Points', value: '19 (3d8 + 6)' },
    { label: 'Speed', value: '30 ft., climb 30 ft.' },
  ],
  abilities: { str: 16, dex: 14, con: 14, int: 6, wis: 12, cha: 7 },
  bottomProps: [
    { label: 'Skills', value: 'Athletics +5, Perception +3' },
    { label: 'Senses', value: 'passive Perception 13' },
    { label: 'Challenge', value: '1/2 (100 XP)' },
  ],
  sections: [
    {
      heading: 'Actions',
      entries: [
        {
          name: 'Multiattack',
          text: 'The ape makes two fist attacks.',
        },
        {
          name: 'Fist',
          text: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage.',
        },
        {
          name: 'Rock',
          text: 'Ranged Weapon Attack: +5 to hit, range 25/50 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage.',
        },
      ],
    },
  ],
};

export const blackBear: StatblockData = {
  name: 'Black Bear',
  source: mmSource('Black Bear'),
  subtitle: 'Medium beast, unaligned',
  topProps: [
    { label: 'Armor Class', value: '11 (natural armor)' },
    { label: 'Hit Points', value: '19 (3d8 + 6)' },
    { label: 'Speed', value: '40 ft., climb 30 ft.' },
  ],
  abilities: { str: 15, dex: 10, con: 14, int: 2, wis: 12, cha: 7 },
  bottomProps: [
    { label: 'Skills', value: 'Perception +3' },
    { label: 'Senses', value: 'passive Perception 13' },
    { label: 'Challenge', value: '1/2 (100 XP)' },
  ],
  sections: [
    {
      entries: [
        {
          name: 'Keen Smell',
          text: 'The bear has advantage on Wisdom (Perception) checks that rely on smell.',
        },
      ],
    },
    {
      heading: 'Actions',
      entries: [
        {
          name: 'Multiattack',
          text: 'The bear makes two attacks: one with its bite and one with its claws.',
        },
        {
          name: 'Bite',
          text: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.',
        },
        {
          name: 'Claws',
          text: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) slashing damage.',
        },
      ],
    },
  ],
};

export const crocodile: StatblockData = {
  name: 'Crocodile',
  source: mmSource('Crocodile'),
  subtitle: 'Large beast, unaligned',
  topProps: [
    { label: 'Armor Class', value: '12 (natural armor)' },
    { label: 'Hit Points', value: '19 (3d8 + 6)' },
    { label: 'Speed', value: '20 ft., swim 30 ft.' },
  ],
  abilities: { str: 15, dex: 10, con: 13, int: 2, wis: 10, cha: 5 },
  bottomProps: [
    { label: 'Skills', value: 'Stealth +2' },
    { label: 'Senses', value: 'passive Perception 10' },
    { label: 'Challenge', value: '1/2 (100 XP)' },
  ],
  sections: [
    {
      entries: [
        {
          name: 'Hold Breath',
          text: 'The crocodile can hold its breath for 15 minutes.',
        },
      ],
    },
    {
      heading: 'Actions',
      entries: [
        {
          name: 'Bite',
          text: "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 7 (1d10 + 2) piercing damage, and the target is grappled (escape DC 12). Until this grapple ends, the target is restrained, and the crocodile can't bite another target.",
        },
      ],
    },
  ],
};

/** Full-statblock forms shown on the page, in display order. */
export const wildShapeForms: StatblockData[] = [ape, blackBear, crocodile, octopus, badger];

// ── Conjure Animals picks ────────────────────────────────────────────────────
// Beasts worth summoning that aren't already in the Wild Shape list.

export const wolf: StatblockData = {
  name: 'Wolf',
  source: mmSource('Wolf'),
  subtitle: 'Medium beast, unaligned',
  topProps: [
    { label: 'Armor Class', value: '13 (natural armor)' },
    { label: 'Hit Points', value: '11 (2d8 + 2)' },
    { label: 'Speed', value: '40 ft.' },
  ],
  abilities: { str: 12, dex: 15, con: 12, int: 3, wis: 12, cha: 6 },
  bottomProps: [
    { label: 'Skills', value: 'Perception +3, Stealth +4' },
    { label: 'Senses', value: 'passive Perception 13' },
    { label: 'Challenge', value: '1/4 (50 XP)' },
  ],
  sections: [
    {
      entries: [
        {
          name: 'Keen Hearing and Smell',
          text: 'The wolf has advantage on Wisdom (Perception) checks that rely on hearing or smell.',
        },
        {
          name: 'Pack Tactics',
          text: "The wolf has advantage on an attack roll against a creature if at least one of the wolf's allies is within 5 feet of the creature and the ally isn't incapacitated.",
        },
      ],
    },
    {
      heading: 'Actions',
      entries: [
        {
          name: 'Bite',
          text: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) piercing damage. If the target is a creature, it must succeed on a DC 11 Strength saving throw or be knocked prone.',
        },
      ],
    },
  ],
};

export const direWolf: StatblockData = {
  name: 'Dire Wolf',
  source: mmSource('Dire Wolf'),
  subtitle: 'Large beast, unaligned',
  topProps: [
    { label: 'Armor Class', value: '14 (natural armor)' },
    { label: 'Hit Points', value: '37 (5d10 + 10)' },
    { label: 'Speed', value: '50 ft.' },
  ],
  abilities: { str: 17, dex: 15, con: 15, int: 3, wis: 12, cha: 7 },
  bottomProps: [
    { label: 'Skills', value: 'Perception +3, Stealth +4' },
    { label: 'Senses', value: 'passive Perception 13' },
    { label: 'Challenge', value: '1 (200 XP)' },
  ],
  sections: [
    {
      entries: [
        {
          name: 'Keen Hearing and Smell',
          text: 'The wolf has advantage on Wisdom (Perception) checks that rely on hearing or smell.',
        },
        {
          name: 'Pack Tactics',
          text: "The wolf has advantage on an attack roll against a creature if at least one of the wolf's allies is within 5 feet of the creature and the ally isn't incapacitated.",
        },
      ],
    },
    {
      heading: 'Actions',
      entries: [
        {
          name: 'Bite',
          text: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone.',
        },
      ],
    },
  ],
};

export const giantConstrictorSnake: StatblockData = {
  name: 'Giant Constrictor Snake',
  source: mmSource('Giant Constrictor Snake'),
  subtitle: 'Huge beast, unaligned',
  topProps: [
    { label: 'Armor Class', value: '12' },
    { label: 'Hit Points', value: '60 (8d12 + 8)' },
    { label: 'Speed', value: '30 ft., swim 30 ft.' },
  ],
  abilities: { str: 19, dex: 14, con: 12, int: 1, wis: 10, cha: 3 },
  bottomProps: [
    { label: 'Skills', value: 'Perception +2' },
    { label: 'Senses', value: 'blindsight 10 ft., passive Perception 12' },
    { label: 'Challenge', value: '2 (450 XP)' },
  ],
  sections: [
    {
      heading: 'Actions',
      entries: [
        {
          name: 'Bite',
          text: 'Melee Weapon Attack: +6 to hit, reach 10 ft., one creature. Hit: 11 (2d6 + 4) piercing damage.',
        },
        {
          name: 'Constrict',
          text: "Melee Weapon Attack: +6 to hit, reach 5 ft., one creature. Hit: 13 (2d8 + 4) bludgeoning damage, and the target is grappled (escape DC 16). Until this grapple ends, the creature is restrained, and the snake can't constrict another target.",
        },
      ],
    },
  ],
};
