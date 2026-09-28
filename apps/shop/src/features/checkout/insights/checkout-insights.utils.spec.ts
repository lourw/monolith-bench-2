import { describe, expect, it } from 'vitest';
import {
  buildCheckoutInsightsItems,
  CHECKOUT_INSIGHTS_ITEM_COUNT,
} from './checkout-insights.model';
import {
  describeCheckoutInsightsItem,
  filterCheckoutInsights,
  groupCheckoutInsightsByStatus,
  pickCheckoutInsightsHighlights,
  sortCheckoutInsights,
  totalCheckoutInsights,
  checkoutInsightsStatusTone,
} from './checkout-insights.utils';

describe('checkout-insights utils', () => {
  const items = buildCheckoutInsightsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(CHECKOUT_INSIGHTS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      CHECKOUT_INSIGHTS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalCheckoutInsights(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupCheckoutInsightsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterCheckoutInsights(items, '')).toHaveLength(items.length);
    expect(
      filterCheckoutInsights(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterCheckoutInsights(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortCheckoutInsights(items, 'amount', 'asc');
    const desc = sortCheckoutInsights(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeCheckoutInsightsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(checkoutInsightsStatusTone('active')).toBe('success');
    expect(checkoutInsightsStatusTone('pending')).toBe('warning');
    expect(checkoutInsightsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickCheckoutInsightsHighlights(items, 2)).toHaveLength(2);
    expect(pickCheckoutInsightsHighlights(items, 0)).toHaveLength(0);
  });
});
