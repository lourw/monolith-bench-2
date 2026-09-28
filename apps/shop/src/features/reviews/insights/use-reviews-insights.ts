import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildReviewsInsightsItems,
  type ReviewsInsightsItem,
  REVIEWS_INSIGHTS_ITEM_COUNT,
} from './reviews-insights.model';
import {
  filterReviewsInsights,
  sortReviewsInsights,
  totalReviewsInsights,
  type ReviewsInsightsSortKey,
} from './reviews-insights.utils';

export interface UseReviewsInsightsOptions {
  itemCount?: number;
  initialSort?: ReviewsInsightsSortKey;
}

export interface UseReviewsInsightsResult {
  items: ReviewsInsightsItem[];
  allItems: ReviewsInsightsItem[];
  selected: ReviewsInsightsItem | null;
  query: string;
  sortKey: ReviewsInsightsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalReviewsInsights>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ReviewsInsightsSortKey) => void;
  refresh: () => void;
}

export function useReviewsInsights(
  options: UseReviewsInsightsOptions = {},
): UseReviewsInsightsResult {
  const { itemCount = REVIEWS_INSIGHTS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ReviewsInsightsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildReviewsInsightsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortReviewsInsights(filterReviewsInsights(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalReviewsInsights(items), [items]);

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
