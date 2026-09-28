import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildReturnsListItems,
  type ReturnsListItem,
  RETURNS_LIST_ITEM_COUNT,
} from './returns-list.model';
import {
  filterReturnsList,
  sortReturnsList,
  totalReturnsList,
  type ReturnsListSortKey,
} from './returns-list.utils';

export interface UseReturnsListOptions {
  itemCount?: number;
  initialSort?: ReturnsListSortKey;
}

export interface UseReturnsListResult {
  items: ReturnsListItem[];
  allItems: ReturnsListItem[];
  selected: ReturnsListItem | null;
  query: string;
  sortKey: ReturnsListSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalReturnsList>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ReturnsListSortKey) => void;
  refresh: () => void;
}

export function useReturnsList(
  options: UseReturnsListOptions = {},
): UseReturnsListResult {
  const { itemCount = RETURNS_LIST_ITEM_COUNT, initialSort = 'name' } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ReturnsListSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildReturnsListItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortReturnsList(filterReturnsList(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalReturnsList(items), [items]);

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
