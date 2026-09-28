import { describe, expect, it } from 'vitest';
import {
  buildCatalogDetailsItems,
  CATALOG_DETAILS_ITEM_COUNT,
} from './catalog-details.model';
import {
  describeCatalogDetailsItem,
  filterCatalogDetails,
  groupCatalogDetailsByStatus,
  pickCatalogDetailsHighlights,
  sortCatalogDetails,
  totalCatalogDetails,
  catalogDetailsStatusTone,
} from './catalog-details.utils';

describe('catalog-details utils', () => {
  const items = buildCatalogDetailsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(CATALOG_DETAILS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      CATALOG_DETAILS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalCatalogDetails(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupCatalogDetailsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterCatalogDetails(items, '')).toHaveLength(items.length);
    expect(
      filterCatalogDetails(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterCatalogDetails(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortCatalogDetails(items, 'amount', 'asc');
    const desc = sortCatalogDetails(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeCatalogDetailsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(catalogDetailsStatusTone('active')).toBe('success');
    expect(catalogDetailsStatusTone('pending')).toBe('warning');
    expect(catalogDetailsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickCatalogDetailsHighlights(items, 2)).toHaveLength(2);
    expect(pickCatalogDetailsHighlights(items, 0)).toHaveLength(0);
  });
});
