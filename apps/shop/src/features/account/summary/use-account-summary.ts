import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAccountSummaryItems,
  type AccountSummaryItem,
  ACCOUNT_SUMMARY_ITEM_COUNT,
} from './account-summary.model';
import {
  filterAccountSummary,
  sortAccountSummary,
  totalAccountSummary,
  type AccountSummarySortKey,
} from './account-summary.utils';

export interface UseAccountSummaryOptions {
  itemCount?: number;
  initialSort?: AccountSummarySortKey;
}

export interface UseAccountSummaryResult {
  items: AccountSummaryItem[];
  allItems: AccountSummaryItem[];
  selected: AccountSummaryItem | null;
  query: string;
  sortKey: AccountSummarySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAccountSummary>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AccountSummarySortKey) => void;
  refresh: () => void;
}

export function useAccountSummary(
  options: UseAccountSummaryOptions = {},
): UseAccountSummaryResult {
  const { itemCount = ACCOUNT_SUMMARY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AccountSummarySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAccountSummaryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortAccountSummary(filterAccountSummary(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAccountSummary(items), [items]);

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
