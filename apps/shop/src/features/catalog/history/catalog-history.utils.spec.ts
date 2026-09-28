import { describe, expect, it } from 'vitest';
import {
  buildCatalogHistoryItems,
  CATALOG_HISTORY_ITEM_COUNT,
} from './catalog-history.model';
import {
  describeCatalogHistoryItem,
  filterCatalogHistory,
  groupCatalogHistoryByStatus,
  pickCatalogHistoryHighlights,
  sortCatalogHistory,
  totalCatalogHistory,
  catalogHistoryStatusTone,
} from './catalog-history.utils';

describe('catalog-history utils', () => {
  const items = buildCatalogHistoryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(CATALOG_HISTORY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      CATALOG_HISTORY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalCatalogHistory(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupCatalogHistoryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterCatalogHistory(items, '')).toHaveLength(items.length);
    expect(
      filterCatalogHistory(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterCatalogHistory(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortCatalogHistory(items, 'amount', 'asc');
    const desc = sortCatalogHistory(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeCatalogHistoryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(catalogHistoryStatusTone('active')).toBe('success');
    expect(catalogHistoryStatusTone('pending')).toBe('warning');
    expect(catalogHistoryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickCatalogHistoryHighlights(items, 2)).toHaveLength(2);
    expect(pickCatalogHistoryHighlights(items, 0)).toHaveLength(0);
  });
});
