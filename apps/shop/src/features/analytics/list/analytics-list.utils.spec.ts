import { describe, expect, it } from 'vitest';
import {
  buildAnalyticsListItems,
  ANALYTICS_LIST_ITEM_COUNT,
} from './analytics-list.model';
import {
  describeAnalyticsListItem,
  filterAnalyticsList,
  groupAnalyticsListByStatus,
  pickAnalyticsListHighlights,
  sortAnalyticsList,
  totalAnalyticsList,
  analyticsListStatusTone,
} from './analytics-list.utils';

describe('analytics-list utils', () => {
  const items = buildAnalyticsListItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(ANALYTICS_LIST_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      ANALYTICS_LIST_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalAnalyticsList(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupAnalyticsListByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterAnalyticsList(items, '')).toHaveLength(items.length);
    expect(
      filterAnalyticsList(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterAnalyticsList(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortAnalyticsList(items, 'amount', 'asc');
    const desc = sortAnalyticsList(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeAnalyticsListItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(analyticsListStatusTone('active')).toBe('success');
    expect(analyticsListStatusTone('pending')).toBe('warning');
    expect(analyticsListStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickAnalyticsListHighlights(items, 2)).toHaveLength(2);
    expect(pickAnalyticsListHighlights(items, 0)).toHaveLength(0);
  });
});
