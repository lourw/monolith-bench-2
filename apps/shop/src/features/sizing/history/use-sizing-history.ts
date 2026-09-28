import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSizingHistoryItems,
  type SizingHistoryItem,
  SIZING_HISTORY_ITEM_COUNT,
} from './sizing-history.model';
import {
  filterSizingHistory,
  sortSizingHistory,
  totalSizingHistory,
  type SizingHistorySortKey,
} from './sizing-history.utils';

export interface UseSizingHistoryOptions {
  itemCount?: number;
  initialSort?: SizingHistorySortKey;
}

export interface UseSizingHistoryResult {
  items: SizingHistoryItem[];
  allItems: SizingHistoryItem[];
  selected: SizingHistoryItem | null;
  query: string;
  sortKey: SizingHistorySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSizingHistory>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SizingHistorySortKey) => void;
  refresh: () => void;
}

export function useSizingHistory(
  options: UseSizingHistoryOptions = {},
): UseSizingHistoryResult {
  const { itemCount = SIZING_HISTORY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SizingHistorySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSizingHistoryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortSizingHistory(filterSizingHistory(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSizingHistory(items), [items]);

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
