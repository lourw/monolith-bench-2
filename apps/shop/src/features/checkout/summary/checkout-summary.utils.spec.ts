import { describe, expect, it } from 'vitest';
import {
  buildCheckoutSummaryItems,
  CHECKOUT_SUMMARY_ITEM_COUNT,
} from './checkout-summary.model';
import {
  describeCheckoutSummaryItem,
  filterCheckoutSummary,
  groupCheckoutSummaryByStatus,
  pickCheckoutSummaryHighlights,
  sortCheckoutSummary,
  totalCheckoutSummary,
  checkoutSummaryStatusTone,
} from './checkout-summary.utils';

describe('checkout-summary utils', () => {
  const items = buildCheckoutSummaryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(CHECKOUT_SUMMARY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      CHECKOUT_SUMMARY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalCheckoutSummary(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupCheckoutSummaryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterCheckoutSummary(items, '')).toHaveLength(items.length);
    expect(
      filterCheckoutSummary(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterCheckoutSummary(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortCheckoutSummary(items, 'amount', 'asc');
    const desc = sortCheckoutSummary(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeCheckoutSummaryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(checkoutSummaryStatusTone('active')).toBe('success');
    expect(checkoutSummaryStatusTone('pending')).toBe('warning');
    expect(checkoutSummaryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickCheckoutSummaryHighlights(items, 2)).toHaveLength(2);
    expect(pickCheckoutSummaryHighlights(items, 0)).toHaveLength(0);
  });
});
