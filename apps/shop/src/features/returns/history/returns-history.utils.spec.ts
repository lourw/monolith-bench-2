import { describe, expect, it } from 'vitest';
import {
  buildReturnsHistoryItems,
  RETURNS_HISTORY_ITEM_COUNT,
} from './returns-history.model';
import {
  describeReturnsHistoryItem,
  filterReturnsHistory,
  groupReturnsHistoryByStatus,
  pickReturnsHistoryHighlights,
  sortReturnsHistory,
  totalReturnsHistory,
  returnsHistoryStatusTone,
} from './returns-history.utils';

describe('returns-history utils', () => {
  const items = buildReturnsHistoryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(RETURNS_HISTORY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      RETURNS_HISTORY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalReturnsHistory(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupReturnsHistoryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterReturnsHistory(items, '')).toHaveLength(items.length);
    expect(
      filterReturnsHistory(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterReturnsHistory(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortReturnsHistory(items, 'amount', 'asc');
    const desc = sortReturnsHistory(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeReturnsHistoryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(returnsHistoryStatusTone('active')).toBe('success');
    expect(returnsHistoryStatusTone('pending')).toBe('warning');
    expect(returnsHistoryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickReturnsHistoryHighlights(items, 2)).toHaveLength(2);
    expect(pickReturnsHistoryHighlights(items, 0)).toHaveLength(0);
  });
});
