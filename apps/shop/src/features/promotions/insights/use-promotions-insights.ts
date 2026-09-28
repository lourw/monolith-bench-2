import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildPromotionsInsightsItems,
  type PromotionsInsightsItem,
  PROMOTIONS_INSIGHTS_ITEM_COUNT,
} from './promotions-insights.model';
import {
  filterPromotionsInsights,
  sortPromotionsInsights,
  totalPromotionsInsights,
  type PromotionsInsightsSortKey,
} from './promotions-insights.utils';

export interface UsePromotionsInsightsOptions {
  itemCount?: number;
  initialSort?: PromotionsInsightsSortKey;
}

export interface UsePromotionsInsightsResult {
  items: PromotionsInsightsItem[];
  allItems: PromotionsInsightsItem[];
  selected: PromotionsInsightsItem | null;
  query: string;
  sortKey: PromotionsInsightsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalPromotionsInsights>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: PromotionsInsightsSortKey) => void;
  refresh: () => void;
}

export function usePromotionsInsights(
  options: UsePromotionsInsightsOptions = {},
): UsePromotionsInsightsResult {
  const { itemCount = PROMOTIONS_INSIGHTS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<PromotionsInsightsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildPromotionsInsightsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortPromotionsInsights(
        filterPromotionsInsights(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalPromotionsInsights(items), [items]);

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
