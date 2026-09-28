import { describe, expect, it } from 'vitest';
import {
  buildWishlistSettingsItems,
  WISHLIST_SETTINGS_ITEM_COUNT,
} from './wishlist-settings.model';
import {
  describeWishlistSettingsItem,
  filterWishlistSettings,
  groupWishlistSettingsByStatus,
  pickWishlistSettingsHighlights,
  sortWishlistSettings,
  totalWishlistSettings,
  wishlistSettingsStatusTone,
} from './wishlist-settings.utils';

describe('wishlist-settings utils', () => {
  const items = buildWishlistSettingsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(WISHLIST_SETTINGS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      WISHLIST_SETTINGS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalWishlistSettings(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupWishlistSettingsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterWishlistSettings(items, '')).toHaveLength(items.length);
    expect(
      filterWishlistSettings(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterWishlistSettings(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortWishlistSettings(items, 'amount', 'asc');
    const desc = sortWishlistSettings(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeWishlistSettingsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(wishlistSettingsStatusTone('active')).toBe('success');
    expect(wishlistSettingsStatusTone('pending')).toBe('warning');
    expect(wishlistSettingsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickWishlistSettingsHighlights(items, 2)).toHaveLength(2);
    expect(pickWishlistSettingsHighlights(items, 0)).toHaveLength(0);
  });
});
