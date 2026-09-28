import { describe, expect, it } from 'vitest';
import {
  buildWishlistDashboardItems,
  WISHLIST_DASHBOARD_ITEM_COUNT,
} from './wishlist-dashboard.model';
import {
  describeWishlistDashboardItem,
  filterWishlistDashboard,
  groupWishlistDashboardByStatus,
  pickWishlistDashboardHighlights,
  sortWishlistDashboard,
  totalWishlistDashboard,
  wishlistDashboardStatusTone,
} from './wishlist-dashboard.utils';

describe('wishlist-dashboard utils', () => {
  const items = buildWishlistDashboardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(WISHLIST_DASHBOARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      WISHLIST_DASHBOARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalWishlistDashboard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupWishlistDashboardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterWishlistDashboard(items, '')).toHaveLength(items.length);
    expect(
      filterWishlistDashboard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterWishlistDashboard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortWishlistDashboard(items, 'amount', 'asc');
    const desc = sortWishlistDashboard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeWishlistDashboardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(wishlistDashboardStatusTone('active')).toBe('success');
    expect(wishlistDashboardStatusTone('pending')).toBe('warning');
    expect(wishlistDashboardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickWishlistDashboardHighlights(items, 2)).toHaveLength(2);
    expect(pickWishlistDashboardHighlights(items, 0)).toHaveLength(0);
  });
});
