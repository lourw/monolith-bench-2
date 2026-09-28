import { describe, expect, it } from 'vitest';
import {
  buildSubscriptionsInsightsItems,
  SUBSCRIPTIONS_INSIGHTS_ITEM_COUNT,
} from './subscriptions-insights.model';
import {
  describeSubscriptionsInsightsItem,
  filterSubscriptionsInsights,
  groupSubscriptionsInsightsByStatus,
  pickSubscriptionsInsightsHighlights,
  sortSubscriptionsInsights,
  totalSubscriptionsInsights,
  subscriptionsInsightsStatusTone,
} from './subscriptions-insights.utils';

describe('subscriptions-insights utils', () => {
  const items = buildSubscriptionsInsightsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SUBSCRIPTIONS_INSIGHTS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SUBSCRIPTIONS_INSIGHTS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalSubscriptionsInsights(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupSubscriptionsInsightsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterSubscriptionsInsights(items, '')).toHaveLength(items.length);
    expect(
      filterSubscriptionsInsights(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(
      filterSubscriptionsInsights(items, 'no-such-thing-xyz'),
    ).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortSubscriptionsInsights(items, 'amount', 'asc');
    const desc = sortSubscriptionsInsights(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeSubscriptionsInsightsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(subscriptionsInsightsStatusTone('active')).toBe('success');
    expect(subscriptionsInsightsStatusTone('pending')).toBe('warning');
    expect(subscriptionsInsightsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickSubscriptionsInsightsHighlights(items, 2)).toHaveLength(2);
    expect(pickSubscriptionsInsightsHighlights(items, 0)).toHaveLength(0);
  });
});
