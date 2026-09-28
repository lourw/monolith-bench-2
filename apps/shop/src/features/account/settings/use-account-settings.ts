import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAccountSettingsItems,
  type AccountSettingsItem,
  ACCOUNT_SETTINGS_ITEM_COUNT,
} from './account-settings.model';
import {
  filterAccountSettings,
  sortAccountSettings,
  totalAccountSettings,
  type AccountSettingsSortKey,
} from './account-settings.utils';

export interface UseAccountSettingsOptions {
  itemCount?: number;
  initialSort?: AccountSettingsSortKey;
}

export interface UseAccountSettingsResult {
  items: AccountSettingsItem[];
  allItems: AccountSettingsItem[];
  selected: AccountSettingsItem | null;
  query: string;
  sortKey: AccountSettingsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAccountSettings>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AccountSettingsSortKey) => void;
  refresh: () => void;
}

export function useAccountSettings(
  options: UseAccountSettingsOptions = {},
): UseAccountSettingsResult {
  const { itemCount = ACCOUNT_SETTINGS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AccountSettingsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAccountSettingsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortAccountSettings(filterAccountSettings(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAccountSettings(items), [items]);

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
