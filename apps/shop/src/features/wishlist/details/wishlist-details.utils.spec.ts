import { describe, expect, it } from 'vitest';
import {
  buildWishlistDetailsItems,
  WISHLIST_DETAILS_ITEM_COUNT,
} from './wishlist-details.model';
import {
  describeWishlistDetailsItem,
  filterWishlistDetails,
  groupWishlistDetailsByStatus,
  pickWishlistDetailsHighlights,
  sortWishlistDetails,
  totalWishlistDetails,
  wishlistDetailsStatusTone,
} from './wishlist-details.utils';

describe('wishlist-details utils', () => {
  const items = buildWishlistDetailsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(WISHLIST_DETAILS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      WISHLIST_DETAILS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalWishlistDetails(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupWishlistDetailsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterWishlistDetails(items, '')).toHaveLength(items.length);
    expect(
      filterWishlistDetails(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterWishlistDetails(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortWishlistDetails(items, 'amount', 'asc');
    const desc = sortWishlistDetails(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeWishlistDetailsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(wishlistDetailsStatusTone('active')).toBe('success');
    expect(wishlistDetailsStatusTone('pending')).toBe('warning');
    expect(wishlistDetailsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickWishlistDetailsHighlights(items, 2)).toHaveLength(2);
    expect(pickWishlistDetailsHighlights(items, 0)).toHaveLength(0);
  });
});
