import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSizingWizardItems,
  type SizingWizardItem,
  SIZING_WIZARD_ITEM_COUNT,
} from './sizing-wizard.model';
import {
  filterSizingWizard,
  sortSizingWizard,
  totalSizingWizard,
  type SizingWizardSortKey,
} from './sizing-wizard.utils';

export interface UseSizingWizardOptions {
  itemCount?: number;
  initialSort?: SizingWizardSortKey;
}

export interface UseSizingWizardResult {
  items: SizingWizardItem[];
  allItems: SizingWizardItem[];
  selected: SizingWizardItem | null;
  query: string;
  sortKey: SizingWizardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSizingWizard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SizingWizardSortKey) => void;
  refresh: () => void;
}

export function useSizingWizard(
  options: UseSizingWizardOptions = {},
): UseSizingWizardResult {
  const { itemCount = SIZING_WIZARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SizingWizardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSizingWizardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortSizingWizard(filterSizingWizard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSizingWizard(items), [items]);

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
