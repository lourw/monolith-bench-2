import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildBundlesEditorItems,
  type BundlesEditorItem,
  BUNDLES_EDITOR_ITEM_COUNT,
} from './bundles-editor.model';
import {
  filterBundlesEditor,
  sortBundlesEditor,
  totalBundlesEditor,
  type BundlesEditorSortKey,
} from './bundles-editor.utils';

export interface UseBundlesEditorOptions {
  itemCount?: number;
  initialSort?: BundlesEditorSortKey;
}

export interface UseBundlesEditorResult {
  items: BundlesEditorItem[];
  allItems: BundlesEditorItem[];
  selected: BundlesEditorItem | null;
  query: string;
  sortKey: BundlesEditorSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalBundlesEditor>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: BundlesEditorSortKey) => void;
  refresh: () => void;
}

export function useBundlesEditor(
  options: UseBundlesEditorOptions = {},
): UseBundlesEditorResult {
  const { itemCount = BUNDLES_EDITOR_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<BundlesEditorSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildBundlesEditorItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortBundlesEditor(filterBundlesEditor(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalBundlesEditor(items), [items]);

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
