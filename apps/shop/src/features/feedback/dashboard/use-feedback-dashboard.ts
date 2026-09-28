import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildFeedbackDashboardItems,
  type FeedbackDashboardItem,
  FEEDBACK_DASHBOARD_ITEM_COUNT,
} from './feedback-dashboard.model';
import {
  filterFeedbackDashboard,
  sortFeedbackDashboard,
  totalFeedbackDashboard,
  type FeedbackDashboardSortKey,
} from './feedback-dashboard.utils';

export interface UseFeedbackDashboardOptions {
  itemCount?: number;
  initialSort?: FeedbackDashboardSortKey;
}

export interface UseFeedbackDashboardResult {
  items: FeedbackDashboardItem[];
  allItems: FeedbackDashboardItem[];
  selected: FeedbackDashboardItem | null;
  query: string;
  sortKey: FeedbackDashboardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalFeedbackDashboard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: FeedbackDashboardSortKey) => void;
  refresh: () => void;
}

export function useFeedbackDashboard(
  options: UseFeedbackDashboardOptions = {},
): UseFeedbackDashboardResult {
  const { itemCount = FEEDBACK_DASHBOARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<FeedbackDashboardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildFeedbackDashboardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortFeedbackDashboard(filterFeedbackDashboard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalFeedbackDashboard(items), [items]);

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
