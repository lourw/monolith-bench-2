import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildLoyaltyDetailsItems,
  type LoyaltyDetailsItem,
  LOYALTY_DETAILS_ITEM_COUNT,
} from './loyalty-details.model';
import {
  filterLoyaltyDetails,
  sortLoyaltyDetails,
  totalLoyaltyDetails,
  type LoyaltyDetailsSortKey,
} from './loyalty-details.utils';

export interface UseLoyaltyDetailsOptions {
  itemCount?: number;
  initialSort?: LoyaltyDetailsSortKey;
}

export interface UseLoyaltyDetailsResult {
  items: LoyaltyDetailsItem[];
  allItems: LoyaltyDetailsItem[];
  selected: LoyaltyDetailsItem | null;
  query: string;
  sortKey: LoyaltyDetailsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalLoyaltyDetails>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: LoyaltyDetailsSortKey) => void;
  refresh: () => void;
}

export function useLoyaltyDetails(
  options: UseLoyaltyDetailsOptions = {},
): UseLoyaltyDetailsResult {
  const { itemCount = LOYALTY_DETAILS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<LoyaltyDetailsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildLoyaltyDetailsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortLoyaltyDetails(filterLoyaltyDetails(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalLoyaltyDetails(items), [items]);

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
