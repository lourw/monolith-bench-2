import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAddressesOverviewItems,
  type AddressesOverviewItem,
  ADDRESSES_OVERVIEW_ITEM_COUNT,
} from './addresses-overview.model';
import {
  filterAddressesOverview,
  sortAddressesOverview,
  totalAddressesOverview,
  type AddressesOverviewSortKey,
} from './addresses-overview.utils';

export interface UseAddressesOverviewOptions {
  itemCount?: number;
  initialSort?: AddressesOverviewSortKey;
}

export interface UseAddressesOverviewResult {
  items: AddressesOverviewItem[];
  allItems: AddressesOverviewItem[];
  selected: AddressesOverviewItem | null;
  query: string;
  sortKey: AddressesOverviewSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAddressesOverview>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AddressesOverviewSortKey) => void;
  refresh: () => void;
}

export function useAddressesOverview(
  options: UseAddressesOverviewOptions = {},
): UseAddressesOverviewResult {
  const { itemCount = ADDRESSES_OVERVIEW_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AddressesOverviewSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAddressesOverviewItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortAddressesOverview(filterAddressesOverview(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAddressesOverview(items), [items]);

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
