import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAuthOverviewItems,
  type AuthOverviewItem,
  AUTH_OVERVIEW_ITEM_COUNT,
} from './auth-overview.model';
import {
  filterAuthOverview,
  sortAuthOverview,
  totalAuthOverview,
  type AuthOverviewSortKey,
} from './auth-overview.utils';

export interface UseAuthOverviewOptions {
  itemCount?: number;
  initialSort?: AuthOverviewSortKey;
}

export interface UseAuthOverviewResult {
  items: AuthOverviewItem[];
  allItems: AuthOverviewItem[];
  selected: AuthOverviewItem | null;
  query: string;
  sortKey: AuthOverviewSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAuthOverview>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AuthOverviewSortKey) => void;
  refresh: () => void;
}

export function useAuthOverview(
  options: UseAuthOverviewOptions = {},
): UseAuthOverviewResult {
  const { itemCount = AUTH_OVERVIEW_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AuthOverviewSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAuthOverviewItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortAuthOverview(filterAuthOverview(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAuthOverview(items), [items]);

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
