import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildRecommendationsHistoryItems,
  type RecommendationsHistoryItem,
  RECOMMENDATIONS_HISTORY_ITEM_COUNT,
} from './recommendations-history.model';
import {
  filterRecommendationsHistory,
  sortRecommendationsHistory,
  totalRecommendationsHistory,
  type RecommendationsHistorySortKey,
} from './recommendations-history.utils';

export interface UseRecommendationsHistoryOptions {
  itemCount?: number;
  initialSort?: RecommendationsHistorySortKey;
}

export interface UseRecommendationsHistoryResult {
  items: RecommendationsHistoryItem[];
  allItems: RecommendationsHistoryItem[];
  selected: RecommendationsHistoryItem | null;
  query: string;
  sortKey: RecommendationsHistorySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalRecommendationsHistory>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: RecommendationsHistorySortKey) => void;
  refresh: () => void;
}

export function useRecommendationsHistory(
  options: UseRecommendationsHistoryOptions = {},
): UseRecommendationsHistoryResult {
  const {
    itemCount = RECOMMENDATIONS_HISTORY_ITEM_COUNT,
    initialSort = 'name',
  } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<RecommendationsHistorySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildRecommendationsHistoryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortRecommendationsHistory(
        filterRecommendationsHistory(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalRecommendationsHistory(items), [items]);

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
