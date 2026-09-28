import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildPromotionsHistoryItems,
  type PromotionsHistoryItem,
  PROMOTIONS_HISTORY_ITEM_COUNT,
} from './promotions-history.model';
import {
  filterPromotionsHistory,
  sortPromotionsHistory,
  totalPromotionsHistory,
  type PromotionsHistorySortKey,
} from './promotions-history.utils';

export interface UsePromotionsHistoryOptions {
  itemCount?: number;
  initialSort?: PromotionsHistorySortKey;
}

export interface UsePromotionsHistoryResult {
  items: PromotionsHistoryItem[];
  allItems: PromotionsHistoryItem[];
  selected: PromotionsHistoryItem | null;
  query: string;
  sortKey: PromotionsHistorySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalPromotionsHistory>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: PromotionsHistorySortKey) => void;
  refresh: () => void;
}

export function usePromotionsHistory(
  options: UsePromotionsHistoryOptions = {},
): UsePromotionsHistoryResult {
  const { itemCount = PROMOTIONS_HISTORY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<PromotionsHistorySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildPromotionsHistoryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortPromotionsHistory(filterPromotionsHistory(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalPromotionsHistory(items), [items]);

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
