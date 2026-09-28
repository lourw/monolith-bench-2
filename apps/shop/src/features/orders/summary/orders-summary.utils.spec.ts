import { describe, expect, it } from 'vitest';
import {
  buildOrdersSummaryItems,
  ORDERS_SUMMARY_ITEM_COUNT,
} from './orders-summary.model';
import {
  describeOrdersSummaryItem,
  filterOrdersSummary,
  groupOrdersSummaryByStatus,
  pickOrdersSummaryHighlights,
  sortOrdersSummary,
  totalOrdersSummary,
  ordersSummaryStatusTone,
} from './orders-summary.utils';

describe('orders-summary utils', () => {
  const items = buildOrdersSummaryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(ORDERS_SUMMARY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      ORDERS_SUMMARY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalOrdersSummary(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupOrdersSummaryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterOrdersSummary(items, '')).toHaveLength(items.length);
    expect(
      filterOrdersSummary(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterOrdersSummary(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortOrdersSummary(items, 'amount', 'asc');
    const desc = sortOrdersSummary(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeOrdersSummaryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(ordersSummaryStatusTone('active')).toBe('success');
    expect(ordersSummaryStatusTone('pending')).toBe('warning');
    expect(ordersSummaryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickOrdersSummaryHighlights(items, 2)).toHaveLength(2);
    expect(pickOrdersSummaryHighlights(items, 0)).toHaveLength(0);
  });
});
