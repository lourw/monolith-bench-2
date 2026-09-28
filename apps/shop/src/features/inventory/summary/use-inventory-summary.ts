import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildInventorySummaryItems,
  type InventorySummaryItem,
  INVENTORY_SUMMARY_ITEM_COUNT,
} from './inventory-summary.model';
import {
  filterInventorySummary,
  sortInventorySummary,
  totalInventorySummary,
  type InventorySummarySortKey,
} from './inventory-summary.utils';

export interface UseInventorySummaryOptions {
  itemCount?: number;
  initialSort?: InventorySummarySortKey;
}

export interface UseInventorySummaryResult {
  items: InventorySummaryItem[];
  allItems: InventorySummaryItem[];
  selected: InventorySummaryItem | null;
  query: string;
  sortKey: InventorySummarySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalInventorySummary>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: InventorySummarySortKey) => void;
  refresh: () => void;
}

export function useInventorySummary(
  options: UseInventorySummaryOptions = {},
): UseInventorySummaryResult {
  const { itemCount = INVENTORY_SUMMARY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<InventorySummarySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildInventorySummaryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortInventorySummary(filterInventorySummary(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalInventorySummary(items), [items]);

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
