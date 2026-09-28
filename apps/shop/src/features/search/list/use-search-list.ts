import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSearchListItems,
  type SearchListItem,
  SEARCH_LIST_ITEM_COUNT,
} from './search-list.model';
import {
  filterSearchList,
  sortSearchList,
  totalSearchList,
  type SearchListSortKey,
} from './search-list.utils';

export interface UseSearchListOptions {
  itemCount?: number;
  initialSort?: SearchListSortKey;
}

export interface UseSearchListResult {
  items: SearchListItem[];
  allItems: SearchListItem[];
  selected: SearchListItem | null;
  query: string;
  sortKey: SearchListSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSearchList>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SearchListSortKey) => void;
  refresh: () => void;
}

export function useSearchList(
  options: UseSearchListOptions = {},
): UseSearchListResult {
  const { itemCount = SEARCH_LIST_ITEM_COUNT, initialSort = 'name' } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SearchListSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSearchListItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortSearchList(filterSearchList(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSearchList(items), [items]);

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
