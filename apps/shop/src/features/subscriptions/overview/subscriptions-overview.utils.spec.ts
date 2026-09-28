import { describe, expect, it } from 'vitest';
import {
  buildSubscriptionsOverviewItems,
  SUBSCRIPTIONS_OVERVIEW_ITEM_COUNT,
} from './subscriptions-overview.model';
import {
  describeSubscriptionsOverviewItem,
  filterSubscriptionsOverview,
  groupSubscriptionsOverviewByStatus,
  pickSubscriptionsOverviewHighlights,
  sortSubscriptionsOverview,
  totalSubscriptionsOverview,
  subscriptionsOverviewStatusTone,
} from './subscriptions-overview.utils';

describe('subscriptions-overview utils', () => {
  const items = buildSubscriptionsOverviewItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SUBSCRIPTIONS_OVERVIEW_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SUBSCRIPTIONS_OVERVIEW_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalSubscriptionsOverview(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupSubscriptionsOverviewByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterSubscriptionsOverview(items, '')).toHaveLength(items.length);
    expect(
      filterSubscriptionsOverview(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(
      filterSubscriptionsOverview(items, 'no-such-thing-xyz'),
    ).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortSubscriptionsOverview(items, 'amount', 'asc');
    const desc = sortSubscriptionsOverview(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeSubscriptionsOverviewItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(subscriptionsOverviewStatusTone('active')).toBe('success');
    expect(subscriptionsOverviewStatusTone('pending')).toBe('warning');
    expect(subscriptionsOverviewStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickSubscriptionsOverviewHighlights(items, 2)).toHaveLength(2);
    expect(pickSubscriptionsOverviewHighlights(items, 0)).toHaveLength(0);
  });
});
