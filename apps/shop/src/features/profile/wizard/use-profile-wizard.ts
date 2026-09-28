import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildProfileWizardItems,
  type ProfileWizardItem,
  PROFILE_WIZARD_ITEM_COUNT,
} from './profile-wizard.model';
import {
  filterProfileWizard,
  sortProfileWizard,
  totalProfileWizard,
  type ProfileWizardSortKey,
} from './profile-wizard.utils';

export interface UseProfileWizardOptions {
  itemCount?: number;
  initialSort?: ProfileWizardSortKey;
}

export interface UseProfileWizardResult {
  items: ProfileWizardItem[];
  allItems: ProfileWizardItem[];
  selected: ProfileWizardItem | null;
  query: string;
  sortKey: ProfileWizardSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalProfileWizard>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ProfileWizardSortKey) => void;
  refresh: () => void;
}

export function useProfileWizard(
  options: UseProfileWizardOptions = {},
): UseProfileWizardResult {
  const { itemCount = PROFILE_WIZARD_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ProfileWizardSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildProfileWizardItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortProfileWizard(filterProfileWizard(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalProfileWizard(items), [items]);

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
