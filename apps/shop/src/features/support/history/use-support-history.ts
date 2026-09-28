import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSupportHistoryItems,
  type SupportHistoryItem,
  SUPPORT_HISTORY_ITEM_COUNT,
} from './support-history.model';
import {
  filterSupportHistory,
  sortSupportHistory,
  totalSupportHistory,
  type SupportHistorySortKey,
} from './support-history.utils';

export interface UseSupportHistoryOptions {
  itemCount?: number;
  initialSort?: SupportHistorySortKey;
}

export interface UseSupportHistoryResult {
  items: SupportHistoryItem[];
  allItems: SupportHistoryItem[];
  selected: SupportHistoryItem | null;
  query: string;
  sortKey: SupportHistorySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSupportHistory>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SupportHistorySortKey) => void;
  refresh: () => void;
}

export function useSupportHistory(
  options: UseSupportHistoryOptions = {},
): UseSupportHistoryResult {
  const { itemCount = SUPPORT_HISTORY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SupportHistorySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSupportHistoryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortSupportHistory(filterSupportHistory(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSupportHistory(items), [items]);

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
