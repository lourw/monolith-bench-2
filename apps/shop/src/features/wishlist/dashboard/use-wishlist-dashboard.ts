import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildWishlistDashboardItems,
  type WishlistDashboardItem,
  WISHLIST_DASHBOARD_ITEM_COUNT,
} from './wishlist-dashboard.model';
import {
  filterWishlistDashboard,
  sortWishlistDashboard,
  totalWishlistDashboard,
  type WishlistDashboardSortKey,
} from './wishlist-dashboard.utils';

export interface UseWishlistDashboardOptions {
  itemCount?: number;
  initialSort?: WishlistDashboardSortKey;
}

export interface UseWishlistDashboardResult {
  items: WishlistDashboardItem[];
  allItems: WishlistDashboardItem[];
  selected: WishlistDashboardItem | null;
  query: string;
  sortKey: WishlistDashboardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalWishlistDashboard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: WishlistDashboardSortKey) => void;
  refresh: () => void;
}

export function useWishlistDashboard(
  options: UseWishlistDashboardOptions = {},
): UseWishlistDashboardResult {
  const { itemCount = WISHLIST_DASHBOARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<WishlistDashboardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildWishlistDashboardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortWishlistDashboard(filterWishlistDashboard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalWishlistDashboard(items), [items]);

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
