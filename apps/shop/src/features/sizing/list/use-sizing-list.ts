import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSizingListItems,
  type SizingListItem,
  SIZING_LIST_ITEM_COUNT,
} from './sizing-list.model';
import {
  filterSizingList,
  sortSizingList,
  totalSizingList,
  type SizingListSortKey,
} from './sizing-list.utils';

export interface UseSizingListOptions {
  itemCount?: number;
  initialSort?: SizingListSortKey;
}

export interface UseSizingListResult {
  items: SizingListItem[];
  allItems: SizingListItem[];
  selected: SizingListItem | null;
  query: string;
  sortKey: SizingListSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSizingList>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SizingListSortKey) => void;
  refresh: () => void;
}

export function useSizingList(
  options: UseSizingListOptions = {},
): UseSizingListResult {
  const { itemCount = SIZING_LIST_ITEM_COUNT, initialSort = 'name' } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SizingListSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSizingListItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortSizingList(filterSizingList(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSizingList(items), [items]);

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
