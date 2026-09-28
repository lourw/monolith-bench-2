import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCatalogDetailsItems,
  type CatalogDetailsItem,
  CATALOG_DETAILS_ITEM_COUNT,
} from './catalog-details.model';
import {
  filterCatalogDetails,
  sortCatalogDetails,
  totalCatalogDetails,
  type CatalogDetailsSortKey,
} from './catalog-details.utils';

export interface UseCatalogDetailsOptions {
  itemCount?: number;
  initialSort?: CatalogDetailsSortKey;
}

export interface UseCatalogDetailsResult {
  items: CatalogDetailsItem[];
  allItems: CatalogDetailsItem[];
  selected: CatalogDetailsItem | null;
  query: string;
  sortKey: CatalogDetailsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCatalogDetails>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CatalogDetailsSortKey) => void;
  refresh: () => void;
}

export function useCatalogDetails(
  options: UseCatalogDetailsOptions = {},
): UseCatalogDetailsResult {
  const { itemCount = CATALOG_DETAILS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CatalogDetailsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCatalogDetailsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortCatalogDetails(filterCatalogDetails(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCatalogDetails(items), [items]);

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
