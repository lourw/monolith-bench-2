import { describe, expect, it } from 'vitest';
import {
  buildSizingSummaryItems,
  SIZING_SUMMARY_ITEM_COUNT,
} from './sizing-summary.model';
import {
  describeSizingSummaryItem,
  filterSizingSummary,
  groupSizingSummaryByStatus,
  pickSizingSummaryHighlights,
  sortSizingSummary,
  totalSizingSummary,
  sizingSummaryStatusTone,
} from './sizing-summary.utils';

describe('sizing-summary utils', () => {
  const items = buildSizingSummaryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SIZING_SUMMARY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SIZING_SUMMARY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalSizingSummary(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupSizingSummaryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterSizingSummary(items, '')).toHaveLength(items.length);
    expect(
      filterSizingSummary(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterSizingSummary(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortSizingSummary(items, 'amount', 'asc');
    const desc = sortSizingSummary(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeSizingSummaryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(sizingSummaryStatusTone('active')).toBe('success');
    expect(sizingSummaryStatusTone('pending')).toBe('warning');
    expect(sizingSummaryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickSizingSummaryHighlights(items, 2)).toHaveLength(2);
    expect(pickSizingSummaryHighlights(items, 0)).toHaveLength(0);
  });
});
