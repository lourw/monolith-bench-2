import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCheckoutDetailsItems,
  type CheckoutDetailsItem,
  CHECKOUT_DETAILS_ITEM_COUNT,
} from './checkout-details.model';
import {
  filterCheckoutDetails,
  sortCheckoutDetails,
  totalCheckoutDetails,
  type CheckoutDetailsSortKey,
} from './checkout-details.utils';

export interface UseCheckoutDetailsOptions {
  itemCount?: number;
  initialSort?: CheckoutDetailsSortKey;
}

export interface UseCheckoutDetailsResult {
  items: CheckoutDetailsItem[];
  allItems: CheckoutDetailsItem[];
  selected: CheckoutDetailsItem | null;
  query: string;
  sortKey: CheckoutDetailsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCheckoutDetails>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CheckoutDetailsSortKey) => void;
  refresh: () => void;
}

export function useCheckoutDetails(
  options: UseCheckoutDetailsOptions = {},
): UseCheckoutDetailsResult {
  const { itemCount = CHECKOUT_DETAILS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CheckoutDetailsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCheckoutDetailsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortCheckoutDetails(filterCheckoutDetails(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCheckoutDetails(items), [items]);

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
