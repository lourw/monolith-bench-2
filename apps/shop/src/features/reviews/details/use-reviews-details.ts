import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildReviewsDetailsItems,
  type ReviewsDetailsItem,
  REVIEWS_DETAILS_ITEM_COUNT,
} from './reviews-details.model';
import {
  filterReviewsDetails,
  sortReviewsDetails,
  totalReviewsDetails,
  type ReviewsDetailsSortKey,
} from './reviews-details.utils';

export interface UseReviewsDetailsOptions {
  itemCount?: number;
  initialSort?: ReviewsDetailsSortKey;
}

export interface UseReviewsDetailsResult {
  items: ReviewsDetailsItem[];
  allItems: ReviewsDetailsItem[];
  selected: ReviewsDetailsItem | null;
  query: string;
  sortKey: ReviewsDetailsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalReviewsDetails>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ReviewsDetailsSortKey) => void;
  refresh: () => void;
}

export function useReviewsDetails(
  options: UseReviewsDetailsOptions = {},
): UseReviewsDetailsResult {
  const { itemCount = REVIEWS_DETAILS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ReviewsDetailsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildReviewsDetailsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortReviewsDetails(filterReviewsDetails(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalReviewsDetails(items), [items]);

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
