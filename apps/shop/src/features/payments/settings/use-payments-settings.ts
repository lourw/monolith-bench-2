import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildPaymentsSettingsItems,
  type PaymentsSettingsItem,
  PAYMENTS_SETTINGS_ITEM_COUNT,
} from './payments-settings.model';
import {
  filterPaymentsSettings,
  sortPaymentsSettings,
  totalPaymentsSettings,
  type PaymentsSettingsSortKey,
} from './payments-settings.utils';

export interface UsePaymentsSettingsOptions {
  itemCount?: number;
  initialSort?: PaymentsSettingsSortKey;
}

export interface UsePaymentsSettingsResult {
  items: PaymentsSettingsItem[];
  allItems: PaymentsSettingsItem[];
  selected: PaymentsSettingsItem | null;
  query: string;
  sortKey: PaymentsSettingsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalPaymentsSettings>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: PaymentsSettingsSortKey) => void;
  refresh: () => void;
}

export function usePaymentsSettings(
  options: UsePaymentsSettingsOptions = {},
): UsePaymentsSettingsResult {
  const { itemCount = PAYMENTS_SETTINGS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<PaymentsSettingsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildPaymentsSettingsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortPaymentsSettings(filterPaymentsSettings(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalPaymentsSettings(items), [items]);

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
