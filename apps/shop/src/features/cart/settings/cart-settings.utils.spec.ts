import { describe, expect, it } from 'vitest';
import {
  buildCartSettingsItems,
  CART_SETTINGS_ITEM_COUNT,
} from './cart-settings.model';
import {
  describeCartSettingsItem,
  filterCartSettings,
  groupCartSettingsByStatus,
  pickCartSettingsHighlights,
  sortCartSettings,
  totalCartSettings,
  cartSettingsStatusTone,
} from './cart-settings.utils';

describe('cart-settings utils', () => {
  const items = buildCartSettingsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(CART_SETTINGS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      CART_SETTINGS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalCartSettings(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupCartSettingsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterCartSettings(items, '')).toHaveLength(items.length);
    expect(
      filterCartSettings(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterCartSettings(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortCartSettings(items, 'amount', 'asc');
    const desc = sortCartSettings(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeCartSettingsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(cartSettingsStatusTone('active')).toBe('success');
    expect(cartSettingsStatusTone('pending')).toBe('warning');
    expect(cartSettingsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickCartSettingsHighlights(items, 2)).toHaveLength(2);
    expect(pickCartSettingsHighlights(items, 0)).toHaveLength(0);
  });
});
