import { describe, expect, it } from 'vitest';
import {
  buildAddressesSettingsItems,
  ADDRESSES_SETTINGS_ITEM_COUNT,
} from './addresses-settings.model';
import {
  describeAddressesSettingsItem,
  filterAddressesSettings,
  groupAddressesSettingsByStatus,
  pickAddressesSettingsHighlights,
  sortAddressesSettings,
  totalAddressesSettings,
  addressesSettingsStatusTone,
} from './addresses-settings.utils';

describe('addresses-settings utils', () => {
  const items = buildAddressesSettingsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(ADDRESSES_SETTINGS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      ADDRESSES_SETTINGS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalAddressesSettings(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupAddressesSettingsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterAddressesSettings(items, '')).toHaveLength(items.length);
    expect(
      filterAddressesSettings(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterAddressesSettings(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortAddressesSettings(items, 'amount', 'asc');
    const desc = sortAddressesSettings(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeAddressesSettingsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(addressesSettingsStatusTone('active')).toBe('success');
    expect(addressesSettingsStatusTone('pending')).toBe('warning');
    expect(addressesSettingsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickAddressesSettingsHighlights(items, 2)).toHaveLength(2);
    expect(pickAddressesSettingsHighlights(items, 0)).toHaveLength(0);
  });
});
