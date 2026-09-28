import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildShippingWizardItems,
  type ShippingWizardItem,
  SHIPPING_WIZARD_ITEM_COUNT,
} from './shipping-wizard.model';
import {
  filterShippingWizard,
  sortShippingWizard,
  totalShippingWizard,
  type ShippingWizardSortKey,
} from './shipping-wizard.utils';

export interface UseShippingWizardOptions {
  itemCount?: number;
  initialSort?: ShippingWizardSortKey;
}

export interface UseShippingWizardResult {
  items: ShippingWizardItem[];
  allItems: ShippingWizardItem[];
  selected: ShippingWizardItem | null;
  query: string;
  sortKey: ShippingWizardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalShippingWizard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ShippingWizardSortKey) => void;
  refresh: () => void;
}

export function useShippingWizard(
  options: UseShippingWizardOptions = {},
): UseShippingWizardResult {
  const { itemCount = SHIPPING_WIZARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ShippingWizardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildShippingWizardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortShippingWizard(filterShippingWizard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalShippingWizard(items), [items]);

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
