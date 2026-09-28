import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildPromotionsOverviewItems,
  type PromotionsOverviewItem,
  PROMOTIONS_OVERVIEW_ITEM_COUNT,
} from './promotions-overview.model';
import {
  filterPromotionsOverview,
  sortPromotionsOverview,
  totalPromotionsOverview,
  type PromotionsOverviewSortKey,
} from './promotions-overview.utils';

export interface UsePromotionsOverviewOptions {
  itemCount?: number;
  initialSort?: PromotionsOverviewSortKey;
}

export interface UsePromotionsOverviewResult {
  items: PromotionsOverviewItem[];
  allItems: PromotionsOverviewItem[];
  selected: PromotionsOverviewItem | null;
  query: string;
  sortKey: PromotionsOverviewSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalPromotionsOverview>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: PromotionsOverviewSortKey) => void;
  refresh: () => void;
}

export function usePromotionsOverview(
  options: UsePromotionsOverviewOptions = {},
): UsePromotionsOverviewResult {
  const { itemCount = PROMOTIONS_OVERVIEW_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<PromotionsOverviewSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildPromotionsOverviewItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortPromotionsOverview(
        filterPromotionsOverview(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalPromotionsOverview(items), [items]);

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
