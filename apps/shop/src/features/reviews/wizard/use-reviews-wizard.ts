import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildReviewsWizardItems,
  type ReviewsWizardItem,
  REVIEWS_WIZARD_ITEM_COUNT,
} from './reviews-wizard.model';
import {
  filterReviewsWizard,
  sortReviewsWizard,
  totalReviewsWizard,
  type ReviewsWizardSortKey,
} from './reviews-wizard.utils';

export interface UseReviewsWizardOptions {
  itemCount?: number;
  initialSort?: ReviewsWizardSortKey;
}

export interface UseReviewsWizardResult {
  items: ReviewsWizardItem[];
  allItems: ReviewsWizardItem[];
  selected: ReviewsWizardItem | null;
  query: string;
  sortKey: ReviewsWizardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalReviewsWizard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ReviewsWizardSortKey) => void;
  refresh: () => void;
}

export function useReviewsWizard(
  options: UseReviewsWizardOptions = {},
): UseReviewsWizardResult {
  const { itemCount = REVIEWS_WIZARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ReviewsWizardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildReviewsWizardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortReviewsWizard(filterReviewsWizard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalReviewsWizard(items), [items]);

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
