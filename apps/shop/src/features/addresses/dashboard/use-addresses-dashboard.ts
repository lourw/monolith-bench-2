import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAddressesDashboardItems,
  type AddressesDashboardItem,
  ADDRESSES_DASHBOARD_ITEM_COUNT,
} from './addresses-dashboard.model';
import {
  filterAddressesDashboard,
  sortAddressesDashboard,
  totalAddressesDashboard,
  type AddressesDashboardSortKey,
} from './addresses-dashboard.utils';

export interface UseAddressesDashboardOptions {
  itemCount?: number;
  initialSort?: AddressesDashboardSortKey;
}

export interface UseAddressesDashboardResult {
  items: AddressesDashboardItem[];
  allItems: AddressesDashboardItem[];
  selected: AddressesDashboardItem | null;
  query: string;
  sortKey: AddressesDashboardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAddressesDashboard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AddressesDashboardSortKey) => void;
  refresh: () => void;
}

export function useAddressesDashboard(
  options: UseAddressesDashboardOptions = {},
): UseAddressesDashboardResult {
  const { itemCount = ADDRESSES_DASHBOARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<AddressesDashboardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAddressesDashboardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortAddressesDashboard(
        filterAddressesDashboard(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAddressesDashboard(items), [items]);

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
