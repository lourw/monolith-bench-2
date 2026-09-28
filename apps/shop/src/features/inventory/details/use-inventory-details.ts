import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildInventoryDetailsItems,
  type InventoryDetailsItem,
  INVENTORY_DETAILS_ITEM_COUNT,
} from './inventory-details.model';
import {
  filterInventoryDetails,
  sortInventoryDetails,
  totalInventoryDetails,
  type InventoryDetailsSortKey,
} from './inventory-details.utils';

export interface UseInventoryDetailsOptions {
  itemCount?: number;
  initialSort?: InventoryDetailsSortKey;
}

export interface UseInventoryDetailsResult {
  items: InventoryDetailsItem[];
  allItems: InventoryDetailsItem[];
  selected: InventoryDetailsItem | null;
  query: string;
  sortKey: InventoryDetailsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalInventoryDetails>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: InventoryDetailsSortKey) => void;
  refresh: () => void;
}

export function useInventoryDetails(
  options: UseInventoryDetailsOptions = {},
): UseInventoryDetailsResult {
  const { itemCount = INVENTORY_DETAILS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<InventoryDetailsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildInventoryDetailsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortInventoryDetails(filterInventoryDetails(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalInventoryDetails(items), [items]);

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
