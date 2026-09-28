import { describe, expect, it } from 'vitest';
import {
  buildCheckoutDashboardItems,
  CHECKOUT_DASHBOARD_ITEM_COUNT,
} from './checkout-dashboard.model';
import {
  describeCheckoutDashboardItem,
  filterCheckoutDashboard,
  groupCheckoutDashboardByStatus,
  pickCheckoutDashboardHighlights,
  sortCheckoutDashboard,
  totalCheckoutDashboard,
  checkoutDashboardStatusTone,
} from './checkout-dashboard.utils';

describe('checkout-dashboard utils', () => {
  const items = buildCheckoutDashboardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(CHECKOUT_DASHBOARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      CHECKOUT_DASHBOARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalCheckoutDashboard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupCheckoutDashboardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterCheckoutDashboard(items, '')).toHaveLength(items.length);
    expect(
      filterCheckoutDashboard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterCheckoutDashboard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortCheckoutDashboard(items, 'amount', 'asc');
    const desc = sortCheckoutDashboard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeCheckoutDashboardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(checkoutDashboardStatusTone('active')).toBe('success');
    expect(checkoutDashboardStatusTone('pending')).toBe('warning');
    expect(checkoutDashboardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickCheckoutDashboardHighlights(items, 2)).toHaveLength(2);
    expect(pickCheckoutDashboardHighlights(items, 0)).toHaveLength(0);
  });
});
