import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildReturnsEditorItems,
  type ReturnsEditorItem,
  RETURNS_EDITOR_ITEM_COUNT,
} from './returns-editor.model';
import {
  filterReturnsEditor,
  sortReturnsEditor,
  totalReturnsEditor,
  type ReturnsEditorSortKey,
} from './returns-editor.utils';

export interface UseReturnsEditorOptions {
  itemCount?: number;
  initialSort?: ReturnsEditorSortKey;
}

export interface UseReturnsEditorResult {
  items: ReturnsEditorItem[];
  allItems: ReturnsEditorItem[];
  selected: ReturnsEditorItem | null;
  query: string;
  sortKey: ReturnsEditorSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalReturnsEditor>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ReturnsEditorSortKey) => void;
  refresh: () => void;
}

export function useReturnsEditor(
  options: UseReturnsEditorOptions = {},
): UseReturnsEditorResult {
  const { itemCount = RETURNS_EDITOR_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ReturnsEditorSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildReturnsEditorItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortReturnsEditor(filterReturnsEditor(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalReturnsEditor(items), [items]);

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
