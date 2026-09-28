import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildShippingSummaryItems,
  type ShippingSummaryItem,
  SHIPPING_SUMMARY_ITEM_COUNT,
} from './shipping-summary.model';
import {
  filterShippingSummary,
  sortShippingSummary,
  totalShippingSummary,
  type ShippingSummarySortKey,
} from './shipping-summary.utils';

export interface UseShippingSummaryOptions {
  itemCount?: number;
  initialSort?: ShippingSummarySortKey;
}

export interface UseShippingSummaryResult {
  items: ShippingSummaryItem[];
  allItems: ShippingSummaryItem[];
  selected: ShippingSummaryItem | null;
  query: string;
  sortKey: ShippingSummarySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalShippingSummary>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ShippingSummarySortKey) => void;
  refresh: () => void;
}

export function useShippingSummary(
  options: UseShippingSummaryOptions = {},
): UseShippingSummaryResult {
  const { itemCount = SHIPPING_SUMMARY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ShippingSummarySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildShippingSummaryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortShippingSummary(filterShippingSummary(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalShippingSummary(items), [items]);

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
