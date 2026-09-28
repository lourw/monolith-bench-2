import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildShippingHistoryItems,
  type ShippingHistoryItem,
  SHIPPING_HISTORY_ITEM_COUNT,
} from './shipping-history.model';
import {
  filterShippingHistory,
  sortShippingHistory,
  totalShippingHistory,
  type ShippingHistorySortKey,
} from './shipping-history.utils';

export interface UseShippingHistoryOptions {
  itemCount?: number;
  initialSort?: ShippingHistorySortKey;
}

export interface UseShippingHistoryResult {
  items: ShippingHistoryItem[];
  allItems: ShippingHistoryItem[];
  selected: ShippingHistoryItem | null;
  query: string;
  sortKey: ShippingHistorySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalShippingHistory>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ShippingHistorySortKey) => void;
  refresh: () => void;
}

export function useShippingHistory(
  options: UseShippingHistoryOptions = {},
): UseShippingHistoryResult {
  const { itemCount = SHIPPING_HISTORY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ShippingHistorySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildShippingHistoryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortShippingHistory(filterShippingHistory(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalShippingHistory(items), [items]);

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
