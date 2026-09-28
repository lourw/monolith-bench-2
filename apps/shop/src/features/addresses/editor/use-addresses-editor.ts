import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildAddressesEditorItems,
  type AddressesEditorItem,
  ADDRESSES_EDITOR_ITEM_COUNT,
} from './addresses-editor.model';
import {
  filterAddressesEditor,
  sortAddressesEditor,
  totalAddressesEditor,
  type AddressesEditorSortKey,
} from './addresses-editor.utils';

export interface UseAddressesEditorOptions {
  itemCount?: number;
  initialSort?: AddressesEditorSortKey;
}

export interface UseAddressesEditorResult {
  items: AddressesEditorItem[];
  allItems: AddressesEditorItem[];
  selected: AddressesEditorItem | null;
  query: string;
  sortKey: AddressesEditorSortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof totalAddressesEditor>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: AddressesEditorSortKey) => void;
  refresh: () => void;
}

export function useAddressesEditor(
  options: UseAddressesEditorOptions = {},
): UseAddressesEditorResult {
  const { itemCount = ADDRESSES_EDITOR_ITEM_COUNT, initialSort = 'name' } =
    options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<AddressesEditorSortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return buildAddressesEditorItems(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sortAddressesEditor(filterAddressesEditor(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => totalAddressesEditor(items), [items]);

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
