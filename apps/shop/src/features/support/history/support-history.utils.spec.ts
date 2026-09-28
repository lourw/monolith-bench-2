import { describe, expect, it } from 'vitest';
import {
  buildSupportHistoryItems,
  SUPPORT_HISTORY_ITEM_COUNT,
} from './support-history.model';
import {
  describeSupportHistoryItem,
  filterSupportHistory,
  groupSupportHistoryByStatus,
  pickSupportHistoryHighlights,
  sortSupportHistory,
  totalSupportHistory,
  supportHistoryStatusTone,
} from './support-history.utils';

describe('support-history utils', () => {
  const items = buildSupportHistoryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SUPPORT_HISTORY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SUPPORT_HISTORY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalSupportHistory(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupSupportHistoryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterSupportHistory(items, '')).toHaveLength(items.length);
    expect(
      filterSupportHistory(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterSupportHistory(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortSupportHistory(items, 'amount', 'asc');
    const desc = sortSupportHistory(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeSupportHistoryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(supportHistoryStatusTone('active')).toBe('success');
    expect(supportHistoryStatusTone('pending')).toBe('warning');
    expect(supportHistoryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickSupportHistoryHighlights(items, 2)).toHaveLength(2);
    expect(pickSupportHistoryHighlights(items, 0)).toHaveLength(0);
  });
});
