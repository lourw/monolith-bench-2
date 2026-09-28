import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildTrackingWizardItems,
  type TrackingWizardItem,
  TRACKING_WIZARD_ITEM_COUNT,
} from './tracking-wizard.model';
import {
  filterTrackingWizard,
  sortTrackingWizard,
  totalTrackingWizard,
  type TrackingWizardSortKey,
} from './tracking-wizard.utils';

export interface UseTrackingWizardOptions {
  itemCount?: number;
  initialSort?: TrackingWizardSortKey;
}

export interface UseTrackingWizardResult {
  items: TrackingWizardItem[];
  allItems: TrackingWizardItem[];
  selected: TrackingWizardItem | null;
  query: string;
  sortKey: TrackingWizardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalTrackingWizard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: TrackingWizardSortKey) => void;
  refresh: () => void;
}

export function useTrackingWizard(
  options: UseTrackingWizardOptions = {},
): UseTrackingWizardResult {
  const { itemCount = TRACKING_WIZARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<TrackingWizardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildTrackingWizardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortTrackingWizard(filterTrackingWizard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalTrackingWizard(items), [items]);

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
