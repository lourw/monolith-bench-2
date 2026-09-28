import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSubscriptionsListItems,
  type SubscriptionsListItem,
  SUBSCRIPTIONS_LIST_ITEM_COUNT,
} from './subscriptions-list.model';
import {
  filterSubscriptionsList,
  sortSubscriptionsList,
  totalSubscriptionsList,
  type SubscriptionsListSortKey,
} from './subscriptions-list.utils';

export interface UseSubscriptionsListOptions {
  itemCount?: number;
  initialSort?: SubscriptionsListSortKey;
}

export interface UseSubscriptionsListResult {
  items: SubscriptionsListItem[];
  allItems: SubscriptionsListItem[];
  selected: SubscriptionsListItem | null;
  query: string;
  sortKey: SubscriptionsListSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSubscriptionsList>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SubscriptionsListSortKey) => void;
  refresh: () => void;
}

export function useSubscriptionsList(
  options: UseSubscriptionsListOptions = {},
): UseSubscriptionsListResult {
  const { itemCount = SUBSCRIPTIONS_LIST_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SubscriptionsListSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSubscriptionsListItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortSubscriptionsList(filterSubscriptionsList(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSubscriptionsList(items), [items]);

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
