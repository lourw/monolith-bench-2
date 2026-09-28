import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildPreordersListItems,
  type PreordersListItem,
  PREORDERS_LIST_ITEM_COUNT,
} from './preorders-list.model';
import {
  filterPreordersList,
  sortPreordersList,
  totalPreordersList,
  type PreordersListSortKey,
} from './preorders-list.utils';

export interface UsePreordersListOptions {
  itemCount?: number;
  initialSort?: PreordersListSortKey;
}

export interface UsePreordersListResult {
  items: PreordersListItem[];
  allItems: PreordersListItem[];
  selected: PreordersListItem | null;
  query: string;
  sortKey: PreordersListSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalPreordersList>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: PreordersListSortKey) => void;
  refresh: () => void;
}

export function usePreordersList(
  options: UsePreordersListOptions = {},
): UsePreordersListResult {
  const { itemCount = PREORDERS_LIST_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<PreordersListSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildPreordersListItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortPreordersList(filterPreordersList(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalPreordersList(items), [items]);

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
