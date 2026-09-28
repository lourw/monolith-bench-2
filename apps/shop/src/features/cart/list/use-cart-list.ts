import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCartListItems,
  type CartListItem,
  CART_LIST_ITEM_COUNT,
} from './cart-list.model';
import {
  filterCartList,
  sortCartList,
  totalCartList,
  type CartListSortKey,
} from './cart-list.utils';

export interface UseCartListOptions {
  itemCount?: number;
  initialSort?: CartListSortKey;
}

export interface UseCartListResult {
  items: CartListItem[];
  allItems: CartListItem[];
  selected: CartListItem | null;
  query: string;
  sortKey: CartListSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCartList>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CartListSortKey) => void;
  refresh: () => void;
}

export function useCartList(
  options: UseCartListOptions = {},
): UseCartListResult {
  const { itemCount = CART_LIST_ITEM_COUNT, initialSort = 'name' } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CartListSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCartListItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortCartList(filterCartList(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCartList(items), [items]);

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
