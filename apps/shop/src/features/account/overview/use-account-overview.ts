import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAccountOverviewItems,
  type AccountOverviewItem,
  ACCOUNT_OVERVIEW_ITEM_COUNT,
} from './account-overview.model';
import {
  filterAccountOverview,
  sortAccountOverview,
  totalAccountOverview,
  type AccountOverviewSortKey,
} from './account-overview.utils';

export interface UseAccountOverviewOptions {
  itemCount?: number;
  initialSort?: AccountOverviewSortKey;
}

export interface UseAccountOverviewResult {
  items: AccountOverviewItem[];
  allItems: AccountOverviewItem[];
  selected: AccountOverviewItem | null;
  query: string;
  sortKey: AccountOverviewSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAccountOverview>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AccountOverviewSortKey) => void;
  refresh: () => void;
}

export function useAccountOverview(
  options: UseAccountOverviewOptions = {},
): UseAccountOverviewResult {
  const { itemCount = ACCOUNT_OVERVIEW_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AccountOverviewSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAccountOverviewItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortAccountOverview(filterAccountOverview(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAccountOverview(items), [items]);

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
