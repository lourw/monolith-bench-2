import { describe, expect, it } from 'vitest';
import {
  buildCheckoutDetailsItems,
  CHECKOUT_DETAILS_ITEM_COUNT,
} from './checkout-details.model';
import {
  describeCheckoutDetailsItem,
  filterCheckoutDetails,
  groupCheckoutDetailsByStatus,
  pickCheckoutDetailsHighlights,
  sortCheckoutDetails,
  totalCheckoutDetails,
  checkoutDetailsStatusTone,
} from './checkout-details.utils';

describe('checkout-details utils', () => {
  const items = buildCheckoutDetailsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(CHECKOUT_DETAILS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      CHECKOUT_DETAILS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalCheckoutDetails(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupCheckoutDetailsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterCheckoutDetails(items, '')).toHaveLength(items.length);
    expect(
      filterCheckoutDetails(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterCheckoutDetails(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortCheckoutDetails(items, 'amount', 'asc');
    const desc = sortCheckoutDetails(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeCheckoutDetailsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(checkoutDetailsStatusTone('active')).toBe('success');
    expect(checkoutDetailsStatusTone('pending')).toBe('warning');
    expect(checkoutDetailsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickCheckoutDetailsHighlights(items, 2)).toHaveLength(2);
    expect(pickCheckoutDetailsHighlights(items, 0)).toHaveLength(0);
  });
});
