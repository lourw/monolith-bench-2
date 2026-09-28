import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAnalyticsDetailsItems,
  type AnalyticsDetailsItem,
  ANALYTICS_DETAILS_ITEM_COUNT,
} from './analytics-details.model';
import {
  filterAnalyticsDetails,
  sortAnalyticsDetails,
  totalAnalyticsDetails,
  type AnalyticsDetailsSortKey,
} from './analytics-details.utils';

export interface UseAnalyticsDetailsOptions {
  itemCount?: number;
  initialSort?: AnalyticsDetailsSortKey;
}

export interface UseAnalyticsDetailsResult {
  items: AnalyticsDetailsItem[];
  allItems: AnalyticsDetailsItem[];
  selected: AnalyticsDetailsItem | null;
  query: string;
  sortKey: AnalyticsDetailsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAnalyticsDetails>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AnalyticsDetailsSortKey) => void;
  refresh: () => void;
}

export function useAnalyticsDetails(
  options: UseAnalyticsDetailsOptions = {},
): UseAnalyticsDetailsResult {
  const { itemCount = ANALYTICS_DETAILS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AnalyticsDetailsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAnalyticsDetailsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortAnalyticsDetails(filterAnalyticsDetails(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAnalyticsDetails(items), [items]);

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
