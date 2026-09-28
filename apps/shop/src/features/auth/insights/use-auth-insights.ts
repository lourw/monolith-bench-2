import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAuthInsightsItems,
  type AuthInsightsItem,
  AUTH_INSIGHTS_ITEM_COUNT,
} from './auth-insights.model';
import {
  filterAuthInsights,
  sortAuthInsights,
  totalAuthInsights,
  type AuthInsightsSortKey,
} from './auth-insights.utils';

export interface UseAuthInsightsOptions {
  itemCount?: number;
  initialSort?: AuthInsightsSortKey;
}

export interface UseAuthInsightsResult {
  items: AuthInsightsItem[];
  allItems: AuthInsightsItem[];
  selected: AuthInsightsItem | null;
  query: string;
  sortKey: AuthInsightsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAuthInsights>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AuthInsightsSortKey) => void;
  refresh: () => void;
}

export function useAuthInsights(
  options: UseAuthInsightsOptions = {},
): UseAuthInsightsResult {
  const { itemCount = AUTH_INSIGHTS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AuthInsightsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAuthInsightsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortAuthInsights(filterAuthInsights(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAuthInsights(items), [items]);

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
