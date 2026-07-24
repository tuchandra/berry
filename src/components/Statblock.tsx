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

export interface StatblockData {
  name: string;
  /** Italic type line, e.g. "Medium beast, unaligned". */
  subtitle?: string;
  /** Optional italic intro paragraph (used for summon features). */
  description?: string;
  /** Lines shown above the ability table (AC, HP, Speed, ...). */
  topProps?: StatProperty[];
  abilities?: AbilityScores;
  /** Lines shown below the ability table (Senses, Languages, Challenge, ...). */
  bottomProps?: StatProperty[];
  /** Traits/actions/etc. Sections without a heading render as leading traits. */
  sections?: StatSection[];
  /** Render across two columns. */
  wide?: boolean;
  /** Source book abbreviation (MM, TCE, ...) and a reference link. */
  source?: { abbr: string; name: string; url: string };
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

export function Statblock({ data }: { data: StatblockData }) {
  const abilities = data.abilities;
  return (
    <div className={`statblock${data.wide ? ' statblock--wide' : ''}`}>
      <h2 className="statblock__name">{data.name}</h2>
      {data.subtitle && <p className="statblock__subtitle">{data.subtitle}</p>}
      {data.description && <p className="statblock__description">{data.description}</p>}

      {data.topProps && data.topProps.length > 0 && (
        <>
          <TaperedRule />
          <div className="statblock__props">
            {data.topProps.map((p) => (
              <PropertyLine key={p.label} prop={p} />
            ))}
          </div>
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

      {data.source && (
        <p className="statblock__source">
          Source:{' '}
          <a href={data.source.url} target="_blank" rel="noreferrer" title={data.source.name}>
            {data.source.abbr}
          </a>
        </p>
      )}
    </div>
  );
}
