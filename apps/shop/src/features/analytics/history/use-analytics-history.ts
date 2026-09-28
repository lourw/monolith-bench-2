import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAnalyticsHistoryItems,
  type AnalyticsHistoryItem,
  ANALYTICS_HISTORY_ITEM_COUNT,
} from './analytics-history.model';
import {
  filterAnalyticsHistory,
  sortAnalyticsHistory,
  totalAnalyticsHistory,
  type AnalyticsHistorySortKey,
} from './analytics-history.utils';

export interface UseAnalyticsHistoryOptions {
  itemCount?: number;
  initialSort?: AnalyticsHistorySortKey;
}

export interface UseAnalyticsHistoryResult {
  items: AnalyticsHistoryItem[];
  allItems: AnalyticsHistoryItem[];
  selected: AnalyticsHistoryItem | null;
  query: string;
  sortKey: AnalyticsHistorySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAnalyticsHistory>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AnalyticsHistorySortKey) => void;
  refresh: () => void;
}

export function useAnalyticsHistory(
  options: UseAnalyticsHistoryOptions = {},
): UseAnalyticsHistoryResult {
  const { itemCount = ANALYTICS_HISTORY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AnalyticsHistorySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAnalyticsHistoryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortAnalyticsHistory(filterAnalyticsHistory(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAnalyticsHistory(items), [items]);

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
