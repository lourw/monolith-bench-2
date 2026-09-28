import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildPreordersDetailsItems,
  type PreordersDetailsItem,
  PREORDERS_DETAILS_ITEM_COUNT,
} from './preorders-details.model';
import {
  filterPreordersDetails,
  sortPreordersDetails,
  totalPreordersDetails,
  type PreordersDetailsSortKey,
} from './preorders-details.utils';

export interface UsePreordersDetailsOptions {
  itemCount?: number;
  initialSort?: PreordersDetailsSortKey;
}

export interface UsePreordersDetailsResult {
  items: PreordersDetailsItem[];
  allItems: PreordersDetailsItem[];
  selected: PreordersDetailsItem | null;
  query: string;
  sortKey: PreordersDetailsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalPreordersDetails>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: PreordersDetailsSortKey) => void;
  refresh: () => void;
}

export function usePreordersDetails(
  options: UsePreordersDetailsOptions = {},
): UsePreordersDetailsResult {
  const { itemCount = PREORDERS_DETAILS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<PreordersDetailsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildPreordersDetailsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortPreordersDetails(filterPreordersDetails(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalPreordersDetails(items), [items]);

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
