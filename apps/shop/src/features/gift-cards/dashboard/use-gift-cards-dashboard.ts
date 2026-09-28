import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildGiftCardsDashboardItems,
  type GiftCardsDashboardItem,
  GIFT_CARDS_DASHBOARD_ITEM_COUNT,
} from './gift-cards-dashboard.model';
import {
  filterGiftCardsDashboard,
  sortGiftCardsDashboard,
  totalGiftCardsDashboard,
  type GiftCardsDashboardSortKey,
} from './gift-cards-dashboard.utils';

export interface UseGiftCardsDashboardOptions {
  itemCount?: number;
  initialSort?: GiftCardsDashboardSortKey;
}

export interface UseGiftCardsDashboardResult {
  items: GiftCardsDashboardItem[];
  allItems: GiftCardsDashboardItem[];
  selected: GiftCardsDashboardItem | null;
  query: string;
  sortKey: GiftCardsDashboardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalGiftCardsDashboard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: GiftCardsDashboardSortKey) => void;
  refresh: () => void;
}

export function useGiftCardsDashboard(
  options: UseGiftCardsDashboardOptions = {},
): UseGiftCardsDashboardResult {
  const { itemCount = GIFT_CARDS_DASHBOARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<GiftCardsDashboardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildGiftCardsDashboardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortGiftCardsDashboard(
        filterGiftCardsDashboard(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalGiftCardsDashboard(items), [items]);

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
