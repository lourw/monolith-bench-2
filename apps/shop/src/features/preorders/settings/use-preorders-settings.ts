import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildPreordersSettingsItems,
  type PreordersSettingsItem,
  PREORDERS_SETTINGS_ITEM_COUNT,
} from './preorders-settings.model';
import {
  filterPreordersSettings,
  sortPreordersSettings,
  totalPreordersSettings,
  type PreordersSettingsSortKey,
} from './preorders-settings.utils';

export interface UsePreordersSettingsOptions {
  itemCount?: number;
  initialSort?: PreordersSettingsSortKey;
}

export interface UsePreordersSettingsResult {
  items: PreordersSettingsItem[];
  allItems: PreordersSettingsItem[];
  selected: PreordersSettingsItem | null;
  query: string;
  sortKey: PreordersSettingsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalPreordersSettings>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: PreordersSettingsSortKey) => void;
  refresh: () => void;
}

export function usePreordersSettings(
  options: UsePreordersSettingsOptions = {},
): UsePreordersSettingsResult {
  const { itemCount = PREORDERS_SETTINGS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<PreordersSettingsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildPreordersSettingsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortPreordersSettings(filterPreordersSettings(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalPreordersSettings(items), [items]);

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
