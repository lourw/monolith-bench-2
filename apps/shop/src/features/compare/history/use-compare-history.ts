import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCompareHistoryItems,
  type CompareHistoryItem,
  COMPARE_HISTORY_ITEM_COUNT,
} from './compare-history.model';
import {
  filterCompareHistory,
  sortCompareHistory,
  totalCompareHistory,
  type CompareHistorySortKey,
} from './compare-history.utils';

export interface UseCompareHistoryOptions {
  itemCount?: number;
  initialSort?: CompareHistorySortKey;
}

export interface UseCompareHistoryResult {
  items: CompareHistoryItem[];
  allItems: CompareHistoryItem[];
  selected: CompareHistoryItem | null;
  query: string;
  sortKey: CompareHistorySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCompareHistory>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CompareHistorySortKey) => void;
  refresh: () => void;
}

export function useCompareHistory(
  options: UseCompareHistoryOptions = {},
): UseCompareHistoryResult {
  const { itemCount = COMPARE_HISTORY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CompareHistorySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCompareHistoryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortCompareHistory(filterCompareHistory(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCompareHistory(items), [items]);

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
