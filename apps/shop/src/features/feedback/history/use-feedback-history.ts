import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildFeedbackHistoryItems,
  type FeedbackHistoryItem,
  FEEDBACK_HISTORY_ITEM_COUNT,
} from './feedback-history.model';
import {
  filterFeedbackHistory,
  sortFeedbackHistory,
  totalFeedbackHistory,
  type FeedbackHistorySortKey,
} from './feedback-history.utils';

export interface UseFeedbackHistoryOptions {
  itemCount?: number;
  initialSort?: FeedbackHistorySortKey;
}

export interface UseFeedbackHistoryResult {
  items: FeedbackHistoryItem[];
  allItems: FeedbackHistoryItem[];
  selected: FeedbackHistoryItem | null;
  query: string;
  sortKey: FeedbackHistorySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalFeedbackHistory>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: FeedbackHistorySortKey) => void;
  refresh: () => void;
}

export function useFeedbackHistory(
  options: UseFeedbackHistoryOptions = {},
): UseFeedbackHistoryResult {
  const { itemCount = FEEDBACK_HISTORY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<FeedbackHistorySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildFeedbackHistoryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortFeedbackHistory(filterFeedbackHistory(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalFeedbackHistory(items), [items]);

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
