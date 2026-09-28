import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildLoyaltyHistoryItems,
  type LoyaltyHistoryItem,
  LOYALTY_HISTORY_ITEM_COUNT,
} from './loyalty-history.model';
import {
  filterLoyaltyHistory,
  sortLoyaltyHistory,
  totalLoyaltyHistory,
  type LoyaltyHistorySortKey,
} from './loyalty-history.utils';

export interface UseLoyaltyHistoryOptions {
  itemCount?: number;
  initialSort?: LoyaltyHistorySortKey;
}

export interface UseLoyaltyHistoryResult {
  items: LoyaltyHistoryItem[];
  allItems: LoyaltyHistoryItem[];
  selected: LoyaltyHistoryItem | null;
  query: string;
  sortKey: LoyaltyHistorySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalLoyaltyHistory>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: LoyaltyHistorySortKey) => void;
  refresh: () => void;
}

export function useLoyaltyHistory(
  options: UseLoyaltyHistoryOptions = {},
): UseLoyaltyHistoryResult {
  const { itemCount = LOYALTY_HISTORY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<LoyaltyHistorySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildLoyaltyHistoryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortLoyaltyHistory(filterLoyaltyHistory(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalLoyaltyHistory(items), [items]);

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
