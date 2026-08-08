import { type StatblockData, crValue } from '@/components/Statblock';
import { BOOKS, monsterRefUrl } from '@/data/sources';

/**
 * One combined roster of beasts. Each carries an `availability` tag saying how
 * Berry can get it onto the table — Wild Shape, Conjure Animals, or both — so the
 * same statblock doesn't have to be written twice.
 *
 * Wild Shape at level 7 means CR 1/2 or lower with no flying speed; anything
 * above that is Conjure Animals only. Values are from the Monster Manual / SRD.
 */

const mmSource = (name: string) => ({
  abbr: BOOKS.MM.abbr,
  name: BOOKS.MM.name,
  url: monsterRefUrl(name),
});

export const badger: StatblockData = {
  name: 'Badger',
  source: mmSource('Badger'),
  cr: '0',
  availability: ['Wild Shape'],
  ac: '10',
  hp: '3 (1d4 + 1)',
  speed: '20 ft., burrow 5 ft.',
  abilities: { str: 4, dex: 11, con: 12, int: 2, wis: 12, cha: 5 },
  meta: ['darkvision 30 ft., PP 11'],
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
  note: 'Can burrow 5 ft — good for ducking underground to hide or break line of sight. A utility form, not a combatant.',
};

export const velociraptor: StatblockData = {
  name: 'Velociraptor',
  source: {
    abbr: BOOKS.MotM.abbr,
    name: BOOKS.MotM.name,
    url: 'https://www.aidedd.org/dnd/monstres.php?vo=velociraptor',
  },
  cr: '1/4',
  availability: ['Wild Shape', 'Conjure Animals'],
  ac: '13 (natural)',
  hp: '10 (3d4 + 3)',
  speed: '30 ft.',
  abilities: { str: 6, dex: 14, con: 13, int: 4, wis: 12, cha: 6 },
  meta: ['PER +3', 'PP 13'],
  sections: [
    {
      entries: [
        {
          name: 'Pack Tactics',
          text: "The velociraptor has advantage on an attack roll against a creature if at least one of the velociraptor's allies is within 5 feet of the creature and the ally isn't incapacitated.",
        },
      ],
    },
    {
      heading: 'Actions',
      entries: [
        {
          name: 'Multiattack',
          text: 'The velociraptor makes one Bite attack and one Claws attack.',
        },
        {
          name: 'Bite',
          text: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.',
        },
        {
          name: 'Claws',
          text: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) slashing damage.',
        },
      ],
    },
  ],
  note: 'Pack Tactics + multiattack, the top damage pick.',
};

export const wolf: StatblockData = {
  name: 'Wolf',
  source: mmSource('Wolf'),
  cr: '1/4',
  availability: ['Wild Shape', 'Conjure Animals'],
  ac: '13 (natural)',
  hp: '11 (2d8 + 2)',
  speed: '40 ft.',
  abilities: { str: 12, dex: 15, con: 12, int: 3, wis: 12, cha: 6 },
  meta: ['PER +3, Stealth +4', 'PP 13'],
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
  note: 'Pack Tactics + knocks prone, great control.',
};

export const giantPoisonousSnake: StatblockData = {
  name: 'Giant Poisonous Snake',
  source: mmSource('Giant Poisonous Snake'),
  cr: '1/4',
  availability: ['Wild Shape', 'Conjure Animals'],
  ac: '14',
  hp: '11 (2d8 + 2)',
  speed: '30 ft., swim 30 ft.',
  abilities: { str: 10, dex: 18, con: 13, int: 2, wis: 10, cha: 3 },
  meta: ['blindsight 10 ft., PP 10'],
  sections: [
    {
      heading: 'Actions',
      entries: [
        {
          name: 'Bite',
          text: 'Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 6 (1d4 + 4) piercing damage, and the target must make a DC 11 Constitution saving throw, taking 10 (3d6) poison damage on a failed save, or half as much on a success.',
        },
      ],
    },
  ],
  note: '10-ft reach + poison, hits from the back.',
};

export const ape: StatblockData = {
  name: 'Ape',
  source: mmSource('Ape'),
  cr: '1/2',
  availability: ['Wild Shape', 'Conjure Animals'],
  ac: '12',
  hp: '19 (3d8 + 6)',
  speed: '30 ft., climb 30 ft.',
  abilities: { str: 16, dex: 14, con: 14, int: 6, wis: 12, cha: 7 },
  meta: ['Athletics +5, PER +3', 'PP 13'],
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
  note: 'Ranged rocks.',
};

