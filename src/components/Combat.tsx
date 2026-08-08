/**
 * In-session trackers — the parts of the sheet that change during a fight and
 * reset on a rest: spent spell slots, hit points, and concentration.
 *
 * Everything here is stored in localStorage, so a session survives a reload.
 * Each tracker is read-only until its Edit button is pressed: the slot circles
 * are easy to tap by accident when you're just scrolling past to the spells.
 */

import type { SpellData } from '@/components/SpellCard';
import { Abbr, Card, Note, Section, ToggleButton } from '@/components/ui';
import { abilities, character, spellSlots } from '@/data/character';
import { LEVELED_SPELLS, type PreparedMap, isPrepared } from '@/data/prepared';
import { cantrips } from '@/data/spells';
import { useStoredState } from '@/data/storage';
import { useState } from 'react';
import './combat.css';

const SLOTS_KEY = 'berry-slots-v1';
const HP_KEY = 'berry-hp-v1';
const CONCENTRATION_KEY = 'berry-concentration-v1';

/**
 * Spent slots, keyed `"<level>-<index>"`. The value is the spell that was cast,
 * or an empty string for a slot spent without recording what it went on.
 */
type SpentSlots = Record<string, string>;

const slotKey = (level: number, index: number) => `${level}-${index}`;

/** Spells this slot can cast: anything prepared at or below the slot's level. */
function castableWith(level: number, prepared: PreparedMap): SpellData[] {
  return LEVELED_SPELLS.filter(
    (s) => typeof s.level === 'number' && s.level <= level && isPrepared(s, prepared),
  ).sort((a, b) => Number(a.level) - Number(b.level) || a.name.localeCompare(b.name));
}

function SpellSlotTracker({ prepared }: { prepared: PreparedMap }) {
  const [spent, setSpent] = useStoredState<SpentSlots>(SLOTS_KEY, {});
  const [editing, setEditing] = useState(false);
  /** Which slot's picker is open, if any. */
  const [picking, setPicking] = useState<string | null>(null);

  const pickingLevel = picking ? Number(picking.split('-')[0]) : null;
  const totalSpent = Object.keys(spent).length;
  const totalSlots = spellSlots.reduce((n, row) => n + row.count, 0);

  function spend(key: string, spell: string) {
    setSpent((s) => ({ ...s, [key]: spell }));
    setPicking(null);
  }

  function restore(key: string) {
    setSpent((s) => {
      const next = { ...s };
      delete next[key];
      return next;
    });
    setPicking(null);
  }

  function clickSlot(key: string) {
    if (spent[key] !== undefined) restore(key);
    else setPicking((p) => (p === key ? null : key));
  }

  function stopEditing() {
    setEditing(false);
    setPicking(null);
  }

  return (
    <Card>
      <TrackerHead
        title="Spell slots"
        detail={
          <>
            <b className="text-[var(--accent)]">{totalSlots - totalSpent}</b> of {totalSlots} left
          </>
        }
        editing={editing}
        onToggle={() => (editing ? stopEditing() : setEditing(true))}
      />

      <div className="space-y-2">
        {spellSlots.map((row) => {
          const keys = Array.from({ length: row.count }, (_, i) => slotKey(row.level, i));
          const usedOn = keys.map((k) => spent[k]).filter((v) => v);
          return (
            <div key={row.level} className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <div className="flex flex-wrap gap-1.5">
                {keys.map((key) => {
                  const isSpent = spent[key] !== undefined;
                  return (
                    <button
                      key={key}
                      type="button"
                      disabled={!editing}
                      onClick={() => clickSlot(key)}
                      title={
                        isSpent
                          ? `Spent${spent[key] ? ` on ${spent[key]}` : ''}${editing ? ' — tap to restore' : ''}`
                          : `Open level ${row.level} slot`
                      }
                      aria-label={`Level ${row.level} slot ${isSpent ? 'spent' : 'open'}`}
                      className={`slot ${isSpent ? 'slot--spent' : ''} ${
                        editing ? 'slot--editable' : ''
                      } ${picking === key ? 'slot--picking' : ''}`}
                    >
                      {row.level}
                    </button>
                  );
                })}
              </div>
              {usedOn.length > 0 && (
                <span className="text-xs text-[var(--ink-dim)]">{usedOn.join(' · ')}</span>
              )}
            </div>
          );
        })}
      </div>

      {picking && pickingLevel !== null && (
        <div className="slot-picker mt-3">
          <div className="flex flex-wrap gap-1.5">
            {castableWith(pickingLevel, prepared).map((s) => (
              <button
                key={s.name}
                type="button"
                onClick={() => spend(picking, s.name)}
                className="slot-picker__option"
              >
                <span className="slot-picker__level">{s.level}</span>
                {s.name}
              </button>
            ))}
            <button
              type="button"
              onClick={() => spend(picking, '')}
              className="slot-picker__option"
            >
              Something else
            </button>
          </div>
          <button
            type="button"
            onClick={() => setPicking(null)}
            className="mt-2 text-xs text-[var(--ink-dim)] underline decoration-dotted hover:text-[var(--accent)]"
          >
            Cancel
          </button>
        </div>
      )}

      {editing && (
        <p className="mt-3 text-xs text-[var(--ink-dim)]">
          Tap an open circle to spend it, a spent one to give it back. Lower-level spells are in the
          list because a bigger slot upcasts them.
        </p>
      )}
    </Card>
  );
}

/** Stable key for a log row, so removing one doesn't shuffle the others. */
const eventId = (): string =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `hp-${Date.now()}-${performance.now()}`;

interface HpEvent {
  id: string;
  /** Negative for damage, positive for healing. */
  delta: number;
  label: string;
}

