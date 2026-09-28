import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSubscriptionsDetailsItems,
  type SubscriptionsDetailsItem,
  SUBSCRIPTIONS_DETAILS_ITEM_COUNT,
} from './subscriptions-details.model';
import {
  filterSubscriptionsDetails,
  sortSubscriptionsDetails,
  totalSubscriptionsDetails,
  type SubscriptionsDetailsSortKey,
} from './subscriptions-details.utils';

export interface UseSubscriptionsDetailsOptions {
  itemCount?: number;
  initialSort?: SubscriptionsDetailsSortKey;
}

export interface UseSubscriptionsDetailsResult {
  items: SubscriptionsDetailsItem[];
  allItems: SubscriptionsDetailsItem[];
  selected: SubscriptionsDetailsItem | null;
  query: string;
  sortKey: SubscriptionsDetailsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSubscriptionsDetails>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SubscriptionsDetailsSortKey) => void;
  refresh: () => void;
}

export function useSubscriptionsDetails(
  options: UseSubscriptionsDetailsOptions = {},
): UseSubscriptionsDetailsResult {
  const { itemCount = SUBSCRIPTIONS_DETAILS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<SubscriptionsDetailsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSubscriptionsDetailsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortSubscriptionsDetails(
        filterSubscriptionsDetails(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSubscriptionsDetails(items), [items]);

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
