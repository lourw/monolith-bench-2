import { describe, expect, it } from 'vitest';
import {
  buildSubscriptionsSettingsItems,
  SUBSCRIPTIONS_SETTINGS_ITEM_COUNT,
} from './subscriptions-settings.model';
import {
  describeSubscriptionsSettingsItem,
  filterSubscriptionsSettings,
  groupSubscriptionsSettingsByStatus,
  pickSubscriptionsSettingsHighlights,
  sortSubscriptionsSettings,
  totalSubscriptionsSettings,
  subscriptionsSettingsStatusTone,
} from './subscriptions-settings.utils';

describe('subscriptions-settings utils', () => {
  const items = buildSubscriptionsSettingsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SUBSCRIPTIONS_SETTINGS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SUBSCRIPTIONS_SETTINGS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalSubscriptionsSettings(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupSubscriptionsSettingsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterSubscriptionsSettings(items, '')).toHaveLength(items.length);
    expect(
      filterSubscriptionsSettings(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(
      filterSubscriptionsSettings(items, 'no-such-thing-xyz'),
    ).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortSubscriptionsSettings(items, 'amount', 'asc');
    const desc = sortSubscriptionsSettings(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeSubscriptionsSettingsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(subscriptionsSettingsStatusTone('active')).toBe('success');
    expect(subscriptionsSettingsStatusTone('pending')).toBe('warning');
    expect(subscriptionsSettingsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickSubscriptionsSettingsHighlights(items, 2)).toHaveLength(2);
    expect(pickSubscriptionsSettingsHighlights(items, 0)).toHaveLength(0);
  });
});
