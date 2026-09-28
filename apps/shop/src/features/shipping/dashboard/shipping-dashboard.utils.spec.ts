import { describe, expect, it } from 'vitest';
import {
  buildShippingDashboardItems,
  SHIPPING_DASHBOARD_ITEM_COUNT,
} from './shipping-dashboard.model';
import {
  describeShippingDashboardItem,
  filterShippingDashboard,
  groupShippingDashboardByStatus,
  pickShippingDashboardHighlights,
  sortShippingDashboard,
  totalShippingDashboard,
  shippingDashboardStatusTone,
} from './shipping-dashboard.utils';

describe('shipping-dashboard utils', () => {
  const items = buildShippingDashboardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SHIPPING_DASHBOARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SHIPPING_DASHBOARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalShippingDashboard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupShippingDashboardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterShippingDashboard(items, '')).toHaveLength(items.length);
    expect(
      filterShippingDashboard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterShippingDashboard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortShippingDashboard(items, 'amount', 'asc');
    const desc = sortShippingDashboard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeShippingDashboardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(shippingDashboardStatusTone('active')).toBe('success');
    expect(shippingDashboardStatusTone('pending')).toBe('warning');
    expect(shippingDashboardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickShippingDashboardHighlights(items, 2)).toHaveLength(2);
    expect(pickShippingDashboardHighlights(items, 0)).toHaveLength(0);
  });
});
