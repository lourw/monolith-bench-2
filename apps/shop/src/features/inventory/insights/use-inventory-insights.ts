import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildInventoryInsightsItems,
  type InventoryInsightsItem,
  INVENTORY_INSIGHTS_ITEM_COUNT,
} from './inventory-insights.model';
import {
  filterInventoryInsights,
  sortInventoryInsights,
  totalInventoryInsights,
  type InventoryInsightsSortKey,
} from './inventory-insights.utils';

export interface UseInventoryInsightsOptions {
  itemCount?: number;
  initialSort?: InventoryInsightsSortKey;
}

export interface UseInventoryInsightsResult {
  items: InventoryInsightsItem[];
  allItems: InventoryInsightsItem[];
  selected: InventoryInsightsItem | null;
  query: string;
  sortKey: InventoryInsightsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalInventoryInsights>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: InventoryInsightsSortKey) => void;
  refresh: () => void;
}

export function useInventoryInsights(
  options: UseInventoryInsightsOptions = {},
): UseInventoryInsightsResult {
  const { itemCount = INVENTORY_INSIGHTS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<InventoryInsightsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildInventoryInsightsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortInventoryInsights(filterInventoryInsights(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalInventoryInsights(items), [items]);

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
