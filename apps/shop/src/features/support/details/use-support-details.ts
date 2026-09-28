import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSupportDetailsItems,
  type SupportDetailsItem,
  SUPPORT_DETAILS_ITEM_COUNT,
} from './support-details.model';
import {
  filterSupportDetails,
  sortSupportDetails,
  totalSupportDetails,
  type SupportDetailsSortKey,
} from './support-details.utils';

export interface UseSupportDetailsOptions {
  itemCount?: number;
  initialSort?: SupportDetailsSortKey;
}

export interface UseSupportDetailsResult {
  items: SupportDetailsItem[];
  allItems: SupportDetailsItem[];
  selected: SupportDetailsItem | null;
  query: string;
  sortKey: SupportDetailsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSupportDetails>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SupportDetailsSortKey) => void;
  refresh: () => void;
}

export function useSupportDetails(
  options: UseSupportDetailsOptions = {},
): UseSupportDetailsResult {
  const { itemCount = SUPPORT_DETAILS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SupportDetailsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSupportDetailsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortSupportDetails(filterSupportDetails(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSupportDetails(items), [items]);

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
