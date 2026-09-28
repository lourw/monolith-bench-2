import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAccountListItems,
  type AccountListItem,
  ACCOUNT_LIST_ITEM_COUNT,
} from './account-list.model';
import {
  filterAccountList,
  sortAccountList,
  totalAccountList,
  type AccountListSortKey,
} from './account-list.utils';

export interface UseAccountListOptions {
  itemCount?: number;
  initialSort?: AccountListSortKey;
}

export interface UseAccountListResult {
  items: AccountListItem[];
  allItems: AccountListItem[];
  selected: AccountListItem | null;
  query: string;
  sortKey: AccountListSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAccountList>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AccountListSortKey) => void;
  refresh: () => void;
}

export function useAccountList(
  options: UseAccountListOptions = {},
): UseAccountListResult {
  const { itemCount = ACCOUNT_LIST_ITEM_COUNT, initialSort = 'name' } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AccountListSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAccountListItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortAccountList(filterAccountList(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAccountList(items), [items]);

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
