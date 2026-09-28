import { describe, expect, it } from 'vitest';
import {
  buildNotificationsInsightsItems,
  NOTIFICATIONS_INSIGHTS_ITEM_COUNT,
} from './notifications-insights.model';
import {
  describeNotificationsInsightsItem,
  filterNotificationsInsights,
  groupNotificationsInsightsByStatus,
  pickNotificationsInsightsHighlights,
  sortNotificationsInsights,
  totalNotificationsInsights,
  notificationsInsightsStatusTone,
} from './notifications-insights.utils';

describe('notifications-insights utils', () => {
  const items = buildNotificationsInsightsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(NOTIFICATIONS_INSIGHTS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      NOTIFICATIONS_INSIGHTS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalNotificationsInsights(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupNotificationsInsightsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterNotificationsInsights(items, '')).toHaveLength(items.length);
    expect(
      filterNotificationsInsights(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(
      filterNotificationsInsights(items, 'no-such-thing-xyz'),
    ).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortNotificationsInsights(items, 'amount', 'asc');
    const desc = sortNotificationsInsights(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeNotificationsInsightsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(notificationsInsightsStatusTone('active')).toBe('success');
    expect(notificationsInsightsStatusTone('pending')).toBe('warning');
    expect(notificationsInsightsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickNotificationsInsightsHighlights(items, 2)).toHaveLength(2);
    expect(pickNotificationsInsightsHighlights(items, 0)).toHaveLength(0);
  });
});
