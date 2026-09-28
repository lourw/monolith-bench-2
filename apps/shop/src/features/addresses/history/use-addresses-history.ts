import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAddressesHistoryItems,
  type AddressesHistoryItem,
  ADDRESSES_HISTORY_ITEM_COUNT,
} from './addresses-history.model';
import {
  filterAddressesHistory,
  sortAddressesHistory,
  totalAddressesHistory,
  type AddressesHistorySortKey,
} from './addresses-history.utils';

export interface UseAddressesHistoryOptions {
  itemCount?: number;
  initialSort?: AddressesHistorySortKey;
}

export interface UseAddressesHistoryResult {
  items: AddressesHistoryItem[];
  allItems: AddressesHistoryItem[];
  selected: AddressesHistoryItem | null;
  query: string;
  sortKey: AddressesHistorySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAddressesHistory>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AddressesHistorySortKey) => void;
  refresh: () => void;
}

export function useAddressesHistory(
  options: UseAddressesHistoryOptions = {},
): UseAddressesHistoryResult {
  const { itemCount = ADDRESSES_HISTORY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AddressesHistorySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAddressesHistoryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortAddressesHistory(filterAddressesHistory(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAddressesHistory(items), [items]);

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
