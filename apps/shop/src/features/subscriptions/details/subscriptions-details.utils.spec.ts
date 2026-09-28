import { describe, expect, it } from 'vitest';
import {
  buildSubscriptionsDetailsItems,
  SUBSCRIPTIONS_DETAILS_ITEM_COUNT,
} from './subscriptions-details.model';
import {
  describeSubscriptionsDetailsItem,
  filterSubscriptionsDetails,
  groupSubscriptionsDetailsByStatus,
  pickSubscriptionsDetailsHighlights,
  sortSubscriptionsDetails,
  totalSubscriptionsDetails,
  subscriptionsDetailsStatusTone,
} from './subscriptions-details.utils';

describe('subscriptions-details utils', () => {
  const items = buildSubscriptionsDetailsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SUBSCRIPTIONS_DETAILS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SUBSCRIPTIONS_DETAILS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalSubscriptionsDetails(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupSubscriptionsDetailsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterSubscriptionsDetails(items, '')).toHaveLength(items.length);
    expect(
      filterSubscriptionsDetails(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterSubscriptionsDetails(items, 'no-such-thing-xyz')).toHaveLength(
      0,
    );
  });

  it('sorts by key in both directions', () => {
    const asc = sortSubscriptionsDetails(items, 'amount', 'asc');
    const desc = sortSubscriptionsDetails(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeSubscriptionsDetailsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(subscriptionsDetailsStatusTone('active')).toBe('success');
    expect(subscriptionsDetailsStatusTone('pending')).toBe('warning');
    expect(subscriptionsDetailsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickSubscriptionsDetailsHighlights(items, 2)).toHaveLength(2);
    expect(pickSubscriptionsDetailsHighlights(items, 0)).toHaveLength(0);
  });
});
