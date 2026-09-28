import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildTrackingDetailsItems,
  type TrackingDetailsItem,
  TRACKING_DETAILS_ITEM_COUNT,
} from './tracking-details.model';
import {
  filterTrackingDetails,
  sortTrackingDetails,
  totalTrackingDetails,
  type TrackingDetailsSortKey,
} from './tracking-details.utils';

export interface UseTrackingDetailsOptions {
  itemCount?: number;
  initialSort?: TrackingDetailsSortKey;
}

export interface UseTrackingDetailsResult {
  items: TrackingDetailsItem[];
  allItems: TrackingDetailsItem[];
  selected: TrackingDetailsItem | null;
  query: string;
  sortKey: TrackingDetailsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalTrackingDetails>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: TrackingDetailsSortKey) => void;
  refresh: () => void;
}

export function useTrackingDetails(
  options: UseTrackingDetailsOptions = {},
): UseTrackingDetailsResult {
  const { itemCount = TRACKING_DETAILS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<TrackingDetailsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildTrackingDetailsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortTrackingDetails(filterTrackingDetails(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalTrackingDetails(items), [items]);

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
