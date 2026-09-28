import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAddressesInsightsItems,
  type AddressesInsightsItem,
  ADDRESSES_INSIGHTS_ITEM_COUNT,
} from './addresses-insights.model';
import {
  filterAddressesInsights,
  sortAddressesInsights,
  totalAddressesInsights,
  type AddressesInsightsSortKey,
} from './addresses-insights.utils';

export interface UseAddressesInsightsOptions {
  itemCount?: number;
  initialSort?: AddressesInsightsSortKey;
}

export interface UseAddressesInsightsResult {
  items: AddressesInsightsItem[];
  allItems: AddressesInsightsItem[];
  selected: AddressesInsightsItem | null;
  query: string;
  sortKey: AddressesInsightsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAddressesInsights>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AddressesInsightsSortKey) => void;
  refresh: () => void;
}

export function useAddressesInsights(
  options: UseAddressesInsightsOptions = {},
): UseAddressesInsightsResult {
  const { itemCount = ADDRESSES_INSIGHTS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AddressesInsightsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAddressesInsightsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortAddressesInsights(filterAddressesInsights(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAddressesInsights(items), [items]);

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
