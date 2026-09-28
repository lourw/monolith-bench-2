import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildPreordersOverviewItems,
  type PreordersOverviewItem,
  PREORDERS_OVERVIEW_ITEM_COUNT,
} from './preorders-overview.model';
import {
  filterPreordersOverview,
  sortPreordersOverview,
  totalPreordersOverview,
  type PreordersOverviewSortKey,
} from './preorders-overview.utils';

export interface UsePreordersOverviewOptions {
  itemCount?: number;
  initialSort?: PreordersOverviewSortKey;
}

export interface UsePreordersOverviewResult {
  items: PreordersOverviewItem[];
  allItems: PreordersOverviewItem[];
  selected: PreordersOverviewItem | null;
  query: string;
  sortKey: PreordersOverviewSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalPreordersOverview>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: PreordersOverviewSortKey) => void;
  refresh: () => void;
}

export function usePreordersOverview(
  options: UsePreordersOverviewOptions = {},
): UsePreordersOverviewResult {
  const { itemCount = PREORDERS_OVERVIEW_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<PreordersOverviewSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildPreordersOverviewItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortPreordersOverview(filterPreordersOverview(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalPreordersOverview(items), [items]);

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
