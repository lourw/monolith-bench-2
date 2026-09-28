import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAddressesDetailsItems,
  type AddressesDetailsItem,
  ADDRESSES_DETAILS_ITEM_COUNT,
} from './addresses-details.model';
import {
  filterAddressesDetails,
  sortAddressesDetails,
  totalAddressesDetails,
  type AddressesDetailsSortKey,
} from './addresses-details.utils';

export interface UseAddressesDetailsOptions {
  itemCount?: number;
  initialSort?: AddressesDetailsSortKey;
}

export interface UseAddressesDetailsResult {
  items: AddressesDetailsItem[];
  allItems: AddressesDetailsItem[];
  selected: AddressesDetailsItem | null;
  query: string;
  sortKey: AddressesDetailsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAddressesDetails>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AddressesDetailsSortKey) => void;
  refresh: () => void;
}

export function useAddressesDetails(
  options: UseAddressesDetailsOptions = {},
): UseAddressesDetailsResult {
  const { itemCount = ADDRESSES_DETAILS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AddressesDetailsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAddressesDetailsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortAddressesDetails(filterAddressesDetails(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAddressesDetails(items), [items]);

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
