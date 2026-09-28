import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildFeedbackOverviewItems,
  type FeedbackOverviewItem,
  FEEDBACK_OVERVIEW_ITEM_COUNT,
} from './feedback-overview.model';
import {
  filterFeedbackOverview,
  sortFeedbackOverview,
  totalFeedbackOverview,
  type FeedbackOverviewSortKey,
} from './feedback-overview.utils';

export interface UseFeedbackOverviewOptions {
  itemCount?: number;
  initialSort?: FeedbackOverviewSortKey;
}

export interface UseFeedbackOverviewResult {
  items: FeedbackOverviewItem[];
  allItems: FeedbackOverviewItem[];
  selected: FeedbackOverviewItem | null;
  query: string;
  sortKey: FeedbackOverviewSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalFeedbackOverview>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: FeedbackOverviewSortKey) => void;
  refresh: () => void;
}

export function useFeedbackOverview(
  options: UseFeedbackOverviewOptions = {},
): UseFeedbackOverviewResult {
  const { itemCount = FEEDBACK_OVERVIEW_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<FeedbackOverviewSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildFeedbackOverviewItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortFeedbackOverview(filterFeedbackOverview(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalFeedbackOverview(items), [items]);

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
