import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAuthDashboardItems,
  type AuthDashboardItem,
  AUTH_DASHBOARD_ITEM_COUNT,
} from './auth-dashboard.model';
import {
  filterAuthDashboard,
  sortAuthDashboard,
  totalAuthDashboard,
  type AuthDashboardSortKey,
} from './auth-dashboard.utils';

export interface UseAuthDashboardOptions {
  itemCount?: number;
  initialSort?: AuthDashboardSortKey;
}

export interface UseAuthDashboardResult {
  items: AuthDashboardItem[];
  allItems: AuthDashboardItem[];
  selected: AuthDashboardItem | null;
  query: string;
  sortKey: AuthDashboardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAuthDashboard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AuthDashboardSortKey) => void;
  refresh: () => void;
}

export function useAuthDashboard(
  options: UseAuthDashboardOptions = {},
): UseAuthDashboardResult {
  const { itemCount = AUTH_DASHBOARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AuthDashboardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAuthDashboardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortAuthDashboard(filterAuthDashboard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAuthDashboard(items), [items]);

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
