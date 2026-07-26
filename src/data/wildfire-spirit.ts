import type { StatblockData } from '@/components/Statblock';
import { BOOKS, WILDFIRE_SUBCLASS_URL } from '@/data/sources';

/**
 * Wildfire Spirit — the summonable spirit for a Wildfire Druid.
 * Values reflect Berry's level 7 stats (Proficiency Bonus +3, HP 40).
 */
export const wildfireSpirit: StatblockData = {
  name: 'Wildfire Spirit',
  source: { abbr: BOOKS.TCE.abbr, name: BOOKS.TCE.name, url: WILDFIRE_SUBCLASS_URL },
  subtitle: 'Small elemental',
  description:
    'You can summon the primal spirit bound to your soul. As an action, you can expend one use of your Wild Shape feature to summon your wildfire spirit, rather than assuming a beast form.',
  ac: '13 (natural armor)',
  hp: '40 (5 + 5 × your druid level)',
  speed: '30 ft., fly 30 ft. (hover)',
  abilities: { str: 10, dex: 14, con: 14, int: 13, wis: 15, cha: 11 },
  meta: ['darkvision 60 ft., passive Perception 12', 'Proficiency Bonus +3 (yours)'],
  bottomProps: [
    { label: 'Damage Immunities', value: 'fire' },
    { label: 'Condition Immunities', value: 'charmed, frightened, grappled, prone, restrained' },
  ],
  wide: true,
  sections: [
    {
      heading: 'Actions',
      entries: [
        {
          name: 'Flame Seed (Ranged Weapon Attack)',
          text: 'Spell attack modifier to hit; range 60 ft., one target you can see. Hit: 1d6 + 3 (PB) fire damage.',
        },
        {
          name: 'Fiery Teleportation',
          text: 'The spirit and each willing creature of your choice within 5 feet of it teleport up to 15 feet to unoccupied spaces you can see. Then each creature within 5 feet of the space that the spirit left must succeed on a Dexterity saving throw against your spell save DC or take 1d6 + 3 (PB) fire damage.',
        },
      ],
    },
    {
      heading: 'Enhanced Bond (6th level)',
      entries: [
        {
          name: 'Destructive & restorative spells',
          text: 'Whenever you cast a spell that deals fire damage or restores hit points while your wildfire spirit is summoned, roll a d8, and you gain a bonus equal to the number rolled to one damage or healing roll of the spell.',
        },
        {
          name: 'Spell origin',
          text: 'When you cast a spell with a range other than self, the spell can originate from you or your wildfire spirit.',
        },
      ],
    },
  ],
};
