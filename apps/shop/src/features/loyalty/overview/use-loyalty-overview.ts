import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildLoyaltyOverviewItems,
  type LoyaltyOverviewItem,
  LOYALTY_OVERVIEW_ITEM_COUNT,
} from './loyalty-overview.model';
import {
  filterLoyaltyOverview,
  sortLoyaltyOverview,
  totalLoyaltyOverview,
  type LoyaltyOverviewSortKey,
} from './loyalty-overview.utils';

export interface UseLoyaltyOverviewOptions {
  itemCount?: number;
  initialSort?: LoyaltyOverviewSortKey;
}

export interface UseLoyaltyOverviewResult {
  items: LoyaltyOverviewItem[];
  allItems: LoyaltyOverviewItem[];
  selected: LoyaltyOverviewItem | null;
  query: string;
  sortKey: LoyaltyOverviewSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalLoyaltyOverview>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: LoyaltyOverviewSortKey) => void;
  refresh: () => void;
}

export function useLoyaltyOverview(
  options: UseLoyaltyOverviewOptions = {},
): UseLoyaltyOverviewResult {
  const { itemCount = LOYALTY_OVERVIEW_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<LoyaltyOverviewSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildLoyaltyOverviewItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortLoyaltyOverview(filterLoyaltyOverview(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalLoyaltyOverview(items), [items]);

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
