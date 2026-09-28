import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCatalogOverviewItems,
  type CatalogOverviewItem,
  CATALOG_OVERVIEW_ITEM_COUNT,
} from './catalog-overview.model';
import {
  filterCatalogOverview,
  sortCatalogOverview,
  totalCatalogOverview,
  type CatalogOverviewSortKey,
} from './catalog-overview.utils';

export interface UseCatalogOverviewOptions {
  itemCount?: number;
  initialSort?: CatalogOverviewSortKey;
}

export interface UseCatalogOverviewResult {
  items: CatalogOverviewItem[];
  allItems: CatalogOverviewItem[];
  selected: CatalogOverviewItem | null;
  query: string;
  sortKey: CatalogOverviewSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCatalogOverview>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CatalogOverviewSortKey) => void;
  refresh: () => void;
}

export function useCatalogOverview(
  options: UseCatalogOverviewOptions = {},
): UseCatalogOverviewResult {
  const { itemCount = CATALOG_OVERVIEW_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CatalogOverviewSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCatalogOverviewItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortCatalogOverview(filterCatalogOverview(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCatalogOverview(items), [items]);

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
