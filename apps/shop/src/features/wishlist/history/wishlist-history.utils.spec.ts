import { describe, expect, it } from 'vitest';
import {
  buildWishlistHistoryItems,
  WISHLIST_HISTORY_ITEM_COUNT,
} from './wishlist-history.model';
import {
  describeWishlistHistoryItem,
  filterWishlistHistory,
  groupWishlistHistoryByStatus,
  pickWishlistHistoryHighlights,
  sortWishlistHistory,
  totalWishlistHistory,
  wishlistHistoryStatusTone,
} from './wishlist-history.utils';

describe('wishlist-history utils', () => {
  const items = buildWishlistHistoryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(WISHLIST_HISTORY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      WISHLIST_HISTORY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalWishlistHistory(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupWishlistHistoryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterWishlistHistory(items, '')).toHaveLength(items.length);
    expect(
      filterWishlistHistory(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterWishlistHistory(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortWishlistHistory(items, 'amount', 'asc');
    const desc = sortWishlistHistory(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeWishlistHistoryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(wishlistHistoryStatusTone('active')).toBe('success');
    expect(wishlistHistoryStatusTone('pending')).toBe('warning');
    expect(wishlistHistoryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickWishlistHistoryHighlights(items, 2)).toHaveLength(2);
    expect(pickWishlistHistoryHighlights(items, 0)).toHaveLength(0);
  });
});
