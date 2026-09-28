import { describe, expect, it } from 'vitest';
import {
  buildTrackingInsightsItems,
  TRACKING_INSIGHTS_ITEM_COUNT,
} from './tracking-insights.model';
import {
  describeTrackingInsightsItem,
  filterTrackingInsights,
  groupTrackingInsightsByStatus,
  pickTrackingInsightsHighlights,
  sortTrackingInsights,
  totalTrackingInsights,
  trackingInsightsStatusTone,
} from './tracking-insights.utils';

describe('tracking-insights utils', () => {
  const items = buildTrackingInsightsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(TRACKING_INSIGHTS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      TRACKING_INSIGHTS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalTrackingInsights(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupTrackingInsightsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterTrackingInsights(items, '')).toHaveLength(items.length);
    expect(
      filterTrackingInsights(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterTrackingInsights(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortTrackingInsights(items, 'amount', 'asc');
    const desc = sortTrackingInsights(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeTrackingInsightsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(trackingInsightsStatusTone('active')).toBe('success');
    expect(trackingInsightsStatusTone('pending')).toBe('warning');
    expect(trackingInsightsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickTrackingInsightsHighlights(items, 2)).toHaveLength(2);
    expect(pickTrackingInsightsHighlights(items, 0)).toHaveLength(0);
  });
});
