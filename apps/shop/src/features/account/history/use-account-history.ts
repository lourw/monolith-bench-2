import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAccountHistoryItems,
  type AccountHistoryItem,
  ACCOUNT_HISTORY_ITEM_COUNT,
} from './account-history.model';
import {
  filterAccountHistory,
  sortAccountHistory,
  totalAccountHistory,
  type AccountHistorySortKey,
} from './account-history.utils';

export interface UseAccountHistoryOptions {
  itemCount?: number;
  initialSort?: AccountHistorySortKey;
}

export interface UseAccountHistoryResult {
  items: AccountHistoryItem[];
  allItems: AccountHistoryItem[];
  selected: AccountHistoryItem | null;
  query: string;
  sortKey: AccountHistorySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAccountHistory>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AccountHistorySortKey) => void;
  refresh: () => void;
}

export function useAccountHistory(
  options: UseAccountHistoryOptions = {},
): UseAccountHistoryResult {
  const { itemCount = ACCOUNT_HISTORY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AccountHistorySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAccountHistoryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortAccountHistory(filterAccountHistory(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAccountHistory(items), [items]);

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
