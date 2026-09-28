import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildOrdersDetailsItems,
  type OrdersDetailsItem,
  ORDERS_DETAILS_ITEM_COUNT,
} from './orders-details.model';
import {
  filterOrdersDetails,
  sortOrdersDetails,
  totalOrdersDetails,
  type OrdersDetailsSortKey,
} from './orders-details.utils';

export interface UseOrdersDetailsOptions {
  itemCount?: number;
  initialSort?: OrdersDetailsSortKey;
}

export interface UseOrdersDetailsResult {
  items: OrdersDetailsItem[];
  allItems: OrdersDetailsItem[];
  selected: OrdersDetailsItem | null;
  query: string;
  sortKey: OrdersDetailsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalOrdersDetails>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: OrdersDetailsSortKey) => void;
  refresh: () => void;
}

export function useOrdersDetails(
  options: UseOrdersDetailsOptions = {},
): UseOrdersDetailsResult {
  const { itemCount = ORDERS_DETAILS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<OrdersDetailsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildOrdersDetailsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortOrdersDetails(filterOrdersDetails(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalOrdersDetails(items), [items]);

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
