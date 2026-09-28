import { describe, expect, it } from 'vitest';
import {
  buildSearchInsightsItems,
  SEARCH_INSIGHTS_ITEM_COUNT,
} from './search-insights.model';
import {
  describeSearchInsightsItem,
  filterSearchInsights,
  groupSearchInsightsByStatus,
  pickSearchInsightsHighlights,
  sortSearchInsights,
  totalSearchInsights,
  searchInsightsStatusTone,
} from './search-insights.utils';

describe('search-insights utils', () => {
  const items = buildSearchInsightsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SEARCH_INSIGHTS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SEARCH_INSIGHTS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalSearchInsights(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupSearchInsightsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterSearchInsights(items, '')).toHaveLength(items.length);
    expect(
      filterSearchInsights(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterSearchInsights(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortSearchInsights(items, 'amount', 'asc');
    const desc = sortSearchInsights(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeSearchInsightsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(searchInsightsStatusTone('active')).toBe('success');
    expect(searchInsightsStatusTone('pending')).toBe('warning');
    expect(searchInsightsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickSearchInsightsHighlights(items, 2)).toHaveLength(2);
    expect(pickSearchInsightsHighlights(items, 0)).toHaveLength(0);
  });
});
