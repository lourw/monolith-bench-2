import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildNotificationsDashboardItems,
  type NotificationsDashboardItem,
  NOTIFICATIONS_DASHBOARD_ITEM_COUNT,
} from './notifications-dashboard.model';
import {
  filterNotificationsDashboard,
  sortNotificationsDashboard,
  totalNotificationsDashboard,
  type NotificationsDashboardSortKey,
} from './notifications-dashboard.utils';

export interface UseNotificationsDashboardOptions {
  itemCount?: number;
  initialSort?: NotificationsDashboardSortKey;
}

export interface UseNotificationsDashboardResult {
  items: NotificationsDashboardItem[];
  allItems: NotificationsDashboardItem[];
  selected: NotificationsDashboardItem | null;
  query: string;
  sortKey: NotificationsDashboardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalNotificationsDashboard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: NotificationsDashboardSortKey) => void;
  refresh: () => void;
}

export function useNotificationsDashboard(
  options: UseNotificationsDashboardOptions = {},
): UseNotificationsDashboardResult {
  const {
    itemCount = NOTIFICATIONS_DASHBOARD_ITEM_COUNT,
    initialSort = 'name',
  } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<NotificationsDashboardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildNotificationsDashboardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortNotificationsDashboard(
        filterNotificationsDashboard(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalNotificationsDashboard(items), [items]);

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
