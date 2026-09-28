import { describe, expect, it } from 'vitest';
import {
  buildSubscriptionsDashboardItems,
  SUBSCRIPTIONS_DASHBOARD_ITEM_COUNT,
} from './subscriptions-dashboard.model';
import {
  describeSubscriptionsDashboardItem,
  filterSubscriptionsDashboard,
  groupSubscriptionsDashboardByStatus,
  pickSubscriptionsDashboardHighlights,
  sortSubscriptionsDashboard,
  totalSubscriptionsDashboard,
  subscriptionsDashboardStatusTone,
} from './subscriptions-dashboard.utils';

describe('subscriptions-dashboard utils', () => {
  const items = buildSubscriptionsDashboardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SUBSCRIPTIONS_DASHBOARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SUBSCRIPTIONS_DASHBOARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalSubscriptionsDashboard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupSubscriptionsDashboardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterSubscriptionsDashboard(items, '')).toHaveLength(items.length);
    expect(
      filterSubscriptionsDashboard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(
      filterSubscriptionsDashboard(items, 'no-such-thing-xyz'),
    ).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortSubscriptionsDashboard(items, 'amount', 'asc');
    const desc = sortSubscriptionsDashboard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeSubscriptionsDashboardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(subscriptionsDashboardStatusTone('active')).toBe('success');
    expect(subscriptionsDashboardStatusTone('pending')).toBe('warning');
    expect(subscriptionsDashboardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickSubscriptionsDashboardHighlights(items, 2)).toHaveLength(2);
    expect(pickSubscriptionsDashboardHighlights(items, 0)).toHaveLength(0);
  });
});
