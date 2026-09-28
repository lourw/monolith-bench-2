import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAuthSettingsItems,
  type AuthSettingsItem,
  AUTH_SETTINGS_ITEM_COUNT,
} from './auth-settings.model';
import {
  filterAuthSettings,
  sortAuthSettings,
  totalAuthSettings,
  type AuthSettingsSortKey,
} from './auth-settings.utils';

export interface UseAuthSettingsOptions {
  itemCount?: number;
  initialSort?: AuthSettingsSortKey;
}

export interface UseAuthSettingsResult {
  items: AuthSettingsItem[];
  allItems: AuthSettingsItem[];
  selected: AuthSettingsItem | null;
  query: string;
  sortKey: AuthSettingsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAuthSettings>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AuthSettingsSortKey) => void;
  refresh: () => void;
}

export function useAuthSettings(
  options: UseAuthSettingsOptions = {},
): UseAuthSettingsResult {
  const { itemCount = AUTH_SETTINGS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AuthSettingsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAuthSettingsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortAuthSettings(filterAuthSettings(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAuthSettings(items), [items]);

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
