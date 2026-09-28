import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildShippingDashboardItems,
  type ShippingDashboardItem,
  SHIPPING_DASHBOARD_ITEM_COUNT,
} from './shipping-dashboard.model';
import {
  filterShippingDashboard,
  sortShippingDashboard,
  totalShippingDashboard,
  type ShippingDashboardSortKey,
} from './shipping-dashboard.utils';

export interface UseShippingDashboardOptions {
  itemCount?: number;
  initialSort?: ShippingDashboardSortKey;
}

export interface UseShippingDashboardResult {
  items: ShippingDashboardItem[];
  allItems: ShippingDashboardItem[];
  selected: ShippingDashboardItem | null;
  query: string;
  sortKey: ShippingDashboardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalShippingDashboard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ShippingDashboardSortKey) => void;
  refresh: () => void;
}

export function useShippingDashboard(
  options: UseShippingDashboardOptions = {},
): UseShippingDashboardResult {
  const { itemCount = SHIPPING_DASHBOARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ShippingDashboardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildShippingDashboardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortShippingDashboard(filterShippingDashboard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalShippingDashboard(items), [items]);

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
