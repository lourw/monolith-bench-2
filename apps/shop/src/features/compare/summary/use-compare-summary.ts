import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCompareSummaryItems,
  type CompareSummaryItem,
  COMPARE_SUMMARY_ITEM_COUNT,
} from './compare-summary.model';
import {
  filterCompareSummary,
  sortCompareSummary,
  totalCompareSummary,
  type CompareSummarySortKey,
} from './compare-summary.utils';

export interface UseCompareSummaryOptions {
  itemCount?: number;
  initialSort?: CompareSummarySortKey;
}

export interface UseCompareSummaryResult {
  items: CompareSummaryItem[];
  allItems: CompareSummaryItem[];
  selected: CompareSummaryItem | null;
  query: string;
  sortKey: CompareSummarySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCompareSummary>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CompareSummarySortKey) => void;
  refresh: () => void;
}

export function useCompareSummary(
  options: UseCompareSummaryOptions = {},
): UseCompareSummaryResult {
  const { itemCount = COMPARE_SUMMARY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CompareSummarySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCompareSummaryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortCompareSummary(filterCompareSummary(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCompareSummary(items), [items]);

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
