import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildGiftCardsEditorItems,
  type GiftCardsEditorItem,
  GIFT_CARDS_EDITOR_ITEM_COUNT,
} from './gift-cards-editor.model';
import {
  filterGiftCardsEditor,
  sortGiftCardsEditor,
  totalGiftCardsEditor,
  type GiftCardsEditorSortKey,
} from './gift-cards-editor.utils';

export interface UseGiftCardsEditorOptions {
  itemCount?: number;
  initialSort?: GiftCardsEditorSortKey;
}

export interface UseGiftCardsEditorResult {
  items: GiftCardsEditorItem[];
  allItems: GiftCardsEditorItem[];
  selected: GiftCardsEditorItem | null;
  query: string;
  sortKey: GiftCardsEditorSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalGiftCardsEditor>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: GiftCardsEditorSortKey) => void;
  refresh: () => void;
}

export function useGiftCardsEditor(
  options: UseGiftCardsEditorOptions = {},
): UseGiftCardsEditorResult {
  const { itemCount = GIFT_CARDS_EDITOR_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<GiftCardsEditorSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildGiftCardsEditorItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortGiftCardsEditor(filterGiftCardsEditor(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalGiftCardsEditor(items), [items]);

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
