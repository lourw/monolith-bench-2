import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCatalogDashboardItems,
  type CatalogDashboardItem,
  CATALOG_DASHBOARD_ITEM_COUNT,
} from './catalog-dashboard.model';
import {
  filterCatalogDashboard,
  sortCatalogDashboard,
  totalCatalogDashboard,
  type CatalogDashboardSortKey,
} from './catalog-dashboard.utils';

export interface UseCatalogDashboardOptions {
  itemCount?: number;
  initialSort?: CatalogDashboardSortKey;
}

export interface UseCatalogDashboardResult {
  items: CatalogDashboardItem[];
  allItems: CatalogDashboardItem[];
  selected: CatalogDashboardItem | null;
  query: string;
  sortKey: CatalogDashboardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCatalogDashboard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CatalogDashboardSortKey) => void;
  refresh: () => void;
}

export function useCatalogDashboard(
  options: UseCatalogDashboardOptions = {},
): UseCatalogDashboardResult {
  const { itemCount = CATALOG_DASHBOARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CatalogDashboardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCatalogDashboardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortCatalogDashboard(filterCatalogDashboard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCatalogDashboard(items), [items]);

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