export const blackBear: StatblockData = {
  name: 'Black Bear',
  source: mmSource('Black Bear'),
  cr: '1/2',
  availability: ['Wild Shape', 'Conjure Animals'],
  ac: '11 (natural)',
  hp: '19 (3d8 + 6)',
  speed: '40 ft., climb 30 ft.',
  abilities: { str: 15, dex: 10, con: 14, int: 2, wis: 12, cha: 7 },
  meta: ['PER +3', 'PP 13'],
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
  note: 'Durable.',
};

export const crocodile: StatblockData = {
  name: 'Crocodile',
  source: mmSource('Crocodile'),
  cr: '1/2',
  availability: ['Wild Shape', 'Conjure Animals'],
  ac: '12 (natural)',
  hp: '19 (3d8 + 6)',
  speed: '20 ft., swim 30 ft.',
  abilities: { str: 15, dex: 10, con: 13, int: 2, wis: 10, cha: 5 },
  meta: ['Stealth +2', 'PP 10'],
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

export const reefShark: StatblockData = {
  name: 'Reef Shark',
  source: mmSource('Reef Shark'),
  cr: '1/2',
  availability: ['Wild Shape', 'Conjure Animals'],
  ac: '12 (natural)',
  hp: '22 (4d8 + 4)',
  speed: '0 ft., swim 40 ft.',
  abilities: { str: 14, dex: 13, con: 13, int: 1, wis: 10, cha: 4 },
  meta: ['PER +2', 'blindsight 30 ft., PP 12'],
  sections: [
    {
      entries: [
        {
          name: 'Pack Tactics',
          text: "The shark has advantage on an attack roll against a creature if at least one of the shark's allies is within 5 ft. of the creature and the ally isn't incapacitated.",
        },
        { name: 'Water Breathing', text: 'The shark can breathe only underwater.' },
      ],
    },
    {
      heading: 'Actions',
      entries: [
        {
          name: 'Bite',
          text: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) piercing damage.',
        },
      ],
    },
  ],
};

export const direWolf: StatblockData = {
  name: 'Dire Wolf',
  source: mmSource('Dire Wolf'),
  cr: '1',
  availability: ['Conjure Animals'],
  ac: '14 (natural)',
  hp: '37 (5d10 + 10)',
  speed: '50 ft.',
  abilities: { str: 17, dex: 15, con: 15, int: 3, wis: 12, cha: 7 },
  meta: ['PER +3, Stealth +4', 'PP 13'],
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
  note: 'Pack Tactics + prone, tanky (37 HP).',
};

export const brownBear: StatblockData = {
  name: 'Brown Bear',
  source: mmSource('Brown Bear'),
  cr: '1',
  availability: ['Conjure Animals'],
  ac: '11 (natural)',
  hp: '34 (4d10 + 12)',
  speed: '40 ft., climb 30 ft.',
  abilities: { str: 19, dex: 10, con: 16, int: 2, wis: 13, cha: 7 },
  meta: ['PER +3', 'PP 13'],
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
          text: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) piercing damage.',
        },
        {
          name: 'Claws',
          text: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage.',
        },
      ],
    },
  ],
  note: 'Big multiattack (1d8+4 bite, 2d6+4 claws).',
};

export const deinonychus: StatblockData = {
  name: 'Deinonychus',
  source: {
    abbr: BOOKS.VGM.abbr,
    name: BOOKS.VGM.name,
    url: 'http://dndroll.wikidot.com/creatures:deinonychus-legacy',
  },
  cr: '1',
  availability: ['Conjure Animals'],
  ac: '13 (natural)',
  hp: '26 (4d8 + 8)',
  speed: '40 ft.',
  abilities: { str: 15, dex: 15, con: 14, int: 4, wis: 12, cha: 6 },
  meta: ['PER +3', 'PP 13'],
  sections: [
    {
      entries: [
        {
          name: 'Pounce',
          text: 'If the deinonychus moves at least 20 feet straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a DC 12 Strength saving throw or be knocked prone. If the target is prone, the deinonychus can make one bite attack against it as a bonus action.',
        },
      ],
    },
    {
      heading: 'Actions',
      entries: [
        {
          name: 'Multiattack',
          text: 'The deinonychus makes three attacks: one with its bite and two with its claws.',
        },
        {
          name: 'Bite',
          text: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) piercing damage.',
        },
        {
          name: 'Claw',
          text: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) slashing damage.',
        },
      ],
    },
  ],
  note: 'Pounce + three attacks (bite + two claws), top CR 1 damage.',
};

