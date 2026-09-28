import { describe, expect, it } from 'vitest';
import {
  buildOrdersHistoryItems,
  ORDERS_HISTORY_ITEM_COUNT,
} from './orders-history.model';
import {
  describeOrdersHistoryItem,
  filterOrdersHistory,
  groupOrdersHistoryByStatus,
  pickOrdersHistoryHighlights,
  sortOrdersHistory,
  totalOrdersHistory,
  ordersHistoryStatusTone,
} from './orders-history.utils';

describe('orders-history utils', () => {
  const items = buildOrdersHistoryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(ORDERS_HISTORY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      ORDERS_HISTORY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalOrdersHistory(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupOrdersHistoryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterOrdersHistory(items, '')).toHaveLength(items.length);
    expect(
      filterOrdersHistory(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterOrdersHistory(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortOrdersHistory(items, 'amount', 'asc');
    const desc = sortOrdersHistory(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeOrdersHistoryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(ordersHistoryStatusTone('active')).toBe('success');
    expect(ordersHistoryStatusTone('pending')).toBe('warning');
    expect(ordersHistoryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickOrdersHistoryHighlights(items, 2)).toHaveLength(2);
    expect(pickOrdersHistoryHighlights(items, 0)).toHaveLength(0);
  });
});
