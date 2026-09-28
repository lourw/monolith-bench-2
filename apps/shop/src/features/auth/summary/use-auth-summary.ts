import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAuthSummaryItems,
  type AuthSummaryItem,
  AUTH_SUMMARY_ITEM_COUNT,
} from './auth-summary.model';
import {
  filterAuthSummary,
  sortAuthSummary,
  totalAuthSummary,
  type AuthSummarySortKey,
} from './auth-summary.utils';

export interface UseAuthSummaryOptions {
  itemCount?: number;
  initialSort?: AuthSummarySortKey;
}

export interface UseAuthSummaryResult {
  items: AuthSummaryItem[];
  allItems: AuthSummaryItem[];
  selected: AuthSummaryItem | null;
  query: string;
  sortKey: AuthSummarySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAuthSummary>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AuthSummarySortKey) => void;
  refresh: () => void;
}

export function useAuthSummary(
  options: UseAuthSummaryOptions = {},
): UseAuthSummaryResult {
  const { itemCount = AUTH_SUMMARY_ITEM_COUNT, initialSort = 'name' } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AuthSummarySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAuthSummaryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortAuthSummary(filterAuthSummary(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAuthSummary(items), [items]);

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
