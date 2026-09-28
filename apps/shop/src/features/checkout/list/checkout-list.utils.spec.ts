import { describe, expect, it } from 'vitest';
import {
  buildCheckoutListItems,
  CHECKOUT_LIST_ITEM_COUNT,
} from './checkout-list.model';
import {
  describeCheckoutListItem,
  filterCheckoutList,
  groupCheckoutListByStatus,
  pickCheckoutListHighlights,
  sortCheckoutList,
  totalCheckoutList,
  checkoutListStatusTone,
} from './checkout-list.utils';

describe('checkout-list utils', () => {
  const items = buildCheckoutListItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(CHECKOUT_LIST_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      CHECKOUT_LIST_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalCheckoutList(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupCheckoutListByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterCheckoutList(items, '')).toHaveLength(items.length);
    expect(
      filterCheckoutList(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterCheckoutList(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortCheckoutList(items, 'amount', 'asc');
    const desc = sortCheckoutList(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeCheckoutListItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(checkoutListStatusTone('active')).toBe('success');
    expect(checkoutListStatusTone('pending')).toBe('warning');
    expect(checkoutListStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickCheckoutListHighlights(items, 2)).toHaveLength(2);
    expect(pickCheckoutListHighlights(items, 0)).toHaveLength(0);
  });
});
