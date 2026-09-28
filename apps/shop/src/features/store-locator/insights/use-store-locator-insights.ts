import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildStoreLocatorInsightsItems,
  type StoreLocatorInsightsItem,
  STORE_LOCATOR_INSIGHTS_ITEM_COUNT,
} from './store-locator-insights.model';
import {
  filterStoreLocatorInsights,
  sortStoreLocatorInsights,
  totalStoreLocatorInsights,
  type StoreLocatorInsightsSortKey,
} from './store-locator-insights.utils';

export interface UseStoreLocatorInsightsOptions {
  itemCount?: number;
  initialSort?: StoreLocatorInsightsSortKey;
}

export interface UseStoreLocatorInsightsResult {
  items: StoreLocatorInsightsItem[];
  allItems: StoreLocatorInsightsItem[];
  selected: StoreLocatorInsightsItem | null;
  query: string;
  sortKey: StoreLocatorInsightsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalStoreLocatorInsights>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: StoreLocatorInsightsSortKey) => void;
  refresh: () => void;
}

export function useStoreLocatorInsights(
  options: UseStoreLocatorInsightsOptions = {},
): UseStoreLocatorInsightsResult {
  const {
    itemCount = STORE_LOCATOR_INSIGHTS_ITEM_COUNT,
    initialSort = 'name',
  } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<StoreLocatorInsightsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildStoreLocatorInsightsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortStoreLocatorInsights(
        filterStoreLocatorInsights(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalStoreLocatorInsights(items), [items]);

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
