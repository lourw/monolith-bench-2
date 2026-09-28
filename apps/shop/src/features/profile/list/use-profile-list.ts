import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildProfileListItems,
  type ProfileListItem,
  PROFILE_LIST_ITEM_COUNT,
} from './profile-list.model';
import {
  filterProfileList,
  sortProfileList,
  totalProfileList,
  type ProfileListSortKey,
} from './profile-list.utils';

export interface UseProfileListOptions {
  itemCount?: number;
  initialSort?: ProfileListSortKey;
}

export interface UseProfileListResult {
  items: ProfileListItem[];
  allItems: ProfileListItem[];
  selected: ProfileListItem | null;
  query: string;
  sortKey: ProfileListSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalProfileList>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ProfileListSortKey) => void;
  refresh: () => void;
}

export function useProfileList(
  options: UseProfileListOptions = {},
): UseProfileListResult {
  const { itemCount = PROFILE_LIST_ITEM_COUNT, initialSort = 'name' } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ProfileListSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildProfileListItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortProfileList(filterProfileList(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalProfileList(items), [items]);

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
