import { describe, expect, it } from 'vitest';
import {
  buildNotificationsSummaryItems,
  NOTIFICATIONS_SUMMARY_ITEM_COUNT,
} from './notifications-summary.model';
import {
  describeNotificationsSummaryItem,
  filterNotificationsSummary,
  groupNotificationsSummaryByStatus,
  pickNotificationsSummaryHighlights,
  sortNotificationsSummary,
  totalNotificationsSummary,
  notificationsSummaryStatusTone,
} from './notifications-summary.utils';

describe('notifications-summary utils', () => {
  const items = buildNotificationsSummaryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(NOTIFICATIONS_SUMMARY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      NOTIFICATIONS_SUMMARY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalNotificationsSummary(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupNotificationsSummaryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterNotificationsSummary(items, '')).toHaveLength(items.length);
    expect(
      filterNotificationsSummary(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterNotificationsSummary(items, 'no-such-thing-xyz')).toHaveLength(
      0,
    );
  });

  it('sorts by key in both directions', () => {
    const asc = sortNotificationsSummary(items, 'amount', 'asc');
    const desc = sortNotificationsSummary(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeNotificationsSummaryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(notificationsSummaryStatusTone('active')).toBe('success');
    expect(notificationsSummaryStatusTone('pending')).toBe('warning');
    expect(notificationsSummaryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickNotificationsSummaryHighlights(items, 2)).toHaveLength(2);
    expect(pickNotificationsSummaryHighlights(items, 0)).toHaveLength(0);
  });
});
