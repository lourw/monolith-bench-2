import { describe, expect, it } from 'vitest';
import {
  buildSubscriptionsSummaryItems,
  SUBSCRIPTIONS_SUMMARY_ITEM_COUNT,
} from './subscriptions-summary.model';
import {
  describeSubscriptionsSummaryItem,
  filterSubscriptionsSummary,
  groupSubscriptionsSummaryByStatus,
  pickSubscriptionsSummaryHighlights,
  sortSubscriptionsSummary,
  totalSubscriptionsSummary,
  subscriptionsSummaryStatusTone,
} from './subscriptions-summary.utils';

describe('subscriptions-summary utils', () => {
  const items = buildSubscriptionsSummaryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SUBSCRIPTIONS_SUMMARY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SUBSCRIPTIONS_SUMMARY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalSubscriptionsSummary(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupSubscriptionsSummaryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterSubscriptionsSummary(items, '')).toHaveLength(items.length);
    expect(
      filterSubscriptionsSummary(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterSubscriptionsSummary(items, 'no-such-thing-xyz')).toHaveLength(
      0,
    );
  });

  it('sorts by key in both directions', () => {
    const asc = sortSubscriptionsSummary(items, 'amount', 'asc');
    const desc = sortSubscriptionsSummary(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeSubscriptionsSummaryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(subscriptionsSummaryStatusTone('active')).toBe('success');
    expect(subscriptionsSummaryStatusTone('pending')).toBe('warning');
    expect(subscriptionsSummaryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickSubscriptionsSummaryHighlights(items, 2)).toHaveLength(2);
    expect(pickSubscriptionsSummaryHighlights(items, 0)).toHaveLength(0);
  });
});
