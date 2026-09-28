import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildPromotionsSummaryItems,
  type PromotionsSummaryItem,
  PROMOTIONS_SUMMARY_ITEM_COUNT,
} from './promotions-summary.model';
import {
  filterPromotionsSummary,
  sortPromotionsSummary,
  totalPromotionsSummary,
  type PromotionsSummarySortKey,
} from './promotions-summary.utils';

export interface UsePromotionsSummaryOptions {
  itemCount?: number;
  initialSort?: PromotionsSummarySortKey;
}

export interface UsePromotionsSummaryResult {
  items: PromotionsSummaryItem[];
  allItems: PromotionsSummaryItem[];
  selected: PromotionsSummaryItem | null;
  query: string;
  sortKey: PromotionsSummarySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalPromotionsSummary>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: PromotionsSummarySortKey) => void;
  refresh: () => void;
}

export function usePromotionsSummary(
  options: UsePromotionsSummaryOptions = {},
): UsePromotionsSummaryResult {
  const { itemCount = PROMOTIONS_SUMMARY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<PromotionsSummarySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildPromotionsSummaryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortPromotionsSummary(filterPromotionsSummary(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalPromotionsSummary(items), [items]);

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
