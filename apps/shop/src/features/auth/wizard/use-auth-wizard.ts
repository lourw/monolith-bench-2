import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAuthWizardItems,
  type AuthWizardItem,
  AUTH_WIZARD_ITEM_COUNT,
} from './auth-wizard.model';
import {
  filterAuthWizard,
  sortAuthWizard,
  totalAuthWizard,
  type AuthWizardSortKey,
} from './auth-wizard.utils';

export interface UseAuthWizardOptions {
  itemCount?: number;
  initialSort?: AuthWizardSortKey;
}

export interface UseAuthWizardResult {
  items: AuthWizardItem[];
  allItems: AuthWizardItem[];
  selected: AuthWizardItem | null;
  query: string;
  sortKey: AuthWizardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAuthWizard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AuthWizardSortKey) => void;
  refresh: () => void;
}

export function useAuthWizard(
  options: UseAuthWizardOptions = {},
): UseAuthWizardResult {
  const { itemCount = AUTH_WIZARD_ITEM_COUNT, initialSort = 'name' } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AuthWizardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAuthWizardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortAuthWizard(filterAuthWizard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAuthWizard(items), [items]);

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
