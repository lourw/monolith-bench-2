import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildOrdersInsightsItems,
  type OrdersInsightsItem,
  ORDERS_INSIGHTS_ITEM_COUNT,
} from './orders-insights.model';
import {
  filterOrdersInsights,
  sortOrdersInsights,
  totalOrdersInsights,
  type OrdersInsightsSortKey,
} from './orders-insights.utils';

export interface UseOrdersInsightsOptions {
  itemCount?: number;
  initialSort?: OrdersInsightsSortKey;
}

export interface UseOrdersInsightsResult {
  items: OrdersInsightsItem[];
  allItems: OrdersInsightsItem[];
  selected: OrdersInsightsItem | null;
  query: string;
  sortKey: OrdersInsightsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalOrdersInsights>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: OrdersInsightsSortKey) => void;
  refresh: () => void;
}

export function useOrdersInsights(
  options: UseOrdersInsightsOptions = {},
): UseOrdersInsightsResult {
  const { itemCount = ORDERS_INSIGHTS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<OrdersInsightsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildOrdersInsightsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortOrdersInsights(filterOrdersInsights(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalOrdersInsights(items), [items]);

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
