import { describe, expect, it } from 'vitest';
import {
  buildBundlesInsightsItems,
  BUNDLES_INSIGHTS_ITEM_COUNT,
} from './bundles-insights.model';
import {
  describeBundlesInsightsItem,
  filterBundlesInsights,
  groupBundlesInsightsByStatus,
  pickBundlesInsightsHighlights,
  sortBundlesInsights,
  totalBundlesInsights,
  bundlesInsightsStatusTone,
} from './bundles-insights.utils';

describe('bundles-insights utils', () => {
  const items = buildBundlesInsightsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(BUNDLES_INSIGHTS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      BUNDLES_INSIGHTS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalBundlesInsights(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupBundlesInsightsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterBundlesInsights(items, '')).toHaveLength(items.length);
    expect(
      filterBundlesInsights(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterBundlesInsights(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortBundlesInsights(items, 'amount', 'asc');
    const desc = sortBundlesInsights(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeBundlesInsightsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(bundlesInsightsStatusTone('active')).toBe('success');
    expect(bundlesInsightsStatusTone('pending')).toBe('warning');
    expect(bundlesInsightsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickBundlesInsightsHighlights(items, 2)).toHaveLength(2);
    expect(pickBundlesInsightsHighlights(items, 0)).toHaveLength(0);
  });
});
