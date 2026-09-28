import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildFeedbackSummaryItems,
  type FeedbackSummaryItem,
  FEEDBACK_SUMMARY_ITEM_COUNT,
} from './feedback-summary.model';
import {
  filterFeedbackSummary,
  sortFeedbackSummary,
  totalFeedbackSummary,
  type FeedbackSummarySortKey,
} from './feedback-summary.utils';

export interface UseFeedbackSummaryOptions {
  itemCount?: number;
  initialSort?: FeedbackSummarySortKey;
}

export interface UseFeedbackSummaryResult {
  items: FeedbackSummaryItem[];
  allItems: FeedbackSummaryItem[];
  selected: FeedbackSummaryItem | null;
  query: string;
  sortKey: FeedbackSummarySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalFeedbackSummary>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: FeedbackSummarySortKey) => void;
  refresh: () => void;
}

export function useFeedbackSummary(
  options: UseFeedbackSummaryOptions = {},
): UseFeedbackSummaryResult {
  const { itemCount = FEEDBACK_SUMMARY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<FeedbackSummarySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildFeedbackSummaryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortFeedbackSummary(filterFeedbackSummary(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalFeedbackSummary(items), [items]);

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
