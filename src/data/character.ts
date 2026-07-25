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
  hp: 51,
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

export interface Skill {
  name: string;
  ability: string;
  bonus: string;
  proficient: boolean;
}

/** All 18 skills with Berry's bonuses. Proficient: Medicine & Nature (druid), Perception (elf). */
export const skills: Skill[] = [
  { name: 'Acrobatics', ability: 'Dex', bonus: '+2', proficient: false },
  { name: 'Animal Handling', ability: 'Wis', bonus: '+3', proficient: false },
  { name: 'Arcana', ability: 'Int', bonus: '−1', proficient: false },
  { name: 'Athletics', ability: 'Str', bonus: '+0', proficient: false },
  { name: 'Deception', ability: 'Cha', bonus: '+0', proficient: false },
  { name: 'History', ability: 'Int', bonus: '−1', proficient: false },
  { name: 'Insight', ability: 'Wis', bonus: '+3', proficient: false },
  { name: 'Intimidation', ability: 'Cha', bonus: '+0', proficient: false },
  { name: 'Investigation', ability: 'Int', bonus: '−1', proficient: false },
  { name: 'Medicine', ability: 'Wis', bonus: '+6', proficient: true },
  { name: 'Nature', ability: 'Int', bonus: '+2', proficient: true },
  { name: 'Perception', ability: 'Wis', bonus: '+6', proficient: true },
  { name: 'Performance', ability: 'Cha', bonus: '+0', proficient: false },
  { name: 'Persuasion', ability: 'Cha', bonus: '+0', proficient: false },
  { name: 'Religion', ability: 'Int', bonus: '−1', proficient: false },
  { name: 'Sleight of Hand', ability: 'Dex', bonus: '+2', proficient: false },
  { name: 'Stealth', ability: 'Dex', bonus: '+2', proficient: false },
  { name: 'Survival', ability: 'Wis', bonus: '+3', proficient: false },
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
