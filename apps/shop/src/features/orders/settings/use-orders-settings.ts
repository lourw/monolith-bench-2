import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildOrdersSettingsItems,
  type OrdersSettingsItem,
  ORDERS_SETTINGS_ITEM_COUNT,
} from './orders-settings.model';
import {
  filterOrdersSettings,
  sortOrdersSettings,
  totalOrdersSettings,
  type OrdersSettingsSortKey,
} from './orders-settings.utils';

export interface UseOrdersSettingsOptions {
  itemCount?: number;
  initialSort?: OrdersSettingsSortKey;
}

export interface UseOrdersSettingsResult {
  items: OrdersSettingsItem[];
  allItems: OrdersSettingsItem[];
  selected: OrdersSettingsItem | null;
  query: string;
  sortKey: OrdersSettingsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalOrdersSettings>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: OrdersSettingsSortKey) => void;
  refresh: () => void;
}

export function useOrdersSettings(
  options: UseOrdersSettingsOptions = {},
): UseOrdersSettingsResult {
  const { itemCount = ORDERS_SETTINGS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<OrdersSettingsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildOrdersSettingsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortOrdersSettings(filterOrdersSettings(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalOrdersSettings(items), [items]);

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
