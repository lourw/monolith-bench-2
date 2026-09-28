import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildProfileSettingsItems,
  type ProfileSettingsItem,
  PROFILE_SETTINGS_ITEM_COUNT,
} from './profile-settings.model';
import {
  filterProfileSettings,
  sortProfileSettings,
  totalProfileSettings,
  type ProfileSettingsSortKey,
} from './profile-settings.utils';

export interface UseProfileSettingsOptions {
  itemCount?: number;
  initialSort?: ProfileSettingsSortKey;
}

export interface UseProfileSettingsResult {
  items: ProfileSettingsItem[];
  allItems: ProfileSettingsItem[];
  selected: ProfileSettingsItem | null;
  query: string;
  sortKey: ProfileSettingsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalProfileSettings>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ProfileSettingsSortKey) => void;
  refresh: () => void;
}

export function useProfileSettings(
  options: UseProfileSettingsOptions = {},
): UseProfileSettingsResult {
  const { itemCount = PROFILE_SETTINGS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ProfileSettingsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildProfileSettingsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortProfileSettings(filterProfileSettings(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalProfileSettings(items), [items]);

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
