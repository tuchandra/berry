import { useEffect, useState } from 'react';

/**
 * State that survives a reload, kept in localStorage. The combat trackers use
 * this so a session's damage and spent slots are still there after the tab is
 * closed mid-fight. A corrupt or missing value falls back to `initial`.
 */
export function useStoredState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    const raw = typeof localStorage !== 'undefined' && localStorage.getItem(key);
    if (raw) {
      try {
        return JSON.parse(raw) as T;
      } catch {
        // corrupt value — fall back to the initial state
      }
    }
    return initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
