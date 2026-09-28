import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSupportEditorItems,
  type SupportEditorItem,
  SUPPORT_EDITOR_ITEM_COUNT,
} from './support-editor.model';
import {
  filterSupportEditor,
  sortSupportEditor,
  totalSupportEditor,
  type SupportEditorSortKey,
} from './support-editor.utils';

export interface UseSupportEditorOptions {
  itemCount?: number;
  initialSort?: SupportEditorSortKey;
}

export interface UseSupportEditorResult {
  items: SupportEditorItem[];
  allItems: SupportEditorItem[];
  selected: SupportEditorItem | null;
  query: string;
  sortKey: SupportEditorSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSupportEditor>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SupportEditorSortKey) => void;
  refresh: () => void;
}

export function useSupportEditor(
  options: UseSupportEditorOptions = {},
): UseSupportEditorResult {
  const { itemCount = SUPPORT_EDITOR_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SupportEditorSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSupportEditorItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortSupportEditor(filterSupportEditor(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSupportEditor(items), [items]);

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
