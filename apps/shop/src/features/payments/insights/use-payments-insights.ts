import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildPaymentsInsightsItems,
  type PaymentsInsightsItem,
  PAYMENTS_INSIGHTS_ITEM_COUNT,
} from './payments-insights.model';
import {
  filterPaymentsInsights,
  sortPaymentsInsights,
  totalPaymentsInsights,
  type PaymentsInsightsSortKey,
} from './payments-insights.utils';

export interface UsePaymentsInsightsOptions {
  itemCount?: number;
  initialSort?: PaymentsInsightsSortKey;
}

export interface UsePaymentsInsightsResult {
  items: PaymentsInsightsItem[];
  allItems: PaymentsInsightsItem[];
  selected: PaymentsInsightsItem | null;
  query: string;
  sortKey: PaymentsInsightsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalPaymentsInsights>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: PaymentsInsightsSortKey) => void;
  refresh: () => void;
}

export function usePaymentsInsights(
  options: UsePaymentsInsightsOptions = {},
): UsePaymentsInsightsResult {
  const { itemCount = PAYMENTS_INSIGHTS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<PaymentsInsightsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildPaymentsInsightsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortPaymentsInsights(filterPaymentsInsights(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalPaymentsInsights(items), [items]);

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
