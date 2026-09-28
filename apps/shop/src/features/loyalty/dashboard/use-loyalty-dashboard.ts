import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildLoyaltyDashboardItems,
  type LoyaltyDashboardItem,
  LOYALTY_DASHBOARD_ITEM_COUNT,
} from './loyalty-dashboard.model';
import {
  filterLoyaltyDashboard,
  sortLoyaltyDashboard,
  totalLoyaltyDashboard,
  type LoyaltyDashboardSortKey,
} from './loyalty-dashboard.utils';

export interface UseLoyaltyDashboardOptions {
  itemCount?: number;
  initialSort?: LoyaltyDashboardSortKey;
}

export interface UseLoyaltyDashboardResult {
  items: LoyaltyDashboardItem[];
  allItems: LoyaltyDashboardItem[];
  selected: LoyaltyDashboardItem | null;
  query: string;
  sortKey: LoyaltyDashboardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalLoyaltyDashboard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: LoyaltyDashboardSortKey) => void;
  refresh: () => void;
}

export function useLoyaltyDashboard(
  options: UseLoyaltyDashboardOptions = {},
): UseLoyaltyDashboardResult {
  const { itemCount = LOYALTY_DASHBOARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<LoyaltyDashboardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildLoyaltyDashboardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortLoyaltyDashboard(filterLoyaltyDashboard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalLoyaltyDashboard(items), [items]);

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
