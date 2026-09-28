import { describe, expect, it } from 'vitest';
import {
  buildCompareSettingsItems,
  COMPARE_SETTINGS_ITEM_COUNT,
} from './compare-settings.model';
import {
  describeCompareSettingsItem,
  filterCompareSettings,
  groupCompareSettingsByStatus,
  pickCompareSettingsHighlights,
  sortCompareSettings,
  totalCompareSettings,
  compareSettingsStatusTone,
} from './compare-settings.utils';

describe('compare-settings utils', () => {
  const items = buildCompareSettingsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(COMPARE_SETTINGS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      COMPARE_SETTINGS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalCompareSettings(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupCompareSettingsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterCompareSettings(items, '')).toHaveLength(items.length);
    expect(
      filterCompareSettings(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterCompareSettings(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortCompareSettings(items, 'amount', 'asc');
    const desc = sortCompareSettings(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeCompareSettingsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(compareSettingsStatusTone('active')).toBe('success');
    expect(compareSettingsStatusTone('pending')).toBe('warning');
    expect(compareSettingsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickCompareSettingsHighlights(items, 2)).toHaveLength(2);
    expect(pickCompareSettingsHighlights(items, 0)).toHaveLength(0);
  });
});
