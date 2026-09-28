import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildRecommendationsInsightsItems,
  type RecommendationsInsightsItem,
  RECOMMENDATIONS_INSIGHTS_ITEM_COUNT,
} from './recommendations-insights.model';
import {
  filterRecommendationsInsights,
  sortRecommendationsInsights,
  totalRecommendationsInsights,
  type RecommendationsInsightsSortKey,
} from './recommendations-insights.utils';

export interface UseRecommendationsInsightsOptions {
  itemCount?: number;
  initialSort?: RecommendationsInsightsSortKey;
}

export interface UseRecommendationsInsightsResult {
  items: RecommendationsInsightsItem[];
  allItems: RecommendationsInsightsItem[];
  selected: RecommendationsInsightsItem | null;
  query: string;
  sortKey: RecommendationsInsightsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalRecommendationsInsights>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: RecommendationsInsightsSortKey) => void;
  refresh: () => void;
}

export function useRecommendationsInsights(
  options: UseRecommendationsInsightsOptions = {},
): UseRecommendationsInsightsResult {
  const {
    itemCount = RECOMMENDATIONS_INSIGHTS_ITEM_COUNT,
    initialSort = 'name',
  } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<RecommendationsInsightsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildRecommendationsInsightsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortRecommendationsInsights(
        filterRecommendationsInsights(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalRecommendationsInsights(items), [items]);

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
