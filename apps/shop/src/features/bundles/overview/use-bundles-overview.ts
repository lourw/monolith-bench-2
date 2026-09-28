import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildBundlesOverviewItems,
  type BundlesOverviewItem,
  BUNDLES_OVERVIEW_ITEM_COUNT,
} from './bundles-overview.model';
import {
  filterBundlesOverview,
  sortBundlesOverview,
  totalBundlesOverview,
  type BundlesOverviewSortKey,
} from './bundles-overview.utils';

export interface UseBundlesOverviewOptions {
  itemCount?: number;
  initialSort?: BundlesOverviewSortKey;
}

export interface UseBundlesOverviewResult {
  items: BundlesOverviewItem[];
  allItems: BundlesOverviewItem[];
  selected: BundlesOverviewItem | null;
  query: string;
  sortKey: BundlesOverviewSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalBundlesOverview>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: BundlesOverviewSortKey) => void;
  refresh: () => void;
}

export function useBundlesOverview(
  options: UseBundlesOverviewOptions = {},
): UseBundlesOverviewResult {
  const { itemCount = BUNDLES_OVERVIEW_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<BundlesOverviewSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildBundlesOverviewItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortBundlesOverview(filterBundlesOverview(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalBundlesOverview(items), [items]);

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
