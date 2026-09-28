import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildNotificationsEditorItems,
  type NotificationsEditorItem,
  NOTIFICATIONS_EDITOR_ITEM_COUNT,
} from './notifications-editor.model';
import {
  filterNotificationsEditor,
  sortNotificationsEditor,
  totalNotificationsEditor,
  type NotificationsEditorSortKey,
} from './notifications-editor.utils';

export interface UseNotificationsEditorOptions {
  itemCount?: number;
  initialSort?: NotificationsEditorSortKey;
}

export interface UseNotificationsEditorResult {
  items: NotificationsEditorItem[];
  allItems: NotificationsEditorItem[];
  selected: NotificationsEditorItem | null;
  query: string;
  sortKey: NotificationsEditorSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalNotificationsEditor>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: NotificationsEditorSortKey) => void;
  refresh: () => void;
}

export function useNotificationsEditor(
  options: UseNotificationsEditorOptions = {},
): UseNotificationsEditorResult {
  const { itemCount = NOTIFICATIONS_EDITOR_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<NotificationsEditorSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildNotificationsEditorItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortNotificationsEditor(
        filterNotificationsEditor(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalNotificationsEditor(items), [items]);

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
