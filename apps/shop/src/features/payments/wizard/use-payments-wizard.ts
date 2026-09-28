import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildPaymentsWizardItems,
  type PaymentsWizardItem,
  PAYMENTS_WIZARD_ITEM_COUNT,
} from './payments-wizard.model';
import {
  filterPaymentsWizard,
  sortPaymentsWizard,
  totalPaymentsWizard,
  type PaymentsWizardSortKey,
} from './payments-wizard.utils';

export interface UsePaymentsWizardOptions {
  itemCount?: number;
  initialSort?: PaymentsWizardSortKey;
}

export interface UsePaymentsWizardResult {
  items: PaymentsWizardItem[];
  allItems: PaymentsWizardItem[];
  selected: PaymentsWizardItem | null;
  query: string;
  sortKey: PaymentsWizardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalPaymentsWizard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: PaymentsWizardSortKey) => void;
  refresh: () => void;
}

export function usePaymentsWizard(
  options: UsePaymentsWizardOptions = {},
): UsePaymentsWizardResult {
  const { itemCount = PAYMENTS_WIZARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<PaymentsWizardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildPaymentsWizardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortPaymentsWizard(filterPaymentsWizard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalPaymentsWizard(items), [items]);

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
