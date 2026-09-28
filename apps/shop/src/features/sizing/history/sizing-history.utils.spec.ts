import { describe, expect, it } from 'vitest';
import {
  buildSizingHistoryItems,
  SIZING_HISTORY_ITEM_COUNT,
} from './sizing-history.model';
import {
  describeSizingHistoryItem,
  filterSizingHistory,
  groupSizingHistoryByStatus,
  pickSizingHistoryHighlights,
  sortSizingHistory,
  totalSizingHistory,
  sizingHistoryStatusTone,
} from './sizing-history.utils';

describe('sizing-history utils', () => {
  const items = buildSizingHistoryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SIZING_HISTORY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SIZING_HISTORY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalSizingHistory(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupSizingHistoryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterSizingHistory(items, '')).toHaveLength(items.length);
    expect(
      filterSizingHistory(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterSizingHistory(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortSizingHistory(items, 'amount', 'asc');
    const desc = sortSizingHistory(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeSizingHistoryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(sizingHistoryStatusTone('active')).toBe('success');
    expect(sizingHistoryStatusTone('pending')).toBe('warning');
    expect(sizingHistoryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickSizingHistoryHighlights(items, 2)).toHaveLength(2);
    expect(pickSizingHistoryHighlights(items, 0)).toHaveLength(0);
  });
});
