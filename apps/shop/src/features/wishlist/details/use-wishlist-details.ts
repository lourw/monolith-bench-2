import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildWishlistDetailsItems,
  type WishlistDetailsItem,
  WISHLIST_DETAILS_ITEM_COUNT,
} from './wishlist-details.model';
import {
  filterWishlistDetails,
  sortWishlistDetails,
  totalWishlistDetails,
  type WishlistDetailsSortKey,
} from './wishlist-details.utils';

export interface UseWishlistDetailsOptions {
  itemCount?: number;
  initialSort?: WishlistDetailsSortKey;
}

export interface UseWishlistDetailsResult {
  items: WishlistDetailsItem[];
  allItems: WishlistDetailsItem[];
  selected: WishlistDetailsItem | null;
  query: string;
  sortKey: WishlistDetailsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalWishlistDetails>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: WishlistDetailsSortKey) => void;
  refresh: () => void;
}

export function useWishlistDetails(
  options: UseWishlistDetailsOptions = {},
): UseWishlistDetailsResult {
  const { itemCount = WISHLIST_DETAILS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<WishlistDetailsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildWishlistDetailsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortWishlistDetails(filterWishlistDetails(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalWishlistDetails(items), [items]);

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
