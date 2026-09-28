import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildPaymentsListItems,
  type PaymentsListItem,
  PAYMENTS_LIST_ITEM_COUNT,
} from './payments-list.model';
import {
  filterPaymentsList,
  sortPaymentsList,
  totalPaymentsList,
  type PaymentsListSortKey,
} from './payments-list.utils';

export interface UsePaymentsListOptions {
  itemCount?: number;
  initialSort?: PaymentsListSortKey;
}

export interface UsePaymentsListResult {
  items: PaymentsListItem[];
  allItems: PaymentsListItem[];
  selected: PaymentsListItem | null;
  query: string;
  sortKey: PaymentsListSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalPaymentsList>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: PaymentsListSortKey) => void;
  refresh: () => void;
}

export function usePaymentsList(
  options: UsePaymentsListOptions = {},
): UsePaymentsListResult {
  const { itemCount = PAYMENTS_LIST_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<PaymentsListSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildPaymentsListItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortPaymentsList(filterPaymentsList(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalPaymentsList(items), [items]);

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
