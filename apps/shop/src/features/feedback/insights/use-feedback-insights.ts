import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildFeedbackInsightsItems,
  type FeedbackInsightsItem,
  FEEDBACK_INSIGHTS_ITEM_COUNT,
} from './feedback-insights.model';
import {
  filterFeedbackInsights,
  sortFeedbackInsights,
  totalFeedbackInsights,
  type FeedbackInsightsSortKey,
} from './feedback-insights.utils';

export interface UseFeedbackInsightsOptions {
  itemCount?: number;
  initialSort?: FeedbackInsightsSortKey;
}

export interface UseFeedbackInsightsResult {
  items: FeedbackInsightsItem[];
  allItems: FeedbackInsightsItem[];
  selected: FeedbackInsightsItem | null;
  query: string;
  sortKey: FeedbackInsightsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalFeedbackInsights>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: FeedbackInsightsSortKey) => void;
  refresh: () => void;
}

export function useFeedbackInsights(
  options: UseFeedbackInsightsOptions = {},
): UseFeedbackInsightsResult {
  const { itemCount = FEEDBACK_INSIGHTS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<FeedbackInsightsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildFeedbackInsightsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortFeedbackInsights(filterFeedbackInsights(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalFeedbackInsights(items), [items]);

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
