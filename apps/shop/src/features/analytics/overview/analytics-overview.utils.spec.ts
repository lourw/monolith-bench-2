import { describe, expect, it } from 'vitest';
import {
  buildAnalyticsOverviewItems,
  ANALYTICS_OVERVIEW_ITEM_COUNT,
} from './analytics-overview.model';
import {
  describeAnalyticsOverviewItem,
  filterAnalyticsOverview,
  groupAnalyticsOverviewByStatus,
  pickAnalyticsOverviewHighlights,
  sortAnalyticsOverview,
  totalAnalyticsOverview,
  analyticsOverviewStatusTone,
} from './analytics-overview.utils';

describe('analytics-overview utils', () => {
  const items = buildAnalyticsOverviewItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(ANALYTICS_OVERVIEW_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      ANALYTICS_OVERVIEW_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalAnalyticsOverview(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupAnalyticsOverviewByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterAnalyticsOverview(items, '')).toHaveLength(items.length);
    expect(
      filterAnalyticsOverview(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterAnalyticsOverview(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortAnalyticsOverview(items, 'amount', 'asc');
    const desc = sortAnalyticsOverview(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeAnalyticsOverviewItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(analyticsOverviewStatusTone('active')).toBe('success');
    expect(analyticsOverviewStatusTone('pending')).toBe('warning');
    expect(analyticsOverviewStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickAnalyticsOverviewHighlights(items, 2)).toHaveLength(2);
    expect(pickAnalyticsOverviewHighlights(items, 0)).toHaveLength(0);
  });
});
