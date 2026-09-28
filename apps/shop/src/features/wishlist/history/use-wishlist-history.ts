import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildWishlistHistoryItems,
  type WishlistHistoryItem,
  WISHLIST_HISTORY_ITEM_COUNT,
} from './wishlist-history.model';
import {
  filterWishlistHistory,
  sortWishlistHistory,
  totalWishlistHistory,
  type WishlistHistorySortKey,
} from './wishlist-history.utils';

export interface UseWishlistHistoryOptions {
  itemCount?: number;
  initialSort?: WishlistHistorySortKey;
}

export interface UseWishlistHistoryResult {
  items: WishlistHistoryItem[];
  allItems: WishlistHistoryItem[];
  selected: WishlistHistoryItem | null;
  query: string;
  sortKey: WishlistHistorySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalWishlistHistory>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: WishlistHistorySortKey) => void;
  refresh: () => void;
}

export function useWishlistHistory(
  options: UseWishlistHistoryOptions = {},
): UseWishlistHistoryResult {
  const { itemCount = WISHLIST_HISTORY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<WishlistHistorySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildWishlistHistoryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortWishlistHistory(filterWishlistHistory(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalWishlistHistory(items), [items]);

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
