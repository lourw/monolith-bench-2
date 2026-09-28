import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSupportSummaryItems,
  type SupportSummaryItem,
  SUPPORT_SUMMARY_ITEM_COUNT,
} from './support-summary.model';
import {
  filterSupportSummary,
  sortSupportSummary,
  totalSupportSummary,
  type SupportSummarySortKey,
} from './support-summary.utils';

export interface UseSupportSummaryOptions {
  itemCount?: number;
  initialSort?: SupportSummarySortKey;
}

export interface UseSupportSummaryResult {
  items: SupportSummaryItem[];
  allItems: SupportSummaryItem[];
  selected: SupportSummaryItem | null;
  query: string;
  sortKey: SupportSummarySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSupportSummary>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SupportSummarySortKey) => void;
  refresh: () => void;
}

export function useSupportSummary(
  options: UseSupportSummaryOptions = {},
): UseSupportSummaryResult {
  const { itemCount = SUPPORT_SUMMARY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SupportSummarySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSupportSummaryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortSupportSummary(filterSupportSummary(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSupportSummary(items), [items]);

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
