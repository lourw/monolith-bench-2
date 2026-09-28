import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildLoyaltySettingsItems,
  type LoyaltySettingsItem,
  LOYALTY_SETTINGS_ITEM_COUNT,
} from './loyalty-settings.model';
import {
  filterLoyaltySettings,
  sortLoyaltySettings,
  totalLoyaltySettings,
  type LoyaltySettingsSortKey,
} from './loyalty-settings.utils';

export interface UseLoyaltySettingsOptions {
  itemCount?: number;
  initialSort?: LoyaltySettingsSortKey;
}

export interface UseLoyaltySettingsResult {
  items: LoyaltySettingsItem[];
  allItems: LoyaltySettingsItem[];
  selected: LoyaltySettingsItem | null;
  query: string;
  sortKey: LoyaltySettingsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalLoyaltySettings>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: LoyaltySettingsSortKey) => void;
  refresh: () => void;
}

export function useLoyaltySettings(
  options: UseLoyaltySettingsOptions = {},
): UseLoyaltySettingsResult {
  const { itemCount = LOYALTY_SETTINGS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<LoyaltySettingsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildLoyaltySettingsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortLoyaltySettings(filterLoyaltySettings(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalLoyaltySettings(items), [items]);

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
