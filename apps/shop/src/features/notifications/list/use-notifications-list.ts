import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildNotificationsListItems,
  type NotificationsListItem,
  NOTIFICATIONS_LIST_ITEM_COUNT,
} from './notifications-list.model';
import {
  filterNotificationsList,
  sortNotificationsList,
  totalNotificationsList,
  type NotificationsListSortKey,
} from './notifications-list.utils';

export interface UseNotificationsListOptions {
  itemCount?: number;
  initialSort?: NotificationsListSortKey;
}

export interface UseNotificationsListResult {
  items: NotificationsListItem[];
  allItems: NotificationsListItem[];
  selected: NotificationsListItem | null;
  query: string;
  sortKey: NotificationsListSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalNotificationsList>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: NotificationsListSortKey) => void;
  refresh: () => void;
}

export function useNotificationsList(
  options: UseNotificationsListOptions = {},
): UseNotificationsListResult {
  const { itemCount = NOTIFICATIONS_LIST_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<NotificationsListSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildNotificationsListItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortNotificationsList(filterNotificationsList(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalNotificationsList(items), [items]);

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
