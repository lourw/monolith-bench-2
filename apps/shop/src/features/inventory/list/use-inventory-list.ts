import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildInventoryListItems,
  type InventoryListItem,
  INVENTORY_LIST_ITEM_COUNT,
} from './inventory-list.model';
import {
  filterInventoryList,
  sortInventoryList,
  totalInventoryList,
  type InventoryListSortKey,
} from './inventory-list.utils';

export interface UseInventoryListOptions {
  itemCount?: number;
  initialSort?: InventoryListSortKey;
}

export interface UseInventoryListResult {
  items: InventoryListItem[];
  allItems: InventoryListItem[];
  selected: InventoryListItem | null;
  query: string;
  sortKey: InventoryListSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalInventoryList>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: InventoryListSortKey) => void;
  refresh: () => void;
}

export function useInventoryList(
  options: UseInventoryListOptions = {},
): UseInventoryListResult {
  const { itemCount = INVENTORY_LIST_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<InventoryListSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildInventoryListItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortInventoryList(filterInventoryList(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalInventoryList(items), [items]);

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
