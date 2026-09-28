import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSearchHistoryItems,
  type SearchHistoryItem,
  SEARCH_HISTORY_ITEM_COUNT,
} from './search-history.model';
import {
  filterSearchHistory,
  sortSearchHistory,
  totalSearchHistory,
  type SearchHistorySortKey,
} from './search-history.utils';

export interface UseSearchHistoryOptions {
  itemCount?: number;
  initialSort?: SearchHistorySortKey;
}

export interface UseSearchHistoryResult {
  items: SearchHistoryItem[];
  allItems: SearchHistoryItem[];
  selected: SearchHistoryItem | null;
  query: string;
  sortKey: SearchHistorySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSearchHistory>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SearchHistorySortKey) => void;
  refresh: () => void;
}

export function useSearchHistory(
  options: UseSearchHistoryOptions = {},
): UseSearchHistoryResult {
  const { itemCount = SEARCH_HISTORY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SearchHistorySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSearchHistoryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortSearchHistory(filterSearchHistory(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSearchHistory(items), [items]);

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
