import { describe, expect, it } from 'vitest';
import {
  buildWishlistInsightsItems,
  WISHLIST_INSIGHTS_ITEM_COUNT,
} from './wishlist-insights.model';
import {
  describeWishlistInsightsItem,
  filterWishlistInsights,
  groupWishlistInsightsByStatus,
  pickWishlistInsightsHighlights,
  sortWishlistInsights,
  totalWishlistInsights,
  wishlistInsightsStatusTone,
} from './wishlist-insights.utils';

describe('wishlist-insights utils', () => {
  const items = buildWishlistInsightsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(WISHLIST_INSIGHTS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      WISHLIST_INSIGHTS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalWishlistInsights(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupWishlistInsightsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterWishlistInsights(items, '')).toHaveLength(items.length);
    expect(
      filterWishlistInsights(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterWishlistInsights(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortWishlistInsights(items, 'amount', 'asc');
    const desc = sortWishlistInsights(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeWishlistInsightsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(wishlistInsightsStatusTone('active')).toBe('success');
    expect(wishlistInsightsStatusTone('pending')).toBe('warning');
    expect(wishlistInsightsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickWishlistInsightsHighlights(items, 2)).toHaveLength(2);
    expect(pickWishlistInsightsHighlights(items, 0)).toHaveLength(0);
  });
});
