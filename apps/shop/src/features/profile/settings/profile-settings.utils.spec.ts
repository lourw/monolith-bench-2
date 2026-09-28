import { describe, expect, it } from 'vitest';
import {
  buildProfileSettingsItems,
  PROFILE_SETTINGS_ITEM_COUNT,
} from './profile-settings.model';
import {
  describeProfileSettingsItem,
  filterProfileSettings,
  groupProfileSettingsByStatus,
  pickProfileSettingsHighlights,
  sortProfileSettings,
  totalProfileSettings,
  profileSettingsStatusTone,
} from './profile-settings.utils';

describe('profile-settings utils', () => {
  const items = buildProfileSettingsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(PROFILE_SETTINGS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      PROFILE_SETTINGS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalProfileSettings(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupProfileSettingsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterProfileSettings(items, '')).toHaveLength(items.length);
    expect(
      filterProfileSettings(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterProfileSettings(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortProfileSettings(items, 'amount', 'asc');
    const desc = sortProfileSettings(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeProfileSettingsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(profileSettingsStatusTone('active')).toBe('success');
    expect(profileSettingsStatusTone('pending')).toBe('warning');
    expect(profileSettingsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickProfileSettingsHighlights(items, 2)).toHaveLength(2);
    expect(pickProfileSettingsHighlights(items, 0)).toHaveLength(0);
  });
});
