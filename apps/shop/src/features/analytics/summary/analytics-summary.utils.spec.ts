import { describe, expect, it } from 'vitest';
import {
  buildAnalyticsSummaryItems,
  ANALYTICS_SUMMARY_ITEM_COUNT,
} from './analytics-summary.model';
import {
  describeAnalyticsSummaryItem,
  filterAnalyticsSummary,
  groupAnalyticsSummaryByStatus,
  pickAnalyticsSummaryHighlights,
  sortAnalyticsSummary,
  totalAnalyticsSummary,
  analyticsSummaryStatusTone,
} from './analytics-summary.utils';

describe('analytics-summary utils', () => {
  const items = buildAnalyticsSummaryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(ANALYTICS_SUMMARY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      ANALYTICS_SUMMARY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalAnalyticsSummary(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupAnalyticsSummaryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterAnalyticsSummary(items, '')).toHaveLength(items.length);
    expect(
      filterAnalyticsSummary(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterAnalyticsSummary(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortAnalyticsSummary(items, 'amount', 'asc');
    const desc = sortAnalyticsSummary(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeAnalyticsSummaryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(analyticsSummaryStatusTone('active')).toBe('success');
    expect(analyticsSummaryStatusTone('pending')).toBe('warning');
    expect(analyticsSummaryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickAnalyticsSummaryHighlights(items, 2)).toHaveLength(2);
    expect(pickAnalyticsSummaryHighlights(items, 0)).toHaveLength(0);
  });
});
