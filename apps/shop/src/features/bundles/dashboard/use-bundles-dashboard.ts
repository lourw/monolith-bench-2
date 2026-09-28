import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildBundlesDashboardItems,
  type BundlesDashboardItem,
  BUNDLES_DASHBOARD_ITEM_COUNT,
} from './bundles-dashboard.model';
import {
  filterBundlesDashboard,
  sortBundlesDashboard,
  totalBundlesDashboard,
  type BundlesDashboardSortKey,
} from './bundles-dashboard.utils';

export interface UseBundlesDashboardOptions {
  itemCount?: number;
  initialSort?: BundlesDashboardSortKey;
}

export interface UseBundlesDashboardResult {
  items: BundlesDashboardItem[];
  allItems: BundlesDashboardItem[];
  selected: BundlesDashboardItem | null;
  query: string;
  sortKey: BundlesDashboardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalBundlesDashboard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: BundlesDashboardSortKey) => void;
  refresh: () => void;
}

export function useBundlesDashboard(
  options: UseBundlesDashboardOptions = {},
): UseBundlesDashboardResult {
  const { itemCount = BUNDLES_DASHBOARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<BundlesDashboardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildBundlesDashboardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortBundlesDashboard(filterBundlesDashboard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalBundlesDashboard(items), [items]);

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
