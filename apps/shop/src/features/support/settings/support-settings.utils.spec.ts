import { describe, expect, it } from 'vitest';
import {
  buildSupportSettingsItems,
  SUPPORT_SETTINGS_ITEM_COUNT,
} from './support-settings.model';
import {
  describeSupportSettingsItem,
  filterSupportSettings,
  groupSupportSettingsByStatus,
  pickSupportSettingsHighlights,
  sortSupportSettings,
  totalSupportSettings,
  supportSettingsStatusTone,
} from './support-settings.utils';

describe('support-settings utils', () => {
  const items = buildSupportSettingsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SUPPORT_SETTINGS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SUPPORT_SETTINGS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalSupportSettings(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupSupportSettingsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterSupportSettings(items, '')).toHaveLength(items.length);
    expect(
      filterSupportSettings(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterSupportSettings(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortSupportSettings(items, 'amount', 'asc');
    const desc = sortSupportSettings(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeSupportSettingsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(supportSettingsStatusTone('active')).toBe('success');
    expect(supportSettingsStatusTone('pending')).toBe('warning');
    expect(supportSettingsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickSupportSettingsHighlights(items, 2)).toHaveLength(2);
    expect(pickSupportSettingsHighlights(items, 0)).toHaveLength(0);
  });
});
