import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSearchSummaryItems,
  type SearchSummaryItem,
  SEARCH_SUMMARY_ITEM_COUNT,
} from './search-summary.model';
import {
  filterSearchSummary,
  sortSearchSummary,
  totalSearchSummary,
  type SearchSummarySortKey,
} from './search-summary.utils';

export interface UseSearchSummaryOptions {
  itemCount?: number;
  initialSort?: SearchSummarySortKey;
}

export interface UseSearchSummaryResult {
  items: SearchSummaryItem[];
  allItems: SearchSummaryItem[];
  selected: SearchSummaryItem | null;
  query: string;
  sortKey: SearchSummarySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSearchSummary>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SearchSummarySortKey) => void;
  refresh: () => void;
}

export function useSearchSummary(
  options: UseSearchSummaryOptions = {},
): UseSearchSummaryResult {
  const { itemCount = SEARCH_SUMMARY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SearchSummarySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSearchSummaryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortSearchSummary(filterSearchSummary(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSearchSummary(items), [items]);

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
