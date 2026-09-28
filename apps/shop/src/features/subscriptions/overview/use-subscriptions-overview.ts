import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSubscriptionsOverviewItems,
  type SubscriptionsOverviewItem,
  SUBSCRIPTIONS_OVERVIEW_ITEM_COUNT,
} from './subscriptions-overview.model';
import {
  filterSubscriptionsOverview,
  sortSubscriptionsOverview,
  totalSubscriptionsOverview,
  type SubscriptionsOverviewSortKey,
} from './subscriptions-overview.utils';

export interface UseSubscriptionsOverviewOptions {
  itemCount?: number;
  initialSort?: SubscriptionsOverviewSortKey;
}

export interface UseSubscriptionsOverviewResult {
  items: SubscriptionsOverviewItem[];
  allItems: SubscriptionsOverviewItem[];
  selected: SubscriptionsOverviewItem | null;
  query: string;
  sortKey: SubscriptionsOverviewSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSubscriptionsOverview>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SubscriptionsOverviewSortKey) => void;
  refresh: () => void;
}

export function useSubscriptionsOverview(
  options: UseSubscriptionsOverviewOptions = {},
): UseSubscriptionsOverviewResult {
  const {
    itemCount = SUBSCRIPTIONS_OVERVIEW_ITEM_COUNT,
    initialSort = 'name',
  } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<SubscriptionsOverviewSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSubscriptionsOverviewItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortSubscriptionsOverview(
        filterSubscriptionsOverview(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSubscriptionsOverview(items), [items]);

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
