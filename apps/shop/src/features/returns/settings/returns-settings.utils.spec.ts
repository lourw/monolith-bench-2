import { describe, expect, it } from 'vitest';
import {
  buildReturnsSettingsItems,
  RETURNS_SETTINGS_ITEM_COUNT,
} from './returns-settings.model';
import {
  describeReturnsSettingsItem,
  filterReturnsSettings,
  groupReturnsSettingsByStatus,
  pickReturnsSettingsHighlights,
  sortReturnsSettings,
  totalReturnsSettings,
  returnsSettingsStatusTone,
} from './returns-settings.utils';

describe('returns-settings utils', () => {
  const items = buildReturnsSettingsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(RETURNS_SETTINGS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      RETURNS_SETTINGS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalReturnsSettings(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupReturnsSettingsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterReturnsSettings(items, '')).toHaveLength(items.length);
    expect(
      filterReturnsSettings(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterReturnsSettings(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortReturnsSettings(items, 'amount', 'asc');
    const desc = sortReturnsSettings(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeReturnsSettingsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(returnsSettingsStatusTone('active')).toBe('success');
    expect(returnsSettingsStatusTone('pending')).toBe('warning');
    expect(returnsSettingsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickReturnsSettingsHighlights(items, 2)).toHaveLength(2);
    expect(pickReturnsSettingsHighlights(items, 0)).toHaveLength(0);
  });
});
