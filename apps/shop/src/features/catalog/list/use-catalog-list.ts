import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCatalogListItems,
  type CatalogListItem,
  CATALOG_LIST_ITEM_COUNT,
} from './catalog-list.model';
import {
  filterCatalogList,
  sortCatalogList,
  totalCatalogList,
  type CatalogListSortKey,
} from './catalog-list.utils';

export interface UseCatalogListOptions {
  itemCount?: number;
  initialSort?: CatalogListSortKey;
}

export interface UseCatalogListResult {
  items: CatalogListItem[];
  allItems: CatalogListItem[];
  selected: CatalogListItem | null;
  query: string;
  sortKey: CatalogListSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCatalogList>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CatalogListSortKey) => void;
  refresh: () => void;
}

export function useCatalogList(
  options: UseCatalogListOptions = {},
): UseCatalogListResult {
  const { itemCount = CATALOG_LIST_ITEM_COUNT, initialSort = 'name' } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CatalogListSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCatalogListItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortCatalogList(filterCatalogList(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCatalogList(items), [items]);

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
