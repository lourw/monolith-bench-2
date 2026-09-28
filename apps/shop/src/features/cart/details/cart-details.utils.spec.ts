import { describe, expect, it } from 'vitest';
import {
  buildCartDetailsItems,
  CART_DETAILS_ITEM_COUNT,
} from './cart-details.model';
import {
  describeCartDetailsItem,
  filterCartDetails,
  groupCartDetailsByStatus,
  pickCartDetailsHighlights,
  sortCartDetails,
  totalCartDetails,
  cartDetailsStatusTone,
} from './cart-details.utils';

describe('cart-details utils', () => {
  const items = buildCartDetailsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(CART_DETAILS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      CART_DETAILS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalCartDetails(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupCartDetailsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterCartDetails(items, '')).toHaveLength(items.length);
    expect(
      filterCartDetails(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterCartDetails(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortCartDetails(items, 'amount', 'asc');
    const desc = sortCartDetails(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeCartDetailsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(cartDetailsStatusTone('active')).toBe('success');
    expect(cartDetailsStatusTone('pending')).toBe('warning');
    expect(cartDetailsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickCartDetailsHighlights(items, 2)).toHaveLength(2);
    expect(pickCartDetailsHighlights(items, 0)).toHaveLength(0);
  });
});
