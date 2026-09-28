import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSubscriptionsHistoryItems,
  type SubscriptionsHistoryItem,
  SUBSCRIPTIONS_HISTORY_ITEM_COUNT,
} from './subscriptions-history.model';
import {
  filterSubscriptionsHistory,
  sortSubscriptionsHistory,
  totalSubscriptionsHistory,
  type SubscriptionsHistorySortKey,
} from './subscriptions-history.utils';

export interface UseSubscriptionsHistoryOptions {
  itemCount?: number;
  initialSort?: SubscriptionsHistorySortKey;
}

export interface UseSubscriptionsHistoryResult {
  items: SubscriptionsHistoryItem[];
  allItems: SubscriptionsHistoryItem[];
  selected: SubscriptionsHistoryItem | null;
  query: string;
  sortKey: SubscriptionsHistorySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSubscriptionsHistory>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SubscriptionsHistorySortKey) => void;
  refresh: () => void;
}

export function useSubscriptionsHistory(
  options: UseSubscriptionsHistoryOptions = {},
): UseSubscriptionsHistoryResult {
  const { itemCount = SUBSCRIPTIONS_HISTORY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<SubscriptionsHistorySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSubscriptionsHistoryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortSubscriptionsHistory(
        filterSubscriptionsHistory(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSubscriptionsHistory(items), [items]);

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
