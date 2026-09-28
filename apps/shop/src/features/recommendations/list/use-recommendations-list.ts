import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildRecommendationsListItems,
  type RecommendationsListItem,
  RECOMMENDATIONS_LIST_ITEM_COUNT,
} from './recommendations-list.model';
import {
  filterRecommendationsList,
  sortRecommendationsList,
  totalRecommendationsList,
  type RecommendationsListSortKey,
} from './recommendations-list.utils';

export interface UseRecommendationsListOptions {
  itemCount?: number;
  initialSort?: RecommendationsListSortKey;
}

export interface UseRecommendationsListResult {
  items: RecommendationsListItem[];
  allItems: RecommendationsListItem[];
  selected: RecommendationsListItem | null;
  query: string;
  sortKey: RecommendationsListSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalRecommendationsList>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: RecommendationsListSortKey) => void;
  refresh: () => void;
}

export function useRecommendationsList(
  options: UseRecommendationsListOptions = {},
): UseRecommendationsListResult {
  const { itemCount = RECOMMENDATIONS_LIST_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<RecommendationsListSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildRecommendationsListItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortRecommendationsList(
        filterRecommendationsList(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalRecommendationsList(items), [items]);

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
