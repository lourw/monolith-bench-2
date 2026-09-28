import { describe, expect, it } from 'vitest';
import {
  buildSizingInsightsItems,
  SIZING_INSIGHTS_ITEM_COUNT,
} from './sizing-insights.model';
import {
  describeSizingInsightsItem,
  filterSizingInsights,
  groupSizingInsightsByStatus,
  pickSizingInsightsHighlights,
  sortSizingInsights,
  totalSizingInsights,
  sizingInsightsStatusTone,
} from './sizing-insights.utils';

describe('sizing-insights utils', () => {
  const items = buildSizingInsightsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SIZING_INSIGHTS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SIZING_INSIGHTS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalSizingInsights(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupSizingInsightsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterSizingInsights(items, '')).toHaveLength(items.length);
    expect(
      filterSizingInsights(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterSizingInsights(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortSizingInsights(items, 'amount', 'asc');
    const desc = sortSizingInsights(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeSizingInsightsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(sizingInsightsStatusTone('active')).toBe('success');
    expect(sizingInsightsStatusTone('pending')).toBe('warning');
    expect(sizingInsightsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickSizingInsightsHighlights(items, 2)).toHaveLength(2);
    expect(pickSizingInsightsHighlights(items, 0)).toHaveLength(0);
  });
});
