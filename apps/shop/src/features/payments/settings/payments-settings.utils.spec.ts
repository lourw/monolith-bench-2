import { describe, expect, it } from 'vitest';
import {
  buildPaymentsSettingsItems,
  PAYMENTS_SETTINGS_ITEM_COUNT,
} from './payments-settings.model';
import {
  describePaymentsSettingsItem,
  filterPaymentsSettings,
  groupPaymentsSettingsByStatus,
  pickPaymentsSettingsHighlights,
  sortPaymentsSettings,
  totalPaymentsSettings,
  paymentsSettingsStatusTone,
} from './payments-settings.utils';

describe('payments-settings utils', () => {
  const items = buildPaymentsSettingsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(PAYMENTS_SETTINGS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      PAYMENTS_SETTINGS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalPaymentsSettings(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupPaymentsSettingsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterPaymentsSettings(items, '')).toHaveLength(items.length);
    expect(
      filterPaymentsSettings(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterPaymentsSettings(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortPaymentsSettings(items, 'amount', 'asc');
    const desc = sortPaymentsSettings(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describePaymentsSettingsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(paymentsSettingsStatusTone('active')).toBe('success');
    expect(paymentsSettingsStatusTone('pending')).toBe('warning');
    expect(paymentsSettingsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickPaymentsSettingsHighlights(items, 2)).toHaveLength(2);
    expect(pickPaymentsSettingsHighlights(items, 0)).toHaveLength(0);
  });
});
