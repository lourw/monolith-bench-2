import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildPaymentsEditorItems,
  type PaymentsEditorItem,
  PAYMENTS_EDITOR_ITEM_COUNT,
} from './payments-editor.model';
import {
  filterPaymentsEditor,
  sortPaymentsEditor,
  totalPaymentsEditor,
  type PaymentsEditorSortKey,
} from './payments-editor.utils';

export interface UsePaymentsEditorOptions {
  itemCount?: number;
  initialSort?: PaymentsEditorSortKey;
}

export interface UsePaymentsEditorResult {
  items: PaymentsEditorItem[];
  allItems: PaymentsEditorItem[];
  selected: PaymentsEditorItem | null;
  query: string;
  sortKey: PaymentsEditorSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalPaymentsEditor>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: PaymentsEditorSortKey) => void;
  refresh: () => void;
}

export function usePaymentsEditor(
  options: UsePaymentsEditorOptions = {},
): UsePaymentsEditorResult {
  const { itemCount = PAYMENTS_EDITOR_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<PaymentsEditorSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildPaymentsEditorItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortPaymentsEditor(filterPaymentsEditor(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalPaymentsEditor(items), [items]);

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
