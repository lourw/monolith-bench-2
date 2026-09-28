import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCatalogEditorItems,
  type CatalogEditorItem,
  CATALOG_EDITOR_ITEM_COUNT,
} from './catalog-editor.model';
import {
  filterCatalogEditor,
  sortCatalogEditor,
  totalCatalogEditor,
  type CatalogEditorSortKey,
} from './catalog-editor.utils';

export interface UseCatalogEditorOptions {
  itemCount?: number;
  initialSort?: CatalogEditorSortKey;
}

export interface UseCatalogEditorResult {
  items: CatalogEditorItem[];
  allItems: CatalogEditorItem[];
  selected: CatalogEditorItem | null;
  query: string;
  sortKey: CatalogEditorSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCatalogEditor>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CatalogEditorSortKey) => void;
  refresh: () => void;
}

export function useCatalogEditor(
  options: UseCatalogEditorOptions = {},
): UseCatalogEditorResult {
  const { itemCount = CATALOG_EDITOR_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CatalogEditorSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCatalogEditorItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortCatalogEditor(filterCatalogEditor(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCatalogEditor(items), [items]);

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
