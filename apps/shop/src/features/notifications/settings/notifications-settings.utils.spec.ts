import { describe, expect, it } from 'vitest';
import {
  buildNotificationsSettingsItems,
  NOTIFICATIONS_SETTINGS_ITEM_COUNT,
} from './notifications-settings.model';
import {
  describeNotificationsSettingsItem,
  filterNotificationsSettings,
  groupNotificationsSettingsByStatus,
  pickNotificationsSettingsHighlights,
  sortNotificationsSettings,
  totalNotificationsSettings,
  notificationsSettingsStatusTone,
} from './notifications-settings.utils';

describe('notifications-settings utils', () => {
  const items = buildNotificationsSettingsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(NOTIFICATIONS_SETTINGS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      NOTIFICATIONS_SETTINGS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalNotificationsSettings(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupNotificationsSettingsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterNotificationsSettings(items, '')).toHaveLength(items.length);
    expect(
      filterNotificationsSettings(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(
      filterNotificationsSettings(items, 'no-such-thing-xyz'),
    ).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortNotificationsSettings(items, 'amount', 'asc');
    const desc = sortNotificationsSettings(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeNotificationsSettingsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(notificationsSettingsStatusTone('active')).toBe('success');
    expect(notificationsSettingsStatusTone('pending')).toBe('warning');
    expect(notificationsSettingsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickNotificationsSettingsHighlights(items, 2)).toHaveLength(2);
    expect(pickNotificationsSettingsHighlights(items, 0)).toHaveLength(0);
  });
});
