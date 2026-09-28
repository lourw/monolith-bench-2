import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCompareInsightsItems,
  type CompareInsightsItem,
  COMPARE_INSIGHTS_ITEM_COUNT,
} from './compare-insights.model';
import {
  filterCompareInsights,
  sortCompareInsights,
  totalCompareInsights,
  type CompareInsightsSortKey,
} from './compare-insights.utils';

export interface UseCompareInsightsOptions {
  itemCount?: number;
  initialSort?: CompareInsightsSortKey;
}

export interface UseCompareInsightsResult {
  items: CompareInsightsItem[];
  allItems: CompareInsightsItem[];
  selected: CompareInsightsItem | null;
  query: string;
  sortKey: CompareInsightsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCompareInsights>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CompareInsightsSortKey) => void;
  refresh: () => void;
}

export function useCompareInsights(
  options: UseCompareInsightsOptions = {},
): UseCompareInsightsResult {
  const { itemCount = COMPARE_INSIGHTS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CompareInsightsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCompareInsightsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortCompareInsights(filterCompareInsights(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCompareInsights(items), [items]);

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
