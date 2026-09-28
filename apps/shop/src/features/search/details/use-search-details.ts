import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSearchDetailsItems,
  type SearchDetailsItem,
  SEARCH_DETAILS_ITEM_COUNT,
} from './search-details.model';
import {
  filterSearchDetails,
  sortSearchDetails,
  totalSearchDetails,
  type SearchDetailsSortKey,
} from './search-details.utils';

export interface UseSearchDetailsOptions {
  itemCount?: number;
  initialSort?: SearchDetailsSortKey;
}

export interface UseSearchDetailsResult {
  items: SearchDetailsItem[];
  allItems: SearchDetailsItem[];
  selected: SearchDetailsItem | null;
  query: string;
  sortKey: SearchDetailsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSearchDetails>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SearchDetailsSortKey) => void;
  refresh: () => void;
}

export function useSearchDetails(
  options: UseSearchDetailsOptions = {},
): UseSearchDetailsResult {
  const { itemCount = SEARCH_DETAILS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SearchDetailsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSearchDetailsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortSearchDetails(filterSearchDetails(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSearchDetails(items), [items]);

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
