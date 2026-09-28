import { describe, expect, it } from 'vitest';
import {
  buildInventoryDashboardItems,
  INVENTORY_DASHBOARD_ITEM_COUNT,
} from './inventory-dashboard.model';
import {
  describeInventoryDashboardItem,
  filterInventoryDashboard,
  groupInventoryDashboardByStatus,
  pickInventoryDashboardHighlights,
  sortInventoryDashboard,
  totalInventoryDashboard,
  inventoryDashboardStatusTone,
} from './inventory-dashboard.utils';

describe('inventory-dashboard utils', () => {
  const items = buildInventoryDashboardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(INVENTORY_DASHBOARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      INVENTORY_DASHBOARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalInventoryDashboard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupInventoryDashboardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterInventoryDashboard(items, '')).toHaveLength(items.length);
    expect(
      filterInventoryDashboard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterInventoryDashboard(items, 'no-such-thing-xyz')).toHaveLength(
      0,
    );
  });

  it('sorts by key in both directions', () => {
    const asc = sortInventoryDashboard(items, 'amount', 'asc');
    const desc = sortInventoryDashboard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeInventoryDashboardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(inventoryDashboardStatusTone('active')).toBe('success');
    expect(inventoryDashboardStatusTone('pending')).toBe('warning');
    expect(inventoryDashboardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickInventoryDashboardHighlights(items, 2)).toHaveLength(2);
    expect(pickInventoryDashboardHighlights(items, 0)).toHaveLength(0);
  });
});
