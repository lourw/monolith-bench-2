import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCartEditorItems,
  type CartEditorItem,
  CART_EDITOR_ITEM_COUNT,
} from './cart-editor.model';
import {
  filterCartEditor,
  sortCartEditor,
  totalCartEditor,
  type CartEditorSortKey,
} from './cart-editor.utils';

export interface UseCartEditorOptions {
  itemCount?: number;
  initialSort?: CartEditorSortKey;
}

export interface UseCartEditorResult {
  items: CartEditorItem[];
  allItems: CartEditorItem[];
  selected: CartEditorItem | null;
  query: string;
  sortKey: CartEditorSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCartEditor>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CartEditorSortKey) => void;
  refresh: () => void;
}

export function useCartEditor(
  options: UseCartEditorOptions = {},
): UseCartEditorResult {
  const { itemCount = CART_EDITOR_ITEM_COUNT, initialSort = 'name' } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CartEditorSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCartEditorItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortCartEditor(filterCartEditor(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCartEditor(items), [items]);

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
