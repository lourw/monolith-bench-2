import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAnalyticsSummaryItems,
  type AnalyticsSummaryItem,
  ANALYTICS_SUMMARY_ITEM_COUNT,
} from './analytics-summary.model';
import {
  filterAnalyticsSummary,
  sortAnalyticsSummary,
  totalAnalyticsSummary,
  type AnalyticsSummarySortKey,
} from './analytics-summary.utils';

export interface UseAnalyticsSummaryOptions {
  itemCount?: number;
  initialSort?: AnalyticsSummarySortKey;
}

export interface UseAnalyticsSummaryResult {
  items: AnalyticsSummaryItem[];
  allItems: AnalyticsSummaryItem[];
  selected: AnalyticsSummaryItem | null;
  query: string;
  sortKey: AnalyticsSummarySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAnalyticsSummary>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AnalyticsSummarySortKey) => void;
  refresh: () => void;
}

export function useAnalyticsSummary(
  options: UseAnalyticsSummaryOptions = {},
): UseAnalyticsSummaryResult {
  const { itemCount = ANALYTICS_SUMMARY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AnalyticsSummarySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAnalyticsSummaryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortAnalyticsSummary(filterAnalyticsSummary(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAnalyticsSummary(items), [items]);

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
