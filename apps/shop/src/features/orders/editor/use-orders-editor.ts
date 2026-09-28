import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildOrdersEditorItems,
  type OrdersEditorItem,
  ORDERS_EDITOR_ITEM_COUNT,
} from './orders-editor.model';
import {
  filterOrdersEditor,
  sortOrdersEditor,
  totalOrdersEditor,
  type OrdersEditorSortKey,
} from './orders-editor.utils';

export interface UseOrdersEditorOptions {
  itemCount?: number;
  initialSort?: OrdersEditorSortKey;
}

export interface UseOrdersEditorResult {
  items: OrdersEditorItem[];
  allItems: OrdersEditorItem[];
  selected: OrdersEditorItem | null;
  query: string;
  sortKey: OrdersEditorSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalOrdersEditor>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: OrdersEditorSortKey) => void;
  refresh: () => void;
}

export function useOrdersEditor(
  options: UseOrdersEditorOptions = {},
): UseOrdersEditorResult {
  const { itemCount = ORDERS_EDITOR_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<OrdersEditorSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildOrdersEditorItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortOrdersEditor(filterOrdersEditor(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalOrdersEditor(items), [items]);

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
