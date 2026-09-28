import { describe, expect, it } from 'vitest';
import {
  buildOrdersOverviewItems,
  ORDERS_OVERVIEW_ITEM_COUNT,
} from './orders-overview.model';
import {
  describeOrdersOverviewItem,
  filterOrdersOverview,
  groupOrdersOverviewByStatus,
  pickOrdersOverviewHighlights,
  sortOrdersOverview,
  totalOrdersOverview,
  ordersOverviewStatusTone,
} from './orders-overview.utils';

describe('orders-overview utils', () => {
  const items = buildOrdersOverviewItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(ORDERS_OVERVIEW_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      ORDERS_OVERVIEW_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalOrdersOverview(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupOrdersOverviewByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterOrdersOverview(items, '')).toHaveLength(items.length);
    expect(
      filterOrdersOverview(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterOrdersOverview(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortOrdersOverview(items, 'amount', 'asc');
    const desc = sortOrdersOverview(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeOrdersOverviewItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(ordersOverviewStatusTone('active')).toBe('success');
    expect(ordersOverviewStatusTone('pending')).toBe('warning');
    expect(ordersOverviewStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickOrdersOverviewHighlights(items, 2)).toHaveLength(2);
    expect(pickOrdersOverviewHighlights(items, 0)).toHaveLength(0);
  });
});
