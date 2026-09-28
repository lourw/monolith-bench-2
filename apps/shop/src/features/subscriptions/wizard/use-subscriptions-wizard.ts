import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSubscriptionsWizardItems,
  type SubscriptionsWizardItem,
  SUBSCRIPTIONS_WIZARD_ITEM_COUNT,
} from './subscriptions-wizard.model';
import {
  filterSubscriptionsWizard,
  sortSubscriptionsWizard,
  totalSubscriptionsWizard,
  type SubscriptionsWizardSortKey,
} from './subscriptions-wizard.utils';

export interface UseSubscriptionsWizardOptions {
  itemCount?: number;
  initialSort?: SubscriptionsWizardSortKey;
}

export interface UseSubscriptionsWizardResult {
  items: SubscriptionsWizardItem[];
  allItems: SubscriptionsWizardItem[];
  selected: SubscriptionsWizardItem | null;
  query: string;
  sortKey: SubscriptionsWizardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSubscriptionsWizard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SubscriptionsWizardSortKey) => void;
  refresh: () => void;
}

export function useSubscriptionsWizard(
  options: UseSubscriptionsWizardOptions = {},
): UseSubscriptionsWizardResult {
  const { itemCount = SUBSCRIPTIONS_WIZARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<SubscriptionsWizardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSubscriptionsWizardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortSubscriptionsWizard(
        filterSubscriptionsWizard(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSubscriptionsWizard(items), [items]);

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
