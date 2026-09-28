import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildGiftCardsWizardItems,
  type GiftCardsWizardItem,
  GIFT_CARDS_WIZARD_ITEM_COUNT,
} from './gift-cards-wizard.model';
import {
  filterGiftCardsWizard,
  sortGiftCardsWizard,
  totalGiftCardsWizard,
  type GiftCardsWizardSortKey,
} from './gift-cards-wizard.utils';

export interface UseGiftCardsWizardOptions {
  itemCount?: number;
  initialSort?: GiftCardsWizardSortKey;
}

export interface UseGiftCardsWizardResult {
  items: GiftCardsWizardItem[];
  allItems: GiftCardsWizardItem[];
  selected: GiftCardsWizardItem | null;
  query: string;
  sortKey: GiftCardsWizardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalGiftCardsWizard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: GiftCardsWizardSortKey) => void;
  refresh: () => void;
}

export function useGiftCardsWizard(
  options: UseGiftCardsWizardOptions = {},
): UseGiftCardsWizardResult {
  const { itemCount = GIFT_CARDS_WIZARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<GiftCardsWizardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildGiftCardsWizardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortGiftCardsWizard(filterGiftCardsWizard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalGiftCardsWizard(items), [items]);

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
