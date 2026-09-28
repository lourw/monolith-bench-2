import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildPaymentsDashboardItems,
  type PaymentsDashboardItem,
  PAYMENTS_DASHBOARD_ITEM_COUNT,
} from './payments-dashboard.model';
import {
  filterPaymentsDashboard,
  sortPaymentsDashboard,
  totalPaymentsDashboard,
  type PaymentsDashboardSortKey,
} from './payments-dashboard.utils';

export interface UsePaymentsDashboardOptions {
  itemCount?: number;
  initialSort?: PaymentsDashboardSortKey;
}

export interface UsePaymentsDashboardResult {
  items: PaymentsDashboardItem[];
  allItems: PaymentsDashboardItem[];
  selected: PaymentsDashboardItem | null;
  query: string;
  sortKey: PaymentsDashboardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalPaymentsDashboard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: PaymentsDashboardSortKey) => void;
  refresh: () => void;
}

export function usePaymentsDashboard(
  options: UsePaymentsDashboardOptions = {},
): UsePaymentsDashboardResult {
  const { itemCount = PAYMENTS_DASHBOARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<PaymentsDashboardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildPaymentsDashboardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortPaymentsDashboard(filterPaymentsDashboard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalPaymentsDashboard(items), [items]);

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
