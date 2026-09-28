import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildRecommendationsDashboardItems,
  type RecommendationsDashboardItem,
  RECOMMENDATIONS_DASHBOARD_ITEM_COUNT,
} from './recommendations-dashboard.model';
import {
  filterRecommendationsDashboard,
  sortRecommendationsDashboard,
  totalRecommendationsDashboard,
  type RecommendationsDashboardSortKey,
} from './recommendations-dashboard.utils';

export interface UseRecommendationsDashboardOptions {
  itemCount?: number;
  initialSort?: RecommendationsDashboardSortKey;
}

export interface UseRecommendationsDashboardResult {
  items: RecommendationsDashboardItem[];
  allItems: RecommendationsDashboardItem[];
  selected: RecommendationsDashboardItem | null;
  query: string;
  sortKey: RecommendationsDashboardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalRecommendationsDashboard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: RecommendationsDashboardSortKey) => void;
  refresh: () => void;
}

export function useRecommendationsDashboard(
  options: UseRecommendationsDashboardOptions = {},
): UseRecommendationsDashboardResult {
  const {
    itemCount = RECOMMENDATIONS_DASHBOARD_ITEM_COUNT,
    initialSort = 'name',
  } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<RecommendationsDashboardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildRecommendationsDashboardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortRecommendationsDashboard(
        filterRecommendationsDashboard(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalRecommendationsDashboard(items), [items]);

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
