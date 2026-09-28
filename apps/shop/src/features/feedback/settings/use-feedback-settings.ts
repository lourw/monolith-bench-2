import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildFeedbackSettingsItems,
  type FeedbackSettingsItem,
  FEEDBACK_SETTINGS_ITEM_COUNT,
} from './feedback-settings.model';
import {
  filterFeedbackSettings,
  sortFeedbackSettings,
  totalFeedbackSettings,
  type FeedbackSettingsSortKey,
} from './feedback-settings.utils';

export interface UseFeedbackSettingsOptions {
  itemCount?: number;
  initialSort?: FeedbackSettingsSortKey;
}

export interface UseFeedbackSettingsResult {
  items: FeedbackSettingsItem[];
  allItems: FeedbackSettingsItem[];
  selected: FeedbackSettingsItem | null;
  query: string;
  sortKey: FeedbackSettingsSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalFeedbackSettings>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: FeedbackSettingsSortKey) => void;
  refresh: () => void;
}

export function useFeedbackSettings(
  options: UseFeedbackSettingsOptions = {},
): UseFeedbackSettingsResult {
  const { itemCount = FEEDBACK_SETTINGS_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<FeedbackSettingsSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildFeedbackSettingsItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () =>
      sortFeedbackSettings(filterFeedbackSettings(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalFeedbackSettings(items), [items]);

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
