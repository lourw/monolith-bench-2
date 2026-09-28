import { describe, expect, it } from 'vitest';
import {
  buildTrackingSettingsItems,
  TRACKING_SETTINGS_ITEM_COUNT,
} from './tracking-settings.model';
import {
  describeTrackingSettingsItem,
  filterTrackingSettings,
  groupTrackingSettingsByStatus,
  pickTrackingSettingsHighlights,
  sortTrackingSettings,
  totalTrackingSettings,
  trackingSettingsStatusTone,
} from './tracking-settings.utils';

describe('tracking-settings utils', () => {
  const items = buildTrackingSettingsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(TRACKING_SETTINGS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      TRACKING_SETTINGS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalTrackingSettings(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupTrackingSettingsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterTrackingSettings(items, '')).toHaveLength(items.length);
    expect(
      filterTrackingSettings(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterTrackingSettings(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortTrackingSettings(items, 'amount', 'asc');
    const desc = sortTrackingSettings(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeTrackingSettingsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(trackingSettingsStatusTone('active')).toBe('success');
    expect(trackingSettingsStatusTone('pending')).toBe('warning');
    expect(trackingSettingsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickTrackingSettingsHighlights(items, 2)).toHaveLength(2);
    expect(pickTrackingSettingsHighlights(items, 0)).toHaveLength(0);
  });
});
