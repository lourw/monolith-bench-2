import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCheckoutHistoryItems,
  type CheckoutHistoryItem,
  CHECKOUT_HISTORY_ITEM_COUNT,
} from './checkout-history.model';
import {
  filterCheckoutHistory,
  sortCheckoutHistory,
  totalCheckoutHistory,
  type CheckoutHistorySortKey,
} from './checkout-history.utils';

export interface UseCheckoutHistoryOptions {
  itemCount?: number;
  initialSort?: CheckoutHistorySortKey;
}

export interface UseCheckoutHistoryResult {
  items: CheckoutHistoryItem[];
  allItems: CheckoutHistoryItem[];
  selected: CheckoutHistoryItem | null;
  query: string;
  sortKey: CheckoutHistorySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCheckoutHistory>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CheckoutHistorySortKey) => void;
  refresh: () => void;
}

export function useCheckoutHistory(
  options: UseCheckoutHistoryOptions = {},
): UseCheckoutHistoryResult {
  const { itemCount = CHECKOUT_HISTORY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CheckoutHistorySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCheckoutHistoryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortCheckoutHistory(filterCheckoutHistory(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCheckoutHistory(items), [items]);

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
