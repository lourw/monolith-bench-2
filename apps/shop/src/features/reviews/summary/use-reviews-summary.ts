import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildReviewsSummaryItems,
  type ReviewsSummaryItem,
  REVIEWS_SUMMARY_ITEM_COUNT,
} from './reviews-summary.model';
import {
  filterReviewsSummary,
  sortReviewsSummary,
  totalReviewsSummary,
  type ReviewsSummarySortKey,
} from './reviews-summary.utils';

export interface UseReviewsSummaryOptions {
  itemCount?: number;
  initialSort?: ReviewsSummarySortKey;
}

export interface UseReviewsSummaryResult {
  items: ReviewsSummaryItem[];
  allItems: ReviewsSummaryItem[];
  selected: ReviewsSummaryItem | null;
  query: string;
  sortKey: ReviewsSummarySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalReviewsSummary>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ReviewsSummarySortKey) => void;
  refresh: () => void;
}

export function useReviewsSummary(
  options: UseReviewsSummaryOptions = {},
): UseReviewsSummaryResult {
  const { itemCount = REVIEWS_SUMMARY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ReviewsSummarySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildReviewsSummaryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortReviewsSummary(filterReviewsSummary(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalReviewsSummary(items), [items]);

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
