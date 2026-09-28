import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildShippingListItems,
  type ShippingListItem,
  SHIPPING_LIST_ITEM_COUNT,
} from './shipping-list.model';
import {
  filterShippingList,
  sortShippingList,
  totalShippingList,
  type ShippingListSortKey,
} from './shipping-list.utils';

export interface UseShippingListOptions {
  itemCount?: number;
  initialSort?: ShippingListSortKey;
}

export interface UseShippingListResult {
  items: ShippingListItem[];
  allItems: ShippingListItem[];
  selected: ShippingListItem | null;
  query: string;
  sortKey: ShippingListSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalShippingList>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ShippingListSortKey) => void;
  refresh: () => void;
}

export function useShippingList(
  options: UseShippingListOptions = {},
): UseShippingListResult {
  const { itemCount = SHIPPING_LIST_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ShippingListSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildShippingListItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortShippingList(filterShippingList(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalShippingList(items), [items]);

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
