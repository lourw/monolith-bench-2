import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAuthHistoryItems,
  type AuthHistoryItem,
  AUTH_HISTORY_ITEM_COUNT,
} from './auth-history.model';
import {
  filterAuthHistory,
  sortAuthHistory,
  totalAuthHistory,
  type AuthHistorySortKey,
} from './auth-history.utils';

export interface UseAuthHistoryOptions {
  itemCount?: number;
  initialSort?: AuthHistorySortKey;
}

export interface UseAuthHistoryResult {
  items: AuthHistoryItem[];
  allItems: AuthHistoryItem[];
  selected: AuthHistoryItem | null;
  query: string;
  sortKey: AuthHistorySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAuthHistory>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AuthHistorySortKey) => void;
  refresh: () => void;
}

export function useAuthHistory(
  options: UseAuthHistoryOptions = {},
): UseAuthHistoryResult {
  const { itemCount = AUTH_HISTORY_ITEM_COUNT, initialSort = 'name' } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AuthHistorySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAuthHistoryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortAuthHistory(filterAuthHistory(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAuthHistory(items), [items]);

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
