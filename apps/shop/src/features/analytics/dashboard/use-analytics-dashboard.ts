import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAnalyticsDashboardItems,
  type AnalyticsDashboardItem,
  ANALYTICS_DASHBOARD_ITEM_COUNT,
} from './analytics-dashboard.model';
import {
  filterAnalyticsDashboard,
  sortAnalyticsDashboard,
  totalAnalyticsDashboard,
  type AnalyticsDashboardSortKey,
} from './analytics-dashboard.utils';

export interface UseAnalyticsDashboardOptions {
  itemCount?: number;
  initialSort?: AnalyticsDashboardSortKey;
}

export interface UseAnalyticsDashboardResult {
  items: AnalyticsDashboardItem[];
  allItems: AnalyticsDashboardItem[];
  selected: AnalyticsDashboardItem | null;
  query: string;
  sortKey: AnalyticsDashboardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAnalyticsDashboard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AnalyticsDashboardSortKey) => void;
  refresh: () => void;
}

export function useAnalyticsDashboard(
  options: UseAnalyticsDashboardOptions = {},
): UseAnalyticsDashboardResult {
  const { itemCount = ANALYTICS_DASHBOARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<AnalyticsDashboardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAnalyticsDashboardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortAnalyticsDashboard(
        filterAnalyticsDashboard(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAnalyticsDashboard(items), [items]);

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
