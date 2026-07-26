import './statblock.css';

/** A "Label value" line such as "Armor Class 13 (natural armor)". */
export interface StatProperty {
  label: string;
  value: string;
}

/** A named block of prose such as an action or trait. */
export interface StatEntry {
  name: string;
  text: string;
}

export interface StatSection {
  heading?: string;
  entries: StatEntry[];
}

export interface AbilityScores {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

/** How Berry can actually get this creature onto the battlefield. */
export type Availability = 'Wild Shape' | 'Conjure Animals';

export interface StatblockData {
  name: string;
  /** Italic type line, e.g. "Medium beast". Alignment is omitted — it never matters here. */
  subtitle?: string;
  /** Optional italic intro paragraph (used for summon features). */
  description?: string;
  /** Defence and movement, rendered as one inline line: AC · HP · Speed. */
  ac?: string;
  hp?: string;
  speed?: string;
  abilities?: AbilityScores;
  /**
   * Short facts on one inline line under the ability table — skills, senses,
   * challenge rating. Labels are omitted; the values speak for themselves.
   */
  meta?: string[];
  /** Longer label/value lines below the ability table (immunities, proficiency bonus). */
  bottomProps?: StatProperty[];
  /** Traits/actions/etc. Sections without a heading render as leading traits. */
  sections?: StatSection[];
  /** Render across two columns. */
  wide?: boolean;
  /** Highlighted personal note (e.g. why Berry uses this form). */
  note?: string;
  /** Source book abbreviation (MM, TCE, ...) and a reference link. */
  source?: { abbr: string; name: string; url: string };
  /** Challenge rating as printed, e.g. "1/4". Drives ordering. */
  cr?: string;
  /** Wild Shape, Conjure Animals, or both. */
  availability?: Availability[];
}

const ABILITY_ORDER: [keyof AbilityScores, string][] = [
  ['str', 'Str'],
  ['dex', 'Dex'],
  ['con', 'Con'],
  ['int', 'Int'],
  ['wis', 'Wis'],
  ['cha', 'Cha'],
];

function formatModifier(score: number): string {
  const mod = Math.floor((score - 10) / 2);
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

/** Challenge rating as a sortable number. */
export function crValue(cr?: string): number {
  if (!cr) return -1;
  const [num, den] = cr.split('/');
  return den ? Number(num) / Number(den) : Number(num);
}

/**
 * How many of a beast Conjure Animals summons at a given CR: one CR 2, two CR 1,
 * four CR 1/2, or eight CR 1/4 and below.
 */
export function conjureCount(cr?: string): number {
  const v = crValue(cr);
  if (v >= 2) return 1;
  if (v >= 1) return 2;
  if (v >= 0.5) return 4;
  return 8;
}

function TaperedRule() {
  return (
    <svg
      className="statblock__rule"
      viewBox="0 0 400 5"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <title>section divider</title>
      <polyline points="0,0 400,2.5 0,5" />
    </svg>
  );
}

function PropertyLine({ prop }: { prop: StatProperty }) {
  return (
    <p className="statblock__prop">
      <span className="statblock__prop-label">{prop.label}</span>{' '}
      <span className="statblock__prop-value">{prop.value}</span>
    </p>
  );
}

function Entry({ entry }: { entry: StatEntry }) {
  return (
    <p className="statblock__entry">
      <span className="statblock__entry-name">{entry.name}.</span> {entry.text}
    </p>
  );
}

/** AC · HP · Speed on a single line, to keep cards short. */
function StatLine({ data }: { data: StatblockData }) {
  const parts: [string, string][] = [];
  if (data.ac) parts.push(['AC', data.ac]);
  if (data.hp) parts.push(['HP', data.hp]);
  if (data.speed) parts.push(['Speed', data.speed]);
  if (parts.length === 0) return null;

  return (
    <p className="statblock__statline">
      {parts.map(([label, value], i) => (
        <span key={label}>
          {i > 0 && <span className="statblock__dot"> · </span>}
          <span className="statblock__prop-label">{label}</span>{' '}
          <span className="statblock__prop-value">{value}</span>
        </span>
      ))}
    </p>
  );
}

export function Statblock({ data }: { data: StatblockData }) {
  const abilities = data.abilities;
  return (
    <div className={`statblock${data.wide ? ' statblock--wide' : ''}`}>
      <div className="statblock__head">
        <h2 className="statblock__name">{data.name}</h2>
        {data.availability && data.availability.length > 0 && (
          <div className="statblock__tags">
            {data.availability.map((a) => (
              <span
                key={a}
                className={`statblock__tag statblock__tag--${a === 'Wild Shape' ? 'ws' : 'ca'}`}
              >
                {a === 'Wild Shape' ? 'Wild Shape' : `Conjure ×${conjureCount(data.cr)}`}
              </span>
            ))}
          </div>
        )}
        {data.source && (
          <a
            className="statblock__source-top"
            href={data.source.url}
            target="_blank"
            rel="noreferrer"
            title={data.source.name}
          >
            [{data.source.abbr}]
          </a>
        )}
      </div>
      {data.subtitle && <p className="statblock__subtitle">{data.subtitle}</p>}
      {data.description && <p className="statblock__description">{data.description}</p>}

      {(data.ac || data.hp || data.speed) && (
        <>
          <TaperedRule />
          <StatLine data={data} />
        </>
      )}

      {abilities && (
        <>
          <TaperedRule />
          <div className="statblock__abilities">
            {ABILITY_ORDER.map(([key, label]) => (
              <div key={key} className="statblock__ability-name">
                {label}
              </div>
            ))}
            {ABILITY_ORDER.map(([key]) => {
              const score = abilities[key];
              return (
                <div key={key} className="statblock__ability-value">
                  {score} ({formatModifier(score)})
                </div>
              );
            })}
          </div>
          <TaperedRule />
        </>
      )}

      {data.meta && data.meta.length > 0 && (
        <p className="statblock__meta">{data.meta.join(' · ')}</p>
      )}

      {data.bottomProps && data.bottomProps.length > 0 && (
        <div className="statblock__props">
          {data.bottomProps.map((p) => (
            <PropertyLine key={p.label} prop={p} />
          ))}
        </div>
      )}

      {data.sections?.map((section, i) => (
        <div key={section.heading ?? `traits-${i}`}>
          {section.heading && <h3 className="statblock__section-heading">{section.heading}</h3>}
          {section.entries.map((entry) => (
            <Entry key={entry.name} entry={entry} />
          ))}
        </div>
      ))}

      {data.note && (
        <div className="statblock__note">
          <span className="statblock__note-label">Berry's note:</span> {data.note}
        </div>
      )}
    </div>
  );
}
