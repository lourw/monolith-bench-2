import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildPreordersDashboardItems,
  type PreordersDashboardItem,
  PREORDERS_DASHBOARD_ITEM_COUNT,
} from './preorders-dashboard.model';
import {
  filterPreordersDashboard,
  sortPreordersDashboard,
  totalPreordersDashboard,
  type PreordersDashboardSortKey,
} from './preorders-dashboard.utils';

export interface UsePreordersDashboardOptions {
  itemCount?: number;
  initialSort?: PreordersDashboardSortKey;
}

export interface UsePreordersDashboardResult {
  items: PreordersDashboardItem[];
  allItems: PreordersDashboardItem[];
  selected: PreordersDashboardItem | null;
  query: string;
  sortKey: PreordersDashboardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalPreordersDashboard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: PreordersDashboardSortKey) => void;
  refresh: () => void;
}

export function usePreordersDashboard(
  options: UsePreordersDashboardOptions = {},
): UsePreordersDashboardResult {
  const { itemCount = PREORDERS_DASHBOARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<PreordersDashboardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildPreordersDashboardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortPreordersDashboard(
        filterPreordersDashboard(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalPreordersDashboard(items), [items]);

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
