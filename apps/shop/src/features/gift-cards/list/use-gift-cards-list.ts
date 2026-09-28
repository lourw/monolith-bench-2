import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildGiftCardsListItems,
  type GiftCardsListItem,
  GIFT_CARDS_LIST_ITEM_COUNT,
} from './gift-cards-list.model';
import {
  filterGiftCardsList,
  sortGiftCardsList,
  totalGiftCardsList,
  type GiftCardsListSortKey,
} from './gift-cards-list.utils';

export interface UseGiftCardsListOptions {
  itemCount?: number;
  initialSort?: GiftCardsListSortKey;
}

export interface UseGiftCardsListResult {
  items: GiftCardsListItem[];
  allItems: GiftCardsListItem[];
  selected: GiftCardsListItem | null;
  query: string;
  sortKey: GiftCardsListSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalGiftCardsList>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: GiftCardsListSortKey) => void;
  refresh: () => void;
}

export function useGiftCardsList(
  options: UseGiftCardsListOptions = {},
): UseGiftCardsListResult {
  const { itemCount = GIFT_CARDS_LIST_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<GiftCardsListSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildGiftCardsListItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortGiftCardsList(filterGiftCardsList(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalGiftCardsList(items), [items]);

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
