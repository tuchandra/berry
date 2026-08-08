import { Combat } from '@/components/Combat';
import { FlowChart } from '@/components/FlowChart';
import { SpellCard, type SpellData } from '@/components/SpellCard';
import { Statblock } from '@/components/Statblock';
import {
  Abbr,
  Card,
  Note,
  Quote,
  Ref,
  Section,
  StatTile,
  SubHeading,
  ToggleButton,
} from '@/components/ui';
import { beasts } from '@/data/beasts';
import {
  abilities,
  backgroundDescription,
  backgroundFeature,
  character,
  languages,
  otherProficiencies,
  preparedLimit,
  skillSources,
  skills,
  spellSlots,
} from '@/data/character';
import { type Item, inventory, partyItems, seeds, weapons, worn } from '@/data/inventory';
import { LEVELED_SPELLS, type PreparedMap, isPrepared, usePrepared } from '@/data/prepared';
import {
  BOOKS,
  DRUID_CLASS_URL,
  NATURAL_RECOVERY_URL,
  OUTLANDER_BACKGROUND_URL,
  WILDFIRE_SUBCLASS_URL,
  spellRefUrl,
} from '@/data/sources';
import { cantrips, level1, level2, level3, level4 } from '@/data/spells';
import { wildfireSpirit } from '@/data/wildfire-spirit';
import { useState } from 'react';

const NAV = [
  { id: 'proficiencies', label: 'Proficiencies' },
  { id: 'combat', label: 'Combat' },
  { id: 'spells', label: 'Spells' },
  { id: 'wild-shape', label: 'Wild Shape' },
  { id: 'beasts', label: 'Beasts' },
  { id: 'flowchart', label: 'Flowchart' },
  { id: 'inventory', label: 'Inventory' },
];

function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-white/10 bg-[#0e1522]/95 shadow-lg shadow-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-baseline gap-x-6 gap-y-1 px-5 py-3">
        <a href="#top" className="display-font text-xl font-bold text-[var(--accent)] no-underline">
          Berry
        </a>
        <nav className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-[var(--ink-dim)]">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="no-underline hover:text-[var(--accent)]"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Overview() {
  return (
    <section id="top" className="scroll-mt-16 pt-8 pb-2">
      <p className="text-sm uppercase tracking-widest text-[var(--ink-dim)]">
        Level {character.level} · {character.race} {character.background} · {character.alignment} ·{' '}
        {character.spellcastingAbility} caster
      </p>
      <h1 className="display-font mt-1 text-4xl font-bold text-[var(--accent)]">
        Onyberyus <span className="text-[var(--ink-dim)]">"Berry"</span> Thistleballow
      </h1>
      <p className="mt-2 max-w-2xl text-[var(--ink)]">
        A Circle of Wildfire Druid — chaotic good, gentler aspects of chaos, "plant guy but with
        fire." An Outlander who came in from the wilds: he remembers every stretch of terrain he's
        walked and can feed the whole party off the land. He likes bears.
      </p>
    </section>
  );
}

