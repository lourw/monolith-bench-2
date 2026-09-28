import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildReturnsOverviewItems,
  type ReturnsOverviewItem,
  RETURNS_OVERVIEW_ITEM_COUNT,
} from './returns-overview.model';
import {
  filterReturnsOverview,
  sortReturnsOverview,
  totalReturnsOverview,
  type ReturnsOverviewSortKey,
} from './returns-overview.utils';

export interface UseReturnsOverviewOptions {
  itemCount?: number;
  initialSort?: ReturnsOverviewSortKey;
}

export interface UseReturnsOverviewResult {
  items: ReturnsOverviewItem[];
  allItems: ReturnsOverviewItem[];
  selected: ReturnsOverviewItem | null;
  query: string;
  sortKey: ReturnsOverviewSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalReturnsOverview>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ReturnsOverviewSortKey) => void;
  refresh: () => void;
}

export function useReturnsOverview(
  options: UseReturnsOverviewOptions = {},
): UseReturnsOverviewResult {
  const { itemCount = RETURNS_OVERVIEW_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ReturnsOverviewSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildReturnsOverviewItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortReturnsOverview(filterReturnsOverview(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalReturnsOverview(items), [items]);

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
