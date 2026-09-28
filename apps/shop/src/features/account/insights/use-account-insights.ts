import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAccountInsightsItems,
  type AccountInsightsItem,
  ACCOUNT_INSIGHTS_ITEM_COUNT,
} from './account-insights.model';
import {
  filterAccountInsights,
  sortAccountInsights,
  totalAccountInsights,
  type AccountInsightsSortKey,
} from './account-insights.utils';

export interface UseAccountInsightsOptions {
  itemCount?: number;
  initialSort?: AccountInsightsSortKey;
}

export interface UseAccountInsightsResult {
  items: AccountInsightsItem[];
  allItems: AccountInsightsItem[];
  selected: AccountInsightsItem | null;
  query: string;
  sortKey: AccountInsightsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAccountInsights>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AccountInsightsSortKey) => void;
  refresh: () => void;
}

export function useAccountInsights(
  options: UseAccountInsightsOptions = {},
): UseAccountInsightsResult {
  const { itemCount = ACCOUNT_INSIGHTS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AccountInsightsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAccountInsightsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortAccountInsights(filterAccountInsights(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAccountInsights(items), [items]);

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
