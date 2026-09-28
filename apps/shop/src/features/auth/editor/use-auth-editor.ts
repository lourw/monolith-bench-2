import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAuthEditorItems,
  type AuthEditorItem,
  AUTH_EDITOR_ITEM_COUNT,
} from './auth-editor.model';
import {
  filterAuthEditor,
  sortAuthEditor,
  totalAuthEditor,
  type AuthEditorSortKey,
} from './auth-editor.utils';

export interface UseAuthEditorOptions {
  itemCount?: number;
  initialSort?: AuthEditorSortKey;
}

export interface UseAuthEditorResult {
  items: AuthEditorItem[];
  allItems: AuthEditorItem[];
  selected: AuthEditorItem | null;
  query: string;
  sortKey: AuthEditorSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAuthEditor>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AuthEditorSortKey) => void;
  refresh: () => void;
}

export function useAuthEditor(
  options: UseAuthEditorOptions = {},
): UseAuthEditorResult {
  const { itemCount = AUTH_EDITOR_ITEM_COUNT, initialSort = 'name' } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AuthEditorSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAuthEditorItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortAuthEditor(filterAuthEditor(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAuthEditor(items), [items]);

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
