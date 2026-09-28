import { describe, expect, it } from 'vitest';
import {
  buildPromotionsInsightsItems,
  PROMOTIONS_INSIGHTS_ITEM_COUNT,
} from './promotions-insights.model';
import {
  describePromotionsInsightsItem,
  filterPromotionsInsights,
  groupPromotionsInsightsByStatus,
  pickPromotionsInsightsHighlights,
  sortPromotionsInsights,
  totalPromotionsInsights,
  promotionsInsightsStatusTone,
} from './promotions-insights.utils';

describe('promotions-insights utils', () => {
  const items = buildPromotionsInsightsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(PROMOTIONS_INSIGHTS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      PROMOTIONS_INSIGHTS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalPromotionsInsights(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupPromotionsInsightsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterPromotionsInsights(items, '')).toHaveLength(items.length);
    expect(
      filterPromotionsInsights(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterPromotionsInsights(items, 'no-such-thing-xyz')).toHaveLength(
      0,
    );
  });

  it('sorts by key in both directions', () => {
    const asc = sortPromotionsInsights(items, 'amount', 'asc');
    const desc = sortPromotionsInsights(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describePromotionsInsightsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(promotionsInsightsStatusTone('active')).toBe('success');
    expect(promotionsInsightsStatusTone('pending')).toBe('warning');
    expect(promotionsInsightsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickPromotionsInsightsHighlights(items, 2)).toHaveLength(2);
    expect(pickPromotionsInsightsHighlights(items, 0)).toHaveLength(0);
  });
});
