import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildPaymentsOverviewItems,
  type PaymentsOverviewItem,
  PAYMENTS_OVERVIEW_ITEM_COUNT,
} from './payments-overview.model';
import {
  filterPaymentsOverview,
  sortPaymentsOverview,
  totalPaymentsOverview,
  type PaymentsOverviewSortKey,
} from './payments-overview.utils';

export interface UsePaymentsOverviewOptions {
  itemCount?: number;
  initialSort?: PaymentsOverviewSortKey;
}

export interface UsePaymentsOverviewResult {
  items: PaymentsOverviewItem[];
  allItems: PaymentsOverviewItem[];
  selected: PaymentsOverviewItem | null;
  query: string;
  sortKey: PaymentsOverviewSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalPaymentsOverview>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: PaymentsOverviewSortKey) => void;
  refresh: () => void;
}

export function usePaymentsOverview(
  options: UsePaymentsOverviewOptions = {},
): UsePaymentsOverviewResult {
  const { itemCount = PAYMENTS_OVERVIEW_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<PaymentsOverviewSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildPaymentsOverviewItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortPaymentsOverview(filterPaymentsOverview(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalPaymentsOverview(items), [items]);

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
