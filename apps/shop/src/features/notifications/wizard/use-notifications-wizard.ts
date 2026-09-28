import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildNotificationsWizardItems,
  type NotificationsWizardItem,
  NOTIFICATIONS_WIZARD_ITEM_COUNT,
} from './notifications-wizard.model';
import {
  filterNotificationsWizard,
  sortNotificationsWizard,
  totalNotificationsWizard,
  type NotificationsWizardSortKey,
} from './notifications-wizard.utils';

export interface UseNotificationsWizardOptions {
  itemCount?: number;
  initialSort?: NotificationsWizardSortKey;
}

export interface UseNotificationsWizardResult {
  items: NotificationsWizardItem[];
  allItems: NotificationsWizardItem[];
  selected: NotificationsWizardItem | null;
  query: string;
  sortKey: NotificationsWizardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalNotificationsWizard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: NotificationsWizardSortKey) => void;
  refresh: () => void;
}

export function useNotificationsWizard(
  options: UseNotificationsWizardOptions = {},
): UseNotificationsWizardResult {
  const { itemCount = NOTIFICATIONS_WIZARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<NotificationsWizardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildNotificationsWizardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortNotificationsWizard(
        filterNotificationsWizard(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalNotificationsWizard(items), [items]);

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
