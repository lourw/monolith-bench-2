import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildSubscriptionsEditorItems,
  type SubscriptionsEditorItem,
  SUBSCRIPTIONS_EDITOR_ITEM_COUNT,
} from './subscriptions-editor.model';
import {
  filterSubscriptionsEditor,
  sortSubscriptionsEditor,
  totalSubscriptionsEditor,
  type SubscriptionsEditorSortKey,
} from './subscriptions-editor.utils';

export interface UseSubscriptionsEditorOptions {
  itemCount?: number;
  initialSort?: SubscriptionsEditorSortKey;
}

export interface UseSubscriptionsEditorResult {
  items: SubscriptionsEditorItem[];
  allItems: SubscriptionsEditorItem[];
  selected: SubscriptionsEditorItem | null;
  query: string;
  sortKey: SubscriptionsEditorSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalSubscriptionsEditor>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: SubscriptionsEditorSortKey) => void;
  refresh: () => void;
}

export function useSubscriptionsEditor(
  options: UseSubscriptionsEditorOptions = {},
): UseSubscriptionsEditorResult {
  const { itemCount = SUBSCRIPTIONS_EDITOR_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<SubscriptionsEditorSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildSubscriptionsEditorItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortSubscriptionsEditor(
        filterSubscriptionsEditor(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalSubscriptionsEditor(items), [items]);

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
