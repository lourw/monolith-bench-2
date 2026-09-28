import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSizingEditorItems,
  type SizingEditorItem,
  SIZING_EDITOR_ITEM_COUNT,
} from './sizing-editor.model';
import {
  filterSizingEditor,
  sortSizingEditor,
  totalSizingEditor,
  type SizingEditorSortKey,
} from './sizing-editor.utils';

export interface UseSizingEditorOptions {
  itemCount?: number;
  initialSort?: SizingEditorSortKey;
}

export interface UseSizingEditorResult {
  items: SizingEditorItem[];
  allItems: SizingEditorItem[];
  selected: SizingEditorItem | null;
  query: string;
  sortKey: SizingEditorSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSizingEditor>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SizingEditorSortKey) => void;
  refresh: () => void;
}

export function useSizingEditor(
  options: UseSizingEditorOptions = {},
): UseSizingEditorResult {
  const { itemCount = SIZING_EDITOR_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SizingEditorSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSizingEditorItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortSizingEditor(filterSizingEditor(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSizingEditor(items), [items]);

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
