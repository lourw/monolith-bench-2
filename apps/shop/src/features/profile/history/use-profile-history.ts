import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildProfileHistoryItems,
  type ProfileHistoryItem,
  PROFILE_HISTORY_ITEM_COUNT,
} from './profile-history.model';
import {
  filterProfileHistory,
  sortProfileHistory,
  totalProfileHistory,
  type ProfileHistorySortKey,
} from './profile-history.utils';

export interface UseProfileHistoryOptions {
  itemCount?: number;
  initialSort?: ProfileHistorySortKey;
}

export interface UseProfileHistoryResult {
  items: ProfileHistoryItem[];
  allItems: ProfileHistoryItem[];
  selected: ProfileHistoryItem | null;
  query: string;
  sortKey: ProfileHistorySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalProfileHistory>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ProfileHistorySortKey) => void;
  refresh: () => void;
}

export function useProfileHistory(
  options: UseProfileHistoryOptions = {},
): UseProfileHistoryResult {
  const { itemCount = PROFILE_HISTORY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ProfileHistorySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildProfileHistoryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortProfileHistory(filterProfileHistory(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalProfileHistory(items), [items]);

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
