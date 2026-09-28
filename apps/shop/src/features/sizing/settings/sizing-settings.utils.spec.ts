import { describe, expect, it } from 'vitest';
import {
  buildSizingSettingsItems,
  SIZING_SETTINGS_ITEM_COUNT,
} from './sizing-settings.model';
import {
  describeSizingSettingsItem,
  filterSizingSettings,
  groupSizingSettingsByStatus,
  pickSizingSettingsHighlights,
  sortSizingSettings,
  totalSizingSettings,
  sizingSettingsStatusTone,
} from './sizing-settings.utils';

describe('sizing-settings utils', () => {
  const items = buildSizingSettingsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SIZING_SETTINGS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SIZING_SETTINGS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalSizingSettings(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupSizingSettingsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterSizingSettings(items, '')).toHaveLength(items.length);
    expect(
      filterSizingSettings(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterSizingSettings(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortSizingSettings(items, 'amount', 'asc');
    const desc = sortSizingSettings(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeSizingSettingsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(sizingSettingsStatusTone('active')).toBe('success');
    expect(sizingSettingsStatusTone('pending')).toBe('warning');
    expect(sizingSettingsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickSizingSettingsHighlights(items, 2)).toHaveLength(2);
    expect(pickSizingSettingsHighlights(items, 0)).toHaveLength(0);
  });
});