function HitPointTracker() {
  const [log, setLog] = useStoredState<HpEvent[]>(HP_KEY, []);
  const [editing, setEditing] = useState(false);
  const [amount, setAmount] = useState('');
  const [label, setLabel] = useState('');

  const max: number = character.hp;
  const current = log.reduce((hp, e) => hp + e.delta, max);

  function add(sign: 1 | -1) {
    const n = Math.abs(Number(amount));
    if (!n) return;
    setLog((l) => [...l, { id: eventId(), delta: sign * n, label }]);
    setAmount('');
    setLabel('');
  }

  return (
    <Card>
      <TrackerHead
        title="Hit points"
        detail={
          <>
            <b className="display-font text-lg text-[var(--accent)]">{current}</b>
            <span className="text-[var(--ink-dim)]"> / {max}</span>
            {current <= 0 && <b className="ml-2 text-[var(--hp-down)]">down</b>}
            {current > 0 && current <= max / 2 && (
              <b className="ml-2 text-[var(--hp-down)]">bloodied</b>
            )}
          </>
        }
        editing={editing}
        onToggle={() => setEditing((e) => !e)}
      />

      {editing && (
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <input
            type="number"
            inputMode="numeric"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="10"
            aria-label="Amount"
            className="hp-input w-16"
          />
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="basilisk bite"
            aria-label="Description"
            className="hp-input min-w-[8rem] flex-1"
          />
          <button
            type="button"
            onClick={() => add(-1)}
            className="rounded-full border border-[var(--hp-down)] px-3 py-1 text-sm text-[var(--hp-down)] hover:bg-[var(--hp-down)]/15"
          >
            − Damage
          </button>
          <button
            type="button"
            onClick={() => add(1)}
            className="rounded-full border border-[var(--hp-up)] px-3 py-1 text-sm text-[var(--hp-up)] hover:bg-[var(--hp-up)]/15"
          >
            + Healing
          </button>
        </div>
      )}

      {log.length > 0 ? (
        <ul className="space-y-1 text-sm">
          {log.map((e) => (
            <li
              key={e.id}
              className="flex items-baseline gap-2 border-b border-white/5 pb-1 last:border-0"
            >
              <b
                className="w-12 shrink-0 text-right"
                style={{ color: e.delta < 0 ? 'var(--hp-down)' : 'var(--hp-up)' }}
              >
                {e.delta < 0 ? '−' : '+'}
                {Math.abs(e.delta)}
              </b>
              <span className="text-[var(--ink-dim)]">{e.label || 'no note'}</span>
              {editing && (
                <button
                  type="button"
                  onClick={() => setLog((l) => l.filter((x) => x.id !== e.id))}
                  aria-label={`Remove ${e.label || 'entry'}`}
                  className="ml-auto text-xs text-[var(--ink-dim)] hover:text-[var(--hp-down)]"
                >
                  remove
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-[var(--ink-dim)]">Nothing logged.</p>
      )}
    </Card>
  );
}

interface ConcentrationState {
  on: boolean;
  spell: string;
}

/** Every prepared spell that needs concentration, cantrips included. */
function concentrationSpells(prepared: PreparedMap): SpellData[] {
  return [
    ...cantrips.filter((s) => s.concentration),
    ...LEVELED_SPELLS.filter((s) => s.concentration && isPrepared(s, prepared)),
  ];
}

function ConcentrationTracker({ prepared }: { prepared: PreparedMap }) {
  const [state, setState] = useStoredState<ConcentrationState>(CONCENTRATION_KEY, {
    on: false,
    spell: '',
  });
  const conSave = abilities.find((a) => a.name === 'Constitution')?.save ?? '+6';

  return (
    <Card>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <h3 className="mr-auto text-lg text-[var(--ink)]">Concentration</h3>
        <ToggleButton on={state.on} onClick={() => setState((s) => ({ ...s, on: !s.on }))}>
          {state.on ? 'Concentrating' : 'Not concentrating'}
        </ToggleButton>
      </div>

      {state.on && (
        <select
          value={state.spell}
          onChange={(e) => setState((s) => ({ ...s, spell: e.target.value }))}
          aria-label="Which spell"
          className="hp-input mb-3 w-full"
        >
          <option value="">which spell?</option>
          {concentrationSpells(prepared).map((s) => (
            <option key={s.name} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      )}

      <Note label="When I take damage">
        <p>
          <Abbr>CON</Abbr> save to keep the spell,{' '}
          <b>DC 10 or half the damage, whichever is higher</b>. My save is{' '}
          <b className="text-[var(--prof)]">{conSave}</b>. It also ends if I'm incapacitated or cast
          another concentration spell.
        </p>
      </Note>
    </Card>
  );
}

/** Card header: the tracker's name, its current state, and its Edit toggle. */
function TrackerHead({
  title,
  detail,
  editing,
  onToggle,
}: {
  title: string;
  detail: React.ReactNode;
  editing: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
      <h3 className="text-lg text-[var(--ink)]">{title}</h3>
      <span className="mr-auto text-sm">{detail}</span>
      <ToggleButton on={editing} onClick={onToggle}>
        {editing ? 'Done' : 'Edit'}
      </ToggleButton>
    </div>
  );
}

export function Combat({ prepared }: { prepared: PreparedMap }) {
  return (
    <Section id="combat" title="Combat Tracker">
      <div className="grid items-start gap-4 lg:grid-cols-3">
        <SpellSlotTracker prepared={prepared} />
        <HitPointTracker />
        <ConcentrationTracker prepared={prepared} />
      </div>
    </Section>
  );
}
