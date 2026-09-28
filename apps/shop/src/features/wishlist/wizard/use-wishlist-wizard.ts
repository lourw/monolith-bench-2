import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildWishlistWizardItems,
  type WishlistWizardItem,
  WISHLIST_WIZARD_ITEM_COUNT,
} from './wishlist-wizard.model';
import {
  filterWishlistWizard,
  sortWishlistWizard,
  totalWishlistWizard,
  type WishlistWizardSortKey,
} from './wishlist-wizard.utils';

export interface UseWishlistWizardOptions {
  itemCount?: number;
  initialSort?: WishlistWizardSortKey;
}

export interface UseWishlistWizardResult {
  items: WishlistWizardItem[];
  allItems: WishlistWizardItem[];
  selected: WishlistWizardItem | null;
  query: string;
  sortKey: WishlistWizardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalWishlistWizard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: WishlistWizardSortKey) => void;
  refresh: () => void;
}

export function useWishlistWizard(
  options: UseWishlistWizardOptions = {},
): UseWishlistWizardResult {
  const { itemCount = WISHLIST_WIZARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<WishlistWizardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildWishlistWizardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortWishlistWizard(filterWishlistWizard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalWishlistWizard(items), [items]);

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
