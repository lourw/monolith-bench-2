import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildFeedbackDetailsItems,
  type FeedbackDetailsItem,
  FEEDBACK_DETAILS_ITEM_COUNT,
} from './feedback-details.model';
import {
  filterFeedbackDetails,
  sortFeedbackDetails,
  totalFeedbackDetails,
  type FeedbackDetailsSortKey,
} from './feedback-details.utils';

export interface UseFeedbackDetailsOptions {
  itemCount?: number;
  initialSort?: FeedbackDetailsSortKey;
}

export interface UseFeedbackDetailsResult {
  items: FeedbackDetailsItem[];
  allItems: FeedbackDetailsItem[];
  selected: FeedbackDetailsItem | null;
  query: string;
  sortKey: FeedbackDetailsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalFeedbackDetails>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: FeedbackDetailsSortKey) => void;
  refresh: () => void;
}

export function useFeedbackDetails(
  options: UseFeedbackDetailsOptions = {},
): UseFeedbackDetailsResult {
  const { itemCount = FEEDBACK_DETAILS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<FeedbackDetailsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildFeedbackDetailsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortFeedbackDetails(filterFeedbackDetails(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalFeedbackDetails(items), [items]);

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
