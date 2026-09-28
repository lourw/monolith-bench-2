import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAuthDetailsItems,
  type AuthDetailsItem,
  AUTH_DETAILS_ITEM_COUNT,
} from './auth-details.model';
import {
  filterAuthDetails,
  sortAuthDetails,
  totalAuthDetails,
  type AuthDetailsSortKey,
} from './auth-details.utils';

export interface UseAuthDetailsOptions {
  itemCount?: number;
  initialSort?: AuthDetailsSortKey;
}

export interface UseAuthDetailsResult {
  items: AuthDetailsItem[];
  allItems: AuthDetailsItem[];
  selected: AuthDetailsItem | null;
  query: string;
  sortKey: AuthDetailsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAuthDetails>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AuthDetailsSortKey) => void;
  refresh: () => void;
}

export function useAuthDetails(
  options: UseAuthDetailsOptions = {},
): UseAuthDetailsResult {
  const { itemCount = AUTH_DETAILS_ITEM_COUNT, initialSort = 'name' } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AuthDetailsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAuthDetailsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortAuthDetails(filterAuthDetails(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAuthDetails(items), [items]);

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
