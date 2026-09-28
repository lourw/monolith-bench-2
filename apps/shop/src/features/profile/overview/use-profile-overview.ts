import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildProfileOverviewItems,
  type ProfileOverviewItem,
  PROFILE_OVERVIEW_ITEM_COUNT,
} from './profile-overview.model';
import {
  filterProfileOverview,
  sortProfileOverview,
  totalProfileOverview,
  type ProfileOverviewSortKey,
} from './profile-overview.utils';

export interface UseProfileOverviewOptions {
  itemCount?: number;
  initialSort?: ProfileOverviewSortKey;
}

export interface UseProfileOverviewResult {
  items: ProfileOverviewItem[];
  allItems: ProfileOverviewItem[];
  selected: ProfileOverviewItem | null;
  query: string;
  sortKey: ProfileOverviewSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalProfileOverview>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ProfileOverviewSortKey) => void;
  refresh: () => void;
}

export function useProfileOverview(
  options: UseProfileOverviewOptions = {},
): UseProfileOverviewResult {
  const { itemCount = PROFILE_OVERVIEW_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ProfileOverviewSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildProfileOverviewItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortProfileOverview(filterProfileOverview(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalProfileOverview(items), [items]);

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
