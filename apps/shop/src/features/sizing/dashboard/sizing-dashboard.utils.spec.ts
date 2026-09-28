import { describe, expect, it } from 'vitest';
import {
  buildSizingDashboardItems,
  SIZING_DASHBOARD_ITEM_COUNT,
} from './sizing-dashboard.model';
import {
  describeSizingDashboardItem,
  filterSizingDashboard,
  groupSizingDashboardByStatus,
  pickSizingDashboardHighlights,
  sortSizingDashboard,
  totalSizingDashboard,
  sizingDashboardStatusTone,
} from './sizing-dashboard.utils';

describe('sizing-dashboard utils', () => {
  const items = buildSizingDashboardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SIZING_DASHBOARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SIZING_DASHBOARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalSizingDashboard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupSizingDashboardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterSizingDashboard(items, '')).toHaveLength(items.length);
    expect(
      filterSizingDashboard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterSizingDashboard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortSizingDashboard(items, 'amount', 'asc');
    const desc = sortSizingDashboard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeSizingDashboardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(sizingDashboardStatusTone('active')).toBe('success');
    expect(sizingDashboardStatusTone('pending')).toBe('warning');
    expect(sizingDashboardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickSizingDashboardHighlights(items, 2)).toHaveLength(2);
    expect(pickSizingDashboardHighlights(items, 0)).toHaveLength(0);
  });
});
