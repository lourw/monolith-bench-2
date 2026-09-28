import { describe, expect, it } from 'vitest';
import {
  buildSupportInsightsItems,
  SUPPORT_INSIGHTS_ITEM_COUNT,
} from './support-insights.model';
import {
  describeSupportInsightsItem,
  filterSupportInsights,
  groupSupportInsightsByStatus,
  pickSupportInsightsHighlights,
  sortSupportInsights,
  totalSupportInsights,
  supportInsightsStatusTone,
} from './support-insights.utils';

describe('support-insights utils', () => {
  const items = buildSupportInsightsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SUPPORT_INSIGHTS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SUPPORT_INSIGHTS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalSupportInsights(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupSupportInsightsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterSupportInsights(items, '')).toHaveLength(items.length);
    expect(
      filterSupportInsights(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterSupportInsights(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortSupportInsights(items, 'amount', 'asc');
    const desc = sortSupportInsights(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeSupportInsightsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(supportInsightsStatusTone('active')).toBe('success');
    expect(supportInsightsStatusTone('pending')).toBe('warning');
    expect(supportInsightsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickSupportInsightsHighlights(items, 2)).toHaveLength(2);
    expect(pickSupportInsightsHighlights(items, 0)).toHaveLength(0);
  });
});
