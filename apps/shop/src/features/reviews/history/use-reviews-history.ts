import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildReviewsHistoryItems,
  type ReviewsHistoryItem,
  REVIEWS_HISTORY_ITEM_COUNT,
} from './reviews-history.model';
import {
  filterReviewsHistory,
  sortReviewsHistory,
  totalReviewsHistory,
  type ReviewsHistorySortKey,
} from './reviews-history.utils';

export interface UseReviewsHistoryOptions {
  itemCount?: number;
  initialSort?: ReviewsHistorySortKey;
}

export interface UseReviewsHistoryResult {
  items: ReviewsHistoryItem[];
  allItems: ReviewsHistoryItem[];
  selected: ReviewsHistoryItem | null;
  query: string;
  sortKey: ReviewsHistorySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalReviewsHistory>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ReviewsHistorySortKey) => void;
  refresh: () => void;
}

export function useReviewsHistory(
  options: UseReviewsHistoryOptions = {},
): UseReviewsHistoryResult {
  const { itemCount = REVIEWS_HISTORY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ReviewsHistorySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildReviewsHistoryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortReviewsHistory(filterReviewsHistory(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalReviewsHistory(items), [items]);

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
