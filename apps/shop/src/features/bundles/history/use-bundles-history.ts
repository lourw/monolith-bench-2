import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildBundlesHistoryItems,
  type BundlesHistoryItem,
  BUNDLES_HISTORY_ITEM_COUNT,
} from './bundles-history.model';
import {
  filterBundlesHistory,
  sortBundlesHistory,
  totalBundlesHistory,
  type BundlesHistorySortKey,
} from './bundles-history.utils';

export interface UseBundlesHistoryOptions {
  itemCount?: number;
  initialSort?: BundlesHistorySortKey;
}

export interface UseBundlesHistoryResult {
  items: BundlesHistoryItem[];
  allItems: BundlesHistoryItem[];
  selected: BundlesHistoryItem | null;
  query: string;
  sortKey: BundlesHistorySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalBundlesHistory>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: BundlesHistorySortKey) => void;
  refresh: () => void;
}

export function useBundlesHistory(
  options: UseBundlesHistoryOptions = {},
): UseBundlesHistoryResult {
  const { itemCount = BUNDLES_HISTORY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<BundlesHistorySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildBundlesHistoryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortBundlesHistory(filterBundlesHistory(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalBundlesHistory(items), [items]);

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
