import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCheckoutOverviewItems,
  type CheckoutOverviewItem,
  CHECKOUT_OVERVIEW_ITEM_COUNT,
} from './checkout-overview.model';
import {
  filterCheckoutOverview,
  sortCheckoutOverview,
  totalCheckoutOverview,
  type CheckoutOverviewSortKey,
} from './checkout-overview.utils';

export interface UseCheckoutOverviewOptions {
  itemCount?: number;
  initialSort?: CheckoutOverviewSortKey;
}

export interface UseCheckoutOverviewResult {
  items: CheckoutOverviewItem[];
  allItems: CheckoutOverviewItem[];
  selected: CheckoutOverviewItem | null;
  query: string;
  sortKey: CheckoutOverviewSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCheckoutOverview>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CheckoutOverviewSortKey) => void;
  refresh: () => void;
}

export function useCheckoutOverview(
  options: UseCheckoutOverviewOptions = {},
): UseCheckoutOverviewResult {
  const { itemCount = CHECKOUT_OVERVIEW_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CheckoutOverviewSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCheckoutOverviewItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortCheckoutOverview(filterCheckoutOverview(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCheckoutOverview(items), [items]);

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
