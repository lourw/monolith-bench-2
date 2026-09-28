import { describe, expect, it } from 'vitest';
import {
  buildBundlesDashboardItems,
  BUNDLES_DASHBOARD_ITEM_COUNT,
} from './bundles-dashboard.model';
import {
  describeBundlesDashboardItem,
  filterBundlesDashboard,
  groupBundlesDashboardByStatus,
  pickBundlesDashboardHighlights,
  sortBundlesDashboard,
  totalBundlesDashboard,
  bundlesDashboardStatusTone,
} from './bundles-dashboard.utils';

describe('bundles-dashboard utils', () => {
  const items = buildBundlesDashboardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(BUNDLES_DASHBOARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      BUNDLES_DASHBOARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalBundlesDashboard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupBundlesDashboardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterBundlesDashboard(items, '')).toHaveLength(items.length);
    expect(
      filterBundlesDashboard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterBundlesDashboard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortBundlesDashboard(items, 'amount', 'asc');
    const desc = sortBundlesDashboard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeBundlesDashboardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(bundlesDashboardStatusTone('active')).toBe('success');
    expect(bundlesDashboardStatusTone('pending')).toBe('warning');
    expect(bundlesDashboardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickBundlesDashboardHighlights(items, 2)).toHaveLength(2);
    expect(pickBundlesDashboardHighlights(items, 0)).toHaveLength(0);
  });
});
