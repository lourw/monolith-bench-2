import { describe, expect, it } from 'vitest';
import {
  buildCatalogSettingsItems,
  CATALOG_SETTINGS_ITEM_COUNT,
} from './catalog-settings.model';
import {
  describeCatalogSettingsItem,
  filterCatalogSettings,
  groupCatalogSettingsByStatus,
  pickCatalogSettingsHighlights,
  sortCatalogSettings,
  totalCatalogSettings,
  catalogSettingsStatusTone,
} from './catalog-settings.utils';

describe('catalog-settings utils', () => {
  const items = buildCatalogSettingsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(CATALOG_SETTINGS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      CATALOG_SETTINGS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalCatalogSettings(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupCatalogSettingsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterCatalogSettings(items, '')).toHaveLength(items.length);
    expect(
      filterCatalogSettings(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterCatalogSettings(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortCatalogSettings(items, 'amount', 'asc');
    const desc = sortCatalogSettings(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeCatalogSettingsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(catalogSettingsStatusTone('active')).toBe('success');
    expect(catalogSettingsStatusTone('pending')).toBe('warning');
    expect(catalogSettingsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickCatalogSettingsHighlights(items, 2)).toHaveLength(2);
    expect(pickCatalogSettingsHighlights(items, 0)).toHaveLength(0);
  });
});
