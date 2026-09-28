import { describe, expect, it } from 'vitest';
import {
  buildTrackingDashboardItems,
  TRACKING_DASHBOARD_ITEM_COUNT,
} from './tracking-dashboard.model';
import {
  describeTrackingDashboardItem,
  filterTrackingDashboard,
  groupTrackingDashboardByStatus,
  pickTrackingDashboardHighlights,
  sortTrackingDashboard,
  totalTrackingDashboard,
  trackingDashboardStatusTone,
} from './tracking-dashboard.utils';

describe('tracking-dashboard utils', () => {
  const items = buildTrackingDashboardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(TRACKING_DASHBOARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      TRACKING_DASHBOARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalTrackingDashboard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupTrackingDashboardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterTrackingDashboard(items, '')).toHaveLength(items.length);
    expect(
      filterTrackingDashboard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterTrackingDashboard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortTrackingDashboard(items, 'amount', 'asc');
    const desc = sortTrackingDashboard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeTrackingDashboardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(trackingDashboardStatusTone('active')).toBe('success');
    expect(trackingDashboardStatusTone('pending')).toBe('warning');
    expect(trackingDashboardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickTrackingDashboardHighlights(items, 2)).toHaveLength(2);
    expect(pickTrackingDashboardHighlights(items, 0)).toHaveLength(0);
  });
});
