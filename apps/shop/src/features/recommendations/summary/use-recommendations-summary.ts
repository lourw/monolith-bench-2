import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildRecommendationsSummaryItems,
  type RecommendationsSummaryItem,
  RECOMMENDATIONS_SUMMARY_ITEM_COUNT,
} from './recommendations-summary.model';
import {
  filterRecommendationsSummary,
  sortRecommendationsSummary,
  totalRecommendationsSummary,
  type RecommendationsSummarySortKey,
} from './recommendations-summary.utils';

export interface UseRecommendationsSummaryOptions {
  itemCount?: number;
  initialSort?: RecommendationsSummarySortKey;
}

export interface UseRecommendationsSummaryResult {
  items: RecommendationsSummaryItem[];
  allItems: RecommendationsSummaryItem[];
  selected: RecommendationsSummaryItem | null;
  query: string;
  sortKey: RecommendationsSummarySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalRecommendationsSummary>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: RecommendationsSummarySortKey) => void;
  refresh: () => void;
}

export function useRecommendationsSummary(
  options: UseRecommendationsSummaryOptions = {},
): UseRecommendationsSummaryResult {
  const {
    itemCount = RECOMMENDATIONS_SUMMARY_ITEM_COUNT,
    initialSort = 'name',
  } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<RecommendationsSummarySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildRecommendationsSummaryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortRecommendationsSummary(
        filterRecommendationsSummary(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalRecommendationsSummary(items), [items]);

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
