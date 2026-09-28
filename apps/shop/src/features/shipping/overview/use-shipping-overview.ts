import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildShippingOverviewItems,
  type ShippingOverviewItem,
  SHIPPING_OVERVIEW_ITEM_COUNT,
} from './shipping-overview.model';
import {
  filterShippingOverview,
  sortShippingOverview,
  totalShippingOverview,
  type ShippingOverviewSortKey,
} from './shipping-overview.utils';

export interface UseShippingOverviewOptions {
  itemCount?: number;
  initialSort?: ShippingOverviewSortKey;
}

export interface UseShippingOverviewResult {
  items: ShippingOverviewItem[];
  allItems: ShippingOverviewItem[];
  selected: ShippingOverviewItem | null;
  query: string;
  sortKey: ShippingOverviewSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalShippingOverview>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ShippingOverviewSortKey) => void;
  refresh: () => void;
}

export function useShippingOverview(
  options: UseShippingOverviewOptions = {},
): UseShippingOverviewResult {
  const { itemCount = SHIPPING_OVERVIEW_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ShippingOverviewSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildShippingOverviewItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortShippingOverview(filterShippingOverview(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalShippingOverview(items), [items]);

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
