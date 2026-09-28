import { describe, expect, it } from 'vitest';
import {
  buildLoyaltySummaryItems,
  LOYALTY_SUMMARY_ITEM_COUNT,
} from './loyalty-summary.model';
import {
  describeLoyaltySummaryItem,
  filterLoyaltySummary,
  groupLoyaltySummaryByStatus,
  pickLoyaltySummaryHighlights,
  sortLoyaltySummary,
  totalLoyaltySummary,
  loyaltySummaryStatusTone,
} from './loyalty-summary.utils';

describe('loyalty-summary utils', () => {
  const items = buildLoyaltySummaryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(LOYALTY_SUMMARY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      LOYALTY_SUMMARY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalLoyaltySummary(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupLoyaltySummaryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterLoyaltySummary(items, '')).toHaveLength(items.length);
    expect(
      filterLoyaltySummary(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterLoyaltySummary(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortLoyaltySummary(items, 'amount', 'asc');
    const desc = sortLoyaltySummary(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeLoyaltySummaryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(loyaltySummaryStatusTone('active')).toBe('success');
    expect(loyaltySummaryStatusTone('pending')).toBe('warning');
    expect(loyaltySummaryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickLoyaltySummaryHighlights(items, 2)).toHaveLength(2);
    expect(pickLoyaltySummaryHighlights(items, 0)).toHaveLength(0);
  });
});
