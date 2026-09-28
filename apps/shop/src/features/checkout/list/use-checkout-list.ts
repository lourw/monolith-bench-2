import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCheckoutListItems,
  type CheckoutListItem,
  CHECKOUT_LIST_ITEM_COUNT,
} from './checkout-list.model';
import {
  filterCheckoutList,
  sortCheckoutList,
  totalCheckoutList,
  type CheckoutListSortKey,
} from './checkout-list.utils';

export interface UseCheckoutListOptions {
  itemCount?: number;
  initialSort?: CheckoutListSortKey;
}

export interface UseCheckoutListResult {
  items: CheckoutListItem[];
  allItems: CheckoutListItem[];
  selected: CheckoutListItem | null;
  query: string;
  sortKey: CheckoutListSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCheckoutList>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CheckoutListSortKey) => void;
  refresh: () => void;
}

export function useCheckoutList(
  options: UseCheckoutListOptions = {},
): UseCheckoutListResult {
  const { itemCount = CHECKOUT_LIST_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CheckoutListSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCheckoutListItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortCheckoutList(filterCheckoutList(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCheckoutList(items), [items]);

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
