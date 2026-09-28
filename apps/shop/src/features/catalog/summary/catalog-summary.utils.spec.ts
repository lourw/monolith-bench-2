import { describe, expect, it } from 'vitest';
import {
  buildCatalogSummaryItems,
  CATALOG_SUMMARY_ITEM_COUNT,
} from './catalog-summary.model';
import {
  describeCatalogSummaryItem,
  filterCatalogSummary,
  groupCatalogSummaryByStatus,
  pickCatalogSummaryHighlights,
  sortCatalogSummary,
  totalCatalogSummary,
  catalogSummaryStatusTone,
} from './catalog-summary.utils';

describe('catalog-summary utils', () => {
  const items = buildCatalogSummaryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(CATALOG_SUMMARY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      CATALOG_SUMMARY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalCatalogSummary(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupCatalogSummaryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterCatalogSummary(items, '')).toHaveLength(items.length);
    expect(
      filterCatalogSummary(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterCatalogSummary(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortCatalogSummary(items, 'amount', 'asc');
    const desc = sortCatalogSummary(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeCatalogSummaryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(catalogSummaryStatusTone('active')).toBe('success');
    expect(catalogSummaryStatusTone('pending')).toBe('warning');
    expect(catalogSummaryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickCatalogSummaryHighlights(items, 2)).toHaveLength(2);
    expect(pickCatalogSummaryHighlights(items, 0)).toHaveLength(0);
  });
});
