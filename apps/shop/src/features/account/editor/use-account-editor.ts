import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAccountEditorItems,
  type AccountEditorItem,
  ACCOUNT_EDITOR_ITEM_COUNT,
} from './account-editor.model';
import {
  filterAccountEditor,
  sortAccountEditor,
  totalAccountEditor,
  type AccountEditorSortKey,
} from './account-editor.utils';

export interface UseAccountEditorOptions {
  itemCount?: number;
  initialSort?: AccountEditorSortKey;
}

export interface UseAccountEditorResult {
  items: AccountEditorItem[];
  allItems: AccountEditorItem[];
  selected: AccountEditorItem | null;
  query: string;
  sortKey: AccountEditorSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAccountEditor>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AccountEditorSortKey) => void;
  refresh: () => void;
}

export function useAccountEditor(
  options: UseAccountEditorOptions = {},
): UseAccountEditorResult {
  const { itemCount = ACCOUNT_EDITOR_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AccountEditorSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAccountEditorItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortAccountEditor(filterAccountEditor(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAccountEditor(items), [items]);

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
