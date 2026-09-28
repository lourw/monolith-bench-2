import { describe, expect, it } from 'vitest';
import {
  buildOrdersSettingsItems,
  ORDERS_SETTINGS_ITEM_COUNT,
} from './orders-settings.model';
import {
  describeOrdersSettingsItem,
  filterOrdersSettings,
  groupOrdersSettingsByStatus,
  pickOrdersSettingsHighlights,
  sortOrdersSettings,
  totalOrdersSettings,
  ordersSettingsStatusTone,
} from './orders-settings.utils';

describe('orders-settings utils', () => {
  const items = buildOrdersSettingsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(ORDERS_SETTINGS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      ORDERS_SETTINGS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalOrdersSettings(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupOrdersSettingsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterOrdersSettings(items, '')).toHaveLength(items.length);
    expect(
      filterOrdersSettings(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterOrdersSettings(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortOrdersSettings(items, 'amount', 'asc');
    const desc = sortOrdersSettings(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeOrdersSettingsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(ordersSettingsStatusTone('active')).toBe('success');
    expect(ordersSettingsStatusTone('pending')).toBe('warning');
    expect(ordersSettingsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickOrdersSettingsHighlights(items, 2)).toHaveLength(2);
    expect(pickOrdersSettingsHighlights(items, 0)).toHaveLength(0);
  });
});
