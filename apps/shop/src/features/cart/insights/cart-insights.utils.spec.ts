import { describe, expect, it } from 'vitest';
import {
  buildCartInsightsItems,
  CART_INSIGHTS_ITEM_COUNT,
} from './cart-insights.model';
import {
  describeCartInsightsItem,
  filterCartInsights,
  groupCartInsightsByStatus,
  pickCartInsightsHighlights,
  sortCartInsights,
  totalCartInsights,
  cartInsightsStatusTone,
} from './cart-insights.utils';

describe('cart-insights utils', () => {
  const items = buildCartInsightsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(CART_INSIGHTS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      CART_INSIGHTS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalCartInsights(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupCartInsightsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterCartInsights(items, '')).toHaveLength(items.length);
    expect(
      filterCartInsights(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterCartInsights(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortCartInsights(items, 'amount', 'asc');
    const desc = sortCartInsights(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeCartInsightsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(cartInsightsStatusTone('active')).toBe('success');
    expect(cartInsightsStatusTone('pending')).toBe('warning');
    expect(cartInsightsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickCartInsightsHighlights(items, 2)).toHaveLength(2);
    expect(pickCartInsightsHighlights(items, 0)).toHaveLength(0);
  });
});
