import { describe, expect, it } from 'vitest';
import {
  buildAnalyticsInsightsItems,
  ANALYTICS_INSIGHTS_ITEM_COUNT,
} from './analytics-insights.model';
import {
  describeAnalyticsInsightsItem,
  filterAnalyticsInsights,
  groupAnalyticsInsightsByStatus,
  pickAnalyticsInsightsHighlights,
  sortAnalyticsInsights,
  totalAnalyticsInsights,
  analyticsInsightsStatusTone,
} from './analytics-insights.utils';

describe('analytics-insights utils', () => {
  const items = buildAnalyticsInsightsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(ANALYTICS_INSIGHTS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      ANALYTICS_INSIGHTS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalAnalyticsInsights(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupAnalyticsInsightsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterAnalyticsInsights(items, '')).toHaveLength(items.length);
    expect(
      filterAnalyticsInsights(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterAnalyticsInsights(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortAnalyticsInsights(items, 'amount', 'asc');
    const desc = sortAnalyticsInsights(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeAnalyticsInsightsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(analyticsInsightsStatusTone('active')).toBe('success');
    expect(analyticsInsightsStatusTone('pending')).toBe('warning');
    expect(analyticsInsightsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickAnalyticsInsightsHighlights(items, 2)).toHaveLength(2);
    expect(pickAnalyticsInsightsHighlights(items, 0)).toHaveLength(0);
  });
});
