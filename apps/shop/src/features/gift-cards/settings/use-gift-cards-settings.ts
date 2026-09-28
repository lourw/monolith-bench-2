import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildGiftCardsSettingsItems,
  type GiftCardsSettingsItem,
  GIFT_CARDS_SETTINGS_ITEM_COUNT,
} from './gift-cards-settings.model';
import {
  filterGiftCardsSettings,
  sortGiftCardsSettings,
  totalGiftCardsSettings,
  type GiftCardsSettingsSortKey,
} from './gift-cards-settings.utils';

export interface UseGiftCardsSettingsOptions {
  itemCount?: number;
  initialSort?: GiftCardsSettingsSortKey;
}

export interface UseGiftCardsSettingsResult {
  items: GiftCardsSettingsItem[];
  allItems: GiftCardsSettingsItem[];
  selected: GiftCardsSettingsItem | null;
  query: string;
  sortKey: GiftCardsSettingsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalGiftCardsSettings>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: GiftCardsSettingsSortKey) => void;
  refresh: () => void;
}

export function useGiftCardsSettings(
  options: UseGiftCardsSettingsOptions = {},
): UseGiftCardsSettingsResult {
  const { itemCount = GIFT_CARDS_SETTINGS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<GiftCardsSettingsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildGiftCardsSettingsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortGiftCardsSettings(filterGiftCardsSettings(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalGiftCardsSettings(items), [items]);

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
