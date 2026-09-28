import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCartDetailsItems,
  type CartDetailsItem,
  CART_DETAILS_ITEM_COUNT,
} from './cart-details.model';
import {
  filterCartDetails,
  sortCartDetails,
  totalCartDetails,
  type CartDetailsSortKey,
} from './cart-details.utils';

export interface UseCartDetailsOptions {
  itemCount?: number;
  initialSort?: CartDetailsSortKey;
}

export interface UseCartDetailsResult {
  items: CartDetailsItem[];
  allItems: CartDetailsItem[];
  selected: CartDetailsItem | null;
  query: string;
  sortKey: CartDetailsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCartDetails>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CartDetailsSortKey) => void;
  refresh: () => void;
}

export function useCartDetails(
  options: UseCartDetailsOptions = {},
): UseCartDetailsResult {
  const { itemCount = CART_DETAILS_ITEM_COUNT, initialSort = 'name' } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CartDetailsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCartDetailsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortCartDetails(filterCartDetails(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCartDetails(items), [items]);

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
