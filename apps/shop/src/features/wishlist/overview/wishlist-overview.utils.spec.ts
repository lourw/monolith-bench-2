import { describe, expect, it } from 'vitest';
import {
  buildWishlistOverviewItems,
  WISHLIST_OVERVIEW_ITEM_COUNT,
} from './wishlist-overview.model';
import {
  describeWishlistOverviewItem,
  filterWishlistOverview,
  groupWishlistOverviewByStatus,
  pickWishlistOverviewHighlights,
  sortWishlistOverview,
  totalWishlistOverview,
  wishlistOverviewStatusTone,
} from './wishlist-overview.utils';

describe('wishlist-overview utils', () => {
  const items = buildWishlistOverviewItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(WISHLIST_OVERVIEW_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      WISHLIST_OVERVIEW_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalWishlistOverview(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupWishlistOverviewByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterWishlistOverview(items, '')).toHaveLength(items.length);
    expect(
      filterWishlistOverview(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterWishlistOverview(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortWishlistOverview(items, 'amount', 'asc');
    const desc = sortWishlistOverview(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeWishlistOverviewItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(wishlistOverviewStatusTone('active')).toBe('success');
    expect(wishlistOverviewStatusTone('pending')).toBe('warning');
    expect(wishlistOverviewStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickWishlistOverviewHighlights(items, 2)).toHaveLength(2);
    expect(pickWishlistOverviewHighlights(items, 0)).toHaveLength(0);
  });
});
