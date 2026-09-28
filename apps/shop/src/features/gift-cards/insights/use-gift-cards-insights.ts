import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildGiftCardsInsightsItems,
  type GiftCardsInsightsItem,
  GIFT_CARDS_INSIGHTS_ITEM_COUNT,
} from './gift-cards-insights.model';
import {
  filterGiftCardsInsights,
  sortGiftCardsInsights,
  totalGiftCardsInsights,
  type GiftCardsInsightsSortKey,
} from './gift-cards-insights.utils';

export interface UseGiftCardsInsightsOptions {
  itemCount?: number;
  initialSort?: GiftCardsInsightsSortKey;
}

export interface UseGiftCardsInsightsResult {
  items: GiftCardsInsightsItem[];
  allItems: GiftCardsInsightsItem[];
  selected: GiftCardsInsightsItem | null;
  query: string;
  sortKey: GiftCardsInsightsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalGiftCardsInsights>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: GiftCardsInsightsSortKey) => void;
  refresh: () => void;
}

export function useGiftCardsInsights(
  options: UseGiftCardsInsightsOptions = {},
): UseGiftCardsInsightsResult {
  const { itemCount = GIFT_CARDS_INSIGHTS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<GiftCardsInsightsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildGiftCardsInsightsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortGiftCardsInsights(filterGiftCardsInsights(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalGiftCardsInsights(items), [items]);

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
