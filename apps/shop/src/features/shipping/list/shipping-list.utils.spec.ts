import { describe, expect, it } from 'vitest';
import {
  buildShippingListItems,
  SHIPPING_LIST_ITEM_COUNT,
} from './shipping-list.model';
import {
  describeShippingListItem,
  filterShippingList,
  groupShippingListByStatus,
  pickShippingListHighlights,
  sortShippingList,
  totalShippingList,
  shippingListStatusTone,
} from './shipping-list.utils';

describe('shipping-list utils', () => {
  const items = buildShippingListItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SHIPPING_LIST_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SHIPPING_LIST_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalShippingList(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupShippingListByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterShippingList(items, '')).toHaveLength(items.length);
    expect(
      filterShippingList(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterShippingList(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortShippingList(items, 'amount', 'asc');
    const desc = sortShippingList(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeShippingListItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(shippingListStatusTone('active')).toBe('success');
    expect(shippingListStatusTone('pending')).toBe('warning');
    expect(shippingListStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickShippingListHighlights(items, 2)).toHaveLength(2);
    expect(pickShippingListHighlights(items, 0)).toHaveLength(0);
  });
});
