import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildStoreLocatorSettingsItems,
  type StoreLocatorSettingsItem,
  STORE_LOCATOR_SETTINGS_ITEM_COUNT,
} from './store-locator-settings.model';
import {
  filterStoreLocatorSettings,
  sortStoreLocatorSettings,
  totalStoreLocatorSettings,
  type StoreLocatorSettingsSortKey,
} from './store-locator-settings.utils';

export interface UseStoreLocatorSettingsOptions {
  itemCount?: number;
  initialSort?: StoreLocatorSettingsSortKey;
}

export interface UseStoreLocatorSettingsResult {
  items: StoreLocatorSettingsItem[];
  allItems: StoreLocatorSettingsItem[];
  selected: StoreLocatorSettingsItem | null;
  query: string;
  sortKey: StoreLocatorSettingsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalStoreLocatorSettings>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: StoreLocatorSettingsSortKey) => void;
  refresh: () => void;
}

export function useStoreLocatorSettings(
  options: UseStoreLocatorSettingsOptions = {},
): UseStoreLocatorSettingsResult {
  const {
    itemCount = STORE_LOCATOR_SETTINGS_ITEM_COUNT,
    initialSort = 'name',
  } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<StoreLocatorSettingsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildStoreLocatorSettingsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortStoreLocatorSettings(
        filterStoreLocatorSettings(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalStoreLocatorSettings(items), [items]);

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
