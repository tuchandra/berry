import type { SpellData } from '@/components/SpellCard';

/**
 * Berry's spells. Groups:
 *  - cantrips: the 4 known cantrips
 *  - wildfire: Circle of Wildfire spells, ALWAYS prepared (don't count toward the 9)
 *  - level1 / level2 / level3: prepared/known druid spells (kept broad as a reference)
 *
 * Prepared limit is druid level (6) + Wisdom modifier (+3) = 9, plus wildfire spells.
 */

export const cantrips: SpellData[] = [
  {
    name: 'Druidcraft',
    level: 'cantrip',
    school: 'Transmutation',
    castingTime: '1 action',
    range: '30 feet',
    components: 'V, S',
    duration: 'Instantaneous',
    description: [
      'You create one of a variety of minor natural effects: predict the next 24 hours of weather; make a flower bloom or a seed pod open; create a harmless sensory effect (falling leaves, puff of wind, faint odor, animal sound); or light or snuff out a small flame.',
    ],
  },
  {
    name: 'Guidance',
    level: 'cantrip',
    school: 'Divination',
    castingTime: '1 action',
    range: 'Touch',
    components: 'V, S',
    duration: 'Concentration, up to 1 minute',
    concentration: true,
    description: [
      'Touch one willing creature. Once before the spell ends, the target can roll a d4 and add the number to one ability check of its choice.',
    ],
  },
  {
    name: 'Mold Earth',
    level: 'cantrip',
    school: 'Transmutation',
    castingTime: '1 action',
    range: '30 feet',
    components: 'S',
    duration: 'Instantaneous or 1 hour',
    description: [
      'Choose a 5-foot cube of dirt or stone you can see. You can excavate and move it, shape it into a form, or change its color/texture. You can also make it difficult terrain, or the reverse, for up to 1 hour.',
    ],
  },
  {
    name: 'Resistance',
    level: 'cantrip',
    school: 'Abjuration',
    castingTime: '1 action',
    range: 'Touch',
    components: 'V, S, M',
    duration: 'Concentration, up to 1 minute',
    concentration: true,
    description: [
      'Touch one willing creature. Once before the spell ends, the target can roll a d4 and add the number to one saving throw of its choice.',
    ],
  },
];

export const wildfire: SpellData[] = [
  {
    name: 'Burning Hands',
    level: 1,
    school: 'Evocation',
    castingTime: '1 action',
    range: 'Self (15-foot cone)',
    components: 'V, S',
    duration: 'Instantaneous',
    badges: ['Wildfire', 'Always Prepared'],
    description: [
      "Each creature in a 15-foot cone must make a Dexterity saving throw (DC 14). A creature takes 3d6 fire damage on a failed save, or half as much on a success. Flammable objects that aren't worn or carried ignite.",
    ],
    higherLevels: 'The damage increases by 1d6 for each slot level above 1st.',
  },
  {
    name: 'Cure Wounds',
    level: 1,
    school: 'Evocation',
    castingTime: '1 action',
    range: 'Touch',
    components: 'V, S',
    duration: 'Instantaneous',
    badges: ['Wildfire', 'Always Prepared'],
    description: [
      'A creature you touch regains 1d8 + 3 hit points. No effect on undead or constructs.',
    ],
    higherLevels: 'The healing increases by 1d8 for each slot level above 1st.',
  },
  {
    name: 'Flaming Sphere',
    level: 2,
    school: 'Conjuration',
    castingTime: '1 action',
    range: '60 feet',
    components: 'V, S, M',
    duration: 'Concentration, up to 1 minute',
    concentration: true,
    badges: ['Wildfire', 'Always Prepared'],
    description: [
      'A 5-foot-diameter sphere of fire appears. A creature within 5 feet makes a Dexterity save (DC 14), taking 2d6 fire damage on a fail, half on success.',
      'As a bonus action you can move the sphere up to 30 feet, ramming a creature (forcing the save). It ignites flammable objects it touches and sheds bright light.',
    ],
    higherLevels: 'The damage increases by 1d6 for each slot level above 2nd.',
  },
  {
    name: 'Scorching Ray',
    level: 2,
    school: 'Evocation',
    castingTime: '1 action',
    range: '120 feet',
    components: 'V, S',
    duration: 'Instantaneous',
    badges: ['Wildfire', 'Always Prepared'],
    description: [
      'You create three rays of fire. Make a ranged spell attack (+6) for each ray, aimed at targets of your choice. On a hit, a target takes 2d6 fire damage.',
    ],
    higherLevels: 'You create one additional ray for each slot level above 2nd.',
  },
  {
    name: 'Revivify',
    level: 3,
    school: 'Necromancy',
    castingTime: '1 action',
    range: 'Touch',
    components: 'V, S, M (a diamond worth 300 gp, consumed)',
    duration: 'Instantaneous',
    badges: ['Wildfire', 'Always Prepared'],
    description: [
      "Touch a creature that has died within the last minute. It returns to life with 1 hit point. This spell can't return a creature that has died of old age, nor restore missing body parts.",
    ],
  },
  {
    name: 'Aura of Vitality',
    level: 3,
    school: 'Evocation',
    castingTime: '1 action',
    range: 'Self (30-foot aura)',
    components: 'V',
    duration: 'Concentration, up to 1 minute',
    concentration: true,
    badges: ['Wildfire', 'Always Prepared'],
    description: [
      'Healing energy radiates from you in a 30-foot aura. As a bonus action on each of your turns while the spell lasts, you can heal one creature in the aura for 2d6 hit points.',
    ],
  },
];

