import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildBundlesWizardItems,
  type BundlesWizardItem,
  BUNDLES_WIZARD_ITEM_COUNT,
} from './bundles-wizard.model';
import {
  filterBundlesWizard,
  sortBundlesWizard,
  totalBundlesWizard,
  type BundlesWizardSortKey,
} from './bundles-wizard.utils';

export interface UseBundlesWizardOptions {
  itemCount?: number;
  initialSort?: BundlesWizardSortKey;
}

export interface UseBundlesWizardResult {
  items: BundlesWizardItem[];
  allItems: BundlesWizardItem[];
  selected: BundlesWizardItem | null;
  query: string;
  sortKey: BundlesWizardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalBundlesWizard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: BundlesWizardSortKey) => void;
  refresh: () => void;
}

export function useBundlesWizard(
  options: UseBundlesWizardOptions = {},
): UseBundlesWizardResult {
  const { itemCount = BUNDLES_WIZARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<BundlesWizardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildBundlesWizardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortBundlesWizard(filterBundlesWizard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalBundlesWizard(items), [items]);

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
