import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildProfileEditorItems,
  type ProfileEditorItem,
  PROFILE_EDITOR_ITEM_COUNT,
} from './profile-editor.model';
import {
  filterProfileEditor,
  sortProfileEditor,
  totalProfileEditor,
  type ProfileEditorSortKey,
} from './profile-editor.utils';

export interface UseProfileEditorOptions {
  itemCount?: number;
  initialSort?: ProfileEditorSortKey;
}

export interface UseProfileEditorResult {
  items: ProfileEditorItem[];
  allItems: ProfileEditorItem[];
  selected: ProfileEditorItem | null;
  query: string;
  sortKey: ProfileEditorSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalProfileEditor>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ProfileEditorSortKey) => void;
  refresh: () => void;
}

export function useProfileEditor(
  options: UseProfileEditorOptions = {},
): UseProfileEditorResult {
  const { itemCount = PROFILE_EDITOR_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ProfileEditorSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildProfileEditorItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortProfileEditor(filterProfileEditor(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalProfileEditor(items), [items]);

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
