import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCartOverviewItems,
  type CartOverviewItem,
  CART_OVERVIEW_ITEM_COUNT,
} from './cart-overview.model';
import {
  filterCartOverview,
  sortCartOverview,
  totalCartOverview,
  type CartOverviewSortKey,
} from './cart-overview.utils';

export interface UseCartOverviewOptions {
  itemCount?: number;
  initialSort?: CartOverviewSortKey;
}

export interface UseCartOverviewResult {
  items: CartOverviewItem[];
  allItems: CartOverviewItem[];
  selected: CartOverviewItem | null;
  query: string;
  sortKey: CartOverviewSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCartOverview>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CartOverviewSortKey) => void;
  refresh: () => void;
}

export function useCartOverview(
  options: UseCartOverviewOptions = {},
): UseCartOverviewResult {
  const { itemCount = CART_OVERVIEW_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CartOverviewSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCartOverviewItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortCartOverview(filterCartOverview(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCartOverview(items), [items]);

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
