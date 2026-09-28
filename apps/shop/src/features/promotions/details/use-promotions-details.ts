import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildPromotionsDetailsItems,
  type PromotionsDetailsItem,
  PROMOTIONS_DETAILS_ITEM_COUNT,
} from './promotions-details.model';
import {
  filterPromotionsDetails,
  sortPromotionsDetails,
  totalPromotionsDetails,
  type PromotionsDetailsSortKey,
} from './promotions-details.utils';

export interface UsePromotionsDetailsOptions {
  itemCount?: number;
  initialSort?: PromotionsDetailsSortKey;
}

export interface UsePromotionsDetailsResult {
  items: PromotionsDetailsItem[];
  allItems: PromotionsDetailsItem[];
  selected: PromotionsDetailsItem | null;
  query: string;
  sortKey: PromotionsDetailsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalPromotionsDetails>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: PromotionsDetailsSortKey) => void;
  refresh: () => void;
}

export function usePromotionsDetails(
  options: UsePromotionsDetailsOptions = {},
): UsePromotionsDetailsResult {
  const { itemCount = PROMOTIONS_DETAILS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<PromotionsDetailsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildPromotionsDetailsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortPromotionsDetails(filterPromotionsDetails(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalPromotionsDetails(items), [items]);

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
