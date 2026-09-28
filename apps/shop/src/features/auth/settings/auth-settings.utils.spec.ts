import { describe, expect, it } from 'vitest';
import {
  buildAuthSettingsItems,
  AUTH_SETTINGS_ITEM_COUNT,
} from './auth-settings.model';
import {
  describeAuthSettingsItem,
  filterAuthSettings,
  groupAuthSettingsByStatus,
  pickAuthSettingsHighlights,
  sortAuthSettings,
  totalAuthSettings,
  authSettingsStatusTone,
} from './auth-settings.utils';

describe('auth-settings utils', () => {
  const items = buildAuthSettingsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(AUTH_SETTINGS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      AUTH_SETTINGS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalAuthSettings(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupAuthSettingsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterAuthSettings(items, '')).toHaveLength(items.length);
    expect(
      filterAuthSettings(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterAuthSettings(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortAuthSettings(items, 'amount', 'asc');
    const desc = sortAuthSettings(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeAuthSettingsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(authSettingsStatusTone('active')).toBe('success');
    expect(authSettingsStatusTone('pending')).toBe('warning');
    expect(authSettingsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickAuthSettingsHighlights(items, 2)).toHaveLength(2);
    expect(pickAuthSettingsHighlights(items, 0)).toHaveLength(0);
  });
});
