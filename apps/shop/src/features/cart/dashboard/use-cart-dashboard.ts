import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCartDashboardItems,
  type CartDashboardItem,
  CART_DASHBOARD_ITEM_COUNT,
} from './cart-dashboard.model';
import {
  filterCartDashboard,
  sortCartDashboard,
  totalCartDashboard,
  type CartDashboardSortKey,
} from './cart-dashboard.utils';

export interface UseCartDashboardOptions {
  itemCount?: number;
  initialSort?: CartDashboardSortKey;
}

export interface UseCartDashboardResult {
  items: CartDashboardItem[];
  allItems: CartDashboardItem[];
  selected: CartDashboardItem | null;
  query: string;
  sortKey: CartDashboardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCartDashboard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CartDashboardSortKey) => void;
  refresh: () => void;
}

export function useCartDashboard(
  options: UseCartDashboardOptions = {},
): UseCartDashboardResult {
  const { itemCount = CART_DASHBOARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CartDashboardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCartDashboardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortCartDashboard(filterCartDashboard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCartDashboard(items), [items]);

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
