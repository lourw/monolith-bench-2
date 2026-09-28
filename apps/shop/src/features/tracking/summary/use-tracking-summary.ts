import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildTrackingSummaryItems,
  type TrackingSummaryItem,
  TRACKING_SUMMARY_ITEM_COUNT,
} from './tracking-summary.model';
import {
  filterTrackingSummary,
  sortTrackingSummary,
  totalTrackingSummary,
  type TrackingSummarySortKey,
} from './tracking-summary.utils';

export interface UseTrackingSummaryOptions {
  itemCount?: number;
  initialSort?: TrackingSummarySortKey;
}

export interface UseTrackingSummaryResult {
  items: TrackingSummaryItem[];
  allItems: TrackingSummaryItem[];
  selected: TrackingSummaryItem | null;
  query: string;
  sortKey: TrackingSummarySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalTrackingSummary>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: TrackingSummarySortKey) => void;
  refresh: () => void;
}

export function useTrackingSummary(
  options: UseTrackingSummaryOptions = {},
): UseTrackingSummaryResult {
  const { itemCount = TRACKING_SUMMARY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<TrackingSummarySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildTrackingSummaryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortTrackingSummary(filterTrackingSummary(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalTrackingSummary(items), [items]);

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
