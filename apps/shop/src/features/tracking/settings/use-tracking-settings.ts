import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildTrackingSettingsItems,
  type TrackingSettingsItem,
  TRACKING_SETTINGS_ITEM_COUNT,
} from './tracking-settings.model';
import {
  filterTrackingSettings,
  sortTrackingSettings,
  totalTrackingSettings,
  type TrackingSettingsSortKey,
} from './tracking-settings.utils';

export interface UseTrackingSettingsOptions {
  itemCount?: number;
  initialSort?: TrackingSettingsSortKey;
}

export interface UseTrackingSettingsResult {
  items: TrackingSettingsItem[];
  allItems: TrackingSettingsItem[];
  selected: TrackingSettingsItem | null;
  query: string;
  sortKey: TrackingSettingsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalTrackingSettings>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: TrackingSettingsSortKey) => void;
  refresh: () => void;
}

export function useTrackingSettings(
  options: UseTrackingSettingsOptions = {},
): UseTrackingSettingsResult {
  const { itemCount = TRACKING_SETTINGS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<TrackingSettingsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildTrackingSettingsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortTrackingSettings(filterTrackingSettings(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalTrackingSettings(items), [items]);

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
