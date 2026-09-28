import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildNotificationsSettingsItems,
  type NotificationsSettingsItem,
  NOTIFICATIONS_SETTINGS_ITEM_COUNT,
} from './notifications-settings.model';
import {
  filterNotificationsSettings,
  sortNotificationsSettings,
  totalNotificationsSettings,
  type NotificationsSettingsSortKey,
} from './notifications-settings.utils';

export interface UseNotificationsSettingsOptions {
  itemCount?: number;
  initialSort?: NotificationsSettingsSortKey;
}

export interface UseNotificationsSettingsResult {
  items: NotificationsSettingsItem[];
  allItems: NotificationsSettingsItem[];
  selected: NotificationsSettingsItem | null;
  query: string;
  sortKey: NotificationsSettingsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalNotificationsSettings>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: NotificationsSettingsSortKey) => void;
  refresh: () => void;
}

export function useNotificationsSettings(
  options: UseNotificationsSettingsOptions = {},
): UseNotificationsSettingsResult {
  const {
    itemCount = NOTIFICATIONS_SETTINGS_ITEM_COUNT,
    initialSort = 'name',
  } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<NotificationsSettingsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildNotificationsSettingsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortNotificationsSettings(
        filterNotificationsSettings(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalNotificationsSettings(items), [items]);

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
