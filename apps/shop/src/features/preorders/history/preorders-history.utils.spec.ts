import { describe, expect, it } from 'vitest';
import {
  buildPreordersHistoryItems,
  PREORDERS_HISTORY_ITEM_COUNT,
} from './preorders-history.model';
import {
  describePreordersHistoryItem,
  filterPreordersHistory,
  groupPreordersHistoryByStatus,
  pickPreordersHistoryHighlights,
  sortPreordersHistory,
  totalPreordersHistory,
  preordersHistoryStatusTone,
} from './preorders-history.utils';

describe('preorders-history utils', () => {
  const items = buildPreordersHistoryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(PREORDERS_HISTORY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      PREORDERS_HISTORY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalPreordersHistory(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupPreordersHistoryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterPreordersHistory(items, '')).toHaveLength(items.length);
    expect(
      filterPreordersHistory(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterPreordersHistory(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortPreordersHistory(items, 'amount', 'asc');
    const desc = sortPreordersHistory(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describePreordersHistoryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(preordersHistoryStatusTone('active')).toBe('success');
    expect(preordersHistoryStatusTone('pending')).toBe('warning');
    expect(preordersHistoryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickPreordersHistoryHighlights(items, 2)).toHaveLength(2);
    expect(pickPreordersHistoryHighlights(items, 0)).toHaveLength(0);
  });
});
