import { BOOKS, type BookAbbr, spellRefUrl } from '@/data/sources';
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
  /** Small pills near the header, e.g. "Wildfire", "Always Prepared". */
  badges?: string[];
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

export function SpellCard({ spell }: { spell: SpellData }) {
  return (
    <div className="spellcard">
      <div className="spellcard__header">
        <h3 className="spellcard__name">{spell.name}</h3>
        <span className="spellcard__level">{levelLabel(spell)}</span>
      </div>

      {(spell.badges?.length || spell.concentration || spell.ritual) && (
        <div className="spellcard__tags">
          {spell.badges?.map((b) => (
            <span key={b} className="spellcard__tag spellcard__tag--badge">
              {b}
            </span>
          ))}
          {spell.concentration && <span className="spellcard__tag">Concentration</span>}
          {spell.ritual && <span className="spellcard__tag">Ritual</span>}
        </div>
      )}

      <div className="spellcard__meta">
        <span className="spellcard__meta-label">Casting Time</span>
        <span>{spell.castingTime}</span>
        <span className="spellcard__meta-label">Range</span>
        <span>{spell.range}</span>
        <span className="spellcard__meta-label">Components</span>
        <span>{spell.components}</span>
        <span className="spellcard__meta-label">Duration</span>
        <span>{spell.duration}</span>
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

      <div className="spellcard__source">
        Source:{' '}
        <a
          href={spellRefUrl(spell.name)}
          target="_blank"
          rel="noreferrer"
          title={BOOKS[spell.source].name}
        >
          {BOOKS[spell.source].abbr}
        </a>
      </div>
    </div>
  );
}
