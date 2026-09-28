import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildPreordersInsightsItems,
  type PreordersInsightsItem,
  PREORDERS_INSIGHTS_ITEM_COUNT,
} from './preorders-insights.model';
import {
  filterPreordersInsights,
  sortPreordersInsights,
  totalPreordersInsights,
  type PreordersInsightsSortKey,
} from './preorders-insights.utils';

export interface UsePreordersInsightsOptions {
  itemCount?: number;
  initialSort?: PreordersInsightsSortKey;
}

export interface UsePreordersInsightsResult {
  items: PreordersInsightsItem[];
  allItems: PreordersInsightsItem[];
  selected: PreordersInsightsItem | null;
  query: string;
  sortKey: PreordersInsightsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalPreordersInsights>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: PreordersInsightsSortKey) => void;
  refresh: () => void;
}

export function usePreordersInsights(
  options: UsePreordersInsightsOptions = {},
): UsePreordersInsightsResult {
  const { itemCount = PREORDERS_INSIGHTS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<PreordersInsightsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildPreordersInsightsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortPreordersInsights(filterPreordersInsights(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalPreordersInsights(items), [items]);

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
