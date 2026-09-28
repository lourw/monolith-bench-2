import { describe, expect, it } from 'vitest';
import {
  buildProfileHistoryItems,
  PROFILE_HISTORY_ITEM_COUNT,
} from './profile-history.model';
import {
  describeProfileHistoryItem,
  filterProfileHistory,
  groupProfileHistoryByStatus,
  pickProfileHistoryHighlights,
  sortProfileHistory,
  totalProfileHistory,
  profileHistoryStatusTone,
} from './profile-history.utils';

describe('profile-history utils', () => {
  const items = buildProfileHistoryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(PROFILE_HISTORY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      PROFILE_HISTORY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalProfileHistory(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupProfileHistoryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterProfileHistory(items, '')).toHaveLength(items.length);
    expect(
      filterProfileHistory(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterProfileHistory(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortProfileHistory(items, 'amount', 'asc');
    const desc = sortProfileHistory(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeProfileHistoryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(profileHistoryStatusTone('active')).toBe('success');
    expect(profileHistoryStatusTone('pending')).toBe('warning');
    expect(profileHistoryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickProfileHistoryHighlights(items, 2)).toHaveLength(2);
    expect(pickProfileHistoryHighlights(items, 0)).toHaveLength(0);
  });
});
