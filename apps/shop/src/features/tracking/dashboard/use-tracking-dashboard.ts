import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildTrackingDashboardItems,
  type TrackingDashboardItem,
  TRACKING_DASHBOARD_ITEM_COUNT,
} from './tracking-dashboard.model';
import {
  filterTrackingDashboard,
  sortTrackingDashboard,
  totalTrackingDashboard,
  type TrackingDashboardSortKey,
} from './tracking-dashboard.utils';

export interface UseTrackingDashboardOptions {
  itemCount?: number;
  initialSort?: TrackingDashboardSortKey;
}

export interface UseTrackingDashboardResult {
  items: TrackingDashboardItem[];
  allItems: TrackingDashboardItem[];
  selected: TrackingDashboardItem | null;
  query: string;
  sortKey: TrackingDashboardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalTrackingDashboard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: TrackingDashboardSortKey) => void;
  refresh: () => void;
}

export function useTrackingDashboard(
  options: UseTrackingDashboardOptions = {},
): UseTrackingDashboardResult {
  const { itemCount = TRACKING_DASHBOARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<TrackingDashboardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildTrackingDashboardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortTrackingDashboard(filterTrackingDashboard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalTrackingDashboard(items), [items]);

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
