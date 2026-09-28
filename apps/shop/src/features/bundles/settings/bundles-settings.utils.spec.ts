import { describe, expect, it } from 'vitest';
import {
  buildBundlesSettingsItems,
  BUNDLES_SETTINGS_ITEM_COUNT,
} from './bundles-settings.model';
import {
  describeBundlesSettingsItem,
  filterBundlesSettings,
  groupBundlesSettingsByStatus,
  pickBundlesSettingsHighlights,
  sortBundlesSettings,
  totalBundlesSettings,
  bundlesSettingsStatusTone,
} from './bundles-settings.utils';

describe('bundles-settings utils', () => {
  const items = buildBundlesSettingsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(BUNDLES_SETTINGS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      BUNDLES_SETTINGS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalBundlesSettings(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupBundlesSettingsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterBundlesSettings(items, '')).toHaveLength(items.length);
    expect(
      filterBundlesSettings(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterBundlesSettings(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortBundlesSettings(items, 'amount', 'asc');
    const desc = sortBundlesSettings(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeBundlesSettingsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(bundlesSettingsStatusTone('active')).toBe('success');
    expect(bundlesSettingsStatusTone('pending')).toBe('warning');
    expect(bundlesSettingsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickBundlesSettingsHighlights(items, 2)).toHaveLength(2);
    expect(pickBundlesSettingsHighlights(items, 0)).toHaveLength(0);
  });
});
