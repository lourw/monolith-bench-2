import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildPromotionsWizardItems,
  type PromotionsWizardItem,
  PROMOTIONS_WIZARD_ITEM_COUNT,
} from './promotions-wizard.model';
import {
  filterPromotionsWizard,
  sortPromotionsWizard,
  totalPromotionsWizard,
  type PromotionsWizardSortKey,
} from './promotions-wizard.utils';

export interface UsePromotionsWizardOptions {
  itemCount?: number;
  initialSort?: PromotionsWizardSortKey;
}

export interface UsePromotionsWizardResult {
  items: PromotionsWizardItem[];
  allItems: PromotionsWizardItem[];
  selected: PromotionsWizardItem | null;
  query: string;
  sortKey: PromotionsWizardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalPromotionsWizard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: PromotionsWizardSortKey) => void;
  refresh: () => void;
}

export function usePromotionsWizard(
  options: UsePromotionsWizardOptions = {},
): UsePromotionsWizardResult {
  const { itemCount = PROMOTIONS_WIZARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<PromotionsWizardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildPromotionsWizardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortPromotionsWizard(filterPromotionsWizard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalPromotionsWizard(items), [items]);

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
