import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildOrdersSummaryItems,
  type OrdersSummaryItem,
  ORDERS_SUMMARY_ITEM_COUNT,
} from './orders-summary.model';
import {
  filterOrdersSummary,
  sortOrdersSummary,
  totalOrdersSummary,
  type OrdersSummarySortKey,
} from './orders-summary.utils';

export interface UseOrdersSummaryOptions {
  itemCount?: number;
  initialSort?: OrdersSummarySortKey;
}

export interface UseOrdersSummaryResult {
  items: OrdersSummaryItem[];
  allItems: OrdersSummaryItem[];
  selected: OrdersSummaryItem | null;
  query: string;
  sortKey: OrdersSummarySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalOrdersSummary>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: OrdersSummarySortKey) => void;
  refresh: () => void;
}

export function useOrdersSummary(
  options: UseOrdersSummaryOptions = {},
): UseOrdersSummaryResult {
  const { itemCount = ORDERS_SUMMARY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<OrdersSummarySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildOrdersSummaryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortOrdersSummary(filterOrdersSummary(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalOrdersSummary(items), [items]);

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
