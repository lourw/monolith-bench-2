import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildWishlistListItems,
  type WishlistListItem,
  WISHLIST_LIST_ITEM_COUNT,
} from './wishlist-list.model';
import {
  filterWishlistList,
  sortWishlistList,
  totalWishlistList,
  type WishlistListSortKey,
} from './wishlist-list.utils';

export interface UseWishlistListOptions {
  itemCount?: number;
  initialSort?: WishlistListSortKey;
}

export interface UseWishlistListResult {
  items: WishlistListItem[];
  allItems: WishlistListItem[];
  selected: WishlistListItem | null;
  query: string;
  sortKey: WishlistListSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalWishlistList>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: WishlistListSortKey) => void;
  refresh: () => void;
}

export function useWishlistList(
  options: UseWishlistListOptions = {},
): UseWishlistListResult {
  const { itemCount = WISHLIST_LIST_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<WishlistListSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildWishlistListItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortWishlistList(filterWishlistList(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalWishlistList(items), [items]);

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
