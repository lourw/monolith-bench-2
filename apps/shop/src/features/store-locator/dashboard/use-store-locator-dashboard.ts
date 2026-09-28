import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildStoreLocatorDashboardItems,
  type StoreLocatorDashboardItem,
  STORE_LOCATOR_DASHBOARD_ITEM_COUNT,
} from './store-locator-dashboard.model';
import {
  filterStoreLocatorDashboard,
  sortStoreLocatorDashboard,
  totalStoreLocatorDashboard,
  type StoreLocatorDashboardSortKey,
} from './store-locator-dashboard.utils';

export interface UseStoreLocatorDashboardOptions {
  itemCount?: number;
  initialSort?: StoreLocatorDashboardSortKey;
}

export interface UseStoreLocatorDashboardResult {
  items: StoreLocatorDashboardItem[];
  allItems: StoreLocatorDashboardItem[];
  selected: StoreLocatorDashboardItem | null;
  query: string;
  sortKey: StoreLocatorDashboardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalStoreLocatorDashboard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: StoreLocatorDashboardSortKey) => void;
  refresh: () => void;
}

export function useStoreLocatorDashboard(
  options: UseStoreLocatorDashboardOptions = {},
): UseStoreLocatorDashboardResult {
  const {
    itemCount = STORE_LOCATOR_DASHBOARD_ITEM_COUNT,
    initialSort = 'name',
  } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<StoreLocatorDashboardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildStoreLocatorDashboardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortStoreLocatorDashboard(
        filterStoreLocatorDashboard(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalStoreLocatorDashboard(items), [items]);

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
