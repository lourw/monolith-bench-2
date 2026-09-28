import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildWishlistSummaryItems,
  type WishlistSummaryItem,
  WISHLIST_SUMMARY_ITEM_COUNT,
} from './wishlist-summary.model';
import {
  filterWishlistSummary,
  sortWishlistSummary,
  totalWishlistSummary,
  type WishlistSummarySortKey,
} from './wishlist-summary.utils';

export interface UseWishlistSummaryOptions {
  itemCount?: number;
  initialSort?: WishlistSummarySortKey;
}

export interface UseWishlistSummaryResult {
  items: WishlistSummaryItem[];
  allItems: WishlistSummaryItem[];
  selected: WishlistSummaryItem | null;
  query: string;
  sortKey: WishlistSummarySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalWishlistSummary>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: WishlistSummarySortKey) => void;
  refresh: () => void;
}

export function useWishlistSummary(
  options: UseWishlistSummaryOptions = {},
): UseWishlistSummaryResult {
  const { itemCount = WISHLIST_SUMMARY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<WishlistSummarySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildWishlistSummaryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortWishlistSummary(filterWishlistSummary(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalWishlistSummary(items), [items]);

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
