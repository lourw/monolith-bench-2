import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSubscriptionsSettingsItems,
  type SubscriptionsSettingsItem,
  SUBSCRIPTIONS_SETTINGS_ITEM_COUNT,
} from './subscriptions-settings.model';
import {
  filterSubscriptionsSettings,
  sortSubscriptionsSettings,
  totalSubscriptionsSettings,
  type SubscriptionsSettingsSortKey,
} from './subscriptions-settings.utils';

export interface UseSubscriptionsSettingsOptions {
  itemCount?: number;
  initialSort?: SubscriptionsSettingsSortKey;
}

export interface UseSubscriptionsSettingsResult {
  items: SubscriptionsSettingsItem[];
  allItems: SubscriptionsSettingsItem[];
  selected: SubscriptionsSettingsItem | null;
  query: string;
  sortKey: SubscriptionsSettingsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSubscriptionsSettings>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SubscriptionsSettingsSortKey) => void;
  refresh: () => void;
}

export function useSubscriptionsSettings(
  options: UseSubscriptionsSettingsOptions = {},
): UseSubscriptionsSettingsResult {
  const {
    itemCount = SUBSCRIPTIONS_SETTINGS_ITEM_COUNT,
    initialSort = 'name',
  } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<SubscriptionsSettingsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSubscriptionsSettingsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortSubscriptionsSettings(
        filterSubscriptionsSettings(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSubscriptionsSettings(items), [items]);

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
