import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSubscriptionsSummaryItems,
  type SubscriptionsSummaryItem,
  SUBSCRIPTIONS_SUMMARY_ITEM_COUNT,
} from './subscriptions-summary.model';
import {
  filterSubscriptionsSummary,
  sortSubscriptionsSummary,
  totalSubscriptionsSummary,
  type SubscriptionsSummarySortKey,
} from './subscriptions-summary.utils';

export interface UseSubscriptionsSummaryOptions {
  itemCount?: number;
  initialSort?: SubscriptionsSummarySortKey;
}

export interface UseSubscriptionsSummaryResult {
  items: SubscriptionsSummaryItem[];
  allItems: SubscriptionsSummaryItem[];
  selected: SubscriptionsSummaryItem | null;
  query: string;
  sortKey: SubscriptionsSummarySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSubscriptionsSummary>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SubscriptionsSummarySortKey) => void;
  refresh: () => void;
}

export function useSubscriptionsSummary(
  options: UseSubscriptionsSummaryOptions = {},
): UseSubscriptionsSummaryResult {
  const { itemCount = SUBSCRIPTIONS_SUMMARY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<SubscriptionsSummarySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSubscriptionsSummaryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortSubscriptionsSummary(
        filterSubscriptionsSummary(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSubscriptionsSummary(items), [items]);

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
