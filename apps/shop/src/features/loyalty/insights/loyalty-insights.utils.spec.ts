import { describe, expect, it } from 'vitest';
import {
  buildLoyaltyInsightsItems,
  LOYALTY_INSIGHTS_ITEM_COUNT,
} from './loyalty-insights.model';
import {
  describeLoyaltyInsightsItem,
  filterLoyaltyInsights,
  groupLoyaltyInsightsByStatus,
  pickLoyaltyInsightsHighlights,
  sortLoyaltyInsights,
  totalLoyaltyInsights,
  loyaltyInsightsStatusTone,
} from './loyalty-insights.utils';

describe('loyalty-insights utils', () => {
  const items = buildLoyaltyInsightsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(LOYALTY_INSIGHTS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      LOYALTY_INSIGHTS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalLoyaltyInsights(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupLoyaltyInsightsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterLoyaltyInsights(items, '')).toHaveLength(items.length);
    expect(
      filterLoyaltyInsights(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterLoyaltyInsights(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortLoyaltyInsights(items, 'amount', 'asc');
    const desc = sortLoyaltyInsights(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeLoyaltyInsightsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(loyaltyInsightsStatusTone('active')).toBe('success');
    expect(loyaltyInsightsStatusTone('pending')).toBe('warning');
    expect(loyaltyInsightsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickLoyaltyInsightsHighlights(items, 2)).toHaveLength(2);
    expect(pickLoyaltyInsightsHighlights(items, 0)).toHaveLength(0);
  });
});
