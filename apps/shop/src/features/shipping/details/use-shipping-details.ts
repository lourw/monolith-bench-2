import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildShippingDetailsItems,
  type ShippingDetailsItem,
  SHIPPING_DETAILS_ITEM_COUNT,
} from './shipping-details.model';
import {
  filterShippingDetails,
  sortShippingDetails,
  totalShippingDetails,
  type ShippingDetailsSortKey,
} from './shipping-details.utils';

export interface UseShippingDetailsOptions {
  itemCount?: number;
  initialSort?: ShippingDetailsSortKey;
}

export interface UseShippingDetailsResult {
  items: ShippingDetailsItem[];
  allItems: ShippingDetailsItem[];
  selected: ShippingDetailsItem | null;
  query: string;
  sortKey: ShippingDetailsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalShippingDetails>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ShippingDetailsSortKey) => void;
  refresh: () => void;
}

export function useShippingDetails(
  options: UseShippingDetailsOptions = {},
): UseShippingDetailsResult {
  const { itemCount = SHIPPING_DETAILS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ShippingDetailsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildShippingDetailsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortShippingDetails(filterShippingDetails(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalShippingDetails(items), [items]);

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
