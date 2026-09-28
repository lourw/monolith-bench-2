import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCatalogHistoryItems,
  type CatalogHistoryItem,
  CATALOG_HISTORY_ITEM_COUNT,
} from './catalog-history.model';
import {
  filterCatalogHistory,
  sortCatalogHistory,
  totalCatalogHistory,
  type CatalogHistorySortKey,
} from './catalog-history.utils';

export interface UseCatalogHistoryOptions {
  itemCount?: number;
  initialSort?: CatalogHistorySortKey;
}

export interface UseCatalogHistoryResult {
  items: CatalogHistoryItem[];
  allItems: CatalogHistoryItem[];
  selected: CatalogHistoryItem | null;
  query: string;
  sortKey: CatalogHistorySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCatalogHistory>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CatalogHistorySortKey) => void;
  refresh: () => void;
}

export function useCatalogHistory(
  options: UseCatalogHistoryOptions = {},
): UseCatalogHistoryResult {
  const { itemCount = CATALOG_HISTORY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CatalogHistorySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCatalogHistoryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortCatalogHistory(filterCatalogHistory(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCatalogHistory(items), [items]);

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
