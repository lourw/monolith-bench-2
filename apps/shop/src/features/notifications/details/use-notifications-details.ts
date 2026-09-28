import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildNotificationsDetailsItems,
  type NotificationsDetailsItem,
  NOTIFICATIONS_DETAILS_ITEM_COUNT,
} from './notifications-details.model';
import {
  filterNotificationsDetails,
  sortNotificationsDetails,
  totalNotificationsDetails,
  type NotificationsDetailsSortKey,
} from './notifications-details.utils';

export interface UseNotificationsDetailsOptions {
  itemCount?: number;
  initialSort?: NotificationsDetailsSortKey;
}

export interface UseNotificationsDetailsResult {
  items: NotificationsDetailsItem[];
  allItems: NotificationsDetailsItem[];
  selected: NotificationsDetailsItem | null;
  query: string;
  sortKey: NotificationsDetailsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalNotificationsDetails>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: NotificationsDetailsSortKey) => void;
  refresh: () => void;
}

export function useNotificationsDetails(
  options: UseNotificationsDetailsOptions = {},
): UseNotificationsDetailsResult {
  const { itemCount = NOTIFICATIONS_DETAILS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<NotificationsDetailsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildNotificationsDetailsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortNotificationsDetails(
        filterNotificationsDetails(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalNotificationsDetails(items), [items]);

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
