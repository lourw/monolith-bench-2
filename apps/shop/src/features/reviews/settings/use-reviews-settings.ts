import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildReviewsSettingsItems,
  type ReviewsSettingsItem,
  REVIEWS_SETTINGS_ITEM_COUNT,
} from './reviews-settings.model';
import {
  filterReviewsSettings,
  sortReviewsSettings,
  totalReviewsSettings,
  type ReviewsSettingsSortKey,
} from './reviews-settings.utils';

export interface UseReviewsSettingsOptions {
  itemCount?: number;
  initialSort?: ReviewsSettingsSortKey;
}

export interface UseReviewsSettingsResult {
  items: ReviewsSettingsItem[];
  allItems: ReviewsSettingsItem[];
  selected: ReviewsSettingsItem | null;
  query: string;
  sortKey: ReviewsSettingsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalReviewsSettings>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ReviewsSettingsSortKey) => void;
  refresh: () => void;
}

export function useReviewsSettings(
  options: UseReviewsSettingsOptions = {},
): UseReviewsSettingsResult {
  const { itemCount = REVIEWS_SETTINGS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<ReviewsSettingsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildReviewsSettingsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortReviewsSettings(filterReviewsSettings(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalReviewsSettings(items), [items]);

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
