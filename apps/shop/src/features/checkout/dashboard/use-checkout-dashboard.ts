import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCheckoutDashboardItems,
  type CheckoutDashboardItem,
  CHECKOUT_DASHBOARD_ITEM_COUNT,
} from './checkout-dashboard.model';
import {
  filterCheckoutDashboard,
  sortCheckoutDashboard,
  totalCheckoutDashboard,
  type CheckoutDashboardSortKey,
} from './checkout-dashboard.utils';

export interface UseCheckoutDashboardOptions {
  itemCount?: number;
  initialSort?: CheckoutDashboardSortKey;
}

export interface UseCheckoutDashboardResult {
  items: CheckoutDashboardItem[];
  allItems: CheckoutDashboardItem[];
  selected: CheckoutDashboardItem | null;
  query: string;
  sortKey: CheckoutDashboardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCheckoutDashboard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CheckoutDashboardSortKey) => void;
  refresh: () => void;
}

export function useCheckoutDashboard(
  options: UseCheckoutDashboardOptions = {},
): UseCheckoutDashboardResult {
  const { itemCount = CHECKOUT_DASHBOARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CheckoutDashboardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCheckoutDashboardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortCheckoutDashboard(filterCheckoutDashboard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCheckoutDashboard(items), [items]);

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
