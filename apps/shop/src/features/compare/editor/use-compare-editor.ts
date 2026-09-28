import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCompareEditorItems,
  type CompareEditorItem,
  COMPARE_EDITOR_ITEM_COUNT,
} from './compare-editor.model';
import {
  filterCompareEditor,
  sortCompareEditor,
  totalCompareEditor,
  type CompareEditorSortKey,
} from './compare-editor.utils';

export interface UseCompareEditorOptions {
  itemCount?: number;
  initialSort?: CompareEditorSortKey;
}

export interface UseCompareEditorResult {
  items: CompareEditorItem[];
  allItems: CompareEditorItem[];
  selected: CompareEditorItem | null;
  query: string;
  sortKey: CompareEditorSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCompareEditor>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CompareEditorSortKey) => void;
  refresh: () => void;
}

export function useCompareEditor(
  options: UseCompareEditorOptions = {},
): UseCompareEditorResult {
  const { itemCount = COMPARE_EDITOR_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CompareEditorSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCompareEditorItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortCompareEditor(filterCompareEditor(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCompareEditor(items), [items]);

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
