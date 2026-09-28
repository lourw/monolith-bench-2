import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildWishlistEditorItems,
  type WishlistEditorItem,
  WISHLIST_EDITOR_ITEM_COUNT,
} from './wishlist-editor.model';
import {
  filterWishlistEditor,
  sortWishlistEditor,
  totalWishlistEditor,
  type WishlistEditorSortKey,
} from './wishlist-editor.utils';

export interface UseWishlistEditorOptions {
  itemCount?: number;
  initialSort?: WishlistEditorSortKey;
}

export interface UseWishlistEditorResult {
  items: WishlistEditorItem[];
  allItems: WishlistEditorItem[];
  selected: WishlistEditorItem | null;
  query: string;
  sortKey: WishlistEditorSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalWishlistEditor>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: WishlistEditorSortKey) => void;
  refresh: () => void;
}

export function useWishlistEditor(
  options: UseWishlistEditorOptions = {},
): UseWishlistEditorResult {
  const { itemCount = WISHLIST_EDITOR_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<WishlistEditorSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildWishlistEditorItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortWishlistEditor(filterWishlistEditor(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalWishlistEditor(items), [items]);

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
