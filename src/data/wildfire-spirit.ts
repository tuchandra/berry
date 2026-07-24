import type { StatblockData } from '@/components/Statblock';

/**
 * Wildfire Spirit — the summonable spirit for a Wildfire Druid.
 * Values reflect Berry's level 6 stats (Proficiency Bonus +3, HP 35).
 */
export const wildfireSpirit: StatblockData = {
  name: 'Wildfire Spirit',
  subtitle: 'Small elemental, neutral',
  description:
    'You can summon the primal spirit bound to your soul. As an action, you can expend one use of your Wild Shape feature to summon your wildfire spirit, rather than assuming a beast form.',
  topProps: [
    { label: 'Armor Class', value: '13 (natural armor)' },
    { label: 'Hit Points', value: '35 (5 + 5 × your druid level)' },
    { label: 'Speed', value: '30 ft., fly 30 ft. (hover)' },
    { label: 'Proficiency Bonus', value: '+3 (yours)' },
  ],
  abilities: { str: 10, dex: 14, con: 14, int: 13, wis: 15, cha: 11 },
  bottomProps: [
    { label: 'Damage Immunities', value: 'fire' },
    { label: 'Condition Immunities', value: 'charmed, frightened, grappled, prone, restrained' },
    { label: 'Senses', value: 'darkvision 60 ft., passive Perception 12' },
  ],
  wide: true,
  sections: [
    {
      heading: 'Actions',
      entries: [
        {
          name: 'Flame Seed (Ranged Weapon Attack)',
          text: 'Spell attack modifier to hit; range 60 ft., one target you can see. Hit: 1d6 + 3 (+ PB) fire damage.',
        },
        {
          name: 'Fiery Teleportation',
          text: 'The spirit and each willing creature of your choice within 5 feet of it teleport up to 15 feet to unoccupied spaces you can see. Then each creature within 5 feet of the space that the spirit left must succeed on a Dexterity saving throw against your spell save DC or take 1d6 + 3 (+ PB) fire damage.',
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
