import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildTrackingInsightsItems,
  type TrackingInsightsItem,
  TRACKING_INSIGHTS_ITEM_COUNT,
} from './tracking-insights.model';
import {
  filterTrackingInsights,
  sortTrackingInsights,
  totalTrackingInsights,
  type TrackingInsightsSortKey,
} from './tracking-insights.utils';

export interface UseTrackingInsightsOptions {
  itemCount?: number;
  initialSort?: TrackingInsightsSortKey;
}

export interface UseTrackingInsightsResult {
  items: TrackingInsightsItem[];
  allItems: TrackingInsightsItem[];
  selected: TrackingInsightsItem | null;
  query: string;
  sortKey: TrackingInsightsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalTrackingInsights>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: TrackingInsightsSortKey) => void;
  refresh: () => void;
}

export function useTrackingInsights(
  options: UseTrackingInsightsOptions = {},
): UseTrackingInsightsResult {
  const { itemCount = TRACKING_INSIGHTS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<TrackingInsightsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildTrackingInsightsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortTrackingInsights(filterTrackingInsights(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalTrackingInsights(items), [items]);

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
