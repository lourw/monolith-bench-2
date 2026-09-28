import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSupportDashboardItems,
  type SupportDashboardItem,
  SUPPORT_DASHBOARD_ITEM_COUNT,
} from './support-dashboard.model';
import {
  filterSupportDashboard,
  sortSupportDashboard,
  totalSupportDashboard,
  type SupportDashboardSortKey,
} from './support-dashboard.utils';

export interface UseSupportDashboardOptions {
  itemCount?: number;
  initialSort?: SupportDashboardSortKey;
}

export interface UseSupportDashboardResult {
  items: SupportDashboardItem[];
  allItems: SupportDashboardItem[];
  selected: SupportDashboardItem | null;
  query: string;
  sortKey: SupportDashboardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSupportDashboard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SupportDashboardSortKey) => void;
  refresh: () => void;
}

export function useSupportDashboard(
  options: UseSupportDashboardOptions = {},
): UseSupportDashboardResult {
  const { itemCount = SUPPORT_DASHBOARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SupportDashboardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSupportDashboardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortSupportDashboard(filterSupportDashboard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSupportDashboard(items), [items]);

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
