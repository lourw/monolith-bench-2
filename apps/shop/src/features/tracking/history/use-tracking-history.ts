import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildTrackingHistoryItems,
  type TrackingHistoryItem,
  TRACKING_HISTORY_ITEM_COUNT,
} from './tracking-history.model';
import {
  filterTrackingHistory,
  sortTrackingHistory,
  totalTrackingHistory,
  type TrackingHistorySortKey,
} from './tracking-history.utils';

export interface UseTrackingHistoryOptions {
  itemCount?: number;
  initialSort?: TrackingHistorySortKey;
}

export interface UseTrackingHistoryResult {
  items: TrackingHistoryItem[];
  allItems: TrackingHistoryItem[];
  selected: TrackingHistoryItem | null;
  query: string;
  sortKey: TrackingHistorySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalTrackingHistory>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: TrackingHistorySortKey) => void;
  refresh: () => void;
}

export function useTrackingHistory(
  options: UseTrackingHistoryOptions = {},
): UseTrackingHistoryResult {
  const { itemCount = TRACKING_HISTORY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<TrackingHistorySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildTrackingHistoryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortTrackingHistory(filterTrackingHistory(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalTrackingHistory(items), [items]);

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
