import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildPreordersEditorItems,
  type PreordersEditorItem,
  PREORDERS_EDITOR_ITEM_COUNT,
} from './preorders-editor.model';
import {
  filterPreordersEditor,
  sortPreordersEditor,
  totalPreordersEditor,
  type PreordersEditorSortKey,
} from './preorders-editor.utils';

export interface UsePreordersEditorOptions {
  itemCount?: number;
  initialSort?: PreordersEditorSortKey;
}

export interface UsePreordersEditorResult {
  items: PreordersEditorItem[];
  allItems: PreordersEditorItem[];
  selected: PreordersEditorItem | null;
  query: string;
  sortKey: PreordersEditorSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalPreordersEditor>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: PreordersEditorSortKey) => void;
  refresh: () => void;
}

export function usePreordersEditor(
  options: UsePreordersEditorOptions = {},
): UsePreordersEditorResult {
  const { itemCount = PREORDERS_EDITOR_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<PreordersEditorSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildPreordersEditorItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortPreordersEditor(filterPreordersEditor(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalPreordersEditor(items), [items]);

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
