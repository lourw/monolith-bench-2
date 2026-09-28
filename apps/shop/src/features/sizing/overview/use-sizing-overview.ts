import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSizingOverviewItems,
  type SizingOverviewItem,
  SIZING_OVERVIEW_ITEM_COUNT,
} from './sizing-overview.model';
import {
  filterSizingOverview,
  sortSizingOverview,
  totalSizingOverview,
  type SizingOverviewSortKey,
} from './sizing-overview.utils';

export interface UseSizingOverviewOptions {
  itemCount?: number;
  initialSort?: SizingOverviewSortKey;
}

export interface UseSizingOverviewResult {
  items: SizingOverviewItem[];
  allItems: SizingOverviewItem[];
  selected: SizingOverviewItem | null;
  query: string;
  sortKey: SizingOverviewSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSizingOverview>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SizingOverviewSortKey) => void;
  refresh: () => void;
}

export function useSizingOverview(
  options: UseSizingOverviewOptions = {},
): UseSizingOverviewResult {
  const { itemCount = SIZING_OVERVIEW_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SizingOverviewSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSizingOverviewItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortSizingOverview(filterSizingOverview(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSizingOverview(items), [items]);

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
