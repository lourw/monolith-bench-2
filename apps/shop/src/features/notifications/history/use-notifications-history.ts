import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildNotificationsHistoryItems,
  type NotificationsHistoryItem,
  NOTIFICATIONS_HISTORY_ITEM_COUNT,
} from './notifications-history.model';
import {
  filterNotificationsHistory,
  sortNotificationsHistory,
  totalNotificationsHistory,
  type NotificationsHistorySortKey,
} from './notifications-history.utils';

export interface UseNotificationsHistoryOptions {
  itemCount?: number;
  initialSort?: NotificationsHistorySortKey;
}

export interface UseNotificationsHistoryResult {
  items: NotificationsHistoryItem[];
  allItems: NotificationsHistoryItem[];
  selected: NotificationsHistoryItem | null;
  query: string;
  sortKey: NotificationsHistorySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalNotificationsHistory>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: NotificationsHistorySortKey) => void;
  refresh: () => void;
}

export function useNotificationsHistory(
  options: UseNotificationsHistoryOptions = {},
): UseNotificationsHistoryResult {
  const { itemCount = NOTIFICATIONS_HISTORY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<NotificationsHistorySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildNotificationsHistoryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortNotificationsHistory(
        filterNotificationsHistory(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalNotificationsHistory(items), [items]);

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
