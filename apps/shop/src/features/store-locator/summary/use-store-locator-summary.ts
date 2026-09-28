import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildStoreLocatorSummaryItems,
  type StoreLocatorSummaryItem,
  STORE_LOCATOR_SUMMARY_ITEM_COUNT,
} from './store-locator-summary.model';
import {
  filterStoreLocatorSummary,
  sortStoreLocatorSummary,
  totalStoreLocatorSummary,
  type StoreLocatorSummarySortKey,
} from './store-locator-summary.utils';

export interface UseStoreLocatorSummaryOptions {
  itemCount?: number;
  initialSort?: StoreLocatorSummarySortKey;
}

export interface UseStoreLocatorSummaryResult {
  items: StoreLocatorSummaryItem[];
  allItems: StoreLocatorSummaryItem[];
  selected: StoreLocatorSummaryItem | null;
  query: string;
  sortKey: StoreLocatorSummarySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalStoreLocatorSummary>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: StoreLocatorSummarySortKey) => void;
  refresh: () => void;
}

export function useStoreLocatorSummary(
  options: UseStoreLocatorSummaryOptions = {},
): UseStoreLocatorSummaryResult {
  const { itemCount = STORE_LOCATOR_SUMMARY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<StoreLocatorSummarySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildStoreLocatorSummaryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortStoreLocatorSummary(
        filterStoreLocatorSummary(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalStoreLocatorSummary(items), [items]);

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
