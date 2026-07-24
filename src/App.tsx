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
  velociraptor,
  wildShapeForms,
  wolf,
} from '@/data/beasts';
import { abilities, character, spellSlots } from '@/data/character';
import { BOOKS, DRUID_CLASS_URL, WILDFIRE_SUBCLASS_URL, spellRefUrl } from '@/data/sources';
import { cantrips, level1, level2, level3 } from '@/data/spells';
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
  { id: 'flowchart', label: 'Flowchart' },
  { id: 'spells', label: 'Spells' },
  { id: 'wild-shape', label: 'Wild Shape' },
  { id: 'summons', label: 'Summons' },
  { id: 'sources', label: 'Sources' },
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

function StatTile({ label, value, note }: { label: string; value: string; note?: string }) {
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
      <p className="text-sm uppercase tracking-widest text-[var(--ink-dim)]">Level 6 · Wood Elf</p>
      <h1 className="display-font mt-1 text-4xl font-bold text-[var(--accent)]">
        Onyberyus <span className="text-[var(--ink-dim)]">"Berry"</span>
      </h1>
      <p className="mt-2 max-w-2xl text-[var(--ink)]">
        A Circle of Wildfire Druid — chaotic good, gentler aspects of chaos, "plant guy but with
        fire." This is my table reference: the numbers I forget, what I can do on my turn, my
        spells, and my forms.
      </p>
      <div className="mt-4 flex flex-wrap gap-3 text-sm text-[var(--ink-dim)]">
        <span className="rounded-full border border-white/15 px-3 py-1">{character.class}</span>
        <span className="rounded-full border border-white/15 px-3 py-1">
          Spellcasting: {character.spellcastingAbility}
        </span>
        <span className="rounded-full border border-white/15 px-3 py-1">{character.alignment}</span>
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
        <StatTile label="Hit Points" value={String(character.hp)} note={character.hitDice} />
        <StatTile label="Proficiency" value={character.proficiencyBonus} />
        <StatTile label="Initiative" value={character.initiative} />
        <StatTile label="Speed" value={character.speed} />
        <StatTile label="Passive Perc." value={String(character.passivePerception)} />
      </div>

      <SubHeading>Ability scores &amp; saves</SubHeading>
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[28rem] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-[var(--ink-dim)]">
            <tr>
              <th className="py-1 pr-4">Ability</th>
              <th className="py-1 pr-4">Score</th>
              <th className="py-1 pr-4">Modifier</th>
              <th className="py-1 pr-4">Saving Throw</th>
            </tr>
          </thead>
          <tbody>
            {abilities.map((a) => (
              <tr key={a.name} className="border-t border-white/10">
                <td className="py-1 pr-4">{a.name}</td>
                <td className="py-1 pr-4">{a.score}</td>
                <td className="py-1 pr-4">{a.mod}</td>
                <td className="py-1 pr-4">
                  <span className={a.saveProficient ? 'font-bold text-[var(--accent)]' : ''}>
                    {a.save}
                  </span>
                  {a.saveProficient && (
                    <span className="ml-1 text-xs text-[var(--ink-dim)]">(proficient)</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 text-xs text-[var(--ink-dim)]">
          Proficient skills: Medicine +6, Nature +2, Perception +6. Thanks to the Resilient feat,
          Constitution saves are proficient (+6) — handy for keeping concentration.
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
            I prepare <b>9 spells</b> (druid level 6 + Wis +3). Circle of Wildfire spells are{' '}
            <b>always prepared</b> and don't count toward that. I know <b>4 cantrips</b>. Slots come
            back on a long rest.
          </p>
        </Card>
        <Card>
          <div className="font-bold text-[var(--accent-2)]">
            Wild Shape
            <Ref book="PHB" url={DRUID_CLASS_URL} />
          </div>
          <p className="mt-1 text-sm text-[var(--ink)]">
            <b>2 uses</b>, regained on a short or long rest. At level 6 I can become a beast of{' '}
            <b>CR 1/2 or lower</b> with <b>no flying speed</b> (swimming is fine). The form lasts{' '}
            <b>3 hours</b>. I can spend a use to summon my Wildfire Spirit instead
            <Ref book="TCE" url={WILDFIRE_SUBCLASS_URL} />.
          </p>
        </Card>
      </div>
    </Section>
  );
}

const PREP_STORAGE_KEY = 'berry-prepared-v1';
const LEVELED_SPELLS: SpellData[] = [...level1, ...level2, ...level3];

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
  const overLimit = preparedCount > 9;

  return (
    <Section id="spells" title="Spells">
      <p className="mb-4 max-w-2xl text-[var(--ink-dim)]">
        Save DC is <b>14</b>, spell attack is <b>+6</b>. This list is broader than I can prepare —
        use <b>Edit prepared</b> to pick my nine; the rest tuck away at the end of each level.
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
          <b className="text-[var(--accent)]">{preparedCount}</b> / 9 prepared
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
    </Section>
  );
}

function WildShape() {
  return (
    <Section id="wild-shape" title="Wild Shape">
      <p className="mb-4 max-w-2xl text-[var(--ink-dim)]">
        Forms I can take (CR 1/2 or lower, no flying). My favorites and their statblocks.
      </p>

      <Card className="mb-5 max-w-3xl border-[var(--accent)]/30 bg-[var(--accent)]/5">
        <div className="font-bold text-[var(--accent-2)]">
          I keep my own mind in every form
          <Ref book="PHB" url={DRUID_CLASS_URL} />
        </div>
        <p className="mt-1 text-sm text-[var(--ink)]">
          When I Wild Shape I take the beast's{' '}
          <b>Strength, Dexterity, Constitution, AC, HP, and speed</b>, but I keep my own{' '}
          <b>Intelligence 9 (−1), Wisdom 16 (+3), Charisma 10 (+0)</b> and all my saving-throw and
          skill proficiencies. So the mental scores printed in the blocks below are <b>not</b> what
          I use — ignore the beast's Int/Wis/Cha and use mine.
        </p>
        <p className="mt-2 text-xs text-[var(--ink-dim)]">
          I can't cast spells while transformed, but my Wisdom still drives things like Wisdom saves
          and Perception. I can drop out of a form as a bonus action.
        </p>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        {wildShapeForms.map((form) => (
          <Statblock key={form.name} data={form} />
        ))}
      </div>
      <Card className="mt-5 max-w-2xl">
        <div className="font-bold text-[var(--accent-2)]">Other forms to consider</div>
        <p className="mt-1 text-sm text-[var(--ink)]">
          Other solid CR 1/2 picks I could learn: Giant Goat (charge + knock prone), Reef Shark
          (swim + pack tactics), Warhorse (trampling charge).
        </p>
      </Card>
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
      <div className="grid gap-5 lg:grid-cols-2">
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
        <TieredForm label="2 × CR 1" tagline="Dire Wolf — Pack Tactics + prone, tanky (37 HP).">
          <Statblock data={direWolf} />
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
          tagline="Giant Constrictor Snake — grapple and restrain a big threat."
        >
          <Statblock data={giantConstrictorSnake} />
        </TieredForm>
      </div>

      <Card className="mt-5 max-w-2xl">
        <p className="text-sm text-[var(--ink)]">
          <b>Rule of thumb:</b> more bodies usually wins — eight raptors put out far more attacks
          (and Pack Tactics advantage) than one big creature. Go fewer/bigger only for durability or
          to control a single tough enemy.
        </p>
      </Card>

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
          <p className="mt-2 text-xs text-[var(--ink-dim)]">
            Advantage doesn't stack, so flanking adds nothing for Pack Tactics creatures — it only
            helps the non-pack summons (apes, bears, the dinos). Many tables leave flanking off
            because summons abuse it, so check first.
          </p>
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
        <Section id="flowchart" title="Combat Flowchart">
          <p className="mb-4 max-w-2xl text-[var(--ink-dim)]">
            My turn-by-turn priorities. Updated from the level-4 version for my current spells. This
            is my own strategy, not a rulebook — the spells it points to are sourced below.
          </p>
          <FlowChart />
        </Section>
        <Spells />
        <WildShape />
        <Summons />
        <SourcesLegend />
      </main>
      <footer className="border-t border-white/10 py-6 text-center text-xs text-[var(--ink-dim)]">
        Onyberyus Thistleballow · a Wildfire Druid reference
      </footer>
    </>
  );
}
