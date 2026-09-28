import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCartInsightsItems,
  type CartInsightsItem,
  CART_INSIGHTS_ITEM_COUNT,
} from './cart-insights.model';
import {
  filterCartInsights,
  sortCartInsights,
  totalCartInsights,
  type CartInsightsSortKey,
} from './cart-insights.utils';

export interface UseCartInsightsOptions {
  itemCount?: number;
  initialSort?: CartInsightsSortKey;
}

export interface UseCartInsightsResult {
  items: CartInsightsItem[];
  allItems: CartInsightsItem[];
  selected: CartInsightsItem | null;
  query: string;
  sortKey: CartInsightsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCartInsights>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CartInsightsSortKey) => void;
  refresh: () => void;
}

export function useCartInsights(
  options: UseCartInsightsOptions = {},
): UseCartInsightsResult {
  const { itemCount = CART_INSIGHTS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CartInsightsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCartInsightsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortCartInsights(filterCartInsights(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCartInsights(items), [items]);

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
