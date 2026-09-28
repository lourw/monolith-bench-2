import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildGiftCardsHistoryItems,
  type GiftCardsHistoryItem,
  GIFT_CARDS_HISTORY_ITEM_COUNT,
} from './gift-cards-history.model';
import {
  filterGiftCardsHistory,
  sortGiftCardsHistory,
  totalGiftCardsHistory,
  type GiftCardsHistorySortKey,
} from './gift-cards-history.utils';

export interface UseGiftCardsHistoryOptions {
  itemCount?: number;
  initialSort?: GiftCardsHistorySortKey;
}

export interface UseGiftCardsHistoryResult {
  items: GiftCardsHistoryItem[];
  allItems: GiftCardsHistoryItem[];
  selected: GiftCardsHistoryItem | null;
  query: string;
  sortKey: GiftCardsHistorySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalGiftCardsHistory>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: GiftCardsHistorySortKey) => void;
  refresh: () => void;
}

export function useGiftCardsHistory(
  options: UseGiftCardsHistoryOptions = {},
): UseGiftCardsHistoryResult {
  const { itemCount = GIFT_CARDS_HISTORY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<GiftCardsHistorySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildGiftCardsHistoryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortGiftCardsHistory(filterGiftCardsHistory(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalGiftCardsHistory(items), [items]);

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
