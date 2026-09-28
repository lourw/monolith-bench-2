import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSupportOverviewItems,
  type SupportOverviewItem,
  SUPPORT_OVERVIEW_ITEM_COUNT,
} from './support-overview.model';
import {
  filterSupportOverview,
  sortSupportOverview,
  totalSupportOverview,
  type SupportOverviewSortKey,
} from './support-overview.utils';

export interface UseSupportOverviewOptions {
  itemCount?: number;
  initialSort?: SupportOverviewSortKey;
}

export interface UseSupportOverviewResult {
  items: SupportOverviewItem[];
  allItems: SupportOverviewItem[];
  selected: SupportOverviewItem | null;
  query: string;
  sortKey: SupportOverviewSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSupportOverview>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SupportOverviewSortKey) => void;
  refresh: () => void;
}

export function useSupportOverview(
  options: UseSupportOverviewOptions = {},
): UseSupportOverviewResult {
  const { itemCount = SUPPORT_OVERVIEW_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SupportOverviewSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSupportOverviewItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortSupportOverview(filterSupportOverview(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSupportOverview(items), [items]);

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
