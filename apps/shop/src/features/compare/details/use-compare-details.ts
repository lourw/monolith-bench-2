import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildCompareDetailsItems,
  type CompareDetailsItem,
  COMPARE_DETAILS_ITEM_COUNT,
} from './compare-details.model';
import {
  filterCompareDetails,
  sortCompareDetails,
  totalCompareDetails,
  type CompareDetailsSortKey,
} from './compare-details.utils';

export interface UseCompareDetailsOptions {
  itemCount?: number;
  initialSort?: CompareDetailsSortKey;
}

export interface UseCompareDetailsResult {
  items: CompareDetailsItem[];
  allItems: CompareDetailsItem[];
  selected: CompareDetailsItem | null;
  query: string;
  sortKey: CompareDetailsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalCompareDetails>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: CompareDetailsSortKey) => void;
  refresh: () => void;
}

export function useCompareDetails(
  options: UseCompareDetailsOptions = {},
): UseCompareDetailsResult {
  const { itemCount = COMPARE_DETAILS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<CompareDetailsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildCompareDetailsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortCompareDetails(filterCompareDetails(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalCompareDetails(items), [items]);

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
