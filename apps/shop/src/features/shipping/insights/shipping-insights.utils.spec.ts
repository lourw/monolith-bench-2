import { describe, expect, it } from 'vitest';
import {
  buildShippingInsightsItems,
  SHIPPING_INSIGHTS_ITEM_COUNT,
} from './shipping-insights.model';
import {
  describeShippingInsightsItem,
  filterShippingInsights,
  groupShippingInsightsByStatus,
  pickShippingInsightsHighlights,
  sortShippingInsights,
  totalShippingInsights,
  shippingInsightsStatusTone,
} from './shipping-insights.utils';

describe('shipping-insights utils', () => {
  const items = buildShippingInsightsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SHIPPING_INSIGHTS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SHIPPING_INSIGHTS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalShippingInsights(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupShippingInsightsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterShippingInsights(items, '')).toHaveLength(items.length);
    expect(
      filterShippingInsights(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterShippingInsights(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortShippingInsights(items, 'amount', 'asc');
    const desc = sortShippingInsights(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeShippingInsightsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(shippingInsightsStatusTone('active')).toBe('success');
    expect(shippingInsightsStatusTone('pending')).toBe('warning');
    expect(shippingInsightsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickShippingInsightsHighlights(items, 2)).toHaveLength(2);
    expect(pickShippingInsightsHighlights(items, 0)).toHaveLength(0);
  });
});
