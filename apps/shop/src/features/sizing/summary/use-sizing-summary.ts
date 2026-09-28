import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSizingSummaryItems,
  type SizingSummaryItem,
  SIZING_SUMMARY_ITEM_COUNT,
} from './sizing-summary.model';
import {
  filterSizingSummary,
  sortSizingSummary,
  totalSizingSummary,
  type SizingSummarySortKey,
} from './sizing-summary.utils';

export interface UseSizingSummaryOptions {
  itemCount?: number;
  initialSort?: SizingSummarySortKey;
}

export interface UseSizingSummaryResult {
  items: SizingSummaryItem[];
  allItems: SizingSummaryItem[];
  selected: SizingSummaryItem | null;
  query: string;
  sortKey: SizingSummarySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSizingSummary>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SizingSummarySortKey) => void;
  refresh: () => void;
}

export function useSizingSummary(
  options: UseSizingSummaryOptions = {},
): UseSizingSummaryResult {
  const { itemCount = SIZING_SUMMARY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SizingSummarySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSizingSummaryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortSizingSummary(filterSizingSummary(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSizingSummary(items), [items]);

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
