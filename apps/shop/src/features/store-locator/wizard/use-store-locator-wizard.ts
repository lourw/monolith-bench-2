import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildStoreLocatorWizardItems,
  type StoreLocatorWizardItem,
  STORE_LOCATOR_WIZARD_ITEM_COUNT,
} from './store-locator-wizard.model';
import {
  filterStoreLocatorWizard,
  sortStoreLocatorWizard,
  totalStoreLocatorWizard,
  type StoreLocatorWizardSortKey,
} from './store-locator-wizard.utils';

export interface UseStoreLocatorWizardOptions {
  itemCount?: number;
  initialSort?: StoreLocatorWizardSortKey;
}

export interface UseStoreLocatorWizardResult {
  items: StoreLocatorWizardItem[];
  allItems: StoreLocatorWizardItem[];
  selected: StoreLocatorWizardItem | null;
  query: string;
  sortKey: StoreLocatorWizardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalStoreLocatorWizard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: StoreLocatorWizardSortKey) => void;
  refresh: () => void;
}

export function useStoreLocatorWizard(
  options: UseStoreLocatorWizardOptions = {},
): UseStoreLocatorWizardResult {
  const { itemCount = STORE_LOCATOR_WIZARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<StoreLocatorWizardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildStoreLocatorWizardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortStoreLocatorWizard(
        filterStoreLocatorWizard(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalStoreLocatorWizard(items), [items]);

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
