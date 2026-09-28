import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildFeedbackEditorItems,
  type FeedbackEditorItem,
  FEEDBACK_EDITOR_ITEM_COUNT,
} from './feedback-editor.model';
import {
  filterFeedbackEditor,
  sortFeedbackEditor,
  totalFeedbackEditor,
  type FeedbackEditorSortKey,
} from './feedback-editor.utils';

export interface UseFeedbackEditorOptions {
  itemCount?: number;
  initialSort?: FeedbackEditorSortKey;
}

export interface UseFeedbackEditorResult {
  items: FeedbackEditorItem[];
  allItems: FeedbackEditorItem[];
  selected: FeedbackEditorItem | null;
  query: string;
  sortKey: FeedbackEditorSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalFeedbackEditor>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: FeedbackEditorSortKey) => void;
  refresh: () => void;
}

export function useFeedbackEditor(
  options: UseFeedbackEditorOptions = {},
): UseFeedbackEditorResult {
  const { itemCount = FEEDBACK_EDITOR_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<FeedbackEditorSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildFeedbackEditorItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortFeedbackEditor(filterFeedbackEditor(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalFeedbackEditor(items), [items]);

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
