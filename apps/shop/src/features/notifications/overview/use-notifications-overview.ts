import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildNotificationsOverviewItems,
  type NotificationsOverviewItem,
  NOTIFICATIONS_OVERVIEW_ITEM_COUNT,
} from './notifications-overview.model';
import {
  filterNotificationsOverview,
  sortNotificationsOverview,
  totalNotificationsOverview,
  type NotificationsOverviewSortKey,
} from './notifications-overview.utils';

export interface UseNotificationsOverviewOptions {
  itemCount?: number;
  initialSort?: NotificationsOverviewSortKey;
}

export interface UseNotificationsOverviewResult {
  items: NotificationsOverviewItem[];
  allItems: NotificationsOverviewItem[];
  selected: NotificationsOverviewItem | null;
  query: string;
  sortKey: NotificationsOverviewSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalNotificationsOverview>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: NotificationsOverviewSortKey) => void;
  refresh: () => void;
}

export function useNotificationsOverview(
  options: UseNotificationsOverviewOptions = {},
): UseNotificationsOverviewResult {
  const {
    itemCount = NOTIFICATIONS_OVERVIEW_ITEM_COUNT,
    initialSort = 'name',
  } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<NotificationsOverviewSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildNotificationsOverviewItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortNotificationsOverview(
        filterNotificationsOverview(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalNotificationsOverview(items), [items]);

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
