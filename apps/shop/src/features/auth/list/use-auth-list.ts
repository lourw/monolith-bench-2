import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAuthListItems,
  type AuthListItem,
  AUTH_LIST_ITEM_COUNT,
} from './auth-list.model';
import {
  filterAuthList,
  sortAuthList,
  totalAuthList,
  type AuthListSortKey,
} from './auth-list.utils';

export interface UseAuthListOptions {
  itemCount?: number;
  initialSort?: AuthListSortKey;
}

export interface UseAuthListResult {
  items: AuthListItem[];
  allItems: AuthListItem[];
  selected: AuthListItem | null;
  query: string;
  sortKey: AuthListSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAuthList>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AuthListSortKey) => void;
  refresh: () => void;
}

export function useAuthList(
  options: UseAuthListOptions = {},
): UseAuthListResult {
  const { itemCount = AUTH_LIST_ITEM_COUNT, initialSort = 'name' } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AuthListSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAuthListItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortAuthList(filterAuthList(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAuthList(items), [items]);

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
