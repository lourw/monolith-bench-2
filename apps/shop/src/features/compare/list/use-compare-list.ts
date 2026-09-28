import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCompareListItems,
  type CompareListItem,
  COMPARE_LIST_ITEM_COUNT,
} from './compare-list.model';
import {
  filterCompareList,
  sortCompareList,
  totalCompareList,
  type CompareListSortKey,
} from './compare-list.utils';

export interface UseCompareListOptions {
  itemCount?: number;
  initialSort?: CompareListSortKey;
}

export interface UseCompareListResult {
  items: CompareListItem[];
  allItems: CompareListItem[];
  selected: CompareListItem | null;
  query: string;
  sortKey: CompareListSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCompareList>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CompareListSortKey) => void;
  refresh: () => void;
}

export function useCompareList(
  options: UseCompareListOptions = {},
): UseCompareListResult {
  const { itemCount = COMPARE_LIST_ITEM_COUNT, initialSort = 'name' } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CompareListSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCompareListItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortCompareList(filterCompareList(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCompareList(items), [items]);

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
