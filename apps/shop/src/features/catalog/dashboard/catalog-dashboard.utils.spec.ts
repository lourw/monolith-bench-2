import { describe, expect, it } from 'vitest';
import {
  buildCatalogDashboardItems,
  CATALOG_DASHBOARD_ITEM_COUNT,
} from './catalog-dashboard.model';
import {
  describeCatalogDashboardItem,
  filterCatalogDashboard,
  groupCatalogDashboardByStatus,
  pickCatalogDashboardHighlights,
  sortCatalogDashboard,
  totalCatalogDashboard,
  catalogDashboardStatusTone,
} from './catalog-dashboard.utils';

describe('catalog-dashboard utils', () => {
  const items = buildCatalogDashboardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(CATALOG_DASHBOARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      CATALOG_DASHBOARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalCatalogDashboard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupCatalogDashboardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterCatalogDashboard(items, '')).toHaveLength(items.length);
    expect(
      filterCatalogDashboard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterCatalogDashboard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortCatalogDashboard(items, 'amount', 'asc');
    const desc = sortCatalogDashboard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeCatalogDashboardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(catalogDashboardStatusTone('active')).toBe('success');
    expect(catalogDashboardStatusTone('pending')).toBe('warning');
    expect(catalogDashboardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickCatalogDashboardHighlights(items, 2)).toHaveLength(2);
    expect(pickCatalogDashboardHighlights(items, 0)).toHaveLength(0);
  });
});
