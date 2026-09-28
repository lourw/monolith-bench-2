import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildBundlesSettingsItems,
  type BundlesSettingsItem,
  BUNDLES_SETTINGS_ITEM_COUNT,
} from './bundles-settings.model';
import {
  filterBundlesSettings,
  sortBundlesSettings,
  totalBundlesSettings,
  type BundlesSettingsSortKey,
} from './bundles-settings.utils';

export interface UseBundlesSettingsOptions {
  itemCount?: number;
  initialSort?: BundlesSettingsSortKey;
}

export interface UseBundlesSettingsResult {
  items: BundlesSettingsItem[];
  allItems: BundlesSettingsItem[];
  selected: BundlesSettingsItem | null;
  query: string;
  sortKey: BundlesSettingsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalBundlesSettings>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: BundlesSettingsSortKey) => void;
  refresh: () => void;
}

export function useBundlesSettings(
  options: UseBundlesSettingsOptions = {},
): UseBundlesSettingsResult {
  const { itemCount = BUNDLES_SETTINGS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<BundlesSettingsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildBundlesSettingsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortBundlesSettings(filterBundlesSettings(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalBundlesSettings(items), [items]);

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
