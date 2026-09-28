import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildShippingEditorItems,
  type ShippingEditorItem,
  SHIPPING_EDITOR_ITEM_COUNT,
} from './shipping-editor.model';
import {
  filterShippingEditor,
  sortShippingEditor,
  totalShippingEditor,
  type ShippingEditorSortKey,
} from './shipping-editor.utils';

export interface UseShippingEditorOptions {
  itemCount?: number;
  initialSort?: ShippingEditorSortKey;
}

export interface UseShippingEditorResult {
  items: ShippingEditorItem[];
  allItems: ShippingEditorItem[];
  selected: ShippingEditorItem | null;
  query: string;
  sortKey: ShippingEditorSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalShippingEditor>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ShippingEditorSortKey) => void;
  refresh: () => void;
}

export function useShippingEditor(
  options: UseShippingEditorOptions = {},
): UseShippingEditorResult {
  const { itemCount = SHIPPING_EDITOR_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ShippingEditorSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildShippingEditorItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortShippingEditor(filterShippingEditor(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalShippingEditor(items), [items]);

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
