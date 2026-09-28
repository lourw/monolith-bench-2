import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSearchDashboardItems,
  type SearchDashboardItem,
  SEARCH_DASHBOARD_ITEM_COUNT,
} from './search-dashboard.model';
import {
  filterSearchDashboard,
  sortSearchDashboard,
  totalSearchDashboard,
  type SearchDashboardSortKey,
} from './search-dashboard.utils';

export interface UseSearchDashboardOptions {
  itemCount?: number;
  initialSort?: SearchDashboardSortKey;
}

export interface UseSearchDashboardResult {
  items: SearchDashboardItem[];
  allItems: SearchDashboardItem[];
  selected: SearchDashboardItem | null;
  query: string;
  sortKey: SearchDashboardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSearchDashboard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SearchDashboardSortKey) => void;
  refresh: () => void;
}

export function useSearchDashboard(
  options: UseSearchDashboardOptions = {},
): UseSearchDashboardResult {
  const { itemCount = SEARCH_DASHBOARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SearchDashboardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSearchDashboardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortSearchDashboard(filterSearchDashboard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSearchDashboard(items), [items]);

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
