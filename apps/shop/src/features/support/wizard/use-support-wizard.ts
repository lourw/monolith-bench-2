import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSupportWizardItems,
  type SupportWizardItem,
  SUPPORT_WIZARD_ITEM_COUNT,
} from './support-wizard.model';
import {
  filterSupportWizard,
  sortSupportWizard,
  totalSupportWizard,
  type SupportWizardSortKey,
} from './support-wizard.utils';

export interface UseSupportWizardOptions {
  itemCount?: number;
  initialSort?: SupportWizardSortKey;
}

export interface UseSupportWizardResult {
  items: SupportWizardItem[];
  allItems: SupportWizardItem[];
  selected: SupportWizardItem | null;
  query: string;
  sortKey: SupportWizardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSupportWizard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SupportWizardSortKey) => void;
  refresh: () => void;
}

export function useSupportWizard(
  options: UseSupportWizardOptions = {},
): UseSupportWizardResult {
  const { itemCount = SUPPORT_WIZARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SupportWizardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSupportWizardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortSupportWizard(filterSupportWizard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSupportWizard(items), [items]);

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
