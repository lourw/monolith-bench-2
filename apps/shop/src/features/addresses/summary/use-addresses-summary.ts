import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAddressesSummaryItems,
  type AddressesSummaryItem,
  ADDRESSES_SUMMARY_ITEM_COUNT,
} from './addresses-summary.model';
import {
  filterAddressesSummary,
  sortAddressesSummary,
  totalAddressesSummary,
  type AddressesSummarySortKey,
} from './addresses-summary.utils';

export interface UseAddressesSummaryOptions {
  itemCount?: number;
  initialSort?: AddressesSummarySortKey;
}

export interface UseAddressesSummaryResult {
  items: AddressesSummaryItem[];
  allItems: AddressesSummaryItem[];
  selected: AddressesSummaryItem | null;
  query: string;
  sortKey: AddressesSummarySortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAddressesSummary>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AddressesSummarySortKey) => void;
  refresh: () => void;
}

export function useAddressesSummary(
  options: UseAddressesSummaryOptions = {},
): UseAddressesSummaryResult {
  const { itemCount = ADDRESSES_SUMMARY_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AddressesSummarySortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAddressesSummaryItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortAddressesSummary(filterAddressesSummary(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAddressesSummary(items), [items]);

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
