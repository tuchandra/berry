import { FlowChart } from '@/components/FlowChart';
import { SpellCard, type SpellData } from '@/components/SpellCard';
import { Statblock } from '@/components/Statblock';
import {
  allosaurus,
  brownBear,
  deinonychus,
  direWolf,
  giantConstrictorSnake,
  giantPoisonousSnake,
  giantToad,
  polarBear,
  reefShark,
  velociraptor,
  wildShapeForms,
  wolf,
} from '@/data/beasts';
import {
  abilities,
  character,
  classSkillCounts,
  languages,
  otherProficiencies,
  preparedLimit,
  skillSources,
  skills,
  spellSlots,
} from '@/data/character';
import { inventory } from '@/data/inventory';
import { BOOKS, DRUID_CLASS_URL, WILDFIRE_SUBCLASS_URL, spellRefUrl } from '@/data/sources';
import { cantrips, level1, level2, level3, level4 } from '@/data/spells';
import { wildfireSpirit } from '@/data/wildfire-spirit';
import { useEffect, useState } from 'react';

/** Small inline source citation. */
function Ref({ book, url }: { book: keyof typeof BOOKS; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      title={BOOKS[book].name}
      className="ml-1 align-middle text-xs text-[var(--ink-dim)] underline decoration-dotted hover:text-[var(--accent)]"
    >
      {BOOKS[book].abbr}
    </a>
  );
}

const NAV = [
  { id: 'mechanics', label: 'Mechanics' },
  { id: 'proficiencies', label: 'Proficiencies' },
  { id: 'spells', label: 'Spells' },
  { id: 'wild-shape', label: 'Wild Shape' },
  { id: 'summons', label: 'Summons' },
  { id: 'flowchart', label: 'Flowchart' },
  { id: 'inventory', label: 'Inventory' },
  { id: 'sources', label: 'Sources' },
];

