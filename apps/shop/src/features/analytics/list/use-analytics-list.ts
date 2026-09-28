import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAnalyticsListItems,
  type AnalyticsListItem,
  ANALYTICS_LIST_ITEM_COUNT,
} from './analytics-list.model';
import {
  filterAnalyticsList,
  sortAnalyticsList,
  totalAnalyticsList,
  type AnalyticsListSortKey,
} from './analytics-list.utils';

export interface UseAnalyticsListOptions {
  itemCount?: number;
  initialSort?: AnalyticsListSortKey;
}

export interface UseAnalyticsListResult {
  items: AnalyticsListItem[];
  allItems: AnalyticsListItem[];
  selected: AnalyticsListItem | null;
  query: string;
  sortKey: AnalyticsListSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAnalyticsList>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AnalyticsListSortKey) => void;
  refresh: () => void;
}

export function useAnalyticsList(
  options: UseAnalyticsListOptions = {},
): UseAnalyticsListResult {
  const { itemCount = ANALYTICS_LIST_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AnalyticsListSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAnalyticsListItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortAnalyticsList(filterAnalyticsList(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAnalyticsList(items), [items]);

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
