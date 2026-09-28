import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildInventoryWizardItems,
  type InventoryWizardItem,
  INVENTORY_WIZARD_ITEM_COUNT,
} from './inventory-wizard.model';
import {
  filterInventoryWizard,
  sortInventoryWizard,
  totalInventoryWizard,
  type InventoryWizardSortKey,
} from './inventory-wizard.utils';

export interface UseInventoryWizardOptions {
  itemCount?: number;
  initialSort?: InventoryWizardSortKey;
}

export interface UseInventoryWizardResult {
  items: InventoryWizardItem[];
  allItems: InventoryWizardItem[];
  selected: InventoryWizardItem | null;
  query: string;
  sortKey: InventoryWizardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalInventoryWizard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: InventoryWizardSortKey) => void;
  refresh: () => void;
}

export function useInventoryWizard(
  options: UseInventoryWizardOptions = {},
): UseInventoryWizardResult {
  const { itemCount = INVENTORY_WIZARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<InventoryWizardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildInventoryWizardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortInventoryWizard(filterInventoryWizard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalInventoryWizard(items), [items]);

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
