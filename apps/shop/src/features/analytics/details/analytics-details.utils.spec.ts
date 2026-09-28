import { describe, expect, it } from 'vitest';
import {
  buildAnalyticsDetailsItems,
  ANALYTICS_DETAILS_ITEM_COUNT,
} from './analytics-details.model';
import {
  describeAnalyticsDetailsItem,
  filterAnalyticsDetails,
  groupAnalyticsDetailsByStatus,
  pickAnalyticsDetailsHighlights,
  sortAnalyticsDetails,
  totalAnalyticsDetails,
  analyticsDetailsStatusTone,
} from './analytics-details.utils';

describe('analytics-details utils', () => {
  const items = buildAnalyticsDetailsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(ANALYTICS_DETAILS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      ANALYTICS_DETAILS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalAnalyticsDetails(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupAnalyticsDetailsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterAnalyticsDetails(items, '')).toHaveLength(items.length);
    expect(
      filterAnalyticsDetails(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterAnalyticsDetails(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortAnalyticsDetails(items, 'amount', 'asc');
    const desc = sortAnalyticsDetails(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeAnalyticsDetailsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(analyticsDetailsStatusTone('active')).toBe('success');
    expect(analyticsDetailsStatusTone('pending')).toBe('warning');
    expect(analyticsDetailsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickAnalyticsDetailsHighlights(items, 2)).toHaveLength(2);
    expect(pickAnalyticsDetailsHighlights(items, 0)).toHaveLength(0);
  });
});
