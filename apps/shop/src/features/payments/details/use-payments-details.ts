import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildPaymentsDetailsItems,
  type PaymentsDetailsItem,
  PAYMENTS_DETAILS_ITEM_COUNT,
} from './payments-details.model';
import {
  filterPaymentsDetails,
  sortPaymentsDetails,
  totalPaymentsDetails,
  type PaymentsDetailsSortKey,
} from './payments-details.utils';

export interface UsePaymentsDetailsOptions {
  itemCount?: number;
  initialSort?: PaymentsDetailsSortKey;
}

export interface UsePaymentsDetailsResult {
  items: PaymentsDetailsItem[];
  allItems: PaymentsDetailsItem[];
  selected: PaymentsDetailsItem | null;
  query: string;
  sortKey: PaymentsDetailsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalPaymentsDetails>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: PaymentsDetailsSortKey) => void;
  refresh: () => void;
}

export function usePaymentsDetails(
  options: UsePaymentsDetailsOptions = {},
): UsePaymentsDetailsResult {
  const { itemCount = PAYMENTS_DETAILS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<PaymentsDetailsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildPaymentsDetailsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortPaymentsDetails(filterPaymentsDetails(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalPaymentsDetails(items), [items]);

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
