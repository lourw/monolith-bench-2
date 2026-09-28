import { describe, expect, it } from 'vitest';
import {
  buildWishlistSummaryItems,
  WISHLIST_SUMMARY_ITEM_COUNT,
} from './wishlist-summary.model';
import {
  describeWishlistSummaryItem,
  filterWishlistSummary,
  groupWishlistSummaryByStatus,
  pickWishlistSummaryHighlights,
  sortWishlistSummary,
  totalWishlistSummary,
  wishlistSummaryStatusTone,
} from './wishlist-summary.utils';

describe('wishlist-summary utils', () => {
  const items = buildWishlistSummaryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(WISHLIST_SUMMARY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      WISHLIST_SUMMARY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalWishlistSummary(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupWishlistSummaryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterWishlistSummary(items, '')).toHaveLength(items.length);
    expect(
      filterWishlistSummary(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterWishlistSummary(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortWishlistSummary(items, 'amount', 'asc');
    const desc = sortWishlistSummary(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeWishlistSummaryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(wishlistSummaryStatusTone('active')).toBe('success');
    expect(wishlistSummaryStatusTone('pending')).toBe('warning');
    expect(wishlistSummaryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickWishlistSummaryHighlights(items, 2)).toHaveLength(2);
    expect(pickWishlistSummaryHighlights(items, 0)).toHaveLength(0);
  });
});
