import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildLoyaltySummaryItems,
  type LoyaltySummaryItem,
  LOYALTY_SUMMARY_ITEM_COUNT,
} from './loyalty-summary.model';
import {
  filterLoyaltySummary,
  sortLoyaltySummary,
  totalLoyaltySummary,
  type LoyaltySummarySortKey,
} from './loyalty-summary.utils';

export interface UseLoyaltySummaryOptions {
  itemCount?: number;
  initialSort?: LoyaltySummarySortKey;
}

export interface UseLoyaltySummaryResult {
  items: LoyaltySummaryItem[];
  allItems: LoyaltySummaryItem[];
  selected: LoyaltySummaryItem | null;
  query: string;
  sortKey: LoyaltySummarySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalLoyaltySummary>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: LoyaltySummarySortKey) => void;
  refresh: () => void;
}

export function useLoyaltySummary(
  options: UseLoyaltySummaryOptions = {},
): UseLoyaltySummaryResult {
  const { itemCount = LOYALTY_SUMMARY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<LoyaltySummarySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildLoyaltySummaryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortLoyaltySummary(filterLoyaltySummary(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalLoyaltySummary(items), [items]);

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
