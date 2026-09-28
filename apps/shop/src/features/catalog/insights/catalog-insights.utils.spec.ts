import { describe, expect, it } from 'vitest';
import {
  buildCatalogInsightsItems,
  CATALOG_INSIGHTS_ITEM_COUNT,
} from './catalog-insights.model';
import {
  describeCatalogInsightsItem,
  filterCatalogInsights,
  groupCatalogInsightsByStatus,
  pickCatalogInsightsHighlights,
  sortCatalogInsights,
  totalCatalogInsights,
  catalogInsightsStatusTone,
} from './catalog-insights.utils';

describe('catalog-insights utils', () => {
  const items = buildCatalogInsightsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(CATALOG_INSIGHTS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      CATALOG_INSIGHTS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalCatalogInsights(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupCatalogInsightsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterCatalogInsights(items, '')).toHaveLength(items.length);
    expect(
      filterCatalogInsights(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterCatalogInsights(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortCatalogInsights(items, 'amount', 'asc');
    const desc = sortCatalogInsights(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeCatalogInsightsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(catalogInsightsStatusTone('active')).toBe('success');
    expect(catalogInsightsStatusTone('pending')).toBe('warning');
    expect(catalogInsightsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickCatalogInsightsHighlights(items, 2)).toHaveLength(2);
    expect(pickCatalogInsightsHighlights(items, 0)).toHaveLength(0);
  });
});
