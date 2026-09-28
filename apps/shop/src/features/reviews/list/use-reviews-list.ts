import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildReviewsListItems,
  type ReviewsListItem,
  REVIEWS_LIST_ITEM_COUNT,
} from './reviews-list.model';
import {
  filterReviewsList,
  sortReviewsList,
  totalReviewsList,
  type ReviewsListSortKey,
} from './reviews-list.utils';

export interface UseReviewsListOptions {
  itemCount?: number;
  initialSort?: ReviewsListSortKey;
}

export interface UseReviewsListResult {
  items: ReviewsListItem[];
  allItems: ReviewsListItem[];
  selected: ReviewsListItem | null;
  query: string;
  sortKey: ReviewsListSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalReviewsList>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ReviewsListSortKey) => void;
  refresh: () => void;
}

export function useReviewsList(
  options: UseReviewsListOptions = {},
): UseReviewsListResult {
  const { itemCount = REVIEWS_LIST_ITEM_COUNT, initialSort = 'name' } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ReviewsListSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildReviewsListItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortReviewsList(filterReviewsList(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalReviewsList(items), [items]);

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
