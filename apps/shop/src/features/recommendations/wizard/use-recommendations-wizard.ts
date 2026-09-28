import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildRecommendationsWizardItems,
  type RecommendationsWizardItem,
  RECOMMENDATIONS_WIZARD_ITEM_COUNT,
} from './recommendations-wizard.model';
import {
  filterRecommendationsWizard,
  sortRecommendationsWizard,
  totalRecommendationsWizard,
  type RecommendationsWizardSortKey,
} from './recommendations-wizard.utils';

export interface UseRecommendationsWizardOptions {
  itemCount?: number;
  initialSort?: RecommendationsWizardSortKey;
}

export interface UseRecommendationsWizardResult {
  items: RecommendationsWizardItem[];
  allItems: RecommendationsWizardItem[];
  selected: RecommendationsWizardItem | null;
  query: string;
  sortKey: RecommendationsWizardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalRecommendationsWizard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: RecommendationsWizardSortKey) => void;
  refresh: () => void;
}

export function useRecommendationsWizard(
  options: UseRecommendationsWizardOptions = {},
): UseRecommendationsWizardResult {
  const {
    itemCount = RECOMMENDATIONS_WIZARD_ITEM_COUNT,
    initialSort = 'name',
  } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<RecommendationsWizardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildRecommendationsWizardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortRecommendationsWizard(
        filterRecommendationsWizard(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalRecommendationsWizard(items), [items]);

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
