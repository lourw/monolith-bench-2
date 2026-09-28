import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCompareSettingsItems,
  type CompareSettingsItem,
  COMPARE_SETTINGS_ITEM_COUNT,
} from './compare-settings.model';
import {
  filterCompareSettings,
  sortCompareSettings,
  totalCompareSettings,
  type CompareSettingsSortKey,
} from './compare-settings.utils';

export interface UseCompareSettingsOptions {
  itemCount?: number;
  initialSort?: CompareSettingsSortKey;
}

export interface UseCompareSettingsResult {
  items: CompareSettingsItem[];
  allItems: CompareSettingsItem[];
  selected: CompareSettingsItem | null;
  query: string;
  sortKey: CompareSettingsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCompareSettings>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CompareSettingsSortKey) => void;
  refresh: () => void;
}

export function useCompareSettings(
  options: UseCompareSettingsOptions = {},
): UseCompareSettingsResult {
  const { itemCount = COMPARE_SETTINGS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CompareSettingsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCompareSettingsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortCompareSettings(filterCompareSettings(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCompareSettings(items), [items]);

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
