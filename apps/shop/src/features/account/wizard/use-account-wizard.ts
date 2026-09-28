import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAccountWizardItems,
  type AccountWizardItem,
  ACCOUNT_WIZARD_ITEM_COUNT,
} from './account-wizard.model';
import {
  filterAccountWizard,
  sortAccountWizard,
  totalAccountWizard,
  type AccountWizardSortKey,
} from './account-wizard.utils';

export interface UseAccountWizardOptions {
  itemCount?: number;
  initialSort?: AccountWizardSortKey;
}

export interface UseAccountWizardResult {
  items: AccountWizardItem[];
  allItems: AccountWizardItem[];
  selected: AccountWizardItem | null;
  query: string;
  sortKey: AccountWizardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAccountWizard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AccountWizardSortKey) => void;
  refresh: () => void;
}

export function useAccountWizard(
  options: UseAccountWizardOptions = {},
): UseAccountWizardResult {
  const { itemCount = ACCOUNT_WIZARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AccountWizardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAccountWizardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortAccountWizard(filterAccountWizard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAccountWizard(items), [items]);

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
