import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildBundlesInsightsItems,
  type BundlesInsightsItem,
  BUNDLES_INSIGHTS_ITEM_COUNT,
} from './bundles-insights.model';
import {
  filterBundlesInsights,
  sortBundlesInsights,
  totalBundlesInsights,
  type BundlesInsightsSortKey,
} from './bundles-insights.utils';

export interface UseBundlesInsightsOptions {
  itemCount?: number;
  initialSort?: BundlesInsightsSortKey;
}

export interface UseBundlesInsightsResult {
  items: BundlesInsightsItem[];
  allItems: BundlesInsightsItem[];
  selected: BundlesInsightsItem | null;
  query: string;
  sortKey: BundlesInsightsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalBundlesInsights>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: BundlesInsightsSortKey) => void;
  refresh: () => void;
}

export function useBundlesInsights(
  options: UseBundlesInsightsOptions = {},
): UseBundlesInsightsResult {
  const { itemCount = BUNDLES_INSIGHTS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<BundlesInsightsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildBundlesInsightsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortBundlesInsights(filterBundlesInsights(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalBundlesInsights(items), [items]);

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
