import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCatalogSummaryItems,
  type CatalogSummaryItem,
  CATALOG_SUMMARY_ITEM_COUNT,
} from './catalog-summary.model';
import {
  filterCatalogSummary,
  sortCatalogSummary,
  totalCatalogSummary,
  type CatalogSummarySortKey,
} from './catalog-summary.utils';

export interface UseCatalogSummaryOptions {
  itemCount?: number;
  initialSort?: CatalogSummarySortKey;
}

export interface UseCatalogSummaryResult {
  items: CatalogSummaryItem[];
  allItems: CatalogSummaryItem[];
  selected: CatalogSummaryItem | null;
  query: string;
  sortKey: CatalogSummarySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCatalogSummary>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CatalogSummarySortKey) => void;
  refresh: () => void;
}

export function useCatalogSummary(
  options: UseCatalogSummaryOptions = {},
): UseCatalogSummaryResult {
  const { itemCount = CATALOG_SUMMARY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CatalogSummarySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCatalogSummaryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortCatalogSummary(filterCatalogSummary(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCatalogSummary(items), [items]);

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
