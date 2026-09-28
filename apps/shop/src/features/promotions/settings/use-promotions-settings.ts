import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildPromotionsSettingsItems,
  type PromotionsSettingsItem,
  PROMOTIONS_SETTINGS_ITEM_COUNT,
} from './promotions-settings.model';
import {
  filterPromotionsSettings,
  sortPromotionsSettings,
  totalPromotionsSettings,
  type PromotionsSettingsSortKey,
} from './promotions-settings.utils';

export interface UsePromotionsSettingsOptions {
  itemCount?: number;
  initialSort?: PromotionsSettingsSortKey;
}

export interface UsePromotionsSettingsResult {
  items: PromotionsSettingsItem[];
  allItems: PromotionsSettingsItem[];
  selected: PromotionsSettingsItem | null;
  query: string;
  sortKey: PromotionsSettingsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalPromotionsSettings>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: PromotionsSettingsSortKey) => void;
  refresh: () => void;
}

export function usePromotionsSettings(
  options: UsePromotionsSettingsOptions = {},
): UsePromotionsSettingsResult {
  const { itemCount = PROMOTIONS_SETTINGS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<PromotionsSettingsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildPromotionsSettingsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortPromotionsSettings(
        filterPromotionsSettings(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalPromotionsSettings(items), [items]);

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
