import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildPreordersHistoryItems,
  type PreordersHistoryItem,
  PREORDERS_HISTORY_ITEM_COUNT,
} from './preorders-history.model';
import {
  filterPreordersHistory,
  sortPreordersHistory,
  totalPreordersHistory,
  type PreordersHistorySortKey,
} from './preorders-history.utils';

export interface UsePreordersHistoryOptions {
  itemCount?: number;
  initialSort?: PreordersHistorySortKey;
}

export interface UsePreordersHistoryResult {
  items: PreordersHistoryItem[];
  allItems: PreordersHistoryItem[];
  selected: PreordersHistoryItem | null;
  query: string;
  sortKey: PreordersHistorySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalPreordersHistory>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: PreordersHistorySortKey) => void;
  refresh: () => void;
}

export function usePreordersHistory(
  options: UsePreordersHistoryOptions = {},
): UsePreordersHistoryResult {
  const { itemCount = PREORDERS_HISTORY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<PreordersHistorySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildPreordersHistoryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortPreordersHistory(filterPreordersHistory(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalPreordersHistory(items), [items]);

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
