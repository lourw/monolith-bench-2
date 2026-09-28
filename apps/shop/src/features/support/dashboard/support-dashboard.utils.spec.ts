import { describe, expect, it } from 'vitest';
import {
  buildSupportDashboardItems,
  SUPPORT_DASHBOARD_ITEM_COUNT,
} from './support-dashboard.model';
import {
  describeSupportDashboardItem,
  filterSupportDashboard,
  groupSupportDashboardByStatus,
  pickSupportDashboardHighlights,
  sortSupportDashboard,
  totalSupportDashboard,
  supportDashboardStatusTone,
} from './support-dashboard.utils';

describe('support-dashboard utils', () => {
  const items = buildSupportDashboardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SUPPORT_DASHBOARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SUPPORT_DASHBOARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalSupportDashboard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupSupportDashboardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterSupportDashboard(items, '')).toHaveLength(items.length);
    expect(
      filterSupportDashboard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterSupportDashboard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortSupportDashboard(items, 'amount', 'asc');
    const desc = sortSupportDashboard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeSupportDashboardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(supportDashboardStatusTone('active')).toBe('success');
    expect(supportDashboardStatusTone('pending')).toBe('warning');
    expect(supportDashboardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickSupportDashboardHighlights(items, 2)).toHaveLength(2);
    expect(pickSupportDashboardHighlights(items, 0)).toHaveLength(0);
  });
});
