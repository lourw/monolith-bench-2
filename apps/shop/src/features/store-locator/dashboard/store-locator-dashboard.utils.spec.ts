import { describe, expect, it } from 'vitest';
import {
  buildStoreLocatorDashboardItems,
  STORE_LOCATOR_DASHBOARD_ITEM_COUNT,
} from './store-locator-dashboard.model';
import {
  describeStoreLocatorDashboardItem,
  filterStoreLocatorDashboard,
  groupStoreLocatorDashboardByStatus,
  pickStoreLocatorDashboardHighlights,
  sortStoreLocatorDashboard,
  totalStoreLocatorDashboard,
  storeLocatorDashboardStatusTone,
} from './store-locator-dashboard.utils';

describe('store-locator-dashboard utils', () => {
  const items = buildStoreLocatorDashboardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(STORE_LOCATOR_DASHBOARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      STORE_LOCATOR_DASHBOARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalStoreLocatorDashboard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupStoreLocatorDashboardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterStoreLocatorDashboard(items, '')).toHaveLength(items.length);
    expect(
      filterStoreLocatorDashboard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(
      filterStoreLocatorDashboard(items, 'no-such-thing-xyz'),
    ).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortStoreLocatorDashboard(items, 'amount', 'asc');
    const desc = sortStoreLocatorDashboard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeStoreLocatorDashboardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(storeLocatorDashboardStatusTone('active')).toBe('success');
    expect(storeLocatorDashboardStatusTone('pending')).toBe('warning');
    expect(storeLocatorDashboardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickStoreLocatorDashboardHighlights(items, 2)).toHaveLength(2);
    expect(pickStoreLocatorDashboardHighlights(items, 0)).toHaveLength(0);
  });
});
