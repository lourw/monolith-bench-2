import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildProfileDashboardItems,
  type ProfileDashboardItem,
  PROFILE_DASHBOARD_ITEM_COUNT,
} from './profile-dashboard.model';
import {
  filterProfileDashboard,
  sortProfileDashboard,
  totalProfileDashboard,
  type ProfileDashboardSortKey,
} from './profile-dashboard.utils';

export interface UseProfileDashboardOptions {
  itemCount?: number;
  initialSort?: ProfileDashboardSortKey;
}

export interface UseProfileDashboardResult {
  items: ProfileDashboardItem[];
  allItems: ProfileDashboardItem[];
  selected: ProfileDashboardItem | null;
  query: string;
  sortKey: ProfileDashboardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalProfileDashboard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ProfileDashboardSortKey) => void;
  refresh: () => void;
}

export function useProfileDashboard(
  options: UseProfileDashboardOptions = {},
): UseProfileDashboardResult {
  const { itemCount = PROFILE_DASHBOARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ProfileDashboardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildProfileDashboardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortProfileDashboard(filterProfileDashboard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalProfileDashboard(items), [items]);

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
