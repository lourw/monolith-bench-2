import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildOrdersHistoryItems,
  type OrdersHistoryItem,
  ORDERS_HISTORY_ITEM_COUNT,
} from './orders-history.model';
import {
  filterOrdersHistory,
  sortOrdersHistory,
  totalOrdersHistory,
  type OrdersHistorySortKey,
} from './orders-history.utils';

export interface UseOrdersHistoryOptions {
  itemCount?: number;
  initialSort?: OrdersHistorySortKey;
}

export interface UseOrdersHistoryResult {
  items: OrdersHistoryItem[];
  allItems: OrdersHistoryItem[];
  selected: OrdersHistoryItem | null;
  query: string;
  sortKey: OrdersHistorySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalOrdersHistory>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: OrdersHistorySortKey) => void;
  refresh: () => void;
}

export function useOrdersHistory(
  options: UseOrdersHistoryOptions = {},
): UseOrdersHistoryResult {
  const { itemCount = ORDERS_HISTORY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<OrdersHistorySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildOrdersHistoryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortOrdersHistory(filterOrdersHistory(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalOrdersHistory(items), [items]);

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
