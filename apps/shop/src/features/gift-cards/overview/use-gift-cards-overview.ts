import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildGiftCardsOverviewItems,
  type GiftCardsOverviewItem,
  GIFT_CARDS_OVERVIEW_ITEM_COUNT,
} from './gift-cards-overview.model';
import {
  filterGiftCardsOverview,
  sortGiftCardsOverview,
  totalGiftCardsOverview,
  type GiftCardsOverviewSortKey,
} from './gift-cards-overview.utils';

export interface UseGiftCardsOverviewOptions {
  itemCount?: number;
  initialSort?: GiftCardsOverviewSortKey;
}

export interface UseGiftCardsOverviewResult {
  items: GiftCardsOverviewItem[];
  allItems: GiftCardsOverviewItem[];
  selected: GiftCardsOverviewItem | null;
  query: string;
  sortKey: GiftCardsOverviewSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalGiftCardsOverview>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: GiftCardsOverviewSortKey) => void;
  refresh: () => void;
}

export function useGiftCardsOverview(
  options: UseGiftCardsOverviewOptions = {},
): UseGiftCardsOverviewResult {
  const { itemCount = GIFT_CARDS_OVERVIEW_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<GiftCardsOverviewSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildGiftCardsOverviewItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortGiftCardsOverview(filterGiftCardsOverview(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalGiftCardsOverview(items), [items]);

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
