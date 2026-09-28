import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAnalyticsEditorItems,
  type AnalyticsEditorItem,
  ANALYTICS_EDITOR_ITEM_COUNT,
} from './analytics-editor.model';
import {
  filterAnalyticsEditor,
  sortAnalyticsEditor,
  totalAnalyticsEditor,
  type AnalyticsEditorSortKey,
} from './analytics-editor.utils';

export interface UseAnalyticsEditorOptions {
  itemCount?: number;
  initialSort?: AnalyticsEditorSortKey;
}

export interface UseAnalyticsEditorResult {
  items: AnalyticsEditorItem[];
  allItems: AnalyticsEditorItem[];
  selected: AnalyticsEditorItem | null;
  query: string;
  sortKey: AnalyticsEditorSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAnalyticsEditor>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AnalyticsEditorSortKey) => void;
  refresh: () => void;
}

export function useAnalyticsEditor(
  options: UseAnalyticsEditorOptions = {},
): UseAnalyticsEditorResult {
  const { itemCount = ANALYTICS_EDITOR_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AnalyticsEditorSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAnalyticsEditorItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortAnalyticsEditor(filterAnalyticsEditor(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAnalyticsEditor(items), [items]);

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
