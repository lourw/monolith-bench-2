import { describe, expect, it } from 'vitest';
import {
  buildNotificationsHistoryItems,
  NOTIFICATIONS_HISTORY_ITEM_COUNT,
} from './notifications-history.model';
import {
  describeNotificationsHistoryItem,
  filterNotificationsHistory,
  groupNotificationsHistoryByStatus,
  pickNotificationsHistoryHighlights,
  sortNotificationsHistory,
  totalNotificationsHistory,
  notificationsHistoryStatusTone,
} from './notifications-history.utils';

describe('notifications-history utils', () => {
  const items = buildNotificationsHistoryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(NOTIFICATIONS_HISTORY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      NOTIFICATIONS_HISTORY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalNotificationsHistory(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupNotificationsHistoryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterNotificationsHistory(items, '')).toHaveLength(items.length);
    expect(
      filterNotificationsHistory(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterNotificationsHistory(items, 'no-such-thing-xyz')).toHaveLength(
      0,
    );
  });

  it('sorts by key in both directions', () => {
    const asc = sortNotificationsHistory(items, 'amount', 'asc');
    const desc = sortNotificationsHistory(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeNotificationsHistoryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(notificationsHistoryStatusTone('active')).toBe('success');
    expect(notificationsHistoryStatusTone('pending')).toBe('warning');
    expect(notificationsHistoryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickNotificationsHistoryHighlights(items, 2)).toHaveLength(2);
    expect(pickNotificationsHistoryHighlights(items, 0)).toHaveLength(0);
  });
});
