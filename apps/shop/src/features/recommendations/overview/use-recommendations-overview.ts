import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildRecommendationsOverviewItems,
  type RecommendationsOverviewItem,
  RECOMMENDATIONS_OVERVIEW_ITEM_COUNT,
} from './recommendations-overview.model';
import {
  filterRecommendationsOverview,
  sortRecommendationsOverview,
  totalRecommendationsOverview,
  type RecommendationsOverviewSortKey,
} from './recommendations-overview.utils';

export interface UseRecommendationsOverviewOptions {
  itemCount?: number;
  initialSort?: RecommendationsOverviewSortKey;
}

export interface UseRecommendationsOverviewResult {
  items: RecommendationsOverviewItem[];
  allItems: RecommendationsOverviewItem[];
  selected: RecommendationsOverviewItem | null;
  query: string;
  sortKey: RecommendationsOverviewSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalRecommendationsOverview>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: RecommendationsOverviewSortKey) => void;
  refresh: () => void;
}

export function useRecommendationsOverview(
  options: UseRecommendationsOverviewOptions = {},
): UseRecommendationsOverviewResult {
  const {
    itemCount = RECOMMENDATIONS_OVERVIEW_ITEM_COUNT,
    initialSort = 'name',
  } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<RecommendationsOverviewSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildRecommendationsOverviewItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortRecommendationsOverview(
        filterRecommendationsOverview(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalRecommendationsOverview(items), [items]);

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