export const giantToad: StatblockData = {
  name: 'Giant Toad',
  source: mmSource('Giant Toad'),
  cr: '1',
  availability: ['Conjure Animals'],
  ac: '11',
  hp: '39 (6d10 + 6)',
  speed: '20 ft., swim 40 ft.',
  abilities: { str: 15, dex: 13, con: 13, int: 2, wis: 10, cha: 3 },
  meta: ['darkvision 30 ft., PP 10'],
  sections: [
    {
      entries: [
        { name: 'Amphibious', text: 'The toad can breathe air and water.' },
        {
          name: 'Standing Leap',
          text: "The toad's long jump is up to 20 ft. and its high jump is up to 10 ft., with or without a running start.",
        },
      ],
    },
    {
      heading: 'Actions',
      entries: [
        {
          name: 'Bite',
          text: "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (1d10 + 2) piercing damage plus 5 (1d10) poison damage, and the target is grappled (escape DC 13). Until this grapple ends, the target is restrained, and the toad can't bite another target.",
        },
        {
          name: 'Swallow',
          text: "The toad makes one bite attack against a Medium or smaller target it is grappling. If the attack hits, the target is swallowed and the grapple ends. The swallowed target is blinded and restrained, it has total cover against attacks and other effects outside the toad, and it takes 10 (3d6) acid damage at the start of each of the toad's turns. The toad can have only one target swallowed at a time. If the toad dies, a swallowed creature can escape from the corpse using 5 feet of movement, exiting prone.",
        },
      ],
    },
  ],
};

export const allosaurus: StatblockData = {
  name: 'Allosaurus',
  source: {
    abbr: BOOKS.MM.abbr,
    name: BOOKS.MM.name,
    url: 'https://www.aidedd.org/dnd/monstres.php?vo=allosaurus',
  },
  cr: '2',
  availability: ['Conjure Animals'],
  ac: '13 (natural)',
  hp: '51 (6d10 + 18)',
  speed: '60 ft.',
  abilities: { str: 19, dex: 13, con: 17, int: 2, wis: 12, cha: 5 },
  meta: ['PER +5', 'PP 15'],
  sections: [
    {
      entries: [
        {
          name: 'Pounce',
          text: 'If the allosaurus moves at least 30 feet straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a DC 13 Strength saving throw or be knocked prone. If the target is prone, the allosaurus can make one bite attack against it as a bonus action.',
        },
      ],
    },
    {
      heading: 'Actions',
      entries: [
        {
          name: 'Bite',
          text: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 15 (2d10 + 4) piercing damage.',
        },
        {
          name: 'Claw',
          text: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) slashing damage.',
        },
      ],
    },
  ],
  note: 'Pounce (knocks prone) + heavy single-target damage.',
};

export const polarBear: StatblockData = {
  name: 'Polar Bear',
  source: mmSource('Polar Bear'),
  cr: '2',
  availability: ['Conjure Animals'],
  ac: '12 (natural)',
  hp: '42 (5d10 + 15)',
  speed: '40 ft., swim 30 ft.',
  abilities: { str: 20, dex: 10, con: 16, int: 2, wis: 13, cha: 7 },
  meta: ['PER +3', 'PP 13'],
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
          text: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 9 (1d8 + 5) piercing damage.',
        },
        {
          name: 'Claws',
          text: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 12 (2d6 + 5) slashing damage.',
        },
      ],
    },
  ],
};

export const giantConstrictorSnake: StatblockData = {
  name: 'Giant Constrictor Snake',
  source: mmSource('Giant Constrictor Snake'),
  cr: '2',
  availability: ['Conjure Animals'],
  ac: '12',
  hp: '60 (8d12 + 8)',
  speed: '30 ft., swim 30 ft.',
  abilities: { str: 19, dex: 14, con: 12, int: 1, wis: 10, cha: 3 },
  meta: ['PER +2', 'blindsight 10 ft., PP 12'],
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
  note: 'Grapple and restrain a big threat.',
};

/** Every beast, ordered by challenge rating. */
export const beasts: StatblockData[] = [
  badger,
  velociraptor,
  wolf,
  giantPoisonousSnake,
  ape,
  blackBear,
  crocodile,
  reefShark,
  direWolf,
  brownBear,
  deinonychus,
  giantToad,
  allosaurus,
  polarBear,
  giantConstrictorSnake,
].sort((a, b) => crValue(a.cr) - crValue(b.cr));
