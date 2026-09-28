import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCheckoutSettingsItems,
  type CheckoutSettingsItem,
  CHECKOUT_SETTINGS_ITEM_COUNT,
} from './checkout-settings.model';
import {
  filterCheckoutSettings,
  sortCheckoutSettings,
  totalCheckoutSettings,
  type CheckoutSettingsSortKey,
} from './checkout-settings.utils';

export interface UseCheckoutSettingsOptions {
  itemCount?: number;
  initialSort?: CheckoutSettingsSortKey;
}

export interface UseCheckoutSettingsResult {
  items: CheckoutSettingsItem[];
  allItems: CheckoutSettingsItem[];
  selected: CheckoutSettingsItem | null;
  query: string;
  sortKey: CheckoutSettingsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCheckoutSettings>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CheckoutSettingsSortKey) => void;
  refresh: () => void;
}

export function useCheckoutSettings(
  options: UseCheckoutSettingsOptions = {},
): UseCheckoutSettingsResult {
  const { itemCount = CHECKOUT_SETTINGS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CheckoutSettingsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCheckoutSettingsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortCheckoutSettings(filterCheckoutSettings(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCheckoutSettings(items), [items]);

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
