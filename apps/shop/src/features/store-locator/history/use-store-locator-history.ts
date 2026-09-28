import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildStoreLocatorHistoryItems,
  type StoreLocatorHistoryItem,
  STORE_LOCATOR_HISTORY_ITEM_COUNT,
} from './store-locator-history.model';
import {
  filterStoreLocatorHistory,
  sortStoreLocatorHistory,
  totalStoreLocatorHistory,
  type StoreLocatorHistorySortKey,
} from './store-locator-history.utils';

export interface UseStoreLocatorHistoryOptions {
  itemCount?: number;
  initialSort?: StoreLocatorHistorySortKey;
}

export interface UseStoreLocatorHistoryResult {
  items: StoreLocatorHistoryItem[];
  allItems: StoreLocatorHistoryItem[];
  selected: StoreLocatorHistoryItem | null;
  query: string;
  sortKey: StoreLocatorHistorySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalStoreLocatorHistory>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: StoreLocatorHistorySortKey) => void;
  refresh: () => void;
}

export function useStoreLocatorHistory(
  options: UseStoreLocatorHistoryOptions = {},
): UseStoreLocatorHistoryResult {
  const { itemCount = STORE_LOCATOR_HISTORY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<StoreLocatorHistorySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildStoreLocatorHistoryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortStoreLocatorHistory(
        filterStoreLocatorHistory(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalStoreLocatorHistory(items), [items]);

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
