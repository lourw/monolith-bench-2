import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAddressesWizardItems,
  type AddressesWizardItem,
  ADDRESSES_WIZARD_ITEM_COUNT,
} from './addresses-wizard.model';
import {
  filterAddressesWizard,
  sortAddressesWizard,
  totalAddressesWizard,
  type AddressesWizardSortKey,
} from './addresses-wizard.utils';

export interface UseAddressesWizardOptions {
  itemCount?: number;
  initialSort?: AddressesWizardSortKey;
}

export interface UseAddressesWizardResult {
  items: AddressesWizardItem[];
  allItems: AddressesWizardItem[];
  selected: AddressesWizardItem | null;
  query: string;
  sortKey: AddressesWizardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAddressesWizard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AddressesWizardSortKey) => void;
  refresh: () => void;
}

export function useAddressesWizard(
  options: UseAddressesWizardOptions = {},
): UseAddressesWizardResult {
  const { itemCount = ADDRESSES_WIZARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AddressesWizardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAddressesWizardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortAddressesWizard(filterAddressesWizard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAddressesWizard(items), [items]);

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
