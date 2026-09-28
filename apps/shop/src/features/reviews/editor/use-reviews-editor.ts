import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildReviewsEditorItems,
  type ReviewsEditorItem,
  REVIEWS_EDITOR_ITEM_COUNT,
} from './reviews-editor.model';
import {
  filterReviewsEditor,
  sortReviewsEditor,
  totalReviewsEditor,
  type ReviewsEditorSortKey,
} from './reviews-editor.utils';

export interface UseReviewsEditorOptions {
  itemCount?: number;
  initialSort?: ReviewsEditorSortKey;
}

export interface UseReviewsEditorResult {
  items: ReviewsEditorItem[];
  allItems: ReviewsEditorItem[];
  selected: ReviewsEditorItem | null;
  query: string;
  sortKey: ReviewsEditorSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalReviewsEditor>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ReviewsEditorSortKey) => void;
  refresh: () => void;
}

export function useReviewsEditor(
  options: UseReviewsEditorOptions = {},
): UseReviewsEditorResult {
  const { itemCount = REVIEWS_EDITOR_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ReviewsEditorSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildReviewsEditorItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortReviewsEditor(filterReviewsEditor(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalReviewsEditor(items), [items]);

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
