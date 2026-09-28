import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSizingInsightsItems,
  type SizingInsightsItem,
  SIZING_INSIGHTS_ITEM_COUNT,
} from './sizing-insights.model';
import {
  filterSizingInsights,
  sortSizingInsights,
  totalSizingInsights,
  type SizingInsightsSortKey,
} from './sizing-insights.utils';

export interface UseSizingInsightsOptions {
  itemCount?: number;
  initialSort?: SizingInsightsSortKey;
}

export interface UseSizingInsightsResult {
  items: SizingInsightsItem[];
  allItems: SizingInsightsItem[];
  selected: SizingInsightsItem | null;
  query: string;
  sortKey: SizingInsightsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSizingInsights>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SizingInsightsSortKey) => void;
  refresh: () => void;
}

export function useSizingInsights(
  options: UseSizingInsightsOptions = {},
): UseSizingInsightsResult {
  const { itemCount = SIZING_INSIGHTS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SizingInsightsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSizingInsightsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortSizingInsights(filterSizingInsights(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSizingInsights(items), [items]);

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
