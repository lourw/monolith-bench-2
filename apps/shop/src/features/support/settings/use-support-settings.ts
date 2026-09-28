import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSupportSettingsItems,
  type SupportSettingsItem,
  SUPPORT_SETTINGS_ITEM_COUNT,
} from './support-settings.model';
import {
  filterSupportSettings,
  sortSupportSettings,
  totalSupportSettings,
  type SupportSettingsSortKey,
} from './support-settings.utils';

export interface UseSupportSettingsOptions {
  itemCount?: number;
  initialSort?: SupportSettingsSortKey;
}

export interface UseSupportSettingsResult {
  items: SupportSettingsItem[];
  allItems: SupportSettingsItem[];
  selected: SupportSettingsItem | null;
  query: string;
  sortKey: SupportSettingsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSupportSettings>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SupportSettingsSortKey) => void;
  refresh: () => void;
}

export function useSupportSettings(
  options: UseSupportSettingsOptions = {},
): UseSupportSettingsResult {
  const { itemCount = SUPPORT_SETTINGS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SupportSettingsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSupportSettingsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortSupportSettings(filterSupportSettings(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSupportSettings(items), [items]);

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
