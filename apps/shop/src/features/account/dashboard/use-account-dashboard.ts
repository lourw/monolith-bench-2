import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAccountDashboardItems,
  type AccountDashboardItem,
  ACCOUNT_DASHBOARD_ITEM_COUNT,
} from './account-dashboard.model';
import {
  filterAccountDashboard,
  sortAccountDashboard,
  totalAccountDashboard,
  type AccountDashboardSortKey,
} from './account-dashboard.utils';

export interface UseAccountDashboardOptions {
  itemCount?: number;
  initialSort?: AccountDashboardSortKey;
}

export interface UseAccountDashboardResult {
  items: AccountDashboardItem[];
  allItems: AccountDashboardItem[];
  selected: AccountDashboardItem | null;
  query: string;
  sortKey: AccountDashboardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAccountDashboard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AccountDashboardSortKey) => void;
  refresh: () => void;
}

export function useAccountDashboard(
  options: UseAccountDashboardOptions = {},
): UseAccountDashboardResult {
  const { itemCount = ACCOUNT_DASHBOARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AccountDashboardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAccountDashboardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortAccountDashboard(filterAccountDashboard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAccountDashboard(items), [items]);

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
