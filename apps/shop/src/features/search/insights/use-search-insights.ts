import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSearchInsightsItems,
  type SearchInsightsItem,
  SEARCH_INSIGHTS_ITEM_COUNT,
} from './search-insights.model';
import {
  filterSearchInsights,
  sortSearchInsights,
  totalSearchInsights,
  type SearchInsightsSortKey,
} from './search-insights.utils';

export interface UseSearchInsightsOptions {
  itemCount?: number;
  initialSort?: SearchInsightsSortKey;
}

export interface UseSearchInsightsResult {
  items: SearchInsightsItem[];
  allItems: SearchInsightsItem[];
  selected: SearchInsightsItem | null;
  query: string;
  sortKey: SearchInsightsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSearchInsights>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SearchInsightsSortKey) => void;
  refresh: () => void;
}

export function useSearchInsights(
  options: UseSearchInsightsOptions = {},
): UseSearchInsightsResult {
  const { itemCount = SEARCH_INSIGHTS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SearchInsightsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSearchInsightsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortSearchInsights(filterSearchInsights(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSearchInsights(items), [items]);

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
