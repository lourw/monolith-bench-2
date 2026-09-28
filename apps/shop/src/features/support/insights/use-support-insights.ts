import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSupportInsightsItems,
  type SupportInsightsItem,
  SUPPORT_INSIGHTS_ITEM_COUNT,
} from './support-insights.model';
import {
  filterSupportInsights,
  sortSupportInsights,
  totalSupportInsights,
  type SupportInsightsSortKey,
} from './support-insights.utils';

export interface UseSupportInsightsOptions {
  itemCount?: number;
  initialSort?: SupportInsightsSortKey;
}

export interface UseSupportInsightsResult {
  items: SupportInsightsItem[];
  allItems: SupportInsightsItem[];
  selected: SupportInsightsItem | null;
  query: string;
  sortKey: SupportInsightsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSupportInsights>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SupportInsightsSortKey) => void;
  refresh: () => void;
}

export function useSupportInsights(
  options: UseSupportInsightsOptions = {},
): UseSupportInsightsResult {
  const { itemCount = SUPPORT_INSIGHTS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SupportInsightsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSupportInsightsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortSupportInsights(filterSupportInsights(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSupportInsights(items), [items]);

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
