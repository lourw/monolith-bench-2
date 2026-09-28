import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildPromotionsEditorItems,
  type PromotionsEditorItem,
  PROMOTIONS_EDITOR_ITEM_COUNT,
} from './promotions-editor.model';
import {
  filterPromotionsEditor,
  sortPromotionsEditor,
  totalPromotionsEditor,
  type PromotionsEditorSortKey,
} from './promotions-editor.utils';

export interface UsePromotionsEditorOptions {
  itemCount?: number;
  initialSort?: PromotionsEditorSortKey;
}

export interface UsePromotionsEditorResult {
  items: PromotionsEditorItem[];
  allItems: PromotionsEditorItem[];
  selected: PromotionsEditorItem | null;
  query: string;
  sortKey: PromotionsEditorSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalPromotionsEditor>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: PromotionsEditorSortKey) => void;
  refresh: () => void;
}

export function usePromotionsEditor(
  options: UsePromotionsEditorOptions = {},
): UsePromotionsEditorResult {
  const { itemCount = PROMOTIONS_EDITOR_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<PromotionsEditorSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildPromotionsEditorItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortPromotionsEditor(filterPromotionsEditor(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalPromotionsEditor(items), [items]);

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
