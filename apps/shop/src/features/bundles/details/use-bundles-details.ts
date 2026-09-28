import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildBundlesDetailsItems,
  type BundlesDetailsItem,
  BUNDLES_DETAILS_ITEM_COUNT,
} from './bundles-details.model';
import {
  filterBundlesDetails,
  sortBundlesDetails,
  totalBundlesDetails,
  type BundlesDetailsSortKey,
} from './bundles-details.utils';

export interface UseBundlesDetailsOptions {
  itemCount?: number;
  initialSort?: BundlesDetailsSortKey;
}

export interface UseBundlesDetailsResult {
  items: BundlesDetailsItem[];
  allItems: BundlesDetailsItem[];
  selected: BundlesDetailsItem | null;
  query: string;
  sortKey: BundlesDetailsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalBundlesDetails>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: BundlesDetailsSortKey) => void;
  refresh: () => void;
}

export function useBundlesDetails(
  options: UseBundlesDetailsOptions = {},
): UseBundlesDetailsResult {
  const { itemCount = BUNDLES_DETAILS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<BundlesDetailsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildBundlesDetailsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortBundlesDetails(filterBundlesDetails(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalBundlesDetails(items), [items]);

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
