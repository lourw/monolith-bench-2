import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCompareOverviewItems,
  type CompareOverviewItem,
  COMPARE_OVERVIEW_ITEM_COUNT,
} from './compare-overview.model';
import {
  filterCompareOverview,
  sortCompareOverview,
  totalCompareOverview,
  type CompareOverviewSortKey,
} from './compare-overview.utils';

export interface UseCompareOverviewOptions {
  itemCount?: number;
  initialSort?: CompareOverviewSortKey;
}

export interface UseCompareOverviewResult {
  items: CompareOverviewItem[];
  allItems: CompareOverviewItem[];
  selected: CompareOverviewItem | null;
  query: string;
  sortKey: CompareOverviewSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCompareOverview>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CompareOverviewSortKey) => void;
  refresh: () => void;
}

export function useCompareOverview(
  options: UseCompareOverviewOptions = {},
): UseCompareOverviewResult {
  const { itemCount = COMPARE_OVERVIEW_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CompareOverviewSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCompareOverviewItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortCompareOverview(filterCompareOverview(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCompareOverview(items), [items]);

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
