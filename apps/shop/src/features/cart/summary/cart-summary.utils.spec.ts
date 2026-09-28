import { describe, expect, it } from 'vitest';
import {
  buildCartSummaryItems,
  CART_SUMMARY_ITEM_COUNT,
} from './cart-summary.model';
import {
  describeCartSummaryItem,
  filterCartSummary,
  groupCartSummaryByStatus,
  pickCartSummaryHighlights,
  sortCartSummary,
  totalCartSummary,
  cartSummaryStatusTone,
} from './cart-summary.utils';

describe('cart-summary utils', () => {
  const items = buildCartSummaryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(CART_SUMMARY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      CART_SUMMARY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalCartSummary(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupCartSummaryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterCartSummary(items, '')).toHaveLength(items.length);
    expect(
      filterCartSummary(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterCartSummary(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortCartSummary(items, 'amount', 'asc');
    const desc = sortCartSummary(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeCartSummaryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(cartSummaryStatusTone('active')).toBe('success');
    expect(cartSummaryStatusTone('pending')).toBe('warning');
    expect(cartSummaryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickCartSummaryHighlights(items, 2)).toHaveLength(2);
    expect(pickCartSummaryHighlights(items, 0)).toHaveLength(0);
  });
});
