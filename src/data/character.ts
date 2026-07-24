/** Berry's core numbers — level 6 Wood Elf Wildfire Druid. */

export interface AbilityLine {
  name: string;
  score: number;
  mod: string;
  save: string;
  saveProficient: boolean;
}

export const character = {
  name: 'Onyberyus Thistleballow',
  nickname: 'Berry',
  race: 'Wood Elf',
  class: 'Druid (Circle of Wildfire)',
  level: 6,
  alignment: 'Chaotic Good',
  proficiencyBonus: '+3',
  ac: 13,
  hp: 43,
  hitDice: '6d8',
  initiative: '+2',
  speed: '35 ft.',
  passivePerception: 16,
  spellSaveDc: 14,
  spellAttack: '+6',
  spellcastingAbility: 'Wisdom',
} as const;

export const abilities: AbilityLine[] = [
  { name: 'Strength', score: 10, mod: '+0', save: '+0', saveProficient: false },
  { name: 'Dexterity', score: 14, mod: '+2', save: '+2', saveProficient: false },
  { name: 'Constitution', score: 16, mod: '+3', save: '+6', saveProficient: true },
  { name: 'Intelligence', score: 9, mod: '−1', save: '+2', saveProficient: true },
  { name: 'Wisdom', score: 16, mod: '+3', save: '+6', saveProficient: true },
  { name: 'Charisma', score: 10, mod: '+0', save: '+0', saveProficient: false },
];

export interface SpellSlots {
  level: number;
  count: number;
}

export const spellSlots: SpellSlots[] = [
  { level: 1, count: 4 },
  { level: 2, count: 3 },
  { level: 3, count: 3 },
];
