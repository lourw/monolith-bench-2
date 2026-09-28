import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildLoyaltyEditorItems,
  type LoyaltyEditorItem,
  LOYALTY_EDITOR_ITEM_COUNT,
} from './loyalty-editor.model';
import {
  filterLoyaltyEditor,
  sortLoyaltyEditor,
  totalLoyaltyEditor,
  type LoyaltyEditorSortKey,
} from './loyalty-editor.utils';

export interface UseLoyaltyEditorOptions {
  itemCount?: number;
  initialSort?: LoyaltyEditorSortKey;
}

export interface UseLoyaltyEditorResult {
  items: LoyaltyEditorItem[];
  allItems: LoyaltyEditorItem[];
  selected: LoyaltyEditorItem | null;
  query: string;
  sortKey: LoyaltyEditorSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalLoyaltyEditor>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: LoyaltyEditorSortKey) => void;
  refresh: () => void;
}

export function useLoyaltyEditor(
  options: UseLoyaltyEditorOptions = {},
): UseLoyaltyEditorResult {
  const { itemCount = LOYALTY_EDITOR_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<LoyaltyEditorSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildLoyaltyEditorItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortLoyaltyEditor(filterLoyaltyEditor(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalLoyaltyEditor(items), [items]);

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
