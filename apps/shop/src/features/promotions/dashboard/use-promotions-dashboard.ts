import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildPromotionsDashboardItems,
  type PromotionsDashboardItem,
  PROMOTIONS_DASHBOARD_ITEM_COUNT,
} from './promotions-dashboard.model';
import {
  filterPromotionsDashboard,
  sortPromotionsDashboard,
  totalPromotionsDashboard,
  type PromotionsDashboardSortKey,
} from './promotions-dashboard.utils';

export interface UsePromotionsDashboardOptions {
  itemCount?: number;
  initialSort?: PromotionsDashboardSortKey;
}

export interface UsePromotionsDashboardResult {
  items: PromotionsDashboardItem[];
  allItems: PromotionsDashboardItem[];
  selected: PromotionsDashboardItem | null;
  query: string;
  sortKey: PromotionsDashboardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalPromotionsDashboard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: PromotionsDashboardSortKey) => void;
  refresh: () => void;
}

export function usePromotionsDashboard(
  options: UsePromotionsDashboardOptions = {},
): UsePromotionsDashboardResult {
  const { itemCount = PROMOTIONS_DASHBOARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<PromotionsDashboardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildPromotionsDashboardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortPromotionsDashboard(
        filterPromotionsDashboard(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalPromotionsDashboard(items), [items]);

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
