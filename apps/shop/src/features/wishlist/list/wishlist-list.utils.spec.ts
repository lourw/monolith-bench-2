import { describe, expect, it } from 'vitest';
import {
  buildWishlistListItems,
  WISHLIST_LIST_ITEM_COUNT,
} from './wishlist-list.model';
import {
  describeWishlistListItem,
  filterWishlistList,
  groupWishlistListByStatus,
  pickWishlistListHighlights,
  sortWishlistList,
  totalWishlistList,
  wishlistListStatusTone,
} from './wishlist-list.utils';

describe('wishlist-list utils', () => {
  const items = buildWishlistListItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(WISHLIST_LIST_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      WISHLIST_LIST_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalWishlistList(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupWishlistListByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterWishlistList(items, '')).toHaveLength(items.length);
    expect(
      filterWishlistList(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterWishlistList(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortWishlistList(items, 'amount', 'asc');
    const desc = sortWishlistList(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeWishlistListItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(wishlistListStatusTone('active')).toBe('success');
    expect(wishlistListStatusTone('pending')).toBe('warning');
    expect(wishlistListStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickWishlistListHighlights(items, 2)).toHaveLength(2);
    expect(pickWishlistListHighlights(items, 0)).toHaveLength(0);
  });
});
