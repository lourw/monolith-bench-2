import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildStoreLocatorOverviewItems,
  type StoreLocatorOverviewItem,
  STORE_LOCATOR_OVERVIEW_ITEM_COUNT,
} from './store-locator-overview.model';
import {
  filterStoreLocatorOverview,
  sortStoreLocatorOverview,
  totalStoreLocatorOverview,
  type StoreLocatorOverviewSortKey,
} from './store-locator-overview.utils';

export interface UseStoreLocatorOverviewOptions {
  itemCount?: number;
  initialSort?: StoreLocatorOverviewSortKey;
}

export interface UseStoreLocatorOverviewResult {
  items: StoreLocatorOverviewItem[];
  allItems: StoreLocatorOverviewItem[];
  selected: StoreLocatorOverviewItem | null;
  query: string;
  sortKey: StoreLocatorOverviewSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalStoreLocatorOverview>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: StoreLocatorOverviewSortKey) => void;
  refresh: () => void;
}

export function useStoreLocatorOverview(
  options: UseStoreLocatorOverviewOptions = {},
): UseStoreLocatorOverviewResult {
  const {
    itemCount = STORE_LOCATOR_OVERVIEW_ITEM_COUNT,
    initialSort = 'name',
  } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<StoreLocatorOverviewSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildStoreLocatorOverviewItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortStoreLocatorOverview(
        filterStoreLocatorOverview(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalStoreLocatorOverview(items), [items]);

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
