import { describe, expect, it } from 'vitest';
import { buildCartListItems, CART_LIST_ITEM_COUNT } from './cart-list.model';
import {
  describeCartListItem,
  filterCartList,
  groupCartListByStatus,
  pickCartListHighlights,
  sortCartList,
  totalCartList,
  cartListStatusTone,
} from './cart-list.utils';

describe('cart-list utils', () => {
  const items = buildCartListItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(CART_LIST_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      CART_LIST_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalCartList(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupCartListByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterCartList(items, '')).toHaveLength(items.length);
    expect(
      filterCartList(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterCartList(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortCartList(items, 'amount', 'asc');
    const desc = sortCartList(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeCartListItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(cartListStatusTone('active')).toBe('success');
    expect(cartListStatusTone('pending')).toBe('warning');
    expect(cartListStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickCartListHighlights(items, 2)).toHaveLength(2);
    expect(pickCartListHighlights(items, 0)).toHaveLength(0);
  });
});
