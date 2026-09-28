import { describe, expect, it } from 'vitest';
import {
  buildShippingSettingsItems,
  SHIPPING_SETTINGS_ITEM_COUNT,
} from './shipping-settings.model';
import {
  describeShippingSettingsItem,
  filterShippingSettings,
  groupShippingSettingsByStatus,
  pickShippingSettingsHighlights,
  sortShippingSettings,
  totalShippingSettings,
  shippingSettingsStatusTone,
} from './shipping-settings.utils';

describe('shipping-settings utils', () => {
  const items = buildShippingSettingsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SHIPPING_SETTINGS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SHIPPING_SETTINGS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalShippingSettings(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupShippingSettingsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterShippingSettings(items, '')).toHaveLength(items.length);
    expect(
      filterShippingSettings(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterShippingSettings(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortShippingSettings(items, 'amount', 'asc');
    const desc = sortShippingSettings(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeShippingSettingsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(shippingSettingsStatusTone('active')).toBe('success');
    expect(shippingSettingsStatusTone('pending')).toBe('warning');
    expect(shippingSettingsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickShippingSettingsHighlights(items, 2)).toHaveLength(2);
    expect(pickShippingSettingsHighlights(items, 0)).toHaveLength(0);
  });
});
