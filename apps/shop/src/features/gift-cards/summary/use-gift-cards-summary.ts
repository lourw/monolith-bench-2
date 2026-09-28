import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildGiftCardsSummaryItems,
  type GiftCardsSummaryItem,
  GIFT_CARDS_SUMMARY_ITEM_COUNT,
} from './gift-cards-summary.model';
import {
  filterGiftCardsSummary,
  sortGiftCardsSummary,
  totalGiftCardsSummary,
  type GiftCardsSummarySortKey,
} from './gift-cards-summary.utils';

export interface UseGiftCardsSummaryOptions {
  itemCount?: number;
  initialSort?: GiftCardsSummarySortKey;
}

export interface UseGiftCardsSummaryResult {
  items: GiftCardsSummaryItem[];
  allItems: GiftCardsSummaryItem[];
  selected: GiftCardsSummaryItem | null;
  query: string;
  sortKey: GiftCardsSummarySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalGiftCardsSummary>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: GiftCardsSummarySortKey) => void;
  refresh: () => void;
}

export function useGiftCardsSummary(
  options: UseGiftCardsSummaryOptions = {},
): UseGiftCardsSummaryResult {
  const { itemCount = GIFT_CARDS_SUMMARY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<GiftCardsSummarySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildGiftCardsSummaryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortGiftCardsSummary(filterGiftCardsSummary(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalGiftCardsSummary(items), [items]);

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
