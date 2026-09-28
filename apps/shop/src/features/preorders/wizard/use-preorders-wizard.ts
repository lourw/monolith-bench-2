import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildPreordersWizardItems,
  type PreordersWizardItem,
  PREORDERS_WIZARD_ITEM_COUNT,
} from './preorders-wizard.model';
import {
  filterPreordersWizard,
  sortPreordersWizard,
  totalPreordersWizard,
  type PreordersWizardSortKey,
} from './preorders-wizard.utils';

export interface UsePreordersWizardOptions {
  itemCount?: number;
  initialSort?: PreordersWizardSortKey;
}

export interface UsePreordersWizardResult {
  items: PreordersWizardItem[];
  allItems: PreordersWizardItem[];
  selected: PreordersWizardItem | null;
  query: string;
  sortKey: PreordersWizardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalPreordersWizard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: PreordersWizardSortKey) => void;
  refresh: () => void;
}

export function usePreordersWizard(
  options: UsePreordersWizardOptions = {},
): UsePreordersWizardResult {
  const { itemCount = PREORDERS_WIZARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<PreordersWizardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildPreordersWizardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortPreordersWizard(filterPreordersWizard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalPreordersWizard(items), [items]);

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
