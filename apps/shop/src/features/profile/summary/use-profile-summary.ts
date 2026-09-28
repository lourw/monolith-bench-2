import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildProfileSummaryItems,
  type ProfileSummaryItem,
  PROFILE_SUMMARY_ITEM_COUNT,
} from './profile-summary.model';
import {
  filterProfileSummary,
  sortProfileSummary,
  totalProfileSummary,
  type ProfileSummarySortKey,
} from './profile-summary.utils';

export interface UseProfileSummaryOptions {
  itemCount?: number;
  initialSort?: ProfileSummarySortKey;
}

export interface UseProfileSummaryResult {
  items: ProfileSummaryItem[];
  allItems: ProfileSummaryItem[];
  selected: ProfileSummaryItem | null;
  query: string;
  sortKey: ProfileSummarySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalProfileSummary>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ProfileSummarySortKey) => void;
  refresh: () => void;
}

export function useProfileSummary(
  options: UseProfileSummaryOptions = {},
): UseProfileSummaryResult {
  const { itemCount = PROFILE_SUMMARY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ProfileSummarySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildProfileSummaryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortProfileSummary(filterProfileSummary(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalProfileSummary(items), [items]);

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
