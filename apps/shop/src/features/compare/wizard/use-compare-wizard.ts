import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCompareWizardItems,
  type CompareWizardItem,
  COMPARE_WIZARD_ITEM_COUNT,
} from './compare-wizard.model';
import {
  filterCompareWizard,
  sortCompareWizard,
  totalCompareWizard,
  type CompareWizardSortKey,
} from './compare-wizard.utils';

export interface UseCompareWizardOptions {
  itemCount?: number;
  initialSort?: CompareWizardSortKey;
}

export interface UseCompareWizardResult {
  items: CompareWizardItem[];
  allItems: CompareWizardItem[];
  selected: CompareWizardItem | null;
  query: string;
  sortKey: CompareWizardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCompareWizard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CompareWizardSortKey) => void;
  refresh: () => void;
}

export function useCompareWizard(
  options: UseCompareWizardOptions = {},
): UseCompareWizardResult {
  const { itemCount = COMPARE_WIZARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CompareWizardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCompareWizardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortCompareWizard(filterCompareWizard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCompareWizard(items), [items]);

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
