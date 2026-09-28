import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCheckoutSummaryItems,
  type CheckoutSummaryItem,
  CHECKOUT_SUMMARY_ITEM_COUNT,
} from './checkout-summary.model';
import {
  filterCheckoutSummary,
  sortCheckoutSummary,
  totalCheckoutSummary,
  type CheckoutSummarySortKey,
} from './checkout-summary.utils';

export interface UseCheckoutSummaryOptions {
  itemCount?: number;
  initialSort?: CheckoutSummarySortKey;
}

export interface UseCheckoutSummaryResult {
  items: CheckoutSummaryItem[];
  allItems: CheckoutSummaryItem[];
  selected: CheckoutSummaryItem | null;
  query: string;
  sortKey: CheckoutSummarySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCheckoutSummary>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CheckoutSummarySortKey) => void;
  refresh: () => void;
}

export function useCheckoutSummary(
  options: UseCheckoutSummaryOptions = {},
): UseCheckoutSummaryResult {
  const { itemCount = CHECKOUT_SUMMARY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CheckoutSummarySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCheckoutSummaryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortCheckoutSummary(filterCheckoutSummary(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCheckoutSummary(items), [items]);

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
