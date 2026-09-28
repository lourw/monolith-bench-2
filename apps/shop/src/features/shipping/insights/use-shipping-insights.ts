import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildShippingInsightsItems,
  type ShippingInsightsItem,
  SHIPPING_INSIGHTS_ITEM_COUNT,
} from './shipping-insights.model';
import {
  filterShippingInsights,
  sortShippingInsights,
  totalShippingInsights,
  type ShippingInsightsSortKey,
} from './shipping-insights.utils';

export interface UseShippingInsightsOptions {
  itemCount?: number;
  initialSort?: ShippingInsightsSortKey;
}

export interface UseShippingInsightsResult {
  items: ShippingInsightsItem[];
  allItems: ShippingInsightsItem[];
  selected: ShippingInsightsItem | null;
  query: string;
  sortKey: ShippingInsightsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalShippingInsights>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ShippingInsightsSortKey) => void;
  refresh: () => void;
}

export function useShippingInsights(
  options: UseShippingInsightsOptions = {},
): UseShippingInsightsResult {
  const { itemCount = SHIPPING_INSIGHTS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ShippingInsightsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildShippingInsightsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortShippingInsights(filterShippingInsights(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalShippingInsights(items), [items]);

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
