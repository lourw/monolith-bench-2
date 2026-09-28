import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSupportListItems,
  type SupportListItem,
  SUPPORT_LIST_ITEM_COUNT,
} from './support-list.model';
import {
  filterSupportList,
  sortSupportList,
  totalSupportList,
  type SupportListSortKey,
} from './support-list.utils';

export interface UseSupportListOptions {
  itemCount?: number;
  initialSort?: SupportListSortKey;
}

export interface UseSupportListResult {
  items: SupportListItem[];
  allItems: SupportListItem[];
  selected: SupportListItem | null;
  query: string;
  sortKey: SupportListSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSupportList>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SupportListSortKey) => void;
  refresh: () => void;
}

export function useSupportList(
  options: UseSupportListOptions = {},
): UseSupportListResult {
  const { itemCount = SUPPORT_LIST_ITEM_COUNT, initialSort = 'name' } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SupportListSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSupportListItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortSupportList(filterSupportList(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSupportList(items), [items]);

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
