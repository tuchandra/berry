/** Berry's core numbers — level 7 Wood Elf Wildfire Druid. */

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
  level: 7,
  alignment: 'Chaotic Good',
  proficiencyBonus: '+3',
  ac: 13,
  hp: 59,
  hitDice: '7d8',
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

/**
 * Where each of Berry's skill proficiencies comes from. A 5e character collects
 * them from three places — class, race, and background — and the background is
 * the one currently unaccounted for, which is why the sheet shows 3 instead of 5.
 * See the Proficiencies section for the full write-up.
 */
export interface ProficiencySource {
  /** Where it comes from, e.g. "Druid (class)". */
  from: string;
  /** What that source grants. */
  grants: string;
  /** What Berry actually has recorded from it. */
  recorded: string;
  /** Unclaimed — shows as a gap on the page. */
  missing?: boolean;
}

export const skillSources: ProficiencySource[] = [
  {
    from: 'Druid (class)',
    grants:
      'Choose 2 from Arcana, Animal Handling, Insight, Medicine, Nature, Perception, Religion, Survival',
    recorded: 'Medicine, Nature',
  },
  {
    from: 'Wood Elf (race)',
    grants: 'Perception, from the elf Keen Senses trait',
    recorded: 'Perception',
  },
  {
    from: 'Background',
    grants: 'Any 2 skills, plus 2 tool proficiencies or languages',
    recorded: 'Nothing — no background is written down',
    missing: true,
  },
];

/**
 * Typical skill-proficiency counts by class, before background (+2) and race.
 * This is why other party members have 4–7 where Berry has 3.
 */
export const classSkillCounts: { klass: string; count: number; note?: string }[] = [
  { klass: 'Rogue', count: 4, note: 'plus Expertise — doubles proficiency on 2 of them' },
  { klass: 'Bard, Ranger', count: 3, note: 'Bard also gets Expertise at level 3' },
  {
    klass: 'Druid, Cleric, Fighter, Wizard, Paladin, Barbarian, Sorcerer, Warlock, Monk',
    count: 2,
  },
];

/** Everything else Berry is proficient with, beyond skills. */
export const otherProficiencies: { label: string; value: string }[] = [
  { label: 'Armor', value: 'Light, medium, shields — but never metal ones' },
  {
    label: 'Weapons',
    value:
      'Clubs, daggers, darts, javelins, maces, quarterstaffs, scimitars, sickles, slings, spears (druid) · longswords, shortswords, shortbows, longbows (Wood Elf)',
  },
  { label: 'Tools', value: 'Herbalism kit (druid)' },
  { label: 'Saving throws', value: 'Intelligence, Wisdom (druid) · Constitution (Resilient feat)' },
];

export interface Language {
  name: string;
  detail: string;
  /** Not from a standard source — flagged on the page. */
  flagged?: boolean;
}

export const languages: Language[] = [
  { name: 'Common', detail: 'Standard for Wood Elves.' },
  {
    name: 'Druidic',
    detail:
      "The secret language of druids, from the class's Druidic feature. Only druids understand it; others know a message exists but not what it says.",
  },
  {
    name: 'Grippli',
    detail:
      'Speak and understand. The whole party has this except Dectart — so it doubles as a way to talk past him, deliberately or not.',
  },
  {
    name: 'Elvish',
    detail:
      "Not currently on my sheet, but a Wood Elf's starting languages are Common and Elvish. Worth checking with the DM whether I should have it.",
    flagged: true,
  },
];

export interface SpellSlots {
  level: number;
  count: number;
}

export const spellSlots: SpellSlots[] = [
  { level: 1, count: 4 },
  { level: 2, count: 3 },
  { level: 3, count: 3 },
  { level: 4, count: 1 },
];

/** Druid level (7) + Wisdom modifier (+3). Wildfire circle spells don't count. */
export const preparedLimit = 10;
