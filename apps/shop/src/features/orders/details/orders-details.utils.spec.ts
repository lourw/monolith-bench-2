import { describe, expect, it } from 'vitest';
import {
  buildOrdersDetailsItems,
  ORDERS_DETAILS_ITEM_COUNT,
} from './orders-details.model';
import {
  describeOrdersDetailsItem,
  filterOrdersDetails,
  groupOrdersDetailsByStatus,
  pickOrdersDetailsHighlights,
  sortOrdersDetails,
  totalOrdersDetails,
  ordersDetailsStatusTone,
} from './orders-details.utils';

describe('orders-details utils', () => {
  const items = buildOrdersDetailsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(ORDERS_DETAILS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      ORDERS_DETAILS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalOrdersDetails(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupOrdersDetailsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterOrdersDetails(items, '')).toHaveLength(items.length);
    expect(
      filterOrdersDetails(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterOrdersDetails(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortOrdersDetails(items, 'amount', 'asc');
    const desc = sortOrdersDetails(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeOrdersDetailsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(ordersDetailsStatusTone('active')).toBe('success');
    expect(ordersDetailsStatusTone('pending')).toBe('warning');
    expect(ordersDetailsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickOrdersDetailsHighlights(items, 2)).toHaveLength(2);
    expect(pickOrdersDetailsHighlights(items, 0)).toHaveLength(0);
  });
});
