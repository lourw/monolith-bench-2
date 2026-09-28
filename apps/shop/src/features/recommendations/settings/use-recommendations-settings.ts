import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildRecommendationsSettingsItems,
  type RecommendationsSettingsItem,
  RECOMMENDATIONS_SETTINGS_ITEM_COUNT,
} from './recommendations-settings.model';
import {
  filterRecommendationsSettings,
  sortRecommendationsSettings,
  totalRecommendationsSettings,
  type RecommendationsSettingsSortKey,
} from './recommendations-settings.utils';

export interface UseRecommendationsSettingsOptions {
  itemCount?: number;
  initialSort?: RecommendationsSettingsSortKey;
}

export interface UseRecommendationsSettingsResult {
  items: RecommendationsSettingsItem[];
  allItems: RecommendationsSettingsItem[];
  selected: RecommendationsSettingsItem | null;
  query: string;
  sortKey: RecommendationsSettingsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalRecommendationsSettings>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: RecommendationsSettingsSortKey) => void;
  refresh: () => void;
}

export function useRecommendationsSettings(
  options: UseRecommendationsSettingsOptions = {},
): UseRecommendationsSettingsResult {
  const {
    itemCount = RECOMMENDATIONS_SETTINGS_ITEM_COUNT,
    initialSort = 'name',
  } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] =
    useState<RecommendationsSettingsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildRecommendationsSettingsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortRecommendationsSettings(
        filterRecommendationsSettings(allItems, query),
        sortKey,
      ),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalRecommendationsSettings(items), [items]);

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
