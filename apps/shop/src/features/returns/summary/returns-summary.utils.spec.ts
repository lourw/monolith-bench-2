import { describe, expect, it } from 'vitest';
import {
  buildReturnsSummaryItems,
  RETURNS_SUMMARY_ITEM_COUNT,
} from './returns-summary.model';
import {
  describeReturnsSummaryItem,
  filterReturnsSummary,
  groupReturnsSummaryByStatus,
  pickReturnsSummaryHighlights,
  sortReturnsSummary,
  totalReturnsSummary,
  returnsSummaryStatusTone,
} from './returns-summary.utils';

describe('returns-summary utils', () => {
  const items = buildReturnsSummaryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(RETURNS_SUMMARY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      RETURNS_SUMMARY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalReturnsSummary(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupReturnsSummaryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterReturnsSummary(items, '')).toHaveLength(items.length);
    expect(
      filterReturnsSummary(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterReturnsSummary(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortReturnsSummary(items, 'amount', 'asc');
    const desc = sortReturnsSummary(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeReturnsSummaryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(returnsSummaryStatusTone('active')).toBe('success');
    expect(returnsSummaryStatusTone('pending')).toBe('warning');
    expect(returnsSummaryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickReturnsSummaryHighlights(items, 2)).toHaveLength(2);
    expect(pickReturnsSummaryHighlights(items, 0)).toHaveLength(0);
  });
});
