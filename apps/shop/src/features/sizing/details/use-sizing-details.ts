import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSizingDetailsItems,
  type SizingDetailsItem,
  SIZING_DETAILS_ITEM_COUNT,
} from './sizing-details.model';
import {
  filterSizingDetails,
  sortSizingDetails,
  totalSizingDetails,
  type SizingDetailsSortKey,
} from './sizing-details.utils';

export interface UseSizingDetailsOptions {
  itemCount?: number;
  initialSort?: SizingDetailsSortKey;
}

export interface UseSizingDetailsResult {
  items: SizingDetailsItem[];
  allItems: SizingDetailsItem[];
  selected: SizingDetailsItem | null;
  query: string;
  sortKey: SizingDetailsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSizingDetails>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SizingDetailsSortKey) => void;
  refresh: () => void;
}

export function useSizingDetails(
  options: UseSizingDetailsOptions = {},
): UseSizingDetailsResult {
  const { itemCount = SIZING_DETAILS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SizingDetailsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSizingDetailsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortSizingDetails(filterSizingDetails(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSizingDetails(items), [items]);

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
