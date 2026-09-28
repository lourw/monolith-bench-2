import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAddressesSettingsItems,
  type AddressesSettingsItem,
  ADDRESSES_SETTINGS_ITEM_COUNT,
} from './addresses-settings.model';
import {
  filterAddressesSettings,
  sortAddressesSettings,
  totalAddressesSettings,
  type AddressesSettingsSortKey,
} from './addresses-settings.utils';

export interface UseAddressesSettingsOptions {
  itemCount?: number;
  initialSort?: AddressesSettingsSortKey;
}

export interface UseAddressesSettingsResult {
  items: AddressesSettingsItem[];
  allItems: AddressesSettingsItem[];
  selected: AddressesSettingsItem | null;
  query: string;
  sortKey: AddressesSettingsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAddressesSettings>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AddressesSettingsSortKey) => void;
  refresh: () => void;
}

export function useAddressesSettings(
  options: UseAddressesSettingsOptions = {},
): UseAddressesSettingsResult {
  const { itemCount = ADDRESSES_SETTINGS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AddressesSettingsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAddressesSettingsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortAddressesSettings(filterAddressesSettings(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAddressesSettings(items), [items]);

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
