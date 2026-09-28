import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildStoreLocatorEditorItems,
  type StoreLocatorEditorItem,
  STORE_LOCATOR_EDITOR_ITEM_COUNT,
} from './store-locator-editor.model';
import {
  filterStoreLocatorEditor,
  sortStoreLocatorEditor,
  totalStoreLocatorEditor,
  type StoreLocatorEditorSortKey,
} from './store-locator-editor.utils';

export interface UseStoreLocatorEditorOptions {
  itemCount?: number;
  initialSort?: StoreLocatorEditorSortKey;
}

export interface UseStoreLocatorEditorResult {
  items: StoreLocatorEditorItem[];
  allItems: StoreLocatorEditorItem[];
  selected: StoreLocatorEditorItem | null;
  query: string;
  sortKey: StoreLocatorEditorSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalStoreLocatorEditor>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: StoreLocatorEditorSortKey) => void;
  refresh: () => void;
}

export function useStoreLocatorEditor(
  options: UseStoreLocatorEditorOptions = {},
): UseStoreLocatorEditorResult {
  const { itemCount = STORE_LOCATOR_EDITOR_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<StoreLocatorEditorSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildStoreLocatorEditorItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortStoreLocatorEditor(
        filterStoreLocatorEditor(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalStoreLocatorEditor(items), [items]);

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