export const level1: SpellData[] = [
  {
    name: 'Entangle',
    level: 1,
    school: 'Conjuration',
    castingTime: '1 action',
    range: '90 feet',
    components: 'V, S',
    duration: 'Concentration, up to 1 minute',
    concentration: true,
    description: [
      'Grasping weeds and vines sprout in a 20-foot square. That area becomes difficult terrain. A creature in the area when you cast the spell must succeed on a Strength saving throw (DC 14) or be restrained. A restrained creature can use its action to make a Strength check against your DC to free itself.',
    ],
  },
  {
    name: 'Faerie Fire',
    level: 1,
    school: 'Evocation',
    castingTime: '1 action',
    range: '60 feet',
    components: 'V',
    duration: 'Concentration, up to 1 minute',
    concentration: true,
    description: [
      'Each object in a 20-foot cube is outlined in light (your choice of color). A creature in the area gets a Dexterity save (DC 14) to avoid the effect. For the duration, affected objects/creatures shed dim light, and any attack roll against an affected creature has advantage if the attacker can see it. Invisible creatures are outlined too.',
    ],
  },
  {
    name: 'Goodberry',
    level: 1,
    school: 'Transmutation',
    castingTime: '1 action',
    range: 'Touch',
    components: 'V, S, M (a sprig of mistletoe)',
    duration: 'Instantaneous',
    description: [
      'Up to ten berries appear in your hand, infused with magic for the next 24 hours. A creature can use its action to eat one berry, regaining 1 hit point; the berry also provides enough nourishment to sustain a creature for one day.',
    ],
    note: 'Cast this every day and hand out 2 berries to each person in the party.',
  },
  {
    name: 'Healing Word',
    level: 1,
    school: 'Evocation',
    castingTime: '1 bonus action',
    range: '60 feet',
    components: 'V',
    duration: 'Instantaneous',
    description: [
      'A creature of your choice that you can see regains 1d4 + 3 hit points. No effect on undead or constructs.',
    ],
    higherLevels: 'The healing increases by 1d4 for each slot level above 1st.',
    note: 'This CAN wake up an ally who is unconscious at 0 HP — any healing above 0 makes them conscious. Great "pick someone up from range" option (bonus action, 60 ft).',
  },
  {
    name: 'Ice Knife',
    level: 1,
    school: 'Conjuration',
    castingTime: '1 action',
    range: '60 feet',
    components: 'S, M (a drop of water or piece of ice)',
    duration: 'Instantaneous',
    description: [
      'You create a shard of ice and fling it. Make a ranged spell attack (+6). On a hit, the target takes 1d10 piercing damage. Hit or miss, the shard then explodes: each creature within 5 feet of the target must make a Dexterity save (DC 14) or take 2d6 cold damage.',
    ],
    higherLevels:
      'The cold damage increases by 1d6 for each slot level above 1st (good use of a spare 2nd/3rd slot).',
  },
  {
    name: 'Thunderwave',
    level: 1,
    school: 'Evocation',
    castingTime: '1 action',
    range: 'Self (15-foot cube)',
    components: 'V, S',
    duration: 'Instantaneous',
    description: [
      'Each creature in a 15-foot cube originating from you must make a Constitution save (DC 14). On a fail, a creature takes 2d8 thunder damage and is pushed 10 feet away from you; on a success, half damage and no push. Unsecured objects are also pushed, and the spell emits a thunderous boom audible out to 300 feet.',
    ],
    higherLevels: 'The damage increases by 1d8 for each slot level above 1st.',
  },
  {
    name: 'Protection from Evil and Good',
    level: 1,
    school: 'Abjuration',
    castingTime: '1 action',
    range: 'Touch',
    components: 'V, S, M (holy water or powdered silver and iron, consumed)',
    duration: 'Concentration, up to 10 minutes',
    concentration: true,
    description: [
      "One willing creature you touch is protected against aberrations, celestials, elementals, fey, fiends, and undead. Those creature types have disadvantage on attack rolls against the target, and the target can't be charmed, frightened, or possessed by them.",
    ],
  },
];

