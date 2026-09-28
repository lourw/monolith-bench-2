import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCatalogSettingsItems,
  type CatalogSettingsItem,
  CATALOG_SETTINGS_ITEM_COUNT,
} from './catalog-settings.model';
import {
  filterCatalogSettings,
  sortCatalogSettings,
  totalCatalogSettings,
  type CatalogSettingsSortKey,
} from './catalog-settings.utils';

export interface UseCatalogSettingsOptions {
  itemCount?: number;
  initialSort?: CatalogSettingsSortKey;
}

export interface UseCatalogSettingsResult {
  items: CatalogSettingsItem[];
  allItems: CatalogSettingsItem[];
  selected: CatalogSettingsItem | null;
  query: string;
  sortKey: CatalogSettingsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCatalogSettings>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CatalogSettingsSortKey) => void;
  refresh: () => void;
}

export function useCatalogSettings(
  options: UseCatalogSettingsOptions = {},
): UseCatalogSettingsResult {
  const { itemCount = CATALOG_SETTINGS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CatalogSettingsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCatalogSettingsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortCatalogSettings(filterCatalogSettings(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCatalogSettings(items), [items]);

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
