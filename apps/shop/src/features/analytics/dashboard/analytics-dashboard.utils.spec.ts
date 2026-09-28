import { describe, expect, it } from 'vitest';
import {
  buildAnalyticsDashboardItems,
  ANALYTICS_DASHBOARD_ITEM_COUNT,
} from './analytics-dashboard.model';
import {
  describeAnalyticsDashboardItem,
  filterAnalyticsDashboard,
  groupAnalyticsDashboardByStatus,
  pickAnalyticsDashboardHighlights,
  sortAnalyticsDashboard,
  totalAnalyticsDashboard,
  analyticsDashboardStatusTone,
} from './analytics-dashboard.utils';

describe('analytics-dashboard utils', () => {
  const items = buildAnalyticsDashboardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(ANALYTICS_DASHBOARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      ANALYTICS_DASHBOARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalAnalyticsDashboard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupAnalyticsDashboardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterAnalyticsDashboard(items, '')).toHaveLength(items.length);
    expect(
      filterAnalyticsDashboard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterAnalyticsDashboard(items, 'no-such-thing-xyz')).toHaveLength(
      0,
    );
  });

  it('sorts by key in both directions', () => {
    const asc = sortAnalyticsDashboard(items, 'amount', 'asc');
    const desc = sortAnalyticsDashboard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeAnalyticsDashboardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(analyticsDashboardStatusTone('active')).toBe('success');
    expect(analyticsDashboardStatusTone('pending')).toBe('warning');
    expect(analyticsDashboardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickAnalyticsDashboardHighlights(items, 2)).toHaveLength(2);
    expect(pickAnalyticsDashboardHighlights(items, 0)).toHaveLength(0);
  });
});
