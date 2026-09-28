import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSizingDashboardItems,
  type SizingDashboardItem,
  SIZING_DASHBOARD_ITEM_COUNT,
} from './sizing-dashboard.model';
import {
  filterSizingDashboard,
  sortSizingDashboard,
  totalSizingDashboard,
  type SizingDashboardSortKey,
} from './sizing-dashboard.utils';

export interface UseSizingDashboardOptions {
  itemCount?: number;
  initialSort?: SizingDashboardSortKey;
}

export interface UseSizingDashboardResult {
  items: SizingDashboardItem[];
  allItems: SizingDashboardItem[];
  selected: SizingDashboardItem | null;
  query: string;
  sortKey: SizingDashboardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSizingDashboard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SizingDashboardSortKey) => void;
  refresh: () => void;
}

export function useSizingDashboard(
  options: UseSizingDashboardOptions = {},
): UseSizingDashboardResult {
  const { itemCount = SIZING_DASHBOARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SizingDashboardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSizingDashboardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortSizingDashboard(filterSizingDashboard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSizingDashboard(items), [items]);

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
