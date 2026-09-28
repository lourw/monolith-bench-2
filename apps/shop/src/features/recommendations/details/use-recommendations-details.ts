import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildRecommendationsDetailsItems,
  type RecommendationsDetailsItem,
  RECOMMENDATIONS_DETAILS_ITEM_COUNT,
} from './recommendations-details.model';
import {
  filterRecommendationsDetails,
  sortRecommendationsDetails,
  totalRecommendationsDetails,
  type RecommendationsDetailsSortKey,
} from './recommendations-details.utils';

export interface UseRecommendationsDetailsOptions {
  itemCount?: number;
  initialSort?: RecommendationsDetailsSortKey;
}

export interface UseRecommendationsDetailsResult {
  items: RecommendationsDetailsItem[];
  allItems: RecommendationsDetailsItem[];
  selected: RecommendationsDetailsItem | null;
  query: string;
  sortKey: RecommendationsDetailsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalRecommendationsDetails>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: RecommendationsDetailsSortKey) => void;
  refresh: () => void;
}

export function useRecommendationsDetails(
  options: UseRecommendationsDetailsOptions = {},
): UseRecommendationsDetailsResult {
  const {
    itemCount = RECOMMENDATIONS_DETAILS_ITEM_COUNT,
    initialSort = 'name',
  } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<RecommendationsDetailsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildRecommendationsDetailsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortRecommendationsDetails(
        filterRecommendationsDetails(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalRecommendationsDetails(items), [items]);

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
