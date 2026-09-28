import { describe, expect, it } from 'vitest';
import {
  buildSubscriptionsHistoryItems,
  SUBSCRIPTIONS_HISTORY_ITEM_COUNT,
} from './subscriptions-history.model';
import {
  describeSubscriptionsHistoryItem,
  filterSubscriptionsHistory,
  groupSubscriptionsHistoryByStatus,
  pickSubscriptionsHistoryHighlights,
  sortSubscriptionsHistory,
  totalSubscriptionsHistory,
  subscriptionsHistoryStatusTone,
} from './subscriptions-history.utils';

describe('subscriptions-history utils', () => {
  const items = buildSubscriptionsHistoryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SUBSCRIPTIONS_HISTORY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SUBSCRIPTIONS_HISTORY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalSubscriptionsHistory(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupSubscriptionsHistoryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterSubscriptionsHistory(items, '')).toHaveLength(items.length);
    expect(
      filterSubscriptionsHistory(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterSubscriptionsHistory(items, 'no-such-thing-xyz')).toHaveLength(
      0,
    );
  });

  it('sorts by key in both directions', () => {
    const asc = sortSubscriptionsHistory(items, 'amount', 'asc');
    const desc = sortSubscriptionsHistory(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeSubscriptionsHistoryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(subscriptionsHistoryStatusTone('active')).toBe('success');
    expect(subscriptionsHistoryStatusTone('pending')).toBe('warning');
    expect(subscriptionsHistoryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickSubscriptionsHistoryHighlights(items, 2)).toHaveLength(2);
    expect(pickSubscriptionsHistoryHighlights(items, 0)).toHaveLength(0);
  });
});
