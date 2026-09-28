import { describe, expect, it } from 'vitest';
import {
  buildStoreLocatorSettingsItems,
  STORE_LOCATOR_SETTINGS_ITEM_COUNT,
} from './store-locator-settings.model';
import {
  describeStoreLocatorSettingsItem,
  filterStoreLocatorSettings,
  groupStoreLocatorSettingsByStatus,
  pickStoreLocatorSettingsHighlights,
  sortStoreLocatorSettings,
  totalStoreLocatorSettings,
  storeLocatorSettingsStatusTone,
} from './store-locator-settings.utils';

describe('store-locator-settings utils', () => {
  const items = buildStoreLocatorSettingsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(STORE_LOCATOR_SETTINGS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      STORE_LOCATOR_SETTINGS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalStoreLocatorSettings(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupStoreLocatorSettingsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterStoreLocatorSettings(items, '')).toHaveLength(items.length);
    expect(
      filterStoreLocatorSettings(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterStoreLocatorSettings(items, 'no-such-thing-xyz')).toHaveLength(
      0,
    );
  });

  it('sorts by key in both directions', () => {
    const asc = sortStoreLocatorSettings(items, 'amount', 'asc');
    const desc = sortStoreLocatorSettings(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeStoreLocatorSettingsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(storeLocatorSettingsStatusTone('active')).toBe('success');
    expect(storeLocatorSettingsStatusTone('pending')).toBe('warning');
    expect(storeLocatorSettingsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickStoreLocatorSettingsHighlights(items, 2)).toHaveLength(2);
    expect(pickStoreLocatorSettingsHighlights(items, 0)).toHaveLength(0);
  });
});
