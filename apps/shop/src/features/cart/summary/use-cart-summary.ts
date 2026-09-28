import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCartSummaryItems,
  type CartSummaryItem,
  CART_SUMMARY_ITEM_COUNT,
} from './cart-summary.model';
import {
  filterCartSummary,
  sortCartSummary,
  totalCartSummary,
  type CartSummarySortKey,
} from './cart-summary.utils';

export interface UseCartSummaryOptions {
  itemCount?: number;
  initialSort?: CartSummarySortKey;
}

export interface UseCartSummaryResult {
  items: CartSummaryItem[];
  allItems: CartSummaryItem[];
  selected: CartSummaryItem | null;
  query: string;
  sortKey: CartSummarySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCartSummary>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CartSummarySortKey) => void;
  refresh: () => void;
}

export function useCartSummary(
  options: UseCartSummaryOptions = {},
): UseCartSummaryResult {
  const { itemCount = CART_SUMMARY_ITEM_COUNT, initialSort = 'name' } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CartSummarySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCartSummaryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortCartSummary(filterCartSummary(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCartSummary(items), [items]);

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
