import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildPromotionsListItems,
  type PromotionsListItem,
  PROMOTIONS_LIST_ITEM_COUNT,
} from './promotions-list.model';
import {
  filterPromotionsList,
  sortPromotionsList,
  totalPromotionsList,
  type PromotionsListSortKey,
} from './promotions-list.utils';

export interface UsePromotionsListOptions {
  itemCount?: number;
  initialSort?: PromotionsListSortKey;
}

export interface UsePromotionsListResult {
  items: PromotionsListItem[];
  allItems: PromotionsListItem[];
  selected: PromotionsListItem | null;
  query: string;
  sortKey: PromotionsListSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalPromotionsList>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: PromotionsListSortKey) => void;
  refresh: () => void;
}

export function usePromotionsList(
  options: UsePromotionsListOptions = {},
): UsePromotionsListResult {
  const { itemCount = PROMOTIONS_LIST_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<PromotionsListSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildPromotionsListItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortPromotionsList(filterPromotionsList(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalPromotionsList(items), [items]);

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
