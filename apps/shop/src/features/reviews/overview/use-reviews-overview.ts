import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildReviewsOverviewItems,
  type ReviewsOverviewItem,
  REVIEWS_OVERVIEW_ITEM_COUNT,
} from './reviews-overview.model';
import {
  filterReviewsOverview,
  sortReviewsOverview,
  totalReviewsOverview,
  type ReviewsOverviewSortKey,
} from './reviews-overview.utils';

export interface UseReviewsOverviewOptions {
  itemCount?: number;
  initialSort?: ReviewsOverviewSortKey;
}

export interface UseReviewsOverviewResult {
  items: ReviewsOverviewItem[];
  allItems: ReviewsOverviewItem[];
  selected: ReviewsOverviewItem | null;
  query: string;
  sortKey: ReviewsOverviewSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalReviewsOverview>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ReviewsOverviewSortKey) => void;
  refresh: () => void;
}

export function useReviewsOverview(
  options: UseReviewsOverviewOptions = {},
): UseReviewsOverviewResult {
  const { itemCount = REVIEWS_OVERVIEW_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ReviewsOverviewSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildReviewsOverviewItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortReviewsOverview(filterReviewsOverview(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalReviewsOverview(items), [items]);

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
