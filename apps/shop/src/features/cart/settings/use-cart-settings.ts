import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCartSettingsItems,
  type CartSettingsItem,
  CART_SETTINGS_ITEM_COUNT,
} from './cart-settings.model';
import {
  filterCartSettings,
  sortCartSettings,
  totalCartSettings,
  type CartSettingsSortKey,
} from './cart-settings.utils';

export interface UseCartSettingsOptions {
  itemCount?: number;
  initialSort?: CartSettingsSortKey;
}

export interface UseCartSettingsResult {
  items: CartSettingsItem[];
  allItems: CartSettingsItem[];
  selected: CartSettingsItem | null;
  query: string;
  sortKey: CartSettingsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCartSettings>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CartSettingsSortKey) => void;
  refresh: () => void;
}

export function useCartSettings(
  options: UseCartSettingsOptions = {},
): UseCartSettingsResult {
  const { itemCount = CART_SETTINGS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CartSettingsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCartSettingsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortCartSettings(filterCartSettings(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCartSettings(items), [items]);

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
