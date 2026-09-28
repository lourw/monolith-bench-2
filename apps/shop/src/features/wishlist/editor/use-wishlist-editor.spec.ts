import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { WISHLIST_EDITOR_ITEM_COUNT } from './wishlist-editor.model';
import { useWishlistEditor } from './use-wishlist-editor';

describe('useWishlistEditor', () => {
  it('starts with the full dataset and nothing selected', () => {
    const { result } = renderHook(() => useWishlistEditor());
    expect(result.current.items).toHaveLength(WISHLIST_EDITOR_ITEM_COUNT);
    expect(result.current.selected).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('selects and clears an item', () => {
    const { result } = renderHook(() => useWishlistEditor());
    const first = result.current.items[0];
    act(() => result.current.select(first.id));
    expect(result.current.selected?.id).toBe(first.id);
    act(() => result.current.select(null));
    expect(result.current.selected).toBeNull();
  });

  it('filters and sorts', () => {
    const { result } = renderHook(() => useWishlistEditor());
    act(() => result.current.setQuery('no-match-at-all'));
    expect(result.current.items).toHaveLength(0);
    act(() => result.current.setQuery(''));
    act(() => result.current.setSortKey('amount'));
    const amounts = result.current.items.map((item) => item.amount);
    expect(amounts).toEqual([...amounts].sort((a, b) => a - b));
  });

  it('honours a custom item count', () => {
    const { result } = renderHook(() => useWishlistEditor({ itemCount: 3 }));
    expect(result.current.allItems).toHaveLength(3);
  });

  it('enters a loading state on refresh', () => {
    const { result } = renderHook(() => useWishlistEditor());
    act(() => result.current.refresh());
    expect(result.current.loading).toBe(true);
  });
});