const BACKGROUNDS_URL = 'https://5thsrd.org/character/backgrounds/';

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

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-16 py-8">
      <h2 className="display-font mb-4 text-2xl font-bold text-[var(--accent-2)]">{title}</h2>
      {children}
    </section>
  );
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-white/10 bg-black/25 p-4 ${className}`}>
      {children}
    </div>
  );
}

function StatTile({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: React.ReactNode;
}) {
  return (
    <div className="rounded-md border border-white/10 bg-black/25 px-4 py-3">
      <div className="text-xs uppercase tracking-wide text-[var(--ink-dim)]">{label}</div>
      <div className="display-font text-2xl text-[var(--accent)]">{value}</div>
      {note && <div className="mt-0.5 text-xs text-[var(--ink-dim)]">{note}</div>}
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-2 mt-6 text-lg text-[var(--ink)]">{children}</h3>;
}

/**
 * One of Berry's own notes — reminders, table rulings, and things to try. Styled
 * to match the notes on the parchment spell cards and statblocks, so a note reads
 * the same wherever it appears.
 */
function Note({
  label = "Berry's note",
  className = '',
  children,
}: {
  label?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`note ${className}`}>
      <span className="note__label">{label}</span>
      <div className="note__body">{children}</div>
    </div>
  );
}

function TieredForm({
  label,
  tagline,
  children,
}: {
  label: string;
  tagline: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex flex-wrap items-baseline gap-x-3">
        <span className="display-font text-lg text-[var(--accent)]">{label}</span>
        <span className="text-sm text-[var(--ink-dim)]">{tagline}</span>
      </div>
      {children}
    </div>
  );
}

function Overview() {
  return (
    <section id="top" className="scroll-mt-16 pt-8 pb-2">
      <p className="text-sm uppercase tracking-widest text-[var(--ink-dim)]">
        Level {character.level} · {character.race} · {character.alignment} ·{' '}
        {character.spellcastingAbility} caster
      </p>
      <h1 className="display-font mt-1 text-4xl font-bold text-[var(--accent)]">
        Onyberyus Thistleballow <span className="text-[var(--ink-dim)]">"Berry"</span>
      </h1>
      <p className="mt-2 max-w-2xl text-[var(--ink)]">
        A Circle of Wildfire Druid — chaotic good, gentler aspects of chaos, "plant guy but with
        fire." He likes bears. This is my table reference: the numbers I forget, what I can do on my
        turn, my spells, and my forms.
      </p>
      <div className="mt-4 flex flex-wrap gap-3 text-sm text-[var(--ink-dim)]">
        <span className="rounded-full border border-white/15 px-3 py-1">{character.class}</span>
      </div>
    </section>
  );
}

function Mechanics() {
  return (
    <Section id="mechanics" title="Mechanics">
      <p className="mb-4 max-w-2xl text-[var(--ink-dim)]">
        The numbers that come up most, and the rules for what happens on my turn.
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile
          label="Spell Save DC"
          value={String(character.spellSaveDc)}
          note="enemies roll vs this"
        />
        <StatTile label="Spell Attack" value={character.spellAttack} note="d20 + this to hit" />
        <StatTile label="Armor Class" value={String(character.ac)} />
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
        <StatTile label="Initiative" value={character.initiative} note="d20 + Dex" />
        <StatTile label="Speed" value={character.speed} />
        <StatTile label="Passive Perc." value={String(character.passivePerception)} />
      </div>

      <SubHeading>Ability scores &amp; saves</SubHeading>
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[34rem] text-center text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-[var(--ink-dim)]">
              <th className="py-1 pr-3 text-left font-normal"> </th>
              {abilities.map((a) => (
                <th key={a.name} className="px-2 py-1 text-[var(--accent-2)]">
                  {a.name.slice(0, 3).toUpperCase()}
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
                  className={`px-2 py-1 ${a.saveProficient ? 'font-bold text-[var(--accent)]' : 'text-[var(--ink-dim)]'}`}
                >
                  {a.save}
                  {a.saveProficient && <span aria-hidden="true"> •</span>}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <p className="mt-3 text-xs text-[var(--ink-dim)]">
          <b className="text-[var(--accent)]">•</b> proficient save (Con, Int, Wis). Con is
          proficient thanks to the Resilient feat — handy for keeping concentration.
        </p>
      </Card>

      <SubHeading>Skills</SubHeading>
      <Card>
        <div className="grid grid-cols-2 gap-x-6 gap-y-0.5 sm:grid-cols-3">
          {skills.map((s) => (
            <div
              key={s.name}
              className="flex items-baseline justify-between gap-2 border-b border-white/5 py-0.5 text-sm"
            >
              <span
                className={s.proficient ? 'font-bold text-[var(--accent)]' : 'text-[var(--ink)]'}
              >
                {s.proficient && <span aria-hidden="true">● </span>}
                {s.name} <span className="text-xs text-[var(--ink-dim)]">{s.ability}</span>
              </span>
              <span
                className={
                  s.proficient ? 'font-bold text-[var(--accent)]' : 'text-[var(--ink-dim)]'
                }
              >
                {s.bonus}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-[var(--ink-dim)]">
          <b className="text-[var(--accent)]">●</b> proficient (bonus includes my +3). Everything
          else is just the ability modifier. Only three are marked — see{' '}
          <a href="#proficiencies">Proficiencies</a> for why that's two short.
        </p>
      </Card>

      <SubHeading>How rolls work</SubHeading>
      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <div className="font-bold text-[var(--accent-2)]">When I attack or force a save</div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--ink)]">
            <li>
              <b>Spell attack</b> (e.g. Scorching Ray, Ice Knife): roll <b>d20 + 6</b> vs their AC.
            </li>
            <li>
              <b>Saving-throw spell</b> (e.g. Burning Hands, Entangle): the enemy rolls their save
              vs my <b>DC 14</b>. I don't roll to hit.
            </li>
            <li>
              <b>Weapon</b> (dart / quarterstaff): roll <b>d20 + 2</b> (Dex/Str) <b>+ 3</b> if
              proficient.
            </li>
          </ul>
        </Card>
        <Card>
          <div className="font-bold text-[var(--accent-2)]">When something happens to me</div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--ink)]">
            <li>
              <b>My saving throw</b>: d20 + the save modifier above (Con/Int/Wis are proficient).
            </li>
            <li>
              <b>Concentration</b>: take damage → Con save (DC 10 or half the damage, whichever is
              higher). My Con save is <b>+6</b>.
            </li>
            <li>
              <b>Skill check</b>: d20 + ability modifier (+3 more if proficient).
            </li>
          </ul>
        </Card>
      </div>

      <Note className="mt-3 max-w-3xl" label='"Spellcasting modifier" is two different numbers'>
        <p>
          This trips me up, so: my <b>spell attack modifier is +6</b> — that's Wisdom +3 plus my
          proficiency +3, and it's the number I add to a d20 when a spell makes me roll to hit
          (Scorching Ray, Ice Knife, Thorn Whip). It's the number my sheet labels "spellcasting."
          Same +3 and +3 build my <b>save DC of 14</b> (8 + 3 + 3).
        </p>
        <p>
          But when a spell's text says "your spellcasting ability modifier" inside a{' '}
          <b>damage, healing, or count</b> formula, that means <b>Wisdom alone: +3</b> — proficiency
          never applies there. So Cure Wounds heals 1d8 <b>+ 3</b>, and Healing Spirit gets <b>4</b>{' '}
          heals (1 + 3), not 7. Anywhere on this page you see a bare +6, it's an attack roll; a bare
          +3 in a damage or healing line is Wisdom.
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
            I prepare <b>{preparedLimit} spells</b> (druid level {character.level} + Wis +3). Circle
            of Wildfire spells are <b>always prepared</b> and don't count toward that. I know{' '}
            <b>4 cantrips</b>. Slots come back on a long rest.
          </p>
        </Card>
        <Card>
          <div className="font-bold text-[var(--accent-2)]">
            Wild Shape
            <Ref book="PHB" url={DRUID_CLASS_URL} />
          </div>
          <p className="mt-1 text-sm text-[var(--ink)]">
            <b>2 uses</b>, regained on a short or long rest. At level {character.level} I can become
            a beast of <b>CR 1/2 or lower</b> with <b>no flying speed</b> (swimming is fine) — CR 1
            and flight unlock at level 8. The form lasts <b>3 hours</b> (half my druid level in
            hours, rounded down). I can spend a use to summon my Wildfire Spirit instead
            <Ref book="TCE" url={WILDFIRE_SUBCLASS_URL} />.
          </p>
        </Card>
      </div>
    </Section>
  );
}

function Proficiencies() {
  const proficientSkills = skills.filter((s) => s.proficient);

  return (
    <Section id="proficiencies" title="Proficiencies &amp; Languages">
      <p className="mb-4 max-w-3xl text-[var(--ink-dim)]">
        I have <b>{proficientSkills.length}</b> skill proficiencies and other people at the table
        have four to seven. I looked into why. Short version: I'm not doing the math wrong — I'm
        missing a <b>Background</b>, and it's worth two skills.
      </p>

      <SubHeading>Where skill proficiencies come from</SubHeading>
      <p className="mb-3 max-w-3xl text-sm text-[var(--ink-dim)]">
        Every 5e character draws them from three places, and they stack. My class and race are
        accounted for; the third row is the gap.
      </p>
      <Card className="overflow-x-auto">
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
                <td className="py-2 pr-4 font-bold text-[var(--accent-2)]">{s.from}</td>
                <td className="py-2 pr-4 text-[var(--ink-dim)]">{s.grants}</td>
                <td
                  className={`py-2 ${s.missing ? 'font-bold text-[var(--accent)]' : 'text-[var(--ink)]'}`}
                >
                  {s.recorded}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 text-xs text-[var(--ink-dim)]">
          A background gives every character proficiency in <b>two skills</b>, plus two tool
          proficiencies or languages, a starting-equipment package, and a roleplay feature
          <Ref book="PHB" url={BACKGROUNDS_URL} />. So my total should be{' '}
          <b>{proficientSkills.length + 2}</b>, not {proficientSkills.length}.
        </p>
      </Card>

      <SubHeading>Why the rest of the party has more</SubHeading>
      <p className="mb-3 max-w-3xl text-sm text-[var(--ink-dim)]">
        Class is the big differentiator — druid is on the low end at two.
      </p>
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[32rem] text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-[var(--ink-dim)]">
              <th className="py-1 pr-4 font-normal">Class</th>
              <th className="py-1 pr-4 text-center font-normal">Skills</th>
              <th className="py-1 font-normal" />
            </tr>
          </thead>
          <tbody>
            {classSkillCounts.map((c) => (
              <tr key={c.klass} className="border-t border-white/10 align-top">
                <td className="py-2 pr-4 text-[var(--ink)]">{c.klass}</td>
                <td className="display-font py-2 pr-4 text-center text-[var(--accent)]">
                  {c.count}
                </td>
                <td className="py-2 text-xs text-[var(--ink-dim)]">{c.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 text-xs text-[var(--ink-dim)]">
          Add <b>+2 from a background</b> to any of those, then race on top — most races give zero
          or one skill, but a Half-Elf gives <b>two</b>. So a Half-Elf Rogue lands at 4 + 2 + 2 ={' '}
          <b>8</b>, with two of them doubled by Expertise. A Druid with a background lands at 5.
          That spread of 3–8 is exactly what we saw in the skill challenge.
        </p>
      </Card>

      <Note className="mt-4 max-w-3xl" label="What I should actually do">
        <p>
          Ask the DM to let me pick a background — it's a normal thing to backfill, and I'd gain two
          skills, two tools-or-languages, and a feature. Best fits for Berry:
        </p>
        <ul>
          <li>
            <b>Outlander</b> — Athletics + Survival. No overlap with what I already have, and
            Survival with Wisdom becomes <b>+6</b>. Also a musical instrument and a language.
            Wanderer: I always remember terrain, and can forage food and water for six people a day.
          </li>
          <li>
            <b>Folk Hero</b> — Animal Handling + Survival. Very druid, and Animal Handling is the
            check I keep wanting to make.
          </li>
          <li>
            <b>Sage</b> — Arcana + History, plus two languages. Covers my two worst skills (Int −1),
            so proficiency only brings them to +2 — flavour more than fix.
          </li>
        </ul>
        <p>
          One wrinkle: if a background hands me a skill I already have from the druid list (Hermit
          gives Medicine, for example), the rules don't automatically swap it — I'd just lose that
          one. The <b>customizing a background</b> rule lets me choose <i>any</i> two skills
          instead, which avoids the problem entirely; worth asking for.
        </p>
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
              <dt
                className={`font-bold ${l.flagged ? 'text-[var(--ink-dim)]' : 'text-[var(--accent)]'}`}
              >
                {l.name}
                {l.flagged && (
                  <span className="ml-2 rounded-full border border-white/20 px-2 py-0.5 text-[0.65rem] font-normal uppercase tracking-wide">
                    check this
                  </span>
                )}
              </dt>
              <dd className="text-[var(--ink-dim)]">{l.detail}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs text-[var(--ink-dim)]">
          The <b>Helm of Languages</b> in <a href="#inventory">Inventory</a> is the thing to reach
          for when none of these work.
        </p>
      </Card>
    </Section>
  );
}

function Inventory() {
  return (
    <Section id="inventory" title="Inventory">
      <p className="mb-4 max-w-2xl text-[var(--ink-dim)]">
        Magic items and loot worth remembering. Several of these aren't fully identified yet, so the
        descriptions are only what we know at the table.
      </p>
      <Card className="max-w-3xl">
        <ul className="space-y-1.5 text-sm">
          {inventory.map((item) => (
            <li
              key={item.name}
              className="flex flex-wrap items-baseline gap-x-2 border-b border-white/5 pb-1.5 last:border-0"
            >
              <span className="font-bold text-[var(--accent)]">
                {item.count ? `${item.count} × ` : ''}
                {item.name}
              </span>
              {item.detail && <span className="text-[var(--ink-dim)]">{item.detail}</span>}
            </li>
          ))}
        </ul>
      </Card>
    </Section>
  );
}

const PREP_STORAGE_KEY = 'berry-prepared-v1';
const LEVELED_SPELLS: SpellData[] = [...level1, ...level2, ...level3, ...level4];

/** Prepared-spell selection, persisted to localStorage. Defaults to all prepared. */
function usePrepared() {
  const [prepared, setPrepared] = useState<Record<string, boolean>>(() => {
    const defaults: Record<string, boolean> = {};
    for (const s of LEVELED_SPELLS) defaults[s.name] = true;
    const raw = typeof localStorage !== 'undefined' && localStorage.getItem(PREP_STORAGE_KEY);
    if (raw) {
      try {
        Object.assign(defaults, JSON.parse(raw));
      } catch {
        // corrupt value — fall back to defaults
      }
    }
    return defaults;
  });

  useEffect(() => {
    localStorage.setItem(PREP_STORAGE_KEY, JSON.stringify(prepared));
  }, [prepared]);

  const toggle = (name: string) => setPrepared((p) => ({ ...p, [name]: !p[name] }));
  return { prepared, toggle };
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
  prepared: Record<string, boolean>;
  toggle: (name: string) => void;
}) {
  const [showUnprepared, setShowUnprepared] = useState(false);
  const isPrepared = (s: SpellData) => s.alwaysPrepared || prepared[s.name];
  const unprepared = spells.filter((s) => !isPrepared(s));
  // In prep mode show everything; otherwise only prepared spells.
  const visible = prepMode ? spells : spells.filter(isPrepared);

  return (
    <div className="mb-6">
      <h3 className="text-lg text-[var(--ink)]">{title}</h3>
      <SpellGrid>
        {visible.map((spell) => (
          <SpellCard
            key={spell.name}
            spell={spell}
            selectable={prepMode}
            prepared={isPrepared(spell)}
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

function Spells() {
  const { prepared, toggle } = usePrepared();
  const [prepMode, setPrepMode] = useState(false);

  const preparedCount = LEVELED_SPELLS.filter((s) => !s.alwaysPrepared && prepared[s.name]).length;
  const overLimit = preparedCount > preparedLimit;

  return (
    <Section id="spells" title="Spells">
      <p className="mb-4 max-w-2xl text-[var(--ink-dim)]">
        Save DC is <b>14</b>, spell attack is <b>+6</b>. This list is broader than I can prepare —
        use <b>Edit prepared</b> to pick my {preparedLimit}; the rest tuck away at the end of each
        level.
      </p>

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setPrepMode((m) => !m)}
          className={`rounded-full border px-4 py-1.5 text-sm ${
            prepMode
              ? 'border-[var(--accent)] bg-[var(--accent)] font-bold text-[#0e1522]'
              : 'border-white/20 text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
          }`}
        >
          {prepMode ? 'Done' : 'Edit prepared spells'}
        </button>
        <span className="text-sm text-[var(--ink-dim)]">
          <b className="text-[var(--accent)]">{preparedCount}</b> / {preparedLimit} prepared
          {overLimit && <b className="text-[var(--accent-2)]"> — over your limit</b>}
          <span className="ml-1">· Wildfire spells are always prepared and don't count.</span>
        </span>
      </div>

      {prepMode && (
        <p className="mb-4 max-w-2xl rounded-md border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-3 py-2 text-sm text-[var(--ink)]">
          Tap any card to prepare or unprepare it. Wildfire spells are locked (marked <b>Always</b>
          ). Cantrips are always available and aren't prepared.
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
        Forms I can take (CR 1/2 or lower, no flying). My favorites and their statblocks.
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
          <b>Strength, Dexterity, Constitution, AC, HP, and speed</b>, but I keep my own{' '}
          <b>Intelligence 9 (−1), Wisdom 16 (+3), Charisma 10 (+0)</b> and all my saving-throw and
          skill proficiencies. So the mental scores printed in the blocks below are <b>not</b> what
          I use — ignore the beast's Int/Wis/Cha and use mine.
        </p>
        <p>
          I can't cast spells while transformed, but my Wisdom still drives things like Wisdom saves
          and Perception. I can drop out of a form as a bonus action.
        </p>
      </Note>

      <div className="grid gap-5 sm:grid-cols-2">
        {wildShapeForms.map((form) => (
          <Statblock key={form.name} data={form} />
        ))}
      </div>
      <Note className="mt-5 max-w-2xl" label="Other forms to consider">
        <p>
          Other solid CR 1/2 picks I could learn: Giant Goat (charge + knock prone), Warhorse
          (trampling charge), and <a href="#summons">Reef Shark</a> — swimming forms are legal for
          me now, and the shark's blindsight is the best underwater sense I can get.
        </p>
      </Note>

      <Note className="mt-3 max-w-2xl" label="Unexplored: mounting mechanics">
        <p>
          We haven't tried this yet, but a Wild Shape form could work as a <b>mount</b> for a
          smaller party member. A creature can ride a willing mount that is at least one size larger
          than it and has an appropriate anatomy — so a Medium form (black bear, crocodile) could
          carry a Small ally, and a Large form would carry a Medium one. Worth asking the DM about:
          a controlled mount moves and acts on my initiative, which could hand someone a free
          reposition every round.
        </p>
      </Note>
    </Section>
  );
}

function Summons() {
  return (
    <Section id="summons" title="Summons">
      <SubHeading>
        Wildfire Spirit
        <Ref book="TCE" url={WILDFIRE_SUBCLASS_URL} />
      </SubHeading>
      <p className="mb-3 max-w-2xl text-[var(--ink-dim)]">
        My main summon — costs a Wild Shape use. It shares my initiative and I command it with a
        bonus action.
      </p>
      <div className="max-w-3xl">
        <Statblock data={wildfireSpirit} />
      </div>

      <SubHeading>
        Conjure Animals
        <Ref book="PHB" url={spellRefUrl('Conjure Animals')} />
      </SubHeading>
      <p className="mb-4 max-w-2xl text-[var(--ink-dim)]">
        A 3rd-level slot summons fey spirits in beast form. I pick <b>one</b> option: eight CR 1/4,
        four CR 1/2, two CR 1, or one CR 2. More bodies usually wins on action economy — eight
        wolves is a lot of attacks. The DM controls them, but they obey me and act on my initiative.
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        <TieredForm
          label="8 × CR 1/4"
          tagline="Velociraptor — Pack Tactics + multiattack, the top damage pick."
        >
          <Statblock data={velociraptor} />
        </TieredForm>
        <TieredForm label="8 × CR 1/4" tagline="Wolf — Pack Tactics + knocks prone, great control.">
          <Statblock data={wolf} />
        </TieredForm>
        <TieredForm
          label="8 × CR 1/4"
          tagline="Giant Poisonous Snake — 10-ft reach + poison, hits from the back."
        >
          <Statblock data={giantPoisonousSnake} />
        </TieredForm>
        <TieredForm label="4 × CR 1/2" tagline="Ape (ranged rocks) or Black Bear (durable).">
          <Card className="h-full">
            <p className="text-sm text-[var(--ink)]">
              For this tier I've used <b>apes</b> (ranged rock throw, no opportunity attacks) and{' '}
              <b>black bears</b> (durable multiattack) — four of them. Their statblocks are up in{' '}
              <a href="#wild-shape">Wild Shape</a>.
            </p>
          </Card>
        </TieredForm>
        <TieredForm
          label="4 × CR 1/2"
          tagline="Reef Shark — Pack Tactics + blindsight, but underwater only."
        >
          <Statblock data={reefShark} />
        </TieredForm>
        <TieredForm label="2 × CR 1" tagline="Dire Wolf — Pack Tactics + prone, tanky (37 HP).">
          <Statblock data={direWolf} />
        </TieredForm>
        <TieredForm label="2 × CR 1" tagline="Giant Toad — swallow a Medium enemy whole, 39 HP.">
          <Statblock data={giantToad} />
        </TieredForm>
        <TieredForm
          label="2 × CR 1"
          tagline="Brown Bear — big multiattack (1d8+4 bite, 2d6+4 claws)."
        >
          <Statblock data={brownBear} />
        </TieredForm>
        <TieredForm
          label="2 × CR 1"
          tagline="Deinonychus — Pounce + three attacks (bite + two claws), top CR 1 damage."
        >
          <Statblock data={deinonychus} />
        </TieredForm>
        <TieredForm
          label="1 × CR 2"
          tagline="Allosaurus — Pounce (knocks prone) + heavy single-target damage."
        >
          <Statblock data={allosaurus} />
        </TieredForm>
        <TieredForm
          label="1 × CR 2"
          tagline="Polar Bear — Str 20, two attacks for ~21 damage, 42 HP."
        >
          <Statblock data={polarBear} />
        </TieredForm>
        <TieredForm
          label="1 × CR 2"
          tagline="Giant Constrictor Snake — grapple and restrain a big threat."
        >
          <Statblock data={giantConstrictorSnake} />
        </TieredForm>
      </div>

      <Note className="mt-5 max-w-2xl" label="Rule of thumb">
        <p>
          More bodies usually wins — eight raptors put out far more attacks (and Pack Tactics
          advantage) than one big creature. Go fewer/bigger only for durability or to control a
          single tough enemy.
        </p>
      </Note>

      <SubHeading>Getting advantage with summons</SubHeading>
      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <div className="font-bold text-[var(--accent-2)]">Pack Tactics (always on)</div>
          <p className="mt-1 text-sm text-[var(--ink)]">
            Wolf, Velociraptor, and Dire Wolf have advantage on an attack whenever another ally is
            within 5 ft of the target. This is core rules — stack them on one enemy and they all
            swing with advantage. It's why the raptor/wolf packs hit so hard.
          </p>
        </Card>
        <Card>
          <div className="font-bold text-[var(--accent-2)]">Flanking (ask the DM)</div>
          <p className="mt-1 text-sm text-[var(--ink)]">
            Flanking is an <b>optional</b> rule (DMG p. 251), not default 5e. If it's on, two
            creatures on opposite sides of an enemy get advantage on <b>melee</b> attacks — eight
            bodies can flank almost anything and set up advantage for the party too.
          </p>
          <Note className="mt-3">
            <p>
              Advantage doesn't stack, so flanking adds nothing for Pack Tactics creatures — it only
              helps the non-pack summons (apes, bears, the dinos). Many tables leave flanking off
              because summons abuse it, so check first.
            </p>
          </Note>
        </Card>
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
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-5 pb-20">
        <Overview />
        <Mechanics />
        <Proficiencies />
        <Spells />
        <WildShape />
        <Summons />
        <Section id="flowchart" title="Combat Flowchart">
          <p className="mb-4 max-w-2xl text-[var(--ink-dim)]">
            My turn-by-turn priorities. Updated from the level-4 version for my current spells. This
            is my own strategy, not a rulebook — the spells it points to are sourced below.
          </p>
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
