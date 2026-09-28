import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RECOMMENDATIONS_INSIGHTS_ITEM_COUNT } from './recommendations-insights.model';
import { useRecommendationsInsights } from './use-recommendations-insights';

describe('useRecommendationsInsights', () => {
  it('starts with the full dataset and nothing selected', () => {
    const { result } = renderHook(() => useRecommendationsInsights());
    expect(result.current.items).toHaveLength(
      RECOMMENDATIONS_INSIGHTS_ITEM_COUNT,
    );
    expect(result.current.selected).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('selects and clears an item', () => {
    const { result } = renderHook(() => useRecommendationsInsights());
    const first = result.current.items[0];
    act(() => result.current.select(first.id));
    expect(result.current.selected?.id).toBe(first.id);
    act(() => result.current.select(null));
    expect(result.current.selected).toBeNull();
  });

  it('filters and sorts', () => {
    const { result } = renderHook(() => useRecommendationsInsights());
    act(() => result.current.setQuery('no-match-at-all'));
    expect(result.current.items).toHaveLength(0);
    act(() => result.current.setQuery(''));
    act(() => result.current.setSortKey('amount'));
    const amounts = result.current.items.map((item) => item.amount);
    expect(amounts).toEqual([...amounts].sort((a, b) => a - b));
  });

  it('honours a custom item count', () => {
    const { result } = renderHook(() =>
      useRecommendationsInsights({ itemCount: 3 }),
    );
    expect(result.current.allItems).toHaveLength(3);
  });

  it('enters a loading state on refresh', () => {
    const { result } = renderHook(() => useRecommendationsInsights());
    act(() => result.current.refresh());
    expect(result.current.loading).toBe(true);
  });
});
