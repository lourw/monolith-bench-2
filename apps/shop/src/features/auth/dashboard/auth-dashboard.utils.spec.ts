import { describe, expect, it } from 'vitest';
import {
  buildAuthDashboardItems,
  AUTH_DASHBOARD_ITEM_COUNT,
} from './auth-dashboard.model';
import {
  describeAuthDashboardItem,
  filterAuthDashboard,
  groupAuthDashboardByStatus,
  pickAuthDashboardHighlights,
  sortAuthDashboard,
  totalAuthDashboard,
  authDashboardStatusTone,
} from './auth-dashboard.utils';

describe('auth-dashboard utils', () => {
  const items = buildAuthDashboardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(AUTH_DASHBOARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      AUTH_DASHBOARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalAuthDashboard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupAuthDashboardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterAuthDashboard(items, '')).toHaveLength(items.length);
    expect(
      filterAuthDashboard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterAuthDashboard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortAuthDashboard(items, 'amount', 'asc');
    const desc = sortAuthDashboard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeAuthDashboardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(authDashboardStatusTone('active')).toBe('success');
    expect(authDashboardStatusTone('pending')).toBe('warning');
    expect(authDashboardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickAuthDashboardHighlights(items, 2)).toHaveLength(2);
    expect(pickAuthDashboardHighlights(items, 0)).toHaveLength(0);
  });
});
