import { describe, expect, it } from 'vitest';
import {
  buildPromotionsSettingsItems,
  PROMOTIONS_SETTINGS_ITEM_COUNT,
} from './promotions-settings.model';
import {
  describePromotionsSettingsItem,
  filterPromotionsSettings,
  groupPromotionsSettingsByStatus,
  pickPromotionsSettingsHighlights,
  sortPromotionsSettings,
  totalPromotionsSettings,
  promotionsSettingsStatusTone,
} from './promotions-settings.utils';

describe('promotions-settings utils', () => {
  const items = buildPromotionsSettingsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(PROMOTIONS_SETTINGS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      PROMOTIONS_SETTINGS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalPromotionsSettings(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupPromotionsSettingsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterPromotionsSettings(items, '')).toHaveLength(items.length);
    expect(
      filterPromotionsSettings(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterPromotionsSettings(items, 'no-such-thing-xyz')).toHaveLength(
      0,
    );
  });

  it('sorts by key in both directions', () => {
    const asc = sortPromotionsSettings(items, 'amount', 'asc');
    const desc = sortPromotionsSettings(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describePromotionsSettingsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(promotionsSettingsStatusTone('active')).toBe('success');
    expect(promotionsSettingsStatusTone('pending')).toBe('warning');
    expect(promotionsSettingsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickPromotionsSettingsHighlights(items, 2)).toHaveLength(2);
    expect(pickPromotionsSettingsHighlights(items, 0)).toHaveLength(0);
  });
});
