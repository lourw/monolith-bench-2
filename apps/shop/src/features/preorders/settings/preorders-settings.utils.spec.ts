import { describe, expect, it } from 'vitest';
import {
  buildPreordersSettingsItems,
  PREORDERS_SETTINGS_ITEM_COUNT,
} from './preorders-settings.model';
import {
  describePreordersSettingsItem,
  filterPreordersSettings,
  groupPreordersSettingsByStatus,
  pickPreordersSettingsHighlights,
  sortPreordersSettings,
  totalPreordersSettings,
  preordersSettingsStatusTone,
} from './preorders-settings.utils';

describe('preorders-settings utils', () => {
  const items = buildPreordersSettingsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(PREORDERS_SETTINGS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      PREORDERS_SETTINGS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalPreordersSettings(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupPreordersSettingsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterPreordersSettings(items, '')).toHaveLength(items.length);
    expect(
      filterPreordersSettings(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterPreordersSettings(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortPreordersSettings(items, 'amount', 'asc');
    const desc = sortPreordersSettings(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describePreordersSettingsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(preordersSettingsStatusTone('active')).toBe('success');
    expect(preordersSettingsStatusTone('pending')).toBe('warning');
    expect(preordersSettingsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickPreordersSettingsHighlights(items, 2)).toHaveLength(2);
    expect(pickPreordersSettingsHighlights(items, 0)).toHaveLength(0);
  });
});
