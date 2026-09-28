import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildOrdersOverviewItems,
  type OrdersOverviewItem,
  ORDERS_OVERVIEW_ITEM_COUNT,
} from './orders-overview.model';
import {
  filterOrdersOverview,
  sortOrdersOverview,
  totalOrdersOverview,
  type OrdersOverviewSortKey,
} from './orders-overview.utils';

export interface UseOrdersOverviewOptions {
  itemCount?: number;
  initialSort?: OrdersOverviewSortKey;
}

export interface UseOrdersOverviewResult {
  items: OrdersOverviewItem[];
  allItems: OrdersOverviewItem[];
  selected: OrdersOverviewItem | null;
  query: string;
  sortKey: OrdersOverviewSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalOrdersOverview>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: OrdersOverviewSortKey) => void;
  refresh: () => void;
}

export function useOrdersOverview(
  options: UseOrdersOverviewOptions = {},
): UseOrdersOverviewResult {
  const { itemCount = ORDERS_OVERVIEW_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<OrdersOverviewSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildOrdersOverviewItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortOrdersOverview(filterOrdersOverview(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalOrdersOverview(items), [items]);

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
