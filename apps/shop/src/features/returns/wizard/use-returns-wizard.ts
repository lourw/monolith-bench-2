import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildReturnsWizardItems,
  type ReturnsWizardItem,
  RETURNS_WIZARD_ITEM_COUNT,
} from './returns-wizard.model';
import {
  filterReturnsWizard,
  sortReturnsWizard,
  totalReturnsWizard,
  type ReturnsWizardSortKey,
} from './returns-wizard.utils';

export interface UseReturnsWizardOptions {
  itemCount?: number;
  initialSort?: ReturnsWizardSortKey;
}

export interface UseReturnsWizardResult {
  items: ReturnsWizardItem[];
  allItems: ReturnsWizardItem[];
  selected: ReturnsWizardItem | null;
  query: string;
  sortKey: ReturnsWizardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalReturnsWizard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ReturnsWizardSortKey) => void;
  refresh: () => void;
}

export function useReturnsWizard(
  options: UseReturnsWizardOptions = {},
): UseReturnsWizardResult {
  const { itemCount = RETURNS_WIZARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ReturnsWizardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildReturnsWizardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortReturnsWizard(filterReturnsWizard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalReturnsWizard(items), [items]);

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
