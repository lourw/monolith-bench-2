import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildFeedbackWizardItems,
  type FeedbackWizardItem,
  FEEDBACK_WIZARD_ITEM_COUNT,
} from './feedback-wizard.model';
import {
  filterFeedbackWizard,
  sortFeedbackWizard,
  totalFeedbackWizard,
  type FeedbackWizardSortKey,
} from './feedback-wizard.utils';

export interface UseFeedbackWizardOptions {
  itemCount?: number;
  initialSort?: FeedbackWizardSortKey;
}

export interface UseFeedbackWizardResult {
  items: FeedbackWizardItem[];
  allItems: FeedbackWizardItem[];
  selected: FeedbackWizardItem | null;
  query: string;
  sortKey: FeedbackWizardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalFeedbackWizard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: FeedbackWizardSortKey) => void;
  refresh: () => void;
}

export function useFeedbackWizard(
  options: UseFeedbackWizardOptions = {},
): UseFeedbackWizardResult {
  const { itemCount = FEEDBACK_WIZARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<FeedbackWizardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildFeedbackWizardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortFeedbackWizard(filterFeedbackWizard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalFeedbackWizard(items), [items]);

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
