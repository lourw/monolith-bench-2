import { describe, expect, it } from 'vitest';
import {
  buildCompareDashboardItems,
  COMPARE_DASHBOARD_ITEM_COUNT,
} from './compare-dashboard.model';
import {
  describeCompareDashboardItem,
  filterCompareDashboard,
  groupCompareDashboardByStatus,
  pickCompareDashboardHighlights,
  sortCompareDashboard,
  totalCompareDashboard,
  compareDashboardStatusTone,
} from './compare-dashboard.utils';

describe('compare-dashboard utils', () => {
  const items = buildCompareDashboardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(COMPARE_DASHBOARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      COMPARE_DASHBOARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalCompareDashboard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupCompareDashboardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterCompareDashboard(items, '')).toHaveLength(items.length);
    expect(
      filterCompareDashboard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterCompareDashboard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortCompareDashboard(items, 'amount', 'asc');
    const desc = sortCompareDashboard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeCompareDashboardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(compareDashboardStatusTone('active')).toBe('success');
    expect(compareDashboardStatusTone('pending')).toBe('warning');
    expect(compareDashboardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickCompareDashboardHighlights(items, 2)).toHaveLength(2);
    expect(pickCompareDashboardHighlights(items, 0)).toHaveLength(0);
  });
});
