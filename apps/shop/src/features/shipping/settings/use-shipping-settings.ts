import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildShippingSettingsItems,
  type ShippingSettingsItem,
  SHIPPING_SETTINGS_ITEM_COUNT,
} from './shipping-settings.model';
import {
  filterShippingSettings,
  sortShippingSettings,
  totalShippingSettings,
  type ShippingSettingsSortKey,
} from './shipping-settings.utils';

export interface UseShippingSettingsOptions {
  itemCount?: number;
  initialSort?: ShippingSettingsSortKey;
}

export interface UseShippingSettingsResult {
  items: ShippingSettingsItem[];
  allItems: ShippingSettingsItem[];
  selected: ShippingSettingsItem | null;
  query: string;
  sortKey: ShippingSettingsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalShippingSettings>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ShippingSettingsSortKey) => void;
  refresh: () => void;
}

export function useShippingSettings(
  options: UseShippingSettingsOptions = {},
): UseShippingSettingsResult {
  const { itemCount = SHIPPING_SETTINGS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ShippingSettingsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildShippingSettingsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortShippingSettings(filterShippingSettings(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalShippingSettings(items), [items]);

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
