import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildReturnsInsightsItems,
  type ReturnsInsightsItem,
  RETURNS_INSIGHTS_ITEM_COUNT,
} from './returns-insights.model';
import {
  filterReturnsInsights,
  sortReturnsInsights,
  totalReturnsInsights,
  type ReturnsInsightsSortKey,
} from './returns-insights.utils';

export interface UseReturnsInsightsOptions {
  itemCount?: number;
  initialSort?: ReturnsInsightsSortKey;
}

export interface UseReturnsInsightsResult {
  items: ReturnsInsightsItem[];
  allItems: ReturnsInsightsItem[];
  selected: ReturnsInsightsItem | null;
  query: string;
  sortKey: ReturnsInsightsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalReturnsInsights>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ReturnsInsightsSortKey) => void;
  refresh: () => void;
}

export function useReturnsInsights(
  options: UseReturnsInsightsOptions = {},
): UseReturnsInsightsResult {
  const { itemCount = RETURNS_INSIGHTS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ReturnsInsightsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildReturnsInsightsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortReturnsInsights(filterReturnsInsights(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalReturnsInsights(items), [items]);

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
