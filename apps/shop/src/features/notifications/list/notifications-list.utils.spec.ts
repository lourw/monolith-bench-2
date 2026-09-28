import { describe, expect, it } from 'vitest';
import {
  buildNotificationsListItems,
  NOTIFICATIONS_LIST_ITEM_COUNT,
} from './notifications-list.model';
import {
  describeNotificationsListItem,
  filterNotificationsList,
  groupNotificationsListByStatus,
  pickNotificationsListHighlights,
  sortNotificationsList,
  totalNotificationsList,
  notificationsListStatusTone,
} from './notifications-list.utils';

describe('notifications-list utils', () => {
  const items = buildNotificationsListItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(NOTIFICATIONS_LIST_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      NOTIFICATIONS_LIST_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalNotificationsList(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupNotificationsListByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterNotificationsList(items, '')).toHaveLength(items.length);
    expect(
      filterNotificationsList(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterNotificationsList(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortNotificationsList(items, 'amount', 'asc');
    const desc = sortNotificationsList(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeNotificationsListItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(notificationsListStatusTone('active')).toBe('success');
    expect(notificationsListStatusTone('pending')).toBe('warning');
    expect(notificationsListStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickNotificationsListHighlights(items, 2)).toHaveLength(2);
    expect(pickNotificationsListHighlights(items, 0)).toHaveLength(0);
  });
});
