import { describe, expect, it } from 'vitest';
import {
  buildLoyaltyDashboardItems,
  LOYALTY_DASHBOARD_ITEM_COUNT,
} from './loyalty-dashboard.model';
import {
  describeLoyaltyDashboardItem,
  filterLoyaltyDashboard,
  groupLoyaltyDashboardByStatus,
  pickLoyaltyDashboardHighlights,
  sortLoyaltyDashboard,
  totalLoyaltyDashboard,
  loyaltyDashboardStatusTone,
} from './loyalty-dashboard.utils';

describe('loyalty-dashboard utils', () => {
  const items = buildLoyaltyDashboardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(LOYALTY_DASHBOARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      LOYALTY_DASHBOARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalLoyaltyDashboard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupLoyaltyDashboardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterLoyaltyDashboard(items, '')).toHaveLength(items.length);
    expect(
      filterLoyaltyDashboard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterLoyaltyDashboard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortLoyaltyDashboard(items, 'amount', 'asc');
    const desc = sortLoyaltyDashboard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeLoyaltyDashboardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(loyaltyDashboardStatusTone('active')).toBe('success');
    expect(loyaltyDashboardStatusTone('pending')).toBe('warning');
    expect(loyaltyDashboardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickLoyaltyDashboardHighlights(items, 2)).toHaveLength(2);
    expect(pickLoyaltyDashboardHighlights(items, 0)).toHaveLength(0);
  });
});
