import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAccountDetailsItems,
  type AccountDetailsItem,
  ACCOUNT_DETAILS_ITEM_COUNT,
} from './account-details.model';
import {
  filterAccountDetails,
  sortAccountDetails,
  totalAccountDetails,
  type AccountDetailsSortKey,
} from './account-details.utils';

export interface UseAccountDetailsOptions {
  itemCount?: number;
  initialSort?: AccountDetailsSortKey;
}

export interface UseAccountDetailsResult {
  items: AccountDetailsItem[];
  allItems: AccountDetailsItem[];
  selected: AccountDetailsItem | null;
  query: string;
  sortKey: AccountDetailsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAccountDetails>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AccountDetailsSortKey) => void;
  refresh: () => void;
}

export function useAccountDetails(
  options: UseAccountDetailsOptions = {},
): UseAccountDetailsResult {
  const { itemCount = ACCOUNT_DETAILS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AccountDetailsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAccountDetailsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortAccountDetails(filterAccountDetails(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAccountDetails(items), [items]);

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
