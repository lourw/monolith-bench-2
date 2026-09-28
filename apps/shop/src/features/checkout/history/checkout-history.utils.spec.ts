import { describe, expect, it } from 'vitest';
import {
  buildCheckoutHistoryItems,
  CHECKOUT_HISTORY_ITEM_COUNT,
} from './checkout-history.model';
import {
  describeCheckoutHistoryItem,
  filterCheckoutHistory,
  groupCheckoutHistoryByStatus,
  pickCheckoutHistoryHighlights,
  sortCheckoutHistory,
  totalCheckoutHistory,
  checkoutHistoryStatusTone,
} from './checkout-history.utils';

describe('checkout-history utils', () => {
  const items = buildCheckoutHistoryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(CHECKOUT_HISTORY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      CHECKOUT_HISTORY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalCheckoutHistory(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupCheckoutHistoryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterCheckoutHistory(items, '')).toHaveLength(items.length);
    expect(
      filterCheckoutHistory(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterCheckoutHistory(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortCheckoutHistory(items, 'amount', 'asc');
    const desc = sortCheckoutHistory(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeCheckoutHistoryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(checkoutHistoryStatusTone('active')).toBe('success');
    expect(checkoutHistoryStatusTone('pending')).toBe('warning');
    expect(checkoutHistoryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickCheckoutHistoryHighlights(items, 2)).toHaveLength(2);
    expect(pickCheckoutHistoryHighlights(items, 0)).toHaveLength(0);
  });
});
