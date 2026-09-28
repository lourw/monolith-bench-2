import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildPaymentsSummaryItems,
  type PaymentsSummaryItem,
  PAYMENTS_SUMMARY_ITEM_COUNT,
} from './payments-summary.model';
import {
  filterPaymentsSummary,
  sortPaymentsSummary,
  totalPaymentsSummary,
  type PaymentsSummarySortKey,
} from './payments-summary.utils';

export interface UsePaymentsSummaryOptions {
  itemCount?: number;
  initialSort?: PaymentsSummarySortKey;
}

export interface UsePaymentsSummaryResult {
  items: PaymentsSummaryItem[];
  allItems: PaymentsSummaryItem[];
  selected: PaymentsSummaryItem | null;
  query: string;
  sortKey: PaymentsSummarySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalPaymentsSummary>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: PaymentsSummarySortKey) => void;
  refresh: () => void;
}

export function usePaymentsSummary(
  options: UsePaymentsSummaryOptions = {},
): UsePaymentsSummaryResult {
  const { itemCount = PAYMENTS_SUMMARY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<PaymentsSummarySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildPaymentsSummaryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortPaymentsSummary(filterPaymentsSummary(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalPaymentsSummary(items), [items]);

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
