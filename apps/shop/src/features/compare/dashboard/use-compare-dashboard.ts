import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCompareDashboardItems,
  type CompareDashboardItem,
  COMPARE_DASHBOARD_ITEM_COUNT,
} from './compare-dashboard.model';
import {
  filterCompareDashboard,
  sortCompareDashboard,
  totalCompareDashboard,
  type CompareDashboardSortKey,
} from './compare-dashboard.utils';

export interface UseCompareDashboardOptions {
  itemCount?: number;
  initialSort?: CompareDashboardSortKey;
}

export interface UseCompareDashboardResult {
  items: CompareDashboardItem[];
  allItems: CompareDashboardItem[];
  selected: CompareDashboardItem | null;
  query: string;
  sortKey: CompareDashboardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCompareDashboard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CompareDashboardSortKey) => void;
  refresh: () => void;
}

export function useCompareDashboard(
  options: UseCompareDashboardOptions = {},
): UseCompareDashboardResult {
  const { itemCount = COMPARE_DASHBOARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CompareDashboardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCompareDashboardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortCompareDashboard(filterCompareDashboard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCompareDashboard(items), [items]);

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
