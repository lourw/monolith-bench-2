import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildBundlesListItems,
  type BundlesListItem,
  BUNDLES_LIST_ITEM_COUNT,
} from './bundles-list.model';
import {
  filterBundlesList,
  sortBundlesList,
  totalBundlesList,
  type BundlesListSortKey,
} from './bundles-list.utils';

export interface UseBundlesListOptions {
  itemCount?: number;
  initialSort?: BundlesListSortKey;
}

export interface UseBundlesListResult {
  items: BundlesListItem[];
  allItems: BundlesListItem[];
  selected: BundlesListItem | null;
  query: string;
  sortKey: BundlesListSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalBundlesList>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: BundlesListSortKey) => void;
  refresh: () => void;
}

export function useBundlesList(
  options: UseBundlesListOptions = {},
): UseBundlesListResult {
  const { itemCount = BUNDLES_LIST_ITEM_COUNT, initialSort = 'name' } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<BundlesListSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildBundlesListItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortBundlesList(filterBundlesList(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalBundlesList(items), [items]);

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
