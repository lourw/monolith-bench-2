import { describe, expect, it } from 'vitest';
import {
  buildProfileDashboardItems,
  PROFILE_DASHBOARD_ITEM_COUNT,
} from './profile-dashboard.model';
import {
  describeProfileDashboardItem,
  filterProfileDashboard,
  groupProfileDashboardByStatus,
  pickProfileDashboardHighlights,
  sortProfileDashboard,
  totalProfileDashboard,
  profileDashboardStatusTone,
} from './profile-dashboard.utils';

describe('profile-dashboard utils', () => {
  const items = buildProfileDashboardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(PROFILE_DASHBOARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      PROFILE_DASHBOARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalProfileDashboard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupProfileDashboardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterProfileDashboard(items, '')).toHaveLength(items.length);
    expect(
      filterProfileDashboard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterProfileDashboard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortProfileDashboard(items, 'amount', 'asc');
    const desc = sortProfileDashboard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeProfileDashboardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(profileDashboardStatusTone('active')).toBe('success');
    expect(profileDashboardStatusTone('pending')).toBe('warning');
    expect(profileDashboardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickProfileDashboardHighlights(items, 2)).toHaveLength(2);
    expect(pickProfileDashboardHighlights(items, 0)).toHaveLength(0);
  });
});
