import { SpellCard } from '@/components/SpellCard';
import { Statblock } from '@/components/Statblock';
import { cantrips, level1, level2, level3 } from '@/data/spells';
import { wildfireSpirit } from '@/data/wildfire-spirit';

const NAV = [
  { id: 'overview', label: 'Overview' },
  { id: 'mechanics', label: 'Mechanics' },
  { id: 'spells', label: 'Spells' },
  { id: 'wildfire-spirit', label: 'Wildfire Spirit' },
];

function Header() {
  return (
    <header className="border-b border-white/10 bg-black/20 backdrop-blur sticky top-0 z-10">
      <div className="mx-auto flex max-w-5xl flex-wrap items-baseline gap-x-6 gap-y-1 px-5 py-3">
        <a
          href="#overview"
          className="display-font text-xl font-bold text-[var(--ember)] no-underline"
        >
          Berry
        </a>
        <nav className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-[var(--ink-dim)]">
          {NAV.slice(1).map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="no-underline hover:text-[var(--ember)]"
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
      <h2 className="display-font mb-4 text-2xl font-bold text-[var(--moss)]">{title}</h2>
      {children}
    </section>
  );
}

function StatTile({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/25 px-4 py-3">
      <div className="text-xs uppercase tracking-wide text-[var(--ink-dim)]">{label}</div>
      <div className="display-font text-2xl text-[var(--ember)]">{value}</div>
      {note && <div className="mt-0.5 text-xs text-[var(--ink-dim)]">{note}</div>}
    </div>
  );
}

function SpellGroup({ title, spells }: { title: string; spells: typeof cantrips }) {
  if (spells.length === 0) {
    return (
      <div className="mb-6">
        <h3 className="mb-2 text-lg text-[var(--ink)]">{title}</h3>
        <p className="text-sm italic text-[var(--ink-dim)]">
          Pending — to be added from your sheet.
        </p>
      </div>
    );
  }
  return (
    <div className="mb-6">
      <h3 className="mb-2 text-lg text-[var(--ink)]">{title}</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {spells.map((spell) => (
          <SpellCard key={spell.name} spell={spell} />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-5 pb-20">
        <Section id="overview" title="Onyberyus — “Berry”">
          <p className="max-w-2xl text-[var(--ink)]">
            Level 6 Wildfire Druid. This is a personal reference for spells, actions, and the rules
            that come up at the table. Content is still being filled in — the Wildfire Spirit
            statblock below is live to show the styling.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-[var(--ink-dim)]">
            <span className="rounded-full border border-white/15 px-3 py-1">Druid 6</span>
            <span className="rounded-full border border-white/15 px-3 py-1">
              Circle of Wildfire
            </span>
            <span className="rounded-full border border-white/15 px-3 py-1">
              Spellcasting: Wisdom
            </span>
          </div>
        </Section>

        <Section id="mechanics" title="Mechanics">
          <p className="mb-4 max-w-2xl text-[var(--ink-dim)]">
            Quick-reference numbers and the rules for what you can do on your turn. Values marked
            pending will be filled in once your ability scores are in.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            <StatTile label="Spell Save DC" value="—" note="8 + PB + WIS" />
            <StatTile label="Spell Attack" value="—" note="PB + WIS" />
            <StatTile label="Proficiency Bonus" value="+3" note="level 6" />
            <StatTile label="Wild Shape / Spirit" value="2/rest" note="regain on short/long rest" />
          </div>
        </Section>

        <Section id="spells" title="Spells">
          <SpellGroup title="Cantrips" spells={cantrips} />
          <SpellGroup title="Level 1" spells={level1} />
          <SpellGroup title="Level 2" spells={level2} />
          <SpellGroup title="Level 3" spells={level3} />
        </Section>

        <Section id="wildfire-spirit" title="Wildfire Spirit">
          <div className="max-w-2xl">
            <Statblock data={wildfireSpirit} />
          </div>
        </Section>
      </main>
      <footer className="border-t border-white/10 py-6 text-center text-xs text-[var(--ink-dim)]">
        Onyberyus · a Wildfire Druid reference
      </footer>
    </>
  );
}
