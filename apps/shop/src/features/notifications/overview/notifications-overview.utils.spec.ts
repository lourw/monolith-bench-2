import { describe, expect, it } from 'vitest';
import {
  buildNotificationsOverviewItems,
  NOTIFICATIONS_OVERVIEW_ITEM_COUNT,
} from './notifications-overview.model';
import {
  describeNotificationsOverviewItem,
  filterNotificationsOverview,
  groupNotificationsOverviewByStatus,
  pickNotificationsOverviewHighlights,
  sortNotificationsOverview,
  totalNotificationsOverview,
  notificationsOverviewStatusTone,
} from './notifications-overview.utils';

describe('notifications-overview utils', () => {
  const items = buildNotificationsOverviewItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(NOTIFICATIONS_OVERVIEW_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      NOTIFICATIONS_OVERVIEW_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalNotificationsOverview(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupNotificationsOverviewByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterNotificationsOverview(items, '')).toHaveLength(items.length);
    expect(
      filterNotificationsOverview(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(
      filterNotificationsOverview(items, 'no-such-thing-xyz'),
    ).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortNotificationsOverview(items, 'amount', 'asc');
    const desc = sortNotificationsOverview(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeNotificationsOverviewItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(notificationsOverviewStatusTone('active')).toBe('success');
    expect(notificationsOverviewStatusTone('pending')).toBe('warning');
    expect(notificationsOverviewStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickNotificationsOverviewHighlights(items, 2)).toHaveLength(2);
    expect(pickNotificationsOverviewHighlights(items, 0)).toHaveLength(0);
  });
});
