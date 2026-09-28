import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildReturnsDashboardItems,
  type ReturnsDashboardItem,
  RETURNS_DASHBOARD_ITEM_COUNT,
} from './returns-dashboard.model';
import {
  filterReturnsDashboard,
  sortReturnsDashboard,
  totalReturnsDashboard,
  type ReturnsDashboardSortKey,
} from './returns-dashboard.utils';

export interface UseReturnsDashboardOptions {
  itemCount?: number;
  initialSort?: ReturnsDashboardSortKey;
}

export interface UseReturnsDashboardResult {
  items: ReturnsDashboardItem[];
  allItems: ReturnsDashboardItem[];
  selected: ReturnsDashboardItem | null;
  query: string;
  sortKey: ReturnsDashboardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalReturnsDashboard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ReturnsDashboardSortKey) => void;
  refresh: () => void;
}

export function useReturnsDashboard(
  options: UseReturnsDashboardOptions = {},
): UseReturnsDashboardResult {
  const { itemCount = RETURNS_DASHBOARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ReturnsDashboardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildReturnsDashboardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortReturnsDashboard(filterReturnsDashboard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalReturnsDashboard(items), [items]);

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
