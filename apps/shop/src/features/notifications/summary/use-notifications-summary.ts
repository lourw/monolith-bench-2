import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildNotificationsSummaryItems,
  type NotificationsSummaryItem,
  NOTIFICATIONS_SUMMARY_ITEM_COUNT,
} from './notifications-summary.model';
import {
  filterNotificationsSummary,
  sortNotificationsSummary,
  totalNotificationsSummary,
  type NotificationsSummarySortKey,
} from './notifications-summary.utils';

export interface UseNotificationsSummaryOptions {
  itemCount?: number;
  initialSort?: NotificationsSummarySortKey;
}

export interface UseNotificationsSummaryResult {
  items: NotificationsSummaryItem[];
  allItems: NotificationsSummaryItem[];
  selected: NotificationsSummaryItem | null;
  query: string;
  sortKey: NotificationsSummarySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalNotificationsSummary>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: NotificationsSummarySortKey) => void;
  refresh: () => void;
}

export function useNotificationsSummary(
  options: UseNotificationsSummaryOptions = {},
): UseNotificationsSummaryResult {
  const { itemCount = NOTIFICATIONS_SUMMARY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<NotificationsSummarySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildNotificationsSummaryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortNotificationsSummary(
        filterNotificationsSummary(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalNotificationsSummary(items), [items]);

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
