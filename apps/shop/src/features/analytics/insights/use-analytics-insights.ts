import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAnalyticsInsightsItems,
  type AnalyticsInsightsItem,
  ANALYTICS_INSIGHTS_ITEM_COUNT,
} from './analytics-insights.model';
import {
  filterAnalyticsInsights,
  sortAnalyticsInsights,
  totalAnalyticsInsights,
  type AnalyticsInsightsSortKey,
} from './analytics-insights.utils';

export interface UseAnalyticsInsightsOptions {
  itemCount?: number;
  initialSort?: AnalyticsInsightsSortKey;
}

export interface UseAnalyticsInsightsResult {
  items: AnalyticsInsightsItem[];
  allItems: AnalyticsInsightsItem[];
  selected: AnalyticsInsightsItem | null;
  query: string;
  sortKey: AnalyticsInsightsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAnalyticsInsights>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AnalyticsInsightsSortKey) => void;
  refresh: () => void;
}

export function useAnalyticsInsights(
  options: UseAnalyticsInsightsOptions = {},
): UseAnalyticsInsightsResult {
  const { itemCount = ANALYTICS_INSIGHTS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AnalyticsInsightsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAnalyticsInsightsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortAnalyticsInsights(filterAnalyticsInsights(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAnalyticsInsights(items), [items]);

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
