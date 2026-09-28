import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildWishlistOverviewItems,
  type WishlistOverviewItem,
  WISHLIST_OVERVIEW_ITEM_COUNT,
} from './wishlist-overview.model';
import {
  filterWishlistOverview,
  sortWishlistOverview,
  totalWishlistOverview,
  type WishlistOverviewSortKey,
} from './wishlist-overview.utils';

export interface UseWishlistOverviewOptions {
  itemCount?: number;
  initialSort?: WishlistOverviewSortKey;
}

export interface UseWishlistOverviewResult {
  items: WishlistOverviewItem[];
  allItems: WishlistOverviewItem[];
  selected: WishlistOverviewItem | null;
  query: string;
  sortKey: WishlistOverviewSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalWishlistOverview>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: WishlistOverviewSortKey) => void;
  refresh: () => void;
}

export function useWishlistOverview(
  options: UseWishlistOverviewOptions = {},
): UseWishlistOverviewResult {
  const { itemCount = WISHLIST_OVERVIEW_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<WishlistOverviewSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildWishlistOverviewItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortWishlistOverview(filterWishlistOverview(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalWishlistOverview(items), [items]);

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
