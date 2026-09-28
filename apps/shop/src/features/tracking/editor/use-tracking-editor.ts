import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildTrackingEditorItems,
  type TrackingEditorItem,
  TRACKING_EDITOR_ITEM_COUNT,
} from './tracking-editor.model';
import {
  filterTrackingEditor,
  sortTrackingEditor,
  totalTrackingEditor,
  type TrackingEditorSortKey,
} from './tracking-editor.utils';

export interface UseTrackingEditorOptions {
  itemCount?: number;
  initialSort?: TrackingEditorSortKey;
}

export interface UseTrackingEditorResult {
  items: TrackingEditorItem[];
  allItems: TrackingEditorItem[];
  selected: TrackingEditorItem | null;
  query: string;
  sortKey: TrackingEditorSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalTrackingEditor>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: TrackingEditorSortKey) => void;
  refresh: () => void;
}

export function useTrackingEditor(
  options: UseTrackingEditorOptions = {},
): UseTrackingEditorResult {
  const { itemCount = TRACKING_EDITOR_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<TrackingEditorSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildTrackingEditorItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortTrackingEditor(filterTrackingEditor(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalTrackingEditor(items), [items]);

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
