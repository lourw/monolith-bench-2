import { describe, expect, it } from 'vitest';
import {
  buildCartDashboardItems,
  CART_DASHBOARD_ITEM_COUNT,
} from './cart-dashboard.model';
import {
  describeCartDashboardItem,
  filterCartDashboard,
  groupCartDashboardByStatus,
  pickCartDashboardHighlights,
  sortCartDashboard,
  totalCartDashboard,
  cartDashboardStatusTone,
} from './cart-dashboard.utils';

describe('cart-dashboard utils', () => {
  const items = buildCartDashboardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(CART_DASHBOARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      CART_DASHBOARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalCartDashboard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupCartDashboardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterCartDashboard(items, '')).toHaveLength(items.length);
    expect(
      filterCartDashboard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterCartDashboard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortCartDashboard(items, 'amount', 'asc');
    const desc = sortCartDashboard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeCartDashboardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(cartDashboardStatusTone('active')).toBe('success');
    expect(cartDashboardStatusTone('pending')).toBe('warning');
    expect(cartDashboardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickCartDashboardHighlights(items, 2)).toHaveLength(2);
    expect(pickCartDashboardHighlights(items, 0)).toHaveLength(0);
  });
});
