import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildStoreLocatorDetailsItems,
  type StoreLocatorDetailsItem,
  STORE_LOCATOR_DETAILS_ITEM_COUNT,
} from './store-locator-details.model';
import {
  filterStoreLocatorDetails,
  sortStoreLocatorDetails,
  totalStoreLocatorDetails,
  type StoreLocatorDetailsSortKey,
} from './store-locator-details.utils';

export interface UseStoreLocatorDetailsOptions {
  itemCount?: number;
  initialSort?: StoreLocatorDetailsSortKey;
}

export interface UseStoreLocatorDetailsResult {
  items: StoreLocatorDetailsItem[];
  allItems: StoreLocatorDetailsItem[];
  selected: StoreLocatorDetailsItem | null;
  query: string;
  sortKey: StoreLocatorDetailsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalStoreLocatorDetails>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: StoreLocatorDetailsSortKey) => void;
  refresh: () => void;
}

export function useStoreLocatorDetails(
  options: UseStoreLocatorDetailsOptions = {},
): UseStoreLocatorDetailsResult {
  const { itemCount = STORE_LOCATOR_DETAILS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<StoreLocatorDetailsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildStoreLocatorDetailsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortStoreLocatorDetails(
        filterStoreLocatorDetails(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalStoreLocatorDetails(items), [items]);

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
