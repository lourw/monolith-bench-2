import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildProfileDetailsItems,
  type ProfileDetailsItem,
  PROFILE_DETAILS_ITEM_COUNT,
} from './profile-details.model';
import {
  filterProfileDetails,
  sortProfileDetails,
  totalProfileDetails,
  type ProfileDetailsSortKey,
} from './profile-details.utils';

export interface UseProfileDetailsOptions {
  itemCount?: number;
  initialSort?: ProfileDetailsSortKey;
}

export interface UseProfileDetailsResult {
  items: ProfileDetailsItem[];
  allItems: ProfileDetailsItem[];
  selected: ProfileDetailsItem | null;
  query: string;
  sortKey: ProfileDetailsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalProfileDetails>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ProfileDetailsSortKey) => void;
  refresh: () => void;
}

export function useProfileDetails(
  options: UseProfileDetailsOptions = {},
): UseProfileDetailsResult {
  const { itemCount = PROFILE_DETAILS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ProfileDetailsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildProfileDetailsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortProfileDetails(filterProfileDetails(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalProfileDetails(items), [items]);

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
