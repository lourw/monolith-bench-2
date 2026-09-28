import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCheckoutEditorItems,
  type CheckoutEditorItem,
  CHECKOUT_EDITOR_ITEM_COUNT,
} from './checkout-editor.model';
import {
  filterCheckoutEditor,
  sortCheckoutEditor,
  totalCheckoutEditor,
  type CheckoutEditorSortKey,
} from './checkout-editor.utils';

export interface UseCheckoutEditorOptions {
  itemCount?: number;
  initialSort?: CheckoutEditorSortKey;
}

export interface UseCheckoutEditorResult {
  items: CheckoutEditorItem[];
  allItems: CheckoutEditorItem[];
  selected: CheckoutEditorItem | null;
  query: string;
  sortKey: CheckoutEditorSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCheckoutEditor>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CheckoutEditorSortKey) => void;
  refresh: () => void;
}

export function useCheckoutEditor(
  options: UseCheckoutEditorOptions = {},
): UseCheckoutEditorResult {
  const { itemCount = CHECKOUT_EDITOR_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CheckoutEditorSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCheckoutEditorItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortCheckoutEditor(filterCheckoutEditor(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCheckoutEditor(items), [items]);

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
