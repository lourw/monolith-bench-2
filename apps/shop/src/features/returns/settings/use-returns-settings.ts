import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildReturnsSettingsItems,
  type ReturnsSettingsItem,
  RETURNS_SETTINGS_ITEM_COUNT,
} from './returns-settings.model';
import {
  filterReturnsSettings,
  sortReturnsSettings,
  totalReturnsSettings,
  type ReturnsSettingsSortKey,
} from './returns-settings.utils';

export interface UseReturnsSettingsOptions {
  itemCount?: number;
  initialSort?: ReturnsSettingsSortKey;
}

export interface UseReturnsSettingsResult {
  items: ReturnsSettingsItem[];
  allItems: ReturnsSettingsItem[];
  selected: ReturnsSettingsItem | null;
  query: string;
  sortKey: ReturnsSettingsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalReturnsSettings>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ReturnsSettingsSortKey) => void;
  refresh: () => void;
}

export function useReturnsSettings(
  options: UseReturnsSettingsOptions = {},
): UseReturnsSettingsResult {
  const { itemCount = RETURNS_SETTINGS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ReturnsSettingsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildReturnsSettingsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortReturnsSettings(filterReturnsSettings(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalReturnsSettings(items), [items]);

  useEffect(() => {
    if (!loading) {
      return;
    }
    const timer = setTimeout(() => {
      setLoading(false);
      setError(null);
    }, 25);
    return () => clearTimeout(timer);
  }, [loading]);

  const refresh = useCallback(() => {
    setLoading(true);
    setVersion((v) => v + 1);
  }, []);

  const select = useCallback((id: string | null) => {
    setSelectedId(id);
  }, []);

  return {
    items,
    allItems,
    selected,
    query,
    sortKey,
    loading,
    error,
    totals,
    select,
    setQuery,
    setSortKey,
    refresh,
  };
}
