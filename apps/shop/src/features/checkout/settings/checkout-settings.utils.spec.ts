import { describe, expect, it } from 'vitest';
import {
  buildCheckoutSettingsItems,
  CHECKOUT_SETTINGS_ITEM_COUNT,
} from './checkout-settings.model';
import {
  describeCheckoutSettingsItem,
  filterCheckoutSettings,
  groupCheckoutSettingsByStatus,
  pickCheckoutSettingsHighlights,
  sortCheckoutSettings,
  totalCheckoutSettings,
  checkoutSettingsStatusTone,
} from './checkout-settings.utils';

describe('checkout-settings utils', () => {
  const items = buildCheckoutSettingsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(CHECKOUT_SETTINGS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      CHECKOUT_SETTINGS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalCheckoutSettings(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupCheckoutSettingsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterCheckoutSettings(items, '')).toHaveLength(items.length);
    expect(
      filterCheckoutSettings(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterCheckoutSettings(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortCheckoutSettings(items, 'amount', 'asc');
    const desc = sortCheckoutSettings(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeCheckoutSettingsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(checkoutSettingsStatusTone('active')).toBe('success');
    expect(checkoutSettingsStatusTone('pending')).toBe('warning');
    expect(checkoutSettingsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickCheckoutSettingsHighlights(items, 2)).toHaveLength(2);
    expect(pickCheckoutSettingsHighlights(items, 0)).toHaveLength(0);
  });
});