export const level2: SpellData[] = [
  {
    name: 'Healing Spirit',
    level: 2,
    school: 'Conjuration',
    castingTime: '1 bonus action',
    range: '60 feet',
    components: 'V, S',
    duration: 'Concentration, up to 1 minute',
    concentration: true,
    description: [
      "A nature spirit occupies a 5-foot cube. When it appears, and as a bonus action on your later turns, you can move it up to 30 feet. Whenever a creature (you choose which) enters the spirit's space or starts its turn there, it regains 1d6 hit points.",
      'The spirit can heal a number of times equal to 1 + your spellcasting modifier (4 times for Berry), then vanishes.',
    ],
    higherLevels: 'The healing increases by 1d6 for each slot level above 2nd.',
  },
  {
    name: 'Heat Metal',
    level: 2,
    school: 'Transmutation',
    castingTime: '1 action',
    range: '60 feet',
    components: 'V, S, M (a piece of iron and a flame)',
    duration: 'Concentration, up to 1 minute',
    concentration: true,
    description: [
      'Choose a manufactured metal object (a weapon, armor). It glows red-hot; a creature in physical contact takes 2d8 fire damage. As a bonus action on later turns you can deal the damage again.',
      "A creature holding or wearing the object and taking the damage must succeed on a Constitution save (DC 14) or drop it; if it can't, it has disadvantage on attack rolls and ability checks until the start of your next turn.",
    ],
    higherLevels: 'The damage increases by 1d8 for each slot level above 2nd.',
  },
  {
    name: 'Spike Growth',
    level: 2,
    school: 'Transmutation',
    castingTime: '1 action',
    range: '150 feet',
    components: 'V, S, M',
    duration: 'Concentration, up to 10 minutes',
    concentration: true,
    description: [
      'The ground in a 20-foot radius sprouts hard spikes and thorns, becoming difficult terrain. A creature takes 2d4 piercing damage for every 5 feet it travels through the area.',
      'The transformation is camouflaged; a creature must make a Wisdom (Perception) check against your DC to recognize the terrain as hazardous before entering it.',
    ],
  },
  {
    name: 'Pass Without Trace',
    level: 2,
    school: 'Abjuration',
    castingTime: '1 action',
    range: 'Self (30-foot aura)',
    components: 'V, S, M (ashes from burned mistletoe and a sprig of spruce)',
    duration: 'Concentration, up to 1 hour',
    concentration: true,
    description: [
      "A veil of shadows and silence radiates from you. You and each creature you choose within 30 feet gain a +10 bonus to Dexterity (Stealth) checks and can't be tracked except by magical means.",
    ],
  },
  {
    name: 'Lesser Restoration',
    level: 2,
    school: 'Abjuration',
    castingTime: '1 action',
    range: 'Touch',
    components: 'V, S',
    duration: 'Instantaneous',
    description: [
      'You touch a creature and end one disease or one condition afflicting it: blinded, deafened, paralyzed, or poisoned.',
    ],
  },
];

export const level3: SpellData[] = [
  {
    name: 'Tidal Wave',
    level: 3,
    school: 'Conjuration',
    castingTime: '1 action',
    range: '120 feet',
    components: 'V, S, M (a drop of water)',
    duration: 'Instantaneous',
    description: [
      'You conjure a wave of water that crashes down in a line 30 feet long, 10 feet wide, and 10 feet tall. Each creature there must make a Dexterity save (DC 14), taking 4d8 bludgeoning damage and being knocked prone on a fail, or half damage on a success. The area becomes lightly obscured until your next turn.',
    ],
  },
  {
    name: 'Plant Growth',
    level: 3,
    school: 'Transmutation',
    castingTime: '1 action or 8 hours',
    range: '150 feet',
    components: 'V, S',
    duration: 'Instantaneous',
    description: [
      'Overgrowth (action): plants in a 100-foot radius become thick and overgrown. A creature moving through the area must spend 4 feet of movement for every 1 foot it moves.',
      'Enrichment (8 hours): all plants in a half-mile radius become enriched for one year, yielding twice the normal amount of food when harvested.',
    ],
  },
  {
    name: 'Sleet Storm',
    level: 3,
    school: 'Conjuration',
    castingTime: '1 action',
    range: '150 feet',
    components: 'V, S, M',
    duration: 'Concentration, up to 1 minute',
    concentration: true,
    description: [
      'Freezing rain and sleet fall in a 20-foot-tall, 40-foot-radius cylinder. The area is heavily obscured and the ground is difficult terrain.',
      'A creature that enters or starts its turn in the area must make a Dexterity save (DC 14) or fall prone. A creature concentrating in the area must make a Constitution save against your DC or lose concentration.',
    ],
  },
  {
    name: 'Erupting Earth',
    level: 3,
    school: 'Transmutation',
    castingTime: '1 action',
    range: '120 feet',
    components: 'V, S, M (a piece of obsidian)',
    duration: 'Instantaneous',
    description: [
      'A fountain of churned earth and stone erupts in a 20-foot cube. Each creature in the area must make a Dexterity save (DC 14), taking 3d12 bludgeoning damage on a fail, half on a success. The ground in the area becomes difficult terrain.',
    ],
    higherLevels: 'The damage increases by 1d12 for each slot level above 3rd.',
  },
];
