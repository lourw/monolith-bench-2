import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSizingSettingsItems,
  type SizingSettingsItem,
  SIZING_SETTINGS_ITEM_COUNT,
} from './sizing-settings.model';
import {
  filterSizingSettings,
  sortSizingSettings,
  totalSizingSettings,
  type SizingSettingsSortKey,
} from './sizing-settings.utils';

export interface UseSizingSettingsOptions {
  itemCount?: number;
  initialSort?: SizingSettingsSortKey;
}

export interface UseSizingSettingsResult {
  items: SizingSettingsItem[];
  allItems: SizingSettingsItem[];
  selected: SizingSettingsItem | null;
  query: string;
  sortKey: SizingSettingsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSizingSettings>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SizingSettingsSortKey) => void;
  refresh: () => void;
}

export function useSizingSettings(
  options: UseSizingSettingsOptions = {},
): UseSizingSettingsResult {
  const { itemCount = SIZING_SETTINGS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SizingSettingsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSizingSettingsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortSizingSettings(filterSizingSettings(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSizingSettings(items), [items]);

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
