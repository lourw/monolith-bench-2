import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildInventoryOverviewItems,
  type InventoryOverviewItem,
  INVENTORY_OVERVIEW_ITEM_COUNT,
} from './inventory-overview.model';
import {
  filterInventoryOverview,
  sortInventoryOverview,
  totalInventoryOverview,
  type InventoryOverviewSortKey,
} from './inventory-overview.utils';

export interface UseInventoryOverviewOptions {
  itemCount?: number;
  initialSort?: InventoryOverviewSortKey;
}

export interface UseInventoryOverviewResult {
  items: InventoryOverviewItem[];
  allItems: InventoryOverviewItem[];
  selected: InventoryOverviewItem | null;
  query: string;
  sortKey: InventoryOverviewSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalInventoryOverview>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: InventoryOverviewSortKey) => void;
  refresh: () => void;
}

export function useInventoryOverview(
  options: UseInventoryOverviewOptions = {},
): UseInventoryOverviewResult {
  const { itemCount = INVENTORY_OVERVIEW_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<InventoryOverviewSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildInventoryOverviewItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortInventoryOverview(filterInventoryOverview(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalInventoryOverview(items), [items]);

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
