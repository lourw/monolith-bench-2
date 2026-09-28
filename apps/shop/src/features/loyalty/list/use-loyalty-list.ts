import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildLoyaltyListItems,
  type LoyaltyListItem,
  LOYALTY_LIST_ITEM_COUNT,
} from './loyalty-list.model';
import {
  filterLoyaltyList,
  sortLoyaltyList,
  totalLoyaltyList,
  type LoyaltyListSortKey,
} from './loyalty-list.utils';

export interface UseLoyaltyListOptions {
  itemCount?: number;
  initialSort?: LoyaltyListSortKey;
}

export interface UseLoyaltyListResult {
  items: LoyaltyListItem[];
  allItems: LoyaltyListItem[];
  selected: LoyaltyListItem | null;
  query: string;
  sortKey: LoyaltyListSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalLoyaltyList>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: LoyaltyListSortKey) => void;
  refresh: () => void;
}

export function useLoyaltyList(
  options: UseLoyaltyListOptions = {},
): UseLoyaltyListResult {
  const { itemCount = LOYALTY_LIST_ITEM_COUNT, initialSort = 'name' } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<LoyaltyListSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildLoyaltyListItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortLoyaltyList(filterLoyaltyList(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalLoyaltyList(items), [items]);

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
