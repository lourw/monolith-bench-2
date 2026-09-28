import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildFeedbackListItems,
  type FeedbackListItem,
  FEEDBACK_LIST_ITEM_COUNT,
} from './feedback-list.model';
import {
  filterFeedbackList,
  sortFeedbackList,
  totalFeedbackList,
  type FeedbackListSortKey,
} from './feedback-list.utils';

export interface UseFeedbackListOptions {
  itemCount?: number;
  initialSort?: FeedbackListSortKey;
}

export interface UseFeedbackListResult {
  items: FeedbackListItem[];
  allItems: FeedbackListItem[];
  selected: FeedbackListItem | null;
  query: string;
  sortKey: FeedbackListSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalFeedbackList>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: FeedbackListSortKey) => void;
  refresh: () => void;
}

export function useFeedbackList(
  options: UseFeedbackListOptions = {},
): UseFeedbackListResult {
  const { itemCount = FEEDBACK_LIST_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<FeedbackListSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildFeedbackListItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortFeedbackList(filterFeedbackList(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalFeedbackList(items), [items]);

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
