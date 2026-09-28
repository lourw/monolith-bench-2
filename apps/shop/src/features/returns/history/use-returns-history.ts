import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildReturnsHistoryItems,
  type ReturnsHistoryItem,
  RETURNS_HISTORY_ITEM_COUNT,
} from './returns-history.model';
import {
  filterReturnsHistory,
  sortReturnsHistory,
  totalReturnsHistory,
  type ReturnsHistorySortKey,
} from './returns-history.utils';

export interface UseReturnsHistoryOptions {
  itemCount?: number;
  initialSort?: ReturnsHistorySortKey;
}

export interface UseReturnsHistoryResult {
  items: ReturnsHistoryItem[];
  allItems: ReturnsHistoryItem[];
  selected: ReturnsHistoryItem | null;
  query: string;
  sortKey: ReturnsHistorySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalReturnsHistory>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ReturnsHistorySortKey) => void;
  refresh: () => void;
}

export function useReturnsHistory(
  options: UseReturnsHistoryOptions = {},
): UseReturnsHistoryResult {
  const { itemCount = RETURNS_HISTORY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ReturnsHistorySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildReturnsHistoryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortReturnsHistory(filterReturnsHistory(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalReturnsHistory(items), [items]);

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
