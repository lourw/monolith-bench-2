import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildOrdersWizardItems,
  type OrdersWizardItem,
  ORDERS_WIZARD_ITEM_COUNT,
} from './orders-wizard.model';
import {
  filterOrdersWizard,
  sortOrdersWizard,
  totalOrdersWizard,
  type OrdersWizardSortKey,
} from './orders-wizard.utils';

export interface UseOrdersWizardOptions {
  itemCount?: number;
  initialSort?: OrdersWizardSortKey;
}

export interface UseOrdersWizardResult {
  items: OrdersWizardItem[];
  allItems: OrdersWizardItem[];
  selected: OrdersWizardItem | null;
  query: string;
  sortKey: OrdersWizardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalOrdersWizard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: OrdersWizardSortKey) => void;
  refresh: () => void;
}

export function useOrdersWizard(
  options: UseOrdersWizardOptions = {},
): UseOrdersWizardResult {
  const { itemCount = ORDERS_WIZARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<OrdersWizardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildOrdersWizardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortOrdersWizard(filterOrdersWizard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalOrdersWizard(items), [items]);

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
