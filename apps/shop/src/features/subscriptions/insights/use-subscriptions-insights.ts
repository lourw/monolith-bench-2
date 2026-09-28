import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSubscriptionsInsightsItems,
  type SubscriptionsInsightsItem,
  SUBSCRIPTIONS_INSIGHTS_ITEM_COUNT,
} from './subscriptions-insights.model';
import {
  filterSubscriptionsInsights,
  sortSubscriptionsInsights,
  totalSubscriptionsInsights,
  type SubscriptionsInsightsSortKey,
} from './subscriptions-insights.utils';

export interface UseSubscriptionsInsightsOptions {
  itemCount?: number;
  initialSort?: SubscriptionsInsightsSortKey;
}

export interface UseSubscriptionsInsightsResult {
  items: SubscriptionsInsightsItem[];
  allItems: SubscriptionsInsightsItem[];
  selected: SubscriptionsInsightsItem | null;
  query: string;
  sortKey: SubscriptionsInsightsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSubscriptionsInsights>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SubscriptionsInsightsSortKey) => void;
  refresh: () => void;
}

export function useSubscriptionsInsights(
  options: UseSubscriptionsInsightsOptions = {},
): UseSubscriptionsInsightsResult {
  const {
    itemCount = SUBSCRIPTIONS_INSIGHTS_ITEM_COUNT,
    initialSort = 'name',
  } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<SubscriptionsInsightsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSubscriptionsInsightsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortSubscriptionsInsights(
        filterSubscriptionsInsights(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSubscriptionsInsights(items), [items]);

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
