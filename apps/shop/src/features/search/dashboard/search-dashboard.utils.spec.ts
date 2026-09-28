import { describe, expect, it } from 'vitest';
import {
  buildSearchDashboardItems,
  SEARCH_DASHBOARD_ITEM_COUNT,
} from './search-dashboard.model';
import {
  describeSearchDashboardItem,
  filterSearchDashboard,
  groupSearchDashboardByStatus,
  pickSearchDashboardHighlights,
  sortSearchDashboard,
  totalSearchDashboard,
  searchDashboardStatusTone,
} from './search-dashboard.utils';

describe('search-dashboard utils', () => {
  const items = buildSearchDashboardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SEARCH_DASHBOARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SEARCH_DASHBOARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalSearchDashboard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupSearchDashboardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterSearchDashboard(items, '')).toHaveLength(items.length);
    expect(
      filterSearchDashboard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterSearchDashboard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortSearchDashboard(items, 'amount', 'asc');
    const desc = sortSearchDashboard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeSearchDashboardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(searchDashboardStatusTone('active')).toBe('success');
    expect(searchDashboardStatusTone('pending')).toBe('warning');
    expect(searchDashboardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickSearchDashboardHighlights(items, 2)).toHaveLength(2);
    expect(pickSearchDashboardHighlights(items, 0)).toHaveLength(0);
  });
});
