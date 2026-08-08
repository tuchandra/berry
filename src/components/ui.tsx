/**
 * The page's shared building blocks — sections, cards, callouts, and the small
 * typographic bits (source refs, ability abbreviations). These live here rather
 * than in App so any section component can use them without importing App.
 */

import { BOOKS } from '@/data/sources';

/** Bracketed source citation — [PHB], [TCE]. Reads as a footnote, not a heading. */
export function Ref({ book, url }: { book: keyof typeof BOOKS; url: string }) {
  return (
    <a href={url} target="_blank" rel="noreferrer" title={BOOKS[book].name} className="src-ref">
      [{BOOKS[book].abbr}]
    </a>
  );
}

/** An ability abbreviation — WIS, CON, the tag beside a skill name. */
export function Abbr({ children }: { children: React.ReactNode }) {
  return <span className="abbr">{children}</span>;
}

/** Quoted rulebook text, with its citation. Distinct from a Note, which is Berry's. */
export function Quote({ children, cite }: { children: React.ReactNode; cite?: React.ReactNode }) {
  return (
    <blockquote className="quote">
      {children}
      {cite && <cite className="quote__cite">{cite}</cite>}
    </blockquote>
  );
}

export function Section({
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

export function Card({
  children,
  className = '',
}: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-white/10 bg-black/25 p-4 ${className}`}>
      {children}
    </div>
  );
}

export function StatTile({
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

export function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-2 mt-6 text-lg text-[var(--ink)]">{children}</h3>;
}

/**
 * One of Berry's own notes — reminders, table rulings, and things to try. Styled
 * to match the notes on the parchment spell cards and statblocks, so a note reads
 * the same wherever it appears.
 */
export function Note({
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

/**
 * A pill button that flips between "off" (outlined) and "on" (filled accent).
 * Used for the Edit toggles on the combat trackers and the spell prep mode.
 */
export function ToggleButton({
  on,
  onClick,
  children,
  className = '',
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`rounded-full border px-4 py-1.5 text-sm ${
        on
          ? 'border-[var(--accent)] bg-[var(--accent)] font-bold text-[#0e1522]'
          : 'border-white/20 text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
      } ${className}`}
    >
      {children}
    </button>
  );
}
