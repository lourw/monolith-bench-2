import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildStoreLocatorListItems,
  type StoreLocatorListItem,
  STORE_LOCATOR_LIST_ITEM_COUNT,
} from './store-locator-list.model';
import {
  filterStoreLocatorList,
  sortStoreLocatorList,
  totalStoreLocatorList,
  type StoreLocatorListSortKey,
} from './store-locator-list.utils';

export interface UseStoreLocatorListOptions {
  itemCount?: number;
  initialSort?: StoreLocatorListSortKey;
}

export interface UseStoreLocatorListResult {
  items: StoreLocatorListItem[];
  allItems: StoreLocatorListItem[];
  selected: StoreLocatorListItem | null;
  query: string;
  sortKey: StoreLocatorListSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalStoreLocatorList>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: StoreLocatorListSortKey) => void;
  refresh: () => void;
}

export function useStoreLocatorList(
  options: UseStoreLocatorListOptions = {},
): UseStoreLocatorListResult {
  const { itemCount = STORE_LOCATOR_LIST_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<StoreLocatorListSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildStoreLocatorListItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortStoreLocatorList(filterStoreLocatorList(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalStoreLocatorList(items), [items]);

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
