import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSearchWizardItems,
  type SearchWizardItem,
  SEARCH_WIZARD_ITEM_COUNT,
} from './search-wizard.model';
import {
  filterSearchWizard,
  sortSearchWizard,
  totalSearchWizard,
  type SearchWizardSortKey,
} from './search-wizard.utils';

export interface UseSearchWizardOptions {
  itemCount?: number;
  initialSort?: SearchWizardSortKey;
}

export interface UseSearchWizardResult {
  items: SearchWizardItem[];
  allItems: SearchWizardItem[];
  selected: SearchWizardItem | null;
  query: string;
  sortKey: SearchWizardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSearchWizard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SearchWizardSortKey) => void;
  refresh: () => void;
}

export function useSearchWizard(
  options: UseSearchWizardOptions = {},
): UseSearchWizardResult {
  const { itemCount = SEARCH_WIZARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SearchWizardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSearchWizardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortSearchWizard(filterSearchWizard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSearchWizard(items), [items]);

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
