import { describe, expect, it } from 'vitest';
import {
  buildGiftCardsSettingsItems,
  GIFT_CARDS_SETTINGS_ITEM_COUNT,
} from './gift-cards-settings.model';
import {
  describeGiftCardsSettingsItem,
  filterGiftCardsSettings,
  groupGiftCardsSettingsByStatus,
  pickGiftCardsSettingsHighlights,
  sortGiftCardsSettings,
  totalGiftCardsSettings,
  giftCardsSettingsStatusTone,
} from './gift-cards-settings.utils';

describe('gift-cards-settings utils', () => {
  const items = buildGiftCardsSettingsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(GIFT_CARDS_SETTINGS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      GIFT_CARDS_SETTINGS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalGiftCardsSettings(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupGiftCardsSettingsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterGiftCardsSettings(items, '')).toHaveLength(items.length);
    expect(
      filterGiftCardsSettings(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterGiftCardsSettings(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortGiftCardsSettings(items, 'amount', 'asc');
    const desc = sortGiftCardsSettings(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeGiftCardsSettingsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(giftCardsSettingsStatusTone('active')).toBe('success');
    expect(giftCardsSettingsStatusTone('pending')).toBe('warning');
    expect(giftCardsSettingsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickGiftCardsSettingsHighlights(items, 2)).toHaveLength(2);
    expect(pickGiftCardsSettingsHighlights(items, 0)).toHaveLength(0);
  });
});
