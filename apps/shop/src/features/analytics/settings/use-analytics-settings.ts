import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAnalyticsSettingsItems,
  type AnalyticsSettingsItem,
  ANALYTICS_SETTINGS_ITEM_COUNT,
} from './analytics-settings.model';
import {
  filterAnalyticsSettings,
  sortAnalyticsSettings,
  totalAnalyticsSettings,
  type AnalyticsSettingsSortKey,
} from './analytics-settings.utils';

export interface UseAnalyticsSettingsOptions {
  itemCount?: number;
  initialSort?: AnalyticsSettingsSortKey;
}

export interface UseAnalyticsSettingsResult {
  items: AnalyticsSettingsItem[];
  allItems: AnalyticsSettingsItem[];
  selected: AnalyticsSettingsItem | null;
  query: string;
  sortKey: AnalyticsSettingsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAnalyticsSettings>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AnalyticsSettingsSortKey) => void;
  refresh: () => void;
}

export function useAnalyticsSettings(
  options: UseAnalyticsSettingsOptions = {},
): UseAnalyticsSettingsResult {
  const { itemCount = ANALYTICS_SETTINGS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AnalyticsSettingsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAnalyticsSettingsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortAnalyticsSettings(filterAnalyticsSettings(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAnalyticsSettings(items), [items]);

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
