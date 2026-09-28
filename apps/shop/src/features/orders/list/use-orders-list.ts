import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildOrdersListItems,
  type OrdersListItem,
  ORDERS_LIST_ITEM_COUNT,
} from './orders-list.model';
import {
  filterOrdersList,
  sortOrdersList,
  totalOrdersList,
  type OrdersListSortKey,
} from './orders-list.utils';

export interface UseOrdersListOptions {
  itemCount?: number;
  initialSort?: OrdersListSortKey;
}

export interface UseOrdersListResult {
  items: OrdersListItem[];
  allItems: OrdersListItem[];
  selected: OrdersListItem | null;
  query: string;
  sortKey: OrdersListSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalOrdersList>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: OrdersListSortKey) => void;
  refresh: () => void;
}

export function useOrdersList(
  options: UseOrdersListOptions = {},
): UseOrdersListResult {
  const { itemCount = ORDERS_LIST_ITEM_COUNT, initialSort = 'name' } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<OrdersListSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildOrdersListItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortOrdersList(filterOrdersList(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalOrdersList(items), [items]);

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
