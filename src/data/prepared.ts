/**
 * Which leveled spells Berry currently has prepared. Shared state: the Spells
 * section edits it, and the Combat section's spell-slot picker reads it so the
 * picker only offers spells he could actually cast.
 */

import type { SpellData } from '@/components/SpellCard';
import { level1, level2, level3, level4 } from '@/data/spells';
import { useEffect, useState } from 'react';

const PREP_STORAGE_KEY = 'berry-prepared-v1';

export const LEVELED_SPELLS: SpellData[] = [...level1, ...level2, ...level3, ...level4];

export type PreparedMap = Record<string, boolean>;

/** Wildfire circle spells are always prepared and can't be toggled off. */
export const isPrepared = (spell: SpellData, prepared: PreparedMap): boolean =>
  Boolean(spell.alwaysPrepared || prepared[spell.name]);

/** Prepared-spell selection, persisted to localStorage. Defaults to all prepared. */
export function usePrepared() {
  const [prepared, setPrepared] = useState<PreparedMap>(() => {
    const defaults: PreparedMap = {};
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
