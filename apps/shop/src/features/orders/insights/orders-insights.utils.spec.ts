import { describe, expect, it } from 'vitest';
import {
  buildOrdersInsightsItems,
  ORDERS_INSIGHTS_ITEM_COUNT,
} from './orders-insights.model';
import {
  describeOrdersInsightsItem,
  filterOrdersInsights,
  groupOrdersInsightsByStatus,
  pickOrdersInsightsHighlights,
  sortOrdersInsights,
  totalOrdersInsights,
  ordersInsightsStatusTone,
} from './orders-insights.utils';

describe('orders-insights utils', () => {
  const items = buildOrdersInsightsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(ORDERS_INSIGHTS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      ORDERS_INSIGHTS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalOrdersInsights(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupOrdersInsightsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterOrdersInsights(items, '')).toHaveLength(items.length);
    expect(
      filterOrdersInsights(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterOrdersInsights(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortOrdersInsights(items, 'amount', 'asc');
    const desc = sortOrdersInsights(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeOrdersInsightsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(ordersInsightsStatusTone('active')).toBe('success');
    expect(ordersInsightsStatusTone('pending')).toBe('warning');
    expect(ordersInsightsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickOrdersInsightsHighlights(items, 2)).toHaveLength(2);
    expect(pickOrdersInsightsHighlights(items, 0)).toHaveLength(0);
  });
});
