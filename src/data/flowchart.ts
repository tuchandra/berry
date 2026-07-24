/**
 * Berry's combat decision flowchart, reproduced from the paper version (made at
 * level 4) and updated for the level-6 kit: Moonbeam is gone (→ Sleet Storm),
 * and Flame Blade / Shillelagh are gone (→ Flaming Sphere), since Berry no
 * longer has those prepared.
 */

export interface OpenerRule {
  condition: string;
  action: string;
  bonus?: string;
}

export interface OpenerPhase {
  title: string;
  rules: OpenerRule[];
}

export const opener: OpenerPhase[] = [
  {
    title: 'Round 1',
    rules: [
      {
        condition: 'Wildfire Spirit is NOT summoned',
        action: 'Summon the Wildfire Spirit (costs a Wild Shape use)',
        bonus: 'Command it to Fiery Teleport or Flame Seed',
      },
      {
        condition: 'Wildfire Spirit IS summoned',
        action:
          'Cast a spell — follow the trees below (priority is battlefield control, not raw damage)',
        bonus: 'Command the Wildfire Spirit',
      },
    ],
  },
  {
    title: 'Round 2+',
    rules: [
      {
        condition: 'The battlefield is bad for us',
        action: 'Cast control: Entangle, Faerie Fire, Sleet Storm, or Flaming Sphere',
      },
      {
        condition: 'The battlefield is fine',
        action: 'Wild Shape and go melee',
      },
    ],
  },
];

export interface FlowBranch {
  condition: string;
  result: string;
  hint?: string;
}

export interface FlowTree {
  priority: string;
  title: string;
  note?: string;
  branches: FlowBranch[];
}

export const trees: FlowTree[] = [
  {
    priority: 'P1',
    title: 'Healing',
    branches: [
      { condition: 'Can you reach them (touch)?', result: 'Cure Wounds' },
      {
        condition:
          'Do multiple people need healing this turn — and you are not concentrating on another spell?',
        result: 'Healing Spirit',
      },
      {
        condition: 'Too far to touch, but within 60 ft?',
        result: 'Healing Word',
        hint: 'Bonus action — also wakes up an ally downed at 0 HP.',
      },
    ],
  },
  {
    priority: 'P2',
    title: 'Battlefield control',
    note: 'The Wildfire Spirit can reach most of these spots itself via its teleport.',
    branches: [
      { condition: 'Are enemies invisible?', result: 'Faerie Fire' },
      { condition: 'Are enemies 20+ ft away from us?', result: 'Entangle' },
      {
        condition: 'Enemies spread out, but each within ~60 ft of the others?',
        result: 'Sleet Storm',
        hint: 'Heavily obscures the area and makes it difficult terrain.',
      },
      {
        condition: 'Enemies clustered within ~30 ft of each other (bonus if they are flammable)?',
        result: 'Flaming Sphere',
      },
    ],
  },
  {
    priority: 'P3',
    title: 'Pure damage',
    note: 'Best once Wild Shape has ended.',
    branches: [
      { condition: 'Are enemies far away?', result: 'Scorching Ray' },
      {
        condition: 'Enemies close and clustered?',
        result: 'Burning Hands / Thunderwave',
        hint: 'Upcast with a higher slot for more damage.',
      },
      {
        condition: 'Single close enemy, or you want sustained damage?',
        result: 'Flaming Sphere',
      },
    ],
  },
];

export const dailyHabit = 'Cast Goodberry every day and give 2 berries to each person!';
