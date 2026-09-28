import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCatalogInsightsItems,
  type CatalogInsightsItem,
  CATALOG_INSIGHTS_ITEM_COUNT,
} from './catalog-insights.model';
import {
  filterCatalogInsights,
  sortCatalogInsights,
  totalCatalogInsights,
  type CatalogInsightsSortKey,
} from './catalog-insights.utils';

export interface UseCatalogInsightsOptions {
  itemCount?: number;
  initialSort?: CatalogInsightsSortKey;
}

export interface UseCatalogInsightsResult {
  items: CatalogInsightsItem[];
  allItems: CatalogInsightsItem[];
  selected: CatalogInsightsItem | null;
  query: string;
  sortKey: CatalogInsightsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCatalogInsights>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CatalogInsightsSortKey) => void;
  refresh: () => void;
}

export function useCatalogInsights(
  options: UseCatalogInsightsOptions = {},
): UseCatalogInsightsResult {
  const { itemCount = CATALOG_INSIGHTS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CatalogInsightsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCatalogInsightsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortCatalogInsights(filterCatalogInsights(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCatalogInsights(items), [items]);

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
