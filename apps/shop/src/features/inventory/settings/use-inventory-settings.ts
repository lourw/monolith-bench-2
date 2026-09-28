import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildInventorySettingsItems,
  type InventorySettingsItem,
  INVENTORY_SETTINGS_ITEM_COUNT,
} from './inventory-settings.model';
import {
  filterInventorySettings,
  sortInventorySettings,
  totalInventorySettings,
  type InventorySettingsSortKey,
} from './inventory-settings.utils';

export interface UseInventorySettingsOptions {
  itemCount?: number;
  initialSort?: InventorySettingsSortKey;
}

export interface UseInventorySettingsResult {
  items: InventorySettingsItem[];
  allItems: InventorySettingsItem[];
  selected: InventorySettingsItem | null;
  query: string;
  sortKey: InventorySettingsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalInventorySettings>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: InventorySettingsSortKey) => void;
  refresh: () => void;
}

export function useInventorySettings(
  options: UseInventorySettingsOptions = {},
): UseInventorySettingsResult {
  const { itemCount = INVENTORY_SETTINGS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<InventorySettingsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildInventorySettingsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortInventorySettings(filterInventorySettings(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalInventorySettings(items), [items]);

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
