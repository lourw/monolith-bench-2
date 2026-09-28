import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { REVIEWS_DASHBOARD_ITEM_COUNT } from './reviews-dashboard.model';
import { useReviewsDashboard } from './use-reviews-dashboard';

describe('useReviewsDashboard', () => {
  it('starts with the full dataset and nothing selected', () => {
    const { result } = renderHook(() => useReviewsDashboard());
    expect(result.current.items).toHaveLength(REVIEWS_DASHBOARD_ITEM_COUNT);
    expect(result.current.selected).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('selects and clears an item', () => {
    const { result } = renderHook(() => useReviewsDashboard());
    const first = result.current.items[0];
    act(() => result.current.select(first.id));
    expect(result.current.selected?.id).toBe(first.id);
    act(() => result.current.select(null));
    expect(result.current.selected).toBeNull();
  });

  it('filters and sorts', () => {
    const { result } = renderHook(() => useReviewsDashboard());
    act(() => result.current.setQuery('no-match-at-all'));
    expect(result.current.items).toHaveLength(0);
    act(() => result.current.setQuery(''));
    act(() => result.current.setSortKey('amount'));
    const amounts = result.current.items.map((item) => item.amount);
    expect(amounts).toEqual([...amounts].sort((a, b) => a - b));
  });

  it('honours a custom item count', () => {
    const { result } = renderHook(() => useReviewsDashboard({ itemCount: 3 }));
    expect(result.current.allItems).toHaveLength(3);
  });

  it('enters a loading state on refresh', () => {
    const { result } = renderHook(() => useReviewsDashboard());
    act(() => result.current.refresh());
    expect(result.current.loading).toBe(true);
  });
});
