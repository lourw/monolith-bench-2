import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildProfileInsightsItems,
  type ProfileInsightsItem,
  PROFILE_INSIGHTS_ITEM_COUNT,
} from './profile-insights.model';
import {
  filterProfileInsights,
  sortProfileInsights,
  totalProfileInsights,
  type ProfileInsightsSortKey,
} from './profile-insights.utils';

export interface UseProfileInsightsOptions {
  itemCount?: number;
  initialSort?: ProfileInsightsSortKey;
}

export interface UseProfileInsightsResult {
  items: ProfileInsightsItem[];
  allItems: ProfileInsightsItem[];
  selected: ProfileInsightsItem | null;
  query: string;
  sortKey: ProfileInsightsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalProfileInsights>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ProfileInsightsSortKey) => void;
  refresh: () => void;
}

export function useProfileInsights(
  options: UseProfileInsightsOptions = {},
): UseProfileInsightsResult {
  const { itemCount = PROFILE_INSIGHTS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ProfileInsightsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildProfileInsightsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortProfileInsights(filterProfileInsights(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalProfileInsights(items), [items]);

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
