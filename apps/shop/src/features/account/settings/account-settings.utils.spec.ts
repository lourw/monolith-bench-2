import { describe, expect, it } from 'vitest';
import {
  buildAccountSettingsItems,
  ACCOUNT_SETTINGS_ITEM_COUNT,
} from './account-settings.model';
import {
  describeAccountSettingsItem,
  filterAccountSettings,
  groupAccountSettingsByStatus,
  pickAccountSettingsHighlights,
  sortAccountSettings,
  totalAccountSettings,
  accountSettingsStatusTone,
} from './account-settings.utils';

describe('account-settings utils', () => {
  const items = buildAccountSettingsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(ACCOUNT_SETTINGS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      ACCOUNT_SETTINGS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalAccountSettings(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupAccountSettingsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterAccountSettings(items, '')).toHaveLength(items.length);
    expect(
      filterAccountSettings(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterAccountSettings(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortAccountSettings(items, 'amount', 'asc');
    const desc = sortAccountSettings(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeAccountSettingsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(accountSettingsStatusTone('active')).toBe('success');
    expect(accountSettingsStatusTone('pending')).toBe('warning');
    expect(accountSettingsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickAccountSettingsHighlights(items, 2)).toHaveLength(2);
    expect(pickAccountSettingsHighlights(items, 0)).toHaveLength(0);
  });
});
