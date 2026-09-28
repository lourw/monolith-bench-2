import { describe, expect, it } from 'vitest';
import {
  buildInventorySettingsItems,
  INVENTORY_SETTINGS_ITEM_COUNT,
} from './inventory-settings.model';
import {
  describeInventorySettingsItem,
  filterInventorySettings,
  groupInventorySettingsByStatus,
  pickInventorySettingsHighlights,
  sortInventorySettings,
  totalInventorySettings,
  inventorySettingsStatusTone,
} from './inventory-settings.utils';

describe('inventory-settings utils', () => {
  const items = buildInventorySettingsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(INVENTORY_SETTINGS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      INVENTORY_SETTINGS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalInventorySettings(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupInventorySettingsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterInventorySettings(items, '')).toHaveLength(items.length);
    expect(
      filterInventorySettings(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterInventorySettings(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortInventorySettings(items, 'amount', 'asc');
    const desc = sortInventorySettings(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeInventorySettingsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(inventorySettingsStatusTone('active')).toBe('success');
    expect(inventorySettingsStatusTone('pending')).toBe('warning');
    expect(inventorySettingsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickInventorySettingsHighlights(items, 2)).toHaveLength(2);
    expect(pickInventorySettingsHighlights(items, 0)).toHaveLength(0);
  });
});
