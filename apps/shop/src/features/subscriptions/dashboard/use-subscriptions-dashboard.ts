import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSubscriptionsDashboardItems,
  type SubscriptionsDashboardItem,
  SUBSCRIPTIONS_DASHBOARD_ITEM_COUNT,
} from './subscriptions-dashboard.model';
import {
  filterSubscriptionsDashboard,
  sortSubscriptionsDashboard,
  totalSubscriptionsDashboard,
  type SubscriptionsDashboardSortKey,
} from './subscriptions-dashboard.utils';

export interface UseSubscriptionsDashboardOptions {
  itemCount?: number;
  initialSort?: SubscriptionsDashboardSortKey;
}

export interface UseSubscriptionsDashboardResult {
  items: SubscriptionsDashboardItem[];
  allItems: SubscriptionsDashboardItem[];
  selected: SubscriptionsDashboardItem | null;
  query: string;
  sortKey: SubscriptionsDashboardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSubscriptionsDashboard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SubscriptionsDashboardSortKey) => void;
  refresh: () => void;
}

export function useSubscriptionsDashboard(
  options: UseSubscriptionsDashboardOptions = {},
): UseSubscriptionsDashboardResult {
  const {
    itemCount = SUBSCRIPTIONS_DASHBOARD_ITEM_COUNT,
    initialSort = 'name',
  } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<SubscriptionsDashboardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSubscriptionsDashboardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortSubscriptionsDashboard(
        filterSubscriptionsDashboard(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSubscriptionsDashboard(items), [items]);

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