function Mechanics() {
  return (
    <Section id="mechanics" title="Mechanics">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile
          label="Spell Save DC"
          value={String(character.spellSaveDc)}
          note="enemies roll vs this"
        />
        <StatTile label="Spell Attack" value={character.spellAttack} note="d20 + this to hit" />
        <StatTile
          label="Armor Class"
          value={String(character.ac)}
          note={
            <>
              studded leather 12 + <Abbr>DEX</Abbr>
            </>
          }
        />
        <StatTile
          label="Hit Points"
          value={String(character.hp)}
          note={
            <>
              {character.hitDice} ·{' '}
              <a
                href="https://5ehpcalculator.com/"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-dotted hover:text-[var(--accent)]"
              >
                HP calc
              </a>
            </>
          }
        />
        <StatTile label="Proficiency" value={character.proficiencyBonus} />
        <StatTile
          label="Initiative"
          value={character.initiative}
          note={
            <>
              d20 + <Abbr>DEX</Abbr>
            </>
          }
        />
        <StatTile label="Speed" value={character.speed} />
        <StatTile label="Passive Perception" value={String(character.passivePerception)} />
      </div>

      <SubHeading>Ability scores &amp; saves</SubHeading>
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[34rem] text-center text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-[var(--ink-dim)]">
              <th className="py-1 pr-3 text-left font-normal"> </th>
              {abilities.map((a) => (
                <th key={a.name} className="px-2 py-1">
                  <Abbr>{a.name.slice(0, 3).toUpperCase()}</Abbr>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-white/10">
              <th className="py-1 pr-3 text-left text-xs font-normal uppercase tracking-wide text-[var(--ink-dim)]">
                Score
              </th>
              {abilities.map((a) => (
                <td key={a.name} className="px-2 py-1">
                  {a.score}
                </td>
              ))}
            </tr>
            <tr className="border-t border-white/10">
              <th className="py-1 pr-3 text-left text-xs font-normal uppercase tracking-wide text-[var(--ink-dim)]">
                Mod
              </th>
              {abilities.map((a) => (
                <td key={a.name} className="display-font px-2 py-1 text-[var(--accent)]">
                  {a.mod}
                </td>
              ))}
            </tr>
            <tr className="border-t border-white/10">
              <th className="py-1 pr-3 text-left text-xs font-normal uppercase tracking-wide text-[var(--ink-dim)]">
                Save
              </th>
              {abilities.map((a) => (
                <td
                  key={a.name}
                  className={`px-2 py-1 ${a.saveProficient ? 'font-bold text-[var(--prof)]' : 'text-[var(--ink-dim)]'}`}
                >
                  {a.save}
                  {a.saveProficient && <span aria-hidden="true"> •</span>}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <p className="mt-3 text-xs text-[var(--ink-dim)]">
          <b className="text-[var(--prof)]">•</b> proficient save (<Abbr>CON</Abbr>,{' '}
          <Abbr>INT</Abbr>, <Abbr>WIS</Abbr>). <Abbr>CON</Abbr> proficiency from the Resilient feat.
        </p>
      </Card>

      <SubHeading>Skills</SubHeading>
      <Card>
        {/* Columns, not rows: multi-column flows top-to-bottom, so the alphabetical
            order reads down each column instead of across. */}
        <div className="columns-2 gap-x-6 sm:columns-3">
          {skills.map((s) => (
            <div
              key={s.name}
              className="flex break-inside-avoid items-baseline justify-between gap-2 border-b border-white/5 py-0.5 text-sm"
            >
              <span className={s.proficient ? 'font-bold text-[var(--prof)]' : 'text-[var(--ink)]'}>
                {s.proficient && <span aria-hidden="true">● </span>}
                {s.name} <Abbr>{s.ability.toUpperCase()}</Abbr>
                {s.note && <span className="ml-1 text-xs text-[var(--ink-dim)]">({s.note})</span>}
              </span>
              <span
                className={s.proficient ? 'font-bold text-[var(--prof)]' : 'text-[var(--ink-dim)]'}
              >
                {s.bonus}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-[var(--ink-dim)]">
          <b className="text-[var(--prof)]">●</b> <a href="#proficiencies">proficient</a> (bonus
          includes my +3). Everything else is just the ability modifier.
        </p>
      </Card>

      <SubHeading>How rolls work</SubHeading>
      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <div className="font-bold text-[var(--accent-2)]">When I attack or force a save</div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--ink)]">
            <li>
              <b>Spell attack</b> (e.g., Scorching Ray, Ice Knife): roll <b>d20 + 6</b> vs their AC.
            </li>
            <li>
              <b>Saving-throw spell</b> (e.g., Burning Hands, Entangle): the enemy rolls their save
              vs my <b>DC 14</b>. I don't roll to hit.
            </li>
            <li>
              <b>Weapon</b> (dart / quarterstaff): roll <b>d20 + 2</b> (<Abbr>DEX</Abbr>/
              <Abbr>STR</Abbr>) <b>+ 3</b> if proficient.
            </li>
          </ul>
        </Card>
        <Card>
          <div className="font-bold text-[var(--accent-2)]">When something happens to me</div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--ink)]">
            <li>
              <b>My saving throw</b>: d20 + the save modifier above (<Abbr>CON</Abbr>/
              <Abbr>INT</Abbr>/<Abbr>WIS</Abbr> are proficient).
            </li>
            <li>
              <b>Concentration</b>: take damage → <Abbr>CON</Abbr> save (DC 10 or half the damage,
              whichever is higher). My <Abbr>CON</Abbr> save is <b>+6</b>.
            </li>
            <li>
              <b>Skill check</b>: d20 + ability modifier (+3 more if proficient).
            </li>
          </ul>
        </Card>
      </div>

      <Note className="mt-3 max-w-3xl" label='"Spellcasting modifier" is two different numbers'>
        <p>
          My <b>spell attack modifier</b> is +6 (+3 from <Abbr>WIS</Abbr> and +3 from proficiency).
          Use this when rolling the d20 to hit with a spell. The same +6 builds my{' '}
          <b>spell save DC</b> of 14.
        </p>
        <p>
          My <b>spellcasting ability modifier</b> inside damage, healing, or count is{' '}
          <Abbr>WIS</Abbr> alone (+3) without proficiency. Cure Wounds heals 1d8 + 3; Healing Spirit
          gets 4 heals (1 + 3).
        </p>
      </Note>

      <SubHeading>Action economy — my turn</SubHeading>
      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <div className="font-bold text-[var(--accent-2)]">Action (one per turn)</div>
          <p className="mt-1 text-sm text-[var(--ink)]">
            Cast most spells · Wild Shape · summon the Wildfire Spirit · Attack · Dash / Dodge /
            Disengage.
          </p>
        </Card>
        <Card>
          <div className="font-bold text-[var(--accent-2)]">Bonus action (one per turn)</div>
          <p className="mt-1 text-sm text-[var(--ink)]">
            Healing Word · command the Wildfire Spirit · move Flaming Sphere / Healing Spirit.
          </p>
          <p className="mt-2 text-xs text-[var(--ink-dim)]">
            Rule: if I cast a leveled spell as a bonus action, my Action that turn can only be a
            cantrip.
          </p>
        </Card>
        <Card>
          <div className="font-bold text-[var(--accent-2)]">Reaction (one per round)</div>
          <p className="mt-1 text-sm text-[var(--ink)]">
            Opportunity attack when an enemy leaves my reach · certain spells.
          </p>
        </Card>
        <Card>
          <div className="font-bold text-[var(--accent-2)]">Movement</div>
          <p className="mt-1 text-sm text-[var(--ink)]">
            Up to {character.speed} · can split around my action.
          </p>
        </Card>
      </div>

      <SubHeading>Spellcasting &amp; Wild Shape</SubHeading>
      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <div className="font-bold text-[var(--accent-2)]">
            Spell slots
            <Ref book="PHB" url={DRUID_CLASS_URL} />
          </div>
          <div className="mt-2 flex gap-4">
            {spellSlots.map((s) => (
              <div key={s.level} className="text-center">
                <div className="display-font text-2xl text-[var(--accent)]">{s.count}</div>
                <div className="text-xs text-[var(--ink-dim)]">level {s.level}</div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-[var(--ink)]">
            I prepare <b>{preparedLimit} spells</b> (druid level {character.level} +{' '}
            <Abbr>WIS</Abbr> +3). Circle of Wildfire spells are <b>always prepared</b> and don't
            count toward that. I know <b>4 cantrips</b>. Slots come back on a long rest.
          </p>
        </Card>
        <Card>
          <div className="font-bold text-[var(--accent-2)]">
            Wild Shape
            <Ref book="PHB" url={DRUID_CLASS_URL} />
          </div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--ink)]">
            <li>
              <b>2 uses</b>, regained on short or long rest.
            </li>
            <li>
              Level {character.level}: any beast with <b>CR 1/2 or lower</b> and with{' '}
              <b>no flying speed</b>.
            </li>
            <li>
              Lasts <b>3 hours</b> (half my Druid level, rounded down).
            </li>
            <li>
              Alternatively, spend a use to summon Wildfire Spirit
              <Ref book="TCE" url={WILDFIRE_SUBCLASS_URL} />.
            </li>
          </ul>
        </Card>
      </div>
    </Section>
  );
}

function Proficiencies() {
  return (
    <Section id="proficiencies" title="Proficiencies &amp; Languages">
      <Quote
        cite={
          <>
            {character.background}
            <Ref book="PHB" url={OUTLANDER_BACKGROUND_URL} />
          </>
        }
      >
        {backgroundDescription}
      </Quote>

      <Card className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[38rem] text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-[var(--ink-dim)]">
              <th className="py-1 pr-4 font-normal">Source</th>
              <th className="py-1 pr-4 font-normal">What it grants</th>
              <th className="py-1 font-normal">What I have</th>
            </tr>
          </thead>
          <tbody>
            {skillSources.map((s) => (
              <tr key={s.from} className="border-t border-white/10 align-top">
                <td className="py-2 pr-4 font-bold text-[var(--accent-2)]">
                  {s.from}
                  {s.added && <Ref book="PHB" url={OUTLANDER_BACKGROUND_URL} />}
                </td>
                <td className="py-2 pr-4 text-[var(--ink-dim)]">{s.grants}</td>
                <td className="py-2 text-[var(--ink)]">{s.recorded}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Note className="mt-4 max-w-3xl" label={`Feature: ${backgroundFeature.name}`}>
        <p>{backgroundFeature.detail}</p>
      </Note>

      <SubHeading>Everything else I'm proficient with</SubHeading>
      <Card className="max-w-3xl">
        <dl className="space-y-2 text-sm">
          {otherProficiencies.map((p) => (
            <div key={p.label}>
              <dt className="text-xs uppercase tracking-wide text-[var(--accent-2)]">{p.label}</dt>
              <dd className="text-[var(--ink)]">{p.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs text-[var(--ink-dim)]">
          The Wood Elf weapon list is easy to forget — I can use a longbow, which most druids can't.
        </p>
      </Card>

      <SubHeading>Languages</SubHeading>
      <Card className="max-w-3xl">
        <dl className="space-y-2 text-sm">
          {languages.map((l) => (
            <div key={l.name}>
              <dt className="font-bold text-[var(--accent)]">{l.name}</dt>
              <dd className="text-[var(--ink-dim)]">{l.detail}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs text-[var(--ink-dim)]">
          Anything else: the <b>Helm of Languages</b> in <a href="#inventory">Inventory</a>.
        </p>
      </Card>
    </Section>
  );
}

/** One line of gear — name (linked, if it has a reference page) then what it does. */
function ItemLine({ item, lead }: { item: Item; lead?: string }) {
  const name = (
    <>
      {item.count ? `${item.count} × ` : ''}
      {item.name}
    </>
  );
  return (
    <li className="flex flex-wrap items-baseline gap-x-2 border-b border-white/5 pb-1.5 last:border-0">
      <span className="font-bold text-[var(--accent)]">
        {lead && <span className="text-[var(--ink-dim)]">{lead} </span>}
        {item.url ? (
          <a href={item.url} target="_blank" rel="noreferrer">
            {name}
          </a>
        ) : (
          name
        )}
      </span>
      {item.detail && <span className="text-[var(--ink-dim)]">{item.detail}</span>}
    </li>
  );
}

function ItemList({ items }: { items: Item[] }) {
  return (
    <Card className="max-w-3xl">
      <ul className="space-y-1.5 text-sm">
        {items.map((item) => (
          <ItemLine key={item.name} item={item} />
        ))}
      </ul>
    </Card>
  );
}

function Inventory() {
  return (
    <Section id="inventory" title="Inventory">
      <SubHeading>Worn</SubHeading>
      <ItemList items={worn} />

      <SubHeading>Weapons</SubHeading>
      <ItemList items={weapons} />

      <SubHeading>Carried</SubHeading>
      <ItemList items={inventory} />

      <SubHeading>Seeds</SubHeading>
      <ItemList items={seeds} />

      <SubHeading>What the rest of the party is carrying</SubHeading>
      <Card className="max-w-3xl">
        <ul className="space-y-1.5 text-sm">
          {partyItems.map((item) => (
            <ItemLine key={`${item.owner}-${item.name}`} item={item} lead={`${item.owner} —`} />
          ))}
        </ul>
      </Card>
    </Section>
  );
}

function SpellGrid({ children }: { children: React.ReactNode }) {
  return <div className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
}

/** A leveled spell group with prep-mode toggling and hide-unprepared behaviour. */
function LevelGroup({
  title,
  spells,
  prepMode,
  prepared,
  toggle,
}: {
  title: string;
  spells: SpellData[];
  prepMode: boolean;
  prepared: PreparedMap;
  toggle: (name: string) => void;
}) {
  const [showUnprepared, setShowUnprepared] = useState(false);
  const ready = (s: SpellData) => isPrepared(s, prepared);
  const unprepared = spells.filter((s) => !ready(s));
  // In prep mode show everything; otherwise only prepared spells.
  const visible = prepMode ? spells : spells.filter(ready);

  return (
    <div className="mb-6">
      <h3 className="text-lg text-[var(--ink)]">{title}</h3>
      <SpellGrid>
        {visible.map((spell) => (
          <SpellCard
            key={spell.name}
            spell={spell}
            selectable={prepMode}
            prepared={ready(spell)}
            locked={spell.alwaysPrepared}
            onToggle={() => toggle(spell.name)}
          />
        ))}
      </SpellGrid>

      {!prepMode && unprepared.length > 0 && (
        <div className="mt-3">
          <button
            type="button"
            onClick={() => setShowUnprepared((v) => !v)}
            className="rounded-full border border-white/15 px-3 py-1 text-xs text-[var(--ink-dim)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            {showUnprepared
              ? `Hide ${unprepared.length} not prepared`
              : `Show ${unprepared.length} not prepared`}
          </button>
          {showUnprepared && (
            <SpellGrid>
              {unprepared.map((spell) => (
                <SpellCard key={spell.name} spell={spell} dimmed />
              ))}
            </SpellGrid>
          )}
        </div>
      )}
    </div>
  );
}

function Spells({ prepared, toggle }: { prepared: PreparedMap; toggle: (name: string) => void }) {
  const [prepMode, setPrepMode] = useState(false);

  const preparedCount = LEVELED_SPELLS.filter((s) => !s.alwaysPrepared && prepared[s.name]).length;
  const overLimit = preparedCount > preparedLimit;

  return (
    <Section id="spells" title="Spells">
      <p className="mb-4 max-w-2xl text-[var(--ink-dim)]">
        Save DC is <b>14</b>, spell attack is <b>+6</b>.
      </p>

      <Note
        className="mb-5 max-w-2xl"
        label={
          <>
            Natural Recovery — slots back on a short rest
            <Ref book="PHB" url={NATURAL_RECOVERY_URL} />
          </>
        }
      >
        <p>
          Once per day, on a short rest, I recover expended spell slots with a combined level up to
          half my druid level rounded up — <b>4 levels</b> at level 7. No slot can be level 6 or
          higher.
        </p>
      </Note>

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <ToggleButton on={prepMode} onClick={() => setPrepMode((m) => !m)}>
          {prepMode ? 'Done' : 'Edit prepared spells'}
        </ToggleButton>
        <span className="text-sm text-[var(--ink-dim)]">
          <b className="text-[var(--accent)]">{preparedCount}</b> / {preparedLimit} prepared
          {overLimit && <b className="text-[var(--accent-2)]"> — over your limit</b>}
          <span className="ml-1">· Wildfire spells are always prepared and don't count.</span>
        </span>
      </div>

      {prepMode && (
        <p className="mb-4 max-w-2xl rounded-md border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-3 py-2 text-sm text-[var(--ink)]">
          Tap any card to prepare or unprepare it. Circle spells are locked (marked <b>Wildfire</b>)
          and always prepared. Cantrips are always available and aren't prepared.
        </p>
      )}

      <div className="mb-6">
        <h3 className="text-lg text-[var(--ink)]">Cantrips</h3>
        <p className="mb-2 text-sm italic text-[var(--ink-dim)]">
          Always available, no slot needed.
        </p>
        <SpellGrid>
          {cantrips.map((spell) => (
            <SpellCard key={spell.name} spell={spell} />
          ))}
        </SpellGrid>
      </div>

      <LevelGroup
        title="Level 1"
        spells={level1}
        prepMode={prepMode}
        prepared={prepared}
        toggle={toggle}
      />
      <LevelGroup
        title="Level 2"
        spells={level2}
        prepMode={prepMode}
        prepared={prepared}
        toggle={toggle}
      />
      <LevelGroup
        title="Level 3"
        spells={level3}
        prepMode={prepMode}
        prepared={prepared}
        toggle={toggle}
      />
      <LevelGroup
        title="Level 4"
        spells={level4}
        prepMode={prepMode}
        prepared={prepared}
        toggle={toggle}
      />
    </Section>
  );
}

function WildShape() {
  return (
    <Section id="wild-shape" title="Wild Shape">
      <p className="mb-4 max-w-2xl text-[var(--ink-dim)]">
        Forms I can take: CR 1/2 or lower, no flying. Statblocks are in <a href="#beasts">Beasts</a>
        , tagged <b>Wild Shape</b>.
      </p>

      <Note
        className="mb-5 max-w-3xl"
        label={
          <>
            I keep my own mind in every form
            <Ref book="PHB" url={DRUID_CLASS_URL} />
          </>
        }
      >
        <p>
          When I Wild Shape I take the beast's{' '}
          <b>
            <Abbr>STR</Abbr>, <Abbr>DEX</Abbr>, <Abbr>CON</Abbr>, AC, HP, and speed
          </b>
          , but I keep my own{' '}
          <b>
            <Abbr>INT</Abbr> 9 (−1), <Abbr>WIS</Abbr> 16 (+3), <Abbr>CHA</Abbr> 10 (+0)
          </b>{' '}
          and all my saving-throw and skill proficiencies. So the mental scores printed in the
          blocks below are <b>not</b> what I use — ignore the beast's <Abbr>INT</Abbr>/
          <Abbr>WIS</Abbr>/<Abbr>CHA</Abbr> and use mine.
        </p>
        <p>
          I can't cast spells while transformed, but my <Abbr>WIS</Abbr> still drives things like{' '}
          <Abbr>WIS</Abbr> saves and Perception. I can drop out of a form as a bonus action.
        </p>
      </Note>

      <Note className="mt-3 max-w-2xl" label="Unexplored: mounting mechanics">
        <p>
          We haven't tried this yet, but a Wild Shape form could work as a <b>mount</b> for a
          smaller party member. A creature can ride a willing mount that is at least one size larger
          than it and has an appropriate anatomy — so a Medium form (ape, black bear) could carry a
          Small ally, and the crocodile, my only <b>Large</b> form, could carry a Medium one. A
          controlled mount moves and acts on my initiative.
        </p>
      </Note>

      <SubHeading>
        Wildfire Spirit
        <Ref book="TCE" url={WILDFIRE_SUBCLASS_URL} />
      </SubHeading>
      <p className="mb-3 max-w-2xl text-[var(--ink-dim)]">
        Instead of taking a form I can spend a Wild Shape use on my spirit. It shares my initiative
        and I command it with a bonus action.
      </p>
      <div className="max-w-3xl">
        <Statblock data={wildfireSpirit} />
      </div>
    </Section>
  );
}

/**
 * Every beast statblock in one place, ordered by challenge rating. Wild Shape and
 * Conjure Animals draw from an overlapping pool, so each card carries a tag rather
 * than being written out twice.
 */
function Beasts() {
  return (
    <Section id="beasts" title="Beasts">
      <SubHeading>
        Conjure Animals
        <Ref book="PHB" url={spellRefUrl('Conjure Animals')} />
      </SubHeading>
      <p className="mb-4 max-w-2xl text-[var(--ink-dim)]">
        A 3rd-level slot summons fey spirits in beast form. I pick <b>one</b> option: eight CR 1/4,
        four CR 1/2, two CR 1, or one CR 2.
      </p>

      <Card className="mb-5 max-w-3xl">
        <ul className="space-y-1.5 text-sm">
          <li>
            <span className="statblock__tag statblock__tag--ws">Wild Shape</span>{' '}
            <span className="text-[var(--ink-dim)]">
              — I can become it: CR 1/2 or lower with no flying speed.
            </span>
          </li>
          <li>
            <span className="statblock__tag statblock__tag--ca">Conjure ×N</span>{' '}
            <span className="text-[var(--ink-dim)]">
              — I can summon it, and N is how many the spell gives me at that CR: eight at CR 1/4,
              four at CR 1/2, two at CR 1, one at CR 2.
            </span>
          </li>
        </ul>
      </Card>
      <div className="grid gap-5 sm:grid-cols-2">
        {beasts.map((beast) => (
          <Statblock key={beast.name} data={beast} />
        ))}
      </div>
    </Section>
  );
}

function SourcesLegend() {
  return (
    <Section id="sources" title="Sources">
      <p className="mb-4 max-w-2xl text-[var(--ink-dim)]">
        Every spell and statblock links to a reference so I can show a DM where it comes from. Book
        abbreviations:
      </p>
      <Card className="max-w-2xl">
        <ul className="space-y-1 text-sm text-[var(--ink)]">
          <li>
            <b>PHB</b> — {BOOKS.PHB.name}
          </li>
          <li>
            <b>XGE</b> — {BOOKS.XGE.name}
          </li>
          <li>
            <b>TCE</b> — {BOOKS.TCE.name} (Circle of Wildfire)
          </li>
          <li>
            <b>MM</b> — {BOOKS.MM.name} (beast statblocks)
          </li>
        </ul>
        <p className="mt-3 text-xs text-[var(--ink-dim)]">
          Spell and subclass links go to the{' '}
          <a href="https://dnd5e.wikidot.com" target="_blank" rel="noreferrer">
            D&amp;D 5e Wikidot
          </a>{' '}
          (each page cites its book); beast statblocks link to{' '}
          <a href="https://open5e.com" target="_blank" rel="noreferrer">
            Open5e
          </a>{' '}
          (SRD). The combat flowchart is my own strategy, not official rules.
        </p>
      </Card>
    </Section>
  );
}

export default function App() {
  // Prepared spells live here so both the Spells section and the combat spell-slot
  // picker read the same list.
  const { prepared, toggle } = usePrepared();

  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-5 pb-20">
        <Overview />
        <Mechanics />
        <Proficiencies />
        <Combat prepared={prepared} />
        <Spells prepared={prepared} toggle={toggle} />
        <WildShape />
        <Beasts />
        <Section id="flowchart" title="Combat Flowchart">
          <FlowChart />
        </Section>
        <Inventory />
        <SourcesLegend />
      </main>
      <footer className="border-t border-white/10 py-6 text-center text-xs text-[var(--ink-dim)]">
        Onyberyus Thistleballow · a Wildfire Druid reference
      </footer>
    </>
  );
}
