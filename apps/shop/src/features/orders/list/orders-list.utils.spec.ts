import { describe, expect, it } from 'vitest';
import {
  buildOrdersListItems,
  ORDERS_LIST_ITEM_COUNT,
} from './orders-list.model';
import {
  describeOrdersListItem,
  filterOrdersList,
  groupOrdersListByStatus,
  pickOrdersListHighlights,
  sortOrdersList,
  totalOrdersList,
  ordersListStatusTone,
} from './orders-list.utils';

describe('orders-list utils', () => {
  const items = buildOrdersListItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(ORDERS_LIST_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      ORDERS_LIST_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalOrdersList(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupOrdersListByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterOrdersList(items, '')).toHaveLength(items.length);
    expect(
      filterOrdersList(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterOrdersList(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortOrdersList(items, 'amount', 'asc');
    const desc = sortOrdersList(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeOrdersListItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(ordersListStatusTone('active')).toBe('success');
    expect(ordersListStatusTone('pending')).toBe('warning');
    expect(ordersListStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickOrdersListHighlights(items, 2)).toHaveLength(2);
    expect(pickOrdersListHighlights(items, 0)).toHaveLength(0);
  });
});
