import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAnalyticsWizardItems,
  type AnalyticsWizardItem,
  ANALYTICS_WIZARD_ITEM_COUNT,
} from './analytics-wizard.model';
import {
  filterAnalyticsWizard,
  sortAnalyticsWizard,
  totalAnalyticsWizard,
  type AnalyticsWizardSortKey,
} from './analytics-wizard.utils';

export interface UseAnalyticsWizardOptions {
  itemCount?: number;
  initialSort?: AnalyticsWizardSortKey;
}

export interface UseAnalyticsWizardResult {
  items: AnalyticsWizardItem[];
  allItems: AnalyticsWizardItem[];
  selected: AnalyticsWizardItem | null;
  query: string;
  sortKey: AnalyticsWizardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAnalyticsWizard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AnalyticsWizardSortKey) => void;
  refresh: () => void;
}

export function useAnalyticsWizard(
  options: UseAnalyticsWizardOptions = {},
): UseAnalyticsWizardResult {
  const { itemCount = ANALYTICS_WIZARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AnalyticsWizardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAnalyticsWizardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortAnalyticsWizard(filterAnalyticsWizard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAnalyticsWizard(items), [items]);

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
