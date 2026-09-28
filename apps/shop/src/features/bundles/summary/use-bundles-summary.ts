import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildBundlesSummaryItems,
  type BundlesSummaryItem,
  BUNDLES_SUMMARY_ITEM_COUNT,
} from './bundles-summary.model';
import {
  filterBundlesSummary,
  sortBundlesSummary,
  totalBundlesSummary,
  type BundlesSummarySortKey,
} from './bundles-summary.utils';

export interface UseBundlesSummaryOptions {
  itemCount?: number;
  initialSort?: BundlesSummarySortKey;
}

export interface UseBundlesSummaryResult {
  items: BundlesSummaryItem[];
  allItems: BundlesSummaryItem[];
  selected: BundlesSummaryItem | null;
  query: string;
  sortKey: BundlesSummarySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalBundlesSummary>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: BundlesSummarySortKey) => void;
  refresh: () => void;
}

export function useBundlesSummary(
  options: UseBundlesSummaryOptions = {},
): UseBundlesSummaryResult {
  const { itemCount = BUNDLES_SUMMARY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<BundlesSummarySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildBundlesSummaryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortBundlesSummary(filterBundlesSummary(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalBundlesSummary(items), [items]);

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
