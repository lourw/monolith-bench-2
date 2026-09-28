import { describe, expect, it } from 'vitest';
import {
  buildLoyaltySettingsItems,
  LOYALTY_SETTINGS_ITEM_COUNT,
} from './loyalty-settings.model';
import {
  describeLoyaltySettingsItem,
  filterLoyaltySettings,
  groupLoyaltySettingsByStatus,
  pickLoyaltySettingsHighlights,
  sortLoyaltySettings,
  totalLoyaltySettings,
  loyaltySettingsStatusTone,
} from './loyalty-settings.utils';

describe('loyalty-settings utils', () => {
  const items = buildLoyaltySettingsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(LOYALTY_SETTINGS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      LOYALTY_SETTINGS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalLoyaltySettings(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupLoyaltySettingsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterLoyaltySettings(items, '')).toHaveLength(items.length);
    expect(
      filterLoyaltySettings(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterLoyaltySettings(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortLoyaltySettings(items, 'amount', 'asc');
    const desc = sortLoyaltySettings(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeLoyaltySettingsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(loyaltySettingsStatusTone('active')).toBe('success');
    expect(loyaltySettingsStatusTone('pending')).toBe('warning');
    expect(loyaltySettingsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickLoyaltySettingsHighlights(items, 2)).toHaveLength(2);
    expect(pickLoyaltySettingsHighlights(items, 0)).toHaveLength(0);
  });
});
