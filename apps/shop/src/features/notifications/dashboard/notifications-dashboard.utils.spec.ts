import { describe, expect, it } from 'vitest';
import {
  buildNotificationsDashboardItems,
  NOTIFICATIONS_DASHBOARD_ITEM_COUNT,
} from './notifications-dashboard.model';
import {
  describeNotificationsDashboardItem,
  filterNotificationsDashboard,
  groupNotificationsDashboardByStatus,
  pickNotificationsDashboardHighlights,
  sortNotificationsDashboard,
  totalNotificationsDashboard,
  notificationsDashboardStatusTone,
} from './notifications-dashboard.utils';

describe('notifications-dashboard utils', () => {
  const items = buildNotificationsDashboardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(NOTIFICATIONS_DASHBOARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      NOTIFICATIONS_DASHBOARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalNotificationsDashboard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupNotificationsDashboardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterNotificationsDashboard(items, '')).toHaveLength(items.length);
    expect(
      filterNotificationsDashboard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(
      filterNotificationsDashboard(items, 'no-such-thing-xyz'),
    ).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortNotificationsDashboard(items, 'amount', 'asc');
    const desc = sortNotificationsDashboard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeNotificationsDashboardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(notificationsDashboardStatusTone('active')).toBe('success');
    expect(notificationsDashboardStatusTone('pending')).toBe('warning');
    expect(notificationsDashboardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickNotificationsDashboardHighlights(items, 2)).toHaveLength(2);
    expect(pickNotificationsDashboardHighlights(items, 0)).toHaveLength(0);
  });
});
