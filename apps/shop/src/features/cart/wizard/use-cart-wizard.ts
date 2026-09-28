import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCartWizardItems,
  type CartWizardItem,
  CART_WIZARD_ITEM_COUNT,
} from './cart-wizard.model';
import {
  filterCartWizard,
  sortCartWizard,
  totalCartWizard,
  type CartWizardSortKey,
} from './cart-wizard.utils';

export interface UseCartWizardOptions {
  itemCount?: number;
  initialSort?: CartWizardSortKey;
}

export interface UseCartWizardResult {
  items: CartWizardItem[];
  allItems: CartWizardItem[];
  selected: CartWizardItem | null;
  query: string;
  sortKey: CartWizardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCartWizard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CartWizardSortKey) => void;
  refresh: () => void;
}

export function useCartWizard(
  options: UseCartWizardOptions = {},
): UseCartWizardResult {
  const { itemCount = CART_WIZARD_ITEM_COUNT, initialSort = 'name' } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CartWizardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCartWizardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortCartWizard(filterCartWizard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCartWizard(items), [items]);

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
