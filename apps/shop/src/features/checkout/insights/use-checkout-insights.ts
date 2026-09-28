import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCheckoutInsightsItems,
  type CheckoutInsightsItem,
  CHECKOUT_INSIGHTS_ITEM_COUNT,
} from './checkout-insights.model';
import {
  filterCheckoutInsights,
  sortCheckoutInsights,
  totalCheckoutInsights,
  type CheckoutInsightsSortKey,
} from './checkout-insights.utils';

export interface UseCheckoutInsightsOptions {
  itemCount?: number;
  initialSort?: CheckoutInsightsSortKey;
}

export interface UseCheckoutInsightsResult {
  items: CheckoutInsightsItem[];
  allItems: CheckoutInsightsItem[];
  selected: CheckoutInsightsItem | null;
  query: string;
  sortKey: CheckoutInsightsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCheckoutInsights>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CheckoutInsightsSortKey) => void;
  refresh: () => void;
}

export function useCheckoutInsights(
  options: UseCheckoutInsightsOptions = {},
): UseCheckoutInsightsResult {
  const { itemCount = CHECKOUT_INSIGHTS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CheckoutInsightsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCheckoutInsightsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortCheckoutInsights(filterCheckoutInsights(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCheckoutInsights(items), [items]);

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
