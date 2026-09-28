import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildLoyaltyWizardItems,
  type LoyaltyWizardItem,
  LOYALTY_WIZARD_ITEM_COUNT,
} from './loyalty-wizard.model';
import {
  filterLoyaltyWizard,
  sortLoyaltyWizard,
  totalLoyaltyWizard,
  type LoyaltyWizardSortKey,
} from './loyalty-wizard.utils';

export interface UseLoyaltyWizardOptions {
  itemCount?: number;
  initialSort?: LoyaltyWizardSortKey;
}

export interface UseLoyaltyWizardResult {
  items: LoyaltyWizardItem[];
  allItems: LoyaltyWizardItem[];
  selected: LoyaltyWizardItem | null;
  query: string;
  sortKey: LoyaltyWizardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalLoyaltyWizard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: LoyaltyWizardSortKey) => void;
  refresh: () => void;
}

export function useLoyaltyWizard(
  options: UseLoyaltyWizardOptions = {},
): UseLoyaltyWizardResult {
  const { itemCount = LOYALTY_WIZARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<LoyaltyWizardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildLoyaltyWizardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortLoyaltyWizard(filterLoyaltyWizard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalLoyaltyWizard(items), [items]);

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
