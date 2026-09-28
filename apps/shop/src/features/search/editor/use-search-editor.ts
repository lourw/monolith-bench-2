import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSearchEditorItems,
  type SearchEditorItem,
  SEARCH_EDITOR_ITEM_COUNT,
} from './search-editor.model';
import {
  filterSearchEditor,
  sortSearchEditor,
  totalSearchEditor,
  type SearchEditorSortKey,
} from './search-editor.utils';

export interface UseSearchEditorOptions {
  itemCount?: number;
  initialSort?: SearchEditorSortKey;
}

export interface UseSearchEditorResult {
  items: SearchEditorItem[];
  allItems: SearchEditorItem[];
  selected: SearchEditorItem | null;
  query: string;
  sortKey: SearchEditorSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSearchEditor>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SearchEditorSortKey) => void;
  refresh: () => void;
}

export function useSearchEditor(
  options: UseSearchEditorOptions = {},
): UseSearchEditorResult {
  const { itemCount = SEARCH_EDITOR_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SearchEditorSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSearchEditorItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortSearchEditor(filterSearchEditor(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSearchEditor(items), [items]);

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
