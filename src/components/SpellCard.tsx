import { BOOKS, type BookAbbr, spellRefUrl } from '@/data/sources';
import { useId, useState } from 'react';
import './spellcard.css';

export interface SpellData {
  name: string;
  /** e.g. "cantrip" or 1, 2, 3 */
  level: number | 'cantrip';
  school: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  /** Paragraphs of description. */
  description: string[];
  /** "At Higher Levels" text, if any. */
  higherLevels?: string;
  concentration?: boolean;
  ritual?: boolean;
  /** Highlighted table-note callout (e.g. Berry's own reminders). */
  note?: string;
  /** Small pills near the header, e.g. "Wildfire". */
  badges?: string[];
  /** Circle of Wildfire spell — always prepared, doesn't count toward the 9. */
  alwaysPrepared?: boolean;
  /** Source book abbreviation (PHB, XGE, ...). */
  source: BookAbbr;
}

function levelLabel(spell: SpellData): string {
  if (spell.level === 'cantrip') return `${spell.school} cantrip`;
  const ordinal =
    spell.level === 1
      ? '1st'
      : spell.level === 2
        ? '2nd'
        : spell.level === 3
          ? '3rd'
          : `${spell.level}th`;
  return `${ordinal}-level ${spell.school.toLowerCase()}`;
}

const CASTING: Record<string, string> = {
  '1 action': 'Action',
  '1 bonus action': 'Bonus',
  '1 reaction': 'Reaction',
  '1 action or 8 hours': 'Action / 8 hr',
};

function fmtCasting(s: string): string {
  return CASTING[s] ?? s;
}

function fmtRange(s: string): string {
  return s
    .replace(/-foot\b/g, '-ft')
    .replace(/\bfeet\b/g, 'ft.')
    .replace(/\bfoot\b/g, 'ft.');
}

/** Duration with the "Concentration, up to " prefix stripped and units shortened. */
function fmtDuration(s: string): string {
  let t = s;
  if (t.startsWith('Concentration, up to ')) t = t.slice('Concentration, up to '.length);
  return t
    .replace(/\bInstantaneous\b/g, 'Instant.')
    .replace(/\bminutes?\b/g, 'min')
    .replace(/\bhours?\b/g, 'hr');
}

/** "V, S, M (a sprig of mistletoe)" → "V, S, M" */
function componentsShort(s: string): string {
  return s.replace(/\s*\([^)]*\)/g, '').trim();
}

/** "V, S, M (a sprig of mistletoe)" → "Verbal, Somatic, Material (a sprig of mistletoe)" */
function componentsFull(s: string): string {
  const NAMES: Record<string, string> = { V: 'Verbal', S: 'Somatic', M: 'Material' };
  const material = s.match(/\(([^)]*)\)/);
  return componentsShort(s)
    .split(',')
    .map((raw) => {
      const letter = raw.trim();
      if (letter === 'M' && material) return `Material (${material[1]})`;
      return NAMES[letter] ?? letter;
    })
    .join(', ');
}

/** Components with a tooltip (hover on desktop, tap on mobile) spelling them out. */
function Components({ raw }: { raw: string }) {
  const [pinned, setPinned] = useState(false);
  const tipId = useId();
  return (
    <button
      type="button"
      className="sc-comp"
      aria-describedby={tipId}
      aria-expanded={pinned}
      onClick={(e) => {
        e.stopPropagation();
        setPinned((p) => !p);
      }}
    >
      <span className="sc-comp__short">{componentsShort(raw)}</span>
      <span id={tipId} role="tooltip" className={`sc-comp__tip${pinned ? ' is-open' : ''}`}>
        {componentsFull(raw)}
      </span>
    </button>
  );
}

export function SpellCard({
  spell,
  selectable = false,
  prepared = true,
  locked = false,
  dimmed = false,
  onToggle,
}: {
  spell: SpellData;
  /** Prep mode is active — the card is a toggle. */
  selectable?: boolean;
  prepared?: boolean;
  /** Always-prepared (wildfire) — can't be toggled. */
  locked?: boolean;
  /** Shown for reference outside prep mode even though not prepared. */
  dimmed?: boolean;
  onToggle?: () => void;
}) {
  const badge = spell.level === 'cantrip' ? 'C' : String(spell.level);
  const interactive = selectable && !locked;
  const notPrepared = (selectable && !prepared && !locked) || dimmed;

  const classes = [
    'spellcard',
    interactive ? 'spellcard--selectable' : '',
    notPrepared ? 'spellcard--unprepared' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: toggle is mirrored by the button below
    <div
      className={classes}
      onClick={interactive ? onToggle : undefined}
      aria-hidden={interactive ? true : undefined}
    >
      <div className="spellcard__head">
        <div className={`spellcard__badge${spell.level === 'cantrip' ? ' is-cantrip' : ''}`}>
          {badge}
        </div>
        <div className="spellcard__headtext">
          <h3 className="spellcard__name">{spell.name}</h3>
          <span className="spellcard__level">{levelLabel(spell)}</span>
        </div>
        {locked && <span className="spellcard__status spellcard__status--locked">Always</span>}
        {selectable && !locked && (
          <span className={`spellcard__status${prepared ? ' is-prepared' : ''}`} aria-hidden="true">
            {prepared ? '✓' : ''}
          </span>
        )}
      </div>

      {(spell.badges?.length || spell.ritual) && (
        <div className="spellcard__tags">
          {spell.badges?.map((b) => (
            <span key={b} className="spellcard__tag spellcard__tag--badge">
              {b}
            </span>
          ))}
          {spell.ritual && <span className="spellcard__tag">Ritual</span>}
        </div>
      )}

      <div className="spellcard__meta">
        <span>{fmtCasting(spell.castingTime)}</span>
        <span className="spellcard__sep">·</span>
        <span>{fmtRange(spell.range)}</span>
        <span className="spellcard__sep">·</span>
        <Components raw={spell.components} />
        <span className="spellcard__sep">·</span>
        <span className="spellcard__dur">
          {fmtDuration(spell.duration)}
          {spell.concentration && (
            <abbr className="sc-conc" title="Concentration">
              C
            </abbr>
          )}
        </span>
        <span className="spellcard__sep">·</span>
        <a
          className="spellcard__src"
          href={spellRefUrl(spell.name)}
          target="_blank"
          rel="noreferrer"
          title={BOOKS[spell.source].name}
          onClick={(e) => e.stopPropagation()}
        >
          {BOOKS[spell.source].abbr}
        </a>
      </div>

      <div className="spellcard__desc">
        {spell.description.map((para, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static prose paragraphs
          <p key={i}>{para}</p>
        ))}
        {spell.higherLevels && (
          <p className="spellcard__higher">
            <span className="spellcard__higher-label">At Higher Levels.</span> {spell.higherLevels}
          </p>
        )}
      </div>

      {spell.note && (
        <div className="spellcard__note">
          <span className="spellcard__note-label">Berry's note:</span> {spell.note}
        </div>
      )}

      {interactive && (
        <button type="button" className="spellcard__toggle" onClick={onToggle}>
          {prepared ? 'Prepared — tap to remove' : 'Not prepared — tap to prepare'}
        </button>
      )}
    </div>
  );
}
