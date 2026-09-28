import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildInventoryDashboardItems,
  type InventoryDashboardItem,
  INVENTORY_DASHBOARD_ITEM_COUNT,
} from './inventory-dashboard.model';
import {
  filterInventoryDashboard,
  sortInventoryDashboard,
  totalInventoryDashboard,
  type InventoryDashboardSortKey,
} from './inventory-dashboard.utils';

export interface UseInventoryDashboardOptions {
  itemCount?: number;
  initialSort?: InventoryDashboardSortKey;
}

export interface UseInventoryDashboardResult {
  items: InventoryDashboardItem[];
  allItems: InventoryDashboardItem[];
  selected: InventoryDashboardItem | null;
  query: string;
  sortKey: InventoryDashboardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalInventoryDashboard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: InventoryDashboardSortKey) => void;
  refresh: () => void;
}

export function useInventoryDashboard(
  options: UseInventoryDashboardOptions = {},
): UseInventoryDashboardResult {
  const { itemCount = INVENTORY_DASHBOARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<InventoryDashboardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildInventoryDashboardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortInventoryDashboard(
        filterInventoryDashboard(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalInventoryDashboard(items), [items]);

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
