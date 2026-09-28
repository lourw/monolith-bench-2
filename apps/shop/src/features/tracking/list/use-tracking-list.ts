import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildTrackingListItems,
  type TrackingListItem,
  TRACKING_LIST_ITEM_COUNT,
} from './tracking-list.model';
import {
  filterTrackingList,
  sortTrackingList,
  totalTrackingList,
  type TrackingListSortKey,
} from './tracking-list.utils';

export interface UseTrackingListOptions {
  itemCount?: number;
  initialSort?: TrackingListSortKey;
}

export interface UseTrackingListResult {
  items: TrackingListItem[];
  allItems: TrackingListItem[];
  selected: TrackingListItem | null;
  query: string;
  sortKey: TrackingListSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalTrackingList>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: TrackingListSortKey) => void;
  refresh: () => void;
}

export function useTrackingList(
  options: UseTrackingListOptions = {},
): UseTrackingListResult {
  const { itemCount = TRACKING_LIST_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<TrackingListSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildTrackingListItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortTrackingList(filterTrackingList(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalTrackingList(items), [items]);

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
