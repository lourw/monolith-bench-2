import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAnalyticsOverviewItems,
  type AnalyticsOverviewItem,
  ANALYTICS_OVERVIEW_ITEM_COUNT,
} from './analytics-overview.model';
import {
  filterAnalyticsOverview,
  sortAnalyticsOverview,
  totalAnalyticsOverview,
  type AnalyticsOverviewSortKey,
} from './analytics-overview.utils';

export interface UseAnalyticsOverviewOptions {
  itemCount?: number;
  initialSort?: AnalyticsOverviewSortKey;
}

export interface UseAnalyticsOverviewResult {
  items: AnalyticsOverviewItem[];
  allItems: AnalyticsOverviewItem[];
  selected: AnalyticsOverviewItem | null;
  query: string;
  sortKey: AnalyticsOverviewSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAnalyticsOverview>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AnalyticsOverviewSortKey) => void;
  refresh: () => void;
}

export function useAnalyticsOverview(
  options: UseAnalyticsOverviewOptions = {},
): UseAnalyticsOverviewResult {
  const { itemCount = ANALYTICS_OVERVIEW_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AnalyticsOverviewSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAnalyticsOverviewItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortAnalyticsOverview(filterAnalyticsOverview(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAnalyticsOverview(items), [items]);

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
