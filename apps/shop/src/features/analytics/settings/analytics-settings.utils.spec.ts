import { describe, expect, it } from 'vitest';
import {
  buildAnalyticsSettingsItems,
  ANALYTICS_SETTINGS_ITEM_COUNT,
} from './analytics-settings.model';
import {
  describeAnalyticsSettingsItem,
  filterAnalyticsSettings,
  groupAnalyticsSettingsByStatus,
  pickAnalyticsSettingsHighlights,
  sortAnalyticsSettings,
  totalAnalyticsSettings,
  analyticsSettingsStatusTone,
} from './analytics-settings.utils';

describe('analytics-settings utils', () => {
  const items = buildAnalyticsSettingsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(ANALYTICS_SETTINGS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      ANALYTICS_SETTINGS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalAnalyticsSettings(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupAnalyticsSettingsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterAnalyticsSettings(items, '')).toHaveLength(items.length);
    expect(
      filterAnalyticsSettings(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterAnalyticsSettings(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortAnalyticsSettings(items, 'amount', 'asc');
    const desc = sortAnalyticsSettings(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeAnalyticsSettingsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(analyticsSettingsStatusTone('active')).toBe('success');
    expect(analyticsSettingsStatusTone('pending')).toBe('warning');
    expect(analyticsSettingsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickAnalyticsSettingsHighlights(items, 2)).toHaveLength(2);
    expect(pickAnalyticsSettingsHighlights(items, 0)).toHaveLength(0);
  });
});
