import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildInventoryEditorItems,
  type InventoryEditorItem,
  INVENTORY_EDITOR_ITEM_COUNT,
} from './inventory-editor.model';
import {
  filterInventoryEditor,
  sortInventoryEditor,
  totalInventoryEditor,
  type InventoryEditorSortKey,
} from './inventory-editor.utils';

export interface UseInventoryEditorOptions {
  itemCount?: number;
  initialSort?: InventoryEditorSortKey;
}

export interface UseInventoryEditorResult {
  items: InventoryEditorItem[];
  allItems: InventoryEditorItem[];
  selected: InventoryEditorItem | null;
  query: string;
  sortKey: InventoryEditorSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalInventoryEditor>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: InventoryEditorSortKey) => void;
  refresh: () => void;
}

export function useInventoryEditor(
  options: UseInventoryEditorOptions = {},
): UseInventoryEditorResult {
  const { itemCount = INVENTORY_EDITOR_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<InventoryEditorSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildInventoryEditorItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortInventoryEditor(filterInventoryEditor(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalInventoryEditor(items), [items]);

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
