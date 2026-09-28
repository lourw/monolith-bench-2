import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildPaymentsHistoryItems,
  type PaymentsHistoryItem,
  PAYMENTS_HISTORY_ITEM_COUNT,
} from './payments-history.model';
import {
  filterPaymentsHistory,
  sortPaymentsHistory,
  totalPaymentsHistory,
  type PaymentsHistorySortKey,
} from './payments-history.utils';

export interface UsePaymentsHistoryOptions {
  itemCount?: number;
  initialSort?: PaymentsHistorySortKey;
}

export interface UsePaymentsHistoryResult {
  items: PaymentsHistoryItem[];
  allItems: PaymentsHistoryItem[];
  selected: PaymentsHistoryItem | null;
  query: string;
  sortKey: PaymentsHistorySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalPaymentsHistory>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: PaymentsHistorySortKey) => void;
  refresh: () => void;
}

export function usePaymentsHistory(
  options: UsePaymentsHistoryOptions = {},
): UsePaymentsHistoryResult {
  const { itemCount = PAYMENTS_HISTORY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<PaymentsHistorySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildPaymentsHistoryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortPaymentsHistory(filterPaymentsHistory(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalPaymentsHistory(items), [items]);

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
