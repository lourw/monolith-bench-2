import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildReturnsSummaryItems,
  type ReturnsSummaryItem,
  RETURNS_SUMMARY_ITEM_COUNT,
} from './returns-summary.model';
import {
  filterReturnsSummary,
  sortReturnsSummary,
  totalReturnsSummary,
  type ReturnsSummarySortKey,
} from './returns-summary.utils';

export interface UseReturnsSummaryOptions {
  itemCount?: number;
  initialSort?: ReturnsSummarySortKey;
}

export interface UseReturnsSummaryResult {
  items: ReturnsSummaryItem[];
  allItems: ReturnsSummaryItem[];
  selected: ReturnsSummaryItem | null;
  query: string;
  sortKey: ReturnsSummarySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalReturnsSummary>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ReturnsSummarySortKey) => void;
  refresh: () => void;
}

export function useReturnsSummary(
  options: UseReturnsSummaryOptions = {},
): UseReturnsSummaryResult {
  const { itemCount = RETURNS_SUMMARY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ReturnsSummarySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildReturnsSummaryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortReturnsSummary(filterReturnsSummary(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalReturnsSummary(items), [items]);

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
