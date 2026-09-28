import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildWishlistSettingsItems,
  type WishlistSettingsItem,
  WISHLIST_SETTINGS_ITEM_COUNT,
} from './wishlist-settings.model';
import {
  filterWishlistSettings,
  sortWishlistSettings,
  totalWishlistSettings,
  type WishlistSettingsSortKey,
} from './wishlist-settings.utils';

export interface UseWishlistSettingsOptions {
  itemCount?: number;
  initialSort?: WishlistSettingsSortKey;
}

export interface UseWishlistSettingsResult {
  items: WishlistSettingsItem[];
  allItems: WishlistSettingsItem[];
  selected: WishlistSettingsItem | null;
  query: string;
  sortKey: WishlistSettingsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalWishlistSettings>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: WishlistSettingsSortKey) => void;
  refresh: () => void;
}

export function useWishlistSettings(
  options: UseWishlistSettingsOptions = {},
): UseWishlistSettingsResult {
  const { itemCount = WISHLIST_SETTINGS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<WishlistSettingsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildWishlistSettingsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortWishlistSettings(filterWishlistSettings(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalWishlistSettings(items), [items]);

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
