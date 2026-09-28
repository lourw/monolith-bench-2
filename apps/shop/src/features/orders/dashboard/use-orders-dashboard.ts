import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildOrdersDashboardItems,
  type OrdersDashboardItem,
  ORDERS_DASHBOARD_ITEM_COUNT,
} from './orders-dashboard.model';
import {
  filterOrdersDashboard,
  sortOrdersDashboard,
  totalOrdersDashboard,
  type OrdersDashboardSortKey,
} from './orders-dashboard.utils';

export interface UseOrdersDashboardOptions {
  itemCount?: number;
  initialSort?: OrdersDashboardSortKey;
}

export interface UseOrdersDashboardResult {
  items: OrdersDashboardItem[];
  allItems: OrdersDashboardItem[];
  selected: OrdersDashboardItem | null;
  query: string;
  sortKey: OrdersDashboardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalOrdersDashboard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: OrdersDashboardSortKey) => void;
  refresh: () => void;
}

export function useOrdersDashboard(
  options: UseOrdersDashboardOptions = {},
): UseOrdersDashboardResult {
  const { itemCount = ORDERS_DASHBOARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<OrdersDashboardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildOrdersDashboardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortOrdersDashboard(filterOrdersDashboard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalOrdersDashboard(items), [items]);

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
