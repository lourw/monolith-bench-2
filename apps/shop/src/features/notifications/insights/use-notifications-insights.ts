import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildNotificationsInsightsItems,
  type NotificationsInsightsItem,
  NOTIFICATIONS_INSIGHTS_ITEM_COUNT,
} from './notifications-insights.model';
import {
  filterNotificationsInsights,
  sortNotificationsInsights,
  totalNotificationsInsights,
  type NotificationsInsightsSortKey,
} from './notifications-insights.utils';

export interface UseNotificationsInsightsOptions {
  itemCount?: number;
  initialSort?: NotificationsInsightsSortKey;
}

export interface UseNotificationsInsightsResult {
  items: NotificationsInsightsItem[];
  allItems: NotificationsInsightsItem[];
  selected: NotificationsInsightsItem | null;
  query: string;
  sortKey: NotificationsInsightsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalNotificationsInsights>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: NotificationsInsightsSortKey) => void;
  refresh: () => void;
}

export function useNotificationsInsights(
  options: UseNotificationsInsightsOptions = {},
): UseNotificationsInsightsResult {
  const {
    itemCount = NOTIFICATIONS_INSIGHTS_ITEM_COUNT,
    initialSort = 'name',
  } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<NotificationsInsightsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildNotificationsInsightsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortNotificationsInsights(
        filterNotificationsInsights(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalNotificationsInsights(items), [items]);

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
