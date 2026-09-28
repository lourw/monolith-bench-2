import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCartHistoryItems,
  type CartHistoryItem,
  CART_HISTORY_ITEM_COUNT,
} from './cart-history.model';
import {
  filterCartHistory,
  sortCartHistory,
  totalCartHistory,
  type CartHistorySortKey,
} from './cart-history.utils';

export interface UseCartHistoryOptions {
  itemCount?: number;
  initialSort?: CartHistorySortKey;
}

export interface UseCartHistoryResult {
  items: CartHistoryItem[];
  allItems: CartHistoryItem[];
  selected: CartHistoryItem | null;
  query: string;
  sortKey: CartHistorySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCartHistory>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CartHistorySortKey) => void;
  refresh: () => void;
}

export function useCartHistory(
  options: UseCartHistoryOptions = {},
): UseCartHistoryResult {
  const { itemCount = CART_HISTORY_ITEM_COUNT, initialSort = 'name' } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CartHistorySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCartHistoryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortCartHistory(filterCartHistory(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCartHistory(items), [items]);

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
